/**
 * @license RequireJS text 2.0.3 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
/*jslint regexp: true */
/*global require: false, XMLHttpRequest: false, ActiveXObject: false,
  define: false, window: false, process: false, Packages: false,
  java: false, location: false */
define(['module'],function(module){'use strict';var text,fs,progIds=['Msxml2.XMLHTTP','Microsoft.XMLHTTP','Msxml2.XMLHTTP.4.0'],xmlRegExp=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,bodyRegExp=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,hasLocation=typeof location!=='undefined'&&location.href,defaultProtocol=hasLocation&&location.protocol&&location.protocol.replace(/\:/,''),defaultHostName=hasLocation&&location.hostname,defaultPort=hasLocation&&(location.port||undefined),buildMap=[],masterConfig=(module.config&&module.config())||{};text={version:'2.0.3',strip:function(content){if(content){content=content.replace(xmlRegExp,"");var matches=content.match(bodyRegExp);if(matches){content=matches[1]}}else{content=""}return content},jsEscape:function(content){return content.replace(/(['\\])/g,'\\$1').replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:masterConfig.createXhr||function(){var xhr,i,progId;if(typeof XMLHttpRequest!=="undefined"){return new XMLHttpRequest()}else if(typeof ActiveXObject!=="undefined"){for(i=0;i<3;i+=1){progId=progIds[i];try{xhr=new ActiveXObject(progId)}catch(e){}if(xhr){progIds=[progId];break}}}return xhr},parseName:function(name){var strip=false,index=name.indexOf("."),modName=name.substring(0,index),ext=name.substring(index+1,name.length);index=ext.indexOf("!");if(index!==-1){strip=ext.substring(index+1,ext.length);strip=strip==="strip";ext=ext.substring(0,index)}return{moduleName:modName,ext:ext,strip:strip}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(url,protocol,hostname,port){var uProtocol,uHostName,uPort,match=text.xdRegExp.exec(url);if(!match){return true}uProtocol=match[2];uHostName=match[3];uHostName=uHostName.split(':');uPort=uHostName[1];uHostName=uHostName[0];return(!uProtocol||uProtocol===protocol)&&(!uHostName||uHostName.toLowerCase()===hostname.toLowerCase())&&((!uPort&&!uHostName)||uPort===port)},finishLoad:function(name,strip,content,onLoad){content=strip?text.strip(content):content;if(masterConfig.isBuild){buildMap[name]=content}onLoad(content)},load:function(name,req,onLoad,config){if(config.isBuild&&!config.inlineText){onLoad();return}masterConfig.isBuild=config.isBuild;var parsed=text.parseName(name),nonStripName=parsed.moduleName+'.'+parsed.ext,url=req.toUrl(nonStripName),useXhr=(masterConfig.useXhr)||text.useXhr;if(!hasLocation||useXhr(url,defaultProtocol,defaultHostName,defaultPort)){text.get(url,function(content){text.finishLoad(name,parsed.strip,content,onLoad)},function(err){if(onLoad.error){onLoad.error(err)}})}else{req([nonStripName],function(content){text.finishLoad(parsed.moduleName+'.'+parsed.ext,parsed.strip,content,onLoad)})}},write:function(pluginName,moduleName,write,config){if(buildMap.hasOwnProperty(moduleName)){var content=text.jsEscape(buildMap[moduleName]);write.asModule(pluginName+"!"+moduleName,"define(function () { return '"+content+"';});\n")}},writeFile:function(pluginName,moduleName,req,write,config){var parsed=text.parseName(moduleName),nonStripName=parsed.moduleName+'.'+parsed.ext,fileName=req.toUrl(parsed.moduleName+'.'+parsed.ext)+'.js';text.load(nonStripName,req,function(value){var textWrite=function(contents){return write(fileName,contents)};textWrite.asModule=function(moduleName,contents){return write.asModule(moduleName,fileName,contents)};text.write(pluginName,nonStripName,textWrite,config)},config)}};if(masterConfig.env==='node'||(!masterConfig.env&&typeof process!=="undefined"&&process.versions&&!!process.versions.node)){fs=require.nodeRequire('fs');text.get=function(url,callback){var file=fs.readFileSync(url,'utf8');if(file.indexOf('\uFEFF')===0){file=file.substring(1)}callback(file)}}else if(masterConfig.env==='xhr'||(!masterConfig.env&&text.createXhr())){text.get=function(url,callback,errback){var xhr=text.createXhr();xhr.open('GET',url,true);if(masterConfig.onXhr){masterConfig.onXhr(xhr,url)}xhr.onreadystatechange=function(evt){var status,err;if(xhr.readyState===4){status=xhr.status;if(status>399&&status<600){err=new Error(url+' HTTP status: '+status);err.xhr=xhr;errback(err)}else{callback(xhr.responseText)}}};xhr.send(null)}}else if(masterConfig.env==='rhino'||(!masterConfig.env&&typeof Packages!=='undefined'&&typeof java!=='undefined')){text.get=function(url,callback){var stringBuffer,line,encoding="utf-8",file=new java.io.File(url),lineSeparator=java.lang.System.getProperty("line.separator"),input=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file),encoding)),content='';try{stringBuffer=new java.lang.StringBuffer();line=input.readLine();if(line&&line.length()&&line.charAt(0)===0xfeff){line=line.substring(1)}stringBuffer.append(line);while((line=input.readLine())!==null){stringBuffer.append(lineSeparator);stringBuffer.append(line)}content=String(stringBuffer.toString())}finally{input.close()}callback(content)}}return text});