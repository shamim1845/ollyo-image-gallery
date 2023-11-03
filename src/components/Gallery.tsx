import { FC, useState, useCallback, createContext } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import Grid from "./Grid";
import SortableItem from "./SortableItem";
import Item from "./Item";
import { InitialDataType } from "../types";
import styled from "styled-components";
import Header from "./Header";
import AddPhoto from "./AddPhoto";

interface GalleryProps {
  initialData: InitialDataType[];
}

export interface GalleryContextProps {
  items?: InitialDataType[];
  setItems?: React.Dispatch<React.SetStateAction<InitialDataType[]>>;
  itemForDelete?: string[] | null;
  setItemForDelete?: React.Dispatch<React.SetStateAction<string[] | null>>;
}

export const GalleryContext = createContext<GalleryContextProps | null>(null);

const Gallery: FC<GalleryProps> = ({ initialData }) => {
  const [items, setItems] = useState(initialData);
  const [activeItem, setActiveItem] = useState<InitialDataType | null>(null);
  const [itemForDelete, setItemForDelete] = useState<string[] | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveItem(items.find((item) => item.id === event.active.id)!);
    },
    [items]
  );
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveItem(null);
  }, []);
  const handleDragCancel = useCallback(() => {
    setActiveItem(null);
  }, []);

  return (
    <GalleryContext.Provider
      value={{
        items,
        setItems,
        itemForDelete,
        setItemForDelete,
      }}
    >
      <GalleryContainer>
        <Header />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            <Grid>
              {items.map((item, index) => (
                <SortableItem key={item.id} item={item} index={index} />
              ))}
              <AddPhoto />
            </Grid>
          </SortableContext>
          <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
            {activeItem ? (
              <Item
                style={{ background: "#fff" }}
                item={activeItem}
                isDragging
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </GalleryContainer>
    </GalleryContext.Provider>
  );
};

export default Gallery;

const GalleryContainer = styled.div`
  user-select: none;
  max-width: 1200px;
  margin: 30px auto 0;
  background-color: #fff;
  border-radius: 10px;
`;
