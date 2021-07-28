import React from "react";
import { useNavigation } from "../../navigation";
import { Favorite } from "./types";
import { FavoritesSection } from "./FavoritesSection";
import {
  Query_Class_Class,
  Query_Course_CoursePlayerPage_Course,
  RN_Query_Article_Article,
  RN_Query_Meditation_Meditation,
} from "../../graphql/types";

type FavoritesByType = {
  classes: Favorite[];
  meditations: Favorite[];
  articles: Favorite[];
  courses: Favorite[];
};

const getFavoritesByType = (favorites: Favorite[]) => {
  return favorites.reduce(
    (acc: FavoritesByType, d) => {
      if (d.content.__typename === "Class") acc.classes.push(d);
      if (d.content.__typename === "Course") acc.courses.push(d);
      if (d.content.__typename === "Meditation") acc.meditations.push(d);
      if (d.content.__typename === "Article") acc.articles.push(d);
      return acc;
    },
    { classes: [], meditations: [], articles: [], courses: [] }
  );
};

export const MyFavoritesScreen = () => {
  const { navigate } = useNavigation();

  const favorites: Favorite[] = [];
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
