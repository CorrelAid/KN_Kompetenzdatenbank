## 

## Explanation of admin concept
 I created a trigger that causes a function to run everytime a new user is added. This function checks if the email of the newly added user is in the admin_emails database. If thats the case the user gets automatically added to the admin_database (including the id of the authenticated user).