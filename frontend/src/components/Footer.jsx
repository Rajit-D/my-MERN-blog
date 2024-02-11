import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import { FiGithub, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

const FooterComp = () => {
  return (
    <Footer container className="border border-t-4 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mb-4 lg:mb-0">
            <Link to="/" className="font-bold dark:text-white text-4xl">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 rounded-lg text-white">
                Gratiano&apos;s
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="" target="_blank" rel="noopener noreferrer">
                  Title 1
                </Footer.Link>
                <Footer.Link href="" target="_blank" rel="noopener noreferrer">
                  Title 2
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="" target="_blank" rel="noopener noreferrer">
                  Title 1
                </Footer.Link>
                <Footer.Link href="" target="_blank" rel="noopener noreferrer">
                  Title 2
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="" target="_blank" rel="noopener noreferrer">
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href=""
            by="Gratiano's"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="" icon={FiFacebook} />
            <Footer.Icon href="" icon={FiInstagram} />
            <Footer.Icon href="" icon={BsTwitterX} />
            <Footer.Icon href="" icon={FiLinkedin} />
            <Footer.Icon href="" icon={FiGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComp;
