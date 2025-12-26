import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaGlobe } from "react-icons/fa";
import { FaEdit, FaTrash } from "react-icons/fa";

const UsersProfile = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:1200/users");
    const updated = data.map((u) => ({ ...u, liked: false }));
    setUsers(updated);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLike = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, liked: !u.liked } : u));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete permently?")) {
      await axios.delete(`http://localhost:1200/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-blue-100">
      {users.map((user) => (
        <div key={user.id} className="bg-blue-300 shadow-xl rounded-2xl p-6 scale-100 hover:shadow-2xl transition hover:scale-101 ">
          <div className="w-70 h-28 mx-auto bg-gray-300 rounded-2xl shadow-lg  ">
            <img
              src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user.username}`}
              alt="avatar"
              className="w-28 h-28 mx-auto border-gray-200"
            />
          </div>

          <h2 className="text-xl font-bold text-center mt-4 text-gray-800 text-shadow-lg ">{user.name}</h2>

          <div className="mt-3 space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <MdEmail className="text-blue-600" /> {user.email}
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-600" /> {user.phone}
            </p>
            <p className="flex items-center gap-2">
              <FaGlobe className="text-blue-600" /> {user.website}
            </p>
          </div>
          

          <div className="flex justify-between mt-5 gap-2 ">
            <button
               className={`px-3 py-1 rounded-lg border flex-1 flex items-center justify-center gap-2 cursor-pointer hover:border-pink-300 ${
            user.liked ? "bg-pink-300 border-pink-150 " : "bg-white"}`}
              onClick={() => handleLike(user.id)}>
              ❤️ 
            </button>

            <button
              className="px-3 py-1 rounded-lg border flex-1 flex items-center justify-center text-black-500 boder-black hover:cursor-pointer hover:border-white hover:text-white"
              onClick={() => handleEdit(user.id)}>
              <FaEdit size={18}/>
            </button>

            <button
               className="px-3 py-1 rounded-lg border flex-1 text-red-600 flex items-center justify-center cursor-pointer hover:bg-red-300"
              onClick={() => handleDelete(user.id)}>
                 <FaTrash size={18} />
             </button>
          </div>
        </div>
      ))}

       <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/create")}
          className="h-10 w-40 bg-blue-500 text-white rounded-lg  hover:bg-blue-600">
           Create User 
        </button>
      </div>
    </div>
  );
};

export default UsersProfile;
