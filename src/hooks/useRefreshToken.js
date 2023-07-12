import axios from "../api/axios";
import useAuth from "./useAuth";
import jwt_decode from "jwt-decode";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/Auth/refresh-token",
      {},
      {
        withCredentials: true,
      }
    );

    const accessToken = response.data.accessToken;
    const accessTokenData = jwt_decode(accessToken);

    setAuth((prev) => {
      return { ...prev, accessToken, accessTokenData };
    });
    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
