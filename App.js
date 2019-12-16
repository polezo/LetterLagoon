import React from 'react';
import rootReducer from './reducers/rootReducer'
import AppContainer from './containers/appContainer'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends React.Component {


render() {return <Provider store={store}><AppContainer/></Provider>}
}


export default App