package main

import (
	"fmt"
	"os"

	"github.com/mikaelvesavuori/slamax/generated"
)

func main() {
	err := run()
	if err != nil {
		fmt.Fprintf(os.Stderr, "application returned an error: %v\n", err)
		os.Exit(1)
	}
}

func run() error {
	slaData, err := generated.GetSLAData()
	if err != nil {
		return err
	}

	for k, v := range slaData {
		fmt.Printf("%s = %f\n", k, v)
	}

	return nil
}
