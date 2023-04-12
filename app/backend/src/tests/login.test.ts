import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
chai.use(chaiHttp);
const { expect } = chai;
import { 
emailNotFound,
invalidEmail, 
missingFields, 
shortPassword 
} from './mocks/login-data-mocked'



describe('Post login route', function () {

    it('should return an error message if there is no email or password', async function () {
  
      const response = await chai.request(app)
  
        .post('/login')
  
        .send(missingFields);

      expect(response.status).to.be.equal(400);
  
      expect(response.body).to.have.property("message", 'All fields must be filled');
  
    });
  
  
  
  
    it('should return an error message if email is not in the correct format', async function () {
  
      const response = await chai.request(app)
  
        .post('/login')
  
        .send(invalidEmail);
  
      expect(response.status).to.be.equal(401);
  
      expect(response.body).to.have.property("message", 'Invalid email or password');
  
    });
  
  
  
  
    it('should return an error message if password has less then 6 characters', async function () {
  
      const response = await chai.request(app)
  
        .post('/login')
  
        .send(shortPassword);
  
      expect(response.status).to.be.equal(401);
  
      expect(response.body).to.have.property("message", 'Invalid email or password');
  
    });
  
  
  
  
    it('should return an error message if email is not found in the database', async function () {
  
      const response = await chai.request(app)
  
        .post('/login')
  
        .send(emailNotFound);
  
      expect(response.status).to.be.equal(401);
  
      expect(response.body).to.have.property("message", 'Invalid email or password');
  
    });
  
  });