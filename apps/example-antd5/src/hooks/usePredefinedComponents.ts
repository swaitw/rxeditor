import { Root } from "@rxdrag/react-core";
import { IComponents } from "@rxdrag/react-shared";
import { isStr } from "@rxdrag/shared";
import { useMemo } from "react";
import {Field} from "@rxdrag/react-antd-components";
import { materials, slots } from "../materials";

export function usePredefinedComponents() {
  const coms = useMemo(() => {
    const designers: IComponents = {
      Root: Root,
      Field: Field,
    }
    const components: IComponents = {
      Root: Root,
      Field: Field,
    }
    for (const mGroup of materials) {
      for (const com of mGroup.items) {
        designers[com.componentName] = com.designer
        components[com.componentName] = com.component
        if (com.slots) {
          for (const key of Object.keys(com.slots)) {
            const slot = com.slots[key]
            if (slot === true || slot === undefined || isStr(slot)) {
              continue
            }
            designers[slot.componentName] = slot.designer
            components[slot.componentName] = slot.component
          }
        }
      }
    }

    for (const com of slots) {
      designers[com.componentName] = com.designer
      components[com.componentName] = com.component
    }

    return { designers, components }
  }, [])

  return coms
}