import { ChangeEvent, useContext, useRef } from "react";
import styled from "styled-components";
import { GalleryContext } from "./Gallery";
import { InitialDataType } from "../types";

const AddPhoto = () => {
  const { items, setItems } = useContext(GalleryContext);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef?.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      console.log(url);
      if (url) {
        setItems((prev: InitialDataType[]) => [
          ...prev,
          {
            id: `image${items?.length + 1}`,
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
      <p>Add Images</p>

      <input type="file" hidden ref={inputRef} onChange={handleFileChange} />
    </AddPhotoContainer>
  );
};

export default AddPhoto;

const AddPhotoContainer = styled.div`
  border: 2px dashed #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;
