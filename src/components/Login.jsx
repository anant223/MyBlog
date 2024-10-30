import React, { useState } from "react";
import { Input, Btn } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slice/authSlice";
import authService from "../service/authservice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const loginSession = async (data) => {
    try {
      const session = await authService.login(data);
      if (session) {
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
      <div className="bg-gray-50 p-8 rounded-lg sm:shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <form className="mt-6" onSubmit={handleSubmit(loginSession)}>
          <div>
            <Input
              label="Email"
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-white bg-transparent"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email Address must be valid",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-white bg-transparent"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <Btn
            className="w-full mt-6 text-white py-2 rounded-lg transition duration-200"
            name="Log In"
            bgColor="bg-black"
            type="submit"
          />
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-gray-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    )
};

export default Login;
