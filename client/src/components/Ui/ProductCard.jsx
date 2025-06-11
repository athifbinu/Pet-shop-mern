const ProductCard = ({ item }) => {
  return (
    <div className="relative m-3 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="object-cover w-full"
          src={item.image_url}
          alt={item.name}
        />
      </div>
      <div className="px-5 pb-5">
        <h5 className="text-xl tracking-tight text-slate-900">{item.name}</h5>
        <div className="mb-2 flex items-center gap-1">
          <p>
            <span className="text-2xl font-bold text-slate-900">
              ₹{item.price}
            </span>
          </p>
        </div>
        <button className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-white hover:bg-gray-700">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
