import {
  Route,
  Routes,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useEffect } from "react";
import { browserType } from "@/store";
import MobileNav from "@/layouts/mobile";
import Header from "@/layouts/header";
import { BeatLoader, BounceLoader } from "react-spinners";
import { HelmetProvider } from "react-helmet-async";
import Footer from "@/layouts/footer";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import CategoryPage from "@/pages/category";
import categories from "@/constant/categories";
import ProductDetailsPage from "@/pages/product-details";
import { Toaster } from "react-hot-toast";
import Protected from "./components/protected";
import ProductDetailsPageWithID from "./pages/product-details/with-id";
import CreateAdPage from "./pages/create-ad";
import WatchlistPage from "./pages/watchlist";
import NotificationPage from "./pages/notification";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import SearchPage from "./pages/search";
import UserDashboard from "./pages/user/dashboard";
import Profile from "./pages/user/profile";
import Store from "./pages/user/store";
import Activities from "./pages/user/activities";
import ForgotPassword from "./pages/forgot";
import ResetPassword from "./pages/forgot/reset";
import NewPassword from "./pages/forgot/password";
import { RoutePath } from "./routes/routePath";
import Dashboard from "./pages/cms/dashboard";
import Ads from "./pages/cms/ads";
import Plans from "./pages/cms/plans";
import Blogs from "./pages/blog";
import FAQ from "./pages/faq";
import ChangeEmail from "./pages/user/change-email";
import ChangePhoneNumber from "./pages/user/change-phone-number";
import EditProduct from "./pages/create-ad/edit";
import CreateAd from "./pages/create-ad/createAd";
import Faqs from "./pages/cms/faqs";
import Chat from "./pages/user/chat";
import BlogPost from "./pages/cms/blog/blog-post";
import CreateBlog from "./pages/cms/blog/create-blog";
import EditBlog from "./pages/cms/blog/edit-blog";
import BlogDetail from "./pages/blog/detail";
import MACEOS from "./pages/maceos";
import UploadReciept from "./pages/maceos/UploadReciept";
import DashboardSummary from "./pages/user/dashboardSummary";
import Courses from "./pages/user/courses";
import MaceoWelcome from "./pages/maceos/welcome";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TestUser from "./pages/user/test-user";
import ExamUser from "./pages/user/exam-user";
import Curriculum from "./pages/user/Curriculum";
import CourseFaq from "./pages/user/course-faq";
import Students from "./pages/cms/students";
import Result from "./pages/cms/result";
import Course from "./pages/cms/courses";
import Questionaire from "./pages/cms/questionaire";
import Questions from "./pages/cms/questions";
import Dealers from "./pages/cms/dealers";
import Staff from "./pages/cms/staff";
import Finance from "./pages/cms/finance";
import Expenses from "./pages/cms/expenses";
import Settings from "./pages/cms/settings";
import RequestItems from "./pages/cms/requestItem";
import Items from "./pages/cms/Items";
import DealerPost from "./pages/cms/dealerPost";

export const Loader = ({ full }) => {
  return (
    <div
      className={`${
        full ? "h-screen w-screen" : "h-[calc(100vh-250px)]"
      } min-h-[250px] w-full flex justify-center items-center`}
    >
      {isMobile ? (
        <BeatLoader color="#1c9236" />
      ) : (
        <BounceLoader color="#1c9236" />
      )}
    </div>
  );
};

export default function App() 
{

  const categoryPaths = categories.map((category) => category.link);

  const location = useLocation();

  useEffect(() => {
    if (isMobile) {
      browserType.setState({
        isMobile: true,
      });
    }
  }, []);

  return (
    <>
      <HelmetProvider>
        <Header />

        <Toaster />

        <div className="md:min-h-[calc(100vh-150px)] min-h-[calc(100vh-250px)] h-full w-full">
          <Routes location={location} key={location.pathname}>
            {/*  */}
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            
            {/* <Route path="/dashboard" element={<RoutePath />} /> */}

            <Route path="/overview" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/dealer-post" element={<DealerPost />} />
            <Route path="/staffs" element={<Staff />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/request-item" element={<RequestItems />} />
            <Route path="/items" element={<Items />} />
            <Route path="/settings" element={<Settings />} />

            {/* <Route path="/course" element={<Course />} /> */}
            <Route path="/questionaires" element={<Questionaire />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/result" element={<Result />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/package" element={<Plans />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog-post" element={<BlogPost />} />
            <Route path="/create-post" element={<CreateBlog />} />
            <Route path="/edit-post/:id" element={<EditBlog />} />
            <Route path="/blog-detail/:post_id" element={<BlogDetail />} />

            {/* Category Page */}
            {categoryPaths.map((path, idx) => (
              <Route key={idx} path={path} element={<CategoryPage />} />
            ))}

            {/* Product Details Page */}
            {categoryPaths.map((path, idx) => (
              <Route
                key={idx}
                path={`${path}/:slug`}
                element={<ProductDetailsPage />}
              />
            ))}

            <Route path="/product/details/:id" element={<ProductDetailsPageWithID />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/maceos-registration" element={<MACEOS />} />
            <Route path="/maceos-upload-receipt" element={<UploadReciept />} />
            <Route path="/maceos-welcome" element={<MaceoWelcome />} />

            {/* Authentication Required Routes */}
            <Route
              path="/post-ad"
              element={
                <Protected>
                  <CreateAdPage />
                </Protected>
              }
            />

            <Route
              path="/watchlist"
              element={
                <Protected>
                  <WatchlistPage />
                </Protected>
              }
            />

            <Route
              path="/messages"
              element={
                <Protected>
                  <NotificationPage />
                </Protected>
              }
            />

            <Route
              path="/dashboard"
              element={
                <Protected>
                  <UserDashboard />
                </Protected>
              }
            >
              <Route index element={<DashboardSummary />} />
            
              <Route path="/dashboard/store" element={<Store />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/activities" element={<Activities />} />
              <Route path="/dashboard/create-advert" element={<CreateAd />} />
              <Route path="/dashboard/change-email" element={<ChangeEmail />} />
              <Route path="/dashboard/change-phone-number" element={<ChangePhoneNumber />} />
              <Route path="/dashboard/store/:id/edit/:country_id/:make_id/:model_id" element={<EditProduct />} />
              <Route path="/dashboard/chat" element={<Chat />} />
              <Route path="/dashboard/summary" element={<DashboardSummary />} />
              <Route path="/dashboard/courses" element={<Courses />} />
              <Route path="/dashboard/test-user" element={<TestUser />} />
              <Route path="/dashboard/exam-user" element={<ExamUser />} />
              <Route path="/dashboard/curriculum" element={<Curriculum />} />
              <Route path="/dashboard/course-faq" element={<CourseFaq />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* </div> */}

          <ScrollRestoration />
        </div>
        <Footer />
        {/* {isMobile && <MobileNav />} */}
      </HelmetProvider>
    </>
  );
}
