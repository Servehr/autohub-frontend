export function formatDate(dateString) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Create a Date object from the date string
  const date = new Date(dateString);

  // Get year, month, and day components
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()]; // Convert numeric month to month name
  const day = date.getDate().toString().padStart(2, "0");

  // Format the date as "Month DD YYYY"
  return `${month} ${day} ${year}`;
}

// Function to parse query parameters from the URL
export const parseQueryParams = (search) => {
  const params = new URLSearchParams(search);
  const queryParams = {};
  for (const [key, value] of params.entries()) {
    queryParams[key] = value;
  }
  return queryParams;
};

export function transformForReactSelect(data) {
  return data.map((item) => ({
    value: item.id,
    label: item.name,
  }));
}