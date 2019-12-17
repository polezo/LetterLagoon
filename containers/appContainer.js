import React from 'react';
import GameContainer from './gameContainer'
import {View} from 'react-native'
import {connect} from 'react-redux'
import VowelGameContainer from './vowelGameContainer'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'




class GamesContainer extends React.Component {


render() { return this.props.level < 7 ? <GameContainer/> : <VowelGameContainer/>}
}

mapDispatchToProps = (state) => {
    return {level: state.level}
}

export default connect(mapDispatchToProps)(GamesContainer)


// 