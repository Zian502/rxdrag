import { IReactionMaterial } from "@rxdrag/schema"
import {Controllers} from "@rxdrag/minions"
import { IForm } from "@rxdrag/fieldy"

export type Navigate = (url: string) => void

export interface IReactionFactoryOptions {
  controllers?: Controllers,
  materials?: IReactionMaterial[],
  form?: IForm,
  fieldPath?: string,
  //路由跳转
  navigate?: Navigate
}


