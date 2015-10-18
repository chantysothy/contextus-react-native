/**
 * PostAfterMath IOS
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

class PostAftermath extends Component {
  constructor(props) {
    super(props)
  }

  render() {
  	return (
        <View style={styles.container}>
         <FadeInView>
  		      <Text style={styles.blurb}>Nice! You Published a Post.</Text>
          </FadeInView>
        </View>
  	);
  }
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	blurb: {
		fontFamily:'Circular Air',
		fontWeight: '700',
		fontSize: 30,
	}
});

module.exports = PostAftermath;