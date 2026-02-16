import { useNavigate } from "react-router-dom";

const categories = [
  "Men",
  "Women",
  "Kids",
  "Boys",
  "Girls",
  "Electronics"
];

export default function MainCategorySection() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => navigate(`/${cat}`)}   // ✅ FIXED
            className="px-6 py-2 bg-gray-100 rounded-full hover:bg-blue-600 hover:text-white transition font-medium"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}