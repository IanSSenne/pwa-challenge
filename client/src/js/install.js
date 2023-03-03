const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
	// Prevent the mini-infobar from appearing on mobile
	event.preventDefault();
	// Stash the event so it can be triggered later.
	window.deferredPrompt = event;
	// Update UI notify the user they can install the PWA
	butInstall.hidden = false;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
	// Hide the app provided install promotion
	butInstall.hidden = true;
	// Show the install prompt
	const promptEvent = window.deferredPrompt;
	promptEvent.prompt();
	// Wait for the user to respond to the prompt
	const result = await promptEvent.userChoice;
	// Log the result
	console.log("User response to the install prompt:", result);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
	// Log install to analytics
	console.log("INSTALL: Success");
});
