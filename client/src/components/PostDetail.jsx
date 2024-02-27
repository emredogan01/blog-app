import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { singlePostStore } from "../zustand/getSinglePost";
import moment from "moment";
import ReactLoading from "react-loading";
import { deletePostStore } from "../zustand/deletePost";
import UpdatePost from "./UpdatePost";

const PostDetail = () => {
  const { id } = useParams();
  const { getSingleData, post, isLoading } = singlePostStore();
  const { deletePost } = deletePostStore();

  const navigate = useNavigate();
  const [updatePageIsOpen, setUpdatePageIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSingleData(id);
    };
    fetchData();
  }, [getSingleData, id]);

  const formattedDate = post
    ? moment(post.createdAt).format("DD.MM.YYYY HH:mm")
    : "";
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleDelete = (id) => {
    deletePost(id);
    navigate("/posts");
  };
  const handleUpdate = () => {
    setUpdatePageIsOpen(true);
  };

  const handleClose = () => {
    setUpdatePageIsOpen(false);
  };

  return updatePageIsOpen ? (
    <UpdatePost id={id} post={post} handleClose={handleClose} />
  ) : isLoading ? (
    <div className="container mx-auto p-10 bg-gray-700 mt-10 rounded-md flex justify-center">
      <ReactLoading
        type={"spin"}
        color={"lightgray"}
        height={200}
        width={100}
      />
    </div>
  ) : (
    <div className="container mx-auto p-10 bg-gray-700 mt-10 rounded-md flex">
      <div className="flex-1 pr-8">
        <div className="border-2 border-cyan-600 p-6 rounded-md h-full">
          <h1 className="text-white text-4xl font-extrabold mb-4">
            {post?.title.toUpperCase()}
          </h1>
          <div className="text-cyan-500 font-extrabold text-lg mb-6">
            {post?.subTitle.toUpperCase()}
          </div>
          <div className="flex items-center gap-2 mb-6">
            <div className="text-black bg-slate-300 p-2 text-xl rounded-md">
              {post?.category}
            </div>
            <div className="text-gray-300 text-sm">{formattedDate}</div>
          </div>
          <p className="text-white">
            {post?.text.charAt(0).toUpperCase() +
              post?.text.slice(1).toLowerCase()}
          </p>
          <div className="flex justify-start items-center mt-8 gap-10">
            <button
              onClick={handleUpdate}
              className="text-white text-xl bg-green-400 px-4 py-2 rounded-md hover:bg-green-700 transition-all"
            >
              Düzenle
            </button>
            <button
              onClick={() => handleDelete(id)}
              className="text-white text-xl bg-red-400 px-4 py-2 rounded-md hover:bg-red-700 transition-all"
            >
              Sil
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <img
          className="border-2 border-cyan-600 rounded-md h-auto w-full object-cover"
          src={post?.image || defaultImageUrl}
          alt={post?.title}
        />
      </div>
    </div>
  );
};

export default PostDetail;
