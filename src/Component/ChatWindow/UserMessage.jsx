import {Avatar} from '../../UI/Avatar'
import React from 'react'

export const UserMessage = ({message}) => {
    return (
        <div className="flex items-end justify-end w-full lg:px-10 my-3">
            <div className="flex items-start justify-end gap-4">
                <p className="rounded-lg flex items-start font-medium text-[15px] leading-[29px] text-black poppins w-max border p-2">
                    {message}
                </p>
                {/*user Name */}
                <Avatar name={"S"}/>
            </div>
        </div>
    )
}
