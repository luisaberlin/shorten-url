# shorten-url-backend

### Installation & setup

Install dependancies:
```
npm install
```

#### Setup MongoDb

##### Install MongoDB, if not installed yet
https://docs.mongodb.com/manual/administration/install-community/  
(Do not forget to run MongoDB bevore running the app)

Start MongoDB on macOS:
```
brew services start mongodb-community@5.0
```

Stop MongoDB on macOS:
```
brew services stop mongodb-community@5.0
```


### Available Scripts

In the project directory, you can run:
```
npm start
```

Runs the app in the development mode.
Open [http://localhost:3030](http://localhost:3030) to view it in the browser.


### Enpoints:  

| Method | Route  | Description                       |
|--------|--------|-----------------------------------|
| POST   | /      | Returns shortened url             |
| GET    | /:code | Redirects to url of shortened url |
| GET    | / | Returns all urls (for testing) |
| DELETE    | / | Removes all urls from db (for testing) |