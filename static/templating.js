



function fillTemplate(name, data) {
	
	var n = $('.prototypes proto[name="'+name+'"]').clone();
	if(!n) {
		console.log("tried cloning non-existent template: ", name);
		return null;
	}
	
	for(var k in data) {
		n.find('[field="'+k+'"]').html(data[k]);
	}
	
	return n;
}













function grabData(parent) {
	var data = {};
	
	function asFloat(x) {
		var y = parseFloat(x);
		return isFinite(y) ? y : 0;
	}
	
	var formatters = {
		string: function(x) { return x },
		pct: function(x) { return asFloat(x) * .01 },
		amort: function(x) { return asFloat(x) / 12 },
		num: asFloat,
		
		time: asFloat,
		dollars: asFloat,
		percent: function(x) { return asFloat(x) * .01 },
	};
	
// 			parent.find('[data-json]').each(function() {
	parent.find('[cname]').each(function() {
		var n = $(this);
		
		var name = n.attr('cname');
		var val = n.val();
		
		var fmt = n.attr('fmt') || n.attr('internal') || 'num';
		console.log(name, val);
		
		data[name] = formatters[fmt](val);
	});
	
	return data;
};
