import React from 'react'
import {getProviders,signIn} from 'next-auth/react'

const Login = ({providers}) => {
  return (
    <div className='bg-black min-h-screen w-full flex flex-col items-center justify-center'>
        <img src="https://i.imgur.com/fPuEa9V.png" className="w-52 mb-5" alt="Spotify Logo" />
        {Object.values(providers).map(item=>(
            <div key={item.name}>
                <button  className='bg-[#18D860] text-white p-5 rounded-lg text-xl font-semibold' onClick={()=>signIn(item.id,{callbackUrl:"/"})}>Login with {item.name}</button>
            </div>
        ))}
    </div>
  )
}


export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();
    return{
        props:{
            providers,
        }
    }
}