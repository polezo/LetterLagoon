import React from 'react';
import { StyleSheet, Text, Animated, PanResponder } from 'react-native';
import {connect} from 'react-redux'


class VowelDraggable extends React.Component {
    

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
              console.log(this._value)
            this._animatedValue.setOffset({
              x:this._value.x,
              y:this._value.y
            })
            this._animatedValue.setValue({
              x:0,
              y:0
            })
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
          },
          onPanResponderMove: Animated.event([
            null, { dx: this._animatedValue.x, dy:this._animatedValue.y}
          ]) 
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
          ,
          // onPanResponderTerminationRequest: (evt, gestureState) => true,
          onPanResponderRelease: (e, gestureState) => {
            this.marker.measure((x, y, width, height, pageX, pageY) => {
                this.isDropZone({x, y, width, height, pageX, pageY});
       })
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
          },
          // onPanResponderTerminate: (evt, gestureState) => {
          //   // Another component has become the responder, so this gesture
          //   // should be cancelled
          // },
          // onShouldBlockNativeResponder: (evt, gestureState) => {
          //   // Returns whether this component should block native components from becoming the JS
          //   // responder. Returns true by default. Is currently only supported on android.
          //   return true;
          // },
        });
      }

 


          

    //     }

      checkGameState = () => {
        if (this.props.wordSpelled) {
            setTimeout(()=>{
                this.props.addWordToSpelled(this.props.selectedWord)
                
            },1500
            )
          }
      }

      isDropZone = (gestureData) => {
       
        let hitLetterBox = this.props.letterHitBoxes.find(hitBox => gestureData.pageY > (hitBox.pageY - 50) && gestureData.pageY < (hitBox.pageY + 50) && gestureData.pageX > (hitBox.pageX - 27) && gestureData.pageX < (hitBox.pageX + 27)) 
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
        // return gestureData.pageY > (this.props.letterHitBoxes[0].pageY - 50) && gestureData.pageY < (this.props.letterHitBoxes[0].pageY + 50)
        // let DZs = this.props.letterHitboxes;
        // return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    LCidChecker = (id) => {
        if (id){
        if (id === this.props.id) {
        return false}}
        return true
    
    }
    stylesHelper = () => {
        if (this.props.cloneCorralled && !this.props.letterCorralled) {
            
        }
    }
      render() { 
        

        const  animatedStyle = {
          transform: this._animatedValue.getTranslateTransform()
        }  
        
      return (<Animated.View style={[styles.view,]} {...this._panResponder.panHandlers} style={[animatedStyle]}>
            {!this.props.letterCorralled && <Text ref={(ref) => { this.marker = ref }} style={[styles.text,]}>{this.props.letter}</Text>}
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
        // flex:-1,
        fontSize: 80,
        textAlign:'center'
    },
    wompedText: {
        // position:'absolute',
        
        
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
            selectedWord:state.selectedWord}
}
 
 export default connect(mapStateToProps,mapDispatchToProps)(VowelDraggable);