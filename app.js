const express = require("express");
const app = express();
// const port = 3000

var server = app.listen(process.env.PORT || 3000, listen);
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://" + host + ":" + port);
}
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var bodyParser = require("body-parser");
// app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

var extract, links;

app.use(express.json()); // to support JSON-encoded bodies

app.use(express.static("public"));
app.use("/static", express.static("public"));

app.post("/get-data", function (req, res) {
  // console.log("********************************************************************")
  console.log(
    "********************************************************************\n"
  );
  console.log(req.body);
  var res2 = magic(unescape(req.body.query), req.body.link).then(function () {
    // console.log(links,extract)
    res.setHeader("Content-Type", "application/json");

    var obj = {
      extract: extract,
      links: links,
    };
    // console.log(obj)
    // res.send(obj)
    obj = JSON.stringify(obj);
    res.json(obj);
  });

  console.log(
    "\n********************************************************************"
  );
  // console.log("********************************************************************")
});

// app.get('/', (req, res) => res.send('Hello World!'))

function magic(text, link = false) {
  var result = {};
  // var extract = ""
  // var links = []
  const rp = require("request-promise");
  const $ = require("cheerio");
  const url = "https://en.wikipedia.org/wiki/" + text;
  const url2 =
    "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" +
    text;

  // // console.log("aaaaaaaaaaa")

  return rp(url2).then(function (html) {
    // console.log("aaaaaaaaaaa")
    // console.log(html)
    var res = JSON.parse(html);
    // console.log(res)
    var res2 = res.query.pages[Object.keys(res.query.pages)[0]].extract;
    // result['extract'] = res2;
    extract = res2;
    // console.log(res2)

    // console.log(result['extract']);

    return rp(url)
      .then(function (html) {
        //success!
        // console.log("aaaaaaaaaaa")
        // var rem=$('.reflist',html).remove();
        // rem=$('.refbegin',rem).remove();
        // rem=$('.catlinks',rem).remove();
        const a_elements = $("#content a", html);
        var list = [];
        // const yy = $('#content .reflist a', html);
        // const zz = $('#content .refbegin a', html);
        // console.log(yy,zz);
        var not_required_list = [];

        for (let i = 0; i < a_elements.length; i++) {
          var title = a_elements[i].attribs.title;
          var link = a_elements[i].attribs.href;
          if (
            a_elements[i].attribs.href == undefined ||
            a_elements[i].attribs.title == undefined
          ) {
            continue;
          }

          if (title.includes("/")) {
            continue;
          }

          if (
            title.toLowerCase().includes("wikipedia") ||
            title.toLowerCase().includes("edit") ||
            title.toLowerCase().includes("oclc")
          ) {
            continue;
          }

          if (title.length > 30) {
            continue;
          }

          if (
            link.toLowerCase().includes(".jpg") ||
            link.toLowerCase().includes(".png") ||
            link.toLowerCase().includes(".gif")
          ) {
            continue;
          }

          var found = false;
          for (var j = 0; j < list.length; j++) {
            if (list[j].title === a_elements[i].attribs.title) {
              list[j].count = list[j].count + 1;
              found = true;
              break;
            }
          }
          if (!found) {
            list.push({
              link: a_elements[i].attribs.href,
              title: a_elements[i].attribs.title,
              count: 1,
            });
          }
        }

        // console.log(list.slice(0,50))

        list.sort(function (a, b) {
          return b.count - a.count;
        });

        // for (va/r j = 0; j < list.length; j++) {

        // console.log(list[j])
        // console.log(b[j].count)
        // }
        // result["links"] = list
        list = list.slice(0, 30);
        list.unshift({
          link: url,
          title: text,
          count: -1,
        });
        links = list;
        // console.log(list)
        // console.log(result['links'])
      })
      .catch(function (err) {
        //handle error
      });
    // console.log(extract, links);

    // return {"extract":extract,"links":links}
  });

  // console.log("1111111111")

  // console.log(result['links'])
}
