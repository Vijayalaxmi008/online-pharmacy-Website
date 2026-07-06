import React from "react";

import arbidol from "../assets/images/products/arbidol.png";
import desmoxan from "../assets/images/products/desmoxan.png";
import bifiform from "../assets/images/products/bifiform.png";

const products = [
  {
    id: 1,
    image: bifiform,
    title: "Nature's Bounty Skin, Hair & Nails",
    price: "₹244",
    badge: "HOT",
  },
  {
    id: 2,
    image: arbidol,
    title: "Arbidol - Cold & Flu Tablets",
    price: "₹145",
    badge: "HOT",
  },
  {
    id: 3,
    image: desmoxan,
    title: "Desmoxan - Quit Smoking Tablets",
    price: "₹444",
    badge: "HOT",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl bg-white shadow-sm hover:shadow-lg transition duration-300 p-5"
            >
              <span className="inline-block bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {product.badge}
              </span>

              <div className="mt-4 flex justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 object-contain"
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-800">
                {product.title}
              </h3>

              <p className="mt-3 text-2xl font-bold text-green-600">
                {product.price}
              </p>

              <button className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
                View Product
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;