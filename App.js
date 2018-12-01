import { Navigation } from 'react-native-navigation';
import { RegisterScreens } from './src/components/views/Routes/RegisterScreens';
import { goLogin } from './src/components/views/Routes/Tabs';
 
RegisterScreens();

Navigation.events().registerAppLaunchedListener(() => {
  goLogin();
});
