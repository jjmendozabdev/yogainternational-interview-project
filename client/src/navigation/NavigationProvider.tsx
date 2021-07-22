import {
  DownloadsScreen,
  HomeScreen,
  ClassScreen,
  MeditationScreen,
  CourseScreen,
  ArticleScreen,
  ClassPlayerScreen,
  CoursePlayerScreen,
  ArticlePlayerScreen,
  MeditationPlayerScreen
} from "../screens";
import { ErrorMessage } from "../components";
import React, { createContext, useState } from "react";

type TSFixMe = any;

const routes: TSFixMe = {
  HomeScreen,
  DownloadsScreen,
  ClassScreen,
  MeditationScreen,
  CourseScreen,
  ArticleScreen,
  ClassPlayerScreen,
  CoursePlayerScreen,
  ArticlePlayerScreen,
  MeditationPlayerScreen
};
const initialRoute = { route: "HomeScreen", params: {} };

export const NavigationContext = createContext<{
  activeRoute: TSFixMe;
  setActiveRoute: (a: TSFixMe) => void;
}>({
  activeRoute: initialRoute,
  setActiveRoute: () => console.warn("Missing navigation provider")
});

export const NavigationProvider: React.FC = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState<TSFixMe>(initialRoute);
  const ScreenComponent = routes[activeRoute.route];
  if (!ScreenComponent) return <ErrorMessage msg="Missing ScreenComponent!" />;

  return (
    <NavigationContext.Provider
      value={{
        activeRoute,
        setActiveRoute
      }}
    >
      {children}
      <div style={{ padding: 30 }}>
        <ScreenComponent {...activeRoute.params} />
      </div>
    </NavigationContext.Provider>
  );
};
