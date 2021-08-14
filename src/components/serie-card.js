import React from 'react';

import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const SerieCard = ({ serie, isLeft, onNavigate }) => (
    <TouchableOpacity 
        onPress={ onNavigate }
        style={ [ styles.container, isLeft ? styles.leftColumn : styles.rightColumn ] }
    >
        <View style={ styles.card }>
            <Image 
                source={ { uri: `data:image/jpeg;base64,${serie.img}` } } 
                aspectRatio={ 1 }
                resizeMode="cover"
            />
            <View style={ styles.containerTitle }>
                <Text style={ styles.title }>{ serie.title }</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        width: '50%',
        padding: 5,
        height: Dimensions.get('window').width / 2
    },
    containerTitle: {
        backgroundColor: 'black',
        opacity: .8,
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 0,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 3,
        paddingLeft: 3,
        alignItems: 'center'
    },
    card: {
        flex: 1,
        borderWidth: 1
    },
    title: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    leftColumn: {
        paddingLeft: 10
    },
    rightColumn: {
        paddingRight: 10
    }
});

export default SerieCard;