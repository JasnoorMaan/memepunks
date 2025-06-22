const Card = () => {
  return (
    <>
      <section className="bg-cyberblack flex flex-col gap-4 p-2 justify-center items-center">
        <div className="w-full h-full">
          <img
            className="w-full h-full object-cover"
            src="/dummy.jpg"
            alt="meme"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="orbitron text-cyberyellow">Meme Title</h2>
          <p className="text-cyberpink">Meme Tags</p>
          <p className="text-cyberpink">Meme Caption</p>
        </div>
      </section>
    </>
  );
};

export default Card;
