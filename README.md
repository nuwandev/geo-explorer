# Geo Explorer

Geo Explorer is a web application that provides detailed information about any geolocation.

## Features

- **Search**: Users can search for a city by name.
- **Suggestions**: The application provides search suggestions as the user types.
- **Weather Information**: Displays the current weather conditions for the searched location, including temperature, weather icon, and condition text.
- **Location Details**: Shows the local time of the searched location.
- **Responsive Design**: The application is designed to work on various screen sizes.

## How to Use

1. Open the `index.html` file in your web browser.
2. Enter a city name in the search bar.
3. Select a suggestion from the list or press Enter.
4. The application will display the weather and location information for the selected city.

## Project Structure

- `index.html`: The main HTML file containing the user interface.
- `assets/css/style.css`: The stylesheet for the application.
- `assets/js/`: This directory would contain the JavaScript logic for fetching data from APIs and updating the UI.

## Learning Outcomes

- **Multiple API Integration**: Learned to fetch data from multiple APIs (`weatherapi.com`, `restcountries.com`, `geoapify.com`) and combine the results.
- **Asynchronous JavaScript**: Used `async/await` to handle asynchronous API calls.
- **Geolocation API**: Used the browser's `navigator.geolocation` API to get the user's current position.
- **Debouncing**: Implemented a debounce function to limit the rate at which API calls are made while the user is typing.
- **DOM Manipulation**: Dynamically updated the UI with weather, location, and country information.
- **Error Handling**: Used `try...catch` blocks to handle potential errors during API calls.
- **Search Suggestions**: Implemented a search suggestion feature by fetching data from an autocomplete API.
