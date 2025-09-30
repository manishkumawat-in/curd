import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const View = ({ isAdmin }) => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/delete/${id}`,
        { withCredentials: true }
      );

      alert(data.message);
    } catch (err) {
      console.log("Fetch error: ", err.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/get`,
          { withCredentials: true }
        );

        if (data.success) {
          setUsers(data.message);
        } else {
          console.log(`Server error: ${data.message}`);
        }
      } catch (err) {
        console.log("Fetching error: ", err.message);
      }
    };
    getData();
  }, [deleteHandler]);

  return (
    <div className="w-[1000px]">
      <div className="flex items-center justify-items-center justify-between">
        <h1 className=" font-bold text-3xl ">User's data</h1>
        {isAdmin && (
          <a href="/add" className="underline-none text-blue-500 text-[20px] ">
            Add new
          </a>
        )}
      </div>
      <div className="grid gap-5 mt-5 ">
        {users.length > 0 ? (
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
              {users.map((user) => (
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
                        onClick={() => deleteHandler(user.id)}
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
          <h1 className="text-2xl">No users found...</h1>
        )}
      </div>
    </div>
  );
};

export default View;
