"use client";
import React, { ChangeEvent, useState } from 'react'
interface PostProps {
    value: boolean;
    setAddpost: React.Dispatch<React.SetStateAction<boolean>>;
  }
export default function Post({ value, setAddpost }: PostProps) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const[data,setData]=useState<{username:string;desc: string; tags:string }>({username:"",desc:"",tags:""});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>{
        setData({...data,[e.target.name]:e.target.value});
    }
    const handlePost=async()=>{
        try{
            await fetch("/api/post",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
        }catch(err){
            console.log(err);
        }
        setAddpost(!value);
    }
  return (
    <div className=''>
        <div className='m-auto mx-auto mt-10 p-6 sm:p-10 flex flex-col gap-5 w-fit text-center items-center'>
            <h1 className='text-center font-bold text-2xl mb-4'>Add Post</h1>
            <div className='grid grid-cols-2'>
                <label className='font-bold'>UserName</label>
                <input className='border-b-2' type="text" name='username' value={data.username} onChange={handleChange} placeholder='enter username'/>
            </div>
            <div className='grid grid-cols-2'>
                <label className='font-bold'>Description</label>
                <input className='border-b-2' type="text" name='desc' value={data.desc} onChange={handleChange} placeholder='enter description'/>
            </div>
            <div className='grid grid-cols-2'>
                <label className='font-bold'>Tags</label>
                <input className='border-b-2' type="text" name='tags' value={data.tags} onChange={handleChange} placeholder='enter tags seperate with #'/>
            </div>
            
            <button className="font-bold my-4 rounded-md bg-red-400 w-fit text-white px-4 py-1" onClick={handlePost}>AddPost</button>
           
        </div>

    </div>
  )
}
