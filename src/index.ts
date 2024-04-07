import app from "./app";

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    "Server is Successfully Running, and App is listening on port " + PORT
  );
});
