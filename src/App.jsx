import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetailPage from "./components/ProductDetailPage";
import ProductUpdate from "./components/ProductUpdate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
        <Route path="/update/:id" element={<ProductUpdate />} />
      </Routes>
    </>
  );
}

export default App;
