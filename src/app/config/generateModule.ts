#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const templates = {
  useCase: (name: string) => `
export interface IInput {}

export interface IOutput {}

export class ${name}UseCase {
  async execute({}: IInput): Promise<IOutput> {}
}

`,

  useCaseFactory: (name: string, directory: string) => `
import { ${name}UseCase } from '@app/useCases/${directory}/${name}UseCase';

export function make${name}UseCase() {
  return new ${name}UseCase();
}

`,

  controller: (name: string, directory: string) => `
import { z, ZodError } from 'zod';
import { IController, IResponse } from '@app/interfaces/IController';
import { IRequest } from '@app/interfaces/IRequest';
import { ${name}UseCase } from '@app/useCases/${directory}/${name}UseCase';

const schema = z.object({});


export class ${name}Controller implements IController {
  constructor(private readonly ${toCamelCase(name)}UseCase: ${name}UseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const {} = schema.parse(body);

      const result = await this.${toCamelCase(name)}UseCase.execute({});

      return {
        statusCode: 200,
        body: { result },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      throw error;
    }
  }
}

`,

  controllerFactory: (name: string, directory: string) => `
import { ${name}Controller } from '@app/controllers/${directory}/${name}Controller';
import { make${name}UseCase } from './make${name}UseCase';

export function make${name}Controller() {
  const ${toCamelCase(name)}UseCase = make${name}UseCase();
  return new ${name}Controller(${toCamelCase(name)}UseCase);
}

`,
};

function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function createFileIfNotExists(filePath: string, content: string): void {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Arquivo criado: ${filePath}`);
  } else {
    console.log(`Arquivo já existe: ${filePath}`);
  }
}

function generateFilesForModule(
  methodName: string,
  moduleName: string,
  basePath: string = './src'
): void {
  const useCaseDir = path.join(basePath, 'app', 'useCases', moduleName);
  const controllerDir = path.join(basePath, 'app', 'controllers', moduleName);
  const factoryDir = path.join(basePath, 'factories', moduleName);

  console.log(`Gerando arquivos para o módulo: ${methodName}`);

  createFileIfNotExists(
    path.join(useCaseDir, `${methodName}UseCase.ts`),
    templates.useCase(methodName)
  );

  createFileIfNotExists(
    path.join(factoryDir, `make${methodName}UseCase.ts`),
    templates.useCaseFactory(methodName, moduleName)
  );

  createFileIfNotExists(
    path.join(controllerDir, `${methodName}Controller.ts`),
    templates.controller(methodName, moduleName)
  );

  createFileIfNotExists(
    path.join(factoryDir, `make${methodName}Controller.ts`),
    templates.controllerFactory(methodName, moduleName)
  );

  console.log(`Arquivos gerados com sucesso para o módulo ${methodName}!`);
}

function runCLI(): void {
  const args = process.argv.slice(2);

  if (args.length >= 2) {
    const methodName = args[0];
    const moduleName = args[1];

    generateFilesForModule(methodName, moduleName, './src');
    return;
  }
}

runCLI();
