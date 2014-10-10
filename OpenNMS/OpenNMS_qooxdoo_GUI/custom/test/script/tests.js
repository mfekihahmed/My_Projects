(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();

if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"qx.allowUrlSettings":true,"qx.application":"testrunner.TestLoader","qx.debug":false,"qx.globalErrorHandling":true,"qx.optimization.basecalls":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.variants":true,"qx.optimization.whitespace":true,"qx.revision":"","qx.theme":"custom.theme.Theme","qx.version":"2.0.2","testrunner.testParts":false};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"../script"},"custom":{"resourceUri":"../resource","sourceUri":"../script"},"qx":{"resourceUri":"../resource","sourceUri":"../script","sourceViewUri":"https://github.com/qooxdoo/qooxdoo/blob/%{qxGitBranch}/framework/source/class/%{classFilePath}#L%{lineNumber}"},"testrunner":{"resourceUri":"../resource","sourceUri":"../script"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null,"en":null};
qx.$$locales = {"C":null,"en":null};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  packages : {"0":{"uris":["__out__:tests.ee760c9bc503.js"]}},
  urisBefore : [],
  cssBefore : [],
  boot : "boot",
  closureParts : {},
  bootIsInline : true,
  addNoCacheParam : true,

  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;
  }
};

var readyStateValue = "complete";
if (document.documentMode && document.documentMode < 10 ||
    (typeof window.ActiveXObject !== "undefined" && !document.documentMode)) {
  readyStateValue = "loaded";
}

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function() {
    if (!this.readyState || this.readyState == readyStateValue) {
      elem.onreadystatechange = elem.onload = null;
      if (typeof callback === "function") {
        callback();
      }
    }
  };

  if (isLoadParallel) {
    elem.async = null;
  }

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

function loadCss(uri) {
  var elem = document.createElement("link");
  elem.rel = "stylesheet";
  elem.type= "text/css";
  elem.href= uri;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);
var isLoadParallel = 'async' in document.createElement('script');

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }

  var item;

  if (isLoadParallel) {
    while (list.length) {
      item = list.shift();
      if (list.length) {
        loadScript(item);
      } else {
        loadScript(item, callback);
      }
    }
  } else {
    item = list.shift();
    loadScript(item,  function() {
      if (isWebkit) {
        // force async, else Safari fails with a "maximum recursion depth exceeded"
        window.setTimeout(function() {
          loadScriptList(list, callback);
        }, 0);
      } else {
        loadScriptList(list, callback);
      }
    });
  }
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap, callback) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
  if (callback){
    callback(dataMap);
  }
}

qx.$$loader.signalStartup = function ()
{
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true;
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

// Load all stuff
qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.cssBefore.length>0) {
    for (var i=0, m=l.cssBefore.length; i<m; i++) {
      loadCss(l.cssBefore[i]);
    }
  }
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){
      l.initUris();
    });
  } else {
    l.initUris();
  }
}

// Load qooxdoo boot stuff
qx.$$loader.initUris = function(){
  var l=qx.$$loader;
  var bootPackageHash=l.parts[l.boot][0];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.packages[l.parts[l.boot][0]].uris), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['0']={"locales":{"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_Ed":"d E","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_Hms":"HH:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_hms":"h:mm:ss a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/y","cldr_date_time_format_yMEd":"E, M/d/y","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"E, MMM d, y","cldr_date_time_format_yMMMd":"MMM d, y","cldr_date_time_format_yMd":"M/d/y","cldr_date_time_format_yQ":"Q y","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","day":"Day","dayperiod":"AM/PM","era":"Era","hour":"Hour","minute":"Minute","month":"Month","quotationEnd":"”","quotationStart":"“","second":"Second","week":"Week","weekday":"Day of the Week","year":"Year","zone":"Time Zone"},"en":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_Ed":"d E","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_Hms":"HH:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_hms":"h:mm:ss a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/y","cldr_date_time_format_yMEd":"E, M/d/y","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"E, MMM d, y","cldr_date_time_format_yMMMd":"MMM d, y","cldr_date_time_format_yMd":"M/d/y","cldr_date_time_format_yQ":"Q y","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","day":"Day","dayperiod":"AM/PM","era":"Era","hour":"Hour","minute":"Minute","month":"Month","quotationEnd":"”","quotationStart":"“","second":"Second","week":"Week","weekday":"Day of the Week","year":"Year","zone":"Time Zone"}},"resources":{"qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-49,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-59,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-44,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-54,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-28,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-36,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-checked-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-checked-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-checked.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-disabled-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-disabled.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-hovered-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-hovered.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-preselected-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-preselected-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-preselected.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-pressed-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button.png":[80,60,"png","qx"],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/checkbox-undetermined-disabled.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-focused-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-focused.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-hovered-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-hovered.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/checked-disabled.png":[6,6,"png","qx"],"qx/decoration/Modern/form/checked.png":[6,6,"png","qx"],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/tooltip-error-arrow-right.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-c.png":[40,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error.png":[127,30,"png","qx"],"qx/decoration/Modern/form/undetermined-disabled.png":[6,2,"png","qx"],"qx/decoration/Modern/form/undetermined.png":[6,2,"png","qx"],"qx/decoration/Modern/group-item.png":[110,20,"png","qx"],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-c.png":[40,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox.png":[255,59,"png","qx"],"qx/decoration/Modern/menu-background-combined.png":[80,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[40,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",-40,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/pane/pane-c.png":[40,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane.png":[185,250,"png","qx"],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-6,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-46,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-16,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-c.png":[40,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[40,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-small.png":[114,146,"png","qx"],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow.png":[381,412,"png","qx"],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-1],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/table-combined.png":[94,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-80,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-26,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-18,0],"qx/decoration/Modern/table/header-cell.png":[40,18,"png","qx","qx/decoration/Modern/table-combined.png",-40,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active.png":[49,24,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active.png":[48,22,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[40,120,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[80,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-40,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-active.png":[69,21,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive.png":[69,21,"png","qx"],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-c.png":[40,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/decoration/Modern/window/statusbar.png":[369,15,"png","qx"],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx"],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"]},"translations":{"C":{},"en":{}}};
(function(){var m=".prototype",k="function",j="Boolean",h="Error",g="constructor",f="warn",e="default",d="hasOwnProperty",c="string",b="toLocaleString",K="RegExp",J='\", "',I="info",H="BROKEN_IE",G="isPrototypeOf",F="Date",E="qx.Bootstrap",D="]",C="Class",B="error",t="[Class ",u="valueOf",r="Number",s="debug",p="ES5",q="Object",n='"',o="",v="Array",w="()",y="String",x="Function",A="toString",z=".";if(!window.qx){window.qx={};}
;qx.Bootstrap={genericToString:function(){return t+this.classname+D;}
,createNamespace:function(name,L){var N=name.split(z);var parent=window;var M=N[0];for(var i=0,O=N.length-1;i<O;i++,M=N[i]){if(!parent[M]){parent=parent[M]={};}
else {parent=parent[M];}
;}
;parent[M]=L;return M;}
,setDisplayName:function(P,Q,name){P.displayName=Q+z+name+w;}
,setDisplayNames:function(R,S){for(var name in R){var T=R[name];if(T instanceof Function){T.displayName=S+z+name+w;}
;}
;}
,define:function(name,U){if(!U){var U={statics:{}};}
;var ba;var X=null;qx.Bootstrap.setDisplayNames(U.statics,name);if(U.members||U.extend){qx.Bootstrap.setDisplayNames(U.members,name+m);ba=U.construct||new Function;if(U.extend){this.extendClass(ba,ba,U.extend,name,Y);}
;var V=U.statics||{};for(var i=0,bb=qx.Bootstrap.getKeys(V),l=bb.length;i<l;i++){var bc=bb[i];ba[bc]=V[bc];}
;X=ba.prototype;var W=U.members||{};for(var i=0,bb=qx.Bootstrap.getKeys(W),l=bb.length;i<l;i++){var bc=bb[i];X[bc]=W[bc];}
;}
else {ba=U.statics||{};}
;var Y=name?this.createNamespace(name,ba):o;ba.name=ba.classname=name;ba.basename=Y;ba.$$type=C;if(!ba.hasOwnProperty(A)){ba.toString=this.genericToString;}
;if(U.defer){U.defer(ba,X);}
;qx.Bootstrap.$$registry[name]=ba;return ba;}
};qx.Bootstrap.define(E,{statics:{LOADSTART:qx.$$start||new Date(),DEBUG:(function(){var bd=true;if(qx.$$environment&&qx.$$environment["qx.debug"]===false){bd=false;}
;return bd;}
)(),getEnvironmentSetting:function(be){if(qx.$$environment){return qx.$$environment[be];}
;}
,setEnvironmentSetting:function(bf,bg){if(!qx.$$environment){qx.$$environment={};}
;if(qx.$$environment[bf]===undefined){qx.$$environment[bf]=bg;}
;}
,createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(bh,bi,bj,name,bk){var bn=bj.prototype;var bm=new Function;bm.prototype=bn;var bl=new bm;bh.prototype=bl;bl.name=bl.classname=name;bl.basename=bk;bi.base=bh.superclass=bj;bi.self=bh.constructor=bl.constructor=bh;}
,getByName:function(name){return qx.Bootstrap.$$registry[name];}
,$$registry:{},objectGetLength:function(bo){var length=0;for(var bp in bo){length++;}
;return length;}
,objectMergeWith:function(bq,br,bs){if(bs===undefined){bs=true;}
;for(var bt in br){if(bs||bq[bt]===undefined){bq[bt]=br[bt];}
;}
;return bq;}
,__a:[G,d,b,A,u,g],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(bu){var bv=[];var bx=Object.prototype.hasOwnProperty;for(var by in bu){if(bx.call(bu,by)){bv.push(by);}
;}
;var bw=qx.Bootstrap.__a;for(var i=0,a=bw,l=a.length;i<l;i++){if(bx.call(bu,a[i])){bv.push(a[i]);}
;}
;return bv;}
,"default":function(bz){var bA=[];var bB=Object.prototype.hasOwnProperty;for(var bC in bz){if(bB.call(bz,bC)){bA.push(bC);}
;}
;return bA;}
})[typeof (Object.keys)==k?p:(function(){for(var bD in {toString:1}){return bD;}
;}
)()!==A?H:e],getKeysAsString:function(bE){var bF=qx.Bootstrap.getKeys(bE);if(bF.length==0){return o;}
;return n+bF.join(J)+n;}
,__b:{"[object String]":y,"[object Array]":v,"[object Object]":q,"[object RegExp]":K,"[object Number]":r,"[object Boolean]":j,"[object Date]":F,"[object Function]":x,"[object Error]":h},bind:function(bG,self,bH){var bI=Array.prototype.slice.call(arguments,2,arguments.length);return function(){var bJ=Array.prototype.slice.call(arguments,0,arguments.length);return bG.apply(self,bI.concat(bJ));}
;}
,firstUp:function(bK){return bK.charAt(0).toUpperCase()+bK.substr(1);}
,firstLow:function(bL){return bL.charAt(0).toLowerCase()+bL.substr(1);}
,getClass:function(bM){var bN=Object.prototype.toString.call(bM);return (qx.Bootstrap.__b[bN]||bN.slice(8,-1));}
,isString:function(bO){return (bO!==null&&(typeof bO===c||qx.Bootstrap.getClass(bO)==y||bO instanceof String||(!!bO&&!!bO.$$isString)));}
,isArray:function(bP){return (bP!==null&&(bP instanceof Array||(bP&&qx.data&&qx.data.IListData&&qx.util.OOUtil.hasInterface(bP.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bP)==v||(!!bP&&!!bP.$$isArray)));}
,isObject:function(bQ){return (bQ!==undefined&&bQ!==null&&qx.Bootstrap.getClass(bQ)==q);}
,isFunction:function(bR){return qx.Bootstrap.getClass(bR)==x;}
,$$logs:[],debug:function(bS,bT){qx.Bootstrap.$$logs.push([s,arguments]);}
,info:function(bU,bV){qx.Bootstrap.$$logs.push([I,arguments]);}
,warn:function(bW,bX){qx.Bootstrap.$$logs.push([f,arguments]);}
,error:function(bY,ca){qx.Bootstrap.$$logs.push([B,arguments]);}
,trace:function(cb){}
}});}
)();
(function(){var cs="qx.blankpage",cr="qx.bom.client.Stylesheet.getInsertRule",cq="qx.bom.client.Html.getDataset",cp="qx.bom.client.PhoneGap.getPhoneGap",co='] found, and no default ("default") given',cn="qx.bom.client.Html.getAudioAif",cm="qx.bom.client.CssTransform.get3D",cl=' type)',ck="qx.bom.client.Xml.getAttributeNS",cj="qx.bom.client.Stylesheet.getRemoveImport",bt="qx.bom.client.Css.getUserModify",bs="qx.bom.client.Css.getFilterGradient",br="qx.bom.client.Event.getHashChange",bq="qx.bom.client.Plugin.getWindowsMedia",bp="qx.bom.client.Html.getVideo",bo="qx.bom.client.Device.getName",bn="qx.bom.client.Event.getTouch",bm="qx.optimization.strings",bl="qx.debug.property.level",bk="qx.optimization.variables",cz="qx.bom.client.EcmaScript.getStackTrace",cA="qx.bom.client.Xml.getSelectSingleNode",cx="qx.bom.client.Xml.getImplementation",cy="qx.bom.client.Html.getConsole",cv="qx.bom.client.Engine.getVersion",cw="qx.bom.client.Plugin.getQuicktime",ct="qx.bom.client.Html.getNaturalDimensions",cu="qx.bom.client.Xml.getSelectNodes",cB="qx.bom.client.Xml.getElementsByTagNameNS",cC="qx.bom.client.Html.getDataUrl",bR="qx.bom.client.Flash.isAvailable",bQ="qx.bom.client.Html.getCanvas",bT="qx.bom.client.Css.getBoxModel",bS="qx.bom.client.Plugin.getSilverlight",bV="qx/static/blank.html",bU="qx.bom.client.Css.getUserSelect",bX="qx.bom.client.Css.getRadialGradient",bW="module.property",bP="qx.bom.client.Plugin.getWindowsMediaVersion",bO="qx.bom.client.Stylesheet.getCreateStyleSheet",a='No match for variant "',b="qx.bom.client.Locale.getLocale",c="module.events",d="module.databinding",e="qx.bom.client.Html.getFileReader",f="qx.bom.client.Css.getBorderImage",g="qx.bom.client.Stylesheet.getDeleteRule",h="qx.bom.client.Plugin.getDivXVersion",j="qx.bom.client.Scroll.scrollBarOverlayed",k="qx.bom.client.Plugin.getPdfVersion",cQ=":",cP="qx.bom.client.Css.getLinearGradient",cO="qx.bom.client.Transport.getXmlHttpRequest",cN="qx.bom.client.Css.getBorderImageSyntax",cU="qx.bom.client.Html.getClassList",cT="qx.bom.client.Event.getHelp",cS="qx.optimization.comments",cR="qx.bom.client.Locale.getVariant",cW="qx.bom.client.Css.getBoxSizing",cV="qx.bom.client.OperatingSystem.getName",J="module.logger",K="qx.bom.client.Css.getOverflowXY",H="qx.mobile.emulatetouch",I="qx.bom.client.Html.getAudioWav",N="qx.bom.client.Browser.getName",O="qx.bom.client.Css.getInlineBlock",L="qx.bom.client.Plugin.getPdf",M="qx.dynlocale",F='" (',G="qx.bom.client.Html.getAudio",s="qx.core.Environment",r="qx.bom.client.CssTransform.getSupport",u="qx.bom.client.Html.getTextContent",t="qx.bom.client.Css.getPlaceholder",o="qx.bom.client.Css.getFloat",n=' in variants [',q="false",p="qx.bom.client.Css.getBoxShadow",m="qx.bom.client.Html.getXul",l="qx.bom.client.Xml.getCreateNode",T="qxenv",U="qx.bom.client.Html.getSessionStorage",V="qx.bom.client.Html.getAudioAu",W="qx.bom.client.Css.getOpacity",P="qx.bom.client.Css.getFilterTextShadow",Q="qx.bom.client.Html.getVml",R="qx.bom.client.Css.getRgba",S="qx.bom.client.Transport.getMaxConcurrentRequestCount",X="qx.bom.client.Css.getBorderRadius",Y="qx.bom.client.Event.getPointer",C="qx.bom.client.Transport.getSsl",B="qx.bom.client.Html.getWebWorker",A="qx.bom.client.Json.getJson",z="qx.bom.client.Browser.getQuirksMode",y="qx.debug.dispose",x="qx.bom.client.Css.getTextOverflow",w="qx.bom.client.Xml.getQualifiedItem",v="qx.bom.client.Html.getVideoOgg",E="&",D="qx.bom.client.Device.getType",ba="qx.bom.client.Browser.getDocumentMode",bb="qx.allowUrlVariants",bc="qx.bom.client.Html.getContains",bd="qx.bom.client.Plugin.getActiveX",be=".",bf="qx.bom.client.Xml.getDomProperties",bg="qx.bom.client.CssAnimation.getSupport",bh="qx.debug.databinding",bi="qx.optimization.basecalls",bj="qx.bom.client.Browser.getVersion",bx="qx.bom.client.Css.getUserSelectNone",bw="qx.bom.client.Html.getSvg",bv="qx.optimization.privates",bu="qx.bom.client.Plugin.getDivX",bB="qx.bom.client.Runtime.getName",bA="qx.bom.client.Html.getLocalStorage",bz="qx.bom.client.Flash.getStrictSecurityModel",by="qx.aspects",bD="qx.debug",bC="qx.dynamicmousewheel",bK="qx.bom.client.Html.getAudioMp3",bL="qx.bom.client.Engine.getName",bI="qx.bom.client.Html.getUserDataStorage",bJ="qx.bom.client.Plugin.getGears",bG="qx.bom.client.Plugin.getQuicktimeVersion",bH="qx.bom.client.Html.getAudioOgg",bE="qx.bom.client.Css.getTextShadow",bF="qx.bom.client.Plugin.getSilverlightVersion",bM="qx.bom.client.Html.getCompareDocumentPosition",bN="qx.bom.client.Flash.getExpressInstall",cc="qx.bom.client.OperatingSystem.getVersion",cb="qx.bom.client.Html.getXPath",ce="qx.bom.client.Html.getGeoLocation",cd="qx.bom.client.Css.getAppearance",cg="qx.mobile.nativescroll",cf="qx.bom.client.Xml.getDomParser",ci="qx.bom.client.Stylesheet.getAddImport",ch="qx.optimization.variants",ca="qx.bom.client.Html.getVideoWebm",bY="qx.bom.client.Flash.getVersion",cJ="qx.bom.client.Css.getLegacyWebkitGradient",cK="qx.bom.client.PhoneGap.getNotification",cL="qx.bom.client.Html.getVideoH264",cM="qx.bom.client.Xml.getCreateElementNS",cF="qx.core.Environment for a list of predefined keys.",cG=" is not a valid key. Please see the API-doc of ",cH="default",cI="|",cD="true",cE="qx.allowUrlSettings";qx.Bootstrap.define(s,{statics:{_checks:{},_asyncChecks:{},__e:{},_checksMap:{"engine.version":cv,"engine.name":bL,"browser.name":N,"browser.version":bj,"browser.documentmode":ba,"browser.quirksmode":z,"runtime.name":bB,"device.name":bo,"device.type":D,"locale":b,"locale.variant":cR,"os.name":cV,"os.version":cc,"os.scrollBarOverlayed":j,"plugin.gears":bJ,"plugin.activex":bd,"plugin.quicktime":cw,"plugin.quicktime.version":bG,"plugin.windowsmedia":bq,"plugin.windowsmedia.version":bP,"plugin.divx":bu,"plugin.divx.version":h,"plugin.silverlight":bS,"plugin.silverlight.version":bF,"plugin.flash":bR,"plugin.flash.version":bY,"plugin.flash.express":bN,"plugin.flash.strictsecurity":bz,"plugin.pdf":L,"plugin.pdf.version":k,"io.maxrequests":S,"io.ssl":C,"io.xhr":cO,"event.touch":bn,"event.pointer":Y,"event.help":cT,"event.hashchange":br,"ecmascript.stacktrace":cz,"html.webworker":B,"html.filereader":e,"html.geolocation":ce,"html.audio":G,"html.audio.ogg":bH,"html.audio.mp3":bK,"html.audio.wav":I,"html.audio.au":V,"html.audio.aif":cn,"html.video":bp,"html.video.ogg":v,"html.video.h264":cL,"html.video.webm":ca,"html.storage.local":bA,"html.storage.session":U,"html.storage.userdata":bI,"html.classlist":cU,"html.xpath":cb,"html.xul":m,"html.canvas":bQ,"html.svg":bw,"html.vml":Q,"html.dataset":cq,"html.dataurl":cC,"html.console":cy,"html.stylesheet.createstylesheet":bO,"html.stylesheet.insertrule":cr,"html.stylesheet.deleterule":g,"html.stylesheet.addimport":ci,"html.stylesheet.removeimport":cj,"html.element.contains":bc,"html.element.compareDocumentPosition":bM,"html.element.textcontent":u,"html.image.naturaldimensions":ct,"json":A,"css.textoverflow":x,"css.placeholder":t,"css.borderradius":X,"css.borderimage":f,"css.borderimage.standardsyntax":cN,"css.boxshadow":p,"css.gradient.linear":cP,"css.gradient.filter":bs,"css.gradient.radial":bX,"css.gradient.legacywebkit":cJ,"css.boxmodel":bT,"css.rgba":R,"css.userselect":bU,"css.userselect.none":bx,"css.usermodify":bt,"css.appearance":cd,"css.float":o,"css.boxsizing":cW,"css.animation":bg,"css.transform":r,"css.transform.3d":cm,"css.inlineblock":O,"css.opacity":W,"css.overflowxy":K,"css.textShadow":bE,"css.textShadow.filter":P,"phonegap":cp,"phonegap.notification":cK,"xml.implementation":cx,"xml.domparser":cf,"xml.selectsinglenode":cA,"xml.selectnodes":cu,"xml.getelementsbytagnamens":cB,"xml.domproperties":bf,"xml.attributens":ck,"xml.createnode":l,"xml.getqualifieditem":w,"xml.createelementns":cM},get:function(cX){if(this.__e[cX]!=undefined){return this.__e[cX];}
;var db=this._checks[cX];if(db){var dc=db();this.__e[cX]=dc;return dc;}
;var da=this._getClassNameFromEnvKey(cX);if(da[0]!=undefined){var dd=da[0];var cY=da[1];var dc=dd[cY]();this.__e[cX]=dc;return dc;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(cX+cG+cF);qx.Bootstrap.trace(this);}
;}
,_getClassNameFromEnvKey:function(de){var dk=this._checksMap;if(dk[de]!=undefined){var dg=dk[de];var dj=dg.lastIndexOf(be);if(dj>-1){var di=dg.slice(0,dj);var df=dg.slice(dj+1);var dh=qx.Bootstrap.getByName(di);if(dh!=undefined){return [dh,df];}
;}
;}
;return [undefined,undefined];}
,getAsync:function(dl,dm,self){var dr=this;if(this.__e[dl]!=undefined){window.setTimeout(function(){dm.call(self,dr.__e[dl]);}
,0);return;}
;var dq=this._asyncChecks[dl];if(dq){dq(function(dt){dr.__e[dl]=dt;dm.call(self,dt);}
);return;}
;var dp=this._getClassNameFromEnvKey(dl);if(dp[0]!=undefined){var ds=dp[0];var dn=dp[1];ds[dn](function(du){dr.__e[dl]=du;dm.call(self,du);}
);return;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(dl+cG+cF);qx.Bootstrap.trace(this);}
;}
,select:function(dv,dw){return this.__f(this.get(dv),dw);}
,selectAsync:function(dx,dy,self){this.getAsync(dx,function(dz){var dA=this.__f(dx,dy);dA.call(self,dz);}
,this);}
,__f:function(dB,dC){var dE=dC[dB];if(dC.hasOwnProperty(dB)){return dE;}
;for(var dD in dC){if(dD.indexOf(cI)!=-1){var dF=dD.split(cI);for(var i=0;i<dF.length;i++){if(dF[i]==dB){return dC[dD];}
;}
;}
;}
;if(dC[cH]!==undefined){return dC[cH];}
;if(qx.Bootstrap.DEBUG){throw new Error(a+dB+F+(typeof dB)+cl+n+qx.Bootstrap.getKeysAsString(dC)+co);}
;}
,filter:function(dG){var dI=[];for(var dH in dG){if(this.get(dH)){dI.push(dG[dH]);}
;}
;return dI;}
,invalidateCacheKey:function(dJ){delete this.__e[dJ];}
,add:function(dK,dL){if(this._checks[dK]==undefined){if(dL instanceof Function){this._checks[dK]=dL;}
else {this._checks[dK]=this.__i(dL);}
;}
;}
,addAsync:function(dM,dN){if(this._checks[dM]==undefined){this._asyncChecks[dM]=dN;}
;}
,getChecks:function(){return this._checks;}
,getAsyncChecks:function(){return this._asyncChecks;}
,_initDefaultQxValues:function(){this.add(cD,function(){return true;}
);this.add(cE,function(){return false;}
);this.add(bb,function(){return false;}
);this.add(bl,function(){return 0;}
);this.add(bD,function(){return true;}
);this.add(by,function(){return false;}
);this.add(M,function(){return true;}
);this.add(H,function(){return false;}
);this.add(cg,function(){return false;}
);this.add(cs,function(){return bV;}
);this.add(bC,function(){return true;}
);this.add(bh,function(){return false;}
);this.add(y,function(){return false;}
);this.add(bi,function(){return false;}
);this.add(cS,function(){return false;}
);this.add(bv,function(){return false;}
);this.add(bm,function(){return false;}
);this.add(bk,function(){return false;}
);this.add(ch,function(){return false;}
);this.add(d,function(){return true;}
);this.add(J,function(){return true;}
);this.add(bW,function(){return true;}
);this.add(c,function(){return true;}
);}
,__g:function(){if(qx&&qx.$$environment){for(var dP in qx.$$environment){var dO=qx.$$environment[dP];this._checks[dP]=this.__i(dO);}
;}
;}
,__h:function(){if(window.document&&window.document.location){var dQ=window.document.location.search.slice(1).split(E);for(var i=0;i<dQ.length;i++){var dS=dQ[i].split(cQ);if(dS.length!=3||dS[0]!=T){continue;}
;var dT=dS[1];var dR=decodeURIComponent(dS[2]);if(dR==cD){dR=true;}
else if(dR==q){dR=false;}
else if(/^(\d|\.)+$/.test(dR)){dR=parseFloat(dR);}
;;this._checks[dT]=this.__i(dR);}
;}
;}
,__i:function(dU){return qx.Bootstrap.bind(function(dV){return dV;}
,null,dU);}
},defer:function(dW){dW._initDefaultQxValues();dW.__g();if(dW.get(cE)===true){dW.__h();}
;}
});}
)();
(function(){var a="qx.util.OOUtil";qx.Bootstrap.define(a,{statics:{classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;}
,getPropertyDefinition:function(b,name){while(b){if(b.$$properties&&b.$$properties[name]){return b.$$properties[name];}
;b=b.superclass;}
;return null;}
,hasProperty:function(c,name){return !!qx.util.OOUtil.getPropertyDefinition(c,name);}
,getEventType:function(d,name){var d=d.constructor;while(d.superclass){if(d.$$events&&d.$$events[name]!==undefined){return d.$$events[name];}
;d=d.superclass;}
;return null;}
,supportsEvent:function(e,name){return !!qx.util.OOUtil.getEventType(e,name);}
,getByInterface:function(f,g){var h,i,l;while(f){if(f.$$implements){h=f.$$flatImplements;for(i=0,l=h.length;i<l;i++){if(h[i]===g){return f;}
;}
;}
;f=f.superclass;}
;return null;}
,hasInterface:function(j,k){return !!qx.util.OOUtil.getByInterface(j,k);}
,getMixins:function(m){var n=[];while(m){if(m.$$includes){n.push.apply(n,m.$$flatIncludes);}
;m=m.superclass;}
;return n;}
}});}
)();
(function(){var o="qx.Mixin",n=".prototype",m="]",k="constructor",j="Array",h="destruct",g='" in property "',f="Mixin",e="[Mixin ",d='" in member "',a='Conflict between mixin "',c='"!',b='" and "';qx.Bootstrap.define(o,{statics:{define:function(name,p){if(p){if(p.include&&!(qx.Bootstrap.getClass(p.include)===j)){p.include=[p.include];}
;{}
;var r=p.statics?p.statics:{};qx.Bootstrap.setDisplayNames(r,name);for(var q in r){if(r[q] instanceof Function){r[q].$$mixin=r;}
;}
;if(p.construct){r.$$constructor=p.construct;qx.Bootstrap.setDisplayName(p.construct,name,k);}
;if(p.include){r.$$includes=p.include;}
;if(p.properties){r.$$properties=p.properties;}
;if(p.members){r.$$members=p.members;qx.Bootstrap.setDisplayNames(p.members,name+n);}
;for(var q in r.$$members){if(r.$$members[q] instanceof Function){r.$$members[q].$$mixin=r;}
;}
;if(p.events){r.$$events=p.events;}
;if(p.destruct){r.$$destructor=p.destruct;qx.Bootstrap.setDisplayName(p.destruct,name,h);}
;}
else {var r={};}
;r.$$type=f;r.name=name;r.toString=this.genericToString;r.basename=qx.Bootstrap.createNamespace(name,r);this.$$registry[name]=r;return r;}
,checkCompatibility:function(s){var v=this.flatten(s);var w=v.length;if(w<2){return true;}
;var z={};var y={};var x={};var u;for(var i=0;i<w;i++){u=v[i];for(var t in u.events){if(x[t]){throw new Error(a+u.name+b+x[t]+d+t+c);}
;x[t]=u.name;}
;for(var t in u.properties){if(z[t]){throw new Error(a+u.name+b+z[t]+g+t+c);}
;z[t]=u.name;}
;for(var t in u.members){if(y[t]){throw new Error(a+u.name+b+y[t]+d+t+c);}
;y[t]=u.name;}
;}
;return true;}
,isCompatible:function(A,B){var C=qx.util.OOUtil.getMixins(B);C.push(A);return qx.Mixin.checkCompatibility(C);}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(D){if(!D){return [];}
;var E=D.concat();for(var i=0,l=D.length;i<l;i++){if(D[i].$$includes){E.push.apply(E,this.flatten(D[i].$$includes));}
;}
;return E;}
,genericToString:function(){return e+this.name+m;}
,$$registry:{},__c:null,__d:function(){}
}});}
)();
(function(){var d="qx.core.Aspect",c="before",b="*",a="static";qx.Bootstrap.define(d,{statics:{__j:[],wrap:function(e,f,g){var m=[];var h=[];var l=this.__j;var k;for(var i=0;i<l.length;i++){k=l[i];if((k.type==null||g==k.type||k.type==b)&&(k.name==null||e.match(k.name))){k.pos==-1?m.push(k.fcn):h.push(k.fcn);}
;}
;if(m.length===0&&h.length===0){return f;}
;var j=function(){for(var i=0;i<m.length;i++){m[i].call(this,e,f,g,arguments);}
;var n=f.apply(this,arguments);for(var i=0;i<h.length;i++){h[i].call(this,e,f,g,arguments,n);}
;return n;}
;if(g!==a){j.self=f.self;j.base=f.base;}
;f.wrapper=j;j.original=f;return j;}
,addAdvice:function(o,p,q,name){this.__j.push({fcn:o,pos:p===c?-1:1,type:q,name:name});}
}});}
)();
(function(){var t='Implementation of method "',s="function",r="Boolean",q="qx.Interface",p='The event "',o='The property "',n="Interface",m="toggle",k="]",j="[Interface ",c="is",h="Array",f='Implementation of member "',b='"',a='" is not supported by Class "',e='" required by interface "',d='" is missing in class "',g='"!';qx.Bootstrap.define(q,{statics:{define:function(name,u){if(u){if(u.extend&&!(qx.Bootstrap.getClass(u.extend)===h)){u.extend=[u.extend];}
;{}
;var v=u.statics?u.statics:{};if(u.extend){v.$$extends=u.extend;}
;if(u.properties){v.$$properties=u.properties;}
;if(u.members){v.$$members=u.members;}
;if(u.events){v.$$events=u.events;}
;}
else {var v={};}
;v.$$type=n;v.name=name;v.toString=this.genericToString;v.basename=qx.Bootstrap.createNamespace(name,v);qx.Interface.$$registry[name]=v;return v;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(w){if(!w){return [];}
;var x=w.concat();for(var i=0,l=w.length;i<l;i++){if(w[i].$$extends){x.push.apply(x,this.flatten(w[i].$$extends));}
;}
;return x;}
,__k:function(y,z,A,B){var F=A.$$members;if(F){for(var E in F){if(qx.Bootstrap.isFunction(F[E])){var D=this.__l(z,E);var C=D||qx.Bootstrap.isFunction(y[E]);if(!C){throw new Error(t+E+d+z.classname+e+A.name+b);}
;var G=B===true&&!D&&!qx.util.OOUtil.hasInterface(z,A);if(G){y[E]=this.__o(A,y[E],E,F[E]);}
;}
else {if(typeof y[E]===undefined){if(typeof y[E]!==s){throw new Error(f+E+d+z.classname+e+A.name+b);}
;}
;}
;}
;}
;}
,__l:function(H,I){var M=I.match(/^(is|toggle|get|set|reset)(.*)$/);if(!M){return false;}
;var J=qx.Bootstrap.firstLow(M[2]);var K=qx.util.OOUtil.getPropertyDefinition(H,J);if(!K){return false;}
;var L=M[0]==c||M[0]==m;if(L){return qx.util.OOUtil.getPropertyDefinition(H,J).check==r;}
;return true;}
,__m:function(N,O){if(O.$$properties){for(var P in O.$$properties){if(!qx.util.OOUtil.getPropertyDefinition(N,P)){throw new Error(o+P+a+N.classname+g);}
;}
;}
;}
,__n:function(Q,R){if(R.$$events){for(var S in R.$$events){if(!qx.util.OOUtil.supportsEvent(Q,S)){throw new Error(p+S+a+Q.classname+g);}
;}
;}
;}
,assertObject:function(T,U){var W=T.constructor;this.__k(T,W,U,false);this.__m(W,U);this.__n(W,U);var V=U.$$extends;if(V){for(var i=0,l=V.length;i<l;i++){this.assertObject(T,V[i]);}
;}
;}
,assert:function(X,Y,ba){this.__k(X.prototype,X,Y,ba);this.__m(X,Y);this.__n(X,Y);var bb=Y.$$extends;if(bb){for(var i=0,l=bb.length;i<l;i++){this.assert(X,bb[i],ba);}
;}
;}
,genericToString:function(){return j+this.name+k;}
,$$registry:{},__o:function(){}
,__c:null,__d:function(){}
}});}
)();
(function(){var g="qx.lang.Core",f="\\\\",e="\\\"",d='"',c="[object Error]",b="emulated",a="native";qx.Bootstrap.define(g,{statics:{errorToString:{"native":Error.prototype.toString,"emulated":function(){return this.message;}
}[(!Error.prototype.toString||Error.prototype.toString()==c)?b:a],arrayIndexOf:{"native":Array.prototype.indexOf,"emulated":function(h,j){if(j==null){j=0;}
else if(j<0){j=Math.max(0,this.length+j);}
;for(var i=j;i<this.length;i++){if(this[i]===h){return i;}
;}
;return -1;}
}[Array.prototype.indexOf?a:b],arrayLastIndexOf:{"native":Array.prototype.lastIndexOf,"emulated":function(k,m){if(m==null){m=this.length-1;}
else if(m<0){m=Math.max(0,this.length+m);}
;for(var i=m;i>=0;i--){if(this[i]===k){return i;}
;}
;return -1;}
}[Array.prototype.lastIndexOf?a:b],arrayForEach:{"native":Array.prototype.forEach,"emulated":function(n,o){var l=this.length;for(var i=0;i<l;i++){var p=this[i];if(p!==undefined){n.call(o||window,p,i,this);}
;}
;}
}[Array.prototype.forEach?a:b],arrayFilter:{"native":Array.prototype.filter,"emulated":function(q,r){var s=[];var l=this.length;for(var i=0;i<l;i++){var t=this[i];if(t!==undefined){if(q.call(r||window,t,i,this)){s.push(this[i]);}
;}
;}
;return s;}
}[Array.prototype.filter?a:b],arrayMap:{"native":Array.prototype.map,"emulated":function(u,v){var w=[];var l=this.length;for(var i=0;i<l;i++){var x=this[i];if(x!==undefined){w[i]=u.call(v||window,x,i,this);}
;}
;return w;}
}[Array.prototype.map?a:b],arraySome:{"native":Array.prototype.some,"emulated":function(y,z){var l=this.length;for(var i=0;i<l;i++){var A=this[i];if(A!==undefined){if(y.call(z||window,A,i,this)){return true;}
;}
;}
;return false;}
}[Array.prototype.some?a:b],arrayEvery:{"native":Array.prototype.every,"emulated":function(B,C){var l=this.length;for(var i=0;i<l;i++){var D=this[i];if(D!==undefined){if(!B.call(C||window,D,i,this)){return false;}
;}
;}
;return true;}
}[Array.prototype.every?a:b],stringQuote:{"native":String.prototype.quote,"emulated":function(){return d+this.replace(/\\/g,f).replace(/\"/g,e)+d;}
}[String.prototype.quote?a:b]}});if(!Error.prototype.toString||Error.prototype.toString()==c){Error.prototype.toString=qx.lang.Core.errorToString;}
;if(!Array.prototype.indexOf){Array.prototype.indexOf=qx.lang.Core.arrayIndexOf;}
;if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=qx.lang.Core.arrayLastIndexOf;}
;if(!Array.prototype.forEach){Array.prototype.forEach=qx.lang.Core.arrayForEach;}
;if(!Array.prototype.filter){Array.prototype.filter=qx.lang.Core.arrayFilter;}
;if(!Array.prototype.map){Array.prototype.map=qx.lang.Core.arrayMap;}
;if(!Array.prototype.some){Array.prototype.some=qx.lang.Core.arraySome;}
;if(!Array.prototype.every){Array.prototype.every=qx.lang.Core.arrayEvery;}
;if(!String.prototype.quote){String.prototype.quote=qx.lang.Core.stringQuote;}
;}
)();
(function(){var bC='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',bB='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',bA='value !== null && value.nodeType === 9 && value.documentElement',bz='value !== null && value.$$type === "Mixin"',by='return init;',bx='var init=this.',bw='value !== null && value.nodeType === 1 && value.attributes',bv="var parent = this.getLayoutParent();",bu="Error in property ",bt='qx.core.Assert.assertInstance(value, Date, msg) || true',bi="if (!parent) return;",bh=" in method ",bg='qx.core.Assert.assertInstance(value, Error, msg) || true',bf='Undefined value is not allowed!',be="inherit",bd='Is invalid!',bc="MSIE 6.0",bb="': ",ba=" of class ",Y='value !== null && value.nodeType !== undefined',bJ='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',bK="module.events",bH='qx.core.Assert.assertPositiveInteger(value, msg) || true',bI='if(init==qx.core.Property.$$inherit)init=null;',bF='value !== null && value.$$type === "Interface"',bG='var inherit=prop.$$inherit;',bD="var value = parent.",bE="$$useinit_",bL="(value);",bM="$$runtime_",bm='Requires exactly one argument!',bl="$$user_",bo='qx.core.Assert.assertArray(value, msg) || true',bn='qx.core.Assert.assertPositiveNumber(value, msg) || true',bq="Boolean",bp='return value;',bs='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',br='Does not allow any arguments!',bk="()",bj="var a=arguments[0] instanceof Array?arguments[0]:arguments;",b='value !== null && value.$$type === "Theme"',c="())",d='return null;',e='qx.core.Assert.assertObject(value, msg) || true',f='qx.core.Assert.assertString(value, msg) || true',g="if (value===undefined) value = parent.",h='value !== null && value.$$type === "Class"',j='qx.core.Assert.assertFunction(value, msg) || true',k="object",m="$$init_",bQ="$$theme_",bP="Unknown reason: ",bO='qx.core.Assert.assertMap(value, msg) || true',bN='qx.core.Assert.assertNumber(value, msg) || true',bU='Null value is not allowed!',bT='qx.core.Assert.assertInteger(value, msg) || true',bS="rv:1.8.1",bR="shorthand",bW='qx.core.Assert.assertInstance(value, RegExp, msg) || true',bV='value !== null && value.type !== undefined',I='value !== null && value.document',J='throw new Error("Property ',G="(!this.",H='qx.core.Assert.assertBoolean(value, msg) || true',M="toggle",N="$$inherit_",K=" with incoming value '",L="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",E="qx.core.Property",F="is",u='Could not change or apply init value after constructing phase!',t="();",w='else ',v='if(this.',q="resetRuntime",p="return this.",s="get",r=";",o="(a[",n=' of an instance of ',S="refresh",T=' is not (yet) ready!");',U="]);",V="resetThemed",O='else if(this.',P="reset",Q="setRuntime",R="init",W="set",X="setThemed",D='!==undefined)',C="this.",B="",A='return this.',z="string",y="boolean",x=';';qx.Bootstrap.define(E,{statics:{__p:function(){if(qx.core.Environment.get(bK)){qx.event.type.Data;qx.event.dispatch.Direct;}
;}
,__q:{"Boolean":H,"String":f,"Number":bN,"Integer":bT,"PositiveNumber":bn,"PositiveInteger":bH,"Error":bg,"RegExp":bW,"Object":e,"Array":bo,"Map":bO,"Function":j,"Date":bt,"Node":Y,"Element":bw,"Document":bA,"Window":I,"Event":bV,"Class":h,"Mixin":bz,"Interface":bF,"Theme":b,"Color":bC,"Decorator":bJ,"Font":bB},__r:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:be,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:z,dereference:y,inheritable:y,nullable:y,themeable:y,refine:y,init:null,apply:z,event:z,check:null,transform:z,deferredInit:y,validate:null},$$allowedGroupKeys:{name:z,group:k,mode:z,themeable:y},$$inheritable:{},__s:function(bX){var bY=this.__t(bX);if(!bY.length){var ca=function(){}
;}
else {ca=this.__u(bY);}
;bX.prototype.$$refreshInheritables=ca;}
,__t:function(cb){var cd=[];while(cb){var cc=cb.$$properties;if(cc){for(var name in this.$$inheritable){if(cc[name]&&cc[name].inheritable){cd.push(name);}
;}
;}
;cb=cb.superclass;}
;return cd;}
,__u:function(ce){var ci=this.$$store.inherit;var ch=this.$$store.init;var cg=this.$$method.refresh;var cf=[bv,bi];for(var i=0,l=ce.length;i<l;i++){var name=ce[i];cf.push(bD,ci[name],r,g,ch[name],r,C,cg[name],bL);}
;return new Function(cf.join(B));}
,attachRefreshInheritables:function(cj){cj.prototype.$$refreshInheritables=function(){qx.core.Property.__s(cj);return this.$$refreshInheritables();}
;}
,attachMethods:function(ck,name,cl){cl.group?this.__v(ck,cl,name):this.__w(ck,cl,name);}
,__v:function(cm,cn,name){var cu=qx.Bootstrap.firstUp(name);var ct=cm.prototype;var cv=cn.themeable===true;{}
;var cw=[];var cq=[];if(cv){var co=[];var cs=[];}
;var cr=bj;cw.push(cr);if(cv){co.push(cr);}
;if(cn.mode==bR){var cp=L;cw.push(cp);if(cv){co.push(cp);}
;}
;for(var i=0,a=cn.group,l=a.length;i<l;i++){{}
;cw.push(C,this.$$method.set[a[i]],o,i,U);cq.push(C,this.$$method.reset[a[i]],t);if(cv){{}
;co.push(C,this.$$method.setThemed[a[i]],o,i,U);cs.push(C,this.$$method.resetThemed[a[i]],t);}
;}
;this.$$method.set[name]=W+cu;ct[this.$$method.set[name]]=new Function(cw.join(B));this.$$method.reset[name]=P+cu;ct[this.$$method.reset[name]]=new Function(cq.join(B));if(cv){this.$$method.setThemed[name]=X+cu;ct[this.$$method.setThemed[name]]=new Function(co.join(B));this.$$method.resetThemed[name]=V+cu;ct[this.$$method.resetThemed[name]]=new Function(cs.join(B));}
;}
,__w:function(cx,cy,name){var cA=qx.Bootstrap.firstUp(name);var cC=cx.prototype;{}
;if(cy.dereference===undefined&&typeof cy.check===z){cy.dereference=this.__x(cy.check);}
;var cB=this.$$method;var cz=this.$$store;cz.runtime[name]=bM+name;cz.user[name]=bl+name;cz.theme[name]=bQ+name;cz.init[name]=m+name;cz.inherit[name]=N+name;cz.useinit[name]=bE+name;cB.get[name]=s+cA;cC[cB.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,cx,name,s);}
;cB.set[name]=W+cA;cC[cB.set[name]]=function(cD){return qx.core.Property.executeOptimizedSetter(this,cx,name,W,arguments);}
;cB.reset[name]=P+cA;cC[cB.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cx,name,P);}
;if(cy.inheritable||cy.apply||cy.event||cy.deferredInit){cB.init[name]=R+cA;cC[cB.init[name]]=function(cE){return qx.core.Property.executeOptimizedSetter(this,cx,name,R,arguments);}
;}
;if(cy.inheritable){cB.refresh[name]=S+cA;cC[cB.refresh[name]]=function(cF){return qx.core.Property.executeOptimizedSetter(this,cx,name,S,arguments);}
;}
;cB.setRuntime[name]=Q+cA;cC[cB.setRuntime[name]]=function(cG){return qx.core.Property.executeOptimizedSetter(this,cx,name,Q,arguments);}
;cB.resetRuntime[name]=q+cA;cC[cB.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cx,name,q);}
;if(cy.themeable){cB.setThemed[name]=X+cA;cC[cB.setThemed[name]]=function(cH){return qx.core.Property.executeOptimizedSetter(this,cx,name,X,arguments);}
;cB.resetThemed[name]=V+cA;cC[cB.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cx,name,V);}
;}
;if(cy.check===bq){cC[M+cA]=new Function(p+cB.set[name]+G+cB.get[name]+c);cC[F+cA]=new Function(p+cB.get[name]+bk);}
;}
,__x:function(cI){return !!this.__r[cI];}
,__y:function(cJ){return this.__r[cJ]||qx.util.OOUtil.classIsDefined(cJ)||(qx.Interface&&qx.Interface.isDefined(cJ));}
,__z:{'0':u,'1':bm,'2':bf,'3':br,'4':bU,'5':bd},error:function(cK,cL,cM,cN,cO){var cP=cK.constructor.classname;var cQ=bu+cM+ba+cP+bh+this.$$method[cN][cM]+K+cO+bb;throw new Error(cQ+(this.__z[cL]||bP+cL));}
,__A:function(cR,cS,name,cT,cU,cV){var cW=this.$$method[cT][name];cS[cW]=new Function("value",cU.join(""));if(qx.core.Environment.get("qx.aspects")){cS[cW]=qx.core.Aspect.wrap(cR.classname+"."+cW,cS[cW],"property");}
;qx.Bootstrap.setDisplayName(cS[cW],cR.classname+".prototype",cW);if(cV===undefined){return cR[cW]();}
else return cR[cW](cV[0]);;}
,executeOptimizedGetter:function(cX,cY,name,da){var dc=cY.$$properties[name];var de=cY.prototype;var db=[];var dd=this.$$store;db.push(v,dd.runtime[name],D);db.push(A,dd.runtime[name],x);if(dc.inheritable){db.push(O,dd.inherit[name],D);db.push(A,dd.inherit[name],x);db.push(w);}
;db.push(v,dd.user[name],D);db.push(A,dd.user[name],x);if(dc.themeable){db.push(O,dd.theme[name],D);db.push(A,dd.theme[name],x);}
;if(dc.deferredInit&&dc.init===undefined){db.push(O,dd.init[name],D);db.push(A,dd.init[name],x);}
;db.push(w);if(dc.init!==undefined){if(dc.inheritable){db.push(bx,dd.init[name],x);if(dc.nullable){db.push(bI);}
else if(dc.init!==undefined){db.push(A,dd.init[name],x);}
else {db.push(bs,name,n,cY.classname,T);}
;db.push(by);}
else {db.push(A,dd.init[name],x);}
;}
else if(dc.inheritable||dc.nullable){db.push(d);}
else {db.push(J,name,n,cY.classname,T);}
;return this.__A(cX,de,name,da,db);}
,executeOptimizedSetter:function(df,dg,name,dh,di){var dn=dg.$$properties[name];var dm=dg.prototype;var dk=[];var dj=dh===W||dh===X||dh===Q||(dh===R&&dn.init===undefined);var dl=dn.apply||dn.event||dn.inheritable;var dp=this.__B(dh,name);this.__C(dk,dn,name,dh,dj);if(dj){this.__D(dk,dg,dn,name);}
;if(dl){this.__E(dk,dj,dp,dh);}
;if(dn.inheritable){dk.push(bG);}
;{}
;if(!dl){this.__G(dk,name,dh,dj);}
else {this.__H(dk,dn,name,dh,dj);}
;if(dn.inheritable){this.__I(dk,dn,name,dh);}
else if(dl){this.__J(dk,dn,name,dh);}
;if(dl){this.__K(dk,dn,name);if(dn.inheritable&&dm._getChildren){this.__L(dk,name);}
;}
;if(dj){dk.push(bp);}
;return this.__A(df,dm,name,dh,dk,di);}
,__B:function(dq,name){if(dq==="setRuntime"||dq==="resetRuntime"){var dr=this.$$store.runtime[name];}
else if(dq==="setThemed"||dq==="resetThemed"){dr=this.$$store.theme[name];}
else if(dq==="init"){dr=this.$$store.init[name];}
else {dr=this.$$store.user[name];}
;;return dr;}
,__C:function(ds,dt,name,du,dv){if(!dt.nullable||dt.check||dt.inheritable){ds.push('var prop=qx.core.Property;');}
;if(du==="set"){ds.push('if(value===undefined)prop.error(this,2,"',name,'","',du,'",value);');}
;}
,__D:function(dw,dx,dy,name){if(dy.transform){dw.push('value=this.',dy.transform,'(value);');}
;if(dy.validate){if(typeof dy.validate==="string"){dw.push('this.',dy.validate,'(value);');}
else if(dy.validate instanceof Function){dw.push(dx.classname,'.$$properties.',name);dw.push('.validate.call(this, value);');}
;}
;}
,__E:function(dz,dA,dB,dC){var dD=(dC==="reset"||dC==="resetThemed"||dC==="resetRuntime");if(dA){dz.push('if(this.',dB,'===value)return value;');}
else if(dD){dz.push('if(this.',dB,'===undefined)return;');}
;}
,__F:undefined,__G:function(dE,name,dF,dG){if(dF==="setRuntime"){dE.push('this.',this.$$store.runtime[name],'=value;');}
else if(dF==="resetRuntime"){dE.push('if(this.',this.$$store.runtime[name],'!==undefined)');dE.push('delete this.',this.$$store.runtime[name],';');}
else if(dF==="set"){dE.push('this.',this.$$store.user[name],'=value;');}
else if(dF==="reset"){dE.push('if(this.',this.$$store.user[name],'!==undefined)');dE.push('delete this.',this.$$store.user[name],';');}
else if(dF==="setThemed"){dE.push('this.',this.$$store.theme[name],'=value;');}
else if(dF==="resetThemed"){dE.push('if(this.',this.$$store.theme[name],'!==undefined)');dE.push('delete this.',this.$$store.theme[name],';');}
else if(dF==="init"&&dG){dE.push('this.',this.$$store.init[name],'=value;');}
;;;;;;}
,__H:function(dH,dI,name,dJ,dK){if(dI.inheritable){dH.push('var computed, old=this.',this.$$store.inherit[name],';');}
else {dH.push('var computed, old;');}
;dH.push('if(this.',this.$$store.runtime[name],'!==undefined){');if(dJ==="setRuntime"){dH.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dJ==="resetRuntime"){dH.push('delete this.',this.$$store.runtime[name],';');dH.push('if(this.',this.$$store.user[name],'!==undefined)');dH.push('computed=this.',this.$$store.user[name],';');dH.push('else if(this.',this.$$store.theme[name],'!==undefined)');dH.push('computed=this.',this.$$store.theme[name],';');dH.push('else if(this.',this.$$store.init[name],'!==undefined){');dH.push('computed=this.',this.$$store.init[name],';');dH.push('this.',this.$$store.useinit[name],'=true;');dH.push('}');}
else {dH.push('old=computed=this.',this.$$store.runtime[name],';');if(dJ==="set"){dH.push('this.',this.$$store.user[name],'=value;');}
else if(dJ==="reset"){dH.push('delete this.',this.$$store.user[name],';');}
else if(dJ==="setThemed"){dH.push('this.',this.$$store.theme[name],'=value;');}
else if(dJ==="resetThemed"){dH.push('delete this.',this.$$store.theme[name],';');}
else if(dJ==="init"&&dK){dH.push('this.',this.$$store.init[name],'=value;');}
;;;;}
;dH.push('}');dH.push('else if(this.',this.$$store.user[name],'!==undefined){');if(dJ==="set"){if(!dI.inheritable){dH.push('old=this.',this.$$store.user[name],';');}
;dH.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dJ==="reset"){if(!dI.inheritable){dH.push('old=this.',this.$$store.user[name],';');}
;dH.push('delete this.',this.$$store.user[name],';');dH.push('if(this.',this.$$store.runtime[name],'!==undefined)');dH.push('computed=this.',this.$$store.runtime[name],';');dH.push('if(this.',this.$$store.theme[name],'!==undefined)');dH.push('computed=this.',this.$$store.theme[name],';');dH.push('else if(this.',this.$$store.init[name],'!==undefined){');dH.push('computed=this.',this.$$store.init[name],';');dH.push('this.',this.$$store.useinit[name],'=true;');dH.push('}');}
else {if(dJ==="setRuntime"){dH.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dI.inheritable){dH.push('computed=this.',this.$$store.user[name],';');}
else {dH.push('old=computed=this.',this.$$store.user[name],';');}
;if(dJ==="setThemed"){dH.push('this.',this.$$store.theme[name],'=value;');}
else if(dJ==="resetThemed"){dH.push('delete this.',this.$$store.theme[name],';');}
else if(dJ==="init"&&dK){dH.push('this.',this.$$store.init[name],'=value;');}
;;}
;dH.push('}');if(dI.themeable){dH.push('else if(this.',this.$$store.theme[name],'!==undefined){');if(!dI.inheritable){dH.push('old=this.',this.$$store.theme[name],';');}
;if(dJ==="setRuntime"){dH.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dJ==="set"){dH.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dJ==="setThemed"){dH.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(dJ==="resetThemed"){dH.push('delete this.',this.$$store.theme[name],';');dH.push('if(this.',this.$$store.init[name],'!==undefined){');dH.push('computed=this.',this.$$store.init[name],';');dH.push('this.',this.$$store.useinit[name],'=true;');dH.push('}');}
else if(dJ==="init"){if(dK){dH.push('this.',this.$$store.init[name],'=value;');}
;dH.push('computed=this.',this.$$store.theme[name],';');}
else if(dJ==="refresh"){dH.push('computed=this.',this.$$store.theme[name],';');}
;;;;;dH.push('}');}
;dH.push('else if(this.',this.$$store.useinit[name],'){');if(!dI.inheritable){dH.push('old=this.',this.$$store.init[name],';');}
;if(dJ==="init"){if(dK){dH.push('computed=this.',this.$$store.init[name],'=value;');}
else {dH.push('computed=this.',this.$$store.init[name],';');}
;}
else if(dJ==="set"||dJ==="setRuntime"||dJ==="setThemed"||dJ==="refresh"){dH.push('delete this.',this.$$store.useinit[name],';');if(dJ==="setRuntime"){dH.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dJ==="set"){dH.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dJ==="setThemed"){dH.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(dJ==="refresh"){dH.push('computed=this.',this.$$store.init[name],';');}
;;;}
;dH.push('}');if(dJ==="set"||dJ==="setRuntime"||dJ==="setThemed"||dJ==="init"){dH.push('else{');if(dJ==="setRuntime"){dH.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dJ==="set"){dH.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dJ==="setThemed"){dH.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(dJ==="init"){if(dK){dH.push('computed=this.',this.$$store.init[name],'=value;');}
else {dH.push('computed=this.',this.$$store.init[name],';');}
;dH.push('this.',this.$$store.useinit[name],'=true;');}
;;;dH.push('}');}
;}
,__I:function(dL,dM,name,dN){dL.push('if(computed===undefined||computed===inherit){');if(dN==="refresh"){dL.push('computed=value;');}
else {dL.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');}
;dL.push('if((computed===undefined||computed===inherit)&&');dL.push('this.',this.$$store.init[name],'!==undefined&&');dL.push('this.',this.$$store.init[name],'!==inherit){');dL.push('computed=this.',this.$$store.init[name],';');dL.push('this.',this.$$store.useinit[name],'=true;');dL.push('}else{');dL.push('delete this.',this.$$store.useinit[name],';}');dL.push('}');dL.push('if(old===computed)return value;');dL.push('if(computed===inherit){');dL.push('computed=undefined;delete this.',this.$$store.inherit[name],';');dL.push('}');dL.push('else if(computed===undefined)');dL.push('delete this.',this.$$store.inherit[name],';');dL.push('else this.',this.$$store.inherit[name],'=computed;');dL.push('var backup=computed;');if(dM.init!==undefined&&dN!=="init"){dL.push('if(old===undefined)old=this.',this.$$store.init[name],";");}
else {dL.push('if(old===undefined)old=null;');}
;dL.push('if(computed===undefined||computed==inherit)computed=null;');}
,__J:function(dO,dP,name,dQ){if(dQ!=="set"&&dQ!=="setRuntime"&&dQ!=="setThemed"){dO.push('if(computed===undefined)computed=null;');}
;dO.push('if(old===computed)return value;');if(dP.init!==undefined&&dQ!=="init"){dO.push('if(old===undefined)old=this.',this.$$store.init[name],";");}
else {dO.push('if(old===undefined)old=null;');}
;}
,__K:function(dR,dS,name){if(dS.apply){dR.push('this.',dS.apply,'(computed, old, "',name,'");');}
;if(dS.event){dR.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",dS.event,"')){","reg.fireEvent(this, '",dS.event,"', qx.event.type.Data, [computed, old]",")}");}
;}
,__L:function(dT,name){dT.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');dT.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');dT.push('}');}
},defer:function(dU){var dW=navigator.userAgent.indexOf(bc)!=-1;var dV=navigator.userAgent.indexOf(bS)!=-1;if(dW||dV){dU.__x=dU.__y;}
;}
});}
)();
(function(){var k="[Class ",j="]",h="constructor",g="extend",f="qx.Class",e="qx.aspects",d="Array",c=".",b="static";qx.Bootstrap.define(f,{statics:{__M:qx.core.Environment.get("module.property")?qx.core.Property:null,define:function(name,m){if(!m){var m={};}
;if(m.include&&!(qx.Bootstrap.getClass(m.include)===d)){m.include=[m.include];}
;if(m.implement&&!(qx.Bootstrap.getClass(m.implement)===d)){m.implement=[m.implement];}
;var n=false;if(!m.hasOwnProperty(g)&&!m.type){m.type=b;n=true;}
;{}
;var o=this.__P(name,m.type,m.extend,m.statics,m.construct,m.destruct,m.include);if(m.extend){if(m.properties){this.__R(o,m.properties,true);}
;if(m.members){this.__T(o,m.members,true,true,false);}
;if(m.events){this.__Q(o,m.events,true);}
;if(m.include){for(var i=0,l=m.include.length;i<l;i++){this.__X(o,m.include[i],false);}
;}
;}
;if(m.environment){for(var p in m.environment){qx.core.Environment.add(p,m.environment[p]);}
;}
;if(m.implement){for(var i=0,l=m.implement.length;i<l;i++){this.__V(o,m.implement[i]);}
;}
;{}
;if(m.defer){m.defer.self=o;m.defer(o,o.prototype,{add:function(name,q){var r={};r[name]=q;qx.Class.__R(o,r,true);}
});}
;return o;}
,undefine:function(name){delete this.$$registry[name];var s=name.split(c);var u=[window];for(var i=0;i<s.length;i++){u.push(u[i][s[i]]);}
;for(var i=u.length-1;i>=1;i--){var t=u[i];var parent=u[i-1];if(qx.Bootstrap.isFunction(t)||qx.Bootstrap.objectGetLength(t)===0){delete parent[s[i-1]];}
else {break;}
;}
;}
,isDefined:qx.util.OOUtil.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,getByName:qx.Bootstrap.getByName,include:function(v,w){{}
;qx.Class.__X(v,w,false);}
,patch:function(x,y){{}
;qx.Class.__X(x,y,true);}
,isSubClassOf:function(z,A){if(!z){return false;}
;if(z==A){return true;}
;if(z.prototype instanceof A){return true;}
;return false;}
,getPropertyDefinition:qx.util.OOUtil.getPropertyDefinition,getProperties:function(B){var C=[];while(B){if(B.$$properties){C.push.apply(C,qx.Bootstrap.getKeys(B.$$properties));}
;B=B.superclass;}
;return C;}
,getByProperty:function(D,name){while(D){if(D.$$properties&&D.$$properties[name]){return D;}
;D=D.superclass;}
;return null;}
,hasProperty:qx.util.OOUtil.hasProperty,getEventType:qx.util.OOUtil.getEventType,supportsEvent:qx.util.OOUtil.supportsEvent,hasOwnMixin:function(E,F){return E.$$includes&&E.$$includes.indexOf(F)!==-1;}
,getByMixin:function(G,H){var I,i,l;while(G){if(G.$$includes){I=G.$$flatIncludes;for(i=0,l=I.length;i<l;i++){if(I[i]===H){return G;}
;}
;}
;G=G.superclass;}
;return null;}
,getMixins:qx.util.OOUtil.getMixins,hasMixin:function(J,K){return !!this.getByMixin(J,K);}
,hasOwnInterface:function(L,M){return L.$$implements&&L.$$implements.indexOf(M)!==-1;}
,getByInterface:qx.util.OOUtil.getByInterface,getInterfaces:function(N){var O=[];while(N){if(N.$$implements){O.push.apply(O,N.$$flatImplements);}
;N=N.superclass;}
;return O;}
,hasInterface:qx.util.OOUtil.hasInterface,implementsInterface:function(P,Q){var R=P.constructor;if(this.hasInterface(R,Q)){return true;}
;try{qx.Interface.assertObject(P,Q);return true;}
catch(S){}
;try{qx.Interface.assert(R,Q,false);return true;}
catch(T){}
;return false;}
,getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;this.$$instance=new this;delete this.$$allowconstruct;}
;return this.$$instance;}
,genericToString:function(){return k+this.classname+j;}
,$$registry:qx.Bootstrap.$$registry,__c:null,__N:null,__d:function(){}
,__O:function(){}
,__P:function(name,U,V,W,X,Y,ba){var bd;if(!V&&qx.core.Environment.get("qx.aspects")==false){bd=W||{};qx.Bootstrap.setDisplayNames(bd,name);}
else {var bd={};if(V){if(!X){X=this.__Y();}
;if(this.__bb(V,ba)){bd=this.__bc(X,name,U);}
else {bd=X;}
;if(U==="singleton"){bd.getInstance=this.getInstance;}
;qx.Bootstrap.setDisplayName(X,name,"constructor");}
;if(W){qx.Bootstrap.setDisplayNames(W,name);var be;for(var i=0,a=qx.Bootstrap.getKeys(W),l=a.length;i<l;i++){be=a[i];var bb=W[be];if(qx.core.Environment.get("qx.aspects")){if(bb instanceof Function){bb=qx.core.Aspect.wrap(name+"."+be,bb,"static");}
;bd[be]=bb;}
else {bd[be]=bb;}
;}
;}
;}
;var bc=name?qx.Bootstrap.createNamespace(name,bd):"";bd.name=bd.classname=name;bd.basename=bc;bd.$$type="Class";if(U){bd.$$classtype=U;}
;if(!bd.hasOwnProperty("toString")){bd.toString=this.genericToString;}
;if(V){qx.Bootstrap.extendClass(bd,X,V,name,bc);if(Y){if(qx.core.Environment.get("qx.aspects")){Y=qx.core.Aspect.wrap(name,Y,"destructor");}
;bd.$$destructor=Y;qx.Bootstrap.setDisplayName(Y,name,"destruct");}
;}
;this.$$registry[name]=bd;return bd;}
,__Q:function(bf,bg,bh){var bi,bi;{}
;if(bf.$$events){for(var bi in bg){bf.$$events[bi]=bg[bi];}
;}
else {bf.$$events=bg;}
;}
,__R:function(bj,bk,bl){if(!qx.core.Environment.get("module.property")){throw new Error("Property module disabled.");}
;var bm;if(bl===undefined){bl=false;}
;var bn=bj.prototype;for(var name in bk){bm=bk[name];{}
;bm.name=name;if(!bm.refine){if(bj.$$properties===undefined){bj.$$properties={};}
;bj.$$properties[name]=bm;}
;if(bm.init!==undefined){bj.prototype["$$init_"+name]=bm.init;}
;if(bm.event!==undefined){if(!qx.core.Environment.get("module.events")){throw new Error("Events module not enabled.");}
;var event={};event[bm.event]="qx.event.type.Data";this.__Q(bj,event,bl);}
;if(bm.inheritable){this.__M.$$inheritable[name]=true;if(!bn.$$refreshInheritables){this.__M.attachRefreshInheritables(bj);}
;}
;if(!bm.refine){this.__M.attachMethods(bj,name,bm);}
;}
;}
,__S:null,__T:function(bo,bp,bq,br,bs){var bt=bo.prototype;var bv,bu;qx.Bootstrap.setDisplayNames(bp,bo.classname+".prototype");for(var i=0,a=qx.Bootstrap.getKeys(bp),l=a.length;i<l;i++){bv=a[i];bu=bp[bv];{}
;if(br!==false&&bu instanceof Function&&bu.$$type==null){if(bs==true){bu=this.__U(bu,bt[bv]);}
else {if(bt[bv]){bu.base=bt[bv];}
;bu.self=bo;}
;if(qx.core.Environment.get("qx.aspects")){bu=qx.core.Aspect.wrap(bo.classname+"."+bv,bu,"member");}
;}
;bt[bv]=bu;}
;}
,__U:function(bw,bx){if(bx){return function(){var bz=bw.base;bw.base=bx;var by=bw.apply(this,arguments);bw.base=bz;return by;}
;}
else {return bw;}
;}
,__V:function(bA,bB){{}
;var bC=qx.Interface.flatten([bB]);if(bA.$$implements){bA.$$implements.push(bB);bA.$$flatImplements.push.apply(bA.$$flatImplements,bC);}
else {bA.$$implements=[bB];bA.$$flatImplements=bC;}
;}
,__W:function(bD){var name=bD.classname;var bE=this.__bc(bD,name,bD.$$classtype);for(var i=0,a=qx.Bootstrap.getKeys(bD),l=a.length;i<l;i++){bF=a[i];bE[bF]=bD[bF];}
;bE.prototype=bD.prototype;var bH=bD.prototype;for(var i=0,a=qx.Bootstrap.getKeys(bH),l=a.length;i<l;i++){bF=a[i];var bI=bH[bF];if(bI&&bI.self==bD){bI.self=bE;}
;}
;for(var bF in this.$$registry){var bG=this.$$registry[bF];if(!bG){continue;}
;if(bG.base==bD){bG.base=bE;}
;if(bG.superclass==bD){bG.superclass=bE;}
;if(bG.$$original){if(bG.$$original.base==bD){bG.$$original.base=bE;}
;if(bG.$$original.superclass==bD){bG.$$original.superclass=bE;}
;}
;}
;qx.Bootstrap.createNamespace(name,bE);this.$$registry[name]=bE;return bE;}
,__X:function(bJ,bK,bL){{}
;if(this.hasMixin(bJ,bK)){return;}
;var bO=bJ.$$original;if(bK.$$constructor&&!bO){bJ=this.__W(bJ);}
;var bN=qx.Mixin.flatten([bK]);var bM;for(var i=0,l=bN.length;i<l;i++){bM=bN[i];if(bM.$$events){this.__Q(bJ,bM.$$events,bL);}
;if(bM.$$properties){this.__R(bJ,bM.$$properties,bL);}
;if(bM.$$members){this.__T(bJ,bM.$$members,bL,bL,bL);}
;}
;if(bJ.$$includes){bJ.$$includes.push(bK);bJ.$$flatIncludes.push.apply(bJ.$$flatIncludes,bN);}
else {bJ.$$includes=[bK];bJ.$$flatIncludes=bN;}
;}
,__Y:function(){function bP(){bP.base.apply(this,arguments);}
;return bP;}
,__ba:function(){return function(){}
;}
,__bb:function(bQ,bR){{}
;if(bQ&&bQ.$$includes){var bS=bQ.$$flatIncludes;for(var i=0,l=bS.length;i<l;i++){if(bS[i].$$constructor){return true;}
;}
;}
;if(bR){var bT=qx.Mixin.flatten(bR);for(var i=0,l=bT.length;i<l;i++){if(bT[i].$$constructor){return true;}
;}
;}
;return false;}
,__bc:function(bU,name,bV){var bX=function(){var cb=bX;{}
;var ca=cb.$$original.apply(this,arguments);if(cb.$$includes){var bY=cb.$$flatIncludes;for(var i=0,l=bY.length;i<l;i++){if(bY[i].$$constructor){bY[i].$$constructor.apply(this,arguments);}
;}
;}
;{}
;return ca;}
;if(qx.core.Environment.get(e)){var bW=qx.core.Aspect.wrap(name,bX,h);bX.$$original=bU;bX.constructor=bW;bX=bW;}
;bX.$$original=bU;bU.wrapper=bX;return bX;}
},defer:function(){if(qx.core.Environment.get(e)){for(var cc in qx.Bootstrap.$$registry){var cd=qx.Bootstrap.$$registry[cc];for(var ce in cd){if(cd[ce] instanceof Function){cd[ce]=qx.core.Aspect.wrap(cc+c+ce,cd[ce],b);}
;}
;}
;}
;}
});}
)();
(function(){var k="join",j="toLocaleUpperCase",h="shift",g="substr",f="filter",e="unshift",d="match",c="quote",b="qx.lang.Generics",a="localeCompare",I="sort",H="some",G="charAt",F="split",E="substring",D="pop",C="toUpperCase",B="replace",A="push",z="charCodeAt",t="every",u="reverse",q="search",r="forEach",o="map",p="toLowerCase",m="splice",n="toLocaleLowerCase",v="indexOf",w="lastIndexOf",y="slice",x="concat";qx.Class.define(b,{statics:{__bd:{"Array":[k,u,I,A,D,h,e,m,x,y,v,w,r,o,f,H,t],"String":[c,E,p,C,G,z,v,w,n,j,a,d,q,B,F,g,x,y]},__be:function(J,K){return function(s){return J.prototype[K].apply(s,Array.prototype.slice.call(arguments,1));}
;}
,__bf:function(){var L=qx.lang.Generics.__bd;for(var P in L){var N=window[P];var M=L[P];for(var i=0,l=M.length;i<l;i++){var O=M[i];if(!N[O]){N[O]=qx.lang.Generics.__be(N,O);}
;}
;}
;}
},defer:function(Q){Q.__bf();}
});}
)();
(function(){var a="qx.data.MBinding";qx.Mixin.define(a,{members:{bind:function(b,c,d,e){return qx.data.SingleValueBinding.bind(this,b,c,d,e);}
,removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);}
,removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);}
,getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);}
}});}
)();
(function(){var m="Boolean",l="Data after conversion: ",k=")",h=") to the object '",g="Please use only one array at a time: ",f="Binding executed from ",d="Integer",c=" of object ",b="qx.data.SingleValueBinding",a="No number or 'last' value hast been given",U="Binding property ",T="Binding could not be found!",S=" to ",R="Binding from '",Q=" (",P="PositiveNumber",O="Data before conversion: ",N="PositiveInteger",M="Binding does not exist!",L=" in an array binding: ",u=").",v=" by ",s="Date",t=" not possible: No event available. ",q="qx.debug.databinding",r=". Error message: ",n="set",p="deepBinding",w="item",x="reset",D="Failed so set value ",C=" does not work.",F="' (",E=" on ",H="String",G="Number",z="change",K="]",J=".",I="last",y="[",A="",B="get";qx.Class.define(b,{statics:{__bg:{},bind:function(V,W,X,Y,ba){var bl=this.__bi(V,W,X,Y,ba);var bg=W.split(J);var bc=this.__bo(bg);var bk=[];var bh=[];var bi=[];var be=[];var bf=V;try{for(var i=0;i<bg.length;i++){if(bc[i]!==A){be.push(z);}
else {be.push(this.__bj(bf,bg[i]));}
;bk[i]=bf;if(i==bg.length-1){if(bc[i]!==A){var bp=bc[i]===I?bf.length-1:bc[i];var bb=bf.getItem(bp);this.__bn(bb,X,Y,ba,V);bi[i]=this.__bp(bf,be[i],X,Y,ba,bc[i]);}
else {if(bg[i]!=null&&bf[B+qx.lang.String.firstUp(bg[i])]!=null){var bb=bf[B+qx.lang.String.firstUp(bg[i])]();this.__bn(bb,X,Y,ba,V);}
;bi[i]=this.__bp(bf,be[i],X,Y,ba);}
;}
else {var bm={index:i,propertyNames:bg,sources:bk,listenerIds:bi,arrayIndexValues:bc,targetObject:X,targetPropertyChain:Y,options:ba,listeners:bh};var bj=qx.lang.Function.bind(this.__bh,this,bm);bh.push(bj);bi[i]=bf.addListener(be[i],bj);}
;if(bf[B+qx.lang.String.firstUp(bg[i])]==null){bf=null;}
else if(bc[i]!==A){bf=bf[B+qx.lang.String.firstUp(bg[i])](bc[i]);}
else {bf=bf[B+qx.lang.String.firstUp(bg[i])]();}
;if(!bf){break;}
;}
;}
catch(bq){for(var i=0;i<bk.length;i++){if(bk[i]&&bi[i]){bk[i].removeListenerById(bi[i]);}
;}
;var bo=bl.targets;var bd=bl.listenerIds[i];for(var i=0;i<bo.length;i++){if(bo[i]&&bd[i]){bo[i].removeListenerById(bd[i]);}
;}
;throw bq;}
;var bn={type:p,listenerIds:bi,sources:bk,targetListenerIds:bl.listenerIds,targets:bl.targets};this.__bq(bn,V,W,X,Y);return bn;}
,__bh:function(br){if(br.options&&br.options.onUpdate){br.options.onUpdate(br.sources[br.index],br.targetObject);}
;for(var j=br.index+1;j<br.propertyNames.length;j++){var bv=br.sources[j];br.sources[j]=null;if(!bv){continue;}
;bv.removeListenerById(br.listenerIds[j]);}
;var bv=br.sources[br.index];for(var j=br.index+1;j<br.propertyNames.length;j++){if(br.arrayIndexValues[j-1]!==A){bv=bv[B+qx.lang.String.firstUp(br.propertyNames[j-1])](br.arrayIndexValues[j-1]);}
else {bv=bv[B+qx.lang.String.firstUp(br.propertyNames[j-1])]();}
;br.sources[j]=bv;if(!bv){this.__bk(br.targetObject,br.targetPropertyChain);break;}
;if(j==br.propertyNames.length-1){if(qx.Class.implementsInterface(bv,qx.data.IListData)){var bw=br.arrayIndexValues[j]===I?bv.length-1:br.arrayIndexValues[j];var bt=bv.getItem(bw);this.__bn(bt,br.targetObject,br.targetPropertyChain,br.options,br.sources[br.index]);br.listenerIds[j]=this.__bp(bv,z,br.targetObject,br.targetPropertyChain,br.options,br.arrayIndexValues[j]);}
else {if(br.propertyNames[j]!=null&&bv[B+qx.lang.String.firstUp(br.propertyNames[j])]!=null){var bt=bv[B+qx.lang.String.firstUp(br.propertyNames[j])]();this.__bn(bt,br.targetObject,br.targetPropertyChain,br.options,br.sources[br.index]);}
;var bu=this.__bj(bv,br.propertyNames[j]);br.listenerIds[j]=this.__bp(bv,bu,br.targetObject,br.targetPropertyChain,br.options);}
;}
else {if(br.listeners[j]==null){var bs=qx.lang.Function.bind(this.__bh,this,br);br.listeners.push(bs);}
;if(qx.Class.implementsInterface(bv,qx.data.IListData)){var bu=z;}
else {var bu=this.__bj(bv,br.propertyNames[j]);}
;br.listenerIds[j]=bv.addListener(bu,br.listeners[j]);}
;}
;}
,__bi:function(bx,by,bz,bA,bB){var bF=bA.split(J);var bD=this.__bo(bF);var bK=[];var bJ=[];var bH=[];var bG=[];var bE=bz;for(var i=0;i<bF.length-1;i++){if(bD[i]!==A){bG.push(z);}
else {try{bG.push(this.__bj(bE,bF[i]));}
catch(e){break;}
;}
;bK[i]=bE;var bI=function(){for(var j=i+1;j<bF.length-1;j++){var bN=bK[j];bK[j]=null;if(!bN){continue;}
;bN.removeListenerById(bH[j]);}
;var bN=bK[i];for(var j=i+1;j<bF.length-1;j++){var bL=qx.lang.String.firstUp(bF[j-1]);if(bD[j-1]!==A){var bO=bD[j-1]===I?bN.getLength()-1:bD[j-1];bN=bN[B+bL](bO);}
else {bN=bN[B+bL]();}
;bK[j]=bN;if(bJ[j]==null){bJ.push(bI);}
;if(qx.Class.implementsInterface(bN,qx.data.IListData)){var bM=z;}
else {try{var bM=qx.data.SingleValueBinding.__bj(bN,bF[j]);}
catch(e){break;}
;}
;bH[j]=bN.addListener(bM,bJ[j]);}
;qx.data.SingleValueBinding.updateTarget(bx,by,bz,bA,bB);}
;bJ.push(bI);bH[i]=bE.addListener(bG[i],bI);var bC=qx.lang.String.firstUp(bF[i]);if(bE[B+bC]==null){bE=null;}
else if(bD[i]!==A){bE=bE[B+bC](bD[i]);}
else {bE=bE[B+bC]();}
;if(!bE){break;}
;}
;return {listenerIds:bH,targets:bK};}
,updateTarget:function(bP,bQ,bR,bS,bT){var bU=this.getValueFromObject(bP,bQ);bU=qx.data.SingleValueBinding.__br(bU,bR,bS,bT,bP);this.__bl(bR,bS,bU);}
,getValueFromObject:function(o,bV){var ca=this.__bm(o,bV);var bX;if(ca!=null){var cc=bV.substring(bV.lastIndexOf(J)+1,bV.length);if(cc.charAt(cc.length-1)==K){var bW=cc.substring(cc.lastIndexOf(y)+1,cc.length-1);var bY=cc.substring(0,cc.lastIndexOf(y));var cb=ca[B+qx.lang.String.firstUp(bY)]();if(bW==I){bW=cb.length-1;}
;if(cb!=null){bX=cb.getItem(bW);}
;}
else {bX=ca[B+qx.lang.String.firstUp(cc)]();}
;}
;return bX;}
,__bj:function(cd,ce){var cf=this.__bs(cd,ce);if(cf==null){if(qx.Class.supportsEvent(cd.constructor,ce)){cf=ce;}
else if(qx.Class.supportsEvent(cd.constructor,z+qx.lang.String.firstUp(ce))){cf=z+qx.lang.String.firstUp(ce);}
else {throw new qx.core.AssertionError(U+ce+c+cd+t);}
;}
;return cf;}
,__bk:function(cg,ch){var ci=this.__bm(cg,ch);if(ci!=null){var cj=ch.substring(ch.lastIndexOf(J)+1,ch.length);if(cj.charAt(cj.length-1)==K){this.__bl(cg,ch,null);return;}
;if(ci[x+qx.lang.String.firstUp(cj)]!=undefined){ci[x+qx.lang.String.firstUp(cj)]();}
else {ci[n+qx.lang.String.firstUp(cj)](null);}
;}
;}
,__bl:function(ck,cl,cm){var cq=this.__bm(ck,cl);if(cq!=null){var cr=cl.substring(cl.lastIndexOf(J)+1,cl.length);if(cr.charAt(cr.length-1)==K){var cn=cr.substring(cr.lastIndexOf(y)+1,cr.length-1);var cp=cr.substring(0,cr.lastIndexOf(y));var co=ck;if(!qx.Class.implementsInterface(co,qx.data.IListData)){co=cq[B+qx.lang.String.firstUp(cp)]();}
;if(cn==I){cn=co.length-1;}
;if(co!=null){co.setItem(cn,cm);}
;}
else {cq[n+qx.lang.String.firstUp(cr)](cm);}
;}
;}
,__bm:function(cs,ct){var cw=ct.split(J);var cx=cs;for(var i=0;i<cw.length-1;i++){try{var cv=cw[i];if(cv.indexOf(K)==cv.length-1){var cu=cv.substring(cv.indexOf(y)+1,cv.length-1);cv=cv.substring(0,cv.indexOf(y));}
;if(cv!=A){cx=cx[B+qx.lang.String.firstUp(cv)]();}
;if(cu!=null){if(cu==I){cu=cx.length-1;}
;cx=cx.getItem(cu);cu=null;}
;}
catch(cy){return null;}
;}
;return cx;}
,__bn:function(cz,cA,cB,cC,cD){cz=this.__br(cz,cA,cB,cC,cD);if(cz===undefined){this.__bk(cA,cB);}
;if(cz!==undefined){try{this.__bl(cA,cB,cz);if(cC&&cC.onUpdate){cC.onUpdate(cD,cA,cz);}
;}
catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;}
;if(cC&&cC.onSetFail){cC.onSetFail(e);}
else {qx.log.Logger.warn(D+cz+E+cA+r+e);}
;}
;}
;}
,__bo:function(cE){var cF=[];for(var i=0;i<cE.length;i++){var name=cE[i];if(qx.lang.String.endsWith(name,K)){var cG=name.substring(name.indexOf(y)+1,name.indexOf(K));if(name.indexOf(K)!=name.length-1){throw new Error(g+name+C);}
;if(cG!==I){if(cG==A||isNaN(parseInt(cG,10))){throw new Error(a+L+name+C);}
;}
;if(name.indexOf(y)!=0){cE[i]=name.substring(0,name.indexOf(y));cF[i]=A;cF[i+1]=cG;cE.splice(i+1,0,w);i++;}
else {cF[i]=cG;cE.splice(i,1,w);}
;}
else {cF[i]=A;}
;}
;return cF;}
,__bp:function(cH,cI,cJ,cK,cL,cM){var cN;{}
;var cP=function(cQ,e){if(cQ!==A){if(cQ===I){cQ=cH.length-1;}
;var cT=cH.getItem(cQ);if(cT===undefined){qx.data.SingleValueBinding.__bk(cJ,cK);}
;var cR=e.getData().start;var cS=e.getData().end;if(cQ<cR||cQ>cS){return;}
;}
else {var cT=e.getData();}
;if(qx.core.Environment.get(q)){qx.log.Logger.debug(f+cH+v+cI+S+cJ+Q+cK+k);qx.log.Logger.debug(O+cT);}
;cT=qx.data.SingleValueBinding.__br(cT,cJ,cK,cL,cH);if(qx.core.Environment.get(q)){qx.log.Logger.debug(l+cT);}
;try{if(cT!==undefined){qx.data.SingleValueBinding.__bl(cJ,cK,cT);}
else {qx.data.SingleValueBinding.__bk(cJ,cK);}
;if(cL&&cL.onUpdate){cL.onUpdate(cH,cJ,cT);}
;}
catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;}
;if(cL&&cL.onSetFail){cL.onSetFail(e);}
else {qx.log.Logger.warn(D+cT+E+cJ+r+e);}
;}
;}
;if(!cM){cM=A;}
;cP=qx.lang.Function.bind(cP,cH,cM);var cO=cH.addListener(cI,cP);return cO;}
,__bq:function(cU,cV,cW,cX,cY){if(this.__bg[cV.toHashCode()]===undefined){this.__bg[cV.toHashCode()]=[];}
;this.__bg[cV.toHashCode()].push([cU,cV,cW,cX,cY]);}
,__br:function(da,db,dc,dd,de){if(dd&&dd.converter){var dg;if(db.getModel){dg=db.getModel();}
;return dd.converter(da,dg,de,db);}
else {var di=this.__bm(db,dc);var dj=dc.substring(dc.lastIndexOf(J)+1,dc.length);if(di==null){return da;}
;var dh=qx.Class.getPropertyDefinition(di.constructor,dj);var df=dh==null?A:dh.check;return this.__bt(da,df);}
;}
,__bs:function(dk,dl){var dm=qx.Class.getPropertyDefinition(dk.constructor,dl);if(dm==null){return null;}
;return dm.event;}
,__bt:function(dn,dp){var dq=qx.lang.Type.getClass(dn);if((dq==G||dq==H)&&(dp==d||dp==N)){dn=parseInt(dn,10);}
;if((dq==m||dq==G||dq==s)&&dp==H){dn=dn+A;}
;if((dq==G||dq==H)&&(dp==G||dp==P)){dn=parseFloat(dn);}
;return dn;}
,removeBindingFromObject:function(dr,ds){if(ds.type==p){for(var i=0;i<ds.sources.length;i++){if(ds.sources[i]){ds.sources[i].removeListenerById(ds.listenerIds[i]);}
;}
;for(var i=0;i<ds.targets.length;i++){if(ds.targets[i]){ds.targets[i].removeListenerById(ds.targetListenerIds[i]);}
;}
;}
else {dr.removeListenerById(ds);}
;var dt=this.__bg[dr.toHashCode()];if(dt!=undefined){for(var i=0;i<dt.length;i++){if(dt[i][0]==ds){qx.lang.Array.remove(dt,dt[i]);return;}
;}
;}
;throw new Error(T);}
,removeAllBindingsForObject:function(du){{}
;var dv=this.__bg[du.toHashCode()];if(dv!=undefined){for(var i=dv.length-1;i>=0;i--){this.removeBindingFromObject(du,dv[i][0]);}
;}
;}
,getAllBindingsForObject:function(dw){if(this.__bg[dw.toHashCode()]===undefined){this.__bg[dw.toHashCode()]=[];}
;return this.__bg[dw.toHashCode()];}
,removeAllBindings:function(){for(var dy in this.__bg){var dx=qx.core.ObjectRegistry.fromHashCode(dy);if(dx==null){delete this.__bg[dy];continue;}
;this.removeAllBindingsForObject(dx);}
;this.__bg={};}
,getAllBindings:function(){return this.__bg;}
,showBindingInLog:function(dz,dA){var dC;for(var i=0;i<this.__bg[dz.toHashCode()].length;i++){if(this.__bg[dz.toHashCode()][i][0]==dA){dC=this.__bg[dz.toHashCode()][i];break;}
;}
;if(dC===undefined){var dB=M;}
else {var dB=R+dC[1]+F+dC[2]+h+dC[3]+F+dC[4]+u;}
;qx.log.Logger.debug(dB);}
,showAllBindingsInLog:function(){for(var dE in this.__bg){var dD=qx.core.ObjectRegistry.fromHashCode(dE);for(var i=0;i<this.__bg[dE].length;i++){this.showBindingInLog(dD,this.__bg[dE][i][0]);}
;}
;}
}});}
)();
(function(){var p="]",o='\\u',n="undefined",m='\\$1',l="0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",k='-',j="qx.lang.String",h="(^|[^",g="0",f="%",c=' ',e='\n',d="])[",b="g",a="";qx.Bootstrap.define(j,{statics:{__bu:l,__bv:null,__bw:{},camelCase:function(q){var r=this.__bw[q];if(!r){r=q.replace(/\-([a-z])/g,function(s,t){return t.toUpperCase();}
);this.__bw[q]=r;}
;return r;}
,hyphenate:function(u){var v=this.__bw[u];if(!v){v=u.replace(/[A-Z]/g,function(w){return (k+w.charAt(0).toLowerCase());}
);this.__bw[u]=v;}
;return v;}
,capitalize:function(x){if(this.__bv===null){var y=o;this.__bv=new RegExp(h+this.__bu.replace(/[0-9A-F]{4}/g,function(z){return y+z;}
)+d+this.__bu.replace(/[0-9A-F]{4}/g,function(A){return y+A;}
)+p,b);}
;return x.replace(this.__bv,function(B){return B.toUpperCase();}
);}
,clean:function(C){return this.trim(C.replace(/\s+/g,c));}
,trimLeft:function(D){return D.replace(/^\s+/,a);}
,trimRight:function(E){return E.replace(/\s+$/,a);}
,trim:function(F){return F.replace(/^\s+|\s+$/g,a);}
,startsWith:function(G,H){return G.indexOf(H)===0;}
,endsWith:function(I,J){return I.substring(I.length-J.length,I.length)===J;}
,repeat:function(K,L){return K.length>0?new Array(L+1).join(K):a;}
,pad:function(M,length,N){var O=length-M.length;if(O>0){if(typeof N===n){N=g;}
;return this.repeat(N,O)+M;}
else {return M;}
;}
,firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(P,Q){return P.indexOf(Q)!=-1;}
,format:function(R,S){var T=R;var i=S.length;while(i--){T=T.replace(new RegExp(f+(i+1),b),S[i]+a);}
;return T;}
,escapeRegexpChars:function(U){return U.replace(/([.*+?^${}()|[\]\/\\])/g,m);}
,toArray:function(V){return V.split(/\B|\b/g);}
,stripTags:function(W){return W.replace(/<\/?[^>]+>/gi,a);}
,stripScripts:function(X,Y){var bb=a;var ba=X.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){bb+=arguments[1]+e;return a;}
);if(Y===true){qx.lang.Function.globalEval(bb);}
;return ba;}
}});}
)();
(function(){var k="[object Array]",j="qx.lang.Array",h="Cannot clean-up map entry doneObjects[",g="]",f="qx",e="number",d="][",c="string",b="mshtml",a="engine.name";qx.Bootstrap.define(j,{statics:{toArray:function(m,n){return this.cast(m,Array,n);}
,cast:function(o,p,q){if(o.constructor===p){return o;}
;if(qx.data&&qx.data.IListData){if(qx.Class&&qx.Class.hasInterface(o,qx.data.IListData)){var o=o.toArray();}
;}
;var r=new p;if((qx.core.Environment.get(a)==b)){if(o.item){for(var i=q||0,l=o.length;i<l;i++){r.push(o[i]);}
;return r;}
;}
;if(Object.prototype.toString.call(o)===k&&q==null){r.push.apply(r,o);}
else {r.push.apply(r,Array.prototype.slice.call(o,q||0));}
;return r;}
,fromArguments:function(s,t){return Array.prototype.slice.call(s,t||0);}
,fromCollection:function(u){if((qx.core.Environment.get(a)==b)){if(u.item){var v=[];for(var i=0,l=u.length;i<l;i++){v[i]=u[i];}
;return v;}
;}
;return Array.prototype.slice.call(u,0);}
,fromShortHand:function(w){var y=w.length;var x=qx.lang.Array.clone(w);switch(y){case 1:x[1]=x[2]=x[3]=x[0];break;case 2:x[2]=x[0];case 3:x[3]=x[1];};return x;}
,clone:function(z){return z.concat();}
,insertAt:function(A,B,i){A.splice(i,0,B);return A;}
,insertBefore:function(C,D,E){var i=C.indexOf(E);if(i==-1){C.push(D);}
else {C.splice(i,0,D);}
;return C;}
,insertAfter:function(F,G,H){var i=F.indexOf(H);if(i==-1||i==(F.length-1)){F.push(G);}
else {F.splice(i+1,0,G);}
;return F;}
,removeAt:function(I,i){return I.splice(i,1)[0];}
,removeAll:function(J){J.length=0;return this;}
,append:function(K,L){{}
;Array.prototype.push.apply(K,L);return K;}
,exclude:function(M,N){{}
;for(var i=0,P=N.length,O;i<P;i++){O=M.indexOf(N[i]);if(O!=-1){M.splice(O,1);}
;}
;return M;}
,remove:function(Q,R){var i=Q.indexOf(R);if(i!=-1){Q.splice(i,1);return R;}
;}
,contains:function(S,T){return S.indexOf(T)!==-1;}
,equals:function(U,V){var length=U.length;if(length!==V.length){return false;}
;for(var i=0;i<length;i++){if(U[i]!==V[i]){return false;}
;}
;return true;}
,sum:function(W){var X=0;for(var i=0,l=W.length;i<l;i++){X+=W[i];}
;return X;}
,max:function(Y){{}
;var i,bb=Y.length,ba=Y[0];for(i=1;i<bb;i++){if(Y[i]>ba){ba=Y[i];}
;}
;return ba===undefined?null:ba;}
,min:function(bc){{}
;var i,be=bc.length,bd=bc[0];for(i=1;i<be;i++){if(bc[i]<bd){bd=bc[i];}
;}
;return bd===undefined?null:bd;}
,unique:function(bf){var bp=[],bh={},bk={},bm={};var bl,bg=0;var bq=f+qx.lang.Date.now();var bi=false,bo=false,br=false;for(var i=0,bn=bf.length;i<bn;i++){bl=bf[i];if(bl===null){if(!bi){bi=true;bp.push(bl);}
;}
else if(bl===undefined){}
else if(bl===false){if(!bo){bo=true;bp.push(bl);}
;}
else if(bl===true){if(!br){br=true;bp.push(bl);}
;}
else if(typeof bl===c){if(!bh[bl]){bh[bl]=1;bp.push(bl);}
;}
else if(typeof bl===e){if(!bk[bl]){bk[bl]=1;bp.push(bl);}
;}
else {var bj=bl[bq];if(bj==null){bj=bl[bq]=bg++;}
;if(!bm[bj]){bm[bj]=bl;bp.push(bl);}
;}
;;;;;}
;for(var bj in bm){try{delete bm[bj][bq];}
catch(bs){try{bm[bj][bq]=null;}
catch(bt){throw new Error(h+bj+d+bq+g);}
;}
;}
;return bp;}
}});}
)();
(function(){var j="[object Opera]",i="[^\\.0-9]",h="4.0",g="1.9.0.0",f="Version/",e="9.0",d="8.0",c="Gecko",b="AppleWebKit/",a="opera",w="engine.version",v="mshtml",u="engine.name",t="webkit",s="5.0",r="qx.bom.client.Engine",q="function",p="gecko",o="Maple",n="Unsupported client: ",l="",m="! Assumed gecko version 1.9.0.0 (Firefox 3.0).",k=".";qx.Bootstrap.define(r,{statics:{getVersion:function(){var A=window.navigator.userAgent;var y=l;if(qx.bom.client.Engine.__bx()){if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(A)){if(A.indexOf(f)!=-1){var z=A.match(/Version\/(\d+)\.(\d+)/);y=z[1]+k+z[2].charAt(0)+k+z[2].substring(1,z[2].length);}
else {y=RegExp.$1+k+RegExp.$2;if(RegExp.$3!=l){y+=k+RegExp.$3;}
;}
;}
;}
else if(qx.bom.client.Engine.__by()){if(/AppleWebKit\/([^ ]+)/.test(A)){y=RegExp.$1;var B=RegExp(i).exec(y);if(B){y=y.slice(0,B.index);}
;}
;}
else if(qx.bom.client.Engine.__bA()||qx.bom.client.Engine.__bz()){if(/rv\:([^\);]+)(\)|;)/.test(A)){y=RegExp.$1;}
;}
else if(qx.bom.client.Engine.__bB()){if(/MSIE\s+([^\);]+)(\)|;)/.test(A)){y=RegExp.$1;if(y<8&&/Trident\/([^\);]+)(\)|;)/.test(A)){if(RegExp.$1==h){y=d;}
else if(RegExp.$1==s){y=e;}
;}
;}
;}
else {var x=window.qxFail;if(x&&typeof x===q){y=x().FULLVERSION;}
else {y=g;qx.Bootstrap.warn(n+A+m);}
;}
;;;return y;}
,getName:function(){var name;if(qx.bom.client.Engine.__bx()){name=a;}
else if(qx.bom.client.Engine.__by()){name=t;}
else if(qx.bom.client.Engine.__bA()||qx.bom.client.Engine.__bz()){name=p;}
else if(qx.bom.client.Engine.__bB()){name=v;}
else {var C=window.qxFail;if(C&&typeof C===q){name=C().NAME;}
else {name=p;qx.Bootstrap.warn(n+window.navigator.userAgent+m);}
;}
;;;return name;}
,__bx:function(){return window.opera&&Object.prototype.toString.call(window.opera)==j;}
,__by:function(){return window.navigator.userAgent.indexOf(b)!=-1;}
,__bz:function(){return window.navigator.userAgent.indexOf(o)!=-1;}
,__bA:function(){return window.controllers&&window.navigator.product===c&&window.navigator.userAgent.indexOf(o)==-1;}
,__bB:function(){return window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent);}
},defer:function(D){qx.core.Environment.add(w,D.getVersion);qx.core.Environment.add(u,D.getName);}
});}
)();
(function(){var a="qx.lang.Date";qx.Bootstrap.define(a,{statics:{now:function(){return +new Date;}
}});}
)();
(function(){var f='anonymous()',e="qx.lang.Function",d=".constructor()",c=".",b=".prototype.",a="()";qx.Bootstrap.define(e,{statics:{getCaller:function(g){return g.caller?g.caller.callee:g.callee.caller;}
,getName:function(h){if(h.displayName){return h.displayName;}
;if(h.$$original||h.wrapper||h.classname){return h.classname+d;}
;if(h.$$mixin){for(var j in h.$$mixin.$$members){if(h.$$mixin.$$members[j]==h){return h.$$mixin.name+b+j+a;}
;}
;for(var j in h.$$mixin){if(h.$$mixin[j]==h){return h.$$mixin.name+c+j+a;}
;}
;}
;if(h.self){var k=h.self.constructor;if(k){for(var j in k.prototype){if(k.prototype[j]==h){return k.classname+b+j+a;}
;}
;for(var j in k){if(k[j]==h){return k.classname+c+j+a;}
;}
;}
;}
;var i=h.toString().match(/function\s*(\w*)\s*\(.*/);if(i&&i.length>=1&&i[1]){return i[1]+a;}
;return f;}
,globalEval:function(l){if(window.execScript){return window.execScript(l);}
else {return eval.call(window,l);}
;}
,empty:function(){}
,returnTrue:function(){return true;}
,returnFalse:function(){return false;}
,returnNull:function(){return null;}
,returnThis:function(){return this;}
,returnZero:function(){return 0;}
,create:function(m,n){{}
;if(!n){return m;}
;if(!(n.self||n.args||n.delay!=null||n.periodical!=null||n.attempt)){return m;}
;return function(event){{}
;var p=qx.lang.Array.fromArguments(arguments);if(n.args){p=n.args.concat(p);}
;if(n.delay||n.periodical){var o=function(){return m.apply(n.self||this,p);}
;o=qx.event.GlobalError.observeMethod(o);if(n.delay){return window.setTimeout(o,n.delay);}
;if(n.periodical){return window.setInterval(o,n.periodical);}
;}
else if(n.attempt){var q=false;try{q=m.apply(n.self||this,p);}
catch(r){}
;return q;}
else {return m.apply(n.self||this,p);}
;}
;}
,bind:function(s,self,t){return this.create(s,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});}
,curry:function(u,v){return this.create(u,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});}
,listener:function(w,self,x){if(arguments.length<3){return function(event){return w.call(self||this,event||window.event);}
;}
else {var y=qx.lang.Array.fromArguments(arguments,2);return function(event){var z=[event||window.event];z.push.apply(z,y);w.apply(self||this,z);}
;}
;}
,attempt:function(A,self,B){return this.create(A,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();}
,delay:function(C,D,self,E){return this.create(C,{delay:D,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();}
,periodical:function(F,G,self,H){return this.create(F,{periodical:G,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();}
}});}
)();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.data.IListData";qx.Interface.define(a,{events:{"change":c,"changeLength":b},members:{getItem:function(d){}
,setItem:function(e,f){}
,splice:function(g,h,i){}
,contains:function(j){}
,getLength:function(){}
,toArray:function(){}
}});}
)();
(function(){var c=": ",b="qx.type.BaseError",a="";qx.Class.define(b,{extend:Error,construct:function(d,e){var f=Error.call(this,e);if(f.stack){this.stack=f.stack;}
;if(f.stacktrace){this.stacktrace=f.stacktrace;}
;if(!(f.stack||f.stacktrace)){this.__bC=qx.dev.StackTrace.getStackTraceFromCaller(arguments);}
;this.__bD=d||a;this.message=e||qx.type.BaseError.DEFAULTMESSAGE;}
,statics:{DEFAULTMESSAGE:"error"},members:{__bC:null,__bD:null,message:null,getComment:function(){return this.__bD;}
,getStackTrace:function(){if(this.stack||this.stacktrace){return qx.dev.StackTrace.getStackTraceFromError(this);}
else if(this.__bC){return this.__bC;}
;return [];}
,toString:function(){return this.__bD+(this.message?c+this.message:a);}
}});}
)();
(function(){var s="anonymous",r="...",q="qx.dev.StackTrace",p="",o="\n",n="?",m="/source/class/",l="FILENAME_TO_CLASSNAME must return a string!",k="stack",j="FORMAT_STACKTRACE must return an array of strings!",c="prototype",h="stacktrace",f="Error created at",b="Backtrace:",a="function",e="ecmascript.stacktrace",d=".",g=":";qx.Bootstrap.define(q,{statics:{FILENAME_TO_CLASSNAME:null,FORMAT_STACKTRACE:null,getStackTrace:function(){var x=[];try{throw new Error();}
catch(I){if(qx.core.Environment.get(e)){var C=qx.dev.StackTrace.getStackTraceFromError(I);var A=qx.dev.StackTrace.getStackTraceFromCaller(arguments);qx.lang.Array.removeAt(C,0);x=A.length>C.length?A:C;for(var i=0;i<Math.min(A.length,C.length);i++){var y=A[i];if(y.indexOf(s)>=0){continue;}
;var w=null;var G=y.split(d);var z=/(.*?)\(/.exec(G[G.length-1]);if(z&&z.length==2){w=z[1];G.pop();}
;if(G[G.length-1]==c){G.pop();}
;var E=G.join(d);var v=C[i];var H=v.split(g);var D=H[0];var t=H[1];var u;if(H[2]){u=H[2];}
;var B=null;if(qx.Class.getByName(D)){B=D;}
else {B=E;}
;var F=B;if(w){F+=d+w;}
;F+=g+t;if(u){F+=g+u;}
;x[i]=F;}
;}
else {x=this.getStackTraceFromCaller(arguments);}
;}
;return x;}
,getStackTraceFromCaller:function(J){var O=[];var N=qx.lang.Function.getCaller(J);var K={};while(N){var L=qx.lang.Function.getName(N);O.push(L);try{N=N.caller;}
catch(P){break;}
;if(!N){break;}
;var M=qx.core.ObjectRegistry.toHashCode(N);if(K[M]){O.push(r);break;}
;K[M]=N;}
;return O;}
,getStackTraceFromError:function(Q){var U=[];if(qx.core.Environment.get(e)===k){if(!Q.stack){return U;}
;var bg=/@(.+):(\d+)$/gm;var T;while((T=bg.exec(Q.stack))!=null){var W=T[1];var be=T[2];var bc=this.__bE(W);U.push(bc+g+be);}
;if(U.length>0){return this.__bG(U);}
;var bg=/at (.*)/gm;var bf=/\((.*?)(:[^\/].*)\)/;var bb=/(.*?)(:[^\/].*)/;var T;while((T=bg.exec(Q.stack))!=null){var ba=bf.exec(T[1]);if(!ba){ba=bb.exec(T[1]);}
;if(ba){var bc=this.__bE(ba[1]);U.push(bc+ba[2]);}
else {U.push(T[1]);}
;}
;}
else if(qx.core.Environment.get(e)===h){var S=Q.stacktrace;if(!S){return U;}
;if(S.indexOf(f)>=0){S=S.split(f)[0];}
;var bg=/line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;var T;while((T=bg.exec(S))!=null){var be=T[1];var V=T[2];var W=T[3];var bc=this.__bE(W);U.push(bc+g+be+g+V);}
;if(U.length>0){return this.__bG(U);}
;var bg=/Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;var T;while((T=bg.exec(S))!=null){var be=T[1];var W=T[2];var bc=this.__bE(W);U.push(bc+g+be);}
;}
else if(Q.message&&Q.message.indexOf(b)>=0){var Y=qx.lang.String.trim(Q.message.split(b)[1]);var X=Y.split(o);for(var i=0;i<X.length;i++){var R=X[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);if(R&&R.length>=2){var be=R[1];var bd=this.__bE(R[2]);U.push(bd+g+be);}
;}
;}
else if(Q.sourceURL&&Q.line){U.push(this.__bE(Q.sourceURL)+g+Q.line);}
;;;return this.__bG(U);}
,__bE:function(bh){if(typeof qx.dev.StackTrace.FILENAME_TO_CLASSNAME==a){var bi=qx.dev.StackTrace.FILENAME_TO_CLASSNAME(bh);if(false&&!qx.lang.Type.isString(bi)){throw new Error(l);}
;return bi;}
;return qx.dev.StackTrace.__bF(bh);}
,__bF:function(bj){var bn=m;var bk=bj.indexOf(bn);var bm=bj.indexOf(n);if(bm>=0){bj=bj.substring(0,bm);}
;var bl=(bk==-1)?bj:bj.substring(bk+bn.length).replace(/\//g,d).replace(/\.js$/,p);return bl;}
,__bG:function(bo){if(typeof qx.dev.StackTrace.FORMAT_STACKTRACE==a){bo=qx.dev.StackTrace.FORMAT_STACKTRACE(bo);if(false&&!qx.lang.Type.isArray(bo)){throw new Error(j);}
;}
;return bo;}
}});}
)();
(function(){var g="mshtml",f="engine.name",d="stack",c="ecmascript.stacktrace",b="stacktrace",a="qx.bom.client.EcmaScript";qx.Bootstrap.define(a,{statics:{getStackTrace:function(){var e;if(qx.core.Environment.get(f)==g){try{throw new Error();}
catch(h){e=h;}
;}
else {e=new Error();}
;return e.stacktrace?b:e.stack?d:null;}
},defer:function(i){qx.core.Environment.add(c,i.getStackTrace);}
});}
)();
(function(){var n="-",m="",k="qx.core.ObjectRegistry",j="Disposed ",h="-0",g=" objects",f="Could not dispose object ",e=": ",d="qx.debug.dispose",c="$$hash";qx.Class.define(k,{statics:{inShutDown:false,__j:{},__bH:0,__bI:[],__bJ:m,__bK:{},register:function(o){var r=this.__j;if(!r){return;}
;var q=o.$$hash;if(q==null){var p=this.__bI;if(p.length>0&&!qx.core.Environment.get(d)){q=p.pop();}
else {q=(this.__bH++)+this.__bJ;}
;o.$$hash=q;if(qx.core.Environment.get(d)){if(qx.dev&&qx.dev.Debug&&qx.dev.Debug.disposeProfilingActive){this.__bK[q]=qx.dev.StackTrace.getStackTrace();}
;}
;}
;{}
;r[q]=o;}
,unregister:function(s){var t=s.$$hash;if(t==null){return;}
;var u=this.__j;if(u&&u[t]){delete u[t];this.__bI.push(t);}
;try{delete s.$$hash;}
catch(v){if(s.removeAttribute){s.removeAttribute(c);}
;}
;}
,toHashCode:function(w){{}
;var y=w.$$hash;if(y!=null){return y;}
;var x=this.__bI;if(x.length>0){y=x.pop();}
else {y=(this.__bH++)+this.__bJ;}
;return w.$$hash=y;}
,clearHashCode:function(z){{}
;var A=z.$$hash;if(A!=null){this.__bI.push(A);try{delete z.$$hash;}
catch(B){if(z.removeAttribute){z.removeAttribute(c);}
;}
;}
;}
,fromHashCode:function(C){return this.__j[C]||null;}
,shutdown:function(){this.inShutDown=true;var E=this.__j;var G=[];for(var F in E){G.push(F);}
;G.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);}
);var D,i=0,l=G.length;while(true){try{for(;i<l;i++){F=G[i];D=E[F];if(D&&D.dispose){D.dispose();}
;}
;}
catch(H){qx.Bootstrap.error(this,f+D.toString()+e+H,H);if(i!==l){i++;continue;}
;}
;break;}
;qx.Bootstrap.debug(this,j+l+g);delete this.__j;}
,getRegistry:function(){return this.__j;}
,getNextHash:function(){return this.__bH;}
,getPostId:function(){return this.__bJ;}
,getStackTraces:function(){return this.__bK;}
},defer:function(I){if(window&&window.top){var frames=window.top.frames;for(var i=0;i<frames.length;i++){if(frames[i]===window){I.__bJ=n+(i+1);return;}
;}
;}
;I.__bJ=h;}
});}
)();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";qx.Bootstrap.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(g){return this.getClass(g)==d;}
,isNumber:function(h){return (h!==null&&(this.getClass(h)==b||h instanceof Number));}
,isBoolean:function(i){return (i!==null&&(this.getClass(i)==a||i instanceof Boolean));}
,isDate:function(j){return (j!==null&&(this.getClass(j)==c||j instanceof Date));}
,isError:function(k){return (k!==null&&(this.getClass(k)==e||k instanceof Error));}
}});}
)();
(function(){var a="qx.core.AssertionError";qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);this.__bL=qx.dev.StackTrace.getStackTrace();}
,members:{__bL:null,getStackTrace:function(){return this.__bL;}
}});}
)();
(function(){var a="qx.core.ValidationError";qx.Class.define(a,{extend:qx.type.BaseError});}
)();
(function(){var a="qx.lang.RingBuffer";qx.Class.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);}
,members:{__bM:0,__bN:0,__bO:false,__bP:0,__bQ:null,__bR:null,setMaxEntries:function(c){this.__bR=c;this.clear();}
,getMaxEntries:function(){return this.__bR;}
,addEntry:function(d){this.__bQ[this.__bM]=d;this.__bM=this.__bS(this.__bM,1);var e=this.getMaxEntries();if(this.__bN<e){this.__bN++;}
;if(this.__bO&&(this.__bP<e)){this.__bP++;}
;}
,mark:function(){this.__bO=true;this.__bP=0;}
,clearMark:function(){this.__bO=false;}
,getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);}
,getEntries:function(f,g){if(f>this.__bN){f=this.__bN;}
;if(g&&this.__bO&&(f>this.__bP)){f=this.__bP;}
;if(f>0){var i=this.__bS(this.__bM,-1);var h=this.__bS(i,-f+1);var j;if(h<=i){j=this.__bQ.slice(h,i+1);}
else {j=this.__bQ.slice(h,this.__bN).concat(this.__bQ.slice(0,i+1));}
;}
else {j=[];}
;return j;}
,clear:function(){this.__bQ=new Array(this.getMaxEntries());this.__bN=0;this.__bP=0;this.__bM=0;}
,__bS:function(k,l){var m=this.getMaxEntries();var n=(k+l)%m;if(n<0){n+=m;}
;return n;}
}});}
)();
(function(){var a="qx.log.appender.RingBuffer";qx.Class.define(a,{extend:qx.lang.RingBuffer,construct:function(b){this.setMaxMessages(b||50);}
,members:{setMaxMessages:function(c){this.setMaxEntries(c);}
,getMaxMessages:function(){return this.getMaxEntries();}
,process:function(d){this.addEntry(d);}
,getAllLogEvents:function(){return this.getAllEntries();}
,retrieveLogEvents:function(e,f){return this.getEntries(e,f);}
,clearHistory:function(){this.clear();}
}});}
)();
(function(){var k="qx.log.Logger",j="[",h="#",g="warn",f="document",e="{...(",d="text[",c="[...(",b="\n",a=")}",H=")]",G="object",F="...(+",E="array",D=")",C="info",B="instance",A="string",z="null",y="class",s="number",t="stringify",q="]",r="date",o="unknown",p="function",m="boolean",n="debug",u="map",v="node",x="error",w="undefined";qx.Class.define(k,{statics:{__bT:n,setLevel:function(I){this.__bT=I;}
,getLevel:function(){return this.__bT;}
,setTreshold:function(J){this.__bW.setMaxMessages(J);}
,getTreshold:function(){return this.__bW.getMaxMessages();}
,__bU:{},__bV:0,register:function(K){if(K.$$id){return;}
;var M=this.__bV++;this.__bU[M]=K;K.$$id=M;var L=this.__bX;var N=this.__bW.getAllLogEvents();for(var i=0,l=N.length;i<l;i++){if(L[N[i].level]>=L[this.__bT]){K.process(N[i]);}
;}
;}
,unregister:function(O){var P=O.$$id;if(P==null){return;}
;delete this.__bU[P];delete O.$$id;}
,debug:function(Q,R){qx.log.Logger.__bY(n,arguments);}
,info:function(S,T){qx.log.Logger.__bY(C,arguments);}
,warn:function(U,V){qx.log.Logger.__bY(g,arguments);}
,error:function(W,X){qx.log.Logger.__bY(x,arguments);}
,trace:function(Y){var ba=qx.dev.StackTrace.getStackTrace();qx.log.Logger.__bY(C,[(typeof Y!==w?[Y].concat(ba):ba).join(b)]);}
,deprecatedMethodWarning:function(bb,bc){var bd;{}
;}
,deprecatedClassWarning:function(be,bf){var bg;{}
;}
,deprecatedEventWarning:function(bh,event,bi){var bj;{}
;}
,deprecatedMixinWarning:function(bk,bl){var bm;{}
;}
,deprecatedConstantWarning:function(bn,bo,bp){var self,bq;{}
;}
,deprecateMethodOverriding:function(br,bs,bt,bu){var bv;{}
;}
,clear:function(){this.__bW.clearHistory();}
,__bW:new qx.log.appender.RingBuffer(50),__bX:{debug:0,info:1,warn:2,error:3},__bY:function(bw,bx){var bC=this.__bX;if(bC[bw]<bC[this.__bT]){return;}
;var bz=bx.length<2?null:bx[0];var bB=bz?1:0;var by=[];for(var i=bB,l=bx.length;i<l;i++){by.push(this.__cb(bx[i],true));}
;var bD=new Date;var bE={time:bD,offset:bD-qx.Bootstrap.LOADSTART,level:bw,items:by,win:window};if(bz){if(bz.$$hash!==undefined){bE.object=bz.$$hash;}
else if(bz.$$type){bE.clazz=bz;}
;}
;this.__bW.process(bE);var bF=this.__bU;for(var bA in bF){bF[bA].process(bE);}
;}
,__ca:function(bG){if(bG===undefined){return w;}
else if(bG===null){return z;}
;if(bG.$$type){return y;}
;var bH=typeof bG;if(bH===p||bH==A||bH===s||bH===m){return bH;}
else if(bH===G){if(bG.nodeType){return v;}
else if(bG.classname){return B;}
else if(bG instanceof Array){return E;}
else if(bG instanceof Error){return x;}
else if(bG instanceof Date){return r;}
else {return u;}
;;;;}
;if(bG.toString){return t;}
;return o;}
,__cb:function(bI,bJ){var bQ=this.__ca(bI);var bM=o;var bL=[];switch(bQ){case z:case w:bM=bQ;break;case A:case s:case m:case r:bM=bI;break;case v:if(bI.nodeType===9){bM=f;}
else if(bI.nodeType===3){bM=d+bI.nodeValue+q;}
else if(bI.nodeType===1){bM=bI.nodeName.toLowerCase();if(bI.id){bM+=h+bI.id;}
;}
else {bM=v;}
;;break;case p:bM=qx.lang.Function.getName(bI)||bQ;break;case B:bM=bI.basename+j+bI.$$hash+q;break;case y:case t:bM=bI.toString();break;case x:bL=qx.dev.StackTrace.getStackTraceFromError(bI);bM=bI.toString();break;case E:if(bJ){bM=[];for(var i=0,l=bI.length;i<l;i++){if(bM.length>20){bM.push(F+(l-i)+D);break;}
;bM.push(this.__cb(bI[i],false));}
;}
else {bM=c+bI.length+H;}
;break;case u:if(bJ){var bK;var bP=[];for(var bO in bI){bP.push(bO);}
;bP.sort();bM=[];for(var i=0,l=bP.length;i<l;i++){if(bM.length>20){bM.push(F+(l-i)+D);break;}
;bO=bP[i];bK=this.__cb(bI[bO],false);bK.key=bO;bM.push(bK);}
;}
else {var bN=0;for(var bO in bI){bN++;}
;bM=e+bN+a;}
;break;};return {type:bQ,text:bM,trace:bL};}
},defer:function(bR){var bS=qx.Bootstrap.$$logs;for(var i=0;i<bS.length;i++){bR.__bY(bS[i][0],bS[i][1]);}
;qx.Bootstrap.debug=bR.debug;qx.Bootstrap.info=bR.info;qx.Bootstrap.warn=bR.warn;qx.Bootstrap.error=bR.error;qx.Bootstrap.trace=bR.trace;}
});}
)();
(function(){var e="qx.core.MProperty",d="get",c="reset",b="No such property: ",a="set";qx.Mixin.define(e,{members:{set:function(f,g){var i=qx.core.Property.$$method.set;if(qx.Bootstrap.isString(f)){if(!this[i[f]]){if(this[a+qx.Bootstrap.firstUp(f)]!=undefined){this[a+qx.Bootstrap.firstUp(f)](g);return this;}
;throw new Error(b+f);}
;return this[i[f]](g);}
else {for(var h in f){if(!this[i[h]]){if(this[a+qx.Bootstrap.firstUp(h)]!=undefined){this[a+qx.Bootstrap.firstUp(h)](f[h]);continue;}
;throw new Error(b+h);}
;this[i[h]](f[h]);}
;return this;}
;}
,get:function(j){var k=qx.core.Property.$$method.get;if(!this[k[j]]){if(this[d+qx.Bootstrap.firstUp(j)]!=undefined){return this[d+qx.Bootstrap.firstUp(j)]();}
;throw new Error(b+j);}
;return this[k[j]]();}
,reset:function(l){var m=qx.core.Property.$$method.reset;if(!this[m[l]]){if(this[c+qx.Bootstrap.firstUp(l)]!=undefined){this[c+qx.Bootstrap.firstUp(l)]();return;}
;throw new Error(b+l);}
;this[m[l]]();}
}});}
)();
(function(){var e="info",d="debug",c="warn",b="qx.core.MLogging",a="error";qx.Mixin.define(b,{members:{__cc:qx.log.Logger,debug:function(f){this.__cd(d,arguments);}
,info:function(g){this.__cd(e,arguments);}
,warn:function(h){this.__cd(c,arguments);}
,error:function(i){this.__cd(a,arguments);}
,trace:function(){this.__cc.trace(this);}
,__cd:function(j,k){var l=qx.lang.Array.fromArguments(k);l.unshift(this);this.__cc[j].apply(this.__cc,l);}
}});}
)();
(function(){var c="qx.dom.Node",b="";qx.Bootstrap.define(c,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(d){return d.nodeType===this.DOCUMENT?d:d.ownerDocument||d.document;}
,getWindow:function(e){if(e.nodeType==null){return e;}
;if(e.nodeType!==this.DOCUMENT){e=e.ownerDocument;}
;return e.defaultView||e.parentWindow;}
,getDocumentElement:function(f){return this.getDocument(f).documentElement;}
,getBodyElement:function(g){return this.getDocument(g).body;}
,isNode:function(h){return !!(h&&h.nodeType!=null);}
,isElement:function(j){return !!(j&&j.nodeType===this.ELEMENT);}
,isDocument:function(k){return !!(k&&k.nodeType===this.DOCUMENT);}
,isText:function(l){return !!(l&&l.nodeType===this.TEXT);}
,isWindow:function(m){return !!(m&&m.history&&m.location&&m.document);}
,isNodeName:function(n,o){if(!o||!n||!n.nodeName){return false;}
;return o.toLowerCase()==qx.dom.Node.getName(n);}
,getName:function(p){if(!p||!p.nodeName){return null;}
;return p.nodeName.toLowerCase();}
,getText:function(q){if(!q||!q.nodeType){return null;}
;switch(q.nodeType){case 1:var i,a=[],r=q.childNodes,length=r.length;for(i=0;i<length;i++){a[i]=this.getText(r[i]);}
;return a.join(b);case 2:case 3:case 4:return q.nodeValue;};return null;}
,isBlockNode:function(s){if(!qx.dom.Node.isElement(s)){return false;}
;s=qx.dom.Node.getName(s);return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(s);}
}});}
)();
(function(){var j="HTMLEvents",i="engine.name",h="qx.bom.Event",g="return;",f="mouseover",d="gecko",c="function",b="undefined",a="on";qx.Bootstrap.define(h,{statics:{addNativeListener:function(k,l,m,n){if(k.addEventListener){k.addEventListener(l,m,!!n);}
else if(k.attachEvent){k.attachEvent(a+l,m);}
else if(typeof k[a+l]!=b){k[a+l]=m;}
else {{}
;}
;;}
,removeNativeListener:function(o,p,q,r){if(o.removeEventListener){o.removeEventListener(p,q,!!r);}
else if(o.detachEvent){try{o.detachEvent(a+p,q);}
catch(e){if(e.number!==-2146828218){throw e;}
;}
;}
else if(typeof o[a+p]!=b){o[a+p]=null;}
else {{}
;}
;;}
,getTarget:function(e){return e.target||e.srcElement;}
,getRelatedTarget:function(e){if(e.relatedTarget!==undefined){if((qx.core.Environment.get(i)==d)){try{e.relatedTarget&&e.relatedTarget.nodeType;}
catch(e){return null;}
;}
;return e.relatedTarget;}
else if(e.fromElement!==undefined&&e.type===f){return e.fromElement;}
else if(e.toElement!==undefined){return e.toElement;}
else {return null;}
;;}
,preventDefault:function(e){if(e.preventDefault){e.preventDefault();}
else {try{e.keyCode=0;}
catch(s){}
;e.returnValue=false;}
;}
,stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();}
else {e.cancelBubble=true;}
;}
,fire:function(t,u){if(document.createEvent){var v=document.createEvent(j);v.initEvent(u,true,true);return !t.dispatchEvent(v);}
else {var v=document.createEventObject();return t.fireEvent(a+u,v);}
;}
,supportsEvent:function(w,x){var y=a+x;var z=(y in w);if(!z){z=typeof w[y]==c;if(!z&&w.setAttribute){w.setAttribute(y,g);z=typeof w[y]==c;w.removeAttribute(y);}
;}
;return z;}
}});}
)();
(function(){var r="UNKNOWN_",q="__cj",p="c",o="DOM_",n="__ci",m="WIN_",k="QX_",j="qx.event.Manager",h="capture",g="DOCUMENT_",c="unload",f="",e="_",b="|",a="|bubble",d="|capture";qx.Class.define(j,{extend:Object,construct:function(s,t){this.__ce=s;this.__cf=qx.core.ObjectRegistry.toHashCode(s);this.__cg=t;if(s.qx!==qx){var self=this;qx.bom.Event.addNativeListener(s,c,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(s,c,arguments.callee);self.dispose();}
));}
;this.__ch={};this.__ci={};this.__cj={};this.__ck={};}
,statics:{__cl:0,getNextUniqueId:function(){return (this.__cl++)+f;}
},members:{__cg:null,__ch:null,__cj:null,__cm:null,__ci:null,__ck:null,__ce:null,__cf:null,getWindow:function(){return this.__ce;}
,getWindowId:function(){return this.__cf;}
,getHandler:function(u){var v=this.__ci[u.classname];if(v){return v;}
;return this.__ci[u.classname]=new u(this);}
,getDispatcher:function(w){var x=this.__cj[w.classname];if(x){return x;}
;return this.__cj[w.classname]=new w(this,this.__cg);}
,getListeners:function(y,z,A){var B=y.$$hash||qx.core.ObjectRegistry.toHashCode(y);var D=this.__ch[B];if(!D){return null;}
;var E=z+(A?d:a);var C=D[E];return C?C.concat():null;}
,getAllListeners:function(){return this.__ch;}
,serializeListeners:function(F){var M=F.$$hash||qx.core.ObjectRegistry.toHashCode(F);var O=this.__ch[M];var K=[];if(O){var I,N,G,J,L;for(var H in O){I=H.indexOf(b);N=H.substring(0,I);G=H.charAt(I+1)==p;J=O[H];for(var i=0,l=J.length;i<l;i++){L=J[i];K.push({self:L.context,handler:L.handler,type:N,capture:G});}
;}
;}
;return K;}
,toggleAttachedEvents:function(P,Q){var V=P.$$hash||qx.core.ObjectRegistry.toHashCode(P);var X=this.__ch[V];if(X){var S,W,R,T;for(var U in X){S=U.indexOf(b);W=U.substring(0,S);R=U.charCodeAt(S+1)===99;T=X[U];if(Q){this.__cn(P,W,R);}
else {this.__co(P,W,R);}
;}
;}
;}
,hasListener:function(Y,ba,bb){{}
;var bc=Y.$$hash||qx.core.ObjectRegistry.toHashCode(Y);var be=this.__ch[bc];if(!be){return false;}
;var bf=ba+(bb?d:a);var bd=be[bf];return !!(bd&&bd.length>0);}
,importListeners:function(bg,bh){{}
;var bn=bg.$$hash||qx.core.ObjectRegistry.toHashCode(bg);var bo=this.__ch[bn]={};var bk=qx.event.Manager;for(var bi in bh){var bl=bh[bi];var bm=bl.type+(bl.capture?d:a);var bj=bo[bm];if(!bj){bj=bo[bm]=[];this.__cn(bg,bl.type,bl.capture);}
;bj.push({handler:bl.listener,context:bl.self,unique:bl.unique||(bk.__cl++)+f});}
;}
,addListener:function(bp,bq,br,self,bs){var bw;{}
;var bx=bp.$$hash||qx.core.ObjectRegistry.toHashCode(bp);var bz=this.__ch[bx];if(!bz){bz=this.__ch[bx]={};}
;var bv=bq+(bs?d:a);var bu=bz[bv];if(!bu){bu=bz[bv]=[];}
;if(bu.length===0){this.__cn(bp,bq,bs);}
;var by=(qx.event.Manager.__cl++)+f;var bt={handler:br,context:self,unique:by};bu.push(bt);return bv+b+by;}
,findHandler:function(bA,bB){var bN=false,bF=false,bO=false,bC=false;var bL;if(bA.nodeType===1){bN=true;bL=o+bA.tagName.toLowerCase()+e+bB;}
else if(bA.nodeType===9){bC=true;bL=g+bB;}
else if(bA==this.__ce){bF=true;bL=m+bB;}
else if(bA.classname){bO=true;bL=k+bA.classname+e+bB;}
else {bL=r+bA+e+bB;}
;;;var bH=this.__ck;if(bH[bL]){return bH[bL];}
;var bK=this.__cg.getHandlers();var bG=qx.event.IEventHandler;var bI,bJ,bE,bD;for(var i=0,l=bK.length;i<l;i++){bI=bK[i];bE=bI.SUPPORTED_TYPES;if(bE&&!bE[bB]){continue;}
;bD=bI.TARGET_CHECK;if(bD){var bM=false;if(bN&&((bD&bG.TARGET_DOMNODE)!=0)){bM=true;}
else if(bF&&((bD&bG.TARGET_WINDOW)!=0)){bM=true;}
else if(bO&&((bD&bG.TARGET_OBJECT)!=0)){bM=true;}
else if(bC&&((bD&bG.TARGET_DOCUMENT)!=0)){bM=true;}
;;;if(!bM){continue;}
;}
;bJ=this.getHandler(bK[i]);if(bI.IGNORE_CAN_HANDLE||bJ.canHandleEvent(bA,bB)){bH[bL]=bJ;return bJ;}
;}
;return null;}
,__cn:function(bP,bQ,bR){var bS=this.findHandler(bP,bQ);if(bS){bS.registerEvent(bP,bQ,bR);return;}
;{}
;}
,removeListener:function(bT,bU,bV,self,bW){var cb;{}
;var cc=bT.$$hash||qx.core.ObjectRegistry.toHashCode(bT);var cd=this.__ch[cc];if(!cd){return false;}
;var bX=bU+(bW?d:a);var bY=cd[bX];if(!bY){return false;}
;var ca;for(var i=0,l=bY.length;i<l;i++){ca=bY[i];if(ca.handler===bV&&ca.context===self){qx.lang.Array.removeAt(bY,i);if(bY.length==0){this.__co(bT,bU,bW);}
;return true;}
;}
;return false;}
,removeListenerById:function(ce,cf){var cl;{}
;var cj=cf.split(b);var co=cj[0];var cg=cj[1].charCodeAt(0)==99;var cn=cj[2];var cm=ce.$$hash||qx.core.ObjectRegistry.toHashCode(ce);var cp=this.__ch[cm];if(!cp){return false;}
;var ck=co+(cg?d:a);var ci=cp[ck];if(!ci){return false;}
;var ch;for(var i=0,l=ci.length;i<l;i++){ch=ci[i];if(ch.unique===cn){qx.lang.Array.removeAt(ci,i);if(ci.length==0){this.__co(ce,co,cg);}
;return true;}
;}
;return false;}
,removeAllListeners:function(cq){var cu=cq.$$hash||qx.core.ObjectRegistry.toHashCode(cq);var cw=this.__ch[cu];if(!cw){return false;}
;var cs,cv,cr;for(var ct in cw){if(cw[ct].length>0){cs=ct.split(b);cv=cs[0];cr=cs[1]===h;this.__co(cq,cv,cr);}
;}
;delete this.__ch[cu];return true;}
,deleteAllListeners:function(cx){delete this.__ch[cx];}
,__co:function(cy,cz,cA){var cB=this.findHandler(cy,cz);if(cB){cB.unregisterEvent(cy,cz,cA);return;}
;{}
;}
,dispatchEvent:function(cC,event){var cH;{}
;var cI=event.getType();if(!event.getBubbles()&&!this.hasListener(cC,cI)){qx.event.Pool.getInstance().poolObject(event);return true;}
;if(!event.getTarget()){event.setTarget(cC);}
;var cG=this.__cg.getDispatchers();var cF;var cE=false;for(var i=0,l=cG.length;i<l;i++){cF=this.getDispatcher(cG[i]);if(cF.canDispatchEvent(cC,event,cI)){cF.dispatchEvent(cC,event,cI);cE=true;break;}
;}
;if(!cE){{}
;return true;}
;var cD=event.getDefaultPrevented();qx.event.Pool.getInstance().poolObject(event);return !cD;}
,dispose:function(){this.__cg.removeManager(this);qx.util.DisposeUtil.disposeMap(this,n);qx.util.DisposeUtil.disposeMap(this,q);this.__ch=this.__ce=this.__cm=null;this.__cg=this.__ck=null;}
}});}
)();
(function(){var b="qx.event.GlobalError",a="qx.globalErrorHandling";qx.Bootstrap.define(b,{statics:{__cp:function(){if(qx.core&&qx.core.Environment){return true;}
else {return !!qx.Bootstrap.getEnvironmentSetting(a);}
;}
,setErrorHandler:function(c,d){this.__cq=c||null;this.__cr=d||window;if(this.__cp()){if(c&&window.onerror){var e=qx.Bootstrap.bind(this.__ct,this);if(this.__cs==null){this.__cs=window.onerror;}
;var self=this;window.onerror=function(f,g,h){self.__cs(f,g,h);e(f,g,h);}
;}
;if(c&&!window.onerror){window.onerror=qx.Bootstrap.bind(this.__ct,this);}
;if(this.__cq==null){if(this.__cs!=null){window.onerror=this.__cs;this.__cs=null;}
else {window.onerror=null;}
;}
;}
;}
,__ct:function(i,j,k){if(this.__cq){this.handleError(new qx.core.WindowError(i,j,k));return true;}
;}
,observeMethod:function(l){if(this.__cp()){var self=this;return function(){if(!self.__cq){return l.apply(this,arguments);}
;try{return l.apply(this,arguments);}
catch(m){self.handleError(new qx.core.GlobalError(m,arguments));}
;}
;}
else {return l;}
;}
,handleError:function(n){if(this.__cq){this.__cq.call(this.__cr,n);}
;}
},defer:function(o){if(qx.core&&qx.core.Environment){qx.core.Environment.add(a,true);}
else {qx.Bootstrap.setEnvironmentSetting(a,true);}
;o.setErrorHandler(null,null);}
});}
)();
(function(){var b="",a="qx.core.WindowError";qx.Bootstrap.define(a,{extend:Error,construct:function(c,d,e){var f=Error.call(this,c);if(f.stack){this.stack=f.stack;}
;if(f.stacktrace){this.stacktrace=f.stacktrace;}
;this.__cu=c;this.__cv=d||b;this.__cw=e===undefined?-1:e;}
,members:{__cu:null,__cv:null,__cw:null,toString:function(){return this.__cu;}
,getUri:function(){return this.__cv;}
,getLineNumber:function(){return this.__cw;}
}});}
)();
(function(){var b="GlobalError: ",a="qx.core.GlobalError";qx.Bootstrap.define(a,{extend:Error,construct:function(c,d){if(qx.Bootstrap.DEBUG){qx.core.Assert.assertNotUndefined(c);}
;this.__cu=b+(c&&c.message?c.message:c);var e=Error.call(this,this.__cu);if(e.stack){this.stack=e.stack;}
;if(e.stacktrace){this.stacktrace=e.stacktrace;}
;this.__cx=d;this.__cy=c;}
,members:{__cy:null,__cx:null,__cu:null,toString:function(){return this.__cu;}
,getArguments:function(){return this.__cx;}
,getSourceException:function(){return this.__cy;}
},destruct:function(){this.__cy=null;this.__cx=null;this.__cu=null;}
});}
)();
(function(){var p=" != ",o="qx.core.Object",n="Expected value to be an array but found ",m=") was fired.",k="Expected value to be an integer >= 0 but found ",j="' to be not equal with '",h="' to '",g="Expected object '",f="Called assertTrue with '",d="Expected value to be a map but found ",bC="The function did not raise an exception!",bB="Expected value to be undefined but found ",bA="Expected value to be a DOM element but found  '",bz="Expected value to be a regular expression but found ",by="' to implement the interface '",bx="Expected value to be null but found ",bw="Invalid argument 'type'",bv="Called assert with 'false'",bu="Assertion error! ",bt="null",w="' but found '",x="'undefined'",u="' must must be a key of the map '",v="The String '",s="Expected value to be a string but found ",t="Expected value not to be undefined but found undefined!",q="qx.util.ColorUtil",r=": ",E="The raised exception does not have the expected type! ",F=") not fired.",U="qx.core.Assert",Q="Expected value to be typeof object but found ",bd="' (identical) but found '",X="' must have any of the values defined in the array '",bp="Expected value to be a number but found ",bj="Called assertFalse with '",L="qx.ui.core.Widget",bs="Expected value to be a qooxdoo object but found ",br="' arguments.",bq="Expected value '%1' to be in the range '%2'..'%3'!",J="Array[",N="' does not match the regular expression '",P="' to be not identical with '",S="Expected [",V="' arguments but found '",Y="', which cannot be converted to a CSS color!",bf="qx.core.AssertionError",bl="Expected value to be a boolean but found ",y="Expected value not to be null but found null!",z="))!",M="Expected value to be a qooxdoo widget but found ",bc="Expected value to be typeof '",bb="\n Stack trace: \n",ba="Expected value to be typeof function but found ",bh="Expected value to be an integer but found ",bg="Called fail().",W="The parameter 're' must be a string or a regular expression.",be="qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'",a="Expected value to be a number >= 0 but found ",bk="Expected value to be instanceof '",A="], but found [",B="Wrong number of arguments given. Expected '",R="object",b="Event (",c="Expected value to be the CSS color '",I="' but found ",C="]",D=", ",H="The value '",T=")), but found value '",bn="' (rgb(",bm=",",O="'",bo="Expected '",K="'!",bi="!",G="";qx.Class.define(U,{statics:{__cz:true,__cA:function(bD,bE){var bI=G;for(var i=1,l=arguments.length;i<l;i++){bI=bI+this.__cB(arguments[i]===undefined?x:arguments[i]);}
;var bH=G;if(bI){bH=bD+r+bI;}
else {bH=bD;}
;var bG=bu+bH;if(qx.Class.isDefined(bf)){var bF=new qx.core.AssertionError(bD,bI);if(this.__cz){qx.Bootstrap.error(bG+bb+bF.getStackTrace());}
;throw bF;}
else {if(this.__cz){qx.Bootstrap.error(bG);}
;throw new Error(bG);}
;}
,__cB:function(bJ){var bK;if(bJ===null){bK=bt;}
else if(qx.lang.Type.isArray(bJ)&&bJ.length>10){bK=J+bJ.length+C;}
else if((bJ instanceof Object)&&(bJ.toString==null)){bK=qx.lang.Json.stringify(bJ,null,2);}
else {try{bK=bJ.toString();}
catch(e){bK=G;}
;}
;;return bK;}
,assert:function(bL,bM){bL==true||this.__cA(bM||G,bv);}
,fail:function(bN,bO){var bP=bO?G:bg;this.__cA(bN||G,bP);}
,assertTrue:function(bQ,bR){(bQ===true)||this.__cA(bR||G,f,bQ,O);}
,assertFalse:function(bS,bT){(bS===false)||this.__cA(bT||G,bj,bS,O);}
,assertEquals:function(bU,bV,bW){bU==bV||this.__cA(bW||G,bo,bU,w,bV,K);}
,assertNotEquals:function(bX,bY,ca){bX!=bY||this.__cA(ca||G,bo,bX,j,bY,K);}
,assertIdentical:function(cb,cc,cd){cb===cc||this.__cA(cd||G,bo,cb,bd,cc,K);}
,assertNotIdentical:function(ce,cf,cg){ce!==cf||this.__cA(cg||G,bo,ce,P,cf,K);}
,assertNotUndefined:function(ch,ci){ch!==undefined||this.__cA(ci||G,t);}
,assertUndefined:function(cj,ck){cj===undefined||this.__cA(ck||G,bB,cj,bi);}
,assertNotNull:function(cl,cm){cl!==null||this.__cA(cm||G,y);}
,assertNull:function(cn,co){cn===null||this.__cA(co||G,bx,cn,bi);}
,assertJsonEquals:function(cp,cq,cr){this.assertEquals(qx.lang.Json.stringify(cp),qx.lang.Json.stringify(cq),cr);}
,assertMatch:function(cs,ct,cu){this.assertString(cs);this.assert(qx.lang.Type.isRegExp(ct)||qx.lang.Type.isString(ct),W);cs.search(ct)>=0||this.__cA(cu||G,v,cs,N,ct.toString(),K);}
,assertArgumentsCount:function(cv,cw,cx,cy){var cz=cv.length;(cz>=cw&&cz<=cx)||this.__cA(cy||G,B,cw,h,cx,V,cz,br);}
,assertEventFired:function(cA,event,cB,cC,cD){var cF=false;var cE=function(e){if(cC){cC.call(cA,e);}
;cF=true;}
;var cG;try{cG=cA.addListener(event,cE,cA);cB.call(cA);}
catch(cH){throw cH;}
finally{try{cA.removeListenerById(cG);}
catch(cI){}
;}
;cF===true||this.__cA(cD||G,b,event,F);}
,assertEventNotFired:function(cJ,event,cK,cL){var cN=false;var cM=function(e){cN=true;}
;var cO=cJ.addListener(event,cM,cJ);cK.call();cN===false||this.__cA(cL||G,b,event,m);cJ.removeListenerById(cO);}
,assertException:function(cP,cQ,cR,cS){var cQ=cQ||Error;var cT;try{this.__cz=false;cP();}
catch(cU){cT=cU;}
finally{this.__cz=true;}
;if(cT==null){this.__cA(cS||G,bC);}
;cT instanceof cQ||this.__cA(cS||G,E,cQ,p,cT);if(cR){this.assertMatch(cT.toString(),cR,cS);}
;}
,assertInArray:function(cV,cW,cX){cW.indexOf(cV)!==-1||this.__cA(cX||G,H,cV,X,cW,O);}
,assertArrayEquals:function(cY,da,db){this.assertArray(cY,db);this.assertArray(da,db);db=db||S+cY.join(D)+A+da.join(D)+C;if(cY.length!==da.length){this.fail(db,true);}
;for(var i=0;i<cY.length;i++){if(cY[i]!==da[i]){this.fail(db,true);}
;}
;}
,assertKeyInMap:function(dc,dd,de){dd[dc]!==undefined||this.__cA(de||G,H,dc,u,dd,O);}
,assertFunction:function(df,dg){qx.lang.Type.isFunction(df)||this.__cA(dg||G,ba,df,bi);}
,assertString:function(dh,di){qx.lang.Type.isString(dh)||this.__cA(di||G,s,dh,bi);}
,assertBoolean:function(dj,dk){qx.lang.Type.isBoolean(dj)||this.__cA(dk||G,bl,dj,bi);}
,assertNumber:function(dl,dm){(qx.lang.Type.isNumber(dl)&&isFinite(dl))||this.__cA(dm||G,bp,dl,bi);}
,assertPositiveNumber:function(dn,dp){(qx.lang.Type.isNumber(dn)&&isFinite(dn)&&dn>=0)||this.__cA(dp||G,a,dn,bi);}
,assertInteger:function(dq,dr){(qx.lang.Type.isNumber(dq)&&isFinite(dq)&&dq%1===0)||this.__cA(dr||G,bh,dq,bi);}
,assertPositiveInteger:function(ds,dt){var du=(qx.lang.Type.isNumber(ds)&&isFinite(ds)&&ds%1===0&&ds>=0);du||this.__cA(dt||G,k,ds,bi);}
,assertInRange:function(dv,dw,dx,dy){(dv>=dw&&dv<=dx)||this.__cA(dy||G,qx.lang.String.format(bq,[dv,dw,dx]));}
,assertObject:function(dz,dA){var dB=dz!==null&&(qx.lang.Type.isObject(dz)||typeof dz===R);dB||this.__cA(dA||G,Q,(dz),bi);}
,assertArray:function(dC,dD){qx.lang.Type.isArray(dC)||this.__cA(dD||G,n,dC,bi);}
,assertMap:function(dE,dF){qx.lang.Type.isObject(dE)||this.__cA(dF||G,d,dE,bi);}
,assertRegExp:function(dG,dH){qx.lang.Type.isRegExp(dG)||this.__cA(dH||G,bz,dG,bi);}
,assertType:function(dI,dJ,dK){this.assertString(dJ,bw);typeof (dI)===dJ||this.__cA(dK||G,bc,dJ,I,dI,bi);}
,assertInstance:function(dL,dM,dN){var dO=dM.classname||dM+G;dL instanceof dM||this.__cA(dN||G,bk,dO,I,dL,bi);}
,assertInterface:function(dP,dQ,dR){qx.Class.implementsInterface(dP,dQ)||this.__cA(dR||G,g,dP,by,dQ,K);}
,assertCssColor:function(dS,dT,dU){var dV=qx.Class.getByName(q);if(!dV){throw new Error(be);}
;var dX=dV.stringToRgb(dS);try{var dW=dV.stringToRgb(dT);}
catch(ea){this.__cA(dU||G,c,dS,bn,dX.join(bm),T,dT,Y);}
;var dY=dX[0]==dW[0]&&dX[1]==dW[1]&&dX[2]==dW[2];dY||this.__cA(dU||G,c,dX,bn,dX.join(bm),T,dT,bn,dW.join(bm),z);}
,assertElement:function(eb,ec){!!(eb&&eb.nodeType===1)||this.__cA(ec||G,bA,eb,K);}
,assertQxObject:function(ed,ee){this.__cC(ed,o)||this.__cA(ee||G,bs,ed,bi);}
,assertQxWidget:function(ef,eg){this.__cC(ef,L)||this.__cA(eg||G,M,ef,bi);}
,__cC:function(eh,ei){if(!eh){return false;}
;var ej=eh.constructor;while(ej){if(ej.classname===ei){return true;}
;ej=ej.superclass;}
;return false;}
}});}
)();
(function(){var g="prop",f="qx.bom.client.Json",e="JSON",d='{"x":1}',c="json",b="val",a="repl";qx.Bootstrap.define(f,{statics:{getJson:function(){return (qx.Bootstrap.getClass(window.JSON)==e&&JSON.parse(d).x===1&&JSON.stringify({"prop":b},function(k,v){return k===g?a:v;}
).indexOf(a)>0);}
},defer:function(h){qx.core.Environment.add(c,h.getJson);}
});}
)();
(function(){var p='String',o='Boolean',m='\\\\',l='\\f',h='\\t',g='{\n',f='[]',e="qx.lang.JsonImpl",d='Z',b='\\n',ba='Object',Y='{}',X='@',W='.',V='(',U='Array',T='T',S='\\r',R='{',Q='JSON.parse',x=' ',y='[',u='Number',w=')',s='[\n',t='\\"',q='\\b',r=': ',z='object',A='function',H=',',F='\n',K='\\u',J=',\n',M='0000',L='string',C="Cannot stringify a recursive object.",P='0',O='-',N='}',B=']',D='null',E='"',G=':',I='';qx.Bootstrap.define(e,{extend:Object,construct:function(){this.stringify=qx.lang.Function.bind(this.stringify,this);this.parse=qx.lang.Function.bind(this.parse,this);}
,members:{__cD:null,__cE:null,__cF:null,__cG:null,stringify:function(bb,bc,bd){this.__cD=I;this.__cE=I;this.__cG=[];if(qx.lang.Type.isNumber(bd)){var bd=Math.min(10,Math.floor(bd));for(var i=0;i<bd;i+=1){this.__cE+=x;}
;}
else if(qx.lang.Type.isString(bd)){if(bd.length>10){bd=bd.slice(0,10);}
;this.__cE=bd;}
;if(bc&&(qx.lang.Type.isFunction(bc)||qx.lang.Type.isArray(bc))){this.__cF=bc;}
else {this.__cF=null;}
;return this.__cH(I,{'':bb});}
,__cH:function(be,bf){var bi=this.__cD,bg,bj=bf[be];if(bj&&qx.lang.Type.isFunction(bj.toJSON)){bj=bj.toJSON(be);}
else if(qx.lang.Type.isDate(bj)){bj=this.dateToJSON(bj);}
;if(typeof this.__cF===A){bj=this.__cF.call(bf,be,bj);}
;if(bj===null){return D;}
;if(bj===undefined){return undefined;}
;switch(qx.lang.Type.getClass(bj)){case p:return this.__cI(bj);case u:return isFinite(bj)?String(bj):D;case o:return String(bj);case U:this.__cD+=this.__cE;bg=[];if(this.__cG.indexOf(bj)!==-1){throw new TypeError(C);}
;this.__cG.push(bj);var length=bj.length;for(var i=0;i<length;i+=1){bg[i]=this.__cH(i,bj)||D;}
;this.__cG.pop();if(bg.length===0){var bh=f;}
else if(this.__cD){bh=s+this.__cD+bg.join(J+this.__cD)+F+bi+B;}
else {bh=y+bg.join(H)+B;}
;this.__cD=bi;return bh;case ba:this.__cD+=this.__cE;bg=[];if(this.__cG.indexOf(bj)!==-1){throw new TypeError(C);}
;this.__cG.push(bj);if(this.__cF&&typeof this.__cF===z){var length=this.__cF.length;for(var i=0;i<length;i+=1){var k=this.__cF[i];if(typeof k===L){var v=this.__cH(k,bj);if(v){bg.push(this.__cI(k)+(this.__cD?r:G)+v);}
;}
;}
;}
else {for(var k in bj){if(Object.hasOwnProperty.call(bj,k)){var v=this.__cH(k,bj);if(v){bg.push(this.__cI(k)+(this.__cD?r:G)+v);}
;}
;}
;}
;this.__cG.pop();if(bg.length===0){var bh=Y;}
else if(this.__cD){bh=g+this.__cD+bg.join(J+this.__cD)+F+bi+N;}
else {bh=R+bg.join(H)+N;}
;this.__cD=bi;return bh;};}
,dateToJSON:function(bk){var bl=function(n){return n<10?P+n:n;}
;var bm=function(n){var bn=bl(n);return n<100?P+bn:bn;}
;return isFinite(bk.valueOf())?bk.getUTCFullYear()+O+bl(bk.getUTCMonth()+1)+O+bl(bk.getUTCDate())+T+bl(bk.getUTCHours())+G+bl(bk.getUTCMinutes())+G+bl(bk.getUTCSeconds())+W+bm(bk.getUTCMilliseconds())+d:null;}
,__cI:function(bo){var bp={'\b':q,'\t':h,'\n':b,'\f':l,'\r':S,'"':t,'\\':m};var bq=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;bq.lastIndex=0;if(bq.test(bo)){return E+bo.replace(bq,function(a){var c=bp[a];return typeof c===L?c:K+(M+a.charCodeAt(0).toString(16)).slice(-4);}
)+E;}
else {return E+bo+E;}
;}
,parse:function(br,bs){var bt=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;bt.lastIndex=0;if(bt.test(br)){br=br.replace(bt,function(a){return K+(M+a.charCodeAt(0).toString(16)).slice(-4);}
);}
;if(/^[\],:{}\s]*$/.test(br.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,X).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,B).replace(/(?:^|:|,)(?:\s*\[)+/g,I))){var j=eval(V+br+w);return typeof bs===A?this.__cJ({'':j},I,bs):j;}
;throw new SyntaxError(Q);}
,__cJ:function(bu,bv,bw){var bx=bu[bv];if(bx&&typeof bx===z){for(var k in bx){if(Object.hasOwnProperty.call(bx,k)){var v=this.__cJ(bx,k,bw);if(v!==undefined){bx[k]=v;}
else {delete bx[k];}
;}
;}
;}
;return bw.call(bu,bv,bx);}
}});}
)();
(function(){var a="qx.lang.Json";qx.Bootstrap.define(a,{statics:{JSON:qx.core.Environment.get("json")?window.JSON:new qx.lang.JsonImpl(),stringify:null,parse:null},defer:function(b){b.stringify=b.JSON.stringify;b.parse=b.JSON.parse;}
});}
)();
(function(){var a="qx.event.IEventHandler";qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:4,TARGET_DOCUMENT:8},members:{canHandleEvent:function(b,c){}
,registerEvent:function(d,e,f){}
,unregisterEvent:function(g,h,i){}
}});}
)();
(function(){var c="qx.event.Registration";qx.Class.define(c,{statics:{__cK:{},getManager:function(d){if(d==null){{}
;d=window;}
else if(d.nodeType){d=qx.dom.Node.getWindow(d);}
else if(!qx.dom.Node.isWindow(d)){d=window;}
;;var f=d.$$hash||qx.core.ObjectRegistry.toHashCode(d);var e=this.__cK[f];if(!e){e=new qx.event.Manager(d,this);this.__cK[f]=e;}
;return e;}
,removeManager:function(g){var h=g.getWindowId();delete this.__cK[h];}
,addListener:function(i,j,k,self,l){return this.getManager(i).addListener(i,j,k,self,l);}
,removeListener:function(m,n,o,self,p){return this.getManager(m).removeListener(m,n,o,self,p);}
,removeListenerById:function(q,r){return this.getManager(q).removeListenerById(q,r);}
,removeAllListeners:function(s){return this.getManager(s).removeAllListeners(s);}
,deleteAllListeners:function(t){var u=t.$$hash;if(u){this.getManager(t).deleteAllListeners(u);}
;}
,hasListener:function(v,w,x){return this.getManager(v).hasListener(v,w,x);}
,serializeListeners:function(y){return this.getManager(y).serializeListeners(y);}
,createEvent:function(z,A,B){{}
;if(A==null){A=qx.event.type.Event;}
;var C=qx.event.Pool.getInstance().getObject(A);B?C.init.apply(C,B):C.init();if(z){C.setType(z);}
;return C;}
,dispatchEvent:function(D,event){return this.getManager(D).dispatchEvent(D,event);}
,fireEvent:function(E,F,G,H){var I;{}
;var J=this.createEvent(F,G||null,H);return this.getManager(E).dispatchEvent(E,J);}
,fireNonBubblingEvent:function(K,L,M,N){{}
;var O=this.getManager(K);if(!O.hasListener(K,L,false)){return true;}
;var P=this.createEvent(L,M||null,N);return O.dispatchEvent(K,P);}
,PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__ci:[],addHandler:function(Q){{}
;this.__ci.push(Q);this.__ci.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getHandlers:function(){return this.__ci;}
,__cj:[],addDispatcher:function(R,S){{}
;this.__cj.push(R);this.__cj.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getDispatchers:function(){return this.__cj;}
}});}
)();
(function(){var a="qx.core.MEvents";qx.Mixin.define(a,{members:{__cL:qx.event.Registration,addListener:function(b,c,self,d){if(!this.$$disposed){return this.__cL.addListener(this,b,c,self,d);}
;return null;}
,addListenerOnce:function(f,g,self,h){var i=function(e){this.removeListener(f,i,this,h);g.call(self||this,e);}
;return this.addListener(f,i,this,h);}
,removeListener:function(j,k,self,l){if(!this.$$disposed){return this.__cL.removeListener(this,j,k,self,l);}
;return false;}
,removeListenerById:function(m){if(!this.$$disposed){return this.__cL.removeListenerById(this,m);}
;return false;}
,hasListener:function(n,o){return this.__cL.hasListener(this,n,o);}
,dispatchEvent:function(p){if(!this.$$disposed){return this.__cL.dispatchEvent(this,p);}
;return true;}
,fireEvent:function(q,r,s){if(!this.$$disposed){return this.__cL.fireEvent(this,q,r,s);}
;return true;}
,fireNonBubblingEvent:function(t,u,v){if(!this.$$disposed){return this.__cL.fireNonBubblingEvent(this,t,u,v);}
;return true;}
,fireDataEvent:function(w,x,y,z){if(!this.$$disposed){if(y===undefined){y=null;}
;return this.__cL.fireNonBubblingEvent(this,w,qx.event.type.Data,[x,y,!!z]);}
;return true;}
}});}
)();
(function(){var a="qx.event.IEventDispatcher";qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);this.assertString(c);}
,dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);this.assertString(e);}
}});}
)();
(function(){var k="module.events",j="Cloning only possible with properties.",h="qx.core.Object",g="[",f="$$user_",e="]",d="rv:1.8.1",c="MSIE 6.0",b="Object",a="module.property";qx.Class.define(h,{extend:Object,include:qx.core.Environment.filter({"module.databinding":qx.data.MBinding,"module.logger":qx.core.MLogging,"module.events":qx.core.MEvents,"module.property":qx.core.MProperty}),construct:function(){qx.core.ObjectRegistry.register(this);}
,statics:{$$type:b},members:{__M:qx.core.Environment.get("module.property")?qx.core.Property:null,toHashCode:function(){return this.$$hash;}
,toString:function(){return this.classname+g+this.$$hash+e;}
,base:function(m,n){{}
;if(arguments.length===1){return m.callee.base.call(this);}
else {return m.callee.base.apply(this,Array.prototype.slice.call(arguments,1));}
;}
,self:function(o){return o.callee.self;}
,clone:function(){if(!qx.core.Environment.get(a)){throw new Error(j);}
;var q=this.constructor;var p=new q;var s=qx.Class.getProperties(q);var r=this.__M.$$store.user;var t=this.__M.$$method.set;var name;for(var i=0,l=s.length;i<l;i++){name=s[i];if(this.hasOwnProperty(r[name])){p[t[name]](this[r[name]]);}
;}
;return p;}
,__cM:null,setUserData:function(u,v){if(!this.__cM){this.__cM={};}
;this.__cM[u]=v;}
,getUserData:function(w){if(!this.__cM){return null;}
;var x=this.__cM[w];return x===undefined?null:x;}
,isDisposed:function(){return this.$$disposed||false;}
,dispose:function(){var C,A,z,D;if(this.$$disposed){return;}
;this.$$disposed=true;this.$$instance=null;this.$$allowconstruct=null;{}
;var B=this.constructor;var y;while(B.superclass){if(B.$$destructor){B.$$destructor.call(this);}
;if(B.$$includes){y=B.$$flatIncludes;for(var i=0,l=y.length;i<l;i++){if(y[i].$$destructor){y[i].$$destructor.call(this);}
;}
;}
;B=B.superclass;}
;if(this.__cN){this.__cN();}
;{}
;}
,__cN:null,__cO:function(){var E=qx.Class.getProperties(this.constructor);for(var i=0,l=E.length;i<l;i++){delete this[f+E[i]];}
;}
,_disposeObjects:function(F){qx.util.DisposeUtil.disposeObjects(this,arguments);}
,_disposeSingletonObjects:function(G){qx.util.DisposeUtil.disposeObjects(this,arguments,true);}
,_disposeArray:function(H){qx.util.DisposeUtil.disposeArray(this,H);}
,_disposeMap:function(I){qx.util.DisposeUtil.disposeMap(this,I);}
},environment:{"qx.debug.dispose.level":0},defer:function(J,K){var M=navigator.userAgent.indexOf(c)!=-1;var L=navigator.userAgent.indexOf(d)!=-1;if(M||L){K.__cN=K.__cO;}
;}
,destruct:function(){if(qx.core.Environment.get(k)){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);}
else {qx.event.Registration.deleteAllListeners(this);}
;}
;qx.core.ObjectRegistry.unregister(this);this.__cM=null;if(qx.core.Environment.get(a)){var P=this.constructor;var T;var U=this.__M.$$store;var R=U.user;var S=U.theme;var N=U.inherit;var Q=U.useinit;var O=U.init;while(P){T=P.$$properties;if(T){for(var name in T){if(T[name].dereference){this[R[name]]=this[S[name]]=this[N[name]]=this[Q[name]]=this[O[name]]=undefined;}
;}
;}
;P=P.superclass;}
;}
;}
});}
)();
(function(){var k=" is a singleton! Please use disposeSingleton instead.",j="undefined",h="qx.util.DisposeUtil",g="!",f="The map field: ",e="The array field: ",d="The object stored in key ",c="Has no disposable object under key: ",b=" of object: ",a=" has non disposable entries: ";qx.Class.define(h,{statics:{disposeObjects:function(m,n,o){var name;for(var i=0,l=n.length;i<l;i++){name=n[i];if(m[name]==null||!m.hasOwnProperty(name)){continue;}
;if(!qx.core.ObjectRegistry.inShutDown){if(m[name].dispose){if(!o&&m[name].constructor.$$instance){throw new Error(d+name+k);}
else {m[name].dispose();}
;}
else {throw new Error(c+name+g);}
;}
;m[name]=null;}
;}
,disposeArray:function(p,q){var s=p[q];if(!s){return;}
;if(qx.core.ObjectRegistry.inShutDown){p[q]=null;return;}
;try{var r;for(var i=s.length-1;i>=0;i--){r=s[i];if(r){r.dispose();}
;}
;}
catch(t){throw new Error(e+q+b+p+a+t);}
;s.length=0;p[q]=null;}
,disposeMap:function(u,v){var x=u[v];if(!x){return;}
;if(qx.core.ObjectRegistry.inShutDown){u[v]=null;return;}
;try{var w;for(var y in x){w=x[y];if(x.hasOwnProperty(y)&&w){w.dispose();}
;}
;}
catch(z){throw new Error(f+v+b+u+a+z);}
;u[v]=null;}
,disposeTriggeredBy:function(A,B){var C=B.dispose;B.dispose=function(){C.call(B);A.dispose();}
;}
,destroyContainer:function(D){{}
;var E=[];this._collectContainerChildren(D,E);var F=E.length;for(var i=F-1;i>=0;i--){E[i].destroy();}
;D.destroy();}
,_collectContainerChildren:function(G,H){var J=G.getChildren();for(var i=0;i<J.length;i++){var I=J[i];H.push(I);if(this.__cP(I)){this._collectContainerChildren(I,H);}
;}
;}
,__cP:function(K){var L=[qx.ui.container.Composite,qx.ui.container.Scroll,qx.ui.container.SlideBar,qx.ui.container.Stack];for(var i=0,l=L.length;i<l;i++){if(typeof L[i]!==j&&qx.Class.isSubClassOf(K.constructor,L[i])){return true;}
;}
;return false;}
}});}
)();
(function(){var a="qx.event.type.Event";qx.Class.define(a,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(b,c){{}
;this._type=null;this._target=null;this._currentTarget=null;this._relatedTarget=null;this._originalTarget=null;this._stopPropagation=false;this._preventDefault=false;this._bubbles=!!b;this._cancelable=!!c;this._timeStamp=(new Date()).getTime();this._eventPhase=null;return this;}
,clone:function(d){if(d){var e=d;}
else {var e=qx.event.Pool.getInstance().getObject(this.constructor);}
;e._type=this._type;e._target=this._target;e._currentTarget=this._currentTarget;e._relatedTarget=this._relatedTarget;e._originalTarget=this._originalTarget;e._stopPropagation=this._stopPropagation;e._bubbles=this._bubbles;e._preventDefault=this._preventDefault;e._cancelable=this._cancelable;return e;}
,stop:function(){if(this._bubbles){this.stopPropagation();}
;if(this._cancelable){this.preventDefault();}
;}
,stopPropagation:function(){{}
;this._stopPropagation=true;}
,getPropagationStopped:function(){return !!this._stopPropagation;}
,preventDefault:function(){{}
;this._preventDefault=true;}
,getDefaultPrevented:function(){return !!this._preventDefault;}
,getType:function(){return this._type;}
,setType:function(f){this._type=f;}
,getEventPhase:function(){return this._eventPhase;}
,setEventPhase:function(g){this._eventPhase=g;}
,getTimeStamp:function(){return this._timeStamp;}
,getTarget:function(){return this._target;}
,setTarget:function(h){this._target=h;}
,getCurrentTarget:function(){return this._currentTarget||this._target;}
,setCurrentTarget:function(i){this._currentTarget=i;}
,getRelatedTarget:function(){return this._relatedTarget;}
,setRelatedTarget:function(j){this._relatedTarget=j;}
,getOriginalTarget:function(){return this._originalTarget;}
,setOriginalTarget:function(k){this._originalTarget=k;}
,getBubbles:function(){return this._bubbles;}
,setBubbles:function(l){this._bubbles=l;}
,isCancelable:function(){return this._cancelable;}
,setCancelable:function(m){this._cancelable=m;}
},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;}
});}
)();
(function(){var d="qx.util.ObjectPool",c="Class needs to be defined!",b="Object is already pooled: ",a="Integer";qx.Class.define(d,{extend:qx.core.Object,construct:function(e){qx.core.Object.call(this);this.__cQ={};if(e!=null){this.setSize(e);}
;}
,properties:{size:{check:a,init:Infinity}},members:{__cQ:null,getObject:function(f){if(this.$$disposed){return new f;}
;if(!f){throw new Error(c);}
;var g=null;var h=this.__cQ[f.classname];if(h){g=h.pop();}
;if(g){g.$$pooled=false;}
else {g=new f;}
;return g;}
,poolObject:function(j){if(!this.__cQ){return;}
;var k=j.classname;var m=this.__cQ[k];if(j.$$pooled){throw new Error(b+j);}
;if(!m){this.__cQ[k]=m=[];}
;if(m.length>this.getSize()){if(j.destroy){j.destroy();}
else {j.dispose();}
;return;}
;j.$$pooled=true;m.push(j);}
},destruct:function(){var p=this.__cQ;var n,o,i,l;for(n in p){o=p[n];for(i=0,l=o.length;i<l;i++){o[i].dispose();}
;}
;delete this.__cQ;}
});}
)();
(function(){var b="singleton",a="qx.event.Pool";qx.Class.define(a,{extend:qx.util.ObjectPool,type:b,construct:function(){qx.util.ObjectPool.call(this,30);}
});}
)();
(function(){var a="qx.event.dispatch.Direct";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(b){this._manager=b;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(c,event,d){return !event.getBubbles();}
,dispatchEvent:function(e,event,f){var j,g;{}
;event.setEventPhase(qx.event.type.Event.AT_TARGET);var k=this._manager.getListeners(e,f,false);if(k){for(var i=0,l=k.length;i<l;i++){var h=k[i].context||e;{}
;k[i].handler.call(h,event);}
;}
;}
},defer:function(m){qx.event.Registration.addDispatcher(m);}
});}
)();
(function(){var a="qx.event.handler.Object";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(b,c){return qx.Class.supportsEvent(b.constructor,c);}
,registerEvent:function(d,e,f){}
,unregisterEvent:function(g,h,i){}
},defer:function(j){qx.event.Registration.addHandler(j);}
});}
)();
(function(){var a="qx.event.type.Data";qx.Class.define(a,{extend:qx.event.type.Event,members:{__cR:null,__cS:null,init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,false,d);this.__cR=b;this.__cS=c;return this;}
,clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);f.__cR=this.__cR;f.__cS=this.__cS;return f;}
,getData:function(){return this.__cR;}
,getOldData:function(){return this.__cS;}
},destruct:function(){this.__cR=this.__cS=null;}
});}
)();
(function(){var o="qx.dev.unit.TestSuite",n="__unknown_class__",m="Stack trace: ",l="error",k="\n",h="qx.dev.unit.MTestLoader",g="' had an error: ",f=" - ",d="The test '",c="failure",a="' failed: ",b="Test '";qx.Mixin.define(h,{properties:{suite:{check:o}},members:{_getClassNameFromUrl:function(){var q=window.location.search;var p=q.match(/[\?&]testclass=([A-Za-z0-9_\.]+)/);if(p){p=p[1];}
else {p=n;}
;return p;}
,setTestNamespace:function(r){var s=new qx.dev.unit.TestSuite();s.add(r);this.setSuite(s);}
,runJsUnit:function(){var t=new qx.dev.unit.JsUnitTestResult();this.getSuite().run(t);t.exportToJsUnit();}
,runStandAlone:function(){var u=new qx.dev.unit.TestResult();u.addListener(c,function(e){var w=e.getData()[0].exception;var v=e.getData()[0].test;this.error(b+v.getFullName()+a+w.message+f+w.getComment());if(w.getStackTrace){this.error(m+w.getStackTrace().join(k));}
;}
,this);u.addListener(l,function(e){var y=e.getData()[0].exception;var x=e.getData()[0].test;this.error(d+x.getFullName()+g+y,y);}
,this);this.getSuite().run(u);}
,getTestDescriptions:function(){var C=[];var B=this.getSuite().getTestClasses();for(var i=0;i<B.length;i++){var D=B[i];var z={};z.classname=D.getName();z.tests=[];var A=D.getTestMethods();for(var j=0;j<A.length;j++){z.tests.push(A[j].getName());}
;C.push(z);}
;return qx.lang.Json.stringify(C);}
,runTests:function(E,F,G){var H=this.getSuite().getTestClasses();for(var i=0;i<H.length;i++){if(F==H[i].getName()){var I=H[i].getTestMethods();for(var j=0;j<I.length;j++){if(G&&I[j].getName()!=G){continue;}
;I[j].run(E);}
;return;}
;}
;}
,runTestsFromNamespace:function(J,K){var L=this.getSuite().getTestClasses();for(var i=0;i<L.length;i++){if(L[i].getName().indexOf(K)==0){L[i].run(J);}
;}
;}
}});}
)();
(function(){var c="qx.dev.unit.AbstractTestSuite",b="abstract",a="_tests";qx.Class.define(c,{extend:qx.core.Object,type:b,construct:function(){qx.core.Object.call(this);this._tests=[];}
,members:{_tests:null,addTestFunction:function(name,d){this._tests.push(new qx.dev.unit.TestFunction(null,name,d));}
,addTestMethod:function(e,f){this._tests.push(new qx.dev.unit.TestFunction(e,f));}
,addFail:function(g,h){this.addTestFunction(g,function(){this.fail(h);}
);}
,run:function(j){for(var i=0;i<this._tests.length;i++){(this._tests[i]).run(j);}
;}
,getTestMethods:function(){var l=[];for(var i=0;i<this._tests.length;i++){var k=this._tests[i];if(k instanceof qx.dev.unit.TestFunction){l.push(k);}
;}
;return l;}
},destruct:function(){this._disposeArray(a);}
});}
)();
(function(){var f="qx.dev.unit.TestFunction",e="Function",d="",c=":",b="qx.dev.unit.TestCase",a="String";qx.Class.define(f,{extend:qx.core.Object,construct:function(g,h,i){if(i){this.setTestFunction(i);}
;if(g){this.setClassName(g.classname);this.setTestClass(g);}
;this.setName(h);}
,properties:{testFunction:{check:e},name:{check:a},className:{check:a,init:d},testClass:{check:b,init:null}},members:{run:function(j){var k=this.getTestClass();var l=this.getName();var m=this;j.run(this,function(){k.setTestFunc(m);k.setTestResult(j);try{k[l]();}
catch(n){throw n;}
;}
);}
,setUp:function(){var o=this.getTestClass();if(qx.lang.Type.isFunction(o.setUp)){o.setUp();}
;}
,tearDown:function(){var p=this.getTestClass();if(qx.lang.Type.isFunction(p.tearDown)){p.tearDown();}
;}
,getFullName:function(){return [this.getClassName(),this.getName()].join(c);}
}});}
)();
(function(){var g="'!",f="qx.dev.unit.TestSuite",e="' is undefined!",d="abstract",c="existsCheck",b="Unknown test class '",a="The class/namespace '";qx.Class.define(f,{extend:qx.dev.unit.AbstractTestSuite,construct:function(h){qx.dev.unit.AbstractTestSuite.call(this);this._tests=[];if(h){this.add(h);}
;}
,members:{add:function(j){if(qx.lang.Type.isString(j)){var k=eval(j);if(!k){this.addFail(j,a+j+e);}
;j=k;}
;if(qx.lang.Type.isFunction(j)){this.addTestClass(j);}
else if(qx.lang.Type.isObject(j)){this.addTestNamespace(j);}
else {this.addFail(c,b+j+g);return;}
;}
,addTestNamespace:function(l){if(qx.lang.Type.isFunction(l)&&l.classname){if(qx.Class.isSubClassOf(l,qx.dev.unit.TestCase)){if(l.$$classtype!==d){this.addTestClass(l);}
;return;}
;}
else if(qx.lang.Type.isObject(l)&&!(l instanceof Array)){for(var m in l){this.addTestNamespace(l[m]);}
;}
;}
,addTestClass:function(n){this._tests.push(new qx.dev.unit.TestClass(n));}
,getTestClasses:function(){var p=[];for(var i=0;i<this._tests.length;i++){var o=this._tests[i];if(o instanceof qx.dev.unit.TestClass){p.push(o);}
;}
;return p;}
}});}
)();
(function(){var a="qx.core.MAssert";qx.Mixin.define(a,{members:{assert:function(b,c){qx.core.Assert.assert(b,c);}
,fail:function(d,e){qx.core.Assert.fail(d,e);}
,assertTrue:function(f,g){qx.core.Assert.assertTrue(f,g);}
,assertFalse:function(h,i){qx.core.Assert.assertFalse(h,i);}
,assertEquals:function(j,k,l){qx.core.Assert.assertEquals(j,k,l);}
,assertNotEquals:function(m,n,o){qx.core.Assert.assertNotEquals(m,n,o);}
,assertIdentical:function(p,q,r){qx.core.Assert.assertIdentical(p,q,r);}
,assertNotIdentical:function(s,t,u){qx.core.Assert.assertNotIdentical(s,t,u);}
,assertNotUndefined:function(v,w){qx.core.Assert.assertNotUndefined(v,w);}
,assertUndefined:function(x,y){qx.core.Assert.assertUndefined(x,y);}
,assertNotNull:function(z,A){qx.core.Assert.assertNotNull(z,A);}
,assertNull:function(B,C){qx.core.Assert.assertNull(B,C);}
,assertJsonEquals:function(D,E,F){qx.core.Assert.assertJsonEquals(D,E,F);}
,assertMatch:function(G,H,I){qx.core.Assert.assertMatch(G,H,I);}
,assertArgumentsCount:function(J,K,L,M){qx.core.Assert.assertArgumentsCount(J,K,L,M);}
,assertEventFired:function(N,event,O,P,Q){qx.core.Assert.assertEventFired(N,event,O,P,Q);}
,assertEventNotFired:function(R,event,S,T){qx.core.Assert.assertEventNotFired(R,event,S,T);}
,assertException:function(U,V,W,X){qx.core.Assert.assertException(U,V,W,X);}
,assertInArray:function(Y,ba,bb){qx.core.Assert.assertInArray(Y,ba,bb);}
,assertArrayEquals:function(bc,bd,be){qx.core.Assert.assertArrayEquals(bc,bd,be);}
,assertKeyInMap:function(bf,bg,bh){qx.core.Assert.assertKeyInMap(bf,bg,bh);}
,assertFunction:function(bi,bj){qx.core.Assert.assertFunction(bi,bj);}
,assertString:function(bk,bl){qx.core.Assert.assertString(bk,bl);}
,assertBoolean:function(bm,bn){qx.core.Assert.assertBoolean(bm,bn);}
,assertNumber:function(bo,bp){qx.core.Assert.assertNumber(bo,bp);}
,assertPositiveNumber:function(bq,br){qx.core.Assert.assertPositiveNumber(bq,br);}
,assertInteger:function(bs,bt){qx.core.Assert.assertInteger(bs,bt);}
,assertPositiveInteger:function(bu,bv){qx.core.Assert.assertPositiveInteger(bu,bv);}
,assertInRange:function(bw,bx,by,bz){qx.core.Assert.assertInRange(bw,bx,by,bz);}
,assertObject:function(bA,bB){qx.core.Assert.assertObject(bA,bB);}
,assertArray:function(bC,bD){qx.core.Assert.assertArray(bC,bD);}
,assertMap:function(bE,bF){qx.core.Assert.assertMap(bE,bF);}
,assertRegExp:function(bG,bH){qx.core.Assert.assertRegExp(bG,bH);}
,assertType:function(bI,bJ,bK){qx.core.Assert.assertType(bI,bJ,bK);}
,assertInstance:function(bL,bM,bN){qx.core.Assert.assertInstance(bL,bM,bN);}
,assertInterface:function(bO,bP,bQ){qx.core.Assert.assertInterface(bO,bP,bQ);}
,assertCssColor:function(bR,bS,bT){qx.core.Assert.assertCssColor(bR,bS,bT);}
,assertElement:function(bU,bV){qx.core.Assert.assertElement(bU,bV);}
,assertQxObject:function(bW,bX){qx.core.Assert.assertQxObject(bW,bX);}
,assertQxWidget:function(bY,ca){qx.core.Assert.assertQxWidget(bY,ca);}
}});}
)();
(function(){var c="qx.dev.unit.TestCase",b="Called skip()",a="qx.event.type.Data";qx.Class.define(c,{extend:qx.core.Object,include:[qx.core.MAssert],events:{assertionFailed:a},properties:{testResult:{init:null},testFunc:{init:null}},members:{isDebugOn:function(){return false;}
,wait:function(d,e,f){throw new qx.dev.unit.AsyncWrapper(d,e,f);}
,resume:function(g,self){this.getTestResult().run(this.getTestFunc(),g||qx.lang.Function.empty,self||this,true);}
,skip:function(h){throw new qx.dev.unit.RequirementError(null,h||b);}
}});}
)();
(function(){var d="Function",c="qx.dev.unit.AsyncWrapper",b="Integer",a="Object";qx.Class.define(c,{extend:qx.core.Object,construct:function(e,f,g){for(var i=0;i<2;i++){if(qx.lang.Type.isFunction(arguments[i])){this.setDeferredFunction(arguments[i]);}
else if(qx.lang.Type.isNumber(arguments[i])){this.setDelay(arguments[i]);}
;}
;if(g){this.setContext(g);}
;}
,properties:{deferredFunction:{check:d,init:false},context:{check:a,init:null},delay:{check:b,nullable:false,init:5000}}});}
)();
(function(){var c=": ",b="qx.dev.unit.RequirementError",a="Requirement not met";qx.Class.define(b,{extend:Error,construct:function(d,e){this.__lv=e||a;this.__lw=d;var f=Error.call(this,this.__lv);if(f.stack){this.stack=f.stack;}
;if(f.stacktrace){this.stacktrace=f.stacktrace;}
;}
,members:{__lv:null,__lw:null,getRequirement:function(){return this.__lw;}
,toString:function(){var g=this.__lv;if(this.__lw){g+=c+this.__lw;}
;return g;}
}});}
)();
(function(){var h="existsCheck",g="test",f="Unknown test class!",e="Sub class check.",d="String",c="'is not a sub class of 'qx.dev.unit.TestCase'",b="The test class '",a="qx.dev.unit.TestClass";qx.Class.define(a,{extend:qx.dev.unit.AbstractTestSuite,construct:function(i){qx.dev.unit.AbstractTestSuite.call(this);if(!i){this.addFail(h,f);return;}
;if(!qx.Class.isSubClassOf(i,qx.dev.unit.TestCase)){this.addFail(e,b+i.classname+c);return;}
;var l=i.prototype;var j=new i;for(var k in l){if(qx.lang.Type.isFunction(l[k])&&k.indexOf(g)==0){this.addTestMethod(j,k);}
;}
;this.setName(i.classname);}
,properties:{name:{check:d}}});}
)();
(function(){var k="Error in asynchronous test",j=": ",h="Asynchronous Test Error",g="tearDown",f="setUp failed",e="wait",d="tearDown failed: ",c="qx.dev.unit.TestResult",b="resume() called before wait()",a="qx.core.AssertionError",E="Undisposed object in ",D="setUp failed: ",C="tearDown failed",B="]",A="endMeasurement",z="[",y="Timeout reached before resume() was called.",x="startTest",w="qx.debug.dispose",v="testrunner.unit",s="assertionFailed",t="skip",q="qx.dev.unit.RequirementError",r="failed",o="\n",p="error",m="failure",n="qx.event.type.Data",u="endTest";qx.Class.define(c,{extend:qx.core.Object,events:{startTest:n,endTest:n,error:n,failure:n,wait:n,skip:n,endMeasurement:n},statics:{run:function(F,G,H){F.run(G,H);}
},members:{_timeout:null,run:function(I,J,self,K){if(!this._timeout){this._timeout={};}
;var M=I.getTestClass();if(!M.hasListener(s)){M.addListener(s,function(S){var T=[{exception:S.getData(),test:I}];this.fireDataEvent(m,T);}
,this);}
;if(K&&!this._timeout[I.getFullName()]){this._timeout[I.getFullName()]=r;var N=new qx.type.BaseError(k,b);this._createError(m,[N],I);this.fireDataEvent(u,I);return;}
;this.fireDataEvent(x,I);if(qx.core.Environment.get(w)){qx.dev.Debug.startDisposeProfiling();}
;if(this._timeout[I.getFullName()]){if(this._timeout[I.getFullName()]!==r){this._timeout[I.getFullName()].stop();this._timeout[I.getFullName()].dispose();}
;delete this._timeout[I.getFullName()];}
else {try{I.setUp();}
catch(U){try{this.tearDown(I);}
catch(V){}
;if(U.classname==q){this._createError(t,[U],I);this.fireDataEvent(u,I);}
else {if(U instanceof qx.type.BaseError&&U.message==qx.type.BaseError.DEFAULTMESSAGE){U.message=f;}
else {U.message=D+U.message;}
;this._createError(p,[U],I);this.fireDataEvent(u,I);}
;return;}
;}
;try{J.call(self||window);}
catch(W){var P=true;if(W instanceof qx.dev.unit.AsyncWrapper){if(this._timeout[I.getFullName()]){return;}
;if(W.getDelay()){var L=this;var R=function(){throw new qx.core.AssertionError(h,y);}
;var Q=(W.getDeferredFunction()?W.getDeferredFunction():R);var O=(W.getContext()?W.getContext():window);this._timeout[I.getFullName()]=qx.event.Timer.once(function(){this.run(I,Q,O);}
,L,W.getDelay());this.fireDataEvent(e,I);}
;}
else if(W instanceof qx.dev.unit.MeasurementResult){P=false;this._createError(A,[W],I);}
else {try{this.tearDown(I);}
catch(X){}
;if(W.classname==a){this._createError(m,[W],I);this.fireDataEvent(u,I);}
else if(W.classname==q){this._createError(t,[W],I);this.fireDataEvent(u,I);}
else {this._createError(p,[W],I);this.fireDataEvent(u,I);}
;}
;}
;if(!P){try{this.tearDown(I);this.fireDataEvent(u,I);}
catch(Y){if(Y instanceof qx.type.BaseError&&Y.message==qx.type.BaseError.DEFAULTMESSAGE){Y.message=C;}
else {Y.message=d+Y.message;}
;this._createError(p,[Y],I);this.fireDataEvent(u,I);}
;}
;}
,_createError:function(ba,bb,bc){var bd=[];for(var i=0,l=bb.length;i<l;i++){bd.push({exception:bb[i],test:bc});}
;this.fireDataEvent(ba,bd);}
,__lx:function(be){be._addedListeners=[];if(!qx.event.Registration.addListenerOriginal){qx.event.Registration.addListenerOriginal=qx.event.Registration.addListener;qx.event.Registration.addListener=function(bf,bg,bh,self,bi){var bj=qx.event.Registration.addListenerOriginal(bf,bg,bh,self,bi);var bk=true;if((bf.classname&&bf.classname.indexOf(v)==0)||(self&&self.classname&&self.classname.indexOf(v)==0)){bk=false;}
;if(bk){be._addedListeners.push([bf,bj]);}
;return bj;}
;}
;}
,__ly:function(bl){if(bl._addedListeners){var bm=bl._addedListeners;for(var i=0,l=bm.length;i<l;i++){var bo=bm[i][0];var bn=bm[i][1];try{qx.event.Registration.removeListenerById(bo,bn);}
catch(bp){}
;}
;}
;}
,tearDown:function(bq){bq.tearDown();var bu=bq.getTestClass();var bs=g+qx.lang.String.firstUp(bq.getName());if(bu[bs]){bu[bs]();}
;if(qx.core.Environment.get(w)&&qx.dev.Debug.disposeProfilingActive){var bv=bq.getFullName();var bt=qx.dev.Debug.stopDisposeProfiling();for(var i=0;i<bt.length;i++){var br;if(bt[i].stackTrace){br=bt[i].stackTrace.join(o);}
;window.top.qx.log.Logger.warn(E+bv+j+bt[i].object.classname+z+bt[i].object.toHashCode()+B+o+br);}
;}
;}
},destruct:function(){this._timeout=null;}
});}
)();
(function(){var m=") ***",l="\r\n",k="px;'>",h="): ",g="function",f="</span><br>",d="*** EXCEPTION (",c="============================================================",b="Object",a="<br>",M="null",L="Array",K="Call ",J="members",I="statics",H="get",G="qx.dev.Debug",F=": EXCEPTION expanding property",E=".startDisposeProfiling first.",D="\n",t="*** TOO MUCH RECURSION: not displaying ***",u="Object, count=",r="  ",s="<span style='padding-left:",p=" ",q="------------------------------------------------------------",n="Array, length=",o="undefined",v="index(",w="-",y="qx.debug.dispose",x=":",A="construct",z="object",C="",B=": ";qx.Class.define(G,{statics:{disposeProfilingActive:false,debugObject:function(N,O,P){qx.log.Logger.debug(this,qx.dev.Debug.debugObjectToString(N,O,P,false));}
,debugObjectToString:function(Q,R,S,T){if(!S){S=10;}
;var ba=(T?f:D);var W=function(bb){var bc;if(!T){bc=C;for(var i=0;i<bb;i++){bc+=r;}
;}
else {bc=s+(bb*8)+k;}
;return bc;}
;var Y=C;var V=function(bd,be,bf){if(be>bf){Y+=(W(be)+t+ba);return;}
;if(typeof (bd)!=z){Y+=W(be)+bd+ba;return;}
;for(var bg in bd){if(typeof (bd[bg])==z){try{if(bd[bg] instanceof Array){Y+=W(be)+bg+B+L+ba;}
else if(bd[bg]===null){Y+=W(be)+bg+B+M+ba;continue;}
else if(bd[bg]===undefined){Y+=W(be)+bg+B+o+ba;continue;}
else {Y+=W(be)+bg+B+b+ba;}
;;V(bd[bg],be+1,bf);}
catch(e){Y+=W(be)+bg+F+ba;}
;}
else {Y+=W(be)+bg+B+bd[bg]+ba;}
;}
;}
;if(R){Y+=W(0)+R+ba;}
;if(Q instanceof Array){Y+=W(0)+n+Q.length+x+ba;}
else if(typeof (Q)==z){var U=0;for(var X in Q){U++;}
;Y+=W(0)+u+U+x+ba;}
;Y+=W(0)+q+ba;try{V(Q,0,S);}
catch(bh){Y+=W(0)+d+bh+m+ba;}
;Y+=W(0)+c+ba;return Y;}
,getFunctionName:function(bi,bj){var bk=bi.self;if(!bk){return null;}
;while(bi.wrapper){bi=bi.wrapper;}
;switch(bj){case A:return bi==bk?A:null;case J:return qx.lang.Object.getKeyFromValue(bk,bi);case I:return qx.lang.Object.getKeyFromValue(bk.prototype,bi);default:if(bi==bk){return A;}
;return (qx.lang.Object.getKeyFromValue(bk.prototype,bi)||qx.lang.Object.getKeyFromValue(bk,bi)||null);};}
,debugProperties:function(bl,bm,bn,bo){if(bm==null){bm=10;}
;if(bo==null){bo=1;}
;var bp=C;bn?bp=a:bp=l;var br=C;if(qx.lang.Type.isNumber(bl)||qx.lang.Type.isString(bl)||qx.lang.Type.isBoolean(bl)||bl==null||bm<=0){return bl;}
else if(qx.Class.hasInterface(bl.constructor,qx.data.IListData)){for(var i=0;i<bl.length;i++){for(var j=0;j<bo;j++){br+=w;}
;br+=v+i+h+this.debugProperties(bl.getItem(i),bm-1,bn,bo+1)+bp;}
;return br+bp;}
else if(bl.constructor!=null){var bs=bl.constructor.$$properties;for(var bq in bs){br+=bp;for(var j=0;j<bo;j++){br+=w;}
;br+=p+bq+B+this.debugProperties(bl[H+qx.lang.String.firstUp(bq)](),bm-1,bn,bo+1);}
;return br;}
;;return C;}
,startDisposeProfiling:qx.core.Environment.select(y,{"true":function(){this.disposeProfilingActive=true;this.__lz=qx.core.ObjectRegistry.getNextHash();}
,"default":qx.lang.Function.empty}),stopDisposeProfiling:qx.core.Environment.select(y,{"true":function(bt){if(!this.__lz){qx.log.Logger.error(K+this.classname+E);return [];}
;this.disposeProfilingActive=false;var bv=[];while(!qx.ui.core.queue.Dispose.isEmpty()){qx.ui.core.queue.Dispose.flush();}
;var bw=qx.core.ObjectRegistry.getNextHash();var by=qx.core.ObjectRegistry.getPostId();var bz=qx.core.ObjectRegistry.getStackTraces();for(var bu=this.__lz;bu<bw;bu++){var bx=qx.core.ObjectRegistry.fromHashCode(bu+by);if(bx&&bx.isDisposed&&!bx.isDisposed()){if(bt&&typeof bt==g&&!bt(bx)){continue;}
;if(bx.constructor.$$instance===bx){continue;}
;if(qx.Class.implementsInterface(bx,qx.event.IEventHandler)){continue;}
;if(bx.$$pooled){continue;}
;if(qx.Class.implementsInterface(bx,qx.ui.decoration.IDecorator)&&qx.theme.manager.Decoration.getInstance().isCached(bx)){continue;}
;if(bx.$$ignoreDisposeWarning){continue;}
;if(bx instanceof qx.bom.Font&&qx.theme.manager.Font.getInstance().isDynamic(bx)){continue;}
;bv.push({object:bx,stackTrace:bz[bu+by]?bz[bu+by]:null});}
;}
;delete this.__lz;return bv;}
,"default":qx.lang.Function.empty})}});}
)();
(function(){var d="&",c="qx.lang.Object",b="=",a="+";qx.Bootstrap.define(c,{statics:{empty:function(e){{}
;for(var f in e){if(e.hasOwnProperty(f)){delete e[f];}
;}
;}
,isEmpty:function(g){{}
;for(var h in g){return false;}
;return true;}
,hasMinLength:function(j,k){{}
;if(k<=0){return true;}
;var length=0;for(var m in j){if((++length)>=k){return true;}
;}
;return false;}
,getLength:qx.Bootstrap.objectGetLength,getKeys:qx.Bootstrap.getKeys,getKeysAsString:qx.Bootstrap.getKeysAsString,getValues:function(n){{}
;var p=[];var o=this.getKeys(n);for(var i=0,l=o.length;i<l;i++){p.push(n[o[i]]);}
;return p;}
,mergeWith:qx.Bootstrap.objectMergeWith,carefullyMergeWith:function(q,r){{}
;return qx.lang.Object.mergeWith(q,r,false);}
,merge:function(s,t){{}
;var u=arguments.length;for(var i=1;i<u;i++){qx.lang.Object.mergeWith(s,arguments[i]);}
;return s;}
,clone:function(v,w){if(qx.lang.Type.isObject(v)){var x={};for(var y in v){if(w){x[y]=qx.lang.Object.clone(v[y],w);}
else {x[y]=v[y];}
;}
;return x;}
else if(qx.lang.Type.isArray(v)){var x=[];for(var i=0;i<v.length;i++){if(w){x[i]=qx.lang.Object.clone(v[i]);}
else {x[i]=v[i];}
;}
;return x;}
;return v;}
,invert:function(z){{}
;var A={};for(var B in z){A[z[B].toString()]=B;}
;return A;}
,getKeyFromValue:function(C,D){{}
;for(var E in C){if(C.hasOwnProperty(E)&&C[E]===D){return E;}
;}
;return null;}
,contains:function(F,G){{}
;return this.getKeyFromValue(F,G)!==null;}
,select:function(H,I){{}
;return I[H];}
,fromArray:function(J){{}
;var K={};for(var i=0,l=J.length;i<l;i++){{}
;K[J[i].toString()]=true;}
;return K;}
,toUriParameter:function(L,M){var P,N=[];for(P in L){if(L.hasOwnProperty(P)){var O=L[P];if(O instanceof Array){for(var i=0;i<O.length;i++){this.__dq(P,O[i],N,M);}
;}
else {this.__dq(P,O,N,M);}
;}
;}
;return N.join(d);}
,__dq:function(Q,R,S,T){var U=window.encodeURIComponent;if(T){S.push(U(Q).replace(/%20/g,a)+b+U(R).replace(/%20/g,a));}
else {S.push(U(Q)+b+U(R));}
;}
}});}
)();
(function(){var b="dispose",a="qx.ui.core.queue.Dispose";qx.Class.define(a,{statics:{__dH:[],add:function(c){var d=this.__dH;if(qx.lang.Array.contains(d,c)){return;}
;d.unshift(c);qx.ui.core.queue.Manager.scheduleFlush(b);}
,isEmpty:function(){return this.__dH.length==0;}
,flush:function(){var e=this.__dH;for(var i=e.length-1;i>=0;i--){var f=e[i];e.splice(i,1);f.dispose();}
;if(e.length!=0){return;}
;this.__dH=[];}
}});}
)();
(function(){var b="qx.util.DeferredCallManager",a="singleton";qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){this.__eK={};this.__eL=qx.lang.Function.bind(this.__eP,this);this.__eM=false;}
,members:{__eN:null,__eO:null,__eK:null,__eM:null,__eL:null,schedule:function(c){if(this.__eN==null){this.__eN=window.setTimeout(this.__eL,0);}
;var d=c.toHashCode();if(this.__eO&&this.__eO[d]){return;}
;this.__eK[d]=c;this.__eM=true;}
,cancel:function(e){var f=e.toHashCode();if(this.__eO&&this.__eO[f]){this.__eO[f]=null;return;}
;delete this.__eK[f];if(qx.lang.Object.isEmpty(this.__eK)&&this.__eN!=null){window.clearTimeout(this.__eN);this.__eN=null;}
;}
,__eP:qx.event.GlobalError.observeMethod(function(){this.__eN=null;while(this.__eM){this.__eO=qx.lang.Object.clone(this.__eK);this.__eK={};this.__eM=false;for(var h in this.__eO){var g=this.__eO[h];if(g){this.__eO[h]=null;g.call();}
;}
;}
;this.__eO=null;}
)},destruct:function(){if(this.__eN!=null){window.clearTimeout(this.__eN);}
;this.__eL=this.__eK=null;}
});}
)();
(function(){var a="qx.util.DeferredCall";qx.Class.define(a,{extend:qx.core.Object,construct:function(b,c){qx.core.Object.call(this);this.__cq=b;this.__cr=c||null;this.__eQ=qx.util.DeferredCallManager.getInstance();}
,members:{__cq:null,__cr:null,__eQ:null,cancel:function(){this.__eQ.cancel(this);}
,schedule:function(){this.__eQ.schedule(this);}
,call:function(){var d;{}
;this.__cr?this.__cq.apply(this.__cr):this.__cq();}
},destruct:function(){this.cancel();this.__cr=this.__cq=this.__eQ=null;}
});}
)();
(function(){var m="Child is already in: ",k="text",j="qx.html.Element",h="|capture|",g="focus",f="blur",d="deactivate",c="css.userselect",b="capture",a="visible",N="Root elements could not be inserted into other ones.",M="Has no children!",L="|bubble|",K="releaseCapture",J="Could not move to same index!",I="qxSelectable",H="tabIndex",G="off",F="on",E="__fn",t="qx.html.Iframe",u="activate",r="Has no parent to remove from.",s="none",p="hidden",q="Has no child at this position!",n="css.userselect.none",o="div",v="",w="mshtml",A="engine.name",z="Has no child: ",C="scroll",B="Could not overwrite existing element!",D="element";qx.Class.define(j,{extend:qx.core.Object,construct:function(O,P,Q){qx.core.Object.call(this);this.__eR=O||o;this.__eS=P||null;this.__eT=Q||null;}
,statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__eU:{},_scheduleFlush:function(R){qx.html.Element.__fy.schedule();}
,flush:function(){var bd;{}
;var U=this.__eV();var T=U.getFocus();if(T&&this.__fa(T)){U.blur(T);}
;var bk=U.getActive();if(bk&&this.__fa(bk)){qx.bom.Element.deactivate(bk);}
;var X=this.__eX();if(X&&this.__fa(X)){qx.bom.Element.releaseCapture(X);}
;var be=[];var bf=this._modified;for(var bc in bf){bd=bf[bc];if(bd.__fr()||bd.classname==t){if(bd.__fb&&qx.dom.Hierarchy.isRendered(bd.__fb)){be.push(bd);}
else {{}
;bd.__fq();}
;delete bf[bc];}
;}
;for(var i=0,l=be.length;i<l;i++){bd=be[i];{}
;bd.__fq();}
;var ba=this._visibility;for(var bc in ba){bd=ba[bc];var bg=bd.__fb;if(!bg){delete ba[bc];continue;}
;{}
;if(!bd.$$disposed){bg.style.display=bd.__fd?v:s;if((qx.core.Environment.get(A)==w)){if(!(document.documentMode>=8)){bg.style.visibility=bd.__fd?a:p;}
;}
;}
;delete ba[bc];}
;var scroll=this._scroll;for(var bc in scroll){bd=scroll[bc];var bl=bd.__fb;if(bl&&bl.offsetWidth){var W=true;if(bd.__fg!=null){bd.__fb.scrollLeft=bd.__fg;delete bd.__fg;}
;if(bd.__fh!=null){bd.__fb.scrollTop=bd.__fh;delete bd.__fh;}
;var bh=bd.__fe;if(bh!=null){var bb=bh.element.getDomElement();if(bb&&bb.offsetWidth){qx.bom.element.Scroll.intoViewX(bb,bl,bh.align);delete bd.__fe;}
else {W=false;}
;}
;var bi=bd.__ff;if(bi!=null){var bb=bi.element.getDomElement();if(bb&&bb.offsetWidth){qx.bom.element.Scroll.intoViewY(bb,bl,bi.align);delete bd.__ff;}
else {W=false;}
;}
;if(W){delete scroll[bc];}
;}
;}
;var V={"releaseCapture":1,"blur":1,"deactivate":1};for(var i=0;i<this._actions.length;i++){var bj=this._actions[i];var bg=bj.element.__fb;if(!bg||!V[bj.type]&&!bj.element.__fr()){continue;}
;var Y=bj.args;Y.unshift(bg);qx.bom.Element[bj.type].apply(qx.bom.Element,Y);}
;this._actions=[];for(var bc in this.__eU){var S=this.__eU[bc];var bl=S.element.__fb;if(bl){qx.bom.Selection.set(bl,S.start,S.end);delete this.__eU[bc];}
;}
;qx.event.handler.Appear.refresh();}
,__eV:function(){if(!this.__eW){var bm=qx.event.Registration.getManager(window);this.__eW=bm.getHandler(qx.event.handler.Focus);}
;return this.__eW;}
,__eX:function(){if(!this.__eY){var bn=qx.event.Registration.getManager(window);this.__eY=bn.getDispatcher(qx.event.dispatch.MouseCapture);}
;return this.__eY.getCaptureElement();}
,__fa:function(bo){var bp=qx.core.ObjectRegistry.fromHashCode(bo.$$element);return bp&&!bp.__fr();}
},members:{__eR:null,__fb:null,__dd:false,__fc:true,__fd:true,__fe:null,__ff:null,__fg:null,__fh:null,__fi:null,__fj:null,__fk:null,__eS:null,__eT:null,__fl:null,__fm:null,__fn:null,__fo:null,__fp:null,_scheduleChildrenUpdate:function(){if(this.__fo){return;}
;this.__fo=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(D);}
,_createDomElement:function(){return qx.dom.Element.create(this.__eR);}
,__fq:function(){{}
;var length;var bq=this.__fn;if(bq){length=bq.length;var br;for(var i=0;i<length;i++){br=bq[i];if(br.__fd&&br.__fc&&!br.__fb){br.__fq();}
;}
;}
;if(!this.__fb){this.__fb=this._createDomElement();this.__fb.$$element=this.$$hash;this._copyData(false);if(bq&&length>0){this._insertChildren();}
;}
else {this._syncData();if(this.__fo){this._syncChildren();}
;}
;delete this.__fo;}
,_insertChildren:function(){var bs=this.__fn;var length=bs.length;var bu;if(length>2){var bt=document.createDocumentFragment();for(var i=0;i<length;i++){bu=bs[i];if(bu.__fb&&bu.__fc){bt.appendChild(bu.__fb);}
;}
;this.__fb.appendChild(bt);}
else {var bt=this.__fb;for(var i=0;i<length;i++){bu=bs[i];if(bu.__fb&&bu.__fc){bt.appendChild(bu.__fb);}
;}
;}
;}
,_syncChildren:function(){var bz;var bE=qx.core.ObjectRegistry;var bv=this.__fn;var bC=bv.length;var bw;var bA;var by=this.__fb;var bB=by.childNodes;var bx=0;var bD;{}
;for(var i=bB.length-1;i>=0;i--){bD=bB[i];bA=bE.fromHashCode(bD.$$element);if(!bA||!bA.__fc||bA.__fp!==this){by.removeChild(bD);{}
;}
;}
;for(var i=0;i<bC;i++){bw=bv[i];if(bw.__fc){bA=bw.__fb;bD=bB[bx];if(!bA){continue;}
;if(bA!=bD){if(bD){by.insertBefore(bA,bD);}
else {by.appendChild(bA);}
;{}
;}
;bx++;}
;}
;{}
;}
,_copyData:function(bF){var bJ=this.__fb;var bI=this.__eT;if(bI){var bG=qx.bom.element.Attribute;for(var bK in bI){bG.set(bJ,bK,bI[bK]);}
;}
;var bI=this.__eS;if(bI){var bH=qx.bom.element.Style;if(bF){bH.setStyles(bJ,bI);}
else {bH.setCss(bJ,bH.compile(bI));}
;}
;var bI=this.__fl;if(bI){for(var bK in bI){this._applyProperty(bK,bI[bK]);}
;}
;var bI=this.__fm;if(bI){qx.event.Registration.getManager(bJ).importListeners(bJ,bI);delete this.__fm;}
;}
,_syncData:function(){var bP=this.__fb;var bO=qx.bom.element.Attribute;var bM=qx.bom.element.Style;var bN=this.__fj;if(bN){var bS=this.__eT;if(bS){var bQ;for(var bR in bN){bQ=bS[bR];if(bQ!==undefined){bO.set(bP,bR,bQ);}
else {bO.reset(bP,bR);}
;}
;}
;this.__fj=null;}
;var bN=this.__fi;if(bN){var bS=this.__eS;if(bS){var bL={};for(var bR in bN){bL[bR]=bS[bR];}
;bM.setStyles(bP,bL);}
;this.__fi=null;}
;var bN=this.__fk;if(bN){var bS=this.__fl;if(bS){var bQ;for(var bR in bN){this._applyProperty(bR,bS[bR]);}
;}
;this.__fk=null;}
;}
,__fr:function(){var bT=this;while(bT){if(bT.__dd){return true;}
;if(!bT.__fc||!bT.__fd){return false;}
;bT=bT.__fp;}
;return false;}
,__fs:function(bU){if(bU.__fp===this){throw new Error(m+bU);}
;if(bU.__dd){throw new Error(N);}
;if(bU.__fp){bU.__fp.remove(bU);}
;bU.__fp=this;if(!this.__fn){this.__fn=[];}
;if(this.__fb){this._scheduleChildrenUpdate();}
;}
,__ft:function(bV){if(bV.__fp!==this){throw new Error(z+bV);}
;if(this.__fb){this._scheduleChildrenUpdate();}
;delete bV.__fp;}
,__fu:function(bW){if(bW.__fp!==this){throw new Error(z+bW);}
;if(this.__fb){this._scheduleChildrenUpdate();}
;}
,getChildren:function(){return this.__fn||null;}
,getChild:function(bX){var bY=this.__fn;return bY&&bY[bX]||null;}
,hasChildren:function(){var ca=this.__fn;return ca&&ca[0]!==undefined;}
,indexOf:function(cb){var cc=this.__fn;return cc?cc.indexOf(cb):-1;}
,hasChild:function(cd){var ce=this.__fn;return ce&&ce.indexOf(cd)!==-1;}
,add:function(cf){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__fs(arguments[i]);}
;this.__fn.push.apply(this.__fn,arguments);}
else {this.__fs(cf);this.__fn.push(cf);}
;return this;}
,addAt:function(cg,ch){this.__fs(cg);qx.lang.Array.insertAt(this.__fn,cg,ch);return this;}
,remove:function(ci){var cj=this.__fn;if(!cj){return;}
;if(arguments[1]){var ck;for(var i=0,l=arguments.length;i<l;i++){ck=arguments[i];this.__ft(ck);qx.lang.Array.remove(cj,ck);}
;}
else {this.__ft(ci);qx.lang.Array.remove(cj,ci);}
;return this;}
,removeAt:function(cl){var cm=this.__fn;if(!cm){throw new Error(M);}
;var cn=cm[cl];if(!cn){throw new Error(q);}
;this.__ft(cn);qx.lang.Array.removeAt(this.__fn,cl);return this;}
,removeAll:function(){var co=this.__fn;if(co){for(var i=0,l=co.length;i<l;i++){this.__ft(co[i]);}
;co.length=0;}
;return this;}
,getParent:function(){return this.__fp||null;}
,insertInto:function(parent,cp){parent.__fs(this);if(cp==null){parent.__fn.push(this);}
else {qx.lang.Array.insertAt(this.__fn,this,cp);}
;return this;}
,insertBefore:function(cq){var parent=cq.__fp;parent.__fs(this);qx.lang.Array.insertBefore(parent.__fn,this,cq);return this;}
,insertAfter:function(cr){var parent=cr.__fp;parent.__fs(this);qx.lang.Array.insertAfter(parent.__fn,this,cr);return this;}
,moveTo:function(cs){var parent=this.__fp;parent.__fu(this);var ct=parent.__fn.indexOf(this);if(ct===cs){throw new Error(J);}
else if(ct<cs){cs--;}
;qx.lang.Array.removeAt(parent.__fn,ct);qx.lang.Array.insertAt(parent.__fn,this,cs);return this;}
,moveBefore:function(cu){var parent=this.__fp;return this.moveTo(parent.__fn.indexOf(cu));}
,moveAfter:function(cv){var parent=this.__fp;return this.moveTo(parent.__fn.indexOf(cv)+1);}
,free:function(){var parent=this.__fp;if(!parent){throw new Error(r);}
;if(!parent.__fn){return;}
;parent.__ft(this);qx.lang.Array.remove(parent.__fn,this);return this;}
,getDomElement:function(){return this.__fb||null;}
,getNodeName:function(){return this.__eR;}
,setNodeName:function(name){this.__eR=name;}
,setRoot:function(cw){this.__dd=cw;}
,useMarkup:function(cx){if(this.__fb){throw new Error(B);}
;if((qx.core.Environment.get(A)==w)){var cy=document.createElement(o);}
else {var cy=qx.dom.Element.getHelperElement();}
;cy.innerHTML=cx;this.useElement(cy.firstChild);return this.__fb;}
,useElement:function(cz){if(this.__fb){throw new Error(B);}
;this.__fb=cz;this.__fb.$$element=this.$$hash;this._copyData(true);}
,isFocusable:function(){var cB=this.getAttribute(H);if(cB>=1){return true;}
;var cA=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;if(cB>=0&&cA[this.__eR]){return true;}
;return false;}
,setSelectable:function(cC){this.setAttribute(I,cC?F:G);var cD=qx.core.Environment.get(c);if(cD){this.setStyle(cD,cC?k:qx.core.Environment.get(n));}
;}
,isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__eR];}
,include:function(){if(this.__fc){return;}
;delete this.__fc;if(this.__fp){this.__fp._scheduleChildrenUpdate();}
;return this;}
,exclude:function(){if(!this.__fc){return;}
;this.__fc=false;if(this.__fp){this.__fp._scheduleChildrenUpdate();}
;return this;}
,isIncluded:function(){return this.__fc===true;}
,show:function(){if(this.__fd){return;}
;if(this.__fb){qx.html.Element._visibility[this.$$hash]=this;qx.html.Element._scheduleFlush(D);}
;if(this.__fp){this.__fp._scheduleChildrenUpdate();}
;delete this.__fd;}
,hide:function(){if(!this.__fd){return;}
;if(this.__fb){qx.html.Element._visibility[this.$$hash]=this;qx.html.Element._scheduleFlush(D);}
;this.__fd=false;}
,isVisible:function(){return this.__fd===true;}
,scrollChildIntoViewX:function(cE,cF,cG){var cH=this.__fb;var cI=cE.getDomElement();if(cG!==false&&cH&&cH.offsetWidth&&cI&&cI.offsetWidth){qx.bom.element.Scroll.intoViewX(cI,cH,cF);}
else {this.__fe={element:cE,align:cF};qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(D);}
;delete this.__fg;}
,scrollChildIntoViewY:function(cJ,cK,cL){var cM=this.__fb;var cN=cJ.getDomElement();if(cL!==false&&cM&&cM.offsetWidth&&cN&&cN.offsetWidth){qx.bom.element.Scroll.intoViewY(cN,cM,cK);}
else {this.__ff={element:cJ,align:cK};qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(D);}
;delete this.__fh;}
,scrollToX:function(x,cO){var cP=this.__fb;if(cO!==true&&cP&&cP.offsetWidth){cP.scrollLeft=x;delete this.__fg;}
else {this.__fg=x;qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(D);}
;delete this.__fe;}
,getScrollX:function(){var cQ=this.__fb;if(cQ){return cQ.scrollLeft;}
;return this.__fg||0;}
,scrollToY:function(y,cR){var cS=this.__fb;if(cR!==true&&cS&&cS.offsetWidth){cS.scrollTop=y;delete this.__fh;}
else {this.__fh=y;qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(D);}
;delete this.__ff;}
,getScrollY:function(){var cT=this.__fb;if(cT){return cT.scrollTop;}
;return this.__fh||0;}
,disableScrolling:function(){this.enableScrolling();this.scrollToX(0);this.scrollToY(0);this.addListener(C,this.__fw,this);}
,enableScrolling:function(){this.removeListener(C,this.__fw,this);}
,__fv:null,__fw:function(e){if(!this.__fv){this.__fv=true;this.__fb.scrollTop=0;this.__fb.scrollLeft=0;delete this.__fv;}
;}
,getTextSelection:function(){var cU=this.__fb;if(cU){return qx.bom.Selection.get(cU);}
;return null;}
,getTextSelectionLength:function(){var cV=this.__fb;if(cV){return qx.bom.Selection.getLength(cV);}
;return null;}
,getTextSelectionStart:function(){var cW=this.__fb;if(cW){return qx.bom.Selection.getStart(cW);}
;return null;}
,getTextSelectionEnd:function(){var cX=this.__fb;if(cX){return qx.bom.Selection.getEnd(cX);}
;return null;}
,setTextSelection:function(cY,da){var dc=this.__fb;if(dc){qx.bom.Selection.set(dc,cY,da);return;}
;qx.html.Element.__eU[this.toHashCode()]={element:this,start:cY,end:da};qx.html.Element._scheduleFlush(D);}
,clearTextSelection:function(){var dd=this.__fb;if(dd){qx.bom.Selection.clear(dd);}
;delete qx.html.Element.__eU[this.toHashCode()];}
,__fx:function(de,df){var dg=qx.html.Element._actions;dg.push({type:de,element:this,args:df||[]});qx.html.Element._scheduleFlush(D);}
,focus:function(){this.__fx(g);}
,blur:function(){this.__fx(f);}
,activate:function(){this.__fx(u);}
,deactivate:function(){this.__fx(d);}
,capture:function(dh){this.__fx(b,[dh!==false]);}
,releaseCapture:function(){this.__fx(K);}
,setStyle:function(di,dj,dk){if(!this.__eS){this.__eS={};}
;if(this.__eS[di]==dj){return;}
;if(dj==null){delete this.__eS[di];}
else {this.__eS[di]=dj;}
;if(this.__fb){if(dk){qx.bom.element.Style.set(this.__fb,di,dj);return this;}
;if(!this.__fi){this.__fi={};}
;this.__fi[di]=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(D);}
;return this;}
,setStyles:function(dl,dm){var dn=qx.bom.element.Style;if(!this.__eS){this.__eS={};}
;if(this.__fb){if(!this.__fi){this.__fi={};}
;for(var dq in dl){var dp=dl[dq];if(this.__eS[dq]==dp){continue;}
;if(dp==null){delete this.__eS[dq];}
else {this.__eS[dq]=dp;}
;if(dm){dn.set(this.__fb,dq,dp);continue;}
;this.__fi[dq]=true;}
;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(D);}
else {for(var dq in dl){var dp=dl[dq];if(this.__eS[dq]==dp){continue;}
;if(dp==null){delete this.__eS[dq];}
else {this.__eS[dq]=dp;}
;}
;}
;return this;}
,removeStyle:function(dr,ds){this.setStyle(dr,null,ds);}
,getStyle:function(dt){return this.__eS?this.__eS[dt]:null;}
,getAllStyles:function(){return this.__eS||null;}
,setAttribute:function(du,dv,dw){if(!this.__eT){this.__eT={};}
;if(this.__eT[du]==dv){return;}
;if(dv==null){delete this.__eT[du];}
else {this.__eT[du]=dv;}
;if(this.__fb){if(dw){qx.bom.element.Attribute.set(this.__fb,du,dv);return this;}
;if(!this.__fj){this.__fj={};}
;this.__fj[du]=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(D);}
;return this;}
,setAttributes:function(dx,dy){for(var dz in dx){this.setAttribute(dz,dx[dz],dy);}
;return this;}
,removeAttribute:function(dA,dB){this.setAttribute(dA,null,dB);}
,getAttribute:function(dC){return this.__eT?this.__eT[dC]:null;}
,_applyProperty:function(name,dD){}
,_setProperty:function(dE,dF,dG){if(!this.__fl){this.__fl={};}
;if(this.__fl[dE]==dF){return;}
;if(dF==null){delete this.__fl[dE];}
else {this.__fl[dE]=dF;}
;if(this.__fb){if(dG){this._applyProperty(dE,dF);return this;}
;if(!this.__fk){this.__fk={};}
;this.__fk[dE]=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(D);}
;return this;}
,_removeProperty:function(dH,dI){this._setProperty(dH,null,dI);}
,_getProperty:function(dJ){var dK=this.__fl;if(!dK){return null;}
;var dL=dK[dJ];return dL==null?null:dL;}
,addListener:function(dM,dN,self,dO){var dP;if(this.$$disposed){return null;}
;{}
;if(this.__fb){return qx.event.Registration.addListener(this.__fb,dM,dN,self,dO);}
;if(!this.__fm){this.__fm={};}
;if(dO==null){dO=false;}
;var dQ=qx.event.Manager.getNextUniqueId();var dR=dM+(dO?h:L)+dQ;this.__fm[dR]={type:dM,listener:dN,self:self,capture:dO,unique:dQ};return dR;}
,removeListener:function(dS,dT,self,dU){var dV;if(this.$$disposed){return null;}
;{}
;if(this.__fb){qx.event.Registration.removeListener(this.__fb,dS,dT,self,dU);}
else {var dX=this.__fm;var dW;if(dU==null){dU=false;}
;for(var dY in dX){dW=dX[dY];if(dW.listener===dT&&dW.self===self&&dW.capture===dU&&dW.type===dS){delete dX[dY];break;}
;}
;}
;return this;}
,removeListenerById:function(ea){if(this.$$disposed){return null;}
;if(this.__fb){qx.event.Registration.removeListenerById(this.__fb,ea);}
else {delete this.__fm[ea];}
;return this;}
,hasListener:function(eb,ec){if(this.$$disposed){return false;}
;if(this.__fb){return qx.event.Registration.hasListener(this.__fb,eb,ec);}
;var ee=this.__fm;var ed;if(ec==null){ec=false;}
;for(var ef in ee){ed=ee[ef];if(ed.capture===ec&&ed.type===eb){return true;}
;}
;return false;}
},defer:function(eg){eg.__fy=new qx.util.DeferredCall(eg.flush,eg);}
,destruct:function(){var eh=this.__fb;if(eh){qx.event.Registration.getManager(eh).removeAllListeners(eh);eh.$$element=v;}
;if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__fp;if(parent&&!parent.$$disposed){parent.remove(this);}
;}
;this._disposeArray(E);this.__eT=this.__eS=this.__fm=this.__fl=this.__fj=this.__fi=this.__fk=this.__fb=this.__fp=this.__fe=this.__ff=null;}
});}
)();
(function(){var c="qx.event.handler.Appear",b="disappear",a="appear";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);this.__eQ=d;this.__fz={};qx.event.handler.Appear.__fA[this.$$hash]=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__fA:{},refresh:function(){var e=this.__fA;for(var f in e){e[f].refresh();}
;}
},members:{__eQ:null,__fz:null,canHandleEvent:function(g,h){}
,registerEvent:function(i,j,k){var l=qx.core.ObjectRegistry.toHashCode(i)+j;var m=this.__fz;if(m&&!m[l]){m[l]=i;i.$$displayed=i.offsetWidth>0;}
;}
,unregisterEvent:function(n,o,p){var q=qx.core.ObjectRegistry.toHashCode(n)+o;var r=this.__fz;if(!r){return;}
;if(r[q]){delete r[q];}
;}
,refresh:function(){var v=this.__fz;var w;for(var u in v){w=v[u];var s=w.offsetWidth>0;if((!!w.$$displayed)!==s){w.$$displayed=s;var t=qx.event.Registration.createEvent(s?a:b);this.__eQ.dispatchEvent(w,t);}
;}
;}
},destruct:function(){this.__eQ=this.__fz=null;delete qx.event.handler.Appear.__fA[this.$$hash];}
,defer:function(x){qx.event.Registration.addHandler(x);}
});}
)();
(function(){var c="abstract",b="Missing implementation",a="qx.event.dispatch.AbstractBubbling";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:c,construct:function(d){this._manager=d;}
,members:{_getParent:function(e){throw new Error(b);}
,canDispatchEvent:function(f,event,g){return event.getBubbles();}
,dispatchEvent:function(h,event,k){var parent=h;var t=this._manager;var q,x;var o;var s,v;var u;var w=[];q=t.getListeners(h,k,true);x=t.getListeners(h,k,false);if(q){w.push(q);}
;if(x){w.push(x);}
;var parent=this._getParent(h);var m=[];var l=[];var n=[];var r=[];while(parent!=null){q=t.getListeners(parent,k,true);if(q){n.push(q);r.push(parent);}
;x=t.getListeners(parent,k,false);if(x){m.push(x);l.push(parent);}
;parent=this._getParent(parent);}
;event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);for(var i=n.length-1;i>=0;i--){u=r[i];event.setCurrentTarget(u);o=n[i];for(var j=0,p=o.length;j<p;j++){s=o[j];v=s.context||u;{}
;s.handler.call(v,event);}
;if(event.getPropagationStopped()){return;}
;}
;event.setEventPhase(qx.event.type.Event.AT_TARGET);event.setCurrentTarget(h);for(var i=0,y=w.length;i<y;i++){o=w[i];for(var j=0,p=o.length;j<p;j++){s=o[j];v=s.context||h;{}
;s.handler.call(v,event);}
;if(event.getPropagationStopped()){return;}
;}
;event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);for(var i=0,y=m.length;i<y;i++){u=l[i];event.setCurrentTarget(u);o=m[i];for(var j=0,p=o.length;j<p;j++){s=o[j];v=s.context||u;{}
;s.handler.call(v,event);}
;if(event.getPropagationStopped()){return;}
;}
;}
}});}
)();
(function(){var a="qx.event.dispatch.DomBubbling";qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(b){return b.parentNode;}
,canDispatchEvent:function(c,event,d){return c.nodeType!==undefined&&event.getBubbles();}
},defer:function(e){qx.event.Registration.addDispatcher(e);}
});}
)();
(function(){var d="qx.event.handler.Element",c="load",b="iframe",a="-";qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(e){qx.core.Object.call(this);this._manager=e;this._registeredEvents={};}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,load:true,scroll:true,select:true,reset:true,submit:true},CANCELABLE:{selectstart:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(f,g){if(g===c){return f.tagName.toLowerCase()!==b;}
else {return true;}
;}
,registerEvent:function(h,i,j){var m=qx.core.ObjectRegistry.toHashCode(h);var k=m+a+i;var l=qx.lang.Function.listener(this._onNative,this,k);qx.bom.Event.addNativeListener(h,i,l);this._registeredEvents[k]={element:h,type:i,listener:l};}
,unregisterEvent:function(n,o,p){var s=this._registeredEvents;if(!s){return;}
;var t=qx.core.ObjectRegistry.toHashCode(n);var q=t+a+o;var r=this._registeredEvents[q];if(r){qx.bom.Event.removeNativeListener(n,o,r.listener);}
;delete this._registeredEvents[q];}
,_onNative:qx.event.GlobalError.observeMethod(function(u,v){var x=this._registeredEvents;if(!x){return;}
;var w=x[v];var y=this.constructor.CANCELABLE[w.type];qx.event.Registration.fireNonBubblingEvent(w.element,w.type,qx.event.type.Native,[u,undefined,undefined,undefined,y]);}
)},destruct:function(){var z;var A=this._registeredEvents;for(var B in A){z=A[B];qx.bom.Event.removeNativeListener(z.element,z.type,z.listener);}
;this._manager=this._registeredEvents=null;}
,defer:function(C){qx.event.Registration.addHandler(C);}
});}
)();
(function(){var a="qx.event.type.Native";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d,e,f){qx.event.type.Event.prototype.init.call(this,e,f);this._target=c||qx.bom.Event.getTarget(b);this._relatedTarget=d||qx.bom.Event.getRelatedTarget(b);if(b.timeStamp){this._timeStamp=b.timeStamp;}
;this._native=b;this._returnValue=null;return this;}
,clone:function(g){var h=qx.event.type.Event.prototype.clone.call(this,g);var i={};h._native=this._cloneNativeEvent(this._native,i);h._returnValue=this._returnValue;return h;}
,_cloneNativeEvent:function(j,k){k.preventDefault=qx.lang.Function.empty;return k;}
,preventDefault:function(){qx.event.type.Event.prototype.preventDefault.call(this);qx.bom.Event.preventDefault(this._native);}
,getNativeEvent:function(){return this._native;}
,setReturnValue:function(l){this._returnValue=l;}
,getReturnValue:function(){return this._returnValue;}
},destruct:function(){this._native=this._returnValue=null;}
});}
)();
(function(){var j="rim_tabletos",i="Darwin",h="os.version",g="2003",f=")",e="iPhone",d="android",c="unix",b="ce",a="7",bf="SymbianOS",be="os.name",bd="|",bc="MacPPC",bb="iPod",ba="\.",Y="Win64",X="linux",W="me",V="Macintosh",q="Android",r="Windows",o="ios",p="vista",m="8",n="blackberry",k="(",l="win",u="Linux",v="BSD",D="Mac OS X",B="iPad",L="X11",G="xp",R="symbian",P="qx.bom.client.OperatingSystem",x="g",U="Win32",T="osx",S="webOS",w="RIM Tablet OS",z="BlackBerry",A="nt4",C="MacIntel",E="webos",H="10.1",M="10.3",Q="10.7",s="10.5",t="95",y="10.2",K="98",J="2000",I="10.6",O="10.0",N="10.4",F="";qx.Bootstrap.define(P,{statics:{getName:function(){if(!navigator){return F;}
;var bg=navigator.platform||F;var bh=navigator.userAgent||F;if(bg.indexOf(r)!=-1||bg.indexOf(U)!=-1||bg.indexOf(Y)!=-1){return l;}
else if(bg.indexOf(V)!=-1||bg.indexOf(bc)!=-1||bg.indexOf(C)!=-1||bg.indexOf(D)!=-1){return T;}
else if(bh.indexOf(w)!=-1){return j;}
else if(bh.indexOf(S)!=-1){return E;}
else if(bg.indexOf(bb)!=-1||bg.indexOf(e)!=-1||bg.indexOf(B)!=-1){return o;}
else if(bh.indexOf(q)!=-1){return d;}
else if(bg.indexOf(u)!=-1){return X;}
else if(bg.indexOf(L)!=-1||bg.indexOf(v)!=-1||bg.indexOf(i)!=-1){return c;}
else if(bg.indexOf(bf)!=-1){return R;}
else if(bg.indexOf(z)!=-1){return n;}
;;;;;;;;;return F;}
,__cW:{"Windows NT 6.2":m,"Windows NT 6.1":a,"Windows NT 6.0":p,"Windows NT 5.2":g,"Windows NT 5.1":G,"Windows NT 5.0":J,"Windows 2000":J,"Windows NT 4.0":A,"Win 9x 4.90":W,"Windows CE":b,"Windows 98":K,"Win98":K,"Windows 95":t,"Win95":t,"Mac OS X 10_7":Q,"Mac OS X 10.7":Q,"Mac OS X 10_6":I,"Mac OS X 10.6":I,"Mac OS X 10_5":s,"Mac OS X 10.5":s,"Mac OS X 10_4":N,"Mac OS X 10.4":N,"Mac OS X 10_3":M,"Mac OS X 10.3":M,"Mac OS X 10_2":y,"Mac OS X 10.2":y,"Mac OS X 10_1":H,"Mac OS X 10.1":H,"Mac OS X 10_0":O,"Mac OS X 10.0":O},getVersion:function(){var bk=[];for(var bj in qx.bom.client.OperatingSystem.__cW){bk.push(bj);}
;var bl=new RegExp(k+bk.join(bd).replace(/\./g,ba)+f,x);var bi=bl.exec(navigator.userAgent);if(bi&&bi[1]){return qx.bom.client.OperatingSystem.__cW[bi[1]];}
;return F;}
},defer:function(bm){qx.core.Environment.add(be,bm.getName);qx.core.Environment.add(h,bm.getVersion);}
});}
)();
(function(){var a="qx.event.handler.UserAction";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);this.__eQ=b;this.__ce=b.getWindow();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__eQ:null,__ce:null,canHandleEvent:function(c,d){}
,registerEvent:function(e,f,g){}
,unregisterEvent:function(h,i,j){}
},destruct:function(){this.__eQ=this.__ce=null;}
,defer:function(k){qx.event.Registration.addHandler(k);}
});}
)();
(function(){var t="engine.version",s="useraction",r="webkit",q="gecko",p="DOMMouseScroll",o="qx.event.handler.Mouse",n="os.name",m="mouseover",l="mouseout",k="ios",d="mousemove",j="on",g="dblclick",c="mousedown",b="contextmenu",f="mousewheel",e="click",h="mouseup",a="engine.name";qx.Class.define(o,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(u){qx.core.Object.call(this);this.__eQ=u;this.__ce=u.getWindow();this.__dd=this.__ce.document;this._initButtonObserver();this._initMoveObserver();this._initWheelObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT+qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__fB:null,__fC:null,__fD:null,__fE:null,__fF:null,__eQ:null,__ce:null,__dd:null,canHandleEvent:function(v,w){}
,registerEvent:qx.core.Environment.get(n)===k?function(x,y,z){x[j+y]=qx.lang.Function.returnNull;}
:qx.lang.Function.returnNull,unregisterEvent:qx.core.Environment.get(n)===k?function(A,B,C){A[j+B]=undefined;}
:qx.lang.Function.returnNull,__fG:function(D,E,F){if(!F){F=qx.bom.Event.getTarget(D);}
;if(F&&F.nodeType){qx.event.Registration.fireEvent(F,E||D.type,E==f?qx.event.type.MouseWheel:qx.event.type.Mouse,[D,F,null,true,true]);}
;qx.event.Registration.fireEvent(this.__ce,s,qx.event.type.Data,[E||D.type]);}
,__fH:function(){var H=[this.__ce,this.__dd,this.__dd.body];var I=this.__ce;var G=p;for(var i=0;i<H.length;i++){if(qx.bom.Event.supportsEvent(H[i],f)){G=f;I=H[i];break;}
;}
;return {type:G,target:I};}
,_initButtonObserver:function(){this.__fB=qx.lang.Function.listener(this._onButtonEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__dd,c,this.__fB);Event.addNativeListener(this.__dd,h,this.__fB);Event.addNativeListener(this.__dd,e,this.__fB);Event.addNativeListener(this.__dd,g,this.__fB);Event.addNativeListener(this.__dd,b,this.__fB);}
,_initMoveObserver:function(){this.__fC=qx.lang.Function.listener(this._onMoveEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__dd,d,this.__fC);Event.addNativeListener(this.__dd,m,this.__fC);Event.addNativeListener(this.__dd,l,this.__fC);}
,_initWheelObserver:function(){this.__fD=qx.lang.Function.listener(this._onWheelEvent,this);var J=this.__fH();qx.bom.Event.addNativeListener(J.target,J.type,this.__fD);}
,_stopButtonObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__dd,c,this.__fB);Event.removeNativeListener(this.__dd,h,this.__fB);Event.removeNativeListener(this.__dd,e,this.__fB);Event.removeNativeListener(this.__dd,g,this.__fB);Event.removeNativeListener(this.__dd,b,this.__fB);}
,_stopMoveObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__dd,d,this.__fC);Event.removeNativeListener(this.__dd,m,this.__fC);Event.removeNativeListener(this.__dd,l,this.__fC);}
,_stopWheelObserver:function(){var K=this.__fH();qx.bom.Event.removeNativeListener(K.target,K.type,this.__fD);}
,_onMoveEvent:qx.event.GlobalError.observeMethod(function(L){this.__fG(L);}
),_onButtonEvent:qx.event.GlobalError.observeMethod(function(M){var N=M.type;var O=qx.bom.Event.getTarget(M);if(qx.core.Environment.get(a)==q||qx.core.Environment.get(a)==r){if(O&&O.nodeType==3){O=O.parentNode;}
;}
;if(this.__fI){this.__fI(M,N,O);}
;if(this.__fK){this.__fK(M,N,O);}
;this.__fG(M,N,O);if(this.__fJ){this.__fJ(M,N,O);}
;if(this.__fL){this.__fL(M,N,O);}
;this.__fE=N;}
),_onWheelEvent:qx.event.GlobalError.observeMethod(function(P){this.__fG(P,f);}
),__fI:qx.core.Environment.select(a,{"webkit":function(Q,R,S){if(parseFloat(qx.core.Environment.get(t))<530){if(R==b){this.__fG(Q,h,S);}
;}
;}
,"default":null}),__fJ:qx.core.Environment.select(a,{"opera":function(T,U,V){if(U==h&&T.button==2){this.__fG(T,b,V);}
;}
,"default":null}),__fK:qx.core.Environment.select(a,{"mshtml":function(W,X,Y){if(W.target!==undefined){return;}
;if(X==h&&this.__fE==e){this.__fG(W,c,Y);}
else if(X==g){this.__fG(W,e,Y);}
;}
,"default":null}),__fL:qx.core.Environment.select(a,{"mshtml":null,"default":function(ba,bb,bc){switch(bb){case c:this.__fF=bc;break;case h:if(bc!==this.__fF){var bd=qx.dom.Hierarchy.getCommonParent(bc,this.__fF);this.__fG(ba,e,bd);}
;};}
})},destruct:function(){this._stopButtonObserver();this._stopMoveObserver();this._stopWheelObserver();this.__eQ=this.__ce=this.__dd=this.__fF=null;}
,defer:function(be){qx.event.Registration.addHandler(be);}
});}
)();
(function(){var e="os.name",d="opera",c="engine.name",b="qx.event.type.Dom",a="osx";qx.Class.define(b,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(f,g){var g=qx.event.type.Native.prototype._cloneNativeEvent.call(this,f,g);g.shiftKey=f.shiftKey;g.ctrlKey=f.ctrlKey;g.altKey=f.altKey;g.metaKey=f.metaKey;return g;}
,getModifiers:function(){var i=0;var h=this._native;if(h.shiftKey){i|=qx.event.type.Dom.SHIFT_MASK;}
;if(h.ctrlKey){i|=qx.event.type.Dom.CTRL_MASK;}
;if(h.altKey){i|=qx.event.type.Dom.ALT_MASK;}
;if(h.metaKey){i|=qx.event.type.Dom.META_MASK;}
;return i;}
,isCtrlPressed:function(){return this._native.ctrlKey;}
,isShiftPressed:function(){return this._native.shiftKey;}
,isAltPressed:function(){return this._native.altKey;}
,isMetaPressed:function(){return this._native.metaKey;}
,isCtrlOrCommandPressed:function(){if(qx.core.Environment.get(e)==a&&qx.core.Environment.get(c)!=d){return this._native.metaKey;}
else {return this._native.ctrlKey;}
;}
}});}
)();
(function(){var j="click",i="contextmenu",h="qx.event.type.Mouse",g="browser.documentmode",f="browser.name",e="ie",d="none",c="middle",b="left",a="right";qx.Class.define(h,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(k,l){var l=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,k,l);l.button=k.button;l.clientX=k.clientX;l.clientY=k.clientY;l.pageX=k.pageX;l.pageY=k.pageY;l.screenX=k.screenX;l.screenY=k.screenY;l.wheelDelta=k.wheelDelta;l.wheelDeltaX=k.wheelDeltaX;l.wheelDeltaY=k.wheelDeltaY;l.detail=k.detail;l.axis=k.axis;l.wheelX=k.wheelX;l.wheelY=k.wheelY;l.HORIZONTAL_AXIS=k.HORIZONTAL_AXIS;l.srcElement=k.srcElement;l.target=k.target;return l;}
,__fM:{'0':b,'2':a,'1':c},__fN:{'1':b,'2':a,'4':c},stop:function(){this.stopPropagation();}
,getButton:function(){switch(this._type){case i:return a;case j:if(qx.core.Environment.get(f)===e&&qx.core.Environment.get(g)<9){return b;}
;default:if(this._native.target!==undefined){return this.__fM[this._native.button]||d;}
else {return this.__fN[this._native.button]||d;}
;};}
,isLeftPressed:function(){return this.getButton()===b;}
,isMiddlePressed:function(){return this.getButton()===c;}
,isRightPressed:function(){return this.getButton()===a;}
,getRelatedTarget:function(){return this._relatedTarget;}
,getViewportLeft:function(){return this._native.clientX;}
,getViewportTop:function(){return this._native.clientY;}
,getDocumentLeft:function(){if(this._native.pageX!==undefined){return this._native.pageX;}
else {var m=qx.dom.Node.getWindow(this._native.srcElement);return this._native.clientX+qx.bom.Viewport.getScrollLeft(m);}
;}
,getDocumentTop:function(){if(this._native.pageY!==undefined){return this._native.pageY;}
else {var n=qx.dom.Node.getWindow(this._native.srcElement);return this._native.clientY+qx.bom.Viewport.getScrollTop(n);}
;}
,getScreenLeft:function(){return this._native.screenX;}
,getScreenTop:function(){return this._native.screenY;}
}});}
)();
(function(){var j="CSS1Compat",i="android",h="operamini",g="gecko",f="browser.quirksmode",e="browser.name",d="mobile chrome",c="iemobile",b="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",a="opera mobi",H="Mobile Safari",G="Maple",F="operamobile",E="ie",D="mobile safari",C="IEMobile|Maxthon|MSIE",B="qx.bom.client.Browser",A="(Maple )([0-9]+\.[0-9]+\.[0-9]*)",z="opera mini",y="browser.version",q="opera",r="Opera Mini|Opera Mobi|Opera",o="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",p="webkit",m="browser.documentmode",n="5.0",k="Mobile/",l="msie",s="maple",t=")(/| )([0-9]+\.[0-9])",v="(",u="ce",x="",w="mshtml";qx.Bootstrap.define(B,{statics:{getName:function(){var L=navigator.userAgent;var K=new RegExp(v+qx.bom.client.Browser.__dp+t);var J=L.match(K);if(!J){return x;}
;var name=J[1].toLowerCase();var I=qx.bom.client.Engine.getName();if(I===p){if(name===i){name=d;}
else if(L.indexOf(H)!==-1||L.indexOf(k)!==-1){name=D;}
;}
else if(I===w){if(name===l){name=E;if(qx.bom.client.OperatingSystem.getVersion()===u){name=c;}
;}
;}
else if(I===q){if(name===a){name=F;}
else if(name===z){name=h;}
;}
else if(I===g){if(L.indexOf(G)!==-1){name=s;}
;}
;;;return name;}
,getVersion:function(){var P=navigator.userAgent;var O=new RegExp(v+qx.bom.client.Browser.__dp+t);var N=P.match(O);if(!N){return x;}
;var name=N[1].toLowerCase();var M=N[3];if(P.match(/Version(\/| )([0-9]+\.[0-9])/)){M=RegExp.$2;}
;if(qx.bom.client.Engine.getName()==w){M=qx.bom.client.Engine.getVersion();if(name===l&&qx.bom.client.OperatingSystem.getVersion()==u){M=n;}
;}
;if(qx.bom.client.Browser.getName()==s){O=new RegExp(A);N=P.match(O);if(!N){return x;}
;M=N[2];}
;return M;}
,getDocumentMode:function(){if(document.documentMode){return document.documentMode;}
;return 0;}
,getQuirksMode:function(){if(qx.bom.client.Engine.getName()==w&&parseFloat(qx.bom.client.Engine.getVersion())>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;}
else {return document.compatMode!==j;}
;}
,__dp:{"webkit":o,"gecko":b,"mshtml":C,"opera":r}[qx.bom.client.Engine.getName()]},defer:function(Q){qx.core.Environment.add(e,Q.getName),qx.core.Environment.add(y,Q.getVersion),qx.core.Environment.add(m,Q.getDocumentMode),qx.core.Environment.add(f,Q.getQuirksMode);}
});}
)();
(function(){var b="qx.bom.Viewport",a="undefined";qx.Bootstrap.define(b,{statics:{getWidth:function(c){var c=c||window;var d=c.document;return qx.bom.Document.isStandardMode(c)?d.documentElement.clientWidth:d.body.clientWidth;}
,getHeight:function(e){var e=e||window;var f=e.document;return qx.bom.Document.isStandardMode(e)?f.documentElement.clientHeight:f.body.clientHeight;}
,getScrollLeft:function(g){var g=g?g:window;if(typeof g.pageXOffset!==a){return g.pageXOffset;}
;var h=g.document;return h.documentElement.scrollLeft||h.body.scrollLeft;}
,getScrollTop:function(i){var i=i?i:window;if(typeof i.pageYOffeset!==a){return i.pageYOffset;}
;var j=i.document;return j.documentElement.scrollTop||j.body.scrollTop;}
,__dx:function(k){var l=this.getWidth(k)>this.getHeight(k)?90:0;var m=k.orientation;if(m==null||Math.abs(m%180)==l){return {"-270":90,"-180":180,"-90":-90,"0":0,"90":90,"180":180,"270":-90};}
else {return {"-270":180,"-180":-90,"-90":0,"0":90,"90":180,"180":-90,"270":0};}
;}
,__dy:null,getOrientation:function(n){var n=n||window.top;var o=n.orientation;if(o==null){o=this.getWidth(n)>this.getHeight(n)?90:0;}
else {if(this.__dy==null){this.__dy=this.__dx(n);}
;o=this.__dy[o];}
;return o;}
,isLandscape:function(p){return this.getWidth(p)>=this.getHeight(p);}
,isPortrait:function(q){return this.getWidth(q)<this.getHeight(q);}
}});}
)();
(function(){var g="engine.name",f="position:absolute;width:0;height:0;width:1",e="engine.version",d="qx.bom.Document",c="1px",b="div",a="CSS1Compat";qx.Bootstrap.define(d,{statics:{isQuirksMode:qx.core.Environment.select(g,{"mshtml":function(h){if(qx.core.Environment.get(e)>=8){return (h||window).document.documentMode===5;}
else {return (h||window).document.compatMode!==a;}
;}
,"webkit":function(i){if(document.compatMode===undefined){var j=(i||window).document.createElement(b);j.style.cssText=f;return j.style.width===c?true:false;}
else {return (i||window).document.compatMode!==a;}
;}
,"default":function(k){return (k||window).document.compatMode!==a;}
}),isStandardMode:function(l){return !this.isQuirksMode(l);}
,getWidth:function(m){var n=(m||window).document;var o=qx.bom.Viewport.getWidth(m);var scroll=this.isStandardMode(m)?n.documentElement.scrollWidth:n.body.scrollWidth;return Math.max(scroll,o);}
,getHeight:function(p){var q=(p||window).document;var r=qx.bom.Viewport.getHeight(p);var scroll=this.isStandardMode(p)?q.documentElement.scrollHeight:q.body.scrollHeight;return Math.max(scroll,r);}
}});}
)();
(function(){var l="engine.name",k="x",j="osx",i="win",h="qx.dynamicmousewheel",g="chrome",f="qx.event.type.MouseWheel",d="browser.name",c="y",b="os.name",a="engine.version";qx.Class.define(f,{extend:qx.event.type.Mouse,statics:{MAXSCROLL:null,MINSCROLL:null,FACTOR:1},members:{stop:function(){this.stopPropagation();this.preventDefault();}
,__fO:function(m){var n=Math.abs(m);if(qx.event.type.MouseWheel.MINSCROLL==null||qx.event.type.MouseWheel.MINSCROLL>n){qx.event.type.MouseWheel.MINSCROLL=n;this.__fP();}
;if(qx.event.type.MouseWheel.MAXSCROLL==null||qx.event.type.MouseWheel.MAXSCROLL<n){qx.event.type.MouseWheel.MAXSCROLL=n;this.__fP();}
;if(qx.event.type.MouseWheel.MAXSCROLL===n&&qx.event.type.MouseWheel.MINSCROLL===n){return 2*(m/n);}
;var o=qx.event.type.MouseWheel.MAXSCROLL-qx.event.type.MouseWheel.MINSCROLL;var p=(m/o)*Math.log(o)*qx.event.type.MouseWheel.FACTOR;return p<0?Math.min(p,-1):Math.max(p,1);}
,__fP:function(){var q=qx.event.type.MouseWheel.MAXSCROLL||0;var t=qx.event.type.MouseWheel.MINSCROLL||q;if(q<=t){return;}
;var r=q-t;var s=(q/r)*Math.log(r);if(s==0){s=1;}
;qx.event.type.MouseWheel.FACTOR=6/s;}
,getWheelDelta:function(u){var e=this._native;if(u===undefined){if(v===undefined){var v=-e.wheelDelta;if(e.wheelDelta===undefined){v=e.detail;}
;}
;return this.__fQ(v);}
;if(u===k){var x=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaX!==undefined){x=e.wheelDeltaX?this.__fQ(-e.wheelDeltaX):0;}
;}
else {if(e.axis&&e.axis==e.HORIZONTAL_AXIS){x=this.__fQ(e.detail);}
;}
;return x;}
;if(u===c){var y=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaY!==undefined){y=e.wheelDeltaY?this.__fQ(-e.wheelDeltaY):0;}
else {y=this.__fQ(-e.wheelDelta);}
;}
else {if(!(e.axis&&e.axis==e.HORIZONTAL_AXIS)){y=this.__fQ(e.detail);}
;}
;return y;}
;return 0;}
,__fQ:function(w){if(qx.core.Environment.get(h)){return this.__fO(w);}
else {var z=qx.core.Environment.select(l,{"default":function(){return w/40;}
,"gecko":function(){return w;}
,"webkit":function(){if(qx.core.Environment.get(d)==g){if(qx.core.Environment.get(b)==j){return w/60;}
else {return w/120;}
;}
else {if(qx.core.Environment.get(b)==i){var A=120;if(parseFloat(qx.core.Environment.get(a))==533.16){A=1200;}
;}
else {A=40;if(parseFloat(qx.core.Environment.get(a))==533.16||parseFloat(qx.core.Environment.get(a))==533.17||parseFloat(qx.core.Environment.get(a))==533.18){A=1200;}
;}
;return w/A;}
;}
});return z.call(this);}
;}
}});}
)();
(function(){var g="qx.dom.Hierarchy",f="previousSibling",e="nextSibling",d="parentNode",c="*",b="html.element.compareDocumentPosition",a="html.element.contains";qx.Bootstrap.define(g,{statics:{getNodeIndex:function(h){var i=0;while(h&&(h=h.previousSibling)){i++;}
;return i;}
,getElementIndex:function(j){var k=0;var l=qx.dom.Node.ELEMENT;while(j&&(j=j.previousSibling)){if(j.nodeType==l){k++;}
;}
;return k;}
,getNextElementSibling:function(m){while(m&&(m=m.nextSibling)&&!qx.dom.Node.isElement(m)){continue;}
;return m||null;}
,getPreviousElementSibling:function(n){while(n&&(n=n.previousSibling)&&!qx.dom.Node.isElement(n)){continue;}
;return n||null;}
,contains:function(o,p){if(qx.core.Environment.get(a)){if(qx.dom.Node.isDocument(o)){var q=qx.dom.Node.getDocument(p);return o&&q==o;}
else if(qx.dom.Node.isDocument(p)){return false;}
else {return o.contains(p);}
;}
else if(qx.core.Environment.get(b)){return !!(o.compareDocumentPosition(p)&16);}
else {while(p){if(o==p){return true;}
;p=p.parentNode;}
;return false;}
;}
,isRendered:function(r){var s=r.ownerDocument||r.document;if(qx.core.Environment.get(a)){if(!r.parentNode||!r.offsetParent){return false;}
;return s.body.contains(r);}
else if(qx.core.Environment.get(b)){return !!(s.compareDocumentPosition(r)&16);}
else {while(r){if(r==s.body){return true;}
;r=r.parentNode;}
;return false;}
;}
,isDescendantOf:function(t,u){return this.contains(u,t);}
,getCommonParent:function(v,w){if(v===w){return v;}
;if(qx.core.Environment.get(a)){while(v&&qx.dom.Node.isElement(v)){if(v.contains(w)){return v;}
;v=v.parentNode;}
;return null;}
else {var x=[];while(v||w){if(v){if(qx.lang.Array.contains(x,v)){return v;}
;x.push(v);v=v.parentNode;}
;if(w){if(qx.lang.Array.contains(x,w)){return w;}
;x.push(w);w=w.parentNode;}
;}
;return null;}
;}
,getAncestors:function(y){return this._recursivelyCollect(y,d);}
,getChildElements:function(z){z=z.firstChild;if(!z){return [];}
;var A=this.getNextSiblings(z);if(z.nodeType===1){A.unshift(z);}
;return A;}
,getDescendants:function(B){return qx.lang.Array.fromCollection(B.getElementsByTagName(c));}
,getFirstDescendant:function(C){C=C.firstChild;while(C&&C.nodeType!=1){C=C.nextSibling;}
;return C;}
,getLastDescendant:function(D){D=D.lastChild;while(D&&D.nodeType!=1){D=D.previousSibling;}
;return D;}
,getPreviousSiblings:function(E){return this._recursivelyCollect(E,f);}
,getNextSiblings:function(F){return this._recursivelyCollect(F,e);}
,_recursivelyCollect:function(G,H){var I=[];while(G=G[H]){if(G.nodeType==1){I.push(G);}
;}
;return I;}
,getSiblings:function(J){return this.getPreviousSiblings(J).reverse().concat(this.getNextSiblings(J));}
,isEmpty:function(K){K=K.firstChild;while(K){if(K.nodeType===qx.dom.Node.ELEMENT||K.nodeType===qx.dom.Node.TEXT){return false;}
;K=K.nextSibling;}
;return true;}
,cleanWhitespace:function(L){var M=L.firstChild;while(M){var N=M.nextSibling;if(M.nodeType==3&&!/\S/.test(M.nodeValue)){L.removeChild(M);}
;M=N;}
;}
}});}
)();
(function(){var o="function",n="html.video.h264",m="html.element.contains",l='video/ogg; codecs="theora, vorbis"',k="html.console",j="html.xul",i="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",h="html.video.ogg",g="http://www.w3.org/TR/SVG11/feature#BasicStructure",f="html.storage.local",bq="qx.bom.client.Html",bp='audio',bo='video/mp4; codecs="avc1.42E01E, mp4a.40.2"',bn="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",bm="html.audio",bl="url(#default#VML)",bk="audio/mpeg",bj="org.w3c.dom.svg",bi="html.classlist",bh="html.svg",w="html.video",x="html.geolocation",t="DOMTokenList",u="html.storage.session",r="1.1",s="object",p="html.image.naturaldimensions",q="html.audio.aif",C="audio/x-wav",D='<v:shape id="vml_flag1" adj="1" />',M="html.canvas",J="audio/ogg",U="html.storage.userdata",P="html.element.compareDocumentPosition",bd="audio/x-aiff",ba="html.audio.au",F="img",bg="html.xpath",bf="qxtest",be='video',E="span",H="html.element.textcontent",I="html.audio.mp3",L="html.vml",N="html.audio.ogg",Q="none",W="label",bc='video/webm; codecs="vp8, vorbis"',y="html.dataurl",z="html.webworker",G="html.dataset",T="1.0",S="html.audio.wav",R="html.filereader",Y="audio/basic",X="#default#userdata",O="html.video.webm",V="display",b="div",bb="head",A="number",B="video",K="undefined",c="audio",d="";qx.Bootstrap.define(bq,{statics:{getWebWorker:function(){return window.Worker!=null;}
,getFileReader:function(){return window.FileReader!=null;}
,getGeoLocation:function(){return navigator.geolocation!=null;}
,getAudio:function(){return !!document.createElement(bp).canPlayType;}
,getAudioOgg:function(){if(!qx.bom.client.Html.getAudio()){return d;}
;var a=document.createElement(c);return a.canPlayType(J);}
,getAudioMp3:function(){if(!qx.bom.client.Html.getAudio()){return d;}
;var a=document.createElement(c);return a.canPlayType(bk);}
,getAudioWav:function(){if(!qx.bom.client.Html.getAudio()){return d;}
;var a=document.createElement(c);return a.canPlayType(C);}
,getAudioAu:function(){if(!qx.bom.client.Html.getAudio()){return d;}
;var a=document.createElement(c);return a.canPlayType(Y);}
,getAudioAif:function(){if(!qx.bom.client.Html.getAudio()){return d;}
;var a=document.createElement(c);return a.canPlayType(bd);}
,getVideo:function(){return !!document.createElement(be).canPlayType;}
,getVideoOgg:function(){if(!qx.bom.client.Html.getVideo()){return d;}
;var v=document.createElement(B);return v.canPlayType(l);}
,getVideoH264:function(){if(!qx.bom.client.Html.getVideo()){return d;}
;var v=document.createElement(B);return v.canPlayType(bo);}
,getVideoWebm:function(){if(!qx.bom.client.Html.getVideo()){return d;}
;var v=document.createElement(B);return v.canPlayType(bc);}
,getLocalStorage:function(){try{return window.localStorage!=null;}
catch(br){return false;}
;}
,getSessionStorage:function(){try{return window.sessionStorage!=null;}
catch(bs){return false;}
;}
,getUserDataStorage:function(){var bt=document.createElement(b);bt.style[V]=Q;document.getElementsByTagName(bb)[0].appendChild(bt);var bu=false;try{bt.addBehavior(X);bt.load(bf);bu=true;}
catch(e){}
;document.getElementsByTagName(bb)[0].removeChild(bt);return bu;}
,getClassList:function(){return !!(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)===t);}
,getXPath:function(){return !!document.evaluate;}
,getXul:function(){try{document.createElementNS(i,W);return true;}
catch(e){return false;}
;}
,getSvg:function(){return document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature(bj,T)||document.implementation.hasFeature(g,r));}
,getVml:function(){var bv=document.createElement(b);document.body.appendChild(bv);bv.innerHTML=D;bv.firstChild.style.behavior=bl;var bw=typeof bv.firstChild.adj==s;document.body.removeChild(bv);return bw;}
,getCanvas:function(){return !!window.CanvasRenderingContext2D;}
,getDataUrl:function(bx){var by=new Image();by.onload=by.onerror=function(){window.setTimeout(function(){bx.call(null,(by.width==1&&by.height==1));}
,0);}
;by.src=bn;}
,getDataset:function(){return !!document.documentElement.dataset;}
,getContains:function(){return (typeof document.documentElement.contains!==K);}
,getCompareDocumentPosition:function(){return (typeof document.documentElement.compareDocumentPosition===o);}
,getTextContent:function(){var bz=document.createElement(E);return (typeof bz.textContent!==K);}
,getConsole:function(){return typeof window.console!==K;}
,getNaturalDimensions:function(){var bA=document.createElement(F);return typeof bA.naturalHeight===A&&typeof bA.naturalWidth===A;}
},defer:function(bB){qx.core.Environment.add(z,bB.getWebWorker);qx.core.Environment.add(R,bB.getFileReader);qx.core.Environment.add(x,bB.getGeoLocation);qx.core.Environment.add(bm,bB.getAudio);qx.core.Environment.add(N,bB.getAudioOgg);qx.core.Environment.add(I,bB.getAudioMp3);qx.core.Environment.add(S,bB.getAudioWav);qx.core.Environment.add(ba,bB.getAudioAu);qx.core.Environment.add(q,bB.getAudioAif);qx.core.Environment.add(w,bB.getVideo);qx.core.Environment.add(h,bB.getVideoOgg);qx.core.Environment.add(n,bB.getVideoH264);qx.core.Environment.add(O,bB.getVideoWebm);qx.core.Environment.add(f,bB.getLocalStorage);qx.core.Environment.add(u,bB.getSessionStorage);qx.core.Environment.add(U,bB.getUserDataStorage);qx.core.Environment.add(bi,bB.getClassList);qx.core.Environment.add(bg,bB.getXPath);qx.core.Environment.add(j,bB.getXul);qx.core.Environment.add(M,bB.getCanvas);qx.core.Environment.add(bh,bB.getSvg);qx.core.Environment.add(L,bB.getVml);qx.core.Environment.add(G,bB.getDataset);qx.core.Environment.addAsync(y,bB.getDataUrl);qx.core.Environment.add(m,bB.getContains);qx.core.Environment.add(P,bB.getCompareDocumentPosition);qx.core.Environment.add(H,bB.getTextContent);qx.core.Environment.add(k,bB.getConsole);qx.core.Environment.add(p,bB.getNaturalDimensions);}
});}
)();
(function(){var k="PageUp",j="Escape",i="Enter",h="PrintScreen",g="7",f="Left",e="5",d="F5",c="Down",b="Up",bi="3",bh="Meta",bg="F11",bf="F6",be="PageDown",bd="CapsLock",bc="Insert",bb="F8",ba="Scroll",Y="Control",r="Tab",s="Shift",p="End",q="Pause",n="Unidentified",o="8",l="F1",m="F4",v="Home",w="qx.event.util.Keyboard",E="F2",C="6",M="F7",H="Apps",U="4",R="F12",y="Alt",X="2",W="NumLock",V="Delete",x="1",A="Backspace",B="F9",D="F10",F="Right",I="F3",O=",",T="-",t="+",u="os.name",z="A",L="Space",K="osx",J="/",Q="Z",P="*",G="cmd",N="Win",a="0",S="9";qx.Bootstrap.define(w,{statics:{specialCharCodeMap:{'8':A,'9':r,'13':i,'27':j,'32':L},numpadToCharCode:{'96':a.charCodeAt(0),'97':x.charCodeAt(0),'98':X.charCodeAt(0),'99':bi.charCodeAt(0),'100':U.charCodeAt(0),'101':e.charCodeAt(0),'102':C.charCodeAt(0),'103':g.charCodeAt(0),'104':o.charCodeAt(0),'105':S.charCodeAt(0),'106':P.charCodeAt(0),'107':t.charCodeAt(0),'109':T.charCodeAt(0),'110':O.charCodeAt(0),'111':J.charCodeAt(0)},keyCodeToIdentifierMap:{'16':s,'17':Y,'18':y,'20':bd,'224':bh,'37':f,'38':b,'39':F,'40':c,'33':k,'34':be,'35':p,'36':v,'45':bc,'46':V,'112':l,'113':E,'114':I,'115':m,'116':d,'117':bf,'118':M,'119':bb,'120':B,'121':D,'122':bg,'123':R,'144':W,'44':h,'145':ba,'19':q,'91':qx.core.Environment.get(u)==K?G:N,'92':N,'93':qx.core.Environment.get(u)==K?G:H},charCodeA:z.charCodeAt(0),charCodeZ:Q.charCodeAt(0),charCode0:a.charCodeAt(0),charCode9:S.charCodeAt(0),keyCodeToIdentifier:function(bj){if(this.isIdentifiableKeyCode(bj)){var bk=this.numpadToCharCode[bj];if(bk){return String.fromCharCode(bk);}
;return (this.keyCodeToIdentifierMap[bj]||this.specialCharCodeMap[bj]||String.fromCharCode(bj));}
else {return n;}
;}
,charCodeToIdentifier:function(bl){return this.specialCharCodeMap[bl]||String.fromCharCode(bl).toUpperCase();}
,isIdentifiableKeyCode:function(bm){if(bm>=this.charCodeA&&bm<=this.charCodeZ){return true;}
;if(bm>=this.charCode0&&bm<=this.charCode9){return true;}
;if(this.specialCharCodeMap[bm]){return true;}
;if(this.numpadToCharCode[bm]){return true;}
;if(this.isNonPrintableKeyCode(bm)){return true;}
;return false;}
,isNonPrintableKeyCode:function(bn){return this.keyCodeToIdentifierMap[bn]?true:false;}
,isValidKeyIdentifier:function(bo){if(this.identifierToKeyCodeMap[bo]){return true;}
;if(bo.length!=1){return false;}
;if(bo>=a&&bo<=S){return true;}
;if(bo>=z&&bo<=Q){return true;}
;switch(bo){case t:case T:case P:case J:return true;default:return false;};}
,isPrintableKeyIdentifier:function(bp){if(bp===L){return true;}
else {return this.identifierToKeyCodeMap[bp]?false:true;}
;}
},defer:function(bq,br){if(!bq.identifierToKeyCodeMap){bq.identifierToKeyCodeMap={};for(var bs in bq.keyCodeToIdentifierMap){bq.identifierToKeyCodeMap[bq.keyCodeToIdentifierMap[bs]]=parseInt(bs,10);}
;for(var bs in bq.specialCharCodeMap){bq.identifierToKeyCodeMap[bq.specialCharCodeMap[bs]]=parseInt(bs,10);}
;}
;}
});}
)();
(function(){var j="text",i="os.name",h="F11",g="PrintScreen",f="PageUp",e="gecko",d="F1",c="Left",b="F5",a="Down",V="Up",U="F3",T="Use qx.event.util.Keyboard.isValidKeyIdentifier instead.",S="Use qx.event.util.Keyboard.keyCodeToIdentifier instead.",R="F6",Q="Insert",P="F8",O="input",N="End",M="Delete",q="qx.event.handler.Keyboard",r="win",o="Use qx.event.util.Keyboard.isNonPrintableKeyCode instead.",p="Home",m="F2",n="Use qx.event.util.Keyboard.charCodeToIdentifier instead.",k="Use qx.event.util.Keyboard.isPrintableKeyIdentifier instead.",l="Right",s="F12",t="F4",A="PageDown",y="F7",E="Use qx.event.util.Keyboard.isIdentifiableKeyCode instead.",C="F9",I="F10",G="off",v="autoComplete",L="Enter",K="NumLock",J="useraction",u="keyinput",w="mshtml",x="webkit",z="engine.version",B="keyup",D="keypress",F="engine.name",H="keydown";qx.Class.define(q,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(W){qx.core.Object.call(this);this.__eQ=W;this.__ce=W.getWindow();if((qx.core.Environment.get(F)==e)){this.__dd=this.__ce;}
else {this.__dd=this.__ce.document.documentElement;}
;this.__fR={};this._initKeyObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,isValidKeyIdentifier:function(X){qx.log.Logger.deprecatedMethodWarning(arguments.callee,T);return qx.event.util.Keyboard.isValidKeyIdentifier(X);}
,isPrintableKeyIdentifier:function(Y){qx.log.Logger.deprecatedMethodWarning(arguments.callee,k);return qx.event.util.Keyboard.isPrintableKeyIdentifier(Y);}
},members:{__fS:null,__eQ:null,__ce:null,__dd:null,__fR:null,__fT:null,__fU:null,__fV:null,canHandleEvent:function(ba,bb){}
,registerEvent:function(bc,bd,be){}
,unregisterEvent:function(bf,bg,bh){}
,_fireInputEvent:function(bi,bj){var bk=this.__fW();if(bk&&bk.offsetWidth!=0){var event=qx.event.Registration.createEvent(u,qx.event.type.KeyInput,[bi,bk,bj]);this.__eQ.dispatchEvent(bk,event);}
;if(this.__ce){qx.event.Registration.fireEvent(this.__ce,J,qx.event.type.Data,[u]);}
;}
,_fireSequenceEvent:function(bl,bm,bn){var bo=this.__fW();var bp=bl.keyCode;var event=qx.event.Registration.createEvent(bm,qx.event.type.KeySequence,[bl,bo,bn]);this.__eQ.dispatchEvent(bo,event);if(qx.core.Environment.get(F)==w||qx.core.Environment.get(F)==x){if(bm==H&&event.getDefaultPrevented()){if(!qx.event.util.Keyboard.isNonPrintableKeyCode(bp)&&!this._emulateKeyPress[bp]){this._fireSequenceEvent(bl,D,bn);}
;}
;}
;if(this.__ce){qx.event.Registration.fireEvent(this.__ce,J,qx.event.type.Data,[bm]);}
;}
,__fW:function(){var bq=this.__eQ.getHandler(qx.event.handler.Focus);var br=bq.getActive();if(!br||br.offsetWidth==0){br=bq.getFocus();}
;if(!br||br.offsetWidth==0){br=this.__eQ.getWindow().document.body;}
;return br;}
,_initKeyObserver:function(){this.__fS=qx.lang.Function.listener(this.__fX,this);this.__fV=qx.lang.Function.listener(this.__ga,this);var Event=qx.bom.Event;Event.addNativeListener(this.__dd,B,this.__fS);Event.addNativeListener(this.__dd,H,this.__fS);Event.addNativeListener(this.__dd,D,this.__fV);}
,_stopKeyObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__dd,B,this.__fS);Event.removeNativeListener(this.__dd,H,this.__fS);Event.removeNativeListener(this.__dd,D,this.__fV);for(var bt in (this.__fU||{})){var bs=this.__fU[bt];Event.removeNativeListener(bs.target,D,bs.callback);}
;delete (this.__fU);}
,__fX:qx.event.GlobalError.observeMethod(qx.core.Environment.select(F,{"mshtml":function(bu){bu=window.event||bu;var bx=bu.keyCode;var bv=0;var bw=bu.type;if(!(this.__fR[bx]==H&&bw==H)){this._idealKeyHandler(bx,bv,bw,bu);}
;if(bw==H){if(qx.event.util.Keyboard.isNonPrintableKeyCode(bx)||this._emulateKeyPress[bx]){this._idealKeyHandler(bx,bv,D,bu);}
;}
;this.__fR[bx]=bw;}
,"gecko":function(by){var bA=0;var bC=by.keyCode;var bB=by.type;var bz=qx.event.util.Keyboard;if(qx.core.Environment.get(i)==r){var bD=bC?bz.keyCodeToIdentifier(bC):bz.charCodeToIdentifier(bA);if(!(this.__fR[bD]==H&&bB==H)){this._idealKeyHandler(bC,bA,bB,by);}
;this.__fR[bD]=bB;}
else {this._idealKeyHandler(bC,bA,bB,by);}
;this.__fY(by.target,bB,bC);}
,"webkit":function(bE){var bH=0;var bF=0;var bG=bE.type;if(parseFloat(qx.core.Environment.get(z))<525.13){if(bG==B||bG==H){bH=this._charCode2KeyCode[bE.charCode]||bE.keyCode;}
else {if(this._charCode2KeyCode[bE.charCode]){bH=this._charCode2KeyCode[bE.charCode];}
else {bF=bE.charCode;}
;}
;this._idealKeyHandler(bH,bF,bG,bE);}
else {bH=bE.keyCode;this._idealKeyHandler(bH,bF,bG,bE);if(bG==H){if(qx.event.util.Keyboard.isNonPrintableKeyCode(bH)||this._emulateKeyPress[bH]){this._idealKeyHandler(bH,bF,D,bE);}
;}
;this.__fR[bH]=bG;}
;}
,"opera":function(bI){this.__fT=bI.keyCode;this._idealKeyHandler(bI.keyCode,0,bI.type,bI);}
})),__fY:qx.core.Environment.select(F,{"gecko":function(bJ,bK,bL){if(bK===H&&(bL==33||bL==34||bL==38||bL==40)&&bJ.type==j&&bJ.tagName.toLowerCase()===O&&bJ.getAttribute(v)!==G){if(!this.__fU){this.__fU={};}
;var bN=qx.core.ObjectRegistry.toHashCode(bJ);if(this.__fU[bN]){return;}
;var self=this;this.__fU[bN]={target:bJ,callback:function(bO){qx.bom.Event.stopPropagation(bO);self.__ga(bO);}
};var bM=qx.event.GlobalError.observeMethod(this.__fU[bN].callback);qx.bom.Event.addNativeListener(bJ,D,bM);}
;}
,"default":null}),__ga:qx.event.GlobalError.observeMethod(qx.core.Environment.select(F,{"mshtml":function(bP){bP=window.event||bP;if(this._charCode2KeyCode[bP.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bP.keyCode],0,bP.type,bP);}
else {this._idealKeyHandler(0,bP.keyCode,bP.type,bP);}
;}
,"gecko":function(bQ){var bR=bQ.charCode;var bS=bQ.type;this._idealKeyHandler(bQ.keyCode,bR,bS,bQ);}
,"webkit":function(bT){if(parseFloat(qx.core.Environment.get(z))<525.13){var bW=0;var bU=0;var bV=bT.type;if(bV==B||bV==H){bW=this._charCode2KeyCode[bT.charCode]||bT.keyCode;}
else {if(this._charCode2KeyCode[bT.charCode]){bW=this._charCode2KeyCode[bT.charCode];}
else {bU=bT.charCode;}
;}
;this._idealKeyHandler(bW,bU,bV,bT);}
else {if(this._charCode2KeyCode[bT.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bT.keyCode],0,bT.type,bT);}
else {this._idealKeyHandler(0,bT.keyCode,bT.type,bT);}
;}
;}
,"opera":function(bX){var ca=bX.keyCode;var bY=bX.type;if(ca!=this.__fT){this._idealKeyHandler(0,this.__fT,bY,bX);}
else {if(qx.event.util.Keyboard.keyCodeToIdentifierMap[bX.keyCode]){this._idealKeyHandler(bX.keyCode,0,bX.type,bX);}
else {this._idealKeyHandler(0,bX.keyCode,bX.type,bX);}
;}
;}
})),_idealKeyHandler:function(cb,cc,cd,ce){var cf;if(cb||(!cb&&!cc)){cf=qx.event.util.Keyboard.keyCodeToIdentifier(cb);this._fireSequenceEvent(ce,cd,cf);}
else {cf=qx.event.util.Keyboard.charCodeToIdentifier(cc);this._fireSequenceEvent(ce,D,cf);this._fireInputEvent(ce,cc);}
;}
,_emulateKeyPress:qx.core.Environment.select(F,{"mshtml":{'8':true,'9':true},"webkit":{'8':true,'9':true,'27':true},"default":{}}),_isNonPrintableKeyCode:function(cg){qx.log.Logger.deprecatedMethodWarning(arguments.callee,o);return qx.event.util.Keyboard.isNonPrintableKeyCode(cg);}
,_isIdentifiableKeyCode:function(ch){qx.log.Logger.deprecatedMethodWarning(arguments.callee,E);return qx.event.util.Keyboard.isIdentifiableKeyCode(ch);}
,_keyCodeToIdentifier:function(ci){qx.log.Logger.deprecatedMethodWarning(arguments.callee,S);return qx.event.util.Keyboard.keyCodeToIdentifier(ci);}
,_charCodeToIdentifier:function(cj){qx.log.Logger.deprecatedMethodWarning(arguments.callee,n);return qx.event.util.Keyboard.charCodeToIdentifier(cj);}
,_identifierToKeyCode:function(ck){return qx.event.util.Keyboard.identifierToKeyCodeMap[ck]||ck.charCodeAt(0);}
},destruct:function(){this._stopKeyObserver();this.__fT=this.__eQ=this.__ce=this.__dd=this.__fR=null;}
,defer:function(cl,cm){qx.event.Registration.addHandler(cl);if((qx.core.Environment.get(F)==w)){cm._charCode2KeyCode={'13':13,'27':27};}
else if((qx.core.Environment.get(F)==x)){if(parseFloat(qx.core.Environment.get(z))<525.13){cm._charCode2KeyCode={'63289':cm._identifierToKeyCode(K),'63276':cm._identifierToKeyCode(f),'63277':cm._identifierToKeyCode(A),'63275':cm._identifierToKeyCode(N),'63273':cm._identifierToKeyCode(p),'63234':cm._identifierToKeyCode(c),'63232':cm._identifierToKeyCode(V),'63235':cm._identifierToKeyCode(l),'63233':cm._identifierToKeyCode(a),'63272':cm._identifierToKeyCode(M),'63302':cm._identifierToKeyCode(Q),'63236':cm._identifierToKeyCode(d),'63237':cm._identifierToKeyCode(m),'63238':cm._identifierToKeyCode(U),'63239':cm._identifierToKeyCode(t),'63240':cm._identifierToKeyCode(b),'63241':cm._identifierToKeyCode(R),'63242':cm._identifierToKeyCode(y),'63243':cm._identifierToKeyCode(P),'63244':cm._identifierToKeyCode(C),'63245':cm._identifierToKeyCode(I),'63246':cm._identifierToKeyCode(h),'63247':cm._identifierToKeyCode(s),'63248':cm._identifierToKeyCode(g),'3':cm._identifierToKeyCode(L),'12':cm._identifierToKeyCode(K),'13':cm._identifierToKeyCode(L)};}
else {cm._charCode2KeyCode={'13':13,'27':27};}
;}
;}
});}
)();
(function(){var a="qx.event.type.KeyInput";qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);this._charCode=d;return this;}
,clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);f._charCode=this._charCode;return f;}
,getCharCode:function(){return this._charCode;}
,getChar:function(){return String.fromCharCode(this._charCode);}
}});}
)();
(function(){var a="qx.event.type.KeySequence";qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(b,c,d){qx.event.type.Dom.prototype.init.call(this,b,c,null,true,true);this._keyCode=b.keyCode;this._identifier=d;return this;}
,clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);f._keyCode=this._keyCode;f._identifier=this._identifier;return f;}
,getKeyIdentifier:function(){return this._identifier;}
,getKeyCode:function(){return this._keyCode;}
,isPrintable:function(){return qx.event.util.Keyboard.isPrintableKeyIdentifier(this._identifier);}
}});}
)();
(function(){var j="qx.event.handler.Focus",i="_applyFocus",h="deactivate",g="textarea",f="_applyActive",e='character',d="input",c="qxSelectable",b="tabIndex",a="off",z="activate",y="mshtml",x="qxKeepFocus",w="qxKeepActive",v="DOMFocusIn",u="draggesture",t="focusin",s="focusout",r="selectstart",q="DOMFocusOut",o="on",p="blur",m="focus",n="mousedown",k="mouseup",l="engine.name";qx.Class.define(j,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(A){qx.core.Object.call(this);this._manager=A;this._window=A.getWindow();this._document=this._window.document;this._root=this._document.documentElement;this._body=this._document.body;this._initObserver();}
,properties:{active:{apply:f,nullable:true},focus:{apply:i,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Environment.select("engine.name",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__gb:null,__gc:null,__gd:null,__ge:null,__gf:null,__gg:null,__gh:null,__gi:null,__gj:null,__gk:null,canHandleEvent:function(B,C){}
,registerEvent:function(D,E,F){}
,unregisterEvent:function(G,H,I){}
,focus:function(J){if((qx.core.Environment.get(l)==y)){window.setTimeout(function(){try{J.focus();var K=qx.bom.Selection.get(J);if(K.length==0){var L=J.createTextRange();L.moveStart(e,J.value.length);L.collapse();L.select();}
;}
catch(M){}
;}
,0);}
else {try{J.focus();}
catch(N){}
;}
;this.setFocus(J);this.setActive(J);}
,activate:function(O){this.setActive(O);}
,blur:function(P){try{P.blur();}
catch(Q){}
;if(this.getActive()===P){this.resetActive();}
;if(this.getFocus()===P){this.resetFocus();}
;}
,deactivate:function(R){if(this.getActive()===R){this.resetActive();}
;}
,tryActivate:function(S){var T=this.__gy(S);if(T){this.setActive(T);}
;}
,__fG:function(U,V,W,X){var ba=qx.event.Registration;var Y=ba.createEvent(W,qx.event.type.Focus,[U,V,X]);ba.dispatchEvent(U,Y);}
,_windowFocused:true,__gl:function(){if(this._windowFocused){this._windowFocused=false;this.__fG(this._window,null,p,false);}
;}
,__gm:function(){if(!this._windowFocused){this._windowFocused=true;this.__fG(this._window,null,m,false);}
;}
,_initObserver:qx.core.Environment.select(l,{"gecko":function(){this.__gb=qx.lang.Function.listener(this.__gs,this);this.__gc=qx.lang.Function.listener(this.__gt,this);this.__gd=qx.lang.Function.listener(this.__gr,this);this.__ge=qx.lang.Function.listener(this.__gq,this);this.__gf=qx.lang.Function.listener(this.__gn,this);qx.bom.Event.addNativeListener(this._document,n,this.__gb,true);qx.bom.Event.addNativeListener(this._document,k,this.__gc,true);qx.bom.Event.addNativeListener(this._window,m,this.__gd,true);qx.bom.Event.addNativeListener(this._window,p,this.__ge,true);qx.bom.Event.addNativeListener(this._window,u,this.__gf,true);}
,"mshtml":function(){this.__gb=qx.lang.Function.listener(this.__gs,this);this.__gc=qx.lang.Function.listener(this.__gt,this);this.__gh=qx.lang.Function.listener(this.__go,this);this.__gi=qx.lang.Function.listener(this.__gp,this);this.__gg=qx.lang.Function.listener(this.__gv,this);qx.bom.Event.addNativeListener(this._document,n,this.__gb);qx.bom.Event.addNativeListener(this._document,k,this.__gc);qx.bom.Event.addNativeListener(this._document,t,this.__gh);qx.bom.Event.addNativeListener(this._document,s,this.__gi);qx.bom.Event.addNativeListener(this._document,r,this.__gg);}
,"webkit":function(){this.__gb=qx.lang.Function.listener(this.__gs,this);this.__gc=qx.lang.Function.listener(this.__gt,this);this.__gi=qx.lang.Function.listener(this.__gp,this);this.__gd=qx.lang.Function.listener(this.__gr,this);this.__ge=qx.lang.Function.listener(this.__gq,this);this.__gg=qx.lang.Function.listener(this.__gv,this);qx.bom.Event.addNativeListener(this._document,n,this.__gb,true);qx.bom.Event.addNativeListener(this._document,k,this.__gc,true);qx.bom.Event.addNativeListener(this._document,r,this.__gg,false);qx.bom.Event.addNativeListener(this._window,q,this.__gi,true);qx.bom.Event.addNativeListener(this._window,m,this.__gd,true);qx.bom.Event.addNativeListener(this._window,p,this.__ge,true);}
,"opera":function(){this.__gb=qx.lang.Function.listener(this.__gs,this);this.__gc=qx.lang.Function.listener(this.__gt,this);this.__gh=qx.lang.Function.listener(this.__go,this);this.__gi=qx.lang.Function.listener(this.__gp,this);qx.bom.Event.addNativeListener(this._document,n,this.__gb,true);qx.bom.Event.addNativeListener(this._document,k,this.__gc,true);qx.bom.Event.addNativeListener(this._window,v,this.__gh,true);qx.bom.Event.addNativeListener(this._window,q,this.__gi,true);}
}),_stopObserver:qx.core.Environment.select(l,{"gecko":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__gb,true);qx.bom.Event.removeNativeListener(this._document,k,this.__gc,true);qx.bom.Event.removeNativeListener(this._window,m,this.__gd,true);qx.bom.Event.removeNativeListener(this._window,p,this.__ge,true);qx.bom.Event.removeNativeListener(this._window,u,this.__gf,true);}
,"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__gb);qx.bom.Event.removeNativeListener(this._document,k,this.__gc);qx.bom.Event.removeNativeListener(this._document,t,this.__gh);qx.bom.Event.removeNativeListener(this._document,s,this.__gi);qx.bom.Event.removeNativeListener(this._document,r,this.__gg);}
,"webkit":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__gb,true);qx.bom.Event.removeNativeListener(this._document,k,this.__gc,true);qx.bom.Event.removeNativeListener(this._document,r,this.__gg,false);qx.bom.Event.removeNativeListener(this._window,q,this.__gi,true);qx.bom.Event.removeNativeListener(this._window,m,this.__gd,true);qx.bom.Event.removeNativeListener(this._window,p,this.__ge,true);}
,"opera":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__gb,true);qx.bom.Event.removeNativeListener(this._document,k,this.__gc,true);qx.bom.Event.removeNativeListener(this._window,v,this.__gh,true);qx.bom.Event.removeNativeListener(this._window,q,this.__gi,true);}
}),__gn:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"gecko":function(bb){var bc=qx.bom.Event.getTarget(bb);if(!this.__gz(bc)){qx.bom.Event.preventDefault(bb);}
;}
,"default":null})),__go:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bd){this.__gm();var bf=qx.bom.Event.getTarget(bd);var be=this.__gx(bf);if(be){this.setFocus(be);}
;this.tryActivate(bf);}
,"opera":function(bg){var bh=qx.bom.Event.getTarget(bg);if(bh==this._document||bh==this._window){this.__gm();if(this.__gj){this.setFocus(this.__gj);delete this.__gj;}
;if(this.__gk){this.setActive(this.__gk);delete this.__gk;}
;}
else {this.setFocus(bh);this.tryActivate(bh);if(!this.__gz(bh)){bh.selectionStart=0;bh.selectionEnd=0;}
;}
;}
,"default":null})),__gp:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bi){var bj=qx.bom.Event.getRelatedTarget(bi);if(bj==null){this.__gl();this.resetFocus();this.resetActive();}
;}
,"webkit":function(bk){var bl=qx.bom.Event.getTarget(bk);if(bl===this.getFocus()){this.resetFocus();}
;if(bl===this.getActive()){this.resetActive();}
;}
,"opera":function(bm){var bn=qx.bom.Event.getTarget(bm);if(bn==this._document){this.__gl();this.__gj=this.getFocus();this.__gk=this.getActive();this.resetFocus();this.resetActive();}
else {if(bn===this.getFocus()){this.resetFocus();}
;if(bn===this.getActive()){this.resetActive();}
;}
;}
,"default":null})),__gq:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"gecko":function(bo){var bp=qx.bom.Event.getTarget(bo);if(bp===this._window||bp===this._document){this.__gl();this.resetActive();this.resetFocus();}
;}
,"webkit":function(bq){var br=qx.bom.Event.getTarget(bq);if(br===this._window||br===this._document){this.__gl();this.__gj=this.getFocus();this.__gk=this.getActive();this.resetActive();this.resetFocus();}
;}
,"default":null})),__gr:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"gecko":function(bs){var bt=qx.bom.Event.getTarget(bs);if(bt===this._window||bt===this._document){this.__gm();bt=this._body;}
;this.setFocus(bt);this.tryActivate(bt);}
,"webkit":function(bu){var bv=qx.bom.Event.getTarget(bu);if(bv===this._window||bv===this._document){this.__gm();if(this.__gj){this.setFocus(this.__gj);delete this.__gj;}
;if(this.__gk){this.setActive(this.__gk);delete this.__gk;}
;}
else {this.setFocus(bv);this.tryActivate(bv);}
;}
,"default":null})),__gs:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bw){var by=qx.bom.Event.getTarget(bw);var bx=this.__gx(by);if(bx){if(!this.__gz(by)){by.unselectable=o;try{document.selection.empty();}
catch(bz){}
;try{bx.focus();}
catch(bA){}
;}
;}
else {qx.bom.Event.preventDefault(bw);if(!this.__gz(by)){by.unselectable=o;}
;}
;}
,"webkit|gecko":function(bB){var bD=qx.bom.Event.getTarget(bB);var bC=this.__gx(bD);if(bC){this.setFocus(bC);}
else {qx.bom.Event.preventDefault(bB);}
;}
,"opera":function(bE){var bH=qx.bom.Event.getTarget(bE);var bF=this.__gx(bH);if(!this.__gz(bH)){qx.bom.Event.preventDefault(bE);if(bF){var bG=this.getFocus();if(bG&&bG.selectionEnd){bG.selectionStart=0;bG.selectionEnd=0;bG.blur();}
;if(bF){this.setFocus(bF);}
;}
;}
else if(bF){this.setFocus(bF);}
;}
,"default":null})),__gt:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bI){var bJ=qx.bom.Event.getTarget(bI);if(bJ.unselectable){bJ.unselectable=a;}
;this.tryActivate(this.__gu(bJ));}
,"gecko":function(bK){var bL=qx.bom.Event.getTarget(bK);while(bL&&bL.offsetWidth===undefined){bL=bL.parentNode;}
;if(bL){this.tryActivate(bL);}
;}
,"webkit|opera":function(bM){var bN=qx.bom.Event.getTarget(bM);this.tryActivate(this.__gu(bN));}
,"default":null})),__gu:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml|webkit":function(bO){var bP=this.getFocus();if(bP&&bO!=bP&&(bP.nodeName.toLowerCase()===d||bP.nodeName.toLowerCase()===g)){bO=bP;}
;return bO;}
,"default":function(bQ){return bQ;}
})),__gv:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml|webkit":function(bR){var bS=qx.bom.Event.getTarget(bR);if(!this.__gz(bS)){qx.bom.Event.preventDefault(bR);}
;}
,"default":null})),__gw:function(bT){var bU=qx.bom.element.Attribute.get(bT,b);if(bU>=1){return true;}
;var bV=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;if(bU>=0&&bV[bT.tagName]){return true;}
;return false;}
,__gx:function(bW){while(bW&&bW.nodeType===1){if(bW.getAttribute(x)==o){return null;}
;if(this.__gw(bW)){return bW;}
;bW=bW.parentNode;}
;return this._body;}
,__gy:function(bX){var bY=bX;while(bX&&bX.nodeType===1){if(bX.getAttribute(w)==o){return null;}
;bX=bX.parentNode;}
;return bY;}
,__gz:function(ca){while(ca&&ca.nodeType===1){var cb=ca.getAttribute(c);if(cb!=null){return cb===o;}
;ca=ca.parentNode;}
;return true;}
,_applyActive:function(cc,cd){if(cd){this.__fG(cd,cc,h,true);}
;if(cc){this.__fG(cc,cd,z,true);}
;}
,_applyFocus:function(ce,cf){if(cf){this.__fG(cf,ce,s,true);}
;if(ce){this.__fG(ce,cf,t,true);}
;if(cf){this.__fG(cf,ce,p,false);}
;if(ce){this.__fG(ce,cf,m,false);}
;}
},destruct:function(){this._stopObserver();this._manager=this._window=this._document=this._root=this._body=this.__gA=null;}
,defer:function(cg){qx.event.Registration.addHandler(cg);var ch=cg.FOCUSABLE_ELEMENTS;for(var ci in ch){ch[ci.toUpperCase()]=1;}
;}
});}
)();
(function(){var k="qx.bom.Selection",j="button",i="#text",h="body",g='character',f="input",e="StartToStart",d="textarea",c="EndToEnd",b="character",a="engine.name";qx.Class.define(k,{statics:{getSelectionObject:qx.core.Environment.select(a,{"mshtml":function(l){return l.selection;}
,"default":function(m){return qx.dom.Node.getWindow(m).getSelection();}
}),get:qx.core.Environment.select(a,{"mshtml":function(n){var o=qx.bom.Range.get(qx.dom.Node.getDocument(n));return o.text;}
,"default":function(p){if(this.__gB(p)){return p.value.substring(p.selectionStart,p.selectionEnd);}
else {return this.getSelectionObject(qx.dom.Node.getDocument(p)).toString();}
;}
}),getLength:qx.core.Environment.select(a,{"mshtml":function(q){var s=this.get(q);var r=qx.util.StringSplit.split(s,/\r\n/);return s.length-(r.length-1);}
,"opera":function(t){var y,w,u;if(this.__gB(t)){var x=t.selectionStart;var v=t.selectionEnd;y=t.value.substring(x,v);w=v-x;}
else {y=qx.bom.Selection.get(t);w=y.length;}
;u=qx.util.StringSplit.split(y,/\r\n/);return w-(u.length-1);}
,"default":function(z){if(this.__gB(z)){return z.selectionEnd-z.selectionStart;}
else {return this.get(z).length;}
;}
}),getStart:qx.core.Environment.select(a,{"mshtml":function(A){if(this.__gB(A)){var F=qx.bom.Range.get();if(!A.contains(F.parentElement())){return -1;}
;var G=qx.bom.Range.get(A);var E=A.value.length;G.moveToBookmark(F.getBookmark());G.moveEnd(g,E);return E-G.text.length;}
else {var G=qx.bom.Range.get(A);var C=G.parentElement();var H=qx.bom.Range.get();try{H.moveToElementText(C);}
catch(J){return 0;}
;var B=qx.bom.Range.get(qx.dom.Node.getBodyElement(A));B.setEndPoint(e,G);B.setEndPoint(c,H);if(H.compareEndPoints(e,B)==0){return 0;}
;var D;var I=0;while(true){D=B.moveStart(b,-1);if(H.compareEndPoints(e,B)==0){break;}
;if(D==0){break;}
else {I++;}
;}
;return ++I;}
;}
,"gecko|webkit":function(K){if(this.__gB(K)){return K.selectionStart;}
else {var M=qx.dom.Node.getDocument(K);var L=this.getSelectionObject(M);if(L.anchorOffset<L.focusOffset){return L.anchorOffset;}
else {return L.focusOffset;}
;}
;}
,"default":function(N){if(this.__gB(N)){return N.selectionStart;}
else {return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(N)).anchorOffset;}
;}
}),getEnd:qx.core.Environment.select(a,{"mshtml":function(O){if(this.__gB(O)){var T=qx.bom.Range.get();if(!O.contains(T.parentElement())){return -1;}
;var U=qx.bom.Range.get(O);var S=O.value.length;U.moveToBookmark(T.getBookmark());U.moveStart(g,-S);return U.text.length;}
else {var U=qx.bom.Range.get(O);var Q=U.parentElement();var V=qx.bom.Range.get();try{V.moveToElementText(Q);}
catch(X){return 0;}
;var S=V.text.length;var P=qx.bom.Range.get(qx.dom.Node.getBodyElement(O));P.setEndPoint(c,U);P.setEndPoint(e,V);if(V.compareEndPoints(c,P)==0){return S-1;}
;var R;var W=0;while(true){R=P.moveEnd(b,1);if(V.compareEndPoints(c,P)==0){break;}
;if(R==0){break;}
else {W++;}
;}
;return S-(++W);}
;}
,"gecko|webkit":function(Y){if(this.__gB(Y)){return Y.selectionEnd;}
else {var bb=qx.dom.Node.getDocument(Y);var ba=this.getSelectionObject(bb);if(ba.focusOffset>ba.anchorOffset){return ba.focusOffset;}
else {return ba.anchorOffset;}
;}
;}
,"default":function(bc){if(this.__gB(bc)){return bc.selectionEnd;}
else {return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bc)).focusOffset;}
;}
}),__gB:function(bd){return qx.dom.Node.isElement(bd)&&(bd.nodeName.toLowerCase()==f||bd.nodeName.toLowerCase()==d);}
,set:qx.core.Environment.select(a,{"mshtml":function(be,bf,bg){var bh;if(qx.dom.Node.isDocument(be)){be=be.body;}
;if(qx.dom.Node.isElement(be)||qx.dom.Node.isText(be)){switch(be.nodeName.toLowerCase()){case f:case d:case j:if(bg===undefined){bg=be.value.length;}
;if(bf>=0&&bf<=be.value.length&&bg>=0&&bg<=be.value.length){bh=qx.bom.Range.get(be);bh.collapse(true);bh.moveStart(b,bf);bh.moveEnd(b,bg-bf);bh.select();return true;}
;break;case i:if(bg===undefined){bg=be.nodeValue.length;}
;if(bf>=0&&bf<=be.nodeValue.length&&bg>=0&&bg<=be.nodeValue.length){bh=qx.bom.Range.get(qx.dom.Node.getBodyElement(be));bh.moveToElementText(be.parentNode);bh.collapse(true);bh.moveStart(b,bf);bh.moveEnd(b,bg-bf);bh.select();return true;}
;break;default:if(bg===undefined){bg=be.childNodes.length-1;}
;if(be.childNodes[bf]&&be.childNodes[bg]){bh=qx.bom.Range.get(qx.dom.Node.getBodyElement(be));bh.moveToElementText(be.childNodes[bf]);bh.collapse(true);var bi=qx.bom.Range.get(qx.dom.Node.getBodyElement(be));bi.moveToElementText(be.childNodes[bg]);bh.setEndPoint(c,bi);bh.select();return true;}
;};}
;return false;}
,"default":function(bj,bk,bl){var bp=bj.nodeName.toLowerCase();if(qx.dom.Node.isElement(bj)&&(bp==f||bp==d)){if(bl===undefined){bl=bj.value.length;}
;if(bk>=0&&bk<=bj.value.length&&bl>=0&&bl<=bj.value.length){bj.focus();bj.select();bj.setSelectionRange(bk,bl);return true;}
;}
else {var bn=false;var bo=qx.dom.Node.getWindow(bj).getSelection();var bm=qx.bom.Range.get(bj);if(qx.dom.Node.isText(bj)){if(bl===undefined){bl=bj.length;}
;if(bk>=0&&bk<bj.length&&bl>=0&&bl<=bj.length){bn=true;}
;}
else if(qx.dom.Node.isElement(bj)){if(bl===undefined){bl=bj.childNodes.length-1;}
;if(bk>=0&&bj.childNodes[bk]&&bl>=0&&bj.childNodes[bl]){bn=true;}
;}
else if(qx.dom.Node.isDocument(bj)){bj=bj.body;if(bl===undefined){bl=bj.childNodes.length-1;}
;if(bk>=0&&bj.childNodes[bk]&&bl>=0&&bj.childNodes[bl]){bn=true;}
;}
;;if(bn){if(!bo.isCollapsed){bo.collapseToStart();}
;bm.setStart(bj,bk);if(qx.dom.Node.isText(bj)){bm.setEnd(bj,bl);}
else {bm.setEndAfter(bj.childNodes[bl]);}
;if(bo.rangeCount>0){bo.removeAllRanges();}
;bo.addRange(bm);return true;}
;}
;return false;}
}),setAll:function(bq){return qx.bom.Selection.set(bq,0);}
,clear:qx.core.Environment.select(a,{"mshtml":function(br){var bs=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(br));var bt=qx.bom.Range.get(br);var parent=bt.parentElement();var bu=qx.bom.Range.get(qx.dom.Node.getDocument(br));if(parent==bu.parentElement()&&parent==br){bs.empty();}
;}
,"default":function(bv){var bx=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bv));var bz=bv.nodeName.toLowerCase();if(qx.dom.Node.isElement(bv)&&(bz==f||bz==d)){bv.setSelectionRange(0,0);qx.bom.Element.blur(bv);}
else if(qx.dom.Node.isDocument(bv)||bz==h){bx.collapse(bv.body?bv.body:bv,0);}
else {var by=qx.bom.Range.get(bv);if(!by.collapsed){var bA;var bw=by.commonAncestorContainer;if(qx.dom.Node.isElement(bv)&&qx.dom.Node.isText(bw)){bA=bw.parentNode;}
else {bA=bw;}
;if(bA==bv){bx.collapse(bv,0);}
;}
;}
;}
})}});}
)();
(function(){var l="qx.bom.Range",k="text",j="engine.name",i="password",h="file",g="submit",f="reset",e="textarea",d="input",c="hidden",a="body",b="button";qx.Class.define(l,{statics:{get:qx.core.Environment.select(j,{"mshtml":function(m){if(qx.dom.Node.isElement(m)){switch(m.nodeName.toLowerCase()){case d:switch(m.type){case k:case i:case c:case b:case f:case h:case g:return m.createTextRange();break;default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();};break;case e:case a:case b:return m.createTextRange();break;default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();};}
else {if(m==null){m=window;}
;return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();}
;}
,"default":function(n){var o=qx.dom.Node.getDocument(n);var p=qx.bom.Selection.getSelectionObject(o);if(p.rangeCount>0){return p.getRangeAt(0);}
else {return o.createRange();}
;}
})}});}
)();
(function(){var j="m",h="g",g="^",f="qx.util.StringSplit",e="i",d="$(?!\\s)",c="[object RegExp]",b="y",a="";qx.Class.define(f,{statics:{split:function(k,l,m){if(Object.prototype.toString.call(l)!==c){return String.prototype.split.call(k,l,m);}
;var t=[],n=0,r=(l.ignoreCase?e:a)+(l.multiline?j:a)+(l.sticky?b:a),l=RegExp(l.source,r+h),q,u,o,p,s=/()??/.exec(a)[1]===undefined;k=k+a;if(!s){q=RegExp(g+l.source+d,r);}
;if(m===undefined||+m<0){m=Infinity;}
else {m=Math.floor(+m);if(!m){return [];}
;}
;while(u=l.exec(k)){o=u.index+u[0].length;if(o>n){t.push(k.slice(n,u.index));if(!s&&u.length>1){u[0].replace(q,function(){for(var i=1;i<arguments.length-2;i++){if(arguments[i]===undefined){u[i]=undefined;}
;}
;}
);}
;if(u.length>1&&u.index<k.length){Array.prototype.push.apply(t,u.slice(1));}
;p=u[0].length;n=o;if(t.length>=m){break;}
;}
;if(l.lastIndex===u.index){l.lastIndex++;}
;}
;if(n===k.length){if(p||!l.test(a)){t.push(a);}
;}
else {t.push(k.slice(n));}
;return t.length>m?t.slice(0,m):t;}
}});}
)();
(function(){var c="touchcancel",b="qx.event.type.Touch",a="touchend";qx.Class.define(b,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(d,e){var e=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,d,e);e.pageX=d.pageX;e.pageY=d.pageY;e.offsetX=d.offsetX;e.offsetY=d.offsetY;e.layerX=(d.offsetX||d.layerX);e.layerY=(d.offsetY||d.layerY);e.scale=d.scale;e.rotation=d.rotation;e.srcElement=d.srcElement;e.targetTouches=[];for(var i=0;i<d.targetTouches.length;i++){e.targetTouches[i]=d.targetTouches[i];}
;e.changedTouches=[];for(i=0;i<d.changedTouches.length;i++){e.changedTouches[i]=d.changedTouches[i];}
;e.touches=[];for(i=0;i<d.touches.length;i++){e.touches[i]=d.touches[i];}
;return e;}
,stop:function(){this.stopPropagation();}
,getAllTouches:function(){return this._native.touches;}
,getTargetTouches:function(){return this._native.targetTouches;}
,getChangedTargetTouches:function(){return this._native.changedTouches;}
,isMultiTouch:function(){return this.__gD().length>1;}
,getScale:function(){return this._native.scale;}
,getRotation:function(){return this._native.rotation;}
,getDocumentLeft:function(f){return this.__gC(f).pageX;}
,getDocumentTop:function(g){return this.__gC(g).pageY;}
,getScreenLeft:function(h){return this.__gC(h).screenX;}
,getScreenTop:function(j){return this.__gC(j).screenY;}
,getViewportLeft:function(k){return this.__gC(k).clientX;}
,getViewportTop:function(l){return this.__gC(l).clientY;}
,getIdentifier:function(m){return this.__gC(m).identifier;}
,__gC:function(n){n=n==null?0:n;return this.__gD()[n];}
,__gD:function(){var o=(this._isTouchEnd()?this.getChangedTargetTouches():this.getTargetTouches());return o;}
,_isTouchEnd:function(){return (this.getType()==a||this.getType()==c);}
}});}
)();
(function(){var a="qx.event.type.Tap";qx.Class.define(a,{extend:qx.event.type.Touch,members:{_isTouchEnd:function(){return true;}
}});}
)();
(function(){var a="qx.event.type.Swipe";qx.Class.define(a,{extend:qx.event.type.Touch,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Touch.prototype._cloneNativeEvent.call(this,b,c);c.swipe=b.swipe;return c;}
,_isTouchEnd:function(){return true;}
,getStartTime:function(){return this._native.swipe.startTime;}
,getDuration:function(){return this._native.swipe.duration;}
,getAxis:function(){return this._native.swipe.axis;}
,getDirection:function(){return this._native.swipe.direction;}
,getVelocity:function(){return this._native.swipe.velocity;}
,getDistance:function(){return this._native.swipe.distance;}
}});}
)();
(function(){var l="event.pointer",k="onhashchange",j="event.help",i="event.touch",h="opera",g="event.hashchange",f="onhelp",e="pointerEvents",d="documentMode",c="qx.bom.client.Event",a="ontouchstart",b="mshtml";qx.Bootstrap.define(c,{statics:{getTouch:function(){return (a in window);}
,getPointer:function(){if(e in document.documentElement.style){var m=qx.bom.client.Engine.getName();return m!=h&&m!=b;}
;return false;}
,getHelp:function(){return (f in document);}
,getHashChange:function(){var n=qx.bom.client.Engine.getName();var o=k in window;return (n!==b&&o)||(n===b&&d in document&&document.documentMode>=8&&o);}
},defer:function(p){qx.core.Environment.add(i,p.getTouch);qx.core.Environment.add(l,p.getPointer);qx.core.Environment.add(j,p.getHelp);qx.core.Environment.add(g,p.getHashChange);}
});}
)();
(function(){var e="resize",d="landscape",c="portrait",b="qx.event.handler.Orientation",a="orientationchange";qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(f){qx.core.Object.call(this);this.__eQ=f;this.__ce=f.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{orientationchange:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__eQ:null,__ce:null,__gE:null,_currentOrientation:null,__gF:null,canHandleEvent:function(g,h){}
,registerEvent:function(i,j,k){}
,unregisterEvent:function(l,m,n){}
,_initObserver:function(){this.__gF=qx.lang.Function.listener(this._onNative,this);this.__gE=qx.bom.Event.supportsEvent(this.__ce,a)?a:e;var Event=qx.bom.Event;Event.addNativeListener(this.__ce,this.__gE,this.__gF);}
,_stopObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__ce,this.__gE,this.__gF);}
,_onNative:qx.event.GlobalError.observeMethod(function(o){var q=qx.bom.Viewport;var p=q.getOrientation(o.target);if(this._currentOrientation!=p){this._currentOrientation=p;var r=q.isLandscape(o.target)?d:c;qx.event.Registration.fireEvent(this.__ce,a,qx.event.type.Orientation,[p,r]);}
;}
)},destruct:function(){this._stopObserver();this.__eQ=this.__ce=null;}
,defer:function(s){qx.event.Registration.addHandler(s);}
});}
)();
(function(){var c="landscape",b="qx.event.type.Orientation",a="portrait";qx.Class.define(b,{extend:qx.event.type.Event,members:{__gG:null,__gH:null,init:function(d,e){qx.event.type.Event.prototype.init.call(this,false,false);this.__gG=d;this.__gH=e;return this;}
,clone:function(f){var g=qx.event.type.Event.prototype.clone.call(this,f);g.__gG=this.__gG;g.__gH=this.__gH;return g;}
,getOrientation:function(){return this.__gG;}
,isLandscape:function(){return this.__gH==c;}
,isPortrait:function(){return this.__gH==a;}
}});}
)();
(function(){var k="engine.name",j="swipe",i="webkit",h="tap",g="x",f="y",e="qx.event.handler.TouchCore",d="touchcancel",c="touchmove",b="touchend",a="touchstart";qx.Bootstrap.define(e,{extend:Object,statics:{TAP_MAX_DISTANCE:qx.core.Environment.get("os.name")!="android"?10:40,SWIPE_DIRECTION:{x:["left","right"],y:["up","down"]},SWIPE_MIN_DISTANCE:qx.core.Environment.get("os.name")!="android"?11:41,SWIPE_MIN_VELOCITY:0},construct:function(l,m){this.__gI=l;this.__gJ=m;this._initTouchObserver();}
,members:{__gI:null,__gJ:null,__gK:null,__gL:null,__gM:null,__gN:null,__gO:null,__gP:null,_initTouchObserver:function(){this.__gK=qx.lang.Function.listener(this._onTouchEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__gI,a,this.__gK);Event.addNativeListener(this.__gI,c,this.__gK);Event.addNativeListener(this.__gI,b,this.__gK);Event.addNativeListener(this.__gI,d,this.__gK);}
,_stopTouchObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__gI,a,this.__gK);Event.removeNativeListener(this.__gI,c,this.__gK);Event.removeNativeListener(this.__gI,b,this.__gK);Event.removeNativeListener(this.__gI,d,this.__gK);}
,_onTouchEvent:function(n){this._commonTouchEventHandler(n);}
,_commonTouchEventHandler:function(o,p){var p=p||o.type;if(p==a){this.__gL=this._getTarget(o);}
;this._fireEvent(o,p);this.__gQ(o,p);}
,_getTarget:function(q){var r=qx.bom.Event.getTarget(q);if((qx.core.Environment.get(k)==i)){if(r&&r.nodeType==3){r=r.parentNode;}
;}
;return r;}
,_fireEvent:function(s,t,u){if(!u){u=this._getTarget(s);}
;var t=t||s.type;if(u&&u.nodeType&&this.__gJ){this.__gJ.emit(t,s);}
;}
,__gQ:function(v,w,x){if(!x){x=this._getTarget(v);}
;var w=w||v.type;if(w==a){this.__gR(v,x);}
else if(w==c){this.__gS(v,x);}
else if(w==b){this.__gT(v,x);}
;;}
,__gR:function(y,z){var A=y.changedTouches[0];this.__gM=A.screenX;this.__gN=A.screenY;this.__gO=new Date().getTime();this.__gP=y.changedTouches.length===1;}
,__gS:function(B,C){if(this.__gP&&B.changedTouches.length>1){this.__gP=false;}
;}
,__gT:function(D,E){if(this.__gP){var F=D.changedTouches[0];var I={x:F.screenX-this.__gM,y:F.screenY-this.__gN};var J=qx.event.handler.TouchCore;var G;if(this.__gL==E&&Math.abs(I.x)<=J.TAP_MAX_DISTANCE&&Math.abs(I.y)<=J.TAP_MAX_DISTANCE){if(qx.event&&qx.event.type&&qx.event.type.Tap){G=qx.event.type.Tap;}
;this._fireEvent(D,h,E,G);}
else {var H=this.__gU(D,E,I);if(H){if(qx.event&&qx.event.type&&qx.event.type.Swipe){G=qx.event.type.Swipe;}
;D.swipe=H;this._fireEvent(D,j,E,G);}
;}
;}
;}
,__gU:function(K,L,M){var Q=qx.event.handler.TouchCore;var R=new Date().getTime()-this.__gO;var T=(Math.abs(M.x)>=Math.abs(M.y))?g:f;var N=M[T];var O=Q.SWIPE_DIRECTION[T][N<0?0:1];var S=(R!==0)?N/R:0;var P=null;if(Math.abs(S)>=Q.SWIPE_MIN_VELOCITY&&Math.abs(N)>=Q.SWIPE_MIN_DISTANCE){P={startTime:this.__gO,duration:R,axis:T,direction:O,distance:N,velocity:S};}
;return P;}
,dispose:function(){this._stopTouchObserver();this.__gL=this.__gI=this.__gJ=null;}
}});}
)();
(function(){var o="mshtml",n="engine.name",m="qx.event.handler.Touch",l="useraction",k="touchmove",j="qx.mobile.nativescroll",i="dispose",h="touchstart",g="mouseup",f="touchend",b="mousedown",d="mousemove",c="event.touch",a="qx.mobile.emulatetouch";qx.Class.define(m,{extend:qx.event.handler.TouchCore,implement:qx.event.IEventHandler,construct:function(p){this.__eQ=p;this.__ce=p.getWindow();this.__dd=this.__ce.document;qx.event.handler.TouchCore.apply(this,[this.__dd]);this._initMouseObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{touchstart:1,touchmove:1,touchend:1,touchcancel:1,tap:1,swipe:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true,MOUSE_TO_TOUCH_MAPPING:{"mousedown":"touchstart","mousemove":"touchmove","mouseup":"touchend"}},members:{__gV:null,__eQ:null,__ce:null,__dd:null,__gW:false,canHandleEvent:function(q,r){}
,registerEvent:function(s,t,u){}
,unregisterEvent:function(v,w,x){}
,_fireEvent:function(y,z,A,B){if(!A){A=this._getTarget(y);}
;var z=z||y.type;if(A&&A.nodeType){qx.event.Registration.fireEvent(A,z,B||qx.event.type.Touch,[y,A,null,true,true]);}
;qx.event.Registration.fireEvent(this.__ce,l,qx.event.type.Data,[z]);}
,__gX:qx.core.Environment.select(a,{"true":function(C){var D=C.type;var F=qx.event.handler.Touch.MOUSE_TO_TOUCH_MAPPING;if(F[D]){D=F[D];if(D==h&&this.__gY(C)){this.__gW=true;}
else if(D==f){this.__gW=false;}
;var G=this.__ha(C);var E=(D==f?[]:[G]);C.touches=E;C.targetTouches=E;C.changedTouches=[G];}
;return D;}
,"default":qx.lang.Function.empty}),__gY:qx.core.Environment.select(a,{"true":function(H){if((qx.core.Environment.get(n)==o)){var I=1;}
else {var I=0;}
;return H.button==I;}
,"default":qx.lang.Function.empty}),__ha:qx.core.Environment.select(a,{"true":function(J){var K=this._getTarget(J);return {clientX:J.clientX,clientY:J.clientY,screenX:J.screenX,screenY:J.screenY,pageX:J.pageX,pageY:J.pageY,identifier:1,target:K};}
,"default":qx.lang.Function.empty}),_initMouseObserver:qx.core.Environment.select(a,{"true":function(){if(!qx.core.Environment.get(c)){this.__gV=qx.lang.Function.listener(this._onMouseEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__dd,b,this.__gV);Event.addNativeListener(this.__dd,d,this.__gV);Event.addNativeListener(this.__dd,g,this.__gV);}
;}
,"default":qx.lang.Function.empty}),_stopMouseObserver:qx.core.Environment.select(a,{"true":function(){if(!qx.core.Environment.get(c)){var Event=qx.bom.Event;Event.removeNativeListener(this.__dd,b,this.__gV);Event.removeNativeListener(this.__dd,d,this.__gV);Event.removeNativeListener(this.__dd,g,this.__gV);}
;}
,"default":qx.lang.Function.empty}),_onTouchEvent:qx.event.GlobalError.observeMethod(function(L){this._commonTouchEventHandler(L);}
),_onMouseEvent:qx.core.Environment.select(a,{"true":qx.event.GlobalError.observeMethod(function(M){if(!qx.core.Environment.get(c)){if(M.type==d&&!this.__gW){return;}
;var N=this.__gX(M);this._commonTouchEventHandler(M,N);}
;}
),"default":qx.lang.Function.empty}),dispose:function(){this.__hb(i);this._stopMouseObserver();this.__eQ=this.__ce=this.__dd=null;}
,__hb:function(O,P){qx.event.handler.TouchCore.prototype[O].apply(this,P||[]);}
},defer:function(Q){qx.event.Registration.addHandler(Q);if(qx.core.Environment.get(c)){if(qx.core.Environment.get(j)==false){document.addEventListener(k,function(e){e.preventDefault();}
);}
;qx.event.Registration.getManager(document).getHandler(Q);}
;}
});}
)();
(function(){var m="select-multiple",k="value",j="select",h="qx.event.handler.Input",g="checked",f="blur",d="keydown",c="propertychange",b="browser.version",a="browser.documentmode",A="opera",z="keyup",y="mshtml",x="keypress",w="engine.version",v="radio",u="checkbox",t="text",s="textarea",r="password",p="change",q="engine.name",n="input";qx.Class.define(h,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);if((qx.core.Environment.get(q)==A)){this._onKeyDownWrapper=qx.lang.Function.listener(this._onKeyDown,this);this._onKeyUpWrapper=qx.lang.Function.listener(this._onKeyUp,this);this._onBlurWrapper=qx.lang.Function.listener(this._onBlur,this);}
;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__hc:false,__hd:null,__he:null,__hf:null,canHandleEvent:function(B,C){var D=B.tagName.toLowerCase();if(C===n&&(D===n||D===s)){return true;}
;if(C===p&&(D===n||D===s||D===j)){return true;}
;return false;}
,registerEvent:function(E,F,G){if(qx.core.Environment.get(q)==y&&(qx.core.Environment.get(w)<9||(qx.core.Environment.get(w)>=9&&qx.core.Environment.get(a)<9))){if(!E.__hg){var H=E.tagName.toLowerCase();var I=E.type;if(I===t||I===r||H===s||I===u||I===v){qx.bom.Event.addNativeListener(E,c,this._onPropertyWrapper);}
;if(I!==u&&I!==v){qx.bom.Event.addNativeListener(E,p,this._onChangeValueWrapper);}
;if(I===t||I===r){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,E);qx.bom.Event.addNativeListener(E,x,this._onKeyPressWrapped);}
;E.__hg=true;}
;}
else {if(F===n){this.__hh(E);}
else if(F===p){if(E.type===v||E.type===u){qx.bom.Event.addNativeListener(E,p,this._onChangeCheckedWrapper);}
else {qx.bom.Event.addNativeListener(E,p,this._onChangeValueWrapper);}
;if((qx.core.Environment.get(q)==A)||(qx.core.Environment.get(q)==y)){if(E.type===t||E.type===r){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,E);qx.bom.Event.addNativeListener(E,x,this._onKeyPressWrapped);}
;}
;}
;}
;}
,__hh:qx.core.Environment.select(q,{"mshtml":function(J){if(qx.core.Environment.get(w)>=9&&qx.core.Environment.get(a)>=9){qx.bom.Event.addNativeListener(J,n,this._onInputWrapper);if(J.type===t||J.type===r||J.type===s){this._inputFixWrapper=qx.lang.Function.listener(this._inputFix,this,J);qx.bom.Event.addNativeListener(J,z,this._inputFixWrapper);}
;}
;}
,"webkit":function(K){var L=K.tagName.toLowerCase();if(parseFloat(qx.core.Environment.get(w))<532&&L==s){qx.bom.Event.addNativeListener(K,x,this._onInputWrapper);}
;qx.bom.Event.addNativeListener(K,n,this._onInputWrapper);}
,"opera":function(M){qx.bom.Event.addNativeListener(M,z,this._onKeyUpWrapper);qx.bom.Event.addNativeListener(M,d,this._onKeyDownWrapper);qx.bom.Event.addNativeListener(M,f,this._onBlurWrapper);qx.bom.Event.addNativeListener(M,n,this._onInputWrapper);}
,"default":function(N){qx.bom.Event.addNativeListener(N,n,this._onInputWrapper);}
}),unregisterEvent:function(O,P){if(qx.core.Environment.get(q)==y&&qx.core.Environment.get(w)<9&&qx.core.Environment.get(a)<9){if(O.__hg){var Q=O.tagName.toLowerCase();var R=O.type;if(R===t||R===r||Q===s||R===u||R===v){qx.bom.Event.removeNativeListener(O,c,this._onPropertyWrapper);}
;if(R!==u&&R!==v){qx.bom.Event.removeNativeListener(O,p,this._onChangeValueWrapper);}
;if(R===t||R===r){qx.bom.Event.removeNativeListener(O,x,this._onKeyPressWrapped);}
;try{delete O.__hg;}
catch(S){O.__hg=null;}
;}
;}
else {if(P===n){this.__hi(O);}
else if(P===p){if(O.type===v||O.type===u){qx.bom.Event.removeNativeListener(O,p,this._onChangeCheckedWrapper);}
else {qx.bom.Event.removeNativeListener(O,p,this._onChangeValueWrapper);}
;}
;if((qx.core.Environment.get(q)==A)||(qx.core.Environment.get(q)==y)){if(O.type===t||O.type===r){qx.bom.Event.removeNativeListener(O,x,this._onKeyPressWrapped);}
;}
;}
;}
,__hi:qx.core.Environment.select(q,{"mshtml":function(T){if(qx.core.Environment.get(w)>=9&&qx.core.Environment.get(a)>=9){qx.bom.Event.removeNativeListener(T,n,this._onInputWrapper);if(T.type===t||T.type===r||T.type===s){qx.bom.Event.removeNativeListener(T,z,this._inputFixWrapper);}
;}
;}
,"webkit":function(U){var V=U.tagName.toLowerCase();if(parseFloat(qx.core.Environment.get(w))<532&&V==s){qx.bom.Event.removeNativeListener(U,x,this._onInputWrapper);}
;qx.bom.Event.removeNativeListener(U,n,this._onInputWrapper);}
,"opera":function(W){qx.bom.Event.removeNativeListener(W,z,this._onKeyUpWrapper);qx.bom.Event.removeNativeListener(W,d,this._onKeyDownWrapper);qx.bom.Event.removeNativeListener(W,f,this._onBlurWrapper);qx.bom.Event.removeNativeListener(W,n,this._onInputWrapper);}
,"default":function(X){qx.bom.Event.removeNativeListener(X,n,this._onInputWrapper);}
}),_onKeyPress:qx.core.Environment.select(q,{"mshtml|opera":function(e,Y){if(e.keyCode===13){if(Y.value!==this.__he){this.__he=Y.value;qx.event.Registration.fireEvent(Y,p,qx.event.type.Data,[Y.value]);}
;}
;}
,"default":null}),_inputFix:qx.core.Environment.select(q,{"mshtml":function(e,ba){if(e.keyCode===46||e.keyCode===8){if(ba.value!==this.__hf){this.__hf=ba.value;qx.event.Registration.fireEvent(ba,n,qx.event.type.Data,[ba.value]);}
;}
;}
,"default":null}),_onKeyDown:qx.core.Environment.select(q,{"opera":function(e){if(e.keyCode===13){this.__hc=true;}
;}
,"default":null}),_onKeyUp:qx.core.Environment.select(q,{"opera":function(e){if(e.keyCode===13){this.__hc=false;}
;}
,"default":null}),_onBlur:qx.core.Environment.select(q,{"opera":function(e){if(this.__hd&&qx.core.Environment.get(b)<10.6){window.clearTimeout(this.__hd);}
;}
,"default":null}),_onInput:qx.event.GlobalError.observeMethod(function(e){var bc=qx.bom.Event.getTarget(e);var bb=bc.tagName.toLowerCase();if(!this.__hc||bb!==n){if((qx.core.Environment.get(q)==A)&&qx.core.Environment.get(b)<10.6){this.__hd=window.setTimeout(function(){qx.event.Registration.fireEvent(bc,n,qx.event.type.Data,[bc.value]);}
,0);}
else {qx.event.Registration.fireEvent(bc,n,qx.event.type.Data,[bc.value]);}
;}
;}
),_onChangeValue:qx.event.GlobalError.observeMethod(function(e){var be=qx.bom.Event.getTarget(e);var bd=be.value;if(be.type===m){var bd=[];for(var i=0,o=be.options,l=o.length;i<l;i++){if(o[i].selected){bd.push(o[i].value);}
;}
;}
;qx.event.Registration.fireEvent(be,p,qx.event.type.Data,[bd]);}
),_onChangeChecked:qx.event.GlobalError.observeMethod(function(e){var bf=qx.bom.Event.getTarget(e);if(bf.type===v){if(bf.checked){qx.event.Registration.fireEvent(bf,p,qx.event.type.Data,[bf.value]);}
;}
else {qx.event.Registration.fireEvent(bf,p,qx.event.type.Data,[bf.checked]);}
;}
),_onProperty:qx.core.Environment.select(q,{"mshtml":qx.event.GlobalError.observeMethod(function(e){var bg=qx.bom.Event.getTarget(e);var bh=e.propertyName;if(bh===k&&(bg.type===t||bg.type===r||bg.tagName.toLowerCase()===s)){if(!bg.$$inValueSet){qx.event.Registration.fireEvent(bg,n,qx.event.type.Data,[bg.value]);}
;}
else if(bh===g){if(bg.type===u){qx.event.Registration.fireEvent(bg,p,qx.event.type.Data,[bg.checked]);}
else if(bg.checked){qx.event.Registration.fireEvent(bg,p,qx.event.type.Data,[bg.value]);}
;}
;}
),"default":function(){}
})},defer:function(bi){qx.event.Registration.addHandler(bi);}
});}
)();
(function(){var a="qx.event.handler.Capture";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(b,c){}
,registerEvent:function(d,e,f){}
,unregisterEvent:function(g,h,i){}
},defer:function(j){qx.event.Registration.addHandler(j);}
});}
)();
(function(){var k="mousedown",j="qxDraggable",i="Escape",h="drag",g="Unsupported data type: ",f="drop",d="qxDroppable",c="qx.event.handler.DragDrop",b="This method must not be used outside the drop event listener!",a="!",H="droprequest",G="dragstart",F="dragchange",E="dragleave",D="dragover",C="left",B="Please use a droprequest listener to the drag source to fill the manager with data!",A="blur",z="mouseout",y="keydown",r="Control",s="Shift",p="mousemove",q="move",n="mouseover",o="Alt",l="keyup",m="mouseup",t="keypress",u="dragend",w="on",v="copy",x="alias";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(I){qx.core.Object.call(this);this.__eQ=I;this.__dd=I.getWindow().document.documentElement;this.__eQ.addListener(this.__dd,k,this._onMouseDown,this);this.__ht();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__eQ:null,__dd:null,__hj:null,__hk:null,__hl:null,__hm:null,__hn:null,__e:null,__ho:null,__hp:null,__hq:false,__hr:0,__hs:0,canHandleEvent:function(J,K){}
,registerEvent:function(L,M,N){}
,unregisterEvent:function(O,P,Q){}
,addType:function(R){this.__hl[R]=true;}
,addAction:function(S){this.__hm[S]=true;}
,supportsType:function(T){return !!this.__hl[T];}
,supportsAction:function(U){return !!this.__hm[U];}
,getData:function(V){if(!this.__hz||!this.__hj){throw new Error(b);}
;if(!this.__hl[V]){throw new Error(g+V+a);}
;if(!this.__e[V]){this.__ho=V;this.__fG(H,this.__hk,this.__hj,false);}
;if(!this.__e[V]){throw new Error(B);}
;return this.__e[V]||null;}
,getCurrentAction:function(){return this.__hp;}
,addData:function(W,X){this.__e[W]=X;}
,getCurrentType:function(){return this.__ho;}
,isSessionActive:function(){return this.__hq;}
,__ht:function(){this.__hl={};this.__hm={};this.__hn={};this.__e={};}
,__hu:function(){if(this.__hk==null){return;}
;var bb=this.__hm;var Y=this.__hn;var ba=null;if(this.__hz){if(Y.Shift&&Y.Control&&bb.alias){ba=x;}
else if(Y.Shift&&Y.Alt&&bb.copy){ba=v;}
else if(Y.Shift&&bb.move){ba=q;}
else if(Y.Alt&&bb.alias){ba=x;}
else if(Y.Control&&bb.copy){ba=v;}
else if(bb.move){ba=q;}
else if(bb.copy){ba=v;}
else if(bb.alias){ba=x;}
;;;;;;;}
;if(ba!=this.__hp){this.__hp=ba;this.__fG(F,this.__hk,this.__hj,false);}
;}
,__fG:function(bc,bd,be,bf,bg){var bi=qx.event.Registration;var bh=bi.createEvent(bc,qx.event.type.Drag,[bf,bg]);if(bd!==be){bh.setRelatedTarget(be);}
;return bi.dispatchEvent(bd,bh);}
,__hv:function(bj){while(bj&&bj.nodeType==1){if(bj.getAttribute(j)==w){return bj;}
;bj=bj.parentNode;}
;return null;}
,__hw:function(bk){while(bk&&bk.nodeType==1){if(bk.getAttribute(d)==w){return bk;}
;bk=bk.parentNode;}
;return null;}
,__hx:function(){this.__hk=null;this.__eQ.removeListener(this.__dd,p,this._onMouseMove,this,true);this.__eQ.removeListener(this.__dd,m,this._onMouseUp,this,true);qx.event.Registration.removeListener(window,A,this._onWindowBlur,this);this.__ht();}
,__hy:function(){if(this.__hq){this.__eQ.removeListener(this.__dd,n,this._onMouseOver,this,true);this.__eQ.removeListener(this.__dd,z,this._onMouseOut,this,true);this.__eQ.removeListener(this.__dd,y,this._onKeyDown,this,true);this.__eQ.removeListener(this.__dd,l,this._onKeyUp,this,true);this.__eQ.removeListener(this.__dd,t,this._onKeyPress,this,true);this.__fG(u,this.__hk,this.__hj,false);this.__hq=false;}
;this.__hz=false;this.__hj=null;this.__hx();}
,__hz:false,_onWindowBlur:function(e){this.__hy();}
,_onKeyDown:function(e){var bl=e.getKeyIdentifier();switch(bl){case o:case r:case s:if(!this.__hn[bl]){this.__hn[bl]=true;this.__hu();}
;};}
,_onKeyUp:function(e){var bm=e.getKeyIdentifier();switch(bm){case o:case r:case s:if(this.__hn[bm]){this.__hn[bm]=false;this.__hu();}
;};}
,_onKeyPress:function(e){var bn=e.getKeyIdentifier();switch(bn){case i:this.__hy();};}
,_onMouseDown:function(e){if(this.__hq||e.getButton()!==C){return;}
;var bo=this.__hv(e.getTarget());if(bo){this.__hr=e.getDocumentLeft();this.__hs=e.getDocumentTop();this.__hk=bo;this.__eQ.addListener(this.__dd,p,this._onMouseMove,this,true);this.__eQ.addListener(this.__dd,m,this._onMouseUp,this,true);qx.event.Registration.addListener(window,A,this._onWindowBlur,this);}
;}
,_onMouseUp:function(e){if(this.__hz){this.__fG(f,this.__hj,this.__hk,false,e);}
;if(this.__hq){e.stopPropagation();}
;this.__hy();}
,_onMouseMove:function(e){if(this.__hq){if(!this.__fG(h,this.__hk,this.__hj,true,e)){this.__hy();}
;}
else {if(Math.abs(e.getDocumentLeft()-this.__hr)>3||Math.abs(e.getDocumentTop()-this.__hs)>3){if(this.__fG(G,this.__hk,this.__hj,true,e)){this.__hq=true;this.__eQ.addListener(this.__dd,n,this._onMouseOver,this,true);this.__eQ.addListener(this.__dd,z,this._onMouseOut,this,true);this.__eQ.addListener(this.__dd,y,this._onKeyDown,this,true);this.__eQ.addListener(this.__dd,l,this._onKeyUp,this,true);this.__eQ.addListener(this.__dd,t,this._onKeyPress,this,true);var bp=this.__hn;bp.Control=e.isCtrlPressed();bp.Shift=e.isShiftPressed();bp.Alt=e.isAltPressed();this.__hu();}
else {this.__fG(u,this.__hk,this.__hj,false);this.__hx();}
;}
;}
;}
,_onMouseOver:function(e){var bq=e.getTarget();var br=this.__hw(bq);if(br&&br!=this.__hj){this.__hz=this.__fG(D,br,this.__hk,true,e);this.__hj=br;this.__hu();}
;}
,_onMouseOut:function(e){var bt=this.__hw(e.getTarget());var bs=this.__hw(e.getRelatedTarget());if(bt&&bt!==bs&&bt==this.__hj){this.__fG(E,this.__hj,bs,false,e);this.__hj=null;this.__hz=false;qx.event.Timer.once(this.__hu,this,0);}
;}
},destruct:function(){this.__hk=this.__hj=this.__eQ=this.__dd=this.__hl=this.__hm=this.__hn=this.__e=null;}
,defer:function(bu){qx.event.Registration.addHandler(bu);}
});}
)();
(function(){var a="qx.event.type.Drag";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c){qx.event.type.Event.prototype.init.call(this,true,b);if(c){this._native=c.getNativeEvent()||null;this._originalTarget=c.getTarget()||null;}
else {this._native=null;this._originalTarget=null;}
;return this;}
,clone:function(d){var e=qx.event.type.Event.prototype.clone.call(this,d);e._native=this._native;return e;}
,getDocumentLeft:function(){if(this._native==null){return 0;}
;if(this._native.pageX!==undefined){return this._native.pageX;}
else {var f=qx.dom.Node.getWindow(this._native.srcElement);return this._native.clientX+qx.bom.Viewport.getScrollLeft(f);}
;}
,getDocumentTop:function(){if(this._native==null){return 0;}
;if(this._native.pageY!==undefined){return this._native.pageY;}
else {var g=qx.dom.Node.getWindow(this._native.srcElement);return this._native.clientY+qx.bom.Viewport.getScrollTop(g);}
;}
,getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);}
,addType:function(h){this.getManager().addType(h);}
,addAction:function(i){this.getManager().addAction(i);}
,supportsType:function(j){return this.getManager().supportsType(j);}
,supportsAction:function(k){return this.getManager().supportsAction(k);}
,addData:function(l,m){this.getManager().addData(l,m);}
,getData:function(n){return this.getManager().getData(n);}
,getCurrentType:function(){return this.getManager().getCurrentType();}
,getCurrentAction:function(){return this.getManager().getCurrentAction();}
}});}
)();
(function(){var h="qx.event.Timer",g="_applyInterval",f="_applyEnabled",d="Boolean",c="qx.event.type.Event",b="Integer",a="interval";qx.Class.define(h,{extend:qx.core.Object,construct:function(i){qx.core.Object.call(this);this.setEnabled(false);if(i!=null){this.setInterval(i);}
;var self=this;this.__dW=function(){self._oninterval.call(self);}
;}
,events:{"interval":c},statics:{once:function(j,k,l){{}
;var m=new qx.event.Timer(l);m.__dX=j;m.addListener(a,function(e){m.stop();j.call(k,e);m.dispose();k=null;}
,k);m.start();return m;}
},properties:{enabled:{init:true,check:d,apply:f},interval:{check:b,init:1000,apply:g}},members:{__dY:null,__dW:null,_applyInterval:function(n,o){if(this.getEnabled()){this.restart();}
;}
,_applyEnabled:function(p,q){if(q){window.clearInterval(this.__dY);this.__dY=null;}
else if(p){this.__dY=window.setInterval(this.__dW,this.getInterval());}
;}
,start:function(){this.setEnabled(true);}
,startWith:function(r){this.setInterval(r);this.start();}
,stop:function(){this.setEnabled(false);}
,restart:function(){this.stop();this.start();}
,restartWith:function(s){this.stop();this.startWith(s);}
,_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;}
;if(this.getEnabled()){this.fireEvent(a);}
;}
)},destruct:function(){if(this.__dY){window.clearInterval(this.__dY);}
;this.__dY=this.__dW=null;}
});}
)();
(function(){var c="qx.event.handler.Offline",b="offline",a="online";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);this.__eQ=d;this.__ce=d.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{online:true,offline:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__eQ:null,__ce:null,__gF:null,canHandleEvent:function(e,f){}
,registerEvent:function(g,h,i){}
,unregisterEvent:function(j,k,l){}
,_initObserver:function(){this.__gF=qx.lang.Function.listener(this._onNative,this);qx.bom.Event.addNativeListener(this.__ce,b,this.__gF);qx.bom.Event.addNativeListener(this.__ce,a,this.__gF);}
,_stopObserver:function(){qx.bom.Event.removeNativeListener(this.__ce,b,this.__gF);qx.bom.Event.removeNativeListener(this.__ce,a,this.__gF);}
,_onNative:qx.event.GlobalError.observeMethod(function(m){qx.event.Registration.fireEvent(this.__ce,m.type,qx.event.type.Event,[]);}
),isOnline:function(){return !!this.__ce.navigator.onLine;}
},destruct:function(){this.__eQ=null;this._stopObserver();delete qx.event.handler.Appear.__instances[this.$$hash];}
,defer:function(n){qx.event.Registration.addHandler(n);}
});}
)();
(function(){var f="Use qx.dom.Element.create instead",e="Use qx.dom.Element.getHelperElement instead",d="qx.bom.Element",c="Use qx.dom.Element.empty instead",b="mshtml",a="engine.name";qx.Class.define(d,{statics:{allowCreationWithMarkup:function(g){qx.log.Logger.deprecatedMethodWarning(arguments.callee);return qx.dom.Element._allowCreationWithMarkup(g);}
,getHelperElement:function(h){qx.log.Logger.deprecatedMethodWarning(arguments.callee,e);return qx.dom.Element.getHelperElement(h);}
,create:function(name,k,m){qx.log.Logger.deprecatedMethodWarning(arguments.callee,f);return qx.dom.Element.create(name,k,m);}
,empty:function(n){qx.log.Logger.deprecatedMethodWarning(arguments.callee,c);return qx.dom.Element.empty(n);}
,addListener:function(o,p,q,self,r){return qx.event.Registration.addListener(o,p,q,self,r);}
,removeListener:function(s,t,u,self,v){return qx.event.Registration.removeListener(s,t,u,self,v);}
,removeListenerById:function(w,x){return qx.event.Registration.removeListenerById(w,x);}
,hasListener:function(y,z,A){return qx.event.Registration.hasListener(y,z,A);}
,focus:function(B){qx.event.Registration.getManager(B).getHandler(qx.event.handler.Focus).focus(B);}
,blur:function(C){qx.event.Registration.getManager(C).getHandler(qx.event.handler.Focus).blur(C);}
,activate:function(D){qx.event.Registration.getManager(D).getHandler(qx.event.handler.Focus).activate(D);}
,deactivate:function(E){qx.event.Registration.getManager(E).getHandler(qx.event.handler.Focus).deactivate(E);}
,capture:function(F,G){qx.event.Registration.getManager(F).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(F,G);}
,releaseCapture:function(H){qx.event.Registration.getManager(H).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(H);}
,matchesSelector:function(I,J){if(J){return qx.bom.Selector.query(J,I.parentNode).length>0;}
else {return false;}
;}
,clone:function(K,L){var O;if(L||((qx.core.Environment.get(a)==b)&&!qx.xml.Document.isXmlDocument(K))){var S=qx.event.Registration.getManager(K);var M=qx.dom.Hierarchy.getDescendants(K);M.push(K);}
;if((qx.core.Environment.get(a)==b)){for(var i=0,l=M.length;i<l;i++){S.toggleAttachedEvents(M[i],false);}
;}
;var O=K.cloneNode(true);if((qx.core.Environment.get(a)==b)){for(var i=0,l=M.length;i<l;i++){S.toggleAttachedEvents(M[i],true);}
;}
;if(L===true){var V=qx.dom.Hierarchy.getDescendants(O);V.push(O);var N,Q,U,P;for(var i=0,T=M.length;i<T;i++){U=M[i];N=S.serializeListeners(U);if(N.length>0){Q=V[i];for(var j=0,R=N.length;j<R;j++){P=N[j];S.addListener(Q,P.type,P.handler,P.self,P.capture);}
;}
;}
;}
;return O;}
}});}
)();
(function(){var q="engine.name",p="='",o="none",n="<INPUT TYPE='RADIO' NAME='RADIOTEST' VALUE='Second Choice'>",m="qx.dom.Element",k="webkit",j="The tag name is missing!",h="div",g="' ",f="></",b="<",d=" ",c=">",a="";qx.Bootstrap.define(m,{statics:{__ea:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},hasChild:function(parent,r){return r.parentNode===parent;}
,hasChildren:function(s){return !!s.firstChild;}
,hasChildElements:function(t){t=t.firstChild;while(t){if(t.nodeType===1){return true;}
;t=t.nextSibling;}
;return false;}
,getParentElement:function(u){return u.parentNode;}
,isInDom:function(v,w){if(!w){w=window;}
;var x=w.document.getElementsByTagName(v.nodeName);for(var i=0,l=x.length;i<l;i++){if(x[i]===v){return true;}
;}
;return false;}
,insertAt:function(y,parent,z){var A=parent.childNodes[z];if(A){parent.insertBefore(y,A);}
else {parent.appendChild(y);}
;return true;}
,insertBegin:function(B,parent){if(parent.firstChild){this.insertBefore(B,parent.firstChild);}
else {parent.appendChild(B);}
;}
,insertEnd:function(C,parent){parent.appendChild(C);}
,insertBefore:function(D,E){E.parentNode.insertBefore(D,E);return true;}
,insertAfter:function(F,G){var parent=G.parentNode;if(G==parent.lastChild){parent.appendChild(F);}
else {return this.insertBefore(F,G.nextSibling);}
;return true;}
,remove:function(H){if(!H.parentNode){return false;}
;H.parentNode.removeChild(H);return true;}
,removeChild:function(I,parent){if(I.parentNode!==parent){return false;}
;parent.removeChild(I);return true;}
,removeChildAt:function(J,parent){var K=parent.childNodes[J];if(!K){return false;}
;parent.removeChild(K);return true;}
,replaceChild:function(L,M){if(!M.parentNode){return false;}
;M.parentNode.replaceChild(L,M);return true;}
,replaceAt:function(N,O,parent){var P=parent.childNodes[O];if(!P){return false;}
;parent.replaceChild(N,P);return true;}
,__eb:{},__ec:{},_allowCreationWithMarkup:function(Q){if(!Q){Q=window;}
;var R=Q.location.href;if(qx.dom.Element.__ec[R]==undefined){try{Q.document.createElement(n);qx.dom.Element.__ec[R]=true;}
catch(e){qx.dom.Element.__ec[R]=false;}
;}
;return qx.dom.Element.__ec[R];}
,getHelperElement:function(S){if(!S){S=window;}
;var U=S.location.href;if(!qx.dom.Element.__eb[U]){var T=qx.dom.Element.__eb[U]=S.document.createElement(h);if(qx.core.Environment.get(q)==k){T.style.display=o;S.document.body.appendChild(T);}
;}
;return qx.dom.Element.__eb[U];}
,create:function(name,V,W){if(!W){W=window;}
;if(!name){throw new Error(j);}
;var Y=this.__ea;var X=a;for(var bb in V){if(Y[bb]){X+=bb+p+V[bb]+g;}
;}
;var bc;if(X!=a){if(qx.dom.Element._allowCreationWithMarkup(W)){bc=W.document.createElement(b+name+d+X+c);}
else {var ba=qx.dom.Element.getHelperElement(W);ba.innerHTML=b+name+d+X+f+name+c;bc=ba.firstChild;}
;}
else {bc=W.document.createElement(name);}
;for(var bb in V){if(!Y[bb]){qx.bom.element.Attribute.set(bc,bb,V[bb]);}
;}
;return bc;}
,empty:function(bd){return bd.innerHTML=a;}
}});}
)();
(function(){var j="readOnly",i="accessKey",h="qx.bom.element.Attribute",g="rowSpan",f="vAlign",e="className",d="textContent",c="'",b="htmlFor",a="longDesc",A="cellSpacing",z="frameBorder",y="='",x="useMap",w="innerText",v="innerHTML",u="tabIndex",t="dateTime",s="maxLength",r="html.element.textcontent",p="mshtml",q="cellPadding",n="browser.documentmode",o="colSpan",l="engine.name",m="undefined",k="";qx.Bootstrap.define(h,{statics:{__ed:{names:{"class":e,"for":b,html:v,text:qx.core.Environment.get(r)?d:w,colspan:o,rowspan:g,valign:f,datetime:t,accesskey:i,tabindex:u,maxlength:s,readonly:j,longdesc:a,cellpadding:q,cellspacing:A,frameborder:z,usemap:x},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:k,className:k,innerHTML:k,innerText:k,textContent:k,htmlFor:k,tabIndex:0,maxLength:qx.core.Environment.select(l,{"mshtml":2147483647,"webkit":524288,"default":-1})},removeableProperties:{disabled:1,multiple:1,maxLength:1},original:{href:1,src:1,type:1}},compile:function(B){var C=[];var E=this.__ed.runtime;for(var D in B){if(!E[D]){C.push(D,y,B[D],c);}
;}
;return C.join(k);}
,get:function(F,name){var H=this.__ed;var G;name=H.names[name]||name;if(qx.core.Environment.get(l)==p&&parseInt(qx.core.Environment.get(n),10)<8&&H.original[name]){G=F.getAttribute(name,2);}
else if(H.property[name]){G=F[name];if(typeof H.propertyDefault[name]!==m&&G==H.propertyDefault[name]){if(typeof H.bools[name]===m){return null;}
else {return G;}
;}
;}
else {G=F.getAttribute(name);}
;if(H.bools[name]){return !!G;}
;return G;}
,set:function(I,name,J){if(typeof J===m){return;}
;var K=this.__ed;name=K.names[name]||name;if(K.bools[name]){J=!!J;}
;if(K.property[name]&&(!(I[name]===undefined)||K.qxProperties[name])){if(J==null){if(K.removeableProperties[name]){I.removeAttribute(name);return;}
else if(typeof K.propertyDefault[name]!==m){J=K.propertyDefault[name];}
;}
;I[name]=J;}
else {if(J===true){I.setAttribute(name,name);}
else if(J===false||J===null){I.removeAttribute(name);}
else {I.setAttribute(name,J);}
;}
;}
,reset:function(L,name){this.set(L,name,null);}
}});}
)();
(function(){var i="mshtml",h="blur",g="focus",f="click",e="qx.event.dispatch.MouseCapture",d="capture",c="scroll",b="engine.name",a="losecapture";qx.Class.define(e,{extend:qx.event.dispatch.AbstractBubbling,construct:function(j,k){qx.event.dispatch.AbstractBubbling.call(this,j);this.__ce=j.getWindow();this.__cg=k;j.addListener(this.__ce,h,this.releaseCapture,this);j.addListener(this.__ce,g,this.releaseCapture,this);j.addListener(this.__ce,c,this.releaseCapture,this);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__cg:null,__hA:null,__hB:true,__ce:null,_getParent:function(l){return l.parentNode;}
,canDispatchEvent:function(m,event,n){return !!(this.__hA&&this.__hC[n]);}
,dispatchEvent:function(o,event,p){if(p==f){event.stopPropagation();this.releaseCapture();return;}
;if(this.__hB||!qx.dom.Hierarchy.contains(this.__hA,o)){o=this.__hA;}
;qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,o,event,p);}
,__hC:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(q,r){var r=r!==false;if(this.__hA===q&&this.__hB==r){return;}
;if(this.__hA){this.releaseCapture();}
;this.nativeSetCapture(q,r);if(this.hasNativeCapture){var self=this;qx.bom.Event.addNativeListener(q,a,function(){qx.bom.Event.removeNativeListener(q,a,arguments.callee);self.releaseCapture();}
);}
;this.__hB=r;this.__hA=q;this.__cg.fireEvent(q,d,qx.event.type.Event,[true,false]);}
,getCaptureElement:function(){return this.__hA;}
,releaseCapture:function(){var s=this.__hA;if(!s){return;}
;this.__hA=null;this.__cg.fireEvent(s,a,qx.event.type.Event,[true,false]);this.nativeReleaseCapture(s);}
,hasNativeCapture:qx.core.Environment.get(b)==i,nativeSetCapture:qx.core.Environment.select(b,{"mshtml":function(t,u){t.setCapture(u!==false);}
,"default":qx.lang.Function.empty}),nativeReleaseCapture:qx.core.Environment.select(b,{"mshtml":function(v){v.releaseCapture();}
,"default":qx.lang.Function.empty})},destruct:function(){this.__hA=this.__ce=this.__cg=null;}
,defer:function(w){qx.event.Registration.addDispatcher(w);}
});}
)();
(function(){var a="qx.event.handler.Window";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);this._manager=b;this._window=b.getWindow();this._initWindowObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(c,d){}
,registerEvent:function(f,g,h){}
,unregisterEvent:function(i,j,k){}
,_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);var m=qx.event.handler.Window.SUPPORTED_TYPES;for(var l in m){qx.bom.Event.addNativeListener(this._window,l,this._onNativeWrapper);}
;}
,_stopWindowObserver:function(){var o=qx.event.handler.Window.SUPPORTED_TYPES;for(var n in o){qx.bom.Event.removeNativeListener(this._window,n,this._onNativeWrapper);}
;}
,_onNative:qx.event.GlobalError.observeMethod(function(e){if(this.isDisposed()){return;}
;var q=this._window;try{var t=q.document;}
catch(e){return;}
;var r=t.documentElement;var p=qx.bom.Event.getTarget(e);if(p==null||p===q||p===t||p===r){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,q]);qx.event.Registration.dispatchEvent(q,event);var s=event.getReturnValue();if(s!=null){e.returnValue=s;return s;}
;}
;}
)},destruct:function(){this._stopWindowObserver();this._manager=this._window=null;}
,defer:function(u){qx.event.Registration.addHandler(u);}
});}
)();
(function(){var q="text",p="file",o="+",n="'/>",k="CLASS",h="HTML",g="radio",f="script",d="className",c="TAG",bh="[test!='']:sizzle",bg="password",bf="htmlFor",be="submit",bd="<a href='#'></a>",bc="<a name='",bb="#",ba="qx.bom.Selector",Y="type",X="'] ",x="\\$&",y="parentNode",v="previousSibling",w="NAME",t="number",u="='$1']",r="reset",s='type',B="image",C=".TEST",K="<div class='test e'></div><div class='test'></div>",I="Syntax error, unrecognized expression: ",P="~",M="checkbox",T="[id='",R="hidden",E="__sizzle__",W="<p class='TEST'></p>",V="ID",U="body",D="object",G="button",H="[object Array]",J="href",L="e",N="\\",Q="div",S="*",z="id",A="string",F="undefined",O="";qx.Bootstrap.define(ba,{statics:{query:null,matches:null}});(function(){var bq=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,bx=0,bz=Object.prototype.toString,br=false,bB=true,bv=/\\/g,bk=/\W/;[0,0].sort(function(){bB=false;return 0;}
);var bu=function(bD,bE,bF,bG){bF=bF||[];bE=bE||document;var bP=bE;if(bE.nodeType!==1&&bE.nodeType!==9){return [];}
;if(!bD||typeof bD!==A){return bF;}
;var m,bJ,bH,bL,bN,bK,bQ,i,bR=true,bI=bu.isXML(bE),bM=[],bO=bD;do {bq.exec(O);m=bq.exec(bO);if(m){bO=m[3];bM.push(m[1]);if(m[2]){bL=m[3];break;}
;}
;}
while(m);if(bM.length>1&&bs.exec(bD)){if(bM.length===2&&bn.relative[bM[0]]){bJ=bm(bM[0]+bM[1],bE);}
else {bJ=bn.relative[bM[0]]?[bE]:bu(bM.shift(),bE);while(bM.length){bD=bM.shift();if(bn.relative[bD]){bD+=bM.shift();}
;bJ=bm(bD,bJ);}
;}
;}
else {if(!bG&&bM.length>1&&bE.nodeType===9&&!bI&&bn.match.ID.test(bM[0])&&!bn.match.ID.test(bM[bM.length-1])){bN=bu.find(bM.shift(),bE,bI);bE=bN.expr?bu.filter(bN.expr,bN.set)[0]:bN.set[0];}
;if(bE){bN=bG?{expr:bM.pop(),set:bj(bG)}:bu.find(bM.pop(),bM.length===1&&(bM[0]===P||bM[0]===o)&&bE.parentNode?bE.parentNode:bE,bI);bJ=bN.expr?bu.filter(bN.expr,bN.set):bN.set;if(bM.length>0){bH=bj(bJ);}
else {bR=false;}
;while(bM.length){bK=bM.pop();bQ=bK;if(!bn.relative[bK]){bK=O;}
else {bQ=bM.pop();}
;if(bQ==null){bQ=bE;}
;bn.relative[bK](bH,bQ,bI);}
;}
else {bH=bM=[];}
;}
;if(!bH){bH=bJ;}
;if(!bH){bu.error(bK||bD);}
;if(bz.call(bH)===H){if(!bR){bF.push.apply(bF,bH);}
else if(bE&&bE.nodeType===1){for(i=0;bH[i]!=null;i++){if(bH[i]&&(bH[i]===true||bH[i].nodeType===1&&bu.contains(bE,bH[i]))){bF.push(bJ[i]);}
;}
;}
else {for(i=0;bH[i]!=null;i++){if(bH[i]&&bH[i].nodeType===1){bF.push(bJ[i]);}
;}
;}
;}
else {bj(bH,bF);}
;if(bL){bu(bL,bP,bF,bG);bu.uniqueSort(bF);}
;return bF;}
;bu.uniqueSort=function(bS){if(bw){br=bB;bS.sort(bw);if(br){for(var i=1;i<bS.length;i++){if(bS[i]===bS[i-1]){bS.splice(i--,1);}
;}
;}
;}
;return bS;}
;bu.matches=function(bT,bU){return bu(bT,null,null,bU);}
;bu.matchesSelector=function(bV,bW){return bu(bW,null,null,[bV]).length>0;}
;bu.find=function(bX,bY,ca){var cb;if(!bX){return [];}
;for(var i=0,l=bn.order.length;i<l;i++){var cd,cc=bn.order[i];if((cd=bn.leftMatch[cc].exec(bX))){var ce=cd[1];cd.splice(1,1);if(ce.substr(ce.length-1)!==N){cd[1]=(cd[1]||O).replace(bv,O);cb=bn.find[cc](cd,bY,ca);if(cb!=null){bX=bX.replace(bn.match[cc],O);break;}
;}
;}
;}
;if(!cb){cb=typeof bY.getElementsByTagName!==F?bY.getElementsByTagName(S):[];}
;return {set:cb,expr:bX};}
;bu.filter=function(cf,cg,ch,ci){var ct,cs,cj=cf,co=[],ck=cg,cl=cg&&cg[0]&&bu.isXML(cg[0]);while(cf&&cg.length){for(var cr in bn.filter){if((ct=bn.leftMatch[cr].exec(cf))!=null&&ct[2]){var cq,cn,cm=bn.filter[cr],cu=ct[1];cs=false;ct.splice(1,1);if(cu.substr(cu.length-1)===N){continue;}
;if(ck===co){co=[];}
;if(bn.preFilter[cr]){ct=bn.preFilter[cr](ct,ck,ch,co,ci,cl);if(!ct){cs=cq=true;}
else if(ct===true){continue;}
;}
;if(ct){for(var i=0;(cn=ck[i])!=null;i++){if(cn){cq=cm(cn,ct,i,ck);var cp=ci^!!cq;if(ch&&cq!=null){if(cp){cs=true;}
else {ck[i]=false;}
;}
else if(cp){co.push(cn);cs=true;}
;}
;}
;}
;if(cq!==undefined){if(!ch){ck=co;}
;cf=cf.replace(bn.match[cr],O);if(!cs){return [];}
;break;}
;}
;}
;if(cf===cj){if(cs==null){bu.error(cf);}
else {break;}
;}
;cj=cf;}
;return ck;}
;bu.error=function(cv){throw I+cv;}
;var bn=bu.selectors={order:[V,w,c],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":d,"for":bf},attrHandle:{href:function(cw){return cw.getAttribute(J);}
,type:function(cx){return cx.getAttribute(Y);}
},relative:{"+":function(cy,cz){var cA=typeof cz===A,cC=cA&&!bk.test(cz),cD=cA&&!cC;if(cC){cz=cz.toLowerCase();}
;for(var i=0,l=cy.length,cB;i<l;i++){if((cB=cy[i])){while((cB=cB.previousSibling)&&cB.nodeType!==1){}
;cy[i]=cD||cB&&cB.nodeName.toLowerCase()===cz?cB||false:cB===cz;}
;}
;if(cD){bu.filter(cz,cy,true);}
;}
,">":function(cE,cF){var cH,cG=typeof cF===A,i=0,l=cE.length;if(cG&&!bk.test(cF)){cF=cF.toLowerCase();for(;i<l;i++){cH=cE[i];if(cH){var parent=cH.parentNode;cE[i]=parent.nodeName.toLowerCase()===cF?parent:false;}
;}
;}
else {for(;i<l;i++){cH=cE[i];if(cH){cE[i]=cG?cH.parentNode:cH.parentNode===cF;}
;}
;if(cG){bu.filter(cF,cE,true);}
;}
;}
,"":function(cI,cJ,cK){var cN,cL=bx++,cM=bA;if(typeof cJ===A&&!bk.test(cJ)){cJ=cJ.toLowerCase();cN=cJ;cM=bC;}
;cM(y,cJ,cL,cI,cN,cK);}
,"~":function(cO,cP,cQ){var cT,cR=bx++,cS=bA;if(typeof cP===A&&!bk.test(cP)){cP=cP.toLowerCase();cT=cP;cS=bC;}
;cS(v,cP,cR,cO,cT,cQ);}
},find:{ID:function(cU,cV,cW){if(typeof cV.getElementById!=="undefined"&&!cW){var m=cV.getElementById(cU[1]);return m&&m.parentNode?[m]:[];}
;}
,NAME:function(cX,cY){if(typeof cY.getElementsByName!=="undefined"){var db=[],da=cY.getElementsByName(cX[1]);for(var i=0,l=da.length;i<l;i++){if(da[i].getAttribute("name")===cX[1]){db.push(da[i]);}
;}
;return db.length===0?null:db;}
;}
,TAG:function(dc,dd){if(typeof dd.getElementsByTagName!=="undefined"){return dd.getElementsByTagName(dc[1]);}
;}
},preFilter:{CLASS:function(de,df,dg,dh,di,dj){de=" "+de[1].replace(bv,"")+" ";if(dj){return de;}
;for(var i=0,dk;(dk=df[i])!=null;i++){if(dk){if(di^(dk.className&&(" "+dk.className+" ").replace(/[\t\n\r]/g," ").indexOf(de)>=0)){if(!dg){dh.push(dk);}
;}
else if(dg){df[i]=false;}
;}
;}
;return false;}
,ID:function(dl){return dl[1].replace(bv,"");}
,TAG:function(dm,dn){return dm[1].replace(bv,"").toLowerCase();}
,CHILD:function(dp){if(dp[1]==="nth"){if(!dp[2]){bu.error(dp[0]);}
;dp[2]=dp[2].replace(/^\+|\s*/g,'');var dq=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(dp[2]==="even"&&"2n"||dp[2]==="odd"&&"2n+1"||!/\D/.test(dp[2])&&"0n+"+dp[2]||dp[2]);dp[2]=(dq[1]+(dq[2]||1))-0;dp[3]=dq[3]-0;}
else if(dp[2]){bu.error(dp[0]);}
;dp[0]=bx++;return dp;}
,ATTR:function(dr,ds,dt,du,dv,dw){var name=dr[1]=dr[1].replace(bv,"");if(!dw&&bn.attrMap[name]){dr[1]=bn.attrMap[name];}
;dr[4]=(dr[4]||dr[5]||"").replace(bv,"");if(dr[2]==="~="){dr[4]=" "+dr[4]+" ";}
;return dr;}
,PSEUDO:function(dx,dy,dz,dA,dB){if(dx[1]==="not"){if((bq.exec(dx[3])||"").length>1||/^\w/.test(dx[3])){dx[3]=bu(dx[3],null,null,dy);}
else {var dC=bu.filter(dx[3],dy,dz,true^dB);if(!dz){dA.push.apply(dA,dC);}
;return false;}
;}
else if(bn.match.POS.test(dx[0])||bn.match.CHILD.test(dx[0])){return true;}
;return dx;}
,POS:function(dD){dD.unshift(true);return dD;}
},filters:{enabled:function(dE){return dE.disabled===false&&dE.type!==R;}
,disabled:function(dF){return dF.disabled===true;}
,checked:function(dG){return dG.checked===true;}
,selected:function(dH){if(dH.parentNode){dH.parentNode.selectedIndex;}
;return dH.selected===true;}
,parent:function(dI){return !!dI.firstChild;}
,empty:function(dJ){return !dJ.firstChild;}
,has:function(dK,i,dL){return !!bu(dL[3],dK).length;}
,header:function(dM){return (/h\d/i).test(dM.nodeName);}
,text:function(dN){return q===dN.getAttribute(s);}
,radio:function(dO){return g===dO.type;}
,checkbox:function(dP){return M===dP.type;}
,file:function(dQ){return p===dQ.type;}
,password:function(dR){return bg===dR.type;}
,submit:function(dS){return be===dS.type;}
,image:function(dT){return B===dT.type;}
,reset:function(dU){return r===dU.type;}
,button:function(dV){return G===dV.type||dV.nodeName.toLowerCase()===G;}
,input:function(dW){return (/input|select|textarea|button/i).test(dW.nodeName);}
},setFilters:{first:function(dX,i){return i===0;}
,last:function(dY,i,ea,eb){return i===eb.length-1;}
,even:function(ec,i){return i%2===0;}
,odd:function(ed,i){return i%2===1;}
,lt:function(ee,i,ef){return i<ef[3]-0;}
,gt:function(eg,i,eh){return i>eh[3]-0;}
,nth:function(ei,i,ej){return ej[3]-0===i;}
,eq:function(ek,i,el){return el[3]-0===i;}
},filter:{PSEUDO:function(em,en,i,eo){var name=en[1],ep=bn.filters[name];if(ep){return ep(em,i,en,eo);}
else if(name==="contains"){return (em.textContent||em.innerText||bu.getText([em])||"").indexOf(en[3])>=0;}
else if(name==="not"){var eq=en[3];for(var j=0,l=eq.length;j<l;j++){if(eq[j]===em){return false;}
;}
;return true;}
else {bu.error(name);}
;;}
,CHILD:function(er,es){var ey=es[1],et=er;switch(ey){case "only":case "first":while((et=et.previousSibling)){if(et.nodeType===1){return false;}
;}
;if(ey==="first"){return true;}
;et=er;case "last":while((et=et.nextSibling)){if(et.nodeType===1){return false;}
;}
;return true;case "nth":var ez=es[2],ev=es[3];if(ez===1&&ev===0){return true;}
;var ex=es[0],parent=er.parentNode;if(parent&&(parent.sizcache!==ex||!er.nodeIndex)){var eu=0;for(et=parent.firstChild;et;et=et.nextSibling){if(et.nodeType===1){et.nodeIndex=++eu;}
;}
;parent.sizcache=ex;}
;var ew=er.nodeIndex-ev;if(ez===0){return ew===0;}
else {return (ew%ez===0&&ew/ez>=0);}
;};}
,ID:function(eA,eB){return eA.nodeType===1&&eA.getAttribute("id")===eB;}
,TAG:function(eC,eD){return (eD==="*"&&eC.nodeType===1)||eC.nodeName.toLowerCase()===eD;}
,CLASS:function(eE,eF){return (" "+(eE.className||eE.getAttribute("class"))+" ").indexOf(eF)>-1;}
,ATTR:function(eG,eH){var name=eH[1],eL=bn.attrHandle[name]?bn.attrHandle[name](eG):eG[name]!=null?eG[name]:eG.getAttribute(name),eK=eL+"",eJ=eH[2],eI=eH[4];return eL==null?eJ==="!=":eJ==="="?eK===eI:eJ==="*="?eK.indexOf(eI)>=0:eJ==="~="?(" "+eK+" ").indexOf(eI)>=0:!eI?eK&&eL!==false:eJ==="!="?eK!==eI:eJ==="^="?eK.indexOf(eI)===0:eJ==="$="?eK.substr(eK.length-eI.length)===eI:eJ==="|="?eK===eI||eK.substr(0,eI.length+1)===eI+"-":false;}
,POS:function(eM,eN,i,eO){var name=eN[2],eP=bn.setFilters[name];if(eP){return eP(eM,i,eN,eO);}
;}
}};var bs=bn.match.POS,bi=function(eQ,eR){return N+(eR-0+1);}
;for(var by in bn.match){bn.match[by]=new RegExp(bn.match[by].source+(/(?![^\[]*\])(?![^\(]*\))/.source));bn.leftMatch[by]=new RegExp(/(^(?:.|\r|\n)*?)/.source+bn.match[by].source.replace(/\\(\d+)/g,bi));}
;var bj=function(eS,eT){eS=Array.prototype.slice.call(eS,0);if(eT){eT.push.apply(eT,eS);return eT;}
;return eS;}
;try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;}
catch(e){bj=function(eU,eV){var i=0,eW=eV||[];if(bz.call(eU)===H){Array.prototype.push.apply(eW,eU);}
else {if(typeof eU.length===t){for(var l=eU.length;i<l;i++){eW.push(eU[i]);}
;}
else {for(;eU[i];i++){eW.push(eU[i]);}
;}
;}
;return eW;}
;}
;var bw,bo;if(document.documentElement.compareDocumentPosition){bw=function(a,b){if(a===b){br=true;return 0;}
;if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1;}
;return a.compareDocumentPosition(b)&4?-1:1;}
;}
else {bw=function(a,b){var fc,fa,fd=[],fe=[],eY=a.parentNode,fb=b.parentNode,eX=eY;if(a===b){br=true;return 0;}
else if(eY===fb){return bo(a,b);}
else if(!eY){return -1;}
else if(!fb){return 1;}
;;;while(eX){fd.unshift(eX);eX=eX.parentNode;}
;eX=fb;while(eX){fe.unshift(eX);eX=eX.parentNode;}
;fc=fd.length;fa=fe.length;for(var i=0;i<fc&&i<fa;i++){if(fd[i]!==fe[i]){return bo(fd[i],fe[i]);}
;}
;return i===fc?bo(a,fe[i],-1):bo(fd[i],b,1);}
;bo=function(a,b,ff){if(a===b){return ff;}
;var fg=a.nextSibling;while(fg){if(fg===b){return -1;}
;fg=fg.nextSibling;}
;return 1;}
;}
;bu.getText=function(fh){var fj=O,fi;for(var i=0;fh[i];i++){fi=fh[i];if(fi.nodeType===3||fi.nodeType===4){fj+=fi.nodeValue;}
else if(fi.nodeType!==8){fj+=bu.getText(fi.childNodes);}
;}
;return fj;}
;(function(){var fm=document.createElement(Q),fl=f+(new Date()).getTime(),fk=document.documentElement;fm.innerHTML=bc+fl+n;fk.insertBefore(fm,fk.firstChild);if(document.getElementById(fl)){bn.find.ID=function(fn,fo,fp){if(typeof fo.getElementById!==F&&!fp){var m=fo.getElementById(fn[1]);return m?m.id===fn[1]||typeof m.getAttributeNode!==F&&m.getAttributeNode(z).nodeValue===fn[1]?[m]:undefined:[];}
;}
;bn.filter.ID=function(fq,fr){var fs=typeof fq.getAttributeNode!==F&&fq.getAttributeNode(z);return fq.nodeType===1&&fs&&fs.nodeValue===fr;}
;}
;fk.removeChild(fm);fk=fm=null;}
)();(function(){var ft=document.createElement(Q);ft.appendChild(document.createComment(O));if(ft.getElementsByTagName(S).length>0){bn.find.TAG=function(fu,fv){var fx=fv.getElementsByTagName(fu[1]);if(fu[1]===S){var fw=[];for(var i=0;fx[i];i++){if(fx[i].nodeType===1){fw.push(fx[i]);}
;}
;fx=fw;}
;return fx;}
;}
;ft.innerHTML=bd;if(ft.firstChild&&typeof ft.firstChild.getAttribute!==F&&ft.firstChild.getAttribute(J)!==bb){bn.attrHandle.href=function(fy){return fy.getAttribute(J,2);}
;}
;ft=null;}
)();if(document.querySelectorAll){(function(){var fA=bu,fz=document.createElement(Q),fB=E;fz.innerHTML=W;if(fz.querySelectorAll&&fz.querySelectorAll(C).length===0){return;}
;bu=function(fD,fE,fF,fG){fE=fE||document;if(!fG&&!bu.isXML(fE)){var fL=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(fD);if(fL&&(fE.nodeType===1||fE.nodeType===9)){if(fL[1]){return bj(fE.getElementsByTagName(fD),fF);}
else if(fL[2]&&bn.find.CLASS&&fE.getElementsByClassName){return bj(fE.getElementsByClassName(fL[2]),fF);}
;}
;if(fE.nodeType===9){if(fD===U&&fE.body){return bj([fE.body],fF);}
else if(fL&&fL[3]){var fJ=fE.getElementById(fL[3]);if(fJ&&fJ.parentNode){if(fJ.id===fL[3]){return bj([fJ],fF);}
;}
else {return bj([],fF);}
;}
;try{return bj(fE.querySelectorAll(fD),fF);}
catch(fO){}
;}
else if(fE.nodeType===1&&fE.nodeName.toLowerCase()!==D){var fN=fE,fI=fE.getAttribute(z),fK=fI||fB,fH=fE.parentNode,fM=/^\s*[+~]/.test(fD);if(!fI){fE.setAttribute(z,fK);}
else {fK=fK.replace(/'/g,x);}
;if(fM&&fH){fE=fE.parentNode;}
;try{if(!fM||fH){return bj(fE.querySelectorAll(T+fK+X+fD),fF);}
;}
catch(fP){}
finally{if(!fI){fN.removeAttribute(z);}
;}
;}
;}
;return fA(fD,fE,fF,fG);}
;for(var fC in fA){bu[fC]=fA[fC];}
;fz=null;}
)();}
;(function(){var fS=document.documentElement,fQ=fS.matchesSelector||fS.mozMatchesSelector||fS.webkitMatchesSelector||fS.msMatchesSelector,fR=false;try{fQ.call(document.documentElement,bh);}
catch(fT){fR=true;}
;if(fQ){bu.matchesSelector=function(fU,fV){fV=fV.replace(/\=\s*([^'"\]]*)\s*\]/g,u);if(!bu.isXML(fU)){try{if(fR||!bn.match.PSEUDO.test(fV)&&!/!=/.test(fV)){return fQ.call(fU,fV);}
;}
catch(e){}
;}
;return bu(fV,null,null,[fU]).length>0;}
;}
;}
)();(function(){var fW=document.createElement(Q);fW.innerHTML=K;if(!fW.getElementsByClassName||fW.getElementsByClassName(L).length===0){return;}
;fW.lastChild.className=L;if(fW.getElementsByClassName(L).length===1){return;}
;bn.order.splice(1,0,k);bn.find.CLASS=function(fX,fY,ga){if(typeof fY.getElementsByClassName!==F&&!ga){return fY.getElementsByClassName(fX[1]);}
;}
;fW=null;}
)();function bC(gb,gc,gd,ge,gf,gg){for(var i=0,l=ge.length;i<l;i++){var gi=ge[i];if(gi){var gh=false;gi=gi[gb];while(gi){if(gi.sizcache===gd){gh=ge[gi.sizset];break;}
;if(gi.nodeType===1&&!gg){gi.sizcache=gd;gi.sizset=i;}
;if(gi.nodeName.toLowerCase()===gc){gh=gi;break;}
;gi=gi[gb];}
;ge[i]=gh;}
;}
;}
;function bA(gj,gk,gl,gm,gn,go){for(var i=0,l=gm.length;i<l;i++){var gq=gm[i];if(gq){var gp=false;gq=gq[gj];while(gq){if(gq.sizcache===gl){gp=gm[gq.sizset];break;}
;if(gq.nodeType===1){if(!go){gq.sizcache=gl;gq.sizset=i;}
;if(typeof gk!==A){if(gq===gk){gp=true;break;}
;}
else if(bu.filter(gk,[gq]).length>0){gp=gq;break;}
;}
;gq=gq[gj];}
;gm[i]=gp;}
;}
;}
;if(document.documentElement.contains){bu.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true);}
;}
else if(document.documentElement.compareDocumentPosition){bu.contains=function(a,b){return !!(a.compareDocumentPosition(b)&16);}
;}
else {bu.contains=function(){return false;}
;}
;bu.isXML=function(gr){var gs=(gr?gr.ownerDocument||gr:0).documentElement;return gs?gs.nodeName!==h:false;}
;var bm=function(gt,gu){var gy,gw=[],gv=O,gx=gu.nodeType?[gu]:gu;while((gy=bn.match.PSEUDO.exec(gt))){gv+=gy[0];gt=gt.replace(bn.match.PSEUDO,O);}
;gt=bn.relative[gt]?gt+S:gt;for(var i=0,l=gx.length;i<l;i++){bu(gt,gx[i],gw);}
;return bu.filter(gv,gw);}
;var bt=qx.bom.Selector;bt.query=function(gz,gA){return bu(gz,gA);}
;bt.matches=function(gB,gC){return bu(gB,null,null,gC);}
;}
)();}
)();
(function(){var l="Silverlight",k="plugin.silverlight.version",h="function",g="QuickTimeCheckObject.QuickTimeCheck.1",f="Adobe Acrobat",e="plugin.windowsmedia",d="QuickTime",c="plugin.silverlight",b="qx.bom.client.Plugin",a="plugin.divx",H="Chrome PDF Viewer",G="Windows Media",F="plugin.gears",E="plugin.quicktime",D="plugin.windowsmedia.version",C="DivX Web Player",B="AgControl.AgControl",A="plugin.pdf",z="plugin.pdf.version",y="plugin.divx.version",s="WMPlayer.OCX.7",t="AcroPDF.PDF",q="plugin.activex",r="plugin.quicktime.version",o="npdivx.DivXBrowserPlugin.1",p="pdf",m="wmv",n="divx",u="quicktime",v="mshtml",x="silverlight",w="";qx.Bootstrap.define(b,{statics:{getGears:function(){return !!(window.google&&window.google.gears);}
,getActiveX:function(){return (typeof window.ActiveXObject===h);}
,__hD:{quicktime:{plugin:[d],control:g},wmv:{plugin:[G],control:s},divx:{plugin:[C],control:o},silverlight:{plugin:[l],control:B},pdf:{plugin:[H,f],control:t}},getQuicktimeVersion:function(){var I=qx.bom.client.Plugin.__hD[u];return qx.bom.client.Plugin.__hE(I.control,I.plugin);}
,getWindowsMediaVersion:function(){var J=qx.bom.client.Plugin.__hD[m];return qx.bom.client.Plugin.__hE(J.control,J.plugin);}
,getDivXVersion:function(){var K=qx.bom.client.Plugin.__hD[n];return qx.bom.client.Plugin.__hE(K.control,K.plugin);}
,getSilverlightVersion:function(){var L=qx.bom.client.Plugin.__hD[x];return qx.bom.client.Plugin.__hE(L.control,L.plugin);}
,getPdfVersion:function(){var M=qx.bom.client.Plugin.__hD[p];return qx.bom.client.Plugin.__hE(M.control,M.plugin);}
,getQuicktime:function(){var N=qx.bom.client.Plugin.__hD[u];return qx.bom.client.Plugin.__hF(N.control,N.plugin);}
,getWindowsMedia:function(){var O=qx.bom.client.Plugin.__hD[m];return qx.bom.client.Plugin.__hF(O.control,O.plugin);}
,getDivX:function(){var P=qx.bom.client.Plugin.__hD[n];return qx.bom.client.Plugin.__hF(P.control,P.plugin);}
,getSilverlight:function(){var Q=qx.bom.client.Plugin.__hD[x];return qx.bom.client.Plugin.__hF(Q.control,Q.plugin);}
,getPdf:function(){var R=qx.bom.client.Plugin.__hD[p];return qx.bom.client.Plugin.__hF(R.control,R.plugin);}
,__hE:function(S,T){var U=qx.bom.client.Plugin.__hF(S,T);if(!U){return w;}
;if(qx.bom.client.Engine.getName()==v){var V=new ActiveXObject(S);try{var Y=V.versionInfo;if(Y!=undefined){return Y;}
;Y=V.version;if(Y!=undefined){return Y;}
;Y=V.settings.version;if(Y!=undefined){return Y;}
;}
catch(bb){return w;}
;return w;}
else {var ba=navigator.plugins;var X=/([0-9]\.[0-9])/g;for(var i=0;i<ba.length;i++){var W=ba[i];for(var j=0;j<T.length;j++){if(W.name.indexOf(T[j])!==-1){if(X.test(W.name)||X.test(W.description)){return RegExp.$1;}
;}
;}
;}
;return w;}
;}
,__hF:function(bc,bd){if(qx.bom.client.Engine.getName()==v){var be=window.ActiveXObject;if(!be){return false;}
;try{new ActiveXObject(bc);}
catch(bg){return false;}
;return true;}
else {var bf=navigator.plugins;if(!bf){return false;}
;var name;for(var i=0;i<bf.length;i++){name=bf[i].name;for(var j=0;j<bd.length;j++){if(name.indexOf(bd[j])!==-1){return true;}
;}
;}
;return false;}
;}
},defer:function(bh){qx.core.Environment.add(F,bh.getGears);qx.core.Environment.add(E,bh.getQuicktime);qx.core.Environment.add(r,bh.getQuicktimeVersion);qx.core.Environment.add(e,bh.getWindowsMedia);qx.core.Environment.add(D,bh.getWindowsMediaVersion);qx.core.Environment.add(a,bh.getDivX);qx.core.Environment.add(y,bh.getDivXVersion);qx.core.Environment.add(c,bh.getSilverlight);qx.core.Environment.add(k,bh.getSilverlightVersion);qx.core.Environment.add(A,bh.getPdf);qx.core.Environment.add(z,bh.getPdfVersion);qx.core.Environment.add(q,bh.getActiveX);}
});}
)();
(function(){var t='<\?xml version="1.0" encoding="utf-8"?>\n<',s="qx.xml.Document",r=" />",q="xml.domparser",p="SelectionLanguage",o="'",n="MSXML2.XMLHTTP.3.0",m="MSXML2.XMLHTTP.6.0",k="xml.implementation",j=" xmlns='",c="text/xml",h="XPath",f="MSXML2.DOMDocument.6.0",b="HTML",a="MSXML2.DOMDocument.3.0",e="",d="No XML implementation available!",g="plugin.activex";qx.Class.define(s,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(u){if(u.nodeType===9){return u.documentElement.nodeName!==b;}
else if(u.ownerDocument){return this.isXmlDocument(u.ownerDocument);}
else {return false;}
;}
,create:function(v,w){if(qx.core.Environment.get(g)){var x=new ActiveXObject(this.DOMDOC);if(this.DOMDOC==a){x.setProperty(p,h);}
;if(w){var y=t;y+=w;if(v){y+=j+v+o;}
;y+=r;x.loadXML(y);}
;return x;}
;if(qx.core.Environment.get(k)){return document.implementation.createDocument(v||e,w||e,null);}
;throw new Error(d);}
,fromString:function(z){if(qx.core.Environment.get(g)){var B=qx.xml.Document.create();B.loadXML(z);return B;}
;if(qx.core.Environment.get(q)){var A=new DOMParser();return A.parseFromString(z,c);}
;throw new Error(d);}
},defer:function(C){if(qx.core.Environment.get(g)){var D=[f,a];var E=[m,n];for(var i=0,l=D.length;i<l;i++){try{new ActiveXObject(D[i]);new ActiveXObject(E[i]);}
catch(F){continue;}
;C.DOMDOC=D[i];C.XMLHTTP=E[i];break;}
;}
;}
});}
)();
(function(){var s="xml.implementation",r="xml.attributens",q="xml.selectnodes",p="xml.getqualifieditem",o="SelectionLanguage",n="xml.getelementsbytagnamens",m="qx.bom.client.Xml",l="xml.domproperties",k="xml.selectsinglenode",j="1.0",d="xml.createnode",i="xml.domparser",g="getProperty",c="XML",b="string",f="xml.createelementns",e="<a></a>",h="function",a="undefined";qx.Bootstrap.define(m,{statics:{getImplementation:function(){return document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature(c,j);}
,getDomParser:function(){return typeof window.DOMParser!==a;}
,getSelectSingleNode:function(){return typeof qx.xml.Document.create().selectSingleNode!==a;}
,getSelectNodes:function(){return typeof qx.xml.Document.create().selectNodes!==a;}
,getElementsByTagNameNS:function(){return typeof qx.xml.Document.create().getElementsByTagNameNS!==a;}
,getDomProperties:function(){var t=qx.xml.Document.create();return (g in t&&typeof t.getProperty(o)===b);}
,getAttributeNS:function(){var u=qx.xml.Document.fromString(e).documentElement;return typeof u.getAttributeNS===h&&typeof u.setAttributeNS===h;}
,getCreateElementNS:function(){return typeof qx.xml.Document.create().createElementNS===h;}
,getCreateNode:function(){return typeof qx.xml.Document.create().createNode!==a;}
,getQualifiedItem:function(){var v=qx.xml.Document.fromString(e).documentElement;return typeof v.attributes.getQualifiedItem!==a;}
},defer:function(w){qx.core.Environment.add(s,w.getImplementation);qx.core.Environment.add(i,w.getDomParser);qx.core.Environment.add(k,w.getSelectSingleNode);qx.core.Environment.add(q,w.getSelectNodes);qx.core.Environment.add(n,w.getElementsByTagNameNS);qx.core.Environment.add(l,w.getDomProperties);qx.core.Environment.add(r,w.getAttributeNS);qx.core.Environment.add(f,w.getCreateElementNS);qx.core.Environment.add(d,w.getCreateNode);qx.core.Environment.add(p,w.getQualifiedItem);}
});}
)();
(function(){var a="qx.event.type.Focus";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,c,d){qx.event.type.Event.prototype.init.call(this,d,false);this._target=b;this._relatedTarget=c;return this;}
}});}
)();
(function(){var k="borderBottomWidth",j="borderTopWidth",i="left",h="borderLeftWidth",g="bottom",f="top",e="right",d="qx.bom.element.Scroll",c="borderRightWidth",b="visible",a="scroll";qx.Class.define(d,{statics:{intoViewX:function(l,stop,m){var parent=l.parentNode;var r=qx.dom.Node.getDocument(l);var n=r.body;var z,x,u;var B,s,C;var v,D,G;var E,p,y,o;var t,F,w;var q=m===i;var A=m===e;stop=stop?stop.parentNode:r;while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===n||qx.bom.element.Overflow.getY(parent)!=b)){if(parent===n){x=parent.scrollLeft;u=x+qx.bom.Viewport.getWidth();B=qx.bom.Viewport.getWidth();s=parent.clientWidth;C=parent.scrollWidth;v=0;D=0;G=0;}
else {z=qx.bom.element.Location.get(parent);x=z.left;u=z.right;B=parent.offsetWidth;s=parent.clientWidth;C=parent.scrollWidth;v=parseInt(qx.bom.element.Style.get(parent,h),10)||0;D=parseInt(qx.bom.element.Style.get(parent,c),10)||0;G=B-s-v-D;}
;E=qx.bom.element.Location.get(l);p=E.left;y=E.right;o=l.offsetWidth;t=p-x-v;F=y-u+D;w=0;if(q){w=t;}
else if(A){w=F+G;}
else if(t<0||o>s){w=t;}
else if(F>0){w=F+G;}
;;;parent.scrollLeft+=w;qx.event.Registration.fireNonBubblingEvent(parent,a);}
;if(parent===n){break;}
;parent=parent.parentNode;}
;}
,intoViewY:function(H,stop,I){var parent=H.parentNode;var O=qx.dom.Node.getDocument(H);var J=O.body;var W,K,S;var Y,V,Q;var M,N,L;var bb,bc,X,R;var U,P,bd;var ba=I===f;var T=I===g;stop=stop?stop.parentNode:O;while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===J||qx.bom.element.Overflow.getY(parent)!=b)){if(parent===J){K=parent.scrollTop;S=K+qx.bom.Viewport.getHeight();Y=qx.bom.Viewport.getHeight();V=parent.clientHeight;Q=parent.scrollHeight;M=0;N=0;L=0;}
else {W=qx.bom.element.Location.get(parent);K=W.top;S=W.bottom;Y=parent.offsetHeight;V=parent.clientHeight;Q=parent.scrollHeight;M=parseInt(qx.bom.element.Style.get(parent,j),10)||0;N=parseInt(qx.bom.element.Style.get(parent,k),10)||0;L=Y-V-M-N;}
;bb=qx.bom.element.Location.get(H);bc=bb.top;X=bb.bottom;R=H.offsetHeight;U=bc-K-M;P=X-S+N;bd=0;if(ba){bd=U;}
else if(T){bd=P+L;}
else if(U<0||R>V){bd=U;}
else if(P>0){bd=P+L;}
;;;parent.scrollTop+=bd;qx.event.Registration.fireNonBubblingEvent(parent,a);}
;if(parent===J){break;}
;parent=parent.parentNode;}
;}
,intoView:function(be,stop,bf,bg){this.intoViewX(be,stop,bf);this.intoViewY(be,stop,bg);}
}});}
)();
(function(){var k="borderLeftStyle",j="borderRightStyle",i="div",h="borderRightWidth",g="overflow-y",f="borderLeftWidth",e="-moz-scrollbars-vertical",d=":",b="100px",a="overflow:",B="qx.bom.element.Overflow",A="overflow-x",z="overflowX",y=";",x="overflowY",w="engine.version",v="none",u="scroll",r="gecko",q="overflow",o="",p="engine.name",m="-moz-scrollbars-none",n="hidden",l="css.overflowxy";qx.Bootstrap.define(B,{statics:{DEFAULT_SCROLLBAR_WIDTH:14,__dk:null,getScrollbarWidth:function(){if(this.__dk!==null){return this.__dk;}
;var C=qx.bom.element.Style;var E=function(I,J){return parseInt(C.get(I,J),10)||0;}
;var F=function(K){return (C.get(K,j)==v?0:E(K,h));}
;var D=function(L){return (C.get(L,k)==v?0:E(L,f));}
;var H=qx.core.Environment.select(p,{"mshtml":function(M){if(C.get(M,x)==n||M.clientWidth==0){return F(M);}
;return Math.max(0,M.offsetWidth-M.clientLeft-M.clientWidth);}
,"default":function(N){if(N.clientWidth==0){var O=C.get(N,q);var P=(O==u||O==e?16:0);return Math.max(0,F(N)+P);}
;return Math.max(0,(N.offsetWidth-N.clientWidth-D(N)));}
});var G=function(Q){return H(Q)-F(Q);}
;var t=document.createElement(i);var s=t.style;s.height=s.width=b;s.overflow=u;document.body.appendChild(t);var c=G(t);this.__dk=c;document.body.removeChild(t);return this.__dk;}
,_compile:function(R,S){if(!qx.core.Environment.get(l)){R=a;if(qx.core.Environment.get(p)===r&&S==n){S=m;}
;}
;return R+d+S+y;}
,compileX:function(T){return this._compile(A,T);}
,compileY:function(U){return this._compile(g,U);}
,getX:function(V,W){if(qx.core.Environment.get(l)){return qx.bom.element.Style.get(V,z,W,false);}
;var X=qx.bom.element.Style.get(V,q,W,false);if(X===m){X=n;}
;return X;}
,setX:function(Y,ba){if(qx.core.Environment.get(l)){Y.style.overflowX=ba;}
else {if(ba===n&&qx.core.Environment.get(p)===r&&parseFloat(qx.core.Environment.get(w))<1.8){ba=m;}
;Y.style.overflow=ba;}
;}
,resetX:function(bb){if(qx.core.Environment.get(l)){bb.style.overflowX=o;}
else {bb.style.overflow=o;}
;}
,getY:function(bc,bd){if(qx.core.Environment.get(l)){return qx.bom.element.Style.get(bc,x,bd,false);}
;var be=qx.bom.element.Style.get(bc,q,bd,false);if(be===m){be=n;}
;return be;}
,setY:function(bf,bg){if(qx.core.Environment.get(l)){bf.style.overflowY=bg;}
else {if(bg===n&&qx.core.Environment.get(p)===r&&parseFloat(qx.core.Environment.get(w))<1.8){bg=m;}
;bf.style.overflow=bg;}
;}
,resetY:function(bh){if(qx.core.Environment.get(l)){bh.style.overflowY=o;}
else {bh.style.overflow=o;}
;}
}});}
)();
(function(){var p="clip:auto;",o="rect(",n=")",m=");",l="",k="Could not parse clip string: ",j="qx.bom.element.Clip",i="string",h="clip:rect(",g=" ",c="clip",f="rect(auto,auto,auto,auto)",e="rect(auto, auto, auto, auto)",b=",",a="px",d="auto";qx.Bootstrap.define(j,{statics:{compile:function(q){if(!q){return p;}
;var v=q.left;var top=q.top;var u=q.width;var t=q.height;var r,s;if(v==null){r=(u==null?d:u+a);v=d;}
else {r=(u==null?d:v+u+a);v=v+a;}
;if(top==null){s=(t==null?d:t+a);top=d;}
else {s=(t==null?d:top+t+a);top=top+a;}
;return h+top+b+r+b+s+b+v+m;}
,get:function(w,x){var z=qx.bom.element.Style.get(w,c,x,false);var F,top,D,C;var y,A;if(typeof z===i&&z!==d&&z!==l){z=qx.lang.String.trim(z);if(/\((.*)\)/.test(z)){var E=RegExp.$1;if(/,/.test(E)){var B=E.split(b);}
else {var B=E.split(g);}
;top=qx.lang.String.trim(B[0]);y=qx.lang.String.trim(B[1]);A=qx.lang.String.trim(B[2]);F=qx.lang.String.trim(B[3]);if(F===d){F=null;}
;if(top===d){top=null;}
;if(y===d){y=null;}
;if(A===d){A=null;}
;if(top!=null){top=parseInt(top,10);}
;if(y!=null){y=parseInt(y,10);}
;if(A!=null){A=parseInt(A,10);}
;if(F!=null){F=parseInt(F,10);}
;if(y!=null&&F!=null){D=y-F;}
else if(y!=null){D=y;}
;if(A!=null&&top!=null){C=A-top;}
else if(A!=null){C=A;}
;}
else {throw new Error(k+z);}
;}
;return {left:F||null,top:top||null,width:D||null,height:C||null};}
,set:function(G,H){if(!H){G.style.clip=f;return;}
;var M=H.left;var top=H.top;var L=H.width;var K=H.height;var I,J;if(M==null){I=(L==null?d:L+a);M=d;}
else {I=(L==null?d:M+L+a);M=M+a;}
;if(top==null){J=(K==null?d:K+a);top=d;}
else {J=(K==null?d:top+K+a);top=top+a;}
;G.style.clip=o+top+b+I+b+J+b+M+n;}
,reset:function(N){N.style.clip=e;}
}});}
)();
(function(){var d="qx.bom.Style",c="string",b="",a="-";qx.Bootstrap.define(d,{statics:{VENDOR_PREFIXES:["Webkit","Moz","O","ms","Khtml"],getPropertyName:function(e){var f=document.documentElement.style;if(f[e]!==undefined){return e;}
;for(var i=0,l=this.VENDOR_PREFIXES.length;i<l;i++){var g=this.VENDOR_PREFIXES[i]+qx.lang.String.firstUp(e);if(f[g]!==undefined){return g;}
;}
;return null;}
,getAppliedStyle:function(h,j,k,m){var n=(m!==false)?[null].concat(this.VENDOR_PREFIXES):[null];for(var i=0,l=n.length;i<l;i++){var o=n[i]?a+n[i].toLowerCase()+a+k:k;try{h.style[j]=o;if(typeof h.style[j]==c&&h.style[j]!==b){return o;}
;}
catch(p){}
;}
;return null;}
}});}
)();
(function(){var h="border-box",g="qx.bom.element.BoxSizing",f="boxSizing",e="content-box",d=":",c=";",b="",a="css.boxsizing";qx.Bootstrap.define(g,{statics:{__dl:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__dm:function(i){var j=this.__dl;return j.tags[i.tagName.toLowerCase()]||j.types[i.type];}
,compile:function(k){if(qx.core.Environment.get(a)){var l=qx.lang.String.hyphenate(qx.core.Environment.get(a));return l+d+k+c;}
else {{}
;}
;}
,get:function(m){if(qx.core.Environment.get(a)){return qx.bom.element.Style.get(m,f,null,false)||b;}
;if(qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(m))){if(!this.__dm(m)){return e;}
;}
;return h;}
,set:function(n,o){if(qx.core.Environment.get(a)){try{n.style[qx.core.Environment.get(a)]=o;}
catch(p){{}
;}
;}
else {{}
;}
;}
,reset:function(q){this.set(q,b);}
}});}
)();
(function(){var n="css.float",m="css.borderimage.standardsyntax",l="borderRadius",k="boxSizing",j="stretch",h='m11',g="content",f="css.inlineblock",e="css.gradient.filter",d="css.appearance",bs="css.opacity",br="css.gradient.radial",bq="input",bp="userSelect",bo="css.overflowxy",bn="styleFloat",bm="css.textShadow.filter",bl="css.usermodify",bk="css.boxsizing",bj='url("foo.png") 4 4 4 4 fill stretch',u="css.boxmodel",v="qx.bom.client.Css",s="appearance",t="placeholder",q="css.textShadow",r="DXImageTransform.Microsoft.Shadow",o="css.boxshadow",p="css.gradient.legacywebkit",C="css.borderradius",D="linear-gradient(0deg, #fff, #000)",O="textShadow",L="css.borderimage",W="rgba(1, 2, 3, 0.5)",R="color=#666666,direction=45",bf="radial-gradient(0px 0px, cover, red 50%, blue 100%)",bc="rgba",H="(",bi='url("foo.png") 4 4 4 4 stretch',bh="css.gradient.linear",bg="DXImageTransform.Microsoft.Gradient",G="css.userselect",J="-webkit-gradient(linear,0% 0%,100% 100%,from(white), to(red))",K="mshtml",N="css.rgba",P=");",S="4 fill",Y='WebKitCSSMatrix',be="red 1px 1px 3px",w="none",x="startColorStr=#550000FF, endColorStr=#55FFFF00",I="progid:",V="css.placeholder",U="css.userselect.none",T="css.textoverflow",bb="textOverflow",ba="userModify",Q="boxShadow",X="cssFloat",a="border",bd="color",y="borderImage",z="foo.png",M="span",b="string",c="-moz-none",F="backgroundImage",A="inline-block",B="-moz-inline-box",E="div";qx.Bootstrap.define(v,{statics:{__dn:null,getBoxModel:function(){var content=qx.bom.client.Engine.getName()!==K||!qx.bom.client.Browser.getQuirksMode();return content?g:a;}
,getTextOverflow:function(){return qx.bom.Style.getPropertyName(bb);}
,getPlaceholder:function(){var i=document.createElement(bq);return t in i;}
,getAppearance:function(){return qx.bom.Style.getPropertyName(s);}
,getBorderRadius:function(){return qx.bom.Style.getPropertyName(l);}
,getBoxShadow:function(){return qx.bom.Style.getPropertyName(Q);}
,getBorderImage:function(){return qx.bom.Style.getPropertyName(y);}
,getBorderImageSyntax:function(){var bu=qx.bom.client.Css.getBorderImage();if(!bu){return null;}
;var bt=document.createElement(E);if(bu===y){bt.style[bu]=bj;if(bt.style.borderImageSource.indexOf(z)>=0&&bt.style.borderImageSlice.indexOf(S)>=0&&bt.style.borderImageRepeat.indexOf(j)>=0){return true;}
;}
else {bt.style[bu]=bi;if(bt.style[bu].indexOf(z)>=0){return false;}
;}
;return null;}
,getUserSelect:function(){return qx.bom.Style.getPropertyName(bp);}
,getUserSelectNone:function(){var bw=qx.bom.client.Css.getUserSelect();if(bw){var bv=document.createElement(M);bv.style[bw]=c;return bv.style[bw]===c?c:w;}
;return null;}
,getUserModify:function(){return qx.bom.Style.getPropertyName(ba);}
,getFloat:function(){var bx=document.documentElement.style;return bx.cssFloat!==undefined?X:bx.styleFloat!==undefined?bn:null;}
,getTranslate3d:function(){return Y in window&&h in new WebKitCSSMatrix();}
,getLinearGradient:function(){qx.bom.client.Css.__dn=false;var bB=D;var by=document.createElement(E);var bz=qx.bom.Style.getAppliedStyle(by,F,bB);if(!bz){bB=J;var bz=qx.bom.Style.getAppliedStyle(by,F,bB,false);if(bz){qx.bom.client.Css.__dn=true;}
;}
;if(!bz){return null;}
;var bA=/(.*?)\(/.exec(bz);return bA?bA[1]:null;}
,getFilterGradient:function(){return qx.bom.client.Css.__do(bg,x);}
,getRadialGradient:function(){var bF=bf;var bC=document.createElement(E);var bD=qx.bom.Style.getAppliedStyle(bC,F,bF);if(!bD){return null;}
;var bE=/(.*?)\(/.exec(bD);return bE?bE[1]:null;}
,getLegacyWebkitGradient:function(){if(qx.bom.client.Css.__dn===null){qx.bom.client.Css.getLinearGradient();}
;return qx.bom.client.Css.__dn;}
,getRgba:function(){var bG;try{bG=document.createElement(E);}
catch(bH){bG=document.createElement();}
;try{bG.style[bd]=W;if(bG.style[bd].indexOf(bc)!=-1){return true;}
;}
catch(bI){}
;return false;}
,getBoxSizing:function(){return qx.bom.Style.getPropertyName(k);}
,getInlineBlock:function(){var bJ=document.createElement(M);bJ.style.display=A;if(bJ.style.display==A){return A;}
;bJ.style.display=B;if(bJ.style.display!==B){return B;}
;return null;}
,getOpacity:function(){return (typeof document.documentElement.style.opacity==b);}
,getOverflowXY:function(){return (typeof document.documentElement.style.overflowX==b)&&(typeof document.documentElement.style.overflowY==b);}
,getTextShadow:function(){var bM=be;var bK=document.createElement(E);var bL=qx.bom.Style.getAppliedStyle(bK,O,bM);return !bL;}
,getFilterTextShadow:function(){return qx.bom.client.Css.__do(r,R);}
,__do:function(bN,bO){var bQ=false;var bR=I+bN+H+bO+P;var bP=document.createElement(E);document.body.appendChild(bP);bP.style.filter=bR;if(bP.filters&&bP.filters.length>0&&bP.filters.item(bN).enabled==true){bQ=true;}
;document.body.removeChild(bP);return bQ;}
},defer:function(bS){qx.core.Environment.add(T,bS.getTextOverflow);qx.core.Environment.add(V,bS.getPlaceholder);qx.core.Environment.add(C,bS.getBorderRadius);qx.core.Environment.add(o,bS.getBoxShadow);qx.core.Environment.add(bh,bS.getLinearGradient);qx.core.Environment.add(e,bS.getFilterGradient);qx.core.Environment.add(br,bS.getRadialGradient);qx.core.Environment.add(p,bS.getLegacyWebkitGradient);qx.core.Environment.add(u,bS.getBoxModel);qx.core.Environment.add(N,bS.getRgba);qx.core.Environment.add(L,bS.getBorderImage);qx.core.Environment.add(m,bS.getBorderImageSyntax);qx.core.Environment.add(bl,bS.getUserModify);qx.core.Environment.add(G,bS.getUserSelect);qx.core.Environment.add(U,bS.getUserSelectNone);qx.core.Environment.add(d,bS.getAppearance);qx.core.Environment.add(n,bS.getFloat);qx.core.Environment.add(bk,bS.getBoxSizing);qx.core.Environment.add(f,bS.getInlineBlock);qx.core.Environment.add(bs,bS.getOpacity);qx.core.Environment.add(bo,bS.getOverflowXY);qx.core.Environment.add(q,bS.getTextShadow);qx.core.Environment.add(bm,bS.getFilterTextShadow);}
});}
)();
(function(){var k="engine.name",j="",i="cursor:",h=";",g="qx.bom.element.Cursor",f="cursor",e="hand",d="nw-resize",c="ne-resize",b="n-resize",a="e-resize";qx.Bootstrap.define(g,{statics:{__bd:qx.core.Environment.select(k,{"mshtml":{"cursor":e,"ew-resize":a,"ns-resize":b,"nesw-resize":c,"nwse-resize":d},"opera":{"col-resize":a,"row-resize":b,"ew-resize":a,"ns-resize":b,"nesw-resize":c,"nwse-resize":d},"default":{}}),compile:function(l){return i+(this.__bd[l]||l)+h;}
,get:function(m,n){return qx.bom.element.Style.get(m,f,n,false);}
,set:function(o,p){o.style.cursor=this.__bd[p]||p;}
,reset:function(q){q.style.cursor=j;}
}});}
)();
(function(){var m="MozOpacity",l=");",k=")",j="zoom:1;filter:alpha(opacity=",i="qx.bom.element.Opacity",h="css.opacity",g="alpha(opacity=",f=";",e="opacity:",d="opacity",a="filter",c="engine.name",b="";qx.Bootstrap.define(i,{statics:{SUPPORT_CSS3_OPACITY:false,compile:qx.core.Environment.select(c,{"mshtml":function(n){if(n>=1){n=1;}
;if(n<0.00001){n=0;}
;if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){return e+n+f;}
else {return j+(n*100)+l;}
;}
,"gecko":function(o){if(o>=1){o=0.999999;}
;return e+o+f;}
,"default":function(p){if(p>=1){return b;}
;return e+p+f;}
}),set:qx.core.Environment.select(c,{"mshtml":function(q,r){if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){if(r>=1){r=b;}
;q.style.opacity=r;}
else {var s=qx.bom.element.Style.get(q,a,qx.bom.element.Style.COMPUTED_MODE,false);if(r>=1){r=1;}
;if(r<0.00001){r=0;}
;if(!q.currentStyle||!q.currentStyle.hasLayout){q.style.zoom=1;}
;q.style.filter=s.replace(/alpha\([^\)]*\)/gi,b)+g+r*100+k;}
;}
,"gecko":function(t,u){if(u>=1){u=0.999999;}
;if(!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){t.style.MozOpacity=u;}
else {t.style.opacity=u;}
;}
,"default":function(v,w){if(w>=1){w=b;}
;v.style.opacity=w;}
}),reset:qx.core.Environment.select(c,{"mshtml":function(x){if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){x.style.opacity=b;}
else {var y=qx.bom.element.Style.get(x,a,qx.bom.element.Style.COMPUTED_MODE,false);x.style.filter=y.replace(/alpha\([^\)]*\)/gi,b);}
;}
,"gecko":function(z){if(!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){z.style.MozOpacity=b;}
else {z.style.opacity=b;}
;}
,"default":function(A){A.style.opacity=b;}
}),get:qx.core.Environment.select(c,{"mshtml":function(B,C){if(qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY){var D=qx.bom.element.Style.get(B,d,C,false);if(D!=null){return parseFloat(D);}
;return 1.0;}
else {var E=qx.bom.element.Style.get(B,a,C,false);if(E){var D=E.match(/alpha\(opacity=(.*)\)/);if(D&&D[1]){return parseFloat(D[1])/100;}
;}
;return 1.0;}
;}
,"gecko":function(F,G){var H=qx.bom.element.Style.get(F,!qx.bom.element.Opacity.SUPPORT_CSS3_OPACITY?m:d,G,false);if(H==0.999999){H=1.0;}
;if(H!=null){return parseFloat(H);}
;return 1.0;}
,"default":function(I,J){var K=qx.bom.element.Style.get(I,d,J,false);if(K!=null){return parseFloat(K);}
;return 1.0;}
})},defer:function(L){L.SUPPORT_CSS3_OPACITY=qx.core.Environment.get(h);}
});}
)();
(function(){var j="css.float",i="px",h="Cascaded styles are not supported in this browser!",g="css.appearance",f="pixelRight",e="css.userselect",d="css.boxsizing",c="css.textoverflow",b="pixelHeight",a=":",z="pixelTop",y="css.borderimage",x="pixelLeft",w="css.usermodify",v="qx.bom.element.Style",u=". Only pixel values work well across different clients.",t="pixelBottom",s="pixelWidth",r="Untranslated computed property value: ",q=";",o="float",p="browser.documentmode",m="mshtml",n="style",k="engine.name",l="";qx.Bootstrap.define(v,{statics:{__dr:function(){var B={"appearance":qx.core.Environment.get(g),"userSelect":qx.core.Environment.get(e),"textOverflow":qx.core.Environment.get(c),"borderImage":qx.core.Environment.get(y),"float":qx.core.Environment.get(j),"userModify":qx.core.Environment.get(w),"boxSizing":qx.core.Environment.get(d)};this.__ds={};for(var A in qx.lang.Object.clone(B)){if(!B[A]){delete B[A];}
else {this.__ds[A]=A==o?o:qx.lang.String.hyphenate(B[A]);}
;}
;this.__dt=B;}
,__du:function(name){var C=qx.bom.Style.getPropertyName(name);if(C){this.__dt[name]=C;}
;return C;}
,__dv:{width:s,height:b,left:x,right:f,top:z,bottom:t},__dw:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing,overflowX:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setX,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getX,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetX,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileX,qx.bom.element.Overflow)},overflowY:{set:qx.lang.Function.bind(qx.bom.element.Overflow.setY,qx.bom.element.Overflow),get:qx.lang.Function.bind(qx.bom.element.Overflow.getY,qx.bom.element.Overflow),reset:qx.lang.Function.bind(qx.bom.element.Overflow.resetY,qx.bom.element.Overflow),compile:qx.lang.Function.bind(qx.bom.element.Overflow.compileY,qx.bom.element.Overflow)}},compile:function(D){var F=[];var G=this.__dw;var H=this.__ds;var name,E;for(name in D){E=D[name];if(E==null){continue;}
;name=this.__dt[name]||this.__du(name)||name;if(G[name]){F.push(G[name].compile(E));}
else {if(!H[name]){H[name]=qx.lang.String.hyphenate(name);}
;F.push(H[name],a,E,q);}
;}
;return F.join(l);}
,setCss:function(I,J){if(qx.core.Environment.get(k)===m&&parseInt(qx.core.Environment.get(p),10)<8){I.style.cssText=J;}
else {I.setAttribute(n,J);}
;}
,getCss:function(K){if(qx.core.Environment.get(k)===m&&parseInt(qx.core.Environment.get(p),10)<8){return K.style.cssText.toLowerCase();}
else {return K.getAttribute(n);}
;}
,isPropertySupported:function(L){return (this.__dw[L]||this.__dt[L]||L in document.documentElement.style);}
,COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(M,name,N,O){{}
;name=this.__dt[name]||this.__du(name)||name;if(O!==false&&this.__dw[name]){return this.__dw[name].set(M,N);}
else {M.style[name]=N!==null?N:l;}
;}
,setStyles:function(P,Q,R){{}
;var U=this.__dt;var W=this.__dw;var S=P.style;for(var V in Q){var T=Q[V];var name=U[V]||this.__du(V)||V;if(T===undefined){if(R!==false&&W[name]){W[name].reset(P);}
else {S[name]=l;}
;}
else {if(R!==false&&W[name]){W[name].set(P,T);}
else {S[name]=T!==null?T:l;}
;}
;}
;}
,reset:function(X,name,Y){name=this.__dt[name]||this.__du(name)||name;if(Y!==false&&this.__dw[name]){return this.__dw[name].reset(X);}
else {X.style[name]=l;}
;}
,get:qx.core.Environment.select(k,{"mshtml":function(ba,name,bb,bc){name=this.__dt[name]||this.__du(name)||name;if(bc!==false&&this.__dw[name]){return this.__dw[name].get(ba,bb);}
;if(!ba.currentStyle){return ba.style[name]||l;}
;switch(bb){case this.LOCAL_MODE:return ba.style[name]||l;case this.CASCADED_MODE:return ba.currentStyle[name]||l;default:var bg=ba.currentStyle[name]||l;if(/^-?[\.\d]+(px)?$/i.test(bg)){return bg;}
;var bf=this.__dv[name];if(bf){var bd=ba.style[name];ba.style[name]=bg||0;var be=ba.style[bf]+i;ba.style[name]=bd;return be;}
;if(/^-?[\.\d]+(em|pt|%)?$/i.test(bg)){throw new Error(r+name+u);}
;return bg;};}
,"default":function(bh,name,bi,bj){name=this.__dt[name]||this.__du(name)||name;if(bj!==false&&this.__dw[name]){return this.__dw[name].get(bh,bi);}
;switch(bi){case this.LOCAL_MODE:return bh.style[name]||l;case this.CASCADED_MODE:if(bh.currentStyle){return bh.currentStyle[name]||l;}
;throw new Error(h);default:var bk=qx.dom.Node.getDocument(bh);var bl=bk.defaultView.getComputedStyle(bh,null);return bl?bl[name]:l;};}
})},defer:function(bm){bm.__dr();}
});}
)();
(function(){var j="qx.bom.element.Location",i="paddingLeft",h="static",g="marginBottom",f="visible",e="BODY",d="paddingBottom",c="paddingTop",b="gecko",a="marginRight",D="mshtml",C="position",B="margin",A="overflow",z="paddingRight",y="browser.documentmode",x="border",w="borderBottomWidth",v="borderRightWidth",u="auto",q="padding",r="browser.quirksmode",o="engine.version",p="marginTop",m="marginLeft",n="border-box",k="engine.name",l="scroll",s="borderTopWidth",t="borderLeftWidth";qx.Bootstrap.define(j,{statics:{__hG:function(E,F){return qx.bom.element.Style.get(E,F,qx.bom.element.Style.COMPUTED_MODE,false);}
,__hH:function(G,H){return parseInt(qx.bom.element.Style.get(G,H,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;}
,__hI:function(I){var K=0,top=0;var J=qx.dom.Node.getWindow(I);K-=qx.bom.Viewport.getScrollLeft(J);top-=qx.bom.Viewport.getScrollTop(J);return {left:K,top:top};}
,__hJ:qx.core.Environment.select(k,{"mshtml":function(L){var N=qx.dom.Node.getDocument(L);var M=N.body;var O=0;var top=0;O-=M.clientLeft+N.documentElement.clientLeft;top-=M.clientTop+N.documentElement.clientTop;if(!qx.core.Environment.get(r)){O+=this.__hH(M,t);top+=this.__hH(M,s);}
;return {left:O,top:top};}
,"webkit":function(P){var R=qx.dom.Node.getDocument(P);var Q=R.body;var S=Q.offsetLeft;var top=Q.offsetTop;if(parseFloat(qx.core.Environment.get(o))<530.17){S+=this.__hH(Q,t);top+=this.__hH(Q,s);}
;return {left:S,top:top};}
,"gecko":function(T){var U=qx.dom.Node.getDocument(T).body;var V=U.offsetLeft;var top=U.offsetTop;if(parseFloat(qx.core.Environment.get(o))<1.9){V+=this.__hH(U,m);top+=this.__hH(U,p);}
;if(qx.bom.element.BoxSizing.get(U)!==n){V+=this.__hH(U,t);top+=this.__hH(U,s);}
;return {left:V,top:top};}
,"default":function(W){var X=qx.dom.Node.getDocument(W).body;var Y=X.offsetLeft;var top=X.offsetTop;return {left:Y,top:top};}
}),__hK:qx.core.Environment.select(k,{"gecko":function(ba){if(ba.getBoundingClientRect){var bd=ba.getBoundingClientRect();var be=Math.round(bd.left);var top=Math.round(bd.top);}
else {var be=0;var top=0;var bb=qx.dom.Node.getDocument(ba).body;var bc=qx.bom.element.BoxSizing;if(bc.get(ba)!==n){be-=this.__hH(ba,t);top-=this.__hH(ba,s);}
;while(ba&&ba!==bb){be+=ba.offsetLeft;top+=ba.offsetTop;if(bc.get(ba)!==n){be+=this.__hH(ba,t);top+=this.__hH(ba,s);}
;if(ba.parentNode&&this.__hG(ba.parentNode,A)!=f){be+=this.__hH(ba.parentNode,t);top+=this.__hH(ba.parentNode,s);}
;ba=ba.offsetParent;}
;}
;return {left:be,top:top};}
,"default":function(bf){var bh=qx.dom.Node.getDocument(bf);if(bf.getBoundingClientRect){var bi=bf.getBoundingClientRect();var bj=Math.round(bi.left);var top=Math.round(bi.top);}
else {var bj=bf.offsetLeft;var top=bf.offsetTop;bf=bf.offsetParent;var bg=bh.body;while(bf&&bf!=bg){bj+=bf.offsetLeft;top+=bf.offsetTop;bj+=this.__hH(bf,t);top+=this.__hH(bf,s);bf=bf.offsetParent;}
;}
;return {left:bj,top:top};}
}),get:function(bk,bl){if(bk.tagName==e){var location=this.__hL(bk);var bs=location.left;var top=location.top;}
else {var bm=this.__hJ(bk);var br=this.__hK(bk);var scroll=this.__hI(bk);var bs=br.left+bm.left-scroll.left;var top=br.top+bm.top-scroll.top;}
;var bn=bs+bk.offsetWidth;var bo=top+bk.offsetHeight;if(bl){if(bl==q||bl==l){var bp=qx.bom.element.Overflow.getX(bk);if(bp==l||bp==u){bn+=bk.scrollWidth-bk.offsetWidth+this.__hH(bk,t)+this.__hH(bk,v);}
;var bq=qx.bom.element.Overflow.getY(bk);if(bq==l||bq==u){bo+=bk.scrollHeight-bk.offsetHeight+this.__hH(bk,s)+this.__hH(bk,w);}
;}
;switch(bl){case q:bs+=this.__hH(bk,i);top+=this.__hH(bk,c);bn-=this.__hH(bk,z);bo-=this.__hH(bk,d);case l:bs-=bk.scrollLeft;top-=bk.scrollTop;bn-=bk.scrollLeft;bo-=bk.scrollTop;case x:bs+=this.__hH(bk,t);top+=this.__hH(bk,s);bn-=this.__hH(bk,v);bo-=this.__hH(bk,w);break;case B:bs-=this.__hH(bk,m);top-=this.__hH(bk,p);bn+=this.__hH(bk,a);bo+=this.__hH(bk,g);break;};}
;return {left:bs,top:top,right:bn,bottom:bo};}
,__hL:function(bt){var top=bt.offsetTop;var bu=bt.offsetLeft;if(qx.core.Environment.get(k)!==D||!((parseFloat(qx.core.Environment.get(o))<8||qx.core.Environment.get(y)<8)&&!qx.core.Environment.get(r))){top+=this.__hH(bt,p);bu+=this.__hH(bt,m);}
;if(qx.core.Environment.get(k)===b){top+=this.__hH(bt,t);bu+=this.__hH(bt,s);}
;return {left:bu,top:top};}
,getLeft:function(bv,bw){return this.get(bv,bw).left;}
,getTop:function(bx,by){return this.get(bx,by).top;}
,getRight:function(bz,bA){return this.get(bz,bA).right;}
,getBottom:function(bB,bC){return this.get(bB,bC).bottom;}
,getRelative:function(bD,bE,bF,bG){var bI=this.get(bD,bF);var bH=this.get(bE,bG);return {left:bI.left-bH.left,top:bI.top-bH.top,right:bI.right-bH.right,bottom:bI.bottom-bH.bottom};}
,getPosition:function(bJ){return this.getRelative(bJ,this.getOffsetParent(bJ));}
,getOffsetParent:function(bK){var bM=bK.offsetParent||document.body;var bL=qx.bom.element.Style;while(bM&&(!/^body|html$/i.test(bM.tagName)&&bL.get(bM,C)===h)){bM=bM.offsetParent;}
;return bM;}
}});}
)();
(function(){var o="touchend",n="useraction",m=" times in a row",l=" due to exceptions in user code. The application has to be reloaded!",k="\n",j="qx.debug",i="Error while layout flush: ",h='ie',g="browser.version",f="Stack trace: \n",b="event.touch",d="qx.ui.core.queue.Manager",c="browser.name",a="Fatal Error: Flush terminated ";qx.Class.define(d,{statics:{__hY:false,__ia:{},__ib:0,MAX_RETRIES:10,scheduleFlush:function(p){var self=qx.ui.core.queue.Manager;self.__ia[p]=true;if(!self.__hY){self.__fy.schedule();self.__hY=true;}
;}
,flush:function(){if(qx.ui.core.queue.Manager.PAUSE){return;}
;var self=qx.ui.core.queue.Manager;if(self.__ic){return;}
;self.__ic=true;self.__fy.cancel();var q=self.__ia;self.__id(function(){while(q.visibility||q.widget||q.appearance||q.layout||q.element){if(q.widget){delete q.widget;qx.ui.core.queue.Widget.flush();}
;if(q.visibility){delete q.visibility;qx.ui.core.queue.Visibility.flush();}
;if(q.appearance){delete q.appearance;qx.ui.core.queue.Appearance.flush();}
;if(q.widget||q.visibility||q.appearance){continue;}
;if(q.layout){delete q.layout;qx.ui.core.queue.Layout.flush();}
;if(q.widget||q.visibility||q.appearance||q.layout){continue;}
;if(q.element){delete q.element;qx.html.Element.flush();}
;}
;}
,function(){self.__hY=false;}
);self.__id(function(){if(q.dispose){delete q.dispose;qx.ui.core.queue.Dispose.flush();}
;}
,function(){self.__ic=false;}
);self.__ib=0;}
,__id:function(r,s){var self=qx.ui.core.queue.Manager;try{r();}
catch(e){if(qx.core.Environment.get(j)){qx.log.Logger.error(i+e+k+f+qx.dev.StackTrace.getStackTraceFromError(e));}
;self.__hY=false;self.__ic=false;self.__ib+=1;if(qx.core.Environment.get(c)==h&&qx.core.Environment.get(g)<=7){s();}
;if(self.__ib<=self.MAX_RETRIES){self.scheduleFlush();}
else {throw new Error(a+(self.__ib-1)+m+l);}
;throw e;}
finally{s();}
;}
,__ie:function(e){var t=qx.ui.core.queue.Manager;if(e.getData()==o){t.PAUSE=true;if(t.__if){window.clearTimeout(t.__if);}
;t.__if=window.setTimeout(function(){t.PAUSE=false;t.__if=null;t.flush();}
,500);}
else {t.flush();}
;}
},defer:function(u){u.__fy=new qx.util.DeferredCall(u.flush);qx.html.Element._scheduleFlush=u.scheduleFlush;qx.event.Registration.addListener(window,n,qx.core.Environment.get(b)?u.__ie:u.flush);}
});}
)();
(function(){var c="qx.ui.core.queue.Widget",b="widget",a="$$default";qx.Class.define(c,{statics:{__dH:[],__ia:{},remove:function(d,e){var f=this.__dH;if(!qx.lang.Array.contains(f,d)){return;}
;var g=d.$$hash;if(e==null){qx.lang.Array.remove(f,d);delete this.__ia[g];return;}
;if(this.__ia[g]){delete this.__ia[g][e];if(qx.lang.Object.getLength(this.__ia[g])==0){qx.lang.Array.remove(f,d);}
;}
;}
,add:function(h,j){var k=this.__dH;if(!qx.lang.Array.contains(k,h)){k.unshift(h);}
;if(j==null){j=a;}
;var l=h.$$hash;if(!this.__ia[l]){this.__ia[l]={};}
;this.__ia[l][j]=true;qx.ui.core.queue.Manager.scheduleFlush(b);}
,flush:function(){var m=this.__dH;var o,n;for(var i=m.length-1;i>=0;i--){o=m[i];n=this.__ia[o.$$hash];m.splice(i,1);o.syncWidget(n);}
;if(m.length!=0){return;}
;this.__dH=[];this.__ia={};}
}});}
)();
(function(){var b="qx.ui.core.queue.Visibility",a="visibility";qx.Class.define(b,{statics:{__dH:[],__cR:{},remove:function(c){delete this.__cR[c.$$hash];qx.lang.Array.remove(this.__dH,c);}
,isVisible:function(d){return this.__cR[d.$$hash]||false;}
,__ig:function(e){var g=this.__cR;var f=e.$$hash;var h;if(e.isExcluded()){h=false;}
else {var parent=e.$$parent;if(parent){h=this.__ig(parent);}
else {h=e.isRootWidget();}
;}
;return g[f]=h;}
,add:function(j){var k=this.__dH;if(qx.lang.Array.contains(k,j)){return;}
;k.unshift(j);qx.ui.core.queue.Manager.scheduleFlush(a);}
,flush:function(){var o=this.__dH;var p=this.__cR;for(var i=o.length-1;i>=0;i--){var n=o[i].$$hash;if(p[n]!=null){o[i].addChildrenToQueue(o);}
;}
;var l={};for(var i=o.length-1;i>=0;i--){var n=o[i].$$hash;l[n]=p[n];p[n]=null;}
;for(var i=o.length-1;i>=0;i--){var m=o[i];var n=m.$$hash;o.splice(i,1);if(p[n]==null){this.__ig(m);}
;if(p[n]&&p[n]!=l[n]){m.checkAppearanceNeeds();}
;}
;this.__dH=[];}
}});}
)();
(function(){var b="appearance",a="qx.ui.core.queue.Appearance";qx.Class.define(a,{statics:{__dH:[],remove:function(c){qx.lang.Array.remove(this.__dH,c);}
,add:function(d){var e=this.__dH;if(qx.lang.Array.contains(e,d)){return;}
;e.unshift(d);qx.ui.core.queue.Manager.scheduleFlush(b);}
,has:function(f){return qx.lang.Array.contains(this.__dH,f);}
,flush:function(){var j=qx.ui.core.queue.Visibility;var g=this.__dH;var h;for(var i=g.length-1;i>=0;i--){h=g[i];g.splice(i,1);if(j.isVisible(h)){h.syncAppearance();}
else {h.$$stateChanges=true;}
;}
;}
}});}
)();
(function(){var b="qx.ui.core.queue.Layout",a="layout";qx.Class.define(b,{statics:{__dH:{},remove:function(c){delete this.__dH[c.$$hash];}
,add:function(d){this.__dH[d.$$hash]=d;qx.ui.core.queue.Manager.scheduleFlush(a);}
,isScheduled:function(e){return !!this.__dH[e.$$hash];}
,flush:function(){var f=this.__hX();for(var i=f.length-1;i>=0;i--){var g=f[i];if(g.hasValidLayout()){continue;}
;if(g.isRootWidget()&&!g.hasUserBounds()){var j=g.getSizeHint();g.renderLayout(0,0,j.width,j.height);}
else {var h=g.getBounds();g.renderLayout(h.left,h.top,h.width,h.height);}
;}
;}
,getNestingLevel:function(k){var l=this.__hW;var n=0;var parent=k;while(true){if(l[parent.$$hash]!=null){n+=l[parent.$$hash];break;}
;if(!parent.$$parent){break;}
;parent=parent.$$parent;n+=1;}
;var m=n;while(k&&k!==parent){l[k.$$hash]=m--;k=k.$$parent;}
;return n;}
,__hV:function(){var t=qx.ui.core.queue.Visibility;this.__hW={};var s=[];var r=this.__dH;var o,q;for(var p in r){o=r[p];if(t.isVisible(o)){q=this.getNestingLevel(o);if(!s[q]){s[q]={};}
;s[q][p]=o;delete r[p];}
;}
;return s;}
,__hX:function(){var x=[];var z=this.__hV();for(var w=z.length-1;w>=0;w--){if(!z[w]){continue;}
;for(var v in z[w]){var u=z[w][v];if(w==0||u.isRootWidget()||u.hasUserBounds()){x.push(u);u.invalidateLayoutCache();continue;}
;var B=u.getSizeHint(false);if(B){u.invalidateLayoutCache();var y=u.getSizeHint();var A=(!u.getBounds()||B.minWidth!==y.minWidth||B.width!==y.width||B.maxWidth!==y.maxWidth||B.minHeight!==y.minHeight||B.height!==y.height||B.maxHeight!==y.maxHeight);}
else {A=true;}
;if(A){var parent=u.getLayoutParent();if(!z[w-1]){z[w-1]={};}
;z[w-1][parent.$$hash]=parent;}
else {x.push(u);}
;}
;}
;return x;}
}});}
)();
(function(){var a="qx.ui.decoration.IDecorator";qx.Interface.define(a,{members:{getMarkup:function(){}
,resize:function(b,c,d){}
,tint:function(e,f){}
,getInsets:function(){}
}});}
)();
(function(){var o="_applyTheme",n="",m="__di",l="_",k="Missing definition of which decorator to use in entry: ",j="!",h="qx.ui.decoration.",g="qx.theme.manager.Decoration",f=".",e="Theme",b="changeTheme",d="string",c="singleton",a="object";qx.Class.define(g,{type:c,extend:qx.core.Object,properties:{theme:{check:e,nullable:true,apply:o,event:b}},members:{__di:null,resolve:function(p){if(!p){return null;}
;if(typeof p===a){return p;}
;var u=this.getTheme();if(!u){return null;}
;var r=this.__di;if(!r){r=this.__di={};}
;var q=r[p];if(q){return q;}
;var x=u.decorations[p];if(!x){return null;}
;if(!x.style){x.style={};}
;var s=x;while(s.include){s=u.decorations[s.include];if(!x.decorator&&s.decorator){x.decorator=s.decorator;}
;if(s.style){for(var w in s.style){if(x.style[w]==undefined){x.style[w]=s.style[w];}
;}
;}
;}
;var t=x.decorator;if(t==null){throw new Error(k+p+j);}
;if(t instanceof Array){var v=t.concat([]);for(var i=0;i<v.length;i++){v[i]=v[i].basename.replace(f,n);}
;var name=h+v.join(l);if(!qx.Class.getByName(name)){qx.Class.define(name,{extend:qx.ui.decoration.DynamicDecorator,include:t});}
;t=qx.Class.getByName(name);}
;return r[p]=(new t).set(x.style);}
,isValidPropertyValue:function(y){if(typeof y===d){return this.isDynamic(y);}
else if(typeof y===a){var z=y.constructor;return qx.Class.hasInterface(z,qx.ui.decoration.IDecorator);}
;return false;}
,isDynamic:function(A){if(!A){return false;}
;var B=this.getTheme();if(!B){return false;}
;return !!B.decorations[A];}
,isCached:function(C){return !this.__di?false:qx.lang.Object.contains(this.__di,C);}
,_applyTheme:function(D,E){var G=qx.util.AliasManager.getInstance();if(E){for(var F in E.aliases){G.remove(F);}
;}
;if(D){for(var F in D.aliases){G.add(F,D.aliases[F]);}
;}
;if(!D){this.__di={};}
;}
},destruct:function(){this._disposeMap(m);}
});}
)();
(function(){var j="abstract",i="insetRight",h="insetTop",g="insetBottom",f="qx.ui.decoration.Abstract",e="shorthand",d="insetLeft",c="Abstract method called.",b="Number",a="_applyInsets";qx.Class.define(f,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:j,properties:{insetLeft:{check:b,nullable:true,apply:a},insetRight:{check:b,nullable:true,apply:a},insetBottom:{check:b,nullable:true,apply:a},insetTop:{check:b,nullable:true,apply:a},insets:{group:[h,i,g,d],mode:e}},members:{__dj:null,_getDefaultInsets:function(){throw new Error(c);}
,_isInitialized:function(){throw new Error(c);}
,_resetInsets:function(){this.__dj=null;}
,getInsets:function(){if(this.__dj){return this.__dj;}
;var k=this._getDefaultInsets();return this.__dj={left:this.getInsetLeft()==null?k.left:this.getInsetLeft(),right:this.getInsetRight()==null?k.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?k.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?k.top:this.getInsetTop()};}
,_applyInsets:function(){{}
;this.__dj=null;}
},destruct:function(){this.__dj=null;}
});}
)();
(function(){var p="_tint",o="abstract",n='<div style="',m="_style",l="_getDefaultInsetsFor",k="",j="left",h='</div>',g="qx.ui.decoration.DynamicDecorator",f='">',c="bottom",e="_resize",d="right",b="top",a="px";qx.Class.define(g,{extend:qx.ui.decoration.Abstract,type:o,members:{getStyles:function(){var s={};var r=this._getStyles();for(var q in r){s[qx.lang.String.camelCase(q)]=r[q];}
;return s;}
,_getStyles:function(){var t={};for(var name in this){if(name.indexOf(m)==0&&this[name] instanceof Function){this[name](t);}
;}
;return t;}
,getMarkup:function(){if(this._markup){return this._markup;}
;var u=this._getStyles();if(!this._generateMarkup){var v=[n];v.push(qx.bom.element.Style.compile(u));v.push(f);if(this._getContent){v.push(this._getContent());}
;v.push(h);v=v.join(k);}
else {var v=this._generateMarkup(u);}
;return this._markup=v;}
,resize:function(w,x,y){var A={};for(var name in this){if(name.indexOf(e)==0&&this[name] instanceof Function){var z=this[name](w,x,y);if(A.left==undefined){A.left=z.left;A.top=z.top;}
;if(A.width==undefined){A.width=z.width;A.height=z.height;}
;if(z.elementToApplyDimensions){A.elementToApplyDimensions=z.elementToApplyDimensions;}
;A.left=z.left<A.left?z.left:A.left;A.top=z.top<A.top?z.top:A.top;A.width=z.width>A.width?z.width:A.width;A.height=z.height>A.height?z.height:A.height;}
;}
;if(A.left!=undefined){w.style.left=A.left+a;w.style.top=A.top+a;}
;if(A.width!=undefined){if(A.width<0){A.width=0;}
;if(A.height<0){A.height=0;}
;if(A.elementToApplyDimensions){w=A.elementToApplyDimensions;}
;w.style.width=A.width+a;w.style.height=A.height+a;}
;}
,tint:function(B,C){for(var name in this){if(name.indexOf(p)==0&&this[name] instanceof Function){this[name](B,C,B.style);}
;}
;}
,_isInitialized:function(){return !!this._markup;}
,_getDefaultInsets:function(){var G=[b,d,c,j];var E={};for(var name in this){if(name.indexOf(l)==0&&this[name] instanceof Function){var F=this[name]();for(var i=0;i<G.length;i++){var D=G[i];if(E[D]==undefined){E[D]=F[D];}
;if(F[D]<E[D]){E[D]=F[D];}
;}
;}
;}
;if(E[b]!=undefined){return E;}
;return {top:0,right:0,bottom:0,left:0};}
}});}
)();
(function(){var b="qx.util.ValueManager",a="abstract";qx.Class.define(b,{type:a,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this._dynamic={};}
,members:{_dynamic:null,resolveDynamic:function(c){return this._dynamic[c];}
,isDynamic:function(d){return !!this._dynamic[d];}
,resolve:function(e){if(e&&this._dynamic[e]){return this._dynamic[e];}
;return e;}
,_setDynamic:function(f){this._dynamic=f;}
,_getDynamic:function(){return this._dynamic;}
},destruct:function(){this._dynamic=null;}
});}
)();
(function(){var j="0",i="qx/static",h="http://",g="https://",f="file://",e="qx.util.AliasManager",d="singleton",c=".",b="static",a="/";qx.Class.define(e,{type:d,extend:qx.util.ValueManager,construct:function(){qx.util.ValueManager.call(this);this.__dz={};this.add(b,i);}
,members:{__dz:null,_preprocess:function(k){var n=this._getDynamic();if(n[k]===false){return k;}
else if(n[k]===undefined){if(k.charAt(0)===a||k.charAt(0)===c||k.indexOf(h)===0||k.indexOf(g)===j||k.indexOf(f)===0){n[k]=false;return k;}
;if(this.__dz[k]){return this.__dz[k];}
;var m=k.substring(0,k.indexOf(a));var l=this.__dz[m];if(l!==undefined){n[k]=l+k.substring(m.length);}
;}
;return k;}
,add:function(o,p){this.__dz[o]=p;var r=this._getDynamic();for(var q in r){if(q.substring(0,q.indexOf(a))===o){r[q]=p+q.substring(o.length);}
;}
;}
,remove:function(s){delete this.__dz[s];}
,resolve:function(t){var u=this._getDynamic();if(t!=null){t=this._preprocess(t);}
;return u[t]||t;}
,getAliases:function(){var v={};for(var w in this.__dz){v[w]=this.__dz[w];}
;return v;}
},destruct:function(){this.__dz=null;}
});}
)();
(function(){var k="_applyItalic",j="_applyBold",h="_applyTextShadow",g="Integer",f="_applyFamily",e="_applyLineHeight",d="Array",c="line-through",b="overline",a="Color",B="String",A="qx.bom.Font",z="Number",y="_applyDecoration",x=" ",w="_applySize",v=",",u="_applyColor",t="Boolean",s="px",q='"',r="italic",o="normal",p="bold",m="underline",n="";qx.Class.define(A,{extend:qx.core.Object,construct:function(C,D){qx.core.Object.call(this);this.__dC={fontFamily:n,fontSize:null,fontWeight:null,fontStyle:null,textDecoration:null,lineHeight:null,color:null,textShadow:null};if(C!==undefined){this.setSize(C);}
;if(D!==undefined){this.setFamily(D);}
;}
,statics:{fromString:function(E){var I=new qx.bom.Font();var G=E.split(/\s+/);var name=[];var H;for(var i=0;i<G.length;i++){switch(H=G[i]){case p:I.setBold(true);break;case r:I.setItalic(true);break;case m:I.setDecoration(m);break;default:var F=parseInt(H,10);if(F==H||qx.lang.String.contains(H,s)){I.setSize(F);}
else {name.push(H);}
;break;};}
;if(name.length>0){I.setFamily(name);}
;return I;}
,fromConfig:function(J){var K=new qx.bom.Font;K.set(J);return K;}
,__dD:{fontFamily:n,fontSize:n,fontWeight:n,fontStyle:n,textDecoration:n,lineHeight:1.2,color:n,textShadow:n},getDefaultStyles:function(){return this.__dD;}
},properties:{size:{check:g,nullable:true,apply:w},lineHeight:{check:z,nullable:true,apply:e},family:{check:d,nullable:true,apply:f},bold:{check:t,nullable:true,apply:j},italic:{check:t,nullable:true,apply:k},decoration:{check:[m,c,b],nullable:true,apply:y},color:{check:a,nullable:true,apply:u},textShadow:{nullable:true,check:B,apply:h}},members:{__dC:null,_applySize:function(L,M){this.__dC.fontSize=L===null?null:L+s;}
,_applyLineHeight:function(N,O){this.__dC.lineHeight=N===null?null:N;}
,_applyFamily:function(P,Q){var R=n;for(var i=0,l=P.length;i<l;i++){if(P[i].indexOf(x)>0){R+=q+P[i]+q;}
else {R+=P[i];}
;if(i!==l-1){R+=v;}
;}
;this.__dC.fontFamily=R;}
,_applyBold:function(S,T){this.__dC.fontWeight=S==null?null:S?p:o;}
,_applyItalic:function(U,V){this.__dC.fontStyle=U==null?null:U?r:o;}
,_applyDecoration:function(W,X){this.__dC.textDecoration=W==null?null:W;}
,_applyColor:function(Y,ba){this.__dC.color=null;if(Y){this.__dC.color=qx.theme.manager.Color.getInstance().resolve(Y);}
;}
,_applyTextShadow:function(bb,bc){this.__dC.textShadow=bb==null?null:bb;}
,getStyles:function(){return this.__dC;}
}});}
)();
(function(){var g="_applyTheme",f="qx.theme.manager.Color",e="Theme",d="changeTheme",c="string",b="singleton",a="Could not parse color: ";qx.Class.define(f,{type:b,extend:qx.util.ValueManager,properties:{theme:{check:e,nullable:true,apply:g,event:d}},members:{_applyTheme:function(h){var i={};if(h){var j=h.colors;var k=qx.util.ColorUtil;var l;for(var m in j){l=j[m];if(typeof l===c){if(!k.isCssString(l)){throw new Error(a+l);}
;}
else if(l instanceof Array){l=k.rgbToRgbString(l);}
else {throw new Error(a+l);}
;i[m]=l;}
;}
;this._setDynamic(i);}
,resolve:function(n){var q=this._dynamic;var o=q[n];if(o){return o;}
;var p=this.getTheme();if(p!==null&&p.colors[n]){return q[n]=p.colors[n];}
;return n;}
,isDynamic:function(r){var t=this._dynamic;if(r&&(t[r]!==undefined)){return true;}
;var s=this.getTheme();if(s!==null&&r&&(s.colors[r]!==undefined)){t[r]=s.colors[r];return true;}
;return false;}
}});}
)();
(function(){var o="Invalid hex value: ",n="qx.util.ColorUtil",m=")",l="#",k="Invalid hex3 value: ",j="qx.theme.manager.Color",h="rgb(",e="Invalid hex6 value: ",d="Could not parse color: ",c="Could not convert system colors to RGB: ",a=",";qx.Bootstrap.define(n,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(s){return this.NAMED[s]!==undefined;}
,isSystemColor:function(u){return this.SYSTEM[u]!==undefined;}
,supportsThemes:function(){if(qx.Class){return qx.Class.isDefined(j);}
;return false;}
,isThemedColor:function(v){if(!this.supportsThemes()){return false;}
;if(qx.theme&&qx.theme.manager&&qx.theme.manager.Color){return qx.theme.manager.Color.getInstance().isDynamic(v);}
;return false;}
,stringToRgb:function(w){if(this.supportsThemes()&&this.isThemedColor(w)){var w=qx.theme.manager.Color.getInstance().resolveDynamic(w);}
;if(this.isNamedColor(w)){return this.NAMED[w];}
else if(this.isSystemColor(w)){throw new Error(c+w);}
else if(this.isRgbString(w)){return this.__de();}
else if(this.isHex3String(w)){return this.__dg();}
else if(this.isHex6String(w)){return this.__dh();}
;;;;throw new Error(d+w);}
,cssStringToRgb:function(x){if(this.isNamedColor(x)){return this.NAMED[x];}
else if(this.isSystemColor(x)){throw new Error(c+x);}
else if(this.isRgbString(x)){return this.__de();}
else if(this.isRgbaString(x)){return this.__df();}
else if(this.isHex3String(x)){return this.__dg();}
else if(this.isHex6String(x)){return this.__dh();}
;;;;;throw new Error(d+x);}
,stringToRgbString:function(y){return this.rgbToRgbString(this.stringToRgb(y));}
,rgbToRgbString:function(z){return h+z[0]+a+z[1]+a+z[2]+m;}
,rgbToHexString:function(A){return (l+qx.lang.String.pad(A[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(A[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(A[2].toString(16).toUpperCase(),2));}
,isValidPropertyValue:function(B){return (this.isThemedColor(B)||this.isNamedColor(B)||this.isHex3String(B)||this.isHex6String(B)||this.isRgbString(B)||this.isRgbaString(B));}
,isCssString:function(C){return (this.isSystemColor(C)||this.isNamedColor(C)||this.isHex3String(C)||this.isHex6String(C)||this.isRgbString(C)||this.isRgbaString(C));}
,isHex3String:function(D){return this.REGEXP.hex3.test(D);}
,isHex6String:function(E){return this.REGEXP.hex6.test(E);}
,isRgbString:function(F){return this.REGEXP.rgb.test(F);}
,isRgbaString:function(G){return this.REGEXP.rgba.test(G);}
,__de:function(){var J=parseInt(RegExp.$1,10);var I=parseInt(RegExp.$2,10);var H=parseInt(RegExp.$3,10);return [J,I,H];}
,__df:function(){var M=parseInt(RegExp.$1,10);var L=parseInt(RegExp.$2,10);var K=parseInt(RegExp.$3,10);return [M,L,K];}
,__dg:function(){var P=parseInt(RegExp.$1,16)*17;var O=parseInt(RegExp.$2,16)*17;var N=parseInt(RegExp.$3,16)*17;return [P,O,N];}
,__dh:function(){var S=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);var R=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);var Q=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);return [S,R,Q];}
,hex3StringToRgb:function(T){if(this.isHex3String(T)){return this.__dg(T);}
;throw new Error(k+T);}
,hex3StringToHex6String:function(U){if(this.isHex3String(U)){return this.rgbToHexString(this.hex3StringToRgb(U));}
;return U;}
,hex6StringToRgb:function(V){if(this.isHex6String(V)){return this.__dh(V);}
;throw new Error(e+V);}
,hexStringToRgb:function(W){if(this.isHex3String(W)){return this.__dg(W);}
;if(this.isHex6String(W)){return this.__dh(W);}
;throw new Error(o+W);}
,rgbToHsb:function(X){var ba,bb,bd;var bj=X[0];var bg=X[1];var Y=X[2];var bi=(bj>bg)?bj:bg;if(Y>bi){bi=Y;}
;var bc=(bj<bg)?bj:bg;if(Y<bc){bc=Y;}
;bd=bi/255.0;if(bi!=0){bb=(bi-bc)/bi;}
else {bb=0;}
;if(bb==0){ba=0;}
else {var bf=(bi-bj)/(bi-bc);var bh=(bi-bg)/(bi-bc);var be=(bi-Y)/(bi-bc);if(bj==bi){ba=be-bh;}
else if(bg==bi){ba=2.0+bf-be;}
else {ba=4.0+bh-bf;}
;ba=ba/6.0;if(ba<0){ba=ba+1.0;}
;}
;return [Math.round(ba*360),Math.round(bb*100),Math.round(bd*100)];}
,hsbToRgb:function(bk){var i,f,p,q,t;var bl=bk[0]/360;var bm=bk[1]/100;var bn=bk[2]/100;if(bl>=1.0){bl%=1.0;}
;if(bm>1.0){bm=1.0;}
;if(bn>1.0){bn=1.0;}
;var bo=Math.floor(255*bn);var bp={};if(bm==0.0){bp.red=bp.green=bp.blue=bo;}
else {bl*=6.0;i=Math.floor(bl);f=bl-i;p=Math.floor(bo*(1.0-bm));q=Math.floor(bo*(1.0-(bm*f)));t=Math.floor(bo*(1.0-(bm*(1.0-f))));switch(i){case 0:bp.red=bo;bp.green=t;bp.blue=p;break;case 1:bp.red=q;bp.green=bo;bp.blue=p;break;case 2:bp.red=p;bp.green=bo;bp.blue=t;break;case 3:bp.red=p;bp.green=q;bp.blue=bo;break;case 4:bp.red=t;bp.green=p;bp.blue=bo;break;case 5:bp.red=bo;bp.green=p;bp.blue=q;break;};}
;return [bp.red,bp.green,bp.blue];}
,randomColor:function(){var r=Math.round(Math.random()*255);var g=Math.round(Math.random()*255);var b=Math.round(Math.random()*255);return this.rgbToRgbString([r,g,b]);}
}});}
)();
(function(){var f="_applyTheme",e="qx.theme.manager.Font",d="_dynamic",c="Theme",b="changeTheme",a="singleton";qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:c,nullable:true,apply:f,event:b}},members:{resolveDynamic:function(g){var h=this._dynamic;return g instanceof qx.bom.Font?g:h[g];}
,resolve:function(i){var l=this._dynamic;var j=l[i];if(j){return j;}
;var k=this.getTheme();if(k!==null&&k.fonts[i]){var m=this.__dB(k.fonts[i]);return l[i]=(new m).set(k.fonts[i]);}
;return i;}
,isDynamic:function(n){var q=this._dynamic;if(n&&(n instanceof qx.bom.Font||q[n]!==undefined)){return true;}
;var p=this.getTheme();if(p!==null&&n&&p.fonts[n]){var o=this.__dB(p.fonts[n]);q[n]=(new o).set(p.fonts[n]);return true;}
;return false;}
,__dA:function(r,s){if(r[s].include){var t=r[r[s].include];r[s].include=null;delete r[s].include;r[s]=qx.lang.Object.mergeWith(r[s],t,false);this.__dA(r,s);}
;}
,_applyTheme:function(u){var v=this._getDynamic();for(var y in v){if(v[y].themed){v[y].dispose();delete v[y];}
;}
;if(u){var w=u.fonts;for(var y in w){if(w[y].include&&w[w[y].include]){this.__dA(w,y);}
;var x=this.__dB(w[y]);v[y]=(new x).set(w[y]);v[y].themed=true;}
;}
;this._setDynamic(v);}
,__dB:function(z){if(z.sources){return qx.bom.webfonts.WebFont;}
;return qx.bom.Font;}
},destruct:function(){this._disposeMap(d);}
});}
)();
(function(){var e="changeStatus",d="qx.bom.webfonts.WebFont",c="_applySources",b="",a="qx.event.type.Data";qx.Class.define(d,{extend:qx.bom.Font,events:{"changeStatus":a},properties:{sources:{nullable:true,apply:c}},members:{__dE:null,_applySources:function(f,g){var k=[];for(var i=0,l=f.length;i<l;i++){var j=this._quoteFontFamily(f[i].family);k.push(j);var h=f[i].source;qx.bom.webfonts.Manager.getInstance().require(j,h,this._onWebFontChangeStatus,this);}
;this.setFamily(k.concat(this.getFamily()));}
,_onWebFontChangeStatus:function(m){var n=m.getData();this.fireDataEvent(e,n);{}
;}
,_quoteFontFamily:function(o){return o.replace(/["']/g,b);}
}});}
)();
(function(){var n="m",k="os.name",h=")",g="os.version",f="qx.bom.webfonts.Manager",e="singleton",d=",\n",c="src: ",b="mobileSafari",a="'eot)",bb="');",ba="@font-face {",Y="interval",X="!",W="'eot')",V="\.(",U="}\n",T="font-family: ",S="mobile safari",R="safari",u="@font-face.*?",v=";\n",s="') format('woff')",t="('embedded-opentype')",q="browser.version",r="opera",o="Couldn't create @font-face rule for WebFont ",p="') format('svg')",w="src: url('",y="('embedded-opentype)",F="\nfont-style: normal;\nfont-weight: normal;",D="?#iefix') format('embedded-opentype')",J=";",H="') format('truetype')",N="svg",L="#",A="chrome",Q="firefox",P="eot",O="ios",z="ttf",B="changeStatus",C="woff",E="browser.documentmode",G="browser.name",I="ie",K="url('",M="";qx.Class.define(f,{extend:qx.core.Object,type:e,construct:function(){qx.core.Object.call(this);this.__dF=[];this.__dG={};this.__dH=[];this.__dI=this.getPreferredFormats();}
,statics:{FONT_FORMATS:["eot","woff","ttf","svg"],VALIDATION_TIMEOUT:5000},members:{__dF:null,__dJ:null,__dG:null,__dI:null,__dH:null,__dK:null,require:function(bc,bd,be,bf){var bg=[];for(var i=0,l=bd.length;i<l;i++){var bi=bd[i].split(L);var bh=qx.util.ResourceManager.getInstance().toUri(bi[0]);if(bi.length>1){bh=bh+L+bi[1];}
;bg.push(bh);}
;if(!(qx.core.Environment.get(G)==I&&qx.bom.client.Browser.getVersion()<9)){this.__dL(bc,bg,be,bf);return;}
;if(!this.__dK){this.__dK=new qx.event.Timer(100);this.__dK.addListener(Y,this.__dM,this);}
;if(!this.__dK.isEnabled()){this.__dK.start();}
;this.__dH.push([bc,bg,be,bf]);}
,remove:function(bj){var bk=null;for(var i=0,l=this.__dF.length;i<l;i++){if(this.__dF[i]==bj){bk=i;this.__dS(bj);break;}
;}
;if(bk){qx.lang.Array.removeAt(this.__dF,bk);}
;if(bj in this.__dG){this.__dG[bj].dispose();delete this.__dG[bj];}
;}
,getPreferredFormats:function(){var bl=[];var bp=qx.core.Environment.get(G);var bm=qx.core.Environment.get(q);var bo=qx.core.Environment.get(k);var bn=qx.core.Environment.get(g);if((bp==I&&qx.core.Environment.get(E)>=9)||(bp==Q&&bm>=3.6)||(bp==A&&bm>=6)){bl.push(C);}
;if((bp==r&&bm>=10)||(bp==R&&bm>=3.1)||(bp==Q&&bm>=3.5)||(bp==A&&bm>=4)||(bp==S&&bo==O&&bn>=4.2)){bl.push(z);}
;if(bp==I&&bm>=4){bl.push(P);}
;if(bp==b&&bo==O&&bn>=4.1){bl.push(N);}
;return bl;}
,removeStyleSheet:function(){this.__dF=[];if(this.__dJ){var bq=this.__dJ.ownerNode?this.__dJ.ownerNode:this.__dJ.owningElement;qx.dom.Element.removeChild(bq,bq.parentNode);}
;this.__dJ=null;}
,__dL:function(br,bs,bt,bu){if(!qx.lang.Array.contains(this.__dF,br)){var bx=this.__dO(bs);var bw=this.__dP(br,bx);if(!bw){throw new Error(o+br+X);}
;if(!this.__dJ){this.__dJ=qx.bom.Stylesheet.createElement();}
;try{this.__dR(bw);}
catch(by){{}
;}
;this.__dF.push(br);}
;if(!this.__dG[br]){this.__dG[br]=new qx.bom.webfonts.Validator(br);this.__dG[br].setTimeout(qx.bom.webfonts.Manager.VALIDATION_TIMEOUT);this.__dG[br].addListenerOnce(B,this.__dN,this);}
;if(bt){var bv=bu||window;this.__dG[br].addListenerOnce(B,bt,bv);}
;this.__dG[br].validate();}
,__dM:function(){if(this.__dH.length==0){this.__dK.stop();return;}
;var bz=this.__dH.shift();this.__dL.apply(this,bz);}
,__dN:function(bA){var bB=bA.getData();if(bB.valid===false){qx.event.Timer.once(function(){this.remove(bB.family);}
,this,250);}
;}
,__dO:function(bC){var bE=qx.bom.webfonts.Manager.FONT_FORMATS;var bH={};for(var i=0,l=bC.length;i<l;i++){var bF=null;for(var x=0;x<bE.length;x++){var bG=new RegExp(V+bE[x]+h);var bD=bG.exec(bC[i]);if(bD){bF=bD[1];}
;}
;if(bF){bH[bF]=bC[i];}
;}
;return bH;}
,__dP:function(bI,bJ){var bM=[];var bK=this.__dI.length>0?this.__dI:qx.bom.webfonts.Manager.FONT_FORMATS;for(var i=0,l=bK.length;i<l;i++){var bL=bK[i];if(bJ[bL]){bM.push(this.__dQ(bL,bJ[bL]));}
;}
;var bN=c+bM.join(d)+J;bN=T+bI+v+bN;bN=bN+F;return bN;}
,__dQ:function(bO,bP){switch(bO){case P:return K+bP+bb+w+bP+D;case C:return K+bP+s;case z:return K+bP+H;case N:return K+bP+p;default:return null;};}
,__dR:function(bQ){var bS=ba+bQ+U;if(qx.core.Environment.get(G)==I&&qx.core.Environment.get(E)<9){var bR=this.__dT(this.__dJ.cssText);bR+=bS;this.__dJ.cssText=bR;}
else {this.__dJ.insertRule(bS,this.__dJ.cssRules.length);}
;}
,__dS:function(bT){var bW=new RegExp(u+bT,n);for(var i=0,l=document.styleSheets.length;i<l;i++){var bU=document.styleSheets[i];if(bU.cssText){var bV=bU.cssText.replace(/\n/g,M).replace(/\r/g,M);bV=this.__dT(bV);if(bW.exec(bV)){bV=bV.replace(bW,M);}
;bU.cssText=bV;}
else if(bU.cssRules){for(var j=0,m=bU.cssRules.length;j<m;j++){var bV=bU.cssRules[j].cssText.replace(/\n/g,M).replace(/\r/g,M);if(bW.exec(bV)){this.__dJ.deleteRule(j);return;}
;}
;}
;}
;}
,__dT:function(bX){return bX.replace(a,W).replace(y,t);}
},destruct:function(){delete this.__dF;this.removeStyleSheet();for(var bY in this.__dG){this.__dG[bY].dispose();}
;qx.bom.webfonts.Validator.removeDefaultHelperElements();}
});}
)();
(function(){var b="singleton",a="qx.util.LibraryManager";qx.Class.define(a,{extend:qx.core.Object,type:b,statics:{__dU:qx.$$libraries||{}},members:{has:function(c){return !!this.self(arguments).__dU[c];}
,get:function(d,e){return this.self(arguments).__dU[d][e]?this.self(arguments).__dU[d][e]:null;}
,set:function(f,g,h){this.self(arguments).__dU[f][g]=h;}
}});}
)();
(function(){var n="Microsoft.XMLHTTP",m="io.ssl",l="io.xhr",k="",j="file:",i="https:",h="webkit",g="gecko",f="activex",e="opera",b=".",d="io.maxrequests",c="qx.bom.client.Transport",a="xhr";qx.Bootstrap.define(c,{statics:{getMaxConcurrentRequestCount:function(){var o;var r=qx.bom.client.Engine.getVersion().split(b);var p=0;var s=0;var q=0;if(r[0]){p=r[0];}
;if(r[1]){s=r[1];}
;if(r[2]){q=r[2];}
;if(window.maxConnectionsPerServer){o=window.maxConnectionsPerServer;}
else if(qx.bom.client.Engine.getName()==e){o=8;}
else if(qx.bom.client.Engine.getName()==h){o=4;}
else if(qx.bom.client.Engine.getName()==g&&((p>1)||((p==1)&&(s>9))||((p==1)&&(s==9)&&(q>=1)))){o=6;}
else {o=2;}
;;;return o;}
,getSsl:function(){return window.location.protocol===i;}
,getXmlHttpRequest:function(){var t=window.ActiveXObject?(function(){if(window.location.protocol!==j){try{new window.XMLHttpRequest();return a;}
catch(u){}
;}
;try{new window.ActiveXObject(n);return f;}
catch(v){}
;}
)():(function(){try{new window.XMLHttpRequest();return a;}
catch(w){}
;}
)();return t||k;}
},defer:function(x){qx.core.Environment.add(d,x.getMaxConcurrentRequestCount);qx.core.Environment.add(m,x.getSsl);qx.core.Environment.add(l,x.getXmlHttpRequest);}
});}
)();
(function(){var q="//",p="encoding",o="?",n="data",m="type",l="data:image/",k=";",j="qx.util.ResourceManager",i="singleton",h=",",c="mshtml",g="engine.name",f="io.ssl",b="string",a="/",e="resourceUri",d="";qx.Class.define(j,{extend:qx.core.Object,type:i,construct:function(){qx.core.Object.call(this);}
,statics:{__j:qx.$$resources||{},__dV:{}},members:{has:function(r){return !!this.self(arguments).__j[r];}
,getData:function(s){return this.self(arguments).__j[s]||null;}
,getImageWidth:function(t){var u=this.self(arguments).__j[t];return u?u[0]:null;}
,getImageHeight:function(v){var w=this.self(arguments).__j[v];return w?w[1]:null;}
,getImageFormat:function(x){var y=this.self(arguments).__j[x];return y?y[2]:null;}
,getCombinedFormat:function(z){var C=d;var B=this.self(arguments).__j[z];var A=B&&B.length>4&&typeof (B[4])==b&&this.constructor.__j[B[4]];if(A){var E=B[4];var D=this.constructor.__j[E];C=D[2];}
;return C;}
,toUri:function(F){if(F==null){return F;}
;var G=this.self(arguments).__j[F];if(!G){return F;}
;if(typeof G===b){var I=G;}
else {var I=G[3];if(!I){return F;}
;}
;var H=d;if((qx.core.Environment.get(g)==c)&&qx.core.Environment.get(f)){H=this.self(arguments).__dV[I];}
;return H+qx.util.LibraryManager.getInstance().get(I,e)+a+F;}
,toDataUri:function(J){var L=this.constructor.__j[J];var M=this.constructor.__j[L[4]];var N;if(M){var K=M[4][J];N=l+K[m]+k+K[p]+h+K[n];}
else {N=this.toUri(J);}
;return N;}
},defer:function(O){if((qx.core.Environment.get(g)==c)){if(qx.core.Environment.get(f)){for(var S in qx.$$libraries){var Q;if(qx.util.LibraryManager.getInstance().get(S,e)){Q=qx.util.LibraryManager.getInstance().get(S,e);}
else {O.__dV[S]=d;continue;}
;if(Q.match(/^\/\//)!=null){O.__dV[S]=window.location.protocol;}
else if(Q.match(/^\//)!=null){O.__dV[S]=window.location.protocol+q+window.location.host;}
else if(Q.match(/^\.\//)!=null){var P=document.URL;O.__dV[S]=P.substring(0,P.lastIndexOf(a)+1);}
else if(Q.match(/^http/)!=null){O.__dV[S]=d;}
else {var T=window.location.href.indexOf(o);var R;if(T==-1){R=window.location.href;}
else {R=window.location.href.substring(0,T);}
;O.__dV[S]=R.substring(0,R.lastIndexOf(a)+1);}
;;;}
;}
;}
;}
});}
)();
(function(){var p="stylesheet",o="html.stylesheet.addimport",n="html.stylesheet.insertrule",m="}",l="html.stylesheet.createstylesheet",k='@import "',j="{",h='";',g="qx.bom.Stylesheet",f="link",c="style",e="head",d="text/css",b="html.stylesheet.removeimport",a="html.stylesheet.deleterule";qx.Bootstrap.define(g,{statics:{includeFile:function(q,r){if(!r){r=document;}
;var s=r.createElement(f);s.type=d;s.rel=p;s.href=q;var t=r.getElementsByTagName(e)[0];t.appendChild(s);}
,createElement:function(u){if(qx.core.Environment.get(l)){var v=document.createStyleSheet();if(u){v.cssText=u;}
;return v;}
else {var w=document.createElement(c);w.type=d;if(u){w.appendChild(document.createTextNode(u));}
;document.getElementsByTagName(e)[0].appendChild(w);return w.sheet;}
;}
,addRule:function(x,y,z){if(qx.core.Environment.get(n)){x.insertRule(y+j+z+m,x.cssRules.length);}
else {x.addRule(y,z);}
;}
,removeRule:function(A,B){if(qx.core.Environment.get(a)){var C=A.cssRules;var D=C.length;for(var i=D-1;i>=0;--i){if(C[i].selectorText==B){A.deleteRule(i);}
;}
;}
else {var C=A.rules;var D=C.length;for(var i=D-1;i>=0;--i){if(C[i].selectorText==B){A.removeRule(i);}
;}
;}
;}
,removeAllRules:function(E){if(qx.core.Environment.get(a)){var F=E.cssRules;var G=F.length;for(var i=G-1;i>=0;i--){E.deleteRule(i);}
;}
else {var F=E.rules;var G=F.length;for(var i=G-1;i>=0;i--){E.removeRule(i);}
;}
;}
,addImport:function(H,I){if(qx.core.Environment.get(o)){H.addImport(I);}
else {H.insertRule(k+I+h,H.cssRules.length);}
;}
,removeImport:function(J,K){if(qx.core.Environment.get(b)){var L=J.imports;var N=L.length;for(var i=N-1;i>=0;i--){if(L[i].href==K||L[i].href==qx.util.Uri.getAbsolute(K)){J.removeImport(i);}
;}
;}
else {var M=J.cssRules;var N=M.length;for(var i=N-1;i>=0;i--){if(M[i].href==K){J.deleteRule(i);}
;}
;}
;}
,removeAllImports:function(O){if(qx.core.Environment.get(b)){var P=O.imports;var R=P.length;for(var i=R-1;i>=0;i--){O.removeImport(i);}
;}
else {var Q=O.cssRules;var R=Q.length;for(var i=R-1;i>=0;i--){if(Q[i].type==Q[i].IMPORT_RULE){O.deleteRule(i);}
;}
;}
;}
}});}
)();
(function(){var h="qx.bom.client.Stylesheet",g="html.stylesheet.deleterule",f="html.stylesheet.insertrule",e="html.stylesheet.createstylesheet",d="html.stylesheet.addimport",c="html.stylesheet.removeimport",b="function",a="object";qx.Bootstrap.define(h,{statics:{__ee:function(){if(!qx.bom.client.Stylesheet.__ef){qx.bom.client.Stylesheet.__ef=qx.bom.Stylesheet.createElement();}
;return qx.bom.client.Stylesheet.__ef;}
,getCreateStyleSheet:function(){return typeof document.createStyleSheet===a;}
,getInsertRule:function(){return typeof qx.bom.client.Stylesheet.__ee().insertRule===b;}
,getDeleteRule:function(){return typeof qx.bom.client.Stylesheet.__ee().deleteRule===b;}
,getAddImport:function(){return (typeof qx.bom.client.Stylesheet.__ee().addImport===a);}
,getRemoveImport:function(){return (typeof qx.bom.client.Stylesheet.__ee().removeImport===a);}
},defer:function(i){qx.core.Environment.add(e,i.getCreateStyleSheet);qx.core.Environment.add(f,i.getInsertRule);qx.core.Environment.add(g,i.getDeleteRule);qx.core.Environment.add(d,i.getAddImport);qx.core.Environment.add(c,i.getRemoveImport);}
});}
)();
(function(){var k="file",j="strict",h="anchor",g="div",f="query",e="source",d="password",c="host",b="protocol",a="user",A="directory",z="loose",y="relative",x="queryKey",w="qx.util.Uri",v="",u="path",t="authority",s='">0</a>',r="&",p="port",q='<a href="',l="userInfo",n="?";qx.Bootstrap.define(w,{statics:{parseUri:function(B,C){var D={key:[e,b,t,l,a,d,c,p,y,u,A,k,f,h],q:{name:x,parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var o=D,m=D.parser[C?j:z].exec(B),E={},i=14;while(i--){E[o.key[i]]=m[i]||v;}
;E[o.q.name]={};E[o.key[12]].replace(o.q.parser,function(F,G,H){if(G){E[o.q.name][G]=H;}
;}
);return E;}
,appendParamsToUrl:function(I,J){if(J===undefined){return I;}
;{}
;if(qx.lang.Type.isObject(J)){J=qx.lang.Object.toUriParameter(J);}
;if(!J){return I;}
;return I+=(/\?/).test(I)?r+J:n+J;}
,getAbsolute:function(K){var L=document.createElement(g);L.innerHTML=q+K+s;return L.firstChild.href;}
}});}
)();
(function(){var i="qx.event.type.Data",h="qx.bom.webfonts.Validator",g="__ej",f="_applyFontFamily",e="span",d="Integer",c="interval",b="changeStatus",a=",";qx.Class.define(h,{extend:qx.core.Object,construct:function(j){qx.core.Object.call(this);if(j){this.setFontFamily(j);}
;this.__eg=this._getRequestedHelpers();}
,statics:{COMPARISON_FONTS:{sans:["Arial","Helvetica","sans-serif"],serif:["Times New Roman","Georgia","serif"]},HELPER_CSS:{position:"absolute",margin:"0",padding:"0",top:"-1000px",left:"-1000px",fontSize:"350px",width:"auto",height:"auto",lineHeight:"normal",fontVariant:"normal"},COMPARISON_STRING:"WEei",__eh:null,__ei:null,removeDefaultHelperElements:function(){var k=qx.bom.webfonts.Validator.__ei;if(k){for(var l in k){document.body.removeChild(k[l]);}
;}
;delete qx.bom.webfonts.Validator.__ei;}
},properties:{fontFamily:{nullable:true,init:null,apply:f},timeout:{check:d,init:5000}},events:{"changeStatus":i},members:{__eg:null,__ej:null,__ek:null,validate:function(){this.__ek=new Date().getTime();if(this.__ej){this.__ej.restart();}
else {this.__ej=new qx.event.Timer(100);this.__ej.addListener(c,this.__el,this);qx.event.Timer.once(function(){this.__ej.start();}
,this,0);}
;}
,_reset:function(){if(this.__eg){for(var n in this.__eg){var m=this.__eg[n];document.body.removeChild(m);}
;this.__eg=null;}
;}
,_isFontValid:function(){if(!qx.bom.webfonts.Validator.__eh){this.__bf();}
;if(!this.__eg){this.__eg=this._getRequestedHelpers();}
;var p=qx.bom.element.Dimension.getWidth(this.__eg.sans);var o=qx.bom.element.Dimension.getWidth(this.__eg.serif);var q=qx.bom.webfonts.Validator;if(p!==q.__eh.sans&&o!==q.__eh.serif){return true;}
;return false;}
,_getRequestedHelpers:function(){var r=[this.getFontFamily()].concat(qx.bom.webfonts.Validator.COMPARISON_FONTS.sans);var s=[this.getFontFamily()].concat(qx.bom.webfonts.Validator.COMPARISON_FONTS.serif);return {sans:this._getHelperElement(r),serif:this._getHelperElement(s)};}
,_getHelperElement:function(t){var u=qx.lang.Object.clone(qx.bom.webfonts.Validator.HELPER_CSS);if(t){if(u.fontFamily){u.fontFamily+=a+t.join(a);}
else {u.fontFamily=t.join(a);}
;}
;var v=document.createElement(e);v.innerHTML=qx.bom.webfonts.Validator.COMPARISON_STRING;qx.bom.element.Style.setStyles(v,u);document.body.appendChild(v);return v;}
,_applyFontFamily:function(w,x){if(w!==x){this._reset();}
;}
,__bf:function(){var y=qx.bom.webfonts.Validator;if(!y.__ei){y.__ei={sans:this._getHelperElement(y.COMPARISON_FONTS.sans),serif:this._getHelperElement(y.COMPARISON_FONTS.serif)};}
;y.__eh={sans:qx.bom.element.Dimension.getWidth(y.__ei.sans),serif:qx.bom.element.Dimension.getWidth(y.__ei.serif)};}
,__el:function(){if(this._isFontValid()){this.__ej.stop();this._reset();this.fireDataEvent(b,{family:this.getFontFamily(),valid:true});}
else {var z=new Date().getTime();if(z-this.__ek>=this.getTimeout()){this.__ej.stop();this._reset();this.fireDataEvent(b,{family:this.getFontFamily(),valid:false});}
;}
;}
},destruct:function(){this._reset();this.__ej.stop();this.__ej.removeListener(c,this.__el,this);this._disposeObjects(g);}
});}
)();
(function(){var j="qx.bom.element.Dimension",i="paddingRight",h="paddingLeft",g="opera",f="paddingBottom",e="paddingTop",d="mshtml",c="engine.version",b="0px",a="engine.name";qx.Bootstrap.define(j,{statics:{getWidth:qx.core.Environment.select(a,{"gecko":function(k){if(k.getBoundingClientRect){var l=k.getBoundingClientRect();return Math.round(l.right)-Math.round(l.left);}
else {return k.offsetWidth;}
;}
,"default":function(m){return m.offsetWidth;}
}),getHeight:qx.core.Environment.select(a,{"gecko":function(n){if(n.getBoundingClientRect){var o=n.getBoundingClientRect();return Math.round(o.bottom)-Math.round(o.top);}
else {return n.offsetHeight;}
;}
,"default":function(p){return p.offsetHeight;}
}),getSize:function(q){return {width:this.getWidth(q),height:this.getHeight(q)};}
,__em:{visible:true,hidden:true},getContentWidth:function(r){var s=qx.bom.element.Style;var t=qx.bom.element.Overflow.getX(r);var u=parseInt(s.get(r,h)||b,10);var x=parseInt(s.get(r,i)||b,10);if(this.__em[t]){var w=r.clientWidth;if((qx.core.Environment.get(a)==g)||qx.dom.Node.isBlockNode(r)){w=w-u-x;}
;return w;}
else {if(r.clientWidth>=r.scrollWidth){return Math.max(r.clientWidth,r.scrollWidth)-u-x;}
else {var v=r.scrollWidth-u;if(qx.core.Environment.get(a)==d&&qx.core.Environment.get(c)>=6){v-=x;}
;return v;}
;}
;}
,getContentHeight:function(y){var z=qx.bom.element.Style;var C=qx.bom.element.Overflow.getY(y);var B=parseInt(z.get(y,e)||b,10);var A=parseInt(z.get(y,f)||b,10);if(this.__em[C]){return y.clientHeight-B-A;}
else {if(y.clientHeight>=y.scrollHeight){return Math.max(y.clientHeight,y.scrollHeight)-B-A;}
else {var D=y.scrollHeight-B;if(qx.core.Environment.get(a)==d&&qx.core.Environment.get(c)==6){D-=A;}
;return D;}
;}
;}
,getContentSize:function(E){return {width:this.getContentWidth(E),height:this.getContentHeight(E)};}
}});}
)();
(function(){var g="Iterations: ",f="\n",e="Time: ",d="Render time: ",c="Measured: ",b="qx.dev.unit.MeasurementResult",a="ms";qx.Class.define(b,{extend:Object,construct:function(h,i,j,k){this.__lv=h;this.__lA=i;this.__lB=j;this.__lC=k;}
,members:{__lv:null,__lA:null,__lB:null,__lC:null,toString:function(){return [c+this.__lv,g+this.__lA,e+this.__lB+a,d+this.__lC+a].join(f);}
}});}
)();
(function(){var c="$test_",b="_",a="qx.dev.unit.JsUnitTestResult";qx.Class.define(a,{extend:qx.dev.unit.TestResult,construct:function(){qx.dev.unit.TestResult.call(this);this.__lD=[];}
,members:{__lD:null,run:function(d,e){var f=c+d.getFullName().replace(/\W/g,b);this.__lD.push(f);window[f]=e;}
,exportToJsUnit:function(){var self=this;window.exposeTestFunctionNames=function(){return self.__lD;}
;window.isTestPageLoaded=true;}
}});}
)();
(function(){var b="qx.locale.MTranslation",a="To enable localization please include qx.locale.Manager into your build!";qx.Mixin.define(b,{members:{tr:function(c,d){var e=qx.locale.Manager;if(e){return e.tr.apply(e,arguments);}
;throw new Error(a);}
,trn:function(f,g,h,i){var j=qx.locale.Manager;if(j){return j.trn.apply(j,arguments);}
;throw new Error(a);}
,trc:function(k,l,m){var n=qx.locale.Manager;if(n){return n.trc.apply(n,arguments);}
;throw new Error(a);}
,marktr:function(o){var p=qx.locale.Manager;if(p){return p.marktr.apply(p,arguments);}
;throw new Error(a);}
}});}
)();
(function(){var a="qx.application.IApplication";qx.Interface.define(a,{members:{main:function(){}
,finalize:function(){}
,close:function(){}
,terminate:function(){}
}});}
)();
(function(){var o="qx.core.BaseInit",n="engine.name",m="Main runtime: ",l="testrunner.TestLoader",k="os.name",j="engine.version",i="Missing application class: ",h="Load runtime: ",g="Could not detect engine!",f="Finalize runtime: ",b="Could not detect operating system!",d="Could not detect the version of the engine!",c="",a="ms";qx.Class.define(o,{statics:{getApplication:function(){return this.__cT||null;}
,ready:function(){if(this.__cT){return;}
;if(qx.core.Environment.get(n)==c){qx.log.Logger.warn(g);}
;if(qx.core.Environment.get(j)==c){qx.log.Logger.warn(d);}
;if(qx.core.Environment.get(k)==c){qx.log.Logger.warn(b);}
;qx.log.Logger.debug(this,h+(new Date-qx.Bootstrap.LOADSTART)+a);var q=l;var r=qx.Class.getByName(q);if(r){this.__cT=new r;var p=new Date;this.__cT.main();qx.log.Logger.debug(this,m+(new Date-p)+a);var p=new Date;this.__cT.finalize();qx.log.Logger.debug(this,f+(new Date-p)+a);}
else {qx.log.Logger.warn(i+q);}
;}
,__cU:function(e){var s=this.__cT;if(s){s.close();}
;}
,__cV:function(){var t=this.__cT;if(t){t.terminate();}
;qx.core.ObjectRegistry.shutdown();}
}});}
)();
(function(){var n="qx.event.handler.Application",m="complete",l="webkit",k="gecko",j="opera",i="left",h="DOMContentLoaded",g="shutdown",f="mshtml",d="load",a="unload",c="ready",b="engine.name";qx.Class.define(n,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(o){qx.core.Object.call(this);this._window=o.getWindow();this.__cX=false;this.__cY=false;this.__da=false;this.__db=false;this._initObserver();qx.event.handler.Application.$$instance=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var p=qx.event.handler.Application.$$instance;if(p){p.__dc();}
;}
},members:{canHandleEvent:function(q,r){}
,registerEvent:function(s,t,u){}
,unregisterEvent:function(v,w,x){}
,__da:null,__cX:null,__cY:null,__db:null,__dc:function(){if(!this.__da&&this.__cX&&qx.$$loader.scriptLoaded){if((qx.core.Environment.get(b)==f)){if(qx.event.Registration.hasListener(this._window,c)){this.__da=true;qx.event.Registration.fireEvent(this._window,c);}
;}
else {this.__da=true;qx.event.Registration.fireEvent(this._window,c);}
;}
;}
,isApplicationReady:function(){return this.__da;}
,_initObserver:function(){if(qx.$$domReady||document.readyState==m||document.readyState==c){this.__cX=true;this.__dc();}
else {this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);if(qx.core.Environment.get(b)==k||qx.core.Environment.get(b)==j||qx.core.Environment.get(b)==l){qx.bom.Event.addNativeListener(this._window,h,this._onNativeLoadWrapped);}
else if((qx.core.Environment.get(b)==f)){var self=this;var y=function(){try{document.documentElement.doScroll(i);if(document.body){self._onNativeLoadWrapped();}
;}
catch(z){window.setTimeout(y,100);}
;}
;y();}
;qx.bom.Event.addNativeListener(this._window,d,this._onNativeLoadWrapped);}
;this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);qx.bom.Event.addNativeListener(this._window,a,this._onNativeUnloadWrapped);}
,_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,d,this._onNativeLoadWrapped);}
;qx.bom.Event.removeNativeListener(this._window,a,this._onNativeUnloadWrapped);this._onNativeLoadWrapped=null;this._onNativeUnloadWrapped=null;}
,_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__cX=true;this.__dc();}
),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__db){this.__db=true;try{qx.event.Registration.fireEvent(this._window,g);}
catch(e){throw e;}
finally{qx.core.ObjectRegistry.shutdown();}
;}
;}
)},destruct:function(){this._stopObserver();this._window=null;}
,defer:function(A){qx.event.Registration.addHandler(A);}
});}
)();
(function(){var d="ready",c="shutdown",b="beforeunload",a="qx.core.Init";qx.Class.define(a,{statics:{getApplication:qx.core.BaseInit.getApplication,ready:qx.core.BaseInit.ready,__cU:function(e){var f=this.getApplication();if(f){e.setReturnValue(f.close());}
;}
,__cV:function(){var g=this.getApplication();if(g){g.terminate();}
;}
},defer:function(h){qx.event.Registration.addListener(window,d,h.ready,h);qx.event.Registration.addListener(window,c,h.__cV,h);qx.event.Registration.addListener(window,b,h.__cU,h);}
});}
)();
(function(){var c="Abstract method call",b="abstract",a="qx.application.AbstractGui";qx.Class.define(a,{type:b,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__dd:null,_createRootWidget:function(){throw new Error(c);}
,getRoot:function(){return this.__dd;}
,main:function(){qx.theme.manager.Meta.getInstance().initialize();qx.ui.tooltip.Manager.getInstance();this.__dd=this._createRootWidget();}
,finalize:function(){this.render();}
,render:function(){qx.ui.core.queue.Manager.flush();}
,close:function(d){}
,terminate:function(){}
},destruct:function(){this.__dd=null;}
});}
)();
(function(){var g="The theme to use is not available: ",f="_applyTheme",e="qx.theme",d="qx.theme.manager.Meta",c="qx.theme.Modern",b="Theme",a="singleton";qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:b,nullable:true,apply:f}},members:{_applyTheme:function(h,i){var l=null;var o=null;var r=null;var s=null;var n=null;if(h){l=h.meta.color||null;o=h.meta.decoration||null;r=h.meta.font||null;s=h.meta.icon||null;n=h.meta.appearance||null;}
;var p=qx.theme.manager.Color.getInstance();var q=qx.theme.manager.Decoration.getInstance();var j=qx.theme.manager.Font.getInstance();var m=qx.theme.manager.Icon.getInstance();var k=qx.theme.manager.Appearance.getInstance();p.setTheme(l);q.setTheme(o);j.setTheme(r);m.setTheme(s);k.setTheme(n);}
,initialize:function(){var v=qx.core.Environment;var t,u;t=v.get(e);if(t){u=qx.Theme.getByName(t);if(!u){throw new Error(g+t);}
;this.setTheme(u);}
;}
},environment:{"qx.theme":c}});}
)();
(function(){var e="qx.theme.manager.Icon",d="Theme",c="changeTheme",b="_applyTheme",a="singleton";qx.Class.define(e,{type:a,extend:qx.core.Object,properties:{theme:{check:d,nullable:true,apply:b,event:c}},members:{_applyTheme:function(f,g){var i=qx.util.AliasManager.getInstance();if(g){for(var h in g.aliases){i.remove(h);}
;}
;if(f){for(var h in f.aliases){i.add(h,f.aliases[h]);}
;}
;}
}});}
)();
(function(){var j="Missing appearance: ",h="_applyTheme",g="qx.theme.manager.Appearance",f=":",e="Theme",d="changeTheme",c="/",b="singleton",a="string";qx.Class.define(g,{type:b,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__en={};this.__eo={};}
,properties:{theme:{check:e,nullable:true,event:d,apply:h}},members:{__ep:{},__en:null,__eo:null,_applyTheme:function(k,l){this.__eo={};this.__en={};}
,__eq:function(m,n,o){var t=n.appearances;var w=t[m];if(!w){var x=c;var q=[];var v=m.split(x);var u;while(!w&&v.length>0){q.unshift(v.pop());var r=v.join(x);w=t[r];if(w){u=w.alias||w;if(typeof u===a){var s=u+x+q.join(x);return this.__eq(s,n,o);}
;}
;}
;for(var i=0;i<q.length-1;i++){q.shift();var r=q.join(x);var p=this.__eq(r,n);if(p){return p;}
;}
;if(o!=null){return this.__eq(o,n);}
;return null;}
else if(typeof w===a){return this.__eq(w,n,o);}
else if(w.include&&!w.style){return this.__eq(w.include,n,o);}
;;return m;}
,styleFrom:function(y,z,A,B){if(!A){A=this.getTheme();}
;var G=this.__eo;var C=G[y];if(!C){C=G[y]=this.__eq(y,A,B);}
;var M=A.appearances[C];if(!M){this.warn(j+y);return null;}
;if(!M.style){return null;}
;var N=C;if(z){var O=M.$$bits;if(!O){O=M.$$bits={};M.$$length=0;}
;var E=0;for(var I in z){if(!z[I]){continue;}
;if(O[I]==null){O[I]=1<<M.$$length++;}
;E+=O[I];}
;if(E>0){N+=f+E;}
;}
;var F=this.__en;if(F[N]!==undefined){return F[N];}
;if(!z){z=this.__ep;}
;var K;if(M.include||M.base){var D;if(M.include){D=this.styleFrom(M.include,z,A,B);}
;var H=M.style(z,D);K={};if(M.base){var J=this.styleFrom(C,z,M.base,B);if(M.include){for(var L in J){if(!D.hasOwnProperty(L)&&!H.hasOwnProperty(L)){K[L]=J[L];}
;}
;}
else {for(var L in J){if(!H.hasOwnProperty(L)){K[L]=J[L];}
;}
;}
;}
;if(M.include){for(var L in D){if(!H.hasOwnProperty(L)){K[L]=D[L];}
;}
;}
;for(var L in H){K[L]=H[L];}
;}
else {K=M.style(z);}
;return F[N]=K||null;}
},destruct:function(){this.__en=this.__eo=null;}
});}
)();
(function(){var u="other",t="widgets",s="undefined",r="fonts",q="appearances",p="qx.Theme",o="]",n="Mixin theme is not a valid theme!",m="[Theme ",k="colors",d="decorations",j="Theme",g="meta",c="borders",b="icons",f="'!",e="' are not compatible '",h="The mixins '";qx.Bootstrap.define(p,{statics:{define:function(name,v){if(!v){var v={};}
;v.include=this.__er(v.include);v.patch=this.__er(v.patch);{}
;var w={$$type:j,name:name,title:v.title,toString:this.genericToString};if(v.extend){w.supertheme=v.extend;}
;w.basename=qx.Bootstrap.createNamespace(name,w);this.__eu(w,v);this.__es(w,v);this.$$registry[name]=w;for(var i=0,a=v.include,l=a.length;i<l;i++){this.include(w,a[i]);}
;for(var i=0,a=v.patch,l=a.length;i<l;i++){this.patch(w,a[i]);}
;}
,__er:function(x){if(!x){return [];}
;if(qx.Bootstrap.isArray(x)){return x;}
else {return [x];}
;}
,__es:function(y,z){var A=z.aliases||{};if(z.extend&&z.extend.aliases){qx.Bootstrap.objectMergeWith(A,z.extend.aliases,false);}
;y.aliases=A;}
,getAll:function(){return this.$$registry;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,genericToString:function(){return m+this.name+o;}
,__et:function(B){for(var i=0,C=this.__ev,l=C.length;i<l;i++){if(B[C[i]]){return C[i];}
;}
;}
,__eu:function(D,E){var H=this.__et(E);if(E.extend&&!H){H=E.extend.type;}
;D.type=H||u;var J=function(){}
;if(E.extend){J.prototype=new E.extend.$$clazz;}
;var I=J.prototype;var G=E[H];for(var F in G){I[F]=G[F];if(I[F].base){{}
;I[F].base=E.extend;}
;}
;D.$$clazz=J;D[H]=new J;}
,$$registry:{},__ev:[k,c,d,r,b,t,q,g],__c:null,__ew:null,__d:function(){}
,patch:function(K,L){this.__ex(L);var N=this.__et(L);if(N!==this.__et(K)){throw new Error(h+K.name+e+L.name+f);}
;var M=L[N];var O=K.$$clazz.prototype;for(var P in M){O[P]=M[P];}
;}
,include:function(Q,R){this.__ex(R);var T=R.type;if(T!==Q.type){throw new Error(h+Q.name+e+R.name+f);}
;var S=R[T];var U=Q.$$clazz.prototype;for(var V in S){if(U[V]!==undefined){continue;}
;U[V]=S[V];}
;}
,__ex:function(W){if(typeof W===s||W==null){var X;var Y=new Error(n);{}
;throw Y;}
;}
}});}
)();
(function(){var q="widget",p="qx.ui.tooltip.ToolTip",o="",n="_applyCurrent",m="__ey",l="qx.ui.tooltip.Manager",k="__ez",j="tooltip-error",i="singleton",h="__eB",c="Boolean",g="interval",f="mouseover",b="mouseout",a="mousemove",d="focusout";qx.Class.define(l,{type:i,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);qx.event.Registration.addListener(document.body,f,this.__eG,this,true);this.__ey=new qx.event.Timer();this.__ey.addListener(g,this.__eD,this);this.__ez=new qx.event.Timer();this.__ez.addListener(g,this.__eE,this);this.__eA={left:0,top:0};}
,properties:{current:{check:p,nullable:true,apply:n},showInvalidToolTips:{check:c,init:true},showToolTips:{check:c,init:true}},members:{__eA:null,__ez:null,__ey:null,__eB:null,__eC:null,getSharedTooltip:function(){if(!this.__eB){this.__eB=new qx.ui.tooltip.ToolTip().set({rich:true});}
;return this.__eB;}
,getSharedErrorTooltip:function(){if(!this.__eC){this.__eC=new qx.ui.tooltip.ToolTip().set({appearance:j,rich:true});this.__eC.setLabel(o);this.__eC.syncAppearance();}
;return this.__eC;}
,_applyCurrent:function(r,s){if(s&&qx.ui.core.Widget.contains(s,r)){return;}
;if(s){if(!s.isDisposed()){s.exclude();}
;this.__ey.stop();this.__ez.stop();}
;var u=qx.event.Registration;var t=document.body;if(r){this.__ey.startWith(r.getShowTimeout());u.addListener(t,b,this.__eH,this,true);u.addListener(t,d,this.__eI,this,true);u.addListener(t,a,this.__eF,this,true);}
else {u.removeListener(t,b,this.__eH,this,true);u.removeListener(t,d,this.__eI,this,true);u.removeListener(t,a,this.__eF,this,true);}
;}
,__eD:function(e){var v=this.getCurrent();if(v&&!v.isDisposed()){this.__ez.startWith(v.getHideTimeout());if(v.getPlaceMethod()==q){v.placeToWidget(v.getOpener());}
else {v.placeToPoint(this.__eA);}
;v.show();}
;this.__ey.stop();}
,__eE:function(e){var w=this.getCurrent();if(w&&!w.isDisposed()){w.exclude();}
;this.__ez.stop();this.resetCurrent();}
,__eF:function(e){var x=this.__eA;x.left=e.getDocumentLeft();x.top=e.getDocumentTop();}
,__eG:function(e){var y=qx.ui.core.Widget.getWidgetByElement(e.getTarget());this.showToolTip(y);}
,showToolTip:function(z){if(!z){return;}
;var C,D,B,A;while(z!=null){C=z.getToolTip();D=z.getToolTipText()||null;B=z.getToolTipIcon()||null;if(qx.Class.hasInterface(z.constructor,qx.ui.form.IForm)&&!z.isValid()){A=z.getInvalidMessage();}
;if(C||D||B||A){break;}
;z=z.getLayoutParent();}
;if(!z||!z.getEnabled()||z.isBlockToolTip()||(!A&&!this.getShowToolTips())||(A&&!this.getShowInvalidToolTips())){return;}
;if(A){C=this.getSharedErrorTooltip().set({label:A});}
;if(!C){C=this.getSharedTooltip().set({label:D,icon:B});}
;this.setCurrent(C);C.setOpener(z);}
,__eH:function(e){var E=qx.ui.core.Widget.getWidgetByElement(e.getTarget());if(!E){return;}
;var F=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());if(!F){return;}
;var G=this.getCurrent();if(G&&(F==G||qx.ui.core.Widget.contains(G,F))){return;}
;if(F&&E&&qx.ui.core.Widget.contains(E,F)){return;}
;if(G&&!F){this.setCurrent(null);}
else {this.resetCurrent();}
;}
,__eI:function(e){var H=qx.ui.core.Widget.getWidgetByElement(e.getTarget());if(!H){return;}
;var I=this.getCurrent();if(I&&I==H.getToolTip()){this.setCurrent(null);}
;}
},destruct:function(){qx.event.Registration.removeListener(document.body,f,this.__eG,this,true);this._disposeObjects(m,k,h);this.__eA=null;}
});}
)();
(function(){var a="qx.ui.core.MLayoutHandling";qx.Mixin.define(a,{members:{setLayout:function(b){return this._setLayout(b);}
,getLayout:function(){return this._getLayout();}
},statics:{remap:function(c){c.getLayout=c._getLayout;c.setLayout=c._setLayout;}
}});}
)();
(function(){var b="qx.ui.core.DecoratorFactory",a="$$nopool$$";qx.Class.define(b,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__cQ={};}
,statics:{MAX_SIZE:15,__eJ:a},members:{__cQ:null,getDecoratorElement:function(c){var h=qx.ui.core.DecoratorFactory;if(qx.lang.Type.isString(c)){var f=c;var e=qx.theme.manager.Decoration.getInstance().resolve(c);}
else {var f=h.__eJ;e=c;}
;var g=this.__cQ;if(g[f]&&g[f].length>0){var d=g[f].pop();}
else {var d=this._createDecoratorElement(e,f);}
;d.$$pooled=false;return d;}
,poolDecorator:function(i){if(!i||i.$$pooled||i.isDisposed()){return;}
;var l=qx.ui.core.DecoratorFactory;var j=i.getId();if(j==l.__eJ){i.dispose();return;}
;var k=this.__cQ;if(!k[j]){k[j]=[];}
;if(k[j].length>l.MAX_SIZE){i.dispose();}
else {i.$$pooled=true;k[j].push(i);}
;}
,_createDecoratorElement:function(m,n){var o=new qx.html.Decorator(m,n);{}
;return o;}
,toString:function(){return qx.core.Object.prototype.toString.call(this);}
},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){var q=this.__cQ;for(var p in q){qx.util.DisposeUtil.disposeArray(q,p);}
;}
;this.__cQ=null;}
});}
)();
(function(){var d="event.pointer",c="none",b="qx.html.Decorator",a="absolute";qx.Class.define(b,{extend:qx.html.Element,construct:function(e,f){var g={position:a,top:0,left:0};if(qx.core.Environment.get(d)){g.pointerEvents=c;}
;qx.html.Element.call(this,null,g);this.__hM=e;this.__bV=f||e.toHashCode();this.useMarkup(e.getMarkup());}
,members:{__bV:null,__hM:null,getId:function(){return this.__bV;}
,getDecorator:function(){return this.__hM;}
,resize:function(h,i){this.__hM.resize(this.getDomElement(),h,i);}
,tint:function(j){this.__hM.tint(this.getDomElement(),j);}
,getInsets:function(){return this.__hM.getInsets();}
},destruct:function(){this.__hM=null;}
});}
)();
(function(){var j="changeWidth",i="allowShrinkY",h="bottom",g="baseline",f="marginBottom",e="qx.ui.core.LayoutItem",d="center",c="marginTop",b="allowGrowX",a="middle",z="marginLeft",y="allowShrinkX",x="top",w="right",v="marginRight",u="abstract",t="allowGrowY",s="left",r="changeHeight",q="_applyAlign",o="shorthand",p="Boolean",m="_applyStretching",n="_applyMargin",k="_applyDimension",l="Integer";qx.Class.define(e,{type:u,extend:qx.core.Object,properties:{minWidth:{check:l,nullable:true,apply:k,init:null,themeable:true},width:{check:l,event:j,nullable:true,apply:k,init:null,themeable:true},maxWidth:{check:l,nullable:true,apply:k,init:null,themeable:true},minHeight:{check:l,nullable:true,apply:k,init:null,themeable:true},height:{check:l,event:r,nullable:true,apply:k,init:null,themeable:true},maxHeight:{check:l,nullable:true,apply:k,init:null,themeable:true},allowGrowX:{check:p,apply:m,init:true,themeable:true},allowShrinkX:{check:p,apply:m,init:true,themeable:true},allowGrowY:{check:p,apply:m,init:true,themeable:true},allowShrinkY:{check:p,apply:m,init:true,themeable:true},allowStretchX:{group:[b,y],mode:o,themeable:true},allowStretchY:{group:[t,i],mode:o,themeable:true},marginTop:{check:l,init:0,apply:n,themeable:true},marginRight:{check:l,init:0,apply:n,themeable:true},marginBottom:{check:l,init:0,apply:n,themeable:true},marginLeft:{check:l,init:0,apply:n,themeable:true},margin:{group:[c,v,f,z],mode:o,themeable:true},alignX:{check:[s,d,w],nullable:true,apply:q,themeable:true},alignY:{check:[x,a,h,g],nullable:true,apply:q,themeable:true}},members:{__hN:null,__hO:null,__hP:null,__hQ:null,__hR:null,__hS:null,__hT:null,getBounds:function(){return this.__hS||this.__hO||null;}
,clearSeparators:function(){}
,renderSeparator:function(A,B){}
,renderLayout:function(C,top,D,E){var F;{}
;var G=null;if(this.getHeight()==null&&this._hasHeightForWidth()){var G=this._getHeightForWidth(D);}
;if(G!=null&&G!==this.__hN){this.__hN=G;qx.ui.core.queue.Layout.add(this);return null;}
;var I=this.__hO;if(!I){I=this.__hO={};}
;var H={};if(C!==I.left||top!==I.top){H.position=true;I.left=C;I.top=top;}
;if(D!==I.width||E!==I.height){H.size=true;I.width=D;I.height=E;}
;if(this.__hP){H.local=true;delete this.__hP;}
;if(this.__hR){H.margin=true;delete this.__hR;}
;return H;}
,isExcluded:function(){return false;}
,hasValidLayout:function(){return !this.__hP;}
,scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);}
,invalidateLayoutCache:function(){this.__hP=true;this.__hQ=null;}
,getSizeHint:function(J){var K=this.__hQ;if(K){return K;}
;if(J===false){return null;}
;K=this.__hQ=this._computeSizeHint();if(this._hasHeightForWidth()&&this.__hN&&this.getHeight()==null){K.height=this.__hN;}
;if(K.minWidth>K.width){K.width=K.minWidth;}
;if(K.maxWidth<K.width){K.width=K.maxWidth;}
;if(!this.getAllowGrowX()){K.maxWidth=K.width;}
;if(!this.getAllowShrinkX()){K.minWidth=K.width;}
;if(K.minHeight>K.height){K.height=K.minHeight;}
;if(K.maxHeight<K.height){K.height=K.maxHeight;}
;if(!this.getAllowGrowY()){K.maxHeight=K.height;}
;if(!this.getAllowShrinkY()){K.minHeight=K.height;}
;return K;}
,_computeSizeHint:function(){var P=this.getMinWidth()||0;var M=this.getMinHeight()||0;var Q=this.getWidth()||P;var O=this.getHeight()||M;var L=this.getMaxWidth()||Infinity;var N=this.getMaxHeight()||Infinity;return {minWidth:P,width:Q,maxWidth:L,minHeight:M,height:O,maxHeight:N};}
,_hasHeightForWidth:function(){var R=this._getLayout();if(R){return R.hasHeightForWidth();}
;return false;}
,_getHeightForWidth:function(S){var T=this._getLayout();if(T&&T.hasHeightForWidth()){return T.getHeightForWidth(S);}
;return null;}
,_getLayout:function(){return null;}
,_applyMargin:function(){this.__hR=true;var parent=this.$$parent;if(parent){parent.updateLayoutProperties();}
;}
,_applyAlign:function(){var parent=this.$$parent;if(parent){parent.updateLayoutProperties();}
;}
,_applyDimension:function(){qx.ui.core.queue.Layout.add(this);}
,_applyStretching:function(){qx.ui.core.queue.Layout.add(this);}
,hasUserBounds:function(){return !!this.__hS;}
,setUserBounds:function(U,top,V,W){this.__hS={left:U,top:top,width:V,height:W};qx.ui.core.queue.Layout.add(this);}
,resetUserBounds:function(){delete this.__hS;qx.ui.core.queue.Layout.add(this);}
,__hU:{},setLayoutProperties:function(X){if(X==null){return;}
;var Y=this.__hT;if(!Y){Y=this.__hT={};}
;var parent=this.getLayoutParent();if(parent){parent.updateLayoutProperties(X);}
;for(var ba in X){if(X[ba]==null){delete Y[ba];}
else {Y[ba]=X[ba];}
;}
;}
,getLayoutProperties:function(){return this.__hT||this.__hU;}
,clearLayoutProperties:function(){delete this.__hT;}
,updateLayoutProperties:function(bb){var bc=this._getLayout();if(bc){var bd;{}
;bc.invalidateChildrenCache();}
;qx.ui.core.queue.Layout.add(this);}
,getApplicationRoot:function(){return qx.core.Init.getApplication().getRoot();}
,getLayoutParent:function(){return this.$$parent||null;}
,setLayoutParent:function(parent){if(this.$$parent===parent){return;}
;this.$$parent=parent||null;qx.ui.core.queue.Visibility.add(this);}
,isRootWidget:function(){return false;}
,_getRoot:function(){var parent=this;while(parent){if(parent.isRootWidget()){return parent;}
;parent=parent.$$parent;}
;return null;}
,clone:function(){var be=qx.core.Object.prototype.clone.call(this);var bf=this.__hT;if(bf){be.__hT=qx.lang.Object.clone(bf);}
;return be;}
},destruct:function(){this.$$parent=this.$$subparent=this.__hT=this.__hO=this.__hS=this.__hQ=null;}
});}
)();
(function(){var cn="_applyNativeContextMenu",cm="engine.version",cl="_applyBackgroundColor",ck="event.pointer",cj="_applyFocusable",ci=" requires a layout, but no one was defined!",ch="changeShadow",cg="qx.event.type.KeyInput",cf="createChildControl",ce="__il",bx="browser.documentmode",bw="Unsupported control: ",bv="Font",bu="_applyShadow",bt="__is",bs="_applyEnabled",br="_applySelectable",bq="Number",bp="_applyKeepActive",bo="_applyVisibility",cu="Child control '",cv="repeat",cs="qxDraggable",ct="syncAppearance",cq="paddingLeft",cr="_applyDroppable",co="#",cp="At least one child in control ",cw="qx.event.type.MouseWheel",cx="_applyCursor",bV="_applyDraggable",bU="__ii",bX="Remove Error: ",bW="changeTextColor",ca="$$widget",bY="changeContextMenu",cc="paddingTop",cb="changeSelectable",bT="hideFocus",bS="none",c="__iq",d="outline",f="_applyAppearance",g="__ih",h="_applyOpacity",j="url(",k=")",m="qx.ui.core.Widget",n="TabIndex property must be between 1 and 32000",o="_applyFont",cB="cursor",cA="qxDroppable",cz="' already created!",cy="changeZIndex",cF="changeEnabled",cE="Abstract method call: _getContentHeightForWidth()!",cD="changeFont",cC="_applyDecorator",cH="_applyZIndex",cG="_applyTextColor",N="qx.ui.menu.Menu",O="_applyToolTipText",L=" is not a child of this widget!",M="true",R="widget",S="changeDecorator",P="__iu",Q="_applyTabIndex",J="changeAppearance",K="__in",w="shorthand",v="/",y="",x="_applyContextMenu",s="paddingBottom",r="changeNativeContextMenu",u="undefined",t="qx.ui.tooltip.ToolTip",q="qxKeepActive",p="_applyKeepFocus",X="paddingRight",Y="changeBackgroundColor",ba="changeLocale",bb="__im",T="qxKeepFocus",U="opera",V="qx/static/blank.gif",W="backgroundColor",bc="drag",bd="div",G="disabled",F="move",E="dragstart",D="qx.dynlocale",C="dragchange",B="dragend",A="resize",z="Decorator",I="zIndex",H="opacity",be="This widget has no children!",bf="default",bg="Color",bh="Widget is not focusable!",bi="changeToolTipText",bj="beforeContextmenuOpen",bk="focused",bl="changeVisibility",bm="hovered",bn="qx.event.type.KeySequence",bB="DOM element is not yet created!",bA="absolute",bz="_applyPadding",by="qx.event.type.Event",bF="on",bE="mshtml",bD="hidden",bC="contextmenu",bH="String",bG="tabIndex",bO="qx.event.type.Data",bP="engine.name",bM="excluded",bN="qx.event.type.Focus",bK="Integer",bL="qx.event.type.Touch",bI="visible",bJ="qx.event.type.Drag",bQ="qx.event.type.Mouse",bR="Boolean",cd="px";qx.Class.define(m,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){qx.ui.core.LayoutItem.call(this);this.__ih=this._createContainerElement();this.__ii=this.__it();this.__ih.add(this.__ii);this.initFocusable();this.initSelectable();this.initNativeContextMenu();}
,events:{appear:by,disappear:by,createChildControl:bO,resize:bO,move:bO,syncAppearance:bO,mousemove:bQ,mouseover:bQ,mouseout:bQ,mousedown:bQ,mouseup:bQ,click:bQ,dblclick:bQ,contextmenu:bQ,beforeContextmenuOpen:bO,mousewheel:cw,touchstart:bL,touchend:bL,touchmove:bL,touchcancel:bL,tap:bL,swipe:bL,keyup:bn,keydown:bn,keypress:bn,keyinput:cg,focus:bN,blur:bN,focusin:bN,focusout:bN,activate:bN,deactivate:bN,capture:by,losecapture:by,drop:bJ,dragleave:bJ,dragover:bJ,drag:bJ,dragstart:bJ,dragend:bJ,dragchange:bJ,droprequest:bJ},properties:{paddingTop:{check:bK,init:0,apply:bz,themeable:true},paddingRight:{check:bK,init:0,apply:bz,themeable:true},paddingBottom:{check:bK,init:0,apply:bz,themeable:true},paddingLeft:{check:bK,init:0,apply:bz,themeable:true},padding:{group:[cc,X,s,cq],mode:w,themeable:true},zIndex:{nullable:true,init:null,apply:cH,event:cy,check:bK,themeable:true},decorator:{nullable:true,init:null,apply:cC,event:S,check:z,themeable:true},shadow:{nullable:true,init:null,apply:bu,event:ch,check:z,themeable:true},backgroundColor:{nullable:true,check:bg,apply:cl,event:Y,themeable:true},textColor:{nullable:true,check:bg,apply:cG,event:bW,themeable:true,inheritable:true},font:{nullable:true,apply:o,check:bv,event:cD,themeable:true,inheritable:true,dereference:true},opacity:{check:bq,apply:h,themeable:true,nullable:true,init:null},cursor:{check:bH,apply:cx,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:t,nullable:true},toolTipText:{check:bH,nullable:true,event:bi,apply:O},toolTipIcon:{check:bH,nullable:true,event:bi},blockToolTip:{check:bR,init:false},visibility:{check:[bI,bD,bM],init:bI,apply:bo,event:bl},enabled:{init:true,check:bR,inheritable:true,apply:bs,event:cF},anonymous:{init:false,check:bR},tabIndex:{check:bK,nullable:true,apply:Q},focusable:{check:bR,init:false,apply:cj},keepFocus:{check:bR,init:false,apply:p},keepActive:{check:bR,init:false,apply:bp},draggable:{check:bR,init:false,apply:bV},droppable:{check:bR,init:false,apply:cr},selectable:{check:bR,init:false,event:cb,apply:br},contextMenu:{check:N,apply:x,nullable:true,event:bY},nativeContextMenu:{check:bR,init:false,themeable:true,event:r,apply:cn},appearance:{check:bH,init:R,apply:f,event:J}},statics:{DEBUG:false,getWidgetByElement:function(cI,cJ){while(cI){var cK=cI.$$widget;if(cK!=null){var cL=qx.core.ObjectRegistry.fromHashCode(cK);if(!cJ||!cL.getAnonymous()){return cL;}
;}
;try{cI=cI.parentNode;}
catch(e){return null;}
;}
;return null;}
,contains:function(parent,cM){while(cM){if(parent==cM){return true;}
;cM=cM.getLayoutParent();}
;return false;}
,__ij:new qx.ui.core.DecoratorFactory(),__ik:new qx.ui.core.DecoratorFactory()},members:{__ih:null,__ii:null,__il:null,__im:null,__in:null,__io:null,__ip:null,__iq:null,_getLayout:function(){return this.__iq;}
,_setLayout:function(cN){{}
;if(this.__iq){this.__iq.connectToWidget(null);}
;if(cN){cN.connectToWidget(this);}
;this.__iq=cN;qx.ui.core.queue.Layout.add(this);}
,setLayoutParent:function(parent){if(this.$$parent===parent){return;}
;var cO=this.getContainerElement();if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(cO);}
;this.$$parent=parent||null;if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(cO);}
;this.$$refreshInheritables();qx.ui.core.queue.Visibility.add(this);}
,_updateInsets:null,__ir:function(a,b){if(a==b){return false;}
;if(a==null||b==null){return true;}
;var cP=qx.theme.manager.Decoration.getInstance();var cR=cP.resolve(a).getInsets();var cQ=cP.resolve(b).getInsets();if(cR.top!=cQ.top||cR.right!=cQ.right||cR.bottom!=cQ.bottom||cR.left!=cQ.left){return true;}
;return false;}
,renderLayout:function(cS,top,cT,cU){var de=qx.ui.core.LayoutItem.prototype.renderLayout.call(this,cS,top,cT,cU);if(!de){return null;}
;if(qx.lang.Object.isEmpty(de)&&!this._updateInsets){return null;}
;var cW=this.getContainerElement();var content=this.getContentElement();var db=de.size||this._updateInsets;var df=cd;var dc={};if(de.position){dc.left=cS+df;dc.top=top+df;}
;if(de.size){dc.width=cT+df;dc.height=cU+df;}
;if(de.position||de.size){cW.setStyles(dc);}
;if(db||de.local||de.margin){var cV=this.getInsets();var innerWidth=cT-cV.left-cV.right;var innerHeight=cU-cV.top-cV.bottom;innerWidth=innerWidth<0?0:innerWidth;innerHeight=innerHeight<0?0:innerHeight;}
;var cY={};if(this._updateInsets){cY.left=cV.left+df;cY.top=cV.top+df;}
;if(db){cY.width=innerWidth+df;cY.height=innerHeight+df;}
;if(db||this._updateInsets){content.setStyles(cY);}
;if(de.size){var dd=this.__in;if(dd){dd.setStyles({width:cT+cd,height:cU+cd});}
;}
;if(de.size||this._updateInsets){if(this.__il){this.__il.resize(cT,cU);}
;}
;if(de.size){if(this.__im){var cV=this.__im.getInsets();var da=cT+cV.left+cV.right;var cX=cU+cV.top+cV.bottom;this.__im.resize(da,cX);}
;}
;if(db||de.local||de.margin){if(this.__iq&&this.hasLayoutChildren()){this.__iq.renderLayout(innerWidth,innerHeight);}
else if(this.hasLayoutChildren()){throw new Error(cp+this._findTopControl()+ci);}
;}
;if(de.position&&this.hasListener(F)){this.fireDataEvent(F,this.getBounds());}
;if(de.size&&this.hasListener(A)){this.fireDataEvent(A,this.getBounds());}
;delete this._updateInsets;return de;}
,__is:null,clearSeparators:function(){var dh=this.__is;if(!dh){return;}
;var di=qx.ui.core.Widget.__ij;var content=this.getContentElement();var dg;for(var i=0,l=dh.length;i<l;i++){dg=dh[i];di.poolDecorator(dg);content.remove(dg);}
;dh.length=0;}
,renderSeparator:function(dj,dk){var dm=qx.ui.core.Widget.__ij.getDecoratorElement(dj);this.getContentElement().add(dm);dm.resize(dk.width,dk.height);var dl=dm.getDomElement();if(dl){dl.style.top=dk.top+cd;dl.style.left=dk.left+cd;}
else {dm.setStyles({left:dk.left+cd,top:dk.top+cd});}
;if(!this.__is){this.__is=[dm];}
else {this.__is.push(dm);}
;}
,_computeSizeHint:function(){var du=this.getWidth();var dt=this.getMinWidth();var dp=this.getMaxWidth();var ds=this.getHeight();var dq=this.getMinHeight();var dr=this.getMaxHeight();{}
;var dv=this._getContentHint();var dn=this.getInsets();var dx=dn.left+dn.right;var dw=dn.top+dn.bottom;if(du==null){du=dv.width+dx;}
;if(ds==null){ds=dv.height+dw;}
;if(dt==null){dt=dx;if(dv.minWidth!=null){dt+=dv.minWidth;if(dt>dp&&dp!=null){dt=dp;}
;}
;}
;if(dq==null){dq=dw;if(dv.minHeight!=null){dq+=dv.minHeight;if(dq>dr&&dr!=null){dq=dr;}
;}
;}
;if(dp==null){if(dv.maxWidth==null){dp=Infinity;}
else {dp=dv.maxWidth+dx;if(dp<dt&&dt!=null){dp=dt;}
;}
;}
;if(dr==null){if(dv.maxHeight==null){dr=Infinity;}
else {dr=dv.maxHeight+dw;if(dr<dq&&dq!=null){dr=dq;}
;}
;}
;return {width:du,minWidth:dt,maxWidth:dp,height:ds,minHeight:dq,maxHeight:dr};}
,invalidateLayoutCache:function(){qx.ui.core.LayoutItem.prototype.invalidateLayoutCache.call(this);if(this.__iq){this.__iq.invalidateLayoutCache();}
;}
,_getContentHint:function(){var dz=this.__iq;if(dz){if(this.hasLayoutChildren()){var dy;var dA=dz.getSizeHint();{}
;return dA;}
else {return {width:0,height:0};}
;}
else {return {width:100,height:50};}
;}
,_getHeightForWidth:function(dB){var dF=this.getInsets();var dI=dF.left+dF.right;var dH=dF.top+dF.bottom;var dG=dB-dI;var dD=this._getLayout();if(dD&&dD.hasHeightForWidth()){var dC=dD.getHeightForWidth(dB);}
else {dC=this._getContentHeightForWidth(dG);}
;var dE=dC+dH;return dE;}
,_getContentHeightForWidth:function(dJ){throw new Error(cE);}
,getInsets:function(){var top=this.getPaddingTop();var dL=this.getPaddingRight();var dN=this.getPaddingBottom();var dM=this.getPaddingLeft();if(this.__il){var dK=this.__il.getInsets();{}
;top+=dK.top;dL+=dK.right;dN+=dK.bottom;dM+=dK.left;}
;return {"top":top,"right":dL,"bottom":dN,"left":dM};}
,getInnerSize:function(){var dP=this.getBounds();if(!dP){return null;}
;var dO=this.getInsets();return {width:dP.width-dO.left-dO.right,height:dP.height-dO.top-dO.bottom};}
,show:function(){this.setVisibility(bI);}
,hide:function(){this.setVisibility(bD);}
,exclude:function(){this.setVisibility(bM);}
,isVisible:function(){return this.getVisibility()===bI;}
,isHidden:function(){return this.getVisibility()!==bI;}
,isExcluded:function(){return this.getVisibility()===bM;}
,isSeeable:function(){qx.ui.core.queue.Manager.flush();var dQ=this.getContainerElement().getDomElement();if(dQ){return dQ.offsetWidth>0;}
;return false;}
,_createContainerElement:function(){var dS={"$$widget":this.toHashCode()};{}
;var dR={zIndex:0,position:bA};return new qx.html.Element(bd,dR,dS);}
,__it:function(){var dT=this._createContentElement();{}
;dT.setStyles({"position":bA,"zIndex":10});return dT;}
,_createContentElement:function(){return new qx.html.Element(bd,{overflowX:bD,overflowY:bD});}
,getContainerElement:function(){return this.__ih;}
,getContentElement:function(){return this.__ii;}
,getDecoratorElement:function(){return this.__il||null;}
,getShadowElement:function(){return this.__im||null;}
,__iu:null,getLayoutChildren:function(){var dV=this.__iu;if(!dV){return this.__iv;}
;var dW;for(var i=0,l=dV.length;i<l;i++){var dU=dV[i];if(dU.hasUserBounds()||dU.isExcluded()){if(dW==null){dW=dV.concat();}
;qx.lang.Array.remove(dW,dU);}
;}
;return dW||dV;}
,scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);}
,invalidateLayoutChildren:function(){var dX=this.__iq;if(dX){dX.invalidateChildrenCache();}
;qx.ui.core.queue.Layout.add(this);}
,hasLayoutChildren:function(){var dY=this.__iu;if(!dY){return false;}
;var ea;for(var i=0,l=dY.length;i<l;i++){ea=dY[i];if(!ea.hasUserBounds()&&!ea.isExcluded()){return true;}
;}
;return false;}
,getChildrenContainer:function(){return this;}
,__iv:[],_getChildren:function(){return this.__iu||this.__iv;}
,_indexOf:function(eb){var ec=this.__iu;if(!ec){return -1;}
;return ec.indexOf(eb);}
,_hasChildren:function(){var ed=this.__iu;return ed!=null&&(!!ed[0]);}
,addChildrenToQueue:function(ee){var ef=this.__iu;if(!ef){return;}
;var eg;for(var i=0,l=ef.length;i<l;i++){eg=ef[i];ee.push(eg);eg.addChildrenToQueue(ee);}
;}
,_add:function(eh,ei){{}
;if(eh.getLayoutParent()==this){qx.lang.Array.remove(this.__iu,eh);}
;if(this.__iu){this.__iu.push(eh);}
else {this.__iu=[eh];}
;this.__iw(eh,ei);}
,_addAt:function(ej,ek,em){if(!this.__iu){this.__iu=[];}
;if(ej.getLayoutParent()==this){qx.lang.Array.remove(this.__iu,ej);}
;var en=this.__iu[ek];if(en===ej){ej.setLayoutProperties(em);}
;if(en){qx.lang.Array.insertBefore(this.__iu,ej,en);}
else {this.__iu.push(ej);}
;this.__iw(ej,em);}
,_addBefore:function(eo,ep,eq){{}
;if(eo==ep){return;}
;if(!this.__iu){this.__iu=[];}
;if(eo.getLayoutParent()==this){qx.lang.Array.remove(this.__iu,eo);}
;qx.lang.Array.insertBefore(this.__iu,eo,ep);this.__iw(eo,eq);}
,_addAfter:function(er,es,et){{}
;if(er==es){return;}
;if(!this.__iu){this.__iu=[];}
;if(er.getLayoutParent()==this){qx.lang.Array.remove(this.__iu,er);}
;qx.lang.Array.insertAfter(this.__iu,er,es);this.__iw(er,et);}
,_remove:function(eu){if(!this.__iu){throw new Error(be);}
;qx.lang.Array.remove(this.__iu,eu);this.__ix(eu);}
,_removeAt:function(ev){if(!this.__iu){throw new Error(be);}
;var ew=this.__iu[ev];qx.lang.Array.removeAt(this.__iu,ev);this.__ix(ew);return ew;}
,_removeAll:function(){if(!this.__iu){return [];}
;var ex=this.__iu.concat();this.__iu.length=0;for(var i=ex.length-1;i>=0;i--){this.__ix(ex[i]);}
;qx.ui.core.queue.Layout.add(this);return ex;}
,_afterAddChild:null,_afterRemoveChild:null,__iw:function(ey,ez){{}
;var parent=ey.getLayoutParent();if(parent&&parent!=this){parent._remove(ey);}
;ey.setLayoutParent(this);if(ez){ey.setLayoutProperties(ez);}
else {this.updateLayoutProperties();}
;if(this._afterAddChild){this._afterAddChild(ey);}
;}
,__ix:function(eA){{}
;if(eA.getLayoutParent()!==this){throw new Error(bX+eA+L);}
;eA.setLayoutParent(null);if(this.__iq){this.__iq.invalidateChildrenCache();}
;qx.ui.core.queue.Layout.add(this);if(this._afterRemoveChild){this._afterRemoveChild(eA);}
;}
,capture:function(eB){this.getContainerElement().capture(eB);}
,releaseCapture:function(){this.getContainerElement().releaseCapture();}
,_applyPadding:function(eC,eD,name){this._updateInsets=true;qx.ui.core.queue.Layout.add(this);}
,_createProtectorElement:function(){if(this.__in){return;}
;var eE=this.__in=new qx.html.Element;{}
;eE.setStyles({position:bA,top:0,left:0,zIndex:7});var eF=this.getBounds();if(eF){this.__in.setStyles({width:eF.width+cd,height:eF.height+cd});}
;if((qx.core.Environment.get(bP)==bE)){eE.setStyles({backgroundImage:j+qx.util.ResourceManager.getInstance().toUri(V)+k,backgroundRepeat:cv});}
;this.getContainerElement().add(eE);}
,_applyDecorator:function(eG,eH){{}
;var eK=qx.ui.core.Widget.__ij;var eI=this.getContainerElement();if(!this.__in&&!qx.core.Environment.get(ck)){this._createProtectorElement();}
;if(eH){eI.remove(this.__il);eK.poolDecorator(this.__il);}
;if(eG){var eJ=this.__il=eK.getDecoratorElement(eG);eJ.setStyle(I,5);eI.add(eJ);}
else {delete this.__il;}
;this._applyBackgroundColor(this.getBackgroundColor());if(this.__ir(eH,eG)){this._updateInsets=true;qx.ui.core.queue.Layout.add(this);}
else if(eG){var eL=this.getBounds();if(eL){eJ.resize(eL.width,eL.height);this.__in&&this.__in.setStyles({width:eL.width+cd,height:eL.height+cd});}
;}
;}
,_applyShadow:function(eM,eN){var eV=qx.ui.core.Widget.__ik;var eP=this.getContainerElement();if(eN){eP.remove(this.__im);eV.poolDecorator(this.__im);}
;if(eM){var eR=this.__im=eV.getDecoratorElement(eM);eP.add(eR);var eT=eR.getInsets();eR.setStyles({left:eT.left+cd,top:eT.top+cd});var eS=this.getBounds();if(eS){var eQ=eS.width+eT.left+eT.right;var eO=eS.height+eT.top+eT.bottom;if(eN){var eU=eV.getDecoratorElement(eN).getInsets();eQ=eQ-eU.left-eU.right;eO=eO-eU.top-eU.bottom;}
;eR.resize(eQ,eO);}
;eR.tint(null);}
else {delete this.__im;}
;}
,_applyToolTipText:function(eW,eX){if(qx.core.Environment.get(D)){if(this.__ip){return;}
;var eY=qx.locale.Manager.getInstance();this.__ip=eY.addListener(ba,function(){var fa=this.getToolTipText();if(fa&&fa.translate){this.setToolTipText(fa.translate());}
;}
,this);}
;}
,_applyTextColor:function(fb,fc){}
,_applyZIndex:function(fd,fe){this.getContainerElement().setStyle(I,fd==null?0:fd);}
,_applyVisibility:function(ff,fg){var fh=this.getContainerElement();if(ff===bI){fh.show();}
else {fh.hide();}
;var parent=this.$$parent;if(parent&&(fg==null||ff==null||fg===bM||ff===bM)){parent.invalidateLayoutChildren();}
;qx.ui.core.queue.Visibility.add(this);}
,_applyOpacity:function(fi,fj){this.getContainerElement().setStyle(H,fi==1?null:fi);if((qx.core.Environment.get(bP)==bE)&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var fk=(fi==1||fi==null)?null:0.99;this.getContentElement().setStyle(H,fk);}
;}
;}
,_applyCursor:function(fl,fm){if(fl==null&&!this.isSelectable()){fl=bf;}
;this.getContainerElement().setStyle(cB,fl,qx.core.Environment.get(bP)==U);}
,_applyBackgroundColor:function(fn,fo){var fp=this.getBackgroundColor();var fr=this.getContainerElement();if(this.__il){this.__il.tint(fp);fr.setStyle(W,null);}
else {var fq=qx.theme.manager.Color.getInstance().resolve(fp);fr.setStyle(W,fq);}
;}
,_applyFont:function(fs,ft){}
,__iy:null,$$stateChanges:null,_forwardStates:null,hasState:function(fu){var fv=this.__iy;return !!fv&&!!fv[fu];}
,addState:function(fw){var fx=this.__iy;if(!fx){fx=this.__iy={};}
;if(fx[fw]){return;}
;this.__iy[fw]=true;if(fw===bm){this.syncAppearance();}
else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;}
else {qx.ui.core.queue.Appearance.add(this);}
;var forward=this._forwardStates;var fA=this.__iB;if(forward&&forward[fw]&&fA){var fy;for(var fz in fA){fy=fA[fz];if(fy instanceof qx.ui.core.Widget){fA[fz].addState(fw);}
;}
;}
;}
,removeState:function(fB){var fC=this.__iy;if(!fC||!fC[fB]){return;}
;delete this.__iy[fB];if(fB===bm){this.syncAppearance();}
else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;}
else {qx.ui.core.queue.Appearance.add(this);}
;var forward=this._forwardStates;var fF=this.__iB;if(forward&&forward[fB]&&fF){for(var fE in fF){var fD=fF[fE];if(fD instanceof qx.ui.core.Widget){fD.removeState(fB);}
;}
;}
;}
,replaceState:function(fG,fH){var fI=this.__iy;if(!fI){fI=this.__iy={};}
;if(!fI[fH]){fI[fH]=true;}
;if(fI[fG]){delete fI[fG];}
;if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;}
else {qx.ui.core.queue.Appearance.add(this);}
;var forward=this._forwardStates;var fL=this.__iB;if(forward&&forward[fH]&&fL){for(var fK in fL){var fJ=fL[fK];if(fJ instanceof qx.ui.core.Widget){fJ.replaceState(fG,fH);}
;}
;}
;}
,__iz:null,__iA:null,syncAppearance:function(){var fQ=this.__iy;var fP=this.__iz;var fR=qx.theme.manager.Appearance.getInstance();var fN=qx.core.Property.$$method.setThemed;var fV=qx.core.Property.$$method.resetThemed;if(this.__iA){delete this.__iA;if(fP){var fM=fR.styleFrom(fP,fQ,null,this.getAppearance());fP=null;}
;}
;if(!fP){var fO=this;var fU=[];do {fU.push(fO.$$subcontrol||fO.getAppearance());}
while(fO=fO.$$subparent);fP=fU.reverse().join(v).replace(/#[0-9]+/g,y);this.__iz=fP;}
;var fS=fR.styleFrom(fP,fQ,null,this.getAppearance());if(fS){var fT;if(fM){for(var fT in fM){if(fS[fT]===undefined){this[fV[fT]]();}
;}
;}
;{}
;for(var fT in fS){fS[fT]===undefined?this[fV[fT]]():this[fN[fT]](fS[fT]);}
;}
else if(fM){for(var fT in fM){this[fV[fT]]();}
;}
;this.fireDataEvent(ct,this.__iy);}
,_applyAppearance:function(fW,fX){this.updateAppearance();}
,checkAppearanceNeeds:function(){if(!this.__io){qx.ui.core.queue.Appearance.add(this);this.__io=true;}
else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);delete this.$$stateChanges;}
;}
,updateAppearance:function(){this.__iA=true;qx.ui.core.queue.Appearance.add(this);var gb=this.__iB;if(gb){var fY;for(var ga in gb){fY=gb[ga];if(fY instanceof qx.ui.core.Widget){fY.updateAppearance();}
;}
;}
;}
,syncWidget:function(gc){}
,getEventTarget:function(){var gd=this;while(gd.getAnonymous()){gd=gd.getLayoutParent();if(!gd){return null;}
;}
;return gd;}
,getFocusTarget:function(){var ge=this;if(!ge.getEnabled()){return null;}
;while(ge.getAnonymous()||!ge.getFocusable()){ge=ge.getLayoutParent();if(!ge||!ge.getEnabled()){return null;}
;}
;return ge;}
,getFocusElement:function(){return this.getContainerElement();}
,isTabable:function(){return (!!this.getContainerElement().getDomElement())&&this.isFocusable();}
,_applyFocusable:function(gf,gg){var gh=this.getFocusElement();if(gf){var gi=this.getTabIndex();if(gi==null){gi=1;}
;gh.setAttribute(bG,gi);if((qx.core.Environment.get(bP)==bE&&parseFloat(qx.core.Environment.get(cm))<8)||(qx.core.Environment.get(bP)==bE&&qx.core.Environment.get(bx)<8)){gh.setAttribute(bT,M);}
else {gh.setStyle(d,bS);}
;}
else {if(gh.isNativelyFocusable()){gh.setAttribute(bG,-1);}
else if(gg){gh.setAttribute(bG,null);}
;}
;}
,_applyKeepFocus:function(gj){var gk=this.getFocusElement();gk.setAttribute(T,gj?bF:null);}
,_applyKeepActive:function(gl){var gm=this.getContainerElement();gm.setAttribute(q,gl?bF:null);}
,_applyTabIndex:function(gn){if(gn==null){gn=1;}
else if(gn<1||gn>32000){throw new Error(n);}
;if(this.getFocusable()&&gn!=null){this.getFocusElement().setAttribute(bG,gn);}
;}
,_applySelectable:function(go,gp){if(gp!==null){this._applyCursor(this.getCursor());}
;this.getContentElement().setSelectable(go);}
,_applyEnabled:function(gq,gr){if(gq===false){this.addState(G);this.removeState(bm);if(this.isFocusable()){this.removeState(bk);this._applyFocusable(false,true);}
;if(this.isDraggable()){this._applyDraggable(false,true);}
;if(this.isDroppable()){this._applyDroppable(false,true);}
;}
else {this.removeState(G);if(this.isFocusable()){this._applyFocusable(true,false);}
;if(this.isDraggable()){this._applyDraggable(true,false);}
;if(this.isDroppable()){this._applyDroppable(true,false);}
;}
;}
,_applyNativeContextMenu:function(gs,gt,name){}
,_applyContextMenu:function(gu,gv){if(gv){gv.removeState(bC);if(gv.getOpener()==this){gv.resetOpener();}
;if(!gu){this.removeListener(bC,this._onContextMenuOpen);gv.removeListener(bl,this._onBeforeContextMenuOpen,this);}
;}
;if(gu){gu.setOpener(this);gu.addState(bC);if(!gv){this.addListener(bC,this._onContextMenuOpen);gu.addListener(bl,this._onBeforeContextMenuOpen,this);}
;}
;}
,_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);e.stop();}
,_onBeforeContextMenuOpen:function(e){if(e.getData()==bI&&this.hasListener(bj)){this.fireDataEvent(bj,e);}
;}
,_onStopEvent:function(e){e.stopPropagation();}
,_applyDraggable:function(gw,gx){if(!this.isEnabled()&&gw===true){gw=false;}
;qx.ui.core.DragDropCursor.getInstance();if(gw){this.addListener(E,this._onDragStart);this.addListener(bc,this._onDrag);this.addListener(B,this._onDragEnd);this.addListener(C,this._onDragChange);}
else {this.removeListener(E,this._onDragStart);this.removeListener(bc,this._onDrag);this.removeListener(B,this._onDragEnd);this.removeListener(C,this._onDragChange);}
;this.getContainerElement().setAttribute(cs,gw?bF:null);}
,_applyDroppable:function(gy,gz){if(!this.isEnabled()&&gy===true){gy=false;}
;this.getContainerElement().setAttribute(cA,gy?bF:null);}
,_onDragStart:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);this.getApplicationRoot().setGlobalCursor(bf);}
,_onDrag:function(e){qx.ui.core.DragDropCursor.getInstance().placeToMouse(e);}
,_onDragEnd:function(e){qx.ui.core.DragDropCursor.getInstance().moveTo(-1000,-1000);this.getApplicationRoot().resetGlobalCursor();}
,_onDragChange:function(e){var gA=qx.ui.core.DragDropCursor.getInstance();var gB=e.getCurrentAction();gB?gA.setAction(gB):gA.resetAction();}
,visualizeFocus:function(){this.addState(bk);}
,visualizeBlur:function(){this.removeState(bk);}
,scrollChildIntoView:function(gC,gD,gE,gF){gF=typeof gF==u?true:gF;var gG=qx.ui.core.queue.Layout;var parent;if(gF){gF=!gG.isScheduled(gC);parent=gC.getLayoutParent();if(gF&&parent){gF=!gG.isScheduled(parent);if(gF){parent.getChildren().forEach(function(gH){gF=gF&&!gG.isScheduled(gH);}
);}
;}
;}
;this.scrollChildIntoViewX(gC,gD,gF);this.scrollChildIntoViewY(gC,gE,gF);}
,scrollChildIntoViewX:function(gI,gJ,gK){this.getContentElement().scrollChildIntoViewX(gI.getContainerElement(),gJ,gK);}
,scrollChildIntoViewY:function(gL,gM,gN){this.getContentElement().scrollChildIntoViewY(gL.getContainerElement(),gM,gN);}
,focus:function(){if(this.isFocusable()){this.getFocusElement().focus();}
else {throw new Error(bh);}
;}
,blur:function(){if(this.isFocusable()){this.getFocusElement().blur();}
else {throw new Error(bh);}
;}
,activate:function(){this.getContainerElement().activate();}
,deactivate:function(){this.getContainerElement().deactivate();}
,tabFocus:function(){this.getFocusElement().focus();}
,hasChildControl:function(gO){if(!this.__iB){return false;}
;return !!this.__iB[gO];}
,__iB:null,_getCreatedChildControls:function(){return this.__iB;}
,getChildControl:function(gP,gQ){if(!this.__iB){if(gQ){return null;}
;this.__iB={};}
;var gR=this.__iB[gP];if(gR){return gR;}
;if(gQ===true){return null;}
;return this._createChildControl(gP);}
,_showChildControl:function(gS){var gT=this.getChildControl(gS);gT.show();return gT;}
,_excludeChildControl:function(gU){var gV=this.getChildControl(gU,true);if(gV){gV.exclude();}
;}
,_isChildControlVisible:function(gW){var gX=this.getChildControl(gW,true);if(gX){return gX.isVisible();}
;return false;}
,_createChildControl:function(gY){if(!this.__iB){this.__iB={};}
else if(this.__iB[gY]){throw new Error(cu+gY+cz);}
;var hd=gY.indexOf(co);if(hd==-1){var ha=this._createChildControlImpl(gY);}
else {var ha=this._createChildControlImpl(gY.substring(0,hd),gY.substring(hd+1,gY.length));}
;if(!ha){throw new Error(bw+gY);}
;ha.$$subcontrol=gY;ha.$$subparent=this;var hb=this.__iy;var forward=this._forwardStates;if(hb&&forward&&ha instanceof qx.ui.core.Widget){for(var hc in hb){if(forward[hc]){ha.addState(hc);}
;}
;}
;this.fireDataEvent(cf,ha);return this.__iB[gY]=ha;}
,_createChildControlImpl:function(he,hf){return null;}
,_disposeChildControls:function(){var hj=this.__iB;if(!hj){return;}
;var hh=qx.ui.core.Widget;for(var hi in hj){var hg=hj[hi];if(!hh.contains(this,hg)){hg.destroy();}
else {hg.dispose();}
;}
;delete this.__iB;}
,_findTopControl:function(){var hk=this;while(hk){if(!hk.$$subparent){return hk;}
;hk=hk.$$subparent;}
;return null;}
,getContainerLocation:function(hl){var hm=this.getContainerElement().getDomElement();return hm?qx.bom.element.Location.get(hm,hl):null;}
,getContentLocation:function(hn){var ho=this.getContentElement().getDomElement();return ho?qx.bom.element.Location.get(ho,hn):null;}
,setDomLeft:function(hp){var hq=this.getContainerElement().getDomElement();if(hq){hq.style.left=hp+cd;}
else {throw new Error(bB);}
;}
,setDomTop:function(hr){var hs=this.getContainerElement().getDomElement();if(hs){hs.style.top=hr+cd;}
else {throw new Error(bB);}
;}
,setDomPosition:function(ht,top){var hu=this.getContainerElement().getDomElement();if(hu){hu.style.left=ht+cd;hu.style.top=top+cd;}
else {throw new Error(bB);}
;}
,destroy:function(){if(this.$$disposed){return;}
;var parent=this.$$parent;if(parent){parent._remove(this);}
;qx.ui.core.queue.Dispose.add(this);}
,clone:function(){var hv=qx.ui.core.LayoutItem.prototype.clone.call(this);if(this.getChildren){var hw=this.getChildren();for(var i=0,l=hw.length;i<l;i++){hv.add(hw[i].clone());}
;}
;return hv;}
},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Environment.get(D)){if(this.__ip){qx.locale.Manager.getInstance().removeListenerById(this.__ip);}
;}
;this.getContainerElement().setAttribute(ca,null,true);this._disposeChildControls();qx.ui.core.queue.Appearance.remove(this);qx.ui.core.queue.Layout.remove(this);qx.ui.core.queue.Visibility.remove(this);qx.ui.core.queue.Widget.remove(this);}
;if(this.getContextMenu()){this.setContextMenu(null);}
;if(!qx.core.ObjectRegistry.inShutDown){var hy=qx.ui.core.Widget;var hx=this.getContainerElement();if(this.__il){hx.remove(this.__il);hy.__ij.poolDecorator(this.__il);}
;if(this.__im){hx.remove(this.__im);hy.__ik.poolDecorator(this.__im);}
;this.clearSeparators();this.__il=this.__im=this.__is=null;}
else {this._disposeArray(bt);this._disposeObjects(ce,bb);}
;this._disposeArray(P);this.__iy=this.__iB=null;this._disposeObjects(c,g,bU,K);}
});}
)();
(function(){var f="qx.ui.core.EventHandler",e="activate",d="blur",c="focus",b="input",a="load";qx.Class.define(f,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);this.__eQ=qx.event.Registration.getManager(window);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1,touchstart:1,touchend:1,touchmove:1,touchcancel:1,tap:1,swipe:1},IGNORE_CAN_HANDLE:false},members:{__eQ:null,__iC:{focusin:1,focusout:1,focus:1,blur:1},__iD:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(g,h){return g instanceof qx.ui.core.Widget;}
,_dispatchEvent:function(j){var p=j.getTarget();var o=qx.ui.core.Widget.getWidgetByElement(p);var q=false;while(o&&o.isAnonymous()){var q=true;o=o.getLayoutParent();}
;if(o&&q&&j.getType()==e){o.getContainerElement().activate();}
;if(this.__iC[j.getType()]){o=o&&o.getFocusTarget();if(!o){return;}
;}
;if(j.getRelatedTarget){var x=j.getRelatedTarget();var w=qx.ui.core.Widget.getWidgetByElement(x);while(w&&w.isAnonymous()){w=w.getLayoutParent();}
;if(w){if(this.__iC[j.getType()]){w=w.getFocusTarget();}
;if(w===o){return;}
;}
;}
;var s=j.getCurrentTarget();var u=qx.ui.core.Widget.getWidgetByElement(s);if(!u||u.isAnonymous()){return;}
;if(this.__iC[j.getType()]){u=u.getFocusTarget();}
;var v=j.getType();if(!u||!(u.isEnabled()||this.__iD[v])){return;}
;var k=j.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;var r=this.__eQ.getListeners(u,v,k);if(!r||r.length===0){return;}
;var m=qx.event.Pool.getInstance().getObject(j.constructor);j.clone(m);m.setTarget(o);m.setRelatedTarget(w||null);m.setCurrentTarget(u);var y=j.getOriginalTarget();if(y){var n=qx.ui.core.Widget.getWidgetByElement(y);while(n&&n.isAnonymous()){n=n.getLayoutParent();}
;m.setOriginalTarget(n);}
else {m.setOriginalTarget(p);}
;for(var i=0,l=r.length;i<l;i++){var t=r[i].context||u;r[i].handler.call(t,m);}
;if(m.getPropagationStopped()){j.stopPropagation();}
;if(m.getDefaultPrevented()){j.preventDefault();}
;qx.event.Pool.getInstance().poolObject(m);}
,registerEvent:function(z,A,B){var C;if(A===c||A===d){C=z.getFocusElement();}
else if(A===a||A===b){C=z.getContentElement();}
else {C=z.getContainerElement();}
;if(C){C.addListener(A,this._dispatchEvent,this,B);}
;}
,unregisterEvent:function(D,E,F){var G;if(E===c||E===d){G=D.getFocusElement();}
else if(E===a||E===b){G=D.getContentElement();}
else {G=D.getContainerElement();}
;if(G){G.removeListener(E,this._dispatchEvent,this,F);}
;}
},destruct:function(){this.__eQ=null;}
,defer:function(H){qx.event.Registration.addHandler(H);}
});}
)();
(function(){var t='indexOf',s='slice',r='concat',q='toLocaleLowerCase',p="qx.type.BaseString",o='match',n='toLocaleUpperCase',m='search',k='replace',j='toLowerCase',c='charCodeAt',h='split',f='substring',b='lastIndexOf',a='substr',e='toUpperCase',d='charAt',g="";qx.Class.define(p,{extend:Object,construct:function(u){var u=u||g;this.__iE=u;this.length=u.length;}
,members:{$$isString:true,length:0,__iE:null,toString:function(){return this.__iE;}
,charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);}
,toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(v,w){return qx.core.Object.prototype.base.apply(this,arguments);}
},defer:function(x,y){{}
;var z=[d,c,r,t,b,o,k,m,s,h,a,f,j,e,q,n];y.valueOf=y.toString;if(new x(g).valueOf()==null){delete y.valueOf;}
;for(var i=0,l=z.length;i<l;i++){y[z[i]]=String.prototype[z[i]];}
;}
});}
)();
(function(){var a="qx.locale.LocalizedString";qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,c,d){qx.type.BaseString.call(this,b);this.__iF=c;this.__iG=d;}
,members:{__iF:null,__iG:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__iF,this.__iG);}
}});}
)();
(function(){var l="locale",k="_applyLocale",j="changeLocale",h="C",g="locale.variant",f="qx.dynlocale",e="qx.locale.Manager",d="String",c="singleton",b="",a="_";qx.Class.define(e,{type:c,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__iH=qx.$$translations||{};this.__iI=qx.$$locales||{};var m=qx.core.Environment.get(l);var n=qx.core.Environment.get(g);if(n!==b){m+=a+n;}
;this.__iJ=m;this.setLocale(m||this.__iK);}
,statics:{tr:function(o,p){var q=qx.lang.Array.fromArguments(arguments);q.splice(0,1);return qx.locale.Manager.getInstance().translate(o,q);}
,trn:function(r,s,t,u){var v=qx.lang.Array.fromArguments(arguments);v.splice(0,3);if(t!=1){return qx.locale.Manager.getInstance().translate(s,v);}
else {return qx.locale.Manager.getInstance().translate(r,v);}
;}
,trc:function(w,x,y){var z=qx.lang.Array.fromArguments(arguments);z.splice(0,2);return qx.locale.Manager.getInstance().translate(x,z);}
,marktr:function(A){return A;}
},properties:{locale:{check:d,nullable:true,apply:k,event:j}},members:{__iK:h,__iL:null,__iM:null,__iH:null,__iI:null,__iJ:null,getLanguage:function(){return this.__iM;}
,getTerritory:function(){return this.getLocale().split(a)[1]||b;}
,getAvailableLocales:function(B){var D=[];for(var C in this.__iI){if(C!=this.__iK){if(this.__iI[C]===null&&!B){continue;}
;D.push(C);}
;}
;return D;}
,__iN:function(E){var G;if(E==null){return null;}
;var F=E.indexOf(a);if(F==-1){G=E;}
else {G=E.substring(0,F);}
;return G;}
,_applyLocale:function(H,I){{}
;this.__iL=H;this.__iM=this.__iN(H);}
,addTranslation:function(J,K){var L=this.__iH;if(L[J]){for(var M in K){L[J][M]=K[M];}
;}
else {L[J]=K;}
;}
,addLocale:function(N,O){var P=this.__iI;if(P[N]){for(var Q in O){P[N][Q]=O[Q];}
;}
else {P[N]=O;}
;}
,translate:function(R,S,T){var U=this.__iH;return this.__iO(U,R,S,T);}
,localize:function(V,W,X){var Y=this.__iI;return this.__iO(Y,V,W,X);}
,__iO:function(ba,bb,bc,bd){{}
;var be;if(!ba){return bb;}
;if(bd){var bg=this.__iN(bd);}
else {bd=this.__iL;bg=this.__iM;}
;if(!be&&ba[bd]){be=ba[bd][bb];}
;if(!be&&ba[bg]){be=ba[bg][bb];}
;if(!be&&ba[this.__iK]){be=ba[this.__iK][bb];}
;if(!be){be=bb;}
;if(bc.length>0){var bf=[];for(var i=0;i<bc.length;i++){var bh=bc[i];if(bh&&bh.translate){bf[i]=bh.translate();}
else {bf[i]=bh;}
;}
;be=qx.lang.String.format(be,bf);}
;if(qx.core.Environment.get(f)){be=new qx.locale.LocalizedString(be,bb,bc);}
;return be;}
},destruct:function(){this.__iH=this.__iI=null;}
});}
)();
(function(){var f="qx.bom.client.Locale",e="locale",d="android",c="locale.variant",b="-",a="";qx.Bootstrap.define(f,{statics:{getLocale:function(){var g=qx.bom.client.Locale.__iP();var h=g.indexOf(b);if(h!=-1){g=g.substr(0,h);}
;return g;}
,getVariant:function(){var i=qx.bom.client.Locale.__iP();var k=a;var j=i.indexOf(b);if(j!=-1){k=i.substr(j+1);}
;return k;}
,__iP:function(){var l=(navigator.userLanguage||navigator.language||a);if(qx.bom.client.OperatingSystem.getName()==d){var m=/(\w{2})-(\w{2})/i.exec(navigator.userAgent);if(m){l=m[0];}
;}
;return l.toLowerCase();}
},defer:function(n){qx.core.Environment.add(e,n.getLocale);qx.core.Environment.add(c,n.getVariant);}
});}
)();
(function(){var k="qx/icon",j="repeat",i=".png",h="crop",g="engine.version",f="Potential clipped image candidate: ",d="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",c='<div style="',b="repeat-y",a='<img src="',K="qx.bom.element.Decoration",J="Image modification not possible because elements could not be replaced at runtime anymore!",I="', sizingMethod='",H='"/>',G="png",F="')",E='"></div>',D='" style="',C="none",B="webkit",r=" ",s="repeat-x",p="DXImageTransform.Microsoft.AlphaImageLoader",q="qx/static/blank.gif",n="absolute",o="scale",l="mshtml",m="b64",t="scale-y",u="no-repeat",w="scale-x",v="",y="engine.name",x="div",A="img",z="px";qx.Class.define(K,{statics:{DEBUG:false,__iQ:{},__iR:(qx.core.Environment.get(y)==l)&&qx.core.Environment.get(g)<9,__iS:qx.core.Environment.select(y,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__iT:{"scale-x":A,"scale-y":A,"scale":A,"repeat":x,"no-repeat":x,"repeat-x":x,"repeat-y":x},update:function(L,M,N,O){var Q=this.getTagName(N,M);if(Q!=L.tagName.toLowerCase()){throw new Error(J);}
;var R=this.getAttributes(M,N,O);if(Q===A){L.src=R.src||qx.util.ResourceManager.getInstance().toUri(q);}
;if(L.style.backgroundPosition!=v&&R.style.backgroundPosition===undefined){R.style.backgroundPosition=null;}
;if(L.style.clip!=v&&R.style.clip===undefined){R.style.clip=null;}
;var P=qx.bom.element.Style;P.setStyles(L,R.style);if(this.__iR){try{L.filters[p].apply();}
catch(e){}
;}
;}
,create:function(S,T,U){var V=this.getTagName(T,S);var X=this.getAttributes(S,T,U);var W=qx.bom.element.Style.compile(X.style);if(V===A){return a+X.src+D+W+H;}
else {return c+W+E;}
;}
,getTagName:function(Y,ba){if(ba&&this.__iR&&this.__iS[Y]&&qx.lang.String.endsWith(ba,i)){return x;}
;return this.__iT[Y];}
,getAttributes:function(bb,bc,bd){if(!bd){bd={};}
;if(!bd.position){bd.position=n;}
;if((qx.core.Environment.get(y)==l)){bd.fontSize=0;bd.lineHeight=0;}
else if((qx.core.Environment.get(y)==B)){bd.WebkitUserDrag=C;}
;var bf=qx.util.ResourceManager.getInstance().getImageFormat(bb)||qx.io.ImageLoader.getFormat(bb);{}
;var be;if(this.__iR&&this.__iS[bc]&&bf===G){be=this.__iW(bd,bc,bb);}
else {if(bc===o){be=this.__iX(bd,bc,bb);}
else if(bc===w||bc===t){be=this.__iY(bd,bc,bb);}
else {be=this.__jc(bd,bc,bb);}
;}
;return be;}
,__iU:function(bh,bi,bj){if(bh.width==null&&bi!=null){bh.width=bi+z;}
;if(bh.height==null&&bj!=null){bh.height=bj+z;}
;return bh;}
,__iV:function(bk){var bl=qx.util.ResourceManager.getInstance().getImageWidth(bk)||qx.io.ImageLoader.getWidth(bk);var bm=qx.util.ResourceManager.getInstance().getImageHeight(bk)||qx.io.ImageLoader.getHeight(bk);return {width:bl,height:bm};}
,__iW:function(bn,bo,bp){var bs=this.__iV(bp);bn=this.__iU(bn,bs.width,bs.height);var br=bo==u?h:o;var bq=d+qx.util.ResourceManager.getInstance().toUri(bp)+I+br+F;bn.filter=bq;bn.backgroundImage=bn.backgroundRepeat=v;return {style:bn};}
,__iX:function(bt,bu,bv){var bw=qx.util.ResourceManager.getInstance().toUri(bv);var bx=this.__iV(bv);bt=this.__iU(bt,bx.width,bx.height);return {src:bw,style:bt};}
,__iY:function(by,bz,bA){var bB=qx.util.ResourceManager.getInstance();var bE=bB.getCombinedFormat(bA);var bG=this.__iV(bA);var bC;if(bE){var bF=bB.getData(bA);var bD=bF[4];if(bE==m){bC=bB.toDataUri(bA);}
else {bC=bB.toUri(bD);}
;if(bz===w){by=this.__ja(by,bF,bG.height);}
else {by=this.__jb(by,bF,bG.width);}
;return {src:bC,style:by};}
else {{}
;if(bz==w){by.height=bG.height==null?null:bG.height+z;}
else if(bz==t){by.width=bG.width==null?null:bG.width+z;}
;bC=bB.toUri(bA);return {src:bC,style:by};}
;}
,__ja:function(bH,bI,bJ){var bK=qx.util.ResourceManager.getInstance().getImageHeight(bI[4]);bH.clip={top:-bI[6],height:bJ};bH.height=bK+z;if(bH.top!=null){bH.top=(parseInt(bH.top,10)+bI[6])+z;}
else if(bH.bottom!=null){bH.bottom=(parseInt(bH.bottom,10)+bJ-bK-bI[6])+z;}
;return bH;}
,__jb:function(bL,bM,bN){var bO=qx.util.ResourceManager.getInstance().getImageWidth(bM[4]);bL.clip={left:-bM[5],width:bN};bL.width=bO+z;if(bL.left!=null){bL.left=(parseInt(bL.left,10)+bM[5])+z;}
else if(bL.right!=null){bL.right=(parseInt(bL.right,10)+bN-bO-bM[5])+z;}
;return bL;}
,__jc:function(bP,bQ,bR){var bU=qx.util.ResourceManager.getInstance();var ca=bU.getCombinedFormat(bR);var cc=this.__iV(bR);if(ca&&bQ!==j){var cb=bU.getData(bR);var bY=cb[4];if(ca==m){var bX=bU.toDataUri(bR);var bW=0;var bV=0;}
else {var bX=bU.toUri(bY);var bW=cb[5];var bV=cb[6];}
;var bS=qx.bom.element.Background.getStyles(bX,bQ,bW,bV);for(var bT in bS){bP[bT]=bS[bT];}
;if(cc.width!=null&&bP.width==null&&(bQ==b||bQ===u)){bP.width=cc.width+z;}
;if(cc.height!=null&&bP.height==null&&(bQ==s||bQ===u)){bP.height=cc.height+z;}
;return {style:bP};}
else {{}
;bP=this.__iU(bP,cc.width,cc.height);bP=this.__jd(bP,bR,bQ);return {style:bP};}
;}
,__jd:function(cd,ce,cf){var top=null;var cj=null;if(cd.backgroundPosition){var cg=cd.backgroundPosition.split(r);cj=parseInt(cg[0],10);if(isNaN(cj)){cj=cg[0];}
;top=parseInt(cg[1],10);if(isNaN(top)){top=cg[1];}
;}
;var ci=qx.bom.element.Background.getStyles(ce,cf,cj,top);for(var ch in ci){cd[ch]=ci[ch];}
;if(cd.filter){cd.filter=v;}
;return cd;}
,__je:function(ck){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(ck)&&ck.indexOf(k)==-1){if(!this.__iQ[ck]){qx.log.Logger.debug(f+ck);this.__iQ[ck]=true;}
;}
;}
,isAlphaImageLoaderEnabled:function(){return qx.bom.element.Decoration.__iR;}
}});}
)();
(function(){var c="load",b="qx.io.ImageLoader",a="html.image.naturaldimensions";qx.Bootstrap.define(b,{statics:{__cR:{},__jf:{width:null,height:null},__jg:/\.(png|gif|jpg|jpeg|bmp)\b/i,__jh:/^data:image\/(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(d){var e=this.__cR[d];return !!(e&&e.loaded);}
,isFailed:function(f){var g=this.__cR[f];return !!(g&&g.failed);}
,isLoading:function(h){var j=this.__cR[h];return !!(j&&j.loading);}
,getFormat:function(k){var m=this.__cR[k];if(!m||!m.format){var o=this.__jh.exec(k);if(o!=null){var p=(m&&qx.lang.Type.isNumber(m.width)?m.width:this.__jf.width);var n=(m&&qx.lang.Type.isNumber(m.height)?m.height:this.__jf.height);m={loaded:true,format:o[1],width:p,height:n};}
;}
;return m?m.format:null;}
,getSize:function(q){var r=this.__cR[q];return r?{width:r.width,height:r.height}:this.__jf;}
,getWidth:function(s){var t=this.__cR[s];return t?t.width:null;}
,getHeight:function(u){var v=this.__cR[u];return v?v.height:null;}
,load:function(w,x,y){var z=this.__cR[w];if(!z){z=this.__cR[w]={};}
;if(x&&!y){y=window;}
;if(z.loaded||z.loading||z.failed){if(x){if(z.loading){z.callbacks.push(x,y);}
else {x.call(y,w,z);}
;}
;}
else {z.loading=true;z.callbacks=[];if(x){z.callbacks.push(x,y);}
;var B=new Image();var A=qx.lang.Function.listener(this.__ji,this,B,w);B.onload=A;B.onerror=A;B.src=w;z.element=B;}
;}
,abort:function(C){var D=this.__cR[C];if(D&&!D.loaded){D.aborted=true;var F=D.callbacks;var E=D.element;E.onload=E.onerror=null;delete D.callbacks;delete D.element;delete D.loading;for(var i=0,l=F.length;i<l;i+=2){F[i].call(F[i+1],C,D);}
;}
;this.__cR[C]=null;}
,__ji:qx.event.GlobalError.observeMethod(function(event,G,H){var I=this.__cR[H];if(event.type===c){I.loaded=true;I.width=this.__jj(G);I.height=this.__jk(G);var J=this.__jg.exec(H);if(J!=null){I.format=J[1];}
;}
else {I.failed=true;}
;G.onload=G.onerror=null;var K=I.callbacks;delete I.loading;delete I.callbacks;delete I.element;for(var i=0,l=K.length;i<l;i+=2){K[i].call(K[i+1],H,I);}
;}
),__jj:function(L){return qx.core.Environment.get(a)?L.naturalWidth:L.width;}
,__jk:function(M){return qx.core.Environment.get(a)?M.naturalHeight:M.height;}
}});}
)();
(function(){var u="')",t="gecko",s="background-image:url(",r=");",q="",p=")",o="background-repeat:",n="engine.version",m="data:",l=" ",e="qx.bom.element.Background",k="url(",h="background-position:",c="base64",b="url('",g="engine.name",f="0",i="px",a=";",j="'",d="number";qx.Class.define(e,{statics:{__jl:[s,null,r,h,null,a,o,null,a],__jm:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__jn:function(v,top){var w=qx.core.Environment.get(g);var x=qx.core.Environment.get(n);if(w==t&&x<1.9&&v==top&&typeof v==d){top+=0.01;}
;if(v){var z=(typeof v==d)?v+i:v;}
else {z=f;}
;if(top){var y=(typeof top==d)?top+i:top;}
else {y=f;}
;return z+l+y;}
,__jo:function(A){var String=qx.lang.String;var B=A.substr(0,50);return String.startsWith(B,m)&&String.contains(B,c);}
,compile:function(C,D,E,top){var F=this.__jn(E,top);var G=qx.util.ResourceManager.getInstance().toUri(C);if(this.__jo(G)){G=j+G+j;}
;var H=this.__jl;H[1]=G;H[4]=F;H[7]=D;return H.join(q);}
,getStyles:function(I,J,K,top){if(!I){return this.__jm;}
;var L=this.__jn(K,top);var N=qx.util.ResourceManager.getInstance().toUri(I);var O;if(this.__jo(N)){O=b+N+u;}
else {O=k+N+p;}
;var M={backgroundPosition:L,backgroundImage:O};if(J!=null){M.backgroundRepeat=J;}
;return M;}
,set:function(P,Q,R,S,top){var T=this.getStyles(Q,R,S,top);for(var U in T){P.style[U]=T[U];}
;}
}});}
)();
(function(){var k="",j="mshtml",i="backgroundImage",h="webkit",g="div",f="qx.html.Image",e="qx/static/blank.gif",d="engine.name",c="no-repeat",b="scale",a="source";qx.Class.define(f,{extend:qx.html.Element,members:{tagNameHint:null,_applyProperty:function(name,l){qx.html.Element.prototype._applyProperty.call(this,name,l);if(name===a){var p=this.getDomElement();var m=this.getAllStyles();if(this.getNodeName()==g&&this.getStyle(i)){m.backgroundPosition=null;m.backgroundRepeat=null;}
;var n=this._getProperty(a);var o=this._getProperty(b);var q=o?b:c;if(n!=null){n=n||null;qx.bom.element.Decoration.update(p,n,q,m);}
;}
;}
,_removeProperty:function(r,s){if(r==a){this._setProperty(r,k,s);}
else {this._setProperty(r,null,s);}
;}
,_createDomElement:function(){var u=this._getProperty(b);var v=u?b:c;if((qx.core.Environment.get(d)==j)){var t=this._getProperty(a);if(this.tagNameHint!=null){this.setNodeName(this.tagNameHint);}
else {this.setNodeName(qx.bom.element.Decoration.getTagName(v,t));}
;}
else {this.setNodeName(qx.bom.element.Decoration.getTagName(v));}
;return qx.html.Element.prototype._createDomElement.call(this);}
,_copyData:function(w){return qx.html.Element.prototype._copyData.call(this,true);}
,setSource:function(x){this._setProperty(a,x);return this;}
,getSource:function(){return this._getProperty(a);}
,resetSource:function(){if((qx.core.Environment.get(d)==h)){this._setProperty(a,e);}
else {this._removeProperty(a,true);}
;return this;}
,setScale:function(y){this._setProperty(b,y);return this;}
,getScale:function(){return this._getProperty(b);}
}});}
)();
(function(){var j="Boolean",i="bottom-right",h="' ",g="widget",f="qx.ui.core.MPlacement",e="left-top",d="[qx.ui.core.MPlacement.setMoveDirection()], the value was '",c="offsetRight",b="shorthand",a="Invalid value for the parameter 'direction' ",F="offsetLeft",E="top-left",D="appear",C="offsetBottom",B="top",A="top-right",z="offsetTop",y="but 'top' or 'left' are allowed.",x="right-bottom",w="right-top",q="left-bottom",r="best-fit",o="placementRight",p="placementLeft",m="mouse",n="bottom-left",k="direct",l="disappear",s="left",t="Integer",v="interval",u="keep-align";qx.Mixin.define(f,{statics:{__fd:null,__jp:s,setVisibleElement:function(G){this.__fd=G;}
,getVisibleElement:function(){return this.__fd;}
,setMoveDirection:function(H){if(H===B||H===s){this.__jp=H;}
else {throw new Error(a+d+H+h+y);}
;}
,getMoveDirection:function(){return this.__jp;}
},properties:{position:{check:[E,A,n,i,e,q,w,x],init:n,themeable:true},placeMethod:{check:[g,m],init:m,themeable:true},domMove:{check:j,init:false},placementModeX:{check:[k,u,r],init:u,themeable:true},placementModeY:{check:[k,u,r],init:u,themeable:true},offsetLeft:{check:t,init:0,themeable:true},offsetTop:{check:t,init:0,themeable:true},offsetRight:{check:t,init:0,themeable:true},offsetBottom:{check:t,init:0,themeable:true},offset:{group:[z,c,C,F],mode:b,themeable:true}},members:{__jq:null,__jr:null,__js:null,getLayoutLocation:function(I){var L,K,M,top;K=I.getBounds();M=K.left;top=K.top;var N=K;I=I.getLayoutParent();while(I&&!I.isRootWidget()){K=I.getBounds();M+=K.left;top+=K.top;L=I.getInsets();M+=L.left;top+=L.top;I=I.getLayoutParent();}
;if(I.isRootWidget()){var J=I.getContainerLocation();if(J){M+=J.left;top+=J.top;}
;}
;return {left:M,top:top,right:M+N.width,bottom:top+N.height};}
,moveTo:function(O,top){var U=qx.ui.core.MPlacement.getVisibleElement();if(U){var T=this.getBounds();var S=U.getContentLocation();if(T&&S){var R=top+T.height;var Q=O+T.width;if((Q>S.left&&O<S.right)&&(R>S.top&&top<S.bottom)){var P=qx.ui.core.MPlacement.getMoveDirection();if(P===s){O=Math.max(S.left-T.width,0);}
else {top=Math.max(S.top-T.height,0);}
;}
;}
;}
;if(this.getDomMove()){this.setDomPosition(O,top);}
else {this.setLayoutProperties({left:O,top:top});}
;}
,placeToWidget:function(V,W){if(W){this.__jt();this.__jq=qx.lang.Function.bind(this.placeToWidget,this,V,false);qx.event.Idle.getInstance().addListener(v,this.__jq);this.__js=function(){this.__jt();}
;this.addListener(l,this.__js,this);}
;var X=V.getContainerLocation()||this.getLayoutLocation(V);this.__jv(X);}
,__jt:function(){if(this.__jq){qx.event.Idle.getInstance().removeListener(v,this.__jq);this.__jq=null;}
;if(this.__js){this.removeListener(l,this.__js,this);this.__js=null;}
;}
,placeToMouse:function(event){var ba=event.getDocumentLeft();var top=event.getDocumentTop();var Y={left:ba,top:top,right:ba,bottom:top};this.__jv(Y);}
,placeToElement:function(bb,bc){var location=qx.bom.element.Location.get(bb);var bd={left:location.left,top:location.top,right:location.left+bb.offsetWidth,bottom:location.top+bb.offsetHeight};if(bc){this.__jq=qx.lang.Function.bind(this.placeToElement,this,bb,false);qx.event.Idle.getInstance().addListener(v,this.__jq);this.addListener(l,function(){if(this.__jq){qx.event.Idle.getInstance().removeListener(v,this.__jq);this.__jq=null;}
;}
,this);}
;this.__jv(bd);}
,placeToPoint:function(be){var bf={left:be.left,top:be.top,right:be.left,bottom:be.top};this.__jv(bf);}
,_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};}
,__ju:function(bg){var bh=null;if(this._computePlacementSize){var bh=this._computePlacementSize();}
else if(this.isVisible()){var bh=this.getBounds();}
;if(bh==null){this.addListenerOnce(D,function(){this.__ju(bg);}
,this);}
else {bg.call(this,bh);}
;}
,__jv:function(bi){this.__ju(function(bj){var bk=qx.util.placement.Placement.compute(bj,this.getLayoutParent().getBounds(),bi,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());this.removeState(p);this.removeState(o);this.addState(bi.left<bk.left?o:p);this.moveTo(bk.left,bk.top);}
);}
},destruct:function(){this.__jt();}
});}
)();
(function(){var f="Number",e="_applyTimeoutInterval",d="qx.event.type.Event",c="qx.event.Idle",b="singleton",a="interval";qx.Class.define(c,{extend:qx.core.Object,type:b,construct:function(){qx.core.Object.call(this);var g=new qx.event.Timer(this.getTimeoutInterval());g.addListener(a,this._onInterval,this);g.start();this.__jw=g;}
,events:{"interval":d},properties:{timeoutInterval:{check:f,init:100,apply:e}},members:{__jw:null,_applyTimeoutInterval:function(h){this.__jw.setInterval(h);}
,_onInterval:function(){this.fireEvent(a);}
},destruct:function(){if(this.__jw){this.__jw.stop();}
;this.__jw=null;}
});}
)();
(function(){var p="-",o="best-fit",n="qx.util.placement.Placement",m="keep-align",l="Invalid 'mode' argument!'",k='__jx',j="direct",i="align-start",h="edge-start",g="align-end",c="Class",f="edge-end",e="bottom",b="left",a="top",d="right";qx.Class.define(n,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__jx=qx.util.placement.DirectAxis;}
,properties:{axisX:{check:c},axisY:{check:c},edge:{check:[a,d,e,b],init:a},align:{check:[a,d,e,b],init:d}},statics:{__jy:null,compute:function(q,r,s,t,u,v,w){this.__jy=this.__jy||new qx.util.placement.Placement();var z=u.split(p);var y=z[0];var x=z[1];this.__jy.set({axisX:this.__jC(v),axisY:this.__jC(w),edge:y,align:x});return this.__jy.compute(q,r,s,t);}
,__jz:null,__jA:null,__jB:null,__jC:function(A){switch(A){case j:this.__jz=this.__jz||qx.util.placement.DirectAxis;return this.__jz;case m:this.__jA=this.__jA||qx.util.placement.KeepAlignAxis;return this.__jA;case o:this.__jB=this.__jB||qx.util.placement.BestFitAxis;return this.__jB;default:throw new Error(l);};}
},members:{__jx:null,compute:function(B,C,D,E){{}
;var F=this.getAxisX()||this.__jx;var H=F.computeStart(B.width,{start:D.left,end:D.right},{start:E.left,end:E.right},C.width,this.__jD());var G=this.getAxisY()||this.__jx;var top=G.computeStart(B.height,{start:D.top,end:D.bottom},{start:E.top,end:E.bottom},C.height,this.__jE());return {left:H,top:top};}
,__jD:function(){var J=this.getEdge();var I=this.getAlign();if(J==b){return h;}
else if(J==d){return f;}
else if(I==b){return i;}
else if(I==d){return g;}
;;;}
,__jE:function(){var L=this.getEdge();var K=this.getAlign();if(L==a){return h;}
else if(L==e){return f;}
else if(K==a){return i;}
else if(K==e){return g;}
;;;}
},destruct:function(){this._disposeObjects(k);}
});}
)();
(function(){var f="align-start",e="align-end",d="qx.util.placement.AbstractAxis",c="edge-start",b="abstract method call!",a="edge-end";qx.Bootstrap.define(d,{extend:Object,statics:{computeStart:function(g,h,i,j,k){throw new Error(b);}
,_moveToEdgeAndAlign:function(l,m,n,o){switch(o){case c:return m.start-n.end-l;case a:return m.end+n.start;case f:return m.start+n.start;case e:return m.end-n.end-l;};}
,_isInRange:function(p,q,r){return p>=0&&p+q<=r;}
}});}
)();
(function(){var a="qx.util.placement.DirectAxis";qx.Bootstrap.define(a,{statics:{_moveToEdgeAndAlign:qx.util.placement.AbstractAxis._moveToEdgeAndAlign,computeStart:function(b,c,d,e,f){return this._moveToEdgeAndAlign(b,c,d,f);}
}});}
)();
(function(){var c="qx.util.placement.KeepAlignAxis",b="edge-start",a="edge-end";qx.Bootstrap.define(c,{statics:{_moveToEdgeAndAlign:qx.util.placement.AbstractAxis._moveToEdgeAndAlign,_isInRange:qx.util.placement.AbstractAxis._isInRange,computeStart:function(d,e,f,g,h){var i=this._moveToEdgeAndAlign(d,e,f,h);var j,k;if(this._isInRange(i,d,g)){return i;}
;if(h==b||h==a){j=e.start-f.end;k=e.end+f.start;}
else {j=e.end-f.end;k=e.start+f.start;}
;if(j>g-k){i=j-d;}
else {i=k;}
;return i;}
}});}
)();
(function(){var a="qx.util.placement.BestFitAxis";qx.Bootstrap.define(a,{statics:{_isInRange:qx.util.placement.AbstractAxis._isInRange,_moveToEdgeAndAlign:qx.util.placement.AbstractAxis._moveToEdgeAndAlign,computeStart:function(b,c,d,e,f){var g=this._moveToEdgeAndAlign(b,c,d,f);if(this._isInRange(g,b,e)){return g;}
;if(g<0){g=Math.min(0,e-b);}
;if(g+b>e){g=Math.max(0,e-b);}
;return g;}
}});}
)();
(function(){var j="Image could not be loaded: ",i="Boolean",h="px",g="engine.version",f="scale",e="changeSource",d="qx.ui.basic.Image",c="loaded",b="-disabled.$1",a="loadingFailed",A="String",z="__jF",y="_applySource",x="img",w="image",v="mshtml",u="_applyScale",t="no-repeat",s=".png",r="div",p="replacement",q="qx.event.type.Event",n="engine.name",o="hidden",l="alphaScaled",m="scaled",k="nonScaled";qx.Class.define(d,{extend:qx.ui.core.Widget,construct:function(B){this.__jF={};qx.ui.core.Widget.call(this);if(B){this.setSource(B);}
;}
,properties:{source:{check:A,init:null,nullable:true,event:e,apply:y,themeable:true},scale:{check:i,init:false,themeable:true,apply:u},appearance:{refine:true,init:w},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},events:{loadingFailed:q,loaded:q},members:{__jG:null,__jH:null,__gH:null,__jF:null,getContentElement:function(){return this.__jL();}
,_createContentElement:function(){return this.__jL();}
,_getContentHint:function(){return {width:this.__jG||0,height:this.__jH||0};}
,_applyEnabled:function(C,D){qx.ui.core.Widget.prototype._applyEnabled.call(this,C,D);if(this.getSource()){this._styleSource();}
;}
,_applySource:function(E){this._styleSource();}
,_applyScale:function(F){this._styleSource();}
,__jI:function(G){this.__gH=G;}
,__jJ:function(){if(this.__gH==null){var I=this.getSource();var H=false;if(I!=null){H=qx.lang.String.endsWith(I,s);}
;if(this.getScale()&&H&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__gH=l;}
else if(this.getScale()){this.__gH=m;}
else {this.__gH=k;}
;}
;return this.__gH;}
,__jK:function(J){var K;var L;if(J==l){K=true;L=r;}
else if(J==k){K=false;L=r;}
else {K=true;L=x;}
;var M=new qx.html.Image(L);M.setScale(K);M.setStyles({"overflowX":o,"overflowY":o});return M;}
,__jL:function(){var N=this.__jJ();if(this.__jF[N]==null){this.__jF[N]=this.__jK(N);}
;return this.__jF[N];}
,_styleSource:function(){var O=qx.util.AliasManager.getInstance().resolve(this.getSource());if(!O){this.getContentElement().resetSource();return;}
;this.__jM(O);if((qx.core.Environment.get(n)==v)&&parseInt(qx.core.Environment.get(g),10)<9){var P=this.getScale()?f:t;this.getContentElement().tagNameHint=qx.bom.element.Decoration.getTagName(P,O);}
;if(qx.util.ResourceManager.getInstance().has(O)){this.__jO(this.getContentElement(),O);}
else if(qx.io.ImageLoader.isLoaded(O)){this.__jP(this.getContentElement(),O);}
else {this.__jQ(this.getContentElement(),O);}
;}
,__jM:qx.core.Environment.select(n,{"mshtml":function(Q){var S=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();var R=qx.lang.String.endsWith(Q,s);if(S&&R){if(this.getScale()&&this.__jJ()!=l){this.__jI(l);}
else if(!this.getScale()&&this.__jJ()!=k){this.__jI(k);}
;}
else {if(this.getScale()&&this.__jJ()!=m){this.__jI(m);}
else if(!this.getScale()&&this.__jJ()!=k){this.__jI(k);}
;}
;this.__jN(this.__jL());}
,"default":function(T){if(this.getScale()&&this.__jJ()!=m){this.__jI(m);}
else if(!this.getScale()&&this.__jJ(k)){this.__jI(k);}
;this.__jN(this.__jL());}
}),__jN:function(U){var X=this.getContainerElement();var Y=X.getChild(0);if(Y!=U){if(Y!=null){var bb=h;var V={};var W=this.getInnerSize();if(W!=null){V.width=W.width+bb;V.height=W.height+bb;}
;var ba=this.getInsets();V.left=ba.left+bb;V.top=ba.top+bb;V.zIndex=10;U.setStyles(V,true);U.setSelectable(this.getSelectable());X.removeAt(0);X.addAt(U,0);}
;}
;}
,__jO:function(bc,bd){var bf=qx.util.ResourceManager.getInstance();if(!this.getEnabled()){var be=bd.replace(/\.([a-z]+)$/,b);if(bf.has(be)){bd=be;this.addState(p);}
else {this.removeState(p);}
;}
;if(bc.getSource()===bd){return;}
;bc.setSource(bd);this.__jS(bf.getImageWidth(bd),bf.getImageHeight(bd));}
,__jP:function(bg,bh){var bj=qx.io.ImageLoader;bg.setSource(bh);var bi=bj.getWidth(bh);var bk=bj.getHeight(bh);this.__jS(bi,bk);}
,__jQ:function(bl,bm){var bn,bo,self;var bp=qx.io.ImageLoader;{}
;if(!bp.isFailed(bm)){bp.load(bm,this.__jR,this);}
else {if(bl!=null){bl.resetSource();}
;}
;}
,__jR:function(bq,br){if(this.$$disposed===true){return;}
;if(bq!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;}
;if(br.failed){this.warn(j+bq);this.fireEvent(a);}
else if(br.aborted){return;}
else {this.fireEvent(c);}
;this._styleSource();}
,__jS:function(bs,bt){if(bs!==this.__jG||bt!==this.__jH){this.__jG=bs;this.__jH=bt;qx.ui.core.queue.Layout.add(this);}
;}
},destruct:function(){this._disposeMap(z);}
});}
)();
(function(){var g="dragdrop-cursor",f="_applyAction",e="alias",d="qx.ui.core.DragDropCursor",c="move",b="singleton",a="copy";qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:b,construct:function(){qx.ui.basic.Image.call(this);this.setZIndex(1e8);this.setDomMove(true);var h=this.getApplicationRoot();h.add(this,{left:-1000,top:-1000});}
,properties:{appearance:{refine:true,init:g},action:{check:[e,a,c],apply:f,nullable:true}},members:{_applyAction:function(i,j){if(j){this.removeState(j);}
;if(i){this.addState(i);}
;}
}});}
)();
(function(){var a="qx.ui.core.MChildrenHandling";qx.Mixin.define(a,{members:{getChildren:function(){return this._getChildren();}
,hasChildren:function(){return this._hasChildren();}
,indexOf:function(b){return this._indexOf(b);}
,add:function(c,d){this._add(c,d);}
,addAt:function(e,f,g){this._addAt(e,f,g);}
,addBefore:function(h,i,j){this._addBefore(h,i,j);}
,addAfter:function(k,l,m){this._addAfter(k,l,m);}
,remove:function(n){this._remove(n);}
,removeAt:function(o){return this._removeAt(o);}
,removeAll:function(){return this._removeAll();}
},statics:{remap:function(p){p.getChildren=p._getChildren;p.hasChildren=p._hasChildren;p.indexOf=p._indexOf;p.add=p._add;p.addAt=p._addAt;p.addBefore=p._addBefore;p.addAfter=p._addAfter;p.remove=p._remove;p.removeAt=p._removeAt;p.removeAll=p._removeAll;}
}});}
)();
(function(){var d="qx.ui.container.Composite",c="addChildWidget",b="removeChildWidget",a="qx.event.type.Data";qx.Class.define(d,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(e){qx.ui.core.Widget.call(this);if(e!=null){this._setLayout(e);}
;}
,events:{addChildWidget:a,removeChildWidget:a},members:{_afterAddChild:function(f){this.fireNonBubblingEvent(c,qx.event.type.Data,[f]);}
,_afterRemoveChild:function(g){this.fireNonBubblingEvent(b,qx.event.type.Data,[g]);}
},defer:function(h,i){qx.ui.core.MChildrenHandling.remap(i);qx.ui.core.MLayoutHandling.remap(i);}
});}
)();
(function(){var e="qx.ui.popup.Popup",d="visible",c="excluded",b="popup",a="Boolean";qx.Class.define(e,{extend:qx.ui.container.Composite,include:qx.ui.core.MPlacement,construct:function(f){qx.ui.container.Composite.call(this,f);this.initVisibility();}
,properties:{appearance:{refine:true,init:b},visibility:{refine:true,init:c},autoHide:{check:a,init:true}},members:{show:function(){if(this.getLayoutParent()==null){qx.core.Init.getApplication().getRoot().add(this);}
;qx.ui.container.Composite.prototype.show.call(this);}
,_applyVisibility:function(g,h){qx.ui.container.Composite.prototype._applyVisibility.call(this,g,h);var i=qx.ui.popup.Manager.getInstance();g===d?i.add(this):i.remove(this);}
},destruct:function(){qx.ui.popup.Manager.getInstance().remove(this);}
});}
)();
(function(){var f="blur",d="__jT",c="singleton",b="qx.ui.popup.Manager",a="mousedown";qx.Class.define(b,{type:c,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__jT=[];qx.event.Registration.addListener(document.documentElement,a,this.__jV,this,true);qx.bom.Element.addListener(window,f,this.hideAll,this);}
,members:{__jT:null,add:function(g){{}
;this.__jT.push(g);this.__jU();}
,remove:function(h){{}
;if(this.__jT){qx.lang.Array.remove(this.__jT,h);this.__jU();}
;}
,hideAll:function(){var j;var k=this.__jT;if(k){for(var i=0,l=k.length;i<l;i++){var j=k[i];j.getAutoHide()&&j.exclude();}
;}
;}
,__jU:function(){var m=1e7;for(var i=0;i<this.__jT.length;i++){this.__jT[i].setZIndex(m++);}
;}
,__jV:function(e){var o=qx.ui.core.Widget.getWidgetByElement(e.getTarget());var p=this.__jT;for(var i=0;i<p.length;i++){var n=p[i];if(!n.getAutoHide()||o==n||qx.ui.core.Widget.contains(n,o)){continue;}
;n.exclude();}
;}
},destruct:function(){qx.event.Registration.removeListener(document.documentElement,a,this.__jV,this,true);this._disposeArray(d);}
});}
)();
(function(){var l="_applyRich",k="qx.ui.tooltip.ToolTip",j="_applyIcon",i="tooltip",h="qx.ui.core.Widget",g="mouseover",f="Boolean",d="_applyLabel",c="Integer",b="String",a="atom";qx.Class.define(k,{extend:qx.ui.popup.Popup,construct:function(m,n){qx.ui.popup.Popup.call(this);this.setLayout(new qx.ui.layout.Grow);this._createChildControl(a);if(m!=null){this.setLabel(m);}
;if(n!=null){this.setIcon(n);}
;this.addListener(g,this._onMouseOver,this);}
,properties:{appearance:{refine:true,init:i},showTimeout:{check:c,init:700,themeable:true},hideTimeout:{check:c,init:4000,themeable:true},label:{check:b,nullable:true,apply:d},icon:{check:b,nullable:true,apply:j,themeable:true},rich:{check:f,init:false,apply:l},opener:{check:h,nullable:true}},members:{_createChildControlImpl:function(o,p){var q;switch(o){case a:q=new qx.ui.basic.Atom;this._add(q);break;};return q||qx.ui.popup.Popup.prototype._createChildControlImpl.call(this,o);}
,_onMouseOver:function(e){this.hide();}
,_applyIcon:function(r,s){var t=this.getChildControl(a);r==null?t.resetIcon():t.setIcon(r);}
,_applyLabel:function(u,v){var w=this.getChildControl(a);u==null?w.resetLabel():w.setLabel(u);}
,_applyRich:function(x,y){var z=this.getChildControl(a);z.setRich(x);}
}});}
)();
(function(){var e="Missing renderLayout() implementation!",d="abstract",c="It is not possible to manually set the connected widget.",b="qx.ui.layout.Abstract",a="Missing getHeightForWidth() implementation!";qx.Class.define(b,{type:d,extend:qx.core.Object,members:{__hQ:null,_invalidChildrenCache:null,__jW:null,invalidateLayoutCache:function(){this.__hQ=null;}
,renderLayout:function(f,g){this.warn(e);}
,getSizeHint:function(){if(this.__hQ){return this.__hQ;}
;return this.__hQ=this._computeSizeHint();}
,hasHeightForWidth:function(){return false;}
,getHeightForWidth:function(h){this.warn(a);return null;}
,_computeSizeHint:function(){return null;}
,invalidateChildrenCache:function(){this._invalidChildrenCache=true;}
,verifyLayoutProperty:null,_clearSeparators:function(){var i=this.__jW;if(i instanceof qx.ui.core.LayoutItem){i.clearSeparators();}
;}
,_renderSeparator:function(j,k){this.__jW.renderSeparator(j,k);}
,connectToWidget:function(l){if(l&&this.__jW){throw new Error(c);}
;this.__jW=l;this.invalidateChildrenCache();}
,_getWidget:function(){return this.__jW;}
,_applyLayoutChange:function(){if(this.__jW){this.__jW.scheduleLayoutUpdate();}
;}
,_getLayoutChildren:function(){return this.__jW.getLayoutChildren();}
},destruct:function(){this.__jW=this.__hQ=null;}
});}
)();
(function(){var a="qx.ui.layout.Grow";qx.Class.define(a,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(b,c){var g=this._getLayoutChildren();var f,h,e,d;for(var i=0,l=g.length;i<l;i++){f=g[i];h=f.getSizeHint();e=b;if(e<h.minWidth){e=h.minWidth;}
else if(e>h.maxWidth){e=h.maxWidth;}
;d=c;if(d<h.minHeight){d=h.minHeight;}
else if(d>h.maxHeight){d=h.maxHeight;}
;f.renderLayout(0,0,e,d);}
;}
,_computeSizeHint:function(){var q=this._getLayoutChildren();var o,s;var r=0,p=0;var n=0,k=0;var j=Infinity,m=Infinity;for(var i=0,l=q.length;i<l;i++){o=q[i];s=o.getSizeHint();r=Math.max(r,s.width);p=Math.max(p,s.height);n=Math.max(n,s.minWidth);k=Math.max(k,s.minHeight);j=Math.min(j,s.maxWidth);m=Math.min(m,s.maxHeight);}
;return {width:r,height:p,minWidth:n,minHeight:k,maxWidth:j,maxHeight:m};}
}});}
)();
(function(){var j="changeGap",i="changeShow",h="bottom",g="_applyCenter",f="changeIcon",e="qx.ui.basic.Atom",d="changeLabel",c="Integer",b="_applyIconPosition",a="bottom-left",y="top-left",x="top",w="right",v="_applyRich",u="_applyIcon",t="_applyShow",s="_applyLabel",r="_applyGap",q="atom",p="Boolean",n="both",o="String",l="left",m="icon",k="label";qx.Class.define(e,{extend:qx.ui.core.Widget,construct:function(z,A){{}
;qx.ui.core.Widget.call(this);this._setLayout(new qx.ui.layout.Atom());if(z!=null){this.setLabel(z);}
;if(A!=null){this.setIcon(A);}
;}
,properties:{appearance:{refine:true,init:q},label:{apply:s,nullable:true,check:o,event:d},rich:{check:p,init:false,apply:v},icon:{check:o,apply:u,nullable:true,themeable:true,event:f},gap:{check:c,nullable:false,event:j,apply:r,themeable:true,init:4},show:{init:n,check:[n,k,m],themeable:true,inheritable:true,apply:t,event:i},iconPosition:{init:l,check:[x,w,h,l,y,a],themeable:true,apply:b},center:{init:false,check:p,themeable:true,apply:g}},members:{_createChildControlImpl:function(B,C){var D;switch(B){case k:D=new qx.ui.basic.Label(this.getLabel());D.setAnonymous(true);D.setRich(this.getRich());this._add(D);if(this.getLabel()==null||this.getShow()===m){D.exclude();}
;break;case m:D=new qx.ui.basic.Image(this.getIcon());D.setAnonymous(true);this._addAt(D,0);if(this.getIcon()==null||this.getShow()===k){D.exclude();}
;break;};return D||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,B);}
,_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===m){this._excludeChildControl(k);}
else {this._showChildControl(k);}
;}
,_handleIcon:function(){if(this.getIcon()==null||this.getShow()===k){this._excludeChildControl(m);}
else {this._showChildControl(m);}
;}
,_applyLabel:function(E,F){var G=this.getChildControl(k,true);if(G){G.setValue(E);}
;this._handleLabel();}
,_applyRich:function(H,I){var J=this.getChildControl(k,true);if(J){J.setRich(H);}
;}
,_applyIcon:function(K,L){var M=this.getChildControl(m,true);if(M){M.setSource(K);}
;this._handleIcon();}
,_applyGap:function(N,O){this._getLayout().setGap(N);}
,_applyShow:function(P,Q){this._handleLabel();this._handleIcon();}
,_applyIconPosition:function(R,S){this._getLayout().setIconPosition(R);}
,_applyCenter:function(T,U){this._getLayout().setCenter(T);}
,_applySelectable:function(V,W){qx.ui.core.Widget.prototype._applySelectable.call(this,V,W);var X=this.getChildControl(k,true);if(X){this.getChildControl(k).setSelectable(V);}
;}
}});}
)();
(function(){var m="middle",l="center",k="qx.ui.layout.Atom",j="Integer",h="Boolean",g="top-left",f="bottom-left",e="left",d="right",c="_applyLayoutChange",a="top",b="bottom";qx.Class.define(k,{extend:qx.ui.layout.Abstract,properties:{gap:{check:j,init:4,apply:c},iconPosition:{check:[e,a,d,b,g,f],init:e,apply:c},center:{check:h,init:false,apply:c}},members:{verifyLayoutProperty:null,renderLayout:function(n,o){var x=qx.ui.layout.Util;var q=this.getIconPosition();var t=this._getLayoutChildren();var length=t.length;var I,top,H,r;var C,w;var A=this.getGap();var F=this.getCenter();if(q===b||q===d){var y=length-1;var u=-1;var s=-1;}
else {var y=0;var u=length;var s=1;}
;if(q==a||q==b){if(F){var B=0;for(var i=y;i!=u;i+=s){r=t[i].getSizeHint().height;if(r>0){B+=r;if(i!=y){B+=A;}
;}
;}
;top=Math.round((o-B)/2);}
else {top=0;}
;for(var i=y;i!=u;i+=s){C=t[i];w=C.getSizeHint();H=Math.min(w.maxWidth,Math.max(n,w.minWidth));r=w.height;I=x.computeHorizontalAlignOffset(l,H,n);C.renderLayout(I,top,H,r);if(r>0){top+=r+A;}
;}
;}
else {var v=n;var p=null;var E=0;for(var i=y;i!=u;i+=s){C=t[i];H=C.getSizeHint().width;if(H>0){if(!p&&C instanceof qx.ui.basic.Label){p=C;}
else {v-=H;}
;E++;}
;}
;if(E>1){var D=(E-1)*A;v-=D;}
;if(p){var w=p.getSizeHint();var z=Math.max(w.minWidth,Math.min(v,w.maxWidth));v-=z;}
;if(F&&v>0){I=Math.round(v/2);}
else {I=0;}
;for(var i=y;i!=u;i+=s){C=t[i];w=C.getSizeHint();r=Math.min(w.maxHeight,Math.max(o,w.minHeight));if(C===p){H=z;}
else {H=w.width;}
;var G=m;if(q==g){G=a;}
else if(q==f){G=b;}
;top=x.computeVerticalAlignOffset(G,w.height,o);C.renderLayout(I,top,H,r);if(H>0){I+=H+A;}
;}
;}
;}
,_computeSizeHint:function(){var T=this._getLayoutChildren();var length=T.length;var L,R;if(length===1){var L=T[0].getSizeHint();R={width:L.width,height:L.height,minWidth:L.minWidth,minHeight:L.minHeight};}
else {var P=0,Q=0;var M=0,O=0;var N=this.getIconPosition();var S=this.getGap();if(N===a||N===b){var J=0;for(var i=0;i<length;i++){L=T[i].getSizeHint();Q=Math.max(Q,L.width);P=Math.max(P,L.minWidth);if(L.height>0){O+=L.height;M+=L.minHeight;J++;}
;}
;if(J>1){var K=(J-1)*S;O+=K;M+=K;}
;}
else {var J=0;for(var i=0;i<length;i++){L=T[i].getSizeHint();O=Math.max(O,L.height);M=Math.max(M,L.minHeight);if(L.width>0){Q+=L.width;P+=L.minWidth;J++;}
;}
;if(J>1){var K=(J-1)*S;Q+=K;P+=K;}
;}
;R={minWidth:P,width:Q,minHeight:M,height:O};}
;return R;}
}});}
)();
(function(){var g="middle",f="qx.ui.layout.Util",e="left",d="center",c="top",b="bottom",a="right";qx.Class.define(f,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(h,j,k){var n,r,m,s;var o=j>k;var t=Math.abs(j-k);var u,p;var q={};for(r in h){n=h[r];q[r]={potential:o?n.max-n.value:n.value-n.min,flex:o?n.flex:1/n.flex,offset:0};}
;while(t!=0){s=Infinity;m=0;for(r in q){n=q[r];if(n.potential>0){m+=n.flex;s=Math.min(s,n.potential/n.flex);}
;}
;if(m==0){break;}
;s=Math.min(t,s*m)/m;u=0;for(r in q){n=q[r];if(n.potential>0){p=Math.min(t,n.potential,Math.ceil(s*n.flex));u+=p-s*n.flex;if(u>=1){u-=1;p-=1;}
;n.potential-=p;if(o){n.offset+=p;}
else {n.offset-=p;}
;t-=p;}
;}
;}
;return q;}
,computeHorizontalAlignOffset:function(v,w,x,y,z){if(y==null){y=0;}
;if(z==null){z=0;}
;var A=0;switch(v){case e:A=y;break;case a:A=x-w-z;break;case d:A=Math.round((x-w)/2);if(A<y){A=y;}
else if(A<z){A=Math.max(y,x-w-z);}
;break;};return A;}
,computeVerticalAlignOffset:function(B,C,D,E,F){if(E==null){E=0;}
;if(F==null){F=0;}
;var G=0;switch(B){case c:G=E;break;case b:G=D-C-F;break;case g:G=Math.round((D-C)/2);if(G<E){G=E;}
else if(G<F){G=Math.max(E,D-C-F);}
;break;};return G;}
,collapseMargins:function(H){var I=0,K=0;for(var i=0,l=arguments.length;i<l;i++){var J=arguments[i];if(J<0){K=Math.min(K,J);}
else if(J>0){I=Math.max(I,J);}
;}
;return I+K;}
,computeHorizontalGaps:function(L,M,N){if(M==null){M=0;}
;var O=0;if(N){O+=L[0].getMarginLeft();for(var i=1,l=L.length;i<l;i+=1){O+=this.collapseMargins(M,L[i-1].getMarginRight(),L[i].getMarginLeft());}
;O+=L[l-1].getMarginRight();}
else {for(var i=1,l=L.length;i<l;i+=1){O+=L[i].getMarginLeft()+L[i].getMarginRight();}
;O+=(M*(l-1));}
;return O;}
,computeVerticalGaps:function(P,Q,R){if(Q==null){Q=0;}
;var S=0;if(R){S+=P[0].getMarginTop();for(var i=1,l=P.length;i<l;i+=1){S+=this.collapseMargins(Q,P[i-1].getMarginBottom(),P[i].getMarginTop());}
;S+=P[l-1].getMarginBottom();}
else {for(var i=1,l=P.length;i<l;i+=1){S+=P[i].getMarginTop()+P[i].getMarginBottom();}
;S+=(Q*(l-1));}
;return S;}
,computeHorizontalSeparatorGaps:function(T,U,V){var Y=qx.theme.manager.Decoration.getInstance().resolve(V);var X=Y.getInsets();var W=X.left+X.right;var ba=0;for(var i=0,l=T.length;i<l;i++){var bb=T[i];ba+=bb.getMarginLeft()+bb.getMarginRight();}
;ba+=(U+W+U)*(l-1);return ba;}
,computeVerticalSeparatorGaps:function(bc,bd,be){var bh=qx.theme.manager.Decoration.getInstance().resolve(be);var bg=bh.getInsets();var bf=bg.top+bg.bottom;var bi=0;for(var i=0,l=bc.length;i<l;i++){var bj=bc[i];bi+=bj.getMarginTop()+bj.getMarginBottom();}
;bi+=(bd+bf+bd)*(l-1);return bi;}
,arrangeIdeals:function(bk,bl,bm,bn,bo,bp){if(bl<bk||bo<bn){if(bl<bk&&bo<bn){bl=bk;bo=bn;}
else if(bl<bk){bo-=(bk-bl);bl=bk;if(bo<bn){bo=bn;}
;}
else if(bo<bn){bl-=(bn-bo);bo=bn;if(bl<bk){bl=bk;}
;}
;;}
;if(bl>bm||bo>bp){if(bl>bm&&bo>bp){bl=bm;bo=bp;}
else if(bl>bm){bo+=(bl-bm);bl=bm;if(bo>bp){bo=bp;}
;}
else if(bo>bp){bl+=(bo-bp);bo=bp;if(bl>bm){bl=bm;}
;}
;;}
;return {begin:bl,end:bo};}
}});}
)();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IStringForm";qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;}
,resetValue:function(){}
,getValue:function(){}
}});}
)();
(function(){var k="os.name",j="_applyTextAlign",i="qx.ui.core.Widget",h="nowrap",g="changeStatus",f="changeTextAlign",d="_applyWrap",c="changeValue",b="qx.ui.basic.Label",a="osx",J="css.textoverflow",I="html.xul",H="_applyValue",G="center",F="_applyBuddy",E="String",D="whiteSpace",C="textAlign",B="engine.version",A="right",r="gecko",s="justify",p="changeRich",q="normal",n="_applyRich",o="engine.name",l="click",m="label",t="left",u="A",w="Boolean",v="enabled",y="changeLocale",x="color",z="qx.dynlocale";qx.Class.define(b,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(K){qx.ui.core.Widget.call(this);if(K!=null){this.setValue(K);}
;if(qx.core.Environment.get(z)){qx.locale.Manager.getInstance().addListener(y,this._onChangeLocale,this);}
;}
,properties:{rich:{check:w,init:false,event:p,apply:n},wrap:{check:w,init:true,apply:d},value:{check:E,apply:H,event:c,nullable:true},buddy:{check:i,apply:F,nullable:true,init:null,dereference:true},textAlign:{check:[t,G,A,s],nullable:true,themeable:true,apply:j,event:f},appearance:{refine:true,init:m},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__jX:null,__jY:null,__ka:null,__kb:null,__kc:null,_getContentHint:function(){if(this.__jY){this.__kd=this.__ke();delete this.__jY;}
;return {width:this.__kd.width,height:this.__kd.height};}
,_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();}
,_applySelectable:function(L){if(!qx.core.Environment.get(J)&&qx.core.Environment.get(I)){if(L&&!this.isRich()){{}
;return;}
;}
;qx.ui.core.Widget.prototype._applySelectable.call(this,L);}
,_getContentHeightForWidth:function(M){if(!this.getRich()&&!this.getWrap()){return null;}
;return this.__ke(M).height;}
,_createContentElement:function(){return new qx.html.Label;}
,_applyTextAlign:function(N,O){this.getContentElement().setStyle(C,N);}
,_applyTextColor:function(P,Q){if(P){this.getContentElement().setStyle(x,qx.theme.manager.Color.getInstance().resolve(P));}
else {this.getContentElement().removeStyle(x);}
;}
,__kd:{width:0,height:0},_applyFont:function(R,S){if(S&&this.__jX&&this.__kc){this.__jX.removeListenerById(this.__kc);this.__kc=null;}
;var T;if(R){this.__jX=qx.theme.manager.Font.getInstance().resolve(R);if(this.__jX instanceof qx.bom.webfonts.WebFont){this.__kc=this.__jX.addListener(g,this._onWebFontStatusChange,this);}
;T=this.__jX.getStyles();}
else {this.__jX=null;T=qx.bom.Font.getDefaultStyles();}
;if(this.getTextColor()!=null){delete T[x];}
;this.getContentElement().setStyles(T);this.__jY=true;qx.ui.core.queue.Layout.add(this);}
,__ke:function(U){var Y=qx.bom.Label;var W=this.getFont();var V=W?this.__jX.getStyles():qx.bom.Font.getDefaultStyles();var content=this.getValue()||u;var X=this.getRich();if(this.__kc){this.__kf();}
;return X?Y.getHtmlSize(content,V,U):Y.getTextSize(content,V);}
,__kf:function(){if(qx.core.Environment.get(k)==a&&qx.core.Environment.get(o)==r&&parseInt(qx.core.Environment.get(B),10)>9){if(!this.getContentElement()){return;}
;var ba=this.getContentElement().getDomElement();if(ba){ba.innerHTML=ba.innerHTML;}
;}
;}
,_applyBuddy:function(bb,bc){if(bc!=null){bc.removeBinding(this.__ka);this.__ka=null;this.removeListenerById(this.__kb);this.__kb=null;}
;if(bb!=null){this.__ka=bb.bind(v,this,v);this.__kb=this.addListener(l,function(){if(bb.isFocusable()){bb.focus.apply(bb);}
;}
,this);}
;}
,_applyRich:function(bd){this.getContentElement().setRich(bd);this.__jY=true;qx.ui.core.queue.Layout.add(this);}
,_applyWrap:function(be,bf){if(be&&!this.isRich()){{}
;}
;if(this.isRich()){var bg=be?q:h;this.getContentElement().setStyle(D,bg);}
;}
,_onChangeLocale:qx.core.Environment.select(z,{"true":function(e){var content=this.getValue();if(content&&content.translate){this.setValue(content.translate());}
;}
,"false":null}),_onWebFontStatusChange:function(bh){if(bh.getData().valid===true){this.__jY=true;qx.ui.core.queue.Layout.add(this);}
;}
,_applyValue:function(bi,bj){this.getContentElement().setValue(bi);this.__jY=true;qx.ui.core.queue.Layout.add(this);}
},destruct:function(){if(qx.core.Environment.get(z)){qx.locale.Manager.getInstance().removeListener(y,this._onChangeLocale,this);}
;if(this.__ka!=null){var bk=this.getBuddy();if(bk!=null&&!bk.isDisposed()){bk.removeBinding(this.__ka);}
;}
;if(this.__jX&&this.__kc){this.__jX.removeListenerById(this.__kc);}
;this.__jX=this.__ka=null;}
});}
)();
(function(){var c="qx.html.Label",b="The label mode cannot be modified after initial creation",a="value";qx.Class.define(c,{extend:qx.html.Element,members:{__kg:null,_applyProperty:function(name,d){qx.html.Element.prototype._applyProperty.call(this,name,d);if(name==a){var e=this.getDomElement();qx.bom.Label.setValue(e,d);}
;}
,_createDomElement:function(){var g=this.__kg;var f=qx.bom.Label.create(this._content,g);return f;}
,_copyData:function(h){return qx.html.Element.prototype._copyData.call(this,true);}
,setRich:function(i){var j=this.getDomElement();if(j){throw new Error(b);}
;i=!!i;if(this.__kg==i){return;}
;this.__kg=i;return this;}
,setValue:function(k){this._setProperty(a,k);return this;}
,getValue:function(){return this._getProperty(a);}
}});}
)();
(function(){var j="px",i="crop",h="gecko",g="end",f="browser.name",e="100%",d="chrome",c="visible",b="qx.bom.Label",a="ellipsis",E="browser.version",D="engine.version",C="mshtml",B="-1000px",A="absolute",z="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",y="nowrap",x="div",w="normal",v="engine.name",q="block",r="label",o="text",p="value",m="",n="hidden",k="auto",l="0",s="inherit",t="html.xul",u="css.textoverflow";qx.Bootstrap.define(b,{statics:{__kh:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__ki:function(){var F=this.__kk(false);document.body.insertBefore(F,document.body.firstChild);return this._textElement=F;}
,__kj:function(){var G=this.__kk(true);document.body.insertBefore(G,document.body.firstChild);return this._htmlElement=G;}
,__kk:function(H){var I=qx.dom.Element.create(x);var J=I.style;J.width=J.height=k;J.left=J.top=B;J.visibility=n;J.position=A;J.overflow=c;J.display=q;if(H){J.whiteSpace=w;}
else {J.whiteSpace=y;if(!qx.core.Environment.get(u)&&qx.core.Environment.get(t)){var K=document.createElementNS(z,r);var J=K.style;J.padding=l;J.margin=l;J.width=k;for(var L in this.__kh){J[L]=s;}
;I.appendChild(K);}
;}
;return I;}
,__kl:function(M){var N={};if(M){N.whiteSpace=w;}
else if(!qx.core.Environment.get(u)&&qx.core.Environment.get(t)){N.display=q;}
else {N.overflow=n;N.whiteSpace=y;N[qx.core.Environment.get(u)]=a;}
;return N;}
,create:function(content,O,P){if(!P){P=window;}
;var Q=P.document.createElement(x);if(O){Q.useHtml=true;}
else if(!qx.core.Environment.get(u)&&qx.core.Environment.get(t)){var S=P.document.createElementNS(z,r);var R=S.style;R.cursor=s;R.color=s;R.overflow=n;R.maxWidth=e;R.padding=l;R.margin=l;R.width=k;for(var T in this.__kh){S.style[T]=s;}
;S.setAttribute(i,g);Q.appendChild(S);}
else {qx.bom.element.Style.setStyles(Q,this.__kl(O));}
;if(content){this.setValue(Q,content);}
;return Q;}
,setValue:function(U,V){V=V||m;if(U.useHtml){U.innerHTML=V;}
else if(!qx.core.Environment.get(u)&&qx.core.Environment.get(t)){U.firstChild.setAttribute(p,V);}
else {qx.bom.element.Attribute.set(U,o,V);}
;}
,getValue:function(W){if(W.useHtml){return W.innerHTML;}
else if(!qx.core.Environment.get(u)&&qx.core.Environment.get(t)){return W.firstChild.getAttribute(p)||m;}
else {return qx.bom.element.Attribute.get(W,o);}
;}
,getHtmlSize:function(content,X,Y){var ba=this._htmlElement||this.__kj();ba.style.width=Y!=undefined?Y+j:k;ba.innerHTML=content;return this.__km(ba,X);}
,getTextSize:function(bb,bc){var bd=this._textElement||this.__ki();if(!qx.core.Environment.get(u)&&qx.core.Environment.get(t)){bd.firstChild.setAttribute(p,bb);}
else {qx.bom.element.Attribute.set(bd,o,bb);}
;return this.__km(bd,bc);}
,__km:function(be,bf){var bg=this.__kh;if(!bf){bf={};}
;for(var bh in bg){be.style[bh]=bf[bh]||m;}
;var bi=qx.bom.element.Dimension.getSize(be);if((qx.core.Environment.get(v)==h)){bi.width++;}
;if((qx.core.Environment.get(v)==C)&&parseFloat(qx.core.Environment.get(D))>=9){bi.width++;}
;if(qx.core.Environment.get(f)==d&&parseFloat(qx.core.Environment.get(E))>=22){bi.width++;}
;return bi;}
}});}
)();
(function(){var b="qx.ui.form.IForm",a="qx.event.type.Data";qx.Interface.define(b,{events:{"changeEnabled":a,"changeValid":a,"changeInvalidMessage":a,"changeRequired":a},members:{setEnabled:function(c){return arguments.length==1;}
,getEnabled:function(){}
,setRequired:function(d){return arguments.length==1;}
,getRequired:function(){}
,setValid:function(e){return arguments.length==1;}
,getValid:function(){}
,setInvalidMessage:function(f){return arguments.length==1;}
,getInvalidMessage:function(){}
,setRequiredInvalidMessage:function(g){return arguments.length==1;}
,getRequiredInvalidMessage:function(){}
}});}
)();
(function(){var a="qx.application.Standalone";qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);}
}});}
)();
(function(){var i="_applyActiveWindow",h="__kn",g="qx.ui.window.MDesktop",f="__eQ",d="changeModal",c="changeVisibility",b="changeActive",a="qx.ui.window.Window";qx.Mixin.define(g,{properties:{activeWindow:{check:a,apply:i,init:null,nullable:true}},members:{__kn:null,__eQ:null,getWindowManager:function(){if(!this.__eQ){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());}
;return this.__eQ;}
,supportsMaximize:function(){return true;}
,setWindowManager:function(j){if(this.__eQ){this.__eQ.setDesktop(null);}
;j.setDesktop(this);this.__eQ=j;}
,_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());}
else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);}
;}
,_applyActiveWindow:function(k,l){this.getWindowManager().changeActiveWindow(k,l);this.getWindowManager().updateStack();}
,_onChangeModal:function(e){this.getWindowManager().updateStack();}
,_onChangeVisibility:function(){this.getWindowManager().updateStack();}
,_afterAddChild:function(m){if(qx.Class.isDefined(a)&&m instanceof qx.ui.window.Window){this._addWindow(m);}
;}
,_addWindow:function(n){if(!qx.lang.Array.contains(this.getWindows(),n)){this.getWindows().push(n);n.addListener(b,this._onChangeActive,this);n.addListener(d,this._onChangeModal,this);n.addListener(c,this._onChangeVisibility,this);}
;if(n.getActive()){this.setActiveWindow(n);}
;this.getWindowManager().updateStack();}
,_afterRemoveChild:function(o){if(qx.Class.isDefined(a)&&o instanceof qx.ui.window.Window){this._removeWindow(o);}
;}
,_removeWindow:function(p){qx.lang.Array.remove(this.getWindows(),p);p.removeListener(b,this._onChangeActive,this);p.removeListener(d,this._onChangeModal,this);p.removeListener(c,this._onChangeVisibility,this);this.getWindowManager().updateStack();}
,getWindows:function(){if(!this.__kn){this.__kn=[];}
;return this.__kn;}
},destruct:function(){this._disposeArray(h);this._disposeObjects(f);}
});}
)();
(function(){var f="_applyBlockerColor",e="Number",d="qx.ui.core.MBlocker",c="_applyBlockerOpacity",b="Color",a="__ko";qx.Mixin.define(d,{construct:function(){this.__ko=this._createBlocker();}
,properties:{blockerColor:{check:b,init:null,nullable:true,apply:f,themeable:true},blockerOpacity:{check:e,init:1,apply:c,themeable:true}},members:{__ko:null,_createBlocker:function(){return new qx.ui.core.Blocker(this);}
,_applyBlockerColor:function(g,h){this.__ko.setColor(g);}
,_applyBlockerOpacity:function(i,j){this.__ko.setOpacity(i);}
,block:function(){this.__ko.block();}
,isBlocked:function(){return this.__ko.isBlocked();}
,unblock:function(){this.__ko.unblock();}
,forceUnblock:function(){this.__ko.forceUnblock();}
,blockContent:function(k){this.__ko.blockContent(k);}
,isContentBlocked:function(){return this.__ko.isContentBlocked();}
,unblockContent:function(){this.__ko.unblockContent();}
,forceUnblockContent:function(){this.__ko.forceUnblockContent();}
,getBlocker:function(){return this.__ko;}
},destruct:function(){this._disposeObjects(a);}
});}
)();
(function(){var l="backgroundColor",k="_applyOpacity",j="Boolean",h="__kt",g="opacity",f="interval",d="Tab",c="Color",b="qx.ui.root.Page",a="__jw",A="Number",z="qx.ui.core.Blocker",y="qx.ui.root.Application",x="__ko",w="_applyColor",v="px",u="keydown",t="deactivate",s="qx.event.type.Event",r="resize",p="keyup",q="keypress",n="unblocked",o="blocked",m="zIndex";qx.Class.define(z,{extend:qx.core.Object,events:{blocked:s,unblocked:s},construct:function(B){qx.core.Object.call(this);this._widget=B;this._isPageRoot=(qx.Class.isDefined(b)&&B instanceof qx.ui.root.Page);if(this._isPageRoot){B.addListener(r,this.__kv,this);}
;if(qx.Class.isDefined(y)&&B instanceof qx.ui.root.Application){this.setKeepBlockerActive(true);}
;this.__kp=[];this.__kq=[];this.__kr=[];}
,properties:{color:{check:c,init:null,nullable:true,apply:w,themeable:true},opacity:{check:A,init:1,apply:k,themeable:true},keepBlockerActive:{check:j,init:false}},members:{__ko:null,__ks:0,__kt:null,__kr:null,__kp:null,__kq:null,__ku:null,__jw:null,_isPageRoot:false,_widget:null,__kv:function(e){var C=e.getData();if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:C.width,height:C.height});}
;if(this.isBlocked()){this.getBlockerElement().setStyles({width:C.width,height:C.height});}
;}
,_applyColor:function(D,E){var F=qx.theme.manager.Color.getInstance().resolve(D);this.__kw(l,F);}
,_applyOpacity:function(G,H){this.__kw(g,G);}
,__kw:function(I,J){var K=[];this.__ko&&K.push(this.__ko);this.__kt&&K.push(this.__kt);for(var i=0;i<K.length;i++){K[i].setStyle(I,J);}
;}
,_backupActiveWidget:function(){var L=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);this.__kp.push(L.getActive());this.__kq.push(L.getFocus());if(this._widget.isFocusable()){this._widget.focus();}
;}
,_restoreActiveWidget:function(){var O=this.__kp.length;if(O>0){var N=this.__kp[O-1];if(N){qx.bom.Element.activate(N);}
;this.__kp.pop();}
;var M=this.__kq.length;if(M>0){var N=this.__kq[M-1];if(N){qx.bom.Element.focus(this.__kq[M-1]);}
;this.__kq.pop();}
;}
,__kx:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());}
,getBlockerElement:function(){if(!this.__ko){this.__ko=this.__kx();this.__ko.setStyle(m,15);this._widget.getContainerElement().add(this.__ko);this.__ko.exclude();}
;return this.__ko;}
,block:function(){this.__ks++;if(this.__ks<2){this._backupActiveWidget();var P=this.getBlockerElement();P.include();P.activate();P.addListener(t,this.__kC,this);P.addListener(q,this.__kB,this);P.addListener(u,this.__kB,this);P.addListener(p,this.__kB,this);this.fireEvent(o,qx.event.type.Event);}
;}
,isBlocked:function(){return this.__ks>0;}
,unblock:function(){if(!this.isBlocked()){return;}
;this.__ks--;if(this.__ks<1){this.__ky();this.__ks=0;}
;}
,forceUnblock:function(){if(!this.isBlocked()){return;}
;this.__ks=0;this.__ky();}
,__ky:function(){this._restoreActiveWidget();var Q=this.getBlockerElement();Q.removeListener(t,this.__kC,this);Q.removeListener(q,this.__kB,this);Q.removeListener(u,this.__kB,this);Q.removeListener(p,this.__kB,this);Q.exclude();this.fireEvent(n,qx.event.type.Event);}
,getContentBlockerElement:function(){if(!this.__kt){this.__kt=this.__kx();this._widget.getContentElement().add(this.__kt);this.__kt.exclude();}
;return this.__kt;}
,blockContent:function(R){var S=this.getContentBlockerElement();S.setStyle(m,R);this.__kr.push(R);if(this.__kr.length<2){S.include();if(this._isPageRoot){if(!this.__jw){this.__jw=new qx.event.Timer(300);this.__jw.addListener(f,this.__kA,this);}
;this.__jw.start();this.__kA();}
;this.fireEvent(o,qx.event.type.Event);}
;}
,isContentBlocked:function(){return this.__kr.length>0;}
,unblockContent:function(){if(!this.isContentBlocked()){return;}
;this.__kr.pop();var T=this.__kr[this.__kr.length-1];var U=this.getContentBlockerElement();U.setStyle(m,T);if(this.__kr.length<1){this.__kz();this.__kr=[];}
;}
,forceUnblockContent:function(){if(!this.isContentBlocked()){return;}
;this.__kr=[];var V=this.getContentBlockerElement();V.setStyle(m,null);this.__kz();}
,__kz:function(){this.getContentBlockerElement().exclude();if(this._isPageRoot){this.__jw.stop();}
;this.fireEvent(n,qx.event.type.Event);}
,__kA:function(){var W=this._widget.getContainerElement().getDomElement();var X=qx.dom.Node.getDocument(W);this.getContentBlockerElement().setStyles({height:X.documentElement.scrollHeight+v,width:X.documentElement.scrollWidth+v});}
,__kB:function(e){if(e.getKeyIdentifier()==d){e.stop();}
;}
,__kC:function(){if(this.getKeepBlockerActive()){this.getBlockerElement().activate();}
;}
},destruct:function(){if(this._isPageRoot){this._widget.removeListener(r,this.__kv,this);}
;this._disposeObjects(h,x,a);this.__ku=this.__kp=this.__kq=this._widget=this.__kr=null;}
});}
)();
(function(){var u="changeGlobalCursor",t="engine.name",s="keypress",r="Boolean",q="root",p="",o=" !important",n="input",m="_applyGlobalCursor",l="Space",d="_applyNativeHelp",k=";",h="event.help",c="qx.ui.root.Abstract",b="abstract",g="textarea",f="String",i="*",a="help",j="contextmenu";qx.Class.define(c,{type:b,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){qx.ui.core.Widget.call(this);qx.ui.core.FocusHandler.getInstance().addRoot(this);qx.ui.core.queue.Visibility.add(this);this.initNativeHelp();this.addListener(s,this.__kE,this);}
,properties:{appearance:{refine:true,init:q},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:f,nullable:true,themeable:true,apply:m,event:u},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:r,init:false,apply:d}},members:{__kD:null,isRootWidget:function(){return true;}
,getLayout:function(){return this._getLayout();}
,_applyGlobalCursor:qx.core.Environment.select(t,{"mshtml":function(v,w){}
,"default":function(x,y){var z=qx.bom.Stylesheet;var A=this.__kD;if(!A){this.__kD=A=z.createElement();}
;z.removeAllRules(A);if(x){z.addRule(A,i,qx.bom.element.Cursor.compile(x).replace(k,p)+o);}
;}
}),_applyNativeContextMenu:function(B,C){if(B){this.removeListener(j,this._onNativeContextMenu,this,true);}
else {this.addListener(j,this._onNativeContextMenu,this,true);}
;}
,_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;}
;e.preventDefault();}
,__kE:function(e){if(e.getKeyIdentifier()!==l){return;}
;var E=e.getTarget();var D=qx.ui.core.FocusHandler.getInstance();if(!D.isFocused(E)){return;}
;var F=E.getContentElement().getNodeName();if(F===n||F===g){return;}
;e.preventDefault();}
,_applyNativeHelp:function(G,H){if(qx.core.Environment.get(h)){if(H===false){qx.bom.Event.removeNativeListener(document,a,qx.lang.Function.returnFalse);}
;if(G===false){qx.bom.Event.addNativeListener(document,a,qx.lang.Function.returnFalse);}
;}
;}
},destruct:function(){this.__kD=null;}
,defer:function(I,J){qx.ui.core.MChildrenHandling.remap(J);}
});}
)();
(function(){var k="keypress",j="focusout",h="__kF",g="activate",f="Tab",d="singleton",c="deactivate",b="focusin",a="qx.ui.core.FocusHandler";qx.Class.define(a,{extend:qx.core.Object,type:d,construct:function(){qx.core.Object.call(this);this.__kF={};}
,members:{__kF:null,__kG:null,__kH:null,__kI:null,connectTo:function(m){m.addListener(k,this.__ga,this);m.addListener(b,this._onFocusIn,this,true);m.addListener(j,this._onFocusOut,this,true);m.addListener(g,this._onActivate,this,true);m.addListener(c,this._onDeactivate,this,true);}
,addRoot:function(n){this.__kF[n.$$hash]=n;}
,removeRoot:function(o){delete this.__kF[o.$$hash];}
,getActiveWidget:function(){return this.__kG;}
,isActive:function(p){return this.__kG==p;}
,getFocusedWidget:function(){return this.__kH;}
,isFocused:function(q){return this.__kH==q;}
,isFocusRoot:function(r){return !!this.__kF[r.$$hash];}
,_onActivate:function(e){var t=e.getTarget();this.__kG=t;var s=this.__kJ(t);if(s!=this.__kI){this.__kI=s;}
;}
,_onDeactivate:function(e){var u=e.getTarget();if(this.__kG==u){this.__kG=null;}
;}
,_onFocusIn:function(e){var v=e.getTarget();if(v!=this.__kH){this.__kH=v;v.visualizeFocus();}
;}
,_onFocusOut:function(e){var w=e.getTarget();if(w==this.__kH){this.__kH=null;w.visualizeBlur();}
;}
,__ga:function(e){if(e.getKeyIdentifier()!=f){return;}
;if(!this.__kI){return;}
;e.stopPropagation();e.preventDefault();var x=this.__kH;if(!e.isShiftPressed()){var y=x?this.__kN(x):this.__kL();}
else {var y=x?this.__kO(x):this.__kM();}
;if(y){y.tabFocus();}
;}
,__kJ:function(z){var A=this.__kF;while(z){if(A[z.$$hash]){return z;}
;z=z.getLayoutParent();}
;return null;}
,__kK:function(B,C){if(B===C){return 0;}
;var E=B.getTabIndex()||0;var D=C.getTabIndex()||0;if(E!=D){return E-D;}
;var J=B.getContainerElement().getDomElement();var I=C.getContainerElement().getDomElement();var H=qx.bom.element.Location;var G=H.get(J);var F=H.get(I);if(G.top!=F.top){return G.top-F.top;}
;if(G.left!=F.left){return G.left-F.left;}
;var K=B.getZIndex();var L=C.getZIndex();if(K!=L){return K-L;}
;return 0;}
,__kL:function(){return this.__kR(this.__kI,null);}
,__kM:function(){return this.__kS(this.__kI,null);}
,__kN:function(M){var N=this.__kI;if(N==M){return this.__kL();}
;while(M&&M.getAnonymous()){M=M.getLayoutParent();}
;if(M==null){return [];}
;var O=[];this.__kP(N,M,O);O.sort(this.__kK);var P=O.length;return P>0?O[0]:this.__kL();}
,__kO:function(Q){var R=this.__kI;if(R==Q){return this.__kM();}
;while(Q&&Q.getAnonymous()){Q=Q.getLayoutParent();}
;if(Q==null){return [];}
;var S=[];this.__kQ(R,Q,S);S.sort(this.__kK);var T=S.length;return T>0?S[T-1]:this.__kM();}
,__kP:function(parent,U,V){var W=parent.getLayoutChildren();var X;for(var i=0,l=W.length;i<l;i++){X=W[i];if(!(X instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(X)&&X.isEnabled()&&X.isVisible()){if(X.isTabable()&&this.__kK(U,X)<0){V.push(X);}
;this.__kP(X,U,V);}
;}
;}
,__kQ:function(parent,Y,ba){var bb=parent.getLayoutChildren();var bc;for(var i=0,l=bb.length;i<l;i++){bc=bb[i];if(!(bc instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(bc)&&bc.isEnabled()&&bc.isVisible()){if(bc.isTabable()&&this.__kK(Y,bc)>0){ba.push(bc);}
;this.__kQ(bc,Y,ba);}
;}
;}
,__kR:function(parent,bd){var be=parent.getLayoutChildren();var bf;for(var i=0,l=be.length;i<l;i++){bf=be[i];if(!(bf instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(bf)&&bf.isEnabled()&&bf.isVisible()){if(bf.isTabable()){if(bd==null||this.__kK(bf,bd)<0){bd=bf;}
;}
;bd=this.__kR(bf,bd);}
;}
;return bd;}
,__kS:function(parent,bg){var bh=parent.getLayoutChildren();var bi;for(var i=0,l=bh.length;i<l;i++){bi=bh[i];if(!(bi instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(bi)&&bi.isEnabled()&&bi.isVisible()){if(bi.isTabable()){if(bg==null||this.__kK(bi,bg)>0){bg=bi;}
;}
;bg=this.__kS(bi,bg);}
;}
;return bg;}
},destruct:function(){this._disposeMap(h);this.__kH=this.__kG=this.__kI=null;}
});}
)();
(function(){var q="resize",p="engine.name",o="paddingLeft",n="position",m="The root widget does not support decorators with 'left', or 'top' insets!",l="0px",k="webkit",j="The application could not be started due to a missing body tag in the HTML file!",i="$$widget",h="qx.ui.root.Application",c="hidden",g="div",f="paddingTop",b="The root widget does not support 'left', or 'top' paddings!",a="100%",d="absolute";qx.Class.define(h,{extend:qx.ui.root.Abstract,construct:function(r){this.__ce=qx.dom.Node.getWindow(r);this.__kT=r;qx.ui.root.Abstract.call(this);qx.event.Registration.addListener(this.__ce,q,this._onResize,this);this._setLayout(new qx.ui.layout.Canvas());qx.ui.core.queue.Layout.add(this);qx.ui.core.FocusHandler.getInstance().connectTo(this);this.getContentElement().disableScrolling();}
,members:{__ce:null,__kT:null,_createContainerElement:function(){var s=this.__kT;if((qx.core.Environment.get(p)==k)){if(!s.body){alert(j);}
;}
;var w=s.documentElement.style;var t=s.body.style;w.overflow=t.overflow=c;w.padding=w.margin=t.padding=t.margin=l;w.width=w.height=t.width=t.height=a;var v=s.createElement(g);s.body.appendChild(v);var u=new qx.html.Root(v);u.setStyle(n,d);u.setAttribute(i,this.toHashCode());return u;}
,_onResize:function(e){qx.ui.core.queue.Layout.add(this);if(qx.ui.popup&&qx.ui.popup.Manager){qx.ui.popup.Manager.getInstance().hideAll();}
;if(qx.ui.menu&&qx.ui.menu.Manager){qx.ui.menu.Manager.getInstance().hideAll();}
;}
,_computeSizeHint:function(){var x=qx.bom.Viewport.getWidth(this.__ce);var y=qx.bom.Viewport.getHeight(this.__ce);return {minWidth:x,width:x,maxWidth:x,minHeight:y,height:y,maxHeight:y};}
,_applyPadding:function(z,A,name){if(z&&(name==f||name==o)){throw new Error(b);}
;qx.ui.root.Abstract.prototype._applyPadding.call(this,z,A,name);}
,_applyDecorator:function(B,C){qx.ui.root.Abstract.prototype._applyDecorator.call(this,B,C);if(!B){return;}
;var D=this.getDecoratorElement().getInsets();if(D.left||D.top){throw new Error(m);}
;}
},destruct:function(){this.__ce=this.__kT=null;}
});}
)();
(function(){var b="qx.ui.layout.Canvas",a="number";qx.Class.define(b,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:null,renderLayout:function(c,d){var q=this._getLayoutChildren();var g,p,n;var s,top,e,f,j,h;var o,m,r,k;for(var i=0,l=q.length;i<l;i++){g=q[i];p=g.getSizeHint();n=g.getLayoutProperties();o=g.getMarginTop();m=g.getMarginRight();r=g.getMarginBottom();k=g.getMarginLeft();s=n.left!=null?n.left:n.edge;if(qx.lang.Type.isString(s)){s=Math.round(parseFloat(s)*c/100);}
;e=n.right!=null?n.right:n.edge;if(qx.lang.Type.isString(e)){e=Math.round(parseFloat(e)*c/100);}
;top=n.top!=null?n.top:n.edge;if(qx.lang.Type.isString(top)){top=Math.round(parseFloat(top)*d/100);}
;f=n.bottom!=null?n.bottom:n.edge;if(qx.lang.Type.isString(f)){f=Math.round(parseFloat(f)*d/100);}
;if(s!=null&&e!=null){j=c-s-e-k-m;if(j<p.minWidth){j=p.minWidth;}
else if(j>p.maxWidth){j=p.maxWidth;}
;s+=k;}
else {j=n.width;if(j==null){j=p.width;}
else {j=Math.round(parseFloat(j)*c/100);if(j<p.minWidth){j=p.minWidth;}
else if(j>p.maxWidth){j=p.maxWidth;}
;}
;if(e!=null){s=c-j-e-m-k;}
else if(s==null){s=k;}
else {s+=k;}
;}
;if(top!=null&&f!=null){h=d-top-f-o-r;if(h<p.minHeight){h=p.minHeight;}
else if(h>p.maxHeight){h=p.maxHeight;}
;top+=o;}
else {h=n.height;if(h==null){h=p.height;}
else {h=Math.round(parseFloat(h)*d/100);if(h<p.minHeight){h=p.minHeight;}
else if(h>p.maxHeight){h=p.maxHeight;}
;}
;if(f!=null){top=d-h-f-r-o;}
else if(top==null){top=o;}
else {top+=o;}
;}
;g.renderLayout(s,top,j,h);}
;}
,_computeSizeHint:function(){var I=0,H=0;var F=0,D=0;var B,A;var z,x;var t=this._getLayoutChildren();var w,G,v;var J,top,u,y;for(var i=0,l=t.length;i<l;i++){w=t[i];G=w.getLayoutProperties();v=w.getSizeHint();var E=w.getMarginLeft()+w.getMarginRight();var C=w.getMarginTop()+w.getMarginBottom();B=v.width+E;A=v.minWidth+E;J=G.left!=null?G.left:G.edge;if(J&&typeof J===a){B+=J;A+=J;}
;u=G.right!=null?G.right:G.edge;if(u&&typeof u===a){B+=u;A+=u;}
;I=Math.max(I,B);H=Math.max(H,A);z=v.height+C;x=v.minHeight+C;top=G.top!=null?G.top:G.edge;if(top&&typeof top===a){z+=top;x+=top;}
;y=G.bottom!=null?G.bottom:G.edge;if(y&&typeof y===a){z+=y;x+=y;}
;F=Math.max(F,z);D=Math.max(D,x);}
;return {width:I,minWidth:H,height:F,minHeight:D};}
}});}
)();
(function(){var a="qx.html.Root";qx.Class.define(a,{extend:qx.html.Element,construct:function(b){qx.html.Element.call(this);if(b!=null){this.useElement(b);}
;}
,members:{useElement:function(c){qx.html.Element.prototype.useElement.call(this,c);this.setRoot(true);qx.html.Element._modified[this.$$hash]=this;}
}});}
)();
(function(){var k="repeat",j="mousedown",i="url(",h=")",g="mouseout",f="div",d="dblclick",c="mousewheel",b="qx.html.Blocker",a="mousemove",w="mouseover",v="appear",u="click",t="mshtml",s="engine.name",r="mouseup",q="contextmenu",p="disappear",o="qx/static/blank.gif",n="absolute",l="100%",m="cursor";qx.Class.define(b,{extend:qx.html.Element,construct:function(x,y){var x=x?qx.theme.manager.Color.getInstance().resolve(x):null;var z={position:n,width:l,height:l,opacity:y||0,backgroundColor:x};if((qx.core.Environment.get(s)==t)){z.backgroundImage=i+qx.util.ResourceManager.getInstance().toUri(o)+h;z.backgroundRepeat=k;}
;qx.html.Element.call(this,f,z);this.addListener(j,this._stopPropagation,this);this.addListener(r,this._stopPropagation,this);this.addListener(u,this._stopPropagation,this);this.addListener(d,this._stopPropagation,this);this.addListener(a,this._stopPropagation,this);this.addListener(w,this._stopPropagation,this);this.addListener(g,this._stopPropagation,this);this.addListener(c,this._stopPropagation,this);this.addListener(q,this._stopPropagation,this);this.addListener(v,this.__kU,this);this.addListener(p,this.__kU,this);}
,members:{_stopPropagation:function(e){e.stopPropagation();}
,__kU:function(){var A=this.getStyle(m);this.setStyle(m,null,true);this.setStyle(m,A,true);}
}});}
)();
(function(){var a="qx.dev.unit.TestLoader";qx.Class.define(a,{extend:qx.application.Standalone,include:[qx.dev.unit.MTestLoader],members:{main:function(){qx.application.Standalone.prototype.main.call(this);qx.log.appender.Console;this.setTestNamespace(this._getClassNameFromUrl());if(window.top.jsUnitTestSuite){this.runJsUnit();return;}
;if(window==window.top){this.runStandAlone();return;}
;}
}});}
)();
(function(){var k='.qxconsole .messages{background:white;height:100%;width:100%;overflow:auto;}',j="Enter",i="px",h='.qxconsole .messages .user-result{background:white}',g='.qxconsole .messages .level-error{background:#FFE2D5}',f="div",d="user-command",c='<div class="command">',b='.qxconsole .command input:focus{outline:none;}',a='.qxconsole .messages .type-key{color:#565656;font-style:italic}',V='.qxconsole .messages .type-instance{color:#565656;font-weight:bold}',U='.qxconsole .messages div{padding:0px 4px;}',T='.qxconsole .messages .level-debug{background:white}',S='.qxconsole .messages .type-class{color:#5F3E8A;font-weight:bold}',R="DIV",Q='.qxconsole .messages .level-user{background:#E3EFE9}',P='<div class="qxconsole">',O="D",N='.qxconsole .messages .type-map{color:#CC3E8A;font-weight:bold;}',M='.qxconsole .messages .type-string{color:black;font-weight:normal;}',r='.qxconsole .control a{text-decoration:none;color:black;}',s='<div class="messages">',p='.qxconsole .messages .type-boolean{color:#15BC91;font-weight:normal;}',q='<input type="text"/>',n="clear",o='.qxconsole .command input{width:100%;border:0 none;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',l='.qxconsole .messages .type-array{color:#CC3E8A;font-weight:bold;}',m='.qxconsole{z-index:10000;width:600px;height:300px;top:0px;right:0px;position:absolute;border-left:1px solid black;color:black;border-bottom:1px solid black;color:black;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',t='.qxconsole .command{background:white;padding:2px 4px;border-top:1px solid black;}',u='.qxconsole .messages .user-command{color:blue}',B="F7",z="qx.log.appender.Console",F='.qxconsole .messages .level-info{background:#DEEDFA}',D="block",I='.qxconsole .messages .level-warn{background:#FFF7D5}',H='.qxconsole .messages .type-stringify{color:#565656;font-weight:bold}',w='.qxconsole .messages .user-error{background:#FFE2D5}',L='.qxconsole .control{background:#cdcdcd;border-bottom:1px solid black;padding:4px 8px;}',K='<div class="control"><a href="javascript:qx.log.appender.Console.clear()">Clear</a> | <a href="javascript:qx.log.appender.Console.toggle()">Hide</a></div>',J=">>> ",v="Down",x='.qxconsole .messages .type-number{color:#155791;font-weight:normal;}',y="Up",A="none",C="keypress",E='</div>',G="";qx.Class.define(z,{statics:{init:function(){var W=[m,L,r,k,U,u,h,w,T,F,I,g,Q,M,x,p,l,N,a,S,V,H,t,o,b];qx.bom.Stylesheet.createElement(W.join(G));var Y=[P,K,s,E,c,q,E,E];var ba=document.createElement(R);ba.innerHTML=Y.join(G);var X=ba.firstChild;document.body.appendChild(ba.firstChild);this.__ll=X;this.__bY=X.childNodes[1];this.__lm=X.childNodes[2].firstChild;this.__kv();qx.log.Logger.register(this);qx.core.ObjectRegistry.register(this);}
,dispose:function(){qx.event.Registration.removeListener(document.documentElement,C,this.__ga,this);qx.log.Logger.unregister(this);}
,clear:function(){this.__bY.innerHTML=G;}
,process:function(bb){this.__bY.appendChild(qx.log.appender.Util.toHtml(bb));this.__ln();}
,__ln:function(){this.__bY.scrollTop=this.__bY.scrollHeight;}
,__fd:true,toggle:function(){if(!this.__ll){this.init();}
else if(this.__ll.style.display==A){this.show();}
else {this.__ll.style.display=A;}
;}
,show:function(){if(!this.__ll){this.init();}
else {this.__ll.style.display=D;this.__bY.scrollTop=this.__bY.scrollHeight;}
;}
,__lo:[],execute:function(){var be=this.__lm.value;if(be==G){return;}
;if(be==n){return this.clear();}
;var bc=document.createElement(f);bc.innerHTML=qx.log.appender.Util.escapeHTML(J+be);bc.className=d;this.__lo.push(be);this.__lp=this.__lo.length;this.__bY.appendChild(bc);this.__ln();try{var bd=window.eval(be);}
catch(bf){qx.log.Logger.error(bf);}
;if(bd!==undefined){qx.log.Logger.debug(bd);}
;}
,__kv:function(e){this.__bY.style.height=(this.__ll.clientHeight-this.__ll.firstChild.offsetHeight-this.__ll.lastChild.offsetHeight)+i;}
,__ga:function(e){var bh=e.getKeyIdentifier();if((bh==B)||(bh==O&&e.isCtrlPressed())){this.toggle();e.preventDefault();}
;if(!this.__ll){return;}
;if(!qx.dom.Hierarchy.contains(this.__ll,e.getTarget())){return;}
;if(bh==j&&this.__lm.value!=G){this.execute();this.__lm.value=G;}
;if(bh==y||bh==v){this.__lp+=bh==y?-1:1;this.__lp=Math.min(Math.max(0,this.__lp),this.__lo.length);var bg=this.__lo[this.__lp];this.__lm.value=bg||G;this.__lm.select();}
;}
},defer:function(bi){qx.event.Registration.addListener(document.documentElement,C,bi.__ga,bi);}
});}
)();
(function(){var l="Use qx.dev.StackTrace.FORMAT_STACKTRACE instead",k="function",h="<span class='object'>",g="]:",f="&gt;",e="<span class='object' title='Object instance with hash code: ",d="FORMAT_STACK",c="string",b="level-",a="0",M="&lt;",L="<span class='offset'>",K=":",J="qx.log.appender.Util",I="&amp;",H="&#39;",G="DIV",F="<span>",E="&quot;",D="<span class='type-key'>",s="</span>:<span class='type-",t="</span>: ",q=" ",r="]</span>: ",o="?",p="</span> ",m="}",n="",u="]",v="\n",y="{",x="map",A="<span class='type-",z="[",C=", ",B="</span>",w="'>";qx.Class.define(J,{statics:{toHtml:function(N){var X=[];var U,W,P,R;X.push(L,this.formatOffset(N.offset,6),p);if(N.object){var O=N.win.qx.core.ObjectRegistry.fromHashCode(N.object);if(O){X.push(e+O.$$hash+w,O.classname,z,O.$$hash,r);}
;}
else if(N.clazz){X.push(h+N.clazz.classname,t);}
;var Q=N.items;for(var i=0,V=Q.length;i<V;i++){U=Q[i];W=U.text;if(W instanceof Array){var R=[];for(var j=0,T=W.length;j<T;j++){P=W[j];if(typeof P===c){R.push(F+this.escapeHTML(P)+B);}
else if(P.key){R.push(D+P.key+s+P.type+w+this.escapeHTML(P.text)+B);}
else {R.push(A+P.type+w+this.escapeHTML(P.text)+B);}
;}
;X.push(A+U.type+w);if(U.type===x){X.push(y,R.join(C),m);}
else {X.push(z,R.join(C),u);}
;X.push(B);}
else {X.push(A+U.type+w+this.escapeHTML(W)+p);}
;}
;var S=document.createElement(G);S.innerHTML=X.join(n);S.className=b+N.level;return S;}
,formatOffset:function(Y,length){var bc=Y.toString();var ba=(length||6)-bc.length;var bb=n;for(var i=0;i<ba;i++){bb+=a;}
;return bb+bc;}
,escapeHTML:function(bd){return String(bd).replace(/[<>&"']/g,this.__lk);}
,__lk:function(be){var bf={"<":M,">":f,"&":I,"'":H,'"':E};return bf[be]||o;}
,toText:function(bg){return this.toTextArray(bg).join(q);}
,toTextArray:function(bh){var bp=[];bp.push(this.formatOffset(bh.offset,6));if(bh.object){var bi=bh.win.qx.core.ObjectRegistry.fromHashCode(bh.object);if(bi){bp.push(bi.classname+z+bi.$$hash+g);}
;}
else if(bh.clazz){bp.push(bh.clazz.classname+K);}
;var bj=bh.items;var bm,bo;for(var i=0,bn=bj.length;i<bn;i++){bm=bj[i];bo=bm.text;if(bm.trace&&bm.trace.length>0){if(typeof (this.FORMAT_STACK)==k){qx.log.Logger.deprecatedConstantWarning(qx.log.appender.Util,d,l);bo+=v+this.FORMAT_STACK(bm.trace);}
else {bo+=v+bm.trace;}
;}
;if(bo instanceof Array){var bk=[];for(var j=0,bl=bo.length;j<bl;j++){bk.push(bo[j].text);}
;if(bm.type===x){bp.push(y,bk.join(C),m);}
else {bp.push(z,bk.join(C),u);}
;}
else {bp.push(bo);}
;}
;return bp;}
}});}
)();
(function(){var a="testrunner.TestLoader";qx.Class.define(a,{extend:qx.dev.unit.TestLoader,statics:{getInstance:function(){return this.instance;}
},members:{main:function(){testrunner.TestLoader.instance=this;qx.dev.unit.TestLoader.prototype.main.call(this);}
}});}
)();
(function(){var g="custom.test.DemoTest",f="This should never fail!",e="A rose by any other name is still a rose",d="Can false be true?!",c="You must be kidding, 3 can never be outside [1,10]!";qx.Class.define(g,{extend:qx.dev.unit.TestCase,members:{testSimple:function(){this.assertEquals(4,3+1,f);this.assertFalse(false,d);}
,testAdvanced:function(){var a=3;var b=a;this.assertIdentical(a,b,e);this.assertInRange(3,1,10,c);}
}});}
)();
(function(){var bB="black",bA="#ffffdd",bz="#b6b6b6",by="#004DAD",bx="#BABABA",bw="#005BC3",bv="#334866",bu="#CECECE",bt="#D9D9D9",bs="#D8D8D8",bh="#99C3FE",bg="#001533",bf="#B3B3B3",be="#D5D5D5",bd="#C3C3C3",bc="#DDDDDD",bb="#FF9999",ba="css.rgba",Y="#E8E8E9",X="#084FAA",bI="#C5C5C5",bJ="rgba(0, 0, 0, 0.4)",bG="#DBDBDB",bH="#4a4a4a",bE="#83BAEA",bF="#D7E7F4",bC="#07125A",bD="#FAF2F2",bK="#87AFE7",bL="#F7EAEA",bl="#777D8D",bk="#FBFBFB",bn="#CACACA",bm="#909090",bp="#9B9B9B",bo="#F0F9FE",br="#314a6e",bq="#B4B4B4",bj="#787878",bi="qx.theme.modern.Color",a="#000000",b="#26364D",c="#A7A7A7",d="#D1E4FF",e="#5CB0FD",f="#EAEAEA",g="#003B91",h="#80B4EF",i="#FF6B78",j="#949494",bP="#808080",bO="#930000",bN="#7B7B7B",bM="#C82C2C",bT="#DFDFDF",bS="#B6B6B6",bR="#0880EF",bQ="#4d4d4d",bV="#f4f4f4",bU="#7B7A7E",H="#D0D0D0",I="#f8f8f8",F="#404955",G="#959595",L="#AAAAAA",M="#F7E9E9",J="#314A6E",K="#C72B2B",D="#FAFAFA",E="#FBFCFB",r="#B2D2FF",q="#666666",t="#CBC8CD",s="#999999",n="#8EB8D6",m="#b8b8b8",p="#727272",o="#33508D",l="#F1F1F1",k="#990000",R="#00368A",S="#1a1a1a",T="#00204D",U="gray",N="#F4F4F4",O="#fffefe",P="#AFAFAF",Q="#084FAB",V="#FCFCFC",W="#CCC",B="#F2F2F2",A="#F0F0F0",z="#E8E8E8",y="#CCCCCC",x="#EFEFEF",w="#EEEEEE",v="#E4E4E4",u="#F3F3F3",C="white";qx.Theme.define(bi,{colors:{"background-application":bT,"background-pane":u,"background-light":V,"background-medium":w,"background-splitpane":P,"background-tip":bA,"background-tip-error":K,"background-odd":v,"htmlarea-background":C,"progressbar-background":C,"text-light":bm,"text-gray":bH,"text-label":S,"text-title":br,"text-input":a,"text-hovered":bg,"text-disabled":bU,"text-selected":O,"text-active":b,"text-inactive":F,"text-placeholder":t,"border-inner-scrollbar":C,"border-main":bQ,"menu-separator-top":bI,"menu-separator-bottom":D,"border-separator":bP,"border-toolbar-button-outer":bz,"border-toolbar-border-inner":I,"border-toolbar-separator-right":bV,"border-toolbar-separator-left":m,"border-input":bv,"border-inner-input":C,"border-disabled":bS,"border-pane":T,"border-button":q,"border-column":y,"border-focused":bh,"invalid":k,"border-focused-invalid":bb,"border-dragover":o,"keyboard-focus":bB,"table-pane":u,"table-focus-indicator":bR,"table-row-background-focused-selected":Q,"table-row-background-focused":h,"table-row-background-selected":Q,"table-row-background-even":u,"table-row-background-odd":v,"table-row-selected":O,"table-row":S,"table-row-line":W,"table-column-line":W,"table-header-hovered":C,"progressive-table-header":L,"progressive-table-header-border-right":B,"progressive-table-row-background-even":N,"progressive-table-row-background-odd":v,"progressive-progressbar-background":U,"progressive-progressbar-indicator-done":y,"progressive-progressbar-indicator-undone":C,"progressive-progressbar-percent-background":U,"progressive-progressbar-percent-text":C,"selected-start":by,"selected-end":R,"tabview-background":bC,"shadow":qx.core.Environment.get(ba)?bJ:s,"pane-start":bk,"pane-end":A,"group-background":z,"group-border":bq,"radiobutton-background":x,"checkbox-border":J,"checkbox-focus":bK,"checkbox-hovered":r,"checkbox-hovered-inner":d,"checkbox-inner":w,"checkbox-start":v,"checkbox-end":u,"checkbox-disabled-border":bj,"checkbox-disabled-inner":bn,"checkbox-disabled-start":H,"checkbox-disabled-end":bs,"checkbox-hovered-inner-invalid":bD,"checkbox-hovered-invalid":M,"radiobutton-checked":bw,"radiobutton-disabled":be,"radiobutton-checked-disabled":bN,"radiobutton-hovered-invalid":bL,"tooltip-error":bM,"scrollbar-start":y,"scrollbar-end":l,"scrollbar-slider-start":w,"scrollbar-slider-end":bd,"button-border-disabled":G,"button-start":A,"button-end":P,"button-disabled-start":N,"button-disabled-end":bx,"button-hovered-start":bo,"button-hovered-end":n,"button-focused":bE,"border-invalid":bO,"input-start":A,"input-end":E,"input-focused-start":bF,"input-focused-end":e,"input-focused-inner-invalid":i,"input-border-disabled":bp,"input-border-inner":C,"toolbar-start":x,"toolbar-end":bc,"window-border":T,"window-border-caption":p,"window-caption-active-text":C,"window-caption-active-start":X,"window-caption-active-end":g,"window-caption-inactive-start":B,"window-caption-inactive-end":bG,"window-statusbar-background":x,"tabview-start":V,"tabview-end":w,"tabview-inactive":bl,"tabview-inactive-start":f,"tabview-inactive-end":bu,"table-header-start":z,"table-header-end":bf,"menu-start":Y,"menu-end":bt,"menubar-start":z,"groupitem-start":c,"groupitem-end":j,"groupitem-text":C,"virtual-row-layer-background-even":C,"virtual-row-layer-background-odd":C}});}
)();
(function(){var a="custom.theme.Color";qx.Theme.define(a,{extend:qx.theme.modern.Color,colors:{}});}
)();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";qx.Theme.define(a,{title:c,aliases:{"icon":b}});}
)();
(function(){var t="monospace",s="Courier New",r="Lucida Console",q="Monaco",p="qx.theme.modern.Font",o="DejaVu Sans Mono",n="Consolas",m="Liberation Sans",l="Tahoma",k="sans-serif",d="Arial",j="Lucida Grande",g="Candara",c="Segoe UI",b="osx",f="win",e="7",h="vista",a="os.name",i="os.version";qx.Theme.define(p,{fonts:{"default":{size:(qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h))?12:11,lineHeight:1.4,family:qx.core.Environment.get(a)==b?[j]:((qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h)))?[c,g]:[l,m,d,k]},"bold":{size:(qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h))?12:11,lineHeight:1.4,family:qx.core.Environment.get(a)==b?[j]:((qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h)))?[c,g]:[l,m,d,k],bold:true},"small":{size:(qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h))?11:10,lineHeight:1.4,family:qx.core.Environment.get(a)==b?[j]:((qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h)))?[c,g]:[l,m,d,k]},"monospace":{size:11,lineHeight:1.4,family:qx.core.Environment.get(a)==b?[r,q]:((qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h)))?[n]:[n,o,s,t]}}});}
)();
(function(){var a="custom.theme.Font";qx.Theme.define(a,{extend:qx.theme.modern.Font,fonts:{}});}
)();
(function(){var eq="button-checked",ep="decoration/window/maximize-active-hovered.png",eo="keyboard-focus",en="menu-css",em="decoration/cursors/",el="icon/16/apps/office-calendar.png",ek="slidebar",ej="tooltip-error-arrow",ei="table-scroller-focus-indicator",eh="popup-css",cC="move-frame",cB="nodrop",cA="decoration/table/boolean-true.png",cz="-invalid-css",cy="menu",cx="app-header",cw="row-layer",cv="text-inactive",cu="move",ct="decoration/window/restore-active-hovered.png",ex="shadow-window",ey="tree-folder",ev="window-pane-css",ew="right.png",et="checkbox-undetermined-hovered",eu="window-incl-statusbar-css",er="tabview-page-button-bottom-inactive",es="tooltip-error",ez="window-css",eA="window-statusbar",dI="button-hovered",dH="decoration/scrollbar/scrollbar-",dK="background-tip",dJ="menubar-css",dM="scrollbar-slider-horizontal-disabled",dL="radiobutton-disabled",dO="window-resize-frame-css",dN="button-pressed",dF="table-pane",dE="decoration/window/close-active.png",v="native",w="button-invalid-shadow",x="decoration/window/minimize-active-hovered.png",y="menubar",z="icon/16/actions/dialog-cancel.png",A="tabview-page-button-top-inactive",B="tabview-page-button-left-inactive",C="menu-slidebar",D="toolbar-button-checked",E="-left",eS="decoration/tree/open-selected.png",eR="decoration/window/minimize-inactive.png",eQ="group-item-css",eP="group",eW="tabview-page-button-right-inactive",eV="decoration/window/minimize-active.png",eU="decoration/window/restore-inactive.png",eT="checkbox-checked-focused",eY="splitpane",eX="combobox/textfield",bz="decoration/window/close-active-hovered.png",bA="qx/icon/Tango/16/actions/window-close.png",bx="checkbox-pressed",by="button-disabled",bD="selected-dragover",bE="border-separator",bB="decoration/window/maximize-inactive.png",bC="dragover",bv="scrollarea",bw="scrollbar-vertical",bb="decoration/menu/checkbox-invert.gif",ba="decoration/toolbar/toolbar-handle-knob.gif",bd="icon/22/mimetypes/office-document.png",bc="table-header-cell",W="button-checked-focused",V="up.png",Y="best-fit",X="pane-css",U="decoration/tree/closed-selected.png",T="tooltip-error-arrow-left",bK="qx.theme.modern.Appearance",bL="text-active",bM="checkbox-disabled",bN="toolbar-button-hovered",bG="window-resize-frame-incl-statusbar-css",bH="decoration/form/checked.png",bI="progressive-table-header",bJ="decoration/table/select-column-order.png",bO="decoration/menu/radiobutton.gif",bP="decoration/arrows/forward.png",bo="decoration/table/descending.png",bn="decoration/form/undetermined.png",bm="tree-file",bl="window-captionbar-active",bk="checkbox-checked-hovered",bj="scrollbar-slider-vertical",bi="toolbar",bh="alias",bs="decoration/window/restore-active.png",br="decoration/table/boolean-false.png",bQ="icon/32/mimetypes/office-document.png",bR="text-gray",bS="mshtml",bT="tabview-pane",bU="decoration/arrows/rewind.png",bV="top",bW="icon/16/actions/dialog-ok.png",bX="progressbar-background",bY="engine.name",ca="table-header-cell-hovered",cK="window-statusbar-css",cJ="window",cI="browser.documentmode",cH="decoration/menu/radiobutton-invert.gif",cO="text-placeholder",cN="slider",cM="toolbar-css",cL="keep-align",cS="down.png",cR="groupitem-text",ds="tabview-page-button-top-active",dt="icon/22/places/folder.png",dq="decoration/window/maximize-active.png",dr="checkbox-checked-pressed",dn="decoration/window/close-inactive.png",dp="tabview-page-button-left-active",dl="toolbar-part",dm="decoration/splitpane/knob-vertical.png",dA=".gif",dB="table-statusbar",dT="progressive-table-header-cell-css",dS="window-captionbar-inactive",dV="copy",dU="decoration/arrows/down-invert.png",dX="decoration/menu/checkbox.gif",dW="window-caption-active-text",ea="decoration/splitpane/knob-horizontal.png",dY="group-css",dQ="icon/32/places/folder.png",dP="toolbar-separator",eH="tabview-page-button-bottom-active",eI="decoration/arrows/up-small.png",eJ="decoration/table/ascending.png",eK="decoration/arrows/up-invert.png",eD="small",eE="tabview-page-button-right-active",eF="-disabled",eG="scrollbar-horizontal",eB="progressbar",eC="checkbox-undetermined-focused",k="progressive-table-header-cell",j="menu-separator",i="tabview-pane-css",h="pane",g="htmlarea-background",f="decoration/arrows/right-invert.png",e="left.png",d="icon/16/actions/view-refresh.png",c="radiobutton-hovered",b="group-item",J="scrollbar/button",K="right",H="combobox/button",I="virtual-list",N="icon/16/places/folder.png",O="radiobutton-checked-focused",L="text-label",M="decoration/tree/closed.png",Q="table-scroller-header",R="scrollbar-slider-horizontal",cW="checkbox-hovered",cQ="checkbox-checked",de="decoration/arrows/left.png",da="radiobutton-checked",cF="button-focused",cD="text-light",bf="menu-slidebar-button",cG="tree",bq="checkbox-undetermined",bp="table-scroller-header-css",ck="text-input",cl="slidebar/button-forward",cm="background-splitpane",cn="text-hovered",co=".png",cp="decoration/tree/open.png",cq="default",cr="decoration/arrows/down-small.png",ch="datechooser",ci="slidebar/button-backward",cE="radiobutton-checked-disabled",dd="checkbox-focused",dc="radiobutton-checked-hovered",db="treevirtual-folder",di="shadow-popup",dh="icon/16/mimetypes/office-document.png",dg="background-medium",df="icon/32/places/folder-open.png",cY="icon/22/places/folder-open.png",cX="table",P="decoration/arrows/up.png",bu="decoration/form/",bt="radiobutton-focused",cP="decoration/arrows/right.png",bF="background-application",cV="invalid",cU="right-top",cT="selectbox",be="text-title",dk="icon/16/places/folder-open.png",S="radiobutton",bg="list",cb="tree-item",cc="combobox",cd="treevirtual-contract",ce="scrollbar",cf="datechooser/nav-button",cg="center",dD="checkbox",cj="treevirtual-expand",ec="",eb="textfield",ee="-invalid",ed="tooltip",eg="qx/static/blank.gif",ef="border-invalid",cs="input-disabled",dR="menu-button",dj="input",dG="input-focused-invalid",F="toolbar-button",G="spinner",dy="input-focused",dz="decoration/arrows/down.png",dw="popup",dx="cell",du="image",dv="middle",a="selected",dC="background-light",s="bold",r="text-disabled",q="groupbox",p="text-selected",o="label",n="button",m="main",l="css.boxshadow",u="css.borderradius",t="button-frame",eL="atom",eM="-css",eN="widget",eO="css.gradient.linear";qx.Theme.define(bK,{appearances:{"widget":{},"root":{style:function(fa){return {backgroundColor:bF,textColor:L,font:cq};}
},"label":{style:function(fb){return {textColor:fb.disabled?r:undefined};}
},"move-frame":{style:function(fc){return {decorator:m};}
},"resize-frame":cC,"dragdrop-cursor":{style:function(fd){var fe=cB;if(fd.copy){fe=dV;}
else if(fd.move){fe=cu;}
else if(fd.alias){fe=bh;}
;;return {source:em+fe+dA,position:cU,offset:[2,16,2,6]};}
},"image":{style:function(ff){return {opacity:!ff.replacement&&ff.disabled?0.3:1};}
},"atom":{},"atom/label":o,"atom/icon":du,"popup":{style:function(fg){var fh=qx.core.Environment.get(l);return {decorator:fh?eh:m,backgroundColor:dC,shadow:fh?undefined:di};}
},"button-frame":{alias:eL,style:function(fi){var fm,fl;var fj=[3,9];if(fi.checked&&fi.focused&&!fi.inner){fm=W;fl=undefined;fj=[1,7];}
else if(fi.disabled){fm=by;fl=undefined;}
else if(fi.pressed){fm=dN;fl=cn;}
else if(fi.checked){fm=eq;fl=undefined;}
else if(fi.hovered){fm=dI;fl=cn;}
else if(fi.focused&&!fi.inner){fm=cF;fl=undefined;fj=[1,7];}
else {fm=n;fl=undefined;}
;;;;;var fk;if(qx.core.Environment.get(u)&&qx.core.Environment.get(eO)){if(fi.invalid&&!fi.disabled){fm+=cz;}
else {fm+=eM;}
;}
else {fk=fi.invalid&&!fi.disabled?w:undefined;fj=[2,8];}
;return {decorator:fm,textColor:fl,shadow:fk,padding:fj,margin:[1,0]};}
},"button-frame/image":{style:function(fn){return {opacity:!fn.replacement&&fn.disabled?0.5:1};}
},"button":{alias:t,include:t,style:function(fo){return {center:true};}
},"hover-button":{alias:eL,include:eL,style:function(fp){var fq=fp.hovered?a:undefined;if(fq&&qx.core.Environment.get(eO)){fq+=eM;}
;return {decorator:fq,textColor:fp.hovered?p:undefined};}
},"splitbutton":{},"splitbutton/button":n,"splitbutton/arrow":{alias:n,include:n,style:function(fr,fs){return {icon:dz,padding:[fs.padding[0],fs.padding[1]-6],marginLeft:1};}
},"form-renderer-label":{include:o,style:function(){return {paddingTop:4};}
},"checkbox":{alias:eL,style:function(ft){var fu=qx.core.Environment.get(eO)&&qx.core.Environment.get(l);var fw;if(fu){if(ft.checked){fw=bH;}
else if(ft.undetermined){fw=bn;}
else {fw=eg;}
;}
else {if(ft.checked){if(ft.disabled){fw=cQ;}
else if(ft.focused){fw=eT;}
else if(ft.pressed){fw=dr;}
else if(ft.hovered){fw=bk;}
else {fw=cQ;}
;;;}
else if(ft.undetermined){if(ft.disabled){fw=bq;}
else if(ft.focused){fw=eC;}
else if(ft.hovered){fw=et;}
else {fw=bq;}
;;}
else if(!ft.disabled){if(ft.focused){fw=dd;}
else if(ft.pressed){fw=bx;}
else if(ft.hovered){fw=cW;}
;;}
;;fw=fw||dD;var fv=ft.invalid&&!ft.disabled?ee:ec;fw=bu+fw+fv+co;}
;return {icon:fw,minWidth:fu?14:undefined,gap:fu?8:6};}
},"checkbox/icon":{style:function(fx){var fz=qx.core.Environment.get(eO)&&qx.core.Environment.get(l);if(!fz){return {opacity:!fx.replacement&&fx.disabled?0.3:1};}
;var fA;if(fx.disabled){fA=bM;}
else if(fx.focused){fA=dd;}
else if(fx.hovered){fA=cW;}
else {fA=dD;}
;;fA+=fx.invalid&&!fx.disabled?ee:ec;var fy;if(fx.undetermined){fy=[2,0];}
;return {decorator:fA,padding:fy,width:12,height:10};}
},"radiobutton":{alias:eL,style:function(fB){var fC=qx.core.Environment.get(u)&&qx.core.Environment.get(l);var fE;if(fC){fE=eg;}
else {if(fB.checked&&fB.focused){fE=O;}
else if(fB.checked&&fB.disabled){fE=cE;}
else if(fB.checked&&fB.hovered){fE=dc;}
else if(fB.checked){fE=da;}
else if(fB.focused){fE=bt;}
else if(fB.hovered){fE=c;}
else {fE=S;}
;;;;;var fD=fB.invalid&&!fB.disabled?ee:ec;fE=bu+fE+fD+co;}
;return {icon:fE,gap:fC?8:6};}
},"radiobutton/icon":{style:function(fF){var fG=qx.core.Environment.get(u)&&qx.core.Environment.get(l);if(!fG){return {opacity:!fF.replacement&&fF.disabled?0.3:1};}
;var fH;if(fF.disabled&&!fF.checked){fH=dL;}
else if(fF.checked&&fF.focused){fH=O;}
else if(fF.checked&&fF.disabled){fH=cE;}
else if(fF.checked&&fF.hovered){fH=dc;}
else if(fF.checked){fH=da;}
else if(fF.focused){fH=bt;}
else if(fF.hovered){fH=c;}
else {fH=S;}
;;;;;;fH+=fF.invalid&&!fF.disabled?ee:ec;return {decorator:fH,width:12,height:10};}
},"textfield":{style:function(fI){var fN;var fL=!!fI.focused;var fM=!!fI.invalid;var fJ=!!fI.disabled;if(fL&&fM&&!fJ){fN=dG;}
else if(fL&&!fM&&!fJ){fN=dy;}
else if(fJ){fN=cs;}
else if(!fL&&fM&&!fJ){fN=ef;}
else {fN=dj;}
;;;if(qx.core.Environment.get(eO)){fN+=eM;}
;var fK;if(fI.disabled){fK=r;}
else if(fI.showingPlaceholder){fK=cO;}
else {fK=ck;}
;return {decorator:fN,padding:[2,4,1],textColor:fK};}
},"textarea":{include:eb,style:function(fO){return {padding:4};}
},"spinner":{style:function(fP){var fT;var fR=!!fP.focused;var fS=!!fP.invalid;var fQ=!!fP.disabled;if(fR&&fS&&!fQ){fT=dG;}
else if(fR&&!fS&&!fQ){fT=dy;}
else if(fQ){fT=cs;}
else if(!fR&&fS&&!fQ){fT=ef;}
else {fT=dj;}
;;;if(qx.core.Environment.get(eO)){fT+=eM;}
;return {decorator:fT};}
},"spinner/textfield":{style:function(fU){return {marginRight:2,padding:[2,4,1],textColor:fU.disabled?r:ck};}
},"spinner/upbutton":{alias:t,include:t,style:function(fV,fW){return {icon:eI,padding:[fW.padding[0]-1,fW.padding[1]-5],shadow:undefined,margin:0};}
},"spinner/downbutton":{alias:t,include:t,style:function(fX,fY){return {icon:cr,padding:[fY.padding[0]-1,fY.padding[1]-5],shadow:undefined,margin:0};}
},"datefield":cc,"datefield/button":{alias:H,include:H,style:function(ga){return {icon:el,padding:[0,3],decorator:undefined};}
},"datefield/textfield":eX,"datefield/list":{alias:ch,include:ch,style:function(gb){return {decorator:undefined};}
},"groupbox":{style:function(gc){return {legendPosition:bV};}
},"groupbox/legend":{alias:eL,style:function(gd){return {padding:[1,0,1,4],textColor:gd.invalid?cV:be,font:s};}
},"groupbox/frame":{style:function(ge){var gf=qx.core.Environment.get(u);return {padding:gf?10:12,margin:gf?1:undefined,decorator:gf?dY:eP};}
},"check-groupbox":q,"check-groupbox/legend":{alias:dD,include:dD,style:function(gg){return {padding:[1,0,1,4],textColor:gg.invalid?cV:be,font:s};}
},"radio-groupbox":q,"radio-groupbox/legend":{alias:S,include:S,style:function(gh){return {padding:[1,0,1,4],textColor:gh.invalid?cV:be,font:s};}
},"scrollarea":{style:function(gi){return {minWidth:50,minHeight:50};}
},"scrollarea/corner":{style:function(gj){return {backgroundColor:bF};}
},"scrollarea/pane":eN,"scrollarea/scrollbar-x":ce,"scrollarea/scrollbar-y":ce,"scrollbar":{style:function(gk){if(gk[v]){return {};}
;var gl=qx.core.Environment.get(eO);var gm=gk.horizontal?eG:bw;if(gl){gm+=eM;}
;return {width:gk.horizontal?undefined:16,height:gk.horizontal?16:undefined,decorator:gm,padding:1};}
},"scrollbar/slider":{alias:cN,style:function(gn){return {padding:gn.horizontal?[0,1,0,1]:[1,0,1,0]};}
},"scrollbar/slider/knob":{include:t,style:function(go){var gp=qx.core.Environment.get(eO);var gq=go.horizontal?R:bj;if(go.disabled){gq+=eF;}
;if(gp){gq+=eM;}
;return {decorator:gq,minHeight:go.horizontal?undefined:9,minWidth:go.horizontal?9:undefined,padding:undefined,margin:0};}
},"scrollbar/button":{alias:t,include:t,style:function(gr){var gu=dH;if(gr.left){gu+=e;}
else if(gr.right){gu+=ew;}
else if(gr.up){gu+=V;}
else {gu+=cS;}
;;var gt=qx.core.Environment.get(eO);if(gr.left||gr.right){var gs=gr.left?3:4;return {padding:gt?[3,0,3,gs]:[2,0,2,gs],icon:gu,width:15,height:14,margin:0};}
else {return {padding:gt?3:[3,2],icon:gu,width:14,height:15,margin:0};}
;}
},"scrollbar/button-begin":J,"scrollbar/button-end":J,"slider":{style:function(gv){var gz;var gx=!!gv.focused;var gy=!!gv.invalid;var gw=!!gv.disabled;if(gx&&gy&&!gw){gz=dG;}
else if(gx&&!gy&&!gw){gz=dy;}
else if(gw){gz=cs;}
else if(!gx&&gy&&!gw){gz=ef;}
else {gz=dj;}
;;;if(qx.core.Environment.get(eO)){gz+=eM;}
;return {decorator:gz};}
},"slider/knob":{include:t,style:function(gA){return {decorator:gA.disabled?dM:R,shadow:undefined,height:14,width:14,padding:0};}
},"list":{alias:bv,style:function(gB){var gF;var gD=!!gB.focused;var gE=!!gB.invalid;var gC=!!gB.disabled;if(gD&&gE&&!gC){gF=dG;}
else if(gD&&!gE&&!gC){gF=dy;}
else if(gC){gF=cs;}
else if(!gD&&gE&&!gC){gF=ef;}
else {gF=dj;}
;;;if(qx.core.Environment.get(eO)){gF+=eM;}
;return {backgroundColor:dC,decorator:gF};}
},"list/pane":eN,"listitem":{alias:eL,style:function(gG){var gH;if(gG.dragover){gH=gG.selected?bD:bC;}
else {gH=gG.selected?a:undefined;if(gH&&qx.core.Environment.get(eO)){gH+=eM;}
;}
;return {padding:gG.dragover?[4,4,2,4]:4,textColor:gG.selected?p:undefined,decorator:gH};}
},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:t,include:t,style:function(gI){return {padding:5,center:true,icon:gI.vertical?dz:cP};}
},"slidebar/button-backward":{alias:t,include:t,style:function(gJ){return {padding:5,center:true,icon:gJ.vertical?P:de};}
},"tabview":{style:function(gK){return {contentPadding:16};}
},"tabview/bar":{alias:ek,style:function(gL){var gM=qx.core.Environment.get(u)&&qx.core.Environment.get(l)&&qx.core.Environment.get(eO);var gN={marginBottom:gL.barTop?-1:0,marginTop:gL.barBottom?gM?-4:-7:0,marginLeft:gL.barRight?gM?-3:-5:0,marginRight:gL.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};if(gL.barTop||gL.barBottom){gN.paddingLeft=5;gN.paddingRight=7;}
else {gN.paddingTop=5;gN.paddingBottom=7;}
;return gN;}
},"tabview/bar/button-forward":{include:cl,alias:cl,style:function(gO){if(gO.barTop||gO.barBottom){return {marginTop:2,marginBottom:2};}
else {return {marginLeft:2,marginRight:2};}
;}
},"tabview/bar/button-backward":{include:ci,alias:ci,style:function(gP){if(gP.barTop||gP.barBottom){return {marginTop:2,marginBottom:2};}
else {return {marginLeft:2,marginRight:2};}
;}
},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(gQ){var gR=qx.core.Environment.get(eO)&&qx.core.Environment.get(u);return {decorator:gR?i:bT,minHeight:100,marginBottom:gQ.barBottom?-1:0,marginTop:gQ.barTop?-1:0,marginLeft:gQ.barLeft?-1:0,marginRight:gQ.barRight?-1:0};}
},"tabview-page":{alias:eN,include:eN,style:function(gS){var gT=qx.core.Environment.get(eO)&&qx.core.Environment.get(u);return {padding:gT?[4,3]:undefined};}
},"tabview-page/button":{alias:eL,style:function(gU){var hc,gX=0;var hb=0,gV=0,gY=0,ha=0;var gW=qx.core.Environment.get(u)&&qx.core.Environment.get(l)&&qx.core.Environment.get(eO);if(gU.checked){if(gU.barTop){hc=ds;gX=gW?[5,11]:[6,14];gY=gU.firstTab?0:-5;ha=gU.lastTab?0:-5;}
else if(gU.barBottom){hc=eH;gX=gW?[5,11]:[6,14];gY=gU.firstTab?0:-5;ha=gU.lastTab?0:-5;hb=3;}
else if(gU.barRight){hc=eE;gX=gW?[5,10]:[6,13];hb=gU.firstTab?0:-5;gV=gU.lastTab?0:-5;gY=2;}
else {hc=dp;gX=gW?[5,10]:[6,13];hb=gU.firstTab?0:-5;gV=gU.lastTab?0:-5;}
;;}
else {if(gU.barTop){hc=A;gX=gW?[3,9]:[4,10];hb=4;gY=gU.firstTab?5:1;ha=1;}
else if(gU.barBottom){hc=er;gX=gW?[3,9]:[4,10];gV=4;gY=gU.firstTab?5:1;ha=1;hb=3;}
else if(gU.barRight){hc=eW;gX=gW?[3,9]:[4,10];ha=5;hb=gU.firstTab?5:1;gV=1;gY=3;}
else {hc=B;gX=gW?[3,9]:[4,10];gY=5;hb=gU.firstTab?5:1;gV=1;ha=1;}
;;}
;if(hc&&gW){hc+=eM;}
;return {zIndex:gU.checked?10:5,decorator:hc,padding:gX,marginTop:hb,marginBottom:gV,marginLeft:gY,marginRight:ha,textColor:gU.disabled?r:gU.checked?bL:cv};}
},"tabview-page/button/label":{alias:o,style:function(hd){return {padding:[0,1,0,1],margin:hd.focused?0:1,decorator:hd.focused?eo:undefined};}
},"tabview-page/button/close-button":{alias:eL,style:function(he){return {icon:bA};}
},"toolbar":{style:function(hf){var hg=qx.core.Environment.get(eO);return {decorator:hg?cM:bi,spacing:2};}
},"toolbar/part":{style:function(hh){return {decorator:dl,spacing:2};}
},"toolbar/part/container":{style:function(hi){return {paddingLeft:2,paddingRight:2};}
},"toolbar/part/handle":{style:function(hj){return {source:ba,marginLeft:3,marginRight:3};}
},"toolbar-button":{alias:eL,style:function(hk){var hm;if(hk.pressed||(hk.checked&&!hk.hovered)||(hk.checked&&hk.disabled)){hm=D;}
else if(hk.hovered&&!hk.disabled){hm=bN;}
;var hl=qx.core.Environment.get(eO)&&qx.core.Environment.get(u);if(hl&&hm){hm+=eM;}
;return {marginTop:2,marginBottom:2,padding:(hk.pressed||hk.checked||hk.hovered)&&!hk.disabled||(hk.disabled&&hk.checked)?3:5,decorator:hm};}
},"toolbar-menubutton":{alias:F,include:F,style:function(hn){return {showArrow:true};}
},"toolbar-menubutton/arrow":{alias:du,include:du,style:function(ho){return {source:cr};}
},"toolbar-splitbutton":{style:function(hp){return {marginTop:2,marginBottom:2};}
},"toolbar-splitbutton/button":{alias:F,include:F,style:function(hq){return {icon:dz,marginTop:undefined,marginBottom:undefined};}
},"toolbar-splitbutton/arrow":{alias:F,include:F,style:function(hr){if(hr.pressed||hr.checked||(hr.hovered&&!hr.disabled)){var hs=1;}
else {var hs=3;}
;return {padding:hs,icon:dz,marginTop:undefined,marginBottom:undefined};}
},"toolbar-separator":{style:function(ht){return {decorator:dP,margin:7};}
},"tree":bg,"tree-item":{style:function(hu){var hv=hu.selected?a:undefined;if(hv&&qx.core.Environment.get(eO)){hv+=eM;}
;return {padding:[2,6],textColor:hu.selected?p:undefined,decorator:hv};}
},"tree-item/icon":{include:du,style:function(hw){return {paddingRight:5};}
},"tree-item/label":o,"tree-item/open":{include:du,style:function(hx){var hy;if(hx.selected&&hx.opened){hy=eS;}
else if(hx.selected&&!hx.opened){hy=U;}
else if(hx.opened){hy=cp;}
else {hy=M;}
;;return {padding:[0,5,0,2],source:hy};}
},"tree-folder":{include:cb,alias:cb,style:function(hz){var hB,hA;if(hz.small){hB=hz.opened?dk:N;hA=dk;}
else if(hz.large){hB=hz.opened?df:dQ;hA=df;}
else {hB=hz.opened?cY:dt;hA=cY;}
;return {icon:hB,iconOpened:hA};}
},"tree-file":{include:cb,alias:cb,style:function(hC){return {icon:hC.small?dh:hC.large?bQ:bd};}
},"treevirtual":cX,"treevirtual-folder":{style:function(hD){return {icon:hD.opened?dk:N};}
},"treevirtual-file":{include:db,alias:db,style:function(hE){return {icon:dh};}
},"treevirtual-line":{style:function(hF){return {icon:eg};}
},"treevirtual-contract":{style:function(hG){return {icon:cp,paddingLeft:5,paddingTop:2};}
},"treevirtual-expand":{style:function(hH){return {icon:M,paddingLeft:5,paddingTop:2};}
},"treevirtual-only-contract":cd,"treevirtual-only-expand":cj,"treevirtual-start-contract":cd,"treevirtual-start-expand":cj,"treevirtual-end-contract":cd,"treevirtual-end-expand":cj,"treevirtual-cross-contract":cd,"treevirtual-cross-expand":cj,"treevirtual-end":{style:function(hI){return {icon:eg};}
},"treevirtual-cross":{style:function(hJ){return {icon:eg};}
},"tooltip":{include:dw,style:function(hK){return {backgroundColor:dK,padding:[1,3,2,3],offset:[15,5,5,5]};}
},"tooltip/atom":eL,"tooltip-error":{include:ed,style:function(hL){var hO=qx.core.Environment.get(u)&&qx.core.Environment.get(l);var hN=es;if(hO){hN+=eM;}
;if(hL.placementLeft){hN+=E;}
;var hP=ej;if(hL.placementLeft){hP=T;if(hO){hP+=eM;}
;}
;if(hO){if(hL.placementLeft){var hM=[9,20,3,6];}
else {var hM=[6,6,7,-8];}
;}
else {if(hL.placementLeft){var hM=[6,20,3,4];}
else {var hM=[6,10,6,-10];}
;}
;if(!hO&&hL.placementLeft&&qx.core.Environment.get(bY)==bS&&qx.core.Environment.get(cI)<9){hP=undefined;hM=[5,10];}
;return {textColor:p,backgroundColor:undefined,placeMethod:eN,offset:[0,14,0,14],marginTop:-2,position:cU,showTimeout:100,hideTimeout:10000,shadow:hN,decorator:hP,font:s,padding:hM,maxWidth:333};}
},"tooltip-error/atom":eL,"window":{style:function(hQ){var hS=qx.core.Environment.get(u)&&qx.core.Environment.get(eO)&&qx.core.Environment.get(l);var hT;var hR;if(hS){if(hQ.showStatusbar){hT=eu;}
else {hT=ez;}
;}
else {hR=ex;}
;return {decorator:hT,shadow:hR,contentPadding:[10,10,10,10],margin:hQ.maximized?0:[0,5,5,0]};}
},"window-resize-frame":{style:function(hU){var hV=qx.core.Environment.get(u);var hW;if(hV){if(hU.showStatusbar){hW=bG;}
else {hW=dO;}
;}
else {hW=m;}
;return {decorator:hW};}
},"window/pane":{style:function(hX){var hY=qx.core.Environment.get(u)&&qx.core.Environment.get(eO)&&qx.core.Environment.get(l);return {decorator:hY?ev:cJ};}
},"window/captionbar":{style:function(ia){var ib=qx.core.Environment.get(u)&&qx.core.Environment.get(eO)&&qx.core.Environment.get(l);var ic=ia.active?bl:dS;if(ib){ic+=eM;}
;return {decorator:ic,textColor:ia.active?dW:bR,minHeight:26,paddingRight:2};}
},"window/icon":{style:function(id){return {margin:[5,0,3,6]};}
},"window/title":{style:function(ie){return {alignY:dv,font:s,marginLeft:6,marginRight:12};}
},"window/minimize-button":{alias:eL,style:function(ig){return {icon:ig.active?ig.hovered?x:eV:eR,margin:[4,8,2,0]};}
},"window/restore-button":{alias:eL,style:function(ih){return {icon:ih.active?ih.hovered?ct:bs:eU,margin:[5,8,2,0]};}
},"window/maximize-button":{alias:eL,style:function(ii){return {icon:ii.active?ii.hovered?ep:dq:bB,margin:[4,8,2,0]};}
},"window/close-button":{alias:eL,style:function(ij){return {icon:ij.active?ij.hovered?bz:dE:dn,margin:[4,8,2,0]};}
},"window/statusbar":{style:function(ik){var il=qx.core.Environment.get(u)&&qx.core.Environment.get(eO)&&qx.core.Environment.get(l);return {padding:[2,6],decorator:il?cK:eA,minHeight:18};}
},"window/statusbar-text":{style:function(im){return {font:eD};}
},"iframe":{style:function(io){return {decorator:m};}
},"resizer":{style:function(ip){var iq=qx.core.Environment.get(l)&&qx.core.Environment.get(u)&&qx.core.Environment.get(eO);return {decorator:iq?X:h};}
},"splitpane":{style:function(ir){return {decorator:eY};}
},"splitpane/splitter":{style:function(is){return {width:is.horizontal?3:undefined,height:is.vertical?3:undefined,backgroundColor:cm};}
},"splitpane/splitter/knob":{style:function(it){return {source:it.horizontal?ea:dm};}
},"splitpane/slider":{style:function(iu){return {width:iu.horizontal?3:undefined,height:iu.vertical?3:undefined,backgroundColor:cm};}
},"selectbox":t,"selectbox/atom":eL,"selectbox/popup":dw,"selectbox/list":{alias:bg},"selectbox/arrow":{include:du,style:function(iv){return {source:dz,paddingLeft:5};}
},"datechooser":{style:function(iw){var iA;var iy=!!iw.focused;var iz=!!iw.invalid;var ix=!!iw.disabled;if(iy&&iz&&!ix){iA=dG;}
else if(iy&&!iz&&!ix){iA=dy;}
else if(ix){iA=cs;}
else if(!iy&&iz&&!ix){iA=ef;}
else {iA=dj;}
;;;if(qx.core.Environment.get(eO)){iA+=eM;}
;return {padding:2,decorator:iA,backgroundColor:dC};}
},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:t,alias:t,style:function(iB){var iC={padding:[2,4],shadow:undefined};if(iB.lastYear){iC.icon=bU;iC.marginRight=1;}
else if(iB.lastMonth){iC.icon=de;}
else if(iB.nextYear){iC.icon=bP;iC.marginLeft=1;}
else if(iB.nextMonth){iC.icon=cP;}
;;;return iC;}
},"datechooser/last-year-button-tooltip":ed,"datechooser/last-month-button-tooltip":ed,"datechooser/next-year-button-tooltip":ed,"datechooser/next-month-button-tooltip":ed,"datechooser/last-year-button":cf,"datechooser/last-month-button":cf,"datechooser/next-month-button":cf,"datechooser/next-year-button":cf,"datechooser/month-year-label":{style:function(iD){return {font:s,textAlign:cg,textColor:iD.disabled?r:undefined};}
},"datechooser/date-pane":{style:function(iE){return {textColor:iE.disabled?r:undefined,marginTop:2};}
},"datechooser/weekday":{style:function(iF){return {textColor:iF.disabled?r:iF.weekend?cD:undefined,textAlign:cg,paddingTop:2,backgroundColor:dg};}
},"datechooser/week":{style:function(iG){return {textAlign:cg,padding:[2,4],backgroundColor:dg};}
},"datechooser/day":{style:function(iH){var iI=iH.disabled?undefined:iH.selected?a:undefined;if(iI&&qx.core.Environment.get(eO)){iI+=eM;}
;return {textAlign:cg,decorator:iI,textColor:iH.disabled?r:iH.selected?p:iH.otherMonth?cD:undefined,font:iH.today?s:undefined,padding:[2,4]};}
},"combobox":{style:function(iJ){var iN;var iL=!!iJ.focused;var iM=!!iJ.invalid;var iK=!!iJ.disabled;if(iL&&iM&&!iK){iN=dG;}
else if(iL&&!iM&&!iK){iN=dy;}
else if(iK){iN=cs;}
else if(!iL&&iM&&!iK){iN=ef;}
else {iN=dj;}
;;;if(qx.core.Environment.get(eO)){iN+=eM;}
;return {decorator:iN};}
},"combobox/popup":dw,"combobox/list":{alias:bg},"combobox/button":{include:t,alias:t,style:function(iO,iP){var iQ={icon:dz,padding:[iP.padding[0],iP.padding[1]-6],shadow:undefined,margin:undefined};if(iO.selected){iQ.decorator=cF;}
;return iQ;}
},"combobox/textfield":{include:eb,style:function(iR){return {decorator:undefined};}
},"menu":{style:function(iS){var iT=qx.core.Environment.get(eO)&&qx.core.Environment.get(l);var iU={decorator:iT?en:cy,shadow:iT?undefined:di,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:iS.submenu||iS.contextmenu?Y:cL};if(iS.submenu){iU.position=cU;iU.offset=[-2,-3];}
;return iU;}
},"menu/slidebar":C,"menu-slidebar":eN,"menu-slidebar-button":{style:function(iV){var iW=iV.hovered?a:undefined;if(iW&&qx.core.Environment.get(eO)){iW+=eM;}
;return {decorator:iW,padding:7,center:true};}
},"menu-slidebar/button-backward":{include:bf,style:function(iX){return {icon:iX.hovered?eK:P};}
},"menu-slidebar/button-forward":{include:bf,style:function(iY){return {icon:iY.hovered?dU:dz};}
},"menu-separator":{style:function(ja){return {height:0,decorator:j,margin:[4,2]};}
},"menu-button":{alias:eL,style:function(jb){var jc=jb.selected?a:undefined;if(jc&&qx.core.Environment.get(eO)){jc+=eM;}
;return {decorator:jc,textColor:jb.selected?p:undefined,padding:[4,6]};}
},"menu-button/icon":{include:du,style:function(jd){return {alignY:dv};}
},"menu-button/label":{include:o,style:function(je){return {alignY:dv,padding:1};}
},"menu-button/shortcut":{include:o,style:function(jf){return {alignY:dv,marginLeft:14,padding:1};}
},"menu-button/arrow":{include:du,style:function(jg){return {source:jg.selected?f:cP,alignY:dv};}
},"menu-checkbox":{alias:dR,include:dR,style:function(jh){return {icon:!jh.checked?undefined:jh.selected?bb:dX};}
},"menu-radiobutton":{alias:dR,include:dR,style:function(ji){return {icon:!ji.checked?undefined:ji.selected?cH:bO};}
},"menubar":{style:function(jj){var jk=qx.core.Environment.get(eO);return {decorator:jk?dJ:y};}
},"menubar-button":{alias:eL,style:function(jl){var jm=(jl.pressed||jl.hovered)&&!jl.disabled?a:undefined;if(jm&&qx.core.Environment.get(eO)){jm+=eM;}
;return {decorator:jm,textColor:jl.pressed||jl.hovered?p:undefined,padding:[3,8]};}
},"colorselector":eN,"colorselector/control-bar":eN,"colorselector/control-pane":eN,"colorselector/visual-pane":q,"colorselector/preset-grid":eN,"colorselector/colorbucket":{style:function(jn){return {decorator:m,width:16,height:16};}
},"colorselector/preset-field-set":q,"colorselector/input-field-set":{include:q,alias:q,style:function(){return {paddingTop:20};}
},"colorselector/preview-field-set":{include:q,alias:q,style:function(){return {paddingTop:20};}
},"colorselector/hex-field-composite":eN,"colorselector/hex-field":eb,"colorselector/rgb-spinner-composite":eN,"colorselector/rgb-spinner-red":G,"colorselector/rgb-spinner-green":G,"colorselector/rgb-spinner-blue":G,"colorselector/hsb-spinner-composite":eN,"colorselector/hsb-spinner-hue":G,"colorselector/hsb-spinner-saturation":G,"colorselector/hsb-spinner-brightness":G,"colorselector/preview-content-old":{style:function(jo){return {decorator:m,width:50,height:10};}
},"colorselector/preview-content-new":{style:function(jp){return {decorator:m,backgroundColor:dC,width:50,height:10};}
},"colorselector/hue-saturation-field":{style:function(jq){return {decorator:m,margin:5};}
},"colorselector/brightness-field":{style:function(jr){return {decorator:m,margin:[5,7]};}
},"colorselector/hue-saturation-pane":eN,"colorselector/hue-saturation-handle":eN,"colorselector/brightness-pane":eN,"colorselector/brightness-handle":eN,"colorpopup":{alias:dw,include:dw,style:function(js){return {padding:5,backgroundColor:bF};}
},"colorpopup/field":{style:function(jt){return {decorator:m,margin:2,width:14,height:14,backgroundColor:dC};}
},"colorpopup/selector-button":n,"colorpopup/auto-button":n,"colorpopup/preview-pane":q,"colorpopup/current-preview":{style:function(ju){return {height:20,padding:4,marginLeft:4,decorator:m,allowGrowX:true};}
},"colorpopup/selected-preview":{style:function(jv){return {height:20,padding:4,marginRight:4,decorator:m,allowGrowX:true};}
},"colorpopup/colorselector-okbutton":{alias:n,include:n,style:function(jw){return {icon:bW};}
},"colorpopup/colorselector-cancelbutton":{alias:n,include:n,style:function(jx){return {icon:z};}
},"table":{alias:eN,style:function(jy){return {decorator:cX};}
},"table/statusbar":{style:function(jz){return {decorator:dB,padding:[0,2]};}
},"table/column-button":{alias:t,style:function(jA){var jB=qx.core.Environment.get(eO);return {decorator:jB?bp:Q,padding:3,icon:bJ};}
},"table-column-reset-button":{include:dR,alias:dR,style:function(){return {icon:d};}
},"table-scroller":eN,"table-scroller/scrollbar-x":ce,"table-scroller/scrollbar-y":ce,"table-scroller/header":{style:function(jC){var jD=qx.core.Environment.get(eO);return {decorator:jD?bp:Q,textColor:jC.disabled?r:undefined};}
},"table-scroller/pane":{style:function(jE){return {backgroundColor:dF};}
},"table-scroller/focus-indicator":{style:function(jF){return {decorator:ei};}
},"table-scroller/resize-line":{style:function(jG){return {backgroundColor:bE,width:2};}
},"table-header-cell":{alias:eL,style:function(jH){return {minWidth:13,minHeight:20,padding:jH.hovered?[3,4,2,4]:[3,4],decorator:jH.hovered?ca:bc,sortIcon:jH.sorted?(jH.sortedAscending?eJ:bo):undefined};}
},"table-header-cell/label":{style:function(jI){return {minWidth:0,alignY:dv,paddingRight:5};}
},"table-header-cell/sort-icon":{style:function(jJ){return {alignY:dv,alignX:K,opacity:jJ.disabled?0.3:1};}
},"table-header-cell/icon":{style:function(jK){return {minWidth:0,alignY:dv,paddingRight:5,opacity:jK.disabled?0.3:1};}
},"table-editor-textfield":{include:eb,style:function(jL){return {decorator:undefined,padding:[2,2],backgroundColor:dC};}
},"table-editor-selectbox":{include:cT,alias:cT,style:function(jM){return {padding:[0,2],backgroundColor:dC};}
},"table-editor-combobox":{include:cc,alias:cc,style:function(jN){return {decorator:undefined,backgroundColor:dC};}
},"progressive-table-header":{alias:eN,style:function(jO){return {decorator:bI};}
},"progressive-table-header-cell":{alias:eL,style:function(jP){var jQ=qx.core.Environment.get(eO);return {minWidth:40,minHeight:25,paddingLeft:6,decorator:jQ?dT:k};}
},"app-header":{style:function(jR){return {font:s,textColor:p,padding:[8,12],decorator:cx};}
},"app-header-label":o,"virtual-list":bg,"virtual-list/row-layer":cw,"row-layer":eN,"group-item":{include:o,alias:o,style:function(jS){return {padding:4,decorator:qx.core.Environment.get(eO)?eQ:b,textColor:cR,font:s};}
},"virtual-selectbox":cT,"virtual-selectbox/dropdown":dw,"virtual-selectbox/dropdown/list":{alias:I},"virtual-combobox":cc,"virtual-combobox/dropdown":dw,"virtual-combobox/dropdown/list":{alias:I},"virtual-tree":{include:cG,alias:cG,style:function(jT){return {itemHeight:26};}
},"virtual-tree-folder":ey,"virtual-tree-file":bm,"column-layer":eN,"cell":{style:function(jU){return {textColor:jU.selected?p:L,padding:[3,6],font:cq};}
},"cell-string":dx,"cell-number":{include:dx,style:function(jV){return {textAlign:K};}
},"cell-image":dx,"cell-boolean":{include:dx,style:function(jW){return {iconTrue:cA,iconFalse:br};}
},"cell-atom":dx,"cell-date":dx,"cell-html":dx,"htmlarea":{"include":eN,style:function(jX){return {backgroundColor:g};}
},"progressbar":{style:function(jY){return {decorator:eB,padding:[1],backgroundColor:bX,width:200,height:20};}
},"progressbar/progress":{style:function(ka){var kb=ka.disabled?b:a;if(qx.core.Environment.get(eO)){kb+=eM;}
;return {decorator:kb};}
}}});}
)();
(function(){var a="custom.theme.Appearance";qx.Theme.define(a,{extend:qx.theme.modern.Appearance,appearances:{}});}
)();
(function(){var j="qx.debug.dispose",i="insetTop",h="insetBottom",g="sliceBottom",f="_applyFill",e="The value of the property 'rightSlice' is null! ",d="sliceLeft",c="_applyBaseImage",b="sliceRight",a="The value of the property 'bottomSlice' is null! ",B="String",A="The value of the property 'leftSlice' is null! ",z="insetRight",y="sliceTop",x="The value of the property 'topSlice' is null! ",w="insetLeft",v="qx.ui.decoration.Grid",u="-l",t="set",s="-t",q="-r",r="-b",o="shorthand",p="_applySlices",m="Please verify the image '",n="_applyInsets",k="' is present.",l="Number";qx.Class.define(v,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],construct:function(C,D){qx.core.Object.call(this);if(qx.ui.decoration.css3.BorderImage.IS_SUPPORTED){this.__la=new qx.ui.decoration.css3.BorderImage();if(C){this.__lb(C);}
;}
else {this.__la=new qx.ui.decoration.GridDiv(C);}
;if(D!=null){this.__la.setInsets(D);}
;if(qx.core.Environment.get(j)){this.__la.$$ignoreDisposeWarning=true;}
;}
,properties:{baseImage:{check:B,nullable:true,apply:c},insetLeft:{check:l,nullable:true,apply:n},insetRight:{check:l,nullable:true,apply:n},insetBottom:{check:l,nullable:true,apply:n},insetTop:{check:l,nullable:true,apply:n},insets:{group:[i,z,h,w],mode:o},sliceLeft:{check:l,nullable:true,apply:p},sliceRight:{check:l,nullable:true,apply:p},sliceBottom:{check:l,nullable:true,apply:p},sliceTop:{check:l,nullable:true,apply:p},slices:{group:[y,b,g,d],mode:o},fill:{apply:f}},members:{__la:null,getMarkup:function(){return this.__la.getMarkup();}
,resize:function(E,F,G){this.__la.resize(E,F,G);}
,tint:function(H,I){}
,getInsets:function(){return this.__la.getInsets();}
,_applyInsets:function(J,K,name){var L=t+qx.lang.String.firstUp(name);this.__la[L](J);}
,_applySlices:function(M,N,name){var O=t+qx.lang.String.firstUp(name);if(this.__la[O]){this.__la[O](M);}
;}
,_applyFill:function(P,Q,name){if(this.__la.setFill){this.__la.setFill(P);}
;}
,_applyBaseImage:function(R,S){if(this.__la instanceof qx.ui.decoration.GridDiv){this.__la.setBaseImage(R);}
else {this.__lb(R);}
;}
,__lb:function(T){this.__la.setBorderImage(T);var be=qx.util.AliasManager.getInstance().resolve(T);var bf=/(.*)(\.[a-z]+)$/.exec(be);var ba=bf[1];var bd=bf[2];var W=qx.util.ResourceManager.getInstance();var bg=W.getImageHeight(ba+s+bd);var U=W.getImageWidth(ba+q+bd);var V=W.getImageHeight(ba+r+bd);var bh=W.getImageWidth(ba+u+bd);if(false&&!this.__la instanceof qx.ui.decoration.css3.BorderImage){var X=x+m+ba+s+bd+k;var Y=e+m+ba+q+bd+k;var bc=a+m+ba+r+bd+k;var bb=A+m+ba+u+bd+k;qx.core.Assert.assertNotNull(bg,X);qx.core.Assert.assertNotNull(U,Y);qx.core.Assert.assertNotNull(V,bc);qx.core.Assert.assertNotNull(bh,bb);}
;if(bg&&U&&V&&bh){this.__la.setSlice([bg,U,V,bh]);}
;}
},destruct:function(){this.__la.dispose();this.__la=null;}
});}
)();
(function(){var j="css.borderimage.standardsyntax",i="Boolean",h="px ",g="sliceBottom",f="solid",e=";'></div>",d="<div style='",c="sliceLeft",b="sliceRight",a="repeatX",D=" fill",C="String",B="qx.ui.decoration.css3.BorderImage",A="border-box",z="transparent",y='") ',x="sliceTop",w='url("',v="hidden",u="repeatY",q="absolute",r="repeat",o="",p="round",m="shorthand",n="px",k=" ",l="stretch",s="Integer",t="_applyStyle";qx.Class.define(B,{extend:qx.ui.decoration.Abstract,construct:function(E,F){qx.ui.decoration.Abstract.call(this);if(E!=null){this.setBorderImage(E);}
;if(F!=null){this.setSlice(F);}
;}
,statics:{IS_SUPPORTED:qx.bom.element.Style.isPropertySupported("borderImage")},properties:{borderImage:{check:C,nullable:true,apply:t},sliceTop:{check:s,init:0,apply:t},sliceRight:{check:s,init:0,apply:t},sliceBottom:{check:s,init:0,apply:t},sliceLeft:{check:s,init:0,apply:t},slice:{group:[x,b,g,c],mode:m},repeatX:{check:[l,r,p],init:l,apply:t},repeatY:{check:[l,r,p],init:l,apply:t},repeat:{group:[a,u],mode:m},fill:{check:i,init:true}},members:{__lc:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};}
,_isInitialized:function(){return !!this.__lc;}
,getMarkup:function(){if(this.__lc){return this.__lc;}
;var G=this._resolveImageUrl(this.getBorderImage());var H=[this.getSliceTop(),this.getSliceRight(),this.getSliceBottom(),this.getSliceLeft()];var I=[this.getRepeatX(),this.getRepeatY()].join(k);var J=this.getFill()&&qx.core.Environment.get(j)?D:o;this.__lc=[d,qx.bom.element.Style.compile({"borderImage":w+G+y+H.join(k)+J+k+I,"borderStyle":f,"borderColor":z,position:q,lineHeight:0,fontSize:0,overflow:v,boxSizing:A,borderWidth:H.join(h)+n}),e].join(o);return this.__lc;}
,resize:function(K,L,M){K.style.width=L+n;K.style.height=M+n;}
,tint:function(N,O){}
,_applyStyle:function(P,Q,name){{}
;}
,_resolveImageUrl:function(R){return qx.util.ResourceManager.getInstance().toUri(qx.util.AliasManager.getInstance().resolve(R));}
},destruct:function(){this.__lc=null;}
});}
)();
(function(){var j="-tr",i="-l",h='</div>',g="scale",f="-br",e="-t",d="browser.quirksmode",c="-tl",b="-r",a='<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">',z="_applyBaseImage",y="-b",x="String",w="",v="-bl",u="qx.ui.decoration.GridDiv",t="-c",s="mshtml",r="engine.name",q="engine.version",o="scale-x",p="scale-y",m="no-repeat",n="0px",k="-1px",l="px";qx.Class.define(u,{extend:qx.ui.decoration.Abstract,construct:function(A,B){qx.ui.decoration.Abstract.call(this);if(A!=null){this.setBaseImage(A);}
;if(B!=null){this.setInsets(B);}
;}
,properties:{baseImage:{check:x,nullable:true,apply:z}},members:{_markup:null,_images:null,_edges:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};}
,_isInitialized:function(){return !!this._markup;}
,getMarkup:function(){if(this._markup){return this._markup;}
;var C=qx.bom.element.Decoration;var D=this._images;var E=this._edges;var F=[];F.push(a);F.push(C.create(D.tl,m,{top:0,left:0}));F.push(C.create(D.t,o,{top:0,left:E.left+l}));F.push(C.create(D.tr,m,{top:0,right:0}));F.push(C.create(D.bl,m,{bottom:0,left:0}));F.push(C.create(D.b,o,{bottom:0,left:E.left+l}));F.push(C.create(D.br,m,{bottom:0,right:0}));F.push(C.create(D.l,p,{top:E.top+l,left:0}));F.push(C.create(D.c,g,{top:E.top+l,left:E.left+l}));F.push(C.create(D.r,p,{top:E.top+l,right:0}));F.push(h);return this._markup=F.join(w);}
,resize:function(G,H,I){var J=this._edges;var innerWidth=H-J.left-J.right;var innerHeight=I-J.top-J.bottom;if(innerWidth<0){innerWidth=0;}
;if(innerHeight<0){innerHeight=0;}
;G.style.width=H+l;G.style.height=I+l;G.childNodes[1].style.width=innerWidth+l;G.childNodes[4].style.width=innerWidth+l;G.childNodes[7].style.width=innerWidth+l;G.childNodes[6].style.height=innerHeight+l;G.childNodes[7].style.height=innerHeight+l;G.childNodes[8].style.height=innerHeight+l;if((qx.core.Environment.get(r)==s)){if(parseFloat(qx.core.Environment.get(q))<7||(qx.core.Environment.get(d)&&parseFloat(qx.core.Environment.get(q))<8)){if(H%2==1){G.childNodes[2].style.marginRight=k;G.childNodes[5].style.marginRight=k;G.childNodes[8].style.marginRight=k;}
else {G.childNodes[2].style.marginRight=n;G.childNodes[5].style.marginRight=n;G.childNodes[8].style.marginRight=n;}
;if(I%2==1){G.childNodes[3].style.marginBottom=k;G.childNodes[4].style.marginBottom=k;G.childNodes[5].style.marginBottom=k;}
else {G.childNodes[3].style.marginBottom=n;G.childNodes[4].style.marginBottom=n;G.childNodes[5].style.marginBottom=n;}
;}
;}
;}
,tint:function(K,L){}
,_applyBaseImage:function(M,N){{}
;if(M){var R=this._resolveImageUrl(M);var S=/(.*)(\.[a-z]+)$/.exec(R);var Q=S[1];var P=S[2];var O=this._images={tl:Q+c+P,t:Q+e+P,tr:Q+j+P,bl:Q+v+P,b:Q+y+P,br:Q+f+P,l:Q+i+P,c:Q+t+P,r:Q+b+P};this._edges=this._computeEdgeSizes(O);}
;}
,_resolveImageUrl:function(T){return qx.util.AliasManager.getInstance().resolve(T);}
,_computeEdgeSizes:function(U){var V=qx.util.ResourceManager.getInstance();return {top:V.getImageHeight(U.t),bottom:V.getImageHeight(U.b),left:V.getImageWidth(U.l),right:V.getImageWidth(U.r)};}
},destruct:function(){this._markup=this._images=this._edges=null;}
});}
)();
(function(){var j="radiusTopRight",i="radiusTopLeft",h="-webkit-border-bottom-left-radius",g="-webkit-background-clip",f="radiusBottomRight",e="-webkit-border-bottom-right-radius",d="border-top-left-radius",c="border-top-right-radius",b="border-bottom-left-radius",a="radiusBottomLeft",w="-webkit-border-top-left-radius",v="shorthand",u="-moz-border-radius-bottomright",t="padding-box",s="border-bottom-right-radius",r="qx.ui.decoration.MBorderRadius",q="-moz-border-radius-topright",p="-webkit-border-top-right-radius",o="-moz-border-radius-topleft",n="-moz-border-radius-bottomleft",l="Integer",m="_applyBorderRadius",k="px";qx.Mixin.define(r,{properties:{radiusTopLeft:{nullable:true,check:l,apply:m},radiusTopRight:{nullable:true,check:l,apply:m},radiusBottomLeft:{nullable:true,check:l,apply:m},radiusBottomRight:{nullable:true,check:l,apply:m},radius:{group:[i,j,f,a],mode:v}},members:{_styleBorderRadius:function(x){x[g]=t;var y=this.getRadiusTopLeft();if(y>0){x[o]=y+k;x[w]=y+k;x[d]=y+k;}
;y=this.getRadiusTopRight();if(y>0){x[q]=y+k;x[p]=y+k;x[c]=y+k;}
;y=this.getRadiusBottomLeft();if(y>0){x[n]=y+k;x[h]=y+k;x[b]=y+k;}
;y=this.getRadiusBottomRight();if(y>0){x[u]=y+k;x[e]=y+k;x[s]=y+k;}
;}
,_applyBorderRadius:function(){{}
;}
}});}
)();
(function(){var d="qx.ui.decoration.MBackgroundColor",c="Color",b="_applyBackgroundColor",a="";qx.Mixin.define(d,{properties:{backgroundColor:{check:c,nullable:true,apply:b}},members:{_tintBackgroundColor:function(e,f,g){if(f==null){f=this.getBackgroundColor();}
;f=qx.theme.manager.Color.getInstance().resolve(f);g.backgroundColor=f||a;}
,_resizeBackgroundColor:function(h,i,j){var k=this.getInsets();i-=k.left+k.right;j-=k.top+k.bottom;return {left:k.left,top:k.top,width:i,height:j};}
,_applyBackgroundColor:function(){{}
;}
}});}
)();
(function(){var t="mshtml",s="engine.name",r="backgroundPositionX",q='<div style="',p="backgroundPositionY",o='</div>',n="no-repeat",m="engine.version",l="scale",k='">',d=" ",j="repeat-x",g="repeat-y",c="hidden",b="qx.ui.decoration.MBackgroundImage",f="String",e="browser.quirksmode",h="repeat",a="",i="_applyBackgroundImage";qx.Mixin.define(b,{properties:{backgroundImage:{check:f,nullable:true,apply:i},backgroundRepeat:{check:[h,j,g,n,l],init:h,apply:i},backgroundPositionX:{nullable:true,apply:i},backgroundPositionY:{nullable:true,apply:i},backgroundPosition:{group:[p,r]}},members:{_generateMarkup:this._generateBackgroundMarkup,_generateBackgroundMarkup:function(u,content){var y=a;var x=this.getBackgroundImage();var w=this.getBackgroundRepeat();var top=this.getBackgroundPositionY();if(top==null){top=0;}
;var z=this.getBackgroundPositionX();if(z==null){z=0;}
;u.backgroundPosition=z+d+top;if(x){var v=qx.util.AliasManager.getInstance().resolve(x);y=qx.bom.element.Decoration.create(v,w,u);}
else {if((qx.core.Environment.get(s)==t)){if(parseFloat(qx.core.Environment.get(m))<7||qx.core.Environment.get(e)){u.overflow=c;}
;}
;if(!content){content=a;}
;y=q+qx.bom.element.Style.compile(u)+k+content+o;}
;return y;}
,_applyBackgroundImage:function(){{}
;}
}});}
)();
(function(){var j="border-top",i="border-left",h="border-right",g="qx.ui.decoration.MSingleBorder",f="border-bottom",e="absolute",d="widthTop",c="styleRight",b="styleBottom",a="widthBottom",D="widthLeft",C="styleTop",B="colorBottom",A="styleLeft",z="widthRight",y="colorLeft",x="colorRight",w="colorTop",v="shorthand",u="double",q="px ",r="dotted",o="_applyWidth",p="Color",m="",n="dashed",k="Number",l=" ",s="solid",t="_applyStyle";qx.Mixin.define(g,{properties:{widthTop:{check:k,init:0,apply:o},widthRight:{check:k,init:0,apply:o},widthBottom:{check:k,init:0,apply:o},widthLeft:{check:k,init:0,apply:o},styleTop:{nullable:true,check:[s,r,n,u],init:s,apply:t},styleRight:{nullable:true,check:[s,r,n,u],init:s,apply:t},styleBottom:{nullable:true,check:[s,r,n,u],init:s,apply:t},styleLeft:{nullable:true,check:[s,r,n,u],init:s,apply:t},colorTop:{nullable:true,check:p,apply:t},colorRight:{nullable:true,check:p,apply:t},colorBottom:{nullable:true,check:p,apply:t},colorLeft:{nullable:true,check:p,apply:t},left:{group:[D,A,y]},right:{group:[z,c,x]},top:{group:[d,C,w]},bottom:{group:[a,b,B]},width:{group:[d,z,a,D],mode:v},style:{group:[C,c,b,A],mode:v},color:{group:[w,x,B,y],mode:v}},members:{_styleBorder:function(E){var G=qx.theme.manager.Color.getInstance();var K=G.resolve(this.getColorTop());var H=G.resolve(this.getColorRight());var F=G.resolve(this.getColorBottom());var J=G.resolve(this.getColorLeft());var I=this.getWidthTop();if(I>0){E[j]=I+q+this.getStyleTop()+l+(K||m);}
;var I=this.getWidthRight();if(I>0){E[h]=I+q+this.getStyleRight()+l+(H||m);}
;var I=this.getWidthBottom();if(I>0){E[f]=I+q+this.getStyleBottom()+l+(F||m);}
;var I=this.getWidthLeft();if(I>0){E[i]=I+q+this.getStyleLeft()+l+(J||m);}
;{}
;E.position=e;E.top=0;E.left=0;}
,_resizeBorder:function(L,M,N){var O=this.getInsets();M-=O.left+O.right;N-=O.top+O.bottom;if(M<0){M=0;}
;if(N<0){N=0;}
;return {left:O.left-this.getWidthLeft(),top:O.top-this.getWidthTop(),width:M,height:N};}
,_getDefaultInsetsForBorder:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};}
,_applyWidth:function(){this._applyStyle();this._resetInsets();}
,_applyStyle:function(){{}
;}
}});}
)();
(function(){var b="qx.ui.decoration.Single",a="px";qx.Class.define(b,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage,qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MSingleBorder],construct:function(c,d,e){qx.ui.decoration.Abstract.call(this);if(c!=null){this.setWidth(c);}
;if(d!=null){this.setStyle(d);}
;if(e!=null){this.setColor(e);}
;}
,members:{_markup:null,getMarkup:function(){if(this._markup){return this._markup;}
;var f={};this._styleBorder(f);var g=this._generateBackgroundMarkup(f);return this._markup=g;}
,resize:function(h,i,j){var k=this._resizeBorder(h,i,j);h.style.width=k.width+a;h.style.height=k.height+a;h.style.left=k.left+a;h.style.top=k.top+a;}
,tint:function(l,m){this._tintBackgroundColor(l,m,l.style);}
,_isInitialized:function(){return !!this._markup;}
,_getDefaultInsets:function(){return this._getDefaultInsetsForBorder();}
},destruct:function(){this._markup=null;}
});}
)();
(function(){var c="qx.ui.decoration.Background",b="absolute",a="px";qx.Class.define(c,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage,qx.ui.decoration.MBackgroundColor],construct:function(d){qx.ui.decoration.Abstract.call(this);if(d!=null){this.setBackgroundColor(d);}
;}
,members:{__lc:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};}
,_isInitialized:function(){return !!this.__lc;}
,getMarkup:function(){if(this.__lc){return this.__lc;}
;var e={position:b,top:0,left:0};var f=this._generateBackgroundMarkup(e);return this.__lc=f;}
,resize:function(g,h,i){var j=this.getInsets();g.style.width=(h-j.left-j.right)+a;g.style.height=(i-j.top-j.bottom)+a;g.style.left=-j.left+a;g.style.top=-j.top+a;}
,tint:function(k,l){this._tintBackgroundColor(k,l,k.style);}
},destruct:function(){this.__lc=null;}
});}
)();
(function(){var a="qx.ui.decoration.Uniform";qx.Class.define(a,{extend:qx.ui.decoration.Single,construct:function(b,c,d){qx.ui.decoration.Single.call(this);if(b!=null){this.setWidth(b);}
;if(c!=null){this.setStyle(c);}
;if(d!=null){this.setColor(d);}
;}
});}
)();
(function(){var j="px",i='</div>',h="qx.ui.decoration.Beveled",g="css.boxmodel",f='<div style="position:absolute;top:1px;left:1px;',e='border-bottom:',d='border-right:',c="",b="content",a='border-left:',x='border-top:',w="Number",v='<div style="position:absolute;top:1px;left:0px;',u='position:absolute;top:0px;left:1px;',t='<div style="overflow:hidden;font-size:0;line-height:0;">',s="absolute",r="1px",q='<div style="',p='border:',o="1px solid ",m="Color",n=";",k="_applyStyle",l='"></div>';qx.Class.define(h,{extend:qx.ui.decoration.Abstract,include:[qx.ui.decoration.MBackgroundImage,qx.ui.decoration.MBackgroundColor],construct:function(y,z,A){qx.ui.decoration.Abstract.call(this);if(y!=null){this.setOuterColor(y);}
;if(z!=null){this.setInnerColor(z);}
;if(A!=null){this.setInnerOpacity(A);}
;}
,properties:{innerColor:{check:m,nullable:true,apply:k},innerOpacity:{check:w,init:1,apply:k},outerColor:{check:m,nullable:true,apply:k}},members:{__lc:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};}
,_isInitialized:function(){return !!this.__lc;}
,_applyStyle:function(){{}
;}
,getMarkup:function(){if(this.__lc){return this.__lc;}
;var B=qx.theme.manager.Color.getInstance();var C=[];var F=o+B.resolve(this.getOuterColor())+n;var E=o+B.resolve(this.getInnerColor())+n;C.push(t);C.push(q);C.push(p,F);C.push(qx.bom.element.Opacity.compile(0.35));C.push(l);C.push(v);C.push(a,F);C.push(d,F);C.push(qx.bom.element.Opacity.compile(1));C.push(l);C.push(q);C.push(u);C.push(x,F);C.push(e,F);C.push(qx.bom.element.Opacity.compile(1));C.push(l);var D={position:s,top:r,left:r,opacity:1};C.push(this._generateBackgroundMarkup(D));C.push(f);C.push(p,E);C.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));C.push(l);C.push(i);return this.__lc=C.join(c);}
,resize:function(G,H,I){if(H<4){H=4;}
;if(I<4){I=4;}
;if(qx.core.Environment.get(g)==b){var outerWidth=H-2;var outerHeight=I-2;var O=outerWidth;var N=outerHeight;var innerWidth=H-4;var innerHeight=I-4;}
else {var outerWidth=H;var outerHeight=I;var O=H-2;var N=I-2;var innerWidth=O;var innerHeight=N;}
;var Q=j;var M=G.childNodes[0].style;M.width=outerWidth+Q;M.height=outerHeight+Q;var L=G.childNodes[1].style;L.width=outerWidth+Q;L.height=N+Q;var K=G.childNodes[2].style;K.width=O+Q;K.height=outerHeight+Q;var J=G.childNodes[3].style;J.width=O+Q;J.height=N+Q;var P=G.childNodes[4].style;P.width=innerWidth+Q;P.height=innerHeight+Q;}
,tint:function(R,S){this._tintBackgroundColor(R,S,R.childNodes[3].style);}
},destruct:function(){this.__lc=null;}
});}
)();
(function(){var j="),to(",i="from(",h="background-image",g="background",f="<div style=\"position: absolute; width: 100%; height: 100%; filter:progid:DXImageTransform.Microsoft.Gradient",e="StartColorStr='#FF",d="', ",c="-webkit-gradient(linear,",b="startColorPosition",a="deg, ",M="css.gradient.legacywebkit",L="EndColorStr='#FF",K="startColor",J="(GradientType=",I="qx.ui.decoration.MLinearBackgroundGradient",H="(",G="endColorPosition",F="';)\"></div>",E="endColor",D=", ",q="overflow",r="hidden",o="linear-gradient",p=" 0",m="px",n="0",k="shorthand",l="Color",s="vertical",t="",w="css.gradient.filter",v="Number",y="%",x=")",A="css.gradient.linear",z=",",u=" ",C="horizontal",B="_applyLinearBackgroundGradient";qx.Mixin.define(I,{properties:{startColor:{check:l,nullable:true,apply:B},endColor:{check:l,nullable:true,apply:B},orientation:{check:[C,s],init:s,apply:B},startColorPosition:{check:v,init:0,apply:B},endColorPosition:{check:v,init:100,apply:B},colorPositionUnit:{check:[m,y],init:y,apply:B},gradientStart:{group:[K,b],mode:k},gradientEnd:{group:[E,G],mode:k}},members:{_styleLinearBackgroundGradient:function(N){var T=this.__ld();var X=T.start;var R=T.end;var Y=this.getColorPositionUnit();if(qx.core.Environment.get(M)){Y=Y===m?t:Y;if(this.getOrientation()==C){var W=this.getStartColorPosition()+Y+p+Y;var U=this.getEndColorPosition()+Y+p+Y;}
else {var W=n+Y+u+this.getStartColorPosition()+Y;var U=n+Y+u+this.getEndColorPosition()+Y;}
;var P=i+X+j+R+x;var Q=c+W+z+U+z+P+x;N[g]=Q;}
else if(qx.core.Environment.get(w)&&!qx.core.Environment.get(A)){N[q]=r;}
else {var ba=this.getOrientation()==C?0:270;var S=X+u+this.getStartColorPosition()+Y;var O=R+u+this.getEndColorPosition()+Y;var V=qx.core.Environment.get(A);if(V===o){ba=this.getOrientation()==C?ba+90:ba-90;}
;N[h]=V+H+ba+a+S+z+O+x;}
;}
,__ld:function(){var bb=qx.theme.manager.Color.getInstance();var bd=bb.resolve(this.getStartColor());var bc=bb.resolve(this.getEndColor());return {start:bd,end:bc};}
,_getContent:function(){if(qx.core.Environment.get(w)&&!qx.core.Environment.get(A)){var bf=this.__ld();var bh=this.getOrientation()==C?1:0;var bg=qx.util.ColorUtil.hex3StringToHex6String(bf.start);var be=qx.util.ColorUtil.hex3StringToHex6String(bf.end);bg=bg.substring(1,bg.length);be=be.substring(1,be.length);return f+J+bh+D+e+bg+d+L+be+F;}
;return t;}
,_resizeLinearBackgroundGradient:function(bi,bj,bk){var bl=this.getInsets();bj-=bl.left+bl.right;bk-=bl.top+bl.bottom;return {left:bl.left,top:bl.top,width:bj,height:bk};}
,_applyLinearBackgroundGradient:function(){{}
;}
}});}
)();
(function(){var j="innerWidthRight",i="top",h="innerColorBottom",g="innerWidthTop",f="innerColorRight",e="innerColorTop",d="relative",c="browser.documentmode",b="innerColorLeft",a="",D="qx.ui.decoration.MDoubleBorder",C="left",B="engine.version",A="innerWidthBottom",z="innerWidthLeft",y="position",x="absolute",w="shorthand",v="line-height",u="engine.name",q="mshtml",r="border-top",o="border-left",p="border-bottom",m="border-right",n="Color",k="Number",l='',s="px ",t=" ";qx.Mixin.define(D,{include:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundImage],construct:function(){this._getDefaultInsetsForBorder=this.__li;this._resizeBorder=this.__lh;this._styleBorder=this.__lf;this._generateMarkup=this.__lg;}
,properties:{innerWidthTop:{check:k,init:0},innerWidthRight:{check:k,init:0},innerWidthBottom:{check:k,init:0},innerWidthLeft:{check:k,init:0},innerWidth:{group:[g,j,A,z],mode:w},innerColorTop:{nullable:true,check:n},innerColorRight:{nullable:true,check:n},innerColorBottom:{nullable:true,check:n},innerColorLeft:{nullable:true,check:n},innerColor:{group:[e,f,h,b],mode:w}},members:{__le:null,__lf:function(E){var G=qx.theme.manager.Color.getInstance();var H=G.resolve(this.getInnerColorTop());var K=G.resolve(this.getInnerColorRight());var I=G.resolve(this.getInnerColorBottom());var J=G.resolve(this.getInnerColorLeft());E.position=d;var F=this.getInnerWidthTop();if(F>0){E[r]=F+s+this.getStyleTop()+t+H;}
;var F=this.getInnerWidthRight();if(F>0){E[m]=F+s+this.getStyleRight()+t+K;}
;var F=this.getInnerWidthBottom();if(F>0){E[p]=F+s+this.getStyleBottom()+t+I;}
;var F=this.getInnerWidthLeft();if(F>0){E[o]=F+s+this.getStyleLeft()+t+J;}
;{}
;}
,__lg:function(L){var P=this._generateBackgroundMarkup(L,this._getContent?this._getContent():a);var N=qx.theme.manager.Color.getInstance();var S=N.resolve(this.getColorTop());var O=N.resolve(this.getColorRight());var M=N.resolve(this.getColorBottom());var R=N.resolve(this.getColorLeft());L[r]=l;L[m]=l;L[p]=l;L[o]=l;L[v]=0;if((qx.core.Environment.get(u)==q&&parseFloat(qx.core.Environment.get(B))<8)||(qx.core.Environment.get(u)==q&&qx.core.Environment.get(c)<8)){L[v]=l;}
;var Q=this.getWidthTop();if(Q>0){L[r]=Q+s+this.getStyleTop()+t+S;}
;var Q=this.getWidthRight();if(Q>0){L[m]=Q+s+this.getStyleRight()+t+O;}
;var Q=this.getWidthBottom();if(Q>0){L[p]=Q+s+this.getStyleBottom()+t+M;}
;var Q=this.getWidthLeft();if(Q>0){L[o]=Q+s+this.getStyleLeft()+t+R;}
;{}
;L[y]=x;L[i]=0;L[C]=0;return this.__le=this._generateBackgroundMarkup(L,P);}
,__lh:function(T,U,V){var W=this.getInsets();U-=W.left+W.right;V-=W.top+W.bottom;var X=W.left-this.getWidthLeft()-this.getInnerWidthLeft();var top=W.top-this.getWidthTop()-this.getInnerWidthTop();return {left:X,top:top,width:U,height:V,elementToApplyDimensions:T.firstChild};}
,__li:function(){return {top:this.getWidthTop()+this.getInnerWidthTop(),right:this.getWidthRight()+this.getInnerWidthRight(),bottom:this.getWidthBottom()+this.getInnerWidthBottom(),left:this.getWidthLeft()+this.getInnerWidthLeft()};}
}});}
)();
(function(){var n="shadowHorizontalLength",m="Boolean",l="",k="box-shadow",j="-moz-box-shadow",i="-webkit-box-shadow",h="shadowVerticalLength",g="inset ",f="shorthand",e="qx.ui.decoration.MBoxShadow",b="Color",d="px ",c="Integer",a="_applyBoxShadow";qx.Mixin.define(e,{properties:{shadowHorizontalLength:{nullable:true,check:c,apply:a},shadowVerticalLength:{nullable:true,check:c,apply:a},shadowBlurRadius:{nullable:true,check:c,apply:a},shadowSpreadRadius:{nullable:true,check:c,apply:a},shadowColor:{nullable:true,check:b,apply:a},inset:{init:false,check:m,apply:a},shadowLength:{group:[n,h],mode:f}},members:{_styleBoxShadow:function(o){var p=qx.theme.manager.Color.getInstance();var s=p.resolve(this.getShadowColor());if(s!=null){var v=this.getShadowVerticalLength()||0;var q=this.getShadowHorizontalLength()||0;var blur=this.getShadowBlurRadius()||0;var u=this.getShadowSpreadRadius()||0;var t=this.getInset()?g:l;var r=t+q+d+v+d+blur+d+u+d+s;o[j]=r;o[i]=r;o[k]=r;}
;}
,_applyBoxShadow:function(){{}
;}
}});}
)();
(function(){var cM="checkbox-start",cL="decoration/tabview/tab-button-top-active.png",cK="group-background",cJ="decoration/form/button-c.png",cI="keyboard-focus",cH="button-disabled-start",cG="selected-end",cF="table-header-hovered",cE="decoration/groupbox/groupbox.png",cD="decoration/pane/pane.png",bM="decoration/menu/background.png",bL="decoration/tabview/tabview-pane.png",bK="decoration/toolbar/toolbar-part.gif",bJ="input-focused-css",bI="decoration/menu/bar-background.png",bH="window-border-caption",bG="radiobutton-hovered",bF="tooltip-error-css",bE="radiobutton-checked-focused",bD="groupitem-end",cT="button-disabled-css",cU="group-border",cR="scrollbar-slider-vertical-css",cS="window-css",cP="selected-start",cQ="window-resize-frame-css",cN="tabview-end",cO="window-statusbar-background",cV="decoration/scrollbar/scrollbar-bg-vertical.png",cW="button-pressed-css",cm="toolbar-button-hovered-css",cl="window-caption-active-end",co="dotted",cn="checkbox-disabled-end",cq="window-caption-active-start",cp="button-focused",cs="menu-start",cr="decoration/form/tooltip-error.png",ck="window-captionbar-active-css",cj="qx/decoration/Modern",k="decoration/tabview/tab-button-right-inactive.png",l="border-toolbar-separator-left",m="decoration/form/button-checked.png",n="decoration/scrollbar/scrollbar-bg-horizontal.png",o="decoration/tabview/tab-button-left-active.png",p="decoration/tabview/tab-button-bottom-active.png",q="decoration/tabview/tab-button-bottom-inactive.png",r="decoration/form/button-disabled.png",s="decoration/form/button-pressed.png",t="background-splitpane",dl="decoration/form/button-checked-focused.png",dk="px",dj="decoration/window/statusbar.png",di="input-border-disabled",dq="checkbox-inner",dp="scrollbar-horizontal-css",dn="button-disabled-end",dm="toolbar-end",ds="groupitem-start",dr="decoration/form/button-hovered.png",bd="checkbox-hovered-inner",be="input-focused-start",bb="scrollbar-start",bc="scrollbar-slider-start",bh="radiobutton-checked-disabled",bi="checkbox-focused",bf="qx.theme.modern.Decoration",bg="decoration/form/button.png",Y="decoration/app-header.png",ba="decoration/form/button-focused.png",L="radiobutton-checked-hovered",K="button-hovered-css",N="checkbox-disabled-inner",M="border-toolbar-separator-right",H="border-focused",G="decoration/shadow/shadow.png",J="scrollbar-end",I="decoration/group-item.png",F="window-caption-inactive-end",E="checkbox-end",bn="tabview-inactive-end",bo="input-end",bp="button-checked-focused-css",bq="decoration/tabview/tab-button-left-inactive.png",bj="input-focused-inner-invalid",bk="menu-separator-top",bl="window-caption-inactive-start",bm="scrollbar-slider-end",br="decoration/window/captionbar-inactive.png",bs="decoration/tabview/tab-button-top-inactive.png",V="pane-end",U="input-focused-end",T="decoration/form/tooltip-error-arrow.png",S="menubar-start",R="toolbar-start",Q="checkbox-disabled-start",P="radiobutton-focused",O="pane-start",X="table-focus-indicator",W="button-checked-css",bt="decoration/form/button-checked-c.png",bu="menu-separator-bottom",bv="decoration/shadow/shadow-small.png",bw="input-start",bx="decoration/window/captionbar-active.png",by="decoration/tabview/tab-button-right-active.png",bz="decoration/toolbar/toolbar-gradient.png",bA="checkbox-hovered-inner-invalid",bB="checkbox-disabled-border",bC="button-hovered-end",bQ="repeat-y",bP="border-dragover",bO="button-hovered-start",bN="tooltip-error",bU="progressive-table-header-border-right",bT="decoration/scrollbar/scrollbar-button-bg-vertical.png",bS="radiobutton-background",bR="decoration/form/tooltip-error-arrow-right.png",bW="checkbox-focus",bV="scrollbar-slider-horizontal-css",cf="menu-end",cg="decoration/selection.png",cd="horizontal",ce="table-header-start",cb="decoration/scrollbar/scrollbar-button-bg-horizontal.png",cc="decoration/form/input-focused.png",bY="right",ca="checkbox-hovered-invalid",ch="decoration/table/header-cell.png",ci="tabview-inactive-start",cw="table-header-end",cv="border-button",cy="border-focused-invalid",cx="button-focused-css",cA="checkbox-border",cz="tabview-start",cC="radiobutton-disabled",cB="radiobutton-hovered-invalid",cu="tabview-page-button-top-active-css",ct="button-border-disabled",de="tabview-page-button-top-inactive-css",df="decoration/form/input.png",dg="border-toolbar-border-inner",dh="input-css",da="border-toolbar-button-outer",db="top",dc="border-disabled",dd="background-pane",cX="no-repeat",cY="border-input",j="border-inner-input",i="border-inner-scrollbar",h="radiobutton-checked",g="window-border",f="tabview-inactive",e="checkbox",d="radiobutton",c="button-css",b="border-separator",a="checkbox-hovered",w="button-start",x="button-end",u="background-light",v="tabview-background",A="repeat-x",B="shadow",y="border-invalid",z="border-main",C="scale",D="solid",bX="invalid";qx.Theme.define(bf,{aliases:{decoration:cj},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:z}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:cg,backgroundRepeat:C}},"selected-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient],style:{startColorPosition:0,endColorPosition:100,startColor:cP,endColor:cG}},"selected-dragover":{decorator:qx.ui.decoration.Single,style:{backgroundImage:cg,backgroundRepeat:C,bottom:[2,D,bP]}},"dragover":{decorator:qx.ui.decoration.Single,style:{bottom:[2,D,bP]}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:cD,insets:[0,2,3,0]}},"pane-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MLinearBackgroundGradient],style:{width:1,color:v,radius:3,shadowColor:B,shadowBlurRadius:2,shadowLength:0,gradientStart:[O,0],gradientEnd:[V,100]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:cE}},"group-css":{decorator:[qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder],style:{backgroundColor:cK,radius:4,color:cU,width:1}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bX,innerColor:j,innerOpacity:0.5,backgroundImage:df,backgroundRepeat:A,backgroundColor:u}},"keyboard-focus":{decorator:qx.ui.decoration.Single,style:{width:1,color:cI,style:co}},"radiobutton":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow],style:{backgroundColor:bS,radius:5,width:1,innerWidth:2,color:cA,innerColor:bS,shadowLength:0,shadowBlurRadius:0,shadowColor:bW,insetLeft:5}},"radiobutton-checked":{include:d,style:{backgroundColor:h}},"radiobutton-checked-focused":{include:h,style:{shadowBlurRadius:4}},"radiobutton-checked-hovered":{include:h,style:{innerColor:a}},"radiobutton-focused":{include:d,style:{shadowBlurRadius:4}},"radiobutton-hovered":{include:d,style:{backgroundColor:a,innerColor:a}},"radiobutton-disabled":{include:d,style:{innerColor:cC,backgroundColor:cC,color:bB}},"radiobutton-checked-disabled":{include:cC,style:{backgroundColor:bh}},"radiobutton-invalid":{include:d,style:{color:bX}},"radiobutton-checked-invalid":{include:h,style:{color:bX}},"radiobutton-checked-focused-invalid":{include:bE,style:{color:bX,shadowColor:bX}},"radiobutton-checked-hovered-invalid":{include:L,style:{color:bX,innerColor:cB}},"radiobutton-focused-invalid":{include:P,style:{color:bX,shadowColor:bX}},"radiobutton-hovered-invalid":{include:bG,style:{color:bX,innerColor:cB,backgroundColor:cB}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:b}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:b}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:cr,insets:[-2,5,5,-2]}},"tooltip-error-css":{decorator:[qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow],style:{backgroundColor:bN,radius:4,shadowColor:B,shadowBlurRadius:2,shadowLength:1,insets:[-2,0,0,-2]}},"tooltip-error-left":{include:bN,style:{insets:[0,0,0,0]}},"tooltip-error-css-left":{include:bF,style:{insets:[1,0,0,2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:T,backgroundPositionY:db,backgroundRepeat:cX,insets:[-4,0,0,13]}},"tooltip-error-arrow-left":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bR,backgroundPositionY:db,backgroundPositionX:bY,backgroundRepeat:cX,insets:[-4,-13,0,0]}},"tooltip-error-arrow-left-css":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bR,backgroundPositionY:db,backgroundPositionX:bY,backgroundRepeat:cX,insets:[-6,-13,0,0]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:G,insets:[0,8,8,0]}},"shadow-window-css":{decorator:[qx.ui.decoration.MBoxShadow,qx.ui.decoration.MBackgroundColor],style:{shadowColor:B,shadowBlurRadius:2,shadowLength:1}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:bv,insets:[0,3,3,0]}},"popup-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MBackgroundColor],style:{width:1,color:z,shadowColor:B,shadowBlurRadius:3,shadowLength:1}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:n,backgroundRepeat:A}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:cV,backgroundRepeat:bQ}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:cb,backgroundRepeat:C,outerColor:z,innerColor:i,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:cb,backgroundRepeat:C,outerColor:dc,innerColor:i,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bT,backgroundRepeat:C,outerColor:z,innerColor:i,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bT,backgroundRepeat:C,outerColor:dc,innerColor:i,innerOpacity:0.3}},"scrollbar-horizontal-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[bb,0],gradientEnd:[J,100]}},"scrollbar-vertical-css":{include:dp,style:{orientation:cd}},"scrollbar-slider-horizontal-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[bc,0],gradientEnd:[bm,100],color:z,width:1}},"scrollbar-slider-vertical-css":{include:bV,style:{orientation:cd}},"scrollbar-slider-horizontal-disabled-css":{include:bV,style:{color:ct}},"scrollbar-slider-vertical-disabled-css":{include:cR,style:{color:ct}},"button-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBorderRadius],style:{radius:3,color:cv,width:1,startColor:w,endColor:x,startColorPosition:35,endColorPosition:100}},"button-disabled-css":{include:c,style:{color:ct,startColor:cH,endColor:dn}},"button-hovered-css":{include:c,style:{startColor:bO,endColor:bC}},"button-checked-css":{include:c,style:{endColor:w,startColor:x}},"button-pressed-css":{include:c,style:{endColor:bO,startColor:bC}},"button-focused-css":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBorderRadius],style:{radius:3,color:cv,width:1,innerColor:cp,innerWidth:2,startColor:w,endColor:x,startColorPosition:30,endColorPosition:100}},"button-checked-focused-css":{include:cx,style:{endColor:w,startColor:x}},"button-invalid-css":{include:c,style:{color:y}},"button-disabled-invalid-css":{include:cT,style:{color:y}},"button-hovered-invalid-css":{include:K,style:{color:y}},"button-checked-invalid-css":{include:W,style:{color:y}},"button-pressed-invalid-css":{include:cW,style:{color:y}},"button-focused-invalid-css":{include:cx,style:{color:y}},"button-checked-focused-invalid-css":{include:bp,style:{color:y}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:bg,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:r,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:dr,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:s,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:m,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:dl,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Single,style:{color:bX,width:1,insets:0}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bX,innerColor:cy,insets:[0]}},"checkbox":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBoxShadow],style:{width:1,color:cA,innerWidth:1,innerColor:dq,gradientStart:[cM,0],gradientEnd:[E,100],shadowLength:0,shadowBlurRadius:0,shadowColor:bW,insetLeft:4}},"checkbox-hovered":{include:e,style:{innerColor:bd,gradientStart:[a,0],gradientEnd:[a,100]}},"checkbox-focused":{include:e,style:{shadowBlurRadius:4}},"checkbox-disabled":{include:e,style:{color:bB,innerColor:N,gradientStart:[Q,0],gradientEnd:[cn,100]}},"checkbox-invalid":{include:e,style:{color:bX}},"checkbox-hovered-invalid":{include:a,style:{color:bX,innerColor:bA,gradientStart:[ca,0],gradientEnd:[ca,100]}},"checkbox-focused-invalid":{include:bi,style:{color:bX,shadowColor:bX}},"input-css":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBackgroundColor],style:{color:cY,innerColor:j,innerWidth:1,width:1,backgroundColor:u,startColor:bw,endColor:bo,startColorPosition:0,endColorPosition:12,colorPositionUnit:dk}},"border-invalid-css":{include:dh,style:{color:y}},"input-focused-css":{include:dh,style:{startColor:be,innerColor:U,endColorPosition:4}},"input-focused-invalid-css":{include:bJ,style:{innerColor:bj,color:y}},"input-disabled-css":{include:dh,style:{color:di}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:cY,innerColor:j,innerOpacity:0.5,backgroundImage:df,backgroundRepeat:A,backgroundColor:u}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:cY,innerColor:H,backgroundImage:cc,backgroundRepeat:A,backgroundColor:u}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bX,innerColor:cy,backgroundImage:cc,backgroundRepeat:A,backgroundColor:u,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:dc,innerColor:j,innerOpacity:0.5,backgroundImage:df,backgroundRepeat:A,backgroundColor:u}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bz,backgroundRepeat:C}},"toolbar-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient],style:{startColorPosition:40,endColorPosition:60,startColor:R,endColor:dm}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:da,innerColor:dg,backgroundImage:cJ,backgroundRepeat:C}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:da,innerColor:dg,backgroundImage:bt,backgroundRepeat:C}},"toolbar-button-hovered-css":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBorderRadius],style:{color:da,width:1,innerWidth:1,innerColor:dg,radius:2,gradientStart:[w,30],gradientEnd:[x,100]}},"toolbar-button-checked-css":{include:cm,style:{gradientStart:[x,30],gradientEnd:[w,100]}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:l,colorRight:M,styleLeft:D,styleRight:D}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bK,backgroundRepeat:bQ}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:bL,insets:[4,6,7,4]}},"tabview-pane-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MSingleBorder],style:{width:1,color:g,radius:3,gradientStart:[cz,90],gradientEnd:[cN,100]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:cL}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bs}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:p}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:q}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:o}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bq}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:by}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:k}},"tabview-page-button-top-active-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBoxShadow],style:{radius:[3,3,0,0],width:[1,1,0,1],color:v,backgroundColor:cz,shadowLength:1,shadowColor:B,shadowBlurRadius:2}},"tabview-page-button-top-inactive-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{radius:[3,3,0,0],color:f,colorBottom:v,width:1,gradientStart:[ci,0],gradientEnd:[bn,100]}},"tabview-page-button-bottom-active-css":{include:cu,style:{radius:[0,0,3,3],width:[0,1,1,1],backgroundColor:ci}},"tabview-page-button-bottom-inactive-css":{include:de,style:{radius:[0,0,3,3],width:[0,1,1,1],colorBottom:f,colorTop:v}},"tabview-page-button-left-active-css":{include:cu,style:{radius:[3,0,0,3],width:[1,0,1,1],shadowLength:0,shadowBlurRadius:0}},"tabview-page-button-left-inactive-css":{include:de,style:{radius:[3,0,0,3],width:[1,0,1,1],colorBottom:f,colorRight:v}},"tabview-page-button-right-active-css":{include:cu,style:{radius:[0,3,3,0],width:[1,1,1,0],shadowLength:0,shadowBlurRadius:0}},"tabview-page-button-right-inactive-css":{include:de,style:{radius:[0,3,3,0],width:[1,1,1,0],colorBottom:f,colorLeft:v}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:dd,width:3,color:t,style:D}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:dd,width:1,color:z,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bx}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:br}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:dj}},"window-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MSingleBorder],style:{radius:[5,5,0,0],shadowBlurRadius:4,shadowLength:2,shadowColor:B}},"window-incl-statusbar-css":{include:cS,style:{radius:[5,5,5,5]}},"window-resize-frame-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder],style:{radius:[5,5,0,0],width:1,color:z}},"window-resize-frame-incl-statusbar-css":{include:cQ,style:{radius:[5,5,5,5]}},"window-captionbar-active-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MLinearBackgroundGradient],style:{width:1,color:g,colorBottom:bH,radius:[5,5,0,0],gradientStart:[cq,30],gradientEnd:[cl,70]}},"window-captionbar-inactive-css":{include:ck,style:{gradientStart:[bl,30],gradientEnd:[F,70]}},"window-statusbar-css":{decorator:[qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBorderRadius],style:{backgroundColor:cO,width:[0,1,1,1],color:g,radius:[0,0,5,5]}},"window-pane-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundColor],style:{backgroundColor:dd,width:1,color:g,widthTop:0}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:z,style:D}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:z,style:D}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:ch,backgroundRepeat:C,widthBottom:1,colorBottom:z,style:D}},"table-scroller-header-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[ce,10],gradientEnd:[cw,90],widthBottom:1,colorBottom:z}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:b,styleRight:D}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:b,styleRight:D,widthBottom:1,colorBottom:cF,styleBottom:D}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:X,style:D}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:z,style:D}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:ch,backgroundRepeat:C,widthRight:1,colorRight:bU,style:D}},"progressive-table-header-cell-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[ce,10],gradientEnd:[cw,90],widthRight:1,colorRight:bU}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bM,backgroundRepeat:C,width:1,color:z,style:D}},"menu-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MSingleBorder],style:{gradientStart:[cs,0],gradientEnd:[cf,100],shadowColor:B,shadowBlurRadius:2,shadowLength:1,width:1,color:z}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:bk,widthBottom:1,colorBottom:bu}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bI,backgroundRepeat:C,width:1,color:b,style:D}},"menubar-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[S,0],gradientEnd:[cf,100],width:1,color:b}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:Y,backgroundRepeat:C}},"progressbar":{decorator:qx.ui.decoration.Single,style:{width:1,color:cY}},"group-item":{decorator:qx.ui.decoration.Background,style:{backgroundImage:I,backgroundRepeat:C}},"group-item-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient],style:{startColorPosition:0,endColorPosition:100,startColor:ds,endColor:bD}}}});}
)();
(function(){var a="custom.theme.Decoration";qx.Theme.define(a,{extend:qx.theme.modern.Decoration,decorations:{}});}
)();
(function(){var a="custom.theme.Theme";qx.Theme.define(a,{meta:{color:custom.theme.Color,decoration:custom.theme.Decoration,font:custom.theme.Font,icon:qx.theme.icon.Tango,appearance:custom.theme.Appearance}});}
)();


qx.$$loader.init();

