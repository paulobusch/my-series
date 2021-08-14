import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from "./pages/login-screen";
import NewSerieFormScreen from "./pages/new-serie-screen";
import SerieDetailScreen from "./pages/serie-detail-screen";
import SeriesPage from "./pages/series-screen";

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Bem vindo'
    }
  },
  NewSerieScreen: {
    screen: NewSerieFormScreen,
    navigationOptions: ({ navigation }) => {
      if (navigation.state.params && navigation.state.params.serieToEdit)
        return { title: navigation.state.params.serieToEdit.title };
      return { title: 'Nova Série' };
    }
  },
  Main: {
    screen: SeriesPage
  },
  SerieDetail: {
    screen: SerieDetailScreen,
    navigationOptions: ({ navigation }) => ({ title: navigation.state.params.serie.title })
  }
}, {
  defaultNavigationOptions: {
    title: 'Minhas séries',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#003994',
      borderBottomWidth: 1,
      borderTopColor: '#c5c5c5'
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 28
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;