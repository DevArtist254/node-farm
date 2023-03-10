const fs = require("fs")
const http = require("http")
const url = require("url")
const replaceTemp = require("url")

//Read from the db
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)

///////////////////////////////////////
//Reading the html
const cardTemp = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8")
const overviewTemp = fs.readFileSync(
 `${__dirname}/templates/overview.html`,
 "utf-8"
)
const productTemp = fs.readFileSync(
 `${__dirname}/templates/product.html`,
 "utf-8"
)

/////////////////////////////////
//Server
const server = http.createServer((req, res) => {
 //find the current path the user is at and respond
 const {query, pathname} = url.parse(req.url, true)

 //Overview page
 if (pathname === "/" || pathname === "/overview") {
  res.writeHead(200, {
   "Content-type": "text/html",
  })

  //Card creation
  const cardHtml = dataObj.map((el) => replaceTemp(cardTemp, el)).join("")

  const output = overviewTemp.replace(/{%PRODUCT_CARD%}/g, cardHtml)

  res.end(output)

  //Product page
 } else if (pathname === "/product") {
  res.writeHead(200, {
   "Content-type": "text/html",
  })
  const product = dataObj[query.id]
  const output = replaceTemp(productTemp, product)

  res.end(output)

  //Api
 } else if (pathname === "/api") {
  //Tell the browser what is coming
  res.writeHead(200, {
   "Content-type": "application/json",
  })
  //send the data
  res.end(data)

  //
 } else {
  res.end(`Error`)
 }
})

server.listen(8000, "127.0.0.1", () => {
 console.log("hello world")
})
