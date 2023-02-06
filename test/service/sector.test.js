const { sectorService } = require('../../src/services');
const { Sector } = require('../../database/models');
describe('Sector Service', () => {
  it('should return sector data when getSectorAndCompany called', async () => {
    jest.spyOn(Sector, 'findOne').mockResolvedValue([
      {
        id: '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
        name: 'Apple',
        ceo: 'VC',
        score: '29.987724999999998',
        rank: 1
      }
    ]);
    const companies = await sectorService.getSectorAndCompany({ sector: 'Software' });
    expect(companies).toEqual([
      {
        id: '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
        name: 'Apple',
        ceo: 'VC',
        score: '29.987724999999998',
        rank: 1
      }
    ]);
  });
});