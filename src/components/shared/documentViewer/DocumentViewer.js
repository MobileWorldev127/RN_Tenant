import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import PropTypes from 'prop-types';
import PDFViewer from '@src/components/shared/pdfViewer/PdfViewer';

import globalStyles from '@src/styles/styles';
import styles from '@src/components/shared/documentViewer/styles';

export default class DocumentViewer extends Component {
	static propTypes = {
		documentURI: PropTypes.string,
		name: PropTypes.string,
		isRemove: PropTypes.bool,
		isReadOnly: PropTypes.bool,
		onClose: PropTypes.func,
		onSelect: PropTypes.func
	};

	onClose = () => {
		// HACK:
		// The setTimeout is a hack for android
		// this is because in the java code a function is called that needs to end
		// before we destory the pdf
		setTimeout(() => {
			this.props.onClose()
		}, 200);
	}

	onSelect = () => {
		// HACK:
		// The setTimeout is a hack for android
		// this is because in the java code a function is called that needs to end
		// before we destory the pdf
		setTimeout(() => {
			this.props.onSelect()
		}, 200);
	}

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={!!this.props.documentURI}
				onRequestClose={() => this.props.onClose()}>
				<View style={styles.container}>
					<Text
						suppressHighlighting
						style={[globalStyles.subTitleText, styles.text, styles.close]}
						onPress={this.onClose}>
						{'+'}
					</Text>
					{!!this.props.documentURI ? (
						<PDFViewer
							source={this.props.documentURI}
							name={this.props.name}
							disableDownload={!this.props.isReadOnly}
							onDownload={async callback => {
								await this.props.onClose();
								setTimeout(() => callback && callback(), 100);
							}}
						/>
					) : null}
					{!this.props.isReadOnly ? (
						<Text
							style={[globalStyles.advice, styles.text, styles.cancel]}
							onPress={this.onClose}>
							{'Cancel'}
						</Text>
					) : null}
					{!this.props.isReadOnly ? (
						<Text
							style={[globalStyles.advice, styles.text, styles.select]}
							onPress={this.onSelect}>
							{this.props.isRemove ? 'Remove' : 'Choose'}
						</Text>
					) : null}
				</View>
			</Modal>
		);
	}
}
