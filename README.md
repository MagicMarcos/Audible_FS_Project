# The Gamers Network
<p> A forum styling social media app for gamers</p>
<p> See it live at <a href="https://gamernetwork.herokuapp.com">TGN</a> </p>

## How It's Made:

### Utilized: 
     
       JavaScript
       Node: server / back-end
       Express:server / back-end
       EJS: templating
       CSS: styling
       Bootstrap 5: styling
       MongoDB: database
       Mongoose: schemas
       Moment: time formatting
       Passport: authentication 
       SocketIo: live chat and other updates
       Heroku: hosting
       Cloudinary: image hosting 
       MVC design pattern
    
    
### Reflections and Description: 
<p>This was a really fun project to build. I was able to refresh my knowledge on some tech I had used in the past and learn new skills as well</p> 
<p>Users are able to sign up / log in.<p/>
<p>In this app, users can upload posts, comment, like, delete and join a live chatroom with likeminded individuals.<p/>


### Lessons Learned:
<p>This was a really cool project where I got to work with a fellow Audible apprentice <a href ="https://github.com/kristoferwhitfield">Kris</a> and just have a ton of fun learning from eachother. With a deadline as well, this was a great learning experience for project planning and time management in a small group scenario.</p>

### Optimizations
<p>Styling can always be better and updated. Dynamic styling of like buttons is at top of the list.</p>
<p>Upcoming features: </p>
    <ul> 
        <li>Accessibilty features like, high contrast and zoom in options</li>
        <li>Editing individual posts</li>
        <li>Editing user passwords</li>
    </ul>

### Errors and Bugs 
<p>If something behaves unexpectedly, it is likely a bug. Create an issue and report it <a href="https://github.com/MagicMarcos/Audible_FS_Project/issues">here</a>  </p>


## HOW TO RUN THIS LOCALLY

`npm install`

---

### Things to add

- Create a `.env` file and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`
  - SESSION_SECRET = `your session secret`


---

### Run

`npm run devStart` (nodemon)
`npm start`
