import React from 'react'

export default function About() {
    return (
        <div>
            <div style={{
                width: '100%',
                margin: 'auto',
                position: 'absolute',
                top: '30%',

            }} >

                <h1 className="display-4">About Photix</h1>
                <h3>Version 1.0.0</h3>
                <p className="w-75 my-4 mx-auto">This is a simple app allowing users to view an "infinite" amount of latest pictures, search any tag or keyword the user wishes, and click on any picture to learn more about its specific details, such as where the picture was taken, who took it, details about the camera, and more.</p>
            </div>
        </div>
    )
}
