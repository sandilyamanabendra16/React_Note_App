export const getFirstLetters=(name)=> {
    const words = name.split(" ");
    if (words.length > 1) {
      return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    } else {
      return words[0].charAt(0).toUpperCase();
    }
  };
