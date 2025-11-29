// src/
// ├── app/
// ├── utils/
// │   └── date.ts  <-- Put your function here
// └── ...


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
