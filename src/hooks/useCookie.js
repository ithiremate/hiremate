/* eslint-disable no-unreachable-loop */
/* eslint-disable no-restricted-syntax */
const useCookie = () => {
  const getCookie = (name) => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const cookie = [cookies.find((c) => c.startsWith(nameEQ)) ?? ""];

    for (const c of cookie) {
      const char = c;

      if (char.startsWith(nameEQ)) {
        return char.substring(nameEQ.length, c.length);
      }

      return null;
    }

    return null;
  };

  const setCookie = (name, value) => {
    document.cookie = `${name}=${value}; secure; path=/`;
  };

  return { getCookie, setCookie };
};

export default useCookie;
