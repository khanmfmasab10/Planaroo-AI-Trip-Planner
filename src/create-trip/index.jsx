import React, { useState, useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "@/components/ui/input.jsx"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options.jsx'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { chatSession } from '@/service/AIModel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { DialogTitle } from '@radix-ui/react-dialog'
import axios from 'axios'
import { db } from '@/service/firebaseConfig.jsx'
import { setDoc, doc } from "firebase/firestore"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Navigate, useNavigate } from 'react-router-dom'


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData])

  // ✅ Google Login Setup
  // Assuming GetUserProfile is defined elsewhere in the scope
  // and you have access to toast and setOpenDialog
  const login = useGoogleLogin({
      scope: 'email profile openid', // Ensure scopes are present
      
      onSuccess: (tokenResponse) => {
          console.log("Token Response:", tokenResponse); 
          
          // 🛑 CRITICAL FIX: Call the function to fetch the profile
          GetUserProfile(tokenResponse); 
          
          // Add your component-specific cleanup logic here:
          // setOpenDialog(false); 
          // toast.success("Logged in successfully!");
      },
      onError: (error) => console.log('Login Failed:', error)
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      toast("⚠️ Please login to generate trip...");
      return;
    }

    // ✅ Better validation
    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.travelWith) {
      toast("⚠️ Please fill all the details...");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{travelWith}', formData?.travelWith)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    //console.log("Prompt sent to AI:", FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  }

  const SaveAiTrip=async(TripData)=>{

    setLoading(true)
      const user=JSON.parse(localStorage.getItem('user'));
      const docId=Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection:formData,
        tripData:JSON.parse(TripData),
        userEmail:user?.email,
        id:docId
      });
      setLoading(false);
      navigate('/view-trip/'+docId);
}

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept:'application/json'
      }
    }).then((resp)=>{
      console.log(resp); 
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip(); // Retry generating the trip after login
    })
  }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️</h2>
      <p className='mt-3 text-gray-900 text-xl'>
        Provide some basic information and our trip planner will generate a customised itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your dream destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) },
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days you are planning for your trip?</h2>
          <Input placeholder={'Ex. 3'} type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>
      </div>

      {/* Budget Selection */}
      <div>
        <h2 className='text-xl my-3 font-medium mt-10'>What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
            ${formData?.budget === item.title && 'shadow-lg border-black'}
            `}>
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-700'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Partner Selection */}
      <div>
        <h2 className='text-xl my-3 font-medium mt-10'>Who do you plan to travel with on your next trip?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelsList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('travelWith', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
            ${formData?.travelWith === item.people && 'shadow-lg border-black'}
            `}>
              <h2 className='text-3xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-700'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className='my-10 justify-end flex'>
        <Button 
          Disabled={loading}
        onClick={OnGenerateTrip}>
          {loading?
          <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />:'Generate Trip'
          }
          </Button>
      </div>

      {/* Google Login Dialog */}
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            {/* Hidden title just for accessibility */}
            <VisuallyHidden>
              <DialogTitle>Sign In With Google</DialogTitle>
            </VisuallyHidden>

            <DialogDescription>
              <img src="logo.svg" alt="App Logo" />
              <h2 className='font-bold text-lg text-gray-900 mt-7'>Sign In With Google</h2>
              <p className='text-black'>
                Sign in to the App with Google authentication securely
              </p>
              <Button

                onClick={login}
                className="w-full mt-5 flex gap-3 items-center"
              >
                <FcGoogle className='h-5 w-5' /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip