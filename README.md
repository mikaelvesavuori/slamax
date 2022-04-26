# `SlaMax`

**Calculates maximum composite SLA for a list of sequentially provided cloud services or your custom-defined services.**

![Build Status](https://github.com/mikaelvesavuori/slamax/workflows/build/badge.svg) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmikaelvesavuori%2Fslamax.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmikaelvesavuori%2Fslamax?ref=badge_shield) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mikaelvesavuori_slamax&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=mikaelvesavuori_slamax) [![codecov](https://codecov.io/gh/mikaelvesavuori/slamax/branch/main/graph/badge.svg?token=AIV06YBT8U)](https://codecov.io/gh/mikaelvesavuori/slamax) [![Maintainability](https://api.codeclimate.com/v1/badges/a312d7e84db2bed1acd6/maintainability)](https://codeclimate.com/github/mikaelvesavuori/slamax/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/a312d7e84db2bed1acd6/test_coverage)](https://codeclimate.com/github/mikaelvesavuori/slamax/test_coverage)

Here are a few use-cases you can use `SlaMax` for:

- Continuously calculating your system's SLA base value
- Helping teams to understand what the maximum SLO they should aim for is
- Provides an easy way for architects to understand how cloud components affect the total reliability of a solution
- Increasing overall compliance and resiliency awareness

**All SLA values are hosted in, and updated at, my other related project [`cloud-sla`](https://github.com/mikaelvesavuori/cloud-sla)**.

## 🤔 Just want to use an API rather than a library?

Use [`maxslaofmy.systems`](https://maxslaofmy.systems/) to get `SlaMax` as an API.

Use [`getsla.cloud`](https://getsla.cloud/) to retrieve SLA data via API.

## 👩‍🏫 Important to understand about SLAs

Since `SlaMax` has to generalize any given SLA into a number, it doesn't concern itself with any details around, for example, _what_ must be fulfilled on the customer side for the SLA to be applicable, or what exactly the SLA number refers to: All SLAs have various types of conditions that need to be fulfilled.

Also note that, especially on the Azure side, certain services don't have their own SLAs, but instead they refer back to other services and their SLAs. This is because they're not unique serices, but rather composed of other services.

## 🏗️ Installation

Run `npm install slamax` or `yarn install slamax`.

## 👩‍💻 Usage

An example using both an AWS service (see below for all available services and their keys) and a custom service (must start with `custom`). Custom items **must** include an `sla` key with a numeric value.

```TypeScript
import slamax from 'slamax';          // ES6+
//const slamax = require('slamax');   // ES5
const { SlaMax } = slamax;

const listOfSlas = [
  {
    "name": "aws-lambda"
  },
  {
    "name": "custom-database",
    "description": "Dev tier database on Heroku",
    "sla": 95
  }
]

const maxSla = SlaMax(listOfSlas);

console.log(`The maximum composite SLA is ${maxSla}%`);
```

## 📊 Diagram

![Dependency graph](./diagrams/dependencygraph.svg)
