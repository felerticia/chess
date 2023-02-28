import { copyPosition } from "../helper"

export const movePiece = ({position,piece,rank,file,x,y}) => {

    const newPosition = copyPosition(position)
    newPosition[rank][file] = ''
    newPosition[x][y] = piece
    return newPosition
}

export const movePawn = ({position,piece,rank,file,x,y}) => {
    const newPosition = copyPosition(position)

    // EnPassant, looks like capturing an empty cell
    // Detect and delete the pawn to be removed
    if (!newPosition[x][y] && x !== rank && y !== file) 
        newPosition[rank][y] = ''

    newPosition[rank][file] = ''
    newPosition[x][y] = piece
    return newPosition
}