import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: '#ffff',
		alignItems: 'center',
		justifyContent: 'center',
	},

  bookContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
        //marginRight: 120
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
  }
  


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