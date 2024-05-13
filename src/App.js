import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import TalkToExperts from "./Pages/TalkToExperts";
import ExpertChat from "./Pages/ExpertChat";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContextProvider";
const RequeireAuth = () => {
  const authCtx = useContext(AuthContext);
  if (!authCtx.isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};
function App() {

  return (
    <div className="h-screen">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequeireAuth />}>
          <Route path="/" element={<TalkToExperts />} />
          <Route path="/expertChat/" element={<ExpertChat />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
