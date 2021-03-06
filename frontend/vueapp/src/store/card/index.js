import * as api from '../../api'
export default {
    namespaced:true,
    state:{
        cards:[]
    },
    
    getters:{
        getCards:({cards}) => boardListId => cards.filter(card => card.boardListId === boardListId),
        getCard:({cards})=>cardId=>cards.find(card => card.id == cardId)
    },
    mutations:{
        updateCards: (state, datas)=>{
            state.cards = [...state.cards, ...datas];
        },
        addCard:(state, data)=>{
            state.cards = [...state.cards, data]
        },
        updateCard: (state, data)=>{
            state.cards = state.cards.map(card => {
                if (card.id === data.id){
                    return {...card, ...data};
                }
                return card;
            });
        },
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
        postCard: async ({commit}, data)=>{
            try {
                let rs = await api.postCard(data);
                commit('addCard', rs.data)
                return rs;
            } catch (error) {
                throw error
            }
        },
        editCard: async({commit}, data) => {
            try {
                let rs = await api.putCard(data);
                commit('updateCard', data)
                return rs;
            } catch (error) {
                throw error
            }
        }
        
    }
}