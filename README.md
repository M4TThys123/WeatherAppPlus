# WeatherAppPlus

Een moderne weer-applicatie gebouwd met SvelteKit. Toont actueel weer, uurlijkse voorspellingen en een 7-daagse forecast voor elke locatie ter wereld.

## Tech Stack

- **Framework:** SvelteKit 2 + Svelte 4
- **Styling:** Tailwind CSS v4
- **Weer API:** Open-Meteo (gratis, geen key nodig)
- **Geocoding:** Mapbox Geocoding API
- **Build:** Vite 5
- **TypeScript** met JSDoc annotations

## Features

- [x] Actueel weer voor standaardlocatie (Obdam)
- [x] Zoeken op stad met Mapbox autocomplete
- [x] Huidige locatie via browser GPS + reverse geocoding
- [x] 7-daagse forecast
- [x] Uurlijkse weerweergave (48 uur, scrollbaar)
- [x] Responsive design (mobile-first)
- [x] Preview modus voor nieuwe steden
- [ ] Steden opslaan in localStorage
- [ ] Temperatuur toggle (C/F)
- [ ] Skeleton loading states
- [ ] Page transitions

## Installatie

Vereist: Node.js 22+

```bash
git clone https://github.com/M4TThys123/WeatherAppPlus.git
cd WeatherAppPlus
nvm use
npm install
```

Maak een `.env` bestand aan (zie `.env.example`):

```env
PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

## Development

```bash
npm run dev
```

Open `http://localhost:5173` in je browser.

## Scripts

| Commando | Beschrijving |
|----------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Productie build |
| `npm run preview` | Preview productie build |
| `npm run check` | TypeScript type checking |
| `npm run lint` | Prettier + ESLint check |
| `npm run format` | Auto-format met Prettier |

## Contact

Matthijs Blauw - matthijs.blauw@gmail.com
