import React, { useState } from "react";
import { useEffect } from "react";
import { DownloadedData, getData } from "../../utils";
import { DownloadCard } from "./DownloadCard";

export const DownloadsScreen: React.FC = () => {
  const [classes, setClasses] = useState<DownloadedData[]>();
  const [meditations, setMeditations] = useState<DownloadedData[]>();
  const [articles, setArticles] = useState<DownloadedData[]>();
  const [courses, setCourses] = useState<DownloadedData[]>();

  useEffect(() => {
    const getSavedData = async () => {
      const classes = await getData("classes");
      setClasses(classes);
      const meditations = await getData("meditations");
      setMeditations(meditations);
      const articles = await getData("articles");
      setArticles(articles);
      const courses = await getData("courses");
      setCourses(courses);
    };

    getSavedData();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Downloads</h1>
      <h4>Downloaded Classes</h4>
      {classes && classes.map((d) => <DownloadCard {...d} />)}

      <h4>Downloaded Meditations</h4>
      {meditations && meditations.map((d) => <DownloadCard {...d} />)}

      <h4>Downloaded Articles</h4>
      {articles && articles.map((d) => <DownloadCard {...d} />)}

      <h4>Downloaded Courses</h4>
      {courses && courses.map((d) => <DownloadCard {...d} />)}
    </>
  );
};
