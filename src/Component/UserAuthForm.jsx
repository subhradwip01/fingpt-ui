import React,{useState,useContext} from "react"

import { cn } from "../libs/utils"
import { Icons } from "../UI/Icons"
import { Button } from "../UI/Button"
import { Input } from "../UI/Input"
import { Label } from "../UI/Label"

import { AuthContext } from "../context/AuthContextProvider"
import { signin,signup } from "../api-service/user-service"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
export function UserAuthForm({ className, ...props }) {
  const [userValue,setUserValue] = useState({
    username:"",
    password:"",
    email:"",
  })
  const [isLoading, setIsLoading] = useState(false)
  const authContext = useContext(AuthContext)
  const naviagate = useNavigate();
  const onInput = (e) =>{
    setUserValue((prevData)=>({
      ...prevData,
      [e.target.id]:e.target.value
    }))
  }
  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try{
      let res;
      if(props.isSignUp){
        res = await signup(userValue);
      }else{
        res = await signin(userValue);
      }
      console.log(res);
      authContext.setLoggedInUser(res.data)
      console.log(res.data.data);
      toast.success(`Succesfully! ${props.isSignUp ? "Signed up":"Logged In"}`)
      naviagate("/")
    }catch(e){
      // console.log(e.response.data.message)
      toast.error(`Unable to ${props.isSignUp ? "Signed up":"Logged In"}`);
    }finally{
      setIsLoading(false);
    }
    
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
         {props.isSignUp && <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Mukesh Ambani"
              type="name"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              onChange={onInput}
            />
          </div>}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={onInput}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="hans@#123"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={onInput}
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      {/* <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button> */}
    </div>
  )
}