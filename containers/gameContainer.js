import React from 'react';
import { StyleSheet, Text, View, Animated, PanResponder,findNodeHandle } from 'react-native';
import uuid from 'react-uuid'
import { connect } from 'react-redux'
import WompContainer from "./wompContainer"

class GameContainer extends React.Component {

  constructor(props) {
    super(props);
    this.refsArray = this.props.selectedWord.split("").map(()=>React.createRef())
  }

  componentDidMount = () => {

  }
 
  shouldComponentUpdate(nextProps,nextState) {
    return false
    }
      render() {
        

      return (<View style={styles.container} >
      {this.props.selectedWord.split("").map((letter,i)=>{
        let id=uuid()
      return <View key={uuid()} style={styles[`zIndex0`]} ><Text>{letter}</Text><WompContainer key={id} id={id} letter={letter}/></View>})}
         
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
      testColor: {
        backgroundColor:'green'
      },
      testColorHit:{
        backgroundColor:'red'
      },
  

  });
  
const select = (state) => {
   return {selectedWord: state.selectedWord,
          corralledLetters: state.corralledLetters}
}

export default connect(select)(GameContainer);