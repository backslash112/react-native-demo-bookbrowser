/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SearchScreen = require('./SearchScreen');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;


var BookBrowser = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
      initialRoute={{
        component: SearchScreen,
        title: 'Search',
        passProps: {
          placeholder: 'javascript'
        },
      }}
      style={styles.navContainer} />
    );
  }
});

var styles = StyleSheet.create({
  navContainer: {
    flex: 1,
  },
});

AppRegistry.registerComponent('BookBrowser', () => BookBrowser);
