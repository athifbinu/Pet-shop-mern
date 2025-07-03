import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
  Heart,
  Share2,
  ChevronRight,
  Package,
  Clock,
} from "lucide-react";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState("description");
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    navigate("/shop");
    return null;
  }

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= 10) setQuantity(newQty);
  };

  const renderStars = (rating, interactive = false, size = 20) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        onClick={interactive ? () => setUserRating(i + 1) : undefined}
        className={`${
          interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
        } transition-transform`}
        disabled={!interactive}
      >
        <Star
          size={size}
          className={`${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : i < rating
              ? "text-yellow-400 fill-yellow-200"
              : "text-gray-300"
          }`}
        />
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-24">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex items-center text-sm text-gray-600 space-x-2 mb-6">
          <span>Home</span>
          <ChevronRight size={16} />
          <span>{product.category}</span>
          <ChevronRight size={16} />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={product.image_url || product.images?.[0]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-600 font-medium">
                {product.brand || "Unknown Brand"}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Heart
                    className={
                      isWishlisted
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400"
                    }
                    size={20}
                  />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="text-gray-400" size={20} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center space-x-2">
              {renderStars(product.rating || 4.5)}
              <span className="text-sm text-gray-600 ml-2">
                {product.rating || 4.5} ({product.reviewCount || 20} reviews)
              </span>
            </div>

            <div className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
              ₹{product.price}
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <span
                className={`text-sm ${
                  product.inStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                <CreditCard size={20} /> Buy Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mt-4">
              <div className="flex items-center gap-2">
                <Truck size={16} /> Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} /> 2 Year Warranty
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} /> 30-Day Returns
              </div>
            </div>
          </div>
        </div>

        {/* Tab Section */}
        <div className="bg-white rounded-xl shadow">
          <nav className="flex border-b">
            {[
              { key: "description", label: "Description", icon: Package },
              { key: "reviews", label: "Reviews", icon: Star },
              { key: "specifications", label: "Specifications", icon: Clock },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium ${
                  activeSection === key
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>

          <div className="p-6">
            {activeSection === "description" && (
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            )}

            {activeSection === "reviews" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                <div className="mb-4">{renderStars(userRating, true, 24)}</div>
                <textarea
                  className="w-full border border-gray-300 rounded p-3 mb-4"
                  rows="4"
                  placeholder="Share your experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                  Submit Review
                </button>
              </div>
            )}

            {activeSection === "specifications" && (
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-3">General</h4>
                  <ul className="space-y-1">
                    <li>
                      <strong>Brand:</strong> {product.brand}
                    </li>
                    <li>
                      <strong>SKU:</strong> {product.sku}
                    </li>
                    <li>
                      <strong>Weight:</strong> {product.weight}
                    </li>
                    <li>
                      <strong>Dimensions:</strong> {product.dimensions}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Manufacturing</h4>
                  <ul className="space-y-1">
                    <li>
                      <strong>Material:</strong> {product.material}
                    </li>
                    <li>
                      <strong>Warranty:</strong> {product.warranty}
                    </li>
                    <li>
                      <strong>Origin:</strong> {product.countryOfOrigin}
                    </li>
                    <li>
                      <strong>Manufacturer:</strong> {product.manufacturer}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* sugested product slider */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
