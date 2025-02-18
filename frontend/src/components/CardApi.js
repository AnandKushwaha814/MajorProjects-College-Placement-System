export const CardApi = async () => {
  const response = await fetch("https://jsonfakery.com/users");
  return await response.json();
};
