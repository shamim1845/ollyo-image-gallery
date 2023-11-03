import { useContext } from "react";
import styled from "styled-components";
import { GalleryContext } from "./Gallery";

const Header = () => {
  const { items, setItems, itemForDelete, setItemForDelete } =
    useContext(GalleryContext);

  const handleDelete = () => {
    console.log("delete.............");

    itemForDelete?.map((id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    });
    setItemForDelete(null);
  };

  const handleChange = () => {
    setItemForDelete(null);
  };

  return (
    <HeaderContainer>
      {itemForDelete?.length ? (
        <InputBox>
          <input
            type="checkbox"
            checked={itemForDelete?.length}
            onChange={handleChange}
          />
          <h3>
            <span>{itemForDelete?.length}</span> <span>Files Selected</span>
          </h3>
        </InputBox>
      ) : (
        <h1>Gallery</h1>
      )}

      <DeleteButton onClick={handleDelete}>Delete files</DeleteButton>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    width: 20px;
    height: 20px;

    &::before {
      width: 15px;
      height: 15px;
    }
  }
`;

const DeleteButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: red;
  font-size: 16px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;

  &:hover {
    background-color: #ff00002d;
  }
`;
