export const getRookMoves = ({position,piece,rank,file}) => {
    const moves = []
    const enemy = position[rank][file].startsWith('w') ? 'b' : 'w'
    const us = piece[0]

    const direction = [
        [-1,0],
        [1,0],
        [0,-1],
        [0,1],
    ]

    direction.forEach(dir => {
        for (let i = 1; i <= 8; i++) {
            const x = rank+(i*dir[0])
            const y = file+(i*dir[1])
            if(position?.[x]?.[y] === undefined)
                break
            if(position[x][y].startsWith(enemy)){
                moves.push ([x,y])
                break;
            }
            if(position[x][y].startsWith(us)){
                break
            }
            moves.push ([x,y])
        }
    })

    return moves
}
