import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavLinks = ({ mobile = false, onLinkClick = () => {} }) => (
  <>
    <Link to="/create" onClick={onLinkClick}>
      <h2
        className={
          mobile
            ? "text-center text-cyberyellow cursor-pointer text-2xl py-4 border-b border-cyberpink/20"
            : "text-cyberyellow hover:text-cyberpink transition-colors cursor-pointer"
        }
      >
        Create
      </h2>
    </Link>
    <Link to="/trending" onClick={onLinkClick}>
      <h2
        className={
          mobile
            ? "text-center  text-cyberyellow cursor-pointer text-2xl py-4 border-b border-cyberpink/20"
            : "text-cyberyellow hover:text-cyberpink transition-colors cursor-pointer"
        }
      >
        Trending
      </h2>
    </Link>
    <Link to="/market" onClick={onLinkClick}>
      <h2
        className={
          mobile
            ? "text-center text-cyberyellow cursor-pointer text-2xl py-4 border-b border-cyberpink/20"
            : "text-cyberyellow hover:text-cyberpink transition-colors cursor-pointer"
        }
      >
        Marketplace
      </h2>
    </Link>
  </>
);
const AuthSection = ({ mobile = false, onLinkClick = () => {} }) => {
  const { isAuthenticated, signOut, loading } = useAuth();

  const handleSignOut = () => {
    signOut();
    onLinkClick();
  };

  return (
    <>
      {loading ? (
        <div
          className={`text-center text-cyberyellow orbitron ${
            mobile ? "text-2xl py-4" : "text-2xl"
          }`}
        >
          LOADING...
        </div>
      ) : isAuthenticated ? (
        <button
          className={`text-center svg-button-sm bg-cyberblack text-black transition-colors ${
            mobile ? "w-full py-4 text-xl" : ""
          }`}
          onClick={handleSignOut}
        >
          SIGN OUT
        </button>
      ) : (
        <div className={`${mobile ? "w-full" : "flex gap-4"}`}>
          <Link to="/signin" onClick={onLinkClick}>
            <button
              className={`text-center svg-button-sm bg-cyberblack text-black transition-colors ${
                mobile ? "w-full py-4 text-xl" : ""
              }`}
            >
              Sign In
            </button>
          </Link>
        </div>
      )}
    </>
  );
};
const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-0 bg-black/20 border-white/10 shadow-lg backdrop-blur-md">
        <section className="flex justify-between align-middle items-center px-6 py-4">
          <section className="orbitron text-xl font-bold">
            <Link to={"/"}>
              <h2 className="text-cyberyellow drop-shadow-lg">MemePunks</h2>
            </Link>
          </section>

          {/* Desktop */}
          <section className="hidden md:flex gap-8 items-center text-lg font-semibold">
            <NavLinks />
            <AuthSection />
          </section>

          {/* Mobile */}
          <section className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none">
                  <span className="block w-6 h-0.5 bg-cyberyellow mb-1 transition-all duration-300"></span>
                  <span className="block w-6 h-0.5 bg-cyberyellow mb-1 transition-all duration-300"></span>
                  <span className="block w-6 h-0.5 bg-cyberyellow transition-all duration-300"></span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-cyberblack/95 border-l border-cyberpink/30"
              >
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-center">
                    <span className="text-cyberyellow">Meme</span>
                    <span className="text-cyberpink">Punks</span>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col items-center justify-center space-y-6">
                  <NavLinks mobile onLinkClick={handleLinkClick} />

                  {/* Mobile Auth Section */}
                  <div className="pt-6 border-t border-cyberpink/20">
                    <AuthSection mobile onLinkClick={handleLinkClick} />
                  </div>
                </div>

                {/* Mobile Footer */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-center">
                    <p className="text-cyberpink/60 text-xs">
                      &gt; NEURAL INTERFACE ACTIVE &lt;
                    </p>
                    <div className="mt-2 flex justify-center">
                      <div className="w-2 h-2 bg-cyberpink rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </section>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
