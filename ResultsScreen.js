'use strict';

var React = require('react-native');
var BookDetails = require('./BookDetails');

var {
	StyleSheet,
	View,
	Text,
	ListView,
	Image,
	TouchableHighlight,
} = React;

var buildUrl = function(g) {
	var url = 'https://www.googleapis.com/books/v1/volumes?q=' 
	+ encodeURIComponent(g) 
	+ '&langRestrict=en&maxResults=40';
	console.log(url);
	return url;
};

var ResultsScreen = React.createClass({
	
	getInitialState: function() {
		return {
			isLoading: true,
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
		};
	},

	componentDidMount: function() {
		console.log('SearchScreen componentDidMount');
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
		.catch(error => console.dir(error));
	},

	render: function() {
		if (this.state.isLoading) {
			return this.renderLoadingMessage();
		} else {
			// return this.renderLoadingMessage();
			return this.renderResults();
		}
	},

	renderLoadingMessage: function() {
		return (
			<View style={styles.container}>
			<Text style={styles.label}>
			Searching for {this.props.searchPhrase}.
			</Text>
			<Text style={styles.label}>
			Please wait...{this.state.isLoading ? "true" : "false"}
			</Text>
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

});

module.exports = ResultsScreen;