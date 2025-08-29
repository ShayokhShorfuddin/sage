"use server";

type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
};

// Register a new user
async function RegisterUserAction({
  name,
  email,
  password,
}: RegisterUserInput) {
  return { isOkay: true, message: "User registered successfully" };
}

export { RegisterUserAction };
