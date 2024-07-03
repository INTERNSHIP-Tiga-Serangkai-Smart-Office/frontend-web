import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import AlertComp from "./AlertComp";

function Userlist() {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showAlert, setShowAlert] = useState(null);
  const [selectRole, setSelectRole] = useState(null);

  useEffect(() => {
    getRoles();
    getUserRoles();
  }, []);

  const getRoles = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }; // Log token to verify it's not null or undefined

      const response = await axios.get("http://192.168.35.80:5000/role", config);
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const getUserRoles = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get("http://192.168.35.80:5000/users", config);
      const userRolesResponse = await axios.get("http://192.168.35.80:5000/user-role", config);
      const rolesResponse = await axios.get("http://192.168.35.80:5000/role", config);

      const users = response.data;
      const userRoles = userRolesResponse.data.userRoles;
      const roles = rolesResponse.data;

      // Create a map to efficiently lookup role IDs by user ID
      const roleIdsByUserId = userRoles.reduce((acc, { userId, roleId }) => {
        if (!acc[userId]) {
          acc[userId] = [];
        }
        acc[userId].push(roleId);
        return acc;
      }, {});

      // Update users with their corresponding roles and role IDs
      const updatedUsers = users.map((user) => {
        const roleIds = roleIdsByUserId[user.id] || [];
        const userRole = roleIds.map((roleId) => roles.find((role) => role.id === roleId)?.name);
        return { ...user, roles: userRole, roleIds: roleIds }; // Assign roleIds to user
      });

      setData(updatedUsers);
    } catch (error) {
      console.error("Error fetching user roles:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const accessToken = localStorage.getItem("accessToken"); // Retrieve token from local storage
      await axios.delete(`http://192.168.35.80:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Attach token to request headers
        },
      });
      setShowAlert(false);
      getUserRoles(); // Update users after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const addRole = async (userId, roleId) => {
    try {
      const accessToken = localStorage.getItem("accessToken"); // Retrieve token from local storage
      await axios.post(
        "http://192.168.35.80:5000/user-role",
        {
          userId: userId,
          roleId: roleId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach token to request headers
          },
        }
      );
      await getUserRoles();
      setSelectRole(null);
    } catch (error) {
      console.error("Error adding role:", error);
      setSelectRole(null);
    }
  };

  const deleteRole = async (userId, roleId) => {
    try {
      const accessToken = localStorage.getItem("accessToken"); // Retrieve token from local storage
      await axios.delete("http://192.168.35.80:5000/user-role", {
        data: { userId, roleId },
        headers: {
          Authorization: `Bearer ${accessToken}`, // Attach token to request headers
        },
      });
      // Update user data after role deletion
      await getUserRoles();
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const toggleDropdown = (index) => {
    setSelectRole((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
    setShowAlert(null);
  };

  return (
    <div>
      <h1 className="text-2xl montserrat-bold">User List</h1>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mt-5">
        <table className="min-w-full h-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-4 py-2">Roles</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d.id} className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}>
                <td className="bg-green-200">{i + 1}</td>
                <td>{d.name}</td>
                <td className="px-6 py-3">{d.email}</td>
                <td className="px-4 py-2 block sm:table-cell">
                  {d.roles &&
                    d.roles.map((role, idx) => (
                      <span key={idx} className={`xl:px-3 py-1 md:inline-block block`}>
                        {role}
                        <button onClick={() => deleteRole(d.id, d.roleIds[idx])} className="px-2 py-1 ml-1 mt-1 rounded-full text-white" style={{ backgroundColor: "red" }}>
                          x
                        </button>
                        {idx < d.roles.length - 1 && "  "}
                      </span>
                    ))}
                  <div className="relative inline-block text-left ml-2">
                    <button
                      onClick={() => toggleDropdown(i)}
                      type="button"
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      Roles
                      <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <div className={`${selectRole === i ? "absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : "hidden"}`}>
                      {roles.map((role, i) => (
                        <div key={i}>
                          <button onClick={() => addRole(d.id, role.id)}>{role.name}</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
                <td>
                  <Link to={`/users/edit/${d.id}`}>
                    <button className="p-3">
                      <MdEdit className="text-blue-700" style={{ fontSize: "1.5rem" }} />
                    </button>
                  </Link>
                  <button onClick={() => setShowAlert(d.id)}>
                    <FaTrashAlt className="text-red-600" style={{ fontSize: "1.4rem" }} />
                  </button>
                  {showAlert === d.id && <AlertComp show={true} title={"Delete User"} message={`Are you sure to delete user ${d.name}?`} onConfirm={() => handleDelete(d.id)} onCancel={() => setShowAlert(null)} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Userlist;
