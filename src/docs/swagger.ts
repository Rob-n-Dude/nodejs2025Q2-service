import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';

const apiFilePath = '../../doc/api.yaml';

export const initSwagger = async (app) => {
  const filePath = join(__dirname, apiFilePath);

  const file = await readFile(filePath, 'utf8');
  const doc = parse(file);
  SwaggerModule.setup('doc', app, doc);
};
