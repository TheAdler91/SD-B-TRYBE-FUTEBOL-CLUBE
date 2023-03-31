// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import { app } from '../app';
import { Model } from 'sequelize';
import Teams from '../database/models/TeamModel';
import { team, teams } from './mocks/data-mocked'

chai.use(chaiHttp);

const { expect } = chai;


  describe ('GET teams route', () => {

      it('should return all teams', async () => {
        const httpResponse = await chai.request(app).get('/teams')
        expect(httpResponse.status).to.equal(200)
        expect(httpResponse.body).to.deep.equal(teams)
      })

      it('should return by Id', async () => {
        sinon.stub(Model, 'findByPk').resolves(team as Teams)
    
        const httpResponse = await chai.request(app).get('/teams/1')
    
        expect(httpResponse.body).to.deep.equal(team)
    
        })
  })
