import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux-store/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const googleResults = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: googleResults.user.displayName,
          email: googleResults.user.email,
          profilePicture: googleResults.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      gradientDuoTone="pinkToOrange"
      type="submit"
      className="mt-5"
      outline
      onClick={handleGoogleClick}
    >
      <>
        <FaGoogle />
        <span className="pl-3">Continue with google</span>
      </>
    </Button>
  );
};

export default OAuth;
