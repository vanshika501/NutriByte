import React, { useState , useEffect} from "react";
import { FaArrowRight } from "react-icons/fa";
import {motion, AnimatePresence} from 'framer-motion'

function Recipe() {
  const [query, setQuery] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const [Box, setBox] = useState(false);

  const handleRecipe = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=16679ca5&app_key=43ec9086a00d251b3c9539d7515d27c9`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipe data");
      }
      const jsonData = await response.json();
      if (jsonData.hits && jsonData.hits.length > 0) {
        setRecipeData(jsonData.hits);
      } else {
        setRecipeData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <motion.div initial={{opacity: 0, y:400}} animate={{opacity: 1, y:0}} transition={{duration: 1, type:"spring", damping: 10}} className="">
      <div className="absolute bg-black opacity-50 h-[70vh] w-screen"></div>
      <div
        className="flex flex-col items-center justify-center gap-8 h-[70vh]"
        style={{
          background:
            "url('https://www.thestatesman.com/wp-content/uploads/2021/06/e798191d67a395a164d8ec587e16c5dd.jpg') center no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1
          className="md:text-4xl text-2xl font-medium text-white z-10"
          style={{ textShadow: "2px 1px 1px #fff" }}
        >
          Search for a food item
        </h1>
        <div className="relative">
          <input
            className="rounded-2xl p-4 border-none md:w-[40rem] w-[20rem] outline-none font-medium capitalize"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRecipe();
              }
            }}
            placeholder="Enter recipe name"
          />
          <button
            className="absolute p-4 font-semibold right-0 bg-orange-400 text-white rounded-r-2xl hover:bg-orange-500"
            onClick={handleRecipe}
          >
            Search
          </button>
        </div>
      </div>
      <h1 className="text-center text-2xl mt-4 mb-10 font-medium capitalize">
        Searching Recipes for <span className="underline underline-offset-4">{query}</span>{" "}
      </h1>
      {recipeData.length > 0 && (
        <div className="flex flex-wrap gap-8 justify-center p-4">
          {recipeData.map((recipeItem, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-start bg-white p-4 rounded-2xl gap-8 border-[3px] border-black max-w-[27rem]"
              style={{ boxShadow: "5px 5px 1px #111" }}
            >
              <h2 className="text-2xl font-medium underline underline-offset-8">
                {recipeItem.recipe.label}
              </h2>
              <img
                src={recipeItem.recipe.image}
                alt="Couldn't Load image"
                className="w-full aspect-video h-52 object-cover rounded-lg border-2 border-black"
              />
              <h3 className="text-lg font-medium">
                Calories:{" "}
                <span className="text-orange-500 text-2xl ">
                  {parseFloat(recipeItem.recipe.calories).toFixed(3)+' cal'}
                </span>
              </h3>
              <ul className="flex flex-col gap-2 text-sm marker:text-lg ">
                {recipeItem.recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient.text}</li>
                ))}
              </ul>
              <a
                className="bg-orange-400 text-white p-2 rounded-full w-full flex items-center justify-center gap-4 hover:bg-orange-500"
                href={recipeItem.recipe.url}
                target="_blank"
              >
                Get Recipe
                <FaArrowRight className="-rotate-45 hover:rotate-0 transition-all" />
              </a>
            </div>
          ))}
        </div>
      )}
      <i onClick={()=>{setBox(!Box)}} className="fa-solid fa-cart-shopping fixed z-20 text-black bg-[#ffffffdd] rounded-full p-4 text-3xl bottom-4 right-4 animate-bounce border-2  border-black"></i>
      <AnimatePresence>{Box && <Cart setBox={setBox}/>}</AnimatePresence>
    </motion.div>
  );
}

import emailjs from 'emailjs-com';

function OneCard({ name, count, onCountChange, removeCard }) {
  const [calories, setCalories] = useState(null);
  const [totalCalories, setTotalCalories] = useState(null);

  const handleIncrement = () => {
    onCountChange(name, count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      onCountChange(name, count - 1);
    }
  };

  async function fetchCalories(name) {
    try {
      const response = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${name}`,
        {
          headers: {
            'X-Api-Key': 'vUoq5AUZObTtwVcr9H3ljA==3ctcsriSz64KOM4q',
          },
        }
      );
      const jsonData = await response.json();
      if (jsonData.items && jsonData.items.length > 0) {
        const itemCalories = jsonData.items[0].calories;
        setCalories(itemCalories);
        setTotalCalories(itemCalories * count);
      } else {
        setCalories('Not available');
        setTotalCalories('Not available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setCalories('Error');
      setTotalCalories('Error');
    }
  }

  useEffect(() => {
    fetchCalories(name);
  }, [name]);

  useEffect(() => {
    if (calories !== null && !isNaN(calories)) {
      setTotalCalories(parseFloat(calories * count).toFixed(2));
    }
  }, [count, calories]);

  return (
    <div className="flex md:flex-row flex-col justify-between resize-x items-center md:h-24 h-fit border-2 border-black p-2 rounded-xl" style={{ boxShadow: '3px 3px 0 #000' }}>
      <img
        src="https://imgs.search.brave.com/MDJwyjaByFDJApqmr9zyVcIRz-POyna47PAXJCPdK-w/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU2/OTA2NDYxMC92ZWN0/b3IvZHVzdGJpbi1y/ZWN5Y2xhYmxlLXJl/Y3ljbGluZy1saW5l/LWljb24uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPTBUU0Fo/ZE9tYURJbVZFMHAx/YTlzU1U0X3RRS24y/MjZkMTZMdm55YWpE/S2c9"
        alt="Delete Button"
        className="h-full w-20 aspect-square border-2 border-black rounded-lg bg-[#00000050] cursor-pointer"
        onClick={removeCard}
      />
      <h3 className="text-lg text-black font-medium capitalize">
        {name} <span className="text-orange-500 font-normal text-md">{totalCalories !== null ? `${totalCalories} cal` : 'Loading...'}</span>
      </h3>
      <div className="flex items-center gap-4">
        <button onClick={handleDecrement} className="md:w-12 md:h-12 p-2 bg-red-500 text-white rounded-xl hover:bg-red-600">-</button>
        <p className="font-semibold text-xl">{count}</p>
        <button onClick={handleIncrement} className="md:w-12 md:h-12 p-2 bg-green-500 text-white rounded-xl hover:bg-green-600">+</button>
      </div>
    </div>
  );
}

