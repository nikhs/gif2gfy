// ==UserScript==
// @name          Gif TO Gfycat
// @namespace     n33t0r
// @homepage      nil
// @author        n33t0r
// @license       MIT
// @description   Converts links ending in GIF to Gfycat links.
// @details	      Gif TO Gfycat link conversion on the fly.
// @run-at        document-start
// @require	      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include       /http://*\.*\.com/[-a-zA-Z/0-9]*.gif/
// @include       *.gif
// @include       http://imgur.com/gallery/*.gif
// @grant 	      none
// @icon          http://profile.ak.fbcdn.net/hprofile-ak-xpa1/t1.0-1/c2.0.50.50/p50x50/1524755_1385151461742525_830530998_n.png
// @version       0.3
// ==/UserScript==
$(document).ready(function(){
	var currentUrl=window.location.href;
	getgfy(currentUrl);
	function getgfy(rawGifLink){
		var urlPrefix="http://gfycat.com/cajax/checkUrl/";
		var encGifLink=encodeURI(rawGifLink);
		var reqUrl=urlPrefix+encGifLink;
		$.ajax({
			url:reqUrl,
			type:"GET",
			datatype:"json",
			success:function(json){
					if(json.urlKnown){console.log("Processed Url with link:"+json.gfyUrl);redirectFn(json.gfyUrl);}
					else{console.log("Url not previously processed");makeNewRequest(encGifLink);}
				},
			error:function(xhr,status,errorThrown){
				console.log("Failed to get AJAX req with status:"+status);
				console.error(errorThrown);
				console.dir(xhr);
				}
			
			});
		
		}
	function makeNewRequest(urlSuffix){
		var urlPrefix="http://upload.gfycat.com/transcode?fetchUrl=";
		var requestUrl=urlPrefix+urlSuffix;
		$.ajax({
			url:requestUrl,
			datatype:"json",
			type:"GET",
			success:function(json){
				console.log("New Url with link:"+"http://gfycat.com/"+json.gfyName);
				redirectFn("http://gfycat.com/"+json.gfyName);
				},
			error:function(xhr,status,errorThrown){
				console.log("Failed to get AJAX req with status:"+status);
				console.error(errorThrown);
				console.dir(xhr);
				}

			});
		
		}
	function redirectFn(urls){
		console.log("FinalUrl For Redirection is"+urls);
		window.location.replace(urls);
		}
	
	});
