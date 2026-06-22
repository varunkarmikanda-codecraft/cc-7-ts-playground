const onePromise = new Promise<void>((resolve, reject) => {
	setTimeout(() => {
		console.log("\nASYNC 1");
		resolve();
	}, 1000);
});

onePromise.then(() => console.log("ASYNC 1 RESOLVED"));

// ----------------------------------------------------------------------------------------------------------------------------

new Promise<void>((resolve, reject) => {
	setTimeout(() => {
		console.log("\nASYNC 2");
		resolve();
	}, 2000);
}).then(() => console.log("ASYNC 2 RESOLVED"));

// ----------------------------------------------------------------------------------------------------------------------------

type User = { username: string; email: string };

const threePromise = new Promise<User>((resolve, reject) => {
	setTimeout(() => {
		console.log("\nASYNC 3");
		resolve({
			username: "varun",
			email: "v@varun.com",
		});
	}, 3000);
});

threePromise.then((user) => {
	console.log(`${user.username} <${user.email}>`);
	console.log("ASYNC 3 RESOLVED");
});

// ----------------------------------------------------------------------------------------------------------------------------

type UserDetails = { name: string; password: string; isActive: boolean };

const fourPromise = new Promise<UserDetails>((resolve, reject) => {
	setTimeout(() => {
		console.log("\nASYNC 4");
		const error = false;
		if (!error) {
			resolve({
				name: "NiTR0x",
				password: "lol😼",
				isActive: true,
			});
		} else {
			reject({ error: "ERROR!!" });
		}
	}, 4000);
});

const username = fourPromise
	.then((user) => {
		console.log(user);
		return user.name;
	})
	.then((name) => {
		console.log(name);
		return name;
	})
	.catch((err) => {
		console.log(err);
		return err.error;
	})
	.catch((error) => {
		console.log(error);
		return error;
	})
	.finally(() => console.log("ASYNC 4 RESOLVED"));

setTimeout(() => {
	console.log(username);
}, 6000);
