import { Card } from '../../UI/Card'
import React from 'react'
import { UserMessage } from './UserMessage'
import { ExpertMessage } from './ExpertMessage'

export const Chat = ({ chats }) => {
    return (
        <Card className="w-full h-[80vh] overflow-y-auto scroll flex justify-center items-start">
            {chats.length==0? <div className='text-black font-medium'>There is no Chat Till Now</div> : <div
                id="allChats"
                className="w-full transition-all duration-1000 bg-white"
            >
                {
                    chats.map(chat=>(
                        chat.role=="user" ?
                            <UserMessage message={chat.content}/>
                        :   <ExpertMessage message={chat.content}/>
                    ))
                }

            </div>}
        </Card>
    )
}
