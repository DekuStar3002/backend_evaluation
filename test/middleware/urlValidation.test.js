const { urlValidation } = require('../../src/middlewares');

describe('Query Validation Middleware', () => {
  it('should call next method when urlValidation called', async () => {
    const mockReq = {
      body: {
        urlLink: 'urlLink'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();
    urlValidation(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalled();
  });

  it('should throw error when urlValidation cause error', async () => {
    const mockReq = {
      body: {
        
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();
    urlValidation(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({ message: '"urlLink" is required' });
  });
});