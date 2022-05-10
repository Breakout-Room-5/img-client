# Meme Central Image Upload

**Author: Ruo Zheng, CJ Lamborn, Cody Sanders, Maura Webber**

This is the front-end of Meme Central.

Meme Central allows registered users to upload image along with an inputted name of their choice. They also have the ability to change the name or delete the image that they posted themselves. Another feature this app have is all registered user can see every user's uploaded image (though they don't have the access to edit them). The return image also provide the owner, created, and updated information.
All images are hosted Amazon Web Service - S3 with user info saved on Mongo DB.

## Important Links

  - [Client repo](https://github.com/Breakout-Room-5/img-client)
  - [API repo](https://github.com/Breakout-Room-5/img-api)
  - [Deployed Client](https://breakout-room-5.github.io/img-client/)
  - [Deployed API](https://gentle-waters-29195.herokuapp.com/uploads)

***

## Planning Story

1. Design ERD and Wire-frame with the dev team
2. POST image to AWS-S3 through our API
3. GET all the image from a single user
4. GET all the images for all users
5. GET meta data of image( url, name, author, create, update)
6. DELETE image own by the owner
7. PATCH new name for the image by the owner
8. Styling

## API End Points

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| DELETE | `/sign-out`            | `users#signout`   |
| PATCH  | `/change-password`     | `users#changepw`  |
| GET    | `/uploads`             | `memes#index`     |
| POST   | `/uploads`             | `memes#create`    |
| GET    | `/uploads/:id`         | `memes#show`      |
| PATCH  | `/uploads/:id`         | `memes#update`    |

### User Stories

  - As an unregistered user, I would like to sign up with email and password.
  - As a registered user, I would like to sign in with email and password.
  - As a signed in user, I would like to change password.
  - As a signed in user, I would like to sign out.
  - As a signed in user, I would like to upload an image to AWS with a name.
  - As a signed in user, I would like to update the name of my image on AWS.
  - As a signed in user, I would like to see all my images on AWS.
  - As a signed in user, I would like to see the thumbnail of all images on AWS.
  - As a signed in user, I would like to delete the reference of my image from the database.
  - As a signed in user, I would like to see the following data for any image:
    - date created/uploaded
    - date modified
    - owner (user who uploaded the image)
    - name
  
### Technologies Used

- Javascript
- CSS
- HTML
- SASS
- Visual Studio Code
- AXIOS
- React
- React-Bootstrap
- React-Router-DOM
- Modal

<!-- ### Unsolved Problems

... -->

***

## Wireframe and ERD
![Meme Central Wireframe](https://i.imgur.com/JUY8gld.png)

![Meme Central API ERD](https://i.imgur.com/aW5xBUB.png)