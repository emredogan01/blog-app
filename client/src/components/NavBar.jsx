import React from "react";
import { useStore } from "../zustand/formState";

const NavBar = () => {
  const { openForm } = useStore();

  return (
    <div className="container bg-gray-700 h-20 text-white mx-auto fixed-top flex justify-between items-center px-10 rounded-b-md">
      <a
        className="text-xl text-blue-500 bg-slate-100 p-2 rounded-md  hover:bg-slate-300  font-extrabold"
        href="http://localhost:3000/posts"
      >
        BlogApp
      </a>
      <button
        onClick={openForm}
        className="text-xl text-green-500 font-extrabold bg-slate-100 p-2 rounded-md hover:bg-slate-300"
      >
        Yeni Yazı +
      </button>
    </div>
  );
};

export default NavBar;
