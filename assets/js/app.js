const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const notFoundState = document.getElementById("notFoundState");
const loader = document.getElementById("loader");
const informationContainer = document.getElementById("informationContainer");
const suggestionsList = document.getElementById("suggestionsList");

document.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        emptyState.classList.add("hidden");
        handleSearch(`${latitude},${longitude}`);
      },
      (error) => {
        console.log(error);
      }
    );
  }
});

searchInput.addEventListener(
  "input",
  debounce((e) => {
    const value = e.target.value.trim();

    if (!value) {
      emptyState.classList.remove("hidden");
      loader.classList.add("hidden");
      notFoundState.classList.add("hidden");
      informationContainer.classList.add("opacity-0");
      suggestionsList.innerHTML = "";
      return;
    }

    emptyState.classList.add("hidden");
    loader.classList.remove("hidden");
    informationContainer.classList.add("opacity-0");
    notFoundState.classList.add("hidden");
    handleSearch(value);
  }, 400)
);

searchInput.addEventListener("input", (e) => {
  renderSuggestions(e.target.value.trim());
});

async function renderSuggestions(value) {
  try {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&limit=10&format=json&apiKey=bc0aa38ff5c54ea2bdcea7bfcc888d43`
    );

    const data = await res.json();
    const suggestions = data.results;

    let suggestionsBody = "";
    suggestions.forEach((suggestion) => {
      suggestionsBody += `
        <li onclick="handleSuggestionClick('${
          suggestion.city || suggestion.county
        }')" class="cursor-pointer hover:bg-gray-100 px-4 py-2.5 border-b-2 border-gray-200">
          ${suggestion.city || suggestion.county}, ${suggestion.country}
        </li>
      `;
    });

    suggestionsList.innerHTML = suggestionsBody;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
}

function handleSuggestionClick(value) {
  searchInput.value = value;
  suggestionsList.innerHTML = "";
  handleSearch(value);
}

async function handleSearch(value) {
  try {
    const weatherRes = await fetch(
      ` http://api.weatherapi.com/v1/current.json?key=35c6b141e18644adbf490250251211&q=${value}`
    );
    const weatherData = await weatherRes.json();

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${weatherData.location.country}`
    );
    const data = await res.json();
    const country = data[0];

    loader.classList.add("hidden");
    informationContainer.classList.remove("opacity-0");
    if (searchInput.value.trim() === "") {
      searchInput.value = weatherData.location.name;
    }

    const fields = {
      /**
       * weather data
       */
      locationName: {
        type: "text",
        get: () =>
          `${weatherData.location.name}, ${weatherData.location.country}`,
      },
      localTime: {
        type: "text",
        get: () => weatherData.location.localtime,
      },
      weatherIcon: {
        type: "attr",
        attr: "src",
        get: () => weatherData.current.condition.icon,
      },
      conditionText: {
        type: "text",
        get: () => weatherData.current.condition.text,
      },
      tempC: {
        type: "text",
        get: () => weatherData.current.temp_c,
      },
      feelsLike: {
        type: "text",
        get: () => weatherData.current.feelslike_c,
      },
      humidity: {
        type: "text",
        get: () => weatherData.current.humidity,
      },
      windKph: {
        type: "text",
        get: () => weatherData.current.wind_kph,
      },
      uv: {
        type: "text",
        get: () => weatherData.current.uv,
      },
      pressure: {
        type: "text",
        get: () => weatherData.current.pressure_in,
      },
      precip: {
        type: "text",
        get: () => weatherData.current.precip_in,
      },
      cloud: {
        type: "text",
        get: () => weatherData.current.cloud,
      },
      dewpoint: {
        type: "text",
        get: () => weatherData.current.dewpoint_c,
      },
      visibility: {
        type: "text",
        get: () => weatherData.current.vis_km,
      },
      windDir: {
        type: "text",
        get: () => weatherData.current.wind_dir,
      },
      shortRad: {
        type: "text",
        get: () => weatherData.current.short_rad,
      },
      diffRad: {
        type: "text",
        get: () => weatherData.current.diff_rad,
      },
      gti: {
        type: "text",
        get: () => weatherData.current.gti,
      },
      /**
       * country data
       */
      countryName: {
        type: "text",
        get: () => country.name.common,
      },
      countryOfficialName: {
        type: "text",
        get: () => country.name.official,
      },
      countryFlag: {
        type: "html",
        get: () => `<img src="${country.flags.png}" class="w-[150px]">`,
      },
      capital: {
        type: "text",
        get: () => country.capital,
      },
      population: {
        type: "text",
        get: () => country.population,
      },
      area: {
        type: "text",
        get: () => country.area,
      },
      region: {
        type: "text",
        get: () => country.region,
      },
      subregion: {
        type: "text",
        get: () => country.subregion,
      },
      coordinates: {
        type: "text",
        get: () => country.latlng.join(", "),
      },
      continents: {
        type: "text",
        get: () => country.continents,
      },
      landlocked: {
        type: "text",
        get: () => country.landlocked,
      },
      timezones: {
        type: "text",
        get: () => country.timezones,
      },
      gini: {
        type: "text",
        get: () => {
          if (!country.gini) return "-";

          const key = Object.keys(country.gini)[0];
          return `${country.gini[key]}${key}`;
        },
      },
      languages: {
        type: "html",
        get: () =>
          Object.values(country.languages)
            .map(
              (lang) =>
                `
            <div class="bg-white p-3 rounded border border-gray-200">
              <span class="text-gray-900">${country.languages[lang]}</span>
            </div>
            `
            )
            .join(""),
      },
      currencies: {
        type: "html",
        get: () =>
          Object.values(country.currencies).map(
            (currency) =>
              `<div class="bg-white p-3 rounded border border-gray-200">
              <p class="font-semibold text-gray-900">${currency.name}</p>
              <p class="text-lg text-gray-700 mt-1">${currency.symbol}</p>
            </div>`
          ),
      },
      cca2: {
        type: "text",
        get: () => country.cca2,
      },
      cca3: {
        type: "text",
        get: () => country.cca3,
      },
      ccn3: {
        type: "text",

        get: () => country.ccn3,
      },
      cioc: {
        type: "text",
        get: () => country.cioc,
      },
      fifa: {
        type: "text",
        get: () => country.fifa,
      },
      callingCode: {
        type: "text",
        get: () => country.idd.root + country.idd.suffixes[0],
      },
      nativeNames: {
        type: "html",
        get: () =>
          Object.values(country.name.nativeName)
            .map(
              (nn) =>
                `<div class="bg-white p-3 rounded border border-gray-200">
                  <p class="font-semibold text-gray-900">${nn.common}</p>
                  <p class="text-gray-700 text-sm mt-1">${nn.official}</p>
                </div>`
            )
            .join(""),
      },
      tld: {
        type: "text",
        get: () => country.tld.join(", "),
      },
      carSide: {
        type: "text",
        get: () => country.car.side,
      },
      carSigns: {
        type: "text",
        get: () => country.car.signs.join(", "),
      },
      postalCode: {
        type: "text",
        get: () => country.postalCode.format,
      },
      unMember: {
        type: "text",
        get: () => country.unMember,
      },
      independent: {
        type: "text",
        get: () => country.independent,
      },
      status: {
        type: "text",
        get: () => country.status,
      },
      demonyms: {
        type: "html",
        get: () =>
          Object.entries(country.demonyms)
            .map(
              ([lang, d]) =>
                `<div class="bg-white p-4 rounded border border-gray-200">
              <p class="font-semibold text-gray-900">${lang.toUpperCase()}</p>
              <p class="text-gray-700 mt-1">Male: ${d.m}</p>
              <p class="text-gray-700">Female: ${d.f}</p>
            </div>
            `
            )
            .join(""),
      },
      altSpellings: {
        type: "text",
        get: () => country.altSpellings.join(", "),
      },
      translations: {
        type: "html",
        get: () =>
          Object.entries(country.translations)
            .map(
              ([lang, t]) =>
                `<div class="bg-white p-4 rounded border border-gray-200">
                  <p class="font-semibold text-gray-900">${lang.toUpperCase()}</p>
                  <p class="text-gray-700 mt-1">${t.common}</p>
                  <p class="text-gray-500 text-sm">${t.official}</p>
                </div>`
            )
            .join(""),
      },
    };

    Object.entries(fields).forEach(([id, field]) => {
      const el = document.getElementById(id);
      if (!el) return;

      const value = field.get();

      switch (field.type) {
        case "text":
          el.textContent = value;
          break;

        case "html":
          el.innerHTML = value;
          break;

        case "attr":
          el[field.attr] = value;
          break;

        default:
          console.warn("Unknown field type:", field.type);
      }
    });
  } catch (error) {
    notFoundState.classList.remove("hidden");
    loader.classList.add("hidden");
    informationContainer.classList.add("opacity-0");
  }
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
