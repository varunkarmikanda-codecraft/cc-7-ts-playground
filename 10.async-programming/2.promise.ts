// * Promise API brought in standard way to abstract out async operations are made it consistent to consume the data as well as the errors

import { resolve } from "node:dns";

// any sync or async operation can be performed here
// In case of success, you can record the value or result using resolve ---> resolve(value);
// In case of an error, you will record error using reject ---> reject(error)

// const aPromise = new Promise((resolve, reject) => {
// 	const success = true;

// 	if (success) {
// 		// Calling a resolve anywhere inside an executor function will immediately end the execution and return the value.
// 		resolve({
// 			hahahaa: "67",
// 			lololol: "67",
// 		});

// 		resolve(67);

// 		console.log("Fooled the promise resolve!!");
// 	} else {
// 		reject({
// 			error: "6767676767",
// 		});

// 		reject(67);

// 		console.log("Fooled the promise reject!!");
// 	}
// });

// aPromise
//   .then(
//     resolved => console.log(resolved),
//     rejected => console.log(rejected)
//   )
//   .catch()

// const promise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve({
// 			lolololol: "😼😼😼",
// 		});
// 	}, 3000);
// });

// // promise
// //   .then(resolved => console.log(resolved))    // Return value of then is always a promise. If the promise is resolved promise. is resolved then the promise returned will be resolved promise with whatever value that is returned by the resolve callback
// //   .catch(rejected => console.log(rejected))

// // implement a function delay ms
// // delay(2000).then(resolve => console.log("i called 2sec later"))

// const delay = (ms: number) =>
// 	new Promise((resolve) => {
// 		setTimeout(resolve, ms);
// 	});

// console.log("Started delay!!");
// delay(3000).then((resolved) => console.log("2sec delay!!"));

// const p = new Promise((resolve, reject) => {
// 	const success = false;

// 	console.log("P");

// 	if (success) {
// 		resolve(delay(3000).then((resolved) => console.log("3sec delay!!")));
// 	} else {
// 		reject("lol");
// 	}
// });

// p.catch((err) => console.log(err));

// delay(100);
// console.log(
// 	"---------------------------------------------------------------------------------",
// );

// const xMan = new Promise((resolve, reject) => {
// 	const number = 119;
// 	const isNumGreaterThan67 = number > 67;

// 	if (isNumGreaterThan67) {
// 		resolve({
// 			nooooo: "676767 <",
// 		});
// 	} else {
// 		reject({
// 			yessss: "< 676767",
// 		});
// 	}
// });

// xMan
// 	.then((v) => {
// 		console.log("RES 1");
// 		return v;
// 	})
// 	.then((resolved) => console.log(resolved))
// 	.catch((rejected) => console.log(rejected))
// 	.then((v) => {
// 		console.log("RES 2");
// 		return v;
// 	})
// 	.then((v) => {
// 		delay(2000);
// 		return v;
// 	})
// 	.then((v) => console.log("DELAY!!!"))
// 	.catch((rejected) => console.log(rejected))
// 	.then((v) => {
// 		console.log("RES 3");
// 		return `DONE`;
// 	})
// 	.then((resolved) => console.log(resolved))
// 	.catch((rejected) => console.log(rejected));

const aPromise = new Promise((resolve, reject) => {
	const success = true;

	if (success) {
		// Calling a resolve anywhere inside an executor function will immediately end the execution and return the value.
		resolve(67);

		console.log("Fooled the promise resolve!!");
	} else {
		throw new Error("ERROR OCCURRED");
		// reject(new Error("Operation failed: Invalid numeric state"));

		// console.log("Fooled the promise reject!!");
	}
});

// const anotherPromise =
const finalPromise = aPromise
	.finally(() => {
		console.log("FINALLY OF A PROMISE IS GETTING CALLED");
		// throw new Error("Finallys error")
		return Promise.resolve(33333); // All returns except rejecting promise is ignored
	})
	.then((value) => {
		console.log(value);
		// return Promise.resolve(6767);
		throw new Error("Exception inside a then");
	})
	.then((value) => console.log(value)) // then will always call this callback on
	.catch((err) => {
		// console.log(err.message)
		// throw new Error("Exception inside a catch")
		return 95;
	})
	.then((value) => {
		console.log(value);
		return 6666;
	})
	.catch((err) => {
		console.log(err.message);
		// throw new Error("xx")
	})
	.finally(() => {
		console.log("FINALLY WILL CALLED ON A PROMISE BE IT RESOLVED OR REJECTED");
		return 7777777777;
	});

finalPromise.then((val) => console.log(val)).catch((err) => console.log(err));
// console.log(finalPromise)

// anotherPromise.then(value => console.log(value))

// const resolve = <T>(value: T) => new Promise<T>((resolve) => {
// 	resolve(value)
// })

// const reject = <T>(value: any) => new Promise((_, reject) => {
// 	reject(value)
// })

// const rejectedPromise =
