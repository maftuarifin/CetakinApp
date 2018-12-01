import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = (props) => {

    let template = null;

    switch(props.type){
        case "textinput":
            template =
                <TextInput
                    underlineColorAndroid="transparent"
                    {...props}
                    style={[styles.Input, props.overrideStyle]}
                />
        break;
        default:
            return template
    }

return template;

};

const styles = StyleSheet.create({
    Input: {
        width: "100%",
        borderBottomWidth: 2,
        borderBottomColor: "#eaeaea",
        fontSize: 18,
        padding: 5,
        marginTop: 10
    }
});

export default Input;
