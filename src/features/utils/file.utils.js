export const isValidImageURL = (url) => {
  const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg))$/;
  return urlRegex.test(url);
};

export const getDefaultAvatar = (fullName) => {
  // Generate avatar URL using Iran Liara's API
  const formattedName = fullName.trim().replace(/\s+/g, "+");
  return `https://avatar.iran.liara.run/username?username=${formattedName}`;
};
