import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataAset from "./pages/DataAset";
import Users from "./pages/Users";
import AddAssets from "./pages/AddAssets";
import Roles from "./pages/Roles";
import AddRole from "./pages/AddRole";
import Master from "./pages/Master";
import EditRole from "./pages/EditRole";
import SideBar from "./components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./features/authSlice";
import EditAssets from "./pages/EditAssets";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import PrintQRCode from "./pages/PrintQRCode";
import Detail from "./pages/Detail";

function App() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [hideSidebar, setHideSidebar] = useState(true);
  const { Error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (Error) {
      setHideSidebar(true);
    } else {
      setHideSidebar(false);
    }
  }, [Error, setHideSidebar]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <SideBar isHidden={hideSidebar}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dataaset" element={<DataAset />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/add" element={<AddUser />} />
                <Route path="/users/edit/:id" element={<EditUser />} />
                <Route path="/role" element={<Roles />} />
                <Route path="/role/add/" element={<AddRole />} />
                <Route path="/role/edit/:id" element={<EditRole />} />
                <Route path="/dataaset/detail/:id" element={<Detail />} />
                <Route path="/dataaset/add" element={<AddAssets />} />
                <Route path="/dataaset/edit/:id" element={<EditAssets />} />
                <Route path="/dataaset/printqr" element={<PrintQRCode />} />
                <Route path="/master" element={<Master />} />
              </Routes>
            </SideBar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
