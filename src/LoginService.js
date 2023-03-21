import {getApi} from "./api";

export async function getUser(){
    return getApi().get("https://test-bo-api.onrender.com/api/user/12346")
}

export async function getToken(userId){
    return getApi().get(`https://test-bo-api.onrender.com/api/token/${userId}`)
}
