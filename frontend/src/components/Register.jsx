import React, { useEffect, useState } from "react";
import axios from "axios";
const Register = () => {
  const url = "http://localhost:5000";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    formData.append("profileImage", profileImage);

    try {
      const res = await axios.post(url + "/api/v1/register/", formData);
      console.log(res);
      alert("user register succesfully");
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.log("error while registration" + error);
    }
  };
  useEffect((res) => {
    console.log(res);
  }, []);
  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="profileImage"
          placeholder="profileImage"
          onChange={(e) => setProfileImage(e.target.files[0])}
          required
        />
        <button type="submit"> register</button>
      </form>
    </div>
  );
};

export default Register;
