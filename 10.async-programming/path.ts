import fs, { stat } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getFileType } from "./1.callbacks.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolvePath = (givenPath: string) => {
	return path.resolve(__dirname, givenPath);
};

type myCallback = (
	err: NodeJS.ErrnoException | null,
	contents?: string | string[],
) => void;

const getFileOrFolderContent = (path: string, callback: myCallback) => {
	// Get the file type first, and depending on the type either return the filepath or contents of the path
	getFileType(path, (err, fileType) => {
		if (err) {
			callback(err);
			return;
		}

		switch (fileType) {
			case "FILE":
				callback(null, path);
				break;
			case "DIRECTORY": {
				fs.readdir(path, (err, files) => {
					if (err) {
						callback(err);
						return;
					}
					callback(null, files);
				});
				break;
			}
		}
	});
};

// getFileOrFolderContent(resolvePath('../'), (err, files) => {
//   if(err) {
//     console.log(err.message)
//   } else {
//     console.log(files)
//   }
// })

// get file size

type sizeCallback = (err: NodeJS.ErrnoException | null, size?: number) => void;

const getFileSize = (
	path: string,
	callback: (err: NodeJS.ErrnoException | null, size?: number) => void,
) => {
	getFileType(path, (err, fileType) => {
		if (err) {
			return callback(err);
		}

		fs.stat(path, (err, fileSize) => {
			if (err) {
				return callback(err);
			}

			switch (fileType) {
				case "FILE": {
					callback(null, fileSize.size);
					break;
				}
				case "DIRECTORY": {
					fs.readdir(path, (err, files) => {
						if (err) return callback(err);
						if (files.length === 0) return callback(null, 0);

						let totalSize = 0;
						let pending = files.length;

						files.forEach((file) => {
							const fullPath = resolvePath(path + "/" + file);

							getFileSize(fullPath, (err, innerFileSize) => {
								if (!err && innerFileSize) {
									totalSize += innerFileSize;
								}
								pending--;

								if (pending === 0) callback(null, totalSize);
							});
						});
					});
					break;
				}
				default:
					callback(null, 0);
					break;
			}
		});
	});
};

getFileSize(resolvePath("../"), (err, fileSize) => {
	if (err) {
		console.log(err.message);
	} else {
		if (fileSize !== undefined) {
			const sizeInKB = (fileSize / 1024).toFixed(2);
			console.log(`SIZE: ${sizeInKB}KB`);
		}
	}
});
