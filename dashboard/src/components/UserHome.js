import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UserHome = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "https://zerodha-backend-go5a.onrender.com/",
          {},
          {
            withCredentials: true,
          }
        );

        const { status, user } = data;

        if (status) {
          setUsername(user);

          toast(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Verification error:", error);
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);

  const Logout = async () => {
  try {
    await axios.post(
      "https://zerodha-backend-go5a.onrender.com/logout",
      {},
      {
        withCredentials: true,
      }
    );

    removeCookie("token");
    navigate("/login");
  } catch (error) {
    console.error("Logout error:", error);

    removeCookie("token");
    navigate("/login");
  }
};
  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>

        <button onClick={Logout}>LOGOUT</button>
      </div>

      <ToastContainer />
    </>
  );
};

export default UserHome;