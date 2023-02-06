const { companyService } = require('../../src/services');
const { Company, Sector } = require('../../database/models');
const axios = require('axios');
jest.mock('axios');
describe('Company Service', () => {
  it('should return all company data when sector already present and save method called', async () => {
    axios.get.mockResolvedValueOnce({
      data: 'company_id,company_sector\n95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile'
    });

    axios.get.mockResolvedValueOnce({
      data: {
        id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
        name: 'Volkswagen',
        description: 'Qui dolore alias provident suscipit aliquid. Quaerat quam molestias ullam. Dolor molestias facere quia. Dolore consequuntur totam repellendus.',
        ceo: 'Mr. Marie Sipes',
        tags: [
          'intuitive',
          'interactive',
          'e-business',
          'visionary',
          'B2C',
          'front-end'
        ]
      }
    });

    jest.spyOn(Company, 'create').mockResolvedValue({});

    axios.get.mockResolvedValueOnce ({
      data: [
        {
          'companyId': '95b5a067-808a-44a9-a490-b4ef8a045f61',
          'performanceIndex': [
            {
              'key': 'cpi',
              'value': 0.46
            },
            {
              'key': 'cf',
              'value': 523763
            },
            {
              'key': 'mau',
              'value': 0.05
            },
            {
              'key': 'roic',
              'value': 5.66
            }
          ]
        },
      ]
    });
    
    jest.spyOn(Sector, 'findOne').mockResolvedValue({
      data: {
        id: 1,
        name: 'Software',
      }
    });

    jest.spyOn(Company, 'update').mockResolvedValue({
      data: [1]
    });

    jest.spyOn(Company, 'findAll').mockResolvedValue([
      {
        'id': '728ae3b7-89dd-41eb-9608-4fc20c839d4c',
        'name': 'Mercedes',
        'score': '18.481825'
      },
      {
        'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
        'name': 'Volkswagen',
        'score': '15.784075000000001'
      }
    ]);
    const companies = await companyService.save({ urlLink: 'https://hello-world.com' });
    expect(companies).toEqual([
      {
        'id': '728ae3b7-89dd-41eb-9608-4fc20c839d4c',
        'name': 'Mercedes',
        'score': '18.481825'
      },
      {
        'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
        'name': 'Volkswagen',
        'score': '15.784075000000001'
      }
    ]);
  });

  it('should return all company data when sector not present and save method called', async () => {
    axios.get.mockResolvedValueOnce({
      data: 'company_id,company_sector\n95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile'
    });

    axios.get.mockResolvedValueOnce({
      data: {
        id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
        name: 'Volkswagen',
        description: 'Qui dolore alias provident suscipit aliquid. Quaerat quam molestias ullam. Dolor molestias facere quia. Dolore consequuntur totam repellendus.',
        ceo: 'Mr. Marie Sipes',
        tags: [
          'intuitive',
          'interactive',
          'e-business',
          'visionary',
          'B2C',
          'front-end'
        ]
      }
    });

    jest.spyOn(Company, 'create').mockResolvedValue({});

    axios.get.mockResolvedValueOnce ({
      data: [
        {
          'companyId': '95b5a067-808a-44a9-a490-b4ef8a045f61',
          'performanceIndex': [
            {
              'key': 'cpi',
              'value': 0.46
            },
            {
              'key': 'cf',
              'value': 523763
            },
            {
              'key': 'mau',
              'value': 0.05
            },
            {
              'key': 'roic',
              'value': 5.66
            }
          ]
        },
      ]
    });
    
    jest.spyOn(Sector, 'findOne').mockResolvedValue(null);
    
    jest.spyOn(Sector, 'create').mockResolvedValue({
      id: 1,
      name: 'Software',
    });

    jest.spyOn(Company, 'update').mockResolvedValue({
      data: [1]
    });

    jest.spyOn(Company, 'findAll').mockResolvedValue([
      {
        'id': '728ae3b7-89dd-41eb-9608-4fc20c839d4c',
        'name': 'Mercedes',
        'score': '18.481825'
      },
      {
        'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
        'name': 'Volkswagen',
        'score': '15.784075000000001'
      }
    ]);
    const companies = await companyService.save({ urlLink: 'https://hello-world.com' });
    expect(companies).toEqual([
      {
        'id': '728ae3b7-89dd-41eb-9608-4fc20c839d4c',
        'name': 'Mercedes',
        'score': '18.481825'
      },
      {
        'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
        'name': 'Volkswagen',
        'score': '15.784075000000001'
      }
    ]);
  });

  it('should return updated company when company present and update method called', async () => {
    const id = '95b5a067-808a-44a9-a490-b4ef8a045f61';
    const body = {
      ceo: 'ceo',
      address: 'address'
    };
    jest.spyOn(Company, 'findOne').mockResolvedValue({
      data: {
        id,
        name: 'Volkswagen',
        description: 'Qui dolore alias provident suscipit aliquid. Quaerat quam molestias ullam. Dolor molestias facere quia. Dolore consequuntur totam repellendus.',
        ceo: 'Mr. Marie Sipes',
        address: '',
        score: '18.92',
      }
    });

    jest.spyOn(Company, 'update').mockResolvedValue([ 1 ]);

    const updatedCompany = await companyService.update(id, body);
    expect(updatedCompany).toEqual([ 1 ]);
  });

  it('should return empty object when company not present and update method called', async () => {
    const id = '95b5a067-808a-44a9-a490-b4ef8a045f61';
    const body = {
      ceo: 'ceo',
      address: 'address'
    };
    jest.spyOn(Company, 'findOne').mockResolvedValue(null);

    const updatedCompany = await companyService.update(id, body);
    expect(updatedCompany).toEqual({});
  });
});