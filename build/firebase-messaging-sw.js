// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');
//8.0.2

// eslint-disable-next-line no-undef
firebase.initializeApp({
    apiKey: "AIzaSyDeavPf1KPoXmIeF1izq5sT8yChcwtFDAA",
    authDomain: "employee-buddy-cf97e.firebaseapp.com",
    projectId: "employee-buddy-cf97e",
    storageBucket: "employee-buddy-cf97e.appspot.com",
    messagingSenderId: "967432466788",
    appId: "1:967432466788:web:cb6cef2789696f5ab20a71",
    measurementId: "G-N5RL11NK3X"
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function (err) {
        console.log('Service worker registration failed, error:', err);
    });
}
const messaging = firebase.messaging();
