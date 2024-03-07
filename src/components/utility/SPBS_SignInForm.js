
import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'

export const SPBS_SignInForm = ({spbsLoggedIn, setspbsLoggedIn}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [currentSessionUser, setCurrentSessionUser] = useState('')

    // const [spbsLoggedIn,setspbsLoggedIn] =useState(false)

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

                setspbsLoggedIn(true)

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
        // console.log(email,password)

        try {

            const{prc, error} = await supabase.auth.signInWithPassword({
                email:email,
                password:password
            })


            //Clear values in the form
            setEmail('')
            setPassword('')

            if(error){
                throw error
            }

            getDBsession()

            

            


            
        } catch (error) {

            alert(error.message)
            
        }

       

        // const { user, session, error } = await supabase.auth.signIn({
        //     email,
        //     password,
        // })
        // if (error) console.error('Error logging in:', error.message)
        // else console.log('Logged in:', user, session)
    }


    const handleAuth_Login = async () =>{

        try {

            await supabase.auth.signInWithPassword({
                email:"dinojobs96@gmail.com",
                password: "123456"
            })

            getDBsession()

            setspbsLoggedIn(true)

            


            
        } catch (error) {

            alert(error.message)
            
        }



        

    }


    const handleAuth_SignOut = async () =>{

        await supabase.auth.signOut()

        setCurrentSessionUser("Inactive")

        setspbsLoggedIn(false)


       

    



        
    }


    // const handlePwdIptChange = (event)=>{
    //     event.preventDefault
    //     console.log(this.)

    // }





    return (

        <>

        
       

        
        

        {spbsLoggedIn ? <div><h3>Session Users: {currentSessionUser}</h3></div> :
            
            <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Log In</button>
            <button onClick={handleAuth_Login}>Authentication For Dev</button>
            </form>
        }
        
        
        { spbsLoggedIn ? <button onClick={handleAuth_SignOut}>Log Out Current Session</button> : <div></div> }
        
        </>
    )
}

export default SPBS_SignInForm
