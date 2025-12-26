import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    website: "",
    street: "",
    city: "",
    company: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      ...formData,
      address: {
        street: formData.street,
        city: formData.city,
        company: { name: formData.company }
      }
    };

    await axios.post("http://localhost:1200/users", newUser);
    navigate("/"); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-200 ">
      <div className="bg-blue-100 shadow-xl p-6 rounded-xl w-full max-w-lg ">
        <h2 className="text-3xl  text-center mb-4 text-black-700 text-shadow-lg/30">Create New User</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {["username","name","email","phone","website","street","city","company"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.toUpperCase()}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg "
              required
            />
          ))}

          <div className="flex justify-between mt-4 gap-3">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">
              Save
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
