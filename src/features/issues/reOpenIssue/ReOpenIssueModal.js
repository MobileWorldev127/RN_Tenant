import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity, Keyboard, Alert } from 'react-native';
import FxButton from '@src/components/shared/button/FxButton';
import AddFile from '@src/components/shared/addFile/AddFile';
import AttachmentList from '@src/components/issues/attachmentList/AttachmentList';
import PropTypes from 'prop-types';
import globalStyles from '@src/styles/styles';
import styles from '@src/features/issues/reOpenIssue/styles';
import AttachFile from '@src/components/shared/attachFile/AttachFile';
import Input from '@src/components/shared/input/Input';
import Indicator from '@src/components/shared/indicator/Indicator';
import ImageViewer from '@src/components/shared/imageViewer/ImageViewer';
import DocumentViewer from '@src/components/shared/documentViewer/DocumentViewer';
import MediaViewer from '@src/components/shared/mediaViewer/MediaViewer';
import issues from '@src/api/issues';
import { update_types } from '@src/features/issues/constants/issuesStatuses';
import { ISSUE_RE_OPEN_ERROR } from '@src/api/constants';

class ReOpenIssueModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			description: null,
			attachment: [],
			selectedIndex: null,
			showSources: false,
			showKeyboard: false,
			loading: false
		};

		this._keyboardDidShow = this._keyboardDidShow.bind(this);
		this._keyboardDidHide = this._keyboardDidHide.bind(this);
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

	onPressReOpenIssue = () => {
		this.setState({ loading: true });

		const issue = {
			type: update_types.RE_OPEN,
			description: this.state.description
		};

		issues.updateIssue(this.props.id, issue).then(async res => {
			if (res.code && res.code === ISSUE_RE_OPEN_ERROR) {
				this.showError('Update Error', res.model_state);
			} else {
				const onHide = this.props.onHide;

				if (this.state.attachment.length > 0) {
					let results = await Promise.all(
						this.state.attachment.map(
							async file =>
								await this.handleUpload(file, this.props.id, res.issue_update_id)
						)
					);
				}
				this.setState({ loading: false, attachment: [], description: null }, () =>
					onHide()
				);
			}
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

	showError = (title = '', msg = '') => {
		Alert.alert(title, msg, [
			{
				text: 'Close',
				onPress: () => {
					this.setState({ loading: false });
				}
			}
		]);
	};

	cleanData = () => {
		this.setState({
			attachment: [],
			description: '',
			file: {},
			showSources: false,
			loading: false
		});
	};

	isDisabled = () => {
		return !this.state.description || !this.state.description.trim().length;
	};

	render() {
		return (
			<Modal
				onRequestClose={() => {
					this.cleanData();
					this.props.onHide();
				}}
				onDismiss={() => this.cleanData()}
				transparent={true}
				animationType="slide"
				presentationStyle={'overFullScreen'}
				visible={this.props.visible}>
				{/* Use TouchableOpacity to enable the hiding of the
					keyboard when clicking away */}
				<TouchableOpacity
					style={styles.modal}
					activeOpacity={1}
					onPress={() => {
						Keyboard.dismiss();
						this.setState({ showSources: false });
					}}>
					<Indicator visible={this.state.loading} />
					<View style={styles.container}>
						<View style={styles.header}>
							<Text style={[globalStyles.textBold, styles.headerText]}>
								RE OPEN THIS ISSUE
							</Text>
						</View>

						<View style={styles.modalContent}>
							<Input
								multiline
								label="Comments"
								onChange={text => this.onChangeText(text)}
								labelStyles={globalStyles.textMedium}
								styles={styles.textArea}
								returnKeyType="default"
							/>

							<AddFile
								style={styles.addFileText}
								disabled={this.state.showKeyboard}
								onPressAddFile={() =>
									this.setState({ showSources: !this.state.showSources })
								}
							/>

							<View style={styles.photos}>
								{this.state.attachment.length > 0 ? (
									<View>
										<AttachmentList
											fileListStyle={styles.fileList}
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

							<FxButton
								onPress={() => this.onPressReOpenIssue()}
								text="RE OPEN ISSUE"
								style={[
									styles.reOpenButton,
									this.isDisabled() ? styles.disabled : null
								]}
								disabled={this.isDisabled()}
							/>

							<TouchableOpacity
								onPress={() => {
									this.cleanData();
									this.props.onHide();
								}}
								activeOpacity={0.5}>
								<Text style={[globalStyles.textBold, styles.cancelButton]}>
									CANCEL
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableOpacity>
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
			</Modal>
		);
	}
}

export default ReOpenIssueModal;
