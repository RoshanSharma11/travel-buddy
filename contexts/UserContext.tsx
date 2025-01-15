// 'use client'

// import { ID } from "appwrite";
// import { createContext, useContext, useEffect, useState } from "react";
// import { account } from "../lib/appwrite";
// import { toast } from "@/hooks/use-toast";

// interface UserContextType {
//   current: any | null;
//   loading:boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   register: (email: string, password: string, name:string) => Promise<void>;
// }

// export const UserContext = createContext<UserContextType | null>(null);

// export function UserProvider(props:any) {
//     const [user, setUser] = useState<any>(null);
//     const [loading, setLoading] = useState<boolean>(true);
  
//     async function login(email:string, password:string) {
//       try {
//         const loggedIn = await account.createEmailPasswordSession(email, password);
//         setUser(loggedIn);
//         window.location.replace("/dashboard");
//       } catch(err:any) {
//         // console.log(err);
//         toast({
//           title: err.message
//         })
//       }
//     }
  
//     async function logout() {
//       try {
//         await account.deleteSession("current");
//         setUser(null);
//       } catch(err:any) {
//         console.log(err);
//         toast({
//           title: err.message
//         })
//       }
//     }
  
//     async function register(email:string, password:string, name: string) {
//       try {
//         // Registering user in appwrite
//         await account.create(ID.unique(), email, password, name);
  
//         // Code for registration of user in our database with other details
//         // ...
  
//         // Login after registration
//         await login(email, password);
//       } catch(err:any) {
//         toast({
//           title: err.message
//         })
//       }
//     }
  
//     async function init() {
//       try {
//         const loggedIn = await account.get();
//         setUser(loggedIn);
//         setLoading(false)
//       } catch (err) {
//         setUser(null);
//         setLoading(false)
//       }
//     }
  
//     useEffect(() => {
//       init();
//     }, [user]);
  
//     return (
//       <UserContext.Provider value={{ current: user, loading, login, logout, register }}>
//         {props.children}
//       </UserContext.Provider>
//     );
//   };
  