import React from 'react';
import { StyleSheet, Text, View, Animated, PanResponder } from 'react-native';
import Draggable from './draggable'
import uuid from 'react-uuid'
import { connect } from 'react-redux'

class GameContainer extends React.Component {

      render() {
        const word = "START"
        // const  animatedStyle = {
        //   transform: this._animatedValue.getTranslateTransform()
        // }  
      return (<View style={styles.container} >
          {this.props.selectedWord.split("").map(letter=><Draggable key={uuid()} letter={letter}/>)}
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
  
const select = (state) => {
   return {selectedWord: state.selectedWord}
}

export default connect(select)(GameContainer);