'use client'
import {signInWithGoogle} from '../utils/auth.utils'




const Header = () => {
  return (
    <div className="w-full flex justify-between h-28 items-center p-8 border-b-2 border-indigo-400 ">
        <a href="/" className="decoration-none hover:text-indigo-800">ROOMS</a>
        <button onClick={signInWithGoogle}>Sign In</button>
    </div>
  )
}

export default Header