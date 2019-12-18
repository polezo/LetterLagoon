import React from 'react';
import GameContainer from './gameContainer'
import {StatusBar} from 'react-native'
import {connect} from 'react-redux'
import VowelGameContainer from './vowelGameContainer'
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av'
import paths from '../assets/wordsJson'

const Fragment=React.Fragment

let _this = null

class GamesContainer extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <MaterialIcons name="home" size={32} color="white" onPress={ () => { navigation.goBack() } } style={{left:10}}  />,
    headerRight: <MaterialIcons name="live-help" size={32} color="white" onPress={()=> _this.saySomething() } style={{right:10}}  />,
    headerStyle: {
        backgroundColor: '#228b22',
      },
      headerTintColor: 'white',
  });

async saySomething() {
  console.log("sup")
  const source3 = paths()[`${this.props.selectedWord}`];
  const initialStatus = {
    //        Play by default
              shouldPlay: true,
    //        Control the speed
              rate: 1.0,
    //        Correct the pitch
              shouldCorrectPitch: true,
    //        Control the Volume
              volume: 1.0,
    //        mute the Audio
              isMuted: false
         };
  
         const { sound, status } = await Audio.Sound.createAsync(
             source3,
             initialStatus
        );
  
    //  Save the response of sound in playbackInstance
          
        this.wordSound = sound;
        
  
    //  Play the Music
   
        sound.playAsync();
      setTimeout(()=>this.unload(sound),2500)
  
}

unload = (sound) => {
  sound.unloadAsync()
}


componentDidMount = () => {
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid:          Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
});
  _this = this
}

render() { return <Fragment><StatusBar barStyle="light-content" backgroundColor="red" />
{this.props.level < 7 ? <GameContainer/> : <VowelGameContainer/>}</Fragment>}
}

mapStateToProps = (state) => {
    return {level: state.level,
            selectedWord: state.selectedWord}
}

export default connect(mapStateToProps)(GamesContainer)


// 