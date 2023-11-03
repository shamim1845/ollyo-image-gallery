import React, { FC } from "react";
import styled from "styled-components";

type GridProps = {
  children: React.ReactNode;
};

const Grid: FC<GridProps> = ({ children }) => {
  return <GridContainer>{children}</GridContainer>;
};

export default Grid;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px 40px;
`;
