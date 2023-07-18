import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      axios.post(
        "/Auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("user");
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
