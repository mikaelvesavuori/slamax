package main

import (
	"strings"
	"testing"
)

func TestCalculateSLA(t *testing.T) {
	cases := []struct {
		testDescription       string
		input                 []combinedInput
		expectedResult        float64
		expectedErrorContains string
	}{
		{
			testDescription:       "empty input",
			input:                 []combinedInput{},
			expectedResult:        0,
			expectedErrorContains: "input of lenght zero",
		},
		{
			testDescription: "single input",
			input: []combinedInput{
				{
					sla: 99.99,
				},
			},
			expectedResult:        99.99,
			expectedErrorContains: "",
		},
		{
			testDescription: "two inputs",
			input: []combinedInput{
				{
					sla: 99.95,
				},
				{
					sla: 99.95,
				},
			},
			expectedResult:        99.9,
			expectedErrorContains: "",
		},
		{
			testDescription: "four inputs",
			input: []combinedInput{
				{
					sla: 99.95,
				},
				{
					sla: 99.95,
				},
				{
					sla: 99,
				},
				{
					sla: 95,
				},
			},
			expectedResult:        93.96,
			expectedErrorContains: "",
		},
	}

	for i, c := range cases {
		t.Logf("Test #%d: %s", i, c.testDescription)
		result, err := calculateSLA(c.input)
		if c.expectedErrorContains != "" {
			if err == nil {
				t.Fatalf("expected error to contain %q but received nil", c.expectedErrorContains)
			}
			if !strings.Contains(err.Error(), c.expectedErrorContains) {
				t.Fatalf("expected error to contain %q but received: %s", c.expectedErrorContains, err)
			}
			continue
		}
		if err != nil {
			t.Fatalf("expected error to be nil but received: %s", err)
		}
		if result != c.expectedResult {
			t.Fatalf("expected result to be %f but received: %f", c.expectedResult, result)
		}
	}
}
