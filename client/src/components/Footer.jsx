import { Link } from "react-router";
const Footer = () => {
  return (
    <>
      <img src="/footer.svg" alt="footer" className="w-full h-auto" />
      <section className="flex bg-cyberyellow justify-around align-middle flex-col md:flex-row p-8">
        <section className="mb-6 md:mb-0">
          <h2 className="text-3xl md:text-4xl orbitron font-bold text-black mb-2">
            MemePunks
          </h2>
          <p className="text-lg text-gray-800 font-medium">
            Your ultimate meme marketplace🚀📈
          </p>
        </section>
        <section className="space-y-3">
          <Link to={"/create"}>
            <h2 className="text-xl font-semibold text-black hover:text-gray-700 cursor-pointer transition-colors">
              Create a Meme
            </h2>
          </Link>
          <Link to={"/marketplace"}>
            <h2 className="text-xl font-semibold text-black hover:text-gray-700 cursor-pointer transition-colors">
              Bid in Marketplace
            </h2>
          </Link>
          <Link to={"/trending"}>
            <h2 className="text-xl font-semibold text-black hover:text-gray-700 cursor-pointer transition-colors">
              Trending Memes
            </h2>
          </Link>
        </section>
      </section>
      <div className="bg-cyberyellow text-black py-4 px-8 text-center">
        <p className="text-sm">
          © 2025 MemePunks. All rights reserved. | Privacy Policy | Terms of
          Service
        </p>
      </div>
    </>
  );
};

export default Footer;
