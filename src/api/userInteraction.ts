import { Interpreter, Runtime } from "miniscript-ts";
import * as readline from "readline";

export class UserInteraction {

  runtime: Runtime;
  rl: readline.Interface;

  constructor(private interp: Interpreter) {
    this.runtime = interp.runtime;
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.rl = rl;
  }

  addAPI() {
    const outerThis = this;

    this.runtime.addIntrinsic('input(prompt="")', 
    function(prompt: string): Promise<string> {
      return outerThis.input(prompt);
    });
  }

  stop() {
    this.rl.close();
  }

  private input(prompt: string): Promise<string> {
    const rl = this.rl;
    return new Promise<string>(resolve => {
      rl.question(prompt, (answer: string) => {
        resolve(answer);
      });
    });
  }

}