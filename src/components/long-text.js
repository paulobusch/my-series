import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, LayoutAnimation, NativeModules } from 'react-native';

NativeModules.UIManager.setLayoutAnimationEnabledExperimental && NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true);

export default class LongText extends React.Component {

    constructor(props) {
        super(props);

        this.state = { isExpanded: false };
    }

    toggleEspanded() {
        this.setState({ isExpanded: !this.state.isExpanded });
    }

    componentDidUpdate(prevProps, prevState) {
        LayoutAnimation.spring();
    }

    render() {
        const { label, content = '-' } = this.props;

        return (
            <View style={ styles.line }>
                <Text style={ [styles.cell, styles.label] }>{ label }</Text>
                <TouchableWithoutFeedback onPress={ () => this.toggleEspanded() }>
                    <View>
                        <Text style={ [
                            styles.cell,
                            styles.content,
                            this.state.isExpanded 
                                ? styles.expanded 
                                : styles.collapsed
                        ] }>{ content }</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>   
        );
    }
}

const styles = StyleSheet.create({
    line: {
        paddingTop: 3,
        paddingBottom: 3
    },
    cell: {
        flex: 1,
        paddingLeft: 5,
        fontSize: 16
    },
    label: {
        fontWeight: 'bold',
        flex: 1,
        textDecorationLine: 'underline',
        paddingBottom: 6
    },
    content: {
        flex: 3
    },
    collapsed: {
        maxHeight: 60
    },
    expanded: {
        flex: 1
    }
});