import Gallery from "./components/Gallery";
import { initialData } from "./constant";

const App = () => {
  return (
    <main>
      <Gallery initialData={initialData} />
    </main>
  );
};

export default App;
