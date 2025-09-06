import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function CustomGoogleButton() {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);

      // tokenResponse contains access_token
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );

      console.log("User Info:", userInfo.data); // name, email, picture
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Continue with Google
    </button>
  );
}

export default CustomGoogleButton;
