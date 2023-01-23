const express = require("express");
const app = express();

app.listen(5001, () => {
  console.log(`Server listening on 5001`);
});

let myJSON;

const fetch = require("node-fetch");
let data;
(async () => {
  const response = await fetch(
    "https://parseapi.back4app.com/classes/Usuniversitieslist_University?limit=9999&order=name",
    {
      headers: {
        "X-Parse-Application-Id": "o48TgKQgLKhYgHkeAgimDNiqsKzrFF13l8Ap6iky", // This is your app's application id
        "X-Parse-REST-API-Key": "BsZvKgvxd24ErVId6Vr1fQgXa9B8sT1pnxBiXgh8", // This is your app's REST API key
      },
    }
  );
  data = await response.json(); // Here you have the data that you need
  // console.log(JSON.stringify(data.results, null, 2));
  myJSON = JSON.stringify(data.results);
})();

let nameArr = [];
namePull(data);
function namePull(data) {
  for (let o in data) {
    nameArr.push(data[o]);
    console.log(o);
  }
  console.log(nameArr);
}

app.get("/api", (req, res) => {
  res.send(myJSON);
});
