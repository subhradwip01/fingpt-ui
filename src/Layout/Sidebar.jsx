import React, { useContext, useState } from 'react'
import { Icons } from '../UI/Icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider';

export const Sidebar = () => {
   const [isHover,setIsHover] = useState(false);
   const location = useLocation();
   const authCtx = useContext(AuthContext);
   const navigate = useNavigate();
  const menuItem = [
    {
        name:"Upload Docs",
        to:"/",
        IconComp:Icons.analytic
    },
  ]
  const logout = () =>{
    authCtx.logout();
    navigate("/");

  }
  return (
    <aside className='flex flex-col px-3 gap-3 py-3 border border-r-[1px] border-r-slate h-screen justify-between '>
        <div className='space-y-2'>
        {menuItem.map(({name,to,IconComp})=>(
            <Link  key={name} id={name} to={to} className={`group flex justify-start items-center px-2 py-2 ${location.pathname===to ? ' bg-black text-white rounded-md ' : ' hover:bg-black hover:text-white hover:rounded-md '}`} onMouseEnter={(e)=>setIsHover(e.target.id)} onMouseLeave={()=>setIsHover(null)}>
                {<IconComp  className="mr-2 h-4 w-4" fill={(location.pathname===to || isHover==name) ? "white" : "black"}/>}
                <p>{name}</p>
            </Link>
        ))}
        </div>
        <button className='px-2 py-3 border border-[#FF3333] border-[2px] text-[#FF3333] mb-12 rounded-md' onClick={logout}>Logout</button>
    </aside>
  )
}

export default Sidebar