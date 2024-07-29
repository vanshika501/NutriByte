import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Days from './components/days'
import Page1 from './components/page1'
import Login from './components/login'
import Scroll from './components/scroll'
import Count from './components/count'
import Test from './components/test'
import API from './components/API'
import Pop from './components/poplogin'
import Calculator from './components/calculator'
import MealForm from './components/mealForm'

function App() {

  useEffect(() => {
    (
      async () => {
        const locomotiveScroll = (await import("locomotive-scroll")).default;
        new locomotiveScroll();
      }
    )()
  }, [])

  return (
    <>
    </>
  )
}

export default App
