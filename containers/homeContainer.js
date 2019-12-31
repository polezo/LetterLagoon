import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux'



class HomeScreen extends React.Component {
    

  
    
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',bottom:30, }}>
        <Text style={{fontSize:80,fontFamily:"AmericanTypewriter", fontWeight:"bold"}}>LetterLagoon</Text>
        <TouchableOpacity style={styles.button}
          onPress={() => this.props.navigation.navigate('Spelling')}
         
        ><Text style={styles.button}>Play</Text></TouchableOpacity>
        
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    button: {
     backgroundColor:"green",
     borderColor: 'white',
    borderWidth: 0,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    paddingTop: 5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10,
    textAlign:'center',
    },
});

  const mapDispatchToProps = (dispatch) => {
      return {nukeLetterHitboxes:()=>dispatch({type:"NUKE_LETTER_HITBOXES"})}
  }

  export default connect(null,mapDispatchToProps)(HomeScreen)

