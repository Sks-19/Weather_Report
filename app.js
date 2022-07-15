const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static("public"));

app.get("/", (req, res) =>
{
res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "26ccca7e0eb67957d35e1d9d974d493b";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";

  //https://api.openweathermap.org/data/2.5/weather?q=Patna&appid=26ccca7e0eb67957d35e1d9d974d493b&units=metric";

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn" + icon + "@2x.png";
      //document.getElementById("temprature").innerHTML;
      //res.sendFile(__dirname + "/index.html", {temp:temp})
      res.write("<p>The Weather is currently " + desc + "</p>")
      res.write("<h1>The temprature in " + query + " is " + temp + " degree celcius</h1>")
      res.write("<img src=" +imageUrl +">");
      res.send();
    })
  })
})

app.listen(3000, () => {
  console.log("Server is running at Port 3000");
})
