import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, hashedOne) => {
  const isMatched = await bcrypt.compare(password, hashedOne);
  return isMatched;
};

export { hashPassword, comparePassword };
