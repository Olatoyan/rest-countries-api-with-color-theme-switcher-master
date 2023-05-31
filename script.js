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

switchTheme.addEventListener("click", function (e) {
  console.log(e.target);
  darkBox.classList.toggle("closed");
  lightBox.classList.toggle("closed");
  if (e.target.closest(".light__box")) {
    container.style.backgroundColor = "#fafafa";
    // darkModebg.style.backgroundColor = "#fff";
    body.style.color = "#111517";
    regionsSelect.style.color = "#111517";
    darkModebg.forEach((bg) => (bg.style.backgroundColor = "#fff"));
    // countryBox.style.backgroundColor = "#fff";
    countries.forEach((b) => (b.style.backgroundColor = "#fff"));
    // searchInput.style.placeHolder = "#ff0";

    searchInput.style.setProperty("placeholder", "#ff0");
    searchInput.style.color = "#111517";
  } else if (e.target.closest(".dark__box")) {
    container.style.backgroundColor = "#202c37";
    // darkModebg.style.backgroundColor = "#2b3945";
    body.style.color = "#fff";
    darkModebg.forEach((bg) => (bg.style.backgroundColor = "#2b3945"));
    regionsSelect.style.color = "#fff";
    searchInput.style.color = "#fff";
    // countryBox.style.backgroundColor = "#000";
    searchInput.style.setProperty("placeholder", "#ff0");

    countries.forEach((b) => (b.style.backgroundColor = "#000"));
  }
});
// allCountryBox.textContent = "";
// if (lightBox.classList.contains("closed")) {
//   console.log(countries);
//   countries.forEach((bg) => (bg.style.backgroundColor = "#fff"));
// } else if (darkBox.classList.contains("closed")) {
//   countries.forEach((bg) => (bg.style.backgroundColor = "#2b3945"));
// }

console.log(countries);

const renderCountry = function (data) {
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
                Capital: <span class="country__span capital">${data.capital}</span>
              </p>
            </div>
          </div>
    `;

  allCountryBox.insertAdjacentHTML("beforeend", html);
  // console.log(countryBox);
  const countries = document.querySelectorAll(".country__box");

  // switchTheme.addEventListener("click", function (e) {
  //   if (e.target.closest(".light__box")) {
  //     countries.forEach((bg) => (bg.style.backgroundColor = "#fff"));
  //   } else if (e.target.closest(".dark__box")) {
  //     countries.forEach((bg) => (bg.style.backgroundColor = "#2b3945"));
  //   }
  // });
  let r;
  // if (lightBox.classList.contains("closed")) {
  //   countries.forEach((bg) => (bg.style.backgroundColor = "#fff"));
  // } else if (darkBox.classList.contains("closed")) {
  //   countries.forEach((bg) => (bg.style.backgroundColor = "#2b3945"));
  // }

  // console.log(switchTheme);
};
const renderDetails = function (data) {
  let borderCountries;
  let currencies;
  if (!data.borders) {
    borderCountries = `<span class="border__name dark__element">No Border Countries</span>`;
  } else {
    borderCountries = data.borders
      .map(
        (border) => `<span class="border__name dark__element">${border}</span>`
      )
      .join(" ");
  }

  if (!data.currencies) {
    currencies = `<span class="details__span details__currency">No Currency</span>`;
  } else {
    currencies = `<span class="details__span details__currency">${data.currencies[0].name}</span>`;
  }

  console.log(borderCountries);

  const html = `
        <div class="back__box dark__element">
          <ion-icon class="arrow__back" name="arrow-back-outline"></ion-icon>
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
                  Capital:
                  <span class="details__span details__capital">${data.capital}</span>
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
                Language: 
                  <span class="details__span details__languages">${data.languages[0].name}</span>
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
  // const res = await fetch("https://restcountries.com/v3.1/all");
  const res = await fetch("data.json");
  const data = await res.json();
  console.log(data);
  console.log(data[0].currencies);

  // data.forEach((d) => console.log(d));

  data.forEach((info) => {
    renderCountry(info);
  });

  regionsSelect.addEventListener("change", function () {
    const selectedRegion = regionsSelect.value;
    if (selectedRegion === "africa") {
      const filteredData = data.filter((item) => item.region === "Africa");
      console.log(filteredData);
      allCountryBox.textContent = "";
      filteredData.forEach((info) => {
        renderCountry(info);
      });
    } else if (selectedRegion === "america") {
      const filteredData = data.filter((item) => item.region === "Americas");
      console.log(filteredData);
      allCountryBox.textContent = "";
      filteredData.forEach((info) => {
        renderCountry(info);
      });
    } else if (selectedRegion === "asia") {
      const filteredData = data.filter((item) => item.region === "Asia");
      console.log(filteredData);
      allCountryBox.textContent = "";
      filteredData.forEach((info) => {
        renderCountry(info);
      });
    } else if (selectedRegion === "oceania") {
      const filteredData = data.filter((item) => item.region === "Oceania");
      console.log(filteredData);
      allCountryBox.textContent = "";
      filteredData.forEach((info) => {
        renderCountry(info);
      });
    } else if (selectedRegion === "europe") {
      const filteredData = data.filter((item) => item.region === "Europe");
      console.log(filteredData);
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
    // console.log(searchInput.value);
    const search = searchInput.value.trim();
    console.log(search);
    const searchedValue =
      search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
    console.log(searchedValue);
    const filteredData = data.filter((item) =>
      item.name.includes(searchedValue)
    );
    allCountryBox.textContent = "";
    filteredData.forEach((info) => {
      renderCountry(info);
    });
  });

  allCountryBox.addEventListener("click", function (e) {
    console.log(e.target);
    const selectedCountry = e.target
      .closest(".country__box")
      .querySelector(".country__name").textContent;
    console.log(selectedCountry);
    const findCountry = data.find((info) =>
      info.name.includes(selectedCountry)
    );
    console.log(findCountry);
    detailsSection.textContent = "";
    countrySection.style.display = "none";
    detailsSection.style.display = "flex";
    renderDetails(findCountry);
  });

  detailsSection.addEventListener("click", function (e) {
    console.log(e.target.closest(".back__box"));
    if (e.target.closest(".back__box")) {
      countrySection.style.display = "flex";
      detailsSection.style.display = "none";
    }
  });
};

allCountries();
