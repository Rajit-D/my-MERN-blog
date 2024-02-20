import { Link, useNavigate } from "react-router-dom";
import { TextInput, Label, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../redux-store/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const errorMessage = JSON.stringify("Please fill out all fields ⚠️");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button clicked");
    if (!formData.email || !formData.password)
      return dispatch(signInFailure(errorMessage));
    try {
      // dispatch(signInStart());
      // const data = await axios.post("/api/auth/signin", formData);
      // console.log(data);
      // if (data.statusText === "OK") {
      //   dispatch(signInSuccess(data));
      //   navigate("/");
      // } else dispatch(signInFailure());
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) dispatch(signInFailure(data.message));
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure("Invalid credentials ⚠️"));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="left flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 rounded-lg text-white">
              Gratiano&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            exercitationem amet saepe delectus quas cumque voluptate libero
            voluptatum
          </p>
        </div>
        <div className="right lg:mt-5 flex-1">
          <form
            action=""
            className="flex flex-col col-4"
            onSubmit={handleSubmit}
          >
            <Label>Enter your email</Label>
            <TextInput
              type="email"
              id="email"
              placeholder="Eg. johndoe@mail.com"
              onChange={handleChange}
            />
            <Label>Enter your password</Label>
            <TextInput
              type="password"
              id="password"
              placeholder="********"
              onChange={handleChange}
            />
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="mt-5"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-3 text-sm">
            <span>Don&apos;t have an account?</span>
            <Link to="/signup" className="text-blue-800 font-semibold">
              Sign up
            </Link>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
