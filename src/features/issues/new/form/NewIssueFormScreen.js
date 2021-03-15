import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Alert, ScrollView } from 'react-native';
import globalStyles from '@src/styles/styles';
import styles from '@src/features/issues/new/form/styles';
import FxButton from '@src/components/shared/button/FxButton';
import AddFile from '@src/components/shared/addFile/AddFile';
import AttachmentList from '@src/components/issues/attachmentList/AttachmentList';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import Input from '@src/components/shared/input/Input';
import issues from '@src/api/issues';
import Indicator from '@src/components/shared/indicator/Indicator';
import AttachFile from '@src/components/shared/attachFile/AttachFile';
import ImageViewer from '@src/components/shared/imageViewer/ImageViewer';
import DocumentViewer from '@src/components/shared/documentViewer/DocumentViewer';
import MediaViewer from '@src/components/shared/mediaViewer/MediaViewer';

class NewIssueFormScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			description: '',
			attachment: [],
			selectedIndex: null,
			loading: false,
			showSources: false,
			showKeyboard: false
		};

		this.handleUpload = this.handleUpload.bind(this);
		this._keyboardDidShow = this._keyboardDidShow.bind(this);
		this._keyboardDidHide = this._keyboardDidHide.bind(this);
	}

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

	onChangeTitleText = title => {
		this.setState({ title });
	};

	onChangeDescriptionText = description => {
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

	onPressRemoveFile = () => {
		this.setState({
			file: {}
		});
	};

	onPressReportIssue = async () => {
		const { title, description } = this.state,
			category = this.props.navigation.state.params.item.issue_category;

		let issue = {
			type: `${this.props.navigation.state.params.item.issue_type_code}`,
			title,
			description
		};

		if (category) issue.category = category;

		this.setState({ loading: true });

		try {
			const newIssue = await issues.create(issue);
			if (newIssue.issue_id) {
				if (this.state.attachment.length > 0) {
					let results = await Promise.all(
						this.state.attachment.map(
							async file => await this.handleUpload(file, newIssue.issue_id)
						)
					);
				}

				this.showCreatedMessage(() => {
					this.setState({ loading: false }, () =>
						this.props.navigation.pop(this.props.navigation.state.params.pop || 2)
					);
				});
			} else {
				if (newIssue.model_state.includes('maximum length')) {
					this.showErrorMessage('The issue title cannot be longer than 80 characters');
				} else {
					this.showErrorMessage('There was a problem, please try again');
				}
			}
		} catch (error) {
			throw error;
		}
	};

	handleUpload = (file, issueId) => {
		return new Promise(async resolve => {
			if (file.uri) {
				await issues.uploadFile(issueId, null, file, result => {
					resolve(result);
				});
			}
		});
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

	onTouchableOpacityPress = () => {
		Keyboard.dismiss();
		this.setState({
			showSources: false
		});
	};

	showCreatedMessage = callback => {
		Alert.alert('New issue', 'The new issue has been submitted', [
			{
				text: 'Close',
				onPress: () => callback()
			}
		]);
	};

	showErrorMessage = (title = '', msg = '') => {
		Alert.alert(title, msg, [
			{
				text: 'Close',
				onPress: () => {
					this.setState({ loading: false }, () =>
						this.props.navigation.pop(this.props.navigation.state.params.pop || 2)
					);
				}
			}
		]);
	};

	render() {
		return (
			/* Use TouchableOpacity to enable the hiding of the
				keyboard when clicking away */
			<ViewBackground styles={styles.screen}>
				<Indicator visible={this.state.loading} />
				<View style={{ flex: 1 }}>
					<ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'always'}>
						<TouchableOpacity
							activeOpacity={1}
							style={{ flex: 1, paddingLeft: 20 }}
							onPress={() => this.onTouchableOpacityPress()}>
							<View style={[globalStyles.container, styles.container]}>
								<Text
									style={[
										styles.heading,
										globalStyles.issueTitle,
										globalStyles.fontLight
									]}>
									Describe your issue
								</Text>

								<Input
									label="Issue Title"
									onChange={text => this.onChangeTitleText(text)}
									labelStyles={styles.title}
									styles={styles.titleInput}
									returnKeyType="default"
								/>

								<Input
									multiline
									label="Issue Description"
									onChange={text => this.onChangeDescriptionText(text)}
									labelStyles={styles.description}
									styles={styles.descriptionInput}
									returnKeyType="default"
								/>

								<AddFile
									file={this.state.file}
									disabled={this.state.showKeyboard}
									onPressAddFile={() => {
										this.setState({ showSources: !this.state.showSources });
									}}
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

								<FxButton
									onPress={() => this.onPressReportIssue()}
									text="REPORT ISSUE"
									style={styles.reportIssue}
									disabled={
										this.state.title.trim().length < 1 ||
										this.state.description.trim().length < 1
									}
								/>
							</View>
						</TouchableOpacity>
					</ScrollView>

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

					<AttachFile
						style={styles.attachContainer}
						visible={this.state.showSources}
						onAttach={file => this.onAttach(file)}
					/>
				</View>
			</ViewBackground>
		);
	}
}

export default NewIssueFormScreen;
