const fs = require("fs")
const http = require("http")
const url = require("url")

//Read from the db
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)

/////////////////////////////////
//Server
const server = http.createServer((req, res) => {
 //find the current path the user is at and respond
 const path = req.url

 if (path === "/" || path === "/overview") {
  res.end(`This is the overview`)
 } else if (path === "/product") {
  res.end(`This is the product`)
 }
 if (path === "/api") {
  //Tell the browser what is coming
  res.writeHead(200, {
   "Content-type": "application/json",
  })
  //send the data
  res.end(data)
 } else {
  res.end(`Error`)
 }
})

server.listen(8000, "127.0.0.1", () => {
 console.log("hello world")
})
