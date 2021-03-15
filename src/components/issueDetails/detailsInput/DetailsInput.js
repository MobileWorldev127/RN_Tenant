import React, { Component } from 'react';
import { View, Image, Keyboard, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { update_types } from '@src/features/issues/constants/issuesStatuses';
import styles from '@src/components/issueDetails/detailsInput/styles';
import icons from '@src/assets/icons';
import Input from '@src/components/shared/input/Input';
import AttachFile from '@src/components/shared/attachFile/AttachFile';
import AttachmentList from '@src/components/issues/attachmentList/AttachmentList';
import ImageViewer from '@src/components/shared/imageViewer/ImageViewer';
import DocumentViewer from '@src/components/shared/documentViewer/DocumentViewer';
import MediaViewer from '@src/components/shared/mediaViewer/MediaViewer';

export default class DetailsInput extends Component {
	static propTypes = {
		onSend: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.state = {
			showSources: false,
			showSend: false,
			attachment: [],
			selectedIndex: null
		};
	}

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

	onInputChange = item => {
		if (
			(item.trim().length > 0 && !this.state.showSend) ||
			(item.trim().length === 0 && this.state.showSend)
		) {
			this.setState({ showSend: item.trim().length > 0 });
		}
	};

	onAttach = file => {
		const attachment = this.state.attachment;
		attachment.push(file);
		this.setState({ attachment, showSources: false }, () => this.inputField.setFocus());
	};

	onRemove = () => {
		let attachment = this.state.attachment;
		attachment.splice(this.state.selectedIndex, 1);
		this.setState({ attachment, showSources: false, selectedIndex: null }, () =>
			this.inputField.setFocus()
		);
	};

	onSend = async () => {
		if (this.state.showSend) {
			const message = {
				type: update_types.TENANT_COMMENT,
				description: this.inputField.getValue()
			};
			const attachmentClone = this.state.attachment.slice();

			this.setState({ showSources: false, showSend: false, attachment: [] }, () =>
				this.inputField.setValue('')
			);

			await this.props.onSend(message, attachmentClone);
		}
	};

	render() {
		return (
			<View>
				<View style={styles.attachContainer}>
					<AttachFile
						visible={this.state.showSources}
						onAttach={file => this.onAttach(file)}
					/>
				</View>

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

				<View style={styles.container}>
					<View
						style={[
							styles.addButton,
							this.state.showSources ? styles.addButtonSelected : null
						]}>
						<TouchableOpacity
							onPress={() => {
								Keyboard.dismiss();
								this.setState({ showSources: !this.state.showSources });
							}}>
							<Image style={styles.addIcon} source={icons.whitePlus} />
						</TouchableOpacity>
					</View>

					<View style={styles.inputFieldContainer}>
						<Input
							multiline
							returnKeyType="default"
							ref={input => (this.inputField = input)}
							styles={styles.inputField}
							hideActive={true}
							placeholder={'Update the issue'}
							onFocus={() => this.setState({ showSources: false })}
							onChange={item => this.onInputChange(item || '')}
						/>
					</View>
					<View style={styles.sendContainer}>
						<View style={styles.sendButton}>
							<TouchableOpacity
								onPress={() => this.onSend()}
								disabled={!this.state.showSend}>
								<Image
									style={styles.sendIcon}
									source={this.state.showSend ? icons.send : icons.sendDisabled}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>

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
		);
	}
}
