import {
  forwardRef,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import { InitialDataType } from "../types";
import styled from "styled-components";
import { GalleryContext, GalleryContextProps } from "./Gallery";

export type ItemProps = HTMLAttributes<HTMLImageElement> & {
  item: InitialDataType;
  index?: number;
  withOpacity?: boolean;
  isDragging?: boolean;
};

const Item = forwardRef<HTMLImageElement, ItemProps>(
  ({ item, index, withOpacity, isDragging, style, ...props }, ref) => {
    const [showInput, setShowInput] = useState(false);
    const [checked, setChecked] = useState(false);

    const { itemForDelete, setItemForDelete } =
      useContext<GalleryContextProps | null>(GalleryContext);
    console.log({ showInput, checked, itemForDelete });

    useEffect(() => {
      const currentItem = itemForDelete?.find((id: string) => item.id === id);

      if (currentItem) {
        setChecked(true);
      } else {
        setChecked(false);
        setShowInput(false);
      }
    }, [item.id, itemForDelete]);

    const handleChange = (e: {
      target: { checked: boolean | ((prevState: boolean) => boolean) };
    }) => {
      setChecked(e.target.checked);

      if (e.target.checked) {
        setItemForDelete((prev: string[]) =>
          prev ? [...prev, item.id] : [item.id]
        );
      } else {
        setItemForDelete((prev: string[]) =>
          prev ? prev.filter((id: string) => id !== item.id) : []
        );
      }
    };

    return (
      <ItemContainer
        $index={index}
        $withOpacity={withOpacity}
        $isDragging={isDragging}
        onMouseEnter={() => setShowInput(true)}
        onMouseLeave={() => !checked && setShowInput(false)}
      >
        <Image
          src={item.src}
          alt="Product"
          ref={ref}
          style={{ ...style }}
          {...props}
          width={500}
          height={500}
        />

        {!isDragging && showInput && (
          <InputBox>
            <span></span>
            <input type="checkbox" checked={checked} onChange={handleChange} />
          </InputBox>
        )}
      </ItemContainer>
    );
  }
);

export default Item;

const ItemContainer = styled.div<{
  $index?: number;
  $withOpacity?: boolean;
  $isDragging?: boolean;
}>`
  position: relative;
  grid-column-start: ${({ $index }) => ($index === 0 ? "span 2" : "")};
  grid-row-start: ${({ $index }) => ($index === 0 ? "span 2" : "")};
  opacity: ${({ $withOpacity }) => ($withOpacity ? "0.5" : "1")};
`;

const Image = styled.img<{
  $index?: number;
  $withOpacity?: boolean;
  $isDragging?: boolean;
}>`
  transform-origin: 0 0;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "grab")};
  box-shadow: ${({ $isDragging }) =>
    $isDragging
      ? " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
      : "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"};
  transform: ${({ $isDragging }) => ($isDragging ? "scale(1.05)" : "scale(1)")};
`;

const InputBox = styled.div`
  transition: all 5s ease-in-out;
  span {
    background-color: #000;
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    opacity: 0.5;
  }

  input {
    position: absolute;
    pointer-events: all;
    top: 20px;
    left: 20px;
    width: 20px;
    height: 20px;

    &::before {
      width: 15px;
      height: 15px;
    }
  }
`;
