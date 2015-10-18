/**
 * CreateView IOS
 */
'use strict';

var React = require('react-native');
var {
  Component,
  StyleSheet,
  Animated,
  Easing
} = React;

class FadeInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // fadeAnim: new Animated.Value(0),
      x: new Animated.Value(400) // init opacity 0
    };
  }

  componentDidMount() {
    // Animated.parallel([   
      // Animated.timing(          // Uses easing functions
      //   this.state.fadeAnim,    // The value to drive
      //   {toValue: 1, delay: 250},           // Configuration
      // ),
      Animated.timing(
        this.state.x, 
        {
          toValue: 0,
          duration: 500,
          easing: Easing.bezier(0.2, 0.0, 0.2, 1),
          delay: 50*this.props.delay}
      ).start();                // Don't forget start!
  }

  componentWillUnmount() {
    // Animated.parallel([   
      // Animated.timing(          // Uses easing functions
      //   this.state.fadeAnim,    // The value to drive
      //   {toValue: 1, delay: 250},           // Configuration
      // ),
      Animated.timing(
        this.state.x, 
        {
          toValue: 400,
          duration: 300,
          easing: Easing.bezier(0.2, 0.0, 0.2, 1),
          delay: 50*this.props.position}
      ).start();                // Don't forget start!
  }

  render() {
    return (
      <Animated.View          // Special animatable View
        style={{
          // opacity: this.state.fadeAnim,
           transform: [                        // `transform` is an ordered array
            {translateX: this.state.x},  // Map `bounceValue` to `scale`
          ]
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

module.exports = FadeInView;
