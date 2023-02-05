const { sectorController } = require('../../src/controllers');
const { sectorService } = require('../../src/services');
describe('Sector Controller', () => {
  it('should return all company data with rank for a sector when getCompanyInRank called', async () => {
    jest.spyOn(sectorService, 'getSectorAndCompany').mockResolvedValue({
      id: 122,
      name: 'Software',
      createdAt: '2023-02-05T05:24:58.554Z',
      updatedAt: '2023-02-05T05:24:58.554Z',
      company: [
        {
          id: '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
          name: 'Apple',
          ceo: 'VC',
          description: null,
          score: '29.987724999999998',
          sector_id: 122,
          address: 'address',
          createdAt: '2023-02-05T05:24:39.785Z',
          updatedAt: '2023-02-05T06:42:16.893Z'
        },
      ]
    });
    const mockReq = {
      query: jest.fn(),
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await sectorController.getCompanyInRank(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith([
      {
        'id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
        'name': 'Apple',
        'ceo': 'VC',
        'score': '29.987724999999998',
        'rank': 1
      },
    ]);
  });

  it('should return error when getCompanyInRank throws error', async () => {
    jest.spyOn(sectorService, 'getSectorAndCompany').mockRejectedValue(new Error('Internal Server Error'));
    const mockReq = {
      query: jest.fn(),
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await sectorController.getCompanyInRank(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server Error'
    });
  });
});