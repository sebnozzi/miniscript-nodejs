#!/usr/bin/env node

import { Interpreter } from "miniscript-ts";
import { argv } from "process";
import fs from 'fs';
import path from 'path';
import { ModuleLoader } from "./moduleLoader";

if (argv.length == 3) {
  const srcPath = argv[2];

  const buffer = fs.readFileSync(srcPath);
  const srcCode = buffer.toString();

  const interp = new Interpreter();

  const localDir = path.dirname(srcPath);
  const moduleLoader = new ModuleLoader(interp, localDir);
  moduleLoader.addImportAPI();

  interp.runSrcCode(srcCode);
} else {
  console.info("Please specify source-file!");
}
