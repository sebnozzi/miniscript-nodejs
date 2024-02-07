import { Interpreter } from "miniscript-ts";
import { ModuleLoader } from "./api/moduleLoader";
import { UserInteraction } from "./api/userInteraction";

export class NodeInterpreter {

  interp: Interpreter;
  userInteraction: UserInteraction;

  constructor(workingDir: string) {
    const interp = new Interpreter();

    const moduleLoader = new ModuleLoader(interp, workingDir);
    moduleLoader.addImportAPI();
  
    const userInteraction = new UserInteraction(interp);
    userInteraction.addAPI();

    this.interp = interp;
    this.userInteraction = userInteraction;
  }

  runSrcFile(srcCode: string) {
    const interp = this.interp;
    const userInteraction = this.userInteraction;
    interp.runSrcCode(srcCode).then(_ => {
      userInteraction.stop();
    });
  }

  runSrcFileCoop(srcCode: string) {
    const interp = this.interp;
    const userInteraction = this.userInteraction;

    const runner = interp.getCooperativeRunner(srcCode);
    if (runner) {
      const runAction = () => {
        runner.runSomeCycles();
        if (runner.isFinished()) {
          userInteraction.stop();
        } else {
          setTimeout(runAction, 0);
        }
      };
      runAction();
    }
  }

}