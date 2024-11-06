import fs from 'fs';
import generateToken from '../../utils/generateToken';
import login from './login';

jest.mock('fs');
jest.mock('../../utils/generateToken');

describe('login function', () => {
  const mockCredentials = { username: 'testuser', password: 'password123' };
  const mockUsers = [
    { username: 'testuser', password: 'password123' },
    { username: 'otheruser', password: 'password456' }
  ];

  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockUsers));
    (generateToken as jest.Mock).mockReturnValue('mocked_token');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a token when login is successful', async () => {
    const response = await login(mockCredentials);
    expect(response.token).toBe('mocked_token');
    expect(generateToken).toHaveBeenCalledWith(32);
  });

  it('should return null when login fails', async () => {
    const invalidCredentials = { username: 'invaliduser', password: 'wrongpassword' };
    const response = await login(invalidCredentials);
    expect(response.token).toBeNull();
    expect(generateToken).not.toHaveBeenCalled();
  });

  it('should throw an error if reading users fails', async () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('File read error');
    });

    await expect(login(mockCredentials)).rejects.toThrow('Login failed');
  });
});
