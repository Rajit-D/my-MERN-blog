import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar.jsx";
import DashProfile from "../components/DashProfile.jsx";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const tabURL = urlParam.get("tab");
    if (tabURL) setTab(tabURL);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="">
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
    </div>
  );
};

export default Dashboard;
