'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View,
	Text,

} = React;

var ResultsScreen = React.createClass({
	render: function() {
		return (
			<View style={styles.container}>
				<Text style={styles.label}>
					This is the results screen
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