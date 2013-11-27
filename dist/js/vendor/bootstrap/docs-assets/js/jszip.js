/**

JSZip - A Javascript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2012 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See LICENSE.markdown.

Usage:
   zip = new JSZip();
   zip.file("hello.txt", "Hello, World!").file("tempfile", "nothing");
   zip.folder("images").file("smile.gif", base64Data, {base64: true});
   zip.file("Xmas.txt", "Ho ho ho !", {date : new Date("December 25, 2007 00:00:01")});
   zip.remove("tempfile");

   base64zip = zip.generate();

**/

var JSZip=function(e,t){this.files={},this.root="",e&&this.load(e,t)};JSZip.signature={LOCAL_FILE_HEADER:"PK",CENTRAL_FILE_HEADER:"PK",CENTRAL_DIRECTORY_END:"PK",ZIP64_CENTRAL_DIRECTORY_LOCATOR:"PK",ZIP64_CENTRAL_DIRECTORY_END:"PK",DATA_DESCRIPTOR:"PK\b"},JSZip.defaults={base64:!1,binary:!1,dir:!1,date:null,compression:null},JSZip.support={arraybuffer:function(){return typeof ArrayBuffer!="undefined"&&typeof Uint8Array!="undefined"}(),nodebuffer:function(){return typeof Buffer!="undefined"}(),uint8array:function(){return typeof Uint8Array!="undefined"}(),blob:function(){if(typeof ArrayBuffer=="undefined")return!1;var e=new ArrayBuffer(0);try{return(new Blob([e],{type:"application/zip"})).size===0}catch(t){}try{var n=new(window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder);return n.append(e),n.getBlob("application/zip").size===0}catch(t){}return!1}()},JSZip.prototype=function(){var e,t;JSZip.support.uint8array&&typeof TextEncoder=="function"&&typeof TextDecoder=="function"&&(e=new TextEncoder("utf-8"),t=new TextDecoder("utf-8"));var n=function(e){if(e._data instanceof JSZip.CompressedObject){e._data=e._data.getContent(),e.options.binary=!0,e.options.base64=!1;if(JSZip.utils.getTypeOf(e._data)==="uint8array"){var t=e._data;e._data=new Uint8Array(t.length),t.length!==0&&e._data.set(t,0)}}return e._data},r=function(t){var r=n(t),i=JSZip.utils.getTypeOf(r);if(i==="string"){if(!t.options.binary){if(e)return e.encode(r);if(JSZip.support.nodebuffer)return new Buffer(r,"utf-8")}return t.asBinary()}return r},i=function(e){var t=n(this);return t===null||typeof t=="undefined"?"":(this.options.base64&&(t=JSZip.base64.decode(t)),e&&this.options.binary?t=JSZip.prototype.utf8decode(t):t=JSZip.utils.transformTo("string",t),!e&&!this.options.binary&&(t=JSZip.prototype.utf8encode(t)),t)},s=function(e,t,n){this.name=e,this._data=t,this.options=n};s.prototype={asText:function(){return i.call(this,!0)},asBinary:function(){return i.call(this,!1)},asNodeBuffer:function(){var e=r(this);return JSZip.utils.transformTo("nodebuffer",e)},asUint8Array:function(){var e=r(this);return JSZip.utils.transformTo("uint8array",e)},asArrayBuffer:function(){return this.asUint8Array().buffer}};var o=function(e,t){var n="",r;for(r=0;r<t;r++)n+=String.fromCharCode(e&255),e>>>=8;return n},u=function(){var e={},t,n;for(t=0;t<arguments.length;t++)for(n in arguments[t])arguments[t].hasOwnProperty(n)&&typeof e[n]=="undefined"&&(e[n]=arguments[t][n]);return e},a=function(e){return e=e||{},e.base64===!0&&e.binary==null&&(e.binary=!0),e=u(e,JSZip.defaults),e.date=e.date||new Date,e.compression!==null&&(e.compression=e.compression.toUpperCase()),e},f=function(e,t,n){var r=l(e),i=JSZip.utils.getTypeOf(t);r&&c.call(this,r),n=a(n);if(n.dir||t===null||typeof t=="undefined")n.base64=!1,n.binary=!1,t=null;else if(i==="string")n.binary&&!n.base64&&n.optimizedBinaryString!==!0&&(t=JSZip.utils.string2binary(t));else{n.base64=!1,n.binary=!0;if(!i&&!(t instanceof JSZip.CompressedObject))throw new Error("The data of '"+e+"' is in an unsupported format !");i==="arraybuffer"&&(t=JSZip.utils.transformTo("uint8array",t))}return this.files[e]=new s(e,t,n)},l=function(e){e.slice(-1)=="/"&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return t>0?e.substring(0,t):""},c=function(e){return e.slice(-1)!="/"&&(e+="/"),this.files[e]||f.call(this,e,null,{dir:!0}),this.files[e]},h=function(e,t){var n=new JSZip.CompressedObject,i;if(e._data instanceof JSZip.CompressedObject)n.uncompressedSize=e._data.uncompressedSize,n.crc32=e._data.crc32,n.uncompressedSize===0||e.options.dir?(t=JSZip.compressions.STORE,n.compressedContent="",n.crc32=0):e._data.compressionMethod===t.magic?n.compressedContent=e._data.getCompressedContent():(i=e._data.getContent(),n.compressedContent=t.compress(JSZip.utils.transformTo(t.compressInputType,i)));else{i=r(e);if(!i||i.length===0||e.options.dir)t=JSZip.compressions.STORE,i="";n.uncompressedSize=i.length,n.crc32=this.crc32(i),n.compressedContent=t.compress(JSZip.utils.transformTo(t.compressInputType,i))}return n.compressedSize=n.compressedContent.length,n.compressionMethod=t.magic,n},p=function(e,t,n,r){var i=n.compressedContent,s=this.utf8encode(t.name),u=s!==t.name,a=t.options,f,l;f=a.date.getHours(),f<<=6,f|=a.date.getMinutes(),f<<=5,f|=a.date.getSeconds()/2,l=a.date.getFullYear()-1980,l<<=4,l|=a.date.getMonth()+1,l<<=5,l|=a.date.getDate();var c="";c+="\n\0",c+=u?"\0\b":"\0\0",c+=n.compressionMethod,c+=o(f,2),c+=o(l,2),c+=o(n.crc32,4),c+=o(n.compressedSize,4),c+=o(n.uncompressedSize,4),c+=o(s.length,2),c+="\0\0";var h=JSZip.signature.LOCAL_FILE_HEADER+c+s,p=JSZip.signature.CENTRAL_FILE_HEADER+"\0"+c+"\0\0"+"\0\0"+"\0\0"+(t.options.dir===!0?"\0\0\0":"\0\0\0\0")+o(r,4)+s;return{fileRecord:h,dirRecord:p,compressedObject:n}},d=function(){this.data=[]};d.prototype={append:function(e){e=JSZip.utils.transformTo("string",e),this.data.push(e)},finalize:function(){return this.data.join("")}};var v=function(e){this.data=new Uint8Array(e),this.index=0};return v.prototype={append:function(e){e.length!==0&&(e=JSZip.utils.transformTo("uint8array",e),this.data.set(e,this.index),this.index+=e.length)},finalize:function(){return this.data}},{load:function(e,t){throw new Error("Load method is not defined. Is the file jszip-load.js included ?")},filter:function(e){var t=[],n,r,i,o;for(n in this.files){if(!this.files.hasOwnProperty(n))continue;i=this.files[n],o=new s(i.name,i._data,u(i.options)),r=n.slice(this.root.length,n.length),n.slice(0,this.root.length)===this.root&&e(r,o)&&t.push(o)}return t},file:function(e,t,n){if(arguments.length===1){if(JSZip.utils.isRegExp(e)){var r=e;return this.filter(function(e,t){return!t.options.dir&&r.test(e)})}return this.filter(function(t,n){return!n.options.dir&&t===e})[0]||null}return e=this.root+e,f.call(this,e,t,n),this},folder:function(e){if(!e)return this;if(JSZip.utils.isRegExp(e))return this.filter(function(t,n){return n.options.dir&&e.test(t)});var t=this.root+e,n=c.call(this,t),r=this.clone();return r.root=n.name,r},remove:function(e){e=this.root+e;var t=this.files[e];t||(e.slice(-1)!="/"&&(e+="/"),t=this.files[e]);if(t)if(!t.options.dir)delete this.files[e];else{var n=this.filter(function(t,n){return n.name.slice(0,e.length)===e});for(var r=0;r<n.length;r++)delete this.files[n[r].name]}return this},generate:function(e){e=u(e||{},{base64:!0,compression:"STORE",type:"base64"}),JSZip.utils.checkSupport(e.type);var t=[],n=0,r=0,i,s;for(var a in this.files){if(!this.files.hasOwnProperty(a))continue;var f=this.files[a],l=f.options.compression||e.compression.toUpperCase(),c=JSZip.compressions[l];if(!c)throw new Error(l+" is not a valid compression method !");var m=h.call(this,f,c),g=p.call(this,a,f,m,n);n+=g.fileRecord.length+m.compressedSize,r+=g.dirRecord.length,t.push(g)}var y="";y=JSZip.signature.CENTRAL_DIRECTORY_END+"\0\0"+"\0\0"+o(t.length,2)+o(t.length,2)+o(r,4)+o(n,4)+"\0\0";switch(e.type.toLowerCase()){case"uint8array":case"arraybuffer":case"blob":case"nodebuffer":i=new v(n+r+y.length);break;case"base64":default:i=new d(n+r+y.length)}for(s=0;s<t.length;s++)i.append(t[s].fileRecord),i.append(t[s].compressedObject.compressedContent);for(s=0;s<t.length;s++)i.append(t[s].dirRecord);i.append(y);var b=i.finalize();switch(e.type.toLowerCase()){case"uint8array":case"arraybuffer":case"nodebuffer":return JSZip.utils.transformTo(e.type.toLowerCase(),b);case"blob":return JSZip.utils.arrayBuffer2Blob(JSZip.utils.transformTo("arraybuffer",b));case"base64":return e.base64?JSZip.base64.encode(b):b;default:return b}},crc32:function(t,n){if(typeof t=="undefined"||!t.length)return 0;var r=JSZip.utils.getTypeOf(t)!=="string",i=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117];typeof n=="undefined"&&(n=0);var s=0,o=0,u=0;n^=-1;for(var a=0,f=t.length;a<f;a++)u=r?t[a]:t.charCodeAt(a),o=(n^u)&255,s=i[o],n=n>>>8^s;return n^-1},clone:function(){var e=new JSZip;for(var t in this)typeof this[t]!="function"&&(e[t]=this[t]);return e},utf8encode:function(t){if(e){var n=e.encode(t);return JSZip.utils.transformTo("string",n)}if(JSZip.support.nodebuffer)return JSZip.utils.transformTo("string",new Buffer(t,"utf-8"));var r=[],i=0;for(var s=0;s<t.length;s++){var o=t.charCodeAt(s);o<128?r[i++]=String.fromCharCode(o):o>127&&o<2048?(r[i++]=String.fromCharCode(o>>6|192),r[i++]=String.fromCharCode(o&63|128)):(r[i++]=String.fromCharCode(o>>12|224),r[i++]=String.fromCharCode(o>>6&63|128),r[i++]=String.fromCharCode(o&63|128))}return r.join("")},utf8decode:function(e){var n=[],r=0,i=JSZip.utils.getTypeOf(e),s=i!=="string",o=0,u=0,a=0,f=0,l=0;if(t)return t.decode(JSZip.utils.transformTo("uint8array",e));if(JSZip.support.nodebuffer)return JSZip.utils.transformTo("nodebuffer",e).toString("utf-8");while(o<e.length)u=s?e[o]:e.charCodeAt(o),u<128?(n[r++]=String.fromCharCode(u),o++):u>191&&u<224?(f=s?e[o+1]:e.charCodeAt(o+1),n[r++]=String.fromCharCode((u&31)<<6|f&63),o+=2):(f=s?e[o+1]:e.charCodeAt(o+1),l=s?e[o+2]:e.charCodeAt(o+2),n[r++]=String.fromCharCode((u&15)<<12|(f&63)<<6|l&63),o+=3);return n.join("")}}}(),JSZip.compressions={STORE:{magic:"\0\0",compress:function(e){return e},uncompress:function(e){return e},compressInputType:null,uncompressInputType:null}},function(){function e(e){return e}function t(e,t){for(var n=0;n<e.length;++n)t[n]=e.charCodeAt(n)&255;return t}function n(e){var t=65536,n=[],r=e.length,i=JSZip.utils.getTypeOf(e),s=0,o=!0;try{switch(i){case"uint8array":String.fromCharCode.apply(null,new Uint8Array(0));break;case"nodebuffer":String.fromCharCode.apply(null,new Buffer(0))}}catch(u){o=!1}if(!o){var a="";for(var f=0;f<e.length;f++)a+=String.fromCharCode(e[f]);return a}while(s<r&&t>1)try{i==="array"||i==="nodebuffer"?n.push(String.fromCharCode.apply(null,e.slice(s,Math.min(s+t,r)))):n.push(String.fromCharCode.apply(null,e.subarray(s,Math.min(s+t,r)))),s+=t}catch(u){t=Math.floor(t/2)}return n.join("")}function r(e,t){for(var n=0;n<e.length;n++)t[n]=e[n];return t}JSZip.utils={string2binary:function(e){var t="";for(var n=0;n<e.length;n++)t+=String.fromCharCode(e.charCodeAt(n)&255);return t},string2Uint8Array:function(e){return JSZip.utils.transformTo("uint8array",e)},uint8Array2String:function(e){return JSZip.utils.transformTo("string",e)},arrayBuffer2Blob:function(e){JSZip.utils.checkSupport("blob");try{return new Blob([e],{type:"application/zip"})}catch(t){}try{var n=new(window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder);return n.append(e),n.getBlob("application/zip")}catch(t){}throw new Error("Bug : can't construct the Blob.")},string2Blob:function(e){var t=JSZip.utils.transformTo("arraybuffer",e);return JSZip.utils.arrayBuffer2Blob(t)}};var i={};i.string={string:e,array:function(e){return t(e,new Array(e.length))},arraybuffer:function(e){return i.string.uint8array(e).buffer},uint8array:function(e){return t(e,new Uint8Array(e.length))},nodebuffer:function(e){return t(e,new Buffer(e.length))}},i.array={string:n,array:e,arraybuffer:function(e){return(new Uint8Array(e)).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return new Buffer(e)}},i.arraybuffer={string:function(e){return n(new Uint8Array(e))},array:function(e){return r(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:e,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return new Buffer(new Uint8Array(e))}},i.uint8array={string:n,array:function(e){return r(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:e,nodebuffer:function(e){return new Buffer(e)}},i.nodebuffer={string:n,array:function(e){return r(e,new Array(e.length))},arraybuffer:function(e){return i.nodebuffer.uint8array(e).buffer},uint8array:function(e){return r(e,new Uint8Array(e.length))},nodebuffer:e},JSZip.utils.transformTo=function(e,t){t||(t="");if(!e)return t;JSZip.utils.checkSupport(e);var n=JSZip.utils.getTypeOf(t),r=i[n][e](t);return r},JSZip.utils.getTypeOf=function(e){if(typeof e=="string")return"string";if(Object.prototype.toString.call(e)==="[object Array]")return"array";if(JSZip.support.nodebuffer&&Buffer.isBuffer(e))return"nodebuffer";if(JSZip.support.uint8array&&e instanceof Uint8Array)return"uint8array";if(JSZip.support.arraybuffer&&e instanceof ArrayBuffer)return"arraybuffer"},JSZip.utils.isRegExp=function(e){return Object.prototype.toString.call(e)==="[object RegExp]"},JSZip.utils.checkSupport=function(e){var t=!0;switch(e.toLowerCase()){case"uint8array":t=JSZip.support.uint8array;break;case"arraybuffer":t=JSZip.support.arraybuffer;break;case"nodebuffer":t=JSZip.support.nodebuffer;break;case"blob":t=JSZip.support.blob}if(!t)throw new Error(e+" is not supported by this browser")}}(),function(){JSZip.CompressedObject=function(){this.compressedSize=0,this.uncompressedSize=0,this.crc32=0,this.compressionMethod=null,this.compressedContent=null},JSZip.CompressedObject.prototype={getContent:function(){return null},getCompressedContent:function(){return null}}}(),JSZip.base64=function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";return{encode:function(t,n){var r="",i,s,o,u,a,f,l,c=0;while(c<t.length)i=t.charCodeAt(c++),s=t.charCodeAt(c++),o=t.charCodeAt(c++),u=i>>2,a=(i&3)<<4|s>>4,f=(s&15)<<2|o>>6,l=o&63,isNaN(s)?f=l=64:isNaN(o)&&(l=64),r=r+e.charAt(u)+e.charAt(a)+e.charAt(f)+e.charAt(l);return r},decode:function(t,n){var r="",i,s,o,u,a,f,l,c=0;t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(c<t.length)u=e.indexOf(t.charAt(c++)),a=e.indexOf(t.charAt(c++)),f=e.indexOf(t.charAt(c++)),l=e.indexOf(t.charAt(c++)),i=u<<2|a>>4,s=(a&15)<<4|f>>2,o=(f&3)<<6|l,r+=String.fromCharCode(i),f!=64&&(r+=String.fromCharCode(s)),l!=64&&(r+=String.fromCharCode(o));return r}}}();