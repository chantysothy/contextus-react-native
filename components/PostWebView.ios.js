/**
 * PostWebView IOS
 */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

class PostWebView extends React.Component{

    render() {
      return (
        <View style={styles.container}>
          <WebView
            url={this.props.post.url}
            renderLoading={this.renderLoading}
            renderError={this.renderError}
            startInLoadingState={true}
            />
          {/*}  <View style={styles.action}>
              <TouchableHighlight>
                <Text style={styles.publish}>Publish</Text>
              </TouchableHighlight>
            </View>*//*}  <View style={styles.action}>
              <TouchableHighlight>
            </View>*/}
        </View>
      );
    }

    renderError(errorDomain, errorCode, errorDesc) {
      return (
        <View style={styles.container}>
          <Text>
            Error loading page
          </Text>
          <Text >
            {'Domain: ' + errorDomain}
          </Text>
          <Text>
            {'Error Code: ' + errorCode}
          </Text>
          <Text>
            {'Description: ' + errorDesc}
          </Text>
        </View>
      );
    }

    renderLoading() {
      return (
        <View style={styles.loadingView}>
          <ActivityIndicatorIOS
            color='#888888'
            size='small'/>
        </View>
      );
    }
  }

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  loadingView:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  publish: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 4,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '700',
    backgroundColor: '#183E63',
  },
});
module.exports = PostWebView;
