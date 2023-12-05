import POST_JOB from "../../constants/postJob";

const postJob = {
  title: ["required", "trim", "string"],
  description: ["required", "trim", "string"],
  salaryFrom: ["positive_integer", "required"],
  salaryTo: ["positive_integer", "required"],
  experienceFrom: ["positive_integer", "required"],
  experienceTo: ["positive_integer", "required"],
  employmentType: "not_empty_list",
  workNature: "not_empty_list",
  skills: "not_empty_list",
  status: [
    "required",
    "trim",
    "string",
    { one_of: Object.values(POST_JOB.STATUS_TYPES) },
  ],
  location: {
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
