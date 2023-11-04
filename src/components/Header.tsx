import { useContext } from "react";
import styled from "styled-components";
import { ItemsContext, ItemsForDeleteContext } from "../context";

const Header = () => {
  // consume context
  const { setItems } = useContext(ItemsContext);
  const { itemsForDelete, setItemsForDelete } = useContext(
    ItemsForDeleteContext
  );

  // selected items delete handler function
  const handleDelete = () => {
    // map all selected items and delete it from items array
    itemsForDelete?.map((id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    });

    //  set null in selected items when items are deleted from the items array
    setItemsForDelete(null);
  };

  // set null in selected items when items are de-selected
  const handleChange = () => {
    setItemsForDelete(null);
  };

  return (
    <HeaderContainer>
      {/* conditionally render title and input box*/}
      {itemsForDelete?.length ? (
        <InputBox>
          <input
            name="checkbox"
            type="checkbox"
            checked={itemsForDelete?.length ? true : false}
            onChange={handleChange}
          />
          <Title>
            <span>{itemsForDelete?.length}</span> <span>Files Selected</span>
          </Title>
        </InputBox>
      ) : (
        <Title>Gallery</Title>
      )}

      {/* show delete button when items selected for delete */}
      {itemsForDelete?.length ? (
        <DeleteButton onClick={handleDelete}>Delete files</DeleteButton>
      ) : null}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    width: 18px;
    height: 18px;
  }
`;

const Title = styled.h1`
  font-size: 20px;
`;

const DeleteButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: red;
  font-size: 16px;
  cursor: pointer;
  padding: 7px 14px;
  border-radius: 5px;

  &:hover {
    background-color: #ff00002d;
  }
`;
