import { Router } from 'express';
import LeaderoardBController from '../controllers/leaderboardController';
import LeaderboardService from '../services/leaderboardService';
import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatchModel';

const router = Router();

const service = new LeaderboardService(Matches, Teams);
const controller = new LeaderoardBController(service);

router.get('/home', controller.getAllHome);

export default router;
