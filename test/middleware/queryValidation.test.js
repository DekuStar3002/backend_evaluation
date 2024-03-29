const { queryValidaton } = require('../../src/middlewares');

describe('Query Validation Middleware', () => {
  it('should call next method when queryValidation.sectorValidaton called', async () => {
    const mockReq = {
      query: {
        sector: 'sector'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();
    queryValidaton.sectorValidaton(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalled();
  });

  it('should throw error when queryValidation.sectorValidaton cause error', async () => {
    const mockReq = {
      query: {
        
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();
    queryValidaton.sectorValidaton(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({ message: "\"sector\" is required" });
  });
  
  it('should call next method when queryValidation.idValidaton called', async () => {
    const mockReq = {
      query: {
        id: '1234'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();
    queryValidaton.idValidaton(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalled();
  });

  it('should throw error when queryValidation.idValidaton cause error', async () => {
    const mockReq = {
      query: {
        id: 1234
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();
    queryValidaton.idValidaton(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({ message: "\"id\" must be a string" });
  });
});