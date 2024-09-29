# Hiking Log

## Specification Deliverable

### Elevator pitch

Are you tired of forgetting the most memorable moments from your favorite hikes? Do you wish you could be more connected with your hiking buddies? With this website you will be able to clearly log your favority memories about the hike, the difficulty, the mileage, how long it took you, and your overall rating of the hike on a 1-10 scale. The more hikes you go on, the higher "level" hiker you become. You will also be able to see your friends hiking levels and chat with them about your treacherous adventures. Go say hello to the world and never let another memory slip by.

### Design

![Screenshot 2024-09-14 161934](https://github.com/user-attachments/assets/3a41ff70-0360-406d-b88b-abe366966aae)


### Key features

- Secure login over HTTPS
- Ability to log hike info:
  - difficulty
  - hike length
  - how long the hike took
  - personal 1-10 rating
  - any personal memories from the hike
- Calculates and displays your "hiking level" based on the number of hikes you've completed
- Displays friends hiking level
- Allows you to chat in real time with friends
- Display the current weather in your city

### Technologies
- **HTML** - Uses HTML to structure the web page. Hyperlinks to other helpful hiking websites. 2 HTML pages. One for login and one for your personal hiking journal/history.
- **CSS** - Uses CSS to style the website with a fitting adventurous font, and background colors to fit the hiking vibe. Styles the form of the input fields when users log their hike.
- **REACT** - Provides the login. Buttons are reactive to the user, backend endpoint calls, uses react routing
- **Service** - Backend service with endpoints for:
  - retrieving your hiker level and your friend’s hiker levels
  - submitting a log of your hike
  - displayed the weather using https://weatherstack.com/ service.
- **DB/Login** - Stores user’s hiking posts, and future hikes they would like to try, and their hiking level in the database. Registers and stores users login and credentials securely.
- **WebSocket** - Chat messages can be sent to friends

## HTML deliverable
I built the structure of my web program using HTML

- **HTML pages** - 4 HTML page that represent the ability to login, post and view your own posts, chat with other users and see their hiker level, and and about page that describes the application.
- **HTML tags** - Tags were properly implemented to structure each HTML page.
- **Links** - The login page automatically links to the my profile page. A navigation menu was used in the header to get to each HTML page. Links to 2 other hiking websites were added in the footer
- **Text** - Text is used to describe the application in the about page, used for headers, and as a placeholder for other data. It was also used to describe the hyperlinks to the other websites.
- **Images** - Images are added to bring some color and add a outdoor feel to each HTML page
- **3rd Party Service Call** - Will be implemented on the bottom of the home page. Placeholder of text is currently there
- **Login** - Input box for username and password were implemented, along with a login, create, and forgot password button
- **Database** - The posts each hiker creates will be stored in a database. An example post was created, along with the form for hikers to input the data relating to their hike.
- **WebSocket** - A live chat has a placeholder for now, along with the hiking level of the users, which will eventually be updated in real time.