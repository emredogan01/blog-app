import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import NavBar from "./components/NavBar";
import PostList from "./components/PostList";
import { useStore } from "./zustand/formState";
import AddPostFrom from "./components/AddPostFrom";
import Footer from "./components/Footer";

function App() {
  const isOpen = useStore((state) => state.isOpen);
  return (
    <BrowserRouter>
      <NavBar />
      {isOpen && <AddPostFrom />}
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
