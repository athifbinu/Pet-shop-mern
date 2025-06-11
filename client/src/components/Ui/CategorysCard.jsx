import test from "../../assets/categoys/7413369.png";
import test1 from "../../assets/categoys/7413371.png";
import React, { useEffect, useState } from "react";
import { supabase } from "../../components/supabase/supabaseClient"; // adjust path
import { Link } from "react-router-dom";

const CategorysCard = ({ filterCategory, filterSubCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = supabase.from("products").select("*");

        if (filterCategory) {
          query = query.eq("category", filterCategory);
        }

        if (filterSubCategory) {
          query = query.eq("subcategory", filterSubCategory);
        }

        const { data, error } = await query;

        if (error) throw error;

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filterCategory, filterSubCategory]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white"
        >
          <Link to="/shop">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
          </Link>
          <h3 className="mt-3 font-bold text-lg">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.subcategory}</p>
          <p className="text-orange-500 font-bold">₹{product.price}</p>
          <p className="text-sm mt-2 text-gray-700">{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CategorysCard;
