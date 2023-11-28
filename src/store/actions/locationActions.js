/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

import api from "../../singletons/api";

export const searchLocation = async (query) => {
  try {
    const locations = await api.location.searchLocation(query);

    return locations;
  } catch (error) {
    console.error("searchLocation error: ", error);

    throw error;
  }
};
