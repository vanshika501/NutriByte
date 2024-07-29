import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import Logo from "../logo.png";
import PopLogin from "./poplogin";
import Calculator from "./calculator";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

function Navbar() {
  const [Drop, setDrop] = useState(false);

  if (!localStorage.getItem("username")) {
    localStorage.setItem("username", "Username");
  }
  const [form, setForm] = useState(false);
  const [isCalculator, setCalculator] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const [user, setUser] = useState("Username");

  const setButtonText = (text) => {
    setUser(text);
  };

  useEffect(() => {
    if (localStorage.getItem("username") !== "Username") {
      setUser(localStorage.getItem("username"));
      setClicked(true);
    }
  }, []);

  useEffect(() => {
    if (isClicked) {
      setUser(localStorage.getItem("username"));
    }
  }, [isClicked, form, user]);

  const handleButtonClick = () => {
    if (isClicked) {
      const confirmLogout = confirm("Do You Want to Logout?");
      if (confirmLogout) {
        localStorage.clear();
        window.location.reload();
      }
    } else {
      setClicked(true);
      setForm(!form);
    }
  };

  return (
    <React.Fragment>
      <div>
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="z-20 fixed w-full h:10 md:h-20 flex items-center justify-center gap-24 py-1 bg-[#eef2e6]"
        >
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="h-[4.5rem] rounded-md w-full" />
          </NavLink>
          <motion.ul className="lg:flex hidden lg:gap-24 justify-around">
            <motion.li
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setCalculator(true)}
              className={"relative font-medium text-[1.2rem] cursor-pointer"}
            >
              Calculator
              <div className="absolute bg-[#1c6758] h-1 w-0 rounded under"></div>
            </motion.li>
            <motion.li
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <NavLink
                to="/mealForm"
                className={({ isActive }) =>
                  `relative font-medium text-[1.2rem] cursor-pointer ${
                    isActive ? "text-orange-500" : ""
                  }`
                }
              >
                Meal Planner
                <div className="absolute bg-[#1c6758] h-1 w-0 rounded under"></div>
              </NavLink>
            </motion.li>
            <motion.li
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <NavLink
                to="/recipe"
                className={({ isActive }) =>
                  `relative font-medium text-[1.2rem] cursor-pointer ${
                    isActive ? "text-orange-500" : ""
                  }`
                }
              >
                Get Recipes
                <div className="absolute bg-[#1c6758] h-1 w-0 rounded under"></div>
              </NavLink>
            </motion.li>
          </motion.ul>
          <button
            onClick={handleButtonClick}
            className="border-none outline-none bg-orange-500 text-white h-full px-8 text-sm rounded-full font-medium opacity-80 hover:opacity-100 hidden md:block"
          >
            {isClicked ? <span>{user}</span> : <span>Get Started</span>}
          </button>

          <div className="">
            <IoMenu
              className="lg:hidden text-5xl relative"
              onClick={() => setDrop(!Drop)}
            />
            {Drop && (
              <ul className="bg-[#1c6758] text-[#fbfada] text-sm absolute right-5 rounded-lg top-20 w-36">
                <li className="py-4 px-2">Meal Planner</li>
                <li className="py-4 px-2">Get Recipe</li>
                <li className="py-4 px-2">Calculator</li>
                <li className="py-4 px-2">Get Started</li>
              </ul>
            )}
          </div>
        </motion.nav>
      </div>
      <div className="flex justify-center items-center">
        <AnimatePresence>
          {form && <PopLogin setForm={setForm} form={form} setButtonText={setButtonText} />}
        </AnimatePresence>
        <AnimatePresence>
          {isCalculator && <Calculator setState={setCalculator} />}
        </AnimatePresence>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
