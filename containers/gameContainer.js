import React from 'react';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';
import Draggable from './draggable'

class GameContainer extends React.Component {

      render() {
        const word = "START"
        // const  animatedStyle = {
        //   transform: this._animatedValue.getTranslateTransform()
        // }  
      return (<View style={styles.container} >
          {word.split("").map(letter=><Draggable letter={letter}/>)}
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
        fontSize: 80
      },
     
    });
    

export default GameContainer