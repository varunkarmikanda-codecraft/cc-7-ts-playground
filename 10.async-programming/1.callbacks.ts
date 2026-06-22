import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__filename)
// console.log(__dirname)

// JavaScript runtime is a single threaded system. Anything that needs to be done in background (a task that is costly, or needs I/O, networking) must be delegated to a native thread, and its result needs to be brought back to the main thread of the runtime, via an event loop system with an event queue.

// Before we get into these details, lets take look at how
// we use to get such things done using callback based APIs.

// Checking if a path is a file or directory.

export function getFileType(
	path: string,
	callback: (
		err: NodeJS.ErrnoException | null,
		fileType?: "FILE" | "DIRECTORY" | "OTHER",
	) => void,
) {
	fs.stat(path, (err: NodeJS.ErrnoException | null, stats: fs.Stats) => {
		if (err) {
			callback(err);
			return;
		} else {
			if (stats.isFile()) {
				callback(null, "FILE");
			} else if (stats.isDirectory()) {
				callback(null, "DIRECTORY");
			} else {
				callback(null, "OTHER");
			}
		}
	});
}

// const resolvedPath = path.resolve(__dirname,"./1.callbacks.ts")
// console.log("RES PATH: " + resolvedPath)
// getFileType(resolvedPath, (err, fileType) => {
//   if(err) {
//     console.log(err.message);
//   }
//   console.log("File Type: " + fileType);
// })

// getFileType(__filename);
// // getFileType(__dirname);
// const resolvedPath = path.resolve(__dirname,"./1.callbacks.ts")
// // getFileType(resolvedPath)
// console.log("Getting the type of the path!")

// const getFileType = () => {

// }
