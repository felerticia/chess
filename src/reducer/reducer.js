import { Status } from "../constants";
import actionTypes from "./actionTypes";
export const reducer = (state, action) => {

    switch (action.type) {
        case actionTypes.NEW_MOVE: {
            let { position, movesList, turn, castleDirection, castleDirectionHistory } = state
            position = [
                ...position,
                action.payload.newPosition
            ]
            movesList = [
                ...movesList,
                action.payload.newMove
            ]
            turn = turn === 'w' ? 'b' : 'w'
            castleDirectionHistory = [
                ...castleDirectionHistory,
                { ...castleDirection }  // deep enough for this structure
            ]

            return {
                ...state,
                position,
                movesList,
                turn,
                castleDirectionHistory,
            }
        }

        case actionTypes.GENERATE_CANDIDATE_MOVES: {
            const { candidateMoves } = action.payload
            return {
                ...state,
                candidateMoves
            }
        }

        case actionTypes.CLEAR_CANDIDATE_MOVES: {
            return {
                ...state,
                candidateMoves: []
            }
        }

        case actionTypes.PROMOTION_OPEN: {
            return {
                ...state,
                status: Status.promoting,
                promotionSquare: { ...action.payload },
            }
        }

        case actionTypes.PROMOTION_CLOSE: {
            return {
                ...state,
                status: Status.ongoing,
                promotionSquare: null,
            }
        }

        case actionTypes.CAN_CASTLE: {
            let { turn, castleDirection } = state

            const newCastleDirection = {
                ...castleDirection,
                [turn]: action.payload
            }

            return {
                ...state,
                castleDirection: newCastleDirection,
            }
        }

        case actionTypes.STALEMATE: {
            return {
                ...state,
                status: Status.stalemate
            }
        }

        case actionTypes.INSUFFICIENT_MATERIAL: {
            return {
                ...state,
                status: Status.insufficient
            }
        }

        case actionTypes.WIN: {
            return {
                ...state,
                status: action.payload === 'w' ? Status.white : Status.black
            }
        }

        case actionTypes.NEW_GAME: {
            return {
                ...action.payload,
            }
        }

        case actionTypes.TAKE_BACK: {
            let { position, movesList, turn, castleDirection, castleDirectionHistory } = state
            if (position.length > 1) {
                position = position.slice(0, position.length - 1)
                movesList = movesList.slice(0, movesList.length - 1)
                turn = turn === 'w' ? 'b' : 'w'
                castleDirectionHistory = castleDirectionHistory.slice(0, castleDirectionHistory.length - 1);
                castleDirection = castleDirectionHistory[castleDirectionHistory.length - 1];
            }

            return {
                ...state,
                position,
                movesList,
                turn,
                castleDirection,
                castleDirectionHistory,
            }
        }

        default:
            return state
    }
};
