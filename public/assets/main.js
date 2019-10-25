var knowledge_base = undefined;
var len

const parent = $("#gnodMap");
var links = new Array();
var dist = new Array();
var titles = new Array();
var xxxxx = new Array();
var gnodMap;

function get_data(qqq) {
    $.ajax({
        url: "/get-data",
        method: "post",
        async: false,
        data: {
            "query": qqq,
            "link": false,
        },
        success: function (data) {
            // console.log(data)
            d = JSON.parse(data)
            console.log(d)
            knowledge_base = d
            len = d.links.length
            update_graph()
        }

    })
}



function r(len) {
    var ar = []
    for (var i = 0; i < len; i++) {
        ar[i] = Math.random() * 10;

    }
    return ar;
}


function update_graph() {
    $(".S").remove()
    console.log("upd")
    // var x = []
    // x = new Array();



    $("#extract").html(knowledge_base.extract.slice(0, 400))
    $("#the_title").html(knowledge_base.links[0].title)

    // len = x.length;
    len = knowledge_base.links.length;
    links = new Array();
    dist = new Array();
    titles = new Array();
    xxxxx = new Array();
    for (var i = 0; i < len; i++) {
        // console.log(len,i)

        // links[i] = x[i][0]
        titles[i] = knowledge_base.links[i].title;
        // titles[i] = x[i][1]
        if (i == 0) {
            dist[i] = knowledge_base.links.map(function (el) {
                return el.count;
            })
        } else {
            dist[i] = r(len)
        }

        // console.log(len,i)


    }

    for (i = 0; i < len; i++) {
        parent.append("<a href='javascript:void(0)' class='S' id='s" + i + "' onclick=get_data(`" + escape(titles[i]) + "`)>" + titles[i] + "</a>")
    }




    var NrWords = len;
    var Aid = new Array();
    Aid = dist;
    gnodMap = new GnodMap();

    gnodMap.left = 0;
    gnodMap.top = 0;
    gnodMap.aid = Aid;

    gnodMap.init()

}


$("#search_form").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.
    get_data($("input.querry_input")[0].value)

   

});
// var dar = knowledge_base.links.map(function (el) { return el.count; });

get_data("Akbar");

var NrWords = len;
var Aid = new Array();
Aid = dist;

update_graph()