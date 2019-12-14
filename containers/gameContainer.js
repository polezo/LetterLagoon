import React from 'react';
import { StyleSheet, View } from 'react-native';
import uuid from 'react-uuid'
import { connect } from 'react-redux'
import WompContainer from "./wompContainer"
import sample from "lodash/sample"

class GameContainer extends React.Component {

  constructor(props) {
    super(props);
    this.refsArray = this.props.selectedWord.split("").map(()=>React.createRef())
  }

  componentDidMount = () => {

  }


  shouldComponentUpdate(nextProps,nextState) {
    if (this.props.level != nextProps.level) {
      
        return true
      }
      
    return false
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
        

      return (<View style={styles.container} >
      {this.wordRenderHelper().split("").map((letter,i)=>{
        let id=uuid()
        let letterId=uuid()
      return <View key={uuid()} ><WompContainer key={id} id={id} letterId={letterId} letter={letter}/></View>})}
         
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