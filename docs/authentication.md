# Authentication

## Table of Contents
* [Auth Check](#auth-check)
* [Sign In](#sign-in)
* [Render](#render)

----

### Auth Check

1. A user attempts to access the schedule page.
1. The schedule page checks the `isAuthenticated` boolean state in the `userSlice` portion of the redux store:
    
    - If the user is not authenticated, they enter the [sign-in flow](#sign-in).
    - If the user is authenticated, the schedule page is [rendered](#render).

### Sign In

1. The user is redirected to our `/sign-in` page, which renders a `Sign in with Google` button.
1. The user clicks the `Sign in with Google` button, which pops open a Google authentication window.
1. After the user authenticates to Google, the Google authentication window gives our page the user's Google ID token and closes.
1. Our sign-in page sends the user's Google ID token to our server.
1. Our server:
    
    - Verifies the token.
        - If verification fails, the server returns an error at this point.
    - Extracts the `email` and `sub` properties from the token, then queries the `users` table for a matching user.
        - Note that what Google calls `sub` we call `google_id`.
        - If no matching user is found, the server returns an error at this point.
    - Updates the user's `email`, `google_id`, and `token` in the database.
    - Sets the `token` cookie.
    - Returns the `User` type defined in [the schema][1].
    
1. Our sign-in page:
    
    - Dispatches the `signIn` action to the `userSlice` portion of the redux store.
        - The reducer sets `authenticated` to true, and `admin` to whatever boolean value was received in our sign-in response.
    - Redirects the user to the schedule page ([see below](#render)).

### Render

Note: The schedule page is only rendered if the user is authenticated.

1. The schedule page checks the `isAuthenticated` boolean state in the `userSlice` portion of the redux store, and the result is `true`.
1. The schedule page fetches the schedule and group classes.
1. The schedule page renders itself, providing CRUD buttons if the `isAdmin` boolean state in the `userSlice` portion of the redux store is `true`.

[1]: ../src/server/schema.js
