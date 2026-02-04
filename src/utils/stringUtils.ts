export const formatStringToTitle = (input: string): string => {
  if (!input) return '';
  return (
    input
      // Replace underscores with spaces
      .replace(/_/g, ' ')
      // Insert a space before each uppercase letter that follows a lowercase letter
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Capitalize the first letter of each word and make the rest lowercase
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  );
};
