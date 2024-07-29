import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu8kaD1TTMxAntdvGeiLPibPtJiVOth6U",
  authDomain: "tanishq-final-fee.firebaseapp.com",
  databaseURL: "https://tanishq-final-fee-default-rtdb.firebaseio.com",
  projectId: "tanishq-final-fee",
  storageBucket: "tanishq-final-fee.appspot.com",
  messagingSenderId: "1001244988298",
  appId: "1:1001244988298:web:729b1bb97d858dc07a6e73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function Login() {
  const username_ref = React.useRef();
  const password_ref = React.useRef();
  const [error, setError] = React.useState({
    isError: false,
    message: ""
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    const username = username_ref.current.value;
    const password = password_ref.current.value;

    try {
      const userDoc = await getDoc(doc(db, 'users', username));
      if (!userDoc.exists()) {
        setError({ isError: true, message: "Username or Password not found!" });
        return;
      }

      const userData = userDoc.data();
      if (userData.password === password) {
        localStorage.setItem("username", username);
        window.location.assign("/mealForm");
      } else {
        setError({ isError: true, message: "Username or Password not found!" });
      }
    } catch (error) {
      setError({ isError: true, message: error.message });
    }
  };

  return (
    <div className="login h-screen w-screen flex justify-center items-center gap-40 z-20">
      <h1 className='text-white text-7xl w-1/3'>Your Next Step Towards Nutrition</h1>
      <form onSubmit={handleSignIn} className='py-8 px-4 rounded-2xl w-[28rem] backdrop-blur flex flex-col gap-8 items-center bg-[#ffffff90]'>
        <h1 className='text-3xl font-bold'>Login</h1>
        <div className="w-11/12">
          <label htmlFor="user" className='font-semibold text-lg pl-2'>Username</label>
          <input type="text" ref={username_ref} placeholder='Username' className='w-full pl-4 text-base h-16 rounded-2xl border-none outline-none bg-[#ffffff80]' />
        </div>
        <div className="w-11/12">
          <label htmlFor="user" className='font-semibold text-lg pl-2'>Password</label>
          <input type="password" ref={password_ref} placeholder='Password' className='w-full pl-4 text-base h-16 rounded-2xl border-none outline-none bg-[#ffffff80]' />
        </div>
        {error.isError && <div className='text-red-500'>{error.message}</div>}
        <div className="flex w-full justify-around items-center text-3xl ">
          <i className="fa-brands fa-facebook-f" style={{ color: "#1877F2" }}></i>
          <i className="fa-brands fa-linkedin" style={{ color: "#1DA1F2" }}></i>
          <i className="fa-brands fa-github" style={{ color: "#2b3137" }}></i>
          <i className="fa-brands fa-instagram" style={{ color: 'magenta' }}></i>
        </div>
        <button className='w-9/12 px-4 py-3 rounded-2xl border-none outline-none bg-orange-500 opacity-80 text-white font-medium text-xl hover:opacity-100'>
          Continue
          <i className='fa-solid fa-arrow-right -rotate-45 ml-5 hover:rotate-0 hover:translate-x-2'></i>
        </button>
      </form>
    </div>
  );
}

export default Login;
