//创建一个webpage对象
var page = require('webpage').create();
// 打开页面
page.open('http://localhost:9000/index.html', function(status) {
  // 输出状态
  console.log("Status: " + status);
  if(status === "success") {
    page.render('haha.jpg');
  }
  phantom.exit();
});
