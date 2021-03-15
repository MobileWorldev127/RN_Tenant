import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native';

import { colors } from '@src/styles/colors';
import globalStyles from '@src/styles/styles';
import PropTypes from 'prop-types';
import styles from '@src/components/shared/input/styles';

class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activedInput: null,
			text: ''
		};
	}

	static propTypes = {
		labelStyles: PropTypes.any,
		styles: PropTypes.any,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		type: PropTypes.string,
		returnKeyType: PropTypes.string,
		label: PropTypes.string,
		placeholder: PropTypes.string,
		secureTextEntry: PropTypes.bool,
		multiline: PropTypes.bool,
		hideActive: PropTypes.bool,
		noLabelSpacing: PropTypes.bool
	};

	onChange(text) {
		this.setState({ text }, () => this.props.onChange(text));
	}

	getValue() {
		return this.state.text;
	}

	setValue(text) {
		this.setState({ text });
	}

	setFocus() {
		this.input.focus();
	}

	render() {
		return (
			<View style={styles.container}>
				{this.props.label ? (
					!this.props.noLabelSpacing ? (
						<Text style={[globalStyles.label, this.props.labelStyles]}>
							{' '}
							{this.props.label}{' '}
						</Text>
					) : (
						<Text style={[globalStyles.label, this.props.labelStyles]}>
							{this.props.label}
						</Text>
					)
				) : null}
				<TextInput
					autoCorrect={false}
					ref={input => {
						this.input = input;
					}}
					style={[
						globalStyles.textInput,
						this.props.styles,
						this.props.multiline && styles.multiline,
						!this.props.hideActive ? this.state.activedInput : null
					]}
					onChangeText={value => this.onChange(value)}
					keyboardType={this.props.type || 'default'}
					onFocus={() => {
						this.setState({
							activedInput: styles.activedInput
						});
						if (this.props.onFocus) {
							this.props.onFocus();
						}
					}}
					onBlur={() =>
						this.setState({
							activedInput: null
						})
					}
					value={this.state.text}
					placeholder={this.props.placeholder}
					underlineColorAndroid={colors.transparent}
					returnKeyType={this.props.returnKeyType || 'go'}
					secureTextEntry={this.props.secureTextEntry}
					multiline={this.props.multiline}
				/>
			</View>
		);
	}
}

export default Input;
