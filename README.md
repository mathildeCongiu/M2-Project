# M2-PROJECT

# ROAD TO GREEN

## DESCRIPTION

Do you want to be greener but you don't know how to do it? Download this app and follow the big cornerstones that will give you clear goal to achieve this amazing project. You will add your own small tasks to these big acctions for you to organize your own roadmap to your greener life. 

## USER STORIES

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **Homepage** - As a user, I want to register my achievements so that I can see my evolution in sustainability
- **Sign up** - As a user I want to sign up on the webpage so that I can see all the tasks that I could do to be more eco-friendly.
- **Login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **Actions list** - As a user I want to see all the actions available so that I can start being greener
- **Subactions list** - As a user I want to see all the subactions available so that I can start being greener step by step
- **Create subaction** - As a user I want to create my own tasks so that I can contribute to save the planet 
- **Sharing task** - As a user I want to share my created tasks so that other users can use it to add them in their tasks list
- **Suggestion page** - As a user I want to see some suggestion tasks so that I can add them in my tasks list
- **Other page** - As a user I want to see more options so that I can see about the CEOs or log out

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
| ---------- | ---------------------------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| `GET`      | `/`                          | Main page route. Redirects to `login` view.                     |                                                           |
| `GET`      | `/login`                     | Renders `login` form view.                                      |                                                           |
| `POST`     | `/login`                     | Sends Login form data to the server and redirecto to Dashboard. | { email, password }                                       |
| `GET`      | `/signup`                    | Renders `signup` form view.                                     |                                                           |
| `POST`     | `/signup`                    | Sends Sign Up form to the server and creates user in the DB.    | { name, email, password, country }                                 |
| `GET`      | `/logout`                    | Logs user out of the page. Redirect to the `login` view         |                                                           |
| `GET`      | `/dashboard`                 | Private route. Renders `dashboad` view.                         |                                                           |
| `GET`      | `/actions`                   | Private route. Renders `actions` view.                          |                                                           |
| `POST`     | `/actions`                   | Private route. Sends if the user has completed an action to server and updates user in DB. Redirects to `actions`. | User model: { actions, experience, level }, Actions model: { completed }                                     |
| `GET`      | `/actions/:id`               | Private route. Renders `tasks` view.                            |          |
| `GET`      | `/task/new`                  | Private route. Renders `new` view.                              |          |
| `POST`     | `/task/new`                  | Private route. Send the form data to the server and updates the DB. Redirect to `actions`. | Task model: { title, experience, isPublic }                                                           |
| `GET`      | `/task/edit/:id`             | Private route. Renders `edit` view.                             |                                                           |
| `POST`     | `/task/edit/:id`             | Private route. Send the form data to the server and updates the DB. Redirect to `actions`. | Task model: { title, experience, isPublic }                                                          |
| `POST`     | `/task/delete/:id`           | Private route. Delete task from tasks lists. Redirects to `actions/:id`. |                                                           |

## MODELS

User
- name: String // required
- email: String // required
- password: String// required
- eco-level. Number Default  0 (mataplanetas)
- experience: Number Default 0
- actions: [ mongoose.Types.ObjectID ] 
- tasks: [ mongoose.Types.ObjectID ] 

Actions
- title: String // required
- completed: Boolean Default false
- experience: Number Default 5
- description: String // required
- tasks: [ mongoose.Types.ObjectID ] Default

Tasks
- title: String // required
- completed: Boolean Default false
- experience: Number // required
- isPublic: Boolean // required

## LINKS

### Trello

[Trello Board](https://trello.com/b/FKpatjiD/module-02-project)

### Git

[GitHub Link](https://github.com/alex-olle/M2-Project)

[Deploy Link](http://heroku.com)

### Presentation

[Presentation link](https://docs.google.com/presentation/d/1j6GdtUhGV-k4AXhZ7ZvMIT3Sye72l_1tyAzZTZiTbuo/edit?usp=sharing)
