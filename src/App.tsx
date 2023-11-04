import styled from "styled-components";
import Gallery from "./components/Gallery";
import { initialData } from "./constant";

const App = () => {
  return (
    <MainContainer>
      <Gallery initialData={initialData} />
    </MainContainer>
  );
};

export default App;

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;
