'use client'

import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite";

interface UserContextType {
  current: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name:string) => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider(props:any) {
    const [user, setUser] = useState<any>(null);
  
    async function login(email:string, password:string) {
      try {
        const loggedIn = await account.createEmailPasswordSession(email, password);
        setUser(loggedIn);
        window.location.replace("/");
      } catch(err) {
        console.log(err);
      }
    }
  
    async function logout() {
      try {
        await account.deleteSession("current");
        setUser(null);
      } catch(err) {
        console.log(err);
      }
    }
  
    async function register(email:string, password:string, name: string) {
      try {
        // Registering user in appwrite
        await account.create(ID.unique(), email, password, name);
  
        // Code for registration of user in our database with other details
        // ...
  
        // Login after registration
        await login(email, password);
      } catch(err) {
        console.log(err);
      }
    }
  
    async function init() {
      try {
        const loggedIn = await account.get();
        setUser(loggedIn);
      } catch (err) {
        setUser(null);
      }
    }
  
    useEffect(() => {
      init();
    }, []);
  
    return (
      <UserContext.Provider value={{ current: user, login, logout, register }}>
        {props.children}
      </UserContext.Provider>
    );
  };
  