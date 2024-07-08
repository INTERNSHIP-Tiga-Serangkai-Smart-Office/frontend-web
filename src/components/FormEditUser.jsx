import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../features/authSlice";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setMsg] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (id) {
      const getUserById = async () => {
        try {
          const response = await axios.get(`${apiUrl}/users/${id}`, getToken());
          setName(response.data.name);
          setEmail(response.data.email);
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      };
      getUserById();
    }
  }, [id]);

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${apiUrl}/users/${id}`,
        {
          name: name,
          email: email,
          password: password,
        },
        getToken()
      );
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="bg-white border rounded-xl p-5">
      <button
        type="button"
        onClick={() => navigate("/users", { replace: true })}
        className="m-3"
      >
        &lt; Back
      </button>
      <h1 className="mb-3 text-2xl montserrat-bold">Edit User</h1>
      <div>
        <form onSubmit={saveUser}>
          <div>
            <label className="label">Name</label>
            <div>
              <input
                type="text"
                className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="label">Email</label>
            <div>
              <input
                type="text"
                className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <div>
              <input
                type="text"
                className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex xl:justify-end mt-5 md:justify-center">
            <button
              type="submit"
              className="text-2xl montserrat-bold bg-green-300 p-3 rounded-xl shadow-lg hover:bg-green-400"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditUser;
