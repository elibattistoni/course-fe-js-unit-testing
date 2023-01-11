// these two imports are from NodeJS
import path from "path";
import { promises as fs } from "fs";

export default function writeData(data, filename) {
  const storagePath = path.join(process.cwd(), "data", filename);
  return fs.writeFile(storagePath, data);
}

//% mocks
//| here we have the problem that we do not want to execute the original writeFile method
//| we only want to find out whether it was called, but it should not do its job of writing to the file system
//| it should do that during production, but not when we run our tests
//| we could use spies, but to replace it with an empty function and find out whether it was called it is harder
//| because it comes from a module that we do not own
//| IMPORTANT with mocks we can replace functionalities that are defined in modules,
//| regardless of whether we own them or not
