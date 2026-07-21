"use client";
import { UserDetailContext } from '@/context/UserDetailContext';
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { supabase } from '@/services/supabaseClient'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useState } from 'react'

function Provider({ children }) {

    const [user, setUser] = useState();
    useEffect(() => {
        CreateNewUser();
    }, [])

    const CreateNewUser = () => {

        supabase.auth.getUser().then(async ({ data: { user } }) => {
            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq('email', user?.email);

            console.log(Users)

            if (Users?.length == 0) {
                const { data, error } = await supabase.from("Users")
                    .insert([
                        {
                            id: Date.now(),
                            name: user?.user_metadata?.name,
                            email: user?.email,
                            picture: user?.user_metadata?.picture,
                            credits: 10
                        }
                    ])
                    .select();
                console.log(data);
                setUser(data ? data[0] : { email: user?.email, credits: 10 });
                return;
            }
            const currentUser = Users[0];
            if (currentUser && (currentUser.credits === null || currentUser.credits === undefined)) {
                currentUser.credits = 10;
            }
            setUser(currentUser);
        })
    }
    return (
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
        <UserDetailContext.Provider value={{user, setUser}}>
           
        <div>
            {children}
        </div>
        </UserDetailContext.Provider>
        </PayPalScriptProvider>
    )
}

export default Provider

export const useUser=()=>{
    const context=useContext(UserDetailContext);
    return context;
}
