# Rishu Singh — Developer Portfolio

A personal portfolio website for **Rishu Singh**, a full-stack developer based in Delhi, India. It brings together an introduction, education, technical skills, selected projects, résumé, and contact information in a responsive, multi-page experience.

**Live website:** [portfolio-murex-delta-p49bgjc992.vercel.app](https://portfolio-murex-delta-p49bgjc992.vercel.app/)

## Features

- **Five portfolio pages:** Home, About, Skills, Projects, and Contact.
- **Responsive navigation:** Desktop navigation and a mobile bottom navigation bar.
- **Theme switcher:** System, day, and night themes; the selection is saved in the browser.
- **Weather display:** Shows current conditions using browser location when allowed, with Delhi as a fallback. A WeatherAPI key is required.
- **Portfolio assistant:** An optional Gemini-powered chat assistant with suggested questions, saved conversation history, transcript copying, and a draggable launcher.
- **Project showcase:** Project descriptions, technology tags, source-code links, and live demos.
- **Résumé and contact:** Open or download the résumé and send a message through the configured Formspree form.
- **Direct page navigation:** Vercel is configured to serve the app for client-side routes such as `/projects` and `/contact`.

## Built with

- [React](https://react.dev/) 18
- [Vite](https://vite.dev/) 5
- [React Router](https://reactrouter.com/) 6
- JavaScript and CSS
- [Lucide](https://lucide.dev/) and React icon libraries
- [Vercel](https://vercel.com/) deployment configuration

## Getting started

### Requirements

- [Node.js](https://nodejs.org/) (an LTS release is recommended)
- npm

### Install and run locally

```bash
git clone https://github.com/Rishu18D/My-Portfolio.git
cd My-Portfolio
npm install
npm run dev
```

Vite prints the local development URL in the terminal, usually `http://localhost:5173`.

### Optional API configuration

The site itself can run without API keys. The weather display and portfolio assistant need their respective keys to provide data and responses. Create a `.env.local` file in the project root:

```dotenv
VITE_WEATHER_API_KEY=your_weatherapi_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Restart the development server after changing environment variables.

Both integrations call their services directly from the browser. **Vite variables prefixed with `VITE_` are included in the client-side bundle and are not private secrets.** Use keys intended for browser use, apply provider-side domain/API restrictions and quotas where available, and never put privileged credentials in these variables. `.env.local` is ignored by Git.

If no weather key is configured, the weather tracker displays an instructional message in its accessible status text. If no Gemini key is configured, the assistant explains how to enable it.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the production site into `dist/`. |
| `npm run preview` | Serve the production build locally for a preview. |
| `npm run lint` | Run ESLint across the project. |

To verify a production build locally:

```bash
npm run build
npm run preview
```

## Pages and project structure

```text
src/
  App.jsx                    Routes for the portfolio pages
  index.css                  Shared site styles and themes
  Components/
    Home/                    Landing page
    About/                   Profile and education
    Skills/                  Technical skills
    Projects/                 Selected projects
    ContactMe/                Contact details and message form
    Navbar/                   Main navigation and theme switcher
    MobNev/                   Mobile navigation
    AiChat.jsx                Optional Gemini portfolio assistant
    WeatherTracker.jsx        Optional current weather display
    Layout.jsx                Shared page layout
public/
  assets/                    Images, icons, and résumé
vercel.json                  Vercel rewrite for client-side routes
```

The main routes are `/`, `/about`, `/skills`, `/projects`, and `/contact`.

## Updating portfolio content

- Edit page content in the matching component under `src/Components/`.
- Update the project cards and their source/demo URLs in `src/Components/Projects/Projects.jsx`.
- Replace the résumé at `public/assets/New_Updated_Resume.pdf` to update the résumé link.
- Update email and social profile links in the home and contact page components.
- The contact form currently submits to a Formspree endpoint. Configure the endpoint for your own form in `src/Components/ContactMe/Contact.jsx`.
- Update the site title and description in `index.html`.

## Deployment

This project is configured for Vercel. Import the repository into Vercel and deploy it with the default Vite settings. Add `VITE_WEATHER_API_KEY` and/or `VITE_GEMINI_API_KEY` to the Vercel project's environment variables if those optional integrations should be enabled. Redeploy after changing environment variables.

The root `vercel.json` rewrite routes incoming paths to the single-page app so direct visits and refreshes on portfolio routes continue to work.

## Contact

- **Email:** [rishusinghmorals@gmail.com](mailto:rishusinghmorals@gmail.com)
- **GitHub:** [Rishu18D](https://github.com/Rishu18D)
- **LinkedIn:** [rishu018](https://www.linkedin.com/in/rishu018)
- **Location:** Delhi, India
