import { IActivity, IActivityJointers, LogicFlow, Activity } from "@rxdrag/minions-runtime";
import { IActivityDefine, ILogicFlowConfig } from "@rxdrag/minions-schema";
import { IControllerContext } from "../../interfaces";
import { IControllerConfig } from "../AbstractControllerActivity";

export interface IReactionConfig extends IControllerConfig, ILogicFlowConfig {
}

@Activity(Reaction.NAME)
export class Reaction implements IActivity {
  public static NAME = "system-react.reaction"
  id: string;
  jointers: IActivityJointers;
  config?: IReactionConfig;

  constructor(meta: IActivityDefine<IReactionConfig>, context: IControllerContext) {
    this.id = meta.id
    const defineMeta = context?.controllers?.[meta?.config?.param?.controllerId || ""]?.meta.reactions?.find(reactionMeta => reactionMeta.id === meta.config?.logicFlowId)
    if (defineMeta) {
      const logicFlow = new LogicFlow(defineMeta, context)
      this.jointers = logicFlow.jointers
    } else {
      throw new Error("No implement on Controller reaction meta")
    }
  }
  destory(): void {
    throw new Error("Method not implemented.");
  }

}