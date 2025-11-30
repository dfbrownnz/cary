// src/
// ├── app/
// ├── utils/
// │   └── date.ts  <-- Put your function here
// └── ...
/**
 * Returns the quarter for a given date in YYYYQn format.
 * If no date is provided, it uses the current date.
 * * @param {Date} [date] - An optional Date object.
 * @returns {string} The quarter string (e.g., '2025Q4').
 */
export const getCurrentQuarter = (date = new Date()) => {
  // Get the full year (YYYY)
  const year = date.getFullYear();

  // Get the month (0-indexed: 0 for Jan, 11 for Dec)
  const month = date.getMonth();

  // Calculate the quarter number (1-4)
  // Quarters are: (0-2), (3-5), (6-8), (9-11)
  // Math.floor(month / 3) + 1 results in:
  // (0/3)=0 + 1 = 1 (Q1)
  // (3/3)=1 + 1 = 2 (Q2)
  // (6/3)=2 + 1 = 3 (Q3)
  // (9/3)=3 + 1 = 4 (Q4)
  const quarter = Math.floor(month / 3) + 1;

  return `${year}Q${quarter}`;
};

// --- Example Usage ---

// // 1. Using the actual current date (default)
// const currentQuarter = getCurrentQuarter();
// console.log(`Current Quarter: ${currentQuarter}`);

// // 2. Example for your specific date (Nov 30th, 2025)
// // Note: Month is 10 for November (11th month)
// const exampleDate = new Date(2025, 10, 30); 
// const exampleQuarter = getCurrentQuarter(exampleDate);
// console.log(`Nov 30th Quarter: ${exampleQuarter}`); // Output: 2025Q4

export const getFormattedDateYYYMMDD = () => {
  const date = new Date();
  
  // 1. Get components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // 2. Concatenate them
  //return `${year}${month}${day}${hours}${minutes}`;
  return `${year}${month}${day}`;
};


export const getFormattedDateYYYMMDDstr = () => {
  const date = new Date();
  
  // 1. Get components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // 2. Concatenate them
  //return `${year}${month}${day}${hours}${minutes}`;
  return `${year}${month}${day}`;
};
