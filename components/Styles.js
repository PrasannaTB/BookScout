import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: '#ffff',
		alignItems: 'center',
		justifyContent: 'center',
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

  bookContainer: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'column', // Make sure items are stacked vertically
    justifyContent: 'flex-start', // Align items to start
  },
  
  pickerContainer: {
    marginLeft: 65,
    flexDirection: 'column', // Stack Picker vertically
    justifyContent: 'center', // Center the Picker
  },
  
  picker: {
    width: '80%', // Full width of the container
    height: 80, // Set the height for the picker
  },
  

	bookImage: {
		width: 130,
    height: 190,
    //borderRadius: 10,
  },

	title: {
		fontSize: 20,
		//fontfamily: 'serif',

	},

	author: {
		fontSize: 15,
	},

	separator: {
    height: 2,
    //backgroundColor: '#ccc',
    //marginVertical: 10,
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
    marginRight: 2,
  },
  
  searchButton: {
    height: 40, // Match the height of Searchbar
    justifyContent: 'center',
  },
  list: {
    justifyContent: 'center',
  },

  itemContainer: {
    alignItems: 'center',
    margin: 20,
    width: 90,
  },

  label: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#444',
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
  },

  genreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 15,
    color: '#333'
  }, 

  scrollViewContent: {
    flex: 1,  
    padding: 20,
    justifyContent: 'center', 
    alignItems: 'center',
  },

  bookImageDetail: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 85
  },

  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
     // color: '#333333',
  },

  detailsAuthor: {
    fontSize: 15,
    textAlign: 'center',
  },

  descriptionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,

  },

  description: {
    fontSize: 15,
    marginBottom: 20,
  },

  info: {
    fontSize: 16,

  },

  bookshelfContainer: {
    alignItems: 'center',
    margin: 20,
    width: 130,
  },


  
  
  


    /*
		fontSize: 20,
    marginRight: -100,
    marginRight: 20,
    paddingRight: 100,
    fontFamily: 'serif',
    color: 'black'

    
    inputView: {
        backgroundColor: "rgb(116, 144, 147)",
        borderBottomColor: 'rgb(116, 144, 147)',
        borderTopColor: 'rgb(116, 144, 147)',
    },
    textInput: {
        backgroundColor: "#ffff",
        width: '100%',
        borderRadius: 50,
        height: 40,
    },*/
});

export default styles;