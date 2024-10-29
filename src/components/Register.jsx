import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../service/authservice";
import { useDispatch } from "react-redux";
import { login } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Input, Btn } from "./index";

const Register = () => {
  const { register, handleSubmit } = useForm("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const registerAccount = async (data) => {
    setError("");
    try {
      if (data.password.length < 8) {
        setError("Password must be 8 or more");
        return;
      }
      const newUserAccount = await authService.createAccount(data);
      if (newUserAccount) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login(user));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="bg-gray-50 text-black p-8 rounded sm:shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>
      <form className="mt-6" onSubmit={handleSubmit(registerAccount)}>
        <div>
          <Input
            label="Name"
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-white bg-transparent"
          />
        </div>
        <div>
          <Input
            label="Email"
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-white bg-transparent"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email Address must be valid",
              },
            })}
          />
        </div>
        <div className="">
          <Input
            label="Password"
            type="password"
            {...register("password", { required: true })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-white bg-transparent"
            placeholder="Enter your password"
          />
          <span>{error}</span>
        </div>
        <Btn
          className="w-full bg-black text-white py-2 rounded hover:bg-indigo-600 transition duration-200"
          name="Sign Up"
          bgColor="bg-black"
        />
      </form>
    </div>
    // </div>
  );
};

export default Register;
