import { createId } from "@rxdrag/shared";
import { conditionSchema } from "./schema";
import { ReactNode } from "react";
import { NodeType, IActivityMaterial } from "@rxdrag/minions-schema";
import { ifIcon } from "../../icons";

export const conditionMaterial: IActivityMaterial<ReactNode> = {
  icon: ifIcon,
  label: "$conditionCheck",
  activityType: NodeType.Activity,
  color: "#5e76c3",
  defaultPorts: {
    inPorts: [
      {
        id: createId(),
        name: "input",
        label: "",//"$inputCondition",
      },
    ],
    outPorts: [
      {
        id: createId(),
        name: "true",
        label: "$true",
      },
      {
        id: createId(),
        name: "false",
        label: "$false",
      },
    ],
  },
  schema: conditionSchema,
  activityName: "condition"
}