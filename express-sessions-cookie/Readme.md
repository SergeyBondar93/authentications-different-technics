### Session authentication is working something like this:

- user provide a credentionals as email / password

- server find a user and if user is found, just write the user to request.session.user

- session middleware monitor the request.session field and if something changes, put the new object to session storage. by default it is in memory cache, but we can put it into redis or some other database we want. In memory databases is more suitable for this than other ones because of speed.

- also cookie in express-session package set a session id (sid) to httpOnly cookie in user browser.

- each time when user make a request to server, his browser also send the cookie

- express-session take the value of this cookie and check whether or not session with this sid exist in our sessions storage

- it this is true, user is authenticatend and server know who it is

- othervise server redirect to login page

- if unauthorized user is trying to get some protected resource, server push him to login page

To run this demo project:
start vscode start live server
npm run redis
npm start
