import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";

import { AuthProvider } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import MarketPage from "./pages/MarketPage";
import TrendingPage from "./pages/TrendingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-cyberblack flex flex-col">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreatePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/trending" element={<TrendingPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
