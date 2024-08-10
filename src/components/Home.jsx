import React, { useEffect, useState } from "react";
import { Slide } from "./Slide";
import { api } from "../api";
import { Pagination, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [countries, setCountries] = useState([]);

  const [fetchError, setFetchError] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 12;

  const [selectedCountry, setSelectedCountry] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedSelectedCountry = localStorage.getItem("selectedCountry");
    if (savedSelectedCountry) {
      setSelectedCountry(JSON.parse(savedSelectedCountry));
    }
  }, []);

  useEffect(() => {
    async function fetchingAllCountries() {
      setFetchError(null);
      setFetchLoading(true);
      try {
        const response = await api.get("");
        setCountries(response.data);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setFetchLoading(false);
      }
    }

    fetchingAllCountries();
  }, []);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries
    

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectedCountry = (country) => {
    const countryData = {
      name: country.name.common,
      population: country.population,
      flag: country.flags.svg,
      code: country.cca3,
    };

    const countryIndex = selectedCountry.findIndex(
      (item) => item.name === country.name.common
    );

    if (countryIndex === -1) {
      const updatedSelectedCountry = [...selectedCountry, countryData];
      setSelectedCountry(updatedSelectedCountry);

      localStorage.setItem(
        "selectedCountry",
        JSON.stringify(updatedSelectedCountry)
      );
    } else {
      const updatedSelectedCountry = selectedCountry.filter(
        (item) => item.name !== country.name.common
      );
      setSelectedCountry(updatedSelectedCountry);

      localStorage.setItem(
        "selectedCountry",
        JSON.stringify(updatedSelectedCountry)
      );
    }
  };

  const buttonBgColor = (country) => {
    const countryIndex = selectedCountry.findIndex((item) =>
      item.name === country.name.common ? "bg-[#6ee7b7]" : ""
    );
    return countryIndex !== -1 ? "bg-[#6ee7b7] hover:bg-red-500" : "";
  };

  const buttonText = (country) => {
    const countryIndex = selectedCountry.findIndex((item) =>
      item.name === country.name.common ? "bg-[#6ee7b7]" : ""
    );
    return countryIndex !== -1 ? "Remove" : "Select";
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className="min-h-screen mt-[50px]">
      <section>
        <Slide />
      </section>
      <div className="mt-[80px]">
        
        {fetchError && <p className="text-red-500">{fetchError}</p>}
        {fetchLoading ? (
          <Spinner
            className="ml-[700px]"
            aria-label="Extra large spinner example"
            size="xl"
          />
        ) : (
          <table className="w-full sm:w-[1400px] m-auto min-h-screen bg-white border border-gray-300 rounded-md">
            <thead className="">
              <tr className="bg-[#65cbb0] text-white">
                <th className="py-2 px-4 border-b">Flag</th>
                <th className="py-2 px-4 border-b">Population</th>
                <th className="py-2 px-4 border-b">Capital</th>
                <th className="py-2 px-4 border-b">Country</th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {currentCountries.map((country) => (
                <tr key={country.cca3} className="text-center">
                  <td className="py-2 px-4 border-b">
                  <img
                      src={country.flags.svg}
                      alt={`Flag of ${country.name.common}`}
                      className="w-8 h-5 inline-block"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    {country.population.toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {country.capital ? country.capital[0] : ""}
                  </td>
                  <td className="py-2 px-4 border-b">
                     <Link to={`/country/${country.cca3}`}>
                      <b>{country.name.common}</b>
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className={` bg-[#0891b2] hover:bg-blue-700 text-white font-normal py-1 px-2 rounded ${buttonBgColor(
                        country
                      )}`}
                      onClick={() => {
                        handleSelectedCountry(country);
                      }}
                    >
                      {buttonText(country)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
      </div>
    </main>
  );
}
