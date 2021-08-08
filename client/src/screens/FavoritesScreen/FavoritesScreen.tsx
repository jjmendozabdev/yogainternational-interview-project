import React from "react";
import { useNavigation } from "../../navigation";
import { Favorite, Class, Meditation, Course, Article } from "./types";
import { FavoritesSection } from "./FavoritesSection";
import {
  Query_Class_Class,
  Query_Course_CoursePlayerPage_Course,
  RN_Query_Article_Article,
  RN_Query_Meditation_Meditation,
} from "../../graphql/types";
import {
  favoriteIsClass,
  favoriteIsCourse,
  favoriteIsMeditation,
  favoriteIsArticle,
} from "./validations";

type FavoritesByType = {
  classes: Favorite<Class>[];
  meditations: Favorite<Meditation>[];
  articles: Favorite<Article>[];
  courses: Favorite<Course>[];
};

const getFavoritesByType = (favorites: Favorite[]) => {
  const init: FavoritesByType = {
    classes: [],
    meditations: [],
    articles: [],
    courses: [],
  };
  return favorites.reduce((acc, d) => {
    if (favoriteIsClass(d)) acc.classes.push(d);
    if (favoriteIsCourse(d)) acc.courses.push(d);
    if (favoriteIsMeditation(d)) acc.meditations.push(d);
    if (favoriteIsArticle(d)) acc.articles.push(d);
    return acc;
  }, init);
};

export const MyFavoritesScreen = () => {
  const { navigate } = useNavigation();

  const favorites: Favorite<Class>[] = [];
  const favoritesByType: FavoritesByType = getFavoritesByType(favorites);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>My Favorites</h1>
      <FavoritesSection
        heading="Classes"
        items={favoritesByType.classes}
        onClickItem={(item: Favorite<Query_Class_Class>) => {
          navigate({
            route: "ClassPlayerScreen",
            params: { content: item.content },
          });
        }}
      />
      <FavoritesSection
        heading="Courses"
        items={favoritesByType.courses}
        onClickItem={(item: Favorite<Query_Course_CoursePlayerPage_Course>) => {
          navigate({
            route: "CoursePlayerScreen",
            params: { content: item.content },
          });
        }}
      />
      <FavoritesSection
        heading="Articles"
        items={favoritesByType.articles}
        onClickItem={(item: Favorite<RN_Query_Article_Article>) => {
          navigate({
            route: "ArticlePlayerScreen",
            params: { content: item.content },
          });
        }}
      />
      <FavoritesSection
        heading="Meditations"
        items={favoritesByType.meditations}
        onClickItem={(item: Favorite<RN_Query_Meditation_Meditation>) => {
          navigate({
            route: "MeditationPlayerScreen",
            params: { content: item.content },
          });
        }}
      />
    </>
  );
};
