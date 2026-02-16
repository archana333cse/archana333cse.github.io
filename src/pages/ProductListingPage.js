import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function ProductListingPage({ user }) {
  const { mainCategory, subCategory, childCategory } = useParams();

  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);

  // Reset page on category change
  useEffect(() => {
    setPage(1);
  }, [mainCategory, subCategory, childCategory]);

  // ================= FETCH SUBCATEGORIES =================
  useEffect(() => {
    if (!mainCategory) return;

    axios
      .get("http://localhost:5000/categories", {
        params: { mainCategory },
      })
      .then((res) => {
        setSubCategories(res.data.subCategories || []);
      })
      .catch(console.error);
  }, [mainCategory]);

  // ================= FETCH CHILD CATEGORIES =================
  useEffect(() => {
    if (!mainCategory || !subCategory) return;

    axios
      .get("http://localhost:5000/categories", {
        params: { mainCategory, subCategory },
      })
      .then((res) => {
        setChildCategories(res.data.childCategories || []);
      })
      .catch(console.error);
  }, [mainCategory, subCategory]);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const params = {
      page,
      limit: 8,
    };

    if (mainCategory) params.mainCategory = mainCategory;
    if (subCategory) params.subCategory = subCategory;
    if (childCategory) params.childCategory = childCategory;
    if (sortOption) params.sort = sortOption;

    axios
      .get("http://localhost:5000/products", { params })
      .then((res) => {
        setProducts(res.data || []);
      })
      .catch(console.error);
  }, [mainCategory, subCategory, childCategory, sortOption, page]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex gap-8">

        {/* ================= SIDEBAR ================= */}
        <div className="w-1/4 bg-white p-6 rounded shadow">
          <h2 className="font-bold text-lg mb-4 capitalize">
            {mainCategory}
          </h2>

          {subCategories.map((sub) => (
            <div key={sub} className="mb-3">
              <Link
                to={`/${mainCategory}/${sub}`}
                className={`block ${
                  subCategory === sub
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {sub}
              </Link>

              {/* Child Categories */}
              {subCategory === sub &&
                childCategories.map((child) => (
                  <div key={child} className="ml-4 mt-1">
                    <Link
                      to={`/${mainCategory}/${sub}/${child}`}
                      className={`block ${
                        childCategory === child
                          ? "text-blue-600 font-medium"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {child}
                    </Link>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold capitalize">
              {mainCategory}
              {subCategory && ` / ${subCategory}`}
              {childCategory && ` / ${childCategory}`}
            </h1>

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

          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  user={user}
                />
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
      </div>
    </div>
  );
}
