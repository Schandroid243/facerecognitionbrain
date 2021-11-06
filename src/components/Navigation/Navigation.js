import React from 'react';


const Navigation = ({ onRouteChange, isSignedIin }) => {

    const signOut = () => 
         (
            <nav style={{display: 'flex', justifyContent:'flex-end', padding:10}}>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'> Sign Out </p>
            </nav>
        )
    

    const signIn = () => 
        (
            <nav style={{display: 'flex', justifyContent:'flex-end', padding:10}}>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'> Sign In </p>
            <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'> Register </p>
            </nav>
        )
    

    return isSignedIin ? signOut() :signIn();
}

export default Navigation;