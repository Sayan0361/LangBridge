import { useState } from 'react'
import { ShipWheelIcon} from "lucide-react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios";
import useSignUp from '../hooks/useSignUp';

const SignUpPage = () => {
  const [signupData,setSignUpData] = useState({
    fullName:"",
    email:"",
    password:""
  });

  // const queryClient = useQueryClient();

  // const {mutate, isPending, error} = useMutation({
  //   mutationFn: async() =>{
  //     const response = await axiosInstance.post("/auth/signup", signupData);
  //     return response.data;
  //   },
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"]}),
  // });

  const {isPending, error, signupMutation} = useSignUp();

  const handleSignUp = (e)=>{
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="dark">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>

      {/* Sign Up form left side */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* logo */}
          <div className='mb-4 flex items-center justify-start gap-2'>
              <Link to="/" className="flex items-center gap-3 group">
                <div className="rounded-2xl bg-zinc-950 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                  <img 
                    src="/logo.png" 
                    alt="LangBridge Logo"
                    className="h-8 rounded-full w-auto object-contain transition-transform duration-300"
                  />
                </div>
                <span className="text-3xl font-bold font-mono italic bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  LangBridge
                </span>
              </Link>
          </div>

          <div className='w-full'>
            <form onSubmit={handleSignUp}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-2xl text-primary font-semibold'>
                    Create an Account
                  </h2>
                  <p>
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>

                {/* Full Name Label */}
                <div className='space-y-3'>
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text font-semibold'>Full Name</span>
                    </label>
                    <input type="text" placeholder='Sayan Sen' className='input input-bordered w-full' 
                      value={signupData.fullName} 
                      onChange={(e)=>{ setSignUpData({...signupData,fullName:e.target.value})}}
                      required>
                    </input>
                  </div>
                  
                  {/* Email Label */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text font-semibold'>Email</span>
                    </label>
                    <input type="email" placeholder='sayansen@gmail.com' className='input input-bordered w-full' 
                      value={signupData.email} 
                      onChange={(e)=>{ setSignUpData({...signupData,email:e.target.value})}}
                      required>
                    </input>
                  </div>

                  {/* Password */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text font-semibold'>Password</span>
                    </label>
                    <input type="password" placeholder='********' className='input input-bordered w-full' 
                      value={signupData.password} 
                      onChange={(e)=>{ setSignUpData({...signupData,password:e.target.value})}}
                      required>
                    </input>
                    <p className='text-xs opacity-70 mt-2'>
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  {/* Terms and Services */}
                  <div className='form-control'>
                    <label className='label cursor-pointer justify-start gap-2'>
                      <input type='checkbox' className='checkbox checkbox-sm' required/>
                      <span className='text-xs leading-tight'>
                        I agree to the {" "}
                        <span className='text-primary hover:underline'>
                          terms of services 
                        </span>
                          {" "} and {" "}
                        <span className='text-primary hover:underline'>
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Create Account */}
                <button type="submit" className='btn btn-primary w-full hover-primary'>
                  {isPending ? "Signing up...":"Create Account"}
                </button>
                
                {/* Sign In */}
                <div className='text-center mt-4'>
                  <p className='text-sm'>
                    Already have an account? {" "}
                    <Link to="/login" className='text-primary hover:underline'>
                      Sign In
                    </Link>
                  </p>
                </div>


              </div>
            </form>
          </div>
        </div>

      {/* Sign up form Right side */}
        <div className='hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-primary/10 '>
          <div>
            {/* Illustration */}
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src="/i.png" alt="Language Connection Illustration" className='w-full h-full brightness-70 contrast-110 '/>
            </div>

            {/* Text below the image */}
            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-xl font-semibold text-ellipsis text-primary'>
                Connect with language partners worldwide
              </h2>
              <p className='opacity-70 italic'>
                Practice conversations, make friends and improve your language skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage