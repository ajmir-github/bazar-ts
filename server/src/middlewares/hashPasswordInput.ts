import { hashSync } from "bcryptjs";

const hashPasswordInput: Handler = (request, response, next) => {
  const password: string | undefined = request.body.password;
  if (password) request.body.password = hashSync(password);
  return next();
};

export default hashPasswordInput;
