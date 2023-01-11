import writeData from "./util/io.js";

export function generateReportData(logFn) {
  const data = "Some dummy data for this demo app";
  // in reality, this could be data that is calculated or that is fetched from a db
  if (logFn) {
    logFn(data);
  }

  return data;
}

export async function storeData(data) {
  if (!data) {
    throw new Error("No data received!");
  }
  await writeData(data, "data.txt"); // the writeData function yields a promise
}
