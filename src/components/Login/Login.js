import React from 'react';
import Auth from './useAuth';

const Login = () => {
    //use-auth.js theke auth function k import
    const auth=Auth();
    console.log(auth.user);
    const handleSignIn=()=>{
        auth.signInWithGoogle()
        .then(res=>{
            window.location.pathname='/review';
            console.log('redirect now')
        })
    }

    const handleSignOut=()=>{
        auth.signOut()
        .then(res=>{
            window.location.pathname='/';
        })
    }

    return (
        <div>
            <h1>Join here</h1>
            {
                //jodi user sign in ora thake tahole sign out button ta dekhabe. kora na thakle sign in button dekhabe
                auth.user? <button onClick={handleSignOut}>Sign Out</button> :
                <button onClick={handleSignIn}>Sign in with Google</button>
            }
        </div>
    );
};

export default Login;