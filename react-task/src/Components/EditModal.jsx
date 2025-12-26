import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditModal = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:1200/users/${id}`)
      .then(res => setUser(res.data));
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:1200/users/${id}`, user);
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center bg-blue-100">
      <form className="bg-blue-200 p-6 rounded-lg w-full max-w-md " onSubmit={handleSave}>
        <h2 className="text-xl mb-3 text-center text-shadow-lg/30">Edit User</h2>

        <input name="name" value={user.name || ""} onChange={handleChange} placeholder="Name" className="border p-2 w-full mb-2 rounded-lg bg-blue-300 hover:bg-blue-400" />
        <input name="email" value={user.email || ""} onChange={handleChange} className="border p-2 w-full mb-2 rounded-lg bg-blue-300 hover:bg-blue-400" />
        <input name="phone" value={user.phone || ""} onChange={handleChange} className="border p-2 w-full mb-2 rounded-lg bg-blue-300 hover:bg-blue-400" />
        <input name="street" value={user.street || ""} onChange={handleChange}placeholder="street" className="border p-2 w-full mb-2 rounded-lg bg-blue-300 hover:bg-blue-400" />
        <input name="street" value={user.street || ""} onChange={handleChange} placeholder="suite"className="border p-2 w-full mb-2 rounded-lg bg-blue-300 hover:bg-blue-400" />
        <input name="city" value={user.city || ""} onChange={handleChange} placeholder="City" className="border p-2 w-full mb-2 rounded-lg bg-blue-300 hover:bg-blue-400" />
        <input name="zipcode" value={user.zipcode || ""} onChange={handleChange} placeholder="zipcode" className="border p-2 w-full mb-2 rounded-lg bg-blue-300 hover:bg-blue-400" />
        <input name="website" value={user.website || ""} onChange={handleChange} className="border p-2 w-full mb-2 rounded-lg bg-blue-300 hover:bg-blue-400" />
        <input name="company" value={user.company || ""} onChange={handleChange} className="border p-2 w-full mb-2 rounded-lg bg-blue-300 hover:bg-blue-400" />

        <div className="flex justify-between mt-4">
          <button type="button" onClick={() => navigate("/")} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-red-500">Cancel</button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-400">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
