'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View,
	Text,

} = React;

var buildUrl = function(g) {
	return 'https://www.googleapis.com/books/v1/volumes?q=' 
		+ encodeURIComponent(g) 
		+ '&langRestrict=en&maxResults=40';
};

var ResultsScreen = React.createClass({
	
	getInitialState: function() {
		return {
			isLoading: true,
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
					this.setState({ isLoading: false });
				}, 2000);
				console.dir(jsonData);
			})
			.catch(error => console.dir(error));
	},

	render: function() {
		if (this.state.isLoading) {
			return this.renderLoadingMessage()
		} else {
			return this.renderReseults()
		}
	},

	renderLoadingMessage: function() {
		return (
			<View style={styles.container}>
				<Text style={styles.label}>
					Searching for {this.props.searchPhrase}
				</Text>
				<Text style={styles.label}>
					Please wait...
				</Text>
			</View>
			);
	},

	renderReseults: function() {
		return (
			<View style={styles.container}>
				<Text style={styles.label}>
					Finished Searching.
				</Text>
			</View>
			);
	}
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
});

module.exports = ResultsScreen;