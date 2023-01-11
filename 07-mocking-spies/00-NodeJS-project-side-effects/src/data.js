import writeData from "./util/io.js";

export function generateReportData(logFn) {
  const data = "Some dummy data for this demo app";
  // in reality, this could be data that is calculated or that is fetched from a db
  if (logFn) {
    logFn(data);
  }
  //| about working with spies: in this case here we care about whether some function is called
  //| i.e. we want to test whether the log function is called (if the log function is provided)

  return data;
}

export async function storeData(data) {
  if (!data) {
    throw new Error("No data received!");
  }
  await writeData(data, "data.txt"); // the writeData function yields a promise
}
