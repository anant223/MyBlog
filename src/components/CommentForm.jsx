import React, { useState } from "react";
import { Btn, Input } from "./index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import dbService from "../service/dbservice";
import img from "../assets/react.svg";

const CommentForm = ({ parentCommentid = null, onCancel, onAddComment }) => {
  const { register, handleSubmit, reset } = useForm();

  const user = useSelector((state) => state.auth.userData);
  const post = useSelector((state) => state.article.data);
  const postComment = async (data) => {
    try {
      const comments = await dbService.createComments(post.$id, {
        ...data,
        user_id: user.userData.$id,
        parent_id: parentCommentid,
      });
      reset();
      onAddComment(comments);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <section className=" w-full">
      <form className="" onSubmit={handleSubmit(postComment)}>
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full mr-3" src={img} alt="avatar" />
          <Input
            className="w-full px-2 py-4 border border-gray-300 focus:outline-none outline-0 focus:bg-none border-t-0 border-l-0 border-r-0 bg-transparent"
            type="text"
            placeholder="Your Thoughts..."
            {...register("comment", { required: true })}
          />
        </div>
        <div className="flex justify-end mt-2">
          <Btn
            onClick={onCancel}
            className="w-16 h-10 p-2 text-xs text-black 
            rounded-xl border mr-3"
            name={"Cancel"}
          />
          <Btn
            className="w-20 h-10 p-2 text-xs text-white 
            rounded-xl border"
            name={"Comment"}
            bgColor="bg-gray-800"
          />
        </div>
      </form>
    </section>
  );
};

export default CommentForm;
