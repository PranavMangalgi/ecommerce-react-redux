import { useEffect, useState } from "react";
import Card from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/fetchSlice";
import { totalAmountQty } from "../features/cartSlice";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState(null);
  const state = useSelector((state) => state.fetchStore);
  const { totalQty, addedToCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts(state.data);
  }, [state.data]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(totalAmountQty());
  }, [dispatch]);

  useEffect(() => {
    console.log(addedToCart);
  }, [addedToCart]);

  return (
    <div className="h-screen bg-slate-50">
      <div className=" font-semibold ">
        <div className=" align-center flex flex-col justify-between gap-y-3 p-4 text-indigo-500 md:flex-row">
          <h1 className="text-semibold cursor-pointer text-3xl">Redux Store</h1>
          <div className="text-2xl md:flex md:gap-x-8 md:self-center">
            <Link to="/cart">
              <div className="cursor-pointer text-xl hover:text-indigo-700">
                Cart
              </div>
            </Link>
            <div className="text-xl font-semibold text-black">
              Cart Items: <span>{totalQty}</span>
            </div>
          </div>
        </div>

        <h2 className="mt-4 px-4 text-2xl">Welcome to the Redux Store</h2>
      </div>

      {state.isLoading ? (
        <h1 className="ml-4 mt-6 text-2xl">Loading....</h1>
      ) : (
        <div className="bg-slate-50">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products?.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
