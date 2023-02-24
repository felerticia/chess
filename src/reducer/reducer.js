import actionTypes from "./actionTypes";
export const reducer = (state, action) => {

    switch (action.type) {
        case actionTypes.NEW_MOVE : {
            let {position,turn} = state 
            position = [
                ...position,
                action.payload.newPosition
            ]
            
            turn = turn === 'w' ? 'b' : 'w'

            return {
                ...state,
                position,
                turn,
            }
        }

        case actionTypes.GENERATE_CANDIDATE_MOVES : {
            const {candidateMoves} = action.payload
            return {
                ...state,
                candidateMoves
            }
        } 

        case actionTypes.CLEAR_CANDIDATE_MOVES : {
            return {
                ...state,
                candidateMoves : []
            }
        }
        
        default : 
            return state
    }
};
