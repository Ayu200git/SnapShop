import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../serviceProvider/hook";
import {
  fetchProducts,
  setCategory,
  setSortBy,
  addProduct,
  // updateProduct,
  // deleteProduct,
} from "../serviceProvider/slices/productSlice";
import ProductCard from "../components/productCard";
import type { Product } from "../types/product";

const Products = () => {
  const dispatch = useAppDispatch();
  const { filtered, loading, error, category, sortBy, items } = useAppSelector(
    (state) => state.products
  );

  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const uniqueCategories = ["all", ...Array.from(new Set(items.map((p) => p.category)))];

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.category) return;
    dispatch(addProduct(newProduct));
    setNewProduct({
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: { rate: 0, count: 0 },
    });
  };

  // const handleUpdateProduct = (product: Product) => {
  //   dispatch(updateProduct(product));
  // };

  // const handleDeleteProduct = (id: number) => {
  //   dispatch(deleteProduct(id));
  // };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 overflow-x-hidden">
      <div className="mb-6">
        <h3 className="font-medium text-sm mb-2">Category:</h3>
        <div className="overflow-x-auto w-full">
          <div className="flex gap-4 min-w-max">
            {uniqueCategories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => dispatch(setCategory(cat))}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded cursor-pointer border shrink-0
                  ${category === cat
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300"}
                `}
              >
                <span className="w-10 h-10 bg-gray-400 rounded-full shrink-0"></span>
                <span className="text-xs text-center">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-6">
        <label htmlFor="sort" className="font-medium text-sm mb-1 sm:mb-0">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) =>
            dispatch(setSortBy(e.target.value as "priceLow" | "priceHigh" | "rating" | "none"))
          }
          className="border border-gray-300 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded px-3 py-1 text-sm focus:outline-none focus:ring cursor-pointer w-full sm:w-auto"
        >
          <option value="none">Default</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[500px]">
        {filtered.length > 0 ? (
          filtered.map((product) => <ProductCard key={product.id} product={product}/*product={product} onUpdate={(p) => dispatch(updateProduct(p))}
               onDelete={() => dispatch(deleteProduct(product.id))} *//>)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 py-20">
            <p className="text-lg font-medium">No products found.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Add New Product</h2>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 flex-1"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            className="border border-gray-300 rounded px-2 py-1 w-full md:w-24"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 w-full md:w-32"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 w-full md:w-auto"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
