import React from "react";
import dbService from "../service/dbservice";
import { Link } from "react-router-dom";
import Parse from "html-react-parser";

const Card = ({ $id, featuredImage, title, content }) => {
  return (
    <div className="lg:w-[98%]">
      <div className="bg-white shadow rounded-lg mb-8">
        <img
          src={dbService.getFilePreview(featuredImage)}
          alt="Laptop"
          height="400"
          width="800"
          className="w-full h-64 object-cover rounded-t-lg aspect-square"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">
            <Link
              to={`/post/${$id}`}
              className="text-black-900 hover:text-gray-900 hover:underline"
            >
              {title}
            </Link>
          </h2>
          <p className="text-gray-600 mb-4">Published on May 28, 2023</p>

          <p className="line-clamp-3 overflow-hidden text-gray-700 mb-4">
            {Parse(content)}
          </p>
          <div className="">
            <Link
              to={`/post/${$id}`}
              className="text-balck hover:text-gray-400 hover:underline"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
