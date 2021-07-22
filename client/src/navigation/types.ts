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
export type DefaultProps = {
  id: string;
  content:
    | undefined
    | {}
    | ClassProps
    | CourseProps
    | ArticleProps
    | MeditationProps;
};
