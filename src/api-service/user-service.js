import api from "./config";

export const signin = (data) =>{
    return api.post("/signin",data);
}
export const signup = (data) =>{
    return api.post("/signup",data);
}