import React from 'react';
import { Audio } from 'expo-av'
import {connect} from 'react-redux'
import {StyleSheet,View,Text,Button} from 'react-native'
import LottieView from 'lottie-react-native';


class YouWin extends React.Component {
    
    componentDidMount = () => {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid:          Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false,
      });
      this.animation.play()
      this._loadNewPlaybackInstance(true);

      }
    
    async _loadNewPlaybackInstance(playing) {
        if (this.narratorSound != null) {
            await this.narratorSound.unloadAsync();
            this.narratorSound.setOnPlaybackStatusUpdate(null);
            this.narratorSound = null;
         }
         const source = require('../assets/Narration/LetterLagoonBackToNormal.mp3');
  
         const initialStatus = {
              shouldPlay: false,
              rate: 1.0,
              shouldCorrectPitch: true,
              volume: 1.0,
              isMuted: false
         };
  
         const { sound, status } = await Audio.Sound.createAsync(
             source,
             initialStatus
        );
  
        this.narratorSound = sound;
      
        this.narratorSound.playAsync();
         
    }
    
    endGame(){
       
        this.props.navigation.goBack()
    }
    
    componentWillUnmount () {
        this.props.resetLevel()
        this.props.nukeTheStore()
    }

    render() {
       return  <View style={styles.container}>
           <LottieView loop={false}
  ref={animation => {
    this.animation = animation;
  }}
  style={{
    
    width:200,
    height: 250,
    
  }}
  source={require('../assets/animations/trophy.json')}
 
/>
           <Text style={styles.text}>Great Job!</Text>
       <Button
       title="Return Home"
       onPress={() => this.endGame()}
     />
   </View>
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      bottom:120
   
    },
    text: {
      fontFamily:"AmericanTypewriter", 
      textAlign:'center',
      fontSize:80,
     
    },
    testColor: {
      backgroundColor:'green'
    },
    testColorHit:{
      backgroundColor:'red'
    },


});

selectDispatch = (dispatch) => {
    return {resetLevel:()=>dispatch({type:"RESET_LEVEL_TO_ONE"}),
            nukeTheStore:()=>dispatch({type:"NUKE_THE_STORE"})}
}

export default connect(null,selectDispatch)(YouWin)