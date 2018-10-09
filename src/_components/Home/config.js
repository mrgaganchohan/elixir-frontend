
var config = {
    apiKey: "AIzaSyBnmqsoippRVBgadkHkKpsijLcdiMCUtpQ",
    authDomain: "elixir-218723.firebaseapp.com",
    databaseURL: "https://elixir-218723.firebaseio.com",
    projectId: "elixir-218723",
    storageBucket: "elixir-218723.appspot.com",
    messagingSenderId: "671693303394"
    clientId: "671693303394-32bthqmc8mcccgr9akovsvijafe9ihq1.apps.googleusercontent.com",

    scopes: [
        "email",
        "profile",
        "https://www.googleapis.com/auth/calendar"
    ],
    discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
};
firebase.initializeApp(config);

var uiConfig = {
    signInSuccessUrl: "https://api.elixir.ausgrads.academy/products_micro/products/displayProducts", // Assuming you are running on your local machine
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: config.scopes
        }
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>"
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

// This function will trigger when there is a login event
firebase.auth().onAuthStateChanged(function(user) {
    console.log(user)
    // Make sure there is a valid user object
    if (user) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://apis.google.com/js/api.js";
        // Once the Google API Client is loaded, you can run your code
        script.onload = function(e) {
            // Initialize the Google API Client with the config object
            gapi.client
                .init({
                    apiKey: config.apiKey,
                    clientId: config.clientID,
                    discoveryDocs: config.discoveryDocs,
                    scope: config.scopes.join(" ")
                })
                // Loading is finished, so start the app
                .then(function() {
                    // Make sure the Google API Client is properly signed in
                    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                        startApp(user);
                    } else {
                        firebase.auth().signOut(); // Something went wrong, sign out
                    }
                });
        };
        // Add to the document
        document.getElementsByTagName("head")[0].appendChild(script);
    }
});

function startApp(user) {
    console.log(user);

    // Make sure to refresh the Auth Token in case it expires!
    firebase.auth().currentUser.getToken()
        .then(function(){
            return gapi.client.calendar.events
                .list({
                    calendarId: "primary",
                    timeMin: new Date().toISOString(),
                    showDeleted: false,
                    singleEvents: true,
                    maxResults: 10,
                    orderBy: "startTime"
                })
        })
        .then(function(response) {
            console.log(response);
        });
}