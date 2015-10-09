/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var {
  Component,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet
} = React;
var ParseComponent = ParseReact.Component(React);
var PostList = require('./PostList');

class PostListContainer extends ParseComponent {
  constructor() {
    super();
  }

  observe(state) {
    return {
      posts: new Parse.Query('Posts').descending('writtenAt').limit(25),
    };
  }

  _refresh() {
    this.refreshQueries('posts')
  }

  render() {
    // console.log(this.data.posts);
    return (
      <PostList
        posts={this.data.posts}
        refresh={this._refresh.bind(this)}
        {...this.props}/>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop: 64,
  },
});

module.exports = PostListContainer;
