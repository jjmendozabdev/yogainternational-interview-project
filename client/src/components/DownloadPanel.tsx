import React, { useState, useEffect } from "react";
import { fs, fetchBlob, StatefulPromise } from "../mocks";
import { DataType, getData, saveData } from "../utils";

enum DownloadStatus {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Completed = "Completed",
}

interface Props {
  title: string;
  author: string;
  image: string;
  type: DataType;
}

export const DownloadPanel: React.FC<Props> = ({
  title,
  author,
  image,
  type,
}) => {
  const [currentStatus, setCurrentStatus] = useState<DownloadStatus>(
    DownloadStatus.NotStarted
  );
  const [downloadPercentage, setDownloadPercentage] = useState(0);
  const [fetchPromise, setFetchPromise] = useState<StatefulPromise<void>>();

  useEffect(() => {
    const contentExists = async () => {
      const isDownloaded = await fs.exists(title);
      setCurrentStatus(
        isDownloaded ? DownloadStatus.Completed : DownloadStatus.NotStarted
      );
    };

    contentExists();
  }, [title]);

  const removeData = async () => {
    const data = await getData(type);
    fs.writeFile(
      type,
      JSON.stringify(data.filter((i: { title: string }) => i.title !== title))
    );
  };

  const onDownload = async () => {
    setCurrentStatus(DownloadStatus.InProgress);
    const fetchData = fetchBlob(image, title);
    setFetchPromise(fetchData);
    fetchData.onProgress((received, total) => {
      const percentage = Math.floor((received / total) * 100);
      setDownloadPercentage(percentage);
      if (percentage === 100) {
        setCurrentStatus(DownloadStatus.Completed);
      }
    });
    await saveData({ author, title, image, type });
  };

  const reset = () => {
    setDownloadPercentage(0);
    setCurrentStatus(DownloadStatus.NotStarted);
  };

  const onRemove = async () => {
    await fs.unlink(title);
    await removeData();
    reset();
  };

  const onCancel = () => {
    fetchPromise?.cancel();
    onRemove();
  };

  return (
    <>
      {currentStatus === DownloadStatus.NotStarted && (
        <button onClick={onDownload}>Download</button>
      )}
      {currentStatus === DownloadStatus.InProgress && (
        <div>
          <div>
            <progress value={downloadPercentage} max="100" />
            <span style={{ marginLeft: "5px" }}>{downloadPercentage}%</span>
          </div>
          <div>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      )}
      {currentStatus === DownloadStatus.Completed && (
        <div>
          <button onClick={onRemove}>Remove</button>
        </div>
      )}
    </>
  );
};
