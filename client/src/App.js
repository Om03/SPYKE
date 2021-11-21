import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import "./css/price.css";
import "./css/nav.css";
import "./css/search.css";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Portfolio from "./pages/Portfolio";
import News from "./pages/News";
import Forgot from "./pages/Forgot";
import NotFound from './pages/NotFound/';
import StockInternal from "./pages/StockInternal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import OverLay from "./components/OverLay/";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login">
            {!user.email ? <Login /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/sign-up">
            {!user.email ? <Signup /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/search">
            {user.email ? <Search /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/stock/:ticker">
            {user.email ? <StockInternal /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/portfolio">
            {user.email ? <Portfolio /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/news">
            {user.email ? <News /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/home">
            {user.email ? <Home /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/forgot-password" component={Forgot} />
          <Route path='*'>
              <NotFound />
          </Route>
        </Switch>
        <OverLay />
      </Router>
    </>
  );
}

export default App;
