import React from "react";
import { IoMdOpen } from "react-icons/io";

const Footer = () => {
  return (
    <div className="py-10 flex items-center justify-center text-white bg-gray-950 flex-col px-20">
      <div className="bg-gray-600 h-px w-full my-6" />
      <div className="flex flex-col items-center justify-center">
        <div className="my-4">
          <a
            href="https://github.com/garfieldvans/imdb-alike-rateme"
            className="text:xm md:text-sm hover:underline flex items-center gap-1 hover:text-blue-400"
          >
            Visit The Repository <IoMdOpen />
          </a>
        </div>
        <h1 className="text-sm md:text-base text-gray-500 ">Made with ❤️ and alot of coffee</h1>
        <h1 className="my-4 text-sm md:text-base text-gray-500">&copy;By Bastian - 2024</h1>
      </div>
    </div>
  );
};

export default Footer;
