import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const shortenedText =
    post.text.length > 100 ? `${post.text.slice(0, 100)}...` : post.text;
  const formattedDate = moment(post.createdAt).format("DD.MM.YYYY HH:mm");
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <div className="max-w-sm bg-slate-100 rounded overflow-hidden shadow-lg">
      <img
        className="w-150 h-70 object-cover"
        src={post.image || defaultImageUrl}
        alt={post.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-4">{post.title.toUpperCase()}</div>
        <p className="text-red-400 text-base font-semibold mb-2">
          {post.subTitle.charAt(0).toUpperCase() +
            post.subTitle.slice(1).toLowerCase()}
        </p>
        <p className="text-gray-700 text-base mb-2">{shortenedText}</p>
        <p className="bg-gray-300 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mt-2 mb-2 w-[150px]">
          {post.category}
        </p>
        <button
          onClick={handleClick}
          className="text-white bg-green-300 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mt-2 mb-2"
        >
          Daha Fazla...
        </button>
      </div>

      <div className="px-6 pt-4 pb-2">
        <p className="text-gray-600 text-xs">{formattedDate}</p>
      </div>
    </div>
  );
};

export default Post;
