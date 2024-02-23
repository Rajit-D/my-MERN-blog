import { useSelector } from "react-redux";
import { TextInput, Button } from "flowbite-react";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
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
          defaultValue={currentUser.data.rest.username}
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
