import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import { getMe } from "./features/authSlice";
import AddAssets from "./pages/AddAssets";
import AddRole from "./pages/AddRole";
import AddUser from "./pages/AddUser";
import Dashboard from "./pages/Dashboard";
import DataAset from "./pages/DataAset";
import EditAssets from "./pages/EditAssets";
import EditRole from "./pages/EditRole";
import EditUser from "./pages/EditUser";
import Login from "./pages/Login";
import Master from "./pages/Master";
import Relocation from "./pages/Relocation";
import Roles from "./pages/Roles";
import Users from "./pages/Users";
import AddRelocation from "./pages/AddRelocation";

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
                <Route path="/relocation" element={<Relocation />} />
                <Route path="/relocation/add" element={<AddRelocation />} />
                <Route path="/role/add/" element={<AddRole />} />
                <Route path="/role/edit/:id" element={<EditRole />} />
                <Route path="/dataaset/add" element={<AddAssets />} />
                <Route path="/dataaset/edit/:id" element={<EditAssets />} />
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
