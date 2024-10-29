import React, { useEffect, useRef, useState } from 'react'
import dbService from '../service/dbservice';
import { useSelector } from 'react-redux';
import { Heart, Share2 } from 'lucide-react';

const Likes = ({postId}) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState();
  const authStatus = useSelector((state) => state.auth.status);
  const auth = useSelector((state)=> state.auth.userData);

  const handleLikeBtn = () =>{
    try {
      if(!authStatus) return "Please Login"
      if(like === false){
        setLike(true)
        setLikeCount(preCount=> preCount + 1)
        dbService.likePost(postId, auth.userData.$id);

      }
      if(like === true){
        setLike(false)
        setLikeCount((prevCount) => Math.max(prevCount - 1, 0));
        dbService.removeUserLike(postId, auth.userData.$id);
      }
    } catch (error) {
      console.log("Error toggling like:", error.message);
    }
  }

  useEffect(() => {
    dbService.getAllLikes(postId).then((like) => {
      if (like) {
        setLikeCount(like.total);
      }
    });
  }, [postId, likeCount]);

  return (
    <div className=" flex gap-4 mt-8">
      <div className="flex space-x-4">
        <button
          onClick={handleLikeBtn}
          className="rounded w-[5.2rem] flex items-center border text-center p-2"
        >
          <Heart className="mr-2 h-4 w-4" />
          {like === false ? "Like": "Liked"}
          <small>{likeCount}</small>
        </button>
      </div>
    </div>
  );
}

export default Likes