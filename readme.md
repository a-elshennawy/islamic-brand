# Islamic Brand Store
built with **React 19** and **Vite**.



## Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Components**: [Material UI (MUI)](https://mui.com/), [Bootstrap 5](https://getbootstrap.com/)
- **State Management**: [React Query](https://tanstack.com/query/latest), React Context API
- **Routing**: [React Router Dom](https://reactrouter.com/)
- **Internationalization**: [i18next](https://www.i18next.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [Lottie React](https://github.com/gamote/lottie-react)
- **Styling**: Vanilla CSS, Emotion (MUI), Bootstrap

## Project Structure

```text
src/
├── assets/             # Fonts, icons, and Lottie animations
├── components/         # Modular UI components organized by feature
│   ├── Layout/         # Header, Footer, Navbar, and Sidebar
│   ├── HomePageComponents/
│   ├── ProductPageComponents/
│   └── ...
├── hooks/              # Custom React hooks (Auth, Cart, Tracking, etc.)
├── locale/             # Translation files (ar.json, en.json)
├── pages/              # Main application views/routes
├── services/           # API services and Context providers
│   ├── api/            # Axios-based API modules
│   └── context/        # Auth and Global contexts
└── utils/              # Helper functions and external script integrations
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd islamic-brand
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## Tracking & Analytics

The application is equipped with:
- **Meta Pixel**: Tracks page views, view content, initiate checkout, and purchases.
- **Microsoft Clarity**: Used for heatmaps and session recordings to improve UX.

## License

This project is private and for internal use.
