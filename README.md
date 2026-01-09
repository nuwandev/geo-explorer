# Geo Explorer

Multi-API mashup to discover city weather + country info + geolocation suggestions. Demonstrates async orchestration & UI state management.

## 🚀 Features

- Live geolocation (auto-load on start if permitted)
- Debounced search suggestions
- Weather conditions & icon
- Country metadata (from REST Countries)
- Local time display
- Empty / loading / not-found states

## 📂 Project Structure

```text
geo-explorer/
├── index.html
├── assets/
│   ├── css/style.css
│   └── js/app.js
└── README.md
```

## 🛠️ Tech Stack

- HTML / Tailwind (via CDN in index) + custom CSS
- Vanilla JavaScript (ES modules style, but single file)
- External APIs: WeatherAPI, Geoapify Autocomplete, REST Countries
- Browser Geolocation API

## ⚙️ Setup

```bash
git clone https://github.com/nuwandev/Internet-Technologies-Module-iCET.git
cd Internet-Technologies-Module-iCET/projects/geo-explorer
python -m http.server 8080
```

Navigate in browser.

## 🧩 Usage

1. Open page
2. Allow location (optional) to auto-load
3. Type a city name
4. Pick a suggestion
5. Read weather + country details

## 🧱 Architecture

- UI state toggled with utility DOM class adds/removes
- Debounce wrapper around input handler
- Sequential fetch chain (weather → country data)
- Suggestion rendering separate from main info rendering

## 🗄️ Data / Storage

- No persistence; all ephemeral
- APIs:
  - `GET weatherapi.com/v1/current.json?key=...&q=<query>`
  - `GET api.geoapify.com/v1/geocode/autocomplete?text=<text>&...`
  - `GET restcountries.com/v3.1/name/<country>`
- Geolocation: `navigator.geolocation.getCurrentPosition`

## 🔧 Scripts

None.

## 🧪 Testing

Manual: test slow network, invalid city, permission denied geolocation.

## 📦 Deployment

Static hosting (ensure API keys secured — current keys appear hard-coded).

## 📝 Notes

- Keys should move to serverless endpoint for production
- No caching; repeated queries always refetch
- Mobile scrolling for suggestions may need refinement

## 📄 License

MIT

## Learning Outcomes

- Multi-API coordination
- Debounce implementation
- Geolocation usage
- UI state management (empty/loading/not-found)
- Async error handling patterns
