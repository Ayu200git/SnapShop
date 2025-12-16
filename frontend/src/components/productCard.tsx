import { useAppDispatch } from "../serviceProvider/hook";
import { useSelector } from "react-redux";
import { addToCart } from "../serviceProvider/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../serviceProvider/slices/wishlistSlice";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import type { RootState } from "../serviceProvider/store";
import { buttonClass } from "../theme";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
  onUpdate?: (product: Product) => void;
  onDelete?: () => void;

}

const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const productId = (product._id || product.id)?.toString();
  const isInWishlist = wishlist.some((item) => 
    (item._id || item.id)?.toString() === productId
  );
  const navigate = useNavigate();

  const handleWishlist = () => {
    if (isInWishlist) dispatch(removeFromWishlist(product.id as number));
    else dispatch(addToWishlist(product));
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: (product._id || product.id) as string | number,
        title: product.title,
        price: product.price,
        image: product.image || product.imageUrl || '',
        quantity: 1,
      })
    );
  };

  
  const handleBuyNow = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg p-4 transition hover:shadow-lg">
      <div onClick={handleWishlist} className={`text-sm cursor-pointer`}>
          {isInWishlist ? "❤️" : "♡"}
        </div>
      <Link to={`/products/${productId}`} className="group block w-full">
        <div className="w-full h-40 sm:h-48 md:h-56 flex items-center justify-center">
          <img
            src={product.image || product.imageUrl || ''}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
          />
        </div>
        <h3 className="mt-2 font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-blue-600">
          {product.title}
        </h3>
      </Link>

      <p className="mt-1 text-gray-600 dark:text-gray-300 font-medium">${product.price}</p>

      <div className="mt-auto flex gap-2 justify-between ">
        <button onClick={handleAddToCart} className={`${buttonClass("primary")} text-xs`}>
          Add to Cart
        </button>
         <button  onClick={handleBuyNow} className={`${buttonClass("danger")} text-xs`}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
