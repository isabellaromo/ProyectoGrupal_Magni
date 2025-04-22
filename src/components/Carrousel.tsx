import { useState } from "react";

const images: string[] = [
  "banner3.png",
  "banner2.png",
  "banner.png"
  ];

const Carrousel: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex h-[720px] items-center justify-center relative mb-[50px] w-full">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`Slide ${i + 1}`}
          className={`absolute top-0 left-0 w-full h-fit object-contain opacity-0 transition-opacity duration-[800ms] ease-in-out ${i === index ? "opacity-100 z-[1]" : ""}`}
        />
      ))}
      <button onClick={prevSlide} className="left-2.5 absolute top-1/2 transform -translate-y-1/2 text-[2rem] w-[50px] bg-[rgba(255,255,255,0.7)] border-0 cursor-pointer py-[0.5rem] px-[1rem] z-[2] select-none">‹</button>
      <button onClick={nextSlide} className="right-2.5 absolute top-1/2 transform -translate-y-1/2 text-[2rem] w-[50px] bg-[rgba(255,255,255,0.7)] border-0 cursor-pointer py-[0.5rem] px-[1rem] z-[2] select-none">›</button>
    </div>
  );
};

export default Carrousel;