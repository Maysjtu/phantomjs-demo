var page = require('webpage').create();
page.onConsoleMessage = function(msg) {
	console.log(msg);
}
page.onResourceRequested = function(request){
	console.log('request headers : ' + JSON.stringify(request.headers,undefined,4));
}
page.onResourceReceived  = function(response){
	console.log('receive headers : ' + JSON.stringify(response.headers,undefined,4));
}
var startTime = Date.now();
page.open('http://www.qq.com/',function(){
	console.log('page load time(millisecond) : ' + (Date.now() - startTime));
	page.render('./examples/network.png');	
	phantom.exit();
});