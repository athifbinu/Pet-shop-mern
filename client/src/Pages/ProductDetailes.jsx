import React, { useState } from "react";
import {
  Star,
  ShoppingCart,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Package,
  Clock,
} from "lucide-react";

const ProductDetails = () => {
  const [activeSection, setActiveSection] = useState("description");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and premium comfort design.",
    images: [
      "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1649772/pexels-photo-1649772.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    category: "Electronics",
    brand: "AudioTech",
    sku: "AT-WH-001",
    weight: "250g",
    dimensions: "20 x 18 x 8 cm",
    material: "Premium Plastic & Metal",
    warranty: "2 Years",
    countryOfOrigin: "Germany",
    manufacturer: "AudioTech GmbH",
  };

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const renderStars = (rating, interactive = false, size = 20) => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        onClick={interactive ? () => handleStarClick(index + 1) : undefined}
        className={`${
          interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
        } transition-transform`}
        disabled={!interactive}
      >
        <Star
          size={size}
          className={`${
            index < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : index < rating
              ? "text-yellow-400 fill-yellow-200"
              : "text-gray-300"
          }`}
        />
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 space-x-2 mb-6">
          <span>Home</span>
          <ChevronRight size={16} />
          <span>{product.category}</span>
          <ChevronRight size={16} />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Images */}
          <div>
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex space-x-2 mt-4 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`w-16 h-16 border-2 rounded-lg overflow-hidden ${
                    selectedImageIndex === i
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-600 font-medium">
                {product.brand}
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
              {renderStars(product.rating)}
              <span className="text-sm text-gray-600 ml-2">
                {product.rating} ({product.reviewCount} reviews)
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
              <button
                disabled={!product.inStock}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button
                disabled={!product.inStock}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
