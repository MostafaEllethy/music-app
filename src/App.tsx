import useDarkTheme from "./features/dark-theme/DarkThemeHook";
import Layout from "./layout/MainLayout";
import "swiper/css";
import "swiper/css/free-mode";

export default function App() {
  useDarkTheme();
  return <Layout />;
}
