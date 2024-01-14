// // var assert = require('assert');
// // describe('My first test case', function(){
// //   it('value check', function(){
// //     assert.equal([1,2,4].indexOf(3),2);
// //   })
// // })

// // var chai = require('chai')
// // var assert = chai.assert;

// // describe('Aspect check',function(){

// //   let username = 'aniruddha';
// //   it("check string",function(){
// //     assert.typeOf(username,'string');
// //   })
// // })


// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../index'); // Assuming your Express app is in index.js
// const User = require('../models/user');

// chai.use(chaiHttp);
// const { expect } = chai;

// describe('Authentication Routes', () => {
//   describe('POST /api/auth/signup', () => {
//     it('should create a new user and return a token', async () => {
//       // Your test user data
//       const userData = {
//         username: 'testuser',
//         password: 'testpassword',
//       };

//       // Clear the test user if it already exists
//       await User.deleteOne({ username: userData.username });

//       // Make a request to the signup endpoint
//       const res = await chai
//         .request(app)
//         .post('/api/auth/signup')
//         .send(userData);

//       // Assert the response
//       expect(res).to.have.status(201);
//       expect(res.body).to.have.property('token');

//       // Clean up: delete the test user
//       await User.deleteOne({ username: userData.username });
//     });

//     it('should return an error if the username already exists', async () => {
//       // Your test user data
//       const userData = {
//         username: 'testuser',
//         password: 'testpassword',
//       };

//       // Create the test user
//       await User.create(userData);

//       // Make a request to the signup endpoint with the same username
//       const res = await chai
//         .request(app)
//         .post('/api/auth/signup')
//         .send(userData);

//       // Assert the response
//       expect(res).to.have.status(400);
//       expect(res.body).to.have.property('message', 'Username already exists');

//       // Clean up: delete the test user
//       await User.deleteOne({ username: userData.username });
//     });

//     // Add more tests for other scenarios
//   });
// });
