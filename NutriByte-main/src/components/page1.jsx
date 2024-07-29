import React from 'react'
import '../App.css';
import { motion } from 'framer-motion'
import { NavLink } from "react-router-dom";

function page1() {

  return (
    <motion.div initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: "0%" }} transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1] }} className='h-screen relative top-6 flex md:flex-row flex-col-reverse justify-center items-center gap-40 '>
      <motion.div className="flex flex-col gap-8 w-1/3">
        <h1 className='text-5xl font-bold'>Unlock the Power of Healthy Eating</h1>
        <h2 className='text-xl'>Tailored Meal Plans for Your Unique Nutritional Needs. Calculate your nutritional needs and generate custom diet plans for weight loss, bodybuilding and much more!</h2>
        <NavLink to="/mealForm">
          <button className='border-none outline-none uppercase bg-[#1c6758] text-white w-fit px-8 py-5 font-semibold text-xl rounded-full hover:bg-orange-500' id='this'>Plan Your Diet<span><i class="fa-solid fa-arrow-right"></i></span>
          </button>
        </NavLink>
      </motion.div>
      <div className="right">
        <img className='rounded-2xl h-full aspect-auto object-cover ' src="https://imgs.search.brave.com/Z_41PAm5K0pofasI4K4huy5X3gcAMB22AZF_ZNTk73A/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTM5/MDMxMDkyL3Bob3Rv/L2ZyZXNoLWZydWl0/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz16cVg4QnJSalVi/ZDl0YXU2dHRETDFm/VHVRZm9EMW1CM21J/eE55VUxRaXM0PQ" alt="fruits" />
      </div>
    <motion.div initial={{x: 0}} whileInView={{x: "-80%"}} transition={{duration: 30, repeat: Infinity, repeatType: "loop", ease:'linear'}} className="absolute text-[20rem] bottom-0 whitespace-nowrap left-0 text-[#1c6758] font-bold opacity-20 -z-10 cursor-default hidden lg:block">
      Join Us Today and Unlock the Power of Healthy Eating
    </motion.div>
    </motion.div>
  )
}

export default page1