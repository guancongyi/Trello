import axios from 'axios';
import TMessage from "@/components/TMessage/TMessage.js";

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH;
axios.interceptors.request.use(configs =>{
    try {
        let data = JSON.parse(localStorage.getItem('user'))
        if (data.authorization){
            configs.headers.common.authorization = data.authorization;
        }
    } catch (error) {}
    return configs
})
axios.interceptors.response.use(response=>{
    return response;
}, error=>{
    let {message, errorDetails} = error.response.data;
    if (errorDetails){
        message+=' : ' + errorDetails
    }
    TMessage.error(message);
    throw error;
})

// register
export const register = data =>{
    return axios({
        method:'post',
        url:'/user/register',
        data
    })
}

// login
export const login = data =>{
    return axios({
        method:'post',
        url:'/user/login',
        data
    })
}


// Board
// get all boards
export const getBoards = () => {
    return axios({
        url:'/board'
    })
}

// get on board
export const getBoard = (id) => {
    return axios({
        url:'/board/'+id
    })
}

// post new board
export const postBoard = data=>{
    return axios({
        method:'post',
        url:'/board',
        data
    })
}

// List
// get all lists from a board
export const getLists = boardId=>{
    return axios({
        url:'/list',
        params:{
            boardId
        }
    })
}

// add a new list
export const postList = data =>{
    return axios({
        method:'post',
        url:'/list',
        data
    })
}

// update a list
export const putList = data => {
    console.log(data)
    return axios({
        method:'put',
        url:'/list/'+data.id,
        data:{
            boardId:data.boardId,
            name:data.name,
            order:data.order
        }
    })
}