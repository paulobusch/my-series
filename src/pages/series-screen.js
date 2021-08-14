import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import AddCard from '../components/add-card';
import SerieCard from '../components/serie-card';
import { watchSeries } from '../actions/series-actions';

class SeriesPage extends React.Component {
    componentDidMount() {
        this.props.watchSeries();
    }

    render() {
        const { series, navigation } = this.props;

        if (series === null) return <ActivityIndicator size="large" color="#0000ff"/>;

        return (
            <View>
                <FlatList 
                    data={ [ ...series, { isLast: true } ] }
                    renderItem={ ({ item, index }) => {
                        if (item.isLast) 
                            return (
                                <AddCard 
                                    onNavigate={ () => navigation.navigate('NewSerieScreen') }
                                    isLeft={ index % 2 === 0 }
                                />
                            );  
                        return (
                            <SerieCard 
                                serie={ item }
                                onNavigate={ () => navigation.navigate('SerieDetail', { serie: item }) }
                                isLeft={ index % 2 === 0 }
                            /> 
                        );
                    } } 
                    keyExtractor={ item => item.id }
                    numColumns={ 2 }
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    if (state.serieList === null) return { series: null };

    return { 
        series: Object.keys(state.serieList)
            .map(key => ({ ...state.serieList[key], id: key }))
    };
}
export default connect(mapStateToProps, { watchSeries })(SeriesPage);