import { useEffect, useState } from "react";
import axios from "axios";
const UpdateUser = () => {
  const url = "http://localhost:5000";

  const token = localStorage.getItem("token");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const fetchUser = async () => {
    const res = await axios.get(url + "/api/v1/single", {
      headers: { token },
    });
    setUser(res.data.user);
    setProfileImage(res.data.user.profileImage);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleUserDataSubmit = async () => {
    try {
      const res = await axios.put(
        url + "/api/v1/update",
        { name: user.name, email: user.email, password: user.password },
        {
          headers: { token },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleUserProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (profileImage) formData.append("profileImage", profileImage);
    try {
      const res = await axios.put(url + "/api/v1/update/profile/", formData, {
        headers: { token },
      });
      console.log(res);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <h2> Update User Details</h2>
      <form onSubmit={handleUserDataSubmit}>
        <input
          type="text"
          name="name"
          placeholder={user.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder={user.password}
          onChange={handleChange}
        />
        <button type="submit"> Update Details</button>
      </form>
      <form onSubmit={handleUserProfileSubmit}>
        <h1>Update Profile Pic</h1>
        <input
          type="file"
          name="profileImage"
          placeholder="profileImage"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        <img src={url + "/profile/" + profileImage} />
        <button type="submit">Update Profile Pic</button>
      </form>
    </div>
  );
};

export default UpdateUser;
