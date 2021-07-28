import {
  ArticleScreenQuery,
  ClassScreenQuery,
  MeditationScreenQuery,
  CourseScreenQuery,
} from "../graphql";

export type ClassProps = { content: ClassScreenQuery["Class"] };
export type CourseProps = { content: CourseScreenQuery["Course"] };
export type ArticleProps = { content: ArticleScreenQuery["Article"] };
export type MeditationProps = { content: MeditationScreenQuery["Meditation"] };

type EmptyPropsRouteType = {
  route: "HomeScreen" | "DownloadsScreen";
  params?: {};
};

type IdPropsRouteType = {
  route: "ClassScreen" | "MeditationScreen" | "CourseScreen" | "ArticleScreen";
  params: { id: string };
};

type ClassPlayerRouteType = {
  route: "ClassPlayerScreen";
  params: ClassProps;
};

type CoursePlayerRouteType = {
  route: "CoursePlayerScreen";
  params: CourseProps;
};
type ArticlePlayerRouteType = {
  route: "ArticlePlayerScreen";
  params: ArticleProps;
};
type MeditationPlayerRouteType = {
  route: "MeditationPlayerScreen";
  params: MeditationProps;
};

export type ActiveRoute =
  | EmptyPropsRouteType
  | IdPropsRouteType
  | ClassPlayerRouteType
  | CoursePlayerRouteType
  | ArticlePlayerRouteType
  | MeditationPlayerRouteType;
