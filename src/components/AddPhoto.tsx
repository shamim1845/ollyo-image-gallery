import { ChangeEvent, useContext, useRef } from "react";
import styled from "styled-components";
import { ItemsContext } from "../context";
import { InitialDataType } from "../constant";
import { v4 as uuidv4 } from "uuid";

const AddPhoto = () => {
  const { setItems } = useContext(ItemsContext);

  // reference for input field
  const inputRef = useRef<HTMLInputElement | null>(null);

  // trigger input field for select image when click on addPhotoContainer
  const handleClick = () => {
    inputRef?.current?.click();
  };

  // onChange handler for input field
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      if (url) {
        setItems((prev: InitialDataType[]) => [
          ...prev,
          {
            id: uuidv4(),
            src: url,
          },
        ]);
      }
    }
  };

  return (
    <AddPhotoContainer onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
      <br />
      <p>Add Images</p>

      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputRef}
        onChange={handleFileChange}
      />
    </AddPhotoContainer>
  );
};

export default AddPhoto;

const AddPhotoContainer = styled.div`
  border: 1px dashed #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 150px;

  svg {
    width: 20px;
    height: 20px;
  }
`;
