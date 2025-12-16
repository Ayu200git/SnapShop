import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../serviceProvider/hook";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../serviceProvider/slices/productSlice";
import type { Product } from "../types/product";
import ManageProductCard from "../components/manageProductsCard";

const ManageProducts = () => {
  const dispatch = useAppDispatch();
  const { filtered, loading, error } = useAppSelector(
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

  const handleUpdateProduct = (product: Product) => {
    dispatch(updateProduct(product));
  };

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 overflow-x-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[500px]">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ManageProductCard
              key={product.id}
              product={product}
              onUpdate={(p) => handleUpdateProduct(p)}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          ))
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

export default ManageProducts;
