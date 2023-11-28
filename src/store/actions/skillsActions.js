/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

import api from "../../singletons/api";

export const searchSkills = async (query) => {
  try {
    const skills = await api.skills.searchSkills(query);

    return skills;
  } catch (error) {
    console.error("searchSkills error: ", error);

    throw error;
  }
};
