import React from 'react';
import rootReducer from './reducers/rootReducer'
import GameContainer from './containers/gameContainer'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends React.Component {
render() {return <Provider store={store}><GameContainer/></Provider>}
}
export default App