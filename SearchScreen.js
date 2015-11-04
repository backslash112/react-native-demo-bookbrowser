'use strict';

var React = require('react-native');
var ResultsScreen = require('./ResultsScreen');

var {
	AppRegistry,
	Text,
	TextInput,
	View,
	StyleSheet,
} = React;

var SearchScreen = React.createClass({

	gotoResultsScreen: function() {
		this.props.navigator.push({
			title: 'Results',
			component: ResultsScreen,
		});

	},


	render: function() {
		return (
			<View style={styles.container}>
			<Text style={styles.headline}>
			BookBrowser
			</Text>
			<Text style={styles.label}>
			Find books containing
			</Text>
			<TextInput 
			style={styles.textInput} 
			placeholder="e.g. JavaScript of Mobile"
			returnKeyType="search"
			enablesReturnKeyAutomtically={true}
			onEndEditing={ event =>
				// console.log(event.nativeEvent.text)
				this.gotoResultsScreen()
			} />
			</View>
			);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Math.random() > 0.5 ? '#5ac8fa' : '#4cd964',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	textInput: {
		borderColor: '#8e8e93',
		backgroundColor: '#fff',
		height: 40,
		marginLeft: 60,
		marginRight: 60,
		borderWidth: 0.5,
		padding: 8,
	},
	headline: {
		fontSize: 36,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 28,
	},
	label: {
		fontSize: 24,
		fontWeight: 'normal',
		color: '#fff',
		marginBottom: 8
	},

});

module.exports = SearchScreen;