#!/usr/bin/env node

import { Interpreter } from "miniscript-ts";
import { argv } from "process";
import fs from 'fs';

if (argv.length == 3) {
  const srcPath = argv[2];
  console.log("Running:", srcPath);
  const buffer = fs.readFileSync(srcPath);
  const srcCode = buffer.toString();

  const interp = new Interpreter();
  interp.runSrcCode(srcCode);
} else {
  console.info("Please specify source-file!");
}
