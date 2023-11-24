import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductPage from "./components/ProductPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
