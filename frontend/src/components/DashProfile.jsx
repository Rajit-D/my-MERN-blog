import { useDispatch, useSelector } from "react-redux";
import { TextInput, Button, Alert } from "flowbite-react";
import { useState } from "react";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux-store/user/userSlice";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  // const [imageFile, setImageFile] = useState(null);
  // const [imageURL, setImageURL] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Updated successfully");
      }
    } catch (error) {
      console.log(error);
      setUpdateUserError(error);
    }
  };

  // const handleImage = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //     setImageURL(URL.createObjectURL(imageFile));
  //   }
  //   console.log(imageURL);
  // };

  // const handleImage = (e) => {
  // setImageFile(e.target.files[0]);
  //   console.log(e.target.files[0]);
  //   submitImage();
  // };

  // const submitImage = () => {
  //   const data = new FormData();
  //   data.append("file", imageFile);
  //   data.append("upload_preset", "uvlvsfq1");
  //   data.append("cloud_name", "drdbanvwj");

  //   const res = axios
  //     .post("https://api.cloudinary.com/v1_1/drdbanvwj/image/upload", data)
  //     .then((res) => res.json());
  //   console.log(res);
  // };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/.*"
          // onChange={handleImage}
        />
        <div className="w-32 h-32 self-center cursor-pointer shadow-lg overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-lime-400"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="pinkToOrange">
          Update
        </Button>
        {updateUserSuccess && (
          <Alert color="success" className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert color="failure" className="mt-5">
            {updateUserError}
          </Alert>
        )}
      </form>
      <div className="flex justify-between mt-5">
        <Button>Delete account</Button>
        <Button>Sign out</Button>
      </div>
    </div>
  );
};

export default DashProfile;
