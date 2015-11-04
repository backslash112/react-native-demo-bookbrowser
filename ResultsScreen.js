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
	
	componentDidMount: function() {
		console.log('SearchScreen componentDidMount');
		this.fetchResults(this.props.searchPhrase);
	},

	fetchResults: function(searchPhrase) {
		fetch(buildUrl(searchPhrase))
			.then(response => response.json())
			.then(jsonData => console.dir(jsonData))
			.catch(error => console.dir(error));
	},

	render: function() {
		return (
			<View style={styles.container}>
				<Text style={styles.label}>
					You searched for: {this.props.searchPhrase}
				</Text>
			</View>);
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