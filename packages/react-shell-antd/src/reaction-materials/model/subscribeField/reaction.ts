import { AbstractReaction, IReactionFactoryOptions } from "@rxdrag/minions"
import { IConfigMeta, IReactionMeta, ReactionFactory } from "@rxdrag/schema"
import { IForm } from "@rxdrag/fieldy"

export interface ISubscribeFieldConfig extends IConfigMeta {
  fieldPath?: string,
}

export interface IShellReactionFactoryOptions extends IReactionFactoryOptions {
  form?: IForm,
  fieldPath?: string,
}

export class SubscribeFieldReaction extends AbstractReaction<ISubscribeFieldConfig> {
  constructor(meta: IReactionMeta<ISubscribeFieldConfig>, options?: IShellReactionFactoryOptions) {
    super(meta, options)
    const path = meta.config?.fieldPath || options?.fieldPath
    if (path) {
      const field = options?.form?.getField(path)
      if (field) {
        field.onValueChange(this.handleValueChange)
      }
    }
  }

  handleValueChange = (value?: any) => {
    this.outputValue(value)
  }

  outputValue = (value?: any) => {
    this.getOutputByName("output")?.push(value)
  }
}

export const SubscribeField: ReactionFactory = (meta: IReactionMeta<ISubscribeFieldConfig>, options?: IReactionFactoryOptions) => {
  return new SubscribeFieldReaction(meta, options)
}