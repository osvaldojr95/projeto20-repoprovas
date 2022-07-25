import app from "./index.js";

app.listen(process.env.PORT || 4000, () => {
    console.log("Server online");
});
