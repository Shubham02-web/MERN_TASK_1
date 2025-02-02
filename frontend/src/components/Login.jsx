import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const url = "http://localhost:5000";

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url + "/api/v1/login", user);
      console.log(response);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
