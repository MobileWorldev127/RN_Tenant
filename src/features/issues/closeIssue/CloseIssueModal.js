import React, { Component } from 'react';
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	Keyboard,
	Image,
	Alert,
	ScrollView
} from 'react-native';
import FxButton from '@src/components/shared/button/FxButton';
import AddFile from '@src/components/shared/addFile/AddFile';
import AttachmentList from '@src/components/issues/attachmentList/AttachmentList';
import PropTypes from 'prop-types';
import globalStyles from '@src/styles/styles';
import styles from '@src/features/issues/closeIssue/styles';
import icons from '@src/assets/icons';
import AttachFile from '@src/components/shared/attachFile/AttachFile';
import Input from '@src/components/shared/input/Input';
import Indicator from '@src/components/shared/indicator/Indicator';
import ImageViewer from '@src/components/shared/imageViewer/ImageViewer';
import DocumentViewer from '@src/components/shared/documentViewer/DocumentViewer';
import MediaViewer from '@src/components/shared/mediaViewer/MediaViewer';
import issues from '@src/api/issues';

class CloseIssueModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			description: null,
			rating: null,
			showSources: false,
			showKeyboard: false,
			loading: false,
			attachment: [],
			selectedIndex: null
		};

		this._keyboardDidShow = this._keyboardDidShow.bind(this);
		this._keyboardDidHide = this._keyboardDidHide.bind(this);
		this.onPressCloseIssue = this.onPressCloseIssue.bind(this);
		this.onPressCancel = this.onPressCancel.bind(this);
		this.onAttach = this.onAttach.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.isDisabled = this.isDisabled.bind(this);
	}

	static propTypes = {
		id: PropTypes.string.isRequired,
		visible: PropTypes.bool.isRequired,
		onHide: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this._keyboardDidShow
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this._keyboardDidHide
		);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	_keyboardDidShow = () => {
		this.setState({ showKeyboard: true });
	};

	_keyboardDidHide = () => {
		this.setState({ showKeyboard: false });
	};

	getFileUrlByType = mime => {
		return this.state.selectedIndex || this.state.selectedIndex === 0
			? this.state.attachment[this.state.selectedIndex].mime_type &&
			  this.state.attachment[this.state.selectedIndex].mime_type.indexOf(mime) > -1
				? this.state.attachment[this.state.selectedIndex].file_url
				: null
			: null;
	};

	getFileNameByType = mime => {
		return this.state.selectedIndex || this.state.selectedIndex === 0
			? this.state.attachment[this.state.selectedIndex].mime_type &&
			  this.state.attachment[this.state.selectedIndex].mime_type.indexOf(mime) > -1
				? this.state.attachment[this.state.selectedIndex].title
				: null
			: null;
	};

	getStars = () => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<TouchableOpacity key={i} activeOpacity={1} onPress={() => this.onPressStar(i)}>
					<Image
						source={this.state.rating < i ? icons.star : icons.starFull}
						style={styles.star}
					/>
				</TouchableOpacity>
			);
		}

		return stars;
	};

	onPressCloseIssue = () => {
		this.setState({ loading: true });
		const params = {
			description: this.state.description,
			rating: this.state.rating
		};

		issues.close(this.props.id, params).then(async res => {
			const onHide = this.props.onHide;
			if (this.state.attachment.length > 0) {
				let results = await Promise.all(
					this.state.attachment.map(
						async file =>
							await this.handleUpload(file, this.props.id, res.issue_update_id)
					)
				);
			}
			this.setState({ loading: false, attachment: [], description: null, rating: null }, () =>
				onHide()
			);
		});
	};

	handleUpload = (file, issueId, updateId) => {
		return new Promise(async resolve => {
			if (file.uri) {
				await issues.uploadFile(issueId, updateId, file, result => {
					resolve(result);
				});
			}
		});
	};

	onChangeText = description => {
		this.setState({ description });
	};

	onAttach = file => {
		const attachment = this.state.attachment;
		attachment.push(file);
		this.setState({ attachment, showSources: false });
	};

	onRemove = () => {
		let attachment = this.state.attachment;
		attachment.splice(this.state.selectedIndex, 1);
		this.setState({ attachment, showSources: false, selectedIndex: null });
	};

	showError = (title = '', message = '') => {
		Alert.alert(title, message, [
			{
				text: 'Close',
				style: 'cancel'
			}
		]);
	};

	onPressStar = rating => {
		this.setState({ rating });
	};

	onPressCancel = () => {
		this.cleanData();
		this.props.onHide();
	};

	cleanData = () => {
		this.setState({
			attachment: [],
			description: '',
			rating: null,
			showSources: false
		});
	};

	isDisabled = () => {
		return (
			!this.state.description ||
			!this.state.description.trim().length ||
			this.state.rating === null
		);
	};

	render() {
		return (
			<Modal
				onRequestClose={() => {
					this.onPressCancel();
				}}
				onDismiss={() => this.cleanData()}
				transparent={true}
				animationType="slide"
				presentationStyle={'overFullScreen'}
				visible={this.props.visible}>
				<Indicator visible={this.state.loading} />
				<View style={styles.modal}>
					<ScrollView
						style={{ flex: 1 }}
						contentContainerStyle={styles.modalScroll}
						keyboardShouldPersistTaps={'always'}>
						{/* Use TouchableOpacity to enable the hiding of the
					keyboard when clicking away */}
						<TouchableOpacity
							style={styles.form}
							activeOpacity={1}
							onPress={() => {
								Keyboard.dismiss();
								this.setState({ showSources: false });
							}}>
							<View style={styles.container}>
								<View style={styles.header}>
									<Text style={[globalStyles.textBold, styles.headerText]}>
										CLOSE THIS ISSUE
									</Text>
								</View>

								<View style={styles.content}>
									<Input
										multiline
										label="Comments"
										onChange={text => this.onChangeText(text)}
										labelStyles={[globalStyles.textMedium, styles.label]}
										noLabelSpacing={true}
										styles={styles.textArea}
										returnKeyType="default"
									/>

									<AddFile
										style={styles.addFileText}
										disabled={this.state.showKeyboard}
										onPressAddFile={() =>
											this.setState({
												showSources: !this.state.showSources
											})
										}
									/>

									<View style={styles.photos}>
										{this.state.attachment.length > 0 ? (
											<View>
												<AttachmentList
													fileListStyle={styles.fileList}
													itemStyle={styles.fileItem}
													isLocalFile={true}
													attachment={this.state.attachment}
													onSelect={(file, index) =>
														this.setState({
															selectedIndex: index
														})
													}
												/>
											</View>
										) : null}
									</View>

									<Text style={[globalStyles.textMedium, styles.ratingText]}>
										How well was the issue resolved?
									</Text>

									<View style={styles.rating}>{this.getStars()}</View>

									<FxButton
										onPress={() => this.onPressCloseIssue()}
										text="CLOSE ISSUE"
										style={[
											styles.closeButton,
											this.isDisabled() ? styles.disabled : null
										]}
										disabled={this.isDisabled()}
									/>

									<TouchableOpacity
										onPress={() => this.onPressCancel()}
										activeOpacity={0.5}>
										<Text style={[globalStyles.textBold, styles.cancelButton]}>
											CANCEL
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</TouchableOpacity>
					</ScrollView>
					<AttachFile
						style={styles.attachContainer}
						visible={this.state.showSources}
						onAttach={file => this.onAttach(file)}
					/>

					<ImageViewer
						imageURI={this.getFileUrlByType('image')}
						isRemove={true}
						isReadOnly={false}
						onClose={() => this.setState({ selectedIndex: null })}
						onSelect={() => this.onRemove()}
					/>
					<DocumentViewer
						documentURI={this.getFileUrlByType('pdf')}
						name={this.getFileNameByType('pdf')}
						isRemove={true}
						isReadOnly={false}
						onClose={() => this.setState({ selectedIndex: null })}
						onSelect={() => this.onRemove()}
					/>
					<MediaViewer
						videoURI={this.getFileUrlByType('video')}
						isRemove={true}
						isReadOnly={false}
						onClose={() => this.setState({ selectedIndex: null })}
						onSelect={() => this.onRemove()}
					/>
				</View>
			</Modal>
		);
	}
}

export default CloseIssueModal;
