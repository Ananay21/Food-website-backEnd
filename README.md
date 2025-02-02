**BACKEND FOR A FOOD WEBSITE**

This is a backend for a food website's Backend. The api can be used to check for logging in, signing in, adding items to your menu, updating the item, 
deleting the item, creating an order and checking the orders made by a user. 
The api runs on the localhost:3000.

**Methods**

*Authentication methods*
1.("api/v1/user/register") : Registers the user with a proper username and password and returns the JWT token (POST)
2.("api/v1/user/login") : Logs in the user (POST)

*Menu Management*
1.("api/v1/menu") : Retrieves all the menu items (GET)
2.("api/v1/menu/:id") : Retrieves a single menu item with the respective id in the params (GET)
3.("api/v1/menu/:id") : Updates a single menu item with the respective id (PUT)
4.("api/v1/menu/:id") : Deletes the menu item with the id in params (DELETE)

*Order Management*
1.("api/v1/orders/orders") : Places an order with selected items from a JSON (POST)
2.(""api/v1/orders/order") : Retrieves the orders of a logged in user (GET)
