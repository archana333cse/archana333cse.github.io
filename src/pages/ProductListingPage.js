import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function ProductListingPage({ user }) {
  const { mainCategory, subCategory, childCategory } = useParams();

  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);

  // ✅ Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [mainCategory, subCategory, childCategory]);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          page,
          limit: 8,
        };

        if (mainCategory) params.mainCategory = mainCategory;
        if (subCategory) params.subCategory = subCategory;
        if (childCategory) params.childCategory = childCategory;
        if (sortOption) params.sort = sortOption;

        const res = await axios.get("http://localhost:5000/products", {
          params,
        });

        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [mainCategory, subCategory, childCategory, sortOption, page]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
       <h1 className="text-2xl font-bold">
  {mainCategory}
  {subCategory && ` / ${subCategory}`}
  {childCategory && ` / ${childCategory}`}
</h1>

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} user={user} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-6 mt-10">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-6 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">Page {page}</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-6 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}