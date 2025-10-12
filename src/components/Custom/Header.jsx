import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useState } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from "react-icons/fc";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { IoHome } from "react-icons/io5";
import { FcLike } from "react-icons/fc";


function Header() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  
  useEffect(() => {
    console.log(user)
  }, [])

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
        window.location.reload();
      })
    }

  return (
    <div className='shadow-sm flex justify-between items-center px-5 p-3'>
      <img src='/mylogo.svg' />
      <div>
        {user ?
          <div className='flex items-center gap-3'>

            <a href='http://localhost:5173'>
            <Button variant="outline" className='rounded-full  text-black visited:text-black border-black'><IoHome /></Button>
            </a>
            <a href='/create-trip'>
            <Button variant="outline" className='rounded-full  text-black visited:text-black border-black'>+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
            <Button variant="outline" className='rounded-full  text-black visited:text-black border-black '><FcLike />My Trips</Button>
            </a>

          <Popover>
            <PopoverTrigger>
              <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/>
            </PopoverTrigger>
            <PopoverContent className='shadow-md w-[130px] bg-color-red'>
              <h2 className='font-bold text-gray-600 rounded-full cursor-pointer text-center' onClick={()=>{
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>Logout</h2>
            </PopoverContent>
          </Popover>
          </div>
          :
          <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
        }
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  {/* Hidden title just for accessibility */}
                  <VisuallyHidden>
                    <DialogTitle>Sign In With Google</DialogTitle>
                  </VisuallyHidden>
      
                  <DialogDescription>
                    <img src="mylogo.svg" alt="App Logo" />
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

export default Header
