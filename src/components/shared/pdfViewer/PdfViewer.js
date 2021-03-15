import React from 'react';
import { View, Text, Platform, Alert, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Pdf from 'react-native-pdf';
import Indicator from '@src/components/shared/indicator/Indicator';
import RNFetchBlob from 'rn-fetch-blob';

import styles from '@src/components/shared/pdfViewer/styles';
import icons from '@src/assets/icons';

export default class PDFViewer extends React.Component {
	static propTypes = {
		source: PropTypes.string,
		name: PropTypes.string,
		disableDownload: PropTypes.bool,
		onDownload: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.state = {
			source: '',
			name: '',
			hideNote: false,
			disableDownload: false,
			loading: false
		};

		this.onDownload = this.onDownload.bind(this);
	}

	componentDidMount() {
		const source =
			this.props.navigation &&
			this.props.navigation.state.params &&
			this.props.navigation.state.params.source
				? this.props.navigation.state.params.source
				: this.props.source;

		const name =
			this.props.navigation &&
			this.props.navigation.state.params &&
			this.props.navigation.state.params.name
				? this.props.navigation.state.params.name.replace('.pdf', '')
				: this.props.name
					? this.props.name.replace('.pdf', '')
					: '';

		this.setState({
			source,
			name,
			disableDownload: this.props.disableDownload,
			loading: !!source
		});

		setTimeout(() => {
			this.setState({ hideNote: true });
		}, 3800);
	}

	onDownload = async () => {
		try {
			if (this.state.loading) {
				this.showErrorMessage('The download is in progress', '', true);
				return;
			}

			if (this.state.source) {
				this.setState({ loading: true });

				const name =
					(this.state.name ? this.state.name : (Math.random() * 1000) | 0) + '.pdf';

				const res = await RNFetchBlob.config({
					fileCache: true,
					appendExt: 'pdf',
					addAndroidDownloads: {
						useDownloadManager: true,
						title: name,
						notification: false,
						description: 'Downloading document',
						mime: 'application/pdf',
						path: `${RNFetchBlob.fs.dirs.DownloadDir}/${name}` // this is the path where your downloaded file will live in
					}
				}).fetch('GET', this.state.source);

				if (res) {
					if (Platform.OS === 'ios') {
						if (res.info().status === 200) {
							this.setState({ loading: false }, () => {
								if (this.props.onDownload) {
									this.props.onDownload(() =>
										RNFetchBlob.ios.previewDocument(res.path())
									);
								} else {
									RNFetchBlob.ios.previewDocument(res.path());
								}
							});
						} else {
							this.showErrorMessage('File download failed');
						}
					} else {
						this.showDownloadedMessage();
					}
				} else {
					this.showErrorMessage('There was a problem, please try again');
				}
			}
		} catch (e) {
			throw e;
		}
	};

	showDownloadedMessage = () => {
		Alert.alert('File downloaded successfully', '', [
			{
				text: 'Close',
				onPress: () =>
					this.setState({ loading: false }, () => {
						this.props.onDownload && this.props.onDownload();
					})
			}
		]);
	};

	showErrorMessage = (title = '', msg = '', noStateSettting = false) => {
		Alert.alert(title, msg, [
			{
				text: 'Close',
				onPress: () => {
					!noStateSettting && this.setState({ loading: false });
				}
			}
		]);
	};

	render() {
		return (
			<View style={styles.container}>
				<Indicator visible={this.state.loading} />
				{!this.state.hideNote &&
					Platform.OS === 'ios' && (
						<View style={styles.zoomNote}>
							<Text style={styles.zoomNoteText}>Double tap to zoom in</Text>
						</View>
					)}

				<Pdf
					source={{ uri: this.state.source }}
					onLoadComplete={(numberOfPages, filePath) => {
						this.setState({ loading: false });
						console.log(`number of pages: ${numberOfPages}`);
					}}
					onPageChanged={(page, numberOfPages) => {
						console.log(`current page: ${page}`);
					}}
					onError={error => {
						console.log(error);
					}}
					style={styles.pdf}
				/>
				{!this.state.disableDownload ? (
					<TouchableOpacity
						style={styles.downloadContainer}
						disabled={this.state.loading}
						onPress={() => this.onDownload()}>
						<Image
							style={styles.download}
							source={icons.download}
							resizeMode={'contain'}
						/>
					</TouchableOpacity>
				) : null}
			</View>
		);
	}
}
