import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import Validation from '../../utils/form/Validation';
import Input from '../../utils/form/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setTokens } from '../../utils/Misc';
import { goHome } from '../Routes/Tabs';

import { connect } from 'react-redux';
import { signUp, signIn } from '../../store/actions/UserActions';  
import { bindActionCreators } from 'redux';

class LoginForm extends Component {
  
    state = {
        type: 'Login',
        action: 'Login',
        actionMode: 'Bukan user? Register',
        hasErrors: false,
        form: {
            email: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true,
                    isEmail: true
                }
            },
            password: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true,
                    minLength: 6
                }
            },
            confirmPassword: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    confirmPass: "password"
                }
            }
        }
    }

    updateInput = (name, value) => {
        this.setState({
            hasErrors: false,
        })

        let formCopy = this.state.form;
        formCopy[name].value = value;

        //validation
        let rules = formCopy[name].rules;
        let valid = Validation(value, rules, formCopy);
        // console.log(valid);
        
        formCopy[name].valid = valid;
        
        this.setState({
            form: formCopy
        })
    }

    changeFormType = () =>{
        const type = this.state.type;
        this.setState({
            type: type === 'Login' ? 'Register' : 'Login',
            action: type === 'Login' ? 'Register' : 'Login',
            actionMode: type === 'Login' ? 'Sudah register? Login' : 'Bukan user? Register'
        })
    }

    confirmPassword = () => (
        this.state.type != 'Login' ?
            <Input 
                placeholder="Konfirmasi Password"
                type={this.state.form.confirmPassword.type}
                value={this.state.form.confirmPassword.value}
                onChangeText={(value)=> this.updateInput("confirmPassword", value)}
                secureTextEntry
            />
        :null
    )

    formHasError = () => (
        this.state.hasErrors ?
            <View style={styles.errorContainer}>
                <Icon.Button 
                    name="exclamation-triangle" 
                    backgroundColor='#fff' 
                    color='#e06c75'
                >
                    <Text style={styles.errorMessage}>Opps, cek kembali Masukan Anda!</Text>
                </Icon.Button>
            </View>
        :null
    );

    manageAccess = () => {
        if(!this.props.User.userData.uid){
            this.setState({ hasErrors: true })
        } else {
            setTokens(this.props.User.userData, () => {
                this.setState({ hasErrors: false });
                goHome();
            })
        }
    }

    submitUser = () => {
        let isFormValid = true;
        let formToSubmit = {};
        const formCopy = this.state.form;

        for(let key in formCopy){
            if(this.state.type === 'Login'){
                if(key !== 'confirmPassword'){
                    isFormValid = isFormValid && formCopy[key].valid;
                    formToSubmit[key] = formCopy[key].value
                }
            } else {
                isFormValid = isFormValid && formCopy[key].valid;
                formToSubmit[key] = formCopy[key].value;
            }
        }

        if(isFormValid){
            if(this.state.type === 'Login'){
                this.props.signIn(formToSubmit).then(() => {
                    this.manageAccess()
                })
            } else {
                this.props.signUp(formToSubmit).then(() => {
                    this.manageAccess()
                })
            }
        } else {
            this.setState({
                hasErrors: true
            })
        }
    }


    
    render() {
        const { 
            buttonStyle, 
            buttonStyleRegister, 
            textButtonStyle, 
            textRegisterStyle,
        } = styles;
        
        return (
            <View>
                <Input 
                    placeholder="Masukan Email"
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    onChangeText={(value) => this.updateInput("email", value)}
                    autoCapitalize={"none"}
                    keyboardType={"email-address"}
                />
                <Input 
                    placeholder="Masukan Password"
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    onChangeText={(value) => this.updateInput("password", value)}
                    secureTextEntry
                />

                {this.confirmPassword()}
                {this.formHasError()}

                <View>
                    <TouchableOpacity 
                        style={buttonStyle}
                        onPress={this.submitUser}>
                        <Text style={textButtonStyle}>{this.state.action}</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity 
                        onPress={this.changeFormType}
                        style={buttonStyleRegister}>
                        <Text style={textRegisterStyle}>{this.state.actionMode}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 30,
        marginBottom: 5,
        height: 40,
        width: 250,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
		backgroundColor: '#719f33',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#ddd',
    },
    buttonStyleRegister: {
        marginTop: 2,
        marginBottom: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButtonStyle: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
    },
    textRegisterStyle: {
		color: '#5b6360',
		fontSize: 16,
		fontWeight: '400',
    },
    errorContainer: {
        marginBottom: 0,
        marginTop: 10,
        alignItems: 'center',
    },
    errorMessage: {
        fontFamily: 'Roboto-Black',
        fontSize: 14,
        color: '#e06c75'
    }
})

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ signUp, signIn }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
