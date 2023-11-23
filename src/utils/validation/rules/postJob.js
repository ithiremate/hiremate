const postJob = {
  jobTitle: ["required", "trim", "string"],
  salaryFrom: ["positive_integer", "required"],
  salaryTo: ["positive_integer", "required"],
  jobLocation: {
    nested_object: {
      addresstype: ["required", "trim", "string"],
      display_name: ["required", "trim", "string"],
      lat: ["required", "trim", "string"],
      lon: ["required", "trim", "string"],
      osm_id: ["required", "integer"],
      osm_type: ["required", "trim", "string"],
      place_id: ["required", "integer"],
      place_rank: ["required", "integer"],
      type: ["required", "trim", "string"],
    },
  },
};

export default postJob;
