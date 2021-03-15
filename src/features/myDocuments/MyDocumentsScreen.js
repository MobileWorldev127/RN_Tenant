import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Routes } from '@src/navigation/screenNames';
import ViewBackground from '@src/components/shared/viewBackground/ViewBackground';
import ArrowButton from '@src/components/shared/arrowButton/ArrowButton';
import documents from '@src/api/documents';

import globalStyles from '@src/styles/styles';
import styles from '@src/features/myDocuments/styles';

export default class MyDocumentsScreen extends Component {

	constructor(props) {
		super(props);

		this.state = {
			documents: []
		}
	}

	async componentDidMount() {
		this.setState({
			documents: await documents.getDocuments()
		})
	}

	onPressMenuItem = async (document) => {
		const sourceLink = await documents.getDocumentLink(document.document_id);
		this.props.navigation.navigate(Routes.PDF_VIEWER, {
			source: sourceLink,
			name: document.document_name
		});
	}


	render() {
		return (
			<ViewBackground>
				<View style={styles.container}>
					{this.state.documents.map((document, index) =>
						<View
							style={styles.button}
							key={document.document_id}
						>
							<ArrowButton
								index={index}
								id={document.document_id}
								title={document.document_name}
								description={document.document_description}
								arrow={true}
								click={() => this.onPressMenuItem(document)}
							/>
						</View>
					)}
				</View>
			</ViewBackground>
		)

	}
}
