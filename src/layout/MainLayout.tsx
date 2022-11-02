import { memo } from "react";
import Header from "./Header";
import Drawer from "./Drawer";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAppSelector } from "redux-store";
import MusicPlayer from "features/player/MusicPlayer";

export default memo(function Layout() {
  const { activeSong } = useAppSelector((state) => state.player);

  return (
    <div className="drawer drawer-mobile">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />
      <div
        className={`drawer-content min-h-screen flex flex-col ${styles.content}`}
      >
        <Header />
        <main className="bg-base-200 dark:bg-base-300 flex-1">
          <Outlet />
        </main>
      </div>
      <Drawer />
      {activeSong && <MusicPlayer />}
    </div>
  );
});
