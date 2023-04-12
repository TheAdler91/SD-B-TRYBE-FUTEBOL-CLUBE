import { Router, Request, Response, NextFunction } from 'express';
import MatchController from '../controllers/matchController';
import MatcheService from '../services/matchService';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import tokenToValidate from '../middlewares/auth-token';

const router = Router();

const matchService = new MatcheService(MatchModel, TeamModel);
const matchController = new MatchController(matchService);

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  matchController.getMatches(req, res, next));

router.patch('/:id/finish', tokenToValidate, (req: Request, res: Response, next: NextFunction) =>
  matchController.closeMatch(req, res, next));

router.patch('/:id', tokenToValidate, (req: Request, res: Response, next: NextFunction) =>
  matchController.updateMatch(req, res, next));

router.post('/', tokenToValidate, (req: Request, res: Response, next: NextFunction) =>
  matchController.updateMatch(req, res, next));

export default router;
