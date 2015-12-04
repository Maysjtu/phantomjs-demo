console.log("phantom.args:",phantom.args);
var system = require('system');
var args = system.args;
console.log("system.args:",args);
if (args.length === 1) {
  console.log('Try to pass some arguments when invoking this script!');
} else {
  args.forEach(function(arg, i) {
    console.log(i + ': ' + arg);
  });
}
var env = system.env;
Object.keys(env).forEach(function(key) {
  console.log(key + '=' + env[key]);
});
var os = system.os;
console.log(JSON.stringify(os));
console.log('pid:',system.pid);
console.log(system.platform);
phantom.addCookie({
  'name': 'Added-Cookie-Name',
  'value': 'Added-Cookie-Value',
  'domain': '.google.com'
});
phantom.addCookie({
  'name': 'Added-Cookie-Navy',
  'value': 'Added-Cookie-Value',
  'domain': '.google.com'
});
console.log('cookie:',JSON.stringify(phantom.cookies));
phantom.deleteCookie("Added-Cookie-Name");
console.log('cookie:',JSON.stringify(phantom.cookies));
phantom.clearCookies();
console.log('cookie:',JSON.stringify(phantom.cookies));
var page = require('webpage').create();
page.open('https://www.baidu.com',function(){
	phantom.addCookie({
	  'name': 'Added-Cookie-Navy',
	  'value': 'Added-Cookie-Value',
	  'domain': 'www.navy.com'
	});
	console.log('baidu cookie:',JSON.stringify(phantom.cookies));
	var injectResult =  phantom.injectJs('fixtures/extra.js');
	console.log('injectResult:',injectResult);
});
phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  phantom.exit(1);
};
// phantom.exit();