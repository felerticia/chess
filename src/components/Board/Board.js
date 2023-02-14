import './Board.css'

import Ranks from './bits/Ranks'
import Files from './bits/Files'

const Board = () => {
    const ranks = Array(8).fill().map((x,i) => 8-i)
    const files = Array(8).fill().map((x,i) => i+1)

    const getClassName = (i,j) => {
        let c = 'tile'
        c+= (i+j)%2 === 0 ? ' tile--dark ' : ' tile--light '
        
        return c
    }

    return <div className='board'>

        <Ranks ranks={ranks}/>

        <div className='tiles'>
            {ranks.map((rank,i) => 
                files.map((file,j) => 
                    <div 
                        key={file+''+rank} 
                        className={getClassName(7-i,j)}>
                    </div>
                ))}
        </div>

        <Files files={files}/>

    </div>
    
}

export default Board