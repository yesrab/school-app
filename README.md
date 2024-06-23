# Project Setup

## Setting Environment Variables

Create a `.env` file in the root directory of your project and add the following content:

```


PORT=8080
DB=mongodb+srv://<username>:<password>@<your-mongodb-cluster-url>
NODE_ENV=production
```

start project

```
npm run dev

```

Ensure you have Node.js installed and your project dependencies are up to date.

Ensure you have Node.js installed and your project dependencies are up to date.

## API Documentation

### Add Teacher

- **URL**: `/api/v1/teachers/addTeacher`
- **Method**: `POST`
- **Data Params**
- json
  {
  "fullName": "Yesrab Ali",
  "gender": "Male",
  "DOB": "2021-10-21",
  "emailId": "yesrab@google.com",
  "mobileNumber": "7013809402",
  "homeAddress": "28 Spenser Road",
  "salary": 69696,
  "KYC_Details": {
  "bankName": "union",
  "bankAccountNumber": 2077010654,
  "bankIFSC": "123123ada",
  "bankBranch": "207 Lakewood Gardens Alley",
  "PAN": "789FG5678H"
  },
  "teacherType": "Substitute"
  }

### Add All Teachers

- **URL**: `/api/v1/teachers/addAllTeachers`
- **Method**: `POST`
- **Data Params**
- json
  [
  {
  "name": {
  "f_name": "Ted",
  "m_name": "Crééz",
  "l_name": "Roylance"
  },
  "gender": "Female",
  "DOB": "2021-10-21",
  "emailId": "troylance0@wisc.edu",
  "mobileNumber": "3117026011",
  "homeAddress": "28 Spenser Road",
  "salary": 89476,
  "KYC_Details": {
  "bankName": "hdfc",
  "bankAccountNumber": 2077010654,
  "bankIFSC": "123123ada",
  "bankBranch": "207 Lakewood Gardens Alley",
  "PAN": "789FG5678H"
  },
  "teacherType": "Regular"
  }
  // Additional teachers omitted for brevity
  ]

### Add Student

- **URL**: `/api/v1/students/addStudent`
- **Method**: `POST`
- **Data Params**
- json
  {
  "fullName": "Yesrab Ali",
  "gender": "Male",
  "DOB": "1999-05-15",
  "emailId": "yesrab@example.com",
  "mobileNumber": "7013809402",
  "homeAddress": "123 Main St, City, Country",
  "guardians": [
  {
  "guardianName": "Sadique Ali",
  "guardianMobileNumber": "9987654321",
  "guardianEmailId": "sadique@example.com",
  "isParent": true,
  "guardianHomeAddress": "456 Oak St, City, Country"
  }
  ],
  "enrollmentStatus": "Active"
  }

## Additional Notes

Ensure all API calls are authenticated and validated to prevent unauthorized access.

### A postman collection has been added for further information
