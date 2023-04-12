import { Router, Request, Response, NextFunction } from 'express';
import MatchController from '../controllers/matchController';
import MatcheService from '../services/matchService';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

const router = Router();

const matchService = new MatcheService(MatchModel, TeamModel);
const matchController = new MatchController(matchService);

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  matchController.getMatches(req, res, next));

export default router;
