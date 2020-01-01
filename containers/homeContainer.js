import React from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity,ImageBackground} from 'react-native';
import {connect} from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from "lottie-react-native";
import { Audio } from 'expo-av'


class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title:"LetterLagoon",
    headerRight: <MaterialIcons name="live-help" size={32} color="white" onPress={()=> _this.saySomething() } style={{right:10}}  />,
    headerStyle: {
        backgroundColor: '#228b22',
      },
      headerTintColor: 'white',
  });
  
  state={opening:true,
         flown:true,}

  componentDidMount = () => {
    setTimeout(()=>this.gates.play(),500)
    setTimeout(this.gatesOpened,1500)

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid:          Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
  });

  setTimeout(()=>this._loadNewPlaybackInstance(require('../assets/Narration/0-Welcome.mp3'),500));
 

  }


  async _loadNewPlaybackInstance(clip) {
    
    if (this.narratorSound != null) {
        await this.narratorSound.unloadAsync();
        this.narratorSound.setOnPlaybackStatusUpdate(null);
        this.narratorSound = null;
     }
    
     const source = clip

     const initialStatus = {
//        Play by default
          shouldPlay: false,
//        Control the speed
          rate: 1.0,
//        Correct the pitch
          shouldCorrectPitch: true,
//        Control the Volume
          volume: 1.0,
//        mute the Audio
          isMuted: false
     };

     const { sound, status } = await Audio.Sound.createAsync(
         source,
         initialStatus
    );

//  Save the response of sound in playbackInstance
      
    this.narratorSound = sound;
    
    this.narratorSound.setOnPlaybackStatusUpdate(this.welcomeDone);

//  Play the Music

    this.narratorSound.playAsync();
    setTimeout(()=>this.unload(sound),2500)  
}

async welcomeDone(playbackstatus) {
  if (playbackstatus.didJustFinish) {
  const source3 = require('../assets/Letters/Z2.mp3')
  const initialStatus = {
              shouldPlay: false,
              rate: 1.0,
              shouldCorrectPitch: true,
              volume: 1.0,
              isMuted: false
         };
  
         const { sound } = await Audio.Sound.createAsync(
             source3,
             initialStatus
        );   
        
        setTimeout(()=>sound.playAsync(),2000)
      
  
         }
}


unload = (sound) => {
  sound.unloadAsync()
}


  gatesOpened = () => {
    this.setState({opening:false})
    setTimeout(()=>this.zFly.play(),3000)
    
    setTimeout(()=>this.setState({flown:false}),2000)
  }

  zIndexHelper = () => {
    return this.state.opening ? 99 : -99
  }



  saySomething = () => {
    console.log("something")
  } 
  
    render() {
      return (
        <ImageBackground source={require('../assets/introBg.jpg')} style={{width: '100%', height: '100%'}}>
          <StatusBar barStyle="light-content" backgroundColor="red" />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',bottom:30, }}>
        <Text style={{fontSize:80,fontFamily:"AmericanTypewriter", fontWeight:"bold",color:"black",opacity:0.75,bottom:13}}>LetterLagoon</Text>
        <View style={{top:55}}>
        <TouchableOpacity style={styles.button}
          onPress={() => this.props.navigation.navigate('Spelling')}
         
        ><Text style={styles.button}>Play</Text></TouchableOpacity></View>
        
      </View>
      <LottieView loop={false}
  ref={animation => {
    this.gates = animation;
  }}
  style={{
    position:"absolute",
    zIndex:this.zIndexHelper(),
    height: 1100,
    bottom:0,
    right:0,
    opacity:1
   
  }}
  source={require('../assets/animations/gates.json')}
 
/> 

<LottieView loop={false}
  ref={animation => {
    this.zFly = animation;
  }}
  style={{
    position:"absolute",
    zIndex:99,
    height: 330,
    top:0,
    right:0,
    opacity:1
   
  }}
  source={require('../assets/animations/zFly.json')}
 
/> 
     </ImageBackground>
      );
    }
  }

  const styles = StyleSheet.create({
    button: {
      fontFamily:"AmericanTypewriter",
    
    borderWidth: 0,
    borderRadius: 12,
    color: 'white',
    opacity:0.85,
    fontSize: 40,
    fontWeight: 'bold',
    overflow: 'hidden',
    paddingTop: 5,
    paddingBottom:5,
    paddingLeft:35,
    paddingRight:35,
    textAlign:'center',
    
    
    },
});

  const mapDispatchToProps = (dispatch) => {
      return {nukeLetterHitboxes:()=>dispatch({type:"NUKE_LETTER_HITBOXES"})}
  }

  export default connect(null,mapDispatchToProps)(HomeScreen)