function Cart({ setBox }) {
  const [items, setItems] = useState([]);

  const addItem = (itemName) => {
    setItems([...items, { name: itemName, count: 1 }]);
  };

  const removeItem = (itemName) => {
    setItems(items.filter((item) => item.name !== itemName));
  };

  const handleCountChange = (itemName, newCount) => {
    setItems(items.map(item => 
      item.name === itemName ? { ...item, count: newCount } : item
    ));
  };

  const handleOrder = () => {
    const emailContent = items.map(item => `${item.name}: ${item.count}`).join('\n');

    const templateParams = {
      message: emailContent,
    };

    emailjs.send('service_auhj9mj', 'template_z5jq0dd', templateParams, '4Gs-b0ZMV-MAzX1XV')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      }, (error) => {
        console.error('Error sending email:', error);
      });
      alert("Order has been placed");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 1, type: 'spring', damping: 10 }}
      className="fixed h-screen px-4 py-2 bg-white rounded-2xl top-0 right-0 z-20 border-[3px] border-black overflow-scroll flex flex-col items-center w-full md:w-[40rem] gap-4"
    >
      <div className="flex justify-between w-full pb-2 items-center">
        <i
          className="fa-solid fa-xmark text-2xl text-red-600 p-2"
          onClick={() => {
            setBox(false);
          }}
        ></i>
        <h1 className="text-4xl font-semibold text-orange-500 text-center">Cart</h1>
        <button
          onClick={handleOrder}
          className="bg-orange-400 text-white font-medium rounded-lg py-2 px-4 hover:bg-orange-500 active:scale-90"
        >
          Order
        </button>
      </div>
        <input
          type="text"
          placeholder="Add Items"
          className="w-full border-2 outline-none border-black p-2 rounded-lg placeholder:text-[#444] text-black mt-2"
          style={{boxShadow: "3px 3px 0 #000"}}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addItem(e.target.value);
              e.target.value = '';
            }
          }}
        />
      <div className="flex flex-col gap-4 mt-6 w-full">
        {items.map((item, index) => (
          <OneCard
            key={index}
            name={item.name}
            count={item.count}
            onCountChange={handleCountChange}
            removeCard={() => removeItem(item.name)}
          />
        ))}
      </div>
    </motion.div>
  );
}


export default Recipe;