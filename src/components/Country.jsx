import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import PopulationChart from "./PopulationChart";

function Country() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch country data");
        }
        const data = await response.json();
        setCountry(data[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryCode]);

  if (loading) {
    return (
      <Spinner
        className="ml-[700px] mt-10"
        aria-label="Extra large spinner example"
        size="xl"
      />
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="sm:grid sm:grid-cols-12 flex flex-col gap-5 ml-8">
      <aside className="col-span-4 p-10 ml-8">
        <article className="mb-6">
          <h1 className="font-bold text-[28px]">{country.name.common}</h1>
          <p>
            <span className="text-[24px] font-semibold mr-1">Capital:</span>{" "}
            <span className="text-[20px] "> {country.capital?.[0]}</span>
          </p>
          <p>
            <span className="text-[24px] font-semibold mr-1">Region: </span>
            <span className="text-[20px] "> {country.region}</span>
          </p>
          <p>
            <span className="text-[24px] font-semibold mr-1">Population:</span>{" "}
            <span className="text-[20px]">
              {country.population.toLocaleString()}
            </span>
          </p>
        </article>
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          width="300"
          height={400}
        />
      </aside>
    </main>
  );
}

export default Country;
