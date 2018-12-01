import { Navigation } from 'react-native-navigation';

export const goHome = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'BottomTabsId',
      children: [
        {
          component: {
            name: 'CetakinApp.Home',
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Home',
                icon: require('../../../assets/LoginLogo.png')
              },
              topBar: {
                title: {
                  text: 'Home'
                }
              }
            }
          },
        },
        {
          component: {
            name: 'CetakinApp.Admin',
            options: {
              bottomTab: {
                text: 'Admin',
                fontSize: 12,
                icon: require('../../../assets/LoginLogo.png')
              }
            }
          },
        },
      ],
    }
  }
});

export const goLogin = () => Navigation.setRoot({
  root:
  {
    component: {
      name: "CetakinApp.Login",
      options: {
        statusBar: {
          backgroundColor: '#719f33'
        }
      }
    }
  }
});