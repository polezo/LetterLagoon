import React from 'react';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';


class Draggable extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {womped:false}
        
        this._wompedAnim = new Animated.ValueXY()
        this._getWomped = Animated.spring(
            this._wompedAnim, {
            toValue: this.animValueHelper()
        })

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

      wompChecker = () => {
          return this.womped
      }

      componentDidMount() {
          setTimeout(this.getWomped,1000)
      }

      getWomped = () => {
          this._getWomped.start()
          setTimeout(()=>this._womped=true,1000)
      }

      getRandomInt = (max) => {
        let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
          return Math.floor(Math.random() * Math.floor(max)) * plusOrMinus
      }

      animValueHelper = () => {
        let animObj = {x:this.getRandomInt(200), y:this.getRandomInt(300)}
        return animObj
      }

      render() { 
        const  animatedStyle = {
          transform: this._animatedValue.getTranslateTransform()
        }  
        const wompedStyle = {
            transform:this._wompedAnim.getTranslateTransform()
        }
      return (<Animated.View {...this._panResponder.panHandlers} style={[animatedStyle,wompedStyle]}>
            <Text style={styles.text}>{this.props.letter}</Text>
          </Animated.View>
      );
    }
}

const styles = StyleSheet.create({
 
    text: {
      fontSize: 80
    },
   
  });

export default Draggable