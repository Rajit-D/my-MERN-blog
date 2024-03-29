import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  Navbar,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux-store/theme/themeSlice";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <Navbar>
      <Link to="/">
        <span className="whitespace-nowrap text-xl font-semibold dark:text-white">
          Gratiano&apos;s blog
        </span>
      </Link>
      <TextInput
        type="text"
        placeholder="Search..."
        rightIcon={FaSearch}
        className="hidden lg:inline"
      />
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <FaSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {currentUser.username}
              </span>
              <span className="block text-sm">
                @{currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <DropdownDivider />
            <Link to={"/signout"}>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Link>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button
              className="hidden sm:inline"
              gradientDuoTone="redToYellow"
              outline
            >
              Sign in
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          Home
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          About
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          Projects
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
