import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';

import Line from '../components/line';
import LongText from '../components/long-text';
import { deleteSerie } from '../actions/series-actions';

class SerieDetailScreen extends React.Component {
    render() {
        const { serie } = this.props.navigation.state.params;
        const { navigation, deleteSerie } = this.props;
        return (
            <ScrollView>
                <Image 
                    source={ { uri: `data:image/jpeg;base64,${serie.img}` } }
                    style={ styles.image }
                />
                <Line label="Título" content={ serie.title }/>
                <Line label="Gênero" content={ serie.render }/>
                <Line label="Nota" content={ serie.rate}/>
                <LongText label="Descrição" content={ serie.description }/>
                <View style={ styles.button }>
                    <Button 
                        title="Editar"
                        onPress={ () => navigation.replace('NewSerieScreen', { serieToEdit: serie }) }    
                    />
                </View>
                <View style={ styles.button }>
                    <Button 
                        title="Excluir"
                        color="#ff0004"
                        onPress={ async () => {
                            const result = await deleteSerie(serie);
                            if (result === true) navigation.goBack();
                        } }    
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1
    },
    button: {
        margin: 10
    }
});

export default connect(null, { deleteSerie })(SerieDetailScreen);