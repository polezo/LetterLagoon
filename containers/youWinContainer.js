import React from 'react';
import { Audio } from 'expo-av'
import {connect} from 'react-redux'
import {StyleSheet,View,Text,Button} from 'react-native'


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
    //        Play by default
              shouldPlay: false,
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
             source,
             initialStatus
        );
  
    //  Save the response of sound in playbackInstance
          
        this.narratorSound = sound;
        
        this.narratorSound.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
  
    //  Play the Music
   
        this.narratorSound.playAsync();
         
    }
    
    endGame(){
        // this.props.resetLevel()
        this.props.navigation.goBack()
    }
    
    componentWillUnmount () {
        this.props.resetLevel()
        this.props.nukeTheStore()
    }

    render() {
       return  <View style={styles.container}><Text style={styles.text}>Great Job!</Text>
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
      flexDirection:'row', 
    },
    text: {
      textAlign:'center',
      fontSize:80,
      // position:"absolute",
      // bottom:80
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