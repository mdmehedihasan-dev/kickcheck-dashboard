import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import AboutUs from "../Pages/Settings/AboutUS/AboutUs";
import PrivacyPolicy from "../Pages/Settings/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "../Pages/Settings/TermsCondition/TermsCondition";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ProfilePage from "../Pages/AdminProfile/ProfilePage";
import VerifyCode from "../Pages/Auth/VerifyCode/VerifyCode";
import NewPass from "../Pages/Auth/NewPass/NewPass";
import VaultManagement from "../Pages/VaultManagement/VaultManagement";
import VaultDetails from "../Pages/VaultManagement/VaultDetails";
import Notifications from "../Pages/Notifications/Notifications";
import AnalysisPage from "../Pages/Analysis/AnalysisPage";
import FeedbackSupport from "../Pages/FeedbackSupport/FeedbackSupport";
import Subscriptions from "../Pages/Subscriptions/Subscriptions";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/forgate-password",
    element: <ForgatePassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/new-password",
    element: <NewPass />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/analysis", element: <AnalysisPage /> },
          { path: "/vault-management", element: <VaultManagement /> },
           { path: "/subscriptions-payment", element: <Subscriptions/> },
          { path: "/feedback-support", element: <FeedbackSupport/> },
          { path: "/vault-management/:id", element: <VaultDetails /> },
          { path: "/notifications", element: <Notifications /> },
          { path: "/settings/about-us", element: <AboutUs /> },
          { path: "/settings/privacy-policy", element: <PrivacyPolicy /> },
          { path: "/settings/terms-condition", element: <TermsCondition /> },
          { path: "/settings/profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
]);
