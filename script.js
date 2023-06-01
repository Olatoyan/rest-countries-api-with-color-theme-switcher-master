"use strict";

const body = document.querySelector("body");
const container = document.querySelector(".container");
const countrySection = document.querySelector(".countries__section");
const detailsSection = document.querySelector(".details__section");
const allCountryBox = document.querySelector(".countries__box");
const countryBox = document.querySelector(".country__box");
const countries = document.querySelectorAll(".country__box");
const countryImg = document.querySelector(".country__img");
const countryName = document.querySelector(".country__name");
const countryPopulation = document.querySelector(".population");
const countryRegion = document.querySelector(".region");
const countryCapital = document.querySelector(".capital");
const regionsSelect = document.querySelector(".regions");
const searchInput = document.querySelector(".search__input");
const switchTheme = document.querySelector(".switch__theme-box");
const lightBox = document.querySelector(".light__box");
const darkBox = document.querySelector(".dark__box");
const darkModebg = document.querySelectorAll(".dark__element");
const loadingSpinner = document.querySelector(".loading-spinner");

const showLoadingSpinner = function () {
  loadingSpinner.style.display = "block";
};

const hideLoadingSpinner = function () {
  loadingSpinner.style.display = "none";
};

switchTheme.addEventListener("click", function (e) {
  console.log(e.target);
  darkBox.classList.toggle("closed");
  lightBox.classList.toggle("closed");
  if (e.target.closest(".light__box")) {
    container.style.backgroundColor = "#fafafa";
    body.style.color = "#111517";
    body.style.fill = "#111517";
    regionsSelect.style.color = "#111517";
    darkModebg.forEach((bg) => (bg.style.backgroundColor = "#fff"));
    countries.forEach((b) => (b.style.backgroundColor = "#fff"));

    searchInput.style.setProperty("placeholder", "#ff0");
    searchInput.style.color = "#111517";
  } else if (e.target.closest(".dark__box")) {
    container.style.backgroundColor = "#202c37";
    body.style.color = "#fff";
    body.style.fill = "#fff";

    darkModebg.forEach((bg) => (bg.style.backgroundColor = "#2b3945"));
    regionsSelect.style.color = "#fff";
    searchInput.style.color = "#fff";

    countries.forEach((b) => (b.style.backgroundColor = "#000"));
  }
});

const renderCountry = function (data) {
  let capital;

  if (!data.capital) {
    capital = `<span class="country__span capital">No Capital</span>`;
  } else {
    capital = `<span class="country__span capital">${data.capital}</span>`;
  }
  const html = `
          <div class="country__box  ">
            <img class="country__img" src="${data.flag}" />
            <h2 class="country__name">${data.name}</h2>
            <div class="country__data">
              <p class="country__text">
                Population:
                <span class="country__span population">${data.population}</span>
              </p>
              <p class="country__text">
                Region: <span class="country__span region">${data.region}</span>
              </p>
              <p class="country__text">
                Capital: ${capital}
              </p>
            </div>
          </div>
    `;

  allCountryBox.insertAdjacentHTML("beforeend", html);
};
const renderDetails = function (data) {
  let borderCountries;
  let currencies;
  let languages;

  let capital;

  if (!data.capital) {
    capital = `<span class="country__span capital">No Capital</span>`;
  } else {
    capital = `<span class="country__span capital">${data.capital}</span>`;
  }
  if (!data.borders) {
    borderCountries = `<span class="border__name ">No Border Countries</span>`;
  } else {
    borderCountries = data.borders
      .map((border) => `<span class="border__name ">${border}</span>`)
      .join(" ");
  }

  if (!data.currencies) {
    currencies = `<span class="details__span details__currency">No Currency</span>`;
  } else {
    currencies = `<span class="details__span details__currency">${data.currencies[0].name}</span>`;
  }

  if (!data.languages) {
    languages = `<span class="details__span details__languages">No Languages</span>`;
  } else {
    languages = data.languages
      .map(
        (lang) =>
          `<span class="details__span details__languages">${lang.name}</span>`
      )
      .join(", ");
  }

  const html = `
        <div class="back__box ">
        <svg
        class="arrow__back"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 256 256"
        >
          <path
            d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"
          ></path>
        </svg>
        
          <p class="back__text">Back</p>
        </div>
        <div class="details__container">
          <div class="details__img-box">
            <img
              class="details__img"
              src="${data.flag}"
              alt="image"
            />
          </div>
          <div class="details__box">
            <h2 class="details__name">${data.name}</h2>
            <div class="details__info">
              <div class="details__info-1">
                <p class="details__text">
                  Native Name:
                  <span class="details__span native__name">${data.nativeName}</span>
                </p>
                <p class="details__text">
                  Population:
                  <span class="details__span details__population">${data.population}</span>
                </p>
                <p class="details__text">
                  Region:
                  <span class="details__span details__region">${data.region}</span>
                </p>
                <p class="details__text">
                  Sub Region:
                  <span class="details__span details__sub-region">${data.subregion}</span>
                </p>
                <p class="details__text">
                  Capital: ${capital}
                </p>
              </div>
              <div class="details__info-2">
                <p class="details__text">
                  Top Level Domain:
                  <span class="details__span details__domain">${data.topLevelDomain[0]}</span>
                </p>
                <p class="details__text">
                  Currencies:
                  <span class="details__span details__currency">${currencies}</span>
                </p>
                <p class="details__text">
                Languages: 
                  <span class="details__span details__languages">${languages}</span>
                </p>
              </div>
            </div>
            <div class="details__border">
              <p class="border">
                Border countries:
                ${borderCountries}
              </p>
            </div>
          </div>
        </div>
  `;

  detailsSection.insertAdjacentHTML("beforeend", html);
};

