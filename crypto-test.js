
var crypto = require('crypto');


//console.log(crypto.getHashes());
//console.log(crypto.getCurves());






/*
var hmac = crypto.createHmac('sha256', secret_key);
hmac.update(request.body.message);
var signature = hmac.digest('hex');*/




var keys = crypto.generateKeyPairSync('ec', {
	publicKeyEncoding: {type: 'spki', format: 'pem'},
	privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
	namedCurve: 'sect571r1',
	
});

 
var sign = crypto.createSign('RSA-SHA512');
sign.update('test');  // data from your file would go here
var sig = sign.sign(keys.privateKey, 'base64');




const verify = crypto.createVerify('RSA-SHA512');

verify.write('test');
verify.end();

console.log(verify.verify(keys.publicKey, sig, 'base64'));



