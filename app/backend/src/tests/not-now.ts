// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');
// import TeamController from '../controllers/teamController';
// import ITeamController from '../controllers/interfaces/controllerInterface';
// import ITeamService, { ITeams } from '../services/interfaces/teamInterface';

// chai.use(chaiHttp);

// describe('TeamController', () => {
//   let controller: ITeamController;
//   let teamService: any;
//   let res: any;
//   let next: any;

//   beforeEach(() => {
//     teamService = {
//       findAll: sinon.stub(),
//       findById: sinon.stub(),
//     };
//     controller = new TeamController(teamService);
//     req = sinon.stub();
//     res = {
//       status: sinon.stub().returnsThis(),
//       json: sinon.stub().returnsThis(),
//     };
//     next = sinon.stub();
//   });

//   describe('findAll', () => {
//     it('should return a 200 response with the teams', async () => {
//       const expectedTeams: ITeams[] = [
//         { id: 1, teamName: 'Team 1' },
//         { id: 2, teamName: 'Team 2' },
//       ];
//       sinon.stub(teamService.findAll.resolves(expectedTeams));

//       const response = await controller.findAll(req, res, next)

//       expect(response).to.have.status(200);
//       expect(response.body).to.deep.equal(expectedTeams);
//     });

// //     it('should call next with an error if the service throws an error', async () => {
// //       const expectedError = new Error('Service error');
// //       teamService.findAll.throws(expectedError);

// //       await controller.findAll(_req, res, next);

// //       expect(next.calledOnceWith(expectedError)).to.be.true;
// //     });
// //   });

//   describe('findById', () => {
//     it('should return a 200 response with the team', async () => {
//       const expectedTeam: ITeams = { id: 1, teamName: 'Team 1' };
//       teamService.findById.returns(expectedTeam);

//       const response = await chai.request(controller).get(`/teams/${expectedTeam.id}`);

//       expect(response).to.have.status(200);
//       expect(response.body).to.deep.equal(expectedTeam);
//     });

//     it('should call next with an error if the service throws an error', async () => {
//       const expectedError = new Error('Service error');
//       teamService.findById.throws(expectedError);

//       await controller.findById({ params: { id: '123' } } as any, res, next);

//       expect(next.calledOnceWith(expectedError)).to.be.true;
//     });
//   });
// })
// })
