/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppManager from './src/AppManager';

AppRegistry.registerComponent(appName, () => AppManager);
