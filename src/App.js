import './App.css';
import Board from './components/Board/Board';
import { reducer } from './reducer/reducer'
import { useReducer } from 'react'
import { initGameState } from './constants';
import AppContext from './contexts/Context'

function App() {

    const [appState, dispatch ] = useReducer(reducer,initGameState);

    const providerState = {
        appState,
        dispatch
    }

    return (
        <AppContext.Provider value={providerState} >
            <div className="App">
                <Board/>
            </div>
        </AppContext.Provider>
    ); 
}

export default App;
