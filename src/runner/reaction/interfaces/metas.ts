export interface IX6NodeMeta {
  /** 节点x坐标 */
  x: number;
  /** 节点y坐标  */
  y: number;
  /** 节点宽度 */
  width: number;
  /** 节点高度 */
  height: number;
}

export interface IPortMeta {
  id: string;
  name: string;
  label?: string;
  //group: "in" | "out";
}

export enum ReactionType {
  Start = "Start",
  End = "End",
  SingleReaction = "SingleReaction",
  ControllerReaction = "ControllerReaction",
  ControllerDefaultReaction = "ControllerDefaultReaction",
}

export interface IReactionNodeData {
  name?: string;
  componentName?: string;
  reactionName?: string;
  inPorts?: IPortMeta[];
  outPorts?: IPortMeta[];
}

export interface IConfigMeta {
  controllerId?: string;
  reactionId?: string;
  fieldName?: string;
}

export interface IReactionNodeMeta<ConfigMeta extends IConfigMeta = IConfigMeta> extends IReactionNodeData {
  id: string;
  type: ReactionType;
  materialName: string;
  name?: string;
  label?: string;
  x6Node?: IX6NodeMeta;
  config?: ConfigMeta,
}

export interface IInvokeMeta {
  id: string;
  source: {
    nodeId: string;
    portId?: string;
  }
  target: {
    nodeId: string;
    portId?: string;
  };
  //x6Edge: IX6EdgeMeta;
}

export interface ILogicMetas {
  reactions: IReactionNodeMeta<IConfigMeta>[];
  invokes: IInvokeMeta[];
}

export interface IReactionMeta {
  id: string,
  name?: string,
  label?: string,
  //title?: string,
  logicMetas?: ILogicMetas,
}

// $form 虚拟表单， 
// $field 当前字段, 设置字段：$field.setValue
// $self 组件，设置组件属性:$self.setProps({dataSource:[...]}), 
export interface IVariableMeta {
  id: string,
  label: string
}
export interface IControllerMeta {
  // undefined 表示不开启控制器
  id?: string,
  name?: string,
  events?: IReactionMeta[],
  reactions?: IReactionMeta[],
  variables?: IVariableMeta[],
}