export const getFirstLetter = (fullName: string) => {
  const firstName = fullName.split(" ")[0]; // Get the first word (assumed to be the first name)
  return firstName.charAt(0).toUpperCase(); // Return the first letter, capitalized
};
