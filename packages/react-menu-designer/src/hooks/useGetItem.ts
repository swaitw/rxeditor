import { Identifier } from "../dnd";
import { useMenuSchemaState } from "./useMenuSchemaState";
import { useCallback } from "react";

export function useGetItem() {
  const [menuSchema] = useMenuSchemaState()
  const getItem = useCallback((id?: Identifier | null) => {
    return menuSchema.items.find(item => item.meta.id === id)
  }, [menuSchema.items])
  return getItem
}