import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu8kaD1TTMxAntdvGeiLPibPtJiVOth6U",
  authDomain: "tanishq-final-fee.firebaseapp.com",
  databaseURL: "https://tanishq-final-fee-default-rtdb.firebaseio.com",
  projectId: "tanishq-final-fee",
  storageBucket: "tanishq-final-fee.appspot.com",
  messagingSenderId: "1001244988298",
  appId: "1:1001244988298:web:729b1bb97d858dc07a6e73",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Front = ({ days, meals, username }) => {
  const [inputs, setInputs] = useState(
    Array.from({ length: days }, () => Array(meals).fill(""))
  );

  const handleInputChange = (dayIndex, mealIndex, value) => {
    const newInputs = inputs.map((day, i) =>
      day.map((meal, j) => (i === dayIndex && j === mealIndex ? value : meal))
    );
    setInputs(newInputs);
  };

  const handleSave = () => {
    const db = getDatabase();
    set(ref(db, `users/${username}/mealPlanner/`), {
      days: inputs,
    });
    alert("Your meal plan is successfully saved");
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-4">
      {Array.from({ length: days }, (_, i) => (
        <div
          key={i}
          className="flex gap-4 bg-[#1C6758] rounded-xl p-4 max-w-96 justify-center"
        >
          <label className="flex flex-col gap-4 items-center">
            <div className="flex justify-between w-full">
              <h2 className="text-2xl font-medium text-[#fbfada]">
                Day {i + 1}:
              </h2>
            </div>
            {Array.from({ length: meals }, (_, j) => (
              <InputCard
                key={j}
                j={j}
                dayIndex={i}
                mealIndex={j}
                value={inputs[i][j]}
                onInputChange={handleInputChange}
              />
            ))}
          </label>
        </div>
      ))}
      <button onClick={handleSave} className="bg-orange-400 hover:bg-orange-500 h-full w-full text-white py-5 text-xl font-medium uppercase">Save</button>
    </div>
  );
};

