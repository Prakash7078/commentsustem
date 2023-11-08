"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation'

export default function Login() {
  const [data, setData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    router.push('/');
  };

  return (
    <div className="w-full h-screen">
      <div className='w-fit mx-auto md:mt-36 mt-24 shadow-inner md:p-10 p-7'>
        <h1 className='text-center font-bold text-2xl pb-7'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 items-center sm:w-72 w-fit'>
          <div className='grid grid-cols-2'>
            <label className='font-bold'>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className='grid grid-cols-2'>
            <label className='font-bold'>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <button className='my-4 bg-green-400 px-3 py-1 rounded-lg text-white font-bold' type="submit">Login</button>
        </form>
        <p>
          Already have an account? <span className='font-bold'>Signup</span>
        </p>
      </div>
    </div>
  );
}
