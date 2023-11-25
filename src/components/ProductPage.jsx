import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { fetchProducts } from "../features/fetchSlice";
import { addItem } from "../features/cartSlice";
import BreadCrumb from "./BreadCrumb";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const state = useSelector((state) => state.fetchStore);
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (state.data) {
      const obj = state.data.find((prod) => prod.id == id);

      setProduct(obj);
    } else {
      dispatch(fetchProducts());
    }
  }, [id, state.data, dispatch]);

  function handleClick() {
    const obj = {
      id: product.id,
      title: product.title,
      qty: qty,
      totalPrice: qty * product.price,
    };
    dispatch(addItem(obj));
    toast(`added ${qty} items of ${product.title} to cart `);
  }

  return (
    <>
      <div className="h-screen md:overflow-hidden">
        <Link to="/">
          <h1 className="cursor-pointer pl-6 pt-4 text-3xl font-semibold text-indigo-500">
            Redux Store
          </h1>
        </Link>
        <div>
          <BreadCrumb product={product?.title} />
        </div>
        {product && (
          <div className="md:align-center gap-x-24 pb-20 md:mt-[-4rem] md:flex md:h-screen md:justify-center md:p-10">
            <div className="m-4  rounded-lg border-2 border-slate-400 p-4 md:h-4/6 md:w-2/6 md:self-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full"
              />
            </div>

            <div className="flex flex-col gap-6 p-6 md:mt-[-2rem] md:w-2/5 md:self-center">
              <div className="text-2xl font-medium">{product.title}</div>
              <div className="text-3xl font-semibold text-indigo-600">
                ${product.price}
              </div>
              <div className="mt-2 text-lg">{product.description}</div>

              <div className="mx-auto flex gap-2 text-2xl md:mx-0">
                <div className="self-center font-semibold">Qty :</div>
                <div className="align-center flex flex-col justify-center ">
                  <div
                    onClick={() => setQty((qty) => qty + 1)}
                    className="cursor-pointer text-indigo-400 hover:text-indigo-600"
                  >
                    <IoIosArrowUp />
                  </div>
                  <div className=" coursor-none text-indigo-600">{qty}</div>
                  <div
                    onClick={() => {
                      if (qty > 1) {
                        setQty((qty) => qty - 1);
                      }
                    }}
                    className="cursor-pointer text-indigo-400 hover:text-indigo-600"
                  >
                    <IoIosArrowDown />
                  </div>
                </div>
              </div>

              <button
                className="mx-6 mt-3 cursor-pointer rounded-md bg-indigo-500 p-3 text-lg font-semibold text-white outline-none duration-200  hover:bg-indigo-600 md:w-auto md:mx-20"
                onClick={handleClick}
              >
                Add to Cart
              </button>
              <ToastContainer />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductPage;
