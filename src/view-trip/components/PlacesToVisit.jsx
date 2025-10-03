import React from 'react'
import PlaceCardItem from './PlaceCardItem' 
import { Map } from 'lucide-react'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places To Visit</h2>

        <div>
            {trip.tripData?.Itinerary?.map((item, index)=>(
                <div className='mt-5'>
                    <h2 className='font-medium text-lg'>Day {item.Day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item.Plan.map((Place,index)=>(
                        <div className=''>
                            <h2 className='font-medium text-sm text-red-600'>{Place.Best_Time_to_Visit}</h2>
                            <PlaceCardItem Place={Place}/>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit
