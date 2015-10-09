/**
 * PostList IOS
 */
'use strict';

var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var {
  Component,
  Text,
  TextInput,
  View,
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet
} = React;
var moment = require('moment-twitter');

var ActionSheetIOS = require('ActionSheetIOS');
var PostCreator = require('./PostCreator');
var PostAftermath = require('./PostAftermath');
var RefreshableListView = require('react-native-refreshable-listview');
var PostWebView = require('./PostWebView');

class PostList extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this._renderRow = this._renderRow.bind(this);
    this._createPost = this._createPost.bind(this);
    this._openLink = this._openLink.bind(this);
  }

  _getDataSource() {
    return this.ds.cloneWithRows(this.props.posts);
  }

  _openLink(rowData) {
    this.props.navigator.push({
      title: rowData.title,
      component: PostWebView,
      passProps: {
        post: rowData,
      },
      rightButtonTitle: 'Publish',
      onRightButtonPress: () => {
        this.props.navigator.push({
          title: 'Publish Post',
          component: PostCreator,
          passProps: {
            post: rowData,
            isFocused: false,
          },
          rightButtonTitle: 'Done',
           onRightButtonPress: () => {
            let update = ParseReact.Mutation.Set(rowData.id, {isPublished: true});
            update.dispatch();
            this.props.navigator.push({
              title: 'Published!',
              component: PostAftermath,
              passProps: {
                post: this.state.post
              }
            });
           }
        });
      },
    });
  }

  _createPost(data) {
    this.props.navigator.push({
      title: 'New Post',
      component: PostCreator,
      passProps: {
        post: data,
        isFocused: true,
      },
      rightButtonTitle: 'Submit',
      leftButtonTitle: 'Cancel',
      onLeftButtonPress: () => {
        this.props.navigator.pop();
      },
    });
  }

  _renderRow(rowData) {
    let s = styles.row;
    if (rowData.isPublished){
      s = [styles.row, styles.isPublished];
    }
    return (
      <TouchableHighlight
        onPress={() =>this._openLink(rowData)}
        underlayColor='#dddddd'>
        <View>
          <View style={s}>
           <Image style={styles.thumb} source={{uri:rowData.avatar}} />
            <View>
              <Text style={styles.title}>{rowData.title}</Text>
              <Text style={styles.author}>{rowData.author} • {Math.round(rowData.score, -2)} points • {moment(rowData.writtenAt).twitterLong()}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  _renderHeader(refreshingIndicator) {
    var blank = {
      id:'',
      url: '',
      title: '',
      content: '',
      image: '',
      avatar: '',
      author: '',
      published: false,
      publishedAt: null,
    };
    return (
      <View>
       {refreshingIndicator}
      <TouchableHighlight
        onPress={() =>this._createPost(blank)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.row}>
              <Text style={styles.cta}>What's on your mind?</Text>
          </View>
          <View style={styles.separatorFull}/>
        </View>
      </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <RefreshableListView
          dataSource={this._getDataSource()}
          renderHeaderWrapper={this._renderHeader.bind(this)}
          renderRow={this._renderRow.bind(this)}
          loadData={this.props.refresh}
          refreshDescription='Refreshing articles'
          scrollRenderAheadDistance={300}
        />
    );
  }
}
 // 
var styles = StyleSheet.create({
  container:{
    marginTop: 64,
  },
  row: {
    padding: 20,
    flexDirection: 'row',
  },
  isPublished: {
    backgroundColor: '#eee'
  },
  title: {
    fontSize: 19,
    fontWeight: '200',
    fontFamily: 'Circular Air',
    marginTop: -3,
    width: 283,
    color: '#222222',
    lineHeight: 22,
  },
  thumb: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginRight: 20,
  },
  author: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Circular Air',
    marginTop: 4,
    color: '#ccc',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
    width: 313,
    flex:1,
    alignSelf: 'flex-end',
  },
  separatorFull: {
    height: 1,
    backgroundColor: '#eeeeee',
    width: 375,
    flex:1,
  },
  cta: {
    fontSize: 20,
    fontWeight: '700',
  },


});
module.exports =  PostList;
