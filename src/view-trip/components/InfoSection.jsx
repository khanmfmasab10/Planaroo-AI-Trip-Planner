import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'    
import { RiSendPlaneFill } from "react-icons/ri";   

const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=3000&maxWidthPx=3000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY
function InfoSection({ trip }) {

  const [photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result =await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[0].name)

      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[0].name);
      setPhotoUrl(PhotoUrl);
    })
  }
  return (
    <div>
      <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='h-[440px] w-full object-cover rounded-xl' />

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
              <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-900 text-xs md:text-md'>📅 {trip.userSelection?.noOfDays}Day</h2>
              <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-900 text-xs md:text-md'>💰 {trip.userSelection?.budget}Budget</h2>
              <h2 className='p-1 px-3 bg-gray-300 rounded-full text-gray-900 text-xs md:text-md'>🥂 No. Of Travelers: {trip.userSelection?.travelWith}</h2>
          </div>
        </div>
        <Button><RiSendPlaneFill /></Button>
      </div>
    </div>
  )
} 

export default InfoSection
