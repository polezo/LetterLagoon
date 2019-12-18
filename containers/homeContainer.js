import React from 'react';
import { View, Text, Button } from 'react-native';
import {connect} from 'react-redux'


class HomeScreen extends React.Component {
    
    
    
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize:80}}>LetterLagoon</Text>
        <Button
          title="Play"
          onPress={() => this.props.navigation.navigate('Spelling')}
         
        />
      </View>
      );
    }
  }

  const mapDispatchToProps = (dispatch) => {
      return {nukeLetterHitboxes:()=>dispatch({type:"NUKE_LETTER_HITBOXES"})}
  }

  export default connect(null,mapDispatchToProps)(HomeScreen)

