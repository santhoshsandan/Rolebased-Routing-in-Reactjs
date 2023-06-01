import { Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import User from "./components/User";
import Admin from "./components/Admin";

const USER_TYPES = {
  PUBLIC: "Public User",
  NORMAL_USER: "Normal User",
  ADMIN_USER: "Admin User",
};

const CURRENT_USER_TYPE = USER_TYPES.ADMIN_USER;
const USER_TYPE = USER_TYPES.PUBLIC;

function App() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: 8,
          backgroundColor: "rgb(110,110,210)",
          borderBottom: "1px solid red",
          color: "white",
          marginBottom: 8,
        }}
      >
        <Link style={{ color: "white" }} to="">
          Home
        </Link>
        {CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER ||
        CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER ? (
          <>
            <Link style={{ color: "white" }} to="/user">
              User
            </Link>
            <Link style={{ color: "white" }} to="/myProfile">
              User Profile
            </Link>
          </>
        ) : null}

        {CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER ? (
          <>
            <Link style={{ color: "white" }} to="/admin">
              Admin
            </Link>
          </>
        ) : null}

        <div>You are logged in as: {CURRENT_USER_TYPE}</div>
      </div>
      <AppRoutes />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <PublicElement>
            <Home />
          </PublicElement>
        }
      />
      <Route
        path="/user"
        element={
          <UserElement>
            <User />
          </UserElement>
        }
      />
      <Route
        path="/myProfile"
        element={
          <UserElement>
            <User />
          </UserElement>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminElement>
            <Admin />
          </AdminElement>
        }
      />
      <Route path="*" element={<div>Page Not Found!</div>} />
    </Routes>
  );
}

function PublicElement({ children }) {
  return <>{children}</>;
}

function UserElement({ children }) {
  if (
    CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER ||
    CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
    // return <div>You do not have access to this page!</div>;
  }
}

function AdminElement({ children }) {
  if (CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
    return <>{children}</>;
  } else {
    return <div>You do not have access to this page!</div>;
  }
}


export default App;
