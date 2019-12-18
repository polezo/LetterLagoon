import React from 'react';
import GameContainer from './gameContainer'
import {StatusBar} from 'react-native'
import {connect} from 'react-redux'
import VowelGameContainer from './vowelGameContainer'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { MaterialIcons } from '@expo/vector-icons';

const Fragment=React.Fragment


class GamesContainer extends React.Component {


  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MaterialIcons name="home" size={32} color="white" onPress={ () => { navigation.goBack() } } style={{left:10}}  />,
    
    headerStyle: {
        backgroundColor: '#228b22',
      },
      headerTintColor: 'white',
  });

render() { return <Fragment><StatusBar barStyle="light-content" backgroundColor="red" />
{this.props.level < 7 ? <GameContainer/> : <VowelGameContainer/>}</Fragment>}
}

mapDispatchToProps = (state) => {
    return {level: state.level}
}

export default connect(mapDispatchToProps)(GamesContainer)


// 