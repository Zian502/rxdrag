import { IComponentMaterial } from "core-react";
import { List } from "expamples/ant5/components/datas/List";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "List"
export const ListMaterial: IComponentMaterial = {
  componentName: name,
  component: List,
  designer: List,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },
  resource: {
    name: name,
    resourceLocales: resourceLocales,
    icon: icon,
    color: "#8B79EC",
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: false,
    noPlaceholder: false,
  }
}