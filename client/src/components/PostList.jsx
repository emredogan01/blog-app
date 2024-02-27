import React, { useEffect, useRef } from "react";
import useStoreFetch from "../zustand/formFetch";
import Post from "./Post";
import ReactLoading from "react-loading";

const PostList = () => {
  const getData = useStoreFetch((store) => store.fetchData);
  const posts = useStoreFetch((store) => store.data);
  const loading = useStoreFetch((store) => store.isLoading);

  const getDataRef = useRef(getData);

  useEffect(() => {
    getDataRef.current();
  }, [getDataRef, posts]);

  return (
    <div className="container mx-auto p-10 bg-gray-700 mt-10 rounded-md flex flex-wrap gap-10 justify-center">
      {loading ? (
        <ReactLoading type={"spin"} color={"#fff"} height={50} width={50} />
      ) : posts !== null ? (
        posts.map((post, idx) => <Post key={idx} post={post} />)
      ) : (
        <p className="text-white text-center font-bold text-xl">
          İçerikler yüklenmedi. Henüz post yayınlanmadı.
        </p>
      )}
    </div>
  );
};

export default PostList;
