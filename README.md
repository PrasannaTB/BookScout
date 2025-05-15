# Bookshelf App
A mobile application built using React Native that allows users to manage their book collection across different bookshelves (Read, Currently Reading, Want to Read). It also integrates with Firebase for user authentication and data storage.

## Features
**User Authentication**: Users can sign up, log in, and manage their personal account using email/password authentication.  
**Bookshelves**: Users can organize their books into various categories: "Read", "Currently Reading", and "Want to Read".  
**Book Search**: Search for books from the Google Books API based on genres, authors, or titles.  
**Book Details**: Tap on a book to view detailed information, including title, author, image, and description.  
**Remove Books**: Users can remove books from their bookshelves.  

## Technologies Used
### Frontend
**React Native**: A framework for building native mobile apps using JavaScript and React.  
**React Navigation**: A library for navigating between different screens in the app.  
**Redux Toolkit**: Used for state management to handle user data and bookshelf information.  
**React Redux**: A library for binding React with Redux, used to manage and sync app state.  
**Axios**: A promise-based HTTP client for making network requests, used for fetching book data from the Google Books API.  

### Backend
**Firebase Authentication**: Provides user authentication functionality.  
**Firebase Realtime Database**: Stores user data, including bookshelves and book information.  

### External APIs
**Google Books API**: Used to fetch book information by genre or search criteria (such as title or author).  

### Development Tools
**Expo CLI**: A toolchain built around React Native that helps you build, test, and deploy React Native applications.  
**Firebase SDK**: A set of tools for integrating Firebase services into the React Native app.  

### Installation
1. Clone the repository
2. Install dependencies
3. Configure Firebase
4. Start the project

