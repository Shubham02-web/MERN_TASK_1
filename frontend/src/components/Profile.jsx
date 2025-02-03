import axios from "axios";
import React, { useEffect, useState } from "react";
import userModel from "../../../backend/models/userModel";

const Profile = () => {
  const url = "http://localhost:5000";

  const [user, setUser] = useState({});
  const userData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("token not found");
      const res = await axios.get(url + "/api/v1/single", {
        headers: { token },
      });
      setUser(res.data.user);
      console.log(res.data.user);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    userData();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      <h1>{user._id}</h1>
      <h2>{user.name}</h2>
      <h3>{user.email}</h3>
      <h3>{user.role}</h3>
      <img src={url + "/profile/" + user.profileImage} />
    </div>
  );
};

export default Profile;
