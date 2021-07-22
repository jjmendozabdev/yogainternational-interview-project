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
import { DefaultProps } from "./types";

type RouteOptions =
  | "HomeScreen"
  | "DownloadsScreen"
  | "ClassScreen"
  | "MeditationScreen"
  | "CourseScreen"
  | "ArticleScreen"
  | "ClassPlayerScreen"
  | "CoursePlayerScreen"
  | "ArticlePlayerScreen"
  | "MeditationPlayerScreen";

type ActiveRoute = {
  route: RouteOptions;
  params: DefaultProps;
};

const routes: any = {
  HomeScreen,
  DownloadsScreen,
  ClassScreen,
  MeditationScreen,
  CourseScreen,
  ArticleScreen,
  ClassPlayerScreen,
  CoursePlayerScreen,
  ArticlePlayerScreen,
  MeditationPlayerScreen,
};
const initialRoute: ActiveRoute = {
  route: "HomeScreen",
  params: { id: "", content: {} },
};

export const NavigationContext = createContext<{
  activeRoute: ActiveRoute;
  setActiveRoute: (a: ActiveRoute) => void;
}>({
  activeRoute: initialRoute,
  setActiveRoute: () => console.warn("Missing navigation provider"),
});

export const NavigationProvider: React.FC = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState<ActiveRoute>(initialRoute);
  const ScreenComponent = routes[activeRoute.route];
  if (!ScreenComponent) return <ErrorMessage msg="Missing ScreenComponent!" />;

  return (
    <NavigationContext.Provider
      value={{
        activeRoute,
        setActiveRoute,
      }}
    >
      {children}
      <div style={{ padding: 30 }}>
        <ScreenComponent {...activeRoute.params} />
      </div>
    </NavigationContext.Provider>
  );
};
