import { Status } from "../constants";
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
        
        default : 
            return state
    }
};
