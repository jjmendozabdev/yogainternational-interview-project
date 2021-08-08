import { Favorite, Class, Meditation, Course, Article } from "./types";

export const favoriteIsClass = (
  favorite: Favorite
): favorite is Favorite<Class> => {
  return favorite.content.__typename === "Class";
};

export const favoriteIsCourse = (
  favorite: Favorite
): favorite is Favorite<Course> => {
  return favorite.content.__typename === "Course";
};

export const favoriteIsMeditation = (
  favorite: Favorite
): favorite is Favorite<Meditation> => {
  return favorite.content.__typename === "Meditation";
};

export const favoriteIsArticle = (
  favorite: Favorite
): favorite is Favorite<Article> => {
  return favorite.content.__typename === "Article";
};
