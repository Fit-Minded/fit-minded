## FitMinded

A platform for connecting individuals who have similar athletic interests. FitMinded allows users to set their athletic preferences and location so they can find the perfect training partner. Training for a triathlon but need to practice your freestyle? Use FitMinded to find other swimmers you can plan workouts with! Love rock-climbing but need a belaying buddy? Use FitMinded to find those also passionate in the climbing arts! Whatever your experience level or personal preference, FitMinded will help fitness enthusiasts connect with others.

### App Navigation

After creating an account or logging in, the user is brought to the home-page where users can "like" or "dislike" other users depending on if they'd like to chat or schedule a meet. Users will only see people that match their preferences.

Users may see who has already liked them in the "Liked Me" page. If they choose to match with one or more of their "likes", then those mutual liked users will show up in the "Matches" page. The Matches page is what links to the chat functionality. Users can only chat with others if they match.

In case the user's preferences change, they can always preview their profile and make changes to their search preferences. When this is done, the user's new pool of matches is updated to match their recently changed preferences.

### Matching Logic

**If the user’s decision is to “like” someone:**

1. The app removes the very first person in the user’s toJudge array (shift) and adds the liked person to the user’s liked list in Mongoose (set). The app also adds the current user to the other person’s likedMe list in Mongoose (set).

2. The app then checks to see if the other user’s pool includes the current user and if it does it will remove the current user from that user’s pool (delete).

3. The app checks to see if the other user’s toJudge array includes the current user and if it is there, it will find the index of the current user in order to remove it (splice).

**If the user’s decision is to “dislike" someone:**

1. The app removes the very first person in the user’s toJudge array (shift) and adds the disliked person to the user’s disliked list in Mongoose (set). The app also adds the current user to the other person’s dislikedMe list in Mongoose (set).

2. The app checks to see if the other user’s pool includes the current user and if it does it will remove the current user from that user’s pool (delete).

3. The app checks to see if the other user’s toJudge array includes the current user and if it is there, it will find the index of the current user in order to remove it (splice).

**If two users “match”:**

1. The app will create a room ID using a utility function that randomizes characters.

2. The app will store the current user and the matched person in variables in order to utilize Pusher to create chat rooms using the newly created room ID. The app uses Pusher utility functions to create users and a room within Pusher for those two users.

3. The app removes the matched person from the user’s likedMe (delete) and then the matched person is then added to the user’s matches list.

4. The app will remove the current user from the matched person’s liked list as well (delete) and then add the current user to the matched list.

**If the user does not like someone from their likedMe list:**

1. The app removes the other person from the user’s likedMe list and adds them to the user’s disliked list.

2. The app removes the current user from the other person’s liked list and adds them to the other user’s dislikedMe list.

App will then save the current user and the relevant user so that the database is updated.

### Technologies Used

Back-End: Built using Express, MongoDB, and Mongoose.

Our choice of a non-relational database was based our need to frequently analyze user-to-user relationships. By storing these relationships on each user document, we were able to generate the needed lists very quickly. Doing such an analysis using a relational database would have been very time-intensive.

Front-end: React and Redux

API's: we used the Pusher ChatKit API to host our chatrooms. This is a chat API that helped streamline how our messages are created and stored. We also used the Google Maps API for users to set and view their location, and the Google Places API to suggest meeting places for users based on shared activities.

### Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
