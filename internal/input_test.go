package main

import (
	"strings"
	"testing"
	"testing/fstest"
)

type fakeCloudSLA map[string]float64

func (d *fakeCloudSLA) Get(key string) (float64, bool) {
	v, ok := (*d)[key]
	return v, ok
}

var fakeSLA = &fakeCloudSLA{
	"fake-1": 9.99,
	"fake-2": 9.9,
	"fake-3": 9.0,
}

func TestGetInputWithFS(t *testing.T) {
	cases := []struct {
		testDescription       string
		inputFileContent      string
		expectedResult        []combinedInput
		expectedErrorContains string
	}{
		{
			testDescription:       "empty input file returns error",
			inputFileContent:      "",
			expectedResult:        []combinedInput{},
			expectedErrorContains: "length of combinedInput is zero",
		},
		{
			testDescription:       "non-existant name without custom sla returns error",
			inputFileContent:      `- name: foo`,
			expectedResult:        []combinedInput{},
			expectedErrorContains: "unable to find foo",
		},
		{
			testDescription: "non-existant name with custom sla",
			inputFileContent: `
- name: foo
  sla: 9.9`,
			expectedResult: []combinedInput{
				{
					name:     "foo",
					sla:      9.9,
					isCustom: true,
				},
			},
			expectedErrorContains: "",
		},
		{
			testDescription: "both cloudSLA and custom",
			inputFileContent: `
- name: foo
  sla: 9.9
- name: fake-1`,
			expectedResult: []combinedInput{
				{
					name:     "foo",
					sla:      9.9,
					isCustom: true,
				},
				{
					name:     "fake-1",
					sla:      9.99,
					isCustom: false,
				},
			},
			expectedErrorContains: "",
		},
		{
			testDescription: "multiple cloudSLA and custom",
			inputFileContent: `
- name: foo
  sla: 9.9
- name: fake-1
- name: fake-2
- name: fake-3`,
			expectedResult: []combinedInput{
				{
					name:     "foo",
					sla:      9.9,
					isCustom: true,
				},
				{
					name:     "fake-1",
					sla:      9.99,
					isCustom: false,
				},
				{
					name:     "fake-2",
					sla:      9.9,
					isCustom: false,
				},
				{
					name:     "fake-3",
					sla:      9.0,
					isCustom: false,
				},
			},
			expectedErrorContains: "",
		},
	}
	for idx, c := range cases {
		t.Logf("Test #%d: %s", idx, c.testDescription)
		fsys := fstest.MapFS{
			"input.yaml": {Data: []byte(c.inputFileContent)},
		}
		result, err := getInputWithFS(fsys, "input.yaml", fakeSLA)
		if c.expectedErrorContains != "" {
			if err == nil {
				t.Fatalf("expected error to contain %q but received nil", c.expectedErrorContains)
			}
			if !strings.Contains(err.Error(), c.expectedErrorContains) {
				t.Fatalf("expected error to contain %q but received: %v", c.expectedErrorContains, err)
			}
			continue
		}
		if err != nil {
			t.Fatalf("expected error to be nil but received: %v", err)
		}
		if len(result) != len(c.expectedResult) {
			t.Fatalf("expected result length to be %d but received: %d", len(c.expectedResult), len(result))
		}
		for i, v := range result {
			if v.name != c.expectedResult[i].name {
				t.Fatalf("expected name to be %q but received: %s", c.expectedResult[i].name, v.name)
			}
			if v.sla != c.expectedResult[i].sla {
				t.Fatalf("expected sla to be %f but received: %f", c.expectedResult[i].sla, v.sla)
			}
			if v.isCustom != c.expectedResult[i].isCustom {
				t.Fatalf("expected isCustom to be %t but received: %t", c.expectedResult[i].isCustom, v.isCustom)
			}
		}
	}
}

func TestGetRawInput(t *testing.T) {
	fsys := fstest.MapFS{
		"input.yaml": {Data: []byte(`- name: aws-lambda`)},
	}
	inputData, err := getRawInput(fsys, "input.yaml")
	if err != nil {
		t.Fatalf("getInput failed: %v", err)
	}
	if len(inputData) != 1 {
		t.Fatal("expected inputData to be 1")
	}
	if *inputData[0].Name != "aws-lambda" {
		t.Fatal("expected Name to be aws-lambda")
	}
	if inputData[0].SLA != nil {
		t.Fatal("expected SLA to be nil")
	}
}
