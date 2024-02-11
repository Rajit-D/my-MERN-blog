import { Link, useNavigate } from "react-router-dom";
import { TextInput, Label, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password)
      return setErrorMessage("Please fill out all fields.");
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await axios.post("/api/auth/signup", formData);
      setIsLoading(false);
      navigate("/signin");
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
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
            <Label>Enter your username</Label>
            <TextInput
              type="text"
              id="username"
              placeholder="Eg. John Doe"
              onChange={handleChange}
            />
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
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
          <div className="flex gap-2 mt-3 text-sm">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-800 font-semibold">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
