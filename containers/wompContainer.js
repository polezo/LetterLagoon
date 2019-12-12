import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Draggable from './draggable'
import uuid from 'react-uuid'
import { connect } from 'react-redux'



class WompContainer extends React.Component {

  constructor(props) {
    super(props);
    this.addTheStupidBox ={}
    this.hitBoxRef = React.createRef()
    
    this._wompedAnim = new Animated.ValueXY()
    this._getWomped = Animated.spring(
        this._wompedAnim, {
        toValue: this.animValueHelper()
    })
  
  }

//   shouldComponentUpdate(nextProps,nextState) {
//     return false
//     }

  componentDidMount() {
    setTimeout(this.getWomped,2000)
    setTimeout(this.addTheDamnBox,500)

}

addTheDamnBox = () => {
    this.props.addHitBox(this.addTheStupidBox)
}

getWomped = () => {
    this._getWomped.start()
    setTimeout(()=>this._womped=true,1000)
}

getRandomInt = (max) => {
  let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    return Math.floor(Math.random() * Math.floor(max)+50) * plusOrMinus
}

animValueHelper = () => {
  let animObj = {x:this.getRandomInt(200), y:this.getRandomInt(300)}
  return animObj
}

setLetterHitBoxes = (x, y, width, height, pageX, pageY,letterValue,id) => {
    let hitBox = {x, y, width, height, pageX, pageY,letterValue,id}
    // this._setHitBox = hitBox;
    this.addTheStupidBox = hitBox
    
    
}

render(){
   
    const wompedStyle = {
        // backgroundColor:'rgba(34, 139, 52, 0.8)',
        transform:this._wompedAnim.getTranslateTransform()
    }
    return <View style={this.props.letterCorralled ? styles.testColorHit : styles.testColor}ref={(ref) => { this.marker = ref }}
    onLayout={({nativeEvent}) => {
    
        this.marker.measure((x, y, width, height, pageX, pageY) => {
                  this.setLetterHitBoxes(x, y, width, height, pageX, pageY,this.props.letter,this.props.id);
         })
      
    }} ><Animated.View style={wompedStyle} >
            <Draggable letter={this.props.letter} />
            </Animated.View></View>
}

}

// mapStateToProps = (props,ownProps) => {
//     return { letter: ownProps.letter}
// }

mapDispatchToProps = (dispatch) => {
    return { addHitBox:(positionInfoObj) => dispatch({type:"ADD_LETTER_HITBOX",payload:positionInfoObj,
              removeHitBox:()=> dispatch({type:"REMOVE_LETTER_HITBOX"}) })}
}

mapStateToProps = (state,ownProps) => {
    return {letter: ownProps.letter,
        letterCorralled: state.corralledLetters.includes(ownProps.id)}
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
      backgroundColor:'rgba(0, 255, 0, 0.3)',
    },
    testColorHit:{
      backgroundColor:'rgba(255, 0, 0, 0.3)',
  }});

export default connect(mapStateToProps,mapDispatchToProps)(WompContainer)
