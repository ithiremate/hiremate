const customerWizard = {
  companyName: ["required", "trim", "string"],
  username: ["required", "trim", "string"],
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

export default customerWizard;
