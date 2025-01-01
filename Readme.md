# BACKEND API DOCUMENTATION



### DESCRIPTION

REGISTER A NEW USER BY CREATING A NEW ACCOUNT

### HTTP METHOD

`POST`

##  `user/register` ENDPOINT


## REQUEST BODY:-

The request body should be in  JSON format and also include fields like:-
- `fullname `(object):
 -`firstname` (string required): User's firstname (minimum 3 characters).
 -`lastname`(string required): User's lastname (minimum 3 characters).
-`email`(string required): User's email address (must be a valid email).
-`password`(string required): User's password (must be 6 characters).


## RESPONSE 

- `user`(object):
 - `fullname`(object):
   -`firstname`(string): User's first name (minimum 3 character). 
   -`lastname`(string): User's lastname (minimum 3 charcter).
-`email`(string): User's email address (must be a valid email).
-`password`(string):User's password (minimum 6 character).

-`token`(String): JWT Token.