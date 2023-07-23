

# Academic Records Management System

Welcome to theAcademic Records Management System! This powerful web application is designed specifically for educational institutions, including schools, colleges, and universities, to efficiently manage and showcase student details. The project focuses on the backend implementation using Node.js, providing a robust foundation for handling student information and streamlining administrative tasks.

Here I have integrate the [Library API](https://github.com/arihantjain916/Library-Management-System.git) which I have made using GraphQL.  



## API Reference

**Note**:
- Use token to access all the protected routes.  
- To access the GraphQL Routes [click here](https://documenter.getpostman.com/view/18412970/2s946fdsKy)




#### Register User

##### User Route

```http
  POST /api/v1/user/signup
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `name`    | `string` | **Required**.|
| `email`   | `string` | **Required**.| 
| `password`| `string` | **Required**.|

#### Login User

```http
  POST /api/v1/user/login
```

| Parameter | Type     | Description  |
| :-------- | :------- | :------------|
| `email`   | `string` | **Required**.|
| `password`| `string` | **Required**.|

#### Get Profile of the login user

```http
  GET /api/v1/user/profile
```

#### LogOut User

```http
  GET /api/v1/user/logout
```



##### Student Route

#### Register Student

```http
  POST /api/v1/student/register
```

| Parameter    | Type     | Description   |
| :----------- | :------- | :-------------|
| `first name` | `string` | **Required**. |
| `last name`  | `string` | **Required**. |
| `city`       | `string` | **Required**. |
| `state`      | `string` | **Required**. |
| `phonenumber`| `Integer`| **Required**. |
| `email`      | `string` | **Required**. |
| `password`   | `string` | **Required**. |

#### Get Pofile of Student

```http
  GET /api/v1/student/profile
```

#### Update Student

```http
  PATCH /api/v1/student/profile/update/${id}
```

| Parameter    | Type     | Description             |
| :----------- | :------- | :---------------------  |
| `id`         | `string` | **Required**. student id|
| `fields you want to update`   | `string` | **Required**. student id|

#### Delete Student

```http
  PATCH /api/v1/student/delete/${id}
```

| Parameter    | Type     | Description             |
| :----------- | :------- | :---------------------  |
| `id`         | `string` | **Required**. student id|

#### Create Class

```http
  POST /api/v1/class/create
```

| Parameter    | Type     | Description             |
| :----------- | :------- | :---------------------  |
| `name`         | `string` | **Required**.         |


#### Create Subjects

```http
  POST /api/v1/class/${id}/subjects
```

| Parameter    | Type     | Description             |
| :----------- | :------- | :---------------------  |
| `id`         | `string` | **Required**. class id  |
|`subjects`    |`array`   |**Required**. class id   |

*Example:* subjects=["hindi","science"....] 


#### GET Subjects

```http
  GET /api/v1/class/${id}/subjects
```

| Parameter    | Type     | Description             |
| :----------- | :------- | :---------------------  |
| `id`         | `string` | **Required**. class id  |

#### Add Marks

```http
  POST /api/v1/marks/${id}/add
```

| Parameter    | Type     | Description             |
| :----------- | :------- | :---------------------  |
| `id`         | `string` | **Required**.subject id |
| `marks`      | `string` | **Required**.           |
| `studentname`| `string` | **Required**.           |

#### GET Marks

```http
  POST /api/v1/marks/${id}/add
```

| Parameter| Type     | Description             |
| :--------| :------- | :---------------------  |
| `id`     | `string` | **Required**.subject id |
| `studid` | `string` | **Required**. student id|


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`PORT`

`JWT_SECRET`

`GRAPHQL_ENDPOINT`


## Tech Stack

**Server:** ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)     
**Database:** ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


## Run Locally

Clone the project

```bash
  git clone https://github.com/arihantjain916/Academic-Records-Management-System.git
```

Go to the project directory

```bash
  cd ERP-Portal Backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


# Hi, I'm Arihant Jain! 👋


## 🚀 About Me
I'm a full stack developer...



🧠 I'm currently learning Nextjs

🤔 I'm looking for help to build frontend

📫 Reach me through arihantj916@gmail.com



## 🛠 Skills
Django, Node.js, SQL, NoSQL, Reactjs, Nextjs

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arihantjain916)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/arihantjain916)
## Feedback

If you have any feedback, please reach out at arihantj916@gmail.com


## Support

For support, email arihantj916@gmail.com

