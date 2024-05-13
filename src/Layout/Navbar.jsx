import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Icons } from '../UI/Icons';
import {Avatar} from '../UI/Avatar';
import { AuthContext } from '../context/AuthContextProvider';
export const Navbar = () => {
    const authContext = useContext(AuthContext);
    console.log();
    const navabrItem = [
        {
          name: 'Contact us',
          link: '',
        },
        {
          name: 'FAQs',
          link: '',
        },
        {
          name: 'Feedback',
          link: '',
        },
      ];
  return (
    <nav className='flex w-full justify-between items-center px-5 py-3 border border-b-[1px] border-b-slate'>
     
        {/* Logo */}
        <Link to={"/"} className="flex items-center">
          <Icons.reading className="mr-2 h-4 w-4"/> 
          <p className="font-bold">
            Fin GPT
          </p>
        </Link>
        <div className="flex items-center gap-5">
          {navabrItem.map(item=>(
            <p>{item.name}</p>
          ))}
          <Avatar name={authContext.user.user.name.slice(0,1)}/>
        </div>
    </nav>
  )
}
