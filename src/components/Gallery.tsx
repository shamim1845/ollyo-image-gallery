import { FC, useState, useCallback } from "react";
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
import styled from "styled-components";
import Grid from "./Grid";
import SortableItem from "./SortableItem";
import Item from "./Item";
import Header from "./Header";
import AddPhoto from "./AddPhoto";
import { ItemsContext, ItemsForDeleteContext } from "../context";
import { InitialDataType } from "../constant";

// interface
interface GalleryProps {
  initialData: InitialDataType[];
}

const Gallery: FC<GalleryProps> = ({ initialData }) => {
  const [items, setItems] = useState<InitialDataType[]>(initialData);
  const [activeItem, setActiveItem] = useState<InitialDataType | null>(null);
  const [itemsForDelete, setItemsForDelete] = useState<string[] | null>(null);

  // sensors
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // onDragSrart handler function
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveItem(items.find((item) => item.id === event.active.id)!);
    },
    [items]
  );

  // onDragEnd handler function
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      // re-arrange items
      if (active.id !== over?.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        setItems((items) => {
          return arrayMove(items, oldIndex, newIndex);
        });
      }

      // set active item to null when drag end
      setActiveItem(null);
    },
    [items]
  );

  // onDragCancel handler function
  const handleDragCancel = useCallback(() => {
    // set active item to null when drag cancel
    setActiveItem(null);
  }, []);

  return (
    <GalleryContainer>
      <ItemsContext.Provider value={{ items, setItems }}>
        <ItemsForDeleteContext.Provider
          value={{
            itemsForDelete,
            setItemsForDelete,
          }}
        >
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
              {/* item list */}
              <Grid>
                {items.map((item, index) => (
                  <SortableItem key={item.id} item={item} index={index} />
                ))}

                {/* Add new photo to the gallery */}
                <AddPhoto />
              </Grid>
            </SortableContext>

            {/*Drag Overlay  */}
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
        </ItemsForDeleteContext.Provider>
      </ItemsContext.Provider>
    </GalleryContainer>
  );
};

export default Gallery;

const GalleryContainer = styled.div`
  user-select: none;
  background-color: #fff;
  border-radius: 10px;

  @media screen and (min-width: 576px) {
    margin: 30px;
  }
`;
