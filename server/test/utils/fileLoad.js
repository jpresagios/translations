import fs from "fs";
import path from "path";

export default filename =>
  fs.readFileSync(path.join(__dirname, `../data/${filename}`));
