import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const loggedData = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("newtrition-user");
    loggedData.setLoggedUser(null);
    navigate("/login");
  }

  return (
    <div className="w-100 flex flex-col items-center p-6">
      <ul className="flex justify-between items-center w-full max-w-md">
        <li
          className="bg-orange-500 px-1 py-1 uppercase cursor-pointer rounded-xl text-sm hover:bg-green-600 text-center"
          style={{ width: "30%" }}
        >
          <Link to="/tracking">Track</Link>
        </li>
        <li
          className="bg-orange-500 px-1 py-1 uppercase cursor-pointer rounded-xl text-sm hover:bg-green-600 text-center"
          style={{ width: "30%" }}
        >
          <Link to="/diet">Diet</Link>
        </li>
        <li
          className="bg-orange-500 px-1 py-1 uppercase cursor-pointer rounded-xl hover:bg-green-600 text-center text-sm"
          style={{ width: "35%" }}
          onClick={logout}
        >
          Logout
        </li>
      </ul>
      <div>
        <h1 className="text-4xl font-bold mt-6">Newtrition</h1>
      </div>
    </div>
  );
}

export default Header;
