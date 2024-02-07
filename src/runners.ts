import fs from 'fs';
import path from 'path';
import { NodeInterpreter } from "./nodeInterpreter";

export function runScript(srcPath: string) {

  const workingDir = path.dirname(srcPath);

  const buffer = fs.readFileSync(srcPath);
  const srcCode = buffer.toString();

  const interp = new NodeInterpreter(workingDir);
  interp.runSrcFile(srcCode);

}