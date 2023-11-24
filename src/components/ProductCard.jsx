
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function Card({ product }) {
  return (
    <div key={product.id} className="group rounded-lg bg-white p-4 shadow-lg">
      <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-white ">
        <img
          src={product.image}
          alt={product.title}
          className="mx-auto h-32 object-cover object-center group-hover:opacity-75 "
        />
      </div>
      <div className="align-center flex flex-col items-center justify-center">
        <h3 className="mb-2 mt-4 text-sm font-semibold text-gray-900">
          {product.title}
        </h3>
        <p className="mb-2 mt-1 text-lg font-medium text-gray-900 ">
          ${product.price}
        </p>
        <Link
          to={{
            pathname: `/products/${product.id}`,
          }}
          key={product.id}
        >
          <button className="mt-2 rounded-md bg-indigo-600 p-2 text-sm font-semibold text-white">
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
