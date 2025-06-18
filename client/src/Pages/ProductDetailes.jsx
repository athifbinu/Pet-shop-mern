// ProductDetailes.js
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetailes = () => {
  const [activeSection, setActiveSection] = useState("description");
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-500">
        Product not found.
        <br />
        <Link to="/" className="text-blue-500 underline">
          Go to Home
        </Link>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="mt-8">
      <div className="container mx-auto p-5">
        <div className="md:flex justify-center mb-10">
          <div className="md:w-6/12 p-5">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-80 object-cover rounded"
            />
          </div>

          <div className="md:w-6/12 p-5">
            <h1 className="text-black font-bold text-3xl mb-3">
              {product.name}
            </h1>
            <p className="text-xl text-orange-500 font-semibold mb-3">
              ₹{product.price}
            </p>
            <p className="text-gray-700 mb-4">
              {product.description || "No description available."}
            </p>

            <div className="flex gap-4 mb-4">
              <button className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600">
                Add to Cart
              </button>
              <Link to="/checkout">
                <button className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <div className="grid md:grid-cols-3 gap-4">
            <div
              className={`p-4 border shadow text-center cursor-pointer ${
                activeSection === "description" ? "bg-gray-100" : ""
              }`}
              onClick={() => setActiveSection("description")}
            >
              <h2 className="font-semibold">Description</h2>
            </div>
            <div
              className={`p-4 border shadow text-center cursor-pointer ${
                activeSection === "review" ? "bg-gray-100" : ""
              }`}
              onClick={() => setActiveSection("review")}
            >
              <h2 className="font-semibold">Review</h2>
            </div>
            <div
              className={`p-4 border shadow text-center cursor-pointer ${
                activeSection === "manufacture" ? "bg-gray-100" : ""
              }`}
              onClick={() => setActiveSection("manufacture")}
            >
              <h2 className="font-semibold">Manufacture Details</h2>
            </div>
          </div>

          <div className="border p-4 mt-4 rounded shadow-lg">
            {activeSection === "description" && (
              <div>
                <p>
                  {product.description || "No product description provided."}
                </p>
              </div>
            )}

            {activeSection === "review" && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
                <div className="flex gap-2 text-yellow-500 mb-3">
                  {[...Array(5)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleStarClick(index)}
                      className="focus:outline-none"
                    >
                      <BsFillStarFill
                        size={24}
                        className={
                          index < rating ? "text-yellow-500" : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="Write your review..."
                ></textarea>
                <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded">
                  Submit Review
                </button>
              </div>
            )}

            {activeSection === "manufacture" && (
              <div>
                <p className="text-gray-600">Country of origin: India</p>
                <p className="text-gray-600">
                  Manufacturer: Mars Petcare (Example)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailes;
