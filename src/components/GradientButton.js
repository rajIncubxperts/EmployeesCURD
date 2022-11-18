import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export class GradientButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onClick}>
        <View
          style={{
            width: this.props.width,
            height: this.props.height,
            alignSelf: this.props.alignSelf,
          }}>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#7467DC', '#B69EF6']}
            style={styles.gradientButton}>
            <Text style={styles.buttonText}>{this.props.label}</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  }
}

export default GradientButton;

const styles = StyleSheet.create({
  gradientButton: {
    marginTop: 40,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderRadius: 25,
    shadowRadius: 25,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      height: 2,
      width: 10,
    },
    shadowColor: '#4345472E',
    elevation: 8,
  },
  buttonText: {
    height: '100%',
    width: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontFamily: 'Raleway-BoldItalic',
    fontSize: 17,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
});
