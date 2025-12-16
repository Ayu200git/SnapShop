import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../serviceProvider/hook";
import { fetchProducts } from "../serviceProvider/slices/productSlice";
import { addToCart } from "../serviceProvider/slices/cartSlice";
import ProductCard from "../components/productCard";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.products);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState<boolean>(false);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  const product = items.find((p) => 
    (p._id || p.id)?.toString() === id?.toString()
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;
  const related = items
    .filter((p) => 
      p.category === product.category && 
      (p._id || p.id)?.toString() !== (product._id || product.id)?.toString()
    )
    .slice(0, 4);
 
  const handleProceedToCheckout = () => {
    dispatch(
      addToCart({
        id: (product._id || product.id) as string | number,
        title: product.title,
        price: product.price,
        image: product.image || product.imageUrl || '',
        quantity: 1,
      })
    );
    navigate("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div
            className="border rounded-lg overflow-hidden relative"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <img
              src={selectedImage || product.image || product.imageUrl || ''}
              alt={product.title}
              className={`w-full h-96 object-contain transition-transform duration-300 ${
                zoom ? "scale-110" : "scale-100"
              }`}
            />
          </div>

          <div className="flex mt-4 space-x-3 justify-center">
            {[(product.image || product.imageUrl || ''), ...(product.gallery || [])].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                className={`w-16 h-16 object-contain border rounded-lg cursor-pointer ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-yellow-500 mb-4">{product.category}</p>

          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="ml-1 font-medium">
              {product.rating?.rate?.toFixed(1) || "N/A"} / 5
            </span>
            <span className="text-white-500 text-sm ml-2">
              ({product.rating?.count || 0} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-green-600 mb-4">
            ${product.price}
          </p>

          <p className="text-whiteSmoke-500 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleProceedToCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/products"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          ← Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
