import fs from "fs";
import generateToken from "../../utils/generateToken";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string | null;
}

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const users = fs.readFileSync("../data/users.json", "utf8");
    const parsedUsers = JSON.parse(users);

    // Check if the user exists in the array
    const userExists = parsedUsers.some(
      (user: LoginCredentials) =>
        user.username === credentials.username &&
        user.password === credentials.password
    );

    let token = null;
    if (userExists) {
      token = generateToken(32);
    }
    return { token };
  } catch (error: any) {
    throw new Error("Login failed: " + error.message);
  }
};

export default login;
