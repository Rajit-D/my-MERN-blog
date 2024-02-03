import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSearch } from "react-icons/fa";

const Header = () => {
  const path = useLocation().pathname;
  return (
    <Navbar>
      <Link to="/">
        <span className="whitespace-nowrap text-xl font-semibold dark:text-white">
          Gratiano's blog
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
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/signin">
          <Button className="hidden sm:inline" radientDuoTone="redToYellow">
            Sign in
          </Button>
        </Link>
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
