import { createContext } from "react";
import { InitialDataType } from "../constant";

export interface ItemsContextProps {
  items: InitialDataType[];
  setItems: React.Dispatch<React.SetStateAction<InitialDataType[]>>;
}

//=> context for pass items and setItems
export const ItemsContext = createContext<ItemsContextProps>({
  items: [],
  setItems: () => {},
});

export interface ItemsForDeleteContextProps {
  itemsForDelete: string[] | null;
  setItemsForDelete: React.Dispatch<React.SetStateAction<string[] | null>>;
}

//=> context for pass itemsForDelete and setItemsForDelete
export const ItemsForDeleteContext = createContext<ItemsForDeleteContextProps>({
  itemsForDelete: [],
  setItemsForDelete: () => {},
});
