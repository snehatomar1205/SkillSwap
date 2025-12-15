import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import Requests from "./pages/Requests";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MySkills from "./pages/MySkills";
import Profile from "./pages/Profile";
import CreateSkill from "./pages/CreateSkill";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import SkillDetails from "./pages/SkillDetails";
import Chat from "./pages/Chat";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {token && <Navbar />}

      <div className={token ? "pt-20 " : ""}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Requests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-skills"
            element={
              <ProtectedRoute>
                <MySkills />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-skill"
            element={
              <ProtectedRoute>
                <CreateSkill />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skill/:id"
            element={
              <ProtectedRoute>
                <SkillDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:roomId"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
