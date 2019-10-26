typeahead={

process: null,

loaded: function(data)
{
 var list=data.split("\n");
 typeahead.process(list);
},

source: function(query,process)
{
 typeahead.process=process;
 var query_encoded=encodeURIComponent(query);
 $.get("/typeahead?query="+query_encoded,typeahead.loaded);
},

timeout: null,
submit: false,

keyPress: function(query,process)
{
 if (typeof typeahead.timeout == "number") clearTimeout(typeahead.timeout);
 typeahead.timeout = setTimeout(function() {typeahead.source(query,process);},300);
},

updater: function (item)
{
 if (typeahead.submit)
 {
  $("#search_form").submit();
 }
 else
 {
  typeahead.submit=true;
  $("#f").val(item);
  $("#search_form").submit();
	return item;
 }
},

init: function()
{
 $('.typeahead').typeahead({source:  typeahead.keyPress,
                            updater: typeahead.updater });
	
 $(".typeahead").on("keydown",function (e) { if (e.which==13) typeahead.submit=true; else typeahead.submit=false;} );

 $(document.activeElement).focus(); // workaround for bootstrap typeahead autofocus bug: http://raw.gibney.org/bootstrap_typehead_autofocus_bug
}

}
