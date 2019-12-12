import React from 'react';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';
import {connect} from 'react-redux'


class Draggable extends React.Component {
    

    constructor(props) {
        super(props);
        this.marker = React.createRef();
        this.state = {womped:false}
        
      
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

    //   shouldComponentUpdate(nextProps,nextState) {
    //       return false
    //   }

      isDropZone = (gestureData) => {
       
        let hitLetterBox = this.props.letterHitBoxes.find(hitBox => gestureData.pageY > (hitBox.pageY - 50) && gestureData.pageY < (hitBox.pageY + 50) && gestureData.pageX > (hitBox.pageX - 24) && gestureData.pageX < (hitBox.pageX + 24)) 
        console.log(gestureData,hitLetterBox)
        if (hitLetterBox && hitLetterBox.letterValue == this.props.letter) {
            this.props.addCorralledLetter(hitLetterBox.id)
        } else {
            console.log("no match")
        }
        // return gestureData.pageY > (this.props.letterHitBoxes[0].pageY - 50) && gestureData.pageY < (this.props.letterHitBoxes[0].pageY + 50)
        // let DZs = this.props.letterHitboxes;
        // return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
    }

    
      render() { 
        

        const  animatedStyle = {
          transform: this._animatedValue.getTranslateTransform()
        }  
        
      return (<Animated.View style={styles.text} {...this._panResponder.panHandlers} style={[animatedStyle]}>
            <Text ref={(ref) => { this.marker = ref }} style={styles.text}>{this.props.letter}</Text>
          </Animated.View>
      );
    }
}

const styles = StyleSheet.create({
 
    text: {
      fontSize: 80,
      zIndex:99
    },
   
  });

const mapDispatchToProps = (dispatch) => {
    return {addCorralledLetter: payload => dispatch({type:"ADD_CORRALLED_LETTER",payload})}
}

const mapStateToProps = (state,ownProps) => {
    return {letter: ownProps.letter,
            letterHitBoxes: state.letterHitBoxes,
            id:ownProps.id}
}
 
 export default connect(mapStateToProps,mapDispatchToProps)(Draggable);