import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const addSchema = z.object({
  name: z.string().min(1, "Please enter name..."),
  contact: z
    .string()
    .min(10, "Min mobile number length is be 10...")
    .max(10, "Max mobile number length is be 10..."),
});

const Add = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let isNew = !location.state;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(addSchema),
    defaultValues: { id: "", name: "", contact: "" },
  });

  useEffect(() => {
    if (location.state) {
      const userData = location.state;
      reset({
        id: userData.id,
        name: userData.name,
        contact: `${userData.contact}`,
      });
    }
  }, []);

  const submitHandler = async (info) => {
    try {
      if (isNew) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/add`,
          {
            name: info.name,
            contact: info.contact,
          },
          { withCredentials: true }
        );
        alert(data.message);
      } else {
        console.log("update");

        const { data } = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/update/${getValues(
            "id"
          )}`,
          { name: info.name, contact: info.contact },
          { withCredentials: true }
        );
        alert(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("Submiting error: ", error.message);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl">Add New</h1>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="grid gap-3 mt-5 place-items-center"
      >
        <div>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="outline-none border rounded-2xl p-2 w-[300px] "
            placeholder="Enter Name"
          />
          {errors.name && (
            <p className="text-[14px] flex text-red-300 font-light ">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            id="cantact"
            {...register("contact")}
            className="outline-none border rounded-2xl p-2 w-[300px] "
            placeholder="Enter Contact"
          />
          {errors.contact && (
            <p className="text-[14px] flex text-red-300 font-light ">
              {errors.contact.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="cursor-pointer border rounded-2xl px-4 py-2 mt-5 w-[150px] "
        >
          Submit
        </button>
      </form>

      <a href="/" className="flex mt-10 justify-center ">
        Go Back
      </a>
    </div>
  );
};

export default Add;
