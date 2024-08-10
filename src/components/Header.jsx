import React from "react";
import { NavLink } from "react-router-dom";
import { Drawer } from "flowbite-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const countries = JSON.parse(localStorage.getItem("selectedCountry"));

  return (
    <header className=" bg-[#65cbb0] text-white mt-2 rounded-md  max-w-[900px] flex justify-between m-auto py-3 px-5 items-center">
      <nav>
        <ul>
          <li>
            <NavLink to={"/"}>
              <h1 className="hover:font-extralight transition-[0.4] font-bold text-[32px]">
                LOGO
              </h1>
            </NavLink>
          </li>
        </ul>
      </nav>
      <button
        onClick={() => setIsOpen(true)}
        className="w-[140px] h-[40px] bg-white rounded-lg py-1 px-2 text-black hover:bg-[#0891b2] hover:border-2 hover:text-white transition-[0.4]"
      >
        Tanlanganlar
      </button>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Selected countries" />
        <Drawer.Items>
          {countries &&
            countries.map((country, index) => (
              <div key={index} className="flex h-full items-center  gap-5">
                <article>
                  <p className="mb-1 text-[16px] font-bold text-gray-500 dark:text-gray-400">
                    Country:{" "}
                    <span className="font-light text-[18px]">
                      {country.name}
                    </span>
                  </p>
                  <p className="mb-2 text-[16px] font-bold text-gray-500 dark:text-gray-400">
                    Population:
                    <span className="font-light text-[18px]">
                      {country.population.toLocaleString()}
                    </span>
                  </p>
                </article>
                <img
                  src={country.flag}
                  alt={country.name}
                  width={50}
                  height={50}
                />
              </div>
            ))}
        </Drawer.Items>
      </Drawer>
    </header>
  );
}
