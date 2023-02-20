import actionTypes from '../actionTypes';

export const makeNewMove = ({newPosition}) => {
    return {
        type: actionTypes.NEW_MOVE,
        payload: {newPosition},
    }
}
