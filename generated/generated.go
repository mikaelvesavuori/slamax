package generated

import (
	"embed"
	"encoding/json"
)

//go:embed *
var generatedContent embed.FS

type slaData map[string]float64

func (d *slaData) Get(key string) (float64, bool) {
	v, ok := (*d)[key]
	return v, ok
}

func GetSLAData() (*slaData, error) {
	slaDataBytes, err := generatedContent.ReadFile("sla_data.json")
	if err != nil {
		return nil, err
	}
	var data slaData
	err = json.Unmarshal(slaDataBytes, &data)
	if err != nil {
		return nil, err
	}
	return &data, nil
}
