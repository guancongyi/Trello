import * as api from '../../api'
export default {
    namespaced:true,
    state:{
        cards:[]
    },
    
    getters:{
        getCards:({cards}) => boardListId => cards.filter(card => card.boardListId === boardListId)
    },
    mutations:{
        updateCards: (state, datas)=>{
            state.cards = [...state.cards, ...datas];
        }
    },
    actions:{
        getCards:async({commit}, boardListId)=>{
            try {
                let rs = await api.getCards(boardListId);
                commit('updateCards', rs.data);
                return rs
            } catch (error) {
                console.log(error)
                // throw error
            }
        },
        
    }
}