export const isValidImageURL = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" }); // Fetch headers only
    const contentType = response.headers.get("content-type");

    return response.ok && contentType && contentType.startsWith("image/");
  } catch (error) {
    console.error("Error validating image URL:", error);
    return false; // Invalid URL or network error
  }
};


export const getDefaultAvatar = (fullName) => {
  // Generate avatar URL using Iran Liara's API
  const formattedName = fullName.trim().replace(/\s+/g, "+");
  return `https://avatar.iran.liara.run/username?username=${formattedName}`;
};
