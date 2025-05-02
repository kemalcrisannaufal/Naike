const ConvertDateToString = (date: Date): string => {
  const result = new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return result.replace("pukul", " ").replaceAll(".", ":");
};

const getDate = (date: Date): string => {
  const result = new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return result;
};

const getTime = (date: Date): string => {
  const result = new Date(date).toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return result.replace("pukul", " ").replaceAll(".", ":");
};

export { ConvertDateToString, getDate, getTime };
