# Blogging-App

This project is a full-stack blogging application developed using the MERN stack. 

### Features
- **User Authentication:** User can register and login
- **Create Posts:** Users can easily create blog posts with a title, summary, content, and cover image.
- **Delete Posts:** Users can delete their posts.
- **Update Posts:** Users can edit and update their posts.
- **View Posts:** Users can view others' blog posts.
- **Search Posts:** Users can search for posts by title.
- **Reading Time:** Estimated reading time is displayed for each blog post.

## Getting Started

### Pre-requisites
- **Node.js**
-  **MongoDB Compass or Atlas**

### Setting up locally
1. Clone the project repository.
   
   ```bash
   git clone https://github.com/AnanyaPeddineni/Blogging-App.git
   cd Blogging-App
   ```
2. Install server dependencies
   
   ```bash
   cd server
   npm i
   ```
3. Install client dependencies
   
   ```bash
   cd ../client
   npm i
   ```
4. Configure database connection in the server .env file. Create a database 'blogApp' in MongoDB Complas or Atlas and replace the MONGO_URI with your connection string.
   
5. Connect to MongoDB.

6. Run server.

   ```bash
   cd server
   npm run dev
   ```
7. Run client.

   ```bash
   cd ../client
   npm start
   ```
8. Access the application in your web browser at [http://localhost:3000](http://localhost:3000).
   

