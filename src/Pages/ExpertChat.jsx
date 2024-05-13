import React, { useEffect, useState } from 'react'
import BaseLayout from '../Layout/BaseLayout'
import { Button, buttonVariants } from '../UI/Button'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { Input } from '../UI/Input'
import { Chat } from '../Component/ChatWindow/Chat'
import { SendHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'
import {resolveQuery} from "../api-service/docs-service";
// import { chatWithAgent } from '../api-service/chatService'
const ExpertChat = () => {
  const {chatId} = useParams();
  const [command, setCommand] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [messages,setMessges] = useState([]);
  // const [chatData, setChatData] = useState([
  //   {
  //     message: "What is thermodynamics obased on the DOC?",
  //     sender: "USER"
  //   },
  //   {
  //     message:"Thermodynamics is the study of the relations between heat, work, temperature, and energy. The laws of thermodynamics describe how the energy in a system changes and whether the system can perform useful work on its surroundings.",
  //     sender:"Expert"
  //   }
  // ])

  // useEffect(()=>{
  //   const getAllMessges = async () =>{
  //     try {
  //       const res = await getMesseges(chatId);
  //       console.log(res.data);
  //       const m = res.data.messages.map(item=>({role:item.role,content:item.content}))
  //       setMessges(m);
  //     } catch (error) {
  //       console.log(error)
  //       toast.error('Unable to fetch messages');
  //     }
  //   }
  //   getAllMessges();
  // },[])

  const onCommandType = (e) => {
    setCommand(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if(command==="") return;
    setIsLoading(true);
    try{
      const updatedMessegs = [...messages,{role:"user",content:command}];
      const res = await resolveQuery({query:command});

      console.log(res);
      const finalMesseges = [...updatedMessegs,{role:"system",content:res.data.message}];
      setMessges(finalMesseges);
      setCommand("");
    }catch(e){
      console.log(e);
      toast.error("We are facing some error please try again")
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <BaseLayout>
      <div className='p-4 h-screen flex flex-col gap-2'>
        <div>
          <Link to="/talk-to-expert" className={buttonVariants({ variant: 'outline' })}><ChevronLeft size={20} />Back</Link>
        </div>
        {/* Chat Window */}
        <Chat chats={messages}/>
        {/* Chat Input */}
        <form onSubmit={onSubmit} className='flex gap-1'>
        <Input readOnly={isLoading} name="command" onChange={onCommandType} value={command} placeHolder="Eg. Make the important notes from the Doc"/>
        <Button variant='outline' onClick={onSubmit} disabled={isLoading}>
        {!isLoading ? <SendHorizontal /> : <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
        </Button>
        </form>
        
      </div>
    </BaseLayout>
  )
}

export default ExpertChat