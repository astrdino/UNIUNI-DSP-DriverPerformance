
import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'

export const SPBS_SignInForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [currentSessionUser, setCurrentSessionUser] = useState('')

    const getDBsession = async ()=>{

        try {

            const {data:session,error:AuthError} = await supabase.auth.getSession()
            
            if(AuthError){
                throw AuthError
            }

            console.log(session)


            if(session.session != null){

                console.log(session.session.user.email)

                setCurrentSessionUser(session.session.user.email)

            }
            


        } catch (AuthError) {

            alert(AuthError.message)
            
        }

    }



    useEffect(()=>{

        // const getDBsession = async ()=>{

        //     try {

        //         const {data:session,error:AuthError} = await supabase.auth.getSession()
                
        //         if(AuthError){
        //             throw AuthError
        //         }

        //         console.log(session)


        //         if(session.session != null){

        //             console.log(session.session.user.email)

        //             setCurrentSessionUser(session.session.user.email)

        //         }
                
    
    
        //     } catch (AuthError) {

        //         alert(AuthError.message)
                
        //     }

        // }

        // getDBsession()

     

        


    },[])

    const handleLogin = async (e) => {
        e.preventDefault()
        const { user, session, error } = await supabase.auth.signIn({
            email,
            password,
        })
        if (error) console.error('Error logging in:', error.message)
        else console.log('Logged in:', user, session)
    }


    const handleAuth_Login = async () =>{

        try {

            await supabase.auth.signInWithPassword({
                email:"dinojobs96@gmail.com",
                password: "123456"
            })

            getDBsession()

            


            
        } catch (error) {

            alert(error.message)
            
        }



        

    }


    const handleAuth_SignOut = async () =>{

        await supabase.auth.signOut()

        setCurrentSessionUser("Inactive")


       

    



        
    }



    return (

        <>

        <h2>Authentication For Data</h2>
        {currentSessionUser ? <h3>Session Users: {currentSessionUser}</h3> : <div></div>}
        
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Log In</button>
        </form>

        <button onClick={handleAuth_Login}>Authentication with Github</button>
        <button onClick={handleAuth_SignOut}>Log Out Current Session</button>
        </>
    )
}

export default SPBS_SignInForm
