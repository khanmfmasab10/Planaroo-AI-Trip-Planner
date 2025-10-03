import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCardItem({ Hotels }) {

    const [photoUrl,setPhotoUrl]=useState();
      useEffect(()=>{
        Hotels&&GetPlacePhoto();
      },[Hotels])
    
      const GetPlacePhoto=async()=>{
        const data={
          textQuery:Hotels.HotelName
        }
        const result =await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data.places[0].photos[3].name)
    
          const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
          setPhotoUrl(PhotoUrl);
        })
      }
    return (
        <div>
            <Link to={'https://www.google.com/maps/search/?api=1&query='
                + Hotels.HotelName + "," + Hotels?.Hotel_address} target='_blank'
                className="no-underline text-black visited:text-black hover:text-black">

                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-xl h-[200px] w-full object-cover' />
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'>{Hotels?.HotelName}</h2>
                        <h2 className='text-xs text-grey-700'>📍 {Hotels?.Hotel_address}</h2>
                        <h2 className='font-semibold text-sm'>💰 {Hotels?.Price}</h2>
                        <h2 className='font-semibold text-sm'>⭐ {Hotels?.Rating}</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default HotelCardItem
