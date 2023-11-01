import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { DragUpdate, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { imageType } from "../types";
import { useState } from "react";
import Header from "./Header";

const Gallery = ({ initialData }: { initialData: imageType[] }) => {
  const [images, setImages] = useState(initialData);

  // onDragStart handler function
  const handleDragStart = () => {
    document.body.style.transition = "background-color 0.5s ease-in-out";
  };

  // onDragUpdate handler function
  const handleDragUpdate = (update: DragUpdate) => {
    const { destination } = update;
    const opacity = destination ? destination.index / images.length : "0";

    document.body.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  };

  // onDragEnd handler function
  const handleDragEnd = (result: DropResult) => {
    document.body.style.backgroundColor = "inherit";

    const { source, destination, type } = result;
    console.log("drag event occured", result);

    // return immediately if destination is null
    if (!destination) return;

    // return immediately if dropableId, and index of source and destination is same
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const rearrangeImages = [...images];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removeImages] = rearrangeImages.splice(sourceIndex, 1);

      rearrangeImages.splice(destinationIndex, 0, removeImages);
      console.log(rearrangeImages);

      return setImages(rearrangeImages);
    }
  };
  return (
    <GalleryContainer>
      <Header />
      <DragDropContext
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
        onDragEnd={handleDragEnd}
      >
        <DroppableWrapper>
          {images.map((img, index) => (
            <Droppable key={img.id} droppableId={img.id} type="group">
              {(provided, snapshot) => (
                <DraggableWrapper
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Draggable draggableId={img.id} index={index}>
                    {(provided) => (
                      <ImageWrapper
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <img
                          width={150}
                          height={150}
                          src={img.src}
                          alt="product"
                        />
                      </ImageWrapper>
                    )}
                  </Draggable>

                  <PlaceHolder
                    isdraggingover={snapshot.isDraggingOver.toString()}
                  >
                    {provided.placeholder}
                  </PlaceHolder>
                </DraggableWrapper>
              )}
            </Droppable>
          ))}
        </DroppableWrapper>
      </DragDropContext>
    </GalleryContainer>
  );
};

export default Gallery;

const GalleryContainer = styled.div`
  user-select: none;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const DroppableWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const DraggableWrapper = styled.div`
  position: relative;
  display: flex;
  transition: background-color 0.2s ease-in-out;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const PlaceHolder = styled.div<{ isdraggingover: string }>`
  /* width: 100%;
  height: 100%; */
  /* z-index: -10; */
  /* background-color: pink; */
  /* border: ${(props) =>
    props.isdraggingover == "true" ? "" : "1px solid #be2e2e"}; */
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  img {
    height: 100%;
    width: 100%;
    /* border: 1px solid #ddd; */

    border-radius: 10px;
  }
`;
