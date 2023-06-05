const server = process.env.SERVER;
const staticPath = process.env.STATIC_PATH;

const getImagePath = (partNumber: string) => {
  const imagePath: string = `${server}${staticPath}/images/${partNumber}.JPG`;
  return imagePath;
};

export { getImagePath };
