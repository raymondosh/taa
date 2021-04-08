export const encodeFileToBase64 = (file) => {
  return new Promise((resolve) => {
    var fr = new FileReader();
    fr.onload = function () {
      resolve(this.result);
    };
    fr.readAsDataURL(file);
  });
};
