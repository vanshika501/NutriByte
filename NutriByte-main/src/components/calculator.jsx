import React from 'react';
import { useState } from 'react';
import {motion} from 'framer-motion';

function calculator({setState}) {
  const [weight, setWeight] = useState(40);
  const [height, setHeight] = useState(152);
  const [age, setAge] = useState(15);
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('moderate'); 
  const [goal, setGoal] = useState('maintain');
  const [calories, setCalories] = useState(0);
  const [BMI, setBMI] = useState(0);

  const calculateCalories = () => {
    setBMI((weight/ (height*height)*10000).toFixed(3));
    let bmr;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    let activityFactor;
    switch (activity) {
      case 'sedentary':
        activityFactor = 1.2;
        break;
      case 'light':
        activityFactor = 1.375;
        break;
      case 'moderate':
        activityFactor = 1.55;
        break;
      case 'very':
        activityFactor = 1.725;
        break;
      case 'extra':
        activityFactor = 1.9;
        break;
      default:
        activityFactor = 1.55; 
    }

    let totalCalories = bmr * activityFactor;

    switch (goal) {
      case 'lose':
        totalCalories -= 373;
        break;
      case 'gain':
        totalCalories += 491;  
        break;
      case 'maintain':
      default:
        break; 
    }

    setCalories(Math.round(totalCalories));
    localStorage.setItem('totalCalories', totalCalories);
  };

  const arr = ["weight gain ", "weight maintaining ", "weight loss ", "extreme weight loss "];

  return (
    <motion.div 
      exit={{opacity: 0, x: 1000}}
    initial={{opacity: 0, x:1000}} animate={{opacity: 1, x:0}} transition={{duration: 1, type: "spring", damping: 10}} className='flex fixed z-50 flex-col items-center gap-10 p-4 rounded-xl md:h-screen backdrop-blur-lg w-screen top-0 left-0 bg-[#fbfadabb] border-2 border-black'>
      <i 
        onClick={() => {
            setState(false)
        }}
      className='fa-solid fa-arrow-left fixed top-2 left-2 font-extrabold bg-[#12372a] text-[#fbfada] px-10 py-4 rounded-full '> Back</i>
      <h1 className='text-4xl font-medium'>Calorie Calculator</h1>
      <form className='flex md:flex-row md:gap-24 relative gap-8 flex-col'>
        <div className="flex flex-col gap-4">
          <label>
            <p className="font-medium">Height (cm):</p>
            <input className='p-4 rounded-lg border-none outline-none ' type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} />
          </label>
          <label>
            <p className="font-medium">Weight (kg):</p>
            <input className='p-4 rounded-lg border-none outline-none ' type="number" value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} />
          </label>
          <label>
            <p className="font-medium">Age (years):</p>
            <input className='p-4 rounded-lg border-none outline-none ' type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
          </label>
          <label >
            <p className='mb-2 font-medium'>Gender:</p>
            <input type="radio" name='gender' value="male" checked={gender == 'male'} onChange={(e) => { setGender(e.target.value) }} />
            <i className="fa-solid fa-person text-5xl ml-2 text-blue-600"></i>
            <input className='ml-8' type="radio" name='gender' value="female" checked={gender == 'female'} onChange={(e) => { setGender(e.target.value) }} />
            <i className="fa-solid fa-person-dress text-5xl ml-2 text-pink-600"></i>
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <label>
            <p className="font-medium">Your Activity Status</p>
            <select className='p-4 w-60 border-none outline-none cursor-pointer rounded-lg' value={activity} onChange={(e) => setActivity(e.target.value)}>
              <option value="sedentary">Sedentary (No exercise)</option>
              <option value="light">Lightly active (Walking to work)</option>
              <option value="moderate">Moderately active (jogging/cycling)</option>
              <option value="very">Very active (outdoor sports)</option>
              <option value="extra">Extra active (athlete)</option>
            </select>
          </label>

          <label>
            <p className="font-medium">Choose your Goal</p>
            <select className='p-4 w-60 border-none outline-none cursor-pointer rounded-lg' value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="maintain">Maintain weight</option>
              <option value="gain">Weight Gain</option>
              <option value="lose">Fat Loss</option>
            </select>
          </label>

          <label>
            <p className="font-medium">Estimate: </p>
            <button className='bg-orange-500 text-white font-medium p-4 w-60 rounded-full opacity-90 hover:opacity-100' type="button" onClick={calculateCalories}>Calculate</button>
          </label>
          <p className='font-medium'>Your target calorie intake: <br /><span className='font-medium text-6xl pt-4'>{calories}</span> cal</p>
        </div>
      </form>
        {calories!==0 && <div className="flex flex-col gap-4 self-start md:self-center">
          <h1 className='text-2xl font-medium'>BMI: <span className='text-5xl pl-4'>{BMI}</span></h1>
          <span className='text-2xl font-medium'>{BMI < 18.5 ? "UnderWeight": BMI < 25 ? "Healthy" : BMI < 30 ? "OverWeight" : "Obese"}</span>
          <p>We recommend you to follow our <span className='text-2xl font-medium text-orange-500'>{BMI < 18.5 ? arr[0]: BMI < 25 ? arr[1] : BMI < 30 ? arr[2] : arr[3]}</span> diet</p>
        </div>}
    </motion.div>
  )
}

export default calculator;