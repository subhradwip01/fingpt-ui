import React from 'react'
import { Avatar } from '../../UI/Avatar'
export const ExpertMessage = ({message}) => {
    return (
        <div className="flex items-start justify-start w-full lg:px-10 my-3">
            <div className="flex items-start justify-start gap-4">
                <Avatar name={"E"} />
                <pre className=" rounded-lg flex items-start bg-slate font-medium text-[15px] leading-[29px] text-black poppins w-max border p-3 max-w-[500px]">
                    {message}
                </pre>
                {/*user Name */}
                
            </div>
        </div>
    )
}
