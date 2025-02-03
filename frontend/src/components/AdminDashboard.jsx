import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const url = "http://localhost:5000";
  const data = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(url + "/api/v1/", {
        headers: {
          token,
        },
      });
      console.log(result.data);
      setUsers(result.data.users);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const removeUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${url}/api/v1/remove/${userId}`, {
        headers: { token },
      });
      console.log(res);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    data();
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
            <button onClick={() => removeUser(user._id)}>
              Delete user {user._id}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
