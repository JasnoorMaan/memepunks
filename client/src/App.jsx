import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import MarketPage from "./pages/MarketPage";
import TrendingPage from "./pages/TrendingPage";
import { useState, useEffect } from "react";
import supabase from "../supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  const signInWithEmail = async (email, password) => {
    try {
      const [data, error] = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  const signUpWithEmail = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cyberblack flex items-center justify-center">
        <div className="text-cyberyellow orbitron text-2xl">LOADING...</div>
      </div>
    );
  }
  if (!session) {
    return (
      <SignIn
        signInWithGoogle={signInWithGoogle}
        signInWithEmail={signInWithEmail}
        signUpWithEmail={signUpWithEmail}
        loading={loading}
      />
    );
    // return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
      <Router>
        <div className="min-h-screen bg-cyberblack flex flex-col">
          <Navbar session={session} />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/marketplace" element={<MarketPage />} />
              <Route path="/trending" element={<TrendingPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
