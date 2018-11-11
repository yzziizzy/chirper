

function nt() {
	var args = Array.prototype.slice.apply(arguments, 1);
	var cb = arguments[0];
	if(args[args.length-1]) console.log(args[args.length-1]);
	if(!cb) console.log("nt called without a function.");
	process.nextTick(function() { cb.apply(this, args) });
}


module.exports = function(db) {
	
	
	var q = 'INSERT INTO `types` (`name`, `'+tcol+'`, `externalType`) VALUES (?, true, ?);';
	
	db.query(q, [name, externalType], function(err, res) {
		if(err) {
			if(err.code == 'ER_DUP_ENTRY') {
				return nt(cb, "type name already exists.");
			}
			
			return nt(cb, err);
		}
	});
	
	
	
	
	
	
	
	
	
};
