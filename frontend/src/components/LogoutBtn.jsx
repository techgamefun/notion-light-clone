import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const LogoutBtn = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
    window.location.reload();
  };
  return (
    <button
      onClick={logout}
      type="button"
      className=" text-white cursor-pointer bg-gray-500 hover:bg-gray-600  font-medium rounded-lg text-sm px-5 py-1  mx-4 my-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
