import "./App.css";
import Gallery from "./components/Gallery";

const initialData = [
  {
    id: "image1",
    src: "images/image-1.webp",
  },
  {
    id: "image2",
    src: "images/image-2.webp",
  },
  {
    id: "image3",
    src: "images/image-3.webp",
  },
  {
    id: "image4",
    src: "images/image-4.webp",
  },
  {
    id: "image5",
    src: "images/image-5.webp",
  },
  {
    id: "image6",
    src: "images/image-6.webp",
  },
  {
    id: "image7",
    src: "images/image-7.webp",
  },
  {
    id: "image8",
    src: "images/image-8.webp",
  },
  {
    id: "image9",
    src: "images/image-9.webp",
  },
  {
    id: "image10",
    src: "images/image-10.jpeg",
  },
  {
    id: "image11",
    src: "images/image-11.jpeg",
  },
];
const App = () => {
  return (
    <main>
      {/* Image Gallery */}
      <Gallery initialData={initialData} />
    </main>
  );
};

export default App;
