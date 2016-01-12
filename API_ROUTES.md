# Api Routes: 

  all objects posted and returned in JSON format

  all POST data must be sent in JSON form, for examples see DATABASE_SCHEMA
  https://github.com/fearlessgerbil/fearlessgerbil/blob/master/DATABASE_SCHEMA.md
  
  ### /business :

    /api/businesses - GET - returns ALL businesses
                            ApiSuccessExample Success-Response:
                              200 OK
                              [{
                                "_id": "569411111c244bdc173effdf",
                                "username": "zack",
                                "password": <hashed password here>,
                                "name": "zack",
                                "address": "ca",
                                "phone": "2",
                                "website": "www.zack.com",
                                "email": "zack@zack.com"
                              }, ...]
                    
    /api/businesses/signup - POST - creates new business on success returns full
                                    business object including unique business id
                                    ApiSuccessExample Success-Response:
                                      201 OK
                                      {
                                        "_id": "569411111c244bdc173effdf",
                                       "username": "zack",
                                       "password": <hashed password here>,
                                       "name": "zack",
                                       "address": "ca",
                                       "phone": "2",
                                       "website": "www.zack.com",
                                       "email": "zack@zack.com"
                                      }

    /api/businesses/signin - POST - checks username and password against database, 
                                    returns unique business Id
                                    ApiSuccessExample Success-Response:
                                      200 OK
                                      {
                                        "id": "569411111c244bdc173effdf"
                                      }


    /api/business/:id - GET - returns business object matching id supplied
                              ApiSuccessExample Success-Response:
                                200 OK
                                {
                                  "_id": "569411111c244bdc173effdf",
                                  "username": "zack",
                                  "password": <hashed password here>,
                                  "name": "zack",
                                  "address": "ca",
                                  "phone": "2",
                                  "website": "www.zack.com",
                                  "email": "zack@zack.com"
                                }

                      - PUT - updates business object with matching id and  
                              return updated business object
                      - DELETE - deletes business object with matching id
                                 ApiSuccessExample Success-Response:
                                   200 OK
                                   {
                                     "messages": "business removed"
                                   }
  ### /items  :

    /api/items - GET - gets ALL items from database
                       ApiSuccessExample Success-Response:
                         200 OK
                         [{
                           "_id": ""569411111c244bdc173effdf"",
                           "item": "football",
                           "price": 9,
                           "desc": "sports",
                           "amt": 2,
                           "img": "img2",
                           "businessId": "569411111c244bdc173effdf",
                           "dates": []
                         }, ...]

               - POST - creates new item in database on success, will return unique 
                        item id
                        ApiSuccessExample Success-Response:
                          201 OK
                          {
                            "id": "569411111c244bdc173effdf" 
                          }


    /api/items/:id - GET - retrieves item matching unique id supplied and returms 
                           item object
                           ApiSuccessExample Success-Response:
                             201 OK
                             {
                               "_id": ""569411111c244bdc173effdf"",
                               "item": "football",
                               "price": 9,
                               "desc": "sports",
                               "amt": 2,
                               "img": "img2",
                               "businessId": "569411111c244bdc173effdf",
                               "dates": [] 
                             }
                   - PUT - updates existing item based on its unique item id, 
                           if item id does not exist will return a 404
                           ApiSuccessExample Success-Response:
                             201 OK
                             {
                               "_id": ""569411111c244bdc173effdf"",
                               "item": "football",
                               "price": 9,
                               "desc": "sports",
                               "amt": 2,
                               "img": "img2",
                               "businessId": "569411111c244bdc173effdf",
                               "dates": []  
                             } 
                   - DELETE - will delete an item based on its unique item id
                              ApiSuccessExample Success-Response:
                                200 OK
                                {
                                  "messages": "item removed"
                                }

    /api/items/getall/:businessid - GET - will return all items with refernce to 
                                          its unique business id
                                          ApiSuccessExample Success-Response:
                                            200 OK
                                            [{
                                              "_id": ""569411111c244bdc173effdf"",
                                              "item": "football",
                                              "price": 9,
                                              "desc": "sports",
                                              "amt": 2,
                                              "img": "img2",
                                              "businessId": "569411111c244bdc173effdf",
                                              "dates": []
                                            },{
                                              "_id": ""569411111c244bdc173effdf"",
                                              "item": "football",
                                              "price": 9,
                                              "desc": "sports",
                                              "amt": 2,
                                              "img": "img2",
                                              "businessId": "569411111c244bdc173effdf",
                                              "dates": []
                                            }, ...]

  ## /messages  :

    /api/messages - GET - gets ALL messages from database
                          ApiSuccessExample Success-Response:
                            200 OK
                            [{
                              "_id": "369411111c244bdc173effaf",
                              "name": "zack",
                              "email": "zack@zack.com",
                              "phone": "22",
                              "dates": [],
                              "items": ["569411111c244bdc173effdf", 
                                        "569411111c244bdc173effaf"],
                              "businessId": "569411111c244bdc173eadad"
                            }, ...]

                  - POST - posts a new message to the database, on success returns 
                           the entire message object
                           ApiSuccessExample Success-Response:
                             200 OK
                             {
                               "_id": "369411111c244bdc173effaf",
                               "name": "zack",
                               "email": "zack@zack.com",
                               "phone": "22",
                               "dates": [],
                               "items": ["569411111c244bdc173effdf", 
                                         "569411111c244bdc173effaf"],
                               "businessId": "569411111c244bdc173eadad"
                             }


    /api/messages/:businessid - GET - returns all messages for the business matching
                                      the unique business id supplied, messages 
                                      include item objects contained in message
                                      ApiSuccessExample Success-Response:
                                        200 OK
                                        [{
                                          "_id": "369411111c244bdc173effaf",
                                          "name": "zack",
                                          "email": "zack@zack.com",
                                          "phone": "22",
                                          "dates": [],
                                          "items": [{
                                              "_id": ""569411111c244bdc173effdf"",
                                              "item": "football",
                                              "price": 9,
                                              "desc": "sports",
                                              "amt": 2,
                                              "img": "img2",
                                              "businessId": "569411111c244bdc173effdf",
                                              "dates": []
                                            },{
                                              "_id": ""569411111c244bdc173effdf"",
                                              "item": "football",
                                              "price": 9,
                                              "desc": "sports",
                                              "amt": 2,
                                              "img": "img2",
                                              "businessId": "569411111c244bdc173effdf",
                                              "dates": []
                                            }, ...],
                                          "businessId": "569411111c244bdc173eadad"
                                        }, ...]

    /api/messages/:messageid - DELETE - deletes individual message based on unique
                                        message id, return mesasge "message deleted"
                                        ApiSuccessExample Success-Response:
                                          200 OK
                                          {
                                            "messages": "deleted"
                                          }


