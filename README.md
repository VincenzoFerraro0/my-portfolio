# Portfolio - Vincenzo Ferraro

## Descrizione
Portfolio personale single-page costruito con React 19 e Vite. Presenta una panoramica di chi sono, i progetti realizzati, le competenze tecniche e un form di contatto. L'interfaccia è completamente responsive, supporta tema chiaro/scuro tramite toggle e include animazioni fluide.

## Stack Tecnologico

### Core
- **React 19** — libreria UI
- **Vite 7** — build tool e dev server
- **Tailwind CSS v4** — styling utility-first (via plugin `@tailwindcss/vite`)

### Librerie principali
- **framer-motion / motion** — animazioni e transizioni
- **lucide-react** + **react-icons** — set di icone
- **react-scroll** — smooth scroll tra le sezioni
- **@emailjs/browser** — invio email dal form di contatto senza backend

### Tooling
- **ESLint 9** con `eslint-plugin-react-hooks` e `eslint-plugin-react-refresh`

## Struttura del Progetto

```
my-portfolio/
├── public/
│   ├── background.gif         # Sfondo animato
│   ├── favicon.ico
│   ├── fonts/                 # Font locali
│   └── robots.txt
├── src/
│   ├── App.jsx                # Composizione root: Navbar + sezioni + Footer
│   ├── Footer.jsx
│   ├── main.jsx               # Entry point React
│   ├── index.css              # Stili globali e direttive Tailwind
│   ├── components/            # Componenti riutilizzabili
│   │   ├── Navbar.jsx
│   │   ├── ToggleSwitch.jsx           # Switch tema chiaro/scuro
│   │   ├── ButtonContact.jsx
│   │   └── OnlineStatusIndicator.jsx
│   ├── section/               # Sezioni della pagina
│   │   ├── AboutMeSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── SkillsSection.jsx
│   │   └── ContactForm.jsx
│   ├── lib/
│   │   └── data.js            # Dati statici: progetti, skill, ecc.
│   └── assets/                # Immagini, icone, documenti
│       ├── img/
│       ├── icons/
│       ├── projects/
│       └── doc/
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

### Architettura
Il portfolio è una **Single Page Application** strutturata per sezioni verticali. `App.jsx` compone in ordine: `Navbar`, le quattro sezioni principali (`AboutMeSection`, `ProjectsSection`, `SkillsSection`, `ContactForm`), `ToggleSwitch` e `Footer`. La navigazione tra sezioni avviene tramite `react-scroll`. I contenuti dinamici (lista progetti, skill, ecc.) sono centralizzati in `src/lib/data.js` per facilitare gli aggiornamenti.

## Installazione e Avvio

### Prerequisiti
- Node.js >= 18
- npm (o pnpm / yarn)

### Setup
1. Clona il repository:
   ```bash
   git clone https://github.com/VincenzoFerraro0/my-portfolio.git
   cd my-portfolio
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Configura le variabili d'ambiente per EmailJS creando un file `.env` nella root:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   Le credenziali si ottengono dalla dashboard di [EmailJS](https://www.emailjs.com/).

4. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```
   Il sito sarà disponibile su `http://localhost:5173`.

## Script Disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il dev server Vite con HMR |
| `npm run build` | Crea il bundle di produzione in `dist/` |
| `npm run preview` | Serve localmente la build di produzione |
| `npm run lint` | Esegue ESLint su tutto il progetto |

## Personalizzazione

- **Contenuti**: modifica `src/lib/data.js` per aggiornare progetti, skill e altri dati statici.
- **Sezioni**: ogni sezione vive in `src/section/` ed è indipendente.
- **Tema**: il toggle dark/light è gestito da `ToggleSwitch.jsx` (utility Tailwind con classe `dark:`).
- **Asset**: aggiungi immagini in `src/assets/` e referenziale via import per ottenere URL ottimizzati da Vite.

## Deploy
La build statica generata da `npm run build` può essere pubblicata su qualsiasi hosting statico (Vercel, Netlify, GitHub Pages, Cloudflare Pages). Ricorda di configurare le stesse variabili `VITE_EMAILJS_*` nelle impostazioni del provider.

## Licenza
Progetto distribuito sotto licenza MIT (vedi file `LICENSE` se presente).

## Contatti
- **GitHub**: [VincenzoFerraro0](https://github.com/VincenzoFerraro0)
- **Email**: tramite il form di contatto del portfolio
