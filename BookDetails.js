'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
	Text,
	View,
	Image,
	StyleSheet,
	ScrollView,
} = React;

var BookDetails = React.createClass({
	render: function() {
		return (
			<ScrollView>
				<View style={styles.topContainer}>
					<Image style={styles.thumbnail}
					source={
						{
							uri: this.props.book.volumeInfo.imageLinks.smallThumbnail
						}
					} />
					<View style={styles.titlesContainer}>
						<Text style={styles.title}>
						{this.props.book.volumeInfo.title} 
						</Text>
						<Text style={styles.subtitle}>
						{this.props.book.volumeInfo.subtitle}
						</Text>
					</View>
				</View>
				<View style={styles.middleContainer}>
					<Text style={styles.description}>
						{this.props.book.volumeInfo.description}
					</Text>
				</View>
				<View style={styles.bottomContainer}>
					<Text style={styles.author}>
						Author: {this.props.book.volumeInfo.authors[0]}
					</Text>
				</View>
			</ScrollView>
			);
	},
});

var styles = StyleSheet.create({
	topContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: '#5ac8fa',

	},
	thumbnail: {
		width: 70,
		height: 108,
		marginRight: 16,
	},
	titlesContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: '#5ac8fa',
		width: windowSize.width - 86,
		paddingTop: 8,
		paddingRight: 8,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
	},
	subtitle: {
		fontSize: 16,
		color: '#fff',
		fontWeight: 'normal',
	},
	middleContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: '#fff',
		margin: 16,
	},
	description: {
		fontSize: 16,
		fontFamily: 'Times',
		fontWeight: 'normal',
		color: '#000',
		marginBottom: 8,
	},
	bottomContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: '#5ac8fa',
		padding: 8,
	},
	author: {
		fontSize: 16,
		fontWeight: 'normal',
		color: '#fff',
	},
});

module.exports = BookDetails;