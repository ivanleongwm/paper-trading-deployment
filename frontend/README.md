# Paper Trade

## Project Brief
### Technical Requirements

- Use MongoDB, Express, React and Node
- Have at least 2 related models (with references) and an additional user model with authentication. There should be at least 2 types of users.
- Include all major CRUD functions for at least one of the models
- Manage team contributions and collaboration by using standard Git flow on Github.
- Nicely styled front-end with clean & well-formatted CSS, with or without a framework.
- Deploy your application online, so that it is publically accessible
- User stories that apply to the functionality of your app, crafted as a team.
- Wireframes for the views you planned to create

### Final Deliverables
- A **working app, built by the whole team**, hosted somewhere on the internet
- A **link to your hosted working app** in the URL section of your Github repo
- A **team git repository hosted on Github**, with a link to your hosted project, and frequent commits from _every_ team member dating back to the _very beginning_ of the project.
- **A `readme.md` file** with:
  - Explanations of the **technologies** used
  - A couple paragraphs about the **general approach you took**
  - **Installation instructions** for any dependencies
  - Link to your **user stories** – who are your users, what do they want, and why?
  - Link to your **wireframes** – sketches of major views / interfaces in your application
  - Descriptions of any **unsolved problems** or **major hurdles** your team had to overcome
- A `presentation.md` of "slides" that walk through a demo of your app.


##  Description

Paper Trade is a stock market simulator that reproduces behavior and features of a stock market, so that a user may practice trading stocks without financial risk. It allows an investor to buy and sell with live stock prices on paper before risking money in live markets. 

### Technologies Used
- React: CRA
- MongoDB
- Express
- Postman
- Figma
- Github & Github Desktop
- Vercel
- Heroku


### General Approach

We started off with wireframing and crafted a sheet of sample data to understand the features that are needed for a good paper trading website. We also plot a User Story to understand the flow of how our website will behave and also, picture an experience of how the user will feel when using our website. 


### Installation Instructions
- Clone or download the repo
- `npm install`


###  User Stories

Who are your users? : First-time traders or beginners who are looking into the trading world. Veteran traders could use them too, to test whether their trading strategies have merit.\
&nbsp;  
What do they want? : To practice trading. Develope trading experience as well as confidence and strategies at the same time. \
&nbsp;  
Why? : Because through the practice of buying and selling, users are able to gauge their performance without putting their capital at risk. Users will be able to gain experience on the entire trading process. When an indivisual paper trades successfully, it helps to build confidence to eventually conduct real trades. Users can also use paper trade to test whether a new trading strategy works without having to commit real money.


### Wireframes

We used Figma to create a rough skeleton for our project's expected outcome : https://www.figma.com/file/KdpQa8qPdbbt5b68qAxdVq/Untitled?node-id=0%3A1


---

## Planning and Development Process


**Week 1**

1. Create new Github Repository for both front end and back end. 

2. Create a wireframe using figma to draft out the visuals of the website. Wireframes bring clarity to your projects, allowing you to work through all the interactions and layout needs.

3. Set up the project files and installed the necessary dependencies\
  
   - Front-end: CRA - npx create-react-app
  
   - Back-end: Express - npm i express

4. Create sample data after brainstorming what is needed for the website. Sample Data: https://docs.google.com/spreadsheets/d/1ubmwbCFKFeUePetwAlkxZ7F5RQH3LOSs2-ihzvQWuBQ/edit#gid=114795179

5. Front-end: Do up all the necessary routes and create needed components and link them up. Design website with simple and classic CSS. Import font from google fonts.

6. Test deploy front-end to Vercel, and back-end to Heroku. 

**Week 2**

1. Create a MongoDB database and link the database through both local and cloud. 

2. Link MongoDB to back-end.

3. Back-end: Create important models & schemas according to sample data did previously. Done up User and Stock Holding schemas.

4. Back-end: Create User and Stock holding controllers and link it to the schemas. Do up Create and Read routes. Get it to work locally with postman and MongoDB Compass. 

5. Front-end: Fetch API from https://site.financialmodelingprep.com/ and get it to display real-time. Called 100 different stocks at the same time. Do up the portfolio page that consist of the pie-chart as well as the graph. Link the back-end and front-end together. 

6. Complete the login and register authentication and sessions and ensure that there is a cookie.

**Week 3**

1. Front-end: Complete the buy and sell stocks pages and the javascript logic. Set stock balance to a certain amount (10,000) and adjust the maximum number of stocks available for purchase.  

2. Front-end: Javascript logic with the cash balance and stock balance information and get it to work on the back-end too. Create the delete button to delete the user account and their respective stock holdings assets.

3. Back-end: Create Update and Delete routes for nessasary controllers. Link all the routes to server.js

4. Do up a new model that allows users to change the colour of the pie chart. Worked on both front-end and back-end to get this up.

5. Create logout route for front-end. Link and redirect every piece together.

6. Complete this read-me page.



### Major Hurdles

One main hurdle is the deployment to heroku for the back-end. App often crashes after pushing updated codes to github. 
Another hurdle would be the login authorisation and sessions/cookies from both front-end and back-end. 


### Unsolved Problems and Possible Improvements

1. Sell page to only show what stocks the users have in possession.
2. API to fetch and load faster (display immediately what's already loaded) 
3. To add a page for the history profile - stocks the user had bought or sold before.
4. Add a choice to sort the stocks in alphabetical order or add a search bar to search directly for the stocks you want to find.
5. A complete Profile page allowing users to change password, e-mail adress or profile picture. 
6. Add more questions in the registration page when users are creating their accounts. (D.O.B, gender, trading experience, trading risk, etc)

### Screenshots of WIP

Portfolio/Home page of logged in user. Page will show the stocks the user is currently holding as well as the respective information in a pie-chart and line graph plotted according to the different stocks.\
&nbsp;  
<img width="1440" alt="Screenshot 2022-04-26 at 4 11 27 PM" src="https://user-images.githubusercontent.com/94371596/165253840-051f3394-8fad-453a-8c9c-580b5e4e6bf2.png">\
&nbsp;   
Buy page for the user to purchase stocks. Over 100 stocks to choose from. \
<img width="1440" alt="Screenshot 2022-04-26 at 4 11 44 PM" src="https://user-images.githubusercontent.com/94371596/165253856-def47c21-82e7-4754-8c44-8c3717d06336.png">\
&nbsp;  
Page to change the colour of the pie-chart. \
<img width="1440" alt="Screenshot 2022-04-26 at 4 12 03 PM" src="https://user-images.githubusercontent.com/94371596/165253862-28f9a984-5c55-4cbb-837b-2a42b8f057ca.png">\
&nbsp;  
Register page.\
<img width="1440" alt="Screenshot 2022-04-26 at 4 12 18 PM" src="https://user-images.githubusercontent.com/94371596/165253864-e537dd2f-fbd5-41e5-865f-73cec2034123.png">\
&nbsp;  
MongoDB page of the back-end database.\
<img width="1189" alt="Screenshot 2022-04-26 at 4 12 47 PM" src="https://user-images.githubusercontent.com/94371596/165253865-b7112eba-42db-4bde-b6ee-fce79f5303bd.png">\
