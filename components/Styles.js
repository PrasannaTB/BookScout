import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: '#ffff',
		alignItems: 'center',
		justifyContent: 'center',
    backgroundColor: 'white',
	},

  welcome: {
    fontSize: 30,
    fontFamily: 'serif',
    color: 'rgb(243, 114, 68)',
    marginBottom: 15,
    fontStyle: 'italic',
  },

  loginPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  appName: {
    color: 'rgb(243, 114, 68)',
    fontFamily: 'serif',
    fontSize: 40,
    fontStyle: 'italic',
    marginBottom: 40,
  },
  
  input: {
    marginVertical: 4,
    height: 50,
    width: '90%',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },

  button: {
    backgroundColor: 'white',
    borderColor: 'rgb(243, 114, 68)',
    borderWidth: 1,
    borderRadius: 5,
    width: '30%', 
    paddingVertical: 5, 
    alignItems: 'center', 
    marginBottom: 5,
    marginTop: 10,
    justifyContent: 'center', 
    alignItems: 'center',  
  },

  buttonText: {
    color: 'rgb(243, 114, 68)',
    fontSize: 18,
  },

  bookContainer: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    elevation: 3,
    flexDirection: 'column',  
    borderRadius: 2,
    padding: 15,
    width: 340, 
    alignItems: 'center',
  },

  bookHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'rgb(243, 114, 68)',
    fontFamily: 'serif',
  },

  flatListContent: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  
  pickerContainer: {
    marginLeft: 65,
    flexDirection: 'column', 
    justifyContent: 'center',
    fontSize: 16,
  },
  
  picker: {
    width: '80%',
    height: 70,
    fontSize: 16,
  },
  
	bookImage: {
		width: 140,
    height: 200,
    marginBottom: 13,
  },

  addButton: {
    fontSize: 18, 
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center', 
    alignItems: 'center',  
    backgroundColor: 'rgb(243, 114, 68)',
    width: '60%',
    paddingVertical: 7,
    marginLeft: 65,
    borderRadius: 25,
    marginBottom: 20,
  },

	title: {
		fontSize: 18,
    color: 'rgb(25, 65, 114)',
    marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: 'serif',
	},

	author: {
		fontSize: 15,
    color: 'rgb(25, 65, 114)',
	},

	separator: {
    height: 2,
  },

  searchRow: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  
  searchBar: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'rgb(243, 114, 68)',
    borderWidth: 1,
    borderRadius: 25,
    elevation: 2,
    paddingHorizontal: 8,
  },
  
  searchButton: {
    height: 50, 
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: 5,
    borderRadius: 20,
    marginRight: 5,
  },

  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemContainer: {
    alignItems: 'center',
    margin: 20,
    width: 90,
  },

  genreName: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: 'rgb(25, 65, 114)',
    fontStyle: 'italic',
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'serif',
    marginVertical: 20,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    //color: 'rgb(25, 65, 114)',
    color: 'rgb(243, 114, 68)',
  },

  genreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 15,
    color: '#333'
  }, 

  genreHeader: {  
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 15,
    color: 'rgb(243, 114, 68)',
    fontFamily: 'serif',
  },

  scrollViewContent: {
    flex: 1,  
    padding: 20,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'white', 
  },

  bookImageDetail: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 85,  
  },

  detailsTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 3,
    color: 'rgb(25, 65, 114)',
    fontFamily: 'serif',
  },

  detailsAuthor: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgb(25, 65, 114)',
  },

  descriptionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'rgb(25, 65, 114)',
  },

  description: {
    fontSize: 15,
    marginBottom: 20,
    color: 'rgb(25, 65, 114)',
  },

  info: {
    fontSize: 16,
    color: 'rgb(25, 65, 114)',
  },
  
  bookshelfScreenContainer: {
    padding: 20,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  
  bookshelfCard: {
    marginBottom: 16,
    marginTop: 10,
    borderRadius: 12,
    borderColor: 'rgb(25, 65, 114)',
    borderWidth: 1,
    width: '90%',
    marginLeft: 19,
  },
  
  textButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  
  shelfTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#rgb(25, 65, 114)',
  },

  profilePage: {
    flex: 1,
    backgroundColor: 'white',
  },

  profileHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  profile: {
    fontSize: 20,
    fontFamily: 'serif', 
    color: 'rgb(243, 114, 68)',
    marginTop: 60,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  linkText: {
    color: 'rgb(25, 65, 114)',
    fontSize: 18,
    marginTop: 30,
    alignItems: 'left',
    marginLeft: 20,
  },

  removeButton: {
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(25, 65, 114)',
    borderWidth: 1,
    marginTop: 10,
  },

  removeText: {
    color: 'rgb(25, 65, 114)',
    fontWeight: 'bold',

  },
});

export default styles;