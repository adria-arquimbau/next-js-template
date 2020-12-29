import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDGqOw8GAb4Bp584beUVkaY7tyigwZQ_N4",
    authDomain: "template-next-js.firebaseapp.com",
    projectId: "template-next-js",
    storageBucket: "template-next-js.appspot.com",
    messagingSenderId: "203120559288",
    appId: "1:203120559288:web:820641802375760aab204d",
    measurementId: "G-7WNVYZHEMS"
}

!firebase.default.apps.length && firebase.default.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuth = (user) => {
    const {photoURL, email, displayName} = user
    return {
        avatar: photoURL,
        username: displayName,
        email
    }
}

export const onAuthStateChange = (onChange) => {
    return firebase.default
        .auth()
        .onAuthStateChanged(user => {
            onChange(mapUserFromFirebaseAuth(user))
        })
}

export const loginWithGithub = () => {
    const githubProvider = new firebase.default.auth.GithubAuthProvider()

    return firebase.default
        .auth()
        .signInWithPopup(githubProvider)
}