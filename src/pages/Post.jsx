import React, { useEffect, useRef, useState } from "react";
import { Btn, CommentForm, CommentList } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import dbService from "../service/dbservice";
import { useNavigate, useParams } from "react-router-dom";
import img from "../assets/react.svg";
import Parse from "html-react-parser";
import { getData } from "../slice/dbSlice";
import Loading from "../components/Loading";
import Likes from "../components/Likes";

const Post = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const post = useSelector((state) => state.article.data);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dbService.getPost(slug).then((post) => {
      if (post) {
        dispatch(getData(post));
        navigate(`/post/${post.$id}`);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);

  return !post ? (
    <Loading />
  ) : (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
        <div className=" py-4">
          <h2 className="text-3xl py-2 font-extrabold text-gray-900">
            {post.title}
          </h2>
          <div className=" py-3 flex items-center text-gray-500 text-sm">
            <img
              className="h-10 w-10 rounded-full bg-gray-800 mr-3"
              src={img}
              alt="Author avatar"
            />
            <span>By Us</span>
            <span className="mx-2">•</span>
            <span className="mr-2">
              {new Date(post.$createdAt).toLocaleString({ hourCycle: "h24" })}
            </span>
            <span className="mx-2">•</span>
            <span>2 min</span>
          </div>
        </div>
        <div>
          <div className="flex items-center text-sm text-black-500 justify-between"></div>
          <img
            src={dbService.getFilePreview(post.featuredImage)}
            alt={"featuredImage"}
            className="w-full h-auto rounded-lg mb-8"
          />
          <div className="text-lg leading-relaxed text-black mb-8 text-justify">
            <p>{Parse(post.content)}</p>
          </div>
        </div>
        <Likes postId={post.$id} />
        <CommentList postId={post.$id} />
      </div>

      <div className="mb-8 border-x-2"></div>
    </div>
  );
};

export default Post;
