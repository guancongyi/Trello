import * as api from '@/api'

export default {
    namespaced: true,
    state:{
        inited:false,
        lists:[]
    },
    mutations:{
        updateLists:(state, datas) => {
            state.lists = [...state.lists, ...datas];
        }
    },
    getters:{
        getLists:({lists})=>boardId=>lists.filter(list=>list.boardId == boardId)
    },
    actions:{
        getLists:async ({commit}, boardId) => {
            try {
                let rs = await api.getLists(boardId);
                commit('updateLists', rs.data);
                return rs;
            } catch (error) {
                throw error;
            }
        }
    }
}