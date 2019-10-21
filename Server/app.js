const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

var extract,links;


app.use(express.json()); // to support JSON-encoded bodies

app.post('/get-data', function (req, res) {
    console.log(req.body)
    var res2 = magic(req.body.query, req.body.link).then(function(){
        // console.log(links,extract)
        res.setHeader('Content-Type', 'application/json');
        // res.end({'extract':extract,'links':links});
        // res.end(JSON.stringify({'extract':extract,'links':links}));
        console.log(JSON.stringify({
            'extract': extract,
            'links': links
        }))

        var obj = {
            'extract': extract,
            'links': links
        }
        res.json(obj)
    })

    //  console.log(res2)
    // var name = req.body.name,
    //     color = req.body.color;


    // ...
});


// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



function magic(text, link = false) {

    var result = {}
    // var extract = ""
    // var links = []
    const rp = require('request-promise');
    const $ = require('cheerio');
    const url = 'https://en.wikipedia.org/wiki/' + text;
    const url2 = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=' + text;

    // // console.log("aaaaaaaaaaa")

    return rp(url2).then(function (html) {
        // console.log("aaaaaaaaaaa")
        // console.log(html)
        var res = JSON.parse(html)
        // console.log(res)
        var res2 = res.query.pages[Object.keys(res.query.pages)[0]].extract
        // result['extract'] = res2;
        extract = res2
        // console.log(res2)

        // console.log(result['extract']);


        return rp(url).then(function (html) {
                //success!
                // console.log("aaaaaaaaaaa")

                const a_elements = $('#content a', html);
                var list = [];

                for (let i = 0; i < a_elements.length; i++) {
                    var title = a_elements[i].attribs.title;
                    var link = a_elements[i].attribs.href;
                    if (a_elements[i].attribs.href == undefined || a_elements[i].attribs.title == undefined) {
                        continue;
                    }

                    if (title.includes("/")) {
                        continue;
                    }

                    if (title.includes("wikipedia")) {
                        continue;
                    }

                    if (title.length > 20) {
                        continue;
                    }

                    if (link.includes(".jpg") || link.includes(".png") || link.includes(".exe")) {
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
                            count: 1
                        })
                    }
                }

                // console.log(list.slice(0,50))

                list.sort(function (a, b) {
                    return b.count - a.count
                })

                // for (va/r j = 0; j < list.length; j++) {

                // console.log(list[j])
                // console.log(b[j].count)
                // }
                // result["links"] = list
                links = list
                // console.log(links)
                // console.log(result['links'])



            })
            .catch(function (err) {
                //handle error
            });
        // console.log(extract, links);

        // return {"extract":extract,"links":links}



    })



    // console.log("1111111111")


    // console.log(result['links'])
}


