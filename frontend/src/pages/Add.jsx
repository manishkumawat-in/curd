import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema } from "../features/customer/customerSchema";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { add, update } from "../features/customer/customerSlice";

const Add = () => {
  const {} = useSelector((state) => state.customers);
  const dispatch = useDispatch();
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
    resolver: zodResolver(customerSchema),
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
    if (isNew) {
      const data = await dispatch(add(info));

      if (data.payload.success) {
        reset();
      }
      reset();
    } else {
      info.id = getValues("id");
      const data = await dispatch(update(info));
      if (data.payload.success) {
        navigate("/");
      }
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
          Add
        </button>
      </form>

      <a href="/" className="flex mt-10 justify-center ">
        Go Back
      </a>
    </div>
  );
};

export default Add;
