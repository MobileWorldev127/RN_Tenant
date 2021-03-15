import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import PDFViewer from '@src/components/shared/pdfViewer/PdfViewer';
import globalStyles from '@src/styles/styles';
import styles from '@src/features/documentCarousel/styles';

export default class DocumentCarouselScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			index: 0,
			documents: []
		};
	}

	componentDidMount() {
		if (this.props.navigation.state.params && this.props.navigation.state.params.documents) {
			this.setState({
				documents: this.props.navigation.state.params.documents
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Swiper
					containerStyle={styles.gesture}
					paginationStyle={styles.pagination}
					loop={false}
					dotColor={'gray'}
					activeDotColor={'white'}
					nextButton={
						<Text style={[globalStyles.fontDefault, styles.pageButton]}>›</Text>
					}
					prevButton={
						<Text style={[globalStyles.fontDefault, styles.pageButton]}>‹</Text>
					}
					onIndexChanged={index => this.setState({ index })}
					showsButtons={true}>
					{this.state.documents
						.filter(document => document.file_url)
						.map((document, index) => {
							return this.state.index === index ? (
								<PDFViewer key={index} source={document.file_url} />
							) : null;
						})}
				</Swiper>
			</View>
		);
	}
}
