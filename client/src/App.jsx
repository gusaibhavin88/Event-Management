import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/home/home";
import Home from "./pages/home/home";
import PageNotFound from "./components/pageNotFound";
import { PrivateRoute } from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import RedirectPage from "./pages/auth/redirectPage";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/singup";
import EventList from "./components/users/eventList";

function App() {
  return (
    <>
      <Router>
        <div style={{ height: "100vh" }}>
          <Routes>
            <Route exact path="/signin" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route exact path="/home" element={<Home />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route exact path="/events" element={<EventList />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route exact path="/" element={<RedirectPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
