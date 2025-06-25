import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { LuPenLine } from "react-icons/lu";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("/settings/profile");
    const [profilePic, setProfilePic] = useState(null); // State to manage profile picture


  // Helper to get tab title based on activeTab
  const getTabTitle = () => {
    switch (activeTab) {
      case "/settings/profile":
        return "Profile";
      case "/settings/editProfile":
        return "Edit Profile";
      case "/settings/changePassword":
        return "Change Password";
      default:
        return "";
    }
  };

    // Handle file input change for profile picture
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); // Create a URL for the uploaded file
    }
  };

  return (
    <div className="min-h-screen">
      <div className="px-5 pb-5">
        {/* Back link with dynamic title */}
        <Link to="/" className="flex items-center gap-x-5">
          <IoArrowBack size={30} color="#555555" />
          <h1 className="text-3xl font-bold text-white text-start">
            {getTabTitle()}
          </h1>
        </Link>

        <div className="flex flex-col items-center justify-center mx-auto">
          {/* Profile Picture Section */}
          <div className="w-full">
            <div className="p-5 mt-10">
              <div className="w-[122px] relative h-[122px] mx-auto  rounded-full border-4 border-white shadow-xl flex justify-center items-center">
                <img
                   src={profilePic || ""}
                  alt="profile"
                  className="w-32 h-32 overflow-hidden rounded-full"
                  i want show here uploaded profile picture
                />
                {/* Upload Icon */}
                <div className="absolute right-0 p-2 bg-white rounded-full shadow-md cursor-pointer bottom-2">
                  <label htmlFor="profilePicUpload" className="cursor-pointer">
                    <LuPenLine />
                  </label>
                  <input type="file" id="profilePicUpload" className="hidden" onChange={handleProfilePicChange}  />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center justify-center gap-5 my-5 font-semibold text-md md:text-xl">
            <p
              onClick={() => setActiveTab("/settings/profile")}
              className={`cursor-pointer pb-1 text-white ${
                activeTab === "/settings/profile" ? "border-b-2" : ""
              }`}
            >
              Profile
            </p>
            <p
              onClick={() => setActiveTab("/settings/editProfile")}
              className={`cursor-pointer pb-1 text-white ${
                activeTab === "/settings/editProfile" ? "border-b-2" : ""
              }`}
            >
              Edit Profile
            </p>
            <p
              onClick={() => setActiveTab("/settings/changePassword")}
              className={`cursor-pointer pb-1 text-white ${
                activeTab === "/settings/changePassword" ? "border-b-2" : ""
              }`}
            >
              Change Password
            </p>
          </div>

          {/* Tab Content */}
          <div className="flex items-center justify-center p-5 rounded-md">
            <div className="w-full max-w-3xl">
              {activeTab === "/settings/profile" && (
                <Profile setActiveTab={setActiveTab} />
              )}
              {activeTab === "/settings/editProfile" && <EditProfile />}
              {activeTab === "/settings/changePassword" && <ChangePass />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
