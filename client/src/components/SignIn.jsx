import React, { useState } from "react";

const SignIn = ({
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  loading,
}) => {
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleChange = (e) => {
    setSignIn({
      ...signIn,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = isSignUpMode
        ? await signUpWithEmail(signIn.email, signIn.password)
        : await signInWithEmail(signIn.email, signIn.password);

      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const result = await signInWithGoogle();
      if (!result.success) {
        setError(result.error);
      }
    } catch (error) {
      setError("Failed to sign in with Google", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <section className="min-h-screen bg-cyberblack flex items-center justify-center p-4">
        <section className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1
              className="orbitron text-cyberyellow text-4xl mb-4 text-glitch"
              data-text={isSignUpMode ? "JOIN MATRIX" : "ENTER MATRIX"}
            >
              {isSignUpMode ? "JOIN MATRIX" : "ENTER MATRIX"}
            </h1>
            {error && (
              <div className="text-cyberpink text-sm sans mb-4 p-2 bg-black/50 border-2 border-cyberpink/30 rounded">
                {error}
              </div>
            )}
          </div>
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label className="block text-cyberpink mb-2 orbitron text-cyber-sm">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={signIn.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
                disabled={isSubmitting}
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
                value={signIn.password}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                minLength={6}
                className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-cyberpink to-cyberyellow text-black font-bold text-lg orbitron rounded hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {isSubmitting
                ? "AUTHENTICATING..."
                : isSignUpMode
                ? "CREATE AN ACCOUNT"
                : "ENTER MATRIX"}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cyberyellow/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-cyberblack text-cyberyellow orbitron">
                OR
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-cyberpink to-cyberyellow text-black font-bold text-lg orbitron rounded hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? "CONNECTING..." : "SIGN IN WITH GOOGLE"}
          </button>

          <div className="text-center">
            <button
              onClick={() => {
                setIsSignUpMode(!isSignUpMode);
                setError("");
                setSignIn({ email: "", password: "" });
              }}
              className="text-cyberyellow hover:text-cyberpink transition-colors orbitron text-sm"
            >
              {isSignUpMode
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default SignIn;
