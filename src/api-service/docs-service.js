import api from "./config"
export const loadDocs =  (data) => {
    return api.post("/loadDocs",data);
}

export const resolveQuery = (data) => {
    return api.post("/query",data);
}