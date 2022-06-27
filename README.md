# PhoneBook

### Run the api:
Go to the phonebook_api folder

`cd phonebook_api`

To install the node modules as well as run the api 

`npm start`


## Run the frontend:
Go to the frontend folder

`cd frontend`

To install the node modules as well as run the frontend 

`npm start`


### REST API

As soon as the api runs, it will expose port 4000 that will accept 4 kinds of requests.

#### GET a list of phonebook entries

##### Request:
`GET /entries`

Example Request: 
https://localhost:4000/entries

##### Response: 
Example

[
  {
    "_id": "62b8b846e346ca5b316831c6",
    "firstName": "Yash",
    "lastName": "Deora",
    "phoneNumber": "902222322",
    "__v": 0
  },
  {
    "_id": "62b8b9329b48daa023f7b68d",
    "firstName": "Amay",
    "lastName": "Rathi",
    "phoneNumber": "7070707070",
    "__v": 0
  }
]



#### CREATE a phonebook entry

##### Request:
`POST /entries/create`

Example Request: 
https://localhost:4000/entries/create

##### Response:
{
  "message": "Entry Created"
}


#### UPDATE an entry

##### Request:
`PUT /entries/update/:id`

Example Request: 
http://localhost:4000/entries/update/62b8b846e346ca5b316831c6

##### Response:
{
  "message": "Entry updated"
}

#### DELETE an entry

##### Request:
`DELETE /entries/delete/:id`

Example Request: 
http://localhost:4000/entries/delete/62b8b846e346ca5b316831c6

##### Response:
{
  "message": "Entry deleted"
}

