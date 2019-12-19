import React from 'react';
import GameContainer from './gameContainer'
import {StatusBar,View,Text} from 'react-native'
import {connect} from 'react-redux'
import VowelGameContainer from './vowelGameContainer'
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av'
import paths from '../assets/wordsJson'
import YouWin from './youWinContainer'
import LottieView from "lottie-react-native";



const Fragment=React.Fragment

let _this = null

class GamesContainer extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title:"LetterLagoon",
    headerLeft: <MaterialIcons name="home" size={32} color="white" onPress={ () => { navigation.goBack() } } style={{left:10}}  />,
    headerRight: <MaterialIcons name="live-help" size={32} color="white" onPress={()=> _this.saySomething() } style={{right:10}}  />,
    headerStyle: {
        backgroundColor: '#228b22',
      },
      headerTintColor: 'white',
  });

async saySomething() {
  let source3
  
  this.props.level < 6 ? source3 = require('../assets/Narration/9-SpellTheWord.mp3') : source3 = require('../assets/Narration/FindTheVowelsFor.mp3')
   
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
  
          
        this.narratorSound = sound;
        
    sound.setOnPlaybackStatusUpdate((playbackstatus)=>this.spellTheWordDone(playbackstatus));
        sound.playAsync();
      setTimeout(()=>this.unload(sound),2500)
  
}

async spellTheWordDone(playbackstatus) {
  if (playbackstatus.didJustFinish) {
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

componentWillUnmount = () => {
  if (this.wordSound) {
    this.wordSound.unloadAsync()
  }

  if (this.narratorSound) {
    this.narratorSound.unloadAsync()
  }
}

celebrate = () => {
  
  this.animation.play()
  this.animation2.play()
}

levelHelper = () => {
  let comp
  if (this.props.level < 6) {
    comp = <GameContainer style={{}} celebrate={this.celebrate}/>
  } else if (this.props.level < 11) {
    comp = <VowelGameContainer celebrate={this.celebrate}/>
  } else {
    comp = <YouWin navigation={this.props.navigation}/>
  }
    
  return comp
}

render() { return <Fragment><StatusBar barStyle="light-content" backgroundColor="red" /><View style={{
  position:"absolute",
top:200,right:0,}} ref={animationDiv=>this.animationDiv=animationDiv}>

<LottieView loop={false}
  ref={animation => {
    this.animation = animation;
  }}
  style={{
    
    width:200,
    height: 250,
    right:40,
    bottom:50
    // backgroundColor:"pink"
  }}
  source={require('../assets/animations/greenFirework.json')}
  // OR find more Lottie files @ https://lottiefiles.com/featured
  // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
/>

<LottieView loop={false}
  ref={animation => {
    this.animation2 = animation;
  }}
  style={{
    
    width:200,
    height: 250,
    right:130,
    bottom:130
    // backgroundColor:"pink"
  }}
  source={require('../assets/animations/sparkles.json')}
 
/>

</View>
{this.levelHelper()}</Fragment>}
}

mapStateToProps = (state) => {
    return {level: state.level,
            selectedWord: state.selectedWord}
}

export default connect(mapStateToProps)(GamesContainer)


// 