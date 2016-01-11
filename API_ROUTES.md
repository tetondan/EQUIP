# Api Routes: 

  all objects posted and returned in JSON format
  
  ### /business :

    /api/businesses - GET - returns ALL businesses
                    
    /api/businesses/signup - POST - creates new business on success returns full
                                     business object including unique business id

    /api/businesses/sigin - POST - checks username and password against database, 
                                   returns unique business Id

    /api/business/:id - GET - returns business object matching id supplied
                      - DELETE - deletes business from database

  ### /items  :

    /api/items - GET - gets ALL items from database
               - POST - creates new item in database on success, will return unique 
                        item id

    /api/items/:id - GET - retrieves item matching unique id supplied and returms 
                           item object
                   - PUT - updates existing item based on its unique item id, 
                           if item id does not exist will return a 404 
                   - DELETE - will delete an item based on its unique item id

    /api/items/getall/:businessid - GET - will return all items with refernce to 
                                          its unique business id

  ## /messages  :

    /api/messages - GET - gets ALL messages from database
                  - POST - posts a new message to the database, on success returns 
                           the entire message object

    /api/messages/:businessid - GET - returns all messages for the business matching
                                      the unique business id supplied, messages 
                                      include item objects contained in message

    /api/messages/:messageid - DELETE - deletes individual message based on unique
                                        message id, return mesasge "message deleted"                                  

