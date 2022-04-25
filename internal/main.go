package main

import (
	"fmt"
	"os"

	"github.com/mikaelvesavuori/slamax/generated"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "please provide input yaml: %s ./input.yaml\n", os.Args[0])
		os.Exit(1)
	}
	inputFilePath := os.Args[1]

	cloudSLA, err := generated.GetSLAData()
	if err != nil {
		fmt.Fprintf(os.Stderr, "unable to get cloudSLA: %v\n", err)
		os.Exit(1)
	}

	input, err := getInput(inputFilePath, cloudSLA)
	if err != nil {
		fmt.Fprintf(os.Stderr, "unable to get input: %v\n", err)
		os.Exit(1)
	}

	err = run(input)
	if err != nil {
		fmt.Fprintf(os.Stderr, "application returned an error: %v\n", err)
		os.Exit(1)
	}
}

func run(input []combinedInput) error {
	result, err := calculateSLA(input)
	if err != nil {
		return err
	}

	fmt.Printf("Resulting composite SLA: %.2f\n", result)

	return nil
}
