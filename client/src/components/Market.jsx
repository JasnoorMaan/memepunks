import Card from "./Card";

const Market = () => {
  return (
    <>
      <section className="bg-cyberblack min-h-screen flex flex-col items-center justify-center">
        <h1
          className="orbitron text-cyberyellow text-4xl mb-12 mt-16 p-4 text-center glitch"
          data-text="MEME MARKETPLACE"
        >
          MEME MARKETPLACE
        </h1>
        <section className="flex flex-wrap gap-4 flex-col md:flex-row justify-center items-center">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </section>
    </>
  );
};

export default Market;
