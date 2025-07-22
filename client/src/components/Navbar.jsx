import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, signOut, loading } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-100 border-b-0 bg-black/20 border-white/10 shadow-lg">
        <section className="flex justify-between align-middle items-center px-6 py-4">
          <section className="orbitron text-xl font-bold">
            <Link to={"/"}>
              <h2 className="text-cyberyellow drop-shadow-lg">MemePunks</h2>
            </Link>
          </section>

          <section className="flex gap-8 items-center text-lg font-semibold">
            <Link to={"/create"}>
              <h2 className="text-cyberyellow hover:text-cyberpink transition-colors cursor-pointer">
                Create
              </h2>
            </Link>

            <Link to={"/trending"}>
              <h2 className="text-cyberyellow hover:text-cyberpink transition-colors cursor-pointer">
                Trending
              </h2>
            </Link>
            <Link to={"/market"}>
              <h2 className="text-cyberyellow hover:text-cyberpink transition-colors cursor-pointer">
                Marketplace
              </h2>
            </Link>
            {loading ? (
              <div className="text-cyberyellow orbitron text-2xl">
                LOADING...
              </div>
            ) : isAuthenticated ? (
              <button
                className="svg-button-sm bg-cyberblack text-black transition-colors"
                onClick={handleSignOut}
              >
                SIGN OUT
              </button>
            ) : (
              <div className="flex gap-4">
                <Link to={"/signin"}>
                  <button className="svg-button-sm bg-cyberblack text-black transition-colors">
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </section>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
