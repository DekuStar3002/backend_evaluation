const { bodyValidation } = require('../../src/middlewares');

describe('Body Validation Middleware', () => {
  it('should call next method when bodyValidation called', async () => {
    const mockReq = {
      body: {
        ceo: 'ceo',
        address: 'address'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();
    bodyValidation(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalled();
  });

  it('should throw error when bodyValidation cause error', async () => {
    const mockReq = {
      body: {
        ceo: 1234,
        address: 12345
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();
    bodyValidation(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({ message: "\"ceo\" must be a string" });
  });
});