import * as api from '../../api'


export default {
    namespaced:true,
    state:{
        inited:false,
        boards:null
    },
    mutations:{
        updateBoards:(state, data) =>{
            state.boards = data;
            state.inited = true;
        },
        addBoard: (state, data)=>{
            if (state.boards === null){
                state.boards = []
            }
            state.boards = [...state.boards, data]
        }
    },
    getters:{
        getBoard:({boards}) => id => Array.isArray(boards)? boards.find(board=>board.id == id):null
    },
    actions:{
        getBoards:async({commit})=>{
            try {
                let rs = await api.getBoards();
                console.log(rs);
                commit('updateBoards', rs.data);
                return rs
            } catch (error) {
                console.log(error)
                // throw error
            }
        },
        getBoard:async({commit}, id)=>{
            try {
                let rs = await api.getBoard(id);
                console.log(rs);
                commit('addBoard', rs.data);
                return rs
            } catch (error) {
                console.log(error)
                // throw error
            }
        },
        postBoard: async ({commit}, data)=>{
            try {
                let rs = await api.postBoard(data);
                commit('addBoard', rs.data)
                return rs;
            } catch (error) {
                throw error
            }
        }
    }
}