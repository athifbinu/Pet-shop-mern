import React, { useState, useRef } from "react";
import { ImSpinner } from "react-icons/im";
import { supabase } from "../../components/supabase/supabaseClient.js"; // adjust path if needed

const categoryOptions = {
  "Shop pets": ["Dog", "Cat", "Fish", "Birds", "Rabbit", "Others"],
  Pharmacy: ["Dog Medicine", "Cat Medicine", "Supplements", "Vitamins"],
  Toys: ["Chew Toys", "Interactive Toys", "Balls"],
  Grooming: ["Shampoos", "Combs", "Nail Clippers"],
  Cages: ["Bird Cages", "Dog Crates", "Cat Carriers"],
};

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please upload an image.");
    setLoading(true);

    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase.from("products").insert([
        {
          name: productName,
          price: Number(price),
          category,
          subcategory: subCategory,
          description,
          image_url: publicUrlData.publicUrl,
        },
      ]);

      if (insertError) throw insertError;

      alert("Product added successfully!");

      // Reset form
      setProductName("");
      setPrice("");
      setCategory("");
      setSubCategory("");
      setDescription("");
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Reset file input
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 border rounded"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <select
          className="w-full p-3 border rounded"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubCategory("");
          }}
          required
        >
          <option value="">Mane Category</option>
          {Object.keys(categoryOptions).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {category && categoryOptions[category] && (
          <select
            className="w-full p-3 border rounded"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            required
          >
            <option value="">Select Subcategory</option>
            {categoryOptions[category].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}

        <textarea
          placeholder="Product Description"
          className="w-full p-3 border rounded h-28"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full"
          required
          ref={fileInputRef}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-bold text-lg"
        >
          {loading ? (
            <>
              <ImSpinner className="animate-spin inline-block mr-2" />
              Uploading...
            </>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
