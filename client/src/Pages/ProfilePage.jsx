import { useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function ProfilePage () {
  const { user,ready, setUser } = useContext(UserContext);
  const navigate = useNavigate()

  if (!user) {
    return "Loading...";
  }
  if (ready && !user) {
    return <NavLink to={"/login"} />;
  }

  async function handleLogOut() {
    await axios.post('/user/logout', {}, { withCredentials: true })  // Add `{}` as the second argument (data)
    setUser(null)
    navigate('/')
  }

  return (
    <>
      <div className="flex flex-col items-center">
          <p>
            Logged in as {user.name} {user.email}
          </p>
          <button
            type="button"
            className="bg-primary text-white w-3/6 m-2 px-2 py-1 rounded-md"
            onClick={handleLogOut}
          >
            LogOut
          </button>
        </div>

    </>
  );
};

export default ProfilePage;
