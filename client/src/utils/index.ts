import { fs } from "../mocks";

export type DownloadedData = { author: string; title: string; image: string };
export type DataType = "classes" | "meditations" | "articles" | "courses";

export const getData = async (type: DataType): Promise<DownloadedData[]> => {
  const data = await fs.readFile(type);
  return data ? JSON.parse(data) : [];
};

export const saveData = async (params: DownloadedData & { type: DataType }) => {
  const data = await getData(params.type);
  data.push({
    author: params.author,
    title: params.title,
    image: `file://${params.title}`,
  });
  fs.writeFile(params.type, JSON.stringify(data));
};
