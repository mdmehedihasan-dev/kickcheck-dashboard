import React from "react";
import InfoCard from "../../Components/Dashboard/InfoCard";
import { FaRegUserCircle } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { AiFillDollarCircle } from "react-icons/ai";
import User from "../../Components/Dashboard/User";
import SneakerAuthenticateChart from "../../Components/Dashboard/SneakerAuthenticateChart";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container p-4 mx-auto ">
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-4">
            <InfoCard
              title="Total Users"
              value="12,530"
              icon={<FaRegUserCircle className="w-6 h-6 text-white" />}
            />
            <InfoCard
              title="Total Sneakers"
              value="$3,530"
              icon={<SiTicktick className="w-6 h-6 text-white" />}
            />
            <InfoCard
              title="Passed Sneakers"
              value="$3,530"
              icon={<SiTicktick className="w-6 h-6 text-white" />}
            />

            <InfoCard
              title="Revenue"
              value="$$3,530"
              icon={<AiFillDollarCircle className="w-6 h-6 text-white" />}
            />
          </div>
          {/* this div for charts */}
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              {/* for user growth  */}
              <User />
            </div>
            <div>
              {/* for sneaker authenticate chart  */}
              <SneakerAuthenticateChart />
            </div>
          </div>
          {/* recent notification div  */}
          <div>
            <div className="flex items-center justify-between text-white">
              <h3 className="text-3xl font-semibold">Recent Notifications</h3>
              <Link to="/notifications">View All</Link>
            </div>
            {/* recent notification  */}
            <div className="flex flex-col gap-4 mt-5 text-white">
              <div className="flex items-center justify-between">
                <p className="text-base leading-6">
                  A new user has applied for gold membership packages and
                  waiting for approval, review the application for approval or{" "}
                </p>
                <span className="text-[#999999] capitalize">just now</span>
              </div>
                <div className="flex items-center justify-between">
                <p className="text-base leading-6">
                  A new user has applied for gold membership packages and
                  waiting for approval, review the application for approval or{" "}
                </p>
                <span className="text-[#999999] capitalize">just now</span>
              </div>
                <div className="flex items-center justify-between">
                <p className="text-base leading-6">
                  A new user has applied for gold membership packages and
                  waiting for approval, review the application for approval or{" "}
                </p>
                <span className="text-[#999999] capitalize">just now</span>
              </div>
                <div className="flex items-center justify-between">
                <p className="text-base leading-6">
                  A new user has applied for gold membership packages and
                  waiting for approval, review the application for approval or{" "}
                </p>
                <span className="text-[#999999] capitalize">just now</span>
              </div>
                <div className="flex items-center justify-between">
                <p className="text-base leading-6">
                  A new user has applied for gold membership packages and
                  waiting for approval, review the application for approval or{" "}
                </p>
                <span className="text-[#999999] capitalize">just now</span>
              </div>
                <div className="flex items-center justify-between">
                <p className="text-base leading-6">
                  A new user has applied for gold membership packages and
                  waiting for approval, review the application for approval or{" "}
                </p>
                <span className="text-[#999999] capitalize">just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
