import React from 'react'
import { FaFrown } from "react-icons/fa";

function NotFound({msg}) {
    return (
        <div className='flex flex-col h-screen items-center justify-center'>
            <div>
                <FaFrown size={150} color='#1bd954'/>
            </div>    
            <p className='text-white text-2xl mt-2'>{msg}</p>
        </div>
    );
}

export default NotFound
