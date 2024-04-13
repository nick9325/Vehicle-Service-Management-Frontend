"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GetCurrentUser } from '../../../constants/AuthConstants';
import { useRouter } from 'next/navigation';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const router = useRouter();

  const fetchCurrentUser = async () => {

    const token = localStorage.getItem('token');
    console.log(token)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    let response = await fetch(`${GetCurrentUser}`, requestOptions);
    console.log(response);
    if (response.ok) {
      let res = await response.json();
      setUser(res);
    } else if (response.status === 401) {
      toast.dismiss();
      toast.error('Please log in to continue');
      router.push('/authentication/sign-in');
    } else {
      toast.dismiss();
      toast.error('Failed to fetch user');
    }

  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])


  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = () => useContext(GlobalContext);