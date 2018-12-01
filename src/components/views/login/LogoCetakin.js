import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Animated, 
    StyleSheet, 
    Easing 
} from 'react-native';

class LogoCetakin extends Component {

  state = {
      cetakAnim: new Animated.Value(0),
      inAnim: new Animated.Value(0)
  }

  componentWillMount(){
      Animated.sequence([
          Animated.timing(this.state.cetakAnim, {
              toValue: 1,
              duration: 1000,
              easing:Easing.easeOutCubic
          }),
          Animated.timing(this.state.inAnim, {
            toValue: 1,
            duration: 500,
            easing:Easing.easeOutCubic
        }),
      ]).start(() => {
          this.props.showLogin()
      });
  }
  
  render() {
    const { 
        logoStylePotrait, 
        logoStyleLandscape, 
        cetakStyle, 
        inStyle 
    } = styles;

    return (
        <View>
            <View style={
                this.props.orientation === "portrait"
                ? logoStylePotrait
                : logoStyleLandscape
            }>
                <Animated.View style={{ 
                    opacity: this.state.cetakAnim,
                    top: this.state.cetakAnim.interpolate({
                        inputRange: [0,1],
                        outputRange: [80,0]
                    })
                }}>
                    <Text style={cetakStyle}>Cetak</Text>
                </Animated.View>
                <Animated.View style={{ 
                    opacity: this.state.inAnim
                }}>
                    <Text style={inStyle}>in</Text>
                </Animated.View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    logoStylePotrait: {
        flex: 1,
        marginTop: 40,
        flexDirection: 'row',
        maxHeight: 70,
    },
    logoStyleLandscape: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        maxHeight: 50
    },
    cetakStyle: {
        fontFamily: 'OpenSans-Light',
        fontSize: 40,
        color: '#719f33'
    },
    inStyle: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 40,
        color: '#5b6360'
    }
});

export default LogoCetakin;
