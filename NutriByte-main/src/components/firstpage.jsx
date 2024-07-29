import React from 'react'
import Page1 from './page1'
import Scroll from './scroll'
import Count from './count'
import Login from './login'

function firstpage() {
  return (
    <div>
        <Page1 /> 
        <Count />
        <Scroll />
        <Login />
    </div>
  )
}


export default firstpage