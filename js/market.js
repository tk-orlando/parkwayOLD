jQuery.tablesorter.addParser({		
		id: "commaDigit",
		is: function(s, table) {
			var c = table.config;
			return jQuery.tablesorter.isDigit(s.replace(/,/g, ""), c);
		},
		format: function(s) {
			return jQuery.tablesorter.formatFloat(s.replace(/,/g, ""));
		},
		type: "numeric"
	});
	$(document).ready(function() { 
		$('#market-assets').attr('class','tablesorter').tablesorter();
		// call the tablesorter plugin 
		$("table").tablesorter({ 
		// sort on the first column and third column, order asc 
	         sortList: [[0,0]] 
		}); 
		$('#market-assets').attr('class','tablesorter').tablesorter();
	});