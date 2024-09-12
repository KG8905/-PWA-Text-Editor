const butInstall = document.getElementById('buttonInstall');

// Variable to store the `beforeinstallprompt` event
let deferredPrompt;

// Event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing
event.preventDefault();
  // Store the event so it can be triggered later
deferredPrompt = event;
  // Show the install button
butInstall.style.display = 'block';
});

// Click event handler on the `butInstall` button
butInstall.addEventListener('click', async () => {
if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user's response
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the install prompt');
    } else {
    console.log('User dismissed the install prompt');
    }
    // Clear the deferred prompt variable since it's been used
    deferredPrompt = null;
    // Hide the install button again after installation
    butInstall.style.display = 'none';
}
});

// Event handler for when the app is installed
window.addEventListener('appinstalled', (event) => {
console.log('PWA was installed successfully');
  // Optionally, hide the install button after successful installation
butInstall.style.display = 'none';
});
