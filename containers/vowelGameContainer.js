import React from 'react';
import { StyleSheet, View } from 'react-native';
import uuid from 'react-uuid'
import { connect } from 'react-redux'
import VowelWomper from "./vowelWomper"
import sample from "lodash/sample"
import Draggable from './draggable'
import { Audio } from 'expo-av'
import paths from '../assets/wordsJson'

class VowelGameContainer extends React.Component {

  constructor(props) {
    super(props);
    this.refsArray = this.props.selectedWord.split("").map(()=>React.createRef())
    this.narratorSound = null
    this.state={letterDragging:false}
  }

  toggleLetterDragging = () => {
    this.setState({letterDragging:!this.state.letterDragging})
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
    this._loadWomperSound();
  }

  vowelTest = (s) => {
    return (/^[aeiou]$/i).test(s);
  }

  async _loadWomperSound() {
   
    const source2 = require('../assets/Narration/WomperStompLaugh2.mp3');
    const initialStatus2 = {
      //        Play by default
                shouldPlay: false,
 
           };

    const { sound, status } = await Audio.Sound.createAsync(
      source2,
      initialStatus2
     );

     this.womperSounds = sound
     this.womperSounds.setOnPlaybackStatusUpdate(this._womperSoundDone);
     this.womperSounds.playAsync()
     setTimeout(()=>this.unload(this.womperSounds),4000)
   }
    

   unload = (sound) => {
    sound.unloadAsync()
  }

  shouldComponentUpdate(nextProps,nextState) {
    if (this.props.level != nextProps.level) {
      
        return true
      }
      
    return false
    }
  
    componentDidUpdate = () => {
    this._loadWomperSound()
  
    }

    _womperSoundDone = (playbackStatus) => {
      if (playbackStatus.didJustFinish) {
        this.playFindTheVowelSound()
        }
    }

    async playFindTheVowelSound() {
      const source3 = require('../assets/Narration/FindTheVowelsFor.mp3');
      const initialStatus2 = {
   
                  shouldPlay: false,
             };
            
      const { sound }  = await Audio.Sound.createAsync(
        source3,
        initialStatus2
       );
       sound.playAsync()
       sound.setOnPlaybackStatusUpdate(this._findTheVowelDone);
       setTimeout(()=>this.unload(sound),3000)
    }

    _findTheVowelDone = playbackStatus => {
      if (playbackStatus.didJustFinish) {
      this.playTheWord()
      }
    }
  
    async playTheWord() {
      const source3 = paths()[`${this.props.selectedWord}`];
      const initialStatus2 = {
   
                  shouldPlay: false,
             };
            
      const { sound }  = await Audio.Sound.createAsync(
        source3,
        initialStatus2
       );
       sound.playAsync()
      
       setTimeout(()=>this.unload(sound),3000)
    }
 
    wordRenderHelper = () => {
      if (this.props.wordSpelled || (this.props.level > 5)) {
      let newWord = sample(this.props.allWords)
      this.props.updateSelectedWord(newWord)
      this.props.nukeTheStore()
      return newWord
    }
     
      return this.props.selectedWord
    }
    
    getRandomPosition = (arg) => {
        
        let num1 = 
        Math.floor(Math.random() * 205)
        let num2 = 
        Math.floor(Math.random() * 70) 
        if (this.props.selectedWord.length <=5) {
            num2 = num2+60
        }
   
           
        switch (arg) {
        case "one":
            num1 = num1+125
            num2 = num2+30
        return { top: (num1), right: (num2) }
        case "two": 
            num1 = num1+125
            num2 = num2+30
        return { top: (num1), left: (num2)}
        case "three":
            num1 = num1+145
            num2 = num2+50
        return { bottom: (num1), left: (num2)}
        default:
            num1 = num1+145
            num2 = num2+50
        return {bottom:(num1), right:(num2)} }
    }

    sampleHelper = (word) => {
       let wordVowels = word.split("").filter(this.vowelTest)
       return ["A","E","I","O","U"].filter(vowel=>!wordVowels.includes(vowel))
    }

    componentWillUnmount(){
        if (this.narratorSound) {
        this.narratorSound.unloadAsync();
    }}

    render() {
        let word = this.wordRenderHelper()

      return (<View style={styles.container} >
          
        <View style={[styles.vowel,this.getRandomPosition("one")]}>
           <Draggable toggleLetterDragging={this.toggleLetterDragging} letter={sample(this.sampleHelper(word))} id={uuid()} />
        </View>
        <View style={[styles.vowel,this.getRandomPosition("two")]}>
           <Draggable toggleLetterDragging={this.toggleLetterDragging}  letter={sample(this.sampleHelper(word))} id={uuid()} />
        </View>
        <View style={[styles.vowel,this.getRandomPosition("three")]}>
           <Draggable toggleLetterDragging={this.toggleLetterDragging}  letter={sample(this.sampleHelper(word))} id={uuid()} />
        </View>
        <View style={[styles.vowel,this.getRandomPosition("four")]}>
           <Draggable toggleLetterDragging={this.toggleLetterDragging}  letter={sample(this.sampleHelper(word))} id={uuid()} />
        </View>

      {word.split("").map((letter)=>{
        let id=uuid()
        let letterId=uuid()
      return <View key={uuid()} >{<VowelWomper toggleLetterDragging={this.toggleLetterDragging}  letterDragging={this.state.letterDragging} celebrate={this.props.celebrate} key={id} id={id} letterId={letterId} letter={letter}/>}</View>})}
         
        </View>
      );
    }
  }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // backgroundColor: '#fff',
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
      vowel:{
          position:"absolute"
      }
  

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

export default connect(select,mapDispatchToProps)(VowelGameContainer);