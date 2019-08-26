# Rocket Surveys

A single page survey/question application.

Users can create new surveys, see the answers to their surveys, and take surveys.
In addtion to surveys, open ended questions can be asked and be responsed to,
and see responses to own questions

### Links

- [Application](https://mtaylor124.github.io/Rocket-Surveys-Client/)
- [Back end](https://rocket-surveys-bonus.herokuapp.com/)
- [Front end repo](https://github.com/MTaylor124/Rocket-Surveys-Client)
- [Back end repo](https://github.com/MTaylor124/rocket-surveys-api)
- [Original Group Front end repo](https://github.com/sei3-team-rocket/Rocket-Surveys-Client)
- [Original Group Back end repo](https://github.com/sei3-team-rocket/rocket-surveys-api)

### Development
1. Team launch w/ sprint planning meeting.
  1. Ongoing team stand ups: morning, after lunch, evening.
2. Created user stories.
3. Created wireframes.
4. Created ERD.
5. Began development:
  1. Create front end repo and deployed site.
  2. Create back end repo and database.
  3. Built authentication.
  4. HTML page layout.
  5. CRUD.
  6. Styling and UI functionality.
6. Forked and cloned Team Repos for individual use - add additional resources
  1. Create front end repo and deployed site.
  2. Create back end repo and database for second resource route.
  3. HTML page layout to include access to new questions.
  4. CRUD.
  5. Styling and UI functionality.

##### Problem Solving
In the event of a bug or issue during team portion:
  1. Pair programming
  2. Mob programming
In the event of a bug or issue in individual portion:
  1. Double check working code from previous resources.

##### Git / Version Control
1. Team code reviews
2. All major commits / merges done as a team.
3. Individual contributions committed upon completion of each functional addition

### Technologies
- HTML
- CSS
- Bootstrap
- Handlebars
- Javascript
- jQuery
- AJAX
- Express
- MongoDb
- Mongoose

### User Stories

```md
As an unregistered user, I would like to sign up with email and password.
As a registered user, I would like to sign in with email and password.
As a signed in user, I would like to change password.
As a signed in user, I would like to sign out.
As a signed in user, I would like to create a survey asking a yes/no question.
As a signed in user, I would like to update my survey's question.
As a signed in user, I would like to delete my survey.
As a signed in user, I would like to see all surveys and its answers.
As a signed in user, I would like to take a survey.

As a signed in user, I would like to create an open-ended question.
As a signed in user, I would like to update my question.
As a signed in user, I would like to delete my question.
As a signed in user, I would like to see all questions and its responses.
As a signed in user, I would like to answer a question.
```

### Database

The application will have two one-to-many relationships between three collections: users, surveys, and responses.

```md
Collection: Users
- id: string
- email: string

Collection: Surveys
- _id: string
- updatedAt: date
- createdAt: date
- question: string
- owner: string

Collection: Responses
- _id: string
- updatedAt: date
- createdAt: date
- answer: boolean
- survey: string
- owner: string

Collection: Questions
- _id: string
- updatedAt: date
- createdAt: date
- question: string
- owner: string

Collection: Paragraphs
- _id: string
- updatedAt: date
- createdAt: date
- answer: string
- question: string
- owner: string
```

##### Users

| CRUD        | HTTP           | Action | Route |
| ------------- |:-------------:| :-----:|:-----:|
| Create      | POST | create | /sign-up |
| Create     | POST      |  create | /sign-in |
| Update | PATCH     |    update | /change-password |
| Delete | DELETE     |    destroy | /sign-out |

##### Surveys

| CRUD        | HTTP           | Action | Route |
| ------------- |:-------------:| :-----:|:-----:|
| Create      | POST | create | /surveys |
| Read     | GET      |  index | /surveys |
| Update | PATCH     |    update | /surveys/:id |
| Delete | DELETE     |    destroy | /surveys/:id |

##### Responses

| CRUD        | HTTP           | Action | Route |
| ------------- |:-------------:| :-----:|:-----:|
| Create      | POST | create | /responses |
| Read     | GET      |  index | /responses |
| Update | PATCH     |    update | /responses/:id |
| Delete | DELETE     |    destroy | /responses/:id |

##### Questions

| CRUD        | HTTP           | Action | Route |
| ------------- |:-------------:| :-----:|:-----:|
| Create      | POST | create | /questions |
| Read     | GET      |  index | /questions |
| Update | PATCH     |    update | /questions/:id |
| Delete | DELETE     |    destroy | /questions/:id |


##### Paragraphs

| CRUD        | HTTP           | Action | Route |
| ------------- |:-------------:| :-----:|:-----:|
| Create      | POST | create | /paragraphs |
| Read     | GET      |  index | /paragraphs |
| Update | PATCH     |    update | /paragraphs/:id |
| Delete | DELETE     |    destroy | /paragraphs/:id |

### ERD

![ERD](https://imgur.com/a/4PWFvgr "ERD")

### Wireframes

![Sign In](https://i.imgur.com/IFRtMJ4.png "Sign In")

![Your Surveys](https://i.imgur.com/DV4t2Tc.png "Your Surveys")

![Take Survey](https://i.imgur.com/U7JzIY5.png "Take Survey")

![Create Survey](https://i.imgur.com/nfav5gf.png "Create Survey")

![Ask Question](https://imgur.com/a/eDfJcN6)

![Answer Questions](https://imgur.com/a/qJuMS0v)

![View My Questions](https://imgur.com/a/Q3diV36)


### Unsolved Issues / Future Features
- Improve take survey styling.
- Show a bar chart for the survey results.
- Allow multiple choice, scale of 1-10, short answer, etc.
  - Enhanced statistics for different answer choices.
- Enable multiple questions under one survey id.
- Allow both surveys and questions to populate the take survey/questions list
- Have take surveys and answer questions appear in reverse chronological order
so the most recent questions/surveys appear at the top
