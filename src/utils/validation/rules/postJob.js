import POST_JOB from "../../constants/postJob";

const postJob = {
  title: ["required", "trim", "string"],
  description: ["required", "trim", "string"],
  salaryFrom: ["positive_integer", "required"],
  salaryTo: ["positive_integer", "required"],
  experienceFrom: ["positive_integer", "required"],
  experienceTo: ["positive_integer", "required"],
  companyName: ["required", "trim", "string"],
  employmentType: "not_empty_list",
  workNature: "not_empty_list",
  skills: "not_empty_list",
  contactPerson: ["trim", "string"],
  contactPhone: ["trim", "string"],
  additionalContact: ["trim", "string"],
  status: [
    "required",
    "trim",
    "string",
    { one_of: Object.values(POST_JOB.STATUS_TYPES) },
  ],
  autoscreening: {
    nested_object: {
      questions: "list_of_objects",
    },
  },
  location: {
    nested_object: {
      address: {
        nested_object: {
          borough: ["trim", "string"],
          city: ["trim", "string"],
          country: ["trim", "string"],
          country_code: ["trim", "string"],
          house_number: ["trim", "string"],
          neighbourhood: ["trim", "string"],
          postcode: ["trim", "string"],
          quarter: ["trim", "string"],
          road: ["trim", "string"],
          shop: ["trim", "string"],
          suburb: ["trim", "string"],
        },
      },
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
