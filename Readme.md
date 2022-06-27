
# GAI GAI BUCKET LIST 

## Project Brief
### Technical Requirements

- Use MongoDB, Express, React and Node (MERN Stack)
- Have at least 2 related models (with references) and an additional user model with authentication. There should be at least 2 types of users.
- Include all major CRUD functions for at least one of the models
- Nicely styled front-end with clean & well-formatted CSS, with or without a framework.
- Deploy your application online, so that it is publically accessible
- User stories that apply to the functionality of your app

### Final Deliverables
- Deployed on Heroku: https://project4-gaigai-bucketlist.herokuapp.com/


##  Description

Gai Gai bucket list is a photo diary, journal and essential packing list (all-in-one) website for fellow bag packers or travellers to use during their trips. It is built using React-Express-NodeJs-MongoDB (MERN stack).

### Technologies Used
- React: CRA (Front-end)
- Express (Back-end)
- MongoDB (Database)
- Postman (Database)
- Heroku (Deployment)
- Bootstrap (CSS)
- Github 


### Installation Instructions
- Clone or download the repo
- npm install


###  User Stories

Who are your users? : Bagpackers, travellers, any individuals and even couples. They can use this website as an activities tracker and plan trips/to-go places with it. \
&nbsp;  
What do they want? : To update their journey and record all the trips, able to safekeep their memories. They are able to upload images like Instagram, and then post them like blog posts. There is a forum with outing ideas and other users will be able to see the posts. They are able to comment too! One can also use this app to plan for upcoming trips and use the packing list to pack their bag for the trip.   \
&nbsp;  


### Major Hurdles

One main hurdle will be the part where you upload images to post. Usually we will use the <img src> tag to upload image. However, for this project I will need to make sure the image the user uploads get stored into our database (mongoDB). This is definitely something new to me and very challenging. 

Another hurdle I have came across will be trying to organize each different diary posts. 


### Unsolved Problems

1. User have to search online for an image with URL before they can create a post to post their own photos. I will work on allowing them to directly upload their own photos as it will be more convenient.

2. Link to image uploaded is based on file name. Thus if coincidentally two users happen to use the same image, there will be an error. I will work towards created an unique key to each file so that the error will not occur.


### Possible Improvements

1. Send an email notification to the user if anyone commented on their post in the forum.
2. Allow posts or photos to be liked.
3. Add a map feature, (possibly google map's API). Plot the places/locations view on the map for easier viewing.
4. Add in password reset feature.
5. Allow creation of customized bucket list.