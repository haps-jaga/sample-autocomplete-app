# Sample App

## Autocomplete assignment

This is a simple implementation for auto complete. This application contains 2 screens,

Employee Add -> User can add employee with Name and Email. Email is unique.
Employee Search -> User can search employee by using name. This search field is developed as auto complete. User can scroll to the bottom of the results to fetch more results.

This project implementation has 3 Docker containers that holds:

- MySQL database
- Rails (Ruby On Rails) backend
- Angular frontend

The entry point for a user is a website which is available under the
address: **http://localhost:4200/**

### Prerequisites

In order to run this application you need to install two tools: **Docker** & **Docker Compose**.

### Initial Setup

Run following commands to migrate and seed the data to database

```
sudo docker-compose build
```

```
sudo docker-compose run app rails db:migrate db:seed
```

### How to run it?

This application can be run using following command in a terminal:

```
$ sudo docker-compose up -d
```

If you want to stop it use following command:

```
$ sudo docker-compose down
```
