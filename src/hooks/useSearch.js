import { useState } from "react";

import { searchLocation } from "../store/actions/locationActions";
import { searchSkills } from "../store/actions/skillsActions";

const useSearch = () => {
  const [locations, setLocations] = useState({ results: [], isLoading: false });
  const [skills, setSkills] = useState({ results: [], isLoading: false });

  const locationSearch = async (query) => {
    if (query) {
      setLocations((prev) => ({ ...prev, isLoading: true }));

      const results = await searchLocation(query);

      setLocations(() => ({ results, isLoading: false }));
    }
  };

  const skillsSearch = async (query) => {
    if (query) {
      setSkills((prev) => ({ ...prev, isLoading: true }));

      const data = await searchSkills(query);

      setSkills(() => ({ results: data.data, isLoading: false }));
    }
  };

  const locationReset = () =>
    setLocations((prev) => ({ ...prev, results: [] }));

  const skillsReset = () => setSkills((prev) => ({ ...prev, results: [] }));

  return {
    locations,
    skills,
    searchHandlers: { locationSearch, skillsSearch },
    resetHandlers: { locationReset, skillsReset },
  };
};

export default useSearch;
