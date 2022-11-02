import AroundYouPage from "../pages/AroundYouPage";
import DiscoverPage from "../pages/discover/DiscoverPage";
import TopArtistsPage from "../pages/top-artists/TopArtistsPage";
import TopChartsPage from "../pages/TopChartsPage";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ArtistDetailsPage from "pages/ArtistDetailsPage";
import SongDetailsPage from "pages/SongDetailsPage";
import SearchPage from "pages/SearchPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <DiscoverPage /> },
      { path: "/around-you", element: <AroundYouPage /> },
      { path: "/top-artists", element: <TopArtistsPage /> },
      { path: "/top-charts", element: <TopChartsPage /> },
      { path: "/search/:q", element: <SearchPage /> },
      { path: "/artists/:id", element: <ArtistDetailsPage /> },
      { path: "/songs/:id", element: <SongDetailsPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
