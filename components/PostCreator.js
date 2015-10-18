/**
 * CreateView IOS
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
  TouchableHighlight,
  StyleSheet
} = React;
var FadeInView = require('./FadeInView');
var CONFIG = require('../config.js');
var moment = require('moment-twitter');

class PostCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.post.id,
      url: this.props.post.url,
      title: this.props.post.title,
      content: this.props.post.content,
      image: 'http://turbo.paulstamatiou.com/assets/gray-squircles-loader.gif',
      author: this.props.post.author,
      published: false,
      publishedAt: null,
      isFocused: this.props.isFocused,
    };
    this.fetchData = this._fetchData.bind(this);
    if (!this.props.isFocused) {
      this.fetchData();
    }
  }

  _fetchData() {
    var enc = 'http://api.embed.ly/1/extract?key=' + CONFIG.EMBEDLY +
    '&url=' + encodeURIComponent(this.state.url);
    fetch(enc)
     .then((response) => response.text())
     // .then((responseText) => {
       // var res = JSON.parse(responseText);
       //  console.log(res);
       // reconstruct image url to crop
       // var img = 'http://api.embed.ly/1/display/crop?key=' + CONFIG.EMBEDLY +
       // '&url=' + encodeURIComponent(res.images[0]['url']) + '&width=472&height=710';

       this.setState({
          image: res.images[0]['url'],
          // content: res.description,
          // author: res.provider_name,
          // title: res.title,
        });
     })
     .catch((error) => {
       console.warn(error);
     }).done();
  }
  /**
   * Changes focus state
   */
  _onFocus() {
    this.setState({isFocused: true});
  }

  /**
   * Publishes current item to ParseDB.
   */
  _publish(){
    var now = new Date();
    var update;
    if (this.state.id === '') {
      // New Post!
      update = ParseReact.Mutation.Create('Posts', {
        url: this.state.url,
        content: this.state.content,
        image: this.state.image,
        author: this.state.author,
        published: true,
        publishedAt: now,
      });
    } else {
      // Update a Post.
      update = ParseReact.Mutation.Set(this.state.id, {
        url: this.state.url,
        content: this.state.content,
        image: this.state.image,
        author: this.state.author,
        published: true,
        publishedAt: now,
      });
    }
    //
    update.dispatch();

  }

  render() {
    return (
      <View style={styles.container}>
        <FadeInView delay={0}>
          <Text style={styles.label}>ENTER OR PASTE URL</Text>
        </FadeInView>
        <FadeInView delay={1.5}>
          <TextInput
            style={styles.input}
            autoFocus={this.props.isFocused}
            onChangeText={(text) => this.setState({url: text})}
            defaultValue={this.props.post.url}
            value={this.state.url}
            returnKeyType={'go'}
            clearButtonMode={'always'}
            selectTextOnFocus={'true'}
            onSubmitEditing={this._fetchData.bind(this)}
          />
        </FadeInView>
        <FadeInView delay={2.7}>
          <View style={styles.postTop}>
            <Text style={styles.title}>{this.state.title}</Text>
            <Text style={styles.content}>{this.state.content}</Text>
          </View>
          <Image style={styles.thumb} source={{uri: this.state.image}}/>
          <View style={styles.postBottom}>
            <Text style={styles.author}>{this.state.author} • Now</Text>
          </View>
        </FadeInView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#f2f2f2',
  },
  postTop: {
    marginTop: 20,
    padding: 15,
    width: 355,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: '#eaeaea',
    backgroundColor: '#ffffff',
  },
  postBottom: {
    padding: 15,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderColor: '#eaeaea',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 18,
    color: '#111111',
    flex: 4,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    fontWeight: '700',
    fontFamily: 'Circular Air',
  },
  content: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '300',
    fontFamily: 'Circular Air',
  },
  thumb: {
    width: 355,
    height: 236,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  author: {
    color: '#b7b7b7',
    fontWeight: '200',
    fontFamily: 'Circular Air',
  },
  label:{
    fontWeight: '200',
    fontFamily: 'Circular Air',
    color: '#183E63',
    marginBottom: 4,
  },
  input: {
    fontWeight: '700',
    fontFamily: 'Circular Air',
    fontSize: 16,
    color: '#111111',
    backgroundColor: '#ffffff',
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 2,
  },
});

module.exports = PostCreator;
