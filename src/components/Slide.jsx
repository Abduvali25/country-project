import { Carousel } from "flowbite-react";

export function Slide() {
  const countries = JSON.parse(localStorage.getItem("selectedCountry"));

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel className={`bg-[#65cbb0] text-white`}>
        {countries &&
          countries.map((country, index) => (
            <div
              key={index}
              className="flex h-full items-center justify-center gap-5"
            >
              <img
                src={country.flag}
                alt={country.name}
                width={300}
                height={300}
              />
              <article>
                <p className="font-bold text-[32px]">
                  Country: <span className="font-light">{country.name}</span>
                </p>
                <p className="font-bold text-[32px]">
                  Population:
                  <span className="font-light">
                    {country.population.toLocaleString()}
                  </span>
                </p>
              </article>
            </div>
          ))}
      </Carousel>
    </div>
  );
}
