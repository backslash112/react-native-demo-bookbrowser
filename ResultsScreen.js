'use strict';

var React = require('react-native');
var BookDetails = require('./BookDetails');
var Modal = require('react-native-modal');

var {
	StyleSheet,
	View,
	Text,
	ListView,
	Image,
	TouchableHighlight,
	TouchableOpacity,
} = React;

var buildUrl = function(g) {
	var url = 'https://www.gooogleapis.com/books/v1/volumes?q=' 
	+ encodeURIComponent(g) 
	+ '&langRestrict=en&maxResults=40';
	console.log(url);
	return url;
};

var ResultsScreen = React.createClass({
	
	getInitialState: function() {
		return {
			isLoading: true,
			showErrorModal: false,
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
		};
	},

	componentDidMount: function() {
		this.fetchResults(this.props.searchPhrase);
	},

	fetchResults: function(searchPhrase) {
		fetch(buildUrl(searchPhrase))
		.then(response => response.json())
		.then(jsonData => {
			setTimeout(() => {
				this.setState({ 
					isLoading: false,
					dataSource: this.state.dataSource.cloneWithRows(jsonData.items),
				});
			}, 2000);
			console.dir(jsonData);
		})
		.catch(error => {
			this.setState({
				showErrorModal: true
			});
		});
	},

	render: function() {
		if (this.state.isLoading) {
			return this.renderLoadingMessage();
		} else {
			return this.renderResults();
		}
	},
				
	// customCloseButton={this.renderModalButtons}
	renderLoadingMessage: function() {
		return (
			<View style={styles.container}>
				<Text style={styles.label}>
					Searching for {this.props.searchPhrase}.
				</Text>
				<Text style={styles.label}>
					Please wait...{this.state.isLoading ? "true" : "false"}
				</Text>
				<Modal isVisible={this.state.showErrorModal}>
					<Text style={styles.modalBody}> A network error occurred! </Text>
				</Modal>
			</View>
			);
	},

	renderModalButtons: function() {
		return (
			<View style={styles.modalButtonsContanier}>
				<TouchableOpacity onPress={this.goback}>
					<View style={styles.modalButton}>
						<Text style={styles.modalButtonText}>
							&lt; Go back
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.retry}> 
					<View style={styles.modalButton}>
						<Text style={styles.modalButtonText}>
							&#8635 Retry
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			);
	},

	renderResults: function() {
		return (
			<ListView
			dataSource={this.state.dataSource}
			renderRow={this.renderBook} />
			);
	},

	renderBook: function(book) {
		return (
			<TouchableHighlight onPress={() => 
				this.showBookDetails(book) }>
				<View style={styles.row}>
					<Image style={styles.thumbnail}
						source={{
							uri: book.volumeInfo.imageLinks.smallThumbnail
						}} />
					<View style={styles.rightContainer}>
						<Text style={styles.title}> {book.volumeInfo.title} </Text>
						<Text style={styles.subtitle}> {book.volumeInfo.subtitle} </Text>
					</View>
				</View>
			</TouchableHighlight>
			);
	},
	showBookDetails: function(book) {
		this.props.navigator.push({
			title: book.volumeInfo.title,
			component: BookDetails,
			passProps: {
				'book': book
			}
		});
	},
	goback: function() {
		this.setState({
			showErrorModal: false
		});
		this.props.navigator.pop();
	},
	retry: function() {
		this.setState({
			showErrorModal: false
		});
		this.fetchResults();
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#5ac8fa',
	},
	label: {
		fontSize: 24,
		fontWeight: 'normal',
		color: '#fff',
	},
	ListView: {

	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#5ac8fa',
		paddingRight: 20,
		marginTop: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
	},
	subtitle: {
		fontSize: 16,
		fontWeight: 'normal',
		color: '#fff',
	},
	thumbnail: {
		width: 70,
		height: 108,
		marginRight: 16,
	},
	rightContainer: {
		flex: 1,

	},
	modalButtonsContanier: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		top: 240,
	},
	modalBody: {
		fontSize: 18,
	},
	modalButton: {
		borderColor: '#ffffff',
		borderWidth: 1,
		borderRadius: 4,
		marginLeft: 20,
		marginRight: 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
	},
	modalButtonText: {
		fontSize: 18,
		color: '#ffffff',
	},

});

module.exports = ResultsScreen;