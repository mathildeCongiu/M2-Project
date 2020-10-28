# M2-PROJECT

# ROAD TO GREEN

## DESCRIPTION

Do you want to be greener but you don't know how to do it? Download this app and follow the big cornerstones that will give you clear goal to achieve this amazing project. You will add your own small tasks to these big acctions for you to organize your own roadmap to your greener life. 

## USER STORIES

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user, I want to register my achievements so that I can see my evolution in sustainability
- **sign up** - As a user I want to sign up on the webpage so that I can see all the tasks that I could do to be more eco-friendly.
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **actions list** - As a user I want to see all the actions available so that I can start being greener
- **subactions list** - As a user I want to see all the subactions available so that I can start being greener step by step
- **create subaction** - As a user I want to create my own tasks so that I can contribute to save the planet 

## BACKLOG

List of other features outside of the MVPs scope

User profile:
- upload my profile picture
- see other users profile
- list of tasks created by the user

Homepage
- ...

## ROUTES:

| **Method** | **Route**                    | **Description**                                              | Request - Body                                            |
| ---------- | ---------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| `GET`      | `/`                          | Main page route. Renders home `index` view.                  |                                                           |
| `GET`      | `/login`                     | Renders `login` form view.                                   |                                                           |
| `POST`     | `/login`                     | Sends Login form data to the server.                         | { email, password }                                       |
| `GET`      | `/signup`                    | Renders `signup` form view.                                  |                                                           |
| `POST`     | `/signup`                    | Sends Sign Up info to the server and creates user in the DB. | { name, email, password }                                 |
| `GET`      | `/logout`                    | Logs user out of the page. Redirect to the `home`.           |                                                           |
| `GET`      | `/profile/:id`               | Private route. Renders `profile` form. view.                 |                                                           |
| `GET`      | `/profile/:id/edit`          | Private route. Renders `edit` form.view.                     |                                                           |
| `POST`     | `/profile/:id/editUser`      | Private route. Sends edit-profile info to server and updates user in DB. Redirects to `profile`. | { email, profilePic }                                     |
| `POST`     | `/profile/:id/editBusiness`  | Private route. Sends edit-profile of each Business to server and updates user in DB. Redirects to `profile`. | { streetName, streetNumber, city, phone, webpage, about } |
| `DELETE`   | `/profile/delete/review/:id` | Private route. Delete reviews from your profile. Redirects to `profile`. | { streetName, streetNumber, city, phone, webpage, about } |
| `DELETE`   | `/profile/:id/delete`   | Private route. Deletes the existing business from the current user. Redirect to `profile`. |                                                           |
| `GET`      | `/business`                  | Renders `business-list` view.                                |                                                           |
| `POST`      | `/business`                  | Get info from input and shows the results of the business search.                                |                                                           |
| `GET`      | `/business/details/:id`      | Render `business-details` view for the particular business.  |                                                           |
| `POST`     | `/business/details/:id`      | Send review info from form in business-details view. Redirects to `business/details/id`.          | { reviewTitle, comment }                                                          |
| `POST`     | `/business/favourite/:id`      | Actualize the DB with a favourite in the user and a favouriteBy in the business. Redirects to `business/details/id`.          | { reviewTitle, comment }                                                          |
| `GET`      | `/add-business`              | Render `add-business` view.                                  |                                                           |
| `POST`     | `/add-business`              | Sends info through forms from `add-business` view. Redirects to `business/details/:id`.          | { name, streetName, streetNumber, city, phone, webpage, type, about, image_url} |

## MODELS

User
- Name: String // required
- Email: String // required
- Password: String// required
- Nivel de ecologista. Number Default  0 (mataplanetas)
- Experiencia: Number Default 0
- Actions: [ String ] Actions Model

Actions (5 aprox)
- Title: String // required
- Completed: Boolean Default false
- Experience: Number Default 5 (definido por creadores)
- Article/Consigna: String // required
- Subactions or Tasks: [ String ] Default // required

Subactions or Tasks (CRUD)
- Title: String // required
- Completed: Boolean Default false
- Experience: Number Default 2 (definido por creadores)

## LINKS

### Trello

https://trello.com/b/FKpatjiD/module-02-project

### Git

The url to your repository and to your deployed project

https://github.com/alex-olle/M2-Project (http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

https://docs.google.com/presentation/d/1j6GdtUhGV-k4AXhZ7ZvMIT3Sye72l_1tyAzZTZiTbuo/edit?usp=sharing
