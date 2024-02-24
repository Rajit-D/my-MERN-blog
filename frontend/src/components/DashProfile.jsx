import { useSelector } from "react-redux";
import { TextInput, Button } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  // const handleImage = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //     setImageURL(URL.createObjectURL(imageFile));
  //   }
  //   console.log(imageURL);
  // };

  const handleImage = (e) => {
    // setImageFile(e.target.files[0]);
    console.log(e.target.files[0]);
    submitImage();
  };

  const submitImage = () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "uvlvsfq1");
    data.append("cloud_name", "drdbanvwj");

    const res = axios
      .post("https://api.cloudinary.com/v1_1/drdbanvwj/image/upload", data)
      .then((res) => res.json());
    console.log(res);
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" accept="image/.*" onChange={handleImage} />
        <div className="w-32 h-32 self-center cursor-pointer shadow-lg overflow-hidden rounded-full">
          <img
            src={currentUser.data.rest.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-lime-400"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={imageURL || currentUser.data.rest.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.data.rest.email}
        />
        <Button type="submit" gradientDuoTone="pinkToOrange">
          Update
        </Button>
      </form>
      <div className="flex justify-between mt-5">
        <Button type="submit">Delete account</Button>
        <Button type="submit">Sign out</Button>
      </div>
    </div>
  );
};

export default DashProfile;
