import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl, box}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='face' src={imageUrl} width='500px' height='auto'/>
                <div className='bounding_box' style={{top: box.topRow, right: box.rigthCol, bottom: box.bottomRow, left: box.leftCol }}>

                </div>
            </div>
        </div>
    )
}


export default FaceRecognition;