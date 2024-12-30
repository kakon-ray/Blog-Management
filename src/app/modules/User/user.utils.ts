import Jwt from "jsonwebtoken";


export const createToken = (
  jsonPayload: { userId: string; role: string },
  secret: string,
  expireshIn: string
) => {
  return Jwt.sign(jsonPayload, secret as string, { expiresIn: expireshIn });
};
