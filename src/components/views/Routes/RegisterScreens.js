import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from '../../store/Config';

import Login from '../login/Login';
import Home from '../home/Home';
import Admin from '../admin/Admin';

const store = configureStore();

export const RegisterScreens = () => {
  Navigation.registerComponentWithRedux("CetakinApp.Login", () => Login, Provider, store);
  Navigation.registerComponentWithRedux("CetakinApp.Home", () => Home, Provider, store);
  Navigation.registerComponentWithRedux("CetakinApp.Admin", () => Admin, Provider, store);
};
