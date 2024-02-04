import { RuntimeError } from "miniscript-ts";
import { Interpreter, Runtime } from "miniscript-ts";
import path from 'path';
import fs from 'fs';

export class ModuleLoader {

  private runtime: Runtime;

  constructor(
    private interp: Interpreter, 
    private localDir: string) {
      this.runtime = interp.runtime;
  }

  addImportAPI() {
    const outerThis = this;
    const runtime = this.runtime;

    // Import a module in the module-paths.
    // The code is executed in the context of a function.
    runtime.addIntrinsic("import(moduleName)", 
    function(moduleName: string): Promise<void> {
      const srcCode = outerThis.loadCode(moduleName);
      const runPromise = outerThis.runSrcAsModule(moduleName, srcCode);
      return runPromise;
     });
  }

  private runSrcAsModule(moduleName: string, srcCode: string): Promise<void> {
    const runPromise =  this.interp.runSrcAsModule(moduleName, srcCode);
    return runPromise;
  }
  
  private loadCode(moduleName: string): string {
    const moduleFileName = `${moduleName}.ms`;

    // Try fetching first at the "local" project path (same as
    // "current directory").
    const localPath = path.resolve(path.join(this.localDir, moduleFileName));
    if (fs.existsSync(localPath)) {
      const buffer = fs.readFileSync(localPath);
      return buffer.toString();
    } else {
      // Try then fetching from "/sys/lib"
      const sysLibPath = path.resolve(path.join(__dirname, "..", "sysdisk", "lib", moduleFileName));
      if (fs.existsSync(sysLibPath)) {
        const buffer = fs.readFileSync(sysLibPath);
        return buffer.toString();
      }
    }

    const msg = `Importing module ${moduleName} failed. No matching file found.`;
    console.error(msg);
    throw new RuntimeError(msg);
  }

}