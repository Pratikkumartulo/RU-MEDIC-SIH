import { useNavigate } from "react-router-dom";
import authServie from "../Appwrite/userConfig";
import { useDispatch } from "react-redux";
import { logout } from "../store/AuthSlice";

export default function Logoutbtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await authServie.logout();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      // Optionally handle error
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
    >
      Logout
    </button>
  );
}