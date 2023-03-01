import actionTypes from '../actionTypes';

export const updateCastling = (direction) => {
    return {
        type: actionTypes.CAN_CASTLE,
        payload: direction,
    }
}
