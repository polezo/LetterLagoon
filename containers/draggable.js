import React from 'react';
import { StyleSheet, Text, Animated, PanResponder,View } from 'react-native';
import {connect} from 'react-redux'
import paths from '../assets/lettersJson'
import { Audio } from 'expo-av'
import LottieView from 'lottie-react-native';
import animationPaths from '../assets/lettersAnimations'

class Draggable extends React.Component {
    
    state={letterDragging:false}

    constructor(props) {
        super(props);
        this.marker = React.createRef();
        this.state = {womped:false}
        this.thing = null
       
        this._value= {x:0,y:0}
        this._animatedValue = new Animated.ValueXY()
        
        this._animatedValue.addListener(value=>this._value = value)
        this._panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
          onPanResponderGrant: (e, gestureState) => {
            this._loadNewPlaybackInstance(true)
            this._animatedValue.setOffset({
              x:this._value.x,
              y:this._value.y
            })
            this._animatedValue.setValue({
              x:0,
              y:0
            })
            this.props.toggleLetterDragging()
            this.setState({letterDragging:true})
            if (this.letterAnimation) {
           this.letterAnimation.play(1,60)
            }
          },
          onPanResponderMove: this.letterMoving()
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
          ,
          // onPanResponderTerminationRequest: (evt, gestureState) => true,
          onPanResponderRelease: (e, gestureState) => {
              if (this.letterSound) {
              this.letterSound.stopAsync()
              }
            this.marker.measure((x, y, width, height, pageX, pageY) => {
                this.isDropZone({x, y, width, height, pageX, pageY});
       })
       this.setState({letterDragging:false})
       this.props.toggleLetterDragging()
       if (this.letterAnimation) {
        this.letterAnimation.reset()
         }     
          },
 
        });
      }


      letterMoving = () => {
    
        return Animated.event([
            null, { dx: this._animatedValue.x, dy:this._animatedValue.y}
          ]) 
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
     
    }


    async _loadNewPlaybackInstance(playing) {
        if (this.letterSound != null) {
            await this.letterSound.unloadAsync();
            this.letterSound.setOnPlaybackStatusUpdate(null);
            this.letterSound = null;
         }
  
         const source = paths()[`${this.props.letter}`];
  
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
  
    //  Save the response of sound in playbackInstance
          
        this.letterSound = sound;
        
        this.letterSound.setIsLoopingAsync(true);

        this.letterSound.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
  
      this.letterSound.playAsync()
        
    //  Play the Music
  
    }

      checkGameState = () => {
        if (this.props.wordSpelled) {
          this.props.celebrate()
            setTimeout(()=>this.props.addWordToSpelled(this.props.selectedWord),1500)
            
          }
      }

      isDropZone = (gestureData) => {
          
       
        let hitLetterBox = this.props.letterHitBoxes.find(hitBox => gestureData.pageY > (hitBox.pageY - 70) && gestureData.pageY < (hitBox.pageY + 70) && gestureData.pageX > ((hitBox.pageX) - 33) && gestureData.pageX < ((hitBox.pageX) + 33)) 
        console.log(gestureData,hitLetterBox)
        if (hitLetterBox && hitLetterBox.letterValue == this.props.letter) {
            this.props.addCorralledLetter({hitLetterBox:hitLetterBox.id,hitLetter:this.props.id,actualLetter:this.props.letter})
            this.props.toggleWomped()
            this.props.removeLetterHitbox(hitLetterBox.id)
            this.checkGameState()

        } else {
            Animated.spring(this._animatedValue, {
                toValue: { x: 0, y: 0 },
                friction: 5
              }).start();
        }

    }

    tempLetterHelper = () => {
      const source = animationPaths()[`${this.props.letter}`]
        return  <View style={[{height:90},this.props.targetCorralled && {bottom:90}]} ref={(ref) => { this.marker = ref }}>{!this.props.letterCorralled && <LottieView loop={true}
        ref={animation => {
          this.letterAnimation = animation;
        }}
        style={[{
          
          width:80,
          height: this.state.letterDragging ? 160 : 90,
          right: this.state.letterDragging ? 10 : 0,
          opacity:0.95
          // bottom: (this.props.targetCorralled) ? 30 : 0

          
        }]}
        source={source}
       
    />}</View>
 
    }

    LCidChecker = (id) => {
        if (id){
        if (id === this.props.id) {
        return false}}
        return true
    
    }
    stylesHelper = () => {
        if (this.props.cloneCorralled && !this.props.letterCorralled) {
            return styles.wompedText
        }
    }
      render() { 
        

        const  animatedStyle = {
          transform: this._animatedValue.getTranslateTransform()
        }  
        
      return (<Animated.View style={[styles.view,]} {...this._panResponder.panHandlers} style={[animatedStyle]}>
            {this.tempLetterHelper()}
          </Animated.View>
      );
    }
}


const styles = StyleSheet.create({
 
    view: {
    
      fontSize: 80,
      textAlign:'center'
    },
    text:{
        fontFamily:"AmericanTypewriter", 
        flex:-1,
        fontSize: 80,
        fontWeight:"bold",
        textAlign:'center'
    },
    wompedText: {
        // position:'absolute',
        // top:5000
        
    }
   
  });

const mapDispatchToProps = (dispatch) => {
    return {addCorralledLetter: payload => dispatch({type:"ADD_CORRALLED_LETTER",payload}),
            toggleWomped:() => dispatch({type:"TOGGLE_WOMPED"}),
            removeLetterHitbox:(payload)=>dispatch({type:"REMOVE_LETTER_HITBOX",payload}),
            addWordToSpelled:(payload)=>dispatch({type:"ADD_WORD_TO_SPELLED",payload})
}}

const mapStateToProps = (state,ownProps) => {
    return {letter: ownProps.letter,
            letterHitBoxes: state.letterHitBoxes,
            id:ownProps.id,
            letterCorralled:state.corralledLetters.find(letter=>letter.hitLetter===ownProps.id),
            womped:state.womped,
            cloneCorralled:state.corralledLetters.find(letter=>letter.actualLetter===ownProps.letter),
            wordSpelled:(state.letterHitBoxes.length == 0 ? true : false),
            selectedWord:state.selectedWord,
            celebrate:ownProps.celebrate,
            targetCorralled: ownProps.targetCorralled
            }
}
 
 export default connect(mapStateToProps,mapDispatchToProps)(Draggable);