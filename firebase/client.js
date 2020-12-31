import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDGqOw8GAb4Bp584beUVkaY7tyigwZQ_N4',
  authDomain: 'template-next-js.firebaseapp.com',
  projectId: 'template-next-js',
  storageBucket: 'template-next-js.appspot.com',
  messagingSenderId: '203120559288',
  appId: '1:203120559288:web:820641802375760aab204d',
  measurementId: 'G-7WNVYZHEMS'
}

!firebase.default.apps.length && firebase.default.initializeApp(firebaseConfig)
const db = firebase.default.firestore()

const mapUserFromFirebaseAuth = (user) => {
  const { photoURL, email, displayName, uid } = user
  return {
    avatar: photoURL,
    userName: displayName,
    email,
    uid
  }
}

export const onAuthStateChange = (onChange) => {
  return firebase.default
    .auth()
    .onAuthStateChanged(user => {
      const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null
      onChange(normalizedUser)
    })
}

export const loginWithGithub = () => {
  const githubProvider = new firebase.default.auth.GithubAuthProvider()

  return firebase.default
    .auth()
    .signInWithPopup(githubProvider)
}

export const addDevit = ({avatar, content, userId, userName, img}) => {
  return db.collection('devits').add({
    avatar,
    content,
    userName,
    userId,
    img,
    createdAt: firebase.default.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
}

export const fetchLatestDevits = () => {
  return db.collection("devits")
      .orderBy("createdAt", "desc")
      .get()
      .then(({docs}) => {
        return docs.map(doc => {
          const data = doc.data()
          const id = doc.id
          const {createdAt} = data

          return {
            ...data,
            id,
            createdAt: +createdAt.toDate()
          }
        })
      })
}

export const uploadImage = (file) => {
  const ref = firebase.default.storage().ref(`/images/${file.name}`)
  const task = ref.put(file)
  return task
}

