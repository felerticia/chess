export const getRookMoves = ({position,piece,rank,file}) => {
    const moves = []
    const us = piece[0]
    const enemy = us === 'w' ? 'b' : 'w'

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

export const getKnightMoves = ({position,rank,file}) => {
    const moves = []
    const enemy = position[rank][file].startsWith('w') ? 'b' : 'w'

    const candidates = [
        [-2,-1],
        [-2,1],
        [-1,-2],
        [-1,2],
        [1,-2],
        [1,2],
        [2,-1],
        [2,1],
    ]
    candidates.forEach(c => {
        const cell = position?.[rank+c[0]]?.[file+c[1]]
        if(cell !== undefined && (cell.startsWith(enemy) || cell === '')){
            moves.push ([rank+c[0],file+c[1]])
        }
    })
    return moves
}