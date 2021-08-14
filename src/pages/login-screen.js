import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';

import FormRow from '../components/form-row';
import { processLogin } from '../actions/user-actions';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            email: '',
            password: '',
            loading: false,
            message: ''
        };
    }

    processLogin() {
        const { email, password } = this.state;
        this.setState({ loading: true, message: '' });

        this.props.processLogin({ email, password })
            .then(user => {
                if (user) {
                    this.setState({ loading: false, message: 'Sucesso!' });
                    return this.props.navigation.replace('Main');
                }
                this.setState({ loading: false, message: '' });
            })
            .catch(error => this.setState({ loading: false, message: this.getMessageByError(error.code) }));
    }

    getMessageByError(code) {
        switch(code) {
            case 'auth/user-not-found': 
                return 'E-mail inexistente';
            case 'auth/wrong-password':
                return 'Senha incorreta';
            default: 
                return 'Erro desconhecido';
        }
    }

    render() {
        return (
            <View>
                <FormRow>
                    <TextInput 
                        style={ styles.textInput }
                        placeholder="E-mail: user@provider.com"
                        value={ this.state.email }
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={ v => this.setState({ email: v }) }
                    />
                </FormRow>
                <FormRow>
                    <TextInput 
                        style={ styles.textInput }
                        placeholder="Enter your password here"
                        secureTextEntry
                        value={ this.state.password }
                        onChangeText={ v => this.setState({ password: v }) }
                    />
                </FormRow>
                { this.renderButton() }
                { this.renderMessage() }
            </View>
        );
    }

    renderButton() {
        if (this.state.loading) 
            return <ActivityIndicator size="large" color="#0000ff"/>;

        return (
            <Button 
                title="Entrar"
                onPress={ () => this.processLogin() }
            />
        );
    }

    renderMessage() {
        const { message } = this.state;
        if (!message) return false;

        return (
            <View>
                <Text>{ message }</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10
    }
});

export default connect(null, { processLogin })(LoginScreen);