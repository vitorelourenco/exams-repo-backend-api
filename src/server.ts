import "./setup";
import app, { init } from "./app";

const PORT = process.env.PORT;

init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}.`);
    });
  })
  .catch((err) => console.log(`Server failed to start \r\n`+err));
