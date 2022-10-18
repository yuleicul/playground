import { version } from "../package.json";

// this is a comment
export default function () {
  console.log("version " + version);
  import("./foo.js").then((importedData) => {
    console.log(importedData);
  });
}
