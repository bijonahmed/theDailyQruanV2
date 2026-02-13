// src/Router.js
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Juz from "../pages/Juz.jsx";
import JuzDetails from "../pages/JuzDetails.jsx";
import Surah from "../pages/Surah.jsx";
import Quran from "../pages/Quran.jsx";
import Index from "../pages/Index.jsx";
import About from "../pages/About";
import SiteMap from "../pages/SiteMap.jsx";
import Contact from "../pages/Contact";
import BrandList from "../pages/brand/brand-list";
import AddBrand from "../pages/brand/add-brand";
import Editbrand from "../pages/brand/edit-brand";
import Register from "../pages/Register";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";
import TermsandCondition from "../pages/TermsandCondition.jsx";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CategorySlug from "../pages/Category";
import SuraDetails from "../pages/SuraDetails.jsx";
import CategoryAll from "../pages/CategoryAll";
import Study from "../pages/Study";
import Certification from "../pages/GetCertification.jsx";
import Whyw3programmer from "../pages/Whyw3programmer.jsx";
import Signup from "../pages/Signup.jsx";
import Pdfbooks from "../pages/PdfBooks.jsx";
import UserProfile from "../pages/users/Profile.jsx";
import ChangePassword from "../pages/users/ChangePassword.jsx";
import MyCertificate from "../pages/users/Certificate.jsx";
import MyExam from "../pages/users/MyExam.jsx";
import Exam from "../pages/users/Exam.jsx";
import Result from "../pages/users/Result.jsx";
import Billing from "../pages/users/Billing.jsx";
import Referral from "../pages/users/Referral.jsx";
import Bookmarks from "../pages/users/Bookmarks.jsx";
import Ebooks from "../pages/users/Ebooks.jsx";
import ReadEbooks from "../pages/users/ReadEbooks.jsx";
import Certificate from "../pages/users/Certificate.jsx";
import CertificateList from "../pages/users/CertificateList.jsx";
import Torrenttutorial from "../pages/Torrenttutorial.jsx";
import Job from "../pages/Job.jsx";
import Cart from "../pages/Cart.jsx";
import VerifyCertificate from "../pages/VerifyCertificate.jsx";
import PdfZone from "../pages/PdfZone.jsx";
import PdfDetails from "../pages/PdfDetails.jsx";
import TorrentCourse from "../pages/TorrentCourse.jsx";
import CompleteGuide from "../pages/CompleteGuide.jsx";
import GuideDetails from "../pages/GuideDetails.jsx";
import NotFound from "../pages/NotFound";
import Success from "../pages/Success.jsx";
import Cancel from "../pages/Cancel.jsx";
import Payment from "../pages/Payment.jsx";

//import ProtectedRoute from "../components/ProtectedRoute";
//<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/surah" element={<Surah />} />
      <Route path="/quran-translation" element={<Quran />} />
      
      <Route path="/juz" element={<Juz />} />
      <Route path="/juz/:id" element={<JuzDetails />} />
      <Route path="/edit-brand/:id" element={<Editbrand />} />

      <Route path="/brand-list" element={<BrandList />} />
      <Route path="/add-brand" element={<AddBrand />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/referral" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/category/:slug" element={<CategorySlug />} />
      <Route path="/guide-details/:slug" element={<GuideDetails />} />
      {/* <Route path="/question-answer/:slug" element={<QuestionAnswer />} /> */}
      <Route path="/surah/:slug" element={<SuraDetails />} />

      <Route path="/pdf-zone/:slug" element={<PdfZone />} />
      <Route path="/pdf-details/:slug" element={<PdfDetails />} />
      <Route path="/torrent-course/:slug" element={<TorrentCourse />} />
      <Route path="/complete-guide" element={<CompleteGuide />} />
      <Route path="/payment-success" element={<Success />} />
      <Route path="/payment-cancel" element={<Cancel />} />

      <Route path="/all-category" element={<CategoryAll />} />
      <Route path="/study" element={<Study />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/why-w3" element={<Certification />} />
      <Route path="/whyw3programmer" element={<Whyw3programmer />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/pdf-books" element={<Pdfbooks />} />
      <Route path="/site-map" element={<SiteMap />} />
      <Route path="/torrent-tutorial" element={<Torrenttutorial />} />
      <Route path="/job" element={<Job />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/terms-and-condition" element={<TermsandCondition />} />

      <Route path="/users/profile" element={<UserProfile />} />
      <Route path="/users/change-password" element={<ChangePassword />} />
      <Route path="/users/my-certificate" element={<MyCertificate />} />
      <Route path="/users/my-exam/:slug" element={<MyExam />} />
      <Route path="/users/exam/:slug" element={<Exam />} />
      <Route path="/users/exam-results/:slug" element={<Result />} />
      <Route path="/users/getCertificate/:slug" element={<Certificate />} />
      <Route
        path="/verify-certificate/:uId/:slug"
        element={<VerifyCertificate />}
      />
      <Route path="/users/billing" element={<Billing />} />
      <Route path="/users/certificate-list" element={<CertificateList />} />
      <Route path="/users/referral" element={<Referral />} />
      <Route path="/users/my-bookmarks" element={<Bookmarks />} />
      <Route path="/users/my-books" element={<Ebooks />} />
      <Route path="/read-ebooks/:slug" element={<ReadEbooks />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
