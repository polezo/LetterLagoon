import React from 'react';
import { StyleSheet, View } from 'react-native';
import uuid from 'react-uuid'
import { connect } from 'react-redux'
import WompContainer from "./wompContainer"
import sample from "lodash/sample"
import { Audio } from 'expo-av'

class GameContainer extends React.Component {

  constructor(props) {
    super(props);
    this.refsArray = this.props.selectedWord.split("").map(()=>React.createRef())
    
    this.letsStart = null;
    
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
//  This function will be called
  this._loadNewPlaybackInstance(true);
  
  }

  shouldComponentUpdate(nextProps,nextState) {
    if (this.props.level != nextProps.level) {
      
        return true
      }
      
    return false
    }

    async _loadNewPlaybackInstance(playing) {
      if (this.narratorSound != null) {
          await this.narratorSound.unloadAsync();
          this.narratorSound.setOnPlaybackStatusUpdate(null);
          this.narratorSound = null;
       }

       const source = require('../assets/Narration/0-Welcome.mp3');

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

  _onPlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.didJustFinish) {
      const source2 = require('../assets/Narration/2S-LetsStart.mp3');


      const initialStatus2 = {
       //        Play by default
                 shouldPlay: true,
  
            };

     const { sound2, status2 } =  Audio.Sound.createAsync(
       source2,
       initialStatus2
  );

    }
  }
    
  componentWillUnmount() {
    this.narratorSound.unloadAsync();
//  Check Your Console To verify that the above line is working
    console.log('unmount');
}

    wordRenderHelper = () => {
      if (this.props.corralledLetters.length === this.props.selectedWord.length) {
      let newWord = sample(this.props.allWords)
      this.props.updateSelectedWord(newWord)
      this.props.nukeTheStore()
      return newWord
    }
     
      return this.props.selectedWord
    }
    
    render() {
      let x = Math.random() < 0.5 ? -1 : 1;
      let rotationSkipper = Math.random() < 0.5 ? 0 : 1;

      return (<View style={styles.container} >
      {this.wordRenderHelper().split("").map((letter,i)=>{
        let id=uuid()
        let letterId=uuid()
      return <View key={uuid()} ><WompContainer rotationSkipper={rotationSkipper} i={i}key={id} id={id} letterId={letterId} x={x} letter={letter}/></View>})}
         
        </View>
      );
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
  
  

const mapDispatchToProps = (dispatch) =>{
  return {updateSelectedWord:(payload)=>dispatch({type:"UPDATE_SELECTED_WORD",payload}),
          nukeTheStore:()=>dispatch({type:"NUKE_THE_STORE"})}
}
const select = (state) => {
   return {selectedWord: state.selectedWord,
          corralledLetters: state.corralledLetters,
          allWords: state.allWords,
          wordSpelled:(state.letterHitBoxes.length == 0 ? true : false),
          level:state.level
        }
}

export default connect(select,mapDispatchToProps)(GameContainer);