const InputCard = ({ j, dayIndex, mealIndex, value, onInputChange }) => {
  const [inputText, setInputText] = useState(value);
  const [isButton, setButton] = useState(false);
  const [box, setBox] = useState(false);
  const [nutrition, setNutrition] = useState(null);

  useEffect(() => {
    if (!inputText) setButton(false);
    else setButton(true);
  }, [inputText]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
        {
          headers: {
            "X-Api-Key": "vUoq5AUZObTtwVcr9H3ljA==3ctcsriSz64KOM4q",
          },
        }
      );
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <React.Fragment>
      <div
        key={j}
        className="bg-[#eef2e6] rounded-lg relative overflow-hidden p-2 w-full"
      >
        <label>
          <h4 className="text-lg">Meal {j + 1}:</h4>
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            onInputChange(dayIndex, mealIndex, e.target.value);
          }}
          className="w-full border-none outline-none p-2 text-xl text-orange-500 bg-transparent font-semibold uppercase"
        />
        <AnimatePresence>
          {isButton && (
            <motion.button
              onClick={() => {
                setBox(true);
                handleSearch(inputText).then((jsonData) =>
                  setNutrition(jsonData)
                );
              }}
              animate={{ x: 0 }}
              initial={{ x: 100 }}
              exit={{ x: 100 }}
              transition={{ duration: 0.05, ease: [0.85, 0, 0.15, 1] }}
              className="absolute top-0 right-0 text-white p-4 h-full bg-[#ffa60090]"
            >
              <CiLocationArrow1 size={25} />
            </motion.button>
          )}
        </AnimatePresence>
        {box && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              exit={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
              className="fixed w-screen h-full rounded-2xl z-30 p-4 bg-[#fbfadaee] backdrop-blur-sm border-[3px] border-[#12372a] top-0 right-0 overflow-scroll"
            >
              <div className="flex justify-around">
                <FaArrowRight
                  className="p-2 w-10 h-10 bg-[#1c6758] text-[2rem] rounded-full text-[#fbfada] cursor-pointer"
                  onClick={() => {
                    setBox(false);
                  }}
                />
                <h1 className="text-4xl text-center font-medium mb-12">
                  Nutritional Values
                  <span className="text-orange-400 font-bold capitalize">
                    {" { "}
                    {inputText} {"}"}
                  </span>
                </h1>
              </div>
              <div className="flex gap-4 justify-center flex-wrap rounded-2xl">
                {nutrition && nutrition.items && nutrition.items.length > 0 ? (
                  nutrition.items.map((item, index) => (
                    <div
                      key={index}
                      style={{ boxShadow: "4px 4px 1px #333" }}
                      className="flex flex-col gap-4 max-w-80 rounded-2xl bg-white border-[3px] border-[#12372a] p-4"
                    >
                      <h2 className="text-xl font-medium underline underline-offset-4">
                        Nutrition Content{" "}
                        <span className="text-xs text-black">(per 100g)</span>
                      </h2>
                      <h3 className="text-2xl font-bold text-center uppercase">
                        {item.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-left">
                          Total Calories:<span className="text-xs"> (cal)</span>
                        </h3>
                        <span className="text-2xl text-orange-500 font-medium text-right">
                          {item.calories}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-left">
                          Proteins:<span className="text-xs"> (g)</span>
                        </h3>
                        <span className="text-2xl text-orange-500 font-medium text-right">
                          {item.protein_g}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-left">
                          Fats:<span className="text-xs"> (g)</span>
                        </h3>
                        <span className="text-2xl text-orange-500 font-medium text-right">
                          {item.fat_total_g}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-left">
                          Carbohydrates: <span className="text-xs"> (g)</span>
                        </h3>
                        <span className="text-2xl text-orange-500 font-medium text-right">
                          {item.carbohydrates_total_g}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-left">
                          Fiber:<span className="text-xs"> (g)</span>
                        </h3>
                        <span className="text-2xl text-orange-500 font-medium text-right">
                          {item.fiber_g}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-left">
                          Sugar: <span className="text-xs"> (g)</span>
                        </h3>
                        <span className="text-2xl text-orange-500 font-medium text-right">
                          {item.sugar_g}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2 className="text-xl font-medium text-red-500">
                    No Data Found, Kindly check for any spelling mistakes...
                  </h2>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </React.Fragment>
  );
};

const MealForm = () => {
  const [days, setDays] = useState(2);
  const [meals, setMeals] = useState(2);
  const [display, setDisplay] = useState(false);
  const username = localStorage.getItem("username");

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring", damping: 10 }}
      className="relative top-24"
    >
      <h1 className="text-5xl font-semibold text-center mb-10">
        Meal Planner{" "}
        <span className="text-lg font-medium">
        (Target Calories: {localStorage.getItem("totalCalories") !== null
            ? `${localStorage.getItem("totalCalories")} cal`
            : "Use Calculator"})
        </span>
      </h1>
      <div className="flex flex-col p-4 gap-10 items-center ">
        <div className="flex flex-col gap-1 bg-[#1c6758] p-4 rounded-2xl md:w-[30rem] w-[20rem]">
          <label className="text-lg font-medium text-left text-[#eef2e6]">
            Number of days:
          </label>
          <input
            className="text-[#12372a] text-xl p-2 bg-[#eef2e6] rounded-lg outline-none "
            type="number"
            min={1}
            max={31}
            value={days}
            onChange={(event) => setDays(parseInt(event.target.value))}
          />
          <label className="text-lg font-medium text-left mt-4 text-[#eef2e6]">
            Number of Meals in a day:
          </label>
          <input
            className="text-[#12372a] text-xl p-2 bg-[#eef2e6] rounded-lg outline-none "
            type="number"
            min={1}
            max={31}
            value={meals}
            onChange={(event) => setMeals(parseInt(event.target.value))}
          />
          <button
            onClick={() => {
              setDisplay(true);
            }}
            className="bg-orange-400 text-white font-medium rounded-full p-4 mt-4 hover:bg-orange-500"
          >
            Generate Template
          </button>
        </div>
        <h1 className="text-4xl text-center opacity-50 font-medium cursor-default">
          Plan your meals in advance
        </h1>
      </div>
      {display && <Front days={days} meals={meals} username={username} />}
    </motion.div>
  );
};

export default MealForm;
