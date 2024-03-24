import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./states.module.css";

export default function States() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const getCountries = async () => {
    try {
      const data = await axios.get(
        `https://crio-location-selector.onrender.com/countries`
      );
      setCountries(data.data);
    } catch (err) {
      console.error("Error fetching countries: ", err);
    }
  };

  const getStates = async () => {
    try {
      const data = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      setStates(data.data);
    } catch (err) {
      console.error("Error fetching countries: ", err);
    }
  };

  const getCities = async () => {
    try {
      const data = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      setCities(data.data);
    } catch (err) {
      console.error("Error fetching countries: ", err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      getCities();
    }
  }, [selectedState]);

  return (
    <div className={styles.citySelector}>
      <h1>Select Location</h1>
      <div className={styles.dropdowns}>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className={styles.dropdown}
        >
          <option value="" diabled>
            Select Country
          </option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className={styles.dropdown}
          disabled={!selectedCountry}
        >
          <option value="" diabled>
            Select State
          </option>
          {states.map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className={styles.dropdown}
          disabled={!selectedState}
        >
          <option value="" diabled>
            Select City
          </option>
          {cities.map((city) => {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
        </select>
        </div>
        <div>
          {selectedCity && (
            <h2 className={styles.result}>
              {" "}
              You selected{" "}
              <span className={styles.highlight}>{selectedCity},</span>
              <span className={styles.fade}>
                {" "}
                {selectedState}, {selectedCountry}
              </span>
            </h2>
          )}
        </div>
      
    </div>
  );
}
