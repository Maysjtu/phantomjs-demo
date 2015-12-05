var page = require('webpage').create();
var settings = {
	encoding: "utf8"
}
page.onConsoleMessage = function(msg){
    console.log('phantomjs log messge : ' + msg);
}
page.open('https://www.baidu.com/',settings,function(){
	console.log("page.frameName:",page.frameName);
	console.log('page.event:',JSON.stringify(page.event));
	var cookies = page.cookies;
	console.log('Listing cookies:');
	for(var i in cookies) {
		console.log(cookies[i].name + '=' + cookies[i].value);
	}
	page.clipRect = {
		top: 14,
		left: 3,
		width: 400,
		height: 300
	};
	console.log(page.canGoBack);
	console.log(page.canGoForward);
	page.render('examples/webpage1.png');
	// console.log(page.content);
	var href = page.evaluate(function(){
		console.log('$->',$.fn.jquery);
		console.log($('#u_sp').length);
		return $('#u_sp').find('a').eq(0).attr('href');		
	});	
	console.log('href:',href);
	page.open("http://www.nuomi.com/?cid=002540",function(){
		page.render('examples/webpage3.png');
		page.content = "<h2 style='padding:20px;'>ki_navy</h2>";
		page.render('examples/webpage2.png');
		console.log(page.content);
		console.log(page.canGoBack);
		console.log(page.plainText);
		page.close();
		phantom.exit();
	});
});