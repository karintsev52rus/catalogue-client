const server = process.env.SERVER;

export const activation = async (activationLink: string) => {
  try {
    const response = await fetch(
      `${server}/api/auth/activation/${activationLink}`
    );

    if (response.ok) {
      return (await response.json()) as { message: string };
    } else {
      const { message } = await response.json();
      throw new Error(message);
    }
  } catch (error) {
    console.log(error);
    return error as Error;
  }
};
