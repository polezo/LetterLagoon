import React from 'react';
import rootReducer from './reducers/rootReducer'
import HomeScreen from './containers/homeContainer'
import YouWinScreen from './containers/youWinContainer.js'
import GameContainer from './containers/appContainer'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'



const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const AppNavigator = createStackNavigator(
  {
Home: HomeScreen,
Spelling: GameContainer,
YouWin:YouWinScreen
},
{
initialRouteName:'Home',
})

let Navigation = createAppContainer(AppNavigator)


class App extends React.Component {



render() {return <Provider store={store}><Navigation/></Provider>}
}


export default App