import { Router, Request, Response, NextFunction } from 'express';
import TeamController from '../controllers/teamController';
import TeamService from '../services/teamService';
import TeamModel from '../database/models/TeamModel';

const router = Router();

const teamService = new TeamService(TeamModel);
const teamController = new TeamController(teamService);

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  teamController.findAll(req, res, next));

router.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  teamController.findById(req, res, next));

export default router;
