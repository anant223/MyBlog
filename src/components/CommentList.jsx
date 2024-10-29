import React, { useEffect, useState } from "react";
import { CommentForm } from "./index";
import dbService from "../service/dbservice";
import img from "../assets/react.svg";

const CommentList = ({ postId }) => {
  const [commentLength, setCommentLength] = useState();
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState(null);
  const [expand, setExpand] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await dbService.getComments(postId);
        if (response) {
          setComments(response.documents);
        }
        console.log(response.documents);
      } catch (error) {
        console.log("failed to fetch ", error.message);
      }
    };
    fetchComments();
  }, [postId]);

  const handleToggleRepiese = (index) => {
    setExpand(expand === index ? null : index);
  };

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    if (newComment) {
      const commentIndex = comments.findIndex(
        (comment) => comment.$id === newComment.parent_id
      );
      setExpand(commentIndex);
    }
  };

  const handleReplyClick = (id) => {
    setReply(id);
  };

  const handleCancel = () => {
    setReply(null);
  };

  const renderComments = (parentId = null) => {
    const filteredComment = comments.filter(
      (comment) => comment.parent_id === parentId
    );
    return filteredComment.map((comment, index) => {
      return (
        <div
          key={comment.$id}
          className={` text-black ${parentId ? "ml-10" : ""} mt-4`}
        >
          <div className="">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-3"
                src={img}
                alt="avatar"
              />
              <span className=" font-medium text-gray-600">
                {comment.user_id}
              </span>
              <span className="ml-2 text-sm  text-gray-600">
                {new Date(comment.$createdAt).toLocaleString("en-us", {
                  hourCycle: "h24",
                })}
              </span>
            </div>
            <p className="text-base text-gray-800 ml-[53px] font-medium leading-relaxed tracking-wide">
              {comment.comment}
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="mt-8 overflow-hidden sm:rounded-lg">
      {" "}
      <div className="py-4">
        <h3 className="text-lg font-medium text-gray-900">Comments</h3>
      </div>
      <div className="border-t border-gray-200 py-4">
        <CommentForm onAddComment={handleAddComment} />
      </div>
      {renderComments()}
    </div>
  );
};

export default CommentList;
