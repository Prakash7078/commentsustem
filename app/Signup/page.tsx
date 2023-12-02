"use client";
import React, { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function page() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const[data,setData]=useState<{name:string;email: string; password: string }>({name:"",email:"",password:""});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router= useRouter();
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const handleSignup=()=>{
        localStorage.setItem('userInfo', JSON.stringify(data));
        router.push("/");
    }
  return (
    <div className=''>
        <div className='m-auto mt-32 p-10 flex flex-col gap-5 w-fit text-center items-center'>
            <h1 className='text-center font-bold text-2xl mb-4'>SignUp</h1>
            <div className='grid grid-cols-2'>
                <label className='font-bold'>UserName</label>
                <input className='border-b-2' type="text" name='name' value={data.name} onChange={handleChange} placeholder='enter username'/>
            </div>
            <div className='grid grid-cols-2'>
                <label className='font-bold'>Email</label>
                <input className='border-b-2' type="email" name='email' value={data.email} onChange={handleChange} placeholder='enter email'/>
            </div>
            <div className='grid grid-cols-2'>
                <label className='font-bold'>Password</label>
                <input className='border-b-2' type="password" name='password' value={data.password} onChange={handleChange} placeholder='enter password'/>
            </div>
            <button className="font-bold my-4 rounded-md bg-red-400 w-fit text-white px-4 py-1" onClick={handleSignup}>Sign Up</button>
            <p>
                Already have an account? <span className='font-bold'><Link href="./Login">Login</Link></span>
            </p>
        </div>

    </div>
  )
}
