import {
  forwardRef,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { ItemsForDeleteContext } from "../context";
import { InitialDataType } from "../constant";

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

    // consume context
    const { itemsForDelete, setItemsForDelete } = useContext(
      ItemsForDeleteContext
    );

    // check item selected or not if selected then set setChecked to true otherwise set setChecked and showInput to false
    useEffect(() => {
      const currentItem = itemsForDelete?.find((id: string) => item.id === id);

      if (currentItem) {
        setChecked(true);
      } else {
        setChecked(false);
        setShowInput(false);
      }
    }, [item.id, itemsForDelete]);

    // Input change handler function
    const handleChange = (e: {
      target: { checked: boolean | ((prevState: boolean) => boolean) };
    }) => {
      setChecked(e.target.checked);

      // decide item selected or not. If selected then set it into selected list for delete otherwise remove it from selected list for delete
      if (e.target.checked) {
        setItemsForDelete((prev) => (prev ? [...prev, item.id] : [item.id]));
      } else {
        setItemsForDelete((prev) =>
          prev ? prev.filter((id: string) => id !== item.id) : []
        );
      }
    };

    return (
      <ItemContainer
        $index={index}
        $withOpacity={withOpacity}
        onMouseEnter={() => setShowInput(true)}
        onMouseLeave={() => !checked && setShowInput(false)}
      >
        <Image
          src={item.src}
          alt="Product"
          ref={ref}
          width={500}
          height={500}
          style={{ ...style }}
          {...props}
          $isDragging={isDragging}
        />

        {!isDragging && showInput && (
          <InputBox $checked={checked}>
            {/* overlay */}
            <span className="overlay"></span>
            {/* input field */}
            <input
              type="checkbox"
              name="photo"
              checked={checked}
              onChange={handleChange}
            />
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
}>`
  position: relative;
  height: 100%;
  width: 100%;
  grid-column-start: ${({ $index }) => ($index === 0 ? "span 2" : "")};
  grid-row-start: ${({ $index }) => ($index === 0 ? "span 2" : "")};
  opacity: ${({ $withOpacity }) => ($withOpacity ? "0.5" : "1")};
`;

const Image = styled.img<{
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

const InputBox = styled.div<{ $checked: boolean }>`
  .overlay {
    background-color: #000;
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    opacity: ${({ $checked }) => ($checked ? "0.2" : "0.5")};
  }

  input {
    pointer-events: all;
    position: absolute;
    top: 20px;
    left: 20px;
    width: 18px;
    height: 18px;
  }
`;
