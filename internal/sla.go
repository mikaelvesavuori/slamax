package main

import (
	"fmt"
	"math"
)

func calculateSLA(input []combinedInput) (float64, error) {
	if len(input) == 0 {
		return 0, fmt.Errorf("input of lenght zero")
	}

	round := func(v float64) float64 {
		return math.Round(v*100) / 100
	}

	slaCalc := func(a, b float64) float64 {
		if a == 0 {
			return round(b)
		}
		return round(a*b) / 100
	}

	var result float64
	for _, v := range input {
		result = slaCalc(result, v.sla)
	}

	return round(result), nil
}
