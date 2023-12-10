const customerWizard = {
  companyName: ["required", "trim", "string"],
  username: ["required", "trim", "string"],
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

export default customerWizard;
