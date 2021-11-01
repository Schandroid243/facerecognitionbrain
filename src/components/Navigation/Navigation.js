import React from 'react';


const Navigation = ({ onRouteChange, isSignedIin }) => {
        if(isSignedIin) {
            return( 
                <nav style={{display: 'flex', justifyContent:'flex-end', padding:10}}>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'> Sign Out </p>
                </nav>
            )
            
        } else {
            return(
                <nav style={{display: 'flex', justifyContent:'flex-end', padding:10}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'> Sign In </p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'> Register </p>
                </nav>
            )
        }
}

export default Navigation;