import { Link } from "react-router";
import supabase from "../../supabase";

const Navbar = ({ session }) => {
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
            <Link to={"/marketplace"}>
              <h2 className="text-cyberyellow hover:text-cyberpink transition-colors cursor-pointer">
                Marketplace
              </h2>
            </Link>
            <Link to={"/signin"}>
              {session ? (
                <button
                  className="svg-button-sm"
                  onClick={async () => await supabase.auth.signOut()}
                >
                  SignOut
                </button>
              ) : (
                <button className="svg-button-sm">Login/SignUp</button>
              )}
            </Link>
          </section>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
