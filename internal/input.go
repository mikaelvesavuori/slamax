package main

import (
	"fmt"
	"io"
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
	file, err := getRawInputFile(path)
	if err != nil {
		return nil, err
	}

	return getInputWithFile(file, cloudSLA)
}

func getInputWithFile(file fs.File, cloudSLA keyGetter) ([]combinedInput, error) {
	input, err := getRawInput(file)
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

func getRawInputFile(path string) (fs.File, error) {
	dir, fileName := filepath.Split(path)
	absDir, err := filepath.Abs(dir)
	if err != nil {
		return nil, err
	}
	fsys := os.DirFS(absDir)
	return fsys.Open(fileName)
}

func getRawInput(file fs.File) ([]rawInput, error) {
	dataBytes, err := io.ReadAll(file)
	if err != nil {
		return nil, err
	}

	err = file.Close()
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
