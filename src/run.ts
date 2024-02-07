#!/usr/bin/env node

import { argv } from "process";
import { runScript } from "./runners";

function main() {
  if (argv.length == 3) {
    const srcPath = argv[2];
    runScript(srcPath);
  } else {
    console.info("Please specify source-file!");
  }
}

main();

