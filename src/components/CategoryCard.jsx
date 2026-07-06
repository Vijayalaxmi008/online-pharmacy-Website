import React from "react";
import {
  Pill,
  BadgePercent,
  HeartPulse,
  ShieldPlus,
  Sparkles,
  Baby,
  ScanEye,
  Brush,
  PawPrint,
  Stethoscope,
} from "lucide-react";

const categories = [
  { name: "Medicines", icon: Pill },
  { name: "Offers", icon: BadgePercent },
  { name: "Vitamins & Supplements", icon: HeartPulse },
  { name: "COVID-19", icon: ShieldPlus },
  { name: "Beauty", icon: Sparkles },
  { name: "Mother & Child", icon: Baby },
  { name: "Contact Lenses", icon: ScanEye },
  { name: "Hygiene", icon: Brush },
  { name: "Pet Care", icon: PawPrint },
  { name: "Medical Equipment", icon: Stethoscope },
];

const CategoryCard = () => {
  return (
    <section className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-28 h-28 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <Icon className="w-7 h-7 text-green-600 mb-2" />

                <p className="text-xs text-center font-medium text-gray-700 px-2">
                  {category.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryCard;