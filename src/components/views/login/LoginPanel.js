import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LoginImage from '../../../assets/LoginLogoFix.png';
import LoginForm from './LoginForm';

class LoginPanel extends Component {
    
    //Form Panel Animation
    state = {
        animFinished: false,
        LoginImage: new Animated.Value(0),
        loginForm: new Animated.Value(0),
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.show && !this.state.animFinished) {
            Animated.parallel([
                Animated.timing(this.state.LoginImage, {
                    toValue: 1,
                    duration: 1000
                }),
                Animated.timing(this.state.loginForm, {
                    toValue: 1,
                    duration: 1500
                })
            ]).start(
                this.setState({
                    animFinished: true
                })
            )
        }
    }

    render() {
        const { LoginImagePortrait, LoginImageLandscape } = styles;

        return (
            <View>
                <Animated.View
                    style={{
                        opacity: this.state.LoginImage
                    }}
                >
                    <Animated.Image 
                        style={[
                            this.props.orientation === "portrait" 
                            ? LoginImagePortrait
                            : LoginImageLandscape
                        , {height: this.props.imageHeight}]}
                        source={LoginImage}
                        resizeMode={'contain'}
                    />
                </Animated.View>
                
                <Animated.View
                    style={{
                        opacity: this.state.loginForm,
                        top: this.state.loginForm.interpolate({
                            inputRange: [0,1],
                            outputRange: [100,30]
                        })
                    }}
                >
                    <LoginForm />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    LoginImagePortrait: {
      width: 270,
      height: 150,
      
    },
    LoginImageLandscape: {
      width: 270,
      height: 0,
    }
  });

export default LoginPanel;
