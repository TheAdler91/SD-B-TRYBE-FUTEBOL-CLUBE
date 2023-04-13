import { NotFoundError, UprocessableEntityError } from '../../error';

export default class MatchesValidations {
  matchValidation = (homeId: number, awayId: number): void => {
    if (homeId === awayId) {
      throw new
      UprocessableEntityError('It is not possible to create a match with two equal teams');
    }

    if (homeId > 16 || awayId > 16) throw new NotFoundError('There is no team with such id!');

    if (homeId < 1 || awayId < 1) throw new NotFoundError('There is no team with such id!');
  };
}
