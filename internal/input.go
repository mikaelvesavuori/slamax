package main

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v2"
)

type combinedInput struct {
	name     string
	sla      float64
	isCustom bool
}

type keyGetter interface {
	Get(key string) (float64, bool)
}

func getInput(path string, cloudSLA keyGetter) ([]combinedInput, error) {
	fsys, fileName, err := getRawInputFS(path)
	if err != nil {
		return nil, err
	}

	return getInputWithFS(fsys, fileName, cloudSLA)
}

func getInputWithFS(fsys fs.FS, fileName string, cloudSLA keyGetter) ([]combinedInput, error) {
	input, err := getRawInput(fsys, fileName)
	if err != nil {
		return nil, err
	}

	combinedSLAInput, err := getCombinedInput(input, cloudSLA)
	if err != nil {
		return nil, err
	}

	if len(combinedSLAInput) == 0 {
		return nil, fmt.Errorf("length of combinedInput is zero")
	}

	return combinedSLAInput, nil
}

func getCombinedInput(input []rawInput, cloudSLA keyGetter) ([]combinedInput, error) {
	var combinedSLAInput []combinedInput
	for idx, v := range input {
		if v.Name == nil {
			return nil, fmt.Errorf("missing name on index %d", idx)
		}
		name := *v.Name
		sla, isCustom, err := getSLA(name, v, cloudSLA)
		if err != nil {
			return nil, err
		}
		combinedSLAInput = append(combinedSLAInput, combinedInput{
			name,
			sla,
			isCustom,
		})
	}
	return combinedSLAInput, nil
}

func getSLA(name string, input rawInput, cloudSLA keyGetter) (sla float64, isCustom bool, err error) {
	if input.SLA != nil {
		return *input.SLA, true, nil
	}

	v, ok := cloudSLA.Get(name)
	if !ok {
		return 0, false, fmt.Errorf("unable to find %s from cloudSLA", name)
	}
	return v, false, nil
}

type rawInput struct {
	Name        *string  `yaml:"name"`
	Description *string  `yaml:"description,omitempty"`
	SLA         *float64 `yaml:"sla,omitempty"`
}

func getRawInputFS(path string) (fs.FS, string, error) {
	dir, file := filepath.Split(path)
	absDir, err := filepath.Abs(dir)
	if err != nil {
		return nil, "", err
	}
	fsys := os.DirFS(absDir)
	return fsys, file, nil
}

func getRawInput(fsys fs.FS, fileName string) ([]rawInput, error) {
	dataBytes, err := fs.ReadFile(fsys, fileName)
	if err != nil {
		return nil, err
	}

	var data []rawInput
	err = yaml.Unmarshal(dataBytes, &data)
	if err != nil {
		return nil, err
	}

	return data, nil
}
