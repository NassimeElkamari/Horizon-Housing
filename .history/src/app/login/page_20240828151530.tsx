"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState  , useEffect} from 'react'
import {signIn , useSession , signOut} from "next-auth/react"

const Login = () => {

    const [error , setError] = useState('');
    const router = useRouter();
    const session = useSession();
    
    useEffect(()=>{
        if(session?.status === "authenticated"){
            router.replace("/home");
        }
    },[session, router])

    const isValidEmail = (email:string ) =>{
        const emailRegex = /^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})$/i;
        return emailRegex.test(email)
    }

    const handleLogin = async(e:any) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        if(!isValidEmail(email)){
            setError("Email is invalid");
            return;
        }

        if(!password || password.length < 8){
            setError("Password is invalid");
            return;
        }
        
        const response = await signIn("credentials" , {
            redirect: false ,
            email, password,
        });

        if(response?.error){
            setError("Invalid Email or Password");
            if(response?.url) router.replace("/home");
        }else{
            setError("")
        }
    
    }
  return (
    <main className='flex lg:h-[100vh]'>
    <div className='w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start'>
        <div className='p-8 w-[600px]'>
            <h1 className='text-6xl font-semibold'>Sign In</h1>
            <p className='mt-6 ml-1'>Don't have an account ? <Link href="/register">Register</Link> {" "}</p>
            {/* <div className='bg-black text-white w-full py-4 mt-10 rounded-full 
            transition-transform hover:bg-black/[0.5] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group:'>
                <span className='font-medium text-white group-hover:text-white'>Login with Github</span>
            </div> */}
            <form onSubmit={handleLogin}>
                <div className='mt-10 pl-1 flex flex-col'>
                    <label>Email</label>
                    <input type="email" required  className='font-medium border-b border-black p-4 outline-0'/>
                </div>
                <div className='mt-10 pl-1 flex flex-col'>
                    <label>Password</label>
                    <input type="password" required  className='font-medium border-b border-black p-4 outline-0'/>
                </div>
                <button className='bg-black text-white w-44 py-4 mt-10 rounded-
                 transition-transform hover:bg-black/[0.5]'>Sign In</button>
            </form>
        </div>
    </div>
    <div className='w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block' style={{backgroundImage: "url('/write.jpg')"}}></div>
</main>
  )
}

export default Login
