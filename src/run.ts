#!/usr/bin/env node

import { Interpreter } from "miniscript-ts";
import { ModuleLoader } from "./moduleLoader";
import { UserInteraction } from "./userInteraction";
import { argv } from "process";
import fs from 'fs';
import path from 'path';


if (argv.length == 3) {
  const srcPath = argv[2];

  const buffer = fs.readFileSync(srcPath);
  const srcCode = buffer.toString();

  const interp = new Interpreter();

  const localDir = path.dirname(srcPath);
  const moduleLoader = new ModuleLoader(interp, localDir);
  moduleLoader.addImportAPI();

  const userInteraction = new UserInteraction(interp);
  userInteraction.addAPI();

  interp.runSrcCode(srcCode).then((v: boolean) => {
    userInteraction.stop();
  });

} else {
  console.info("Please specify source-file!");
}
