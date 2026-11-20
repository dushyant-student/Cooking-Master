
import React, { useState } from "react";

export default function RecipeDetail({ aboutData }) {
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [checkedSteps, setCheckedSteps] = useState([]);
  
  const ingredients = aboutData?.ingredients?.split(",").filter((item) => item.trim());
  const instructions = aboutData?.recipieDescription?.split(/[,;\n]+/).map((item) => item.trim()).filter(Boolean);


  const toggleItem = (index, setter) => {
    setter((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };


  return (
    <div className="w-full space-y-8">
      <div className="bg-white rounded-2xl shadow-md p-6 border">

        <h2 className="text-3xl font-bold mb-5">
          🥗 Ingredients
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ingredients?.map((item, index) => {
            const isChecked = checkedIngredients.includes(index);

            return (
              <li key={index} className="bg-green-50 p-4 rounded-xl border border-green-200" >
                <label className="flex items-start gap-3 cursor-pointer">

                  <input type="checkbox" checked={isChecked} onChange={() => toggleItem(index, setCheckedIngredients) }
                    className="mt-1 accent-green-600"
                  />

                  <span className={isChecked
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                  }>
                    {item.trim()}
                  </span>

                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-2xl shadow-md p-6 border">

        <h2 className="text-2xl font-bold mb-5">
          👨‍🍳 Recipe Instructions
        </h2>

        <div className="space-y-4">
          {instructions?.map((item, index) => {
            const isChecked = checkedSteps.includes(index);

            return (
              <div
                key={index}
                className={`flex gap-4 items-start p-4 rounded-xl border transition-all duration-300
                  ${isChecked
                    ? "bg-green-100 border-green-300"
                    : "bg-green-50 border-green-200 hover:bg-green-100"
                  }`}
              >

                {/* Step Number */}
                <div className={`w-10 h-10 shrink-0 rounded-full text-white flex items-center justify-center font-bold
                  ${isChecked ? "bg-gray-400" : "bg-green-600"}
                `}>
                  {index + 1}
                </div>

                {/* Step Content */}
                <label className="flex gap-3 items-start flex-1 cursor-pointer">

                  <input type="checkbox" checked={isChecked}
                    onChange={() =>
                      toggleItem(index, setCheckedSteps)
                    }
                    className="mt-1 accent-green-600"
                  />

                  <span className={`text-base leading-7
                    ${isChecked
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                    }`}>
                    {item.trim()}
                  </span>

                </label>

              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}
