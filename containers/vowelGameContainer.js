import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import uuid from 'react-uuid'
import { connect } from 'react-redux'
import VowelWomper from "./vowelWomper"
import sample from "lodash/sample"
import VowelDraggable from './vowelDraggable'


class VowelGameContainer extends React.Component {

  constructor(props) {
    super(props);
    this.refsArray = this.props.selectedWord.split("").map(()=>React.createRef())
  }

  componentDidMount = () => {

  }

  vowelTest = (s) => {
    return (/^[aeiou]$/i).test(s);
  }


  shouldComponentUpdate(nextProps,nextState) {
    if (this.props.level != nextProps.level) {
      
        return true
      }
      
    return false
    }
      
    wordRenderHelper = () => {
      if (this.props.wordSpelled) {
      let newWord = sample(this.props.allWords)
      this.props.updateSelectedWord(newWord)
      this.props.nukeTheStore()
      return this.props.selectedWord
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

    sampleHelper = () => {
       let wordVowels = this.props.selectedWord.split("").filter(this.vowelTest)
       return ["A","E","I","O","U"].filter(vowel=>!wordVowels.includes(vowel))
    }


    render() {
    

      return (<View style={styles.container} >
          
        <View style={[styles.vowel,this.getRandomPosition("one")]}>
           <VowelDraggable letter={sample(this.sampleHelper())} id={uuid()} />
        </View>
        <View style={[styles.vowel,this.getRandomPosition("two")]}>
           <VowelDraggable letter={sample(this.sampleHelper())} id={uuid()} />
        </View>
        <View style={[styles.vowel,this.getRandomPosition("three")]}>
           <VowelDraggable letter={sample(this.sampleHelper())} id={uuid()} />
        </View>
        <View style={[styles.vowel,this.getRandomPosition("four")]}>
           <VowelDraggable letter={sample(this.sampleHelper())} id={uuid()} />
        </View>

      {this.wordRenderHelper().split("").map((letter)=>{
        let id=uuid()
        let letterId=uuid()
      return <View key={uuid()} >{<VowelWomper key={id} id={id} letterId={letterId} letter={letter}/>}</View>})}
         
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