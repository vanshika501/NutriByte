import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { set, ref } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseApplication, FirebaseDatabase } from "./firebase_init";

function PopLogin({ setForm, form, setButtonText }) {
  const u_ref = useRef();
  const username_ref = useRef();
  const password_ref = useRef();
  const FirebaseAuth = getAuth(FirebaseApplication);

  function generateUID() {
    const firstPart = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
    const secondPart = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
    const thirdPart = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
    const fourthPart = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
    const fifthPart = Math.floor(Math.random() * 0xffffffffffff).toString(16).padStart(12, '0');
    const uid = `${firstPart}-${secondPart}-${thirdPart}-${fourthPart}-${fifthPart}`;
    return uid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user_cred = {
      username: u_ref.current.value,
      email: username_ref.current.value,
      password: password_ref.current.value,
    };

    if (!user_cred.email || !user_cred.password || !user_cred.username) {
      alert("Please fill in all fields");
      return;
    }

    createUserWithEmailAndPassword(
      FirebaseAuth,
      user_cred.email,
      user_cred.password
    )
      .then((userCredential) => {
        const userId = generateUID();
        set(ref(FirebaseDatabase, `/users/${userId}`), {
          username: user_cred.username,
          email: user_cred.email,
          password: user_cred.password,
        });
        localStorage.setItem("user_id", userId);
        localStorage.setItem("username", user_cred.username);
        setButtonText("LOGOUT"); // Update the button text to "LOGOUT"
      })
      .catch((error) => {
        alert(error.message);
      });

    setForm(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      exit={{ opacity: 0, y: 100 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", damping: 10 }}
      className="w-1/2 z-50 p-4 bg-[#12372add] backdrop-blur-md rounded-xl flex flex-col gap-4 fixed bottom-2"
      style={{ boxShadow: "0 0 10px #000" }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-base font-medium text-center bg-[#fbfada] rounded-full py-2 px-4 w-fit">
          Sign Up
        </h1>
        <i
          onClick={() => setForm(false)}
          className="fa-solid fa-xmark text-3xl text-[#ff3333]"
        ></i>
      </div>
      <label htmlFor="name" className="flex flex-col gap-1">
        <h2 className="text-[#fbfada] pl-1 text-xl">Username</h2>
        <input
          ref={u_ref}
          type="text"
          className="p-4 rounded-xl border-2 border-[#fbfada] bg-[#fbfada20] outline-none text-white"
          placeholder="Username"
          required
        />
      </label>
      <label htmlFor="email" className="flex flex-col gap-1">
        <h2 className="text-[#fbfada] pl-1 text-xl">Email</h2>
        <input
          ref={username_ref}
          type="email"
          className="p-4 rounded-xl border-2 border-[#fbfada] bg-[#fbfada20] outline-none text-white"
          placeholder="Enter email"
          required
        />
      </label>
      <label htmlFor="pass" className="flex flex-col gap-1">
        <h2 className="text-[#fbfada] pl-1 text-xl">Password</h2>
        <input
          type="password"
          className="p-4 rounded-xl border-2 border-[#fbfada] bg-[#fbfada20] outline-none text-white"
          placeholder="Set password"
          required
          ref={password_ref}
        />
      </label>
      <label htmlFor="pass" className="flex flex-col gap-1">
        <h2 className="text-[#fbfada] pl-1 text-xl">Confirm password</h2>
        <input
          type="password"
          className="p-4 rounded-xl border-2 border-[#fbfada] bg-[#fbfada20] outline-none text-white"
          placeholder="Confirm password"
          required
        />
      </label>
      <button
        type="submit"
        className="bg-orange-500 text-white font-medium py-4 px-8 rounded-full mt-4 opacity-90 hover:opacity-100"
      >
        Submit
      </button>
    </motion.form>
  );
}

export default PopLogin;
