package com.p2pServer.iosocket;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Random;

import com.alibaba.fastjson.JSONObject;

public class BDTJTools {

	 public static String httpTools(String urlStr, String host, String refer, boolean isReadContent, String agent, boolean isProxy, String curIPAddr, int curIPPort){
			HttpURLConnection conn = null;
			InputStream is = null;
			ByteArrayOutputStream baos = null;
			try {
				URL url = new URL(urlStr);
				
				if(isProxy&&curIPAddr!=null&&curIPAddr.isEmpty()==false){
					Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress(curIPAddr, curIPPort));
					conn = (HttpURLConnection)url.openConnection(proxy); 
				}else{
					conn = (HttpURLConnection) url.openConnection();
				}
				
	            
	            conn.setReadTimeout(30000);
	            conn.setConnectTimeout(30000);
	            conn.setRequestMethod("GET");
	            
	            //conn.setRequestProperty("host", host);
	            conn.setRequestProperty("user-agent", agent);
	            conn.setRequestProperty("connection", "keep-alive");
	            
	            conn.setRequestProperty("Accept", "image/webp,*/*;q=0.8");
	            
	            conn.setRequestProperty("cache-control", "max-age=0");
	            conn.setRequestProperty("referer", refer);
	            conn.setRequestProperty("accept-language", "zh-CN,zh;q=0.8");
	            
	            conn.setRequestProperty("accept-encoding", "gzip, deflate, sdch");
	            
	            int rtnCode = conn.getResponseCode();
	            
	            if (rtnCode == 200) {
	            	if(isReadContent == true){
	            		is =conn.getInputStream();
	                    baos = new ByteArrayOutputStream();
	                    byte[] buffer = new byte[1024];
	                    int len = 0;
	                    while(-1 != (len = is.read(buffer))){
	                        baos.write(buffer,0,len);
	                        baos.flush();
	                    }
	                    String res = baos.toString("utf-8");
	                    //System.out.println("res:"+res);
	                    return res;
	            	}
	                return "suc";
	            }else{
	            	//System.out.println("rtnCode:"+rtnCode);
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	        } finally {
	        	
	        	if(is!=null){
	        		try {
						is.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
	        	}
	        	if(baos!=null){
	        		try {
						baos.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
	        	}
	        	
	        	if(conn!=null){
	        		conn.disconnect();
	        	}
	        }
			return null;
		}
	
	 	public static String getRandomString(int length) { //length表示生成字符串的长度  
		    String base = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";     
		    Random random = new Random();     
		    StringBuffer sb = new StringBuffer();     
		    for (int i = 0; i < length; i++) {     
		        int number = random.nextInt(base.length());     
		        sb.append(base.charAt(number));     
		    }     
		    return sb.toString();     
		 } 
	 
	 
	    public static void main(String[] args) throws UnsupportedEncodingException {
	    	
	    	for(int i=0; i<10000; i++){
	    		boolean isProxy = false;
	    		String curIPAddr = null;
	    		int curIPPort = 0;
	    		
	    		String si = "733856c0963d5529bc8a6e8464188b3b";
	    		
	    		String host = "http://www.xilexuan.com";
	    		
	    		String refer = "http://www.xilexuan.com/index.jsp";
	    		
	    		String url1 = "http://hm.baidu.com/hm.gif?cc=0&ck=1&cl=32-bit&ds=375x667&ep=1880070%2C17287&et=0&ja=0&ln=zh-cn&lo=0&lt=1500282872&nv=0&rnd=" + Math.round(Math.random() * 2147483647) + "&si="+ si + "&st=4&v=1.2.16&lv=2&sn=55362&u=" + URLEncoder.encode(host, "utf-8");
	    		
	    		String url2 = "http://hm.baidu.com/hm.gif?cc=0&ck=1&cl=32-bit&ds=375x667&et=0&ja=0&ln=zh-cn&lo=0&lt=1500282872&nv=0&rnd=" + Math.round(Math.random() * 2147483647) + "&si=" + si + "&st=4&v=1.2.16&lv=2&ct=!!&tt=page%20test&sn=55362";
	    		
	    		String devId = "17"+getRandomString(5);
	    		
	    		String agent = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Version/10.0 Mobile/"+devId+" Safari/602.1";
	    		
	    		//获取VPN开始
	    		String vpnGetUrl = "http://xlyqq.xilexuan.com/scriptmanager/vpnTest.do";
	    		String res = httpTools(vpnGetUrl, null, null, true, null, false, null, 0);
	    		
	    		if(res == null){
	    			i--;
	    			continue;
	    		}
	    		JSONObject object = null;
				try {
					object = JSONObject.parseObject(res);
				} catch (Exception e) {
				}
				if(object == null){
					i--;
	    			continue;
				}
				String ERRORCODE = object.getString("code");
				if(ERRORCODE==null || "0".equals(ERRORCODE)==false){
					i--;
	    			continue;
				}
				isProxy = true;
				curIPAddr = object.getString("ip");
				String tempCurIPPort = object.getString("port");
				curIPPort = Integer.valueOf(tempCurIPPort);
				
				System.out.println("[i:"+i+"][curIPAddr:"+curIPAddr+"][curIPPort:"+curIPPort+"]");
				//获取VPN结束
				
	    		for(int j=0; j<((i%2)+1); j++){
	    			httpTools(url1, host, refer, true, agent, isProxy, curIPAddr, curIPPort);
		    		
		    		httpTools(url2, host, refer, true, agent, isProxy, curIPAddr, curIPPort);
		    		
		    		System.out.println("==="+i);
	    		}
				
	    	}
	    }
	
}
