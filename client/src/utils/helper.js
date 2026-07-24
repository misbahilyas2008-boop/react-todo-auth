// Email Validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email) && !email.includes('..');
  };
  
  // Strong Password Validation (min 8 chars, 1 letter, 1 number, 1 special char)
  export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^(){}[\]<>.,;:'"`~|\\])[A-Za-z\d@$!%*?&^(){}[\]<>.,;:'"`~|\\]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Full Name: Exactly 2 words, each 2–25 letters
  export const validateFullName = (fullName) => {
    const fullNameRegex = /^[A-Za-z]{2,25}\s[A-Za-z]{2,25}$/;
    return fullNameRegex.test(fullName);
  };
  
  // Full Name: 1 to 3 words, each 2–25 letters
  export const validateFullName1To3Words = (value) => {
    const words = value.trim().split(/\s+/);
    if (words.length > 3) return false;
    return words.every(word => /^[A-Za-z]{2,25}$/.test(word));s
  };
  