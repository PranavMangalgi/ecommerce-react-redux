import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  totalAmountQty,
  removeAllItems,
} from "../features/cartSlice";
import BreadCrumb from "./BreadCrumb";

function Cart() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);

  return (
    <div className="h-screen bg-slate-100">
      <div className=" bg-slate-100">
        <h1 className="p-4 text-2xl font-semibold">
          Cart Items: {state.totalQty}
        </h1>
        <div>
          <BreadCrumb product={"Cart"} />
        </div>
        <div className="mt-20 flex h-full flex-col bg-slate-100">
          {state.addedToCart.length > 0 &&
            state.addedToCart.map((product) => {
              return (
                <div
                  className="m-3 flex flex-col rounded bg-white md:flex-row md:justify-between"
                  key={product.id}
                >
                  <div className="flex justify-between px-2 py-4 md:w-4/5">
                    <div className="self-center text-2xl font-bold text-indigo-600">
                      {product.title}
                    </div>
                    <div className="flex gap-x-12">
                      <div className="flex flex-col">
                        <div className=" font-semibold">Qty</div>
                        <div className="text-center">{product.qty}</div>
                      </div>
                      <div className="flex flex-col">
                        <div className="font-semibold">Price</div>
                        <div className="text-center">${product.totalPrice}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      dispatch(removeItem(product.id));
                      dispatch(totalAmountQty());
                    }}
                    className="rounded bg-rose-600 py-2 font-semibold text-white md:m-4 md:ml-16 md:w-1/6"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <div className="absolute bottom-[1rem] right-[3rem] text-2xl font-bold">
        Total Bill: ${state.totalAmount.toFixed(2)}
      </div>
      {state.addedToCart.length > 1 && (
        <div>
          <button
            className="absolute right-[2rem] top-[4rem] rounded-md bg-rose-500 p-3 font-bold text-white"
            onClick={() => {
              dispatch(removeAllItems());
              dispatch(totalAmountQty());
            }}
          >
            Remove All
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
