import Base from "./Base";

export default class SkillsAPI extends Base {
  searchSkills(query) {
    return this.skillsApiClient.get(`/skills?q=${encodeURIComponent(query)}`);
  }
}
