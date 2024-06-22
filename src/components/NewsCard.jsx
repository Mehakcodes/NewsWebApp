import React from 'react';
import NoImage from '../assets/NoImg.jpg';

function NewsCard({item}) {
  return (

    <div className='w-full flex items-center justify-center'>
    <a href={item.url} target='_blank' rel="noreferrer">
    <div className='bg-gray-100/20 rounded-lg max-w-[35rem] p-8 shadow-md hover:scale-[102%] duration-75 ease-in-out'>
    
    <img src={item.urlToImage ?? NoImage} alt="" className='w-full h-64 object-cover rounded-lg'/>

    <h1 className='text-xl font-bold mt-2'>{item.title}</h1>
    <p className='text-gray-500 mb-2'>Source - {item.source.name}</p>
    <p>{item.description}</p>

    </div>
    </a>
    </div>
  )
}

export default NewsCard