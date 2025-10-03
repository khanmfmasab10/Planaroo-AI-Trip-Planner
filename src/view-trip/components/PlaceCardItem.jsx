import { Button } from '@/components/ui/button'
import React from 'react'
import { MdLocationPin } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { GetPlaceDetails } from '@/service/GlobalApi';

function PlaceCardItem({Place}) {

  const [photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    Place&&GetPlacePhoto();
  },[Place])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:Place.PlaceName
    }
    const result =await GetPlaceDetails(data).then(resp=>{
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[2].name);
      setPhotoUrl(PhotoUrl);
    })
  }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+Place.PlaceName} target='_blank'
    className="no-underline text-black visited:text-black hover:text-black">

        <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <img src={photoUrl?photoUrl:'/placeholder.jpg'}
            className='rounded-xl h-[250px] w-[180px] object-cover'
            />
            <div>
                <h2 className='font-bold text-lg'>{Place.PlaceName}</h2>
                <p className='text-sm text-gray-700'>{Place.PlaceDetails}</p>
                <h2 className='mt-2'>⌛ {Place.Time_to_travel}</h2>
                {/* <Button><MdLocationPin /></Button>*/}
            </div>
        </div>
    </Link>
  )
}

export default PlaceCardItem
