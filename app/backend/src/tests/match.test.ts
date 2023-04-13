import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { matchesmock, token, matchesInProgress } from './mocks/match-data-mocked';
import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Get matches route', function () {

  it('should return all matches', async function () {

    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);

    expect(response.body).to.deep.equal(matchesmock);
  });

  it('should return all matches in progress', async function () {

    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.be.equal(200);

    expect(response.body).to.deep.equal(matchesInProgress);
  });



  it('should return an error in case token is missing /matches/:id', async function () {

    const response = await chai.request(app).patch('/matches/1');

    expect(response.status).to.be.equal(401);

    expect(response.body).to.have.property("message", "Token not found");
  });


  it('should return an error in case token is not valid /matches/:id', async function () {
   
    const response = await chai.request(app).patch('/matches/1').set('Authorization', 'Bearer ' + token);

    expect(response.status).to.be.equal(401);

    expect(response.body).to.have.property("message", "Token must be a valid token");
  });

});