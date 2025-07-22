import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { handleAPIerror } from "../api/service";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { signUp, loading } = useAuth();
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match, try again");
      return;
    }

    if (formData.password.length < 8 || formData.password.length > 20) {
      setError("Password must be between 8 and 20 characters");
      return;
    }
    const result = await signUp({
      email: formData.email,
      username: formData.username,
      password: formData.password,
    });
    if (!result.success) {
      const errInfo = handleAPIerror(result.error);
      setError(errInfo.message);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-cyberblack flex items-center justify-center p-4">
        <section className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="orbitron text-cyberyellow text-4xl mb-4 text-glitch">
              JOIN THE MATRIX
            </h1>
            {error && (
              <div className="text-cyberpink text-sm sans mb-4 p-2 bg-black/50 border-2 border-cyberpink/30 rounded">
                {error}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-cyberpink mb-2 orbitron text-cyber-sm">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-cyberpink mb-2 orbitron text-cyber-sm">
                USERNAME
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username..."
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
                minLength={3}
                maxLength={20}
                className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-cyberpink mb-2 orbitron text-cyber-sm">
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                maxLength={20}
                className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-cyberpink mb-2 orbitron text-cyber-sm">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password..."
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
                minLength={8}
                maxLength={20}
                className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyberpink to-cyberyellow text-black font-bold text-lg orbitron rounded hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {loading ? "CREATING ACCOUNT..." : "JOIN THE MATRIX"}
            </button>
          </form>

          <div className="text-center">
            <a
              href="/signin"
              className="text-cyberyellow hover:text-cyberpink transition-colors orbitron text-sm"
            >
              Already in the Matrix? Sign In
            </a>
          </div>
        </section>
      </section>
    </>
  );
};
export default SignUp;
