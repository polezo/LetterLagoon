import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Draggable from './draggable'
import uuid from 'react-uuid'
import { connect } from 'react-redux'
import sample from 'lodash/sample'



class WompContainer extends React.Component {

  constructor(props) {
    super(props);
    // this.addTheStupidBox =null
    this.wompedLettersY=[]
    this.hitBoxRef = React.createRef()
    this.id = uuid()
    this._wompedAnim = new Animated.ValueXY()
    this._getWomped = Animated.spring(
        this._wompedAnim, {
        toValue: this.animValueHelper()
    })
    this.state = {letterDragging:false}
  }

//   shouldComponentUpdate(nextProps,nextState) {
//     return false
//     }

  componentDidMount() {
    setTimeout(this.getWomped,1300)
    setTimeout(this.addTheDamnBox,2000)
    // this.props.nukeTheStore()
    

}

toggleLetterDragging = () => {
    this.setState({letterDragging:!this.state.letterDragging})
}

addTheDamnBox = () => {
    if (this.addTheStupidBox) {
    this.props.addHitBox(this.addTheStupidBox)}
}

getWomped = () => {
    this._getWomped.start()
    // setTimeout(this.props.toggleWomped,500)
}

levelRotate = () => {
    switch ((this.props.level+this.props.rotationSkipper) % 4) {
        case 1: 
            return {"x":-1,"y":1}
        case 2: 
            return {"x":1,"y":1}
        case 3:
            return {"x":1,"y":-1}
        case 0:
            return {"x":-1,"y":-1}
    }
}

//make these not random then record some words/letters
getRandomIntY = (i) => {
    let maxLength = Math.floor(Math.random() * 200+150)
    
    switch (i % 4) {
        case 0:
            return maxLength * this.levelRotate()["y"]
        case 1: 
            return maxLength * this.levelRotate()["y"]
        case 2:
            return -maxLength * this.levelRotate()["y"]
        case 3: 
            return -maxLength * this.levelRotate()["y"]
        default:
            return maxLength
    }
    
//   let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
//     return Math.floor(Math.random() * Math.floor(max)+38) * plusOrMinus
}

getRandomIntX = (i,plusOrMinus) => {
    let maxLength = Math.floor(Math.random() * Math.floor(60)+90)
    
    switch (i % 4) {
        case  0:
            return -maxLength * this.levelRotate()["x"]
        case 1:
            return maxLength * this.levelRotate()["x"]
        case 2:
            return maxLength * this.levelRotate()["x"]
        case 3: 
            return -maxLength * this.levelRotate()["x"]
        default: 
            return maxLength
    }
    // let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    //   return Math.floor(Math.random() * Math.floor(max)+130) * plusOrMinus
  }

animValueHelper = () => {
    
  let animObj = {x:this.getRandomIntX(this.props.i) * this.props.x, y:this.getRandomIntY(this.props.i)* this.props.x}
  return animObj
}


setLetterHitBoxes = (x, y, width, height, pageX, pageY,letterValue,id) => {
    let hitBox = {x, y, width, height, pageX, pageY,letterValue,id}
    // this._setHitBox = hitBox;
  
    this.addTheStupidBox = hitBox 
    // this.props.addHitBox({x, y, width, height, pageX, pageY,letterValue,id})
}

styleHelper = () => {
    if (!this.props.letterCorralled && this.props.cloneCorralled) {
        return {bottom:42}
    }
}

componentWillUnmount = () => {
    this.props.nukeTheStore()
    this.props.nukeLetterHitboxes()
}

render(){
    
    const wompedStyle = {
        // backgroundColor:'rgba(34, 139, 52, 0.8)',
        transform:this._wompedAnim.getTranslateTransform(),
        flex:-1
    }
    return <View style={this.props.letterCorralled ? styles.testColorHit : styles.testColor}ref={(ref) => { this.marker = ref }}
    onLayout={({nativeEvent}) => {
    if (this.marker) {
        setTimeout(()=>this.marker.measure((x, y, width, height, pageX, pageY) => {
                
                  this.setLetterHitBoxes(x, y, width, height, pageX, pageY,this.props.letter,this.props.id);
         }),1000)
        }
      
        }} >{this.props.letterCorralled&&<Text style={styles.text2}>{this.props.letter}</Text>}<Animated.View style={wompedStyle} >
            <Draggable toggleLetterDragging={this.toggleLetterDragging}celebrate={this.props.celebrate} letter={this.props.letter} id={this.props.letterId} 
            // LCid={this.props.letterCorralled ? this.props.letterCorralled.hitLetter:null}
            />
            </Animated.View><Text style={[styles.text,this.styleHelper(),(!this.props.letterCorralled) && {bottom:85},(!this.props.letterCorralled &&this.state.letterDragging) && {bottom:120}]}>_</Text></View>
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
        fontFamily:"AmericanTypewriter", 
        bottom:90,
        fontSize: 80,
        fontWeight:"bold",
        textAlign:'center'
    },
    text2: {
        fontFamily:"AmericanTypewriter", 
        fontWeight:"bold",
        fontSize: 80,
        textAlign:'center'
    },
    testColor: {
        width:85,
    //   backgroundColor:'rgba(0, 255, 0, 0.3)',
    },
    testColorHit:{
        width:85,
        height:100,
        bottom:48,
      backgroundColor:'rgba(238, 232, 170, 0.8)',
  }});

  mapDispatchToProps = (dispatch) => {
    return { addHitBox:(positionInfoObj) => dispatch({type:"ADD_LETTER_HITBOX",payload:positionInfoObj}),
            toggleWomped:() => dispatch({type:"TOGGLE_WOMPED"}),
            addWompedLetterY:(payload)=> dispatch({type:"ADD_WOMPED_LETTER_Y",payload:payload}),
            nukeTheStore:()=>dispatch({type:"NUKE_THE_STORE"}),
            nukeLetterHitboxes:()=>dispatch({type:"NUKE_LETTER_HITBOXES"}) 
            }}

mapStateToProps = (state,ownProps) => {
    return {letter: ownProps.letter,
        letterCorralled: state.corralledLetters.find(corralledLetter=>corralledLetter.hitLetterBox===ownProps.id),
        letterId:ownProps.letterId,
        womped:state.womped,
        cloneCorralled:state.corralledLetters.find(letter=>letter.actualLetter===ownProps.letter),
        wompedLettersY:state.wompedLettersY,
        level:state.level,
        x:ownProps.x,
        rotationSkipper:ownProps.rotationSkipper,
        celebrate:ownProps.celebrate
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(WompContainer)
