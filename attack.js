var http = require("http");  
var cheerio = require("cheerio");  
  
var options = {  
    host: "localhost",  
    port: 9000,
    path: "/index.html",  
    method: "get",  
    headers: {  
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "zh-cn",  
        "Cache-Control": "no-cache",  
        "Connection": "Keep-Alive",
        "Host": "localhost:9000",  
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    }  
};  

var hm = {
    host: "localhost",  
    port: 9000,
    path: "/hm.js?733856c0963d5529bc8a6e8464188b3b",  
    method: "get",  
    headers: {  
        "Accept":"*/*",
        "Accept-Encoding":"gzip, deflate, sdch, br",
        "Accept-Language":"zh-CN,zh;q=0.8",
        "Cache-Control":"no-cache",
        "Connection":"keep-alive",
        "Host":"localhost:9000",
        "Pragma":"no-cache",
        "Referer":"http://localhost:9000/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    }  
}

var gif_1 = {  
    host: "hm.baidu.com", 
    path: "/hm.gif?cc=0&ck=1&cl=24-bit&ds=1366x768&ep=245689%2C14681&et=3&fl=26.0&ja=0&ln=zh-cn&lo=0&lt=1500039402&nv=0&rnd=1469667778&si=733856c0963d5529bc8a6e8464188b3b&st=4&v=1.2.16&lv=2&sn=13447&u=http%3A%2F%2Fwww.xia008.com%2Ftest.html",  
    method: "get",  
    headers: {  
        "Accept":"image/webp,image/*,*/*;q=0.8",
        "Accept-Encoding":"gzip, deflate, sdch",
        "Accept-Language":"zh-CN,zh;q=0.8",
        "Connection":"keep-alive",
        "Cookie":"HMACCOUNT=18E4BBB76B0AB65A",
        "Host":"hm.baidu.com",
        "Referer":"http://localhost:9000/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    }  
}; 

var gif_2 = {  
    host: "hm.baidu.com", 
    path: "/hm.gif?cc=0&ck=1&cl=24-bit&ds=1366x768&et=0&fl=26.0&ja=0&ln=zh-cn&lo=0&lt=1500039402&nv=0&rnd=864901891&si=733856c0963d5529bc8a6e8464188b3b&st=4&v=1.2.16&lv=2&ct=!!&tt=page%20test&sn=13693",  
    method: "get",  
    headers: {  
        "Accept":"image/webp,image/*,*/*;q=0.8",
        "Accept-Encoding":"gzip, deflate, sdch",
        "Accept-Language":"zh-CN,zh;q=0.8",
        "Connection":"keep-alive",
        "Cookie":"HMACCOUNT=18E4BBB76B0AB65A",
        "Host":"hm.baidu.com",
        "Referer":"http://localhost:9000/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    }  
}; 

var jsonp = {  
    host: "api.cloudmobi.net", 
    path: "/api/v1/jstag_native/get?callback=jp.getadsData&slot=2250&adnum=30&ck=&platform=undefined&ua=TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzU4LjAuMzAyOS4xMTAgU2FmYXJpLzUzNy4zNg==&host=http://www.xia008.com/test.html",  
    method: "get",  
    headers: {  
        "Accept":"*/*",
        "Accept-Encoding":"gzip, deflate, sdch, br",
        "Accept-Language":"zh-CN,zh;q=0.8",
        "Connection":"keep-alive",
        "Host":"api.cloudmobi.net",
        "Referer":"http://localhost:9000/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    }  
};  


for(var i = 0; i< 10; i++) {
    var html = '';
    var req = http.request(options, function(res){  
        res.setEncoding("utf8");  
        res.on("data", function(data){  
            html += data
        });  
        res.on('end', function() {
            // reqHm()
            console.log(html)
        })
    });  

    req.end(); 
    
}  

function reqHm() {
    var html = '';
    var req = http.request(hm, function(res){  
        res.setEncoding("utf8");  
        res.on("data", function(data){  
            html += data
        });  
        res.on('end', function() {
            reqGif1()
            console.log(html)
        })
    });  

    req.end(); 
}

function reqGif1() {
    var html = '';
    var req = http.request(gif_1, function(res){  
        res.setEncoding("utf8");  
        res.on("data", function(data){  
            html += data
        });  
        res.on('end', function() {
            reqGif2()
            console.log(html)
        })
    });  

    req.end(); 
}

function reqGif2() {
    var html = '';
    var req = http.request(gif_2, function(res){  
        res.setEncoding("utf8");  
        res.on("data", function(data){  
            html += data
        });  
        res.on('end', function() {
            reqJSONP()
            console.log(html)
        })
    });  

    req.end(); 
}

function reqJSONP() {
    var html = '';
    var req = http.request(jsonp, function(res){  
        res.setEncoding("utf8");  
        res.on("data", function(data){  
            html += data
        });  
        res.on('end', function() {
            console.log(html)
        })
    });  

    req.end(); 
}