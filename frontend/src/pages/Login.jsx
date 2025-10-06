import axios from "axios";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../features/auth/authSchema";
import { useDispatch } from "react-redux";
import { loginHandler } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const submitHandler = async (info) => {
    const data = await dispatch(loginHandler(info));
    if (data.payload.success) {
      reset();
      navigate("/");
      navigate(0);
    }
  };

  return (
    <>
      <div className=" ">
        <h1 className="text-3xl my-10">Login account</h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="grid gap-4 place-items-center"
        >
          <div>
            <input
              type="number"
              {...register("mobile")}
              placeholder="Enter mobile number"
              className="outline-none border rounded-2xl px-2 py-1 w-[250px] "
            />
            {errors.mobile && (
              <p className="text-red-300 font-light flex text-[14px] ">
                {errors.mobile.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              {...register("password")}
              placeholder="Enter password"
              className="outline-none border rounded-2xl px-2 py-1 w-[250px] "
            />
            {errors.password && (
              <p className="text-red-300 font-light flex text-[14px] ">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="outline-none border rounded-2xl px-2 py-1 w-[100px] mt-5 cursor-pointer "
          >
            Login
          </button>
        </form>

        <p className="flex mt-10 text-[20px] justify-center">
          Don't have account{" "}
          <a href="/signup" className="underline ps-3">
            {" "}
            Create
          </a>
        </p>
      </div>
    </>
  );
};

export default Login;
