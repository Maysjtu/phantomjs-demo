var page = require('webpage').create();
page.onConsoleMessage = function(msg){
    console.log('phantomjs log messge : ' + msg);
}
page.open('https://www.baidu.com',function(status){
	page.includeJs('http://libs.baidu.com/jquery/1.9.0/jquery.js',function(loadStatus){
		console.log('loadStatus:'+loadStatus);
		if(status !== 'success'){
			console.log('load page error.');
		}else{
			page.evaluate(function(){
				$('#kw').val("NAVY");
			});		
		}
		page.render('./examples/load_page.png');	
		phantom.exit();
	});
});