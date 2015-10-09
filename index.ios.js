/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Parse = require('parse/react-native');

var {
  AppRegistry,
  NavigatorIOS,
  StatusBarIOS,
  Component,
  View,
  Text,
  StyleSheet
} = React;
var CONFIG = require('./config');
Parse.initialize(CONFIG.PARSE_APP_ID, CONFIG.PARSE_JS_KEY);

var PostListContainer = require('./components/PostListContainer');
var PostCreator = require('./components/PostCreator');

class RNAdmin5 extends Component {

  handleRightPress() {
    this.refs.nav.push({
      title: 'Create Post',
      component: PostCreator,
      passProps: {
        post: 'blah',
      },
      rightButtonText: 'Publish',
      backButtonText: 'Back',
    });
  }

  render() {
    // StatusBarIOS.setStyle('dark-content');
    return (
      <NavigatorIOS
        ref='nav'
        style={styles.container}
        initialRoute={{
          component: PostListContainer,
          title: 'ShellyPalmer',
        }}
        tintColor='#183E63'
        barTintColor='#eeeeee'
        titleTextColor='#183E63'
        translucent={true}
      />
    );
  }
}


//
// <NavigatorIOS
//    initialRoute={{component: PostListContainer, title: 'ShellyPalmer'}}
//    barTintColor= '#000000'
//    tintColor='#ffffff'
//    titleTextColor='#ffffff'
// />
var styles = StyleSheet.create({
  container:{
    flex:1,
  },
});

AppRegistry.registerComponent('RNAdmin5', () => RNAdmin5);
