import React from 'react';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';


class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this._animatedValue = new Animated.ValueXY()
        this._value= {x:0,y:0}
        this._animatedValue.addListener(value=>this._value = value)
        this._panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
          onPanResponderGrant: (e, gestureState) => {
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
      render() {
        const  animatedStyle = {
          transform: this._animatedValue.getTranslateTransform()
        }  
      return (<Animated.View {...this._panResponder.panHandlers} style={animatedStyle}>
            <Text style={styles.text}>{this.props.letter}</Text>
          </Animated.View>
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
      fontSize: 80
    },
   
  });

export default Draggable