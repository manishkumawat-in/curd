import axios from "axios";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Login = () => {
  const signUpSchema = z.object({
    mobile: z
      .string()
      .min(10, "Min length should be 10...")
      .max(10, "Max length should be 10..."),
    password: z.string().min(6, "password length should be atleast 6..."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const navigate = useNavigate();

  const submitHandler = async (info) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { mobile: info.mobile, password: info.password },
        { withCredentials: true }
      );

      alert(data.message);
      if (data.success) {
        window.localStorage.setItem("isLoggedIn", true);
        if (data.userData.role === "admin") {
          window.localStorage.setItem("isAdmin", true);
        }
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.log("Submit error:", err.message);
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
            Submit
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
