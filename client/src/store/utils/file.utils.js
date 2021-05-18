export const getFileBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const getFileJsonText = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = e => {
      try {
        const result = JSON.stringify(JSON.parse(e.target.result), null, "\t");
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = error => reject(error);
  });

export const validateJsonFormat = text => {
  const json = JSON.parse(text);
  return json.every(t => t.source && t.target);
}