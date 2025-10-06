import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteHandler } from "../features/customer/customerSlice";
import { getCustomers } from "../features/customer/customerSlice";

const View = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersData } = useSelector((state) => state.customers);
  const { isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const deleteOne = async (id) => {
    await dispatch(deleteHandler(id));
    dispatch(getCustomers());
  };

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login"); 
  };

  return (
    <div className="w-[1000px]">
      <div className="flex items-center justify-items-center justify-between">
        <h1 className=" font-bold text-3xl ">User's data</h1>
        <div className="flex gap-3">
          {isAdmin && (
            <a
              href="/add"
              className="underline-none border rounded-2xl px-2 py-1 text-blue-500 text-[20px] "
            >
              Add new
            </a>
          )}
          <button
            className="text-[20px] text-red-300 cursor-pointer border rounded-2xl px-2 py-1 "
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="grid gap-5 mt-5 ">
        {customersData.length > 0 ? (
          <table className="">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Contact</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody className="">
              {customersData.map((user) => (
                <tr className="py-5 border-b" key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>+91 {user.contact}</td>
                  {isAdmin && (
                    <td className="flex gap-2 justify-center">
                      <button
                        onClick={() => navigate("/add", { state: user })}
                        className="cursor-pointer border rounded-2xl px-4 py-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteOne(user.id)}
                        className="cursor-pointer border rounded-2xl px-4 py-1"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="text-2xl">No customers found...</h1>
        )}
      </div>
    </div>
  );
};

export default View;
