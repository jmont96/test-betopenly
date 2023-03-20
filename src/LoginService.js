import {getApi} from "./api";

export async function getUser(){
    return getApi().get("http://localhost:5000/api/user/12346")
}

export async function getToken(userId){
    return getApi().get(`http://localhost:5000/api/token/${userId}`)
}
