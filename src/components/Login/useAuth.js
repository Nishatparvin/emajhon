//firebase(googleSearch)->get started->project->go to docs->get started for web->step 2 theke prothom duita import code copy
import React from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';
import {Route,Redirect} from 'react-router-dom'


//initialize er function take call korle firebaseConfig auto import hoye jabe
firebase.initializeApp(firebaseConfig);
const AuthContext=createContext();
export const AuthProvider=(props)=>{
    const auth=Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth=()=>{
    return useContext(AuthContext)
}

export const PrivateRoute=({ children, ...rest })=> {
  const auth=useAuth();  
  return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  


const getUser=user=>{
    const{displayName,email,photoURL}=user;
    return {name: displayName, email,photo: photoURL}
   
}
const Auth=()=>{

    //sign in er info gulo rakhar jonno ekta state declare kortechi
    const[user,setUser]=useState(null)   //initial value null
       

    const signInWithGoogle= () => {

        //get started for web->google sign in->copy provider code
        const provider = new firebase.auth.GoogleAuthProvider();
     
        // firebase.auth().signInWithPopup ei function er moddhe provider k pass kore dibo
         return firebase.auth().signInWithPopup(provider)
        .then(res=>{
            //j sign in korbe tar displayName,email,photoURL ei info gulu collect korbo
           const signedInUser=getUser(res.user);
            //signedInUser k setUser a set kortechi
            setUser(signedInUser)
            return res.user;
        })
        //kono error asle take catch korbe
        .catch(err=>{
            //keo login na korle ba kono error asle setUser er value null hobe
            setUser(null)
            console.log(err);
            return err.message;
        })
    }

    const signOut=()=>{
        //get started for web->google sign in->copy signOut code
        return firebase.auth().signOut().then(function() {
            // Sign-out successful.
            setUser(null); //signout a click korle signin button take ni asbe
            return true;
          }).catch(function(error) {
            return false;
            // An error happened.
          });
          
    }

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(usr){
            if(usr){
                const currentUser=getUser(usr);
                console.log(usr);   
                setUser(currentUser);
            }
            else{

            }
        })
    })

    //function take return korbe
    return{
        user,
        signInWithGoogle,
        signOut
    }
}

export default Auth;