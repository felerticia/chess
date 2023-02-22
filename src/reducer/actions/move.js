import actionTypes from '../actionTypes';

export const makeNewMove = ({newPosition}) => {
    return {
        type: actionTypes.NEW_MOVE,
        payload: {newPosition},
    }
}

export const clearCandidates = () => {
    return {
        type: actionTypes.CLEAR_CANDIDATE_MOVES,
    }
}

export const generateCandidates = ({piece,file,rank,candidateMoves}) => {
    return {
        type: actionTypes.GENERATE_CANDIDATE_MOVES,
        payload : {piece,file,rank,candidateMoves}
    }
}