const allCountries = async function () {
  try {
    showLoadingSpinner();

    const res = await fetch("data.json");
    const data = await res.json();

    let counter = 0;
    data.forEach((info) => {
      renderCountry(info);
      counter++;
    });

    regionsSelect.addEventListener("change", function () {
      const selectedRegion = regionsSelect.value;
      if (selectedRegion === "africa") {
        const filteredData = data.filter((item) => item.region === "Africa");
        allCountryBox.textContent = "";
        filteredData.forEach((info) => {
          renderCountry(info);
        });
      } else if (selectedRegion === "america") {
        const filteredData = data.filter((item) => item.region === "Americas");
        allCountryBox.textContent = "";
        filteredData.forEach((info) => {
          renderCountry(info);
        });
      } else if (selectedRegion === "asia") {
        const filteredData = data.filter((item) => item.region === "Asia");
        allCountryBox.textContent = "";
        filteredData.forEach((info) => {
          renderCountry(info);
        });
      } else if (selectedRegion === "oceania") {
        const filteredData = data.filter((item) => item.region === "Oceania");
        allCountryBox.textContent = "";
        filteredData.forEach((info) => {
          renderCountry(info);
        });
      } else if (selectedRegion === "europe") {
        const filteredData = data.filter((item) => item.region === "Europe");
        allCountryBox.textContent = "";
        filteredData.forEach((info) => {
          renderCountry(info);
        });
      } else if (selectedRegion === "all") {
        allCountryBox.textContent = "";
        data.forEach((info) => {
          renderCountry(info);
        });
      }
    });

    searchInput.addEventListener("input", function () {
      const search = searchInput.value.trim();
      const searchedValue =
        search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
      const filteredData = data.filter((item) =>
        item.name.includes(searchedValue)
      );
      allCountryBox.textContent = "";
      filteredData.forEach((info) => {
        renderCountry(info);
      });
    });

    allCountryBox.addEventListener("click", function (e) {
      const selectedCountry = e.target
        .closest(".country__box")
        .querySelector(".country__name").textContent;
      const findCountry = data.find((info) =>
        info.name.includes(selectedCountry)
      );
      detailsSection.textContent = "";
      countrySection.style.display = "none";
      detailsSection.style.display = "flex";
      renderDetails(findCountry);
    });

    detailsSection.addEventListener("click", function (e) {
      if (e.target.closest(".back__box")) {
        countrySection.style.display = "flex";
        detailsSection.style.display = "none";
      }
    });
    const totalCountries = data.length;
    if (counter === totalCountries) {
      hideLoadingSpinner();
    }
  } catch (error) {
    alert(`${error}`);
    console.log(error);
    hideLoadingSpinner();
  }
};

allCountries();
