import './Pieces.css'
import Piece from './Piece'
import { useRef  } from 'react'
import { useAppContext }from '../../contexts/Context'

import { copyPosition} from '../../helper'
import { makeNewMove, clearCandidates } from '../../reducer/actions/move'
const Pieces = () => {

    const { appState , dispatch } = useAppContext();
    const currentPosition = appState.position[appState.position.length-1]

    const ref = useRef()

    const calculateCoords = e => {
        const {top,left,width} = ref.current.getBoundingClientRect()
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size) 
        const x = 7 - Math.floor((e.clientY - top) / size)

        return {x,y}
    }


    const onDrop = e => {
        e.preventDefault()
        
        const newPosition = copyPosition (currentPosition)
        const {x,y} = calculateCoords(e)
        
        const [p,rank,file] = e.dataTransfer.getData("text").split(',')

        if(appState.candidateMoves.find(m => m[0] === x && m[1] === y)){
            // EnPassant, looks like capturing an empty cell
            // Detect and delete the pawn to be removed
            if (p.endsWith('p') && !newPosition[x][y] && x !== rank && y !== file) 
                newPosition[rank][y] = ''

            newPosition[Number(rank)][Number(file)] = ''
            newPosition[x][y] = p

            dispatch(makeNewMove({newPosition}))
        }
        dispatch(clearCandidates())

    }
    
    const onDragOver = e => {e.preventDefault()}

    return <div 
        className='pieces' 
        ref={ref} 
        onDrop={onDrop} 
        onDragOver={onDragOver} > 
        {currentPosition.map((r,rank) => 
            r.map((f,file) => 
                currentPosition[rank][file]
                ?   <Piece 
                        key={rank+'-'+file} 
                        rank = {rank}
                        file = {file}
                        piece = {currentPosition[rank][file]}
                    />
                :   null
            )   
        )}
    </div>
}

export default Pieces