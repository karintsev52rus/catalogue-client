import { getImagePath } from "../helpers/getImagePath";
import { ISparePart } from "../types/sparePart";

const server = process.env.SERVER;
const staticPath = process.env.STATIC_PATH;

const getPartGroups = async () => {
  try {
    const res = await fetch(`${server}${staticPath}/parts/groups.json`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getPartList = async () => {
  try {
    const res = await fetch(`${server}${staticPath}/parts/data.json`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getImage = async (partNumber: string) => {
  try {
    const imagePath = getImagePath(partNumber);
    const res = await fetch(imagePath);
    if (res.ok) {
      return imagePath;
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    return false;
  }
};

const getPart = async (partNumber: string) => {
  try {
    const response = await fetch(
      `${server}/api/catalogue/get_part/${partNumber}`
    );
    if (response.ok) {
      const partData = response.json();
      return partData;
    } else {
      const json = await response.json();
      throw new Error(json.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export { getPartList, getImage, getPart, getPartGroups };
