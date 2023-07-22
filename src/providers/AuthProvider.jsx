import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
  
  } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config'
  export const AuthContext = createContext(null)
  const auth = getAuth(app)


const AuthProvider = ({children}) => {

    const [user, setUser]=useState(null)
    const[loading, setLoading]=useState(true)
    const googleProvider = new GoogleAuthProvider()
    // social login
    // google
    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    // new user
    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    } 
    // sign in user using email and password
    const signIn = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }
// state change monitor
useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser)
        console.log('Current User', currentUser);
        setLoading(false)
    })

    return ()=>{
        return unsubscribe()
    }
},[])

const authInfo = {
    user, 
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut
}

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export default AuthProvider
