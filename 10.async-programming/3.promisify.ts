import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolvePath = (givenPath: string) => {
	return path.resolve(__dirname, givenPath);
};

const getFileType = (path: string): Promise<"FILE" | "DIRECTORY" | "OTHER"> => {
	const absolutePath = resolvePath(path);

	return new Promise((resolve, reject) => {
		fs.stat(
			absolutePath,
			(err: NodeJS.ErrnoException | null, stats: fs.Stats) => {
				if (err) {
					reject(err);
					return;
				} else {
					if (stats.isFile()) {
						resolve("FILE");
					} else if (stats.isDirectory()) {
						resolve("DIRECTORY");
					} else {
						resolve("OTHER");
					}
				}
			},
		);
	});
};

getFileType("./path.ts")
	.finally(() => console.log("\nstarted filetype check"))
	.then((fileType) => console.log("FILE TYPE: " + fileType))
	.catch((err) => console.log(err.message))
	.finally(() => console.log("Concluded the file type check"));

const getFileOrFolderContent = (path: string): Promise<string | string[]> => {
	const absolutePath = resolvePath(path);

	return new Promise<string | string[]>((resolve, reject) => {
		getFileType(absolutePath)
			.then((fileType) => {
				switch (fileType) {
					case "FILE":
						resolve(absolutePath);
						break;
					case "DIRECTORY": {
						fs.readdir(absolutePath, (err, files) => {
							if (err) {
								reject(err);
								return;
							}
							resolve(files);
						});
						break;
					}
				}
			})
			.catch((err) => {
				reject(err);
				// throw err;
			});
	});
};

getFileOrFolderContent("./")
	.finally(() => console.log("\nStarted file/folder content retrieval"))
	.then((contents) => console.log(contents))
	.catch((err) => console.log(err.message))
	.finally(() => console.log("Concluded file/folder content retrieval"));

const getFileSize = (path: string): Promise<number> => {
	const absolutePath = resolvePath(path);

	return new Promise<number>((resolve, reject) => {
		getFileType(absolutePath)
			.then((fileType) => {
				fs.stat(absolutePath, (err, fileSize) => {
					if (err) {
						reject(err);
					}

					switch (fileType) {
						case "FILE": {
							resolve(fileSize.size);
							break;
						}
						case "DIRECTORY": {
							fs.readdir(absolutePath, (err, files) => {
								if (err) return reject(err);
								if (files.length === 0) return resolve(0);

								let totalSize = 0;
								let pending = files.length;
								let isSettled = false;

								files.forEach((file) => {
									const fullPath = resolvePath(absolutePath + "/" + file);

									getFileSize(fullPath)
										.then((innerFileSize) => {
											totalSize += innerFileSize;
										})
										.catch((err) => {
											isSettled = true;
											reject(err);
										})
										.finally(() => {
											pending--;
											if (pending === 0) resolve(totalSize);
										});
								});
							});
							break;
						}
						default:
							resolve(0);
					}
				});
			})
			.catch((err) => {
				reject(err);
			});
	});
};

getFileSize("../")
	.finally(() => console.log("\nStarted calculating the file size"))
	.then((size) => {
		let suffix = "KB";
		let finalSize = (size / 1024).toFixed(2);
		if (Number(finalSize) < 3000) {
			finalSize;
		} else {
			finalSize = (Number(finalSize) / 1024).toFixed(2);
			suffix = "MB";
		}
		console.log(`SIZE: ${finalSize}${suffix}`);
	})
	.catch((err) => console.log(err))
	.finally(() => console.log("Concluded calculating the file size"));
