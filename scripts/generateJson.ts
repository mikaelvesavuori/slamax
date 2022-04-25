import * as fs from 'fs';
import { serviceSlaData } from '../src/domain/data/serviceSlaData';

const generateJson = (outputPath: string) => {
  const serviceSla = new Map<string, number>();
  for (let data of serviceSlaData) {
    serviceSla.set(data.name, data.sla);
  }
  fs.writeFileSync(outputPath, JSON.stringify(Object.fromEntries(serviceSla)));
};

const args = process.argv.slice(2);
generateJson(args[0]);
