import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../features/auth/authSchema";
import { useDispatch } from "react-redux";
import { signUpHandler } from "../features/auth/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const submitHandler = async (info) => {
    const data = await dispatch(signUpHandler(info));
    if (data.payload.success) {
      reset();
      navigate("/");
      navigate(0);
    }
  };

  return (
    <>
      <div className=" ">
        <h1 className="text-3xl my-10">Create account</h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="grid gap-4 place-items-center"
        >
          <div>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter name"
              className="outline-none border rounded-2xl px-2 py-1 w-[250px] "
            />
            {errors.name && (
              <p className="text-red-300 text-[13px] flex font-light ">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="number"
              {...register("mobile")}
              placeholder="Enter mobile number"
              className="outline-none border rounded-2xl px-2 py-1 w-[250px] "
            />
            {errors.mobile && (
              <p className="text-red-300 text-[13px] flex font-light ">
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
              <p className="text-red-300 text-[13px] flex font-light ">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="outline-none border rounded-2xl px-2 py-1 w-[100px] mt-5 cursor-pointer "
          >
            Sign Up
          </button>
        </form>

        <div className="mt-10 text-[20px] ">
          Already have{" "}
          <a href="/" className="underline ms-1 ">
            Login
          </a>
        </div>
      </div>
    </>
  );
};

export default SignUp;
