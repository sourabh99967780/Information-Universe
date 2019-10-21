const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/Akbar';

rp(url)
  .then(function(html){
    //success!
    const a_elements = $('#content a', html);
    var list = [];

    for (let i=0; i < a_elements.length; i++){
    	var title = a_elements[i].attribs.title;
    	var link = a_elements[i].attribs.href;
    	if(a_elements[i].attribs.href==undefined||a_elements[i].attribs.title==undefined){
    		continue;
    	}

    	if (title.includes("/")){
    		continue;
    	}

    	if (title.includes("wikipedia")){
    		continue;
    	}

    	if (title.length > 20){
    		continue;
    	}

    	if (link.includes(".jpg") || link.includes(".png") || link.includes(".exe")){
    		continue;
    	}

    	var found=false;
    	for (var j = 0; j < list.length; j++) {
    		if (list[j].title === a_elements[i].attribs.title) {
    			list[j].count=list[j].count+1;
    			found=true;
    			break;
    		}
    	}
    	if(!found){
    	    	list.push({
    			link : a_elements[i].attribs.href,
    			title : a_elements[i].attribs.title,
    			count : 1
    		})
    	    }
  	}

	// console.log(list.slice(0,50))
	
  	list.sort(function(a,b){return b.count-a.count})
  	// console.log(b.slice(0,10))

  	
    	for (var j = 0; j < list.length; j++) {

    		console.log(list[j])
    		// console.log(b[j].count)
    	}

  	// list.sort(function(a,b){
  	// 	// console.log(a.count);
  	// 	// console.log(b.count);
  	// 	// return -1;
  	// 	return a.count - b.count;
  	// })


})
  .catch(function(err){
    //handle error
  });