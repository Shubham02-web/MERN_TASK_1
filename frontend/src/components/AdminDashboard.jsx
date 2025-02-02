import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const url = "http://localhost:5000";
  const data = async () => {
    try {
      const result = await axios.get(url + "/api/v1/");
      setUsers(result.data.users);
      console.log(result.data.users);
    } catch (error) {
      console.log(error.message);
    }
  };
  data();
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div>
      {users.map((user) => (
        <div className="users" key={user._id}>
          <div className="user">
            <p>{user._id}</p>
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
            <h2>{user.role}</h2>
            <img src={url + "/profile/" + user.profileImage} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
