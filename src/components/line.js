import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Line = ({ label, content = '-' }) => (
    <View style={ styles.line }>
        <Text style={ [styles.cell, styles.label, label.length > 8 ? styles.small : null] }>{ label }</Text>
        <Text style={ [styles.cell, styles.content] }>{ content }</Text>
    </View>   
);

const styles = StyleSheet.create({
    line: {
        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
        borderWidth: 1,
        borderColor: '#c5c5c5'
    },
    cell: {
        flex: 1,
        paddingLeft: 5,
        fontSize: 16
    },
    label: {
        fontWeight: 'bold',
        flex: 1
    },
    content: {
        flex: 3
    },
    small: {
        fontSize: 12
    }
});

export default Line;