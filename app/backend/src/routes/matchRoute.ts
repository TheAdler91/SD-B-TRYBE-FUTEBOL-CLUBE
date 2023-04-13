import { Router, Request, Response, NextFunction } from 'express';
import MatchController from '../controllers/matchController';
import MatcheService from '../services/matchService';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
// import TeamsService from '../services/teamService';
import tokenToValidate from '../middlewares/auth-token';
import MatchesValidations from '../services/validations/matchValidations';

const router = Router();

const validations = new MatchesValidations();
// const teamService = new TeamsService(TeamModel);
const matchService = new MatcheService(MatchModel, TeamModel, validations);
const matchController = new MatchController(matchService);

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  matchController.getMatches(req, res, next));

router.patch('/:id/finish', tokenToValidate, (req: Request, res: Response, next: NextFunction) =>
  matchController.closeMatch(req, res, next));

router.patch('/:id', tokenToValidate, (req: Request, res: Response, next: NextFunction) =>
  matchController.updateMatch(req, res, next));

router.post('/', tokenToValidate, (req: Request, res: Response, next: NextFunction) =>
  matchController.newMatch(req, res, next));

export default router;
