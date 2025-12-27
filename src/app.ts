if ("serviceWorker" in navigator) {
	window.addEventListener("load", function (): void {
		const response: Promise<ServiceWorkerRegistration> = this.navigator.serviceWorker.register("/js/sw.js");
		response.then(function (): void {
			console.log("Service worker registered.");
		});
		response.catch(function (error): void {
			console.error("Service worker failed to register.");
			console.error(error);
		});
	});
}
