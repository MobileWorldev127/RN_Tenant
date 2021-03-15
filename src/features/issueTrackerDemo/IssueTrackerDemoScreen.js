import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions, Animated, Text } from 'react-native';
import { Routes } from '@src/navigation/screenNames';
import FxButton from '@src/components/shared/button/FxButton';
import globalStyles from '@src/styles/styles';
import styles from '@src/features/issueTrackerDemo/styles';
import { colors } from '@src/styles/colors';
import images from '@src/assets/images';

const { width } = Dimensions.get('window');

const steps = [
	{
		image: images.howToIssueTracker1
	},
	{
		image: images.howToIssueTracker2
	},
	{
		image: images.howToIssueTracker3
	},
	{
		image: images.howToIssueTracker4
	},
	{
		image: images.howToIssueTracker5
	},
	{
		image: images.howToIssueTracker6
	},
	{
		image: images.howToIssueTracker7
	}
];

class IssueTrackerDemoScreen extends Component {
	constructor(props) {
		super(props);

		this.scrollX = new Animated.Value(0); // this will be the scroll location of our ScrollView
	}

	onPressBackHome = () => {
		this.props.navigation.pop();
	};

	render() {
		let position = Animated.divide(this.scrollX, width);

		return (
			<View style={styles.slideShow}>
				<ScrollView
					horizontal={true}
					pagingEnabled={true} // animates ScrollView to nearest multiple o it's own width
					showsHorizontalScrollIndicator={false}
					onScroll={Animated.event(
						// Animated.event returns a function that takes an array where the first element...
						[{ nativeEvent: { contentOffset: { x: this.scrollX } } }] // ... is an object that maps any nativeEvent prop to a variable
					)} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
					scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
				>
					{steps.map((step, i) => {
						return (
							<View key={i} style={{ width }}>
								<View style={styles.imageContainer}>
									<Image source={step.image} style={[styles.image, { width }]} />
								</View>

								{steps.length === i + 1 && (
									<FxButton
										style={styles.button}
										text="DONE"
										onPress={this.onPressBackHome}
									/>
								)}
							</View>
						);
					})}
				</ScrollView>

				<View style={styles.progress}>
					{steps.map((_, i) => {
						// the _ just means we won't use that parameter
						let backgroundColor = position.interpolate({
							inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001], // only when position is ever so slightly more than +/- 0.5 of a dot's index...
							outputRange: [
								colors.altoSolid,
								colors.primary,
								colors.primary,
								colors.primary,
								colors.altoSolid
							], // ... is when the backgroundColor changes
							extrapolate: 'clamp'
						});

						return (
							<Animated.View
								key={i}
								style={[{ backgroundColor }, styles.progressDot]}
							/>
						);
					})}
				</View>
			</View>
		);
	}
}

export default IssueTrackerDemoScreen;
