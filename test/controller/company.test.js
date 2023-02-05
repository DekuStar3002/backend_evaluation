const { companyController } = require('../../src/controllers');
const { companyService } = require('../../src/services');

describe('Company Controller', () => {
  it('should return all company data when save method called', async () => {
    jest.spyOn(companyService, 'save').mockResolvedValue([
      {
        id: 'c144e397-bef9-4aa1-aef4-842f4da44f9c',
        name: 'Ebay',
        ceo: 'Eileen Rutherford',
        description: null,
        score: '17.4116',
        sector_id: 127,
        address: null,
        createdAt: '2023-02-05T08:14:38.741Z',
        updatedAt: '2023-02-05T08:15:12.545Z'
      },
    ]);
    const mockReq = {
      body: jest.fn(),
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await companyController.save(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockRes.json).toBeCalledWith([
      {
        id: 'c144e397-bef9-4aa1-aef4-842f4da44f9c',
        name: 'Ebay',
        score: '17.4116'
      },
    ]);
  });

  it('should return error when save method called', async () => {
    jest.spyOn(companyService, 'save').mockRejectedValue(new Error('Internal Server Error'));
    const mockReq = {
      body: jest.fn(),
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await companyController.save(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server Error'
    });
  });
});