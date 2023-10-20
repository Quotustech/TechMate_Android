import axios from 'axios'
import { Config } from '../config'



export const Login =  (email, password) => {

    return new Promise((resolve, reject) => {
        axios.post(`${Config.BaseUrl}/login`, {
            email,
            password,
        }).then((result) => {
            resolve(result.data)
        })
            .catch((error) => {

                console.log("1the error", error)
                reject(error)
            })
    })
};

export const Chat = (userId,message,user) =>{


    return new Promise((resolve,reject)=>{

        const headers = {
            'Authorization': `Bearer ${user}`, 
          };
        axios.post(`${Config.BaseUrl}/chat`,{
            userId,
            message
        },{headers})
        .then((result)=>{
            resolve(result.data)
        })
        .catch((error)=>{
            reject(error)
        })
    })
};

export const allChat = (userId) =>{
        return new Promise ((resolve,reject)=>{
            axios.get(`${Config.BaseUrl}/allChat/${userId}`)
            .then((result)=>{
                resolve(result.data)
            })
            .catch((error)=>{
                reject(error)
            })
        })
};