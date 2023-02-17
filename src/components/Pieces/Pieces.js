import './Pieces.css'
import Piece from './Piece'
import { useRef , useState } from 'react'
import { copyPosition, createPosition } from '../../helper'

const Pieces = () => {
    const ref = useRef()


    const [state,setState] = useState(createPosition())

    const calculateCoords = e => {
        const {top,left,width} = ref.current.getBoundingClientRect()
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size) 
        const x = 7 - Math.floor((e.clientY - top) / size)

        return {x,y}
    }


    const onDrop = e => {
        e.preventDefault()
        const newPosition = copyPosition (state)
        const {x,y} = calculateCoords(e)

        const [p,rank,file] = e.dataTransfer.getData("text").split(',')
        newPosition[Number(rank)][Number(file)] = ''
        newPosition[x][y] = p
        setState (newPosition)
    }
    
    const onDragOver = e => {e.preventDefault()}

    return <div 
        className='pieces' 
        ref={ref} 
        onDrop={onDrop} 
        onDragOver={onDragOver} > 
        {state.map((r,rank) => 
            r.map((f,file) => 
                state[rank][file]
                ?   <Piece 
                        key={rank+'-'+file} 
                        rank = {rank}
                        file = {file}
                        piece = {state[rank][file]}
                    />
                :   null
            )   
        )}
    </div>
}

export default Pieces