import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/profilePage/ProfilePage";
import ContactsPage from "./pages/contactPage/ContactPage";
import ExplorePage from "./pages/explorePage/ExplorePage";
import LoginPage from "./pages/loginPage/LoginPage";
import SignupPage from "./pages/signupPage/SignupPage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Navigate } from "react-router-dom";

const App = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/profile"
          element={token ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/contacts"
          element={token ? <ContactsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/explore"
          element={token ? <ExplorePage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
