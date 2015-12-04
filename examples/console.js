var page = require('webpage').create();
page.viewportSize = { width: 1024, height: 600 };
page.onConsoleMessage = function(msg) {
	console.log(msg);
}
page.open("https://www.baidu.com/",function(status){
	var bb = page.evaluate(function () { 
		return document.getElementsByTagName('html')[0].getBoundingClientRect(); 
	});
	console.log(JSON.stringify(bb));
	page.clipRect = {
		top:    bb.top,
		left:   bb.left,
		width:  bb.width,
		height: bb.height
	};
	console.log("page load status : " + status);
	window.setTimeout(function(){
		page.render('./examples/console.png');	
		phantom.exit();
	},1000);
	
});