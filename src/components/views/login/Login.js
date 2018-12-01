import React, { Component } from 'react';
import { 
  View,
  StyleSheet, 
  ScrollView, 
  Animated, 
  Keyboard,
  Text
} from 'react-native';

import { goHome } from '../Routes/Tabs';
import LogoCetakin from './LogoCetakin';
import LoginPanel from './LoginPanel';
import { 
  getOrientation, 
  setOrientationListener, 
  removeOrientationListener,
  getTokens,
  setTokens
} from '../../utils/Misc';

import { connect } from 'react-redux';
import { autoSignIn } from '../../store/actions/UserActions';  
import { bindActionCreators } from 'redux';

import Spinner from 'react-native-spinkit';


class Login extends Component {

  constructor(props){
    super(props)

    this.state = {
      loading: true,
      orientation: getOrientation(500),
      logoAnimation: false
    }

    setOrientationListener(this.changeOrientation);
    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(150);
  }

  changeOrientation = () => {
    this.setState({
      orientation: getOrientation(500)
    })
  }

  showLogin = () => {
    this.setState({
      logoAnimation: true
    })
  }

  //Keyboard Behavior Handler
  componentWillMount () {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
    removeOrientationListener();
  }

  keyboardDidShow = (event) => {
    Animated.parallel([
        Animated.timing(this.keyboardHeight, {
          duration: 300,
          toValue: event.endCoordinates.height,
        }),
        Animated.timing(this.imageHeight, {
          duration: 300,
          toValue: 100,
        }),
      ]).start();
  };

  keyboardDidHide = (event) => {
    Animated.parallel([
        Animated.timing(this.keyboardHeight, {
          duration: 300,
          toValue: 0,
        }),
        Animated.timing(this.imageHeight, {
          duration: 300,
          toValue: 150,
        }),
      ]).start();
  };

  //AutoSignIn
  componentDidMount(){
    getTokens((value) => {
      if(value[0][1] === null){
        this.setState({ loading: false })
      } else {
        this.props.autoSignIn(value[1][1]).then(() => {
          if(!this.props.User.userData.token){
            this.setState({ loading: false })
          } else {
            setTokens(this.props.User.userData, () => {
              goHome();
            })
          }
        })
      }
    })
  }

  //MainRender
  render() {

    const { container, loading, textLoading } = styles;

    if(this.state.loading){
      return (
        <View style={loading}>
          <Spinner color={'#719f33'} size={35} type={'FadingCircleAlt'} />
          <Text style={textLoading}>Tunggu ...</Text>
        </View>
      )
    } else {
      return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={container}>
              <LogoCetakin 
                showLogin={this.showLogin}
                orientation={this.state.orientation}
              />
              <LoginPanel 
                show={this.state.logoAnimation}
                orientation={this.state.orientation}
                imageHeight={this.imageHeight}
              />
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textLoading: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    marginTop: 5,
    color: '#507124'
  }
});

function mapStateToProps(state) {
  return {
      User: state.User
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ autoSignIn }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
