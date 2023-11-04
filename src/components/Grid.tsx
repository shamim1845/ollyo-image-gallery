import React, { FC } from "react";
import styled from "styled-components";

interface GridProps {
  children: React.ReactNode;
}

const Grid: FC<GridProps> = ({ children }) => {
  return <GridContainer>{children}</GridContainer>;
};

export default Grid;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  padding: 30px;

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
