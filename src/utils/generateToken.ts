import { randomBytes } from 'crypto';

const generateToken = (size: number = 32): string => {
  return randomBytes(size).toString('hex');
}

export default generateToken;