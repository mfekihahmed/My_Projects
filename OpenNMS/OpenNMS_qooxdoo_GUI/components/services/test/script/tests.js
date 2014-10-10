(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();

if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"qx.allowUrlSettings":true,"qx.application":"testrunner.TestLoader","qx.debug":false,"qx.globalErrorHandling":true,"qx.optimization.basecalls":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.variants":true,"qx.optimization.whitespace":true,"qx.theme":"qx.theme.Modern","qx.version":"2.0.1","testrunner.testParts":false};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"../script"},"ca.inocybe.services":{"resourceUri":"../resource","sourceUri":"../script"},"qx":{"resourceUri":"../resource","sourceUri":"../script","sourceViewUri":"https://github.com/qooxdoo/qooxdoo/blob/%{qxGitBranch}/framework/source/class/%{classFilePath}#L%{lineNumber}"},"testrunner":{"resourceUri":"../resource","sourceUri":"../script"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null,"en":null};
qx.$$locales = {"C":null,"en":null};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  packages : {"0":{"uris":["__out__:tests.577fccb7985e.js"]}},
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

var readyStateValue = {"complete" : true};
if (document.documentMode && document.documentMode < 10 ||
    (typeof window.ActiveXObject !== "undefined" && !document.documentMode)) {
  readyStateValue["loaded"] = true;
}

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function() {
    if (!this.readyState || readyStateValue[this.readyState]) {
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

qx.$$packageData['0']={"locales":{"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_Ed":"d E","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_Hms":"HH:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_hms":"h:mm:ss a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/y","cldr_date_time_format_yMEd":"E, M/d/y","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"E, MMM d, y","cldr_date_time_format_yMMMd":"MMM d, y","cldr_date_time_format_yMd":"M/d/y","cldr_date_time_format_yQ":"Q y","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","day":"Day","dayperiod":"AM/PM","era":"Era","hour":"Hour","minute":"Minute","month":"Month","quotationEnd":"”","quotationStart":"“","second":"Second","week":"Week","weekday":"Day of the Week","year":"Year","zone":"Time Zone"},"en":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_Ed":"d E","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_Hms":"HH:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_hms":"h:mm:ss a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/y","cldr_date_time_format_yMEd":"E, M/d/y","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"E, MMM d, y","cldr_date_time_format_yMMMd":"MMM d, y","cldr_date_time_format_yMd":"M/d/y","cldr_date_time_format_yQ":"Q y","cldr_date_time_format_yQQQ":"QQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","day":"Day","dayperiod":"AM/PM","era":"Era","hour":"Hour","minute":"Minute","month":"Month","quotationEnd":"”","quotationStart":"“","second":"Second","week":"Week","weekday":"Day of the Week","year":"Year","zone":"Time Zone"}},"resources":{"qx/decoration/Modern/app-header.png":[110,20,"png","qx"],"qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/down-small-invert.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-69,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-49,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-59,0],"qx/decoration/Modern/arrows/left-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",0,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-44,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-54,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-28,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-36,0],"qx/decoration/Modern/button-lr-combined.png":[72,52,"png","qx"],"qx/decoration/Modern/button-tb-combined.png":[4,216,"png","qx"],"qx/decoration/Modern/checkradio-combined.png":[504,14,"png","qx"],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/button-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-72],"qx/decoration/Modern/form/button-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-204],"qx/decoration/Modern/form/button-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-188],"qx/decoration/Modern/form/button-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-36],"qx/decoration/Modern/form/button-checked-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-84],"qx/decoration/Modern/form/button-checked-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-184],"qx/decoration/Modern/form/button-checked-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-156],"qx/decoration/Modern/form/button-checked-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-208],"qx/decoration/Modern/form/button-checked-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-160],"qx/decoration/Modern/form/button-checked-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-checked-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-40,0],"qx/decoration/Modern/form/button-checked-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-32,0],"qx/decoration/Modern/form/button-checked-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-28],"qx/decoration/Modern/form/button-checked-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-24],"qx/decoration/Modern/form/button-checked-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-48],"qx/decoration/Modern/form/button-checked-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-checked-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-16,0],"qx/decoration/Modern/form/button-checked-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-60,0],"qx/decoration/Modern/form/button-checked-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-140],"qx/decoration/Modern/form/button-checked-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-56],"qx/decoration/Modern/form/button-checked-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-112],"qx/decoration/Modern/form/button-checked.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-disabled-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-40],"qx/decoration/Modern/form/button-disabled-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-136],"qx/decoration/Modern/form/button-disabled-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-16],"qx/decoration/Modern/form/button-disabled-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-disabled-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-68,0],"qx/decoration/Modern/form/button-disabled-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-4,0],"qx/decoration/Modern/form/button-disabled-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-116],"qx/decoration/Modern/form/button-disabled-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-168],"qx/decoration/Modern/form/button-disabled-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-60],"qx/decoration/Modern/form/button-disabled.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-68],"qx/decoration/Modern/form/button-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-144],"qx/decoration/Modern/form/button-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-8],"qx/decoration/Modern/form/button-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-24,0],"qx/decoration/Modern/form/button-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-44,0],"qx/decoration/Modern/form/button-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-192],"qx/decoration/Modern/form/button-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-148],"qx/decoration/Modern/form/button-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-104],"qx/decoration/Modern/form/button-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-hovered-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-108],"qx/decoration/Modern/form/button-hovered-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-32],"qx/decoration/Modern/form/button-hovered-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-128],"qx/decoration/Modern/form/button-hovered-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-hovered-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-20,0],"qx/decoration/Modern/form/button-hovered-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-48,0],"qx/decoration/Modern/form/button-hovered-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-44],"qx/decoration/Modern/form/button-hovered-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-76],"qx/decoration/Modern/form/button-hovered-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-88],"qx/decoration/Modern/form/button-hovered.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-56,0],"qx/decoration/Modern/form/button-preselected-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-124],"qx/decoration/Modern/form/button-preselected-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-176],"qx/decoration/Modern/form/button-preselected-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-200],"qx/decoration/Modern/form/button-preselected-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,0],"qx/decoration/Modern/form/button-preselected-focused-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-4],"qx/decoration/Modern/form/button-preselected-focused-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-152],"qx/decoration/Modern/form/button-preselected-focused-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-preselected-focused-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-28,0],"qx/decoration/Modern/form/button-preselected-focused-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-36,0],"qx/decoration/Modern/form/button-preselected-focused-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-196],"qx/decoration/Modern/form/button-preselected-focused-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-164],"qx/decoration/Modern/form/button-preselected-focused-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-212],"qx/decoration/Modern/form/button-preselected-focused.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-preselected-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-8,0],"qx/decoration/Modern/form/button-preselected-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-64,0],"qx/decoration/Modern/form/button-preselected-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-96],"qx/decoration/Modern/form/button-preselected-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-80],"qx/decoration/Modern/form/button-preselected-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-132],"qx/decoration/Modern/form/button-preselected.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-pressed-b.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-12],"qx/decoration/Modern/form/button-pressed-bl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-52],"qx/decoration/Modern/form/button-pressed-br.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-20],"qx/decoration/Modern/form/button-pressed-c.png":[40,52,"png","qx"],"qx/decoration/Modern/form/button-pressed-l.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-52,0],"qx/decoration/Modern/form/button-pressed-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",-12,0],"qx/decoration/Modern/form/button-pressed-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-100],"qx/decoration/Modern/form/button-pressed-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-172],"qx/decoration/Modern/form/button-pressed-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-64],"qx/decoration/Modern/form/button-pressed.png":[80,60,"png","qx"],"qx/decoration/Modern/form/button-r.png":[4,52,"png","qx","qx/decoration/Modern/button-lr-combined.png",0,0],"qx/decoration/Modern/form/button-t.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-92],"qx/decoration/Modern/form/button-tl.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-120],"qx/decoration/Modern/form/button-tr.png":[4,4,"png","qx","qx/decoration/Modern/button-tb-combined.png",0,-180],"qx/decoration/Modern/form/button.png":[80,60,"png","qx"],"qx/decoration/Modern/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-126,0],"qx/decoration/Modern/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-322,0],"qx/decoration/Modern/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-294,0],"qx/decoration/Modern/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-364,0],"qx/decoration/Modern/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-490,0],"qx/decoration/Modern/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-224,0],"qx/decoration/Modern/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-378,0],"qx/decoration/Modern/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-84,0],"qx/decoration/Modern/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-182,0],"qx/decoration/Modern/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-42,0],"qx/decoration/Modern/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-392,0],"qx/decoration/Modern/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-210,0],"qx/decoration/Modern/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-14,0],"qx/decoration/Modern/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-238,0],"qx/decoration/Modern/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-462,0],"qx/decoration/Modern/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-112,0],"qx/decoration/Modern/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-448,0],"qx/decoration/Modern/form/checkbox-undetermined-disabled.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-focused-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-focused.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-hovered-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-hovered.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined-invalid.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox-undetermined.png":[14,14,"png","qx"],"qx/decoration/Modern/form/checkbox.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-140,0],"qx/decoration/Modern/form/checked-disabled.png":[6,6,"png","qx"],"qx/decoration/Modern/form/checked.png":[6,6,"png","qx"],"qx/decoration/Modern/form/input-focused.png":[40,12,"png","qx"],"qx/decoration/Modern/form/input.png":[84,12,"png","qx"],"qx/decoration/Modern/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-196,0],"qx/decoration/Modern/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-168,0],"qx/decoration/Modern/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-98,0],"qx/decoration/Modern/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-308,0],"qx/decoration/Modern/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-406,0],"qx/decoration/Modern/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-28,0],"qx/decoration/Modern/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-350,0],"qx/decoration/Modern/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-266,0],"qx/decoration/Modern/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-252,0],"qx/decoration/Modern/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-336,0],"qx/decoration/Modern/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-476,0],"qx/decoration/Modern/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-420,0],"qx/decoration/Modern/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-56,0],"qx/decoration/Modern/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",0,0],"qx/decoration/Modern/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-154,0],"qx/decoration/Modern/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-434,0],"qx/decoration/Modern/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-280,0],"qx/decoration/Modern/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Modern/checkradio-combined.png",-70,0],"qx/decoration/Modern/form/tooltip-error-arrow-right.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-b.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-30],"qx/decoration/Modern/form/tooltip-error-bl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-24],"qx/decoration/Modern/form/tooltip-error-br.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-c.png":[40,18,"png","qx"],"qx/decoration/Modern/form/tooltip-error-l.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",-6,0],"qx/decoration/Modern/form/tooltip-error-r.png":[6,18,"png","qx","qx/decoration/Modern/tooltip-error-lr-combined.png",0,0],"qx/decoration/Modern/form/tooltip-error-t.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-6],"qx/decoration/Modern/form/tooltip-error-tl.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-18],"qx/decoration/Modern/form/tooltip-error-tr.png":[6,6,"png","qx","qx/decoration/Modern/tooltip-error-tb-combined.png",0,-12],"qx/decoration/Modern/form/tooltip-error.png":[127,30,"png","qx"],"qx/decoration/Modern/form/undetermined-disabled.png":[6,2,"png","qx"],"qx/decoration/Modern/form/undetermined.png":[6,2,"png","qx"],"qx/decoration/Modern/group-item.png":[110,20,"png","qx"],"qx/decoration/Modern/groupbox-lr-combined.png":[8,51,"png","qx"],"qx/decoration/Modern/groupbox-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-b.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-12],"qx/decoration/Modern/groupbox/groupbox-bl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-16],"qx/decoration/Modern/groupbox/groupbox-br.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-8],"qx/decoration/Modern/groupbox/groupbox-c.png":[40,51,"png","qx"],"qx/decoration/Modern/groupbox/groupbox-l.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",-4,0],"qx/decoration/Modern/groupbox/groupbox-r.png":[4,51,"png","qx","qx/decoration/Modern/groupbox-lr-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-t.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-4],"qx/decoration/Modern/groupbox/groupbox-tl.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,0],"qx/decoration/Modern/groupbox/groupbox-tr.png":[4,4,"png","qx","qx/decoration/Modern/groupbox-tb-combined.png",0,-20],"qx/decoration/Modern/groupbox/groupbox.png":[255,59,"png","qx"],"qx/decoration/Modern/menu-background-combined.png":[80,49,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/background.png":[40,49,"png","qx","qx/decoration/Modern/menu-background-combined.png",-40,0],"qx/decoration/Modern/menu/bar-background.png":[40,20,"png","qx","qx/decoration/Modern/menu-background-combined.png",0,0],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/pane-lr-combined.png":[12,238,"png","qx"],"qx/decoration/Modern/pane-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/pane/pane-b.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-30],"qx/decoration/Modern/pane/pane-bl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-18],"qx/decoration/Modern/pane/pane-br.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-12],"qx/decoration/Modern/pane/pane-c.png":[40,238,"png","qx"],"qx/decoration/Modern/pane/pane-l.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",0,0],"qx/decoration/Modern/pane/pane-r.png":[6,238,"png","qx","qx/decoration/Modern/pane-lr-combined.png",-6,0],"qx/decoration/Modern/pane/pane-t.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,0],"qx/decoration/Modern/pane/pane-tl.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-24],"qx/decoration/Modern/pane/pane-tr.png":[6,6,"png","qx","qx/decoration/Modern/pane-tb-combined.png",0,-6],"qx/decoration/Modern/pane/pane.png":[185,250,"png","qx"],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-horizontal.png":[76,15,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-horizontal.png":[19,10,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-pressed-vertical.png":[10,19,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-bg-vertical.png":[15,76,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-horizontal.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-34,0],"qx/decoration/Modern/scrollbar/scrollbar-button-bg-vertical.png":[10,12,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-6,0],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-46,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/scrollbar/slider-knob-background.png":[12,10,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-16,0],"qx/decoration/Modern/selection.png":[110,20,"png","qx"],"qx/decoration/Modern/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Modern/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Modern/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Modern/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-30],"qx/decoration/Modern/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-45],"qx/decoration/Modern/shadow/shadow-c.png":[40,382,"png","qx"],"qx/decoration/Modern/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Modern/shadow-lr-combined.png",-15,0],"qx/decoration/Modern/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-20],"qx/decoration/Modern/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-15],"qx/decoration/Modern/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-10],"qx/decoration/Modern/shadow/shadow-small-c.png":[40,136,"png","qx"],"qx/decoration/Modern/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Modern/shadow-small-lr-combined.png",-5,0],"qx/decoration/Modern/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-5],"qx/decoration/Modern/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Modern/shadow-small-tb-combined.png",0,-25],"qx/decoration/Modern/shadow/shadow-small.png":[114,146,"png","qx"],"qx/decoration/Modern/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-60],"qx/decoration/Modern/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,-75],"qx/decoration/Modern/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Modern/shadow-tb-combined.png",0,0],"qx/decoration/Modern/shadow/shadow.png":[381,412,"png","qx"],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-1],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/table-combined.png":[94,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-80,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-26,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-18,0],"qx/decoration/Modern/table/header-cell.png":[40,18,"png","qx","qx/decoration/Modern/table-combined.png",-40,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png":[10,14,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-left-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-left-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-lr-combined.png":[10,37,"png","qx"],"qx/decoration/Modern/tabview-button-right-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png":[6,39,"png","qx"],"qx/decoration/Modern/tabview-button-right-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-lr-combined.png":[10,12,"png","qx"],"qx/decoration/Modern/tabview-button-top-active-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-b-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png":[6,15,"png","qx"],"qx/decoration/Modern/tabview-button-top-inactive-t-combined.png":[3,9,"png","qx"],"qx/decoration/Modern/tabview-pane-lr-combined.png":[60,2,"png","qx"],"qx/decoration/Modern/tabview-pane-tb-combined.png":[30,180,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-bottom-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-bottom-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-bottom-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-active-l.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-r.png":[5,14,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-bottom-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-bottom-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-bottom-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-bottom-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-active.png":[49,24,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-bottom-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-bottom-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-bottom-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-left-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-left-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-left-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-left-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-left-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-left-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-left-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-left-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-left-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-left-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-left-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-left-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-left-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-right-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-right-active-c.png":[40,37,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-active-l.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-active-r.png":[5,37,"png","qx","qx/decoration/Modern/tabview-button-right-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-right-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-right-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-right-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-right-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-right-active.png":[22,47,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive-c.png":[40,39,"png","qx"],"qx/decoration/Modern/tabview/tab-button-right-inactive-l.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-r.png":[3,39,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-right-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-right-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-right-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-right-inactive.png":[20,45,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-b.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-20],"qx/decoration/Modern/tabview/tab-button-top-active-bl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-15],"qx/decoration/Modern/tabview/tab-button-top-active-br.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-10],"qx/decoration/Modern/tabview/tab-button-top-active-c.png":[40,14,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-active-l.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-r.png":[5,12,"png","qx","qx/decoration/Modern/tabview-button-top-active-lr-combined.png",-5,0],"qx/decoration/Modern/tabview/tab-button-top-active-t.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-active-tl.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-25],"qx/decoration/Modern/tabview/tab-button-top-active-tr.png":[5,5,"png","qx","qx/decoration/Modern/tabview-button-top-active-tb-combined.png",0,-5],"qx/decoration/Modern/tabview/tab-button-top-active.png":[48,22,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-b.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive-bl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-br.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-b-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-c.png":[40,15,"png","qx"],"qx/decoration/Modern/tabview/tab-button-top-inactive-l.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-r.png":[3,15,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-lr-combined.png",-3,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-t.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-3],"qx/decoration/Modern/tabview/tab-button-top-inactive-tl.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,0],"qx/decoration/Modern/tabview/tab-button-top-inactive-tr.png":[3,3,"png","qx","qx/decoration/Modern/tabview-button-top-inactive-t-combined.png",0,-6],"qx/decoration/Modern/tabview/tab-button-top-inactive.png":[45,21,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-b.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-60],"qx/decoration/Modern/tabview/tabview-pane-bl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-br.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-120],"qx/decoration/Modern/tabview/tabview-pane-c.png":[40,120,"png","qx"],"qx/decoration/Modern/tabview/tabview-pane-l.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",0,0],"qx/decoration/Modern/tabview/tabview-pane-r.png":[30,2,"png","qx","qx/decoration/Modern/tabview-pane-lr-combined.png",-30,0],"qx/decoration/Modern/tabview/tabview-pane-t.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-150],"qx/decoration/Modern/tabview/tabview-pane-tl.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-30],"qx/decoration/Modern/tabview/tabview-pane-tr.png":[30,30,"png","qx","qx/decoration/Modern/tabview-pane-tb-combined.png",0,-90],"qx/decoration/Modern/tabview/tabview-pane.png":[185,250,"png","qx"],"qx/decoration/Modern/toolbar-combined.png":[80,130,"png","qx"],"qx/decoration/Modern/toolbar/toolbar-gradient-blue.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",-40,0],"qx/decoration/Modern/toolbar/toolbar-gradient.png":[40,130,"png","qx","qx/decoration/Modern/toolbar-combined.png",0,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tooltip-error-lr-combined.png":[12,18,"png","qx"],"qx/decoration/Modern/tooltip-error-tb-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-active-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-lr-inactive-combined.png":[12,9,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-active-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-captionbar-tb-inactive-combined.png":[6,36,"png","qx"],"qx/decoration/Modern/window-statusbar-lr-combined.png":[8,7,"png","qx"],"qx/decoration/Modern/window-statusbar-tb-combined.png":[4,24,"png","qx"],"qx/decoration/Modern/window/captionbar-active-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-active-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-active-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-active-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-active-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-active-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-active-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,0],"qx/decoration/Modern/window/captionbar-active-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-active-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-active.png":[69,21,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-b.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-24],"qx/decoration/Modern/window/captionbar-inactive-bl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-6],"qx/decoration/Modern/window/captionbar-inactive-br.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-30],"qx/decoration/Modern/window/captionbar-inactive-c.png":[40,9,"png","qx"],"qx/decoration/Modern/window/captionbar-inactive-l.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-r.png":[6,9,"png","qx","qx/decoration/Modern/window-captionbar-lr-inactive-combined.png",-6,0],"qx/decoration/Modern/window/captionbar-inactive-t.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,0],"qx/decoration/Modern/window/captionbar-inactive-tl.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-12],"qx/decoration/Modern/window/captionbar-inactive-tr.png":[6,6,"png","qx","qx/decoration/Modern/window-captionbar-tb-inactive-combined.png",0,-18],"qx/decoration/Modern/window/captionbar-inactive.png":[69,21,"png","qx"],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Modern/window/statusbar-b.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-16],"qx/decoration/Modern/window/statusbar-bl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-20],"qx/decoration/Modern/window/statusbar-br.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-4],"qx/decoration/Modern/window/statusbar-c.png":[40,7,"png","qx"],"qx/decoration/Modern/window/statusbar-l.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",-4,0],"qx/decoration/Modern/window/statusbar-r.png":[4,7,"png","qx","qx/decoration/Modern/window-statusbar-lr-combined.png",0,0],"qx/decoration/Modern/window/statusbar-t.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,0],"qx/decoration/Modern/window/statusbar-tl.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-8],"qx/decoration/Modern/window/statusbar-tr.png":[4,4,"png","qx","qx/decoration/Modern/window-statusbar-tb-combined.png",0,-12],"qx/decoration/Modern/window/statusbar.png":[369,15,"png","qx"],"qx/icon/Tango/128/actions/address-book-new.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/application-exit.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/appointment-new.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/bookmark-new.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/check-spelling.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/contact-new.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/dialog-apply.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/dialog-cancel.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/dialog-close.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/dialog-ok.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/document-new.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/document-open-recent.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/document-open.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/document-print-preview.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/document-print.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/document-properties.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/document-revert.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/document-save-as.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/document-save.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/document-send.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/edit-clear.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/edit-copy.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/edit-cut.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/edit-delete.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/edit-find.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/edit-paste.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/edit-redo.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/edit-select-all.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/edit-undo.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/folder-new.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/format-indent-less.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/format-indent-more.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/format-justify-center.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/format-justify-fill.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/format-justify-left.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/format-justify-right.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/format-text-bold.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/format-text-direction-ltr.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/format-text-direction-rtl.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/format-text-italic.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/format-text-strikethrough.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/format-text-underline.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/go-bottom.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/go-down.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/go-first.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/go-home.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/go-last.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/go-next.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/go-previous.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/go-top.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/go-up.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/help-about.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/help-contents.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/help-faq.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/insert-image.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/insert-link.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/insert-text.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/list-add.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/list-remove.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/mail-forward.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/mail-mark-important.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/mail-mark-junk.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/mail-mark-read.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/mail-mark-unread.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/mail-message-new.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/mail-receive.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/mail-reply-all.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/mail-reply-sender.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/mail-send.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/media-eject.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/media-playback-pause.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/media-playback-start.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/media-playback-stop.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/media-record.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/media-seek-backward.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/media-seek-forward.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/media-skip-backward.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/media-skip-forward.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/object-flip-horizontal.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/object-flip-vertical.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/object-rotate-left.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/object-rotate-right.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/process-stop.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/system-log-out.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/system-run.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/system-search.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/system-shutdown.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/view-fullscreen.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/view-refresh.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/view-restore.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/view-sort-ascending.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/view-sort-descending.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/window-close.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/window-new.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/zoom-fit-best.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/zoom-in.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/zoom-original.png":[128,128,"png","qx"],"qx/icon/Tango/128/actions/zoom-out.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/internet-blog.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/internet-download-manager.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/internet-feed-reader.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/internet-mail.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/internet-messenger.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/internet-telephony.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/internet-transfer.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/internet-web-browser.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/media-audio-player.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/media-photo-album.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/media-video-player.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/office-address-book.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/office-calendar.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/office-chart.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/office-database.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/office-draw.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/office-graphics.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/office-layout.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/office-presentation.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/office-project.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/office-spreadsheet.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/office-web.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/office-writer.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/preferences-accessibility.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/preferences-clock.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/preferences-display.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/preferences-font.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/preferences-keyboard.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/preferences-locale.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/preferences-network.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/preferences-security.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/preferences-sound.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/preferences-theme.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/preferences-users.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/preferences-wallpaper.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-archiver.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-calculator.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-character-map.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-color-chooser.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-dictionary.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-graphics-viewer.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-help.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-keyring.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-log-viewer.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-network-manager.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-notes.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-statistics.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-system-monitor.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-terminal.png":[128,128,"png","qx"],"qx/icon/Tango/128/apps/utilities-text-editor.png":[128,128,"png","qx"],"qx/icon/Tango/128/categories/accessories.png":[128,128,"png","qx"],"qx/icon/Tango/128/categories/development.png":[128,128,"png","qx"],"qx/icon/Tango/128/categories/engineering.png":[128,128,"png","qx"],"qx/icon/Tango/128/categories/games.png":[128,128,"png","qx"],"qx/icon/Tango/128/categories/graphics.png":[128,128,"png","qx"],"qx/icon/Tango/128/categories/internet.png":[128,128,"png","qx"],"qx/icon/Tango/128/categories/multimedia.png":[128,128,"png","qx"],"qx/icon/Tango/128/categories/office.png":[128,128,"png","qx"],"qx/icon/Tango/128/categories/science.png":[128,128,"png","qx"],"qx/icon/Tango/128/categories/system.png":[128,128,"png","qx"],"qx/icon/Tango/128/categories/utilities.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/audio-card.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/audio-input-microphone.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/battery.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/camera-photo.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/camera-web.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/computer.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/display.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/drive-harddisk.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/drive-optical.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/input-keyboard.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/input-mouse.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/media-flash.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/media-optical.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/multimedia-player.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/network-wired.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/network-wireless.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/pda.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/phone.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/printer.png":[128,128,"png","qx"],"qx/icon/Tango/128/devices/scanner.png":[128,128,"png","qx"],"qx/icon/Tango/128/emblems/emblem-favorite.png":[128,128,"png","qx"],"qx/icon/Tango/128/emblems/emblem-important.png":[128,128,"png","qx"],"qx/icon/Tango/128/emotes/face-angel.png":[128,128,"png","qx"],"qx/icon/Tango/128/emotes/face-embarrassed.png":[128,128,"png","qx"],"qx/icon/Tango/128/emotes/face-kiss.png":[128,128,"png","qx"],"qx/icon/Tango/128/emotes/face-laugh.png":[128,128,"png","qx"],"qx/icon/Tango/128/emotes/face-plain.png":[128,128,"png","qx"],"qx/icon/Tango/128/emotes/face-raspberry.png":[128,128,"png","qx"],"qx/icon/Tango/128/emotes/face-sad.png":[128,128,"png","qx"],"qx/icon/Tango/128/emotes/face-smile-big.png":[128,128,"png","qx"],"qx/icon/Tango/128/emotes/face-smile.png":[128,128,"png","qx"],"qx/icon/Tango/128/emotes/face-surprise.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/archive.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/executable.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/media-audio.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/media-image.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/media-video.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/office-calendar.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/office-contact.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/office-document.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/office-illustration.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/office-presentation.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/office-spreadsheet.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/text-html.png":[128,128,"png","qx"],"qx/icon/Tango/128/mimetypes/text-plain.png":[128,128,"png","qx"],"qx/icon/Tango/128/places/folder-open.png":[128,128,"png","qx"],"qx/icon/Tango/128/places/folder-remote.png":[128,128,"png","qx"],"qx/icon/Tango/128/places/folder.png":[128,128,"png","qx"],"qx/icon/Tango/128/places/network-server.png":[128,128,"png","qx"],"qx/icon/Tango/128/places/network-workgroup.png":[128,128,"png","qx"],"qx/icon/Tango/128/places/user-desktop.png":[128,128,"png","qx"],"qx/icon/Tango/128/places/user-home.png":[128,128,"png","qx"],"qx/icon/Tango/128/places/user-trash-full.png":[128,128,"png","qx"],"qx/icon/Tango/128/places/user-trash.png":[128,128,"png","qx"],"qx/icon/Tango/128/status/dialog-error.png":[128,128,"png","qx"],"qx/icon/Tango/128/status/dialog-information.png":[128,128,"png","qx"],"qx/icon/Tango/128/status/dialog-password.png":[128,128,"png","qx"],"qx/icon/Tango/128/status/dialog-warning.png":[128,128,"png","qx"],"qx/icon/Tango/128/status/image-loading.png":[128,128,"png","qx"],"qx/icon/Tango/128/status/image-missing.png":[128,128,"png","qx"],"qx/icon/Tango/128/status/mail-read.png":[128,128,"png","qx"],"qx/icon/Tango/128/status/mail-replied.png":[128,128,"png","qx"],"qx/icon/Tango/128/status/mail-unread.png":[128,128,"png","qx"],"qx/icon/Tango/128/status/security-high.png":[128,128,"png","qx"],"qx/icon/Tango/128/status/security-low.png":[128,128,"png","qx"],"qx/icon/Tango/128/status/security-medium.png":[128,128,"png","qx"],"qx/icon/Tango/16/actions/address-book-new.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/application-exit.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/appointment-new.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/bookmark-new.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/check-spelling.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/contact-new.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-apply.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/document-new.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/document-open-recent.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/document-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/document-print-preview.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/document-print.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/document-properties.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/document-revert.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/document-save-as.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/document-save.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/document-send.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/edit-clear.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/edit-copy.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/edit-cut.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/edit-delete.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/edit-find.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/edit-paste.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/edit-redo.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/edit-select-all.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/edit-undo.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/folder-new.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/format-indent-less.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/format-indent-more.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/format-justify-center.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/format-justify-fill.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/format-justify-left.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/format-justify-right.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/format-text-bold.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/format-text-direction-ltr.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/format-text-direction-rtl.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/format-text-italic.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/format-text-strikethrough.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/format-text-underline.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/go-bottom.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/go-down.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/go-first.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/go-home.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/go-last.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/go-next.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/go-previous.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/go-top.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/go-up.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/help-about.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/help-contents.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/help-faq.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/insert-image.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/insert-link.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/insert-text.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/list-add.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/list-remove.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/mail-forward.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/mail-mark-important.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/mail-mark-junk.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/mail-mark-read.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/mail-mark-unread.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/mail-message-new.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/mail-receive.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/mail-reply-all.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/mail-reply-sender.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/mail-send.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/media-eject.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/media-playback-pause.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/media-playback-start.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/media-playback-stop.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/media-record.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/media-seek-backward.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/media-seek-forward.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/media-skip-backward.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/media-skip-forward.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/object-flip-horizontal.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/object-flip-vertical.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/object-rotate-left.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/object-rotate-right.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/process-stop.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/system-log-out.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/system-run.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/system-search.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/system-shutdown.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-fullscreen.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-restore.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-sort-ascending.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-sort-descending.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-new.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/zoom-fit-best.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/zoom-in.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/zoom-original.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/zoom-out.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-blog.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-download-manager.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-feed-reader.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-mail.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-messenger.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-telephony.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-transfer.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/internet-web-browser.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/media-audio-player.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/media-photo-album.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/media-video-player.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-address-book.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-chart.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-database.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-draw.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-graphics.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-layout.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-presentation.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-project.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-spreadsheet.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-web.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-writer.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-accessibility.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-clock.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-display.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-font.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-keyboard.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-locale.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-network.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-security.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-sound.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-theme.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-users.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/preferences-wallpaper.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-archiver.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-calculator.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-character-map.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-dictionary.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-graphics-viewer.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-help.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-keyring.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-log-viewer.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-network-manager.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-notes.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-statistics.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-system-monitor.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-terminal.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-text-editor.png":[16,16,"png","qx"],"qx/icon/Tango/16/categories/accessories.png":[16,16,"png","qx"],"qx/icon/Tango/16/categories/development.png":[16,16,"png","qx"],"qx/icon/Tango/16/categories/engineering.png":[16,16,"png","qx"],"qx/icon/Tango/16/categories/games.png":[16,16,"png","qx"],"qx/icon/Tango/16/categories/graphics.png":[16,16,"png","qx"],"qx/icon/Tango/16/categories/internet.png":[16,16,"png","qx"],"qx/icon/Tango/16/categories/multimedia.png":[16,16,"png","qx"],"qx/icon/Tango/16/categories/office.png":[16,16,"png","qx"],"qx/icon/Tango/16/categories/science.png":[16,16,"png","qx"],"qx/icon/Tango/16/categories/system.png":[16,16,"png","qx"],"qx/icon/Tango/16/categories/utilities.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/audio-card.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/audio-input-microphone.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/battery.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/camera-photo.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/camera-web.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/computer.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/display.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/drive-harddisk.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/drive-optical.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/input-keyboard.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/input-mouse.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/media-flash.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/media-optical.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/multimedia-player.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/network-wired.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/network-wireless.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/pda.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/phone.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/printer.png":[16,16,"png","qx"],"qx/icon/Tango/16/devices/scanner.png":[16,16,"png","qx"],"qx/icon/Tango/16/emblems/emblem-favorite.png":[16,16,"png","qx"],"qx/icon/Tango/16/emblems/emblem-important.png":[16,16,"png","qx"],"qx/icon/Tango/16/emotes/face-angel.png":[16,16,"png","qx"],"qx/icon/Tango/16/emotes/face-embarrassed.png":[16,16,"png","qx"],"qx/icon/Tango/16/emotes/face-kiss.png":[16,16,"png","qx"],"qx/icon/Tango/16/emotes/face-laugh.png":[16,16,"png","qx"],"qx/icon/Tango/16/emotes/face-plain.png":[16,16,"png","qx"],"qx/icon/Tango/16/emotes/face-raspberry.png":[16,16,"png","qx"],"qx/icon/Tango/16/emotes/face-sad.png":[16,16,"png","qx"],"qx/icon/Tango/16/emotes/face-smile-big.png":[16,16,"png","qx"],"qx/icon/Tango/16/emotes/face-smile.png":[16,16,"png","qx"],"qx/icon/Tango/16/emotes/face-surprise.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/archive.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/executable.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/media-audio.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/media-image.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/media-video.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-contact.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-illustration.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-presentation.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-spreadsheet.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/text-html.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/text-plain.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-remote.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/network-server.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/network-workgroup.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/user-desktop.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/user-home.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/user-trash-full.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/user-trash.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/dialog-error.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/dialog-information.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/dialog-password.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/dialog-warning.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/image-loading.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/image-missing.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/mail-read.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/mail-replied.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/mail-unread.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/security-high.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/security-low.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/security-medium.png":[16,16,"png","qx"],"qx/icon/Tango/22/actions/address-book-new.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/application-exit.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/appointment-new.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/bookmark-new.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/check-spelling.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/contact-new.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/dialog-apply.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/dialog-cancel.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/dialog-close.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/dialog-ok.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/document-new.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/document-open-recent.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/document-open.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/document-print-preview.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/document-print.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/document-properties.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/document-revert.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/document-save-as.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/document-save.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/document-send.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-clear.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-copy.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-cut.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-delete.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-find.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-paste.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-redo.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-select-all.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/edit-undo.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/folder-new.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/format-indent-less.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/format-indent-more.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/format-justify-center.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/format-justify-fill.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/format-justify-left.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/format-justify-right.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/format-text-bold.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/format-text-direction-ltr.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/format-text-direction-rtl.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/format-text-italic.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/format-text-strikethrough.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/format-text-underline.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-bottom.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-down.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-first.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-home.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-last.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-next.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-previous.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-top.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/go-up.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/help-about.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/help-contents.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/help-faq.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/insert-image.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/insert-link.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/insert-text.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/list-add.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/list-remove.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-forward.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-mark-important.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-mark-junk.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-mark-read.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-mark-unread.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-message-new.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-receive.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-reply-all.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-reply-sender.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-send.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-eject.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-playback-pause.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-playback-start.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-playback-stop.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-record.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-seek-backward.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-seek-forward.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-skip-backward.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/media-skip-forward.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/object-flip-horizontal.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/object-flip-vertical.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/object-rotate-left.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/object-rotate-right.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/process-stop.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/system-log-out.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/system-run.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/system-search.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/system-shutdown.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/view-fullscreen.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/view-refresh.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/view-restore.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/view-sort-ascending.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/view-sort-descending.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/window-close.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/window-new.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/zoom-fit-best.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/zoom-in.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/zoom-original.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/zoom-out.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/internet-blog.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/internet-download-manager.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/internet-feed-reader.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/internet-mail.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/internet-messenger.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/internet-telephony.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/internet-transfer.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/internet-web-browser.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/media-audio-player.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/media-photo-album.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/media-video-player.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-address-book.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-calendar.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-chart.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-database.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-draw.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-graphics.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-layout.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-presentation.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-project.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-spreadsheet.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-web.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-writer.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/preferences-accessibility.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/preferences-clock.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/preferences-display.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/preferences-font.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/preferences-keyboard.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/preferences-locale.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/preferences-network.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/preferences-security.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/preferences-sound.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/preferences-theme.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/preferences-users.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/preferences-wallpaper.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-archiver.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-calculator.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-character-map.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-color-chooser.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-dictionary.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-graphics-viewer.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-help.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-keyring.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-log-viewer.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-network-manager.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-notes.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-statistics.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-system-monitor.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-terminal.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/utilities-text-editor.png":[22,22,"png","qx"],"qx/icon/Tango/22/categories/accessories.png":[22,22,"png","qx"],"qx/icon/Tango/22/categories/development.png":[22,22,"png","qx"],"qx/icon/Tango/22/categories/engineering.png":[22,22,"png","qx"],"qx/icon/Tango/22/categories/games.png":[22,22,"png","qx"],"qx/icon/Tango/22/categories/graphics.png":[22,22,"png","qx"],"qx/icon/Tango/22/categories/internet.png":[22,22,"png","qx"],"qx/icon/Tango/22/categories/multimedia.png":[22,22,"png","qx"],"qx/icon/Tango/22/categories/office.png":[22,22,"png","qx"],"qx/icon/Tango/22/categories/science.png":[22,22,"png","qx"],"qx/icon/Tango/22/categories/system.png":[22,22,"png","qx"],"qx/icon/Tango/22/categories/utilities.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/audio-card.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/audio-input-microphone.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/battery.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/camera-photo.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/camera-web.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/computer.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/display.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/drive-harddisk.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/drive-optical.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/input-keyboard.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/input-mouse.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/media-flash.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/media-optical.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/multimedia-player.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/network-wired.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/network-wireless.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/pda.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/phone.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/printer.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/scanner.png":[22,22,"png","qx"],"qx/icon/Tango/22/emblems/emblem-favorite.png":[22,22,"png","qx"],"qx/icon/Tango/22/emblems/emblem-important.png":[22,22,"png","qx"],"qx/icon/Tango/22/emotes/face-angel.png":[22,22,"png","qx"],"qx/icon/Tango/22/emotes/face-embarrassed.png":[22,22,"png","qx"],"qx/icon/Tango/22/emotes/face-kiss.png":[22,22,"png","qx"],"qx/icon/Tango/22/emotes/face-laugh.png":[22,22,"png","qx"],"qx/icon/Tango/22/emotes/face-plain.png":[22,22,"png","qx"],"qx/icon/Tango/22/emotes/face-raspberry.png":[22,22,"png","qx"],"qx/icon/Tango/22/emotes/face-sad.png":[22,22,"png","qx"],"qx/icon/Tango/22/emotes/face-smile-big.png":[22,22,"png","qx"],"qx/icon/Tango/22/emotes/face-smile.png":[22,22,"png","qx"],"qx/icon/Tango/22/emotes/face-surprise.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/archive.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/executable.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/media-audio.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/media-image.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/media-video.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/office-calendar.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/office-contact.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/office-illustration.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/office-presentation.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/office-spreadsheet.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/text-html.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/text-plain.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-remote.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/network-server.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/network-workgroup.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/user-desktop.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/user-home.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/user-trash-full.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/user-trash.png":[22,22,"png","qx"],"qx/icon/Tango/22/status/dialog-error.png":[22,22,"png","qx"],"qx/icon/Tango/22/status/dialog-information.png":[22,22,"png","qx"],"qx/icon/Tango/22/status/dialog-password.png":[22,22,"png","qx"],"qx/icon/Tango/22/status/dialog-warning.png":[22,22,"png","qx"],"qx/icon/Tango/22/status/image-loading.png":[22,22,"png","qx"],"qx/icon/Tango/22/status/image-missing.png":[22,22,"png","qx"],"qx/icon/Tango/22/status/mail-read.png":[22,22,"png","qx"],"qx/icon/Tango/22/status/mail-replied.png":[22,22,"png","qx"],"qx/icon/Tango/22/status/mail-unread.png":[22,22,"png","qx"],"qx/icon/Tango/22/status/security-high.png":[22,22,"png","qx"],"qx/icon/Tango/22/status/security-low.png":[22,22,"png","qx"],"qx/icon/Tango/22/status/security-medium.png":[22,22,"png","qx"],"qx/icon/Tango/32/actions/address-book-new.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/application-exit.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/appointment-new.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/bookmark-new.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/check-spelling.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/contact-new.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/dialog-apply.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/dialog-cancel.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/dialog-close.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/dialog-ok.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/document-new.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/document-open-recent.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/document-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/document-print-preview.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/document-print.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/document-properties.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/document-revert.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/document-save-as.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/document-save.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/document-send.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/edit-clear.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/edit-copy.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/edit-cut.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/edit-delete.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/edit-find.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/edit-paste.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/edit-redo.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/edit-select-all.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/edit-undo.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/folder-new.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/format-indent-less.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/format-indent-more.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/format-justify-center.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/format-justify-fill.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/format-justify-left.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/format-justify-right.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/format-text-bold.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/format-text-direction-ltr.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/format-text-direction-rtl.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/format-text-italic.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/format-text-strikethrough.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/format-text-underline.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/go-bottom.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/go-down.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/go-first.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/go-home.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/go-last.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/go-next.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/go-previous.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/go-top.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/go-up.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/help-about.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/help-contents.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/help-faq.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/insert-image.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/insert-link.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/insert-text.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/list-add.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/list-remove.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/mail-forward.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/mail-mark-important.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/mail-mark-junk.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/mail-mark-read.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/mail-mark-unread.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/mail-message-new.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/mail-receive.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/mail-reply-all.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/mail-reply-sender.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/mail-send.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/media-eject.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/media-playback-pause.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/media-playback-start.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/media-playback-stop.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/media-record.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/media-seek-backward.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/media-seek-forward.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/media-skip-backward.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/media-skip-forward.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/object-flip-horizontal.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/object-flip-vertical.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/object-rotate-left.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/object-rotate-right.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/process-stop.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/system-log-out.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/system-run.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/system-search.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/system-shutdown.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/view-fullscreen.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/view-refresh.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/view-restore.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/view-sort-ascending.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/view-sort-descending.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/window-close.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/window-new.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/zoom-fit-best.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/zoom-in.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/zoom-original.png":[32,32,"png","qx"],"qx/icon/Tango/32/actions/zoom-out.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/internet-blog.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/internet-download-manager.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/internet-feed-reader.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/internet-mail.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/internet-messenger.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/internet-telephony.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/internet-transfer.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/internet-web-browser.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/media-audio-player.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/media-photo-album.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/media-video-player.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/office-address-book.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/office-calendar.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/office-chart.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/office-database.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/office-draw.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/office-graphics.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/office-layout.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/office-presentation.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/office-project.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/office-spreadsheet.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/office-web.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/office-writer.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/preferences-accessibility.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/preferences-clock.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/preferences-display.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/preferences-font.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/preferences-keyboard.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/preferences-locale.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/preferences-network.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/preferences-security.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/preferences-sound.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/preferences-theme.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/preferences-users.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/preferences-wallpaper.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-archiver.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-calculator.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-character-map.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-color-chooser.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-dictionary.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-graphics-viewer.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-help.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-keyring.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-log-viewer.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-network-manager.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-notes.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-statistics.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-system-monitor.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-terminal.png":[32,32,"png","qx"],"qx/icon/Tango/32/apps/utilities-text-editor.png":[32,32,"png","qx"],"qx/icon/Tango/32/categories/accessories.png":[32,32,"png","qx"],"qx/icon/Tango/32/categories/development.png":[32,32,"png","qx"],"qx/icon/Tango/32/categories/engineering.png":[32,32,"png","qx"],"qx/icon/Tango/32/categories/games.png":[32,32,"png","qx"],"qx/icon/Tango/32/categories/graphics.png":[32,32,"png","qx"],"qx/icon/Tango/32/categories/internet.png":[32,32,"png","qx"],"qx/icon/Tango/32/categories/multimedia.png":[32,32,"png","qx"],"qx/icon/Tango/32/categories/office.png":[32,32,"png","qx"],"qx/icon/Tango/32/categories/science.png":[32,32,"png","qx"],"qx/icon/Tango/32/categories/system.png":[32,32,"png","qx"],"qx/icon/Tango/32/categories/utilities.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/audio-card.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/audio-input-microphone.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/battery.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/camera-photo.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/camera-web.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/computer.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/display.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/drive-harddisk.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/drive-optical.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/input-keyboard.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/input-mouse.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/media-flash.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/media-optical.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/multimedia-player.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/network-wired.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/network-wireless.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/pda.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/phone.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/printer.png":[32,32,"png","qx"],"qx/icon/Tango/32/devices/scanner.png":[32,32,"png","qx"],"qx/icon/Tango/32/emblems/emblem-favorite.png":[32,32,"png","qx"],"qx/icon/Tango/32/emblems/emblem-important.png":[32,32,"png","qx"],"qx/icon/Tango/32/emotes/face-angel.png":[32,32,"png","qx"],"qx/icon/Tango/32/emotes/face-embarrassed.png":[32,32,"png","qx"],"qx/icon/Tango/32/emotes/face-kiss.png":[32,32,"png","qx"],"qx/icon/Tango/32/emotes/face-laugh.png":[32,32,"png","qx"],"qx/icon/Tango/32/emotes/face-plain.png":[32,32,"png","qx"],"qx/icon/Tango/32/emotes/face-raspberry.png":[32,32,"png","qx"],"qx/icon/Tango/32/emotes/face-sad.png":[32,32,"png","qx"],"qx/icon/Tango/32/emotes/face-smile-big.png":[32,32,"png","qx"],"qx/icon/Tango/32/emotes/face-smile.png":[32,32,"png","qx"],"qx/icon/Tango/32/emotes/face-surprise.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/archive.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/executable.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/media-audio.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/media-image.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/media-video.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/office-calendar.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/office-contact.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/office-illustration.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/office-presentation.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/office-spreadsheet.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/text-html.png":[32,32,"png","qx"],"qx/icon/Tango/32/mimetypes/text-plain.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-remote.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/network-server.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/network-workgroup.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/user-desktop.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/user-home.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/user-trash-full.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/user-trash.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/dialog-error.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/dialog-information.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/dialog-password.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/dialog-warning.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/image-loading.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/image-missing.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/mail-read.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/mail-replied.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/mail-unread.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/security-high.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/security-low.png":[32,32,"png","qx"],"qx/icon/Tango/32/status/security-medium.png":[32,32,"png","qx"],"qx/icon/Tango/48/actions/address-book-new.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/application-exit.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/appointment-new.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/bookmark-new.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/check-spelling.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/contact-new.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/dialog-apply.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/dialog-cancel.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/dialog-close.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/dialog-ok.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/document-new.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/document-open-recent.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/document-open.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/document-print-preview.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/document-print.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/document-properties.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/document-revert.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/document-save-as.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/document-save.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/document-send.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/edit-clear.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/edit-copy.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/edit-cut.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/edit-delete.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/edit-find.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/edit-paste.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/edit-redo.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/edit-select-all.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/edit-undo.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/folder-new.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/format-indent-less.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/format-indent-more.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/format-justify-center.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/format-justify-fill.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/format-justify-left.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/format-justify-right.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/format-text-bold.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/format-text-direction-ltr.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/format-text-direction-rtl.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/format-text-italic.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/format-text-strikethrough.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/format-text-underline.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/go-bottom.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/go-down.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/go-first.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/go-home.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/go-last.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/go-next.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/go-previous.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/go-top.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/go-up.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/help-about.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/help-contents.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/help-faq.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/insert-image.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/insert-link.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/insert-text.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/list-add.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/list-remove.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/mail-forward.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/mail-mark-important.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/mail-mark-junk.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/mail-mark-read.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/mail-mark-unread.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/mail-message-new.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/mail-receive.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/mail-reply-all.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/mail-reply-sender.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/mail-send.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/media-eject.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/media-playback-pause.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/media-playback-start.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/media-playback-stop.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/media-record.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/media-seek-backward.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/media-seek-forward.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/media-skip-backward.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/media-skip-forward.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/object-flip-horizontal.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/object-flip-vertical.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/object-rotate-left.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/object-rotate-right.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/process-stop.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/system-log-out.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/system-run.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/system-search.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/system-shutdown.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/view-fullscreen.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/view-refresh.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/view-restore.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/view-sort-ascending.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/view-sort-descending.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/window-close.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/window-new.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/zoom-fit-best.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/zoom-in.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/zoom-original.png":[48,48,"png","qx"],"qx/icon/Tango/48/actions/zoom-out.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/internet-blog.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/internet-download-manager.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/internet-feed-reader.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/internet-mail.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/internet-messenger.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/internet-telephony.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/internet-transfer.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/internet-web-browser.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/media-audio-player.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/media-photo-album.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/media-video-player.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/office-address-book.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/office-calendar.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/office-chart.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/office-database.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/office-draw.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/office-graphics.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/office-layout.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/office-presentation.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/office-project.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/office-spreadsheet.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/office-web.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/office-writer.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/preferences-accessibility.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/preferences-clock.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/preferences-display.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/preferences-font.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/preferences-keyboard.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/preferences-locale.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/preferences-network.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/preferences-security.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/preferences-sound.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/preferences-theme.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/preferences-users.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/preferences-wallpaper.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-archiver.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-calculator.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-character-map.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-color-chooser.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-dictionary.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-graphics-viewer.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-help.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-keyring.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-log-viewer.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-network-manager.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-notes.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-statistics.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-system-monitor.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-terminal.png":[48,48,"png","qx"],"qx/icon/Tango/48/apps/utilities-text-editor.png":[48,48,"png","qx"],"qx/icon/Tango/48/categories/accessories.png":[48,48,"png","qx"],"qx/icon/Tango/48/categories/development.png":[48,48,"png","qx"],"qx/icon/Tango/48/categories/engineering.png":[48,48,"png","qx"],"qx/icon/Tango/48/categories/games.png":[48,48,"png","qx"],"qx/icon/Tango/48/categories/graphics.png":[48,48,"png","qx"],"qx/icon/Tango/48/categories/internet.png":[48,48,"png","qx"],"qx/icon/Tango/48/categories/multimedia.png":[48,48,"png","qx"],"qx/icon/Tango/48/categories/office.png":[48,48,"png","qx"],"qx/icon/Tango/48/categories/science.png":[48,48,"png","qx"],"qx/icon/Tango/48/categories/system.png":[48,48,"png","qx"],"qx/icon/Tango/48/categories/utilities.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/audio-card.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/audio-input-microphone.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/battery.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/camera-photo.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/camera-web.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/computer.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/display.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/drive-harddisk.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/drive-optical.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/input-keyboard.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/input-mouse.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/media-flash.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/media-optical.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/multimedia-player.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/network-wired.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/network-wireless.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/pda.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/phone.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/printer.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/scanner.png":[48,48,"png","qx"],"qx/icon/Tango/48/emblems/emblem-favorite.png":[48,48,"png","qx"],"qx/icon/Tango/48/emblems/emblem-important.png":[48,48,"png","qx"],"qx/icon/Tango/48/emotes/face-angel.png":[48,48,"png","qx"],"qx/icon/Tango/48/emotes/face-embarrassed.png":[48,48,"png","qx"],"qx/icon/Tango/48/emotes/face-kiss.png":[48,48,"png","qx"],"qx/icon/Tango/48/emotes/face-laugh.png":[48,48,"png","qx"],"qx/icon/Tango/48/emotes/face-plain.png":[48,48,"png","qx"],"qx/icon/Tango/48/emotes/face-raspberry.png":[48,48,"png","qx"],"qx/icon/Tango/48/emotes/face-sad.png":[48,48,"png","qx"],"qx/icon/Tango/48/emotes/face-smile-big.png":[48,48,"png","qx"],"qx/icon/Tango/48/emotes/face-smile.png":[48,48,"png","qx"],"qx/icon/Tango/48/emotes/face-surprise.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/archive.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/executable.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/media-audio.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/media-image.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/media-video.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/office-calendar.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/office-contact.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/office-document.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/office-illustration.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/office-presentation.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/office-spreadsheet.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/text-html.png":[48,48,"png","qx"],"qx/icon/Tango/48/mimetypes/text-plain.png":[48,48,"png","qx"],"qx/icon/Tango/48/places/folder-open.png":[48,48,"png","qx"],"qx/icon/Tango/48/places/folder-remote.png":[48,48,"png","qx"],"qx/icon/Tango/48/places/folder.png":[48,48,"png","qx"],"qx/icon/Tango/48/places/network-server.png":[48,48,"png","qx"],"qx/icon/Tango/48/places/network-workgroup.png":[48,48,"png","qx"],"qx/icon/Tango/48/places/user-desktop.png":[48,48,"png","qx"],"qx/icon/Tango/48/places/user-home.png":[48,48,"png","qx"],"qx/icon/Tango/48/places/user-trash-full.png":[48,48,"png","qx"],"qx/icon/Tango/48/places/user-trash.png":[48,48,"png","qx"],"qx/icon/Tango/48/status/dialog-error.png":[48,48,"png","qx"],"qx/icon/Tango/48/status/dialog-information.png":[48,48,"png","qx"],"qx/icon/Tango/48/status/dialog-password.png":[48,48,"png","qx"],"qx/icon/Tango/48/status/dialog-warning.png":[48,48,"png","qx"],"qx/icon/Tango/48/status/image-loading.png":[48,48,"png","qx"],"qx/icon/Tango/48/status/image-missing.png":[48,48,"png","qx"],"qx/icon/Tango/48/status/mail-read.png":[48,48,"png","qx"],"qx/icon/Tango/48/status/mail-replied.png":[48,48,"png","qx"],"qx/icon/Tango/48/status/mail-unread.png":[48,48,"png","qx"],"qx/icon/Tango/48/status/security-high.png":[48,48,"png","qx"],"qx/icon/Tango/48/status/security-low.png":[48,48,"png","qx"],"qx/icon/Tango/48/status/security-medium.png":[48,48,"png","qx"],"qx/icon/Tango/64/actions/address-book-new.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/application-exit.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/appointment-new.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/bookmark-new.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/check-spelling.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/contact-new.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/dialog-apply.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/dialog-cancel.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/dialog-close.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/dialog-ok.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/document-new.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/document-open-recent.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/document-open.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/document-print-preview.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/document-print.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/document-properties.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/document-revert.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/document-save-as.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/document-save.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/document-send.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/edit-clear.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/edit-copy.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/edit-cut.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/edit-delete.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/edit-find.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/edit-paste.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/edit-redo.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/edit-select-all.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/edit-undo.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/folder-new.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/format-indent-less.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/format-indent-more.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/format-justify-center.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/format-justify-fill.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/format-justify-left.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/format-justify-right.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/format-text-bold.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/format-text-direction-ltr.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/format-text-direction-rtl.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/format-text-italic.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/format-text-strikethrough.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/format-text-underline.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/go-bottom.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/go-down.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/go-first.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/go-home.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/go-last.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/go-next.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/go-previous.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/go-top.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/go-up.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/help-about.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/help-contents.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/help-faq.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/insert-image.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/insert-link.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/insert-text.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/list-add.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/list-remove.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/mail-forward.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/mail-mark-important.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/mail-mark-junk.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/mail-mark-read.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/mail-mark-unread.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/mail-message-new.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/mail-receive.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/mail-reply-all.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/mail-reply-sender.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/mail-send.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/media-eject.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/media-playback-pause.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/media-playback-start.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/media-playback-stop.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/media-record.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/media-seek-backward.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/media-seek-forward.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/media-skip-backward.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/media-skip-forward.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/object-flip-horizontal.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/object-flip-vertical.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/object-rotate-left.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/object-rotate-right.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/process-stop.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/system-log-out.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/system-run.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/system-search.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/system-shutdown.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/view-fullscreen.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/view-refresh.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/view-restore.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/view-sort-ascending.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/view-sort-descending.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/window-close.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/window-new.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/zoom-fit-best.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/zoom-in.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/zoom-original.png":[64,64,"png","qx"],"qx/icon/Tango/64/actions/zoom-out.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/internet-blog.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/internet-download-manager.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/internet-feed-reader.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/internet-mail.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/internet-messenger.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/internet-telephony.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/internet-transfer.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/internet-web-browser.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/media-audio-player.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/media-photo-album.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/media-video-player.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/office-address-book.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/office-calendar.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/office-chart.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/office-database.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/office-draw.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/office-graphics.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/office-layout.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/office-presentation.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/office-project.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/office-spreadsheet.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/office-web.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/office-writer.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/preferences-accessibility.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/preferences-clock.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/preferences-display.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/preferences-font.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/preferences-keyboard.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/preferences-locale.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/preferences-network.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/preferences-security.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/preferences-sound.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/preferences-theme.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/preferences-users.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/preferences-wallpaper.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-archiver.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-calculator.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-character-map.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-color-chooser.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-dictionary.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-graphics-viewer.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-help.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-keyring.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-log-viewer.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-network-manager.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-notes.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-statistics.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-system-monitor.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-terminal.png":[64,64,"png","qx"],"qx/icon/Tango/64/apps/utilities-text-editor.png":[64,64,"png","qx"],"qx/icon/Tango/64/categories/accessories.png":[64,64,"png","qx"],"qx/icon/Tango/64/categories/development.png":[64,64,"png","qx"],"qx/icon/Tango/64/categories/engineering.png":[64,64,"png","qx"],"qx/icon/Tango/64/categories/games.png":[64,64,"png","qx"],"qx/icon/Tango/64/categories/graphics.png":[64,64,"png","qx"],"qx/icon/Tango/64/categories/internet.png":[64,64,"png","qx"],"qx/icon/Tango/64/categories/multimedia.png":[64,64,"png","qx"],"qx/icon/Tango/64/categories/office.png":[64,64,"png","qx"],"qx/icon/Tango/64/categories/science.png":[64,64,"png","qx"],"qx/icon/Tango/64/categories/system.png":[64,64,"png","qx"],"qx/icon/Tango/64/categories/utilities.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/audio-card.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/audio-input-microphone.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/battery.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/camera-photo.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/camera-web.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/computer.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/display.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/drive-harddisk.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/drive-optical.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/input-keyboard.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/input-mouse.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/media-flash.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/media-optical.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/multimedia-player.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/network-wired.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/network-wireless.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/pda.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/phone.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/printer.png":[64,64,"png","qx"],"qx/icon/Tango/64/devices/scanner.png":[64,64,"png","qx"],"qx/icon/Tango/64/emblems/emblem-favorite.png":[64,64,"png","qx"],"qx/icon/Tango/64/emblems/emblem-important.png":[64,64,"png","qx"],"qx/icon/Tango/64/emotes/face-angel.png":[64,64,"png","qx"],"qx/icon/Tango/64/emotes/face-embarrassed.png":[64,64,"png","qx"],"qx/icon/Tango/64/emotes/face-kiss.png":[64,64,"png","qx"],"qx/icon/Tango/64/emotes/face-laugh.png":[64,64,"png","qx"],"qx/icon/Tango/64/emotes/face-plain.png":[64,64,"png","qx"],"qx/icon/Tango/64/emotes/face-raspberry.png":[64,64,"png","qx"],"qx/icon/Tango/64/emotes/face-sad.png":[64,64,"png","qx"],"qx/icon/Tango/64/emotes/face-smile-big.png":[64,64,"png","qx"],"qx/icon/Tango/64/emotes/face-smile.png":[64,64,"png","qx"],"qx/icon/Tango/64/emotes/face-surprise.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/archive.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/executable.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/media-audio.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/media-image.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/media-video.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/office-calendar.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/office-contact.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/office-document.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/office-illustration.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/office-presentation.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/office-spreadsheet.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/text-html.png":[64,64,"png","qx"],"qx/icon/Tango/64/mimetypes/text-plain.png":[64,64,"png","qx"],"qx/icon/Tango/64/places/folder-open.png":[64,64,"png","qx"],"qx/icon/Tango/64/places/folder-remote.png":[64,64,"png","qx"],"qx/icon/Tango/64/places/folder.png":[64,64,"png","qx"],"qx/icon/Tango/64/places/network-server.png":[64,64,"png","qx"],"qx/icon/Tango/64/places/network-workgroup.png":[64,64,"png","qx"],"qx/icon/Tango/64/places/user-desktop.png":[64,64,"png","qx"],"qx/icon/Tango/64/places/user-home.png":[64,64,"png","qx"],"qx/icon/Tango/64/places/user-trash-full.png":[64,64,"png","qx"],"qx/icon/Tango/64/places/user-trash.png":[64,64,"png","qx"],"qx/icon/Tango/64/status/dialog-error.png":[64,64,"png","qx"],"qx/icon/Tango/64/status/dialog-information.png":[64,64,"png","qx"],"qx/icon/Tango/64/status/dialog-password.png":[64,64,"png","qx"],"qx/icon/Tango/64/status/dialog-warning.png":[64,64,"png","qx"],"qx/icon/Tango/64/status/image-loading.png":[64,64,"png","qx"],"qx/icon/Tango/64/status/image-missing.png":[64,64,"png","qx"],"qx/icon/Tango/64/status/mail-read.png":[64,64,"png","qx"],"qx/icon/Tango/64/status/mail-replied.png":[64,64,"png","qx"],"qx/icon/Tango/64/status/mail-unread.png":[64,64,"png","qx"],"qx/icon/Tango/64/status/security-high.png":[64,64,"png","qx"],"qx/icon/Tango/64/status/security-low.png":[64,64,"png","qx"],"qx/icon/Tango/64/status/security-medium.png":[64,64,"png","qx"],"qx/icon/Tango/AUTHORS":"qx","qx/icon/Tango/LICENSE":"qx","qx/static/blank.gif":[1,1,"gif","qx"]},"translations":{"C":{},"en":{}}};
(function(){var m=".prototype",k="Boolean",j="Error",h="Object.keys requires an object as argument.",g="constructor",f="warn",e="default",d="hasOwnProperty",c="string",b="toLocaleString",N="RegExp",M='\", "',L="info",K="BROKEN_IE",J="isPrototypeOf",I="Date",H="qx.Bootstrap",G="]",F="Class",E="error",t="[Class ",u="valueOf",r="Number",s="debug",p="ES5",q="propertyIsEnumerable",n="object",o="function",v="Object",w='"',z="",y="Array",B="()",A="String",D="Function",C="toString",x=".";if(!window.qx){window.qx={};}
;qx.Bootstrap={genericToString:function(){return t+this.classname+G;}
,createNamespace:function(name,O){var Q=name.split(x);var parent=window;var P=Q[0];for(var i=0,R=Q.length-1;i<R;i++,P=Q[i]){if(!parent[P]){parent=parent[P]={};}
else {parent=parent[P];}
;}
;parent[P]=O;return P;}
,setDisplayName:function(S,T,name){S.displayName=T+x+name+B;}
,setDisplayNames:function(U,V){for(var name in U){var W=U[name];if(W instanceof Function){W.displayName=V+x+name+B;}
;}
;}
,define:function(name,X){if(!X){var X={statics:{}};}
;var bd;var bb=null;qx.Bootstrap.setDisplayNames(X.statics,name);if(X.members||X.extend){qx.Bootstrap.setDisplayNames(X.members,name+m);bd=X.construct||new Function;if(X.extend){this.extendClass(bd,bd,X.extend,name,bc);}
;var Y=X.statics||{};for(var i=0,be=qx.Bootstrap.keys(Y),l=be.length;i<l;i++){var bf=be[i];bd[bf]=Y[bf];}
;bb=bd.prototype;var ba=X.members||{};for(var i=0,be=qx.Bootstrap.keys(ba),l=be.length;i<l;i++){var bf=be[i];bb[bf]=ba[bf];}
;}
else {bd=X.statics||{};}
;var bc=name?this.createNamespace(name,bd):z;bd.name=bd.classname=name;bd.basename=bc;bd.$$type=F;if(!bd.hasOwnProperty(C)){bd.toString=this.genericToString;}
;if(X.defer){X.defer(bd,bb);}
;qx.Bootstrap.$$registry[name]=bd;return bd;}
};qx.Bootstrap.define(H,{statics:{LOADSTART:qx.$$start||new Date(),DEBUG:(function(){var bg=true;if(qx.$$environment&&qx.$$environment["qx.debug"]===false){bg=false;}
;return bg;}
)(),getEnvironmentSetting:function(bh){if(qx.$$environment){return qx.$$environment[bh];}
;}
,setEnvironmentSetting:function(bi,bj){if(!qx.$$environment){qx.$$environment={};}
;if(qx.$$environment[bi]===undefined){qx.$$environment[bi]=bj;}
;}
,createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(bk,bl,bm,name,bn){var bq=bm.prototype;var bp=new Function();bp.prototype=bq;var bo=new bp();bk.prototype=bo;bo.name=bo.classname=name;bo.basename=bn;bl.base=bm;bk.superclass=bm;bl.self=bk.constructor=bo.constructor=bk;}
,getByName:function(name){return qx.Bootstrap.$$registry[name];}
,$$registry:{},objectGetLength:function(br){return qx.Bootstrap.keys(br).length;}
,objectMergeWith:function(bs,bt,bu){if(bu===undefined){bu=true;}
;for(var bv in bt){if(bu||bs[bv]===undefined){bs[bv]=bt[bv];}
;}
;return bs;}
,__a:[J,d,b,C,u,q,g],getKeys:function(bw){if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn("'qx.Bootstrap.getKeys' is deprecated. "+"Please use the native 'Object.keys()' instead.");}
;return qx.Bootstrap.keys(bw);}
,keys:({"ES5":Object.keys,"BROKEN_IE":function(bx){if(bx===null||(typeof bx!="object"&&typeof bx!="function")){throw new TypeError("Object.keys requires an object as argument.");}
;var by=[];var bA=Object.prototype.hasOwnProperty;for(var bB in bx){if(bA.call(bx,bB)){by.push(bB);}
;}
;var bz=qx.Bootstrap.__a;for(var i=0,a=bz,l=a.length;i<l;i++){if(bA.call(bx,a[i])){by.push(a[i]);}
;}
;return by;}
,"default":function(bC){if(bC===null||(typeof bC!=n&&typeof bC!=o)){throw new TypeError(h);}
;var bD=[];var bE=Object.prototype.hasOwnProperty;for(var bF in bC){if(bE.call(bC,bF)){bD.push(bF);}
;}
;return bD;}
})[typeof (Object.keys)==o?p:(function(){for(var bG in {toString:1}){return bG;}
;}
)()!==C?K:e],getKeysAsString:function(bH){{}
;var bI=qx.Bootstrap.keys(bH);if(bI.length==0){return z;}
;return w+bI.join(M)+w;}
,__b:{"[object String]":A,"[object Array]":y,"[object Object]":v,"[object RegExp]":N,"[object Number]":r,"[object Boolean]":k,"[object Date]":I,"[object Function]":D,"[object Error]":j},bind:function(bJ,self,bK){var bL=Array.prototype.slice.call(arguments,2,arguments.length);return function(){var bM=Array.prototype.slice.call(arguments,0,arguments.length);return bJ.apply(self,bL.concat(bM));}
;}
,firstUp:function(bN){return bN.charAt(0).toUpperCase()+bN.substr(1);}
,firstLow:function(bO){return bO.charAt(0).toLowerCase()+bO.substr(1);}
,getClass:function(bP){var bQ=Object.prototype.toString.call(bP);return (qx.Bootstrap.__b[bQ]||bQ.slice(8,-1));}
,isString:function(bR){return (bR!==null&&(typeof bR===c||qx.Bootstrap.getClass(bR)==A||bR instanceof String||(!!bR&&!!bR.$$isString)));}
,isArray:function(bS){return (bS!==null&&(bS instanceof Array||(bS&&qx.data&&qx.data.IListData&&qx.util.OOUtil.hasInterface(bS.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bS)==y||(!!bS&&!!bS.$$isArray)));}
,isObject:function(bT){return (bT!==undefined&&bT!==null&&qx.Bootstrap.getClass(bT)==v);}
,isFunction:function(bU){return qx.Bootstrap.getClass(bU)==D;}
,$$logs:[],debug:function(bV,bW){qx.Bootstrap.$$logs.push([s,arguments]);}
,info:function(bX,bY){qx.Bootstrap.$$logs.push([L,arguments]);}
,warn:function(ca,cb){qx.Bootstrap.$$logs.push([f,arguments]);}
,error:function(cc,cd){qx.Bootstrap.$$logs.push([E,arguments]);}
,trace:function(ce){}
}});}
)();
(function(){var cH="qx.bom.client.Xml.getSelectSingleNode",cG="qx.bom.client.Stylesheet.getInsertRule",cF="qx.bom.client.Html.getDataset",cE="qx.bom.client.PhoneGap.getPhoneGap",cD="qx.bom.client.EcmaScript.getArrayReduce",cC="qx.bom.client.Html.getAudioAif",cB="qx.bom.client.CssTransform.get3D",cA="qx.bom.client.EcmaScript.getArrayLastIndexOf",cz="qx.debug.dispose",cy="qx.bom.client.EcmaScript.getArrayForEach",bI="qx.bom.client.Xml.getAttributeNS",bH="qx.bom.client.Stylesheet.getRemoveImport",bG="qx.bom.client.Css.getUserModify",bF="qx.bom.client.Css.getBoxShadow",bE="qx.bom.client.Html.getXul",bD="qx.bom.client.Plugin.getWindowsMedia",bC=":",bB="qx.blankpage",bA="qx.bom.client.Html.getVideo",bz="qx.bom.client.Device.getName",cO="qx.bom.client.Event.getTouch",cP="qx.optimization.strings",cM="qx.debug.property.level",cN="qx.bom.client.EcmaScript.getArrayFilter",cK="qx.bom.client.EcmaScript.getStringTrim",cL="qx.optimization.variables",cI="qx.bom.client.EcmaScript.getDateNow",cJ="qx.bom.client.EcmaScript.getArrayEvery",cQ="qx.bom.client.Xml.getImplementation",cR="qx.bom.client.Html.getConsole",ch="qx.bom.client.Engine.getVersion",cg="qx.bom.client.Plugin.getQuicktime",cj="qx.bom.client.Html.getNaturalDimensions",ci="qx.bom.client.Xml.getSelectNodes",cl="qx.bom.client.Xml.getElementsByTagNameNS",ck="qx.nativeScrollBars",cn="qx.bom.client.Html.getDataUrl",cm="qx.bom.client.Flash.isAvailable",cf="qx.bom.client.Html.getCanvas",ce="qx.bom.client.Css.getBoxModel",l="qx.bom.client.Plugin.getSilverlight",m="qx/static/blank.html",n="qx.bom.client.EcmaScript.getArrayMap",o="qx.bom.client.Css.getUserSelect",p="qx.bom.client.Css.getRadialGradient",q="module.property",r="qx.bom.client.Plugin.getWindowsMediaVersion",s="qx.bom.client.Stylesheet.getCreateStyleSheet",t="qx.bom.client.Locale.getLocale",u="module.events",dg="qx.bom.client.Plugin.getSkype",df="module.databinding",de="qx.bom.client.Html.getFileReader",dd="qx.bom.client.Css.getBorderImage",dk="qx.bom.client.Stylesheet.getDeleteRule",dj="qx.bom.client.EcmaScript.getErrorToString",di="qx.bom.client.Plugin.getDivXVersion",dh="qx.bom.client.Scroll.scrollBarOverlayed",dm="qx.bom.client.Plugin.getPdfVersion",dl="qx.bom.client.Xml.getCreateNode",Y="qx.bom.client.Css.getLinearGradient",ba="qx.bom.client.Transport.getXmlHttpRequest",W="qx.bom.client.Css.getBorderImageSyntax",X="qx.bom.client.Html.getClassList",bd="qx.bom.client.Event.getHelp",be="qx.optimization.comments",bb="qx.bom.client.Locale.getVariant",bc="qx.bom.client.Css.getBoxSizing",U="qx.bom.client.OperatingSystem.getName",V="module.logger",H="qx.bom.client.Css.getOverflowXY",G="qx.mobile.emulatetouch",J="css.overflowxy",I="qx.bom.client.Html.getAudioWav",D="qx.bom.client.Browser.getName",C="qx.bom.client.Css.getInlineBlock",F="qx.bom.client.Plugin.getPdf",E="qx.dynlocale",B="ecmascript.error.stacktrace",A="qx.bom.client.Html.getAudio",bj="qx.core.Environment",bk="qx.bom.client.EcmaScript.getFunctionBind",bl="qx.bom.client.CssTransform.getSupport",bm="qx.bom.client.Html.getTextContent",bf="qx.bom.client.Css.getPlaceholder",bg="qx.bom.client.Css.getFloat",bh="false",bi="qx.bom.client.Css.getFilterGradient",bn="qx.bom.client.Html.getHistoryState",bo="qxenv",R="qx.bom.client.Html.getSessionStorage",Q="qx.bom.client.Html.getAudioAu",P="qx.bom.client.Css.getOpacity",O="qx.bom.client.Css.getFilterTextShadow",N="qx.bom.client.Html.getVml",M="qx.bom.client.Transport.getMaxConcurrentRequestCount",L="qx.bom.client.Event.getHashChange",K="qx.bom.client.Css.getRgba",T="qx.bom.client.Css.getBorderRadius",S="qx.bom.client.Event.getPointer",bp="qx.bom.client.EcmaScript.getArraySome",bq="qx.bom.client.Transport.getSsl",br="qx.bom.client.Html.getWebWorker",bs="qx.bom.client.Json.getJson",bt="qx.bom.client.Browser.getQuirksMode",bu="qx.bom.client.Css.getTextOverflow",bv="qx.bom.client.EcmaScript.getArrayIndexOf",bw="qx.bom.client.Xml.getQualifiedItem",bx="qx.bom.client.Html.getVideoOgg",by="&",bM="qx.bom.client.EcmaScript.getArrayReduceRight",bL="qx.bom.client.Device.getType",bK="qx.bom.client.Browser.getDocumentMode",bJ="qx.allowUrlVariants",bQ="qx.debug.ui.queue",bP="qx.bom.client.Html.getContains",bO="qx.bom.client.Plugin.getActiveX",bN=".",bS="qx.bom.client.Xml.getDomProperties",bR="qx.bom.client.CssAnimation.getSupport",ca="qx.debug.databinding",cb="qx.optimization.basecalls",bX="ecmascript.stacktrace",bY="qx.bom.client.Browser.getVersion",bV="qx.bom.client.Css.getUserSelectNone",bW="qx.bom.client.Html.getSvg",bT="qx.bom.client.EcmaScript.getObjectKeys",bU="qx.bom.client.Plugin.getDivX",cc="qx.bom.client.Runtime.getName",cd="qx.bom.client.Html.getLocalStorage",cr="qx.bom.client.Flash.getStrictSecurityModel",cq="qx.aspects",ct="qx.debug",cs="qx.dynamicmousewheel",cv="qx.bom.client.Html.getAudioMp3",cu="qx.bom.client.Engine.getName",cx="qx.bom.client.Html.getUserDataStorage",cw="qx.bom.client.Plugin.getGears",cp="qx.bom.client.Plugin.getQuicktimeVersion",co="qx.bom.client.Html.getAudioOgg",cY="qx.bom.client.Css.getTextShadow",da="qx.bom.client.Plugin.getSilverlightVersion",db="qx.bom.client.Html.getCompareDocumentPosition",dc="qx.bom.client.Flash.getExpressInstall",cU="qx.bom.client.OperatingSystem.getVersion",cV="qx.bom.client.Html.getXPath",cW="qx.bom.client.Html.getGeoLocation",cX="qx.optimization.privates",cS="qx.bom.client.Css.getAppearance",cT="qx.mobile.nativescroll",k="qx.bom.client.Xml.getDomParser",j="qx.bom.client.Stylesheet.getAddImport",h="qx.optimization.variants",g="qx.bom.client.Html.getVideoWebm",f="qx.bom.client.Flash.getVersion",e="qx.bom.client.CssAnimation.getRequestAnimationFrame",d="qx.bom.client.Css.getLegacyWebkitGradient",c="qx.bom.client.PhoneGap.getNotification",b="qx.bom.client.Html.getVideoH264",a="qx.bom.client.Xml.getCreateElementNS",x="qx.bom.client.EcmaScript.getStackTrace",y="default",v="|",w="true",z="qx.allowUrlSettings";qx.Bootstrap.define(bj,{statics:{_checks:{},_asyncChecks:{},__c:{},_checksMap:{"engine.version":ch,"engine.name":cu,"browser.name":D,"browser.version":bY,"browser.documentmode":bK,"browser.quirksmode":bt,"runtime.name":cc,"device.name":bz,"device.type":bL,"locale":t,"locale.variant":bb,"os.name":U,"os.version":cU,"os.scrollBarOverlayed":dh,"plugin.gears":cw,"plugin.activex":bO,"plugin.skype":dg,"plugin.quicktime":cg,"plugin.quicktime.version":cp,"plugin.windowsmedia":bD,"plugin.windowsmedia.version":r,"plugin.divx":bU,"plugin.divx.version":di,"plugin.silverlight":l,"plugin.silverlight.version":da,"plugin.flash":cm,"plugin.flash.version":f,"plugin.flash.express":dc,"plugin.flash.strictsecurity":cr,"plugin.pdf":F,"plugin.pdf.version":dm,"io.maxrequests":M,"io.ssl":bq,"io.xhr":ba,"event.touch":cO,"event.pointer":S,"event.help":bd,"event.hashchange":L,"ecmascript.stacktrace":x,"ecmascript.error.stacktrace":x,"ecmascript.array.indexof":bv,"ecmascript.array.lastindexof":cA,"ecmascript.array.foreach":cy,"ecmascript.array.filter":cN,"ecmascript.array.map":n,"ecmascript.array.some":bp,"ecmascript.array.every":cJ,"ecmascript.array.reduce":cD,"ecmascript.array.reduceright":bM,"ecmascript.function.bind":bk,"ecmascript.object.keys":bT,"ecmascript.date.now":cI,"ecmascript.error.toString":dj,"ecmascript.string.trim":cK,"html.webworker":br,"html.filereader":de,"html.geolocation":cW,"html.audio":A,"html.audio.ogg":co,"html.audio.mp3":cv,"html.audio.wav":I,"html.audio.au":Q,"html.audio.aif":cC,"html.video":bA,"html.video.ogg":bx,"html.video.h264":b,"html.video.webm":g,"html.storage.local":cd,"html.storage.session":R,"html.storage.userdata":cx,"html.classlist":X,"html.xpath":cV,"html.xul":bE,"html.canvas":cf,"html.svg":bW,"html.vml":N,"html.dataset":cF,"html.dataurl":cn,"html.console":cR,"html.stylesheet.createstylesheet":s,"html.stylesheet.insertrule":cG,"html.stylesheet.deleterule":dk,"html.stylesheet.addimport":j,"html.stylesheet.removeimport":bH,"html.element.contains":bP,"html.element.compareDocumentPosition":db,"html.element.textcontent":bm,"html.image.naturaldimensions":cj,"html.history.state":bn,"json":bs,"css.textoverflow":bu,"css.placeholder":bf,"css.borderradius":T,"css.borderimage":dd,"css.borderimage.standardsyntax":W,"css.boxshadow":bF,"css.gradient.linear":Y,"css.gradient.filter":bi,"css.gradient.radial":p,"css.gradient.legacywebkit":d,"css.boxmodel":ce,"css.rgba":K,"css.userselect":o,"css.userselect.none":bV,"css.usermodify":bG,"css.appearance":cS,"css.float":bg,"css.boxsizing":bc,"css.animation":bR,"css.animation.requestframe":e,"css.transform":bl,"css.transform.3d":cB,"css.inlineblock":C,"css.opacity":P,"css.overflowxy":H,"css.textShadow":cY,"css.textShadow.filter":O,"phonegap":cE,"phonegap.notification":c,"xml.implementation":cQ,"xml.domparser":k,"xml.selectsinglenode":cH,"xml.selectnodes":ci,"xml.getelementsbytagnamens":cl,"xml.domproperties":bS,"xml.attributens":bI,"xml.createnode":dl,"xml.getqualifieditem":bw,"xml.createelementns":a},get:function(dn){if(qx.Bootstrap.DEBUG){if(dn==J){qx.Bootstrap.warn("The environment key 'css.overflowxy' is deprecated.");}
;if(dn==bX){qx.Bootstrap.warn("The environment key 'ecmascript.stacktrace' is now 'ecmascript.error.stacktrace'.");dn=B;}
;}
;if(this.__c[dn]!=undefined){return this.__c[dn];}
;var dr=this._checks[dn];if(dr){var ds=dr();this.__c[dn]=ds;return ds;}
;var dq=this._getClassNameFromEnvKey(dn);if(dq[0]!=undefined){var dt=dq[0];var dp=dq[1];var ds=dt[dp]();this.__c[dn]=ds;return ds;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(dn+" is not a valid key. Please see the API-doc of "+"qx.core.Environment for a list of predefined keys.");qx.Bootstrap.trace(this);}
;}
,_getClassNameFromEnvKey:function(du){var dA=this._checksMap;if(dA[du]!=undefined){var dw=dA[du];var dz=dw.lastIndexOf(bN);if(dz>-1){var dy=dw.slice(0,dz);var dv=dw.slice(dz+1);var dx=qx.Bootstrap.getByName(dy);if(dx!=undefined){return [dx,dv];}
;}
;}
;return [undefined,undefined];}
,getAsync:function(dB,dC,self){var dG=this;if(this.__c[dB]!=undefined){window.setTimeout(function(){dC.call(self,dG.__c[dB]);}
,0);return;}
;var dF=this._asyncChecks[dB];if(dF){dF(function(dI){dG.__c[dB]=dI;dC.call(self,dI);}
);return;}
;var dE=this._getClassNameFromEnvKey(dB);if(dE[0]!=undefined){var dH=dE[0];var dD=dE[1];dH[dD](function(dJ){dG.__c[dB]=dJ;dC.call(self,dJ);}
);return;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(dB+" is not a valid key. Please see the API-doc of "+"qx.core.Environment for a list of predefined keys.");qx.Bootstrap.trace(this);}
;}
,select:function(dK,dL){return this.__d(this.get(dK),dL);}
,selectAsync:function(dM,dN,self){this.getAsync(dM,function(dO){var dP=this.__d(dM,dN);dP.call(self,dO);}
,this);}
,__d:function(dQ,dR){var dT=dR[dQ];if(dR.hasOwnProperty(dQ)){return dT;}
;for(var dS in dR){if(dS.indexOf(v)!=-1){var dU=dS.split(v);for(var i=0;i<dU.length;i++){if(dU[i]==dQ){return dR[dS];}
;}
;}
;}
;if(dR[y]!==undefined){return dR[y];}
;if(qx.Bootstrap.DEBUG){throw new Error('No match for variant "'+dQ+'" ('+(typeof dQ)+' type)'+' in variants ['+qx.Bootstrap.keys(dR)+'] found, and no default ("default") given');}
;}
,filter:function(dV){var dX=[];for(var dW in dV){if(this.get(dW)){dX.push(dV[dW]);}
;}
;return dX;}
,invalidateCacheKey:function(dY){delete this.__c[dY];}
,add:function(ea,eb){if(this._checks[ea]==undefined){if(eb instanceof Function){this._checks[ea]=eb;}
else {this._checks[ea]=this.__g(eb);}
;}
;}
,addAsync:function(ec,ed){if(this._checks[ec]==undefined){this._asyncChecks[ec]=ed;}
;}
,getChecks:function(){return this._checks;}
,getAsyncChecks:function(){return this._asyncChecks;}
,_initDefaultQxValues:function(){this.add(w,function(){return true;}
);this.add(z,function(){return false;}
);this.add(bJ,function(){return false;}
);this.add(cM,function(){return 0;}
);this.add(ct,function(){return true;}
);this.add(bQ,function(){return true;}
);this.add(cq,function(){return false;}
);this.add(E,function(){return true;}
);this.add(G,function(){return false;}
);this.add(cT,function(){return false;}
);this.add(bB,function(){return m;}
);this.add(cs,function(){return true;}
);this.add(ca,function(){return false;}
);this.add(cz,function(){return false;}
);this.add(cb,function(){return false;}
);this.add(be,function(){return false;}
);this.add(cX,function(){return false;}
);this.add(cP,function(){return false;}
);this.add(cL,function(){return false;}
);this.add(h,function(){return false;}
);this.add(df,function(){return true;}
);this.add(V,function(){return true;}
);this.add(q,function(){return true;}
);this.add(u,function(){return true;}
);this.add(ck,function(){return false;}
);}
,__e:function(){if(qx&&qx.$$environment){for(var ef in qx.$$environment){var ee=qx.$$environment[ef];this._checks[ef]=this.__g(ee);}
;}
;}
,__f:function(){if(window.document&&window.document.location){var eg=window.document.location.search.slice(1).split(by);for(var i=0;i<eg.length;i++){var ei=eg[i].split(bC);if(ei.length!=3||ei[0]!=bo){continue;}
;var ej=ei[1];var eh=decodeURIComponent(ei[2]);if(eh==w){eh=true;}
else if(eh==bh){eh=false;}
else if(/^(\d|\.)+$/.test(eh)){eh=parseFloat(eh);}
;this._checks[ej]=this.__g(eh);}
;}
;}
,__g:function(ek){return qx.Bootstrap.bind(function(el){return el;}
,null,ek);}
},defer:function(em){em._initDefaultQxValues();em.__e();if(em.get(z)===true){em.__f();}
;}
});}
)();
(function(){var u="ecmascript.array.lastindexof",t="ecmascript.array.map",s="ecmascript.date.now",r="ecmascript.array.reduce",q="qx.bom.client.EcmaScript",p="ecmascript.object.keys",o="ecmascript.error.stacktrace",n="ecmascript.string.trim",m="ecmascript.array.indexof",l="ecmascript.error.toString",d="[object Error]",k="ecmascript.array.foreach",h="ecmascript.function.bind",c="ecmascript.array.reduceright",b="ecmascript.array.some",g="ecmascript.array.filter",f="ecmascript.array.every",i="stack",a="stacktrace",j="function";qx.Bootstrap.define(q,{statics:{getStackTrace:function(){var v;var e=new Error("e");v=e.stack?i:e.stacktrace?a:null;if(!v){try{throw e;}
catch(w){e=w;}
;}
;return e.stacktrace?a:e.stack?i:null;}
,getArrayIndexOf:function(){return !!Array.prototype.indexOf;}
,getArrayLastIndexOf:function(){return !!Array.prototype.lastIndexOf;}
,getArrayForEach:function(){return !!Array.prototype.forEach;}
,getArrayFilter:function(){return !!Array.prototype.filter;}
,getArrayMap:function(){return !!Array.prototype.map;}
,getArraySome:function(){return !!Array.prototype.some;}
,getArrayEvery:function(){return !!Array.prototype.every;}
,getArrayReduce:function(){return !!Array.prototype.reduce;}
,getArrayReduceRight:function(){return !!Array.prototype.reduceRight;}
,getErrorToString:function(){return typeof Error.prototype.toString==j&&Error.prototype.toString()!==d;}
,getFunctionBind:function(){return typeof Function.prototype.bind===j;}
,getObjectKeys:function(){return !!Object.keys;}
,getDateNow:function(){return !!Date.now;}
,getStringTrim:function(){return typeof String.prototype.trim===j;}
},defer:function(x){qx.core.Environment.add(m,x.getArrayIndexOf);qx.core.Environment.add(u,x.getArrayLastIndexOf);qx.core.Environment.add(k,x.getArrayForEach);qx.core.Environment.add(g,x.getArrayFilter);qx.core.Environment.add(t,x.getArrayMap);qx.core.Environment.add(b,x.getArraySome);qx.core.Environment.add(f,x.getArrayEvery);qx.core.Environment.add(r,x.getArrayReduce);qx.core.Environment.add(c,x.getArrayReduceRight);qx.core.Environment.add(s,x.getDateNow);qx.core.Environment.add(l,x.getErrorToString);qx.core.Environment.add(o,x.getStackTrace);qx.core.Environment.add(h,x.getFunctionBind);qx.core.Environment.add(p,x.getObjectKeys);qx.core.Environment.add(n,x.getStringTrim);}
});}
)();
(function(){var d="qx.lang.normalize.Function",c="ecmascript.function.bind",b="function",a="Function.prototype.bind called on incompatible ";qx.Bootstrap.define(d,{defer:function(){if(!qx.core.Environment.get(c)){var e=Array.prototype.slice;Function.prototype.bind=function(f){var h=this;if(typeof h!=b){throw new TypeError(a+h);}
;var g=e.call(arguments,1);var i=function(){if(this instanceof i){var F=function(){}
;F.prototype=h.prototype;var self=new F;var j=h.apply(self,g.concat(e.call(arguments)));if(Object(j)===j){return j;}
;return self;}
else {return h.apply(f,g.concat(e.call(arguments)));}
;}
;return i;}
;}
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
(function(){var o="ecmascript.array.lastindexof",n="ecmascript.array.map",m="ecmascript.array.filter",k="qx.lang.normalize.Array",j="ecmascript.array.indexof",h="ecmascript.array.reduce",g="ecmascript.array.foreach",f="ecmascript.array.reduceright",e="ecmascript.array.some",d="ecmascript.array.every",a="function",c="Length is 0 and no second argument given",b="First argument is not callable";qx.Bootstrap.define(k,{defer:function(){if(!qx.core.Environment.get(j)){Array.prototype.indexOf=function(p,q){if(q==null){q=0;}
else if(q<0){q=Math.max(0,this.length+q);}
;for(var i=q;i<this.length;i++){if(this[i]===p){return i;}
;}
;return -1;}
;}
;if(!qx.core.Environment.get(o)){Array.prototype.lastIndexOf=function(r,s){if(s==null){s=this.length-1;}
else if(s<0){s=Math.max(0,this.length+s);}
;for(var i=s;i>=0;i--){if(this[i]===r){return i;}
;}
;return -1;}
;}
;if(!qx.core.Environment.get(g)){Array.prototype.forEach=function(t,u){var l=this.length;for(var i=0;i<l;i++){var v=this[i];if(v!==undefined){t.call(u||window,v,i,this);}
;}
;}
;}
;if(!qx.core.Environment.get(m)){Array.prototype.filter=function(w,x){var y=[];var l=this.length;for(var i=0;i<l;i++){var z=this[i];if(z!==undefined){if(w.call(x||window,z,i,this)){y.push(this[i]);}
;}
;}
;return y;}
;}
;if(!qx.core.Environment.get(n)){Array.prototype.map=function(A,B){var C=[];var l=this.length;for(var i=0;i<l;i++){var D=this[i];if(D!==undefined){C[i]=A.call(B||window,D,i,this);}
;}
;return C;}
;}
;if(!qx.core.Environment.get(e)){Array.prototype.some=function(E,F){var l=this.length;for(var i=0;i<l;i++){var G=this[i];if(G!==undefined){if(E.call(F||window,G,i,this)){return true;}
;}
;}
;return false;}
;}
;if(!qx.core.Environment.get(d)){Array.prototype.every=function(H,I){var l=this.length;for(var i=0;i<l;i++){var J=this[i];if(J!==undefined){if(!H.call(I||window,J,i,this)){return false;}
;}
;}
;return true;}
;}
;if(!qx.core.Environment.get(h)){Array.prototype.reduce=function(K,L){if(typeof K!==a){throw new TypeError(b);}
;if(L===undefined&&this.length===0){throw new TypeError(c);}
;var M=L===undefined?this[0]:L;for(var i=L===undefined?1:0;i<this.length;i++){if(i in this){M=K.call(undefined,M,this[i],i,this);}
;}
;return M;}
;}
;if(!qx.core.Environment.get(f)){Array.prototype.reduceRight=function(N,O){if(typeof N!==a){throw new TypeError(b);}
;if(O===undefined&&this.length===0){throw new TypeError(c);}
;var P=O===undefined?this[this.length-1]:O;for(var i=O===undefined?this.length-2:this.length-1;i>=0;i--){if(i in this){P=N.call(undefined,P,this[i],i,this);}
;}
;return P;}
;}
;}
});}
)();
(function(){var h="qx.Mixin",g=".prototype",f="constructor",e="Array",d="[Mixin ",c="]",b="destruct",a="Mixin";qx.Bootstrap.define(h,{statics:{define:function(name,j){if(j){if(j.include&&!(qx.Bootstrap.getClass(j.include)===e)){j.include=[j.include];}
;{}
;var m=j.statics?j.statics:{};qx.Bootstrap.setDisplayNames(m,name);for(var k in m){if(m[k] instanceof Function){m[k].$$mixin=m;}
;}
;if(j.construct){m.$$constructor=j.construct;qx.Bootstrap.setDisplayName(j.construct,name,f);}
;if(j.include){m.$$includes=j.include;}
;if(j.properties){m.$$properties=j.properties;}
;if(j.members){m.$$members=j.members;qx.Bootstrap.setDisplayNames(j.members,name+g);}
;for(var k in m.$$members){if(m.$$members[k] instanceof Function){m.$$members[k].$$mixin=m;}
;}
;if(j.events){m.$$events=j.events;}
;if(j.destruct){m.$$destructor=j.destruct;qx.Bootstrap.setDisplayName(j.destruct,name,b);}
;}
else {var m={};}
;m.$$type=a;m.name=name;m.toString=this.genericToString;m.basename=qx.Bootstrap.createNamespace(name,m);this.$$registry[name]=m;return m;}
,checkCompatibility:function(n){var q=this.flatten(n);var r=q.length;if(r<2){return true;}
;var u={};var t={};var s={};var p;for(var i=0;i<r;i++){p=q[i];for(var o in p.events){if(s[o]){throw new Error('Conflict between mixin "'+p.name+'" and "'+s[o]+'" in member "'+o+'"!');}
;s[o]=p.name;}
;for(var o in p.properties){if(u[o]){throw new Error('Conflict between mixin "'+p.name+'" and "'+u[o]+'" in property "'+o+'"!');}
;u[o]=p.name;}
;for(var o in p.members){if(t[o]){throw new Error('Conflict between mixin "'+p.name+'" and "'+t[o]+'" in member "'+o+'"!');}
;t[o]=p.name;}
;}
;return true;}
,isCompatible:function(v,w){var x=qx.util.OOUtil.getMixins(w);x.push(v);return qx.Mixin.checkCompatibility(x);}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(y){if(!y){return [];}
;var z=y.concat();for(var i=0,l=y.length;i<l;i++){if(y[i].$$includes){z.push.apply(z,this.flatten(y[i].$$includes));}
;}
;return z;}
,genericToString:function(){return d+this.name+c;}
,$$registry:{},__h:null,__i:function(){}
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
(function(){var c='',b="ecmascript.string.trim",a="qx.lang.normalize.String";qx.Bootstrap.define(a,{defer:function(){if(!qx.core.Environment.get(b)){String.prototype.trim=function(d){return this.replace(/^\s+|\s+$/g,c);}
;}
;}
});}
)();
(function(){var b="ecmascript.object.keys",a="qx.lang.normalize.Object";qx.Bootstrap.define(a,{defer:function(){if(!qx.core.Environment.get(b)){Object.keys=qx.Bootstrap.keys;}
;}
});}
)();
(function(){var j="function",h="Boolean",g="qx.Interface",f="Array",e="]",d="toggle",c="Interface",b="is",a="[Interface ";qx.Bootstrap.define(g,{statics:{define:function(name,k){if(k){if(k.extend&&!(qx.Bootstrap.getClass(k.extend)===f)){k.extend=[k.extend];}
;{}
;var m=k.statics?k.statics:{};if(k.extend){m.$$extends=k.extend;}
;if(k.properties){m.$$properties=k.properties;}
;if(k.members){m.$$members=k.members;}
;if(k.events){m.$$events=k.events;}
;}
else {var m={};}
;m.$$type=c;m.name=name;m.toString=this.genericToString;m.basename=qx.Bootstrap.createNamespace(name,m);qx.Interface.$$registry[name]=m;return m;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(n){if(!n){return [];}
;var o=n.concat();for(var i=0,l=n.length;i<l;i++){if(n[i].$$extends){o.push.apply(o,this.flatten(n[i].$$extends));}
;}
;return o;}
,__k:function(p,q,r,s){var w=r.$$members;if(w){for(var v in w){if(qx.Bootstrap.isFunction(w[v])){var u=this.__l(q,v);var t=u||qx.Bootstrap.isFunction(p[v]);if(!t){throw new Error('Implementation of method "'+v+'" is missing in class "'+q.classname+'" required by interface "'+r.name+'"');}
;var x=s===true&&!u&&!qx.util.OOUtil.hasInterface(q,r);if(x){p[v]=this.__o(r,p[v],v,w[v]);}
;}
else {if(typeof p[v]===undefined){if(typeof p[v]!==j){throw new Error('Implementation of member "'+v+'" is missing in class "'+q.classname+'" required by interface "'+r.name+'"');}
;}
;}
;}
;}
;}
,__l:function(y,z){var D=z.match(/^(is|toggle|get|set|reset)(.*)$/);if(!D){return false;}
;var A=qx.Bootstrap.firstLow(D[2]);var B=qx.util.OOUtil.getPropertyDefinition(y,A);if(!B){return false;}
;var C=D[0]==b||D[0]==d;if(C){return qx.util.OOUtil.getPropertyDefinition(y,A).check==h;}
;return true;}
,__m:function(E,F){if(F.$$properties){for(var G in F.$$properties){if(!qx.util.OOUtil.getPropertyDefinition(E,G)){throw new Error('The property "'+G+'" is not supported by Class "'+E.classname+'"!');}
;}
;}
;}
,__n:function(H,I){if(I.$$events){for(var J in I.$$events){if(!qx.util.OOUtil.supportsEvent(H,J)){throw new Error('The event "'+J+'" is not supported by Class "'+H.classname+'"!');}
;}
;}
;}
,assertObject:function(K,L){var N=K.constructor;this.__k(K,N,L,false);this.__m(N,L);this.__n(N,L);var M=L.$$extends;if(M){for(var i=0,l=M.length;i<l;i++){this.assertObject(K,M[i]);}
;}
;}
,assert:function(O,P,Q){this.__k(O.prototype,O,P,Q);this.__m(O,P);this.__n(O,P);var R=P.$$extends;if(R){for(var i=0,l=R.length;i<l;i++){this.assert(O,R[i],Q);}
;}
;}
,genericToString:function(){return a+this.name+e;}
,$$registry:{},__o:function(){}
,__h:null,__i:function(){}
}});}
)();
(function(){var e="qx.lang.normalize.Error",d=": ",c="ecmascript.error.toString",b="Error",a="";qx.Bootstrap.define(e,{defer:function(){if(!qx.core.Environment.get(c)){Error.prototype.toString=function(){var name=this.name||b;var f=this.message||a;if(name===a&&f===a){return b;}
;if(name===a){return f;}
;if(f===a){return name;}
;return name+d+f;}
;}
;}
});}
)();
(function(){var b="qx.lang.normalize.Date",a="ecmascript.date.now";qx.Bootstrap.define(b,{defer:function(){if(!qx.core.Environment.get(a)){Date.now=function(){return +new Date();}
;}
;}
});}
)();
(function(){var bB='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',bA='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',bz='value !== null && value.nodeType === 9 && value.documentElement',by='value !== null && value.$$type === "Mixin"',bx='return init;',bw='var init=this.',bv='value !== null && value.nodeType === 1 && value.attributes',bu="var parent = this.getLayoutParent();",bt="Error in property ",bs='qx.core.Assert.assertInstance(value, Date, msg) || true',bh="if (!parent) return;",bg=" in method ",bf='qx.core.Assert.assertInstance(value, Error, msg) || true',be='Undefined value is not allowed!',bd="inherit",bc='Is invalid!',bb="MSIE 6.0",ba="': ",Y=" of class ",X='value !== null && value.nodeType !== undefined',bI='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',bJ="module.events",bG='qx.core.Assert.assertPositiveInteger(value, msg) || true',bH='if(init==qx.core.Property.$$inherit)init=null;',bE='value !== null && value.$$type === "Interface"',bF='var inherit=prop.$$inherit;',bC="var value = parent.",bD="$$useinit_",bK="(value);",bL="$$runtime_",bl='Requires exactly one argument!',bk="$$user_",bn='qx.core.Assert.assertArray(value, msg) || true',bm='qx.core.Assert.assertPositiveNumber(value, msg) || true',bp="Boolean",bo='return value;',br='if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',bq='Does not allow any arguments!',bj="()",bi="var a=arguments[0] instanceof Array?arguments[0]:arguments;",b='value !== null && value.$$type === "Theme"',c="())",d='return null;',e='qx.core.Assert.assertObject(value, msg) || true',f='qx.core.Assert.assertString(value, msg) || true',g="if (value===undefined) value = parent.",h='value !== null && value.$$type === "Class"',j='qx.core.Assert.assertFunction(value, msg) || true',k="object",m="$$init_",bP="$$theme_",bO='qx.core.Assert.assertMap(value, msg) || true',bN='qx.core.Assert.assertNumber(value, msg) || true',bM='Null value is not allowed!',bT='qx.core.Assert.assertInteger(value, msg) || true',bS="rv:1.8.1",bR="shorthand",bQ='qx.core.Assert.assertInstance(value, RegExp, msg) || true',bV='value !== null && value.type !== undefined',bU='value !== null && value.document',H='throw new Error("Property ',I="(!this.",F='qx.core.Assert.assertBoolean(value, msg) || true',G="toggle",L="$$inherit_",M=" with incoming value '",J="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",K="qx.core.Property",D="is",E='Could not change or apply init value after constructing phase!',u="();",t='else ',w='if(this.',v="resetRuntime",q="return this.",p="get",s=";",r="(a[",o=' of an instance of ',n="refresh",R=' is not (yet) ready!");',S="]);",T="resetThemed",U='else if(this.',N="reset",O="setRuntime",P="init",Q="set",V="setThemed",W='!==undefined)',C="this.",B="",A='return this.',z="string",y="boolean",x=';';qx.Bootstrap.define(K,{statics:{__p:function(){if(qx.core.Environment.get(bJ)){qx.event.type.Data;qx.event.dispatch.Direct;}
;}
,__q:{"Boolean":F,"String":f,"Number":bN,"Integer":bT,"PositiveNumber":bm,"PositiveInteger":bG,"Error":bf,"RegExp":bQ,"Object":e,"Array":bn,"Map":bO,"Function":j,"Date":bs,"Node":X,"Element":bv,"Document":bz,"Window":bU,"Event":bV,"Class":h,"Mixin":by,"Interface":bE,"Theme":b,"Color":bB,"Decorator":bI,"Font":bA},__r:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:bd,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:z,dereference:y,inheritable:y,nullable:y,themeable:y,refine:y,init:null,apply:z,event:z,check:null,transform:z,deferredInit:y,validate:null},$$allowedGroupKeys:{name:z,group:k,mode:z,themeable:y},$$inheritable:{},__s:function(bW){var bX=this.__t(bW);if(!bX.length){var bY=function(){}
;}
else {bY=this.__u(bX);}
;bW.prototype.$$refreshInheritables=bY;}
,__t:function(ca){var cc=[];while(ca){var cb=ca.$$properties;if(cb){for(var name in this.$$inheritable){if(cb[name]&&cb[name].inheritable){cc.push(name);}
;}
;}
;ca=ca.superclass;}
;return cc;}
,__u:function(cd){var ch=this.$$store.inherit;var cg=this.$$store.init;var cf=this.$$method.refresh;var ce=[bu,bh];for(var i=0,l=cd.length;i<l;i++){var name=cd[i];ce.push(bC,ch[name],s,g,cg[name],s,C,cf[name],bK);}
;return new Function(ce.join(B));}
,attachRefreshInheritables:function(ci){ci.prototype.$$refreshInheritables=function(){qx.core.Property.__s(ci);return this.$$refreshInheritables();}
;}
,attachMethods:function(cj,name,ck){ck.group?this.__v(cj,ck,name):this.__w(cj,ck,name);}
,__v:function(cl,cm,name){var ct=qx.Bootstrap.firstUp(name);var cs=cl.prototype;var cu=cm.themeable===true;{}
;var cv=[];var cp=[];if(cu){var cn=[];var cr=[];}
;var cq=bi;cv.push(cq);if(cu){cn.push(cq);}
;if(cm.mode==bR){var co=J;cv.push(co);if(cu){cn.push(co);}
;}
;for(var i=0,a=cm.group,l=a.length;i<l;i++){{}
;cv.push(C,this.$$method.set[a[i]],r,i,S);cp.push(C,this.$$method.reset[a[i]],u);if(cu){{}
;cn.push(C,this.$$method.setThemed[a[i]],r,i,S);cr.push(C,this.$$method.resetThemed[a[i]],u);}
;}
;this.$$method.set[name]=Q+ct;cs[this.$$method.set[name]]=new Function(cv.join(B));this.$$method.reset[name]=N+ct;cs[this.$$method.reset[name]]=new Function(cp.join(B));if(cu){this.$$method.setThemed[name]=V+ct;cs[this.$$method.setThemed[name]]=new Function(cn.join(B));this.$$method.resetThemed[name]=T+ct;cs[this.$$method.resetThemed[name]]=new Function(cr.join(B));}
;}
,__w:function(cw,cx,name){var cz=qx.Bootstrap.firstUp(name);var cB=cw.prototype;{}
;if(cx.dereference===undefined&&typeof cx.check===z){cx.dereference=this.__x(cx.check);}
;var cA=this.$$method;var cy=this.$$store;cy.runtime[name]=bL+name;cy.user[name]=bk+name;cy.theme[name]=bP+name;cy.init[name]=m+name;cy.inherit[name]=L+name;cy.useinit[name]=bD+name;cA.get[name]=p+cz;cB[cA.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,cw,name,p);}
;cA.set[name]=Q+cz;cB[cA.set[name]]=function(cC){return qx.core.Property.executeOptimizedSetter(this,cw,name,Q,arguments);}
;cA.reset[name]=N+cz;cB[cA.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cw,name,N);}
;if(cx.inheritable||cx.apply||cx.event||cx.deferredInit){cA.init[name]=P+cz;cB[cA.init[name]]=function(cD){return qx.core.Property.executeOptimizedSetter(this,cw,name,P,arguments);}
;}
;if(cx.inheritable){cA.refresh[name]=n+cz;cB[cA.refresh[name]]=function(cE){return qx.core.Property.executeOptimizedSetter(this,cw,name,n,arguments);}
;}
;cA.setRuntime[name]=O+cz;cB[cA.setRuntime[name]]=function(cF){return qx.core.Property.executeOptimizedSetter(this,cw,name,O,arguments);}
;cA.resetRuntime[name]=v+cz;cB[cA.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cw,name,v);}
;if(cx.themeable){cA.setThemed[name]=V+cz;cB[cA.setThemed[name]]=function(cG){return qx.core.Property.executeOptimizedSetter(this,cw,name,V,arguments);}
;cA.resetThemed[name]=T+cz;cB[cA.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,cw,name,T);}
;}
;if(cx.check===bp){cB[G+cz]=new Function(q+cA.set[name]+I+cA.get[name]+c);cB[D+cz]=new Function(q+cA.get[name]+bj);}
;}
,__x:function(cH){return !!this.__r[cH];}
,__y:function(cI){return this.__r[cI]||qx.util.OOUtil.classIsDefined(cI)||(qx.Interface&&qx.Interface.isDefined(cI));}
,__z:{'0':E,'1':bl,'2':be,'3':bq,'4':bM,'5':bc},error:function(cJ,cK,cL,cM,cN){var cO=cJ.constructor.classname;var cP=bt+cL+Y+cO+bg+this.$$method[cM][cL]+M+cN+ba;throw new Error(cP+(this.__z[cK]||"Unknown reason: "+cK));}
,__A:function(cQ,cR,name,cS,cT,cU){var cV=this.$$method[cS][name];{cR[cV]=new Function("value",cT.join(""));}
;if(qx.core.Environment.get("qx.aspects")){cR[cV]=qx.core.Aspect.wrap(cQ.classname+"."+cV,cR[cV],"property");}
;qx.Bootstrap.setDisplayName(cR[cV],cQ.classname+".prototype",cV);if(cU===undefined){return cQ[cV]();}
else {return cQ[cV](cU[0]);}
;}
,executeOptimizedGetter:function(cW,cX,name,cY){var db=cX.$$properties[name];var dd=cX.prototype;var da=[];var dc=this.$$store;da.push(w,dc.runtime[name],W);da.push(A,dc.runtime[name],x);if(db.inheritable){da.push(U,dc.inherit[name],W);da.push(A,dc.inherit[name],x);da.push(t);}
;da.push(w,dc.user[name],W);da.push(A,dc.user[name],x);if(db.themeable){da.push(U,dc.theme[name],W);da.push(A,dc.theme[name],x);}
;if(db.deferredInit&&db.init===undefined){da.push(U,dc.init[name],W);da.push(A,dc.init[name],x);}
;da.push(t);if(db.init!==undefined){if(db.inheritable){da.push(bw,dc.init[name],x);if(db.nullable){da.push(bH);}
else if(db.init!==undefined){da.push(A,dc.init[name],x);}
else {da.push(br,name,o,cX.classname,R);}
;da.push(bx);}
else {da.push(A,dc.init[name],x);}
;}
else if(db.inheritable||db.nullable){da.push(d);}
else {da.push(H,name,o,cX.classname,R);}
;return this.__A(cW,dd,name,cY,da);}
,executeOptimizedSetter:function(de,df,name,dg,dh){var dm=df.$$properties[name];var dl=df.prototype;var dj=[];var di=dg===Q||dg===V||dg===O||(dg===P&&dm.init===undefined);var dk=dm.apply||dm.event||dm.inheritable;var dn=this.__B(dg,name);this.__C(dj,dm,name,dg,di);if(di){this.__D(dj,df,dm,name);}
;if(dk){this.__E(dj,di,dn,dg);}
;if(dm.inheritable){dj.push(bF);}
;{}
;if(!dk){this.__G(dj,name,dg,di);}
else {this.__H(dj,dm,name,dg,di);}
;if(dm.inheritable){this.__I(dj,dm,name,dg);}
else if(dk){this.__J(dj,dm,name,dg);}
;if(dk){this.__K(dj,dm,name,dg);if(dm.inheritable&&dl._getChildren){this.__L(dj,name);}
;}
;if(di){dj.push(bo);}
;return this.__A(de,dl,name,dg,dj,dh);}
,__B:function(dp,name){if(dp==="setRuntime"||dp==="resetRuntime"){var dq=this.$$store.runtime[name];}
else if(dp==="setThemed"||dp==="resetThemed"){dq=this.$$store.theme[name];}
else if(dp==="init"){dq=this.$$store.init[name];}
else {dq=this.$$store.user[name];}
;return dq;}
,__C:function(dr,ds,name,dt,du){{if(!ds.nullable||ds.check||ds.inheritable){dr.push('var prop=qx.core.Property;');}
;if(dt==="set"){dr.push('if(value===undefined)prop.error(this,2,"',name,'","',dt,'",value);');}
;}
;}
,__D:function(dv,dw,dx,name){if(dx.transform){dv.push('value=this.',dx.transform,'(value);');}
;if(dx.validate){if(typeof dx.validate==="string"){dv.push('this.',dx.validate,'(value);');}
else if(dx.validate instanceof Function){dv.push(dw.classname,'.$$properties.',name);dv.push('.validate.call(this, value);');}
;}
;}
,__E:function(dy,dz,dA,dB){var dC=(dB==="reset"||dB==="resetThemed"||dB==="resetRuntime");if(dz){dy.push('if(this.',dA,'===value)return value;');}
else if(dC){dy.push('if(this.',dA,'===undefined)return;');}
;}
,__F:undefined,__G:function(dD,name,dE,dF){if(dE==="setRuntime"){dD.push('this.',this.$$store.runtime[name],'=value;');}
else if(dE==="resetRuntime"){dD.push('if(this.',this.$$store.runtime[name],'!==undefined)');dD.push('delete this.',this.$$store.runtime[name],';');}
else if(dE==="set"){dD.push('this.',this.$$store.user[name],'=value;');}
else if(dE==="reset"){dD.push('if(this.',this.$$store.user[name],'!==undefined)');dD.push('delete this.',this.$$store.user[name],';');}
else if(dE==="setThemed"){dD.push('this.',this.$$store.theme[name],'=value;');}
else if(dE==="resetThemed"){dD.push('if(this.',this.$$store.theme[name],'!==undefined)');dD.push('delete this.',this.$$store.theme[name],';');}
else if(dE==="init"&&dF){dD.push('this.',this.$$store.init[name],'=value;');}
;}
,__H:function(dG,dH,name,dI,dJ){if(dH.inheritable){dG.push('var computed, old=this.',this.$$store.inherit[name],';');}
else {dG.push('var computed, old;');}
;dG.push('if(this.',this.$$store.runtime[name],'!==undefined){');if(dI==="setRuntime"){dG.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dI==="resetRuntime"){dG.push('delete this.',this.$$store.runtime[name],';');dG.push('if(this.',this.$$store.user[name],'!==undefined)');dG.push('computed=this.',this.$$store.user[name],';');dG.push('else if(this.',this.$$store.theme[name],'!==undefined)');dG.push('computed=this.',this.$$store.theme[name],';');dG.push('else if(this.',this.$$store.init[name],'!==undefined){');dG.push('computed=this.',this.$$store.init[name],';');dG.push('this.',this.$$store.useinit[name],'=true;');dG.push('}');}
else {dG.push('old=computed=this.',this.$$store.runtime[name],';');if(dI==="set"){dG.push('this.',this.$$store.user[name],'=value;');}
else if(dI==="reset"){dG.push('delete this.',this.$$store.user[name],';');}
else if(dI==="setThemed"){dG.push('this.',this.$$store.theme[name],'=value;');}
else if(dI==="resetThemed"){dG.push('delete this.',this.$$store.theme[name],';');}
else if(dI==="init"&&dJ){dG.push('this.',this.$$store.init[name],'=value;');}
;}
;dG.push('}');dG.push('else if(this.',this.$$store.user[name],'!==undefined){');if(dI==="set"){if(!dH.inheritable){dG.push('old=this.',this.$$store.user[name],';');}
;dG.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dI==="reset"){if(!dH.inheritable){dG.push('old=this.',this.$$store.user[name],';');}
;dG.push('delete this.',this.$$store.user[name],';');dG.push('if(this.',this.$$store.runtime[name],'!==undefined)');dG.push('computed=this.',this.$$store.runtime[name],';');dG.push('if(this.',this.$$store.theme[name],'!==undefined)');dG.push('computed=this.',this.$$store.theme[name],';');dG.push('else if(this.',this.$$store.init[name],'!==undefined){');dG.push('computed=this.',this.$$store.init[name],';');dG.push('this.',this.$$store.useinit[name],'=true;');dG.push('}');}
else {if(dI==="setRuntime"){dG.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dH.inheritable){dG.push('computed=this.',this.$$store.user[name],';');}
else {dG.push('old=computed=this.',this.$$store.user[name],';');}
;if(dI==="setThemed"){dG.push('this.',this.$$store.theme[name],'=value;');}
else if(dI==="resetThemed"){dG.push('delete this.',this.$$store.theme[name],';');}
else if(dI==="init"&&dJ){dG.push('this.',this.$$store.init[name],'=value;');}
;}
;dG.push('}');if(dH.themeable){dG.push('else if(this.',this.$$store.theme[name],'!==undefined){');if(!dH.inheritable){dG.push('old=this.',this.$$store.theme[name],';');}
;if(dI==="setRuntime"){dG.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dI==="set"){dG.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dI==="setThemed"){dG.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(dI==="resetThemed"){dG.push('delete this.',this.$$store.theme[name],';');dG.push('if(this.',this.$$store.init[name],'!==undefined){');dG.push('computed=this.',this.$$store.init[name],';');dG.push('this.',this.$$store.useinit[name],'=true;');dG.push('}');}
else if(dI==="init"){if(dJ){dG.push('this.',this.$$store.init[name],'=value;');}
;dG.push('computed=this.',this.$$store.theme[name],';');}
else if(dI==="refresh"){dG.push('computed=this.',this.$$store.theme[name],';');}
;dG.push('}');}
;dG.push('else if(this.',this.$$store.useinit[name],'){');if(!dH.inheritable){dG.push('old=this.',this.$$store.init[name],';');}
;if(dI==="init"){if(dJ){dG.push('computed=this.',this.$$store.init[name],'=value;');}
else {dG.push('computed=this.',this.$$store.init[name],';');}
;}
else if(dI==="set"||dI==="setRuntime"||dI==="setThemed"||dI==="refresh"){dG.push('delete this.',this.$$store.useinit[name],';');if(dI==="setRuntime"){dG.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dI==="set"){dG.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dI==="setThemed"){dG.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(dI==="refresh"){dG.push('computed=this.',this.$$store.init[name],';');}
;}
;dG.push('}');if(dI==="set"||dI==="setRuntime"||dI==="setThemed"||dI==="init"){dG.push('else{');if(dI==="setRuntime"){dG.push('computed=this.',this.$$store.runtime[name],'=value;');}
else if(dI==="set"){dG.push('computed=this.',this.$$store.user[name],'=value;');}
else if(dI==="setThemed"){dG.push('computed=this.',this.$$store.theme[name],'=value;');}
else if(dI==="init"){if(dJ){dG.push('computed=this.',this.$$store.init[name],'=value;');}
else {dG.push('computed=this.',this.$$store.init[name],';');}
;dG.push('this.',this.$$store.useinit[name],'=true;');}
;dG.push('}');}
;}
,__I:function(dK,dL,name,dM){dK.push('if(computed===undefined||computed===inherit){');if(dM==="refresh"){dK.push('computed=value;');}
else {dK.push('var pa=this.getLayoutParent();if(pa)computed=pa.',this.$$store.inherit[name],';');}
;dK.push('if((computed===undefined||computed===inherit)&&');dK.push('this.',this.$$store.init[name],'!==undefined&&');dK.push('this.',this.$$store.init[name],'!==inherit){');dK.push('computed=this.',this.$$store.init[name],';');dK.push('this.',this.$$store.useinit[name],'=true;');dK.push('}else{');dK.push('delete this.',this.$$store.useinit[name],';}');dK.push('}');dK.push('if(old===computed)return value;');dK.push('if(computed===inherit){');dK.push('computed=undefined;delete this.',this.$$store.inherit[name],';');dK.push('}');dK.push('else if(computed===undefined)');dK.push('delete this.',this.$$store.inherit[name],';');dK.push('else this.',this.$$store.inherit[name],'=computed;');dK.push('var backup=computed;');if(dL.init!==undefined&&dM!=="init"){dK.push('if(old===undefined)old=this.',this.$$store.init[name],";");}
else {dK.push('if(old===undefined)old=null;');}
;dK.push('if(computed===undefined||computed==inherit)computed=null;');}
,__J:function(dN,dO,name,dP){if(dP!=="set"&&dP!=="setRuntime"&&dP!=="setThemed"){dN.push('if(computed===undefined)computed=null;');}
;dN.push('if(old===computed)return value;');if(dO.init!==undefined&&dP!=="init"){dN.push('if(old===undefined)old=this.',this.$$store.init[name],";");}
else {dN.push('if(old===undefined)old=null;');}
;}
,__K:function(dQ,dR,name,dS){if(dR.apply){dQ.push('this.',dR.apply,'(computed, old, "',name,'", "',dS,'");');}
;if(dR.event){dQ.push("var reg=qx.event.Registration;","if(reg.hasListener(this, '",dR.event,"')){","reg.fireEvent(this, '",dR.event,"', qx.event.type.Data, [computed, old]",")}");}
;}
,__L:function(dT,name){dT.push('var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){');dT.push('if(a[i].',this.$$method.refresh[name],')a[i].',this.$$method.refresh[name],'(backup);');dT.push('}');}
},defer:function(dU){var dW=navigator.userAgent.indexOf(bb)!=-1;var dV=navigator.userAgent.indexOf(bS)!=-1;if(dW||dV){dU.__x=dU.__y;}
;}
});}
)();
(function(){var k="[Class ",j="]",h="constructor",g="extend",f="qx.Class",e="qx.aspects",d="Array",c=".",b="static";qx.Bootstrap.define(f,{statics:{__M:qx.core.Environment.get("module.property")?qx.core.Property:null,define:function(name,m){if(!m){m={};}
;if(m.include&&!(qx.Bootstrap.getClass(m.include)===d)){m.include=[m.include];}
;if(m.implement&&!(qx.Bootstrap.getClass(m.implement)===d)){m.implement=[m.implement];}
;var n=false;if(!m.hasOwnProperty(g)&&!m.type){m.type=b;n=true;}
;{}
;var p=this.__P(name,m.type,m.extend,m.statics,m.construct,m.destruct,m.include);if(m.extend){if(m.properties){this.__R(p,m.properties,true);}
;if(m.members){this.__T(p,m.members,true,true,false);}
;if(m.events){this.__Q(p,m.events,true);}
;if(m.include){for(var i=0,l=m.include.length;i<l;i++){this.__X(p,m.include[i],false);}
;}
;}
;if(m.environment){for(var o in m.environment){qx.core.Environment.add(o,m.environment[o]);}
;}
;if(m.implement){for(var i=0,l=m.implement.length;i<l;i++){this.__V(p,m.implement[i]);}
;}
;{}
;if(m.defer){m.defer.self=p;m.defer(p,p.prototype,{add:function(name,q){var r={};r[name]=q;qx.Class.__R(p,r,true);}
});}
;return p;}
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
,getPropertyDefinition:qx.util.OOUtil.getPropertyDefinition,getProperties:function(B){var C=[];while(B){if(B.$$properties){C.push.apply(C,Object.keys(B.$$properties));}
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
,getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;this.$$instance=new this();delete this.$$allowconstruct;}
;return this.$$instance;}
,genericToString:function(){return k+this.classname+j;}
,$$registry:qx.Bootstrap.$$registry,__h:null,__N:null,__i:function(){}
,__O:function(){}
,__P:function(name,U,V,W,X,Y,ba){var bd;if(!V&&qx.core.Environment.get("qx.aspects")==false){bd=W||{};qx.Bootstrap.setDisplayNames(bd,name);}
else {bd={};if(V){if(!X){X=this.__Y();}
;if(this.__bb(V,ba)){bd=this.__bc(X,name,U);}
else {bd=X;}
;if(U==="singleton"){bd.getInstance=this.getInstance;}
;qx.Bootstrap.setDisplayName(X,name,"constructor");}
;if(W){qx.Bootstrap.setDisplayNames(W,name);var be;for(var i=0,a=Object.keys(W),l=a.length;i<l;i++){be=a[i];var bb=W[be];if(qx.core.Environment.get("qx.aspects")){if(bb instanceof Function){bb=qx.core.Aspect.wrap(name+"."+be,bb,"static");}
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
,__S:null,__T:function(bo,bp,bq,br,bs){var bt=bo.prototype;var bv,bu;qx.Bootstrap.setDisplayNames(bp,bo.classname+".prototype");for(var i=0,a=Object.keys(bp),l=a.length;i<l;i++){bv=a[i];bu=bp[bv];{}
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
,__W:function(bD){var name=bD.classname;var bE=this.__bc(bD,name,bD.$$classtype);for(var i=0,a=Object.keys(bD),l=a.length;i<l;i++){bF=a[i];bE[bF]=bD[bF];}
;bE.prototype=bD.prototype;var bH=bD.prototype;for(var i=0,a=Object.keys(bH),l=a.length;i<l;i++){bF=a[i];var bI=bH[bF];if(bI&&bI.self==bD){bI.self=bE;}
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
(function(){var m="Boolean",l=") to the object '",k="Integer",h=" of object ",g="qx.data.SingleValueBinding",f="Binding property ",d="Binding from '",c="PositiveNumber",b="PositiveInteger",a="Binding does not exist!",F=").",E="Date",D=" not possible: No event available. ",C="qx.debug.databinding",B="set",A="deepBinding",z="item",y="reset",x="' (",w="String",u="Number",v="change",s="]",t=".",q="last",r="[",n="",p="get";qx.Class.define(g,{statics:{__bg:{},bind:function(G,H,I,J,K){var V=this.__bi(G,H,I,J,K);var Q=H.split(t);var M=this.__bo(Q);var U=[];var R=[];var S=[];var O=[];var P=G;try{for(var i=0;i<Q.length;i++){if(M[i]!==n){O.push(v);}
else {O.push(this.__bj(P,Q[i]));}
;U[i]=P;if(i==Q.length-1){if(M[i]!==n){var ba=M[i]===q?P.length-1:M[i];var L=P.getItem(ba);this.__bn(L,I,J,K,G);S[i]=this.__bp(P,O[i],I,J,K,M[i]);}
else {if(Q[i]!=null&&P[p+qx.lang.String.firstUp(Q[i])]!=null){var L=P[p+qx.lang.String.firstUp(Q[i])]();this.__bn(L,I,J,K,G);}
;S[i]=this.__bp(P,O[i],I,J,K);}
;}
else {var W={index:i,propertyNames:Q,sources:U,listenerIds:S,arrayIndexValues:M,targetObject:I,targetPropertyChain:J,options:K,listeners:R};var T=qx.lang.Function.bind(this.__bh,this,W);R.push(T);S[i]=P.addListener(O[i],T);}
;if(P[p+qx.lang.String.firstUp(Q[i])]==null){P=null;}
else if(M[i]!==n){P=P[p+qx.lang.String.firstUp(Q[i])](M[i]);}
else {P=P[p+qx.lang.String.firstUp(Q[i])]();}
;if(!P){break;}
;}
;}
catch(bb){for(var i=0;i<U.length;i++){if(U[i]&&S[i]){U[i].removeListenerById(S[i]);}
;}
;var Y=V.targets;var N=V.listenerIds[i];for(var i=0;i<Y.length;i++){if(Y[i]&&N[i]){Y[i].removeListenerById(N[i]);}
;}
;throw bb;}
;var X={type:A,listenerIds:S,sources:U,targetListenerIds:V.listenerIds,targets:V.targets};this.__bq(X,G,H,I,J);return X;}
,__bh:function(bc){if(bc.options&&bc.options.onUpdate){bc.options.onUpdate(bc.sources[bc.index],bc.targetObject);}
;for(var j=bc.index+1;j<bc.propertyNames.length;j++){var bg=bc.sources[j];bc.sources[j]=null;if(!bg){continue;}
;bg.removeListenerById(bc.listenerIds[j]);}
;var bg=bc.sources[bc.index];for(var j=bc.index+1;j<bc.propertyNames.length;j++){if(bc.arrayIndexValues[j-1]!==n){bg=bg[p+qx.lang.String.firstUp(bc.propertyNames[j-1])](bc.arrayIndexValues[j-1]);}
else {bg=bg[p+qx.lang.String.firstUp(bc.propertyNames[j-1])]();}
;bc.sources[j]=bg;if(!bg){this.__bk(bc.targetObject,bc.targetPropertyChain);break;}
;if(j==bc.propertyNames.length-1){if(qx.Class.implementsInterface(bg,qx.data.IListData)){var bh=bc.arrayIndexValues[j]===q?bg.length-1:bc.arrayIndexValues[j];var be=bg.getItem(bh);this.__bn(be,bc.targetObject,bc.targetPropertyChain,bc.options,bc.sources[bc.index]);bc.listenerIds[j]=this.__bp(bg,v,bc.targetObject,bc.targetPropertyChain,bc.options,bc.arrayIndexValues[j]);}
else {if(bc.propertyNames[j]!=null&&bg[p+qx.lang.String.firstUp(bc.propertyNames[j])]!=null){var be=bg[p+qx.lang.String.firstUp(bc.propertyNames[j])]();this.__bn(be,bc.targetObject,bc.targetPropertyChain,bc.options,bc.sources[bc.index]);}
;var bf=this.__bj(bg,bc.propertyNames[j]);bc.listenerIds[j]=this.__bp(bg,bf,bc.targetObject,bc.targetPropertyChain,bc.options);}
;}
else {if(bc.listeners[j]==null){var bd=qx.lang.Function.bind(this.__bh,this,bc);bc.listeners.push(bd);}
;if(qx.Class.implementsInterface(bg,qx.data.IListData)){var bf=v;}
else {var bf=this.__bj(bg,bc.propertyNames[j]);}
;bc.listenerIds[j]=bg.addListener(bf,bc.listeners[j]);}
;}
;}
,__bi:function(bi,bj,bk,bl,bm){var bq=bl.split(t);var bo=this.__bo(bq);var bv=[];var bu=[];var bs=[];var br=[];var bp=bk;for(var i=0;i<bq.length-1;i++){if(bo[i]!==n){br.push(v);}
else {try{br.push(this.__bj(bp,bq[i]));}
catch(e){break;}
;}
;bv[i]=bp;var bt=function(){for(var j=i+1;j<bq.length-1;j++){var by=bv[j];bv[j]=null;if(!by){continue;}
;by.removeListenerById(bs[j]);}
;var by=bv[i];for(var j=i+1;j<bq.length-1;j++){var bw=qx.lang.String.firstUp(bq[j-1]);if(bo[j-1]!==n){var bz=bo[j-1]===q?by.getLength()-1:bo[j-1];by=by[p+bw](bz);}
else {by=by[p+bw]();}
;bv[j]=by;if(bu[j]==null){bu.push(bt);}
;if(qx.Class.implementsInterface(by,qx.data.IListData)){var bx=v;}
else {try{var bx=qx.data.SingleValueBinding.__bj(by,bq[j]);}
catch(e){break;}
;}
;bs[j]=by.addListener(bx,bu[j]);}
;qx.data.SingleValueBinding.updateTarget(bi,bj,bk,bl,bm);}
;bu.push(bt);bs[i]=bp.addListener(br[i],bt);var bn=qx.lang.String.firstUp(bq[i]);if(bp[p+bn]==null){bp=null;}
else if(bo[i]!==n){bp=bp[p+bn](bo[i]);}
else {bp=bp[p+bn]();}
;if(!bp){break;}
;}
;return {listenerIds:bs,targets:bv};}
,updateTarget:function(bA,bB,bC,bD,bE){var bF=this.resolvePropertyChain(bA,bB);bF=qx.data.SingleValueBinding.__br(bF,bC,bD,bE,bA);this.__bl(bC,bD,bF);}
,resolvePropertyChain:function(o,bG){var bK=this.__bm(o,bG);var bI;if(bK!=null){var bM=bG.substring(bG.lastIndexOf(t)+1,bG.length);if(bM.charAt(bM.length-1)==s){var bH=bM.substring(bM.lastIndexOf(r)+1,bM.length-1);var bJ=bM.substring(0,bM.lastIndexOf(r));var bL=bK[p+qx.lang.String.firstUp(bJ)]();if(bH==q){bH=bL.length-1;}
;if(bL!=null){bI=bL.getItem(bH);}
;}
else {bI=bK[p+qx.lang.String.firstUp(bM)]();}
;}
;return bI;}
,__bj:function(bN,bO){var bP=this.__bs(bN,bO);if(bP==null){if(qx.Class.supportsEvent(bN.constructor,bO)){bP=bO;}
else if(qx.Class.supportsEvent(bN.constructor,v+qx.lang.String.firstUp(bO))){bP=v+qx.lang.String.firstUp(bO);}
else {throw new qx.core.AssertionError(f+bO+h+bN+D);}
;}
;return bP;}
,__bk:function(bQ,bR){var bS=this.__bm(bQ,bR);if(bS!=null){var bT=bR.substring(bR.lastIndexOf(t)+1,bR.length);if(bT.charAt(bT.length-1)==s){this.__bl(bQ,bR,null);return;}
;if(bS[y+qx.lang.String.firstUp(bT)]!=undefined){bS[y+qx.lang.String.firstUp(bT)]();}
else {bS[B+qx.lang.String.firstUp(bT)](null);}
;}
;}
,__bl:function(bU,bV,bW){var cb=this.__bm(bU,bV);if(cb!=null){var cc=bV.substring(bV.lastIndexOf(t)+1,bV.length);if(cc.charAt(cc.length-1)==s){var bX=cc.substring(cc.lastIndexOf(r)+1,cc.length-1);var ca=cc.substring(0,cc.lastIndexOf(r));var bY=bU;if(!qx.Class.implementsInterface(bY,qx.data.IListData)){bY=cb[p+qx.lang.String.firstUp(ca)]();}
;if(bX==q){bX=bY.length-1;}
;if(bY!=null){bY.setItem(bX,bW);}
;}
else {cb[B+qx.lang.String.firstUp(cc)](bW);}
;}
;}
,__bm:function(cd,ce){var ch=ce.split(t);var ci=cd;for(var i=0;i<ch.length-1;i++){try{var cg=ch[i];if(cg.indexOf(s)==cg.length-1){var cf=cg.substring(cg.indexOf(r)+1,cg.length-1);cg=cg.substring(0,cg.indexOf(r));}
;if(cg!=n){ci=ci[p+qx.lang.String.firstUp(cg)]();}
;if(cf!=null){if(cf==q){cf=ci.length-1;}
;ci=ci.getItem(cf);cf=null;}
;}
catch(cj){return null;}
;}
;return ci;}
,__bn:function(ck,cl,cm,cn,co){ck=this.__br(ck,cl,cm,cn,co);if(ck===undefined){this.__bk(cl,cm);}
;if(ck!==undefined){try{this.__bl(cl,cm,ck);if(cn&&cn.onUpdate){cn.onUpdate(co,cl,ck);}
;}
catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;}
;if(cn&&cn.onSetFail){cn.onSetFail(e);}
else {qx.log.Logger.warn("Failed so set value "+ck+" on "+cl+". Error message: "+e);}
;}
;}
;}
,__bo:function(cp){var cq=[];for(var i=0;i<cp.length;i++){var name=cp[i];if(qx.lang.String.endsWith(name,s)){var cr=name.substring(name.indexOf(r)+1,name.indexOf(s));if(name.indexOf(s)!=name.length-1){throw new Error("Please use only one array at a time: "+name+" does not work.");}
;if(cr!==q){if(cr==n||isNaN(parseInt(cr,10))){throw new Error("No number or 'last' value hast been given"+" in an array binding: "+name+" does not work.");}
;}
;if(name.indexOf(r)!=0){cp[i]=name.substring(0,name.indexOf(r));cq[i]=n;cq[i+1]=cr;cp.splice(i+1,0,z);i++;}
else {cq[i]=cr;cp.splice(i,1,z);}
;}
else {cq[i]=n;}
;}
;return cq;}
,__bp:function(cs,ct,cu,cv,cw,cx){var cy;{}
;var cA=function(cB,e){if(cB!==n){if(cB===q){cB=cs.length-1;}
;var cE=cs.getItem(cB);if(cE===undefined){qx.data.SingleValueBinding.__bk(cu,cv);}
;var cC=e.getData().start;var cD=e.getData().end;if(cB<cC||cB>cD){return;}
;}
else {var cE=e.getData();}
;if(qx.core.Environment.get(C)){qx.log.Logger.debug("Binding executed from "+cs+" by "+ct+" to "+cu+" ("+cv+")");qx.log.Logger.debug("Data before conversion: "+cE);}
;cE=qx.data.SingleValueBinding.__br(cE,cu,cv,cw,cs);if(qx.core.Environment.get(C)){qx.log.Logger.debug("Data after conversion: "+cE);}
;try{if(cE!==undefined){qx.data.SingleValueBinding.__bl(cu,cv,cE);}
else {qx.data.SingleValueBinding.__bk(cu,cv);}
;if(cw&&cw.onUpdate){cw.onUpdate(cs,cu,cE);}
;}
catch(cF){if(!(cF instanceof qx.core.ValidationError)){throw cF;}
;if(cw&&cw.onSetFail){cw.onSetFail(cF);}
else {qx.log.Logger.warn("Failed so set value "+cE+" on "+cu+". Error message: "+cF);}
;}
;}
;if(!cx){cx=n;}
;cA=qx.lang.Function.bind(cA,cs,cx);var cz=cs.addListener(ct,cA);return cz;}
,__bq:function(cG,cH,cI,cJ,cK){if(this.__bg[cH.toHashCode()]===undefined){this.__bg[cH.toHashCode()]=[];}
;this.__bg[cH.toHashCode()].push([cG,cH,cI,cJ,cK]);}
,__br:function(cL,cM,cN,cO,cP){if(cO&&cO.converter){var cR;if(cM.getModel){cR=cM.getModel();}
;return cO.converter(cL,cR,cP,cM);}
else {var cT=this.__bm(cM,cN);var cU=cN.substring(cN.lastIndexOf(t)+1,cN.length);if(cT==null){return cL;}
;var cS=qx.Class.getPropertyDefinition(cT.constructor,cU);var cQ=cS==null?n:cS.check;return this.__bt(cL,cQ);}
;}
,__bs:function(cV,cW){var cX=qx.Class.getPropertyDefinition(cV.constructor,cW);if(cX==null){return null;}
;return cX.event;}
,__bt:function(cY,da){var db=qx.lang.Type.getClass(cY);if((db==u||db==w)&&(da==k||da==b)){cY=parseInt(cY,10);}
;if((db==m||db==u||db==E)&&da==w){cY=cY+n;}
;if((db==u||db==w)&&(da==u||da==c)){cY=parseFloat(cY);}
;return cY;}
,removeBindingFromObject:function(dc,dd){if(dd.type==A){for(var i=0;i<dd.sources.length;i++){if(dd.sources[i]){dd.sources[i].removeListenerById(dd.listenerIds[i]);}
;}
;for(var i=0;i<dd.targets.length;i++){if(dd.targets[i]){dd.targets[i].removeListenerById(dd.targetListenerIds[i]);}
;}
;}
else {dc.removeListenerById(dd);}
;var de=this.__bg[dc.toHashCode()];if(de!=undefined){for(var i=0;i<de.length;i++){if(de[i][0]==dd){qx.lang.Array.remove(de,de[i]);return;}
;}
;}
;throw new Error("Binding could not be found!");}
,removeAllBindingsForObject:function(df){{}
;var dg=this.__bg[df.toHashCode()];if(dg!=undefined){for(var i=dg.length-1;i>=0;i--){this.removeBindingFromObject(df,dg[i][0]);}
;}
;}
,getAllBindingsForObject:function(dh){if(this.__bg[dh.toHashCode()]===undefined){this.__bg[dh.toHashCode()]=[];}
;return this.__bg[dh.toHashCode()];}
,removeAllBindings:function(){for(var dj in this.__bg){var di=qx.core.ObjectRegistry.fromHashCode(dj);if(di==null){delete this.__bg[dj];continue;}
;this.removeAllBindingsForObject(di);}
;this.__bg={};}
,getAllBindings:function(){return this.__bg;}
,showBindingInLog:function(dk,dl){var dn;for(var i=0;i<this.__bg[dk.toHashCode()].length;i++){if(this.__bg[dk.toHashCode()][i][0]==dl){dn=this.__bg[dk.toHashCode()][i];break;}
;}
;if(dn===undefined){var dm=a;}
else {var dm=d+dn[1]+x+dn[2]+l+dn[3]+x+dn[4]+F;}
;qx.log.Logger.debug(dm);}
,showAllBindingsInLog:function(){for(var dq in this.__bg){var dp=qx.core.ObjectRegistry.fromHashCode(dq);for(var i=0;i<this.__bg[dq].length;i++){this.showBindingInLog(dp,this.__bg[dq][i][0]);}
;}
;}
}});}
)();
(function(){var s="]",r='\\u',q="undefined",p='\\$1',o="0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",n="\\\\",m='-',l="\\\"",k="qx.lang.String",j="(^|[^",c="0",h="%",f=' ',b='\n',a="])[",e="g",d='"',g="";qx.Bootstrap.define(k,{statics:{__bu:o,__bv:null,__bw:{},camelCase:function(t){var u=this.__bw[t];if(!u){u=t.replace(/\-([a-z])/g,function(v,w){return w.toUpperCase();}
);this.__bw[t]=u;}
;return u;}
,hyphenate:function(x){var y=this.__bw[x];if(!y){y=x.replace(/[A-Z]/g,function(z){return (m+z.charAt(0).toLowerCase());}
);this.__bw[x]=y;}
;return y;}
,capitalize:function(A){if(this.__bv===null){var B=r;this.__bv=new RegExp(j+this.__bu.replace(/[0-9A-F]{4}/g,function(C){return B+C;}
)+a+this.__bu.replace(/[0-9A-F]{4}/g,function(D){return B+D;}
)+s,e);}
;return A.replace(this.__bv,function(E){return E.toUpperCase();}
);}
,clean:function(F){return F.replace(/\s+/g,f).trim();}
,trimLeft:function(G){return G.replace(/^\s+/,g);}
,trimRight:function(H){return H.replace(/\s+$/,g);}
,trim:function(I){{}
;return I.replace(/^\s+|\s+$/g,g);}
,startsWith:function(J,K){return J.indexOf(K)===0;}
,endsWith:function(L,M){return L.substring(L.length-M.length,L.length)===M;}
,repeat:function(N,O){return N.length>0?new Array(O+1).join(N):g;}
,pad:function(P,length,Q){var R=length-P.length;if(R>0){if(typeof Q===q){Q=c;}
;return this.repeat(Q,R)+P;}
else {return P;}
;}
,firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(S,T){return S.indexOf(T)!=-1;}
,format:function(U,V){var W=U;var i=V.length;while(i--){W=W.replace(new RegExp(h+(i+1),e),V[i]+g);}
;return W;}
,escapeRegexpChars:function(X){return X.replace(/([.*+?^${}()|[\]\/\\])/g,p);}
,toArray:function(Y){return Y.split(/\B|\b/g);}
,stripTags:function(ba){return ba.replace(/<\/?[^>]+>/gi,g);}
,stripScripts:function(bb,bc){var be=g;var bd=bb.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){be+=arguments[1]+b;return g;}
);if(bc===true){qx.lang.Function.globalEval(be);}
;return bd;}
,quote:function(bf){return d+bf.replace(/\\/g,n).replace(/\"/g,l)+d;}
}});}
)();
(function(){var g="[object Array]",f="qx.lang.Array",e="qx",d="number",c="string",b="mshtml",a="engine.name";qx.Bootstrap.define(f,{statics:{toArray:function(h,j){{}
;return this.cast(h,Array,j);}
,cast:function(k,m,n){if(k.constructor===m){return k;}
;if(qx.data&&qx.data.IListData){if(qx.Class&&qx.Class.hasInterface(k,qx.data.IListData)){var k=k.toArray();}
;}
;var o=new m;if((qx.core.Environment.get(a)==b)){if(k.item){for(var i=n||0,l=k.length;i<l;i++){o.push(k[i]);}
;return o;}
;}
;if(Object.prototype.toString.call(k)===g&&n==null){o.push.apply(o,k);}
else {o.push.apply(o,Array.prototype.slice.call(k,n||0));}
;return o;}
,fromArguments:function(p,q){return Array.prototype.slice.call(p,q||0);}
,fromCollection:function(r){if((qx.core.Environment.get(a)==b)){if(r.item){var s=[];for(var i=0,l=r.length;i<l;i++){s[i]=r[i];}
;return s;}
;}
;return Array.prototype.slice.call(r,0);}
,fromShortHand:function(t){var v=t.length;var u=qx.lang.Array.clone(t);switch(v){case 1:u[1]=u[2]=u[3]=u[0];break;case 2:u[2]=u[0];case 3:u[3]=u[1];};return u;}
,clone:function(w){return w.concat();}
,insertAt:function(x,y,i){x.splice(i,0,y);return x;}
,insertBefore:function(z,A,B){var i=z.indexOf(B);if(i==-1){z.push(A);}
else {z.splice(i,0,A);}
;return z;}
,insertAfter:function(C,D,E){var i=C.indexOf(E);if(i==-1||i==(C.length-1)){C.push(D);}
else {C.splice(i+1,0,D);}
;return C;}
,removeAt:function(F,i){return F.splice(i,1)[0];}
,removeAll:function(G){G.length=0;return this;}
,append:function(H,I){{}
;Array.prototype.push.apply(H,I);return H;}
,exclude:function(J,K){{}
;for(var i=0,M=K.length,L;i<M;i++){L=J.indexOf(K[i]);if(L!=-1){J.splice(L,1);}
;}
;return J;}
,remove:function(N,O){var i=N.indexOf(O);if(i!=-1){N.splice(i,1);return O;}
;}
,contains:function(P,Q){return P.indexOf(Q)!==-1;}
,equals:function(R,S){var length=R.length;if(length!==S.length){return false;}
;for(var i=0;i<length;i++){if(R[i]!==S[i]){return false;}
;}
;return true;}
,sum:function(T){var U=0;for(var i=0,l=T.length;i<l;i++){U+=T[i];}
;return U;}
,max:function(V){{}
;var i,X=V.length,W=V[0];for(i=1;i<X;i++){if(V[i]>W){W=V[i];}
;}
;return W===undefined?null:W;}
,min:function(Y){{}
;var i,bb=Y.length,ba=Y[0];for(i=1;i<bb;i++){if(Y[i]<ba){ba=Y[i];}
;}
;return ba===undefined?null:ba;}
,unique:function(bc){var bm=[],be={},bh={},bj={};var bi,bd=0;var bn=e+Date.now();var bf=false,bl=false,bo=false;for(var i=0,bk=bc.length;i<bk;i++){bi=bc[i];if(bi===null){if(!bf){bf=true;bm.push(bi);}
;}
else if(bi===undefined){}
else if(bi===false){if(!bl){bl=true;bm.push(bi);}
;}
else if(bi===true){if(!bo){bo=true;bm.push(bi);}
;}
else if(typeof bi===c){if(!be[bi]){be[bi]=1;bm.push(bi);}
;}
else if(typeof bi===d){if(!bh[bi]){bh[bi]=1;bm.push(bi);}
;}
else {var bg=bi[bn];if(bg==null){bg=bi[bn]=bd++;}
;if(!bj[bg]){bj[bg]=bi;bm.push(bi);}
;}
;}
;for(var bg in bj){try{delete bj[bg][bn];}
catch(bp){try{bj[bg][bn]=null;}
catch(bq){throw new Error("Cannot clean-up map entry doneObjects["+bg+"]["+bn+"]");}
;}
;}
;return bm;}
}});}
)();
(function(){var u="[object Opera]",t="mshtml",s="8.0",r="AppleWebKit/",q="9.0",p="[^\\.0-9]",o="engine.name",n="webkit",m="4.0",l="1.9.0.0",e="opera",k="Version/",h="5.0",c="engine.version",b="qx.bom.client.Engine",g="Gecko",f="function",i="",a="gecko",j="Maple",d=".";qx.Bootstrap.define(b,{statics:{getVersion:function(){var y=window.navigator.userAgent;var w=i;if(qx.bom.client.Engine.__bx()){if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(y)){if(y.indexOf(k)!=-1){var x=y.match(/Version\/(\d+)\.(\d+)/);w=x[1]+d+x[2].charAt(0)+d+x[2].substring(1,x[2].length);}
else {w=RegExp.$1+d+RegExp.$2;if(RegExp.$3!=i){w+=d+RegExp.$3;}
;}
;}
;}
else if(qx.bom.client.Engine.__by()){if(/AppleWebKit\/([^ ]+)/.test(y)){w=RegExp.$1;var z=RegExp(p).exec(w);if(z){w=w.slice(0,z.index);}
;}
;}
else if(qx.bom.client.Engine.__bA()||qx.bom.client.Engine.__bz()){if(/rv\:([^\);]+)(\)|;)/.test(y)){w=RegExp.$1;}
;}
else if(qx.bom.client.Engine.__bB()){if(/MSIE\s+([^\);]+)(\)|;)/.test(y)){w=RegExp.$1;if(w<8&&/Trident\/([^\);]+)(\)|;)/.test(y)){if(RegExp.$1==m){w=s;}
else if(RegExp.$1==h){w=q;}
;}
;}
;}
else {var v=window.qxFail;if(v&&typeof v===f){w=v().FULLVERSION;}
else {w=l;qx.Bootstrap.warn("Unsupported client: "+y+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");}
;}
;return w;}
,getName:function(){var name;if(qx.bom.client.Engine.__bx()){name=e;}
else if(qx.bom.client.Engine.__by()){name=n;}
else if(qx.bom.client.Engine.__bA()||qx.bom.client.Engine.__bz()){name=a;}
else if(qx.bom.client.Engine.__bB()){name=t;}
else {var A=window.qxFail;if(A&&typeof A===f){name=A().NAME;}
else {name=a;qx.Bootstrap.warn("Unsupported client: "+window.navigator.userAgent+"! Assumed gecko version 1.9.0.0 (Firefox 3.0).");}
;}
;return name;}
,__bx:function(){return window.opera&&Object.prototype.toString.call(window.opera)==u;}
,__by:function(){return window.navigator.userAgent.indexOf(r)!=-1;}
,__bz:function(){return window.navigator.userAgent.indexOf(j)!=-1;}
,__bA:function(){return window.controllers&&window.navigator.product===g&&window.navigator.userAgent.indexOf(j)==-1;}
,__bB:function(){return window.navigator.cpuClass&&/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent);}
},defer:function(B){qx.core.Environment.add(c,B.getVersion);qx.core.Environment.add(o,B.getName);}
});}
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
;{o=qx.event.GlobalError.observeMethod(o);}
;if(n.delay){return window.setTimeout(o,n.delay);}
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
;this.__bG=d||a;this.message=e||qx.type.BaseError.DEFAULTMESSAGE;}
,statics:{DEFAULTMESSAGE:"error"},members:{__bH:null,__bG:null,message:null,getComment:function(){return this.__bG;}
,toString:function(){return this.__bG+(this.message?c+this.message:a);}
}});}
)();
(function(){var a="qx.core.AssertionError";qx.Class.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);this.__bI=qx.dev.StackTrace.getStackTrace();}
,members:{__bI:null,getStackTrace:function(){return this.__bI;}
}});}
)();
(function(){var p="anonymous",o="...",n="qx.dev.StackTrace",m="",l="\n",k="?",j="/source/class/",h="stack",g="prototype",f="stacktrace",c="Error created at",e="function",d="ecmascript.error.stacktrace",b=".",a=":";qx.Bootstrap.define(n,{statics:{FILENAME_TO_CLASSNAME:null,FORMAT_STACKTRACE:null,getStackTrace:function(){var u=[];try{throw new Error();}
catch(F){if(qx.core.Environment.get(d)){var z=qx.dev.StackTrace.getStackTraceFromError(F);var x=qx.dev.StackTrace.getStackTraceFromCaller(arguments);qx.lang.Array.removeAt(z,0);u=x.length>z.length?x:z;for(var i=0;i<Math.min(x.length,z.length);i++){var v=x[i];if(v.indexOf(p)>=0){continue;}
;var t=null;var D=v.split(b);var w=/(.*?)\(/.exec(D[D.length-1]);if(w&&w.length==2){t=w[1];D.pop();}
;if(D[D.length-1]==g){D.pop();}
;var B=D.join(b);var s=z[i];var E=s.split(a);var A=E[0];var q=E[1];var r;if(E[2]){r=E[2];}
;var y=null;if(qx.Class.getByName(A)){y=A;}
else {y=B;}
;var C=y;if(t){C+=b+t;}
;C+=a+q;if(r){C+=a+r;}
;u[i]=C;}
;}
else {u=this.getStackTraceFromCaller(arguments);}
;}
;return u;}
,getStackTraceFromCaller:function(G){var L=[];var K=qx.lang.Function.getCaller(G);var H={};while(K){var I=qx.lang.Function.getName(K);L.push(I);try{K=K.caller;}
catch(M){break;}
;if(!K){break;}
;var J=qx.core.ObjectRegistry.toHashCode(K);if(H[J]){L.push(o);break;}
;H[J]=K;}
;return L;}
,getStackTraceFromError:function(N){var R=[];if(qx.core.Environment.get(d)===h){if(!N.stack){return R;}
;var bd=/@(.+):(\d+)$/gm;var Q;while((Q=bd.exec(N.stack))!=null){var T=Q[1];var bb=Q[2];var Y=this.__bJ(T);R.push(Y+a+bb);}
;if(R.length>0){return this.__bL(R);}
;var bd=/at (.*)/gm;var bc=/\((.*?)(:[^\/].*)\)/;var X=/(.*?)(:[^\/].*)/;var Q;while((Q=bd.exec(N.stack))!=null){var W=bc.exec(Q[1]);if(!W){W=X.exec(Q[1]);}
;if(W){var Y=this.__bJ(W[1]);R.push(Y+W[2]);}
else {R.push(Q[1]);}
;}
;}
else if(qx.core.Environment.get(d)===f){var P=N.stacktrace;if(!P){return R;}
;if(P.indexOf(c)>=0){P=P.split(c)[0];}
;var bd=/line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;var Q;while((Q=bd.exec(P))!=null){var bb=Q[1];var S=Q[2];var T=Q[3];var Y=this.__bJ(T);R.push(Y+a+bb+a+S);}
;if(R.length>0){return this.__bL(R);}
;var bd=/Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;var Q;while((Q=bd.exec(P))!=null){var bb=Q[1];var T=Q[2];var Y=this.__bJ(T);R.push(Y+a+bb);}
;}
else if(N.message&&N.message.indexOf("Backtrace:")>=0){var V=N.message.split("Backtrace:")[1].trim();var U=V.split(l);for(var i=0;i<U.length;i++){var O=U[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);if(O&&O.length>=2){var bb=O[1];var ba=this.__bJ(O[2]);R.push(ba+a+bb);}
;}
;}
else if(N.sourceURL&&N.line){R.push(this.__bJ(N.sourceURL)+a+N.line);}
;return this.__bL(R);}
,__bJ:function(be){if(typeof qx.dev.StackTrace.FILENAME_TO_CLASSNAME==e){var bf=qx.dev.StackTrace.FILENAME_TO_CLASSNAME(be);if(false&&!qx.lang.Type.isString(bf)){throw new Error("FILENAME_TO_CLASSNAME must return a string!");}
;return bf;}
;return qx.dev.StackTrace.__bK(be);}
,__bK:function(bg){var bk=j;var bh=bg.indexOf(bk);var bj=bg.indexOf(k);if(bj>=0){bg=bg.substring(0,bj);}
;var bi=(bh==-1)?bg:bg.substring(bh+bk.length).replace(/\//g,b).replace(/\.js$/,m);return bi;}
,__bL:function(bl){if(typeof qx.dev.StackTrace.FORMAT_STACKTRACE==e){bl=qx.dev.StackTrace.FORMAT_STACKTRACE(bl);if(false&&!qx.lang.Type.isArray(bl)){throw new Error("FORMAT_STACKTRACE must return an array of strings!");}
;}
;return bl;}
}});}
)();
(function(){var h="-",g="",f="qx.core.ObjectRegistry",e="-0",d="qx.debug.dispose",c="$$hash";qx.Class.define(f,{statics:{inShutDown:false,__j:{},__bM:0,__bN:[],__bO:g,__bP:{},register:function(j){var n=this.__j;if(!n){return;}
;var m=j.$$hash;if(m==null){var k=this.__bN;if(k.length>0&&!qx.core.Environment.get(d)){m=k.pop();}
else {m=(this.__bM++)+this.__bO;}
;j.$$hash=m;if(qx.core.Environment.get(d)){if(qx.dev&&qx.dev.Debug&&qx.dev.Debug.disposeProfilingActive){this.__bP[m]=qx.dev.StackTrace.getStackTrace();}
;}
;}
;{}
;n[m]=j;}
,unregister:function(o){var p=o.$$hash;if(p==null){return;}
;var q=this.__j;if(q&&q[p]){delete q[p];this.__bN.push(p);}
;try{delete o.$$hash;}
catch(r){if(o.removeAttribute){o.removeAttribute(c);}
;}
;}
,toHashCode:function(s){{}
;var u=s.$$hash;if(u!=null){return u;}
;var t=this.__bN;if(t.length>0){u=t.pop();}
else {u=(this.__bM++)+this.__bO;}
;return s.$$hash=u;}
,clearHashCode:function(v){{}
;var w=v.$$hash;if(w!=null){this.__bN.push(w);try{delete v.$$hash;}
catch(x){if(v.removeAttribute){v.removeAttribute(c);}
;}
;}
;}
,fromHashCode:function(y){return this.__j[y]||null;}
,shutdown:function(){this.inShutDown=true;var A=this.__j;var C=[];for(var B in A){C.push(B);}
;C.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);}
);var z,i=0,l=C.length;while(true){try{for(;i<l;i++){B=C[i];z=A[B];if(z&&z.dispose){z.dispose();}
;}
;}
catch(D){qx.Bootstrap.error(this,"Could not dispose object "+z.toString()+": "+D,D);if(i!==l){i++;continue;}
;}
;break;}
;qx.Bootstrap.debug(this,"Disposed "+l+" objects");delete this.__j;}
,getRegistry:function(){return this.__j;}
,getNextHash:function(){return this.__bM;}
,getPostId:function(){return this.__bO;}
,getStackTraces:function(){return this.__bP;}
},defer:function(E){if(window&&window.top){var frames=window.top.frames;for(var i=0;i<frames.length;i++){if(frames[i]===window){E.__bO=h+(i+1);return;}
;}
;}
;E.__bO=e;}
});}
)();
(function(){var f="qx.lang.Type",e="Error",d="RegExp",c="Date",b="Number",a="Boolean";qx.Bootstrap.define(f,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(g){return this.getClass(g)==d;}
,isNumber:function(h){return (h!==null&&(this.getClass(h)==b||h instanceof Number));}
,isBoolean:function(i){return (i!==null&&(this.getClass(i)==a||i instanceof Boolean));}
,isDate:function(j){return (j!==null&&(this.getClass(j)==c||j instanceof Date));}
,isError:function(k){return (k!==null&&(this.getClass(k)==e||k instanceof Error));}
}});}
)();
(function(){var a="qx.core.ValidationError";qx.Class.define(a,{extend:qx.type.BaseError});}
)();
(function(){var a="qx.util.RingBuffer";qx.Class.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);}
,members:{__bX:0,__bY:0,__ca:false,__cb:0,__cc:null,__cd:null,setMaxEntries:function(c){this.__cd=c;this.clear();}
,getMaxEntries:function(){return this.__cd;}
,addEntry:function(d){this.__cc[this.__bX]=d;this.__bX=this.__ce(this.__bX,1);var e=this.getMaxEntries();if(this.__bY<e){this.__bY++;}
;if(this.__ca&&(this.__cb<e)){this.__cb++;}
;}
,mark:function(){this.__ca=true;this.__cb=0;}
,clearMark:function(){this.__ca=false;}
,getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);}
,getEntries:function(f,g){if(f>this.__bY){f=this.__bY;}
;if(g&&this.__ca&&(f>this.__cb)){f=this.__cb;}
;if(f>0){var i=this.__ce(this.__bX,-1);var h=this.__ce(i,-f+1);var j;if(h<=i){j=this.__cc.slice(h,i+1);}
else {j=this.__cc.slice(h,this.__bY).concat(this.__cc.slice(0,i+1));}
;}
else {j=[];}
;return j;}
,clear:function(){this.__cc=new Array(this.getMaxEntries());this.__bY=0;this.__cb=0;this.__bX=0;}
,__ce:function(k,l){var m=this.getMaxEntries();var n=(k+l)%m;if(n<0){n+=m;}
;return n;}
}});}
)();
(function(){var a="qx.log.appender.RingBuffer";qx.Class.define(a,{extend:qx.util.RingBuffer,construct:function(b){this.setMaxMessages(b||50);}
,members:{setMaxMessages:function(c){this.setMaxEntries(c);}
,getMaxMessages:function(){return this.getMaxEntries();}
,process:function(d){this.addEntry(d);}
,getAllLogEvents:function(){return this.getAllEntries();}
,retrieveLogEvents:function(e,f){return this.getEntries(e,f);}
,clearHistory:function(){this.clear();}
}});}
)();
(function(){var k="qx.log.Logger",j="[",h="#",g=": ",f="warn",e="document",d="{...(",c="",b="text[",a="[...(",J="\n",I=")}",H=")]",G="object",F="...(+",E="array",D=")",C="info",B="instance",A="string",s="null",t="class",q="number",r="stringify",o="]",p="date",m="unknown",n="function",u="boolean",v="debug",x="map",w="node",z="error",y="undefined";qx.Class.define(k,{statics:{__cf:v,setLevel:function(K){this.__cf=K;}
,getLevel:function(){return this.__cf;}
,setTreshold:function(L){this.__ci.setMaxMessages(L);}
,getTreshold:function(){return this.__ci.getMaxMessages();}
,__cg:{},__ch:0,register:function(M){if(M.$$id){return;}
;var O=this.__ch++;this.__cg[O]=M;M.$$id=O;var N=this.__cj;var P=this.__ci.getAllLogEvents();for(var i=0,l=P.length;i<l;i++){if(N[P[i].level]>=N[this.__cf]){M.process(P[i]);}
;}
;}
,unregister:function(Q){var R=Q.$$id;if(R==null){return;}
;delete this.__cg[R];delete Q.$$id;}
,debug:function(S,T){qx.log.Logger.__ck(v,arguments);}
,info:function(U,V){qx.log.Logger.__ck(C,arguments);}
,warn:function(W,X){qx.log.Logger.__ck(f,arguments);}
,error:function(Y,ba){qx.log.Logger.__ck(z,arguments);}
,trace:function(bb){var bc=qx.dev.StackTrace.getStackTrace();qx.log.Logger.__ck(C,[(typeof bb!==y?[bb].concat(bc):bc).join(J)]);}
,deprecatedMethodWarning:function(bd,be){var bf;{}
;}
,deprecatedClassWarning:function(bg,bh){var bi;{}
;}
,deprecatedEventWarning:function(bj,event,bk){var bl;{}
;}
,deprecatedMixinWarning:function(bm,bn){var bo;{}
;}
,deprecatedConstantWarning:function(bp,bq,br){var self,bs;{}
;}
,deprecateMethodOverriding:function(bt,bu,bv,bw){var bx;{}
;}
,clear:function(){this.__ci.clearHistory();}
,__ci:new qx.log.appender.RingBuffer(50),__cj:{debug:0,info:1,warn:2,error:3},__ck:function(by,bz){var bE=this.__cj;if(bE[by]<bE[this.__cf]){return;}
;var bB=bz.length<2?null:bz[0];var bD=bB?1:0;var bA=[];for(var i=bD,l=bz.length;i<l;i++){bA.push(this.__cm(bz[i],true));}
;var bF=new Date;var bG={time:bF,offset:bF-qx.Bootstrap.LOADSTART,level:by,items:bA,win:window};if(bB){if(bB.$$hash!==undefined){bG.object=bB.$$hash;}
else if(bB.$$type){bG.clazz=bB;}
;}
;this.__ci.process(bG);var bH=this.__cg;for(var bC in bH){bH[bC].process(bG);}
;}
,__cl:function(bI){if(bI===undefined){return y;}
else if(bI===null){return s;}
;if(bI.$$type){return t;}
;var bJ=typeof bI;if(bJ===n||bJ==A||bJ===q||bJ===u){return bJ;}
else if(bJ===G){if(bI.nodeType){return w;}
else if(bI instanceof Error){return z;}
else if(bI.classname){return B;}
else if(bI instanceof Array){return E;}
else if(bI instanceof Date){return p;}
else {return x;}
;}
;if(bI.toString){return r;}
;return m;}
,__cm:function(bK,bL){var bS=this.__cl(bK);var bO=m;var bN=[];switch(bS){case s:case y:bO=bS;break;case A:case q:case u:case p:bO=bK;break;case w:if(bK.nodeType===9){bO=e;}
else if(bK.nodeType===3){bO=b+bK.nodeValue+o;}
else if(bK.nodeType===1){bO=bK.nodeName.toLowerCase();if(bK.id){bO+=h+bK.id;}
;}
else {bO=w;}
;break;case n:bO=qx.lang.Function.getName(bK)||bS;break;case B:bO=bK.basename+j+bK.$$hash+o;break;case t:case r:bO=bK.toString();break;case z:bN=qx.dev.StackTrace.getStackTraceFromError(bK);bO=(bK.basename?bK.basename+g:c)+bK.toString();break;case E:if(bL){bO=[];for(var i=0,l=bK.length;i<l;i++){if(bO.length>20){bO.push(F+(l-i)+D);break;}
;bO.push(this.__cm(bK[i],false));}
;}
else {bO=a+bK.length+H;}
;break;case x:if(bL){var bM;var bR=[];for(var bQ in bK){bR.push(bQ);}
;bR.sort();bO=[];for(var i=0,l=bR.length;i<l;i++){if(bO.length>20){bO.push(F+(l-i)+D);break;}
;bQ=bR[i];bM=this.__cm(bK[bQ],false);bM.key=bQ;bO.push(bM);}
;}
else {var bP=0;for(var bQ in bK){bP++;}
;bO=d+bP+I;}
;break;};return {type:bS,text:bO,trace:bN};}
},defer:function(bT){var bU=qx.Bootstrap.$$logs;for(var i=0;i<bU.length;i++){bT.__ck(bU[i][0],bU[i][1]);}
;qx.Bootstrap.debug=bT.debug;qx.Bootstrap.info=bT.info;qx.Bootstrap.warn=bT.warn;qx.Bootstrap.error=bT.error;qx.Bootstrap.trace=bT.trace;}
});}
)();
(function(){var d="qx.core.MProperty",c="reset",b="get",a="set";qx.Mixin.define(d,{members:{set:function(e,f){var h=qx.core.Property.$$method.set;if(qx.Bootstrap.isString(e)){if(!this[h[e]]){if(this[a+qx.Bootstrap.firstUp(e)]!=undefined){this[a+qx.Bootstrap.firstUp(e)](f);return this;}
;throw new Error("No such property: "+e);}
;return this[h[e]](f);}
else {for(var g in e){if(!this[h[g]]){if(this[a+qx.Bootstrap.firstUp(g)]!=undefined){this[a+qx.Bootstrap.firstUp(g)](e[g]);continue;}
;throw new Error("No such property: "+g);}
;this[h[g]](e[g]);}
;return this;}
;}
,get:function(i){var j=qx.core.Property.$$method.get;if(!this[j[i]]){if(this[b+qx.Bootstrap.firstUp(i)]!=undefined){return this[b+qx.Bootstrap.firstUp(i)]();}
;throw new Error("No such property: "+i);}
;return this[j[i]]();}
,reset:function(k){var l=qx.core.Property.$$method.reset;if(!this[l[k]]){if(this[c+qx.Bootstrap.firstUp(k)]!=undefined){this[c+qx.Bootstrap.firstUp(k)]();return;}
;throw new Error("No such property: "+k);}
;this[l[k]]();}
}});}
)();
(function(){var e="info",d="debug",c="warn",b="qx.core.MLogging",a="error";qx.Mixin.define(b,{members:{__cn:qx.log.Logger,debug:function(f){this.__co(d,arguments);}
,info:function(g){this.__co(e,arguments);}
,warn:function(h){this.__co(c,arguments);}
,error:function(i){this.__co(a,arguments);}
,trace:function(){this.__cn.trace(this);}
,__co:function(j,k){var l=qx.lang.Array.fromArguments(k);l.unshift(this);this.__cn[j].apply(this.__cn,l);}
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
;}
,removeNativeListener:function(o,p,q,r){if(o.removeEventListener){o.removeEventListener(p,q,!!r);}
else if(o.detachEvent){try{o.detachEvent(a+p,q);}
catch(e){if(e.number!==-2146828218){throw e;}
;}
;}
else if(typeof o[a+p]!=b){o[a+p]=null;}
else {{}
;}
;}
,getTarget:function(e){return e.target||e.srcElement;}
,getRelatedTarget:function(e){if(e.relatedTarget!==undefined){if((qx.core.Environment.get(i)==d)){try{e.relatedTarget&&e.relatedTarget.nodeType;}
catch(s){return null;}
;}
;return e.relatedTarget;}
else if(e.fromElement!==undefined&&e.type===f){return e.fromElement;}
else if(e.toElement!==undefined){return e.toElement;}
else {return null;}
;}
,preventDefault:function(e){if(e.preventDefault){e.preventDefault();}
else {try{e.keyCode=0;}
catch(t){}
;e.returnValue=false;}
;}
,stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();}
else {e.cancelBubble=true;}
;}
,fire:function(u,v){if(document.createEvent){var w=document.createEvent(j);w.initEvent(v,true,true);return !u.dispatchEvent(w);}
else {var w=document.createEventObject();return u.fireEvent(a+v,w);}
;}
,supportsEvent:function(x,y){var z=a+y;var A=(z in x);if(!A){A=typeof x[z]==c;if(!A&&x.setAttribute){x.setAttribute(z,g);A=typeof x[z]==c;x.removeAttribute(z);}
;}
;return A;}
}});}
)();
(function(){var r="UNKNOWN_",q="__cu",p="__ct",o="c",n="DOM_",m="WIN_",k="QX_",j="qx.event.Manager",h="capture",g="DOCUMENT_",c="unload",f="",e="_",b="|",a="|bubble",d="|capture";qx.Class.define(j,{extend:Object,construct:function(s,t){this.__cp=s;this.__cq=qx.core.ObjectRegistry.toHashCode(s);this.__cr=t;if(s.qx!==qx){var self=this;qx.bom.Event.addNativeListener(s,c,qx.event.GlobalError.observeMethod(function(){qx.bom.Event.removeNativeListener(s,c,arguments.callee);self.dispose();}
));}
;this.__cs={};this.__ct={};this.__cu={};this.__cv={};}
,statics:{__cw:0,getNextUniqueId:function(){return (this.__cw++)+f;}
},members:{__cr:null,__cs:null,__cu:null,__cx:null,__ct:null,__cv:null,__cp:null,__cq:null,getWindow:function(){return this.__cp;}
,getWindowId:function(){return this.__cq;}
,getHandler:function(u){var v=this.__ct[u.classname];if(v){return v;}
;return this.__ct[u.classname]=new u(this);}
,getDispatcher:function(w){var x=this.__cu[w.classname];if(x){return x;}
;return this.__cu[w.classname]=new w(this,this.__cr);}
,getListeners:function(y,z,A){var B=y.$$hash||qx.core.ObjectRegistry.toHashCode(y);var D=this.__cs[B];if(!D){return null;}
;var E=z+(A?d:a);var C=D[E];return C?C.concat():null;}
,getAllListeners:function(){return this.__cs;}
,serializeListeners:function(F){var M=F.$$hash||qx.core.ObjectRegistry.toHashCode(F);var O=this.__cs[M];var K=[];if(O){var I,N,G,J,L;for(var H in O){I=H.indexOf(b);N=H.substring(0,I);G=H.charAt(I+1)==o;J=O[H];for(var i=0,l=J.length;i<l;i++){L=J[i];K.push({self:L.context,handler:L.handler,type:N,capture:G});}
;}
;}
;return K;}
,toggleAttachedEvents:function(P,Q){var V=P.$$hash||qx.core.ObjectRegistry.toHashCode(P);var X=this.__cs[V];if(X){var S,W,R,T;for(var U in X){S=U.indexOf(b);W=U.substring(0,S);R=U.charCodeAt(S+1)===99;T=X[U];if(Q){this.__cy(P,W,R);}
else {this.__cz(P,W,R);}
;}
;}
;}
,hasListener:function(Y,ba,bb){{}
;var bc=Y.$$hash||qx.core.ObjectRegistry.toHashCode(Y);var be=this.__cs[bc];if(!be){return false;}
;var bf=ba+(bb?d:a);var bd=be[bf];return !!(bd&&bd.length>0);}
,importListeners:function(bg,bh){{}
;var bn=bg.$$hash||qx.core.ObjectRegistry.toHashCode(bg);var bo=this.__cs[bn]={};var bk=qx.event.Manager;for(var bi in bh){var bl=bh[bi];var bm=bl.type+(bl.capture?d:a);var bj=bo[bm];if(!bj){bj=bo[bm]=[];this.__cy(bg,bl.type,bl.capture);}
;bj.push({handler:bl.listener,context:bl.self,unique:bl.unique||(bk.__cw++)+f});}
;}
,addListener:function(bp,bq,br,self,bs){var bw;{}
;var bx=bp.$$hash||qx.core.ObjectRegistry.toHashCode(bp);var bz=this.__cs[bx];if(!bz){bz=this.__cs[bx]={};}
;var bv=bq+(bs?d:a);var bu=bz[bv];if(!bu){bu=bz[bv]=[];}
;if(bu.length===0){this.__cy(bp,bq,bs);}
;var by=(qx.event.Manager.__cw++)+f;var bt={handler:br,context:self,unique:by};bu.push(bt);return bv+b+by;}
,findHandler:function(bA,bB){var bN=false,bF=false,bO=false,bC=false;var bL;if(bA.nodeType===1){bN=true;bL=n+bA.tagName.toLowerCase()+e+bB;}
else if(bA.nodeType===9){bC=true;bL=g+bB;}
else if(bA==this.__cp){bF=true;bL=m+bB;}
else if(bA.classname){bO=true;bL=k+bA.classname+e+bB;}
else {bL=r+bA+e+bB;}
;var bH=this.__cv;if(bH[bL]){return bH[bL];}
;var bK=this.__cr.getHandlers();var bG=qx.event.IEventHandler;var bI,bJ,bE,bD;for(var i=0,l=bK.length;i<l;i++){bI=bK[i];bE=bI.SUPPORTED_TYPES;if(bE&&!bE[bB]){continue;}
;bD=bI.TARGET_CHECK;if(bD){var bM=false;if(bN&&((bD&bG.TARGET_DOMNODE)!=0)){bM=true;}
else if(bF&&((bD&bG.TARGET_WINDOW)!=0)){bM=true;}
else if(bO&&((bD&bG.TARGET_OBJECT)!=0)){bM=true;}
else if(bC&&((bD&bG.TARGET_DOCUMENT)!=0)){bM=true;}
;if(!bM){continue;}
;}
;bJ=this.getHandler(bK[i]);if(bI.IGNORE_CAN_HANDLE||bJ.canHandleEvent(bA,bB)){bH[bL]=bJ;return bJ;}
;}
;return null;}
,__cy:function(bP,bQ,bR){var bS=this.findHandler(bP,bQ);if(bS){bS.registerEvent(bP,bQ,bR);return;}
;{}
;}
,removeListener:function(bT,bU,bV,self,bW){var cb;{}
;var cc=bT.$$hash||qx.core.ObjectRegistry.toHashCode(bT);var cd=this.__cs[cc];if(!cd){return false;}
;var bX=bU+(bW?d:a);var bY=cd[bX];if(!bY){return false;}
;var ca;for(var i=0,l=bY.length;i<l;i++){ca=bY[i];if(ca.handler===bV&&ca.context===self){qx.lang.Array.removeAt(bY,i);if(bY.length==0){this.__cz(bT,bU,bW);}
;return true;}
;}
;return false;}
,removeListenerById:function(ce,cf){var cl;{}
;var cj=cf.split(b);var co=cj[0];var cg=cj[1].charCodeAt(0)==99;var cn=cj[2];var cm=ce.$$hash||qx.core.ObjectRegistry.toHashCode(ce);var cp=this.__cs[cm];if(!cp){return false;}
;var ck=co+(cg?d:a);var ci=cp[ck];if(!ci){return false;}
;var ch;for(var i=0,l=ci.length;i<l;i++){ch=ci[i];if(ch.unique===cn){qx.lang.Array.removeAt(ci,i);if(ci.length==0){this.__cz(ce,co,cg);}
;return true;}
;}
;return false;}
,removeAllListeners:function(cq){var cu=cq.$$hash||qx.core.ObjectRegistry.toHashCode(cq);var cw=this.__cs[cu];if(!cw){return false;}
;var cs,cv,cr;for(var ct in cw){if(cw[ct].length>0){cs=ct.split(b);cv=cs[0];cr=cs[1]===h;this.__cz(cq,cv,cr);}
;}
;delete this.__cs[cu];return true;}
,deleteAllListeners:function(cx){delete this.__cs[cx];}
,__cz:function(cy,cz,cA){var cB=this.findHandler(cy,cz);if(cB){cB.unregisterEvent(cy,cz,cA);return;}
;{}
;}
,dispatchEvent:function(cC,event){var cH;{}
;var cI=event.getType();if(!event.getBubbles()&&!this.hasListener(cC,cI)){qx.event.Pool.getInstance().poolObject(event);return true;}
;if(!event.getTarget()){event.setTarget(cC);}
;var cG=this.__cr.getDispatchers();var cF;var cE=false;for(var i=0,l=cG.length;i<l;i++){cF=this.getDispatcher(cG[i]);if(cF.canDispatchEvent(cC,event,cI)){cF.dispatchEvent(cC,event,cI);cE=true;break;}
;}
;if(!cE){{}
;return true;}
;var cD=event.getDefaultPrevented();qx.event.Pool.getInstance().poolObject(event);return !cD;}
,dispose:function(){this.__cr.removeManager(this);qx.util.DisposeUtil.disposeMap(this,p);qx.util.DisposeUtil.disposeMap(this,q);this.__cs=this.__cp=this.__cx=null;this.__cr=this.__cv=null;}
}});}
)();
(function(){var b="qx.event.GlobalError",a="qx.globalErrorHandling";qx.Bootstrap.define(b,{statics:{__cA:null,__cB:null,__cC:null,__cD:function(){if(qx.core&&qx.core.Environment){return true;}
else {return !!qx.Bootstrap.getEnvironmentSetting(a);}
;}
,setErrorHandler:function(c,d){this.__cA=c||null;this.__cC=d||window;if(this.__cD()){if(c&&window.onerror){var e=qx.Bootstrap.bind(this.__cE,this);if(this.__cB==null){this.__cB=window.onerror;}
;var self=this;window.onerror=function(f,g,h){self.__cB(f,g,h);e(f,g,h);}
;}
;if(c&&!window.onerror){window.onerror=qx.Bootstrap.bind(this.__cE,this);}
;if(this.__cA==null){if(this.__cB!=null){window.onerror=this.__cB;this.__cB=null;}
else {window.onerror=null;}
;}
;}
;}
,__cE:function(i,j,k){if(this.__cA){this.handleError(new qx.core.WindowError(i,j,k));}
;}
,observeMethod:function(l){if(this.__cD()){var self=this;return function(){if(!self.__cA){return l.apply(this,arguments);}
;try{return l.apply(this,arguments);}
catch(m){self.handleError(new qx.core.GlobalError(m,arguments));}
;}
;}
else {return l;}
;}
,handleError:function(n){if(this.__cA){this.__cA.call(this.__cC,n);}
;}
},defer:function(o){if(qx.core&&qx.core.Environment){qx.core.Environment.add(a,true);}
else {qx.Bootstrap.setEnvironmentSetting(a,true);}
;o.setErrorHandler(null,null);}
});}
)();
(function(){var b="",a="qx.core.WindowError";qx.Bootstrap.define(a,{extend:Error,construct:function(c,d,e){var f=Error.call(this,c);if(f.stack){this.stack=f.stack;}
;if(f.stacktrace){this.stacktrace=f.stacktrace;}
;this.__cF=c;this.__cG=d||b;this.__cH=e===undefined?-1:e;}
,members:{__cF:null,__cG:null,__cH:null,toString:function(){return this.__cF;}
,getUri:function(){return this.__cG;}
,getLineNumber:function(){return this.__cH;}
}});}
)();
(function(){var b="GlobalError: ",a="qx.core.GlobalError";qx.Bootstrap.define(a,{extend:Error,construct:function(c,d){if(qx.Bootstrap.DEBUG){qx.core.Assert.assertNotUndefined(c);}
;this.__cF=b+(c&&c.message?c.message:c);var e=Error.call(this,this.__cF);if(e.stack){this.stack=e.stack;}
;if(e.stacktrace){this.stacktrace=e.stacktrace;}
;this.__cI=d;this.__cJ=c;}
,members:{__cJ:null,__cI:null,__cF:null,toString:function(){return this.__cF;}
,getArguments:function(){return this.__cI;}
,getSourceException:function(){return this.__cJ;}
},destruct:function(){this.__cJ=null;this.__cI=null;this.__cF=null;}
});}
)();
(function(){var p=" != ",o="qx.core.Object",n="Expected value to be an array but found ",m=") was fired.",k="Expected value to be an integer >= 0 but found ",j="' to be not equal with '",h="' to '",g="Expected object '",f="Called assertTrue with '",d="Expected value to be a map but found ",bA="The function did not raise an exception!",bz="Expected value to be undefined but found ",by="Expected value to be a DOM element but found  '",bx="Expected value to be a regular expression but found ",bw="' to implement the interface '",bv="Expected value to be null but found ",bu="Invalid argument 'type'",bt="Called assert with 'false'",bs="Assertion error! ",br="null",w="' but found '",x="'undefined'",u="' must must be a key of the map '",v="The String '",s="Expected value to be a string but found ",t="Expected value not to be undefined but found undefined!",q="qx.util.ColorUtil",r=": ",E="The raised exception does not have the expected type! ",F=") not fired.",T="qx.core.Assert",P="Expected value to be typeof object but found ",bc="' (identical) but found '",W="' must have any of the values defined in the array '",bn="Expected value to be a number but found ",bh="Called assertFalse with '",K="qx.ui.core.Widget",bq="Expected value to be a qooxdoo object but found ",bp="' arguments.",bo="Expected value '%1' to be in the range '%2'..'%3'!",I="Array[",M="' does not match the regular expression '",O="' to be not identical with '",R="Expected [",U="' arguments but found '",X="', which cannot be converted to a CSS color!",be="qx.core.AssertionError",bj="Expected value to be a boolean but found ",y="Expected value not to be null but found null!",z="))!",L="Expected value to be a qooxdoo widget but found ",bb="Expected value to be typeof '",ba="Expected value to be typeof function but found ",Y="Expected value to be an integer but found ",bg="Called fail().",bf="The parameter 're' must be a string or a regular expression.",V="Expected value to be a number >= 0 but found ",bd="Expected value to be instanceof '",a="], but found [",bi="Wrong number of arguments given. Expected '",A="object",B="Event (",Q="Expected value to be the CSS color '",b="' but found ",c="]",H=", ",C="The value '",D=")), but found value '",G="' (rgb(",S=",",bl="'",bk="Expected '",N="'!",bm="!",J="";qx.Class.define(T,{statics:{__bC:true,__bD:function(bB,bC){var bG=J;for(var i=1,l=arguments.length;i<l;i++){bG=bG+this.__bE(arguments[i]===undefined?x:arguments[i]);}
;var bF=J;if(bG){bF=bB+r+bG;}
else {bF=bB;}
;var bE=bs+bF;if(qx.Class.isDefined(be)){var bD=new qx.core.AssertionError(bB,bG);if(this.__bC){qx.Bootstrap.error(bE+"\n Stack trace: \n"+bD.getStackTrace());}
;throw bD;}
else {if(this.__bC){qx.Bootstrap.error(bE);}
;throw new Error(bE);}
;}
,__bE:function(bH){var bI;if(bH===null){bI=br;}
else if(qx.lang.Type.isArray(bH)&&bH.length>10){bI=I+bH.length+c;}
else if((bH instanceof Object)&&(bH.toString==null)){bI=qx.lang.Json.stringify(bH,null,2);}
else {try{bI=bH.toString();}
catch(e){bI=J;}
;}
;return bI;}
,assert:function(bJ,bK){bJ==true||this.__bD(bK||J,bt);}
,fail:function(bL,bM){var bN=bM?J:bg;this.__bD(bL||J,bN);}
,assertTrue:function(bO,bP){(bO===true)||this.__bD(bP||J,f,bO,bl);}
,assertFalse:function(bQ,bR){(bQ===false)||this.__bD(bR||J,bh,bQ,bl);}
,assertEquals:function(bS,bT,bU){bS==bT||this.__bD(bU||J,bk,bS,w,bT,N);}
,assertNotEquals:function(bV,bW,bX){bV!=bW||this.__bD(bX||J,bk,bV,j,bW,N);}
,assertIdentical:function(bY,ca,cb){bY===ca||this.__bD(cb||J,bk,bY,bc,ca,N);}
,assertNotIdentical:function(cc,cd,ce){cc!==cd||this.__bD(ce||J,bk,cc,O,cd,N);}
,assertNotUndefined:function(cf,cg){cf!==undefined||this.__bD(cg||J,t);}
,assertUndefined:function(ch,ci){ch===undefined||this.__bD(ci||J,bz,ch,bm);}
,assertNotNull:function(cj,ck){cj!==null||this.__bD(ck||J,y);}
,assertNull:function(cl,cm){cl===null||this.__bD(cm||J,bv,cl,bm);}
,assertJsonEquals:function(cn,co,cp){this.assertEquals(qx.lang.Json.stringify(cn),qx.lang.Json.stringify(co),cp);}
,assertMatch:function(cq,cr,cs){this.assertString(cq);this.assert(qx.lang.Type.isRegExp(cr)||qx.lang.Type.isString(cr),bf);cq.search(cr)>=0||this.__bD(cs||J,v,cq,M,cr.toString(),N);}
,assertArgumentsCount:function(ct,cu,cv,cw){var cx=ct.length;(cx>=cu&&cx<=cv)||this.__bD(cw||J,bi,cu,h,cv,U,cx,bp);}
,assertEventFired:function(cy,event,cz,cA,cB){var cD=false;var cC=function(e){if(cA){cA.call(cy,e);}
;cD=true;}
;var cE;try{cE=cy.addListener(event,cC,cy);cz.call(cy);}
catch(cF){throw cF;}
finally{try{cy.removeListenerById(cE);}
catch(cG){}
;}
;cD===true||this.__bD(cB||J,B,event,F);}
,assertEventNotFired:function(cH,event,cI,cJ){var cL=false;var cK=function(e){cL=true;}
;var cM=cH.addListener(event,cK,cH);cI.call();cL===false||this.__bD(cJ||J,B,event,m);cH.removeListenerById(cM);}
,assertException:function(cN,cO,cP,cQ){var cO=cO||Error;var cR;try{this.__bC=false;cN();}
catch(cS){cR=cS;}
finally{this.__bC=true;}
;if(cR==null){this.__bD(cQ||J,bA);}
;cR instanceof cO||this.__bD(cQ||J,E,cO,p,cR);if(cP){this.assertMatch(cR.toString(),cP,cQ);}
;}
,assertInArray:function(cT,cU,cV){cU.indexOf(cT)!==-1||this.__bD(cV||J,C,cT,W,cU,bl);}
,assertArrayEquals:function(cW,cX,cY){this.assertArray(cW,cY);this.assertArray(cX,cY);cY=cY||R+cW.join(H)+a+cX.join(H)+c;if(cW.length!==cX.length){this.fail(cY,true);}
;for(var i=0;i<cW.length;i++){if(cW[i]!==cX[i]){this.fail(cY,true);}
;}
;}
,assertKeyInMap:function(da,db,dc){db[da]!==undefined||this.__bD(dc||J,C,da,u,db,bl);}
,assertFunction:function(dd,de){qx.lang.Type.isFunction(dd)||this.__bD(de||J,ba,dd,bm);}
,assertString:function(df,dg){qx.lang.Type.isString(df)||this.__bD(dg||J,s,df,bm);}
,assertBoolean:function(dh,di){qx.lang.Type.isBoolean(dh)||this.__bD(di||J,bj,dh,bm);}
,assertNumber:function(dj,dk){(qx.lang.Type.isNumber(dj)&&isFinite(dj))||this.__bD(dk||J,bn,dj,bm);}
,assertPositiveNumber:function(dl,dm){(qx.lang.Type.isNumber(dl)&&isFinite(dl)&&dl>=0)||this.__bD(dm||J,V,dl,bm);}
,assertInteger:function(dn,dp){(qx.lang.Type.isNumber(dn)&&isFinite(dn)&&dn%1===0)||this.__bD(dp||J,Y,dn,bm);}
,assertPositiveInteger:function(dq,dr){var ds=(qx.lang.Type.isNumber(dq)&&isFinite(dq)&&dq%1===0&&dq>=0);ds||this.__bD(dr||J,k,dq,bm);}
,assertInRange:function(dt,du,dv,dw){(dt>=du&&dt<=dv)||this.__bD(dw||J,qx.lang.String.format(bo,[dt,du,dv]));}
,assertObject:function(dx,dy){var dz=dx!==null&&(qx.lang.Type.isObject(dx)||typeof dx===A);dz||this.__bD(dy||J,P,(dx),bm);}
,assertArray:function(dA,dB){qx.lang.Type.isArray(dA)||this.__bD(dB||J,n,dA,bm);}
,assertMap:function(dC,dD){qx.lang.Type.isObject(dC)||this.__bD(dD||J,d,dC,bm);}
,assertRegExp:function(dE,dF){qx.lang.Type.isRegExp(dE)||this.__bD(dF||J,bx,dE,bm);}
,assertType:function(dG,dH,dI){this.assertString(dH,bu);typeof (dG)===dH||this.__bD(dI||J,bb,dH,b,dG,bm);}
,assertInstance:function(dJ,dK,dL){var dM=dK.classname||dK+J;dJ instanceof dK||this.__bD(dL||J,bd,dM,b,dJ,bm);}
,assertInterface:function(dN,dO,dP){qx.Class.implementsInterface(dN,dO)||this.__bD(dP||J,g,dN,bw,dO,N);}
,assertCssColor:function(dQ,dR,dS){var dT=qx.Class.getByName(q);if(!dT){throw new Error("qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'");}
;var dV=dT.stringToRgb(dQ);try{var dU=dT.stringToRgb(dR);}
catch(dX){this.__bD(dS||J,Q,dQ,G,dV.join(S),D,dR,X);}
;var dW=dV[0]==dU[0]&&dV[1]==dU[1]&&dV[2]==dU[2];dW||this.__bD(dS||J,Q,dV,G,dV.join(S),D,dR,G,dU.join(S),z);}
,assertElement:function(dY,ea){!!(dY&&dY.nodeType===1)||this.__bD(ea||J,by,dY,N);}
,assertQxObject:function(eb,ec){this.__bF(eb,o)||this.__bD(ec||J,bq,eb,bm);}
,assertQxWidget:function(ed,ee){this.__bF(ed,K)||this.__bD(ee||J,L,ed,bm);}
,__bF:function(ef,eg){if(!ef){return false;}
;var eh=ef.constructor;while(eh){if(eh.classname===eg){return true;}
;eh=eh.superclass;}
;return false;}
}});}
)();
(function(){var g="prop",f="qx.bom.client.Json",e="JSON",d='{"x":1}',c="json",b="val",a="repl";qx.Bootstrap.define(f,{statics:{getJson:function(){return (qx.Bootstrap.getClass(window.JSON)==e&&JSON.parse(d).x===1&&JSON.stringify({"prop":b},function(k,v){return k===g?a:v;}
).indexOf(a)>0);}
},defer:function(h){qx.core.Environment.add(c,h.getJson);}
});}
)();
(function(){var p='String',o='Boolean',m='\\\\',l='\\f',h='\\t',g='{\n',f='[]',e="qx.lang.JsonImpl",d='Z',b='\\n',ba='Object',Y='{}',X='@',W='.',V='(',U='Array',T='T',S='\\r',R='{',Q='JSON.parse',x=' ',y='[',u='Number',w=')',s='[\n',t='\\"',q='\\b',r=': ',z='object',A='function',H=',',F='\n',K='\\u',J=',\n',M='0000',L='string',C="Cannot stringify a recursive object.",P='0',O='-',N='}',B=']',D='null',E='"',G=':',I='';qx.Bootstrap.define(e,{extend:Object,construct:function(){this.stringify=qx.lang.Function.bind(this.stringify,this);this.parse=qx.lang.Function.bind(this.parse,this);}
,members:{__bQ:null,__bR:null,__bS:null,__bT:null,stringify:function(bb,bc,bd){this.__bQ=I;this.__bR=I;this.__bT=[];if(qx.lang.Type.isNumber(bd)){var bd=Math.min(10,Math.floor(bd));for(var i=0;i<bd;i+=1){this.__bR+=x;}
;}
else if(qx.lang.Type.isString(bd)){if(bd.length>10){bd=bd.slice(0,10);}
;this.__bR=bd;}
;if(bc&&(qx.lang.Type.isFunction(bc)||qx.lang.Type.isArray(bc))){this.__bS=bc;}
else {this.__bS=null;}
;return this.__bU(I,{'':bb});}
,__bU:function(be,bf){var bi=this.__bQ,bg,bj=bf[be];if(bj&&qx.lang.Type.isFunction(bj.toJSON)){bj=bj.toJSON(be);}
else if(qx.lang.Type.isDate(bj)){bj=this.dateToJSON(bj);}
;if(typeof this.__bS===A){bj=this.__bS.call(bf,be,bj);}
;if(bj===null){return D;}
;if(bj===undefined){return undefined;}
;switch(qx.lang.Type.getClass(bj)){case p:return this.__bV(bj);case u:return isFinite(bj)?String(bj):D;case o:return String(bj);case U:this.__bQ+=this.__bR;bg=[];if(this.__bT.indexOf(bj)!==-1){throw new TypeError(C);}
;this.__bT.push(bj);var length=bj.length;for(var i=0;i<length;i+=1){bg[i]=this.__bU(i,bj)||D;}
;this.__bT.pop();if(bg.length===0){var bh=f;}
else if(this.__bQ){bh=s+this.__bQ+bg.join(J+this.__bQ)+F+bi+B;}
else {bh=y+bg.join(H)+B;}
;this.__bQ=bi;return bh;case ba:this.__bQ+=this.__bR;bg=[];if(this.__bT.indexOf(bj)!==-1){throw new TypeError(C);}
;this.__bT.push(bj);if(this.__bS&&typeof this.__bS===z){var length=this.__bS.length;for(var i=0;i<length;i+=1){var k=this.__bS[i];if(typeof k===L){var v=this.__bU(k,bj);if(v){bg.push(this.__bV(k)+(this.__bQ?r:G)+v);}
;}
;}
;}
else {for(var k in bj){if(Object.hasOwnProperty.call(bj,k)){var v=this.__bU(k,bj);if(v){bg.push(this.__bV(k)+(this.__bQ?r:G)+v);}
;}
;}
;}
;this.__bT.pop();if(bg.length===0){var bh=Y;}
else if(this.__bQ){bh=g+this.__bQ+bg.join(J+this.__bQ)+F+bi+N;}
else {bh=R+bg.join(H)+N;}
;this.__bQ=bi;return bh;};}
,dateToJSON:function(bk){var bl=function(n){return n<10?P+n:n;}
;var bm=function(n){var bn=bl(n);return n<100?P+bn:bn;}
;return isFinite(bk.valueOf())?bk.getUTCFullYear()+O+bl(bk.getUTCMonth()+1)+O+bl(bk.getUTCDate())+T+bl(bk.getUTCHours())+G+bl(bk.getUTCMinutes())+G+bl(bk.getUTCSeconds())+W+bm(bk.getUTCMilliseconds())+d:null;}
,__bV:function(bo){var bp={'\b':q,'\t':h,'\n':b,'\f':l,'\r':S,'"':t,'\\':m};var bq=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;bq.lastIndex=0;if(bq.test(bo)){return E+bo.replace(bq,function(a){var c=bp[a];return typeof c===L?c:K+(M+a.charCodeAt(0).toString(16)).slice(-4);}
)+E;}
else {return E+bo+E;}
;}
,parse:function(br,bs){var bt=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;bt.lastIndex=0;if(bt.test(br)){br=br.replace(bt,function(a){return K+(M+a.charCodeAt(0).toString(16)).slice(-4);}
);}
;if(/^[\],:{}\s]*$/.test(br.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,X).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,B).replace(/(?:^|:|,)(?:\s*\[)+/g,I))){var j=eval(V+br+w);return typeof bs===A?this.__bW({'':j},I,bs):j;}
;throw new SyntaxError(Q);}
,__bW:function(bu,bv,bw){var bx=bu[bv];if(bx&&typeof bx===z){for(var k in bx){if(Object.hasOwnProperty.call(bx,k)){var v=this.__bW(bx,k,bw);if(v!==undefined){bx[k]=v;}
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
;var f=d.$$hash||qx.core.ObjectRegistry.toHashCode(d);var e=this.__cK[f];if(!e){e=new qx.event.Manager(d,this);this.__cK[f]=e;}
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
,PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__ct:[],addHandler:function(Q){{}
;this.__ct.push(Q);this.__ct.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getHandlers:function(){return this.__ct;}
,__cu:[],addDispatcher:function(R,S){{}
;this.__cu.push(R);this.__cu.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getDispatchers:function(){return this.__cu;}
}});}
)();
(function(){var a="qx.core.MEvent";qx.Mixin.define(a,{members:{__cL:qx.event.Registration,addListener:function(b,c,self,d){if(!this.$$disposed){return this.__cL.addListener(this,b,c,self,d);}
;return null;}
,addListenerOnce:function(f,g,self,h){var i=function(e){this.removeListener(f,g,this,h);g.call(self||this,e);}
;g.$$wrapped_callback=i;return this.addListener(f,i,this,h);}
,removeListener:function(j,k,self,l){if(!this.$$disposed){if(k.$$wrapped_callback){var m=k.$$wrapped_callback;delete k.$$wrapped_callback;k=m;}
;return this.__cL.removeListener(this,j,k,self,l);}
;return false;}
,removeListenerById:function(n){if(!this.$$disposed){return this.__cL.removeListenerById(this,n);}
;return false;}
,hasListener:function(o,p){return this.__cL.hasListener(this,o,p);}
,dispatchEvent:function(q){if(!this.$$disposed){return this.__cL.dispatchEvent(this,q);}
;return true;}
,fireEvent:function(r,s,t){if(!this.$$disposed){return this.__cL.fireEvent(this,r,s,t);}
;return true;}
,fireNonBubblingEvent:function(u,v,w){if(!this.$$disposed){return this.__cL.fireNonBubblingEvent(this,u,v,w);}
;return true;}
,fireDataEvent:function(x,y,z,A){if(!this.$$disposed){if(z===undefined){z=null;}
;return this.__cL.fireNonBubblingEvent(this,x,qx.event.type.Data,[y,z,!!A]);}
;return true;}
}});}
)();
(function(){var a="qx.event.IEventDispatcher";qx.Interface.define(a,{members:{canDispatchEvent:function(b,event,c){this.assertInstance(event,qx.event.type.Event);this.assertString(c);}
,dispatchEvent:function(d,event,e){this.assertInstance(event,qx.event.type.Event);this.assertString(e);}
}});}
)();
(function(){var j="module.events",h="qx.core.Object",g="[",f="$$user_",e="]",d="rv:1.8.1",c="MSIE 6.0",b="Object",a="module.property";qx.Class.define(h,{extend:Object,include:qx.core.Environment.filter({"module.databinding":qx.data.MBinding,"module.logger":qx.core.MLogging,"module.events":qx.core.MEvent,"module.property":qx.core.MProperty}),construct:function(){qx.core.ObjectRegistry.register(this);}
,statics:{$$type:b},members:{__M:qx.core.Environment.get("module.property")?qx.core.Property:null,toHashCode:function(){return this.$$hash;}
,toString:function(){return this.classname+g+this.$$hash+e;}
,base:function(k,m){{}
;if(arguments.length===1){return k.callee.base.call(this);}
else {return k.callee.base.apply(this,Array.prototype.slice.call(arguments,1));}
;}
,self:function(n){return n.callee.self;}
,clone:function(){if(!qx.core.Environment.get(a)){throw new Error("Cloning only possible with properties.");}
;var p=this.constructor;var o=new p;var r=qx.Class.getProperties(p);var q=this.__M.$$store.user;var s=this.__M.$$method.set;var name;for(var i=0,l=r.length;i<l;i++){name=r[i];if(this.hasOwnProperty(q[name])){o[s[name]](this[q[name]]);}
;}
;return o;}
,__cM:null,setUserData:function(t,u){if(!this.__cM){this.__cM={};}
;this.__cM[t]=u;}
,getUserData:function(v){if(!this.__cM){return null;}
;var w=this.__cM[v];return w===undefined?null:w;}
,isDisposed:function(){return this.$$disposed||false;}
,dispose:function(){var B,z,y,C;if(this.$$disposed){return;}
;this.$$disposed=true;this.$$instance=null;this.$$allowconstruct=null;{}
;var A=this.constructor;var x;while(A.superclass){if(A.$$destructor){A.$$destructor.call(this);}
;if(A.$$includes){x=A.$$flatIncludes;for(var i=0,l=x.length;i<l;i++){if(x[i].$$destructor){x[i].$$destructor.call(this);}
;}
;}
;A=A.superclass;}
;if(this.__cN){this.__cN();}
;{}
;}
,__cN:null,__cO:function(){var D=qx.Class.getProperties(this.constructor);for(var i=0,l=D.length;i<l;i++){delete this[f+D[i]];}
;}
,_disposeObjects:function(E){qx.util.DisposeUtil.disposeObjects(this,arguments);}
,_disposeSingletonObjects:function(F){qx.util.DisposeUtil.disposeObjects(this,arguments,true);}
,_disposeArray:function(G){qx.util.DisposeUtil.disposeArray(this,G);}
,_disposeMap:function(H){qx.util.DisposeUtil.disposeMap(this,H);}
},environment:{"qx.debug.dispose.level":0},defer:function(I,J){var L=navigator.userAgent.indexOf(c)!=-1;var K=navigator.userAgent.indexOf(d)!=-1;if(L||K){J.__cN=J.__cO;}
;}
,destruct:function(){if(qx.core.Environment.get(j)){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);}
else {qx.event.Registration.deleteAllListeners(this);}
;}
;qx.core.ObjectRegistry.unregister(this);this.__cM=null;if(qx.core.Environment.get(a)){var O=this.constructor;var S;var T=this.__M.$$store;var Q=T.user;var R=T.theme;var M=T.inherit;var P=T.useinit;var N=T.init;while(O){S=O.$$properties;if(S){for(var name in S){if(S[name].dereference){this[Q[name]]=this[R[name]]=this[M[name]]=this[P[name]]=this[N[name]]=undefined;}
;}
;}
;O=O.superclass;}
;}
;}
});}
)();
(function(){var b="undefined",a="qx.util.DisposeUtil";qx.Class.define(a,{statics:{disposeObjects:function(c,d,e){var name;for(var i=0,l=d.length;i<l;i++){name=d[i];if(c[name]==null||!c.hasOwnProperty(name)){continue;}
;if(!qx.core.ObjectRegistry.inShutDown){if(c[name].dispose){if(!e&&c[name].constructor.$$instance){throw new Error("The object stored in key "+name+" is a singleton! Please use disposeSingleton instead.");}
else {c[name].dispose();}
;}
else {throw new Error("Has no disposable object under key: "+name+"!");}
;}
;c[name]=null;}
;}
,disposeArray:function(f,g){var j=f[g];if(!j){return;}
;if(qx.core.ObjectRegistry.inShutDown){f[g]=null;return;}
;try{var h;for(var i=j.length-1;i>=0;i--){h=j[i];if(h){h.dispose();}
;}
;}
catch(k){throw new Error("The array field: "+g+" of object: "+f+" has non disposable entries: "+k);}
;j.length=0;f[g]=null;}
,disposeMap:function(m,n){var p=m[n];if(!p){return;}
;if(qx.core.ObjectRegistry.inShutDown){m[n]=null;return;}
;try{var o;for(var q in p){o=p[q];if(p.hasOwnProperty(q)&&o){o.dispose();}
;}
;}
catch(r){throw new Error("The map field: "+n+" of object: "+m+" has non disposable entries: "+r);}
;m[n]=null;}
,disposeTriggeredBy:function(s,t){var u=t.dispose;t.dispose=function(){u.call(t);s.dispose();}
;}
,destroyContainer:function(v){{}
;var w=[];this._collectContainerChildren(v,w);var x=w.length;for(var i=x-1;i>=0;i--){w[i].destroy();}
;v.destroy();}
,_collectContainerChildren:function(y,z){var B=y.getChildren();for(var i=0;i<B.length;i++){var A=B[i];z.push(A);if(this.__cP(A)){this._collectContainerChildren(A,z);}
;}
;}
,__cP:function(C){var D=[qx.ui.container.Composite,qx.ui.container.Scroll,qx.ui.container.SlideBar,qx.ui.container.Stack];for(var i=0,l=D.length;i<l;i++){if(typeof D[i]!==b&&qx.Class.isSubClassOf(C.constructor,D[i])){return true;}
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
(function(){var b="qx.util.ObjectPool",a="Integer";qx.Class.define(b,{extend:qx.core.Object,construct:function(c){qx.core.Object.call(this);this.__cQ={};if(c!=null){this.setSize(c);}
;}
,properties:{size:{check:a,init:Infinity}},members:{__cQ:null,getObject:function(d){if(this.$$disposed){return new d;}
;if(!d){throw new Error("Class needs to be defined!");}
;var e=null;var f=this.__cQ[d.classname];if(f){e=f.pop();}
;if(e){e.$$pooled=false;}
else {e=new d;}
;return e;}
,poolObject:function(g){if(!this.__cQ){return;}
;var h=g.classname;var j=this.__cQ[h];if(g.$$pooled){throw new Error("Object is already pooled: "+g);}
;if(!j){this.__cQ[h]=j=[];}
;if(j.length>this.getSize()){if(g.destroy){g.destroy();}
else {g.dispose();}
;return;}
;g.$$pooled=true;j.push(g);}
},destruct:function(){var n=this.__cQ;var k,m,i,l;for(k in n){m=n[k];for(i=0,l=m.length;i<l;i++){m[i].dispose();}
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
(function(){var f="qx.dev.unit.TestSuite",d="__unknown_class__",c="failure",b="error",a="qx.dev.unit.MTestLoader";qx.Mixin.define(a,{properties:{suite:{check:f,nullable:true,init:null}},members:{_getClassNameFromUrl:function(){var h=window.location.search;var g=h.match(/[\?&]testclass=([A-Za-z0-9_\.]+)/);if(g){g=g[1];}
else {g=d;}
;return g;}
,setTestNamespace:function(k){var l=new qx.dev.unit.TestSuite();l.add(k);this.setSuite(l);}
,runJsUnit:function(){var m=new qx.dev.unit.JsUnitTestResult();this.getSuite().run(m);m.exportToJsUnit();}
,runStandAlone:function(){var n=new qx.dev.unit.TestResult();n.addListener(c,function(e){var p=e.getData()[0].exception;var o=e.getData()[0].test;this.error("Test '"+o.getFullName()+"' failed: "+p.message+" - "+p.getComment());if(p.getStackTrace){this.error("Stack trace: "+p.getStackTrace().join("\n"));}
;}
,this);n.addListener(b,function(e){var r=e.getData()[0].exception;var q=e.getData()[0].test;this.error("The test '"+q.getFullName()+"' had an error: "+r,r);}
,this);this.getSuite().run(n);}
,getTestDescriptions:function(){var v=[];var u=this.getSuite().getTestClasses();for(var i=0;i<u.length;i++){var w=u[i];var s={};s.classname=w.getName();s.tests=[];var t=w.getTestMethods();for(var j=0;j<t.length;j++){s.tests.push(t[j].getName());}
;v.push(s);}
;return qx.lang.Json.stringify(v);}
,runTests:function(x,y,z){var A=this.getSuite().getTestClasses();for(var i=0;i<A.length;i++){if(y==A[i].getName()){var B=A[i].getTestMethods();for(var j=0;j<B.length;j++){if(z&&B[j].getName()!=z){continue;}
;B[j].run(x);}
;return;}
;}
;}
,runTestsFromNamespace:function(C,D){var E=this.getSuite().getTestClasses();for(var i=0;i<E.length;i++){if(E[i].getName().indexOf(D)==0){E[i].run(C);}
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
,resume:function(g,self){this.getTestResult().run(this.getTestFunc(),g||(function(){}
),self||this,true);}
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
(function(){var c=": ",b="qx.dev.unit.RequirementError",a="Requirement not met";qx.Class.define(b,{extend:Error,construct:function(d,e){this.__md=e||a;this.__me=d;var f=Error.call(this,this.__md);if(f.stack){this.stack=f.stack;}
;if(f.stacktrace){this.stacktrace=f.stacktrace;}
;}
,members:{__md:null,__me:null,getRequirement:function(){return this.__me;}
,toString:function(){var g=this.__md;if(this.__me){g+=c+this.__me;}
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
(function(){var k="Error in asynchronous test",j="Asynchronous Test Error",h="tearDown",g="setUp failed",f="wait",e="tearDown failed: ",d="qx.dev.unit.TestResult",c="resume() called before wait()",b="qx.core.AssertionError",a="setUp failed: ",A="tearDown failed",z="endMeasurement",y="Timeout reached before resume() was called.",x="\n",w="startTest",v="qx.debug.dispose",u="testrunner.unit",t="assertionFailed",s="skip",r="qx.dev.unit.RequirementError",p="failed",q="error",n="failure",o="qx.event.type.Data",m="endTest";qx.Class.define(d,{extend:qx.core.Object,events:{startTest:o,endTest:o,error:o,failure:o,wait:o,skip:o,endMeasurement:o},statics:{run:function(B,C,D){B.run(C,D);}
},members:{_timeout:null,run:function(E,F,self,G){if(!this._timeout){this._timeout={};}
;var I=E.getTestClass();if(!I.hasListener(t)){I.addListener(t,function(O){var P=[{exception:O.getData(),test:E}];this.fireDataEvent(n,P);}
,this);}
;if(G&&!this._timeout[E.getFullName()]){this._timeout[E.getFullName()]=p;var J=new qx.type.BaseError(k,c);this._createError(n,[J],E);this.fireDataEvent(m,E);return;}
;this.fireDataEvent(w,E);if(qx.core.Environment.get(v)){qx.dev.Debug.startDisposeProfiling();}
;if(this._timeout[E.getFullName()]){if(this._timeout[E.getFullName()]!==p){this._timeout[E.getFullName()].stop();this._timeout[E.getFullName()].dispose();}
;delete this._timeout[E.getFullName()];}
else {try{E.setUp();}
catch(Q){try{this.tearDown(E);}
catch(R){}
;if(Q.classname==r){this._createError(s,[Q],E);this.fireDataEvent(m,E);}
else {if(Q instanceof qx.type.BaseError&&Q.message==qx.type.BaseError.DEFAULTMESSAGE){Q.message=g;}
else {Q.message=a+Q.message;}
;this._createError(q,[Q],E);this.fireDataEvent(m,E);}
;return;}
;}
;try{F.call(self||window);}
catch(S){var L=true;if(S instanceof qx.dev.unit.AsyncWrapper){if(this._timeout[E.getFullName()]){return;}
;if(S.getDelay()){var H=this;var N=function(){throw new qx.core.AssertionError(j,y);}
;var M=(S.getDeferredFunction()?S.getDeferredFunction():N);var K=(S.getContext()?S.getContext():window);this._timeout[E.getFullName()]=qx.event.Timer.once(function(){this.run(E,M,K);}
,H,S.getDelay());this.fireDataEvent(f,E);}
;}
else if(S instanceof qx.dev.unit.MeasurementResult){L=false;this._createError(z,[S],E);}
else {try{this.tearDown(E);}
catch(T){}
;if(S.classname==b){this._createError(n,[S],E);this.fireDataEvent(m,E);}
else if(S.classname==r){this._createError(s,[S],E);this.fireDataEvent(m,E);}
else {this._createError(q,[S],E);this.fireDataEvent(m,E);}
;}
;}
;if(!L){try{this.tearDown(E);this.fireDataEvent(m,E);}
catch(U){if(U instanceof qx.type.BaseError&&U.message==qx.type.BaseError.DEFAULTMESSAGE){U.message=A;}
else {U.message=e+U.message;}
;this._createError(q,[U],E);this.fireDataEvent(m,E);}
;}
;}
,_createError:function(V,W,X){var Y=[];for(var i=0,l=W.length;i<l;i++){Y.push({exception:W[i],test:X});}
;this.fireDataEvent(V,Y);}
,__mf:function(ba){ba._addedListeners=[];if(!qx.event.Registration.addListenerOriginal){qx.event.Registration.addListenerOriginal=qx.event.Registration.addListener;qx.event.Registration.addListener=function(bb,bc,bd,self,be){var bf=qx.event.Registration.addListenerOriginal(bb,bc,bd,self,be);var bg=true;if((bb.classname&&bb.classname.indexOf(u)==0)||(self&&self.classname&&self.classname.indexOf(u)==0)){bg=false;}
;if(bg){ba._addedListeners.push([bb,bf]);}
;return bf;}
;}
;}
,__mg:function(bh){if(bh._addedListeners){var bi=bh._addedListeners;for(var i=0,l=bi.length;i<l;i++){var bk=bi[i][0];var bj=bi[i][1];try{qx.event.Registration.removeListenerById(bk,bj);}
catch(bl){}
;}
;}
;}
,tearDown:function(bm){bm.tearDown();var bq=bm.getTestClass();var bo=h+qx.lang.String.firstUp(bm.getName());if(bq[bo]){bq[bo]();}
;if(qx.core.Environment.get(v)&&qx.dev.Debug.disposeProfilingActive){var br=bm.getFullName();var bp=qx.dev.Debug.stopDisposeProfiling();for(var i=0;i<bp.length;i++){var bn;if(bp[i].stackTrace){bn=bp[i].stackTrace.join(x);}
;window.top.qx.log.Logger.warn("Undisposed object in "+br+": "+bp[i].object.classname+"["+bp[i].object.toHashCode()+"]"+"\n"+bn);}
;}
;}
},destruct:function(){this._timeout=null;}
});}
)();
(function(){var m=") ***",l="\r\n",k="px;'>",h="): ",g="function",f="</span><br>",d="*** EXCEPTION (",c="============================================================",b="Object",a="<br>",K="null",J="Array",I="members",H="statics",G="get",F="qx.dev.Debug",E=": EXCEPTION expanding property",D="\n",C="*** TOO MUCH RECURSION: not displaying ***",B="Object, count=",t="  ",u="<span style='padding-left:",r=" ",s="------------------------------------------------------------",p="Array, length=",q="undefined",n="index(",o="-",v="qx.debug.dispose",w=":",y="construct",x="object",A="",z=": ";qx.Class.define(F,{statics:{disposeProfilingActive:false,debugObject:function(L,M,N){qx.log.Logger.debug(this,qx.dev.Debug.debugObjectToString(L,M,N,false));}
,debugObjectToString:function(O,P,Q,R){if(!Q){Q=10;}
;var X=(R?f:D);var U=function(Y){var ba;if(!R){ba=A;for(var i=0;i<Y;i++){ba+=t;}
;}
else {ba=u+(Y*8)+k;}
;return ba;}
;var W=A;var T=function(bb,bc,bd){if(bc>bd){W+=(U(bc)+C+X);return;}
;if(typeof (bb)!=x){W+=U(bc)+bb+X;return;}
;for(var be in bb){if(typeof (bb[be])==x){try{if(bb[be] instanceof Array){W+=U(bc)+be+z+J+X;}
else if(bb[be]===null){W+=U(bc)+be+z+K+X;continue;}
else if(bb[be]===undefined){W+=U(bc)+be+z+q+X;continue;}
else {W+=U(bc)+be+z+b+X;}
;T(bb[be],bc+1,bd);}
catch(e){W+=U(bc)+be+E+X;}
;}
else {W+=U(bc)+be+z+bb[be]+X;}
;}
;}
;if(P){W+=U(0)+P+X;}
;if(O instanceof Array){W+=U(0)+p+O.length+w+X;}
else if(typeof (O)==x){var S=0;for(var V in O){S++;}
;W+=U(0)+B+S+w+X;}
;W+=U(0)+s+X;try{T(O,0,Q);}
catch(bf){W+=U(0)+d+bf+m+X;}
;W+=U(0)+c+X;return W;}
,getFunctionName:function(bg,bh){var bi=bg.self;if(!bi){return null;}
;while(bg.wrapper){bg=bg.wrapper;}
;switch(bh){case y:return bg==bi?y:null;case I:return qx.lang.Object.getKeyFromValue(bi,bg);case H:return qx.lang.Object.getKeyFromValue(bi.prototype,bg);default:if(bg==bi){return y;}
;return (qx.lang.Object.getKeyFromValue(bi.prototype,bg)||qx.lang.Object.getKeyFromValue(bi,bg)||null);};}
,debugProperties:function(bj,bk,bl,bm){if(bk==null){bk=10;}
;if(bm==null){bm=1;}
;var bn=A;bl?bn=a:bn=l;var bp=A;if(qx.lang.Type.isNumber(bj)||qx.lang.Type.isString(bj)||qx.lang.Type.isBoolean(bj)||bj==null||bk<=0){return bj;}
else if(qx.Class.hasInterface(bj.constructor,qx.data.IListData)){for(var i=0;i<bj.length;i++){for(var j=0;j<bm;j++){bp+=o;}
;bp+=n+i+h+this.debugProperties(bj.getItem(i),bk-1,bl,bm+1)+bn;}
;return bp+bn;}
else if(bj.constructor!=null){var bq=bj.constructor.$$properties;for(var bo in bq){bp+=bn;for(var j=0;j<bm;j++){bp+=o;}
;bp+=r+bo+z+this.debugProperties(bj[G+qx.lang.String.firstUp(bo)](),bk-1,bl,bm+1);}
;return bp;}
;return A;}
,startDisposeProfiling:qx.core.Environment.select(v,{"true":function(){this.disposeProfilingActive=true;this.__mh=qx.core.ObjectRegistry.getNextHash();}
,"default":(function(){}
)}),stopDisposeProfiling:qx.core.Environment.select(v,{"true":function(br){if(!this.__mh){qx.log.Logger.error("Call "+this.classname+".startDisposeProfiling first.");return [];}
;this.disposeProfilingActive=false;var bt=[];while(!qx.ui.core.queue.Dispose.isEmpty()){qx.ui.core.queue.Dispose.flush();}
;var bu=qx.core.ObjectRegistry.getNextHash();var bw=qx.core.ObjectRegistry.getPostId();var bx=qx.core.ObjectRegistry.getStackTraces();for(var bs=this.__mh;bs<bu;bs++){var bv=qx.core.ObjectRegistry.fromHashCode(bs+bw);if(bv&&bv.isDisposed&&!bv.isDisposed()){if(br&&typeof br==g&&!br(bv)){continue;}
;if(bv.constructor.$$instance===bv){continue;}
;if(qx.Class.implementsInterface(bv,qx.event.IEventHandler)){continue;}
;if(bv.$$pooled){continue;}
;if(qx.Class.implementsInterface(bv,qx.ui.decoration.IDecorator)&&qx.theme.manager.Decoration.getInstance().isCached(bv)){continue;}
;if(bv.$$ignoreDisposeWarning){continue;}
;if(bv instanceof qx.bom.Font&&qx.theme.manager.Font.getInstance().isDynamic(bv)){continue;}
;bt.push({object:bv,stackTrace:bx[bs+bw]?bx[bs+bw]:null});}
;}
;delete this.__mh;return bt;}
,"default":(function(){}
)})}});}
)();
(function(){var a="qx.lang.Object";qx.Bootstrap.define(a,{statics:{empty:function(b){{}
;for(var c in b){if(b.hasOwnProperty(c)){delete b[c];}
;}
;}
,isEmpty:function(d){{}
;for(var e in d){return false;}
;return true;}
,hasMinLength:function(f,g){{}
;if(g<=0){return true;}
;var length=0;for(var h in f){if((++length)>=g){return true;}
;}
;return false;}
,getLength:qx.Bootstrap.objectGetLength,getKeys:qx.Bootstrap.getKeys,getKeysAsString:qx.Bootstrap.getKeysAsString,getValues:function(j){{}
;var m=[];var k=Object.keys(j);for(var i=0,l=k.length;i<l;i++){m.push(j[k[i]]);}
;return m;}
,mergeWith:qx.Bootstrap.objectMergeWith,carefullyMergeWith:function(n,o){{}
;return qx.lang.Object.mergeWith(n,o,false);}
,merge:function(p,q){{}
;var r=arguments.length;for(var i=1;i<r;i++){qx.lang.Object.mergeWith(p,arguments[i]);}
;return p;}
,clone:function(s,t){if(qx.lang.Type.isObject(s)){var u={};for(var v in s){if(t){u[v]=qx.lang.Object.clone(s[v],t);}
else {u[v]=s[v];}
;}
;return u;}
else if(qx.lang.Type.isArray(s)){var u=[];for(var i=0;i<s.length;i++){if(t){u[i]=qx.lang.Object.clone(s[i]);}
else {u[i]=s[i];}
;}
;return u;}
;return s;}
,invert:function(w){{}
;var x={};for(var y in w){x[w[y].toString()]=y;}
;return x;}
,getKeyFromValue:function(z,A){{}
;for(var B in z){if(z.hasOwnProperty(B)&&z[B]===A){return B;}
;}
;return null;}
,contains:function(C,D){{}
;return this.getKeyFromValue(C,D)!==null;}
,select:function(E,F){{}
;{}
;return F[E];}
,fromArray:function(G){{}
;var H={};for(var i=0,l=G.length;i<l;i++){{}
;H[G[i].toString()]=true;}
;return H;}
,toUriParameter:function(I,J){{}
;return qx.util.Uri.toParameter(I,J);}
}});}
)();
(function(){var k="file",j="strict",h="anchor",g="div",f="query",e="source",d="password",c="host",b="protocol",a="user",C="directory",B="loose",A="relative",z="queryKey",y="qx.util.Uri",x="",w="path",v="authority",u='">0</a>',t="port",r='<a href="',s="userInfo",p="?",q="+",l="&",n="=";qx.Bootstrap.define(y,{statics:{parseUri:function(D,E){var F={key:[e,b,v,s,a,d,c,t,A,w,C,k,f,h],q:{name:z,parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var o=F,m=F.parser[E?j:B].exec(D),G={},i=14;while(i--){G[o.key[i]]=m[i]||x;}
;G[o.q.name]={};G[o.key[12]].replace(o.q.parser,function(H,I,J){if(I){G[o.q.name][I]=J;}
;}
);return G;}
,appendParamsToUrl:function(K,L){if(L===undefined){return K;}
;{}
;if(qx.lang.Type.isObject(L)){L=qx.util.Uri.toParameter(L);}
;if(!L){return K;}
;return K+=(/\?/).test(K)?l+L:p+L;}
,toParameter:function(M,N){var Q,O=[];for(Q in M){if(M.hasOwnProperty(Q)){var P=M[Q];if(P instanceof Array){for(var i=0;i<P.length;i++){this.__dm(Q,P[i],O,N);}
;}
else {this.__dm(Q,P,O,N);}
;}
;}
;return O.join(l);}
,__dm:function(R,S,T,U){var V=window.encodeURIComponent;if(U){T.push(V(R).replace(/%20/g,q)+n+V(S).replace(/%20/g,q));}
else {T.push(V(R)+n+V(S));}
;}
,getAbsolute:function(W){var X=document.createElement(g);X.innerHTML=r+W+u;return X.firstChild.href;}
}});}
)();
(function(){var b="dispose",a="qx.ui.core.queue.Dispose";qx.Class.define(a,{statics:{__dK:[],add:function(c){var d=this.__dK;if(qx.lang.Array.contains(d,c)){return;}
;d.unshift(c);qx.ui.core.queue.Manager.scheduleFlush(b);}
,isEmpty:function(){return this.__dK.length==0;}
,flush:function(){var e=this.__dK;for(var i=e.length-1;i>=0;i--){var f=e[i];e.splice(i,1);f.dispose();}
;if(e.length!=0){return;}
;this.__dK=[];}
}});}
)();
(function(){var b="qx.util.DeferredCallManager",a="singleton";qx.Class.define(b,{extend:qx.core.Object,type:a,construct:function(){this.__eX={};this.__eY=qx.lang.Function.bind(this.__fd,this);this.__fa=false;}
,members:{__fb:null,__fc:null,__eX:null,__fa:null,__eY:null,schedule:function(c){if(this.__fb==null){this.__fb=window.setTimeout(this.__eY,0);}
;var d=c.toHashCode();if(this.__fc&&this.__fc[d]){return;}
;this.__eX[d]=c;this.__fa=true;}
,cancel:function(e){var f=e.toHashCode();if(this.__fc&&this.__fc[f]){this.__fc[f]=null;return;}
;delete this.__eX[f];if(qx.lang.Object.isEmpty(this.__eX)&&this.__fb!=null){window.clearTimeout(this.__fb);this.__fb=null;}
;}
,__fd:qx.event.GlobalError.observeMethod(function(){this.__fb=null;while(this.__fa){this.__fc=qx.lang.Object.clone(this.__eX);this.__eX={};this.__fa=false;for(var h in this.__fc){var g=this.__fc[h];if(g){this.__fc[h]=null;g.call();}
;}
;}
;this.__fc=null;}
)},destruct:function(){if(this.__fb!=null){window.clearTimeout(this.__fb);}
;this.__eY=this.__eX=null;}
});}
)();
(function(){var f="mshtml",e="engine.name",d="pop.push.reverse.shift.sort.splice.unshift.join.slice",c="number",b="qx.type.BaseArray",a=".";qx.Bootstrap.define(b,{extend:Array,construct:function(g){}
,members:{toArray:null,valueOf:null,pop:null,push:null,reverse:null,shift:null,sort:null,splice:null,unshift:null,concat:null,join:null,slice:null,toString:null,indexOf:null,lastIndexOf:null,forEach:null,filter:null,map:null,some:null,every:null}});(function(){function k(l){if((qx.core.Environment.get(e)==f)){j.prototype={length:0,$$isArray:true};var o=d.split(a);for(var length=o.length;length;){j.prototype[o[--length]]=Array.prototype[o[length]];}
;}
;var p=Array.prototype.slice;j.prototype.concat=function(){var r=this.slice(0);for(var i=0,length=arguments.length;i<length;i++){var q;if(arguments[i] instanceof j){q=p.call(arguments[i],0);}
else if(arguments[i] instanceof Array){q=arguments[i];}
else {q=[arguments[i]];}
;r.push.apply(r,q);}
;return r;}
;j.prototype.toString=function(){return p.call(this,0).toString();}
;j.prototype.toLocaleString=function(){return p.call(this,0).toLocaleString();}
;j.prototype.constructor=j;j.prototype.indexOf=Array.prototype.indexOf;j.prototype.lastIndexOf=Array.prototype.lastIndexOf;j.prototype.forEach=Array.prototype.forEach;j.prototype.some=Array.prototype.some;j.prototype.every=Array.prototype.every;var m=Array.prototype.filter;var n=Array.prototype.map;j.prototype.filter=function(){var s=new this.constructor;s.push.apply(s,m.apply(this,arguments));return s;}
;j.prototype.map=function(){var t=new this.constructor;t.push.apply(t,n.apply(this,arguments));return t;}
;j.prototype.slice=function(){var u=new this.constructor;u.push.apply(u,Array.prototype.slice.apply(this,arguments));return u;}
;j.prototype.splice=function(){var v=new this.constructor;v.push.apply(v,Array.prototype.splice.apply(this,arguments));return v;}
;j.prototype.toArray=function(){return Array.prototype.slice.call(this,0);}
;j.prototype.valueOf=function(){return this.length;}
;return j;}
;function j(length){if(arguments.length===1&&typeof length===c){this.length=-1<length&&length===length>>.5?length:this.push(length);}
else if(arguments.length){this.push.apply(this,arguments);}
;}
;function h(){}
;h.prototype=[];j.prototype=new h;j.prototype.length=0;qx.type.BaseArray=k(j);}
)();}
)();
(function(){var a="qxWeb";qx.Bootstrap.define(a,{extend:qx.type.BaseArray,statics:{__bf:[],$$qx:qx,$init:function(b){var f=[];for(var i=0;i<b.length;i++){var c=!!(b[i]&&b[i].nodeType!=null);if(c){f.push(b[i]);continue;}
;var d=!!(b[i]&&b[i].history&&b[i].location&&b[i].document);if(d){f.push(b[i]);}
;}
;var e=qx.lang.Array.cast(f,qxWeb);for(var i=0;i<qxWeb.__bf.length;i++){qxWeb.__bf[i].call(e);}
;return e;}
,$attach:function(g){for(var name in g){{}
;qxWeb.prototype[name]=g[name];}
;}
,$attachStatic:function(h){for(var name in h){{}
;qxWeb[name]=h[name];}
;}
,$attachInit:function(j){this.__bf.push(j);}
,define:function(name,k){if(k==undefined){k=name;name=null;}
;return qx.Bootstrap.define.call(qx.Bootstrap,name,k);}
},construct:function(l,m){if(!l&&this instanceof qxWeb){return this;}
;if(qx.Bootstrap.isString(l)){l=qx.bom.Selector.query(l,m);}
else if(!(qx.Bootstrap.isArray(l))){l=[l];}
;return qxWeb.$init(l);}
,members:{filter:function(n){if(qx.lang.Type.isFunction(n)){return qxWeb.$init(Array.prototype.filter.call(this,n));}
;return qxWeb.$init(qx.bom.Selector.matches(n,this));}
,slice:function(o,p){if(p){return qxWeb.$init(Array.prototype.slice.call(this,o,p));}
else {return qxWeb.$init(Array.prototype.slice.call(this,o));}
;}
,splice:function(r,s,t){return qxWeb.$init(Array.prototype.splice.apply(this,arguments));}
,map:function(u,v){return qxWeb.$init(Array.prototype.map.apply(this,arguments));}
,concat:function(w){var x=Array.prototype.slice.call(this,0);for(var i=0;i<arguments.length;i++){if(arguments[i] instanceof qxWeb){x=x.concat(Array.prototype.slice.call(arguments[i],0));}
else {x.push(arguments[i]);}
;}
;return qxWeb.$init(x);}
},defer:function(y){if(window.q==undefined){q=y;}
;}
});}
)();
(function(){var c="qx.bom.Selector";qx.Bootstrap.define(c,{statics:{query:null,matches:null}});(function(window,undefined){var q,bh,R,n,D,A,bo,G,bn,f,L=true,bq="undefined",bd=("sizcache"+Math.random()).replace(".",""),W=String,document=window.document,bx=document.documentElement,br=0,r=0,Y=[].pop,bt=[].push,w=[].slice,Q=[].indexOf||function(by){var i=0,bz=this.length;for(;i<bz;i++){if(this[i]===by){return i;}
;}
;return -1;}
,bj=function(bA,bB){bA[bd]=bB==null||bB;return bA;}
,p=function(){var bD={},bC=[];return bj(function(bE,bF){if(bC.push(bE)>R.cacheLength){delete bD[bC.shift()];}
;return (bD[bE]=bF);}
,bD);}
,bk=p(),bc=p(),bv=p(),y="[\\x20\\t\\r\\n\\f]",T="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",bw=T.replace("w","w#"),S="([*^$|!~]?=)",bu="\\["+y+"*("+T+")"+y+"*(?:"+S+y+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+bw+")|)|)"+y+"*\\]",M=":("+T+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+bu+")|[^:]|\\\\.)*|.*))\\)|)",l=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+y+"*((?:-\\d)?\\d*)"+y+"*\\)|)(?=[^-]|$)",ba=new RegExp("^"+y+"+|((?:^|[^\\\\])(?:\\\\.)*)"+y+"+$","g"),bi=new RegExp("^"+y+"*,"+y+"*"),z=new RegExp("^"+y+"*([\\x20\\t\\r\\n\\f>+~])"+y+"*"),be=new RegExp(M),K=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,bg=/^:not/,O=/[\x20\t\r\n\f]*[+~]/,v=/:not\($/,k=/h\d/i,H=/input|select|textarea|button/i,d=/\\(?!\\)/g,t={"ID":new RegExp("^#("+T+")"),"CLASS":new RegExp("^\\.("+T+")"),"NAME":new RegExp("^\\[name=['\"]?("+T+")['\"]?\\]"),"TAG":new RegExp("^("+T.replace("w","w*")+")"),"ATTR":new RegExp("^"+bu),"PSEUDO":new RegExp("^"+M),"POS":new RegExp(l,"i"),"CHILD":new RegExp("^:(only|nth|first|last)-child(?:\\("+y+"*(even|odd|(([+-]|)(\\d*)n|)"+y+"*(?:([+-]|)"+y+"*(\\d+)|))"+y+"*\\)|)","i"),"needsContext":new RegExp("^"+y+"*[>+~]|"+l,"i")},V=function(bG){var bH=document.createElement("div");try{return bG(bH);}
catch(e){return false;}
finally{bH=null;}
;}
,o=V(function(bI){bI.appendChild(document.createComment(""));return !bI.getElementsByTagName("*").length;}
),J=V(function(bJ){bJ.innerHTML="<a href='#'></a>";return bJ.firstChild&&typeof bJ.firstChild.getAttribute!==bq&&bJ.firstChild.getAttribute("href")==="#";}
),bm=V(function(bK){bK.innerHTML="<select></select>";var bL=typeof bK.lastChild.getAttribute("multiple");return bL!=="boolean"&&bL!=="string";}
),bs=V(function(bM){bM.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";if(!bM.getElementsByClassName||!bM.getElementsByClassName("e").length){return false;}
;bM.lastChild.className="e";return bM.getElementsByClassName("e").length===2;}
),g=V(function(bN){bN.id=bd+0;bN.innerHTML="<a name='"+bd+"'></a><div name='"+bd+"'></div>";bx.insertBefore(bN,bx.firstChild);var bO=document.getElementsByName&&document.getElementsByName(bd).length===2+document.getElementsByName(bd+0).length;bh=!document.getElementById(bd);bx.removeChild(bN);return bO;}
);try{w.call(bx.childNodes,0)[0].nodeType;}
catch(e){w=function(i){var bP,bQ=[];for(;(bP=this[i]);i++){bQ.push(bP);}
;return bQ;}
;}
;function X(bR,bS,bT,bU){bT=bT||[];bS=bS||document;var bY,bX,bV,m,bW=bS.nodeType;if(!bR||typeof bR!=="string"){return bT;}
;if(bW!==1&&bW!==9){return [];}
;bV=D(bS);if(!bV&&!bU){if((bY=K.exec(bR))){if((m=bY[1])){if(bW===9){bX=bS.getElementById(m);if(bX&&bX.parentNode){if(bX.id===m){bT.push(bX);return bT;}
;}
else {return bT;}
;}
else {if(bS.ownerDocument&&(bX=bS.ownerDocument.getElementById(m))&&A(bS,bX)&&bX.id===m){bT.push(bX);return bT;}
;}
;}
else if(bY[2]){bt.apply(bT,w.call(bS.getElementsByTagName(bR),0));return bT;}
else if((m=bY[3])&&bs&&bS.getElementsByClassName){bt.apply(bT,w.call(bS.getElementsByClassName(m),0));return bT;}
;}
;}
;return u(bR.replace(ba,"$1"),bS,bT,bU,bV);}
;X.matches=function(ca,cb){return X(ca,null,null,cb);}
;X.matchesSelector=function(cc,cd){return X(cd,null,null,[cc]).length>0;}
;function bf(ce){return function(cf){var name=cf.nodeName.toLowerCase();return name==="input"&&cf.type===ce;}
;}
;function h(cg){return function(ch){var name=ch.nodeName.toLowerCase();return (name==="input"||name==="button")&&ch.type===cg;}
;}
;function U(ci){return bj(function(cj){cj=+cj;return bj(function(ck,cl){var j,cm=ci([],ck.length,cj),i=cm.length;while(i--){if(ck[(j=cm[i])]){ck[j]=!(cl[j]=ck[j]);}
;}
;}
);}
);}
;n=X.getText=function(cn){var co,cq="",i=0,cp=cn.nodeType;if(cp){if(cp===1||cp===9||cp===11){if(typeof cn.textContent==="string"){return cn.textContent;}
else {for(cn=cn.firstChild;cn;cn=cn.nextSibling){cq+=n(cn);}
;}
;}
else if(cp===3||cp===4){return cn.nodeValue;}
;}
else {for(;(co=cn[i]);i++){cq+=n(co);}
;}
;return cq;}
;D=X.isXML=function(cr){var cs=cr&&(cr.ownerDocument||cr).documentElement;return cs?cs.nodeName!=="HTML":false;}
;A=X.contains=bx.contains?function(a,b){var ct=a.nodeType===9?a.documentElement:a,cu=b&&b.parentNode;return a===cu||!!(cu&&cu.nodeType===1&&ct.contains&&ct.contains(cu));}
:bx.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16);}
:function(a,b){while((b=b.parentNode)){if(b===a){return true;}
;}
;return false;}
;X.attr=function(cv,name){var cx,cw=D(cv);if(!cw){name=name.toLowerCase();}
;if((cx=R.attrHandle[name])){return cx(cv);}
;if(cw||bm){return cv.getAttribute(name);}
;cx=cv.getAttributeNode(name);return cx?typeof cv[name]==="boolean"?cv[name]?name:null:cx.specified?cx.value:null:null;}
;R=X.selectors={cacheLength:50,createPseudo:bj,match:t,attrHandle:J?{}:{"href":function(cy){return cy.getAttribute("href",2);}
,"type":function(cz){return cz.getAttribute("type");}
},find:{"ID":bh?function(cA,cB,cC){if(typeof cB.getElementById!==bq&&!cC){var m=cB.getElementById(cA);return m&&m.parentNode?[m]:[];}
;}
:function(cD,cE,cF){if(typeof cE.getElementById!==bq&&!cF){var m=cE.getElementById(cD);return m?m.id===cD||typeof m.getAttributeNode!==bq&&m.getAttributeNode("id").value===cD?[m]:undefined:[];}
;}
,"TAG":o?function(cG,cH){if(typeof cH.getElementsByTagName!==bq){return cH.getElementsByTagName(cG);}
;}
:function(cI,cJ){var cL=cJ.getElementsByTagName(cI);if(cI==="*"){var cM,cK=[],i=0;for(;(cM=cL[i]);i++){if(cM.nodeType===1){cK.push(cM);}
;}
;return cK;}
;return cL;}
,"NAME":g&&function(cN,cO){if(typeof cO.getElementsByName!==bq){return cO.getElementsByName(name);}
;}
,"CLASS":bs&&function(cP,cQ,cR){if(typeof cQ.getElementsByClassName!==bq&&!cR){return cQ.getElementsByClassName(cP);}
;}
},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function(cS){cS[1]=cS[1].replace(d,"");cS[3]=(cS[4]||cS[5]||"").replace(d,"");if(cS[2]==="~="){cS[3]=" "+cS[3]+" ";}
;return cS.slice(0,4);}
,"CHILD":function(cT){cT[1]=cT[1].toLowerCase();if(cT[1]==="nth"){if(!cT[2]){X.error(cT[0]);}
;cT[3]=+(cT[3]?cT[4]+(cT[5]||1):2*(cT[2]==="even"||cT[2]==="odd"));cT[4]=+((cT[6]+cT[7])||cT[2]==="odd");}
else if(cT[2]){X.error(cT[0]);}
;return cT;}
,"PSEUDO":function(cU){var cV,cW;if(t["CHILD"].test(cU[0])){return null;}
;if(cU[3]){cU[2]=cU[3];}
else if((cV=cU[4])){if(be.test(cV)&&(cW=I(cV,true))&&(cW=cV.indexOf(")",cV.length-cW)-cV.length)){cV=cV.slice(0,cW);cU[0]=cU[0].slice(0,cW);}
;cU[2]=cV;}
;return cU.slice(0,3);}
},filter:{"ID":bh?function(cX){cX=cX.replace(d,"");return function(cY){return cY.getAttribute("id")===cX;}
;}
:function(da){da=da.replace(d,"");return function(db){var dc=typeof db.getAttributeNode!==bq&&db.getAttributeNode("id");return dc&&dc.value===da;}
;}
,"TAG":function(dd){if(dd==="*"){return function(){return true;}
;}
;dd=dd.replace(d,"").toLowerCase();return function(de){return de.nodeName&&de.nodeName.toLowerCase()===dd;}
;}
,"CLASS":function(df){var dg=bk[bd][df];if(!dg){dg=bk(df,new RegExp("(^|"+y+")"+df+"("+y+"|$)"));}
;return function(dh){return dg.test(dh.className||(typeof dh.getAttribute!==bq&&dh.getAttribute("class"))||"");}
;}
,"ATTR":function(name,di,dj){return function(dk,dl){var dm=X.attr(dk,name);if(dm==null){return di==="!=";}
;if(!di){return true;}
;dm+="";return di==="="?dm===dj:di==="!="?dm!==dj:di==="^="?dj&&dm.indexOf(dj)===0:di==="*="?dj&&dm.indexOf(dj)>-1:di==="$="?dj&&dm.substr(dm.length-dj.length)===dj:di==="~="?(" "+dm+" ").indexOf(dj)>-1:di==="|="?dm===dj||dm.substr(0,dj.length+1)===dj+"-":false;}
;}
,"CHILD":function(dn,dp,dq,dr){if(dn==="nth"){return function(ds){var dt,du,parent=ds.parentNode;if(dq===1&&dr===0){return true;}
;if(parent){du=0;for(dt=parent.firstChild;dt;dt=dt.nextSibling){if(dt.nodeType===1){du++;if(ds===dt){break;}
;}
;}
;}
;du-=dr;return du===dq||(du%dq===0&&du/dq>=0);}
;}
;return function(dv){var dw=dv;switch(dn){case "only":case "first":while((dw=dw.previousSibling)){if(dw.nodeType===1){return false;}
;}
;if(dn==="first"){return true;}
;dw=dv;case "last":while((dw=dw.nextSibling)){if(dw.nodeType===1){return false;}
;}
;return true;};}
;}
,"PSEUDO":function(dx,dy){var dz,dA=R.pseudos[dx]||R.setFilters[dx.toLowerCase()]||X.error("unsupported pseudo: "+dx);if(dA[bd]){return dA(dy);}
;if(dA.length>1){dz=[dx,dx,"",dy];return R.setFilters.hasOwnProperty(dx.toLowerCase())?bj(function(dB,dC){var dD,dE=dA(dB,dy),i=dE.length;while(i--){dD=Q.call(dB,dE[i]);dB[dD]=!(dC[dD]=dE[i]);}
;}
):function(dF){return dA(dF,0,dz);}
;}
;return dA;}
},pseudos:{"not":bj(function(dG){var dH=[],dI=[],dJ=bo(dG.replace(ba,"$1"));return dJ[bd]?bj(function(dK,dL,dM,dN){var dO,dP=dJ(dK,null,dN,[]),i=dK.length;while(i--){if((dO=dP[i])){dK[i]=!(dL[i]=dO);}
;}
;}
):function(dQ,dR,dS){dH[0]=dQ;dJ(dH,null,dS,dI);return !dI.pop();}
;}
),"has":bj(function(dT){return function(dU){return X(dT,dU).length>0;}
;}
),"contains":bj(function(dV){return function(dW){return (dW.textContent||dW.innerText||n(dW)).indexOf(dV)>-1;}
;}
),"enabled":function(dX){return dX.disabled===false;}
,"disabled":function(dY){return dY.disabled===true;}
,"checked":function(ea){var eb=ea.nodeName.toLowerCase();return (eb==="input"&&!!ea.checked)||(eb==="option"&&!!ea.selected);}
,"selected":function(ec){if(ec.parentNode){ec.parentNode.selectedIndex;}
;return ec.selected===true;}
,"parent":function(ed){return !R.pseudos["empty"](ed);}
,"empty":function(ee){var ef;ee=ee.firstChild;while(ee){if(ee.nodeName>"@"||(ef=ee.nodeType)===3||ef===4){return false;}
;ee=ee.nextSibling;}
;return true;}
,"header":function(eg){return k.test(eg.nodeName);}
,"text":function(eh){var ei,ej;return eh.nodeName.toLowerCase()==="input"&&(ei=eh.type)==="text"&&((ej=eh.getAttribute("type"))==null||ej.toLowerCase()===ei);}
,"radio":bf("radio"),"checkbox":bf("checkbox"),"file":bf("file"),"password":bf("password"),"image":bf("image"),"submit":h("submit"),"reset":h("reset"),"button":function(ek){var name=ek.nodeName.toLowerCase();return name==="input"&&ek.type==="button"||name==="button";}
,"input":function(el){return H.test(el.nodeName);}
,"focus":function(em){var en=em.ownerDocument;return em===en.activeElement&&(!en.hasFocus||en.hasFocus())&&!!(em.type||em.href);}
,"active":function(eo){return eo===eo.ownerDocument.activeElement;}
,"first":U(function(ep,length,eq){return [0];}
),"last":U(function(er,length,es){return [length-1];}
),"eq":U(function(et,length,eu){return [eu<0?eu+length:eu];}
),"even":U(function(ev,length,ew){for(var i=0;i<length;i+=2){ev.push(i);}
;return ev;}
),"odd":U(function(ex,length,ey){for(var i=1;i<length;i+=2){ex.push(i);}
;return ex;}
),"lt":U(function(ez,length,eA){for(var i=eA<0?eA+length:eA;--i>=0;){ez.push(i);}
;return ez;}
),"gt":U(function(eB,length,eC){for(var i=eC<0?eC+length:eC;++i<length;){eB.push(i);}
;return eB;}
)}};function B(a,b,eD){if(a===b){return eD;}
;var eE=a.nextSibling;while(eE){if(eE===b){return -1;}
;eE=eE.nextSibling;}
;return 1;}
;G=bx.compareDocumentPosition?function(a,b){if(a===b){bn=true;return 0;}
;return (!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1;}
:function(a,b){if(a===b){bn=true;return 0;}
else if(a.sourceIndex&&b.sourceIndex){return a.sourceIndex-b.sourceIndex;}
;var eJ,eH,eK=[],eL=[],eG=a.parentNode,eI=b.parentNode,eF=eG;if(eG===eI){return B(a,b);}
else if(!eG){return -1;}
else if(!eI){return 1;}
;while(eF){eK.unshift(eF);eF=eF.parentNode;}
;eF=eI;while(eF){eL.unshift(eF);eF=eF.parentNode;}
;eJ=eK.length;eH=eL.length;for(var i=0;i<eJ&&i<eH;i++){if(eK[i]!==eL[i]){return B(eK[i],eL[i]);}
;}
;return i===eJ?B(a,eL[i],-1):B(eK[i],b,1);}
;[0,0].sort(G);L=!bn;X.uniqueSort=function(eM){var eN,i=1;bn=L;eM.sort(G);if(bn){for(;(eN=eM[i]);i++){if(eN===eM[i-1]){eM.splice(i--,1);}
;}
;}
;return eM;}
;X.error=function(eO){throw new Error("Syntax error, unrecognized expression: "+eO);}
;function I(eP,eQ){var eY,eX,eT,eW,eR,eV,eU,eS=bc[bd][eP];if(eS){return eQ?0:eS.slice(0);}
;eR=eP;eV=[];eU=R.preFilter;while(eR){if(!eY||(eX=bi.exec(eR))){if(eX){eR=eR.slice(eX[0].length);}
;eV.push(eT=[]);}
;eY=false;if((eX=z.exec(eR))){eT.push(eY=new W(eX.shift()));eR=eR.slice(eY.length);eY.type=eX[0].replace(ba," ");}
;for(eW in R.filter){if((eX=t[eW].exec(eR))&&(!eU[eW]||(eX=eU[eW](eX,document,true)))){eT.push(eY=new W(eX.shift()));eR=eR.slice(eY.length);eY.type=eW;eY.matches=eX;}
;}
;if(!eY){break;}
;}
;return eQ?eR.length:eR?X.error(eP):bc(eP,eV).slice(0);}
;function s(fa,fb,fc){var ff=fb.dir,fe=fc&&fb.dir==="parentNode",fd=r++;return fb.first?function(fg,fh,fi){while((fg=fg[ff])){if(fe||fg.nodeType===1){return fa(fg,fh,fi);}
;}
;}
:function(fj,fk,fl){if(!fl){var fo,fp=br+" "+fd+" ",fm=fp+q;while((fj=fj[ff])){if(fe||fj.nodeType===1){if((fo=fj[bd])===fm){return fj.sizset;}
else if(typeof fo==="string"&&fo.indexOf(fp)===0){if(fj.sizset){return fj;}
;}
else {fj[bd]=fm;if(fa(fj,fk,fl)){fj.sizset=true;return fj;}
;fj.sizset=false;}
;}
;}
;}
else {while((fj=fj[ff])){if(fe||fj.nodeType===1){if(fa(fj,fk,fl)){return fj;}
;}
;}
;}
;}
;}
;function E(fq){return fq.length>1?function(fr,fs,ft){var i=fq.length;while(i--){if(!fq[i](fr,fs,ft)){return false;}
;}
;return true;}
:fq[0];}
;function C(fu,fv,fw,fx,fy){var fA,fz=[],i=0,fB=fu.length,fC=fv!=null;for(;i<fB;i++){if((fA=fu[i])){if(!fw||fw(fA,fx,fy)){fz.push(fA);if(fC){fv.push(i);}
;}
;}
;}
;return fz;}
;function x(fD,fE,fF,fG,fH,fI){if(fG&&!fG[bd]){fG=x(fG);}
;if(fH&&!fH[bd]){fH=x(fH,fI);}
;return bj(function(fJ,fK,fL,fM){if(fJ&&fH){return;}
;var i,fP,fN,fT=[],fU=[],fO=fK.length,fR=fJ||bb(fE||"*",fL.nodeType?[fL]:fL,[],fJ),fQ=fD&&(fJ||!fE)?C(fR,fT,fD,fL,fM):fR,fS=fF?fH||(fJ?fD:fO||fG)?[]:fK:fQ;if(fF){fF(fQ,fS,fL,fM);}
;if(fG){fN=C(fS,fU);fG(fN,[],fL,fM);i=fN.length;while(i--){if((fP=fN[i])){fS[fU[i]]=!(fQ[fU[i]]=fP);}
;}
;}
;if(fJ){i=fD&&fS.length;while(i--){if((fP=fS[i])){fJ[fT[i]]=!(fK[fT[i]]=fP);}
;}
;}
else {fS=C(fS===fK?fS.splice(fO,fS.length):fS);if(fH){fH(null,fK,fS,fM);}
else {bt.apply(fK,fS);}
;}
;}
);}
;function N(fV){var fW,fY,j,ga=fV.length,gc=R.relative[fV[0].type],ge=gc||R.relative[" "],i=gc?1:0,gd=s(function(gf){return gf===fW;}
,ge,true),gb=s(function(gg){return Q.call(fW,gg)>-1;}
,ge,true),fX=[function(gh,gi,gj){return (!gc&&(gj||gi!==f))||((fW=gi).nodeType?gd(gh,gi,gj):gb(gh,gi,gj));}
];for(;i<ga;i++){if((fY=R.relative[fV[i].type])){fX=[s(E(fX),fY)];}
else {fY=R.filter[fV[i].type].apply(null,fV[i].matches);if(fY[bd]){j=++i;for(;j<ga;j++){if(R.relative[fV[j].type]){break;}
;}
;return x(i>1&&E(fX),i>1&&fV.slice(0,i-1).join("").replace(ba,"$1"),fY,i<j&&N(fV.slice(i,j)),j<ga&&N((fV=fV.slice(j))),j<ga&&fV.join(""));}
;fX.push(fY);}
;}
;return E(fX);}
;function P(gk,gl){var gn=gl.length>0,gm=gk.length>0,go=function(gp,gq,gr,gs,gt){var gx,j,gw,gA=[],gu=0,i="0",gy=gp&&[],gC=gt!=null,gv=f,gz=gp||gm&&R.find["TAG"]("*",gt&&gq.parentNode||gq),gB=(br+=gv==null?1:Math.E);if(gC){f=gq!==document&&gq;q=go.el;}
;for(;(gx=gz[i])!=null;i++){if(gm&&gx){for(j=0;(gw=gk[j]);j++){if(gw(gx,gq,gr)){gs.push(gx);break;}
;}
;if(gC){br=gB;q=++go.el;}
;}
;if(gn){if((gx=!gw&&gx)){gu--;}
;if(gp){gy.push(gx);}
;}
;}
;gu+=i;if(gn&&i!==gu){for(j=0;(gw=gl[j]);j++){gw(gy,gA,gq,gr);}
;if(gp){if(gu>0){while(i--){if(!(gy[i]||gA[i])){gA[i]=Y.call(gs);}
;}
;}
;gA=C(gA);}
;bt.apply(gs,gA);if(gC&&!gp&&gA.length>0&&(gu+gl.length)>1){X.uniqueSort(gs);}
;}
;if(gC){br=gB;f=gv;}
;return gy;}
;go.el=0;return gn?bj(go):go;}
;bo=X.compile=function(gD,gE){var i,gG=[],gH=[],gF=bv[bd][gD];if(!gF){if(!gE){gE=I(gD);}
;i=gE.length;while(i--){gF=N(gE[i]);if(gF[bd]){gG.push(gF);}
else {gH.push(gF);}
;}
;gF=bv(gD,P(gH,gG));}
;return gF;}
;function bb(gI,gJ,gK,gL){var i=0,gM=gJ.length;for(;i<gM;i++){X(gI,gJ[i],gK,gL);}
;return gK;}
;function u(gN,gO,gP,gQ,gR){var i,gS,gT,gU,find,gV=I(gN),j=gV.length;if(!gQ){if(gV.length===1){gS=gV[0]=gV[0].slice(0);if(gS.length>2&&(gT=gS[0]).type==="ID"&&gO.nodeType===9&&!gR&&R.relative[gS[1].type]){gO=R.find["ID"](gT.matches[0].replace(d,""),gO,gR)[0];if(!gO){return gP;}
;gN=gN.slice(gS.shift().length);}
;for(i=t["POS"].test(gN)?-1:gS.length-1;i>=0;i--){gT=gS[i];if(R.relative[(gU=gT.type)]){break;}
;if((find=R.find[gU])){if((gQ=find(gT.matches[0].replace(d,""),O.test(gS[0].type)&&gO.parentNode||gO,gR))){gS.splice(i,1);gN=gQ.length&&gS.join("");if(!gN){bt.apply(gP,w.call(gQ,0));return gP;}
;break;}
;}
;}
;}
;}
;bo(gN,gV)(gQ,gO,gR,gP,O.test(gN));return gP;}
;if(document.querySelectorAll){(function(){var gX,hd=u,hc=/'|\\/g,ha=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,gY=[":focus"],gW=[":active",":focus"],hb=bx.matchesSelector||bx.mozMatchesSelector||bx.webkitMatchesSelector||bx.oMatchesSelector||bx.msMatchesSelector;V(function(he){he.innerHTML="<select><option selected=''></option></select>";if(!he.querySelectorAll("[selected]").length){gY.push("\\["+y+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)");}
;if(!he.querySelectorAll(":checked").length){gY.push(":checked");}
;}
);V(function(hf){hf.innerHTML="<p test=''></p>";if(hf.querySelectorAll("[test^='']").length){gY.push("[*^$]="+y+"*(?:\"\"|'')");}
;hf.innerHTML="<input type='hidden'/>";if(!hf.querySelectorAll(":enabled").length){gY.push(":enabled",":disabled");}
;}
);gY=new RegExp(gY.join("|"));u=function(hg,hh,hi,hj,hk){if(!hj&&!hk&&(!gY||!gY.test(hg))){var ho,i,hl=true,hm=bd,hp=hh,hn=hh.nodeType===9&&hg;if(hh.nodeType===1&&hh.nodeName.toLowerCase()!=="object"){ho=I(hg);if((hl=hh.getAttribute("id"))){hm=hl.replace(hc,"\\$&");}
else {hh.setAttribute("id",hm);}
;hm="[id='"+hm+"'] ";i=ho.length;while(i--){ho[i]=hm+ho[i].join("");}
;hp=O.test(hg)&&hh.parentNode||hh;hn=ho.join(",");}
;if(hn){try{bt.apply(hi,w.call(hp.querySelectorAll(hn),0));return hi;}
catch(hq){}
finally{if(!hl){hh.removeAttribute("id");}
;}
;}
;}
;return hd(hg,hh,hi,hj,hk);}
;if(hb){V(function(hr){gX=hb.call(hr,"div");try{hb.call(hr,"[test!='']:sizzle");gW.push("!=",M);}
catch(e){}
;}
);gW=new RegExp(gW.join("|"));X.matchesSelector=function(hs,ht){ht=ht.replace(ha,"='$1']");if(!D(hs)&&!gW.test(ht)&&(!gY||!gY.test(ht))){try{var hu=hb.call(hs,ht);if(hu||gX||hs.document&&hs.document.nodeType!==11){return hu;}
;}
catch(e){}
;}
;return X(ht,null,null,[hs]).length>0;}
;}
;}
)();}
;R.pseudos["nth"]=R.pseudos["eq"];function F(){}
;R.filters=F.prototype=R.pseudos;R.setFilters=new F();qx.bom.Selector.query=function(hv,hw){return X(hv,hw);}
;qx.bom.Selector.matches=function(hx,hy){return X(hx,null,null,hy);}
;}
)(window);}
)();
(function(){var a="qx.module.Polyfill";qx.Bootstrap.define(a,{});}
)();
(function(){var n="mshtml",k="engine.name",h="left",g="qx.module.Event",f="undefined",e="DOMContentLoaded",d="browser.documentmode",c="complete",b="load",a="*";qx.Bootstrap.define(g,{statics:{__fe:{},__ff:{on:{},off:{}},on:function(o,p,q){for(var i=0;i<this.length;i++){var r=this[i];var t=q||qxWeb(r);var s=qx.module.Event.__ff.on;var w=s[a]||[];if(s[o]){w=w.concat(s[o]);}
;for(var j=0,m=w.length;j<m;j++){w[j](r,o,p,q);}
;var u=function(event){var A=qx.module.Event.__fe;var z=A[a]||[];if(A[o]){z=z.concat(A[o]);}
;for(var x=0,y=z.length;x<y;x++){event=z[x](event,r,o);}
;p.apply(this,[event]);}
.bind(t);u.original=p;if(qx.bom.Event.supportsEvent(r,o)){qx.bom.Event.addNativeListener(r,o,u);}
;if(!r.__fg){r.__fg=new qx.event.Emitter();}
;var v=r.__fg.on(o,u,t);if(!r.__fh){r.__fh={};}
;if(!r.__fh[o]){r.__fh[o]={};}
;r.__fh[o][v]=u;if(!q){if(!r.__fi){r.__fi={};}
;r.__fi[v]=t;}
;}
;return this;}
,off:function(B,C,D){for(var j=0;j<this.length;j++){var E=this[j];if(!E.__fh){continue;}
;for(var J in E.__fh[B]){var I=E.__fh[B][J];if(I==C||I.original==C){var G=typeof E.__fi!==f&&E.__fi[J];if(!D&&G){var K=E.__fi[J];}
;E.__fg.off(B,I,K||D);if(I.original==C){qx.bom.Event.removeNativeListener(E,B,I);}
;delete E.__fh[B][J];if(G){delete E.__fi[J];}
;}
;}
;var F=qx.module.Event.__ff.off;var H=F[a]||[];if(F[B]){H=H.concat(F[B]);}
;for(var i=0,m=H.length;i<m;i++){H[i](E,B,C,D);}
;}
;return this;}
,emit:function(L,M){for(var j=0;j<this.length;j++){var N=this[j];if(N.__fg){N.__fg.emit(L,M);}
;}
;return this;}
,once:function(O,P,Q){var self=this;var R=function(S){self.off(O,R,Q);P.call(this,S);}
;this.on(O,R,Q);return this;}
,hasListener:function(T){if(!this[0]||!this[0].__fg||!this[0].__fg.getListeners()[T]){return false;}
;return this[0].__fg.getListeners()[T].length>0;}
,copyEventsTo:function(U){var ba=this.concat();for(var i=ba.length-1;i>=0;i--){var W=ba[i].getElementsByTagName(a);for(var j=0;j<W.length;j++){ba.push(W[j]);}
;}
;for(var i=U.length-1;i>=0;i--){var W=U[i].getElementsByTagName(a);for(var j=0;j<W.length;j++){U.push(W[j]);}
;}
;U.forEach(function(bb){bb.__fg=null;}
);for(var i=0;i<ba.length;i++){var V=ba[i];if(!V.__fg){continue;}
;var X=V.__fg.getListeners();for(var name in X){for(var j=X[name].length-1;j>=0;j--){var Y=X[name][j].listener;if(Y.original){Y=Y.original;}
;qxWeb(U[i]).on(name,Y,X[name][j].ctx);}
;}
;}
;}
,__dc:false,ready:function(bc){if(document.readyState===c){window.setTimeout(bc,1);return;}
;var bd=function(){qx.module.Event.__dc=true;bc();}
;qxWeb(window).on(b,bd);var be=function(){qxWeb(window).off(b,bd);bc();}
;if(qxWeb.env.get(k)!==n||qxWeb.env.get(d)>8){qx.bom.Event.addNativeListener(document,e,be);}
else {var bf=function(){if(qx.module.Event.__dc){return;}
;try{document.documentElement.doScroll(h);if(document.body){be();}
;}
catch(bg){window.setTimeout(bf,100);}
;}
;bf();}
;}
,$registerNormalization:function(bh,bi){if(!qx.lang.Type.isArray(bh)){bh=[bh];}
;var bk=qx.module.Event.__fe;for(var i=0,l=bh.length;i<l;i++){var bj=bh[i];if(qx.lang.Type.isFunction(bi)){if(!bk[bj]){bk[bj]=[];}
;bk[bj].push(bi);}
;}
;}
,$unregisterNormalization:function(bl,bm){if(!qx.lang.Type.isArray(bl)){bl=[bl];}
;var bo=qx.module.Event.__fe;for(var i=0,l=bl.length;i<l;i++){var bn=bl[i];if(bo[bn]){qx.lang.Array.remove(bo[bn],bm);}
;}
;}
,$getRegistry:function(){return qx.module.Event.__fe;}
,$registerEventHook:function(bp,bq,br){if(!qx.lang.Type.isArray(bp)){bp=[bp];}
;var bt=qx.module.Event.__ff.on;for(var i=0,l=bp.length;i<l;i++){var bu=bp[i];if(qx.lang.Type.isFunction(bq)){if(!bt[bu]){bt[bu]=[];}
;bt[bu].push(bq);}
;}
;if(!br){return;}
;var bs=qx.module.Event.__ff.off;for(var i=0,l=bp.length;i<l;i++){var bu=bp[i];if(qx.lang.Type.isFunction(br)){if(!bs[bu]){bs[bu]=[];}
;bs[bu].push(br);}
;}
;}
,$unregisterEventHook:function(bv,bw,bx){if(!qx.lang.Type.isArray(bv)){bv=[bv];}
;var bz=qx.module.Event.__ff.on;for(var i=0,l=bv.length;i<l;i++){var bA=bv[i];if(bz[bA]){qx.lang.Array.remove(bz[bA],bw);}
;}
;if(!bx){return;}
;var by=qx.module.Event.__ff.off;for(var i=0,l=bv.length;i<l;i++){var bA=bv[i];if(by[bA]){qx.lang.Array.remove(by[bA],bx);}
;}
;}
,$getHookRegistry:function(){return qx.module.Event.__ff;}
},defer:function(bB){qxWeb.$attach({"on":bB.on,"off":bB.off,"once":bB.once,"emit":bB.emit,"hasListener":bB.hasListener,"copyEventsTo":bB.copyEventsTo});qxWeb.$attachStatic({"ready":bB.ready,"$registerEventNormalization":bB.$registerNormalization,"$unregisterEventNormalization":bB.$unregisterNormalization,"$getEventNormalizationRegistry":bB.$getRegistry,"$registerEventHook":bB.$registerEventHook,"$unregisterEventHook":bB.$unregisterEventHook,"$getEventHookRegistry":bB.$getHookRegistry});}
});}
)();
(function(){var b="qx.event.Emitter",a="*";qx.Bootstrap.define(b,{extend:Object,statics:{__fj:[]},members:{__fh:null,__fk:null,on:function(name,c,d){var e=qx.event.Emitter.__fj.length;this.__fl(name).push({listener:c,ctx:d,id:e});qx.event.Emitter.__fj.push({name:name,listener:c,ctx:d});return e;}
,once:function(name,f,g){var h=qx.event.Emitter.__fj.length;this.__fl(name).push({listener:f,ctx:g,once:true,id:h});qx.event.Emitter.__fj.push({name:name,listener:f,ctx:g});return h;}
,off:function(name,j,k){var m=this.__fl(name);for(var i=m.length-1;i>=0;i--){var l=m[i];if(l.listener==j&&l.ctx==k){m.splice(i,1);qx.event.Emitter.__fj[l.id]=null;return l.id;}
;}
;return null;}
,offById:function(n){var o=qx.event.Emitter.__fj[n];this.off(o.name,o.listener,o.ctx);}
,addListener:function(name,p,q){return this.on(name,p,q);}
,addListenerOnce:function(name,r,s){return this.once(name,r,s);}
,removeListener:function(name,t,u){this.off(name,t,u);}
,removeListenerById:function(v){this.offById(v);}
,emit:function(name,w){var y=this.__fl(name);for(var i=0;i<y.length;i++){var x=y[i];x.listener.call(x.ctx,w);if(x.once){y.splice(i,1);i--;}
;}
;y=this.__fl(a);for(var i=y.length-1;i>=0;i--){var x=y[i];x.listener.call(x.ctx,w);}
;}
,getListeners:function(){return this.__fh;}
,__fl:function(name){if(this.__fh==null){this.__fh={};}
;if(this.__fh[name]==null){this.__fh[name]=[];}
;return this.__fh[name];}
}});}
)();
(function(){var d="qx.module.Css",c="",b="none",a="display";qx.Bootstrap.define(d,{statics:{setStyle:function(name,e){if(/\w-\w/.test(name)){name=qx.lang.String.camelCase(name);}
;for(var i=0;i<this.length;i++){qx.bom.element.Style.set(this[i],name,e);}
;return this;}
,getStyle:function(name){if(this[0]){if(/\w-\w/.test(name)){name=qx.lang.String.camelCase(name);}
;return qx.bom.element.Style.get(this[0],name);}
;return null;}
,setStyles:function(f){for(var name in f){this.setStyle(name,f[name]);}
;return this;}
,getStyles:function(g){var h={};for(var i=0;i<g.length;i++){h[g[i]]=this.getStyle(g[i]);}
;return h;}
,addClass:function(name){for(var i=0;i<this.length;i++){qx.bom.element.Class.add(this[i],name);}
;return this;}
,addClasses:function(j){for(var i=0;i<this.length;i++){qx.bom.element.Class.addClasses(this[i],j);}
;return this;}
,removeClass:function(name){for(var i=0;i<this.length;i++){qx.bom.element.Class.remove(this[i],name);}
;return this;}
,removeClasses:function(k){for(var i=0;i<this.length;i++){qx.bom.element.Class.removeClasses(this[i],k);}
;return this;}
,hasClass:function(name){if(!this[0]){return false;}
;return qx.bom.element.Class.has(this[0],name);}
,getClass:function(){if(!this[0]){return c;}
;return qx.bom.element.Class.get(this[0]);}
,toggleClass:function(name){var m=qx.bom.element.Class;for(var i=0,l=this.length;i<l;i++){m.has(this[i],name)?m.remove(this[i],name):m.add(this[i],name);}
;return this;}
,toggleClasses:function(n){for(var i=0,l=n.length;i<l;i++){this.toggleClass(n[i]);}
;return this;}
,replaceClass:function(o,p){for(var i=0,l=this.length;i<l;i++){qx.bom.element.Class.replace(this[i],o,p);}
;return this;}
,getHeight:function(){var q=this[0];if(q){if(qx.dom.Node.isElement(q)){return qx.bom.element.Dimension.getHeight(q);}
else if(qx.dom.Node.isDocument(q)){return qx.bom.Document.getHeight(qx.dom.Node.getWindow(q));}
else if(qx.dom.Node.isWindow(q)){return qx.bom.Viewport.getHeight(q);}
;}
;return null;}
,getWidth:function(){var r=this[0];if(r){if(qx.dom.Node.isElement(r)){return qx.bom.element.Dimension.getWidth(r);}
else if(qx.dom.Node.isDocument(r)){return qx.bom.Document.getWidth(qx.dom.Node.getWindow(r));}
else if(qx.dom.Node.isWindow(r)){return qx.bom.Viewport.getWidth(r);}
;}
;return null;}
,getOffset:function(){var s=this[0];if(s){return qx.bom.element.Location.get(s);}
;return null;}
,getContentHeight:function(){var t=this[0];if(qx.dom.Node.isElement(t)){return qx.bom.element.Dimension.getContentHeight(t);}
;return null;}
,getContentWidth:function(){var u=this[0];if(qx.dom.Node.isElement(u)){return qx.bom.element.Dimension.getContentWidth(u);}
;return null;}
,getPosition:function(){var v=this[0];if(qx.dom.Node.isElement(v)){return qx.bom.element.Location.getPosition(v);}
;return null;}
,includeStylesheet:function(w,x){qx.bom.Stylesheet.includeFile(w,x);}
,hide:function(){for(var i=0,l=this.length;i<l;i++){var y=this.slice(i,i+1);var z=y.getStyle(a);if(z!==b){y[0].$$qPrevDisp=z;y.setStyle(a,b);}
;}
;return this;}
,show:function(){for(var i=0,l=this.length;i<l;i++){var E=this.slice(i,i+1);var D=E.getStyle(a);var C=E[0].$$qPrevDisp;var A;if(D==b){if(C&&C!=b){A=C;}
else {var B=qxWeb.getDocument(E[0]);A=qx.module.Css.__fn(E[0].tagName,B);}
;E.setStyle(a,A);E[0].$$qPrevDisp=b;}
;}
;return this;}
,__fm:{},__fn:function(F,G){var I=qx.module.Css.__fm;if(!I[F]){var J=G||document;var H=qxWeb(J.createElement(F)).appendTo(G.body);I[F]=H.getStyle(a);H.remove();}
;return I[F]||c;}
},defer:function(K){qxWeb.$attach({"setStyle":K.setStyle,"getStyle":K.getStyle,"setStyles":K.setStyles,"getStyles":K.getStyles,"addClass":K.addClass,"addClasses":K.addClasses,"removeClass":K.removeClass,"removeClasses":K.removeClasses,"hasClass":K.hasClass,"getClass":K.getClass,"toggleClass":K.toggleClass,"toggleClasses":K.toggleClasses,"replaceClass":K.replaceClass,"getHeight":K.getHeight,"getWidth":K.getWidth,"getOffset":K.getOffset,"getContentHeight":K.getContentHeight,"getContentWidth":K.getContentWidth,"getPosition":K.getPosition,"hide":K.hide,"show":K.show});qxWeb.$attachStatic({"includeStylesheet":K.includeStylesheet});}
});}
)();
(function(){var n="css.float",m="css.borderimage.standardsyntax",l="borderRadius",k="boxSizing",j="stretch",h='m11',g="content",f="css.inlineblock",e="css.gradient.filter",d="css.appearance",bs="css.opacity",br="css.gradient.radial",bq="input",bp="userSelect",bo="css.overflowxy",bn="styleFloat",bm="css.textShadow.filter",bl="css.usermodify",bk="css.boxsizing",bj='url("foo.png") 4 4 4 4 fill stretch',u="css.boxmodel",v="qx.bom.client.Css",s="appearance",t="placeholder",q="css.textShadow",r="DXImageTransform.Microsoft.Shadow",o="css.boxshadow",p="css.gradient.legacywebkit",C="css.borderradius",D="linear-gradient(0deg, #fff, #000)",O="textShadow",L="css.borderimage",W="rgba(1, 2, 3, 0.5)",R="color=#666666,direction=45",bf="radial-gradient(0px 0px, cover, red 50%, blue 100%)",bc="rgba",H="(",bi='url("foo.png") 4 4 4 4 stretch',bh="css.gradient.linear",bg="DXImageTransform.Microsoft.Gradient",G="css.userselect",J="-webkit-gradient(linear,0% 0%,100% 100%,from(white), to(red))",K="mshtml",N="css.rgba",P=");",S="4 fill",Y='WebKitCSSMatrix',be="red 1px 1px 3px",w="none",x="startColorStr=#550000FF, endColorStr=#55FFFF00",I="progid:",V="css.placeholder",U="css.userselect.none",T="css.textoverflow",bb="textOverflow",ba="userModify",Q="boxShadow",X="cssFloat",a="border",bd="color",y="borderImage",z="foo.png",M="span",b="string",c="-moz-none",F="backgroundImage",A="inline-block",B="-moz-inline-box",E="div";qx.Bootstrap.define(v,{statics:{__do:null,getBoxModel:function(){var content=qx.bom.client.Engine.getName()!==K||!qx.bom.client.Browser.getQuirksMode();return content?g:a;}
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
,getLinearGradient:function(){qx.bom.client.Css.__do=false;var bB=D;var by=document.createElement(E);var bz=qx.bom.Style.getAppliedStyle(by,F,bB);if(!bz){bB=J;var bz=qx.bom.Style.getAppliedStyle(by,F,bB,false);if(bz){qx.bom.client.Css.__do=true;}
;}
;if(!bz){return null;}
;var bA=/(.*?)\(/.exec(bz);return bA?bA[1]:null;}
,getFilterGradient:function(){return qx.bom.client.Css.__dp(bg,x);}
,getRadialGradient:function(){var bF=bf;var bC=document.createElement(E);var bD=qx.bom.Style.getAppliedStyle(bC,F,bF);if(!bD){return null;}
;var bE=/(.*?)\(/.exec(bD);return bE?bE[1]:null;}
,getLegacyWebkitGradient:function(){if(qx.bom.client.Css.__do===null){qx.bom.client.Css.getLinearGradient();}
;return qx.bom.client.Css.__do;}
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
,getFilterTextShadow:function(){return qx.bom.client.Css.__dp(r,R);}
,__dp:function(bN,bO){var bQ=false;var bR=I+bN+H+bO+P;var bP=document.createElement(E);document.body.appendChild(bP);bP.style.filter=bR;if(bP.filters&&bP.filters.length>0&&bP.filters.item(bN).enabled==true){bQ=true;}
;document.body.removeChild(bP);return bQ;}
},defer:function(bS){qx.core.Environment.add(T,bS.getTextOverflow);qx.core.Environment.add(V,bS.getPlaceholder);qx.core.Environment.add(C,bS.getBorderRadius);qx.core.Environment.add(o,bS.getBoxShadow);qx.core.Environment.add(bh,bS.getLinearGradient);qx.core.Environment.add(e,bS.getFilterGradient);qx.core.Environment.add(br,bS.getRadialGradient);qx.core.Environment.add(p,bS.getLegacyWebkitGradient);qx.core.Environment.add(u,bS.getBoxModel);qx.core.Environment.add(N,bS.getRgba);qx.core.Environment.add(L,bS.getBorderImage);qx.core.Environment.add(m,bS.getBorderImageSyntax);qx.core.Environment.add(bl,bS.getUserModify);qx.core.Environment.add(G,bS.getUserSelect);qx.core.Environment.add(U,bS.getUserSelectNone);qx.core.Environment.add(d,bS.getAppearance);qx.core.Environment.add(n,bS.getFloat);qx.core.Environment.add(bk,bS.getBoxSizing);qx.core.Environment.add(f,bS.getInlineBlock);qx.core.Environment.add(bs,bS.getOpacity);qx.core.Environment.add(bo,bS.getOverflowXY);qx.core.Environment.add(q,bS.getTextShadow);qx.core.Environment.add(bm,bS.getFilterTextShadow);}
});}
)();
(function(){var j="rim_tabletos",i="Darwin",h="os.version",g="2003",f=")",e="iPhone",d="android",c="unix",b="ce",a="7",bg="SymbianOS",bf="os.name",be="|",bd="MacPPC",bc="iPod",bb="\.",ba="Win64",Y="linux",X="me",W="Macintosh",q="Windows",r="ios",o="vista",p="8",m="blackberry",n="(",k="win",l="Linux",u="BSD",v="Mac OS X",D="iPad",B="X11",L="xp",G="symbian",S="qx.bom.client.OperatingSystem",Q="g",x="Win32",V="osx",U="webOS",T="RIM Tablet OS",w="BlackBerry",z="nt4",A=".",C="MacIntel",E="webos",H="10.1",N="10.3",R="10.7",s="10.5",t="95",y="10.2",K="Android",J="98",I="2000",P="10.6",O="10.0",F="10.4",M="";qx.Bootstrap.define(S,{statics:{getName:function(){if(!navigator){return M;}
;var bh=navigator.platform||M;var bi=navigator.userAgent||M;if(bh.indexOf(q)!=-1||bh.indexOf(x)!=-1||bh.indexOf(ba)!=-1){return k;}
else if(bh.indexOf(W)!=-1||bh.indexOf(bd)!=-1||bh.indexOf(C)!=-1||bh.indexOf(v)!=-1){return V;}
else if(bi.indexOf(T)!=-1){return j;}
else if(bi.indexOf(U)!=-1){return E;}
else if(bh.indexOf(bc)!=-1||bh.indexOf(e)!=-1||bh.indexOf(D)!=-1){return r;}
else if(bi.indexOf(K)!=-1){return d;}
else if(bh.indexOf(l)!=-1){return Y;}
else if(bh.indexOf(B)!=-1||bh.indexOf(u)!=-1||bh.indexOf(i)!=-1){return c;}
else if(bh.indexOf(bg)!=-1){return G;}
else if(bh.indexOf(w)!=-1){return m;}
;return M;}
,__cW:{"Windows NT 6.2":p,"Windows NT 6.1":a,"Windows NT 6.0":o,"Windows NT 5.2":g,"Windows NT 5.1":L,"Windows NT 5.0":I,"Windows 2000":I,"Windows NT 4.0":z,"Win 9x 4.90":X,"Windows CE":b,"Windows 98":J,"Win98":J,"Windows 95":t,"Win95":t,"Mac OS X 10_7":R,"Mac OS X 10.7":R,"Mac OS X 10_6":P,"Mac OS X 10.6":P,"Mac OS X 10_5":s,"Mac OS X 10.5":s,"Mac OS X 10_4":F,"Mac OS X 10.4":F,"Mac OS X 10_3":N,"Mac OS X 10.3":N,"Mac OS X 10_2":y,"Mac OS X 10.2":y,"Mac OS X 10_1":H,"Mac OS X 10.1":H,"Mac OS X 10_0":O,"Mac OS X 10.0":O},getVersion:function(){var bj=qx.bom.client.OperatingSystem.__cX(navigator.userAgent);if(bj==null){bj=qx.bom.client.OperatingSystem.__cY(navigator.userAgent);}
;if(bj!=null){return bj;}
else {return M;}
;}
,__cX:function(bk){var bn=[];for(var bm in qx.bom.client.OperatingSystem.__cW){bn.push(bm);}
;var bo=new RegExp(n+bn.join(be).replace(/\./g,bb)+f,Q);var bl=bo.exec(bk);if(bl&&bl[1]){return qx.bom.client.OperatingSystem.__cW[bl[1]];}
;return null;}
,__cY:function(bp){var bt=bp.indexOf(K)!=-1;var bq=bp.match(/(iPad|iPhone|iPod)/i)?true:false;if(bt){var bs=new RegExp(/ Android (\d+(?:\.\d+)+)/i);var bu=bs.exec(bp);if(bu&&bu[1]){return bu[1];}
;}
else if(bq){var bv=new RegExp(/(CPU|iPhone|iPod) OS (\d+)_(\d+)\s+/);var br=bv.exec(bp);if(br&&br[2]&&br[3]){return br[2]+A+br[3];}
;}
;return null;}
},defer:function(bw){qx.core.Environment.add(bf,bw.getName);qx.core.Environment.add(h,bw.getVersion);}
});}
)();
(function(){var j="CSS1Compat",i="android",h="operamini",g="gecko",f="browser.quirksmode",e="browser.name",d="mobile chrome",c="iemobile",b="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",a="opera mobi",H="Mobile Safari",G="Maple",F="operamobile",E="ie",D="mobile safari",C="IEMobile|Maxthon|MSIE",B="qx.bom.client.Browser",A="(Maple )([0-9]+\.[0-9]+\.[0-9]*)",z="opera mini",y="browser.version",q="opera",r="Opera Mini|Opera Mobi|Opera",o="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|Mobile Safari|Safari",p="webkit",m="browser.documentmode",n="5.0",k="Mobile/",l="msie",s="maple",t=")(/| )([0-9]+\.[0-9])",v="(",u="ce",x="",w="mshtml";qx.Bootstrap.define(B,{statics:{getName:function(){var L=navigator.userAgent;var K=new RegExp(v+qx.bom.client.Browser.__dq+t);var J=L.match(K);if(!J){return x;}
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
;return name;}
,getVersion:function(){var P=navigator.userAgent;var O=new RegExp(v+qx.bom.client.Browser.__dq+t);var N=P.match(O);if(!N){return x;}
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
,__dq:{"webkit":o,"gecko":b,"mshtml":C,"opera":r}[qx.bom.client.Engine.getName()]},defer:function(Q){qx.core.Environment.add(e,Q.getName),qx.core.Environment.add(y,Q.getVersion),qx.core.Environment.add(m,Q.getDocumentMode),qx.core.Environment.add(f,Q.getQuirksMode);}
});}
)();
(function(){var e='-',d="qx.bom.Style",c="string",b="",a="-";qx.Bootstrap.define(d,{statics:{VENDOR_PREFIXES:["Webkit","Moz","O","ms","Khtml"],__dr:{},getPropertyName:function(f){var g=document.documentElement.style;if(g[f]!==undefined){return f;}
;for(var i=0,l=this.VENDOR_PREFIXES.length;i<l;i++){var h=this.VENDOR_PREFIXES[i]+qx.lang.String.firstUp(f);if(g[h]!==undefined){return h;}
;}
;return null;}
,getCssName:function(j){var k=this.__dr[j];if(!k){k=j.replace(/[A-Z]/g,function(m){return (e+m.charAt(0).toLowerCase());}
);if((/^ms/.test(k))){k=a+k;}
;this.__dr[j]=k;}
;return k;}
,getAppliedStyle:function(n,o,p,q){var r=(q!==false)?[null].concat(this.VENDOR_PREFIXES):[null];for(var i=0,l=r.length;i<l;i++){var s=r[i]?a+r[i].toLowerCase()+a+p:p;try{n.style[o]=s;if(typeof n.style[o]==c&&n.style[o]!==b){return s;}
;}
catch(t){}
;}
;return null;}
}});}
)();
(function(){var l=");",k=")",j="zoom:1;filter:alpha(opacity=",i="qx.bom.element.Opacity",h="alpha(opacity=",g=";",f="opacity:",e="opacity",d="filter",c="engine.name",a="css.opacity",b="";qx.Bootstrap.define(i,{statics:{SUPPORT_CSS3_OPACITY:false,compile:qx.core.Environment.select(c,{"mshtml":function(m){if(m>=1){m=1;}
;if(m<0.00001){m=0;}
;if(qx.core.Environment.get(a)){return f+m+g;}
else {return j+(m*100)+l;}
;}
,"default":function(n){if(n>=1){return b;}
;return f+n+g;}
}),set:qx.core.Environment.select(c,{"mshtml":function(o,p){if(qx.core.Environment.get(a)){if(p>=1){p=b;}
;o.style.opacity=p;}
else {var q=qx.bom.element.Style.get(o,d,qx.bom.element.Style.COMPUTED_MODE,false);if(p>=1){p=1;}
;if(p<0.00001){p=0;}
;if(!o.currentStyle||!o.currentStyle.hasLayout){o.style.zoom=1;}
;o.style.filter=q.replace(/alpha\([^\)]*\)/gi,b)+h+p*100+k;}
;}
,"default":function(r,s){if(s>=1){s=b;}
;r.style.opacity=s;}
}),reset:qx.core.Environment.select(c,{"mshtml":function(t){if(qx.core.Environment.get(a)){t.style.opacity=b;}
else {var u=qx.bom.element.Style.get(t,d,qx.bom.element.Style.COMPUTED_MODE,false);t.style.filter=u.replace(/alpha\([^\)]*\)/gi,b);}
;}
,"default":function(v){v.style.opacity=b;}
}),get:qx.core.Environment.select(c,{"mshtml":function(w,x){if(qx.core.Environment.get(a)){var y=qx.bom.element.Style.get(w,e,x,false);if(y!=null){return parseFloat(y);}
;return 1.0;}
else {var z=qx.bom.element.Style.get(w,d,x,false);if(z){var y=z.match(/alpha\(opacity=(.*)\)/);if(y&&y[1]){return parseFloat(y[1])/100;}
;}
;return 1.0;}
;}
,"default":function(A,B){var C=qx.bom.element.Style.get(A,e,B,false);if(C!=null){return parseFloat(C);}
;return 1.0;}
})},defer:function(D){D.SUPPORT_CSS3_OPACITY=qx.core.Environment.get(a);}
});{}
;}
)();
(function(){var o="clip:auto;",n="rect(",m=");",l="",k=")",j="qx.bom.element.Clip",i="string",h="clip:rect(",g=" ",f="clip",c="rect(auto,auto,auto,auto)",e="rect(auto, auto, auto, auto)",d=",",b="px",a="auto";qx.Bootstrap.define(j,{statics:{compile:function(p){if(!p){return o;}
;var u=p.left;var top=p.top;var t=p.width;var s=p.height;var q,r;if(u==null){q=(t==null?a:t+b);u=a;}
else {q=(t==null?a:u+t+b);u=u+b;}
;if(top==null){r=(s==null?a:s+b);top=a;}
else {r=(s==null?a:top+s+b);top=top+b;}
;return h+top+d+q+d+r+d+u+m;}
,get:function(v,w){var y=qx.bom.element.Style.get(v,f,w,false);var E,top,C,B;var x,z;if(typeof y===i&&y!==a&&y!==l){y=y.trim();if(/\((.*)\)/.test(y)){var D=RegExp.$1;if(/,/.test(D)){var A=D.split(d);}
else {var A=D.split(g);}
;top=A[0].trim();x=A[1].trim();z=A[2].trim();E=A[3].trim();if(E===a){E=null;}
;if(top===a){top=null;}
;if(x===a){x=null;}
;if(z===a){z=null;}
;if(top!=null){top=parseInt(top,10);}
;if(x!=null){x=parseInt(x,10);}
;if(z!=null){z=parseInt(z,10);}
;if(E!=null){E=parseInt(E,10);}
;if(x!=null&&E!=null){C=x-E;}
else if(x!=null){C=x;}
;if(z!=null&&top!=null){B=z-top;}
else if(z!=null){B=z;}
;}
else {throw new Error("Could not parse clip string: "+y);}
;}
;return {left:E||null,top:top||null,width:C||null,height:B||null};}
,set:function(F,G){if(!G){F.style.clip=c;return;}
;var L=G.left;var top=G.top;var K=G.width;var J=G.height;var H,I;if(L==null){H=(K==null?a:K+b);L=a;}
else {H=(K==null?a:L+K+b);L=L+b;}
;if(top==null){I=(J==null?a:J+b);top=a;}
else {I=(J==null?a:top+J+b);top=top+b;}
;F.style.clip=n+top+d+H+d+I+d+L+k;}
,reset:function(M){M.style.clip=e;}
}});}
)();
(function(){var s="cursor:",r="ns-resize",q="",p="mshtml",o="n-resize",n="opera",m=";",l="ew-resize",k="qx.bom.element.Cursor",j="e-resize",d="cursor",i="engine.name",g="nw-resize",c="nesw-resize",b="browser.documentmode",f="nwse-resize",e="ne-resize",h="browser.quirksmode",a="engine.version";qx.Bootstrap.define(k,{statics:{__bd:{},compile:function(t){return s+(this.__bd[t]||t)+m;}
,get:function(u,v){return qx.bom.element.Style.get(u,d,v,false);}
,set:function(w,x){w.style.cursor=this.__bd[x]||x;}
,reset:function(y){y.style.cursor=q;}
},defer:function(z){if(qx.core.Environment.get(i)==p&&((parseFloat(qx.core.Environment.get(a))<9||qx.core.Environment.get(b)<9)&&!qx.core.Environment.get(h))){z.__bd[c]=e;z.__bd[f]=g;if(((parseFloat(qx.core.Environment.get(a))<8||qx.core.Environment.get(b)<8)&&!qx.core.Environment.get(h))){z.__bd[l]=j;z.__bd[r]=o;}
;}
else if(qx.core.Environment.get(i)==n&&parseInt(qx.core.Environment.get(a))<12){z.__bd[c]=e;z.__bd[f]=g;}
;}
});}
)();
(function(){var h="border-box",g="qx.bom.element.BoxSizing",f="boxSizing",e="content-box",d=":",c=";",b="",a="css.boxsizing";qx.Bootstrap.define(g,{statics:{__ds:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__dt:function(i){var j=this.__ds;return j.tags[i.tagName.toLowerCase()]||j.types[i.type];}
,compile:function(k){if(qx.core.Environment.get(a)){var l=qx.bom.Style.getCssName(qx.core.Environment.get(a));return l+d+k+c;}
else {{}
;}
;}
,get:function(m){if(qx.core.Environment.get(a)){return qx.bom.element.Style.get(m,f,null,false)||b;}
;if(qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(m))){if(!this.__dt(m)){return e;}
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
(function(){var j="css.float",i="px",h="css.appearance",g="pixelRight",f="css.userselect",e="css.boxsizing",d="css.textoverflow",c="pixelHeight",b=":",a="pixelTop",w="css.borderimage",v="pixelLeft",u="css.usermodify",t="qx.bom.element.Style",s="pixelBottom",r="pixelWidth",q=";",p="float",o="browser.documentmode",n="mshtml",l="style",m="engine.name",k="";qx.Bootstrap.define(t,{statics:{__du:null,__dv:null,__dw:function(){var y={"appearance":qx.core.Environment.get(h),"userSelect":qx.core.Environment.get(f),"textOverflow":qx.core.Environment.get(d),"borderImage":qx.core.Environment.get(w),"float":qx.core.Environment.get(j),"userModify":qx.core.Environment.get(u),"boxSizing":qx.core.Environment.get(e)};this.__dv={};for(var x in qx.lang.Object.clone(y)){if(!y[x]){delete y[x];}
else {this.__dv[x]=x==p?p:qx.bom.Style.getCssName(y[x]);}
;}
;this.__du=y;}
,__dx:function(name){var z=qx.bom.Style.getPropertyName(name);if(z){this.__du[name]=z;}
;return z;}
,__dy:{width:r,height:c,left:v,right:g,top:a,bottom:s},__dz:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing},compile:function(A){var C=[];var D=this.__dz;var E=this.__dv;var name,B;for(name in A){B=A[name];if(B==null){continue;}
;name=this.__du[name]||this.__dx(name)||name;if(D[name]){C.push(D[name].compile(B));}
else {if(!E[name]){E[name]=qx.bom.Style.getCssName(name);}
;C.push(E[name],b,B,q);}
;}
;return C.join(k);}
,setCss:function(F,G){if(qx.core.Environment.get(m)===n&&parseInt(qx.core.Environment.get(o),10)<8){F.style.cssText=G;}
else {F.setAttribute(l,G);}
;}
,getCss:function(H){if(qx.core.Environment.get(m)===n&&parseInt(qx.core.Environment.get(o),10)<8){return H.style.cssText.toLowerCase();}
else {return H.getAttribute(l);}
;}
,isPropertySupported:function(I){return (this.__dz[I]||this.__du[I]||I in document.documentElement.style);}
,COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(J,name,K,L){{}
;name=this.__du[name]||this.__dx(name)||name;if(L!==false&&this.__dz[name]){this.__dz[name].set(J,K);}
else {J.style[name]=K!==null?K:k;}
;}
,setStyles:function(M,N,O){{}
;var R=this.__du;var T=this.__dz;var P=M.style;for(var S in N){var Q=N[S];var name=R[S]||this.__dx(S)||S;if(Q===undefined){if(O!==false&&T[name]){T[name].reset(M);}
else {P[name]=k;}
;}
else {if(O!==false&&T[name]){T[name].set(M,Q);}
else {P[name]=Q!==null?Q:k;}
;}
;}
;}
,reset:function(U,name,V){name=this.__du[name]||this.__dx(name)||name;if(V!==false&&this.__dz[name]){this.__dz[name].reset(U);}
else {U.style[name]=k;}
;}
,get:qx.core.Environment.select(m,{"mshtml":function(W,name,X,Y){name=this.__du[name]||this.__dx(name)||name;if(Y!==false&&this.__dz[name]){return this.__dz[name].get(W,X);}
;if(!W.currentStyle){return W.style[name]||k;}
;switch(X){case this.LOCAL_MODE:return W.style[name]||k;case this.CASCADED_MODE:return W.currentStyle[name]||k;default:var bd=W.currentStyle[name]||k;if(/^-?[\.\d]+(px)?$/i.test(bd)){return bd;}
;var bc=this.__dy[name];if(bc){var ba=W.style[name];W.style[name]=bd||0;var bb=W.style[bc]+i;W.style[name]=ba;return bb;}
;return bd;};}
,"default":function(be,name,bf,bg){name=this.__du[name]||this.__dx(name)||name;if(bg!==false&&this.__dz[name]){return this.__dz[name].get(be,bf);}
;switch(bf){case this.LOCAL_MODE:return be.style[name]||k;case this.CASCADED_MODE:if(be.currentStyle){return be.currentStyle[name]||k;}
;throw new Error("Cascaded styles are not supported in this browser!");default:var bh=qx.dom.Node.getDocument(be);var bi=bh.defaultView.getComputedStyle(be,null);return bi?bi[name]:k;};}
})},defer:function(bj){bj.__dw();}
});}
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
(function(){var b="qx.bom.Viewport",a="undefined";qx.Bootstrap.define(b,{statics:{getWidth:function(c){var c=c||window;var d=c.document;return qx.bom.Document.isStandardMode(c)?d.documentElement.clientWidth:d.body.clientWidth;}
,getHeight:function(e){var e=e||window;var f=e.document;return qx.bom.Document.isStandardMode(e)?f.documentElement.clientHeight:f.body.clientHeight;}
,getScrollLeft:function(g){var g=g?g:window;if(typeof g.pageXOffset!==a){return g.pageXOffset;}
;var h=g.document;return h.documentElement.scrollLeft||h.body.scrollLeft;}
,getScrollTop:function(i){var i=i?i:window;if(typeof i.pageYOffeset!==a){return i.pageYOffset;}
;var j=i.document;return j.documentElement.scrollTop||j.body.scrollTop;}
,__dA:function(k){var l=this.getWidth(k)>this.getHeight(k)?90:0;var m=k.orientation;if(m==null||Math.abs(m%180)==l){return {"-270":90,"-180":180,"-90":-90,"0":0,"90":90,"180":180,"270":-90};}
else {return {"-270":180,"-180":-90,"-90":0,"0":90,"90":180,"180":-90,"270":0};}
;}
,__dB:null,getOrientation:function(n){var n=n||window.top;var o=n.orientation;if(o==null){o=this.getWidth(n)>this.getHeight(n)?90:0;}
else {if(this.__dB==null){this.__dB=this.__dA(n);}
;o=this.__dB[o];}
;return o;}
,isLandscape:function(p){return this.getWidth(p)>=this.getHeight(p);}
,isPortrait:function(q){return this.getWidth(q)<this.getHeight(q);}
}});}
)();
(function(){var o="function",n="html.video.h264",m="html.element.contains",l='video/ogg; codecs="theora, vorbis"',k="html.console",j="html.xul",i="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",h="html.video.ogg",g="http://www.w3.org/TR/SVG11/feature#BasicStructure",f="html.storage.local",br="qx.bom.client.Html",bq='audio',bp='video/mp4; codecs="avc1.42E01E, mp4a.40.2"',bo="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",bn="html.audio",bm="url(#default#VML)",bl="audio/mpeg",bk="org.w3c.dom.svg",bj="html.classlist",bi="html.svg",w="html.video",x="html.geolocation",t="DOMTokenList",u="html.storage.session",r="1.1",s="html.history.state",p="object",q="html.image.naturaldimensions",C="html.audio.aif",D="audio/x-wav",N='<v:shape id="vml_flag1" adj="1" />',K="html.canvas",V="audio/ogg",Q="html.storage.userdata",be="html.element.compareDocumentPosition",bb="audio/x-aiff",G="html.audio.au",bh="img",bg="html.xpath",bf="qxtest",F='video',I="span",J="html.element.textcontent",M="html.audio.mp3",O="html.vml",R="html.audio.ogg",X="none",bd="label",y='video/webm; codecs="vp8, vorbis"',z="html.dataurl",H="html.webworker",U="html.dataset",T="1.0",S="html.audio.wav",ba="html.filereader",Y="audio/basic",P="#default#userdata",W="html.video.webm",b="display",bc="div",A="head",B="number",L="video",c="audio",d="undefined",E="";qx.Bootstrap.define(br,{statics:{getWebWorker:function(){return window.Worker!=null;}
,getFileReader:function(){return window.FileReader!=null;}
,getGeoLocation:function(){return navigator.geolocation!=null;}
,getAudio:function(){return !!document.createElement(bq).canPlayType;}
,getAudioOgg:function(){if(!qx.bom.client.Html.getAudio()){return E;}
;var a=document.createElement(c);return a.canPlayType(V);}
,getAudioMp3:function(){if(!qx.bom.client.Html.getAudio()){return E;}
;var a=document.createElement(c);return a.canPlayType(bl);}
,getAudioWav:function(){if(!qx.bom.client.Html.getAudio()){return E;}
;var a=document.createElement(c);return a.canPlayType(D);}
,getAudioAu:function(){if(!qx.bom.client.Html.getAudio()){return E;}
;var a=document.createElement(c);return a.canPlayType(Y);}
,getAudioAif:function(){if(!qx.bom.client.Html.getAudio()){return E;}
;var a=document.createElement(c);return a.canPlayType(bb);}
,getVideo:function(){return !!document.createElement(F).canPlayType;}
,getVideoOgg:function(){if(!qx.bom.client.Html.getVideo()){return E;}
;var v=document.createElement(L);return v.canPlayType(l);}
,getVideoH264:function(){if(!qx.bom.client.Html.getVideo()){return E;}
;var v=document.createElement(L);return v.canPlayType(bp);}
,getVideoWebm:function(){if(!qx.bom.client.Html.getVideo()){return E;}
;var v=document.createElement(L);return v.canPlayType(y);}
,getLocalStorage:function(){try{return window.localStorage!=null;}
catch(bs){return false;}
;}
,getSessionStorage:function(){try{return window.sessionStorage!=null;}
catch(bt){return false;}
;}
,getUserDataStorage:function(){var bu=document.createElement(bc);bu.style[b]=X;document.getElementsByTagName(A)[0].appendChild(bu);var bv=false;try{bu.addBehavior(P);bu.load(bf);bv=true;}
catch(e){}
;document.getElementsByTagName(A)[0].removeChild(bu);return bv;}
,getClassList:function(){return !!(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)===t);}
,getXPath:function(){return !!document.evaluate;}
,getXul:function(){try{document.createElementNS(i,bd);return true;}
catch(e){return false;}
;}
,getSvg:function(){return document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature(bk,T)||document.implementation.hasFeature(g,r));}
,getVml:function(){var bw=document.createElement(bc);document.body.appendChild(bw);bw.innerHTML=N;bw.firstChild.style.behavior=bm;var bx=typeof bw.firstChild.adj==p;document.body.removeChild(bw);return bx;}
,getCanvas:function(){return !!window.CanvasRenderingContext2D;}
,getDataUrl:function(by){var bz=new Image();bz.onload=bz.onerror=function(){window.setTimeout(function(){by.call(null,(bz.width==1&&bz.height==1));}
,0);}
;bz.src=bo;}
,getDataset:function(){return !!document.documentElement.dataset;}
,getContains:function(){return (typeof document.documentElement.contains!==d);}
,getCompareDocumentPosition:function(){return (typeof document.documentElement.compareDocumentPosition===o);}
,getTextContent:function(){var bA=document.createElement(I);return (typeof bA.textContent!==d);}
,getConsole:function(){return typeof window.console!==d;}
,getNaturalDimensions:function(){var bB=document.createElement(bh);return typeof bB.naturalHeight===B&&typeof bB.naturalWidth===B;}
,getHistoryState:function(){return (typeof window.onpopstate!==d&&typeof window.history.replaceState!==d&&typeof window.history.pushState!==d);}
},defer:function(bC){qx.core.Environment.add(H,bC.getWebWorker);qx.core.Environment.add(ba,bC.getFileReader);qx.core.Environment.add(x,bC.getGeoLocation);qx.core.Environment.add(bn,bC.getAudio);qx.core.Environment.add(R,bC.getAudioOgg);qx.core.Environment.add(M,bC.getAudioMp3);qx.core.Environment.add(S,bC.getAudioWav);qx.core.Environment.add(G,bC.getAudioAu);qx.core.Environment.add(C,bC.getAudioAif);qx.core.Environment.add(w,bC.getVideo);qx.core.Environment.add(h,bC.getVideoOgg);qx.core.Environment.add(n,bC.getVideoH264);qx.core.Environment.add(W,bC.getVideoWebm);qx.core.Environment.add(f,bC.getLocalStorage);qx.core.Environment.add(u,bC.getSessionStorage);qx.core.Environment.add(Q,bC.getUserDataStorage);qx.core.Environment.add(bj,bC.getClassList);qx.core.Environment.add(bg,bC.getXPath);qx.core.Environment.add(j,bC.getXul);qx.core.Environment.add(K,bC.getCanvas);qx.core.Environment.add(bi,bC.getSvg);qx.core.Environment.add(O,bC.getVml);qx.core.Environment.add(U,bC.getDataset);qx.core.Environment.addAsync(z,bC.getDataUrl);qx.core.Environment.add(m,bC.getContains);qx.core.Environment.add(be,bC.getCompareDocumentPosition);qx.core.Environment.add(J,bC.getTextContent);qx.core.Environment.add(k,bC.getConsole);qx.core.Environment.add(q,bC.getNaturalDimensions);qx.core.Environment.add(s,bC.getHistoryState);}
});}
)();
(function(){var s="g",r='function',q="\\b|\\b",p="qx.bom.element.Class",o='SVGAnimatedString',n='object',m="$2",k='undefined',j='',h="(^|\\s)",c="(\\s|$)",g="\\b",f="",b=" ",a="html.classlist",e="default",d="native";qx.Bootstrap.define(p,{statics:{__fo:/\s+/g,__fp:/^\s+|\s+$/g,add:{"native":function(t,name){t.classList.add(name);return name;}
,"default":function(u,name){if(!this.has(u,name)){u.className+=(u.className?b:f)+name;}
;return name;}
}[qx.core.Environment.get(a)?d:e],addClasses:{"native":function(v,w){for(var i=0;i<w.length;i++){v.classList.add(w[i]);}
;return v.className;}
,"default":function(x,y){var z={};var B;var A=x.className;if(A){B=A.split(this.__fo);for(var i=0,l=B.length;i<l;i++){z[B[i]]=true;}
;for(var i=0,l=y.length;i<l;i++){if(!z[y[i]]){B.push(y[i]);}
;}
;}
else {B=y;}
;return x.className=B.join(b);}
}[qx.core.Environment.get(a)?d:e],get:function(C){var D=C.className;if(typeof D.split!==r){if(typeof D===n){if(qx.Bootstrap.getClass(D)==o){D=D.baseVal;}
else {{}
;D=j;}
;}
;if(typeof D===k){{}
;D=j;}
;}
;return D;}
,has:{"native":function(E,name){return E.classList.contains(name);}
,"default":function(F,name){var G=new RegExp(h+name+c);return G.test(F.className);}
}[qx.core.Environment.get(a)?d:e],remove:{"native":function(H,name){H.classList.remove(name);return name;}
,"default":function(I,name){var J=new RegExp(h+name+c);I.className=I.className.replace(J,m);return name;}
}[qx.core.Environment.get(a)?d:e],removeClasses:{"native":function(K,L){for(var i=0;i<L.length;i++){K.classList.remove(L[i]);}
;return K.className;}
,"default":function(M,N){var O=new RegExp(g+N.join(q)+g,s);return M.className=M.className.replace(O,f).replace(this.__fp,f).replace(this.__fo,b);}
}[qx.core.Environment.get(a)?d:e],replace:function(P,Q,R){this.remove(P,Q);return this.add(P,R);}
,toggle:{"native":function(S,name,T){if(T===undefined){S.classList.toggle(name);}
else {T?this.add(S,name):this.remove(S,name);}
;return name;}
,"default":function(U,name,V){if(V==null){V=!this.has(U,name);}
;V?this.add(U,name):this.remove(U,name);return name;}
}[qx.core.Environment.get(a)?d:e]}});}
)();
(function(){var l="qx.bom.element.Dimension",k="paddingRight",j="paddingLeft",i="opera",h="paddingBottom",g="paddingTop",f="overflowX",e="overflowY",d="mshtml",c="engine.version",a="0px",b="engine.name";qx.Bootstrap.define(l,{statics:{getWidth:qx.core.Environment.select(b,{"gecko":function(m){if(m.getBoundingClientRect){var n=m.getBoundingClientRect();return Math.round(n.right)-Math.round(n.left);}
else {return m.offsetWidth;}
;}
,"default":function(o){return o.offsetWidth;}
}),getHeight:qx.core.Environment.select(b,{"gecko":function(p){if(p.getBoundingClientRect){var q=p.getBoundingClientRect();return Math.round(q.bottom)-Math.round(q.top);}
else {return p.offsetHeight;}
;}
,"default":function(r){return r.offsetHeight;}
}),getSize:function(s){return {width:this.getWidth(s),height:this.getHeight(s)};}
,__ep:{visible:true,hidden:true},getContentWidth:function(t){var u=qx.bom.element.Style;var v=qx.bom.element.Style.get(t,f);var w=parseInt(u.get(t,j)||a,10);var z=parseInt(u.get(t,k)||a,10);if(this.__ep[v]){var y=t.clientWidth;if((qx.core.Environment.get(b)==i)||qx.dom.Node.isBlockNode(t)){y=y-w-z;}
;return y;}
else {if(t.clientWidth>=t.scrollWidth){return Math.max(t.clientWidth,t.scrollWidth)-w-z;}
else {var x=t.scrollWidth-w;if(qx.core.Environment.get(b)==d&&qx.core.Environment.get(c)>=6){x-=z;}
;return x;}
;}
;}
,getContentHeight:function(A){var B=qx.bom.element.Style;var E=qx.bom.element.Style.get(A,e);var D=parseInt(B.get(A,g)||a,10);var C=parseInt(B.get(A,h)||a,10);if(this.__ep[E]){return A.clientHeight-D-C;}
else {if(A.clientHeight>=A.scrollHeight){return Math.max(A.clientHeight,A.scrollHeight)-D-C;}
else {var F=A.scrollHeight-D;if(qx.core.Environment.get(b)==d&&qx.core.Environment.get(c)==6){F-=C;}
;return F;}
;}
;}
,getContentSize:function(G){return {width:this.getContentWidth(G),height:this.getContentHeight(G)};}
}});}
)();
(function(){var j="qx.bom.element.Location",i="paddingLeft",h="static",g="marginBottom",f="visible",e="overflowY",d="paddingBottom",c="paddingTop",b="gecko",a="marginRight",F="mshtml",E="position",D="margin",C="overflow",B="paddingRight",A="BODY",z="overflowX",y="border",x="browser.documentmode",w="borderBottomWidth",q="borderRightWidth",r="auto",o="padding",p="browser.quirksmode",m="engine.version",n="marginTop",k="marginLeft",l="border-box",s="scroll",t="engine.name",v="borderTopWidth",u="borderLeftWidth";qx.Bootstrap.define(j,{statics:{__fq:function(G,H){return qx.bom.element.Style.get(G,H,qx.bom.element.Style.COMPUTED_MODE,false);}
,__fr:function(I,J){return parseInt(qx.bom.element.Style.get(I,J,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;}
,__fs:function(K){var M=0,top=0;var L=qx.dom.Node.getWindow(K);M-=qx.bom.Viewport.getScrollLeft(L);top-=qx.bom.Viewport.getScrollTop(L);return {left:M,top:top};}
,__ft:qx.core.Environment.select(t,{"mshtml":function(N){var P=qx.dom.Node.getDocument(N);var O=P.body;var Q=0;var top=0;Q-=O.clientLeft+P.documentElement.clientLeft;top-=O.clientTop+P.documentElement.clientTop;if(!qx.core.Environment.get(p)){Q+=this.__fr(O,u);top+=this.__fr(O,v);}
;return {left:Q,top:top};}
,"webkit":function(R){var T=qx.dom.Node.getDocument(R);var S=T.body;var U=S.offsetLeft;var top=S.offsetTop;if(parseFloat(qx.core.Environment.get(m))<530.17){U+=this.__fr(S,u);top+=this.__fr(S,v);}
;return {left:U,top:top};}
,"gecko":function(V){var W=qx.dom.Node.getDocument(V).body;var X=W.offsetLeft;var top=W.offsetTop;if(parseFloat(qx.core.Environment.get(m))<1.9){X+=this.__fr(W,k);top+=this.__fr(W,n);}
;if(qx.bom.element.BoxSizing.get(W)!==l){X+=this.__fr(W,u);top+=this.__fr(W,v);}
;return {left:X,top:top};}
,"default":function(Y){var ba=qx.dom.Node.getDocument(Y).body;var bb=ba.offsetLeft;var top=ba.offsetTop;return {left:bb,top:top};}
}),__fu:qx.core.Environment.select(t,{"gecko":function(bc){if(bc.getBoundingClientRect){var bf=bc.getBoundingClientRect();var bg=Math.round(bf.left);var top=Math.round(bf.top);}
else {var bg=0;var top=0;var bd=qx.dom.Node.getDocument(bc).body;var be=qx.bom.element.BoxSizing;if(be.get(bc)!==l){bg-=this.__fr(bc,u);top-=this.__fr(bc,v);}
;while(bc&&bc!==bd){bg+=bc.offsetLeft;top+=bc.offsetTop;if(be.get(bc)!==l){bg+=this.__fr(bc,u);top+=this.__fr(bc,v);}
;if(bc.parentNode&&this.__fq(bc.parentNode,C)!=f){bg+=this.__fr(bc.parentNode,u);top+=this.__fr(bc.parentNode,v);}
;bc=bc.offsetParent;}
;}
;return {left:bg,top:top};}
,"default":function(bh){var bj=qx.dom.Node.getDocument(bh);if(bh.getBoundingClientRect){var bk=bh.getBoundingClientRect();var bl=Math.round(bk.left);var top=Math.round(bk.top);}
else {var bl=bh.offsetLeft;var top=bh.offsetTop;bh=bh.offsetParent;var bi=bj.body;while(bh&&bh!=bi){bl+=bh.offsetLeft;top+=bh.offsetTop;bl+=this.__fr(bh,u);top+=this.__fr(bh,v);bh=bh.offsetParent;}
;}
;return {left:bl,top:top};}
}),get:function(bm,bn){if(bm.tagName==A){var location=this.__fv(bm);var bu=location.left;var top=location.top;}
else {var bo=this.__ft(bm);var bt=this.__fu(bm);var scroll=this.__fs(bm);var bu=bt.left+bo.left-scroll.left;var top=bt.top+bo.top-scroll.top;}
;var bp=bu+bm.offsetWidth;var bq=top+bm.offsetHeight;if(bn){if(bn==o||bn==s){var br=qx.bom.element.Style.get(bm,z);if(br==s||br==r){bp+=bm.scrollWidth-bm.offsetWidth+this.__fr(bm,u)+this.__fr(bm,q);}
;var bs=qx.bom.element.Style.get(bm,e);if(bs==s||bs==r){bq+=bm.scrollHeight-bm.offsetHeight+this.__fr(bm,v)+this.__fr(bm,w);}
;}
;switch(bn){case o:bu+=this.__fr(bm,i);top+=this.__fr(bm,c);bp-=this.__fr(bm,B);bq-=this.__fr(bm,d);case s:bu-=bm.scrollLeft;top-=bm.scrollTop;bp-=bm.scrollLeft;bq-=bm.scrollTop;case y:bu+=this.__fr(bm,u);top+=this.__fr(bm,v);bp-=this.__fr(bm,q);bq-=this.__fr(bm,w);break;case D:bu-=this.__fr(bm,k);top-=this.__fr(bm,n);bp+=this.__fr(bm,a);bq+=this.__fr(bm,g);break;};}
;return {left:bu,top:top,right:bp,bottom:bq};}
,__fv:function(bv){var top=bv.offsetTop;var bw=bv.offsetLeft;if(qx.core.Environment.get(t)!==F||!((parseFloat(qx.core.Environment.get(m))<8||qx.core.Environment.get(x)<8)&&!qx.core.Environment.get(p))){top+=this.__fr(bv,n);bw+=this.__fr(bv,k);}
;if(qx.core.Environment.get(t)===b){top+=this.__fr(bv,u);bw+=this.__fr(bv,v);}
;return {left:bw,top:top};}
,getLeft:function(bx,by){return this.get(bx,by).left;}
,getTop:function(bz,bA){return this.get(bz,bA).top;}
,getRight:function(bB,bC){return this.get(bB,bC).right;}
,getBottom:function(bD,bE){return this.get(bD,bE).bottom;}
,getRelative:function(bF,bG,bH,bI){var bK=this.get(bF,bH);var bJ=this.get(bG,bI);return {left:bK.left-bJ.left,top:bK.top-bJ.top,right:bK.right-bJ.right,bottom:bK.bottom-bJ.bottom};}
,getPosition:function(bL){return this.getRelative(bL,this.getOffsetParent(bL));}
,getOffsetParent:function(bM){var bO=bM.offsetParent||document.body;var bN=qx.bom.element.Style;while(bO&&(!/^body|html$/i.test(bO.tagName)&&bN.get(bO,E)===h)){bO=bO.offsetParent;}
;return bO;}
}});}
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
,removeSheet:function(E){var F=E.ownerNode?E.ownerNode:E.owningElement;qx.dom.Element.removeChild(F,F.parentNode);}
,removeAllRules:function(G){if(qx.core.Environment.get(a)){var H=G.cssRules;var I=H.length;for(var i=I-1;i>=0;i--){G.deleteRule(i);}
;}
else {var H=G.rules;var I=H.length;for(var i=I-1;i>=0;i--){G.removeRule(i);}
;}
;}
,addImport:function(J,K){if(qx.core.Environment.get(o)){J.addImport(K);}
else {J.insertRule(k+K+h,J.cssRules.length);}
;}
,removeImport:function(L,M){if(qx.core.Environment.get(b)){var N=L.imports;var P=N.length;for(var i=P-1;i>=0;i--){if(N[i].href==M||N[i].href==qx.util.Uri.getAbsolute(M)){L.removeImport(i);}
;}
;}
else {var O=L.cssRules;var P=O.length;for(var i=P-1;i>=0;i--){if(O[i].href==M){L.deleteRule(i);}
;}
;}
;}
,removeAllImports:function(Q){if(qx.core.Environment.get(b)){var R=Q.imports;var T=R.length;for(var i=T-1;i>=0;i--){Q.removeImport(i);}
;}
else {var S=Q.cssRules;var T=S.length;for(var i=T-1;i>=0;i--){if(S[i].type==S[i].IMPORT_RULE){Q.deleteRule(i);}
;}
;}
;}
}});}
)();
(function(){var h="qx.bom.client.Stylesheet",g="html.stylesheet.deleterule",f="html.stylesheet.insertrule",e="html.stylesheet.createstylesheet",d="html.stylesheet.addimport",c="html.stylesheet.removeimport",b="function",a="object";qx.Bootstrap.define(h,{statics:{__ed:function(){if(!qx.bom.client.Stylesheet.__ee){qx.bom.client.Stylesheet.__ee=qx.bom.Stylesheet.createElement();}
;return qx.bom.client.Stylesheet.__ee;}
,getCreateStyleSheet:function(){return typeof document.createStyleSheet===a;}
,getInsertRule:function(){return typeof qx.bom.client.Stylesheet.__ed().insertRule===b;}
,getDeleteRule:function(){return typeof qx.bom.client.Stylesheet.__ed().deleteRule===b;}
,getAddImport:function(){return (typeof qx.bom.client.Stylesheet.__ed().addImport===a);}
,getRemoveImport:function(){return (typeof qx.bom.client.Stylesheet.__ed().removeImport===a);}
},defer:function(i){qx.core.Environment.add(e,i.getCreateStyleSheet);qx.core.Environment.add(f,i.getInsertRule);qx.core.Environment.add(g,i.getDeleteRule);qx.core.Environment.add(d,i.getAddImport);qx.core.Environment.add(c,i.getRemoveImport);}
});}
)();
(function(){var p="engine.name",o="='",n="none",m="<INPUT TYPE='RADIO' NAME='RADIOTEST' VALUE='Second Choice'>",k="qx.dom.Element",j="webkit",h="' ",g="div",f="></",d=" ",a=">",c="<",b="";qx.Bootstrap.define(k,{statics:{__ef:{"onload":true,"onpropertychange":true,"oninput":true,"onchange":true,"name":true,"type":true,"checked":true,"disabled":true},hasChild:function(parent,q){return q.parentNode===parent;}
,hasChildren:function(r){return !!r.firstChild;}
,hasChildElements:function(s){s=s.firstChild;while(s){if(s.nodeType===1){return true;}
;s=s.nextSibling;}
;return false;}
,getParentElement:function(t){return t.parentNode;}
,isInDom:function(u,v){if(!v){v=window;}
;var w=v.document.getElementsByTagName(u.nodeName);for(var i=0,l=w.length;i<l;i++){if(w[i]===u){return true;}
;}
;return false;}
,insertAt:function(x,parent,y){var z=parent.childNodes[y];if(z){parent.insertBefore(x,z);}
else {parent.appendChild(x);}
;return true;}
,insertBegin:function(A,parent){if(parent.firstChild){this.insertBefore(A,parent.firstChild);}
else {parent.appendChild(A);}
;return true;}
,insertEnd:function(B,parent){parent.appendChild(B);return true;}
,insertBefore:function(C,D){D.parentNode.insertBefore(C,D);return true;}
,insertAfter:function(E,F){var parent=F.parentNode;if(F==parent.lastChild){parent.appendChild(E);}
else {return this.insertBefore(E,F.nextSibling);}
;return true;}
,remove:function(G){if(!G.parentNode){return false;}
;G.parentNode.removeChild(G);return true;}
,removeChild:function(H,parent){if(H.parentNode!==parent){return false;}
;parent.removeChild(H);return true;}
,removeChildAt:function(I,parent){var J=parent.childNodes[I];if(!J){return false;}
;parent.removeChild(J);return true;}
,replaceChild:function(K,L){if(!L.parentNode){return false;}
;L.parentNode.replaceChild(K,L);return true;}
,replaceAt:function(M,N,parent){var O=parent.childNodes[N];if(!O){return false;}
;parent.replaceChild(M,O);return true;}
,__eg:{},__eh:{},_allowCreationWithMarkup:function(P){if(!P){P=window;}
;var Q=P.location.href;if(qx.dom.Element.__eh[Q]==undefined){try{P.document.createElement(m);qx.dom.Element.__eh[Q]=true;}
catch(e){qx.dom.Element.__eh[Q]=false;}
;}
;return qx.dom.Element.__eh[Q];}
,getHelperElement:function(R){if(!R){R=window;}
;var T=R.location.href;if(!qx.dom.Element.__eg[T]){var S=qx.dom.Element.__eg[T]=R.document.createElement(g);if(qx.core.Environment.get(p)==j){S.style.display=n;R.document.body.appendChild(S);}
;}
;return qx.dom.Element.__eg[T];}
,create:function(name,U,V){if(!V){V=window;}
;if(!name){throw new Error("The tag name is missing!");}
;var X=this.__ef;var W=b;for(var ba in U){if(X[ba]){W+=ba+o+U[ba]+h;}
;}
;var bb;if(W!=b){if(qx.dom.Element._allowCreationWithMarkup(V)){bb=V.document.createElement(c+name+d+W+a);}
else {var Y=qx.dom.Element.getHelperElement(V);Y.innerHTML=c+name+d+W+f+name+a;bb=Y.firstChild;}
;}
else {bb=V.document.createElement(name);}
;for(var ba in U){if(!X[ba]){qx.bom.element.Attribute.set(bb,ba,U[ba]);}
;}
;return bb;}
,empty:function(bc){return bc.innerHTML=b;}
}});}
)();
(function(){var j="readOnly",i="accessKey",h="qx.bom.element.Attribute",g="rowSpan",f="vAlign",e="className",d="textContent",c="'",b="htmlFor",a="longDesc",A="cellSpacing",z="frameBorder",y="='",x="useMap",w="innerText",v="innerHTML",u="tabIndex",t="dateTime",s="maxLength",r="html.element.textcontent",p="mshtml",q="cellPadding",n="browser.documentmode",o="colSpan",l="engine.name",m="undefined",k="";qx.Bootstrap.define(h,{statics:{__ei:{names:{"class":e,"for":b,html:v,text:qx.core.Environment.get(r)?d:w,colspan:o,rowspan:g,valign:f,datetime:t,accesskey:i,tabindex:u,maxlength:s,readonly:j,longdesc:a,cellpadding:q,cellspacing:A,frameborder:z,usemap:x},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,disabled:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:k,className:k,innerHTML:k,innerText:k,textContent:k,htmlFor:k,tabIndex:0,maxLength:qx.core.Environment.select(l,{"mshtml":2147483647,"webkit":524288,"default":-1})},removeableProperties:{disabled:1,multiple:1,maxLength:1},original:{href:1,src:1,type:1}},compile:function(B){var C=[];var E=this.__ei.runtime;for(var D in B){if(!E[D]){C.push(D,y,B[D],c);}
;}
;return C.join(k);}
,get:function(F,name){var H=this.__ei;var G;name=H.names[name]||name;if(qx.core.Environment.get(l)==p&&parseInt(qx.core.Environment.get(n),10)<8&&H.original[name]){G=F.getAttribute(name,2);}
else if(H.property[name]){G=F[name];if(typeof H.propertyDefault[name]!==m&&G==H.propertyDefault[name]){if(typeof H.bools[name]===m){return null;}
else {return G;}
;}
;}
else {G=F.getAttribute(name);}
;if(H.bools[name]){return !!G;}
;return G;}
,set:function(I,name,J){if(typeof J===m){return;}
;var K=this.__ei;name=K.names[name]||name;if(K.bools[name]){J=!!J;}
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
(function(){var m="start",l="",k="none",j="qx.module.Animation",h="animationIteration",g="animationStart",f="ease-in",e="iteration",d="ease-out",c="display",a="animationEnd",b="end";qx.Bootstrap.define(j,{events:{"animationStart":undefined,"animationIteration":undefined,"animationEnd":undefined},statics:{__fw:null,$init:function(){this.__fw=[];}
,getAnimationHandles:function(){return this.__fw;}
,_fadeOut:{duration:700,timing:d,keep:100,keyFrames:{'0':{opacity:1},'100':{opacity:0,display:k}}},_fadeIn:{duration:700,timing:f,keep:100,keyFrames:{'0':{opacity:0},'100':{opacity:1}}},animate:function(n,o){if(this.__fw.length>0){throw new Error("Only one animation at a time.");}
;for(var i=0;i<this.length;i++){var p=qx.bom.element.Animation.animate(this[i],n,o);var self=this;if(i==0){p.on(m,function(){self.emit(g);}
,p);p.on(e,function(){self.emit(h);}
,p);}
;p.on(b,function(){var q=self.__fw;q.splice(self.indexOf(p),1);if(q.length==0){self.emit(a);}
;}
,p);this.__fw.push(p);}
;return this;}
,animateReverse:function(r,s){if(this.__fw.length>0){throw new Error("Only one animation at a time.");}
;for(var i=0;i<this.length;i++){var t=qx.bom.element.Animation.animateReverse(this[i],r,s);var self=this;t.on(b,function(){var u=self.__fw;u.splice(self.indexOf(t),1);if(u.length==0){self.emit(a);}
;}
,t);this.__fw.push(t);}
;return this;}
,play:function(){for(var i=0;i<this.__fw.length;i++){this.__fw[i].play();}
;return this;}
,pause:function(){for(var i=0;i<this.__fw.length;i++){this.__fw[i].pause();}
;return this;}
,stop:function(){for(var i=0;i<this.__fw.length;i++){this.__fw[i].stop();}
;this.__fw=[];return this;}
,isPlaying:function(){for(var i=0;i<this.__fw.length;i++){if(this.__fw[i].isPlaying()){return true;}
;}
;return false;}
,isEnded:function(){for(var i=0;i<this.__fw.length;i++){if(!this.__fw[i].isEnded()){return false;}
;}
;return true;}
,fadeIn:function(v){this.setStyle(c,l);return this.animate(qx.module.Animation._fadeIn,v);}
,fadeOut:function(w){return this.animate(qx.module.Animation._fadeOut,w);}
},defer:function(x){qxWeb.$attach({"animate":x.animate,"animateReverse":x.animateReverse,"fadeIn":x.fadeIn,"fadeOut":x.fadeOut,"play":x.play,"pause":x.pause,"stop":x.stop,"isEnded":x.isEnded,"isPlaying":x.isPlaying,"getAnimationHandles":x.getAnimationHandles});qxWeb.$attachInit(x.$init);}
});}
)();
(function(){var f="translate",e="rotate",d="skew",c="scale",b="qx.bom.element.Animation",a="css.animation";qx.Bootstrap.define(b,{statics:{animate:function(g,h,j){var k=qx.bom.element.Animation.__fx(g,h.keyFrames);if(qx.core.Environment.get(a)&&k){return qx.bom.element.AnimationCss.animate(g,h,j);}
else {return qx.bom.element.AnimationJs.animate(g,h,j);}
;}
,animateReverse:function(l,m,n){var o=qx.bom.element.Animation.__fx(l,m.keyFrames);if(qx.core.Environment.get(a)&&o){return qx.bom.element.AnimationCss.animateReverse(l,m,n);}
else {return qx.bom.element.AnimationJs.animateReverse(l,m,n);}
;}
,__fx:function(p,q){var s=[];for(var v in q){var t=q[v];for(var u in t){if(s.indexOf(u)==-1){s.push(u);}
;}
;}
;var r=[c,e,d,f];for(var i=0;i<s.length;i++){var u=qx.lang.String.camelCase(s[i]);if(!(u in p.style)){if(r.indexOf(s[i])!=-1){continue;}
;return false;}
;}
;return true;}
}});}
)();
(function(){var l="oAnimationStart",k="MSAnimationStart",j="oRequestAnimationFrame",h="AnimationFillMode",g="MSAnimationEnd",f="requestAnimationFrame",d="mozRequestAnimationFrame",c="webkitAnimationEnd",b="css.animation.requestframe",a="AnimationPlayState",D="",C="MSAnimationIteration",B="animation",A="oAnimationEnd",z="@",y="webkitRequestAnimationFrame",x=" name",w="qx.bom.client.CssAnimation",v="css.animation",u="oAnimationIteration",s="webkitAnimationIteration",t="-keyframes",q="msRequestAnimationFrame",r="@keyframes",o="webkitAnimationStart",p="animationend",m="animationiteration",n="animationstart";qx.Bootstrap.define(w,{statics:{getSupport:function(){var name=qx.bom.client.CssAnimation.getName();if(name!=null){return {"name":name,"play-state":qx.bom.client.CssAnimation.getPlayState(),"start-event":qx.bom.client.CssAnimation.getAnimationStart(),"iteration-event":qx.bom.client.CssAnimation.getAnimationIteration(),"end-event":qx.bom.client.CssAnimation.getAnimationEnd(),"fill-mode":qx.bom.client.CssAnimation.getFillMode(),"keyframes":qx.bom.client.CssAnimation.getKeyFrames()};}
;return null;}
,getFillMode:function(){return qx.bom.Style.getPropertyName(h);}
,getPlayState:function(){return qx.bom.Style.getPropertyName(a);}
,getName:function(){return qx.bom.Style.getPropertyName(B);}
,getAnimationStart:function(){var E={"msAnimation":k,"WebkitAnimation":o,"MozAnimation":n,"OAnimation":l,"animation":n};return E[this.getName()];}
,getAnimationIteration:function(){var F={"msAnimation":C,"WebkitAnimation":s,"MozAnimation":m,"OAnimation":u,"animation":m};return F[this.getName()];}
,getAnimationEnd:function(){var G={"msAnimation":g,"WebkitAnimation":c,"MozAnimation":p,"OAnimation":A,"animation":p};return G[this.getName()];}
,getKeyFrames:function(){var H=qx.bom.Style.VENDOR_PREFIXES;var K=[];for(var i=0;i<H.length;i++){var J=z+qx.bom.Style.getCssName(H[i])+t;K.push(J);}
;K.unshift(r);var I=qx.bom.Stylesheet.createElement();for(var i=0;i<K.length;i++){try{qx.bom.Stylesheet.addRule(I,K[i]+x,D);return K[i];}
catch(e){}
;}
;return null;}
,getRequestAnimationFrame:function(){var L=[f,q,y,d,j];for(var i=0;i<L.length;i++){if(window[L[i]]!=undefined){return L[i];}
;}
;return null;}
},defer:function(M){qx.core.Environment.add(v,M.getSupport);qx.core.Environment.add(b,M.getRequestAnimationFrame);}
});}
)();
(function(){var k="repeat",j="timing",i="start",h="end",g="Anni",f="keep",d=":",c="} ",b="iteration-event",a="origin",A="forwards",z="start-event",y="iteration",x="end-event",w="css.animation",v="% {",u="linear",t=";",s="qx.bom.element.AnimationCss",r="keyframes",p="fill-mode",q="alternate",n="ms ",o="name",l=" ",m="";qx.Bootstrap.define(s,{statics:{__fy:null,__fz:g,__ch:0,__fA:{},__fB:{"scale":true,"rotate":true,"skew":true,"translate":true},__fC:qx.core.Environment.get(w),animateReverse:function(B,C,D){return this._animate(B,C,D,true);}
,animate:function(E,F,G){return this._animate(E,F,G,false);}
,_animate:function(H,I,J,K){this.__fH(I);{}
;var O=I.keep;if(O!=null&&(K||(I.alternate&&I.repeat%2==0))){O=100-O;}
;if(!this.__fy){this.__fy=qx.bom.Stylesheet.createElement();}
;var N=I.keyFrames;if(J==undefined){J=I.duration;}
;if(this.__fC!=null){var name=this.__fJ(N,K);var L=name+l+J+n+I.repeat+l+I.timing+l+(I.delay?I.delay+n:m)+(I.alternate?q:m);qx.bom.Event.addNativeListener(H,this.__fC[z],this.__fD);qx.bom.Event.addNativeListener(H,this.__fC[b],this.__fE);qx.bom.Event.addNativeListener(H,this.__fC[x],this.__fF);H.style[qx.lang.String.camelCase(this.__fC[o])]=L;if(O&&O==100&&this.__fC[p]){H.style[this.__fC[p]]=A;}
;}
;var M=new qx.bom.element.AnimationHandle();M.desc=I;M.el=H;M.keep=O;H.$$animation=M;if(I.origin!=null){qx.bom.element.Transform.setOrigin(H,I.origin);}
;if(this.__fC==null){window.setTimeout(function(){qx.bom.element.AnimationCss.__fF({target:H});}
,0);}
;return M;}
,__fD:function(e){e.target.$$animation.emit(i,e.target);}
,__fE:function(e){if(e.target!=null&&e.target.$$animation!=null){e.target.$$animation.emit(y,e.target);}
;}
,__fF:function(e){var P=e.target;var Q=P.$$animation;if(!Q){return;}
;var S=Q.desc;if(qx.bom.element.AnimationCss.__fC!=null){var R=qx.lang.String.camelCase(qx.bom.element.AnimationCss.__fC[o]);P.style[R]=m;qx.bom.Event.removeNativeListener(P,qx.bom.element.AnimationCss.__fC[o],qx.bom.element.AnimationCss.__fF);}
;if(S.origin!=null){qx.bom.element.Transform.setOrigin(P,m);}
;qx.bom.element.AnimationCss.__fG(P,S.keyFrames[Q.keep]);P.$$animation=null;Q.el=null;Q.ended=true;Q.emit(h,P);}
,__fG:function(T,U){var W;for(var V in U){if(V in qx.bom.element.AnimationCss.__fB){if(!W){W={};}
;W[V]=U[V];}
else {T.style[qx.lang.String.camelCase(V)]=U[V];}
;}
;if(W){qx.bom.element.Transform.transform(T,W);}
;}
,__fH:function(X){if(!X.hasOwnProperty(q)){X.alternate=false;}
;if(!X.hasOwnProperty(f)){X.keep=null;}
;if(!X.hasOwnProperty(k)){X.repeat=1;}
;if(!X.hasOwnProperty(j)){X.timing=u;}
;if(!X.hasOwnProperty(a)){X.origin=null;}
;}
,__fI:null,__fJ:function(frames,Y){var bc=m;for(var bf in frames){bc+=(Y?-(bf-100):bf)+v;var bb=frames[bf];var be;for(var ba in bb){if(ba in this.__fB){if(!be){be={};}
;be[ba]=bb[ba];}
else {bc+=ba+d+bb[ba]+t;}
;}
;if(be){bc+=qx.bom.element.Transform.getCss(be);}
;bc+=c;}
;if(this.__fA[bc]){return this.__fA[bc];}
;var name=this.__fz+this.__ch++;var bd=this.__fC[r]+l+name;qx.bom.Stylesheet.addRule(this.__fy,bd,bc);this.__fA[bc]=name;return name;}
}});}
)();
(function(){var g="qx.bom.element.AnimationHandle",f="play-state",e="running",d="",c="paused",b="css.animation",a="Element";qx.Bootstrap.define(g,{extend:qx.event.Emitter,construct:function(){var h=qx.core.Environment.get(b);this.__fK=h&&h[f];this.__fL=true;}
,events:{"start":a,"end":a,"iteration":a},members:{__fK:null,__fL:false,__fM:false,isPlaying:function(){return this.__fL;}
,isEnded:function(){return this.__fM;}
,isPaused:function(){return this.el.style[this.__fK]==c;}
,pause:function(){if(this.el){this.el.style[this.__fK]=c;this.el.$$animation.__fL=false;if(this.animationId&&qx.bom.element.AnimationJs){qx.bom.element.AnimationJs.pause(this);}
;}
;}
,play:function(){if(this.el){this.el.style[this.__fK]=e;this.el.$$animation.__fL=true;if(this.i!=undefined&&qx.bom.element.AnimationJs){qx.bom.element.AnimationJs.play(this);}
;}
;}
,stop:function(){if(this.el&&qx.core.Environment.get(b)&&!this.animationId){this.el.style[this.__fK]=d;this.el.style[qx.core.Environment.get(b).name]=d;this.el.$$animation.__fL=false;this.el.$$animation.__fM=true;}
;if(qx.bom.element.AnimationJs){qx.bom.element.AnimationJs.stop(this);}
;}
}});}
)();
(function(){var i="css.transform.3d",h="backfaceVisibility",g="transformStyle",f="css.transform",e="transformOrigin",d="qx.bom.client.CssTransform",c="transform",b="perspective",a="perspectiveOrigin";qx.Bootstrap.define(d,{statics:{getSupport:function(){var name=qx.bom.client.CssTransform.getName();if(name!=null){return {"name":name,"style":qx.bom.client.CssTransform.getStyle(),"origin":qx.bom.client.CssTransform.getOrigin(),"3d":qx.bom.client.CssTransform.get3D(),"perspective":qx.bom.client.CssTransform.getPerspective(),"perspective-origin":qx.bom.client.CssTransform.getPerspectiveOrigin(),"backface-visibility":qx.bom.client.CssTransform.getBackFaceVisibility()};}
;return null;}
,getStyle:function(){return qx.bom.Style.getPropertyName(g);}
,getPerspective:function(){return qx.bom.Style.getPropertyName(b);}
,getPerspectiveOrigin:function(){return qx.bom.Style.getPropertyName(a);}
,getBackFaceVisibility:function(){return qx.bom.Style.getPropertyName(h);}
,getOrigin:function(){return qx.bom.Style.getPropertyName(e);}
,getName:function(){return qx.bom.Style.getPropertyName(c);}
,get3D:function(){return qx.bom.client.CssTransform.getPerspective()!=null;}
},defer:function(j){qx.core.Environment.add(f,j.getSupport);qx.core.Environment.add(i,j.get3D);}
});}
)();
(function(){var u="px",t="css.transform",s=" ",r="qx.bom.element.Transform",q="hidden",p="Z",o=";",n=":",m="backface-visibility",l="name",d="perspective",k="visible",g=") ",c="(",b="X",f="Y",e="origin",h="style",a="perspective-origin",j="";qx.Bootstrap.define(r,{statics:{__fN:[b,f,p],__fO:qx.core.Environment.get(t),transform:function(v,w){var y=this.__fP(w);if(this.__fO!=null){var x=this.__fO[l];v.style[x]=y;}
;}
,translate:function(z,A){this.transform(z,{translate:A});}
,scale:function(B,C){this.transform(B,{scale:C});}
,rotate:function(D,E){this.transform(D,{rotate:E});}
,skew:function(F,G){this.transform(F,{skew:G});}
,getCss:function(H){var J=this.__fP(H);if(this.__fO!=null){var I=this.__fO[l];return qx.bom.Style.getCssName(I)+n+J+o;}
;return j;}
,setOrigin:function(K,L){if(this.__fO!=null){K.style[this.__fO[e]]=L;}
;}
,getOrigin:function(M){if(this.__fO!=null){return M.style[this.__fO[e]];}
;return j;}
,setStyle:function(N,O){if(this.__fO!=null){N.style[this.__fO[h]]=O;}
;}
,getStyle:function(P){if(this.__fO!=null){return P.style[this.__fO[h]];}
;return j;}
,setPerspective:function(Q,R){if(this.__fO!=null){Q.style[this.__fO[d]]=R+u;}
;}
,getPerspective:function(S){if(this.__fO!=null){return S.style[this.__fO[d]];}
;return j;}
,setPerspectiveOrigin:function(T,U){if(this.__fO!=null){T.style[this.__fO[a]]=U;}
;}
,getPerspectiveOrigin:function(V){if(this.__fO!=null){var X=V.style[this.__fO[a]];if(X!=j){return X;}
else {var Y=V.style[this.__fO[a]+b];var W=V.style[this.__fO[a]+f];if(Y!=j){return Y+s+W;}
;}
;}
;return j;}
,setBackfaceVisibility:function(ba,bb){if(this.__fO!=null){ba.style[this.__fO[m]]=bb?k:q;}
;}
,getBackfaceVisibility:function(bc){if(this.__fO!=null){return bc.style[this.__fO[m]]==k;}
;return true;}
,__fP:function(bd){var bg=j;for(var bf in bd){var be=bd[bf];if(qx.Bootstrap.isArray(be)){for(var i=0;i<be.length;i++){if(be[i]==undefined){continue;}
;bg+=bf+this.__fN[i]+c;bg+=be[i];bg+=g;}
;}
else {bg+=bf+c+bd[bf]+g;}
;}
;return bg;}
}});}
)();
(function(){var v="cm",u="mm",t="0",s="pt",r="pc",q="%",p="em",o="qx.bom.element.AnimationJs",n="infinite",m="#",e="in",l="px",h="start",d="end",c="ex",g="iteration",f="string",k="";qx.Bootstrap.define(o,{statics:{__fQ:30,__fR:[q,e,v,u,p,c,s,r,l],animate:function(w,x,y){return this._animate(w,x,y,false);}
,animateReverse:function(z,A,B){return this._animate(z,A,B,true);}
,_animate:function(C,D,E,F){if(C.$$animation){return C.$$animation;}
;D=qx.lang.Object.clone(D,true);if(E==undefined){E=D.duration;}
;var J=D.keyFrames;var H=this.__fX(J);var I=this.__fW(E,H);var L=parseInt(E/I,10);this.__fS(J,C);var M=this.__fT(L,I,H,J,E,D.timing);var G=new qx.bom.element.AnimationHandle();if(F){M.reverse();G.reverse=true;}
;G.desc=D;G.el=C;G.delta=M;G.stepTime=I;G.steps=L;C.$$animation=G;G.i=0;G.initValues={};G.repeatSteps=this.__fU(L,D.repeat);var K=D.delay||0;var self=this;window.setTimeout(function(){self.play(G);}
,K);return G;}
,__fS:function(N,O){var P={};for(var S in N){for(var name in N[S]){if(P[name]==undefined){var Q=N[S][name];if(typeof Q==f){P[name]=Q.substring((parseInt(Q,10)+k).length,Q.length);}
else {P[name]=k;}
;}
;}
;}
;for(var S in N){var R=N[S];for(var name in P){if(R[name]==undefined){if(name in O.style){if(window.getComputedStyle){R[name]=getComputedStyle(O,null)[name];}
else {R[name]=O.style[name];}
;}
else {R[name]=O[name];}
;if(R[name]===k&&this.__fR.indexOf(P[name])!=-1){R[name]=t+P[name];}
;}
;}
;}
;}
,__fT:function(T,U,V,W,X,Y){var bh=new Array(T);var bj=1;bh[0]=W[0];var bb=W[0];var bd=W[V[bj]];for(var i=1;i<bh.length;i++){if(i*U/X*100>V[bj]){bb=bd;bj++;bd=W[V[bj]];}
;bh[i]={};for(var name in bd){var bi=bd[name]+k;if(bi.charAt(0)==m){var bc=qx.util.ColorUtil.cssStringToRgb(bb[name]);var bg=qx.util.ColorUtil.cssStringToRgb(bi);var ba=[];for(var j=0;j<bc.length;j++){var be=bc[j]-bg[j];ba[j]=parseInt(bc[j]-be*qx.bom.AnimationFrame.calculateTiming(Y,i/T),10);}
;bh[i][name]=qx.util.ColorUtil.rgbToHexString(ba);}
else if(!isNaN(parseInt(bi,10))){var bf=bi.substring((parseInt(bi,10)+k).length,bi.length);var be=parseFloat(bi)-parseFloat(bb[name]);bh[i][name]=(parseFloat(bb[name])+be*qx.bom.AnimationFrame.calculateTiming(Y,i/T))+bf;}
else {bh[i][name]=bb[name]+k;}
;}
;}
;bh[bh.length-1]=W[100];return bh;}
,play:function(bk){bk.emit(h,bk.el);var bl=window.setInterval(function(){bk.repeatSteps--;var bm=bk.delta[bk.i%bk.steps];if(bk.i===0){for(var name in bm){if(bk.initValues[name]===undefined){if(bk.el[name]!==undefined){bk.initValues[name]=bk.el[name];}
else if(qx.bom.element.Style){bk.initValues[name]=qx.bom.element.Style.get(bk.el,qx.lang.String.camelCase(name));}
else {bk.initValues[name]=bk.el.style[qx.lang.String.camelCase(name)];}
;}
;}
;}
;qx.bom.element.AnimationJs.__fV(bk.el,bm);bk.i++;if(bk.i%bk.steps==0){bk.emit(g,bk.el);if(bk.desc.alternate){bk.delta.reverse();}
;}
;if(bk.repeatSteps<0){qx.bom.element.AnimationJs.stop(bk);}
;}
,bk.stepTime);bk.animationId=bl;return bk;}
,pause:function(bn){window.clearInterval(bn.animationId);bn.animationId=null;return bn;}
,stop:function(bo){var bs=bo.desc;var bp=bo.el;var bq=bo.initValues;if(bo.animationId){window.clearInterval(bo.animationId);}
;if(bp==undefined){return bo;}
;var br=bs.keep;if(br!=undefined){if(bo.reverse||(bs.alternate&&bs.repeat&&bs.repeat%2==0)){br=100-br;}
;this.__fV(bp,bs.keyFrames[br]);}
else {this.__fV(bp,bq);}
;bp.$$animation=null;bo.el=null;bo.ended=true;bo.animationId=null;bo.emit(d,bp);return bo;}
,__fU:function(bt,bu){if(bu==undefined){return bt;}
;if(bu==n){return Number.MAX_VALUE;}
;return bt*bu;}
,__fV:function(bv,bw){for(var bx in bw){if(bw[bx]===undefined){continue;}
;if(bx in bv){bv[bx]=bw[bx];continue;}
;var name=qx.lang.String.camelCase(bx);if(qx.bom.element.Style){qx.bom.element.Style.set(bv,name,bw[bx]);}
else {bv.style[name]=bw[bx];}
;}
;}
,__fW:function(by,bz){var bB=100;for(var i=0;i<bz.length-1;i++){bB=Math.min(bB,bz[i+1]-bz[i]);}
;var bA=by*bB/100;while(bA>this.__fQ){bA=bA/2;}
;return Math.round(bA);}
,__fX:function(bC){var bD=Object.keys(bC);for(var i=0;i<bD.length;i++){bD[i]=parseInt(bD[i],10);}
;bD.sort(function(a,b){return a-b;}
);return bD;}
}});}
)();
(function(){var j="qx.util.ColorUtil",h=")",e="#",d="qx.theme.manager.Color",c="rgb(",a=",";qx.Bootstrap.define(j,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(k){return this.NAMED[k]!==undefined;}
,isSystemColor:function(l){return this.SYSTEM[l]!==undefined;}
,supportsThemes:function(){if(qx.Class){return qx.Class.isDefined(d);}
;return false;}
,isThemedColor:function(m){if(!this.supportsThemes()){return false;}
;if(qx.theme&&qx.theme.manager&&qx.theme.manager.Color){return qx.theme.manager.Color.getInstance().isDynamic(m);}
;return false;}
,stringToRgb:function(n){if(this.supportsThemes()&&this.isThemedColor(n)){var n=qx.theme.manager.Color.getInstance().resolveDynamic(n);}
;if(this.isNamedColor(n)){return this.NAMED[n];}
else if(this.isSystemColor(n)){throw new Error("Could not convert system colors to RGB: "+n);}
else if(this.isRgbString(n)){return this.__dh();}
else if(this.isHex3String(n)){return this.__dj();}
else if(this.isHex6String(n)){return this.__dk();}
;throw new Error("Could not parse color: "+n);}
,cssStringToRgb:function(o){if(this.isNamedColor(o)){return this.NAMED[o];}
else if(this.isSystemColor(o)){throw new Error("Could not convert system colors to RGB: "+o);}
else if(this.isRgbString(o)){return this.__dh();}
else if(this.isRgbaString(o)){return this.__di();}
else if(this.isHex3String(o)){return this.__dj();}
else if(this.isHex6String(o)){return this.__dk();}
;throw new Error("Could not parse color: "+o);}
,stringToRgbString:function(s){return this.rgbToRgbString(this.stringToRgb(s));}
,rgbToRgbString:function(u){return c+u[0]+a+u[1]+a+u[2]+h;}
,rgbToHexString:function(v){return (e+qx.lang.String.pad(v[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(v[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(v[2].toString(16).toUpperCase(),2));}
,isValidPropertyValue:function(w){return (this.isThemedColor(w)||this.isNamedColor(w)||this.isHex3String(w)||this.isHex6String(w)||this.isRgbString(w)||this.isRgbaString(w));}
,isCssString:function(x){return (this.isSystemColor(x)||this.isNamedColor(x)||this.isHex3String(x)||this.isHex6String(x)||this.isRgbString(x)||this.isRgbaString(x));}
,isHex3String:function(y){return this.REGEXP.hex3.test(y);}
,isHex6String:function(z){return this.REGEXP.hex6.test(z);}
,isRgbString:function(A){return this.REGEXP.rgb.test(A);}
,isRgbaString:function(B){return this.REGEXP.rgba.test(B);}
,__dh:function(){var E=parseInt(RegExp.$1,10);var D=parseInt(RegExp.$2,10);var C=parseInt(RegExp.$3,10);return [E,D,C];}
,__di:function(){var H=parseInt(RegExp.$1,10);var G=parseInt(RegExp.$2,10);var F=parseInt(RegExp.$3,10);return [H,G,F];}
,__dj:function(){var K=parseInt(RegExp.$1,16)*17;var J=parseInt(RegExp.$2,16)*17;var I=parseInt(RegExp.$3,16)*17;return [K,J,I];}
,__dk:function(){var N=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);var M=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);var L=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);return [N,M,L];}
,hex3StringToRgb:function(O){if(this.isHex3String(O)){return this.__dj(O);}
;throw new Error("Invalid hex3 value: "+O);}
,hex3StringToHex6String:function(P){if(this.isHex3String(P)){return this.rgbToHexString(this.hex3StringToRgb(P));}
;return P;}
,hex6StringToRgb:function(Q){if(this.isHex6String(Q)){return this.__dk(Q);}
;throw new Error("Invalid hex6 value: "+Q);}
,hexStringToRgb:function(R){if(this.isHex3String(R)){return this.__dj(R);}
;if(this.isHex6String(R)){return this.__dk(R);}
;throw new Error("Invalid hex value: "+R);}
,rgbToHsb:function(S){var U,V,X;var be=S[0];var bb=S[1];var T=S[2];var bd=(be>bb)?be:bb;if(T>bd){bd=T;}
;var W=(be<bb)?be:bb;if(T<W){W=T;}
;X=bd/255.0;if(bd!=0){V=(bd-W)/bd;}
else {V=0;}
;if(V==0){U=0;}
else {var ba=(bd-be)/(bd-W);var bc=(bd-bb)/(bd-W);var Y=(bd-T)/(bd-W);if(be==bd){U=Y-bc;}
else if(bb==bd){U=2.0+ba-Y;}
else {U=4.0+bc-ba;}
;U=U/6.0;if(U<0){U=U+1.0;}
;}
;return [Math.round(U*360),Math.round(V*100),Math.round(X*100)];}
,hsbToRgb:function(bf){var i,f,p,q,t;var bg=bf[0]/360;var bh=bf[1]/100;var bi=bf[2]/100;if(bg>=1.0){bg%=1.0;}
;if(bh>1.0){bh=1.0;}
;if(bi>1.0){bi=1.0;}
;var bj=Math.floor(255*bi);var bk={};if(bh==0.0){bk.red=bk.green=bk.blue=bj;}
else {bg*=6.0;i=Math.floor(bg);f=bg-i;p=Math.floor(bj*(1.0-bh));q=Math.floor(bj*(1.0-(bh*f)));t=Math.floor(bj*(1.0-(bh*(1.0-f))));switch(i){case 0:bk.red=bj;bk.green=t;bk.blue=p;break;case 1:bk.red=q;bk.green=bj;bk.blue=p;break;case 2:bk.red=p;bk.green=bj;bk.blue=t;break;case 3:bk.red=p;bk.green=q;bk.blue=bj;break;case 4:bk.red=t;bk.green=p;bk.blue=bj;break;case 5:bk.red=bj;bk.green=p;bk.blue=q;break;};}
;return [bk.red,bk.green,bk.blue];}
,randomColor:function(){var r=Math.round(Math.random()*255);var g=Math.round(Math.random()*255);var b=Math.round(Math.random()*255);return this.rgbToRgbString([r,g,b]);}
}});}
)();
(function(){var k="ease-in-out",j="Number",h="css.animation.requestframe",g="qx.bom.AnimationFrame",f="frame",e="end",d="linear",c="ease-in",b="ease-out";qx.Bootstrap.define(g,{extend:qx.event.Emitter,events:{"end":undefined,"frame":j},members:{__fY:false,startSequence:function(l){this.__fY=false;var m=+(new Date());var n=function(){if(this.__fY){this.id=null;return;}
;var p=+(new Date());if(p>=m+l){this.emit(e);this.id=null;}
else {var o=p-m;this.emit(f,o);this.id=qx.bom.AnimationFrame.request(n,this);}
;}
;this.id=qx.bom.AnimationFrame.request(n,this);}
,cancelSequence:function(){this.__fY=true;}
},statics:{TIMEOUT:30,calculateTiming:function(q,x){if(q==c){var a=[3.1223e-7,0.0757,1.2646,-0.167,-0.4387,0.2654];}
else if(q==b){var a=[-7.0198e-8,1.652,-0.551,-0.0458,0.1255,-0.1807];}
else if(q==d){return x;}
else if(q==k){var a=[2.482e-7,-0.2289,3.3466,-1.0857,-1.7354,0.7034];}
else {var a=[-0.0021,0.2472,9.8054,-21.6869,17.7611,-5.1226];}
;var y=0;for(var i=0;i<a.length;i++){y+=a[i]*Math.pow(x,i);}
;return y;}
,request:function(r,s){var t=qx.core.Environment.get(h);var u=function(){var v=+(new Date());r.call(s,v);}
;if(t){return window[t](u);}
else {return window.setTimeout(u,qx.bom.AnimationFrame.TIMEOUT);}
;}
}});}
)();
(function(){var a="qx.util.DeferredCall";qx.Class.define(a,{extend:qx.core.Object,construct:function(b,c){qx.core.Object.call(this);this.__cA=b;this.__cC=c||null;this.__ga=qx.util.DeferredCallManager.getInstance();}
,members:{__cA:null,__cC:null,__ga:null,cancel:function(){this.__ga.cancel(this);}
,schedule:function(){this.__ga.schedule(this);}
,call:function(){var d;{}
;this.__cC?this.__cA.apply(this.__cC):this.__cA();}
},destruct:function(){this.cancel();this.__cC=this.__cA=this.__ga=null;}
});}
)();
(function(){var m="text",k="qx.html.Element",j="|capture|",h="activate",g="blur",f="deactivate",d="css.userselect",c="animationEnd",b="capture",a="visible",G="releaseCapture",F="|bubble|",E="qxSelectable",D="tabIndex",C="off",B="qx.html.Iframe",A="focus",z="none",w="css.userselect.none",v="hidden",t="__gw",u="on",r="div",s="",p="mshtml",q="engine.name",n="scroll",o="element";qx.Class.define(k,{extend:qx.core.Object,construct:function(H,I,J){qx.core.Object.call(this);this.__gb=H||r;this.__gc=I||null;this.__gd=J||null;}
,statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__ge:{},__gf:null,__gg:null,_scheduleFlush:function(K){qx.html.Element.__gH.schedule();}
,flush:function(){var V;{}
;var N=this.__gh();var M=N.getFocus();if(M&&this.__gj(M)){N.blur(M);}
;var bd=N.getActive();if(bd&&this.__gj(bd)){qx.bom.Element.deactivate(bd);}
;var Q=this.__gi();if(Q&&this.__gj(Q)){qx.bom.Element.releaseCapture(Q);}
;var W=[];var X=this._modified;for(var U in X){V=X[U];if(V.__gA()||V.classname==B){if(V.__gk&&qx.dom.Hierarchy.isRendered(V.__gk)){W.push(V);}
else {{}
;V.__gz();}
;delete X[U];}
;}
;for(var i=0,l=W.length;i<l;i++){V=W[i];{}
;V.__gz();}
;var S=this._visibility;for(var U in S){V=S[U];var Y=V.__gk;if(!Y){delete S[U];continue;}
;{}
;if(!V.$$disposed){Y.style.display=V.__gm?s:z;if((qx.core.Environment.get(q)==p)){if(!(document.documentMode>=8)){Y.style.visibility=V.__gm?a:v;}
;}
;}
;delete S[U];}
;var scroll=this._scroll;for(var U in scroll){V=scroll[U];var be=V.__gk;if(be&&be.offsetWidth){var P=true;if(V.__gp!=null){V.__gk.scrollLeft=V.__gp;delete V.__gp;}
;if(V.__gq!=null){V.__gk.scrollTop=V.__gq;delete V.__gq;}
;var ba=V.__gn;if(ba!=null){var T=ba.element.getDomElement();if(T&&T.offsetWidth){qx.bom.element.Scroll.intoViewX(T,be,ba.align);delete V.__gn;}
else {P=false;}
;}
;var bb=V.__go;if(bb!=null){var T=bb.element.getDomElement();if(T&&T.offsetWidth){qx.bom.element.Scroll.intoViewY(T,be,bb.align);delete V.__go;}
else {P=false;}
;}
;if(P){delete scroll[U];}
;}
;}
;var O={"releaseCapture":1,"blur":1,"deactivate":1};for(var i=0;i<this._actions.length;i++){var bc=this._actions[i];var Y=bc.element.__gk;if(!Y||!O[bc.type]&&!bc.element.__gA()){continue;}
;var R=bc.args;R.unshift(Y);qx.bom.Element[bc.type].apply(qx.bom.Element,R);}
;this._actions=[];for(var U in this.__ge){var L=this.__ge[U];var be=L.element.__gk;if(be){qx.bom.Selection.set(be,L.start,L.end);delete this.__ge[U];}
;}
;qx.event.handler.Appear.refresh();}
,__gh:function(){if(!this.__gf){var bf=qx.event.Registration.getManager(window);this.__gf=bf.getHandler(qx.event.handler.Focus);}
;return this.__gf;}
,__gi:function(){if(!this.__gg){var bg=qx.event.Registration.getManager(window);this.__gg=bg.getDispatcher(qx.event.dispatch.MouseCapture);}
;return this.__gg.getCaptureElement();}
,__gj:function(bh){var bi=qx.core.ObjectRegistry.fromHashCode(bh.$$element);return bi&&!bi.__gA();}
},members:{__gb:null,__gk:null,__df:false,__gl:true,__gm:true,__gn:null,__go:null,__gp:null,__gq:null,__gr:null,__gs:null,__gt:null,__gc:null,__gd:null,__gu:null,__gv:null,__gw:null,__gx:null,__gy:null,_scheduleChildrenUpdate:function(){if(this.__gx){return;}
;this.__gx=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(o);}
,_createDomElement:function(){return qx.dom.Element.create(this.__gb);}
,__gz:function(){{}
;var length;var bj=this.__gw;if(bj){length=bj.length;var bk;for(var i=0;i<length;i++){bk=bj[i];if(bk.__gm&&bk.__gl&&!bk.__gk){bk.__gz();}
;}
;}
;if(!this.__gk){this.__gk=this._createDomElement();this.__gk.$$element=this.$$hash;this._copyData(false);if(bj&&length>0){this._insertChildren();}
;}
else {this._syncData();if(this.__gx){this._syncChildren();}
;}
;delete this.__gx;}
,_insertChildren:function(){var bl=this.__gw;var length=bl.length;var bn;if(length>2){var bm=document.createDocumentFragment();for(var i=0;i<length;i++){bn=bl[i];if(bn.__gk&&bn.__gl){bm.appendChild(bn.__gk);}
;}
;this.__gk.appendChild(bm);}
else {var bm=this.__gk;for(var i=0;i<length;i++){bn=bl[i];if(bn.__gk&&bn.__gl){bm.appendChild(bn.__gk);}
;}
;}
;}
,_syncChildren:function(){var bs;var bx=qx.core.ObjectRegistry;var bo=this.__gw;var bv=bo.length;var bp;var bt;var br=this.__gk;var bu=br.childNodes;var bq=0;var bw;{}
;for(var i=bu.length-1;i>=0;i--){bw=bu[i];bt=bx.fromHashCode(bw.$$element);if(!bt||!bt.__gl||bt.__gy!==this){br.removeChild(bw);{}
;}
;}
;for(var i=0;i<bv;i++){bp=bo[i];if(bp.__gl){bt=bp.__gk;bw=bu[bq];if(!bt){continue;}
;if(bt!=bw){if(bw){br.insertBefore(bt,bw);}
else {br.appendChild(bt);}
;{}
;}
;bq++;}
;}
;{}
;}
,_copyData:function(by){var bC=this.__gk;var bB=this.__gd;if(bB){var bz=qx.bom.element.Attribute;for(var bD in bB){bz.set(bC,bD,bB[bD]);}
;}
;var bB=this.__gc;if(bB){var bA=qx.bom.element.Style;if(by){bA.setStyles(bC,bB);}
else {bA.setCss(bC,bA.compile(bB));}
;}
;var bB=this.__gu;if(bB){for(var bD in bB){this._applyProperty(bD,bB[bD]);}
;}
;var bB=this.__gv;if(bB){qx.event.Registration.getManager(bC).importListeners(bC,bB);delete this.__gv;}
;}
,_syncData:function(){var bI=this.__gk;var bH=qx.bom.element.Attribute;var bF=qx.bom.element.Style;var bG=this.__gs;if(bG){var bL=this.__gd;if(bL){var bJ;for(var bK in bG){bJ=bL[bK];if(bJ!==undefined){bH.set(bI,bK,bJ);}
else {bH.reset(bI,bK);}
;}
;}
;this.__gs=null;}
;var bG=this.__gr;if(bG){var bL=this.__gc;if(bL){var bE={};for(var bK in bG){bE[bK]=bL[bK];}
;bF.setStyles(bI,bE);}
;this.__gr=null;}
;var bG=this.__gt;if(bG){var bL=this.__gu;if(bL){var bJ;for(var bK in bG){this._applyProperty(bK,bL[bK]);}
;}
;this.__gt=null;}
;}
,__gA:function(){var bM=this;while(bM){if(bM.__df){return true;}
;if(!bM.__gl||!bM.__gm){return false;}
;bM=bM.__gy;}
;return false;}
,__gB:function(bN){if(bN.__gy===this){throw new Error("Child is already in: "+bN);}
;if(bN.__df){throw new Error("Root elements could not be inserted into other ones.");}
;if(bN.__gy){bN.__gy.remove(bN);}
;bN.__gy=this;if(!this.__gw){this.__gw=[];}
;if(this.__gk){this._scheduleChildrenUpdate();}
;}
,__gC:function(bO){if(bO.__gy!==this){throw new Error("Has no child: "+bO);}
;if(this.__gk){this._scheduleChildrenUpdate();}
;delete bO.__gy;}
,__gD:function(bP){if(bP.__gy!==this){throw new Error("Has no child: "+bP);}
;if(this.__gk){this._scheduleChildrenUpdate();}
;}
,getChildren:function(){return this.__gw||null;}
,getChild:function(bQ){var bR=this.__gw;return bR&&bR[bQ]||null;}
,hasChildren:function(){var bS=this.__gw;return bS&&bS[0]!==undefined;}
,indexOf:function(bT){var bU=this.__gw;return bU?bU.indexOf(bT):-1;}
,hasChild:function(bV){var bW=this.__gw;return bW&&bW.indexOf(bV)!==-1;}
,add:function(bX){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++){this.__gB(arguments[i]);}
;this.__gw.push.apply(this.__gw,arguments);}
else {this.__gB(bX);this.__gw.push(bX);}
;return this;}
,addAt:function(bY,ca){this.__gB(bY);qx.lang.Array.insertAt(this.__gw,bY,ca);return this;}
,remove:function(cb){var cc=this.__gw;if(!cc){return this;}
;if(arguments[1]){var cd;for(var i=0,l=arguments.length;i<l;i++){cd=arguments[i];this.__gC(cd);qx.lang.Array.remove(cc,cd);}
;}
else {this.__gC(cb);qx.lang.Array.remove(cc,cb);}
;return this;}
,removeAt:function(ce){var cf=this.__gw;if(!cf){throw new Error("Has no children!");}
;var cg=cf[ce];if(!cg){throw new Error("Has no child at this position!");}
;this.__gC(cg);qx.lang.Array.removeAt(this.__gw,ce);return this;}
,removeAll:function(){var ch=this.__gw;if(ch){for(var i=0,l=ch.length;i<l;i++){this.__gC(ch[i]);}
;ch.length=0;}
;return this;}
,getParent:function(){return this.__gy||null;}
,insertInto:function(parent,ci){parent.__gB(this);if(ci==null){parent.__gw.push(this);}
else {qx.lang.Array.insertAt(this.__gw,this,ci);}
;return this;}
,insertBefore:function(cj){var parent=cj.__gy;parent.__gB(this);qx.lang.Array.insertBefore(parent.__gw,this,cj);return this;}
,insertAfter:function(ck){var parent=ck.__gy;parent.__gB(this);qx.lang.Array.insertAfter(parent.__gw,this,ck);return this;}
,moveTo:function(cl){var parent=this.__gy;parent.__gD(this);var cm=parent.__gw.indexOf(this);if(cm===cl){throw new Error("Could not move to same index!");}
else if(cm<cl){cl--;}
;qx.lang.Array.removeAt(parent.__gw,cm);qx.lang.Array.insertAt(parent.__gw,this,cl);return this;}
,moveBefore:function(cn){var parent=this.__gy;return this.moveTo(parent.__gw.indexOf(cn));}
,moveAfter:function(co){var parent=this.__gy;return this.moveTo(parent.__gw.indexOf(co)+1);}
,free:function(){var parent=this.__gy;if(!parent){throw new Error("Has no parent to remove from.");}
;if(!parent.__gw){return this;}
;parent.__gC(this);qx.lang.Array.remove(parent.__gw,this);return this;}
,getDomElement:function(){return this.__gk||null;}
,getNodeName:function(){return this.__gb;}
,setNodeName:function(name){this.__gb=name;}
,setRoot:function(cp){this.__df=cp;}
,useMarkup:function(cq){if(this.__gk){throw new Error("Could not overwrite existing element!");}
;if((qx.core.Environment.get(q)==p)){var cr=document.createElement(r);}
else {var cr=qx.dom.Element.getHelperElement();}
;cr.innerHTML=cq;this.useElement(cr.firstChild);return this.__gk;}
,useElement:function(cs){if(this.__gk){throw new Error("Could not overwrite existing element!");}
;this.__gk=cs;this.__gk.$$element=this.$$hash;this._copyData(true);}
,isFocusable:function(){var cu=this.getAttribute(D);if(cu>=1){return true;}
;var ct=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;if(cu>=0&&ct[this.__gb]){return true;}
;return false;}
,setSelectable:function(cv){this.setAttribute(E,cv?u:C);var cw=qx.core.Environment.get(d);if(cw){this.setStyle(cw,cv?m:qx.core.Environment.get(w));}
;}
,isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__gb];}
,include:function(){if(this.__gl){return this;}
;delete this.__gl;if(this.__gy){this.__gy._scheduleChildrenUpdate();}
;return this;}
,exclude:function(){if(!this.__gl){return this;}
;this.__gl=false;if(this.__gy){this.__gy._scheduleChildrenUpdate();}
;return this;}
,isIncluded:function(){return this.__gl===true;}
,fadeIn:function(cx){var cy=qxWeb(this.__gk);if(cy.isPlaying()){cy.stop();}
;if(!this.__gk){this.__gz();cy[0]=this.__gk;}
;if(this.__gk){cy.fadeIn(cx);return cy.getAnimationHandles()[0];}
;}
,fadeOut:function(cz){var cA=qxWeb(this.__gk);if(cA.isPlaying()){cA.stop();}
;if(this.__gk){cA.fadeOut(cz).once(c,function(){this.hide();qx.html.Element.flush();}
,this);return cA.getAnimationHandles()[0];}
;}
,show:function(){if(this.__gm){return this;}
;if(this.__gk){qx.html.Element._visibility[this.$$hash]=this;qx.html.Element._scheduleFlush(o);}
;if(this.__gy){this.__gy._scheduleChildrenUpdate();}
;delete this.__gm;}
,hide:function(){if(!this.__gm){return this;}
;if(this.__gk){qx.html.Element._visibility[this.$$hash]=this;qx.html.Element._scheduleFlush(o);}
;this.__gm=false;}
,isVisible:function(){return this.__gm===true;}
,scrollChildIntoViewX:function(cB,cC,cD){var cE=this.__gk;var cF=cB.getDomElement();if(cD!==false&&cE&&cE.offsetWidth&&cF&&cF.offsetWidth){qx.bom.element.Scroll.intoViewX(cF,cE,cC);}
else {this.__gn={element:cB,align:cC};qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(o);}
;delete this.__gp;}
,scrollChildIntoViewY:function(cG,cH,cI){var cJ=this.__gk;var cK=cG.getDomElement();if(cI!==false&&cJ&&cJ.offsetWidth&&cK&&cK.offsetWidth){qx.bom.element.Scroll.intoViewY(cK,cJ,cH);}
else {this.__go={element:cG,align:cH};qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(o);}
;delete this.__gq;}
,scrollToX:function(x,cL){var cM=this.__gk;if(cL!==true&&cM&&cM.offsetWidth){cM.scrollLeft=x;delete this.__gp;}
else {this.__gp=x;qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(o);}
;delete this.__gn;}
,getScrollX:function(){var cN=this.__gk;if(cN){return cN.scrollLeft;}
;return this.__gp||0;}
,scrollToY:function(y,cO){var cP=this.__gk;if(cO!==true&&cP&&cP.offsetWidth){cP.scrollTop=y;delete this.__gq;}
else {this.__gq=y;qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(o);}
;delete this.__go;}
,getScrollY:function(){var cQ=this.__gk;if(cQ){return cQ.scrollTop;}
;return this.__gq||0;}
,disableScrolling:function(){this.enableScrolling();this.scrollToX(0);this.scrollToY(0);this.addListener(n,this.__gF,this);}
,enableScrolling:function(){this.removeListener(n,this.__gF,this);}
,__gE:null,__gF:function(e){if(!this.__gE){this.__gE=true;this.__gk.scrollTop=0;this.__gk.scrollLeft=0;delete this.__gE;}
;}
,getTextSelection:function(){var cR=this.__gk;if(cR){return qx.bom.Selection.get(cR);}
;return null;}
,getTextSelectionLength:function(){var cS=this.__gk;if(cS){return qx.bom.Selection.getLength(cS);}
;return null;}
,getTextSelectionStart:function(){var cT=this.__gk;if(cT){return qx.bom.Selection.getStart(cT);}
;return null;}
,getTextSelectionEnd:function(){var cU=this.__gk;if(cU){return qx.bom.Selection.getEnd(cU);}
;return null;}
,setTextSelection:function(cV,cW){var cX=this.__gk;if(cX){qx.bom.Selection.set(cX,cV,cW);return;}
;qx.html.Element.__ge[this.toHashCode()]={element:this,start:cV,end:cW};qx.html.Element._scheduleFlush(o);}
,clearTextSelection:function(){var cY=this.__gk;if(cY){qx.bom.Selection.clear(cY);}
;delete qx.html.Element.__ge[this.toHashCode()];}
,__gG:function(da,dc){var dd=qx.html.Element._actions;dd.push({type:da,element:this,args:dc||[]});qx.html.Element._scheduleFlush(o);}
,focus:function(){this.__gG(A);}
,blur:function(){this.__gG(g);}
,activate:function(){this.__gG(h);}
,deactivate:function(){this.__gG(f);}
,capture:function(de){this.__gG(b,[de!==false]);}
,releaseCapture:function(){this.__gG(G);}
,setStyle:function(df,dg,dh){if(!this.__gc){this.__gc={};}
;if(this.__gc[df]==dg){return this;}
;if(dg==null){delete this.__gc[df];}
else {this.__gc[df]=dg;}
;if(this.__gk){if(dh){qx.bom.element.Style.set(this.__gk,df,dg);return this;}
;if(!this.__gr){this.__gr={};}
;this.__gr[df]=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(o);}
;return this;}
,setStyles:function(di,dj){var dk=qx.bom.element.Style;if(!this.__gc){this.__gc={};}
;if(this.__gk){if(!this.__gr){this.__gr={};}
;for(var dm in di){var dl=di[dm];if(this.__gc[dm]==dl){continue;}
;if(dl==null){delete this.__gc[dm];}
else {this.__gc[dm]=dl;}
;if(dj){dk.set(this.__gk,dm,dl);continue;}
;this.__gr[dm]=true;}
;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(o);}
else {for(var dm in di){var dl=di[dm];if(this.__gc[dm]==dl){continue;}
;if(dl==null){delete this.__gc[dm];}
else {this.__gc[dm]=dl;}
;}
;}
;return this;}
,removeStyle:function(dn,dp){this.setStyle(dn,null,dp);return this;}
,getStyle:function(dq){return this.__gc?this.__gc[dq]:null;}
,getAllStyles:function(){return this.__gc||null;}
,setAttribute:function(dr,ds,dt){if(!this.__gd){this.__gd={};}
;if(this.__gd[dr]==ds){return this;}
;if(ds==null){delete this.__gd[dr];}
else {this.__gd[dr]=ds;}
;if(this.__gk){if(dt){qx.bom.element.Attribute.set(this.__gk,dr,ds);return this;}
;if(!this.__gs){this.__gs={};}
;this.__gs[dr]=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(o);}
;return this;}
,setAttributes:function(du,dv){for(var dw in du){this.setAttribute(dw,du[dw],dv);}
;return this;}
,removeAttribute:function(dx,dy){return this.setAttribute(dx,null,dy);}
,getAttribute:function(dz){return this.__gd?this.__gd[dz]:null;}
,_applyProperty:function(name,dA){}
,_setProperty:function(dB,dC,dD){if(!this.__gu){this.__gu={};}
;if(this.__gu[dB]==dC){return this;}
;if(dC==null){delete this.__gu[dB];}
else {this.__gu[dB]=dC;}
;if(this.__gk){if(dD){this._applyProperty(dB,dC);return this;}
;if(!this.__gt){this.__gt={};}
;this.__gt[dB]=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(o);}
;return this;}
,_removeProperty:function(dE,dF){return this._setProperty(dE,null,dF);}
,_getProperty:function(dG){var dH=this.__gu;if(!dH){return null;}
;var dI=dH[dG];return dI==null?null:dI;}
,addListener:function(dJ,dK,self,dL){var dM;if(this.$$disposed){return null;}
;{}
;if(this.__gk){return qx.event.Registration.addListener(this.__gk,dJ,dK,self,dL);}
;if(!this.__gv){this.__gv={};}
;if(dL==null){dL=false;}
;var dN=qx.event.Manager.getNextUniqueId();var dO=dJ+(dL?j:F)+dN;this.__gv[dO]={type:dJ,listener:dK,self:self,capture:dL,unique:dN};return dO;}
,removeListener:function(dP,dQ,self,dR){var dS;if(this.$$disposed){return null;}
;{}
;if(this.__gk){qx.event.Registration.removeListener(this.__gk,dP,dQ,self,dR);}
else {var dU=this.__gv;var dT;if(dR==null){dR=false;}
;for(var dV in dU){dT=dU[dV];if(dT.listener===dQ&&dT.self===self&&dT.capture===dR&&dT.type===dP){delete dU[dV];break;}
;}
;}
;return this;}
,removeListenerById:function(dW){if(this.$$disposed){return null;}
;if(this.__gk){qx.event.Registration.removeListenerById(this.__gk,dW);}
else {delete this.__gv[dW];}
;return this;}
,hasListener:function(dX,dY){if(this.$$disposed){return false;}
;if(this.__gk){return qx.event.Registration.hasListener(this.__gk,dX,dY);}
;var eb=this.__gv;var ea;if(dY==null){dY=false;}
;for(var ec in eb){ea=eb[ec];if(ea.capture===dY&&ea.type===dX){return true;}
;}
;return false;}
},defer:function(ed){ed.__gH=new qx.util.DeferredCall(ed.flush,ed);}
,destruct:function(){var ee=this.__gk;if(ee){qx.event.Registration.getManager(ee).removeAllListeners(ee);ee.$$element=s;}
;if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__gy;if(parent&&!parent.$$disposed){parent.remove(this);}
;}
;this._disposeArray(t);this.__gd=this.__gc=this.__gv=this.__gu=this.__gs=this.__gr=this.__gt=this.__gk=this.__gy=this.__gn=this.__go=null;}
});}
)();
(function(){var c="qx.event.handler.Appear",b="disappear",a="appear";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);this.__ga=d;this.__gI={};qx.event.handler.Appear.__gJ[this.$$hash]=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__gJ:{},refresh:function(){var e=this.__gJ;for(var f in e){e[f].refresh();}
;}
},members:{__ga:null,__gI:null,canHandleEvent:function(g,h){}
,registerEvent:function(i,j,k){var l=qx.core.ObjectRegistry.toHashCode(i)+j;var m=this.__gI;if(m&&!m[l]){m[l]=i;i.$$displayed=i.offsetWidth>0;}
;}
,unregisterEvent:function(n,o,p){var q=qx.core.ObjectRegistry.toHashCode(n)+o;var r=this.__gI;if(!r){return;}
;if(r[q]){delete r[q];}
;}
,refresh:function(){var v=this.__gI;var w;for(var u in v){w=v[u];var s=w.offsetWidth>0;if((!!w.$$displayed)!==s){w.$$displayed=s;var t=qx.event.Registration.createEvent(s?a:b);this.__ga.dispatchEvent(w,t);}
;}
;}
},destruct:function(){this.__ga=this.__gI=null;delete qx.event.handler.Appear.__gJ[this.$$hash];}
,defer:function(x){qx.event.Registration.addHandler(x);}
});}
)();
(function(){var b="abstract",a="qx.event.dispatch.AbstractBubbling";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:b,construct:function(c){this._manager=c;}
,members:{_getParent:function(d){throw new Error("Missing implementation");}
,canDispatchEvent:function(e,event,f){return event.getBubbles();}
,dispatchEvent:function(g,event,h){var parent=g;var s=this._manager;var p,w;var n;var r,u;var t;var v=[];p=s.getListeners(g,h,true);w=s.getListeners(g,h,false);if(p){v.push(p);}
;if(w){v.push(w);}
;var parent=this._getParent(g);var l=[];var k=[];var m=[];var q=[];while(parent!=null){p=s.getListeners(parent,h,true);if(p){m.push(p);q.push(parent);}
;w=s.getListeners(parent,h,false);if(w){l.push(w);k.push(parent);}
;parent=this._getParent(parent);}
;event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);for(var i=m.length-1;i>=0;i--){t=q[i];event.setCurrentTarget(t);n=m[i];for(var j=0,o=n.length;j<o;j++){r=n[j];u=r.context||t;{}
;r.handler.call(u,event);}
;if(event.getPropagationStopped()){return;}
;}
;event.setEventPhase(qx.event.type.Event.AT_TARGET);event.setCurrentTarget(g);for(var i=0,x=v.length;i<x;i++){n=v[i];for(var j=0,o=n.length;j<o;j++){r=n[j];u=r.context||g;{}
;r.handler.call(u,event);}
;if(event.getPropagationStopped()){return;}
;}
;event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);for(var i=0,x=l.length;i<x;i++){t=k[i];event.setCurrentTarget(t);n=l[i];for(var j=0,o=n.length;j<o;j++){r=n[j];u=r.context||t;{}
;r.handler.call(u,event);}
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
,_cloneNativeEvent:function(j,k){k.preventDefault=(function(){}
);return k;}
,preventDefault:function(){qx.event.type.Event.prototype.preventDefault.call(this);qx.bom.Event.preventDefault(this._native);}
,getNativeEvent:function(){return this._native;}
,setReturnValue:function(l){this._returnValue=l;}
,getReturnValue:function(){return this._returnValue;}
},destruct:function(){this._native=this._returnValue=null;}
});}
)();
(function(){var a="qx.event.handler.UserAction";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);this.__ga=b;this.__cp=b.getWindow();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__ga:null,__cp:null,canHandleEvent:function(c,d){}
,registerEvent:function(e,f,g){}
,unregisterEvent:function(h,i,j){}
},destruct:function(){this.__ga=this.__cp=null;}
,defer:function(k){qx.event.Registration.addHandler(k);}
});}
)();
(function(){var t="engine.version",s="useraction",r="webkit",q="gecko",p="DOMMouseScroll",o="qx.event.handler.Mouse",n="os.name",m="mouseover",l="mouseout",k="ios",d="mousemove",j="on",g="dblclick",c="mousedown",b="contextmenu",f="mousewheel",e="mouseup",h="engine.name",a="click";qx.Class.define(o,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(u){qx.core.Object.call(this);this.__ga=u;this.__cp=u.getWindow();this.__df=this.__cp.document;this._initButtonObserver();this._initMoveObserver();this._initWheelObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT+qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__gK:null,__gL:null,__gM:null,__gN:null,__gO:null,__ga:null,__cp:null,__df:null,canHandleEvent:function(v,w){}
,registerEvent:qx.core.Environment.get(n)===k?function(x,y,z){x[j+y]=(function(){return null;}
);}
:(function(){return null;}
),unregisterEvent:qx.core.Environment.get(n)===k?function(A,B,C){A[j+B]=undefined;}
:(function(){return null;}
),__gP:function(D,E,F){if(!F){F=qx.bom.Event.getTarget(D);}
;if(F&&F.nodeType){qx.event.Registration.fireEvent(F,E||D.type,E==f?qx.event.type.MouseWheel:qx.event.type.Mouse,[D,F,null,true,true]);}
;qx.event.Registration.fireEvent(this.__cp,s,qx.event.type.Data,[E||D.type]);}
,__gQ:function(){var H=[this.__cp,this.__df,this.__df.body];var I=this.__cp;var G=p;for(var i=0;i<H.length;i++){if(qx.bom.Event.supportsEvent(H[i],f)){G=f;I=H[i];break;}
;}
;return {type:G,target:I};}
,_initButtonObserver:function(){this.__gK=qx.lang.Function.listener(this._onButtonEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__df,c,this.__gK);Event.addNativeListener(this.__df,e,this.__gK);Event.addNativeListener(this.__df,a,this.__gK);Event.addNativeListener(this.__df,g,this.__gK);Event.addNativeListener(this.__df,b,this.__gK);}
,_initMoveObserver:function(){this.__gL=qx.lang.Function.listener(this._onMoveEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__df,d,this.__gL);Event.addNativeListener(this.__df,m,this.__gL);Event.addNativeListener(this.__df,l,this.__gL);}
,_initWheelObserver:function(){this.__gM=qx.lang.Function.listener(this._onWheelEvent,this);var J=this.__gQ();qx.bom.Event.addNativeListener(J.target,J.type,this.__gM);}
,_stopButtonObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__df,c,this.__gK);Event.removeNativeListener(this.__df,e,this.__gK);Event.removeNativeListener(this.__df,a,this.__gK);Event.removeNativeListener(this.__df,g,this.__gK);Event.removeNativeListener(this.__df,b,this.__gK);}
,_stopMoveObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__df,d,this.__gL);Event.removeNativeListener(this.__df,m,this.__gL);Event.removeNativeListener(this.__df,l,this.__gL);}
,_stopWheelObserver:function(){var K=this.__gQ();qx.bom.Event.removeNativeListener(K.target,K.type,this.__gM);}
,_onMoveEvent:qx.event.GlobalError.observeMethod(function(L){this.__gP(L);}
),_onButtonEvent:qx.event.GlobalError.observeMethod(function(M){var O=M.type;var P=qx.bom.Event.getTarget(M);if(qx.core.Environment.get(h)==q||qx.core.Environment.get(h)==r){if(P&&P.nodeType==3){P=P.parentNode;}
;}
;var N=qx.event.handler.DragDrop&&this.__ga.getHandler(qx.event.handler.DragDrop).isSessionActive();if(N&&O==a){return;}
;if(this.__gR){this.__gR(M,O,P);}
;if(this.__gT){this.__gT(M,O,P);}
;this.__gP(M,O,P);if(this.__gS){this.__gS(M,O,P);}
;if(this.__gU&&!N){this.__gU(M,O,P);}
;this.__gN=O;}
),_onWheelEvent:qx.event.GlobalError.observeMethod(function(Q){this.__gP(Q,f);}
),__gR:qx.core.Environment.select(h,{"webkit":function(R,S,T){if(parseFloat(qx.core.Environment.get(t))<530){if(S==b){this.__gP(R,e,T);}
;}
;}
,"default":null}),__gS:qx.core.Environment.select(h,{"opera":function(U,V,W){if(V==e&&U.button==2){this.__gP(U,b,W);}
;}
,"default":null}),__gT:qx.core.Environment.select(h,{"mshtml":function(X,Y,ba){if(X.target!==undefined){return;}
;if(Y==e&&this.__gN==a){this.__gP(X,c,ba);}
else if(Y==g){this.__gP(X,a,ba);}
;}
,"default":null}),__gU:qx.core.Environment.select(h,{"mshtml":null,"default":function(bb,bc,bd){switch(bc){case c:this.__gO=bd;break;case e:if(bd!==this.__gO){var be=qx.dom.Hierarchy.getCommonParent(bd,this.__gO);if(be){this.__gP(bb,a,be);}
;}
;};}
})},destruct:function(){this._stopButtonObserver();this._stopMoveObserver();this._stopWheelObserver();this.__ga=this.__cp=this.__df=this.__gO=null;}
,defer:function(bf){qx.event.Registration.addHandler(bf);}
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
,__gV:{'0':b,'2':a,'1':c},__gW:{'1':b,'2':a,'4':c},stop:function(){this.stopPropagation();}
,getButton:function(){switch(this._type){case i:return a;case j:if(qx.core.Environment.get(f)===e&&qx.core.Environment.get(g)<9){return b;}
;default:if(this._native.target!==undefined){return this.__gV[this._native.button]||d;}
else {return this.__gW[this._native.button]||d;}
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
(function(){var l="engine.name",k="x",j="osx",i="win",h="qx.dynamicmousewheel",g="chrome",f="qx.event.type.MouseWheel",d="browser.name",c="y",b="os.name",a="engine.version";qx.Class.define(f,{extend:qx.event.type.Mouse,statics:{MAXSCROLL:null,MINSCROLL:null,FACTOR:1},members:{stop:function(){this.stopPropagation();this.preventDefault();}
,__gX:function(m){var n=Math.abs(m);if(qx.event.type.MouseWheel.MINSCROLL==null||qx.event.type.MouseWheel.MINSCROLL>n){qx.event.type.MouseWheel.MINSCROLL=n;this.__gY();}
;if(qx.event.type.MouseWheel.MAXSCROLL==null||qx.event.type.MouseWheel.MAXSCROLL<n){qx.event.type.MouseWheel.MAXSCROLL=n;this.__gY();}
;if(qx.event.type.MouseWheel.MAXSCROLL===n&&qx.event.type.MouseWheel.MINSCROLL===n){return 2*(m/n);}
;var o=qx.event.type.MouseWheel.MAXSCROLL-qx.event.type.MouseWheel.MINSCROLL;var p=(m/o)*Math.log(o)*qx.event.type.MouseWheel.FACTOR;return p<0?Math.min(p,-1):Math.max(p,1);}
,__gY:function(){var q=qx.event.type.MouseWheel.MAXSCROLL||0;var t=qx.event.type.MouseWheel.MINSCROLL||q;if(q<=t){return;}
;var r=q-t;var s=(q/r)*Math.log(r);if(s==0){s=1;}
;qx.event.type.MouseWheel.FACTOR=6/s;}
,getWheelDelta:function(u){var e=this._native;if(u===undefined){if(v===undefined){var v=-e.wheelDelta;if(e.wheelDelta===undefined){v=e.detail;}
;}
;return this.__ha(v);}
;if(u===k){var x=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaX!==undefined){x=e.wheelDeltaX?this.__ha(-e.wheelDeltaX):0;}
;}
else {if(e.axis&&e.axis==e.HORIZONTAL_AXIS){x=this.__ha(e.detail);}
;}
;return x;}
;if(u===c){var y=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaY!==undefined){y=e.wheelDeltaY?this.__ha(-e.wheelDeltaY):0;}
else {y=this.__ha(-e.wheelDelta);}
;}
else {if(!(e.axis&&e.axis==e.HORIZONTAL_AXIS)){y=this.__ha(e.detail);}
;}
;return y;}
;return 0;}
,__ha:function(w){if(qx.core.Environment.get(h)){return this.__gX(w);}
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
(function(){var j="text",i="PageUp",h="PrintScreen",g="os.name",f="gecko",e="F1",d="Left",c="F5",b="Down",a="Up",P="F3",O="F11",N="F6",M="Insert",L="F8",K="input",J="End",I="Delete",H="qx.event.handler.Keyboard",G="win",q="Home",r="F2",o="off",p="F12",m="F4",n="PageDown",k="F7",l="F9",s="F10",t="Right",y="autoComplete",x="Enter",A="NumLock",z="useraction",C="keyinput",B="mshtml",v="webkit",F="engine.version",E="keyup",D="keypress",u="engine.name",w="keydown";qx.Class.define(H,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(Q){qx.core.Object.call(this);this.__ga=Q;this.__cp=Q.getWindow();if((qx.core.Environment.get(u)==f)){this.__df=this.__cp;}
else {this.__df=this.__cp.document.documentElement;}
;this.__hb={};this._initKeyObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__hc:null,__ga:null,__cp:null,__df:null,__hb:null,__hd:null,__he:null,__hf:null,canHandleEvent:function(R,S){}
,registerEvent:function(T,U,V){}
,unregisterEvent:function(W,X,Y){}
,_fireInputEvent:function(ba,bb){var bc=this.__hg();if(bc&&bc.offsetWidth!=0){var event=qx.event.Registration.createEvent(C,qx.event.type.KeyInput,[ba,bc,bb]);this.__ga.dispatchEvent(bc,event);}
;if(this.__cp){qx.event.Registration.fireEvent(this.__cp,z,qx.event.type.Data,[C]);}
;}
,_fireSequenceEvent:function(bd,be,bf){var bg=this.__hg();var bh=bd.keyCode;var event=qx.event.Registration.createEvent(be,qx.event.type.KeySequence,[bd,bg,bf]);this.__ga.dispatchEvent(bg,event);if(qx.core.Environment.get(u)==B||qx.core.Environment.get(u)==v){if(be==w&&event.getDefaultPrevented()){if(!qx.event.util.Keyboard.isNonPrintableKeyCode(bh)&&!this._emulateKeyPress[bh]){this._fireSequenceEvent(bd,D,bf);}
;}
;}
;if(this.__cp){qx.event.Registration.fireEvent(this.__cp,z,qx.event.type.Data,[be]);}
;}
,__hg:function(){var bi=this.__ga.getHandler(qx.event.handler.Focus);var bj=bi.getActive();if(!bj||bj.offsetWidth==0){bj=bi.getFocus();}
;if(!bj||bj.offsetWidth==0){bj=this.__ga.getWindow().document.body;}
;return bj;}
,_initKeyObserver:function(){this.__hc=qx.lang.Function.listener(this.__hh,this);this.__hf=qx.lang.Function.listener(this.__hj,this);var Event=qx.bom.Event;Event.addNativeListener(this.__df,E,this.__hc);Event.addNativeListener(this.__df,w,this.__hc);Event.addNativeListener(this.__df,D,this.__hf);}
,_stopKeyObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__df,E,this.__hc);Event.removeNativeListener(this.__df,w,this.__hc);Event.removeNativeListener(this.__df,D,this.__hf);for(var bl in (this.__he||{})){var bk=this.__he[bl];Event.removeNativeListener(bk.target,D,bk.callback);}
;delete (this.__he);}
,__hh:qx.event.GlobalError.observeMethod(qx.core.Environment.select(u,{"mshtml":function(bm){bm=window.event||bm;var bp=bm.keyCode;var bn=0;var bo=bm.type;if(!(this.__hb[bp]==w&&bo==w)){this._idealKeyHandler(bp,bn,bo,bm);}
;if(bo==w){if(qx.event.util.Keyboard.isNonPrintableKeyCode(bp)||this._emulateKeyPress[bp]){this._idealKeyHandler(bp,bn,D,bm);}
;}
;this.__hb[bp]=bo;}
,"gecko":function(bq){var bs=0;var bu=bq.keyCode;var bt=bq.type;var br=qx.event.util.Keyboard;if(qx.core.Environment.get(g)==G){var bv=bu?br.keyCodeToIdentifier(bu):br.charCodeToIdentifier(bs);if(!(this.__hb[bv]==w&&bt==w)){this._idealKeyHandler(bu,bs,bt,bq);}
;this.__hb[bv]=bt;}
else {this._idealKeyHandler(bu,bs,bt,bq);}
;this.__hi(bq.target,bt,bu);}
,"webkit":function(bw){var bz=0;var bx=0;var by=bw.type;if(parseFloat(qx.core.Environment.get(F))<525.13){if(by==E||by==w){bz=this._charCode2KeyCode[bw.charCode]||bw.keyCode;}
else {if(this._charCode2KeyCode[bw.charCode]){bz=this._charCode2KeyCode[bw.charCode];}
else {bx=bw.charCode;}
;}
;this._idealKeyHandler(bz,bx,by,bw);}
else {bz=bw.keyCode;this._idealKeyHandler(bz,bx,by,bw);if(by==w){if(qx.event.util.Keyboard.isNonPrintableKeyCode(bz)||this._emulateKeyPress[bz]){this._idealKeyHandler(bz,bx,D,bw);}
;}
;this.__hb[bz]=by;}
;}
,"opera":function(bA){this.__hd=bA.keyCode;this._idealKeyHandler(bA.keyCode,0,bA.type,bA);}
})),__hi:qx.core.Environment.select(u,{"gecko":function(bB,bC,bD){if(bC===w&&(bD==33||bD==34||bD==38||bD==40)&&bB.type==j&&bB.tagName.toLowerCase()===K&&bB.getAttribute(y)!==o){if(!this.__he){this.__he={};}
;var bF=qx.core.ObjectRegistry.toHashCode(bB);if(this.__he[bF]){return;}
;var self=this;this.__he[bF]={target:bB,callback:function(bG){qx.bom.Event.stopPropagation(bG);self.__hj(bG);}
};var bE=qx.event.GlobalError.observeMethod(this.__he[bF].callback);qx.bom.Event.addNativeListener(bB,D,bE);}
;}
,"default":null}),__hj:qx.event.GlobalError.observeMethod(qx.core.Environment.select(u,{"mshtml":function(bH){bH=window.event||bH;if(this._charCode2KeyCode[bH.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bH.keyCode],0,bH.type,bH);}
else {this._idealKeyHandler(0,bH.keyCode,bH.type,bH);}
;}
,"gecko":function(bI){var bJ=bI.charCode;var bK=bI.type;this._idealKeyHandler(bI.keyCode,bJ,bK,bI);}
,"webkit":function(bL){if(parseFloat(qx.core.Environment.get(F))<525.13){var bO=0;var bM=0;var bN=bL.type;if(bN==E||bN==w){bO=this._charCode2KeyCode[bL.charCode]||bL.keyCode;}
else {if(this._charCode2KeyCode[bL.charCode]){bO=this._charCode2KeyCode[bL.charCode];}
else {bM=bL.charCode;}
;}
;this._idealKeyHandler(bO,bM,bN,bL);}
else {if(this._charCode2KeyCode[bL.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bL.keyCode],0,bL.type,bL);}
else {this._idealKeyHandler(0,bL.keyCode,bL.type,bL);}
;}
;}
,"opera":function(bP){var bR=bP.keyCode;var bQ=bP.type;if(bR!=this.__hd){this._idealKeyHandler(0,this.__hd,bQ,bP);}
else {if(qx.event.util.Keyboard.keyCodeToIdentifierMap[bP.keyCode]){this._idealKeyHandler(bP.keyCode,0,bP.type,bP);}
else {this._idealKeyHandler(0,bP.keyCode,bP.type,bP);}
;}
;}
})),_idealKeyHandler:function(bS,bT,bU,bV){var bW;if(bS||(!bS&&!bT)){bW=qx.event.util.Keyboard.keyCodeToIdentifier(bS);this._fireSequenceEvent(bV,bU,bW);}
else {bW=qx.event.util.Keyboard.charCodeToIdentifier(bT);this._fireSequenceEvent(bV,D,bW);this._fireInputEvent(bV,bT);}
;}
,_emulateKeyPress:qx.core.Environment.select(u,{"mshtml":{'8':true,'9':true},"webkit":{'8':true,'9':true,'27':true},"default":{}}),_identifierToKeyCode:function(bX){return qx.event.util.Keyboard.identifierToKeyCodeMap[bX]||bX.charCodeAt(0);}
},destruct:function(){this._stopKeyObserver();this.__hd=this.__ga=this.__cp=this.__df=this.__hb=null;}
,defer:function(bY,ca){qx.event.Registration.addHandler(bY);if((qx.core.Environment.get(u)==B)){ca._charCode2KeyCode={'13':13,'27':27};}
else if((qx.core.Environment.get(u)==v)){if(parseFloat(qx.core.Environment.get(F))<525.13){ca._charCode2KeyCode={'63289':ca._identifierToKeyCode(A),'63276':ca._identifierToKeyCode(i),'63277':ca._identifierToKeyCode(n),'63275':ca._identifierToKeyCode(J),'63273':ca._identifierToKeyCode(q),'63234':ca._identifierToKeyCode(d),'63232':ca._identifierToKeyCode(a),'63235':ca._identifierToKeyCode(t),'63233':ca._identifierToKeyCode(b),'63272':ca._identifierToKeyCode(I),'63302':ca._identifierToKeyCode(M),'63236':ca._identifierToKeyCode(e),'63237':ca._identifierToKeyCode(r),'63238':ca._identifierToKeyCode(P),'63239':ca._identifierToKeyCode(m),'63240':ca._identifierToKeyCode(c),'63241':ca._identifierToKeyCode(N),'63242':ca._identifierToKeyCode(k),'63243':ca._identifierToKeyCode(L),'63244':ca._identifierToKeyCode(l),'63245':ca._identifierToKeyCode(s),'63246':ca._identifierToKeyCode(O),'63247':ca._identifierToKeyCode(p),'63248':ca._identifierToKeyCode(h),'3':ca._identifierToKeyCode(x),'12':ca._identifierToKeyCode(A),'13':ca._identifierToKeyCode(x)};}
else {ca._charCode2KeyCode={'13':13,'27':27};}
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
,properties:{active:{apply:f,nullable:true},focus:{apply:i,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Environment.select("engine.name",{"mshtml|gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera|webkit":{button:1,input:1,select:1,textarea:1}})},members:{__hk:null,__hl:null,__hm:null,__hn:null,__ho:null,__hp:null,__hq:null,__hr:null,__hs:null,__ht:null,canHandleEvent:function(B,C){}
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
,tryActivate:function(S){var T=this.__hH(S);if(T){this.setActive(T);}
;}
,__gP:function(U,V,W,X){var ba=qx.event.Registration;var Y=ba.createEvent(W,qx.event.type.Focus,[U,V,X]);ba.dispatchEvent(U,Y);}
,_windowFocused:true,__hu:function(){if(this._windowFocused){this._windowFocused=false;this.__gP(this._window,null,p,false);}
;}
,__hv:function(){if(!this._windowFocused){this._windowFocused=true;this.__gP(this._window,null,m,false);}
;}
,_initObserver:qx.core.Environment.select(l,{"gecko":function(){this.__hk=qx.lang.Function.listener(this.__hB,this);this.__hl=qx.lang.Function.listener(this.__hC,this);this.__hm=qx.lang.Function.listener(this.__hA,this);this.__hn=qx.lang.Function.listener(this.__hz,this);this.__ho=qx.lang.Function.listener(this.__hw,this);qx.bom.Event.addNativeListener(this._document,n,this.__hk,true);qx.bom.Event.addNativeListener(this._document,k,this.__hl,true);qx.bom.Event.addNativeListener(this._window,m,this.__hm,true);qx.bom.Event.addNativeListener(this._window,p,this.__hn,true);qx.bom.Event.addNativeListener(this._window,u,this.__ho,true);}
,"mshtml":function(){this.__hk=qx.lang.Function.listener(this.__hB,this);this.__hl=qx.lang.Function.listener(this.__hC,this);this.__hq=qx.lang.Function.listener(this.__hx,this);this.__hr=qx.lang.Function.listener(this.__hy,this);this.__hp=qx.lang.Function.listener(this.__hE,this);qx.bom.Event.addNativeListener(this._document,n,this.__hk);qx.bom.Event.addNativeListener(this._document,k,this.__hl);qx.bom.Event.addNativeListener(this._document,t,this.__hq);qx.bom.Event.addNativeListener(this._document,s,this.__hr);qx.bom.Event.addNativeListener(this._document,r,this.__hp);}
,"webkit":function(){this.__hk=qx.lang.Function.listener(this.__hB,this);this.__hl=qx.lang.Function.listener(this.__hC,this);this.__hr=qx.lang.Function.listener(this.__hy,this);this.__hm=qx.lang.Function.listener(this.__hA,this);this.__hn=qx.lang.Function.listener(this.__hz,this);this.__hp=qx.lang.Function.listener(this.__hE,this);qx.bom.Event.addNativeListener(this._document,n,this.__hk,true);qx.bom.Event.addNativeListener(this._document,k,this.__hl,true);qx.bom.Event.addNativeListener(this._document,r,this.__hp,false);qx.bom.Event.addNativeListener(this._window,q,this.__hr,true);qx.bom.Event.addNativeListener(this._window,m,this.__hm,true);qx.bom.Event.addNativeListener(this._window,p,this.__hn,true);}
,"opera":function(){this.__hk=qx.lang.Function.listener(this.__hB,this);this.__hl=qx.lang.Function.listener(this.__hC,this);this.__hq=qx.lang.Function.listener(this.__hx,this);this.__hr=qx.lang.Function.listener(this.__hy,this);qx.bom.Event.addNativeListener(this._document,n,this.__hk,true);qx.bom.Event.addNativeListener(this._document,k,this.__hl,true);qx.bom.Event.addNativeListener(this._window,v,this.__hq,true);qx.bom.Event.addNativeListener(this._window,q,this.__hr,true);}
}),_stopObserver:qx.core.Environment.select(l,{"gecko":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__hk,true);qx.bom.Event.removeNativeListener(this._document,k,this.__hl,true);qx.bom.Event.removeNativeListener(this._window,m,this.__hm,true);qx.bom.Event.removeNativeListener(this._window,p,this.__hn,true);qx.bom.Event.removeNativeListener(this._window,u,this.__ho,true);}
,"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__hk);qx.bom.Event.removeNativeListener(this._document,k,this.__hl);qx.bom.Event.removeNativeListener(this._document,t,this.__hq);qx.bom.Event.removeNativeListener(this._document,s,this.__hr);qx.bom.Event.removeNativeListener(this._document,r,this.__hp);}
,"webkit":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__hk,true);qx.bom.Event.removeNativeListener(this._document,k,this.__hl,true);qx.bom.Event.removeNativeListener(this._document,r,this.__hp,false);qx.bom.Event.removeNativeListener(this._window,q,this.__hr,true);qx.bom.Event.removeNativeListener(this._window,m,this.__hm,true);qx.bom.Event.removeNativeListener(this._window,p,this.__hn,true);}
,"opera":function(){qx.bom.Event.removeNativeListener(this._document,n,this.__hk,true);qx.bom.Event.removeNativeListener(this._document,k,this.__hl,true);qx.bom.Event.removeNativeListener(this._window,v,this.__hq,true);qx.bom.Event.removeNativeListener(this._window,q,this.__hr,true);}
}),__hw:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"gecko":function(bb){var bc=qx.bom.Event.getTarget(bb);if(!this.__hI(bc)){qx.bom.Event.preventDefault(bb);}
;}
,"default":null})),__hx:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bd){this.__hv();var bf=qx.bom.Event.getTarget(bd);var be=this.__hG(bf);if(be){this.setFocus(be);}
;this.tryActivate(bf);}
,"opera":function(bg){var bh=qx.bom.Event.getTarget(bg);if(bh==this._document||bh==this._window){this.__hv();if(this.__hs){this.setFocus(this.__hs);delete this.__hs;}
;if(this.__ht){this.setActive(this.__ht);delete this.__ht;}
;}
else {this.setFocus(bh);this.tryActivate(bh);if(!this.__hI(bh)){bh.selectionStart=0;bh.selectionEnd=0;}
;}
;}
,"default":null})),__hy:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bi){var bj=qx.bom.Event.getRelatedTarget(bi);if(bj==null){this.__hu();this.resetFocus();this.resetActive();}
;}
,"webkit":function(bk){var bl=qx.bom.Event.getTarget(bk);if(bl===this.getFocus()){this.resetFocus();}
;if(bl===this.getActive()){this.resetActive();}
;}
,"opera":function(bm){var bn=qx.bom.Event.getTarget(bm);if(bn==this._document){this.__hu();this.__hs=this.getFocus();this.__ht=this.getActive();this.resetFocus();this.resetActive();}
else {if(bn===this.getFocus()){this.resetFocus();}
;if(bn===this.getActive()){this.resetActive();}
;}
;}
,"default":null})),__hz:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"gecko":function(bo){var bp=qx.bom.Event.getTarget(bo);if(bp===this._window||bp===this._document){this.__hu();this.resetActive();this.resetFocus();}
;}
,"webkit":function(bq){var br=qx.bom.Event.getTarget(bq);if(br===this._window||br===this._document){this.__hu();this.__hs=this.getFocus();this.__ht=this.getActive();this.resetActive();this.resetFocus();}
;}
,"default":null})),__hA:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"gecko":function(bs){var bt=qx.bom.Event.getTarget(bs);if(bt===this._window||bt===this._document){this.__hv();bt=this._body;}
;this.setFocus(bt);this.tryActivate(bt);}
,"webkit":function(bu){var bv=qx.bom.Event.getTarget(bu);if(bv===this._window||bv===this._document){this.__hv();if(this.__hs){this.setFocus(this.__hs);delete this.__hs;}
;if(this.__ht){this.setActive(this.__ht);delete this.__ht;}
;}
else {this.setFocus(bv);this.tryActivate(bv);}
;}
,"default":null})),__hB:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bw){var by=qx.bom.Event.getTarget(bw);var bx=this.__hG(by);if(bx){if(!this.__hI(by)){by.unselectable=o;try{document.selection.empty();}
catch(bz){}
;try{bx.focus();}
catch(bA){}
;}
;}
else {qx.bom.Event.preventDefault(bw);if(!this.__hI(by)){by.unselectable=o;}
;}
;}
,"webkit|gecko":function(bB){var bD=qx.bom.Event.getTarget(bB);var bC=this.__hG(bD);if(bC){this.setFocus(bC);}
else {qx.bom.Event.preventDefault(bB);}
;}
,"opera":function(bE){var bH=qx.bom.Event.getTarget(bE);var bF=this.__hG(bH);if(!this.__hI(bH)){qx.bom.Event.preventDefault(bE);if(bF){var bG=this.getFocus();if(bG&&bG.selectionEnd){bG.selectionStart=0;bG.selectionEnd=0;bG.blur();}
;if(bF){this.setFocus(bF);}
;}
;}
else if(bF){this.setFocus(bF);}
;}
,"default":null})),__hC:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml":function(bI){var bJ=qx.bom.Event.getTarget(bI);if(bJ.unselectable){bJ.unselectable=a;}
;this.tryActivate(this.__hD(bJ));}
,"gecko":function(bK){var bL=qx.bom.Event.getTarget(bK);while(bL&&bL.offsetWidth===undefined){bL=bL.parentNode;}
;if(bL){this.tryActivate(bL);}
;}
,"webkit|opera":function(bM){var bN=qx.bom.Event.getTarget(bM);this.tryActivate(this.__hD(bN));}
,"default":null})),__hD:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml|webkit":function(bO){var bP=this.getFocus();if(bP&&bO!=bP&&(bP.nodeName.toLowerCase()===d||bP.nodeName.toLowerCase()===g)){bO=bP;}
;return bO;}
,"default":function(bQ){return bQ;}
})),__hE:qx.event.GlobalError.observeMethod(qx.core.Environment.select(l,{"mshtml|webkit":function(bR){var bS=qx.bom.Event.getTarget(bR);if(!this.__hI(bS)){qx.bom.Event.preventDefault(bR);}
;}
,"default":null})),__hF:function(bT){var bU=qx.bom.element.Attribute.get(bT,b);if(bU>=1){return true;}
;var bV=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;if(bU>=0&&bV[bT.tagName]){return true;}
;return false;}
,__hG:function(bW){while(bW&&bW.nodeType===1){if(bW.getAttribute(x)==o){return null;}
;if(this.__hF(bW)){return bW;}
;bW=bW.parentNode;}
;return this._body;}
,__hH:function(bX){var bY=bX;while(bX&&bX.nodeType===1){if(bX.getAttribute(w)==o){return null;}
;bX=bX.parentNode;}
;return bY;}
,__hI:function(ca){while(ca&&ca.nodeType===1){var cb=ca.getAttribute(c);if(cb!=null){return cb===o;}
;ca=ca.parentNode;}
;return true;}
,_applyActive:function(cc,cd){if(cd){this.__gP(cd,cc,h,true);}
;if(cc){this.__gP(cc,cd,z,true);}
;}
,_applyFocus:function(ce,cf){if(cf){this.__gP(cf,ce,s,true);}
;if(ce){this.__gP(ce,cf,t,true);}
;if(cf){this.__gP(cf,ce,p,false);}
;if(ce){this.__gP(ce,cf,m,false);}
;}
},destruct:function(){this._stopObserver();this._manager=this._window=this._document=this._root=this._body=this.__hJ=null;}
,defer:function(cg){qx.event.Registration.addHandler(cg);var ch=cg.FOCUSABLE_ELEMENTS;for(var ci in ch){ch[ci.toUpperCase()]=1;}
;}
});}
)();
(function(){var k="qx.bom.Selection",j="button",i="#text",h="body",g='character',f="input",e="StartToStart",d="textarea",c="EndToEnd",b="character",a="engine.name";qx.Class.define(k,{statics:{getSelectionObject:qx.core.Environment.select(a,{"mshtml":function(l){return l.selection;}
,"default":function(m){return qx.dom.Node.getWindow(m).getSelection();}
}),get:qx.core.Environment.select(a,{"mshtml":function(n){var o=qx.bom.Range.get(qx.dom.Node.getDocument(n));return o.text;}
,"default":function(p){if(this.__hK(p)){return p.value.substring(p.selectionStart,p.selectionEnd);}
else {return this.getSelectionObject(qx.dom.Node.getDocument(p)).toString();}
;}
}),getLength:qx.core.Environment.select(a,{"mshtml":function(q){var s=this.get(q);var r=qx.util.StringSplit.split(s,/\r\n/);return s.length-(r.length-1);}
,"opera":function(t){var y,w,u;if(this.__hK(t)){var x=t.selectionStart;var v=t.selectionEnd;y=t.value.substring(x,v);w=v-x;}
else {y=qx.bom.Selection.get(t);w=y.length;}
;u=qx.util.StringSplit.split(y,/\r\n/);return w-(u.length-1);}
,"default":function(z){if(this.__hK(z)){return z.selectionEnd-z.selectionStart;}
else {return this.get(z).length;}
;}
}),getStart:qx.core.Environment.select(a,{"mshtml":function(A){if(this.__hK(A)){var F=qx.bom.Range.get();if(!A.contains(F.parentElement())){return -1;}
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
,"gecko|webkit":function(K){if(this.__hK(K)){return K.selectionStart;}
else {var M=qx.dom.Node.getDocument(K);var L=this.getSelectionObject(M);if(L.anchorOffset<L.focusOffset){return L.anchorOffset;}
else {return L.focusOffset;}
;}
;}
,"default":function(N){if(this.__hK(N)){return N.selectionStart;}
else {return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(N)).anchorOffset;}
;}
}),getEnd:qx.core.Environment.select(a,{"mshtml":function(O){if(this.__hK(O)){var T=qx.bom.Range.get();if(!O.contains(T.parentElement())){return -1;}
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
,"gecko|webkit":function(Y){if(this.__hK(Y)){return Y.selectionEnd;}
else {var bb=qx.dom.Node.getDocument(Y);var ba=this.getSelectionObject(bb);if(ba.focusOffset>ba.anchorOffset){return ba.focusOffset;}
else {return ba.anchorOffset;}
;}
;}
,"default":function(bc){if(this.__hK(bc)){return bc.selectionEnd;}
else {return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bc)).focusOffset;}
;}
}),__hK:function(bd){return qx.dom.Node.isElement(bd)&&(bd.nodeName.toLowerCase()==f||bd.nodeName.toLowerCase()==d);}
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
;if(bn){if(!bo.isCollapsed){bo.collapseToStart();}
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
,isMultiTouch:function(){return this.__hM().length>1;}
,getScale:function(){return this._native.scale;}
,getRotation:function(){return this._native.rotation;}
,getDocumentLeft:function(f){return this.__hL(f).pageX;}
,getDocumentTop:function(g){return this.__hL(g).pageY;}
,getScreenLeft:function(h){return this.__hL(h).screenX;}
,getScreenTop:function(j){return this.__hL(j).screenY;}
,getViewportLeft:function(k){return this.__hL(k).clientX;}
,getViewportTop:function(l){return this.__hL(l).clientY;}
,getIdentifier:function(m){return this.__hL(m).identifier;}
,__hL:function(n){n=n==null?0:n;return this.__hM()[n];}
,__hM:function(){var o=(this._isTouchEnd()?this.getChangedTargetTouches():this.getTargetTouches());return o;}
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
(function(){var n="event.pointer",m="onhashchange",l="event.help",k="event.mspointer",j="msPointerEnabled",i="event.touch",h="opera",g="event.hashchange",f="onhelp",e="pointerEvents",b="documentMode",d="qx.bom.client.Event",c="ontouchstart",a="mshtml";qx.Bootstrap.define(d,{statics:{getTouch:function(){return (c in window);}
,getPointer:function(){if(e in document.documentElement.style){var o=qx.bom.client.Engine.getName();return o!=h&&o!=a;}
;return false;}
,getMsPointer:function(){if(j in window.navigator){return window.navigator.msPointerEnabled;}
;return false;}
,getHelp:function(){return (f in document);}
,getHashChange:function(){var p=qx.bom.client.Engine.getName();var q=m in window;return (p!==a&&q)||(p===a&&b in document&&document.documentMode>=8&&q);}
},defer:function(r){qx.core.Environment.add(i,r.getTouch);qx.core.Environment.add(n,r.getPointer);qx.core.Environment.add(k,r.getMsPointer);qx.core.Environment.add(l,r.getHelp);qx.core.Environment.add(g,r.getHashChange);}
});}
)();
(function(){var e="resize",d="landscape",c="portrait",b="qx.event.handler.Orientation",a="orientationchange";qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(f){qx.core.Object.call(this);this.__ga=f;this.__cp=f.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{orientationchange:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__ga:null,__cp:null,__hN:null,_currentOrientation:null,__hO:null,canHandleEvent:function(g,h){}
,registerEvent:function(i,j,k){}
,unregisterEvent:function(l,m,n){}
,_initObserver:function(){this.__hO=qx.lang.Function.listener(this._onNative,this);this.__hN=qx.bom.Event.supportsEvent(this.__cp,a)?a:e;var Event=qx.bom.Event;Event.addNativeListener(this.__cp,this.__hN,this.__hO);}
,_stopObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__cp,this.__hN,this.__hO);}
,_onNative:qx.event.GlobalError.observeMethod(function(o){var q=qx.bom.Viewport;var p=q.getOrientation(o.target);if(this._currentOrientation!=p){this._currentOrientation=p;var r=q.isLandscape(o.target)?d:c;qx.event.Registration.fireEvent(this.__cp,a,qx.event.type.Orientation,[p,r]);}
;}
)},destruct:function(){this._stopObserver();this.__ga=this.__cp=null;}
,defer:function(s){qx.event.Registration.addHandler(s);}
});}
)();
(function(){var c="landscape",b="qx.event.type.Orientation",a="portrait";qx.Class.define(b,{extend:qx.event.type.Event,members:{__hP:null,__hQ:null,init:function(d,e){qx.event.type.Event.prototype.init.call(this,false,false);this.__hP=d;this.__hQ=e;return this;}
,clone:function(f){var g=qx.event.type.Event.prototype.clone.call(this,f);g.__hP=this.__hP;g.__hQ=this.__hQ;return g;}
,getOrientation:function(){return this.__hP;}
,isLandscape:function(){return this.__hQ==c;}
,isPortrait:function(){return this.__hQ==a;}
}});}
)();
(function(){var s="pointer-events",r="engine.name",q="webkit",p="none",o="tap",n="x",m="y",l="swipe",k="qx.event.handler.TouchCore",j="MSPointerUp",c="MSPointerDown",h="touchcancel",f="MSPointerMove",b="MSPointerCancel",a="touchmove",e="touchend",d="event.mspointer",g="touchstart";qx.Bootstrap.define(k,{extend:Object,statics:{TAP_MAX_DISTANCE:qx.core.Environment.get("os.name")!="android"?10:40,SWIPE_DIRECTION:{x:["left","right"],y:["up","down"]},SWIPE_MIN_DISTANCE:qx.core.Environment.get("os.name")!="android"?11:41,SWIPE_MIN_VELOCITY:0},construct:function(t,u){this.__hR=t;this.__fg=u;this._initTouchObserver();}
,members:{__hR:null,__fg:null,__hS:null,__hT:null,__hU:null,__hV:null,__hW:null,__hX:null,__hY:null,_initTouchObserver:function(){this.__hS=qx.lang.Function.listener(this._onTouchEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__hR,g,this.__hS);Event.addNativeListener(this.__hR,a,this.__hS);Event.addNativeListener(this.__hR,e,this.__hS);Event.addNativeListener(this.__hR,h,this.__hS);if(qx.core.Environment.get(d)){Event.addNativeListener(this.__hR,c,this.__hS);Event.addNativeListener(this.__hR,f,this.__hS);Event.addNativeListener(this.__hR,j,this.__hS);Event.addNativeListener(this.__hR,b,this.__hS);}
;}
,_stopTouchObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__hR,g,this.__hS);Event.removeNativeListener(this.__hR,a,this.__hS);Event.removeNativeListener(this.__hR,e,this.__hS);Event.removeNativeListener(this.__hR,h,this.__hS);if(qx.core.Environment.get(d)){Event.removeNativeListener(this.__hR,c,this.__hS);Event.removeNativeListener(this.__hR,f,this.__hS);Event.removeNativeListener(this.__hR,j,this.__hS);Event.removeNativeListener(this.__hR,b,this.__hS);}
;}
,_onTouchEvent:function(v){this._commonTouchEventHandler(v);}
,_commonTouchEventHandler:function(w,x){var x=x||w.type;if(qx.core.Environment.get(d)){w.changedTouches=[w];w.targetTouches=[w];w.touches=[w];if(x==c){x=g;}
else if(x==j){x=e;}
else if(x==f){if(this.__hY==true){x=a;}
;}
else if(x==b){x=h;}
;}
;if(x==g){this.__hT=this._getTarget(w);}
;this._fireEvent(w,x);this.__ib(w,x);}
,_getTarget:function(y){var A=qx.bom.Event.getTarget(y);if(qx.core.Environment.get(r)==q){if(A&&A.nodeType==3){A=A.parentNode;}
;}
else if(qx.core.Environment.get(d)){var z=this.__ia(y);if(z){A=z;}
;}
;return A;}
,__ia:function(B){if(B&&B.touches){var C=B.touches[0].clientX;var D=B.touches[0].clientY;}
;var F=document.msElementsFromPoint(C,D);if(F){for(var i=0;i<F.length;i++){var G=F[i];var E=qx.bom.element.Style.get(G,s,3);if(E!=p){return G;}
;}
;}
;return null;}
,_fireEvent:function(H,I,J){if(!J){J=this._getTarget(H);}
;var I=I||H.type;if(J&&J.nodeType&&this.__fg){this.__fg.emit(I,H);}
;}
,__ib:function(K,L,M){if(!M){M=this._getTarget(K);}
;var L=L||K.type;if(L==g){this.__ic(K,M);}
else if(L==a){this.__id(K,M);}
else if(L==e){this.__ie(K,M);}
;}
,__ic:function(N,O){var P=N.changedTouches[0];this.__hY=true;this.__hU=P.screenX;this.__hV=P.screenY;this.__hW=new Date().getTime();this.__hX=N.changedTouches.length===1;}
,__id:function(Q,R){if(this.__hX&&Q.changedTouches.length>1){this.__hX=false;}
;}
,__ie:function(S,T){this.__hY=false;if(this.__hX){var U=S.changedTouches[0];var X={x:U.screenX-this.__hU,y:U.screenY-this.__hV};var Y=qx.event.handler.TouchCore;var V;if(this.__hT==T&&Math.abs(X.x)<=Y.TAP_MAX_DISTANCE&&Math.abs(X.y)<=Y.TAP_MAX_DISTANCE){if(qx.event&&qx.event.type&&qx.event.type.Tap){V=qx.event.type.Tap;}
;this._fireEvent(S,o,T,V);}
else {var W=this.__if(S,T,X);if(W){if(qx.event&&qx.event.type&&qx.event.type.Swipe){V=qx.event.type.Swipe;}
;S.swipe=W;this._fireEvent(S,l,T,V);}
;}
;}
;}
,__if:function(ba,bb,bc){var bg=qx.event.handler.TouchCore;var bh=new Date().getTime()-this.__hW;var bj=(Math.abs(bc.x)>=Math.abs(bc.y))?n:m;var bd=bc[bj];var be=bg.SWIPE_DIRECTION[bj][bd<0?0:1];var bi=(bh!==0)?bd/bh:0;var bf=null;if(Math.abs(bi)>=bg.SWIPE_MIN_VELOCITY&&Math.abs(bd)>=bg.SWIPE_MIN_DISTANCE){bf={startTime:this.__hW,duration:bh,axis:bj,direction:be,distance:bd,velocity:bi};}
;return bf;}
,dispose:function(){this._stopTouchObserver();this.__hT=this.__hR=this.__fg=null;}
}});}
)();
(function(){var p="mshtml",o="engine.name",n="qx.event.handler.Touch",m="useraction",l="touchmove",k="event.mspointer",j="qx.mobile.nativescroll",i="dispose",h="touchstart",g="mouseup",c="touchend",f="mousedown",d="mousemove",b="event.touch",a="qx.mobile.emulatetouch";qx.Class.define(n,{extend:qx.event.handler.TouchCore,implement:qx.event.IEventHandler,construct:function(q){this.__ga=q;this.__cp=q.getWindow();this.__df=this.__cp.document;qx.event.handler.TouchCore.apply(this,[this.__df]);if(!qx.core.Environment.get(k)){this._initMouseObserver();}
;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{touchstart:1,touchmove:1,touchend:1,touchcancel:1,tap:1,swipe:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true,MOUSE_TO_TOUCH_MAPPING:{"mousedown":"touchstart","mousemove":"touchmove","mouseup":"touchend"}},members:{__ig:null,__ga:null,__cp:null,__df:null,__ih:false,canHandleEvent:function(r,s){}
,registerEvent:function(t,u,v){}
,unregisterEvent:function(w,x,y){}
,_fireEvent:function(z,A,B,C){if(!B){B=this._getTarget(z);}
;var A=A||z.type;if(B&&B.nodeType){qx.event.Registration.fireEvent(B,A,C||qx.event.type.Touch,[z,B,null,true,true]);}
;qx.event.Registration.fireEvent(this.__cp,m,qx.event.type.Data,[A]);}
,__ii:qx.core.Environment.select(a,{"true":function(D){var E=D.type;var G=qx.event.handler.Touch.MOUSE_TO_TOUCH_MAPPING;if(G[E]){E=G[E];if(E==h&&this.__ij(D)){this.__ih=true;}
else if(E==c){this.__ih=false;}
;var H=this.__ik(D);var F=(E==c?[]:[H]);D.touches=F;D.targetTouches=F;D.changedTouches=[H];}
;return E;}
,"default":(function(){}
)}),__ij:qx.core.Environment.select(a,{"true":function(I){if((qx.core.Environment.get(o)==p)){var J=1;}
else {var J=0;}
;return I.button==J;}
,"default":(function(){}
)}),__ik:qx.core.Environment.select(a,{"true":function(K){var L=this._getTarget(K);return {clientX:K.clientX,clientY:K.clientY,screenX:K.screenX,screenY:K.screenY,pageX:K.pageX,pageY:K.pageY,identifier:1,target:L};}
,"default":(function(){}
)}),_initMouseObserver:qx.core.Environment.select(a,{"true":function(){if(!qx.core.Environment.get(b)){this.__ig=qx.lang.Function.listener(this._onMouseEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__df,f,this.__ig);Event.addNativeListener(this.__df,d,this.__ig);Event.addNativeListener(this.__df,g,this.__ig);}
;}
,"default":(function(){}
)}),_stopMouseObserver:qx.core.Environment.select(a,{"true":function(){if(!qx.core.Environment.get(b)){var Event=qx.bom.Event;Event.removeNativeListener(this.__df,f,this.__ig);Event.removeNativeListener(this.__df,d,this.__ig);Event.removeNativeListener(this.__df,g,this.__ig);}
;}
,"default":(function(){}
)}),_onTouchEvent:qx.event.GlobalError.observeMethod(function(M){this._commonTouchEventHandler(M);}
),_onMouseEvent:qx.core.Environment.select(a,{"true":qx.event.GlobalError.observeMethod(function(N){if(!qx.core.Environment.get(b)){if(N.type==d&&!this.__ih){return;}
;var O=this.__ii(N);this._commonTouchEventHandler(N,O);}
;}
),"default":(function(){}
)}),dispose:function(){this.__il(i);this._stopMouseObserver();this.__ga=this.__cp=this.__df=null;}
,__il:function(P,Q){qx.event.handler.TouchCore.prototype[P].apply(this,Q||[]);}
},defer:function(R){qx.event.Registration.addHandler(R);if(qx.core.Environment.get(b)){if(qx.core.Environment.get(j)==false){document.addEventListener(l,function(e){e.preventDefault();}
);}
;qx.event.Registration.getManager(document).getHandler(R);}
;}
});}
)();
(function(){var m="select-multiple",k="value",j="select",h="qx.event.handler.Input",g="checked",f="blur",d="keydown",c="propertychange",b="browser.version",a="browser.documentmode",A="opera",z="keyup",y="mshtml",x="keypress",w="engine.version",v="radio",u="checkbox",t="text",s="textarea",r="password",p="change",q="engine.name",n="input";qx.Class.define(h,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);if((qx.core.Environment.get(q)==A)){this._onKeyDownWrapper=qx.lang.Function.listener(this._onKeyDown,this);this._onKeyUpWrapper=qx.lang.Function.listener(this._onKeyUp,this);this._onBlurWrapper=qx.lang.Function.listener(this._onBlur,this);}
;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__im:false,__in:null,__io:null,__ip:null,canHandleEvent:function(B,C){var D=B.tagName.toLowerCase();if(C===n&&(D===n||D===s)){return true;}
;if(C===p&&(D===n||D===s||D===j)){return true;}
;return false;}
,registerEvent:function(E,F,G){if(qx.core.Environment.get(q)==y&&(qx.core.Environment.get(w)<9||(qx.core.Environment.get(w)>=9&&qx.core.Environment.get(a)<9))){if(!E.__iq){var H=E.tagName.toLowerCase();var I=E.type;if(I===t||I===r||H===s||I===u||I===v){qx.bom.Event.addNativeListener(E,c,this._onPropertyWrapper);}
;if(I!==u&&I!==v){qx.bom.Event.addNativeListener(E,p,this._onChangeValueWrapper);}
;if(I===t||I===r){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,E);qx.bom.Event.addNativeListener(E,x,this._onKeyPressWrapped);}
;E.__iq=true;}
;}
else {if(F===n){this.__ir(E);}
else if(F===p){if(E.type===v||E.type===u){qx.bom.Event.addNativeListener(E,p,this._onChangeCheckedWrapper);}
else {qx.bom.Event.addNativeListener(E,p,this._onChangeValueWrapper);}
;if((qx.core.Environment.get(q)==A)||(qx.core.Environment.get(q)==y)){if(E.type===t||E.type===r){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,E);qx.bom.Event.addNativeListener(E,x,this._onKeyPressWrapped);}
;}
;}
;}
;}
,__ir:qx.core.Environment.select(q,{"mshtml":function(J){if(qx.core.Environment.get(w)>=9&&qx.core.Environment.get(a)>=9){qx.bom.Event.addNativeListener(J,n,this._onInputWrapper);if(J.type===t||J.type===r||J.type===s){this._inputFixWrapper=qx.lang.Function.listener(this._inputFix,this,J);qx.bom.Event.addNativeListener(J,z,this._inputFixWrapper);}
;}
;}
,"webkit":function(K){var L=K.tagName.toLowerCase();if(parseFloat(qx.core.Environment.get(w))<532&&L==s){qx.bom.Event.addNativeListener(K,x,this._onInputWrapper);}
;qx.bom.Event.addNativeListener(K,n,this._onInputWrapper);}
,"opera":function(M){qx.bom.Event.addNativeListener(M,z,this._onKeyUpWrapper);qx.bom.Event.addNativeListener(M,d,this._onKeyDownWrapper);qx.bom.Event.addNativeListener(M,f,this._onBlurWrapper);qx.bom.Event.addNativeListener(M,n,this._onInputWrapper);}
,"default":function(N){qx.bom.Event.addNativeListener(N,n,this._onInputWrapper);}
}),unregisterEvent:function(O,P){if(qx.core.Environment.get(q)==y&&qx.core.Environment.get(w)<9&&qx.core.Environment.get(a)<9){if(O.__iq){var Q=O.tagName.toLowerCase();var R=O.type;if(R===t||R===r||Q===s||R===u||R===v){qx.bom.Event.removeNativeListener(O,c,this._onPropertyWrapper);}
;if(R!==u&&R!==v){qx.bom.Event.removeNativeListener(O,p,this._onChangeValueWrapper);}
;if(R===t||R===r){qx.bom.Event.removeNativeListener(O,x,this._onKeyPressWrapped);}
;try{delete O.__iq;}
catch(S){O.__iq=null;}
;}
;}
else {if(P===n){this.__is(O);}
else if(P===p){if(O.type===v||O.type===u){qx.bom.Event.removeNativeListener(O,p,this._onChangeCheckedWrapper);}
else {qx.bom.Event.removeNativeListener(O,p,this._onChangeValueWrapper);}
;}
;if((qx.core.Environment.get(q)==A)||(qx.core.Environment.get(q)==y)){if(O.type===t||O.type===r){qx.bom.Event.removeNativeListener(O,x,this._onKeyPressWrapped);}
;}
;}
;}
,__is:qx.core.Environment.select(q,{"mshtml":function(T){if(qx.core.Environment.get(w)>=9&&qx.core.Environment.get(a)>=9){qx.bom.Event.removeNativeListener(T,n,this._onInputWrapper);if(T.type===t||T.type===r||T.type===s){qx.bom.Event.removeNativeListener(T,z,this._inputFixWrapper);}
;}
;}
,"webkit":function(U){var V=U.tagName.toLowerCase();if(parseFloat(qx.core.Environment.get(w))<532&&V==s){qx.bom.Event.removeNativeListener(U,x,this._onInputWrapper);}
;qx.bom.Event.removeNativeListener(U,n,this._onInputWrapper);}
,"opera":function(W){qx.bom.Event.removeNativeListener(W,z,this._onKeyUpWrapper);qx.bom.Event.removeNativeListener(W,d,this._onKeyDownWrapper);qx.bom.Event.removeNativeListener(W,f,this._onBlurWrapper);qx.bom.Event.removeNativeListener(W,n,this._onInputWrapper);}
,"default":function(X){qx.bom.Event.removeNativeListener(X,n,this._onInputWrapper);}
}),_onKeyPress:qx.core.Environment.select(q,{"mshtml|opera":function(e,Y){if(e.keyCode===13){if(Y.value!==this.__io){this.__io=Y.value;qx.event.Registration.fireEvent(Y,p,qx.event.type.Data,[Y.value]);}
;}
;}
,"default":null}),_inputFix:qx.core.Environment.select(q,{"mshtml":function(e,ba){if(e.keyCode===46||e.keyCode===8){if(ba.value!==this.__ip){this.__ip=ba.value;qx.event.Registration.fireEvent(ba,n,qx.event.type.Data,[ba.value]);}
;}
;}
,"default":null}),_onKeyDown:qx.core.Environment.select(q,{"opera":function(e){if(e.keyCode===13){this.__im=true;}
;}
,"default":null}),_onKeyUp:qx.core.Environment.select(q,{"opera":function(e){if(e.keyCode===13){this.__im=false;}
;}
,"default":null}),_onBlur:qx.core.Environment.select(q,{"opera":function(e){if(this.__in&&qx.core.Environment.get(b)<10.6){window.clearTimeout(this.__in);}
;}
,"default":null}),_onInput:qx.event.GlobalError.observeMethod(function(e){var bc=qx.bom.Event.getTarget(e);var bb=bc.tagName.toLowerCase();if(!this.__im||bb!==n){if((qx.core.Environment.get(q)==A)&&qx.core.Environment.get(b)<10.6){this.__in=window.setTimeout(function(){qx.event.Registration.fireEvent(bc,n,qx.event.type.Data,[bc.value]);}
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
(function(){var k="mousedown",j="qxDraggable",i="Escape",h="drag",g="drop",f="qxDroppable",d="qx.event.handler.DragDrop",c="droprequest",b="dragstart",a="dragleave",D="dragover",C="left",B="blur",A="mouseout",z="keydown",y="Control",x="Shift",w="mousemove",v="move",u="mouseover",r="dragchange",s="Alt",p="keyup",q="mouseup",n="keypress",o="dragend",l="on",m="alias",t="copy";qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(E){qx.core.Object.call(this);this.__ga=E;this.__df=E.getWindow().document.documentElement;this.__ga.addListener(this.__df,k,this._onMouseDown,this);this.__iD();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true},members:{__ga:null,__df:null,__it:null,__iu:null,__iv:null,__iw:null,__ix:null,__c:null,__iy:null,__iz:null,__iA:false,__iB:0,__iC:0,canHandleEvent:function(F,G){}
,registerEvent:function(H,I,J){}
,unregisterEvent:function(K,L,M){}
,addType:function(N){this.__iv[N]=true;}
,addAction:function(O){this.__iw[O]=true;}
,supportsType:function(P){return !!this.__iv[P];}
,supportsAction:function(Q){return !!this.__iw[Q];}
,getData:function(R){if(!this.__iJ||!this.__it){throw new Error("This method must not be used outside the drop event listener!");}
;if(!this.__iv[R]){throw new Error("Unsupported data type: "+R+"!");}
;if(!this.__c[R]){this.__iy=R;this.__gP(c,this.__iu,this.__it,false);}
;if(!this.__c[R]){throw new Error("Please use a droprequest listener to the drag source to fill the manager with data!");}
;return this.__c[R]||null;}
,getCurrentAction:function(){return this.__iz;}
,addData:function(S,T){this.__c[S]=T;}
,getCurrentType:function(){return this.__iy;}
,isSessionActive:function(){return this.__iA;}
,__iD:function(){this.__iv={};this.__iw={};this.__ix={};this.__c={};}
,__iE:function(){if(this.__iu==null){return;}
;var X=this.__iw;var U=this.__ix;var V=null;if(this.__iJ){if(U.Shift&&U.Control&&X.alias){V=m;}
else if(U.Shift&&U.Alt&&X.copy){V=t;}
else if(U.Shift&&X.move){V=v;}
else if(U.Alt&&X.alias){V=m;}
else if(U.Control&&X.copy){V=t;}
else if(X.move){V=v;}
else if(X.copy){V=t;}
else if(X.alias){V=m;}
;}
;var W=this.__iz;if(V!=W){if(this.__it){this.__iz=V;this.__iF=this.__gP(r,this.__it,this.__iu,true);if(!this.__iF){V=null;}
;}
;if(V!=W){this.__iz=V;this.__gP(r,this.__iu,this.__it,false);}
;}
;}
,__gP:function(Y,ba,bb,bc,bd){var bf=qx.event.Registration;var be=bf.createEvent(Y,qx.event.type.Drag,[bc,bd]);if(ba!==bb){be.setRelatedTarget(bb);}
;return bf.dispatchEvent(ba,be);}
,__iG:function(bg){while(bg&&bg.nodeType==1){if(bg.getAttribute(j)==l){return bg;}
;bg=bg.parentNode;}
;return null;}
,__iH:function(bh){while(bh&&bh.nodeType==1){if(bh.getAttribute(f)==l){return bh;}
;bh=bh.parentNode;}
;return null;}
,__iI:function(){this.__iu=null;this.__ga.removeListener(this.__df,w,this._onMouseMove,this,true);this.__ga.removeListener(this.__df,q,this._onMouseUp,this,true);qx.event.Registration.removeListener(window,B,this._onWindowBlur,this);this.__iD();}
,clearSession:function(){if(this.__iA){this.__ga.removeListener(this.__df,u,this._onMouseOver,this,true);this.__ga.removeListener(this.__df,A,this._onMouseOut,this,true);this.__ga.removeListener(this.__df,z,this._onKeyDown,this,true);this.__ga.removeListener(this.__df,p,this._onKeyUp,this,true);this.__ga.removeListener(this.__df,n,this._onKeyPress,this,true);this.__gP(o,this.__iu,this.__it,false);this.__iA=false;}
;this.__iJ=false;this.__it=null;this.__iI();}
,__iJ:false,__iF:false,_onWindowBlur:function(e){this.clearSession();}
,_onKeyDown:function(e){var bi=e.getKeyIdentifier();switch(bi){case s:case y:case x:if(!this.__ix[bi]){this.__ix[bi]=true;this.__iE();}
;};}
,_onKeyUp:function(e){var bj=e.getKeyIdentifier();switch(bj){case s:case y:case x:if(this.__ix[bj]){this.__ix[bj]=false;this.__iE();}
;};}
,_onKeyPress:function(e){var bk=e.getKeyIdentifier();switch(bk){case i:this.clearSession();};}
,_onMouseDown:function(e){if(this.__iA||e.getButton()!==C){return;}
;var bl=this.__iG(e.getTarget());if(bl){this.__iB=e.getDocumentLeft();this.__iC=e.getDocumentTop();this.__iu=bl;this.__ga.addListener(this.__df,w,this._onMouseMove,this,true);this.__ga.addListener(this.__df,q,this._onMouseUp,this,true);qx.event.Registration.addListener(window,B,this._onWindowBlur,this);}
;}
,_onMouseUp:function(e){if(this.__iJ&&this.__iF){this.__gP(g,this.__it,this.__iu,false,e);}
;if(this.__iA){e.stopPropagation();}
;this.clearSession();}
,_onMouseMove:function(e){if(this.__iA){if(!this.__gP(h,this.__iu,this.__it,true,e)){this.clearSession();}
;}
else {if(Math.abs(e.getDocumentLeft()-this.__iB)>3||Math.abs(e.getDocumentTop()-this.__iC)>3){if(this.__gP(b,this.__iu,this.__it,true,e)){this.__iA=true;this.__ga.addListener(this.__df,u,this._onMouseOver,this,true);this.__ga.addListener(this.__df,A,this._onMouseOut,this,true);this.__ga.addListener(this.__df,z,this._onKeyDown,this,true);this.__ga.addListener(this.__df,p,this._onKeyUp,this,true);this.__ga.addListener(this.__df,n,this._onKeyPress,this,true);var bm=this.__ix;bm.Control=e.isCtrlPressed();bm.Shift=e.isShiftPressed();bm.Alt=e.isAltPressed();this.__iE();}
else {this.__gP(o,this.__iu,this.__it,false);this.__iI();}
;}
;}
;}
,_onMouseOver:function(e){var bn=e.getTarget();var bo=this.__iH(bn);if(bo&&bo!=this.__it){this.__iJ=this.__gP(D,bo,this.__iu,true,e);this.__it=bo;this.__iE();}
;}
,_onMouseOut:function(e){var bq=this.__iH(e.getTarget());var bp=this.__iH(e.getRelatedTarget());if(bq&&bq!==bp&&bq==this.__it){this.__gP(a,this.__it,bp,false,e);this.__it=null;this.__iJ=false;qx.event.Timer.once(this.__iE,this,0);}
;}
},destruct:function(){this.__iu=this.__it=this.__ga=this.__df=this.__iv=this.__iw=this.__ix=this.__c=null;}
,defer:function(br){qx.event.Registration.addHandler(br);}
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
,stopSession:function(){this.getManager().clearSession();}
}});}
)();
(function(){var h="qx.event.Timer",g="_applyInterval",f="_applyEnabled",d="Boolean",c="qx.event.type.Event",b="Integer",a="interval";qx.Class.define(h,{extend:qx.core.Object,construct:function(i){qx.core.Object.call(this);this.setEnabled(false);if(i!=null){this.setInterval(i);}
;var self=this;this.__ea=function(){self._oninterval.call(self);}
;}
,events:{"interval":c},statics:{once:function(j,k,l){{}
;var m=new qx.event.Timer(l);m.__eb=j;m.addListener(a,function(e){m.stop();j.call(k,e);m.dispose();k=null;}
,k);m.start();return m;}
},properties:{enabled:{init:true,check:d,apply:f},interval:{check:b,init:1000,apply:g}},members:{__ec:null,__ea:null,_applyInterval:function(n,o){if(this.getEnabled()){this.restart();}
;}
,_applyEnabled:function(p,q){if(q){window.clearInterval(this.__ec);this.__ec=null;}
else if(p){this.__ec=window.setInterval(this.__ea,this.getInterval());}
;}
,start:function(){this.setEnabled(true);}
,startWith:function(r){this.setInterval(r);this.start();}
,stop:function(){this.setEnabled(false);}
,restart:function(){this.stop();this.start();}
,restartWith:function(s){this.stop();this.startWith(s);}
,_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;}
;if(this.getEnabled()){this.fireEvent(a);}
;}
)},destruct:function(){if(this.__ec){window.clearInterval(this.__ec);}
;this.__ec=this.__ea=null;}
});}
)();
(function(){var c="qx.event.handler.Offline",b="offline",a="online";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);this.__ga=d;this.__cp=d.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{online:true,offline:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__ga:null,__cp:null,__hO:null,canHandleEvent:function(e,f){}
,registerEvent:function(g,h,i){}
,unregisterEvent:function(j,k,l){}
,_initObserver:function(){this.__hO=qx.lang.Function.listener(this._onNative,this);qx.bom.Event.addNativeListener(this.__cp,b,this.__hO);qx.bom.Event.addNativeListener(this.__cp,a,this.__hO);}
,_stopObserver:function(){qx.bom.Event.removeNativeListener(this.__cp,b,this.__hO);qx.bom.Event.removeNativeListener(this.__cp,a,this.__hO);}
,_onNative:qx.event.GlobalError.observeMethod(function(m){qx.event.Registration.fireEvent(this.__cp,m.type,qx.event.type.Event,[]);}
),isOnline:function(){return !!this.__cp.navigator.onLine;}
},destruct:function(){this.__ga=null;this._stopObserver();delete qx.event.handler.Appear.__instances[this.$$hash];}
,defer:function(n){qx.event.Registration.addHandler(n);}
});}
)();
(function(){var c="qx.bom.Element",b="mshtml",a="engine.name";qx.Class.define(c,{statics:{addListener:function(d,e,f,self,g){return qx.event.Registration.addListener(d,e,f,self,g);}
,removeListener:function(h,k,m,self,n){return qx.event.Registration.removeListener(h,k,m,self,n);}
,removeListenerById:function(o,p){return qx.event.Registration.removeListenerById(o,p);}
,hasListener:function(q,r,s){return qx.event.Registration.hasListener(q,r,s);}
,focus:function(t){qx.event.Registration.getManager(t).getHandler(qx.event.handler.Focus).focus(t);}
,blur:function(u){qx.event.Registration.getManager(u).getHandler(qx.event.handler.Focus).blur(u);}
,activate:function(v){qx.event.Registration.getManager(v).getHandler(qx.event.handler.Focus).activate(v);}
,deactivate:function(w){qx.event.Registration.getManager(w).getHandler(qx.event.handler.Focus).deactivate(w);}
,capture:function(x,y){qx.event.Registration.getManager(x).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(x,y);}
,releaseCapture:function(z){qx.event.Registration.getManager(z).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(z);}
,clone:function(A,B){var E;if(B||((qx.core.Environment.get(a)==b)&&!qx.xml.Document.isXmlDocument(A))){var I=qx.event.Registration.getManager(A);var C=qx.dom.Hierarchy.getDescendants(A);C.push(A);}
;if((qx.core.Environment.get(a)==b)){for(var i=0,l=C.length;i<l;i++){I.toggleAttachedEvents(C[i],false);}
;}
;var E=A.cloneNode(true);if((qx.core.Environment.get(a)==b)){for(var i=0,l=C.length;i<l;i++){I.toggleAttachedEvents(C[i],true);}
;}
;if(B===true){var L=qx.dom.Hierarchy.getDescendants(E);L.push(E);var D,G,K,F;for(var i=0,J=C.length;i<J;i++){K=C[i];D=I.serializeListeners(K);if(D.length>0){G=L[i];for(var j=0,H=D.length;j<H;j++){F=D[j];I.addListener(G,F.type,F.handler,F.self,F.capture);}
;}
;}
;}
;return E;}
}});}
)();
(function(){var i="mshtml",h="blur",g="focus",f="click",e="qx.event.dispatch.MouseCapture",d="capture",c="scroll",b="engine.name",a="losecapture";qx.Class.define(e,{extend:qx.event.dispatch.AbstractBubbling,construct:function(j,k){qx.event.dispatch.AbstractBubbling.call(this,j);this.__cp=j.getWindow();this.__cr=k;j.addListener(this.__cp,h,this.releaseCapture,this);j.addListener(this.__cp,g,this.releaseCapture,this);j.addListener(this.__cp,c,this.releaseCapture,this);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__cr:null,__iK:null,__iL:true,__cp:null,_getParent:function(l){return l.parentNode;}
,canDispatchEvent:function(m,event,n){return !!(this.__iK&&this.__iM[n]);}
,dispatchEvent:function(o,event,p){if(p==f){event.stopPropagation();this.releaseCapture();return;}
;if(this.__iL||!qx.dom.Hierarchy.contains(this.__iK,o)){o=this.__iK;}
;qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,o,event,p);}
,__iM:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1},activateCapture:function(q,r){var r=r!==false;if(this.__iK===q&&this.__iL==r){return;}
;if(this.__iK){this.releaseCapture();}
;this.nativeSetCapture(q,r);if(this.hasNativeCapture){var self=this;qx.bom.Event.addNativeListener(q,a,function(){qx.bom.Event.removeNativeListener(q,a,arguments.callee);self.releaseCapture();}
);}
;this.__iL=r;this.__iK=q;this.__cr.fireEvent(q,d,qx.event.type.Event,[true,false]);}
,getCaptureElement:function(){return this.__iK;}
,releaseCapture:function(){var s=this.__iK;if(!s){return;}
;this.__iK=null;this.__cr.fireEvent(s,a,qx.event.type.Event,[true,false]);this.nativeReleaseCapture(s);}
,hasNativeCapture:qx.core.Environment.get(b)==i,nativeSetCapture:qx.core.Environment.select(b,{"mshtml":function(t,u){t.setCapture(u!==false);}
,"default":(function(){}
)}),nativeReleaseCapture:qx.core.Environment.select(b,{"mshtml":function(v){v.releaseCapture();}
,"default":(function(){}
)})},destruct:function(){this.__iK=this.__cp=this.__cr=null;}
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
catch(u){return;}
;var r=t.documentElement;var p=qx.bom.Event.getTarget(e);if(p==null||p===q||p===t||p===r){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,q]);qx.event.Registration.dispatchEvent(q,event);var s=event.getReturnValue();if(s!=null){e.returnValue=s;return s;}
;}
;}
)},destruct:function(){this._stopWindowObserver();this._manager=this._window=null;}
,defer:function(v){qx.event.Registration.addHandler(v);}
});}
)();
(function(){var m="Silverlight",l="plugin.silverlight.version",k="function",h="Skype.Detection",g="QuickTimeCheckObject.QuickTimeCheck.1",f="Adobe Acrobat",d="plugin.windowsmedia",c="QuickTime",b="plugin.silverlight",a="qx.bom.client.Plugin",M="application/x-skype",L="plugin.divx",K="Chrome PDF Viewer",J="Windows Media",I="skype.click2call",H="plugin.skype",G="plugin.gears",F="plugin.quicktime",E="plugin.windowsmedia.version",D="DivX Web Player",t="AgControl.AgControl",u="plugin.pdf",r="plugin.pdf.version",s="plugin.divx.version",p="WMPlayer.OCX.7",q="AcroPDF.PDF",n="plugin.activex",o="plugin.quicktime.version",v="npdivx.DivXBrowserPlugin.1",w="pdf",y="wmv",x="divx",A="quicktime",z="mshtml",C="silverlight",B="";qx.Bootstrap.define(a,{statics:{getGears:function(){return !!(window.google&&window.google.gears);}
,getActiveX:function(){return (typeof window.ActiveXObject===k);}
,getSkype:function(){if(qx.bom.client.Plugin.getActiveX()){try{new ActiveXObject(h);return true;}
catch(e){}
;}
;var N=navigator.mimeTypes;if(N){if(M in N){return true;}
;for(var i=0;i<N.length;i++){var O=N[i];if(O.type.indexOf(I)!=-1){return true;}
;}
;}
;return false;}
,__iN:{quicktime:{plugin:[c],control:g},wmv:{plugin:[J],control:p},divx:{plugin:[D],control:v},silverlight:{plugin:[m],control:t},pdf:{plugin:[K,f],control:q}},getQuicktimeVersion:function(){var P=qx.bom.client.Plugin.__iN[A];return qx.bom.client.Plugin.__iO(P.control,P.plugin);}
,getWindowsMediaVersion:function(){var Q=qx.bom.client.Plugin.__iN[y];return qx.bom.client.Plugin.__iO(Q.control,Q.plugin);}
,getDivXVersion:function(){var R=qx.bom.client.Plugin.__iN[x];return qx.bom.client.Plugin.__iO(R.control,R.plugin);}
,getSilverlightVersion:function(){var S=qx.bom.client.Plugin.__iN[C];return qx.bom.client.Plugin.__iO(S.control,S.plugin);}
,getPdfVersion:function(){var T=qx.bom.client.Plugin.__iN[w];return qx.bom.client.Plugin.__iO(T.control,T.plugin);}
,getQuicktime:function(){var U=qx.bom.client.Plugin.__iN[A];return qx.bom.client.Plugin.__iP(U.control,U.plugin);}
,getWindowsMedia:function(){var V=qx.bom.client.Plugin.__iN[y];return qx.bom.client.Plugin.__iP(V.control,V.plugin);}
,getDivX:function(){var W=qx.bom.client.Plugin.__iN[x];return qx.bom.client.Plugin.__iP(W.control,W.plugin);}
,getSilverlight:function(){var X=qx.bom.client.Plugin.__iN[C];return qx.bom.client.Plugin.__iP(X.control,X.plugin);}
,getPdf:function(){var Y=qx.bom.client.Plugin.__iN[w];return qx.bom.client.Plugin.__iP(Y.control,Y.plugin);}
,__iO:function(ba,bb){var bc=qx.bom.client.Plugin.__iP(ba,bb);if(!bc){return B;}
;if(qx.bom.client.Engine.getName()==z){var bd=new ActiveXObject(ba);try{var bg=bd.versionInfo;if(bg!=undefined){return bg;}
;bg=bd.version;if(bg!=undefined){return bg;}
;bg=bd.settings.version;if(bg!=undefined){return bg;}
;}
catch(bi){return B;}
;return B;}
else {var bh=navigator.plugins;var bf=/([0-9]\.[0-9])/g;for(var i=0;i<bh.length;i++){var be=bh[i];for(var j=0;j<bb.length;j++){if(be.name.indexOf(bb[j])!==-1){if(bf.test(be.name)||bf.test(be.description)){return RegExp.$1;}
;}
;}
;}
;return B;}
;}
,__iP:function(bj,bk){if(qx.bom.client.Engine.getName()==z){var bl=window.ActiveXObject;if(!bl){return false;}
;try{new ActiveXObject(bj);}
catch(bn){return false;}
;return true;}
else {var bm=navigator.plugins;if(!bm){return false;}
;var name;for(var i=0;i<bm.length;i++){name=bm[i].name;for(var j=0;j<bk.length;j++){if(name.indexOf(bk[j])!==-1){return true;}
;}
;}
;return false;}
;}
},defer:function(bo){qx.core.Environment.add(G,bo.getGears);qx.core.Environment.add(F,bo.getQuicktime);qx.core.Environment.add(o,bo.getQuicktimeVersion);qx.core.Environment.add(d,bo.getWindowsMedia);qx.core.Environment.add(E,bo.getWindowsMediaVersion);qx.core.Environment.add(L,bo.getDivX);qx.core.Environment.add(s,bo.getDivXVersion);qx.core.Environment.add(b,bo.getSilverlight);qx.core.Environment.add(l,bo.getSilverlightVersion);qx.core.Environment.add(u,bo.getPdf);qx.core.Environment.add(r,bo.getPdfVersion);qx.core.Environment.add(n,bo.getActiveX);qx.core.Environment.add(H,bo.getSkype);}
});}
)();
(function(){var s='<\?xml version="1.0" encoding="utf-8"?>\n<',r="qx.xml.Document",q=" />",p="xml.domparser",o="SelectionLanguage",n="'",m="MSXML2.XMLHTTP.3.0",k="MSXML2.XMLHTTP.6.0",j="xml.implementation",h=" xmlns='",c="text/xml",g="XPath",f="MSXML2.DOMDocument.6.0",b="HTML",a="MSXML2.DOMDocument.3.0",e="",d="plugin.activex";qx.Class.define(r,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(t){if(t.nodeType===9){return t.documentElement.nodeName!==b;}
else if(t.ownerDocument){return this.isXmlDocument(t.ownerDocument);}
else {return false;}
;}
,create:function(u,v){if(qx.core.Environment.get(d)){var w=new ActiveXObject(this.DOMDOC);if(this.DOMDOC==a){w.setProperty(o,g);}
;if(v){var x=s;x+=v;if(u){x+=h+u+n;}
;x+=q;w.loadXML(x);}
;return w;}
;if(qx.core.Environment.get(j)){return document.implementation.createDocument(u||e,v||e,null);}
;throw new Error("No XML implementation available!");}
,fromString:function(y){if(qx.core.Environment.get(d)){var A=qx.xml.Document.create();A.loadXML(y);return A;}
;if(qx.core.Environment.get(p)){var z=new DOMParser();return z.parseFromString(y,c);}
;throw new Error("No XML implementation available!");}
},defer:function(B){if(qx.core.Environment.get(d)){var C=[f,a];var D=[k,m];for(var i=0,l=C.length;i<l;i++){try{new ActiveXObject(C[i]);new ActiveXObject(D[i]);}
catch(E){continue;}
;B.DOMDOC=C[i];B.XMLHTTP=D[i];break;}
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
(function(){var x="borderBottomWidth",w="engine.name",v="borderTopWidth",u="top",r="borderLeftStyle",q="overflow",p="right",o="bottom",n="100px",m="-moz-scrollbars-vertical",f="borderRightStyle",l="hidden",i="div",d="left",b="qx.bom.element.Scroll",h="visible",g="none",j="borderLeftWidth",a="borderRightWidth",k="overflowY",e="scroll";qx.Class.define(b,{statics:{__iQ:null,getScrollbarWidth:function(){if(this.__iQ!==null){return this.__iQ;}
;var y=qx.bom.element.Style;var A=function(E,F){return parseInt(y.get(E,F),10)||0;}
;var B=function(G){return (y.get(G,f)==g?0:A(G,a));}
;var z=function(H){return (y.get(H,r)==g?0:A(H,j));}
;var D=qx.core.Environment.select(w,{"mshtml":function(I){if(y.get(I,k)==l||I.clientWidth==0){return B(I);}
;return Math.max(0,I.offsetWidth-I.clientLeft-I.clientWidth);}
,"default":function(J){if(J.clientWidth==0){var K=y.get(J,q);var L=(K==e||K==m?16:0);return Math.max(0,B(J)+L);}
;return Math.max(0,(J.offsetWidth-J.clientWidth-z(J)));}
});var C=function(M){return D(M)-B(M);}
;var t=document.createElement(i);var s=t.style;s.height=s.width=n;s.overflow=e;document.body.appendChild(t);var c=C(t);this.__iQ=c;document.body.removeChild(t);return this.__iQ;}
,intoViewX:function(N,stop,O){var parent=N.parentNode;var T=qx.dom.Node.getDocument(N);var P=T.body;var bc,ba,W;var be,U,bf;var X,bg,bj;var bh,R,bb,Q;var V,bi,Y;var S=O===d;var bd=O===p;stop=stop?stop.parentNode:T;while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===P||qx.bom.element.Style.get(parent,k)!=h)){if(parent===P){ba=parent.scrollLeft;W=ba+qx.bom.Viewport.getWidth();be=qx.bom.Viewport.getWidth();U=parent.clientWidth;bf=parent.scrollWidth;X=0;bg=0;bj=0;}
else {bc=qx.bom.element.Location.get(parent);ba=bc.left;W=bc.right;be=parent.offsetWidth;U=parent.clientWidth;bf=parent.scrollWidth;X=parseInt(qx.bom.element.Style.get(parent,j),10)||0;bg=parseInt(qx.bom.element.Style.get(parent,a),10)||0;bj=be-U-X-bg;}
;bh=qx.bom.element.Location.get(N);R=bh.left;bb=bh.right;Q=N.offsetWidth;V=R-ba-X;bi=bb-W+bg;Y=0;if(S){Y=V;}
else if(bd){Y=bi+bj;}
else if(V<0||Q>U){Y=V;}
else if(bi>0){Y=bi+bj;}
;parent.scrollLeft+=Y;qx.event.Registration.fireNonBubblingEvent(parent,e);}
;if(parent===P){break;}
;parent=parent.parentNode;}
;}
,intoViewY:function(bk,stop,bl){var parent=bk.parentNode;var br=qx.dom.Node.getDocument(bk);var bm=br.body;var bz,bn,bv;var bB,by,bt;var bp,bq,bo;var bD,bE,bA,bu;var bx,bs,bF;var bC=bl===u;var bw=bl===o;stop=stop?stop.parentNode:br;while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===bm||qx.bom.element.Style.get(parent,k)!=h)){if(parent===bm){bn=parent.scrollTop;bv=bn+qx.bom.Viewport.getHeight();bB=qx.bom.Viewport.getHeight();by=parent.clientHeight;bt=parent.scrollHeight;bp=0;bq=0;bo=0;}
else {bz=qx.bom.element.Location.get(parent);bn=bz.top;bv=bz.bottom;bB=parent.offsetHeight;by=parent.clientHeight;bt=parent.scrollHeight;bp=parseInt(qx.bom.element.Style.get(parent,v),10)||0;bq=parseInt(qx.bom.element.Style.get(parent,x),10)||0;bo=bB-by-bp-bq;}
;bD=qx.bom.element.Location.get(bk);bE=bD.top;bA=bD.bottom;bu=bk.offsetHeight;bx=bE-bn-bp;bs=bA-bv+bq;bF=0;if(bC){bF=bx;}
else if(bw){bF=bs+bo;}
else if(bx<0||bu>by){bF=bx;}
else if(bs>0){bF=bs+bo;}
;parent.scrollTop+=bF;qx.event.Registration.fireNonBubblingEvent(parent,e);}
;if(parent===bm){break;}
;parent=parent.parentNode;}
;}
,intoView:function(bG,stop,bH,bI){this.intoViewX(bG,stop,bH);this.intoViewY(bG,stop,bI);}
}});}
)();
(function(){var i="useraction",h="touchend",g='ie',f="browser.version",d="event.touch",c="qx.ui.core.queue.Manager",b="browser.name",a="qx.debug.ui.queue";qx.Class.define(c,{statics:{__iR:false,__iS:{},__iT:0,MAX_RETRIES:10,scheduleFlush:function(j){var self=qx.ui.core.queue.Manager;self.__iS[j]=true;if(!self.__iR){self.__gH.schedule();self.__iR=true;}
;}
,flush:function(){if(qx.ui.core.queue.Manager.PAUSE){return;}
;var self=qx.ui.core.queue.Manager;if(self.__iU){return;}
;self.__iU=true;self.__gH.cancel();var k=self.__iS;self.__iV(function(){while(k.visibility||k.widget||k.appearance||k.layout||k.element){if(k.widget){delete k.widget;if(qx.core.Environment.get(a)){try{qx.ui.core.queue.Widget.flush();}
catch(e){qx.log.Logger.error(qx.ui.core.queue.Widget,"Error in the 'Widget' queue:"+e,e);}
;}
else {qx.ui.core.queue.Widget.flush();}
;}
;if(k.visibility){delete k.visibility;if(qx.core.Environment.get(a)){try{qx.ui.core.queue.Visibility.flush();}
catch(e){qx.log.Logger.error(qx.ui.core.queue.Visibility,"Error in the 'Visibility' queue:"+e,e);}
;}
else {qx.ui.core.queue.Visibility.flush();}
;}
;if(k.appearance){delete k.appearance;if(qx.core.Environment.get(a)){try{qx.ui.core.queue.Appearance.flush();}
catch(e){qx.log.Logger.error(qx.ui.core.queue.Appearance,"Error in the 'Appearance' queue:"+e,e);}
;}
else {qx.ui.core.queue.Appearance.flush();}
;}
;if(k.widget||k.visibility||k.appearance){continue;}
;if(k.layout){delete k.layout;if(qx.core.Environment.get(a)){try{qx.ui.core.queue.Layout.flush();}
catch(e){qx.log.Logger.error(qx.ui.core.queue.Layout,"Error in the 'Layout' queue:"+e,e);}
;}
else {qx.ui.core.queue.Layout.flush();}
;}
;if(k.widget||k.visibility||k.appearance||k.layout){continue;}
;if(k.element){delete k.element;qx.html.Element.flush();}
;}
;}
,function(){self.__iR=false;}
);self.__iV(function(){if(k.dispose){delete k.dispose;if(qx.core.Environment.get(a)){try{qx.ui.core.queue.Dispose.flush();}
catch(e){qx.log.Logger.error("Error in the 'Dispose' queue:"+e);}
;}
else {qx.ui.core.queue.Dispose.flush();}
;}
;}
,function(){self.__iU=false;}
);self.__iT=0;}
,__iV:function(l,m){var self=qx.ui.core.queue.Manager;try{l();}
catch(e){{}
;self.__iR=false;self.__iU=false;self.__iT+=1;if(qx.core.Environment.get(b)==g&&qx.core.Environment.get(f)<=7){m();}
;if(self.__iT<=self.MAX_RETRIES){self.scheduleFlush();}
else {throw new Error("Fatal Error: Flush terminated "+(self.__iT-1)+" times in a row"+" due to exceptions in user code. The application has to be reloaded!");}
;throw e;}
finally{m();}
;}
,__iW:function(e){var n=qx.ui.core.queue.Manager;if(e.getData()==h){n.PAUSE=true;if(n.__iX){window.clearTimeout(n.__iX);}
;n.__iX=window.setTimeout(function(){n.PAUSE=false;n.__iX=null;n.flush();}
,500);}
else {n.flush();}
;}
},defer:function(o){o.__gH=new qx.util.DeferredCall(o.flush);qx.html.Element._scheduleFlush=o.scheduleFlush;qx.event.Registration.addListener(window,i,qx.core.Environment.get(d)?o.__iW:o.flush);}
});}
)();
(function(){var c="qx.ui.core.queue.Widget",b="widget",a="$$default";qx.Class.define(c,{statics:{__dK:[],__iS:{},remove:function(d,e){var f=this.__dK;if(!qx.lang.Array.contains(f,d)){return;}
;var g=d.$$hash;if(e==null){qx.lang.Array.remove(f,d);delete this.__iS[g];return;}
;if(this.__iS[g]){delete this.__iS[g][e];if(qx.lang.Object.getLength(this.__iS[g])==0){qx.lang.Array.remove(f,d);}
;}
;}
,add:function(h,j){var k=this.__dK;if(!qx.lang.Array.contains(k,h)){k.unshift(h);}
;if(j==null){j=a;}
;var l=h.$$hash;if(!this.__iS[l]){this.__iS[l]={};}
;this.__iS[l][j]=true;qx.ui.core.queue.Manager.scheduleFlush(b);}
,flush:function(){var m=this.__dK;var o,n;for(var i=m.length-1;i>=0;i--){o=m[i];n=this.__iS[o.$$hash];m.splice(i,1);o.syncWidget(n);}
;if(m.length!=0){return;}
;this.__dK=[];this.__iS={};}
}});}
)();
(function(){var b="qx.ui.core.queue.Visibility",a="visibility";qx.Class.define(b,{statics:{__dK:[],__cR:{},remove:function(c){delete this.__cR[c.$$hash];qx.lang.Array.remove(this.__dK,c);}
,isVisible:function(d){return this.__cR[d.$$hash]||false;}
,__iY:function(e){var g=this.__cR;var f=e.$$hash;var h;if(e.isExcluded()){h=false;}
else {var parent=e.$$parent;if(parent){h=this.__iY(parent);}
else {h=e.isRootWidget();}
;}
;return g[f]=h;}
,add:function(j){var k=this.__dK;if(qx.lang.Array.contains(k,j)){return;}
;k.unshift(j);qx.ui.core.queue.Manager.scheduleFlush(a);}
,flush:function(){var o=this.__dK;var p=this.__cR;for(var i=o.length-1;i>=0;i--){var n=o[i].$$hash;if(p[n]!=null){o[i].addChildrenToQueue(o);}
;}
;var l={};for(var i=o.length-1;i>=0;i--){var n=o[i].$$hash;l[n]=p[n];p[n]=null;}
;for(var i=o.length-1;i>=0;i--){var m=o[i];var n=m.$$hash;o.splice(i,1);if(p[n]==null){this.__iY(m);}
;if(p[n]&&p[n]!=l[n]){m.checkAppearanceNeeds();}
;}
;this.__dK=[];}
}});}
)();
(function(){var b="appearance",a="qx.ui.core.queue.Appearance";qx.Class.define(a,{statics:{__dK:[],remove:function(c){qx.lang.Array.remove(this.__dK,c);}
,add:function(d){var e=this.__dK;if(qx.lang.Array.contains(e,d)){return;}
;e.unshift(d);qx.ui.core.queue.Manager.scheduleFlush(b);}
,has:function(f){return qx.lang.Array.contains(this.__dK,f);}
,flush:function(){var j=qx.ui.core.queue.Visibility;var g=this.__dK;var h;for(var i=g.length-1;i>=0;i--){h=g[i];g.splice(i,1);if(j.isVisible(h)){h.syncAppearance();}
else {h.$$stateChanges=true;}
;}
;}
}});}
)();
(function(){var b="qx.ui.core.queue.Layout",a="layout";qx.Class.define(b,{statics:{__dK:{},__eU:{},remove:function(c){delete this.__dK[c.$$hash];}
,add:function(d){this.__dK[d.$$hash]=d;qx.ui.core.queue.Manager.scheduleFlush(a);}
,isScheduled:function(e){return !!this.__dK[e.$$hash];}
,flush:function(){var f=this.__eW();for(var i=f.length-1;i>=0;i--){var g=f[i];if(g.hasValidLayout()){continue;}
;if(g.isRootWidget()&&!g.hasUserBounds()){var j=g.getSizeHint();g.renderLayout(0,0,j.width,j.height);}
else {var h=g.getBounds();g.renderLayout(h.left,h.top,h.width,h.height);}
;}
;}
,getNestingLevel:function(k){var l=this.__eU;var n=0;var parent=k;while(true){if(l[parent.$$hash]!=null){n+=l[parent.$$hash];break;}
;if(!parent.$$parent){break;}
;parent=parent.$$parent;n+=1;}
;var m=n;while(k&&k!==parent){l[k.$$hash]=m--;k=k.$$parent;}
;return n;}
,__eV:function(){var t=qx.ui.core.queue.Visibility;this.__eU={};var s=[];var r=this.__dK;var o,q;for(var p in r){o=r[p];if(t.isVisible(o)){q=this.getNestingLevel(o);if(!s[q]){s[q]={};}
;s[q][p]=o;delete r[p];}
;}
;return s;}
,__eW:function(){var x=[];var z=this.__eV();for(var w=z.length-1;w>=0;w--){if(!z[w]){continue;}
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
(function(){var m="_applyTheme",l="",k="_",j="qx.ui.decoration.dynamic.",h="qx.theme.manager.Decoration",g=".",f="Theme",e="changeTheme",d="string",c="singleton",a="__dl",b="object";qx.Class.define(h,{type:c,extend:qx.core.Object,properties:{theme:{check:f,nullable:true,apply:m,event:e}},members:{__dl:null,resolve:function(n){if(!n){return null;}
;if(typeof n===b){return n;}
;var s=this.getTheme();if(!s){return null;}
;var p=this.__dl;if(!p){p=this.__dl={};}
;var o=p[n];if(o){return o;}
;var v=qx.lang.Object.clone(s.decorations[n],true);if(!v){return null;}
;if(!v.style){v.style={};}
;var q=v;while(q.include){q=s.decorations[q.include];if(!v.decorator&&q.decorator){v.decorator=qx.lang.Object.clone(q.decorator);}
;if(q.style){for(var u in q.style){if(v.style[u]==undefined){v.style[u]=qx.lang.Object.clone(q.style[u],true);}
;}
;}
;}
;var r=v.decorator;if(r==null){throw new Error("Missing definition of which decorator to use in entry: "+n+"!");}
;if(r instanceof Array){var t=r.concat([]);for(var i=0;i<t.length;i++){t[i]=t[i].basename.replace(g,l);}
;var name=j+t.join(k);if(!qx.Class.getByName(name)){qx.Class.define(name,{extend:qx.ui.decoration.DynamicDecorator,include:r});}
;r=qx.Class.getByName(name);}
;return p[n]=(new r).set(v.style);}
,isValidPropertyValue:function(w){if(typeof w===d){return this.isDynamic(w);}
else if(typeof w===b){var x=w.constructor;return qx.Class.hasInterface(x,qx.ui.decoration.IDecorator);}
;return false;}
,isDynamic:function(y){if(!y){return false;}
;var z=this.getTheme();if(!z){return false;}
;return !!z.decorations[y];}
,isCached:function(A){return !this.__dl?false:qx.lang.Object.contains(this.__dl,A);}
,_applyTheme:function(B,C){var E=qx.util.AliasManager.getInstance();if(C){for(var D in C.aliases){E.remove(D);}
;}
;if(B){for(var D in B.aliases){E.add(D,B.aliases[D]);}
;}
;this._disposeMap(a);this.__dl={};}
},destruct:function(){this._disposeMap(a);}
});}
)();
(function(){var i="abstract",h="insetRight",g="insetTop",f="insetBottom",e="qx.ui.decoration.Abstract",d="shorthand",c="insetLeft",b="Number",a="_applyInsets";qx.Class.define(e,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:i,properties:{insetLeft:{check:b,nullable:true,apply:a},insetRight:{check:b,nullable:true,apply:a},insetBottom:{check:b,nullable:true,apply:a},insetTop:{check:b,nullable:true,apply:a},insets:{group:[g,h,f,c],mode:d}},members:{__dn:null,_getDefaultInsets:function(){throw new Error("Abstract method called.");}
,_isInitialized:function(){throw new Error("Abstract method called.");}
,_resetInsets:function(){this.__dn=null;}
,getInsets:function(){if(this.__dn){return this.__dn;}
;var j=this._getDefaultInsets();return this.__dn={left:this.getInsetLeft()==null?j.left:this.getInsetLeft(),right:this.getInsetRight()==null?j.right:this.getInsetRight(),bottom:this.getInsetBottom()==null?j.bottom:this.getInsetBottom(),top:this.getInsetTop()==null?j.top:this.getInsetTop()};}
,_applyInsets:function(){{}
;this.__dn=null;}
},destruct:function(){this.__dn=null;}
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
(function(){var j="0",i="qx/static",h="http://",g="https://",f="file://",e="qx.util.AliasManager",d="singleton",c=".",b="static",a="/";qx.Class.define(e,{type:d,extend:qx.util.ValueManager,construct:function(){qx.util.ValueManager.call(this);this.__dC={};this.add(b,i);}
,members:{__dC:null,_preprocess:function(k){var n=this._getDynamic();if(n[k]===false){return k;}
else if(n[k]===undefined){if(k.charAt(0)===a||k.charAt(0)===c||k.indexOf(h)===0||k.indexOf(g)===j||k.indexOf(f)===0){n[k]=false;return k;}
;if(this.__dC[k]){return this.__dC[k];}
;var m=k.substring(0,k.indexOf(a));var l=this.__dC[m];if(l!==undefined){n[k]=l+k.substring(m.length);}
;}
;return k;}
,add:function(o,p){this.__dC[o]=p;var r=this._getDynamic();for(var q in r){if(q.substring(0,q.indexOf(a))===o){r[q]=p+q.substring(o.length);}
;}
;}
,remove:function(s){delete this.__dC[s];}
,resolve:function(t){var u=this._getDynamic();if(t!=null){t=this._preprocess(t);}
;return u[t]||t;}
,getAliases:function(){var v={};for(var w in this.__dC){v[w]=this.__dC[w];}
;return v;}
},destruct:function(){this.__dC=null;}
});}
)();
(function(){var k="_applyItalic",j="_applyBold",h="_applyTextShadow",g="Integer",f="_applyFamily",e="_applyLineHeight",d="Array",c="line-through",b="overline",a="Color",B="String",A="qx.bom.Font",z="Number",y="_applyDecoration",x=" ",w="_applySize",v=",",u="_applyColor",t="Boolean",s="px",q='"',r="italic",o="normal",p="bold",m="underline",n="";qx.Class.define(A,{extend:qx.core.Object,construct:function(C,D){qx.core.Object.call(this);this.__dF={fontFamily:n,fontSize:null,fontWeight:null,fontStyle:null,textDecoration:null,lineHeight:null,color:null,textShadow:null};if(C!==undefined){this.setSize(C);}
;if(D!==undefined){this.setFamily(D);}
;}
,statics:{fromString:function(E){var I=new qx.bom.Font();var G=E.split(/\s+/);var name=[];var H;for(var i=0;i<G.length;i++){switch(H=G[i]){case p:I.setBold(true);break;case r:I.setItalic(true);break;case m:I.setDecoration(m);break;default:var F=parseInt(H,10);if(F==H||qx.lang.String.contains(H,s)){I.setSize(F);}
else {name.push(H);}
;break;};}
;if(name.length>0){I.setFamily(name);}
;return I;}
,fromConfig:function(J){var K=new qx.bom.Font;K.set(J);return K;}
,__dG:{fontFamily:n,fontSize:n,fontWeight:n,fontStyle:n,textDecoration:n,lineHeight:1.2,color:n,textShadow:n},getDefaultStyles:function(){return this.__dG;}
},properties:{size:{check:g,nullable:true,apply:w},lineHeight:{check:z,nullable:true,apply:e},family:{check:d,nullable:true,apply:f},bold:{check:t,nullable:true,apply:j},italic:{check:t,nullable:true,apply:k},decoration:{check:[m,c,b],nullable:true,apply:y},color:{check:a,nullable:true,apply:u},textShadow:{nullable:true,check:B,apply:h}},members:{__dF:null,_applySize:function(L,M){this.__dF.fontSize=L===null?null:L+s;}
,_applyLineHeight:function(N,O){this.__dF.lineHeight=N===null?null:N;}
,_applyFamily:function(P,Q){var R=n;for(var i=0,l=P.length;i<l;i++){if(P[i].indexOf(x)>0){R+=q+P[i]+q;}
else {R+=P[i];}
;if(i!==l-1){R+=v;}
;}
;this.__dF.fontFamily=R;}
,_applyBold:function(S,T){this.__dF.fontWeight=S==null?null:S?p:o;}
,_applyItalic:function(U,V){this.__dF.fontStyle=U==null?null:U?r:o;}
,_applyDecoration:function(W,X){this.__dF.textDecoration=W==null?null:W;}
,_applyColor:function(Y,ba){this.__dF.color=null;if(Y){this.__dF.color=qx.theme.manager.Color.getInstance().resolve(Y);}
;}
,_applyTextShadow:function(bb,bc){this.__dF.textShadow=bb==null?null:bb;}
,getStyles:function(){return this.__dF;}
}});}
)();
(function(){var f="_applyTheme",e="qx.theme.manager.Color",d="Theme",c="changeTheme",b="string",a="singleton";qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:f,event:c}},members:{_applyTheme:function(g){var h={};if(g){var i=g.colors;for(var name in i){h[name]=this.__dg(i,name);}
;}
;this._setDynamic(h);}
,__dg:function(j,name){var k=j[name];if(typeof k===b){if(!qx.util.ColorUtil.isCssString(k)){if(j[k]!=undefined){return this.__dg(j,k);}
;throw new Error("Could not parse color: "+k);}
;return k;}
else if(k instanceof Array){return qx.util.ColorUtil.rgbToRgbString(k);}
;throw new Error("Could not parse color: "+k);}
,resolve:function(l){var o=this._dynamic;var m=o[l];if(m){return m;}
;var n=this.getTheme();if(n!==null&&n.colors[l]){return o[l]=n.colors[l];}
;return l;}
,isDynamic:function(p){var r=this._dynamic;if(p&&(r[p]!==undefined)){return true;}
;var q=this.getTheme();if(q!==null&&p&&(q.colors[p]!==undefined)){r[p]=q.colors[p];return true;}
;return false;}
}});}
)();
(function(){var f="_applyTheme",e="qx.theme.manager.Font",d="_dynamic",c="Theme",b="changeTheme",a="singleton";qx.Class.define(e,{type:a,extend:qx.util.ValueManager,properties:{theme:{check:c,nullable:true,apply:f,event:b}},members:{resolveDynamic:function(g){var h=this._dynamic;return g instanceof qx.bom.Font?g:h[g];}
,resolve:function(i){var l=this._dynamic;var j=l[i];if(j){return j;}
;var k=this.getTheme();if(k!==null&&k.fonts[i]){var m=this.__dE(k.fonts[i]);return l[i]=(new m).set(k.fonts[i]);}
;return i;}
,isDynamic:function(n){var q=this._dynamic;if(n&&(n instanceof qx.bom.Font||q[n]!==undefined)){return true;}
;var p=this.getTheme();if(p!==null&&n&&p.fonts[n]){var o=this.__dE(p.fonts[n]);q[n]=(new o).set(p.fonts[n]);return true;}
;return false;}
,__dD:function(r,s){if(r[s].include){var t=r[r[s].include];r[s].include=null;delete r[s].include;r[s]=qx.lang.Object.mergeWith(r[s],t,false);this.__dD(r,s);}
;}
,_applyTheme:function(u){var v=this._dynamic;for(var y in v){if(v[y].themed){v[y].dispose();delete v[y];}
;}
;if(u){var w=u.fonts;for(var y in w){if(w[y].include&&w[w[y].include]){this.__dD(w,y);}
;var x=this.__dE(w[y]);v[y]=(new x).set(w[y]);v[y].themed=true;}
;}
;this._setDynamic(v);}
,__dE:function(z){if(z.sources){return qx.bom.webfonts.WebFont;}
;return qx.bom.Font;}
},destruct:function(){this._disposeMap(d);}
});}
)();
(function(){var e="changeStatus",d="qx.bom.webfonts.WebFont",c="_applySources",b="",a="qx.event.type.Data";qx.Class.define(d,{extend:qx.bom.Font,events:{"changeStatus":a},properties:{sources:{nullable:true,apply:c}},members:{__dH:null,_applySources:function(f,g){var k=[];for(var i=0,l=f.length;i<l;i++){var j=this._quoteFontFamily(f[i].family);k.push(j);var h=f[i].source;qx.bom.webfonts.Manager.getInstance().require(j,h,this._onWebFontChangeStatus,this);}
;this.setFamily(k.concat(this.getFamily()));}
,_onWebFontChangeStatus:function(m){var n=m.getData();this.fireDataEvent(e,n);{}
;}
,_quoteFontFamily:function(o){return o.replace(/["']/g,b);}
}});}
)();
(function(){var n="m",k="os.name",h=")",g="qx.bom.webfonts.Manager",f="singleton",e=",\n",d="src: ",c="mobileSafari",b="'eot)",a="');",Y="@font-face {",X="interval",W="}\n",V="font-family: ",U="mobile safari",T="safari",S="@font-face.*?",R=";\n",Q="') format('woff')",P="('embedded-opentype')",u="browser.version",v="opera",s="\.(",t="os.version",q="') format('svg')",r="'eot')",o="src: url('",p="('embedded-opentype)",w="\nfont-style: normal;\nfont-weight: normal;",y="?#iefix') format('embedded-opentype')",F=";",D="') format('truetype')",J="changeStatus",H="svg",L="#",K="chrome",A="firefox",O="eot",N="ios",M="ttf",z="woff",B="browser.documentmode",C="browser.name",E="url('",G="ie",I="";qx.Class.define(g,{extend:qx.core.Object,type:f,construct:function(){qx.core.Object.call(this);this.__dI=[];this.__dJ={};this.__dK=[];this.__dL=this.getPreferredFormats();}
,statics:{FONT_FORMATS:["eot","woff","ttf","svg"],VALIDATION_TIMEOUT:5000},members:{__dI:null,__dM:null,__dJ:null,__dL:null,__dK:null,__dN:null,require:function(ba,bb,bc,bd){var be=[];for(var i=0,l=bb.length;i<l;i++){var bg=bb[i].split(L);var bf=qx.util.ResourceManager.getInstance().toUri(bg[0]);if(bg.length>1){bf=bf+L+bg[1];}
;be.push(bf);}
;if(!(qx.core.Environment.get(C)==G&&qx.bom.client.Browser.getVersion()<9)){this.__dO(ba,be,bc,bd);return;}
;if(!this.__dN){this.__dN=new qx.event.Timer(100);this.__dN.addListener(X,this.__dP,this);}
;if(!this.__dN.isEnabled()){this.__dN.start();}
;this.__dK.push([ba,be,bc,bd]);}
,remove:function(bh){var bi=null;for(var i=0,l=this.__dI.length;i<l;i++){if(this.__dI[i]==bh){bi=i;this.__dV(bh);break;}
;}
;if(bi){qx.lang.Array.removeAt(this.__dI,bi);}
;if(bh in this.__dJ){this.__dJ[bh].dispose();delete this.__dJ[bh];}
;}
,getPreferredFormats:function(){var bj=[];var bn=qx.core.Environment.get(C);var bk=qx.core.Environment.get(u);var bm=qx.core.Environment.get(k);var bl=qx.core.Environment.get(t);if((bn==G&&qx.core.Environment.get(B)>=9)||(bn==A&&bk>=3.6)||(bn==K&&bk>=6)){bj.push(z);}
;if((bn==v&&bk>=10)||(bn==T&&bk>=3.1)||(bn==A&&bk>=3.5)||(bn==K&&bk>=4)||(bn==U&&bm==N&&bl>=4.2)){bj.push(M);}
;if(bn==G&&bk>=4){bj.push(O);}
;if(bn==c&&bm==N&&bl>=4.1){bj.push(H);}
;return bj;}
,removeStyleSheet:function(){this.__dI=[];if(this.__dM){qx.bom.Stylesheet.removeSheet(this.__dM);}
;this.__dM=null;}
,__dO:function(bo,bp,bq,br){if(!qx.lang.Array.contains(this.__dI,bo)){var bu=this.__dR(bp);var bt=this.__dS(bo,bu);if(!bt){throw new Error("Couldn't create @font-face rule for WebFont "+bo+"!");}
;if(!this.__dM){this.__dM=qx.bom.Stylesheet.createElement();}
;try{this.__dU(bt);}
catch(bv){{}
;}
;this.__dI.push(bo);}
;if(!this.__dJ[bo]){this.__dJ[bo]=new qx.bom.webfonts.Validator(bo);this.__dJ[bo].setTimeout(qx.bom.webfonts.Manager.VALIDATION_TIMEOUT);this.__dJ[bo].addListenerOnce(J,this.__dQ,this);}
;if(bq){var bs=br||window;this.__dJ[bo].addListenerOnce(J,bq,bs);}
;this.__dJ[bo].validate();}
,__dP:function(){if(this.__dK.length==0){this.__dN.stop();return;}
;var bw=this.__dK.shift();this.__dO.apply(this,bw);}
,__dQ:function(bx){var by=bx.getData();if(by.valid===false){qx.event.Timer.once(function(){this.remove(by.family);}
,this,250);}
;}
,__dR:function(bz){var bB=qx.bom.webfonts.Manager.FONT_FORMATS;var bE={};for(var i=0,l=bz.length;i<l;i++){var bC=null;for(var x=0;x<bB.length;x++){var bD=new RegExp(s+bB[x]+h);var bA=bD.exec(bz[i]);if(bA){bC=bA[1];}
;}
;if(bC){bE[bC]=bz[i];}
;}
;return bE;}
,__dS:function(bF,bG){var bJ=[];var bH=this.__dL.length>0?this.__dL:qx.bom.webfonts.Manager.FONT_FORMATS;for(var i=0,l=bH.length;i<l;i++){var bI=bH[i];if(bG[bI]){bJ.push(this.__dT(bI,bG[bI]));}
;}
;var bK=d+bJ.join(e)+F;bK=V+bF+R+bK;bK=bK+w;return bK;}
,__dT:function(bL,bM){switch(bL){case O:return E+bM+a+o+bM+y;case z:return E+bM+Q;case M:return E+bM+D;case H:return E+bM+q;default:return null;};}
,__dU:function(bN){var bP=Y+bN+W;if(qx.core.Environment.get(C)==G&&qx.core.Environment.get(B)<9){var bO=this.__dW(this.__dM.cssText);bO+=bP;this.__dM.cssText=bO;}
else {this.__dM.insertRule(bP,this.__dM.cssRules.length);}
;}
,__dV:function(bQ){var bT=new RegExp(S+bQ,n);for(var i=0,l=document.styleSheets.length;i<l;i++){var bR=document.styleSheets[i];if(bR.cssText){var bS=bR.cssText.replace(/\n/g,I).replace(/\r/g,I);bS=this.__dW(bS);if(bT.exec(bS)){bS=bS.replace(bT,I);}
;bR.cssText=bS;}
else if(bR.cssRules){for(var j=0,m=bR.cssRules.length;j<m;j++){var bS=bR.cssRules[j].cssText.replace(/\n/g,I).replace(/\r/g,I);if(bT.exec(bS)){this.__dM.deleteRule(j);return;}
;}
;}
;}
;}
,__dW:function(bU){return bU.replace(b,r).replace(p,P);}
},destruct:function(){delete this.__dI;this.removeStyleSheet();for(var bV in this.__dJ){this.__dJ[bV].dispose();}
;qx.bom.webfonts.Validator.removeDefaultHelperElements();}
});}
)();
(function(){var b="singleton",a="qx.util.LibraryManager";qx.Class.define(a,{extend:qx.core.Object,type:b,statics:{__dX:qx.$$libraries||{}},members:{has:function(c){return !!this.self(arguments).__dX[c];}
,get:function(d,e){return this.self(arguments).__dX[d][e]?this.self(arguments).__dX[d][e]:null;}
,set:function(f,g,h){this.self(arguments).__dX[f][g]=h;}
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
;return o;}
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
,statics:{__j:qx.$$resources||{},__dY:{}},members:{has:function(r){return !!this.self(arguments).__j[r];}
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
;var H=d;if((qx.core.Environment.get(g)==c)&&qx.core.Environment.get(f)){H=this.self(arguments).__dY[I];}
;return H+qx.util.LibraryManager.getInstance().get(I,e)+a+F;}
,toDataUri:function(J){var L=this.constructor.__j[J];var M=this.constructor.__j[L[4]];var N;if(M){var K=M[4][J];N=l+K[m]+k+K[p]+h+K[n];}
else {N=this.toUri(J);}
;return N;}
},defer:function(O){if((qx.core.Environment.get(g)==c)){if(qx.core.Environment.get(f)){for(var S in qx.$$libraries){var Q;if(qx.util.LibraryManager.getInstance().get(S,e)){Q=qx.util.LibraryManager.getInstance().get(S,e);}
else {O.__dY[S]=d;continue;}
;if(Q.match(/^\/\//)!=null){O.__dY[S]=window.location.protocol;}
else if(Q.match(/^\//)!=null){O.__dY[S]=window.location.protocol+q+window.location.host;}
else if(Q.match(/^\.\//)!=null){var P=document.URL;O.__dY[S]=P.substring(0,P.lastIndexOf(a)+1);}
else if(Q.match(/^http/)!=null){O.__dY[S]=d;}
else {var T=window.location.href.indexOf(o);var R;if(T==-1){R=window.location.href;}
else {R=window.location.href.substring(0,T);}
;O.__dY[S]=R.substring(0,R.lastIndexOf(a)+1);}
;}
;}
;}
;}
});}
)();
(function(){var i="qx.event.type.Data",h="qx.bom.webfonts.Validator",g="_applyFontFamily",f="__em",e="span",d="Integer",c="interval",b="changeStatus",a=",";qx.Class.define(h,{extend:qx.core.Object,construct:function(j){qx.core.Object.call(this);if(j){this.setFontFamily(j);}
;this.__ej=this._getRequestedHelpers();}
,statics:{COMPARISON_FONTS:{sans:["Arial","Helvetica","sans-serif"],serif:["Times New Roman","Georgia","serif"]},HELPER_CSS:{position:"absolute",margin:"0",padding:"0",top:"-1000px",left:"-1000px",fontSize:"350px",width:"auto",height:"auto",lineHeight:"normal",fontVariant:"normal"},COMPARISON_STRING:"WEei",__ek:null,__el:null,removeDefaultHelperElements:function(){var k=qx.bom.webfonts.Validator.__el;if(k){for(var l in k){document.body.removeChild(k[l]);}
;}
;delete qx.bom.webfonts.Validator.__el;}
},properties:{fontFamily:{nullable:true,init:null,apply:g},timeout:{check:d,init:5000}},events:{"changeStatus":i},members:{__ej:null,__em:null,__en:null,validate:function(){this.__en=new Date().getTime();if(this.__em){this.__em.restart();}
else {this.__em=new qx.event.Timer(100);this.__em.addListener(c,this.__eo,this);qx.event.Timer.once(function(){this.__em.start();}
,this,0);}
;}
,_reset:function(){if(this.__ej){for(var n in this.__ej){var m=this.__ej[n];document.body.removeChild(m);}
;this.__ej=null;}
;}
,_isFontValid:function(){if(!qx.bom.webfonts.Validator.__ek){this.__bf();}
;if(!this.__ej){this.__ej=this._getRequestedHelpers();}
;var p=qx.bom.element.Dimension.getWidth(this.__ej.sans);var o=qx.bom.element.Dimension.getWidth(this.__ej.serif);var q=qx.bom.webfonts.Validator;if(p!==q.__ek.sans&&o!==q.__ek.serif){return true;}
;return false;}
,_getRequestedHelpers:function(){var r=[this.getFontFamily()].concat(qx.bom.webfonts.Validator.COMPARISON_FONTS.sans);var s=[this.getFontFamily()].concat(qx.bom.webfonts.Validator.COMPARISON_FONTS.serif);return {sans:this._getHelperElement(r),serif:this._getHelperElement(s)};}
,_getHelperElement:function(t){var u=qx.lang.Object.clone(qx.bom.webfonts.Validator.HELPER_CSS);if(t){if(u.fontFamily){u.fontFamily+=a+t.join(a);}
else {u.fontFamily=t.join(a);}
;}
;var v=document.createElement(e);v.innerHTML=qx.bom.webfonts.Validator.COMPARISON_STRING;qx.bom.element.Style.setStyles(v,u);document.body.appendChild(v);return v;}
,_applyFontFamily:function(w,x){if(w!==x){this._reset();}
;}
,__bf:function(){var y=qx.bom.webfonts.Validator;if(!y.__el){y.__el={sans:this._getHelperElement(y.COMPARISON_FONTS.sans),serif:this._getHelperElement(y.COMPARISON_FONTS.serif)};}
;y.__ek={sans:qx.bom.element.Dimension.getWidth(y.__el.sans),serif:qx.bom.element.Dimension.getWidth(y.__el.serif)};}
,__eo:function(){if(this._isFontValid()){this.__em.stop();this._reset();this.fireDataEvent(b,{family:this.getFontFamily(),valid:true});}
else {var z=new Date().getTime();if(z-this.__en>=this.getTimeout()){this.__em.stop();this._reset();this.fireDataEvent(b,{family:this.getFontFamily(),valid:false});}
;}
;}
},destruct:function(){this._reset();this.__em.stop();this.__em.removeListener(c,this.__eo,this);this._disposeObjects(f);}
});}
)();
(function(){var g="Iterations: ",f="\n",e="Time: ",d="Render time: ",c="Measured: ",b="qx.dev.unit.MeasurementResult",a="ms";qx.Class.define(b,{extend:Object,construct:function(h,i,j,k){this.__md=h;this.__mi=i;this.__mj=j;this.__mk=k;}
,members:{__md:null,__mi:null,__mj:null,__mk:null,toString:function(){return [c+this.__md,g+this.__mi,e+this.__mj+a,d+this.__mk+a].join(f);}
}});}
)();
(function(){var c="$test_",b="_",a="qx.dev.unit.JsUnitTestResult";qx.Class.define(a,{extend:qx.dev.unit.TestResult,construct:function(){qx.dev.unit.TestResult.call(this);this.__ml=[];}
,members:{__ml:null,run:function(d,e){var f=c+d.getFullName().replace(/\W/g,b);this.__ml.push(f);window[f]=e;}
,exportToJsUnit:function(){var self=this;window.exposeTestFunctionNames=function(){return self.__ml;}
;window.isTestPageLoaded=true;}
}});}
)();
(function(){var a="qx.locale.MTranslation";qx.Mixin.define(a,{members:{tr:function(b,c){var d=qx.locale.Manager;if(d){return d.tr.apply(d,arguments);}
;throw new Error("To enable localization please include qx.locale.Manager into your build!");}
,trn:function(e,f,g,h){var i=qx.locale.Manager;if(i){return i.trn.apply(i,arguments);}
;throw new Error("To enable localization please include qx.locale.Manager into your build!");}
,trc:function(j,k,l){var m=qx.locale.Manager;if(m){return m.trc.apply(m,arguments);}
;throw new Error("To enable localization please include qx.locale.Manager into your build!");}
,marktr:function(n){var o=qx.locale.Manager;if(o){return o.marktr.apply(o,arguments);}
;throw new Error("To enable localization please include qx.locale.Manager into your build!");}
}});}
)();
(function(){var a="qx.application.IApplication";qx.Interface.define(a,{members:{main:function(){}
,finalize:function(){}
,close:function(){}
,terminate:function(){}
}});}
)();
(function(){var g="qx.core.BaseInit",f="engine.name",d="testrunner.TestLoader",c="os.name",b="engine.version",a="";qx.Class.define(g,{statics:{__cT:null,getApplication:function(){return this.__cT||null;}
,ready:function(){if(this.__cT){return;}
;if(qx.core.Environment.get(f)==a){qx.log.Logger.warn("Could not detect engine!");}
;if(qx.core.Environment.get(b)==a){qx.log.Logger.warn("Could not detect the version of the engine!");}
;if(qx.core.Environment.get(c)==a){qx.log.Logger.warn("Could not detect operating system!");}
;qx.log.Logger.debug(this,"Load runtime: "+(new Date-qx.Bootstrap.LOADSTART)+"ms");var i=d;var j=qx.Class.getByName(i);if(j){this.__cT=new j;var h=new Date;this.__cT.main();qx.log.Logger.debug(this,"Main runtime: "+(new Date-h)+"ms");var h=new Date;this.__cT.finalize();qx.log.Logger.debug(this,"Finalize runtime: "+(new Date-h)+"ms");}
else {qx.log.Logger.warn("Missing application class: "+i);}
;}
,__cU:function(e){var k=this.__cT;if(k){k.close();}
;}
,__cV:function(){var l=this.__cT;if(l){l.terminate();}
;qx.core.ObjectRegistry.shutdown();}
}});}
)();
(function(){var n="qx.event.handler.Application",m="complete",l="webkit",k="gecko",j="opera",i="left",h="DOMContentLoaded",g="shutdown",f="mshtml",d="load",a="unload",c="ready",b="engine.name";qx.Class.define(n,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(o){qx.core.Object.call(this);this._window=o.getWindow();this.__da=false;this.__db=false;this.__dc=false;this.__dd=false;this._initObserver();qx.event.handler.Application.$$instance=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var p=qx.event.handler.Application.$$instance;if(p){p.__de();}
;}
},members:{canHandleEvent:function(q,r){}
,registerEvent:function(s,t,u){}
,unregisterEvent:function(v,w,x){}
,__dc:null,__da:null,__db:null,__dd:null,__de:function(){if(!this.__dc&&this.__da&&qx.$$loader.scriptLoaded){if((qx.core.Environment.get(b)==f)){if(qx.event.Registration.hasListener(this._window,c)){this.__dc=true;qx.event.Registration.fireEvent(this._window,c);}
;}
else {this.__dc=true;qx.event.Registration.fireEvent(this._window,c);}
;}
;}
,isApplicationReady:function(){return this.__dc;}
,_initObserver:function(){if(qx.$$domReady||document.readyState==m||document.readyState==c){this.__da=true;this.__de();}
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
,_onNativeLoad:qx.event.GlobalError.observeMethod(function(){this.__da=true;this.__de();}
),_onNativeUnload:qx.event.GlobalError.observeMethod(function(){if(!this.__dd){this.__dd=true;try{qx.event.Registration.fireEvent(this._window,g);}
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
(function(){var b="abstract",a="qx.application.AbstractGui";qx.Class.define(a,{type:b,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__df:null,_createRootWidget:function(){throw new Error("Abstract method call");}
,getRoot:function(){return this.__df;}
,main:function(){qx.theme.manager.Meta.getInstance().initialize();qx.ui.tooltip.Manager.getInstance();this.__df=this._createRootWidget();}
,finalize:function(){this.render();}
,render:function(){qx.ui.core.queue.Manager.flush();}
,close:function(c){}
,terminate:function(){}
},destruct:function(){this.__df=null;}
});}
)();
(function(){var f="_applyTheme",e="qx.theme",d="qx.theme.manager.Meta",c="qx.theme.Modern",b="Theme",a="singleton";qx.Class.define(d,{type:a,extend:qx.core.Object,properties:{theme:{check:b,nullable:true,apply:f}},members:{_applyTheme:function(g,h){var k=null;var n=null;var q=null;var r=null;var m=null;if(g){k=g.meta.color||null;n=g.meta.decoration||null;q=g.meta.font||null;r=g.meta.icon||null;m=g.meta.appearance||null;}
;var o=qx.theme.manager.Color.getInstance();var p=qx.theme.manager.Decoration.getInstance();var i=qx.theme.manager.Font.getInstance();var l=qx.theme.manager.Icon.getInstance();var j=qx.theme.manager.Appearance.getInstance();o.setTheme(k);p.setTheme(n);i.setTheme(q);l.setTheme(r);j.setTheme(m);}
,initialize:function(){var u=qx.core.Environment;var s,t;s=u.get(e);if(s){t=qx.Theme.getByName(s);if(!t){throw new Error("The theme to use is not available: "+s);}
;this.setTheme(t);}
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
(function(){var h="_applyTheme",g="qx.theme.manager.Appearance",f=":",e="Theme",d="changeTheme",c="/",b="singleton",a="string";qx.Class.define(g,{type:b,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__eq={};this.__er={};}
,properties:{theme:{check:e,nullable:true,event:d,apply:h}},members:{__es:{},__eq:null,__er:null,_applyTheme:function(j,k){this.__er={};this.__eq={};}
,__et:function(l,m,n){var s=m.appearances;var v=s[l];if(!v){var w=c;var p=[];var u=l.split(w);var t;while(!v&&u.length>0){p.unshift(u.pop());var q=u.join(w);v=s[q];if(v){t=v.alias||v;if(typeof t===a){var r=t+w+p.join(w);return this.__et(r,m,n);}
;}
;}
;for(var i=0;i<p.length-1;i++){p.shift();var q=p.join(w);var o=this.__et(q,m);if(o){return o;}
;}
;if(n!=null){return this.__et(n,m);}
;return null;}
else if(typeof v===a){return this.__et(v,m,n);}
else if(v.include&&!v.style){return this.__et(v.include,m,n);}
;return l;}
,styleFrom:function(x,y,z,A){if(!z){z=this.getTheme();}
;var F=this.__er;var B=F[x];if(!B){B=F[x]=this.__et(x,z,A);}
;var L=z.appearances[B];if(!L){this.warn("Missing appearance: "+x);return null;}
;if(!L.style){return null;}
;var M=B;if(y){var N=L.$$bits;if(!N){N=L.$$bits={};L.$$length=0;}
;var D=0;for(var H in y){if(!y[H]){continue;}
;if(N[H]==null){N[H]=1<<L.$$length++;}
;D+=N[H];}
;if(D>0){M+=f+D;}
;}
;var E=this.__eq;if(E[M]!==undefined){return E[M];}
;if(!y){y=this.__es;}
;var J;if(L.include||L.base){var C;if(L.include){C=this.styleFrom(L.include,y,z,A);}
;var G=L.style(y,C);J={};if(L.base){var I=this.styleFrom(B,y,L.base,A);if(L.include){for(var K in I){if(!C.hasOwnProperty(K)&&!G.hasOwnProperty(K)){J[K]=I[K];}
;}
;}
else {for(var K in I){if(!G.hasOwnProperty(K)){J[K]=I[K];}
;}
;}
;}
;if(L.include){for(var K in C){if(!G.hasOwnProperty(K)){J[K]=C[K];}
;}
;}
;for(var K in G){J[K]=G[K];}
;}
else {J=L.style(y);}
;return E[M]=J||null;}
},destruct:function(){this.__eq=this.__er=null;}
});}
)();
(function(){var q="other",p="widgets",o="undefined",n="fonts",m="appearances",k="qx.Theme",j="]",h="[Theme ",g="colors",f="decorations",c="Theme",e="meta",d="borders",b="icons";qx.Bootstrap.define(k,{statics:{define:function(name,r){if(!r){var r={};}
;r.include=this.__eu(r.include);r.patch=this.__eu(r.patch);{}
;var s={$$type:c,name:name,title:r.title,toString:this.genericToString};if(r.extend){s.supertheme=r.extend;}
;s.basename=qx.Bootstrap.createNamespace(name,s);this.__ex(s,r);this.__ev(s,r);this.$$registry[name]=s;for(var i=0,a=r.include,l=a.length;i<l;i++){this.include(s,a[i]);}
;for(var i=0,a=r.patch,l=a.length;i<l;i++){this.patch(s,a[i]);}
;}
,__eu:function(t){if(!t){return [];}
;if(qx.Bootstrap.isArray(t)){return t;}
else {return [t];}
;}
,__ev:function(u,v){var w=v.aliases||{};if(v.extend&&v.extend.aliases){qx.Bootstrap.objectMergeWith(w,v.extend.aliases,false);}
;u.aliases=w;}
,getAll:function(){return this.$$registry;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,genericToString:function(){return h+this.name+j;}
,__ew:function(x){for(var i=0,y=this.__ey,l=y.length;i<l;i++){if(x[y[i]]){return y[i];}
;}
;}
,__ex:function(z,A){var D=this.__ew(A);if(A.extend&&!D){D=A.extend.type;}
;z.type=D||q;var F=function(){}
;if(A.extend){F.prototype=new A.extend.$$clazz;}
;var E=F.prototype;var C=A[D];for(var B in C){E[B]=C[B];if(E[B].base){{}
;E[B].base=A.extend;}
;}
;z.$$clazz=F;z[D]=new F;}
,$$registry:{},__ey:[g,d,f,n,b,p,m,e],__h:null,__ez:null,__i:function(){}
,patch:function(G,H){this.__eA(H);var J=this.__ew(H);if(J!==this.__ew(G)){throw new Error("The mixins '"+G.name+"' are not compatible '"+H.name+"'!");}
;var I=H[J];var K=G.$$clazz.prototype;for(var L in I){K[L]=I[L];}
;}
,include:function(M,N){this.__eA(N);var P=N.type;if(P!==M.type){throw new Error("The mixins '"+M.name+"' are not compatible '"+N.name+"'!");}
;var O=N[P];var Q=M.$$clazz.prototype;for(var R in O){if(Q[R]!==undefined){continue;}
;Q[R]=O[R];}
;}
,__eA:function(S){if(typeof S===o||S==null){var T;var U=new Error("Mixin theme is not a valid theme!");{}
;throw U;}
;}
}});}
)();
(function(){var q="widget",p="qx.ui.tooltip.ToolTip",o="",n="_applyCurrent",m="qx.ui.tooltip.Manager",l="__eE",k="tooltip-error",j="__eC",i="singleton",h="__eB",c="Boolean",g="interval",f="mouseover",b="mouseout",a="mousemove",d="focusout";qx.Class.define(m,{type:i,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);qx.event.Registration.addListener(document.body,f,this.__eJ,this,true);this.__eB=new qx.event.Timer();this.__eB.addListener(g,this.__eG,this);this.__eC=new qx.event.Timer();this.__eC.addListener(g,this.__eH,this);this.__eD={left:0,top:0};}
,properties:{current:{check:p,nullable:true,apply:n},showInvalidToolTips:{check:c,init:true},showToolTips:{check:c,init:true}},members:{__eD:null,__eC:null,__eB:null,__eE:null,__eF:null,getSharedTooltip:function(){if(!this.__eE){this.__eE=new qx.ui.tooltip.ToolTip().set({rich:true});}
;return this.__eE;}
,getSharedErrorTooltip:function(){if(!this.__eF){this.__eF=new qx.ui.tooltip.ToolTip().set({appearance:k,rich:true});this.__eF.setLabel(o);this.__eF.syncAppearance();}
;return this.__eF;}
,_applyCurrent:function(r,s){if(s&&qx.ui.core.Widget.contains(s,r)){return;}
;if(s){if(!s.isDisposed()){s.exclude();}
;this.__eB.stop();this.__eC.stop();}
;var u=qx.event.Registration;var t=document.body;if(r){this.__eB.startWith(r.getShowTimeout());u.addListener(t,b,this.__eK,this,true);u.addListener(t,d,this.__eL,this,true);u.addListener(t,a,this.__eI,this,true);}
else {u.removeListener(t,b,this.__eK,this,true);u.removeListener(t,d,this.__eL,this,true);u.removeListener(t,a,this.__eI,this,true);}
;}
,__eG:function(e){var v=this.getCurrent();if(v&&!v.isDisposed()){this.__eC.startWith(v.getHideTimeout());if(v.getPlaceMethod()==q){v.placeToWidget(v.getOpener());}
else {v.placeToPoint(this.__eD);}
;v.show();}
;this.__eB.stop();}
,__eH:function(e){var w=this.getCurrent();if(w&&!w.isDisposed()){w.exclude();}
;this.__eC.stop();this.resetCurrent();}
,__eI:function(e){var x=this.__eD;x.left=e.getDocumentLeft();x.top=e.getDocumentTop();}
,__eJ:function(e){var y=qx.ui.core.Widget.getWidgetByElement(e.getTarget());this.showToolTip(y);}
,showToolTip:function(z){if(!z){return;}
;var C,D,B,A;while(z!=null){C=z.getToolTip();D=z.getToolTipText()||null;B=z.getToolTipIcon()||null;if(qx.Class.hasInterface(z.constructor,qx.ui.form.IForm)&&!z.isValid()){A=z.getInvalidMessage();}
;if(C||D||B||A){break;}
;z=z.getLayoutParent();}
;if(!z||!z.getEnabled()||z.isBlockToolTip()||(!A&&!this.getShowToolTips())||(A&&!this.getShowInvalidToolTips())){return;}
;if(A){C=this.getSharedErrorTooltip().set({label:A});}
;if(!C){C=this.getSharedTooltip().set({label:D,icon:B});}
;this.setCurrent(C);C.setOpener(z);}
,__eK:function(e){var E=qx.ui.core.Widget.getWidgetByElement(e.getTarget());if(!E){return;}
;var F=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());if(!F){return;}
;var G=this.getCurrent();if(G&&(F==G||qx.ui.core.Widget.contains(G,F))){return;}
;if(F&&E&&qx.ui.core.Widget.contains(E,F)){return;}
;if(G&&!F){this.setCurrent(null);}
else {this.resetCurrent();}
;}
,__eL:function(e){var H=qx.ui.core.Widget.getWidgetByElement(e.getTarget());if(!H){return;}
;var I=this.getCurrent();if(I&&I==H.getToolTip()){this.setCurrent(null);}
;}
},destruct:function(){qx.event.Registration.removeListener(document.body,f,this.__eJ,this,true);this._disposeObjects(h,j,l);this.__eD=null;}
});}
)();
(function(){var a="qx.ui.core.MLayoutHandling";qx.Mixin.define(a,{members:{setLayout:function(b){this._setLayout(b);}
,getLayout:function(){return this._getLayout();}
},statics:{remap:function(c){c.getLayout=c._getLayout;c.setLayout=c._setLayout;}
}});}
)();
(function(){var b="qx.ui.core.DecoratorFactory",a="$$nopool$$";qx.Class.define(b,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__cQ={};}
,statics:{MAX_SIZE:15,__ja:a},members:{__cQ:null,getDecoratorElement:function(c){var h=qx.ui.core.DecoratorFactory;if(qx.lang.Type.isString(c)){var f=c;var e=qx.theme.manager.Decoration.getInstance().resolve(c);}
else {var f=h.__ja;e=c;}
;var g=this.__cQ;if(g[f]&&g[f].length>0){var d=g[f].pop();}
else {var d=this._createDecoratorElement(e,f);}
;d.$$pooled=false;return d;}
,poolDecorator:function(i){if(!i||i.$$pooled||i.isDisposed()){return;}
;var l=qx.ui.core.DecoratorFactory;var j=i.getId();if(j==l.__ja){i.dispose();return;}
;var k=this.__cQ;if(!k[j]){k[j]=[];}
;if(k[j].length>l.MAX_SIZE){i.dispose();}
else {i.$$pooled=true;k[j].push(i);}
;}
,_createDecoratorElement:function(m,n){var o=new qx.html.Decorator(m,n);{}
;return o;}
,invalidatePool:function(){var q=this.__cQ;for(var p in q){qx.util.DisposeUtil.disposeArray(q,p);}
;this.__cQ={};}
,toString:function(){return qx.core.Object.prototype.toString.call(this);}
},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){this.invalidatePool();}
;}
});}
)();
(function(){var d="event.pointer",c="none",b="qx.html.Decorator",a="absolute";qx.Class.define(b,{extend:qx.html.Element,construct:function(e,f){var g={position:a,top:0,left:0};if(qx.core.Environment.get(d)){g.pointerEvents=c;}
;qx.html.Element.call(this,null,g);this.__jb=e;this.__ch=f||e.toHashCode();this.useMarkup(e.getMarkup());}
,members:{__ch:null,__jb:null,getId:function(){return this.__ch;}
,getDecorator:function(){return this.__jb;}
,resize:function(h,i){this.__jb.resize(this.getDomElement(),h,i);this.getAllStyles().left=this.getDomElement().style.left;this.getAllStyles().top=this.getDomElement().style.top;}
,tint:function(j){this.__jb.tint(this.getDomElement(),j);}
,getInsets:function(){return this.__jb.getInsets();}
},destruct:function(){this.__jb=null;}
});}
)();
(function(){var j="changeWidth",i="allowShrinkY",h="bottom",g="baseline",f="marginBottom",e="qx.ui.core.LayoutItem",d="center",c="marginTop",b="allowGrowX",a="middle",A="marginLeft",z="allowShrinkX",y="top",x="right",w="marginRight",v="abstract",u="allowGrowY",t="left",s="changeHeight",r="_applyAlign",p="changeTheme",q="shorthand",n="Boolean",o="_applyStretching",l="_applyMargin",m="_applyDimension",k="Integer";qx.Class.define(e,{type:v,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);qx.theme.manager.Appearance.getInstance().addListener(p,this._onChangeTheme,this);}
,properties:{minWidth:{check:k,nullable:true,apply:m,init:null,themeable:true},width:{check:k,event:j,nullable:true,apply:m,init:null,themeable:true},maxWidth:{check:k,nullable:true,apply:m,init:null,themeable:true},minHeight:{check:k,nullable:true,apply:m,init:null,themeable:true},height:{check:k,event:s,nullable:true,apply:m,init:null,themeable:true},maxHeight:{check:k,nullable:true,apply:m,init:null,themeable:true},allowGrowX:{check:n,apply:o,init:true,themeable:true},allowShrinkX:{check:n,apply:o,init:true,themeable:true},allowGrowY:{check:n,apply:o,init:true,themeable:true},allowShrinkY:{check:n,apply:o,init:true,themeable:true},allowStretchX:{group:[b,z],mode:q,themeable:true},allowStretchY:{group:[u,i],mode:q,themeable:true},marginTop:{check:k,init:0,apply:l,themeable:true},marginRight:{check:k,init:0,apply:l,themeable:true},marginBottom:{check:k,init:0,apply:l,themeable:true},marginLeft:{check:k,init:0,apply:l,themeable:true},margin:{group:[c,w,f,A],mode:q,themeable:true},alignX:{check:[t,d,x],nullable:true,apply:r,themeable:true},alignY:{check:[y,a,h,g],nullable:true,apply:r,themeable:true}},members:{_onChangeTheme:function(){var D=qx.util.PropertyUtil.getAllProperties(this.constructor);for(var name in D){var C=D[name];if(C.themeable){var B=qx.util.PropertyUtil.getUserValue(this,name);if(B==null){qx.util.PropertyUtil.resetThemed(this,name);}
;}
;}
;}
,__eM:null,__eN:null,__eO:null,__eP:null,__eQ:null,__eR:null,__eS:null,getBounds:function(){return this.__eR||this.__eN||null;}
,clearSeparators:function(){}
,renderSeparator:function(E,F){}
,renderLayout:function(G,top,H,I){var J;{}
;var K=null;if(this.getHeight()==null&&this._hasHeightForWidth()){var K=this._getHeightForWidth(H);}
;if(K!=null&&K!==this.__eM){this.__eM=K;qx.ui.core.queue.Layout.add(this);return null;}
;var M=this.__eN;if(!M){M=this.__eN={};}
;var L={};if(G!==M.left||top!==M.top){L.position=true;M.left=G;M.top=top;}
;if(H!==M.width||I!==M.height){L.size=true;M.width=H;M.height=I;}
;if(this.__eO){L.local=true;delete this.__eO;}
;if(this.__eQ){L.margin=true;delete this.__eQ;}
;return L;}
,isExcluded:function(){return false;}
,hasValidLayout:function(){return !this.__eO;}
,scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);}
,invalidateLayoutCache:function(){this.__eO=true;this.__eP=null;}
,getSizeHint:function(N){var O=this.__eP;if(O){return O;}
;if(N===false){return null;}
;O=this.__eP=this._computeSizeHint();if(this._hasHeightForWidth()&&this.__eM&&this.getHeight()==null){O.height=this.__eM;}
;if(O.minWidth>O.width){O.width=O.minWidth;}
;if(O.maxWidth<O.width){O.width=O.maxWidth;}
;if(!this.getAllowGrowX()){O.maxWidth=O.width;}
;if(!this.getAllowShrinkX()){O.minWidth=O.width;}
;if(O.minHeight>O.height){O.height=O.minHeight;}
;if(O.maxHeight<O.height){O.height=O.maxHeight;}
;if(!this.getAllowGrowY()){O.maxHeight=O.height;}
;if(!this.getAllowShrinkY()){O.minHeight=O.height;}
;return O;}
,_computeSizeHint:function(){var T=this.getMinWidth()||0;var Q=this.getMinHeight()||0;var U=this.getWidth()||T;var S=this.getHeight()||Q;var P=this.getMaxWidth()||Infinity;var R=this.getMaxHeight()||Infinity;return {minWidth:T,width:U,maxWidth:P,minHeight:Q,height:S,maxHeight:R};}
,_hasHeightForWidth:function(){var V=this._getLayout();if(V){return V.hasHeightForWidth();}
;return false;}
,_getHeightForWidth:function(W){var X=this._getLayout();if(X&&X.hasHeightForWidth()){return X.getHeightForWidth(W);}
;return null;}
,_getLayout:function(){return null;}
,_applyMargin:function(){this.__eQ=true;var parent=this.$$parent;if(parent){parent.updateLayoutProperties();}
;}
,_applyAlign:function(){var parent=this.$$parent;if(parent){parent.updateLayoutProperties();}
;}
,_applyDimension:function(){qx.ui.core.queue.Layout.add(this);}
,_applyStretching:function(){qx.ui.core.queue.Layout.add(this);}
,hasUserBounds:function(){return !!this.__eR;}
,setUserBounds:function(Y,top,ba,bb){this.__eR={left:Y,top:top,width:ba,height:bb};qx.ui.core.queue.Layout.add(this);}
,resetUserBounds:function(){delete this.__eR;qx.ui.core.queue.Layout.add(this);}
,__eT:{},setLayoutProperties:function(bc){if(bc==null){return;}
;var bd=this.__eS;if(!bd){bd=this.__eS={};}
;var parent=this.getLayoutParent();if(parent){parent.updateLayoutProperties(bc);}
;for(var be in bc){if(bc[be]==null){delete bd[be];}
else {bd[be]=bc[be];}
;}
;}
,getLayoutProperties:function(){return this.__eS||this.__eT;}
,clearLayoutProperties:function(){delete this.__eS;}
,updateLayoutProperties:function(bf){var bg=this._getLayout();if(bg){var bh;{}
;bg.invalidateChildrenCache();}
;qx.ui.core.queue.Layout.add(this);}
,getApplicationRoot:function(){return qx.core.Init.getApplication().getRoot();}
,getLayoutParent:function(){return this.$$parent||null;}
,setLayoutParent:function(parent){if(this.$$parent===parent){return;}
;this.$$parent=parent||null;qx.ui.core.queue.Visibility.add(this);}
,isRootWidget:function(){return false;}
,_getRoot:function(){var parent=this;while(parent){if(parent.isRootWidget()){return parent;}
;parent=parent.$$parent;}
;return null;}
,clone:function(){var bi=qx.core.Object.prototype.clone.call(this);var bj=this.__eS;if(bj){bi.__eS=qx.lang.Object.clone(bj);}
;return bi;}
},destruct:function(){qx.theme.manager.Appearance.getInstance().removeListener(p,this._onChangeTheme,this);this.$$parent=this.$$subparent=this.__eS=this.__eN=this.__eR=this.__eP=null;}
});}
)();
(function(){var d="qx.util.PropertyUtil",c="$$theme_",b="$$user_",a="$$init_";qx.Class.define(d,{statics:{getProperties:function(e){return e.$$properties;}
,getAllProperties:function(f){var i={};var j=f;while(j!=qx.core.Object){var h=this.getProperties(j);for(var g in h){i[g]=h[g];}
;j=j.superclass;}
;return i;}
,getUserValue:function(k,l){return k[b+l];}
,setUserValue:function(m,n,o){m[b+n]=o;}
,deleteUserValue:function(p,q){delete (p[b+q]);}
,getInitValue:function(r,s){return r[a+s];}
,setInitValue:function(t,u,v){t[a+u]=v;}
,deleteInitValue:function(w,x){delete (w[a+x]);}
,getThemeValue:function(y,z){return y[c+z];}
,setThemeValue:function(A,B,C){A[c+B]=C;}
,deleteThemeValue:function(D,E){delete (D[c+E]);}
,setThemed:function(F,G,H){var I=qx.core.Property.$$method.setThemed;F[I[G]](H);}
,resetThemed:function(J,K){var L=qx.core.Property.$$method.resetThemed;J[L[K]]();}
}});}
)();
(function(){var cd="_applyNativeContextMenu",cc="engine.version",cb="_applyBackgroundColor",ca="event.pointer",bY="_applyFocusable",bX="changeShadow",bW="qx.event.type.KeyInput",bV="createChildControl",bU="browser.documentmode",bT="Font",bx="_applyShadow",bw="_applyEnabled",bv="_applySelectable",bu="__jc",bt="Number",bs="_applyKeepActive",br="_applyVisibility",bq="repeat",bp="qxDraggable",bo="syncAppearance",ck="paddingLeft",cl="__jp",ci="_applyDroppable",cj="decorator",cg="#",ch="qx.event.type.MouseWheel",ce="__jh",cf="_applyCursor",cm="_applyDraggable",cn="__ji",bM="changeTextColor",bL="$$widget",bO="changeContextMenu",bN="paddingTop",bQ="changeSelectable",bP="hideFocus",bS="none",bR="outline",bK="_applyAppearance",bJ="__jn",c="_applyOpacity",d="__jl",f="url(",g=")",h="qx.ui.core.Widget",j="_applyFont",k="cursor",m="qxDroppable",n="changeZIndex",o="changeEnabled",cr="changeFont",cq="_applyDecorator",cp="_applyZIndex",co="_applyTextColor",cv="qx.ui.menu.Menu",cu="__jg",ct="_applyToolTipText",cs="true",cx="widget",cw="changeDecorator",N="shadow",O="_applyTabIndex",L="changeAppearance",M="__jd",R="shorthand",S="/",P="",Q="_applyContextMenu",J="paddingBottom",K="changeNativeContextMenu",w="undefined",v="qx.ui.tooltip.ToolTip",y="qxKeepActive",x="_applyKeepFocus",s="paddingRight",r="changeBackgroundColor",u="changeLocale",t="qxKeepFocus",q="opera",p="qx/static/blank.gif",X="backgroundColor",Y="drag",ba="div",bb="disabled",T="move",U="dragstart",V="qx.dynlocale",W="dragchange",bc="dragend",bd="resize",G="Decorator",F="zIndex",E="opacity",D="default",C="Color",B="changeToolTipText",A="beforeContextmenuOpen",z="focused",I="changeVisibility",H="hovered",be="qx.event.type.KeySequence",bf="absolute",bg="_applyPadding",bh="qx.event.type.Event",bi="on",bj="mshtml",bk="hidden",bl="contextmenu",bm="String",bn="tabIndex",bB="qx.event.type.Data",bA="engine.name",bz="excluded",by="qx.event.type.Focus",bF="Integer",bE="qx.event.type.Touch",bD="visible",bC="qx.event.type.Drag",bH="qx.event.type.Mouse",bG="Boolean",bI="px";qx.Class.define(h,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){qx.ui.core.LayoutItem.call(this);this.__jc=this._createContainerElement();this.__jd=this.__jo();this.__jc.add(this.__jd);this.initFocusable();this.initSelectable();this.initNativeContextMenu();}
,events:{appear:bh,disappear:bh,createChildControl:bB,resize:bB,move:bB,syncAppearance:bB,mousemove:bH,mouseover:bH,mouseout:bH,mousedown:bH,mouseup:bH,click:bH,dblclick:bH,contextmenu:bH,beforeContextmenuOpen:bB,mousewheel:ch,touchstart:bE,touchend:bE,touchmove:bE,touchcancel:bE,tap:bE,swipe:bE,keyup:be,keydown:be,keypress:be,keyinput:bW,focus:by,blur:by,focusin:by,focusout:by,activate:by,deactivate:by,capture:bh,losecapture:bh,drop:bC,dragleave:bC,dragover:bC,drag:bC,dragstart:bC,dragend:bC,dragchange:bC,droprequest:bC},properties:{paddingTop:{check:bF,init:0,apply:bg,themeable:true},paddingRight:{check:bF,init:0,apply:bg,themeable:true},paddingBottom:{check:bF,init:0,apply:bg,themeable:true},paddingLeft:{check:bF,init:0,apply:bg,themeable:true},padding:{group:[bN,s,J,ck],mode:R,themeable:true},zIndex:{nullable:true,init:null,apply:cp,event:n,check:bF,themeable:true},decorator:{nullable:true,init:null,apply:cq,event:cw,check:G,themeable:true},shadow:{nullable:true,init:null,apply:bx,event:bX,check:G,themeable:true},backgroundColor:{nullable:true,check:C,apply:cb,event:r,themeable:true},textColor:{nullable:true,check:C,apply:co,event:bM,themeable:true,inheritable:true},font:{nullable:true,apply:j,check:bT,event:cr,themeable:true,inheritable:true,dereference:true},opacity:{check:bt,apply:c,themeable:true,nullable:true,init:null},cursor:{check:bm,apply:cf,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:v,nullable:true},toolTipText:{check:bm,nullable:true,event:B,apply:ct},toolTipIcon:{check:bm,nullable:true,event:B},blockToolTip:{check:bG,init:false},visibility:{check:[bD,bk,bz],init:bD,apply:br,event:I},enabled:{init:true,check:bG,inheritable:true,apply:bw,event:o},anonymous:{init:false,check:bG},tabIndex:{check:bF,nullable:true,apply:O},focusable:{check:bG,init:false,apply:bY},keepFocus:{check:bG,init:false,apply:x},keepActive:{check:bG,init:false,apply:bs},draggable:{check:bG,init:false,apply:cm},droppable:{check:bG,init:false,apply:ci},selectable:{check:bG,init:false,event:bQ,apply:bv},contextMenu:{check:cv,apply:Q,nullable:true,event:bO},nativeContextMenu:{check:bG,init:false,themeable:true,event:K,apply:cd},appearance:{check:bm,init:cx,apply:bK,event:L}},statics:{DEBUG:false,getWidgetByElement:function(cy,cz){while(cy){var cA=cy.$$widget;if(cA!=null){var cB=qx.core.ObjectRegistry.fromHashCode(cA);if(!cz||!cB.getAnonymous()){return cB;}
;}
;try{cy=cy.parentNode;}
catch(e){return null;}
;}
;return null;}
,contains:function(parent,cC){while(cC){if(parent==cC){return true;}
;cC=cC.getLayoutParent();}
;return false;}
,__je:new qx.ui.core.DecoratorFactory(),__jf:new qx.ui.core.DecoratorFactory()},members:{__jc:null,__jd:null,__jg:null,__jh:null,__ji:null,__jj:null,__jk:null,__jl:null,_getLayout:function(){return this.__jl;}
,_setLayout:function(cD){{}
;if(this.__jl){this.__jl.connectToWidget(null);}
;if(cD){cD.connectToWidget(this);}
;this.__jl=cD;qx.ui.core.queue.Layout.add(this);}
,setLayoutParent:function(parent){if(this.$$parent===parent){return;}
;var cE=this.getContainerElement();if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(cE);}
;this.$$parent=parent||null;if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(cE);}
;this.$$refreshInheritables();qx.ui.core.queue.Visibility.add(this);}
,_updateInsets:null,__jm:function(a,b){if(a==b){return false;}
;if(a==null||b==null){return true;}
;var cF=qx.theme.manager.Decoration.getInstance();var cH=cF.resolve(a);var cG=cF.resolve(b);if(!cH||!cG){return true;}
;cH=cH.getInsets();cG=cG.getInsets();if(cH.top!=cG.top||cH.right!=cG.right||cH.bottom!=cG.bottom||cH.left!=cG.left){return true;}
;return false;}
,renderLayout:function(cI,top,cJ,cK){var cT=qx.ui.core.LayoutItem.prototype.renderLayout.call(this,cI,top,cJ,cK);if(!cT){return null;}
;if(qx.lang.Object.isEmpty(cT)&&!this._updateInsets){return null;}
;var cM=this.getContainerElement();var content=this.getContentElement();var cQ=cT.size||this._updateInsets;var cU=bI;var cR={};if(cT.position){cR.left=cI+cU;cR.top=top+cU;}
;if(cT.size){cR.width=cJ+cU;cR.height=cK+cU;}
;if(cT.position||cT.size){cM.setStyles(cR);}
;if(cQ||cT.local||cT.margin){var cL=this.getInsets();var innerWidth=cJ-cL.left-cL.right;var innerHeight=cK-cL.top-cL.bottom;innerWidth=innerWidth<0?0:innerWidth;innerHeight=innerHeight<0?0:innerHeight;}
;var cO={};if(this._updateInsets){cO.left=cL.left+cU;cO.top=cL.top+cU;}
;if(cQ){cO.width=innerWidth+cU;cO.height=innerHeight+cU;}
;if(cQ||this._updateInsets){content.setStyles(cO);}
;if(cT.size){var cS=this.__ji;if(cS){cS.setStyles({width:cJ+bI,height:cK+bI});}
;}
;if(cT.size||this._updateInsets){if(this.__jg){this.__jg.resize(cJ,cK);}
;}
;if(cT.size){if(this.__jh){var cL=this.__jh.getInsets();var cP=cJ+cL.left+cL.right;var cN=cK+cL.top+cL.bottom;this.__jh.resize(cP,cN);this.__jh.setStyles({left:-cL.left+bI,top:-cL.top+bI},true);}
;}
;if(cQ||cT.local||cT.margin){if(this.__jl&&this.hasLayoutChildren()){this.__jl.renderLayout(innerWidth,innerHeight);}
else if(this.hasLayoutChildren()){throw new Error("At least one child in control "+this._findTopControl()+" requires a layout, but no one was defined!");}
;}
;if(cT.position&&this.hasListener(T)){this.fireDataEvent(T,this.getBounds());}
;if(cT.size&&this.hasListener(bd)){this.fireDataEvent(bd,this.getBounds());}
;delete this._updateInsets;return cT;}
,__jn:null,clearSeparators:function(){var cW=this.__jn;if(!cW){return;}
;var cX=qx.ui.core.Widget.__je;var content=this.getContentElement();var cV;for(var i=0,l=cW.length;i<l;i++){cV=cW[i];cX.poolDecorator(cV);content.remove(cV);}
;cW.length=0;}
,renderSeparator:function(cY,da){var dc=qx.ui.core.Widget.__je.getDecoratorElement(cY);this.getContentElement().add(dc);dc.resize(da.width,da.height);var db=dc.getDomElement();if(db){db.style.top=da.top+bI;db.style.left=da.left+bI;}
else {dc.setStyles({left:da.left+bI,top:da.top+bI});}
;if(!this.__jn){this.__jn=[dc];}
else {this.__jn.push(dc);}
;}
,_computeSizeHint:function(){var dj=this.getWidth();var di=this.getMinWidth();var de=this.getMaxWidth();var dh=this.getHeight();var df=this.getMinHeight();var dg=this.getMaxHeight();{}
;var dk=this._getContentHint();var dd=this.getInsets();var dm=dd.left+dd.right;var dl=dd.top+dd.bottom;if(dj==null){dj=dk.width+dm;}
;if(dh==null){dh=dk.height+dl;}
;if(di==null){di=dm;if(dk.minWidth!=null){di+=dk.minWidth;if(di>de&&de!=null){di=de;}
;}
;}
;if(df==null){df=dl;if(dk.minHeight!=null){df+=dk.minHeight;if(df>dg&&dg!=null){df=dg;}
;}
;}
;if(de==null){if(dk.maxWidth==null){de=Infinity;}
else {de=dk.maxWidth+dm;if(de<di&&di!=null){de=di;}
;}
;}
;if(dg==null){if(dk.maxHeight==null){dg=Infinity;}
else {dg=dk.maxHeight+dl;if(dg<df&&df!=null){dg=df;}
;}
;}
;return {width:dj,minWidth:di,maxWidth:de,height:dh,minHeight:df,maxHeight:dg};}
,invalidateLayoutCache:function(){qx.ui.core.LayoutItem.prototype.invalidateLayoutCache.call(this);if(this.__jl){this.__jl.invalidateLayoutCache();}
;}
,_getContentHint:function(){var dp=this.__jl;if(dp){if(this.hasLayoutChildren()){var dn;var dq=dp.getSizeHint();{}
;return dq;}
else {return {width:0,height:0};}
;}
else {return {width:100,height:50};}
;}
,_getHeightForWidth:function(dr){var dv=this.getInsets();var dy=dv.left+dv.right;var dx=dv.top+dv.bottom;var dw=dr-dy;var dt=this._getLayout();if(dt&&dt.hasHeightForWidth()){var ds=dt.getHeightForWidth(dr);}
else {ds=this._getContentHeightForWidth(dw);}
;var du=ds+dx;return du;}
,_getContentHeightForWidth:function(dz){throw new Error("Abstract method call: _getContentHeightForWidth()!");}
,getInsets:function(){var top=this.getPaddingTop();var dB=this.getPaddingRight();var dD=this.getPaddingBottom();var dC=this.getPaddingLeft();if(this.__jg){var dA=this.__jg.getInsets();{}
;top+=dA.top;dB+=dA.right;dD+=dA.bottom;dC+=dA.left;}
;return {"top":top,"right":dB,"bottom":dD,"left":dC};}
,getInnerSize:function(){var dF=this.getBounds();if(!dF){return null;}
;var dE=this.getInsets();return {width:dF.width-dE.left-dE.right,height:dF.height-dE.top-dE.bottom};}
,fadeOut:function(dG){return this.getContainerElement().fadeOut(dG);}
,fadeIn:function(dH){return this.getContainerElement().fadeIn(dH);}
,show:function(){this.setVisibility(bD);}
,hide:function(){this.setVisibility(bk);}
,exclude:function(){this.setVisibility(bz);}
,isVisible:function(){return this.getVisibility()===bD;}
,isHidden:function(){return this.getVisibility()!==bD;}
,isExcluded:function(){return this.getVisibility()===bz;}
,isSeeable:function(){qx.ui.core.queue.Manager.flush();var dI=this.getContainerElement().getDomElement();if(dI){return dI.offsetWidth>0;}
;return false;}
,_createContainerElement:function(){var dK={"$$widget":this.toHashCode()};{}
;var dJ={zIndex:0,position:bf};return new qx.html.Element(ba,dJ,dK);}
,__jo:function(){var dL=this._createContentElement();{}
;dL.setStyles({"position":bf,"zIndex":10});return dL;}
,_createContentElement:function(){return new qx.html.Element(ba,{overflowX:bk,overflowY:bk});}
,getContainerElement:function(){return this.__jc;}
,getContentElement:function(){return this.__jd;}
,getDecoratorElement:function(){return this.__jg||null;}
,getShadowElement:function(){return this.__jh||null;}
,__jp:null,getLayoutChildren:function(){var dN=this.__jp;if(!dN){return this.__jq;}
;var dO;for(var i=0,l=dN.length;i<l;i++){var dM=dN[i];if(dM.hasUserBounds()||dM.isExcluded()){if(dO==null){dO=dN.concat();}
;qx.lang.Array.remove(dO,dM);}
;}
;return dO||dN;}
,scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);}
,invalidateLayoutChildren:function(){var dP=this.__jl;if(dP){dP.invalidateChildrenCache();}
;qx.ui.core.queue.Layout.add(this);}
,hasLayoutChildren:function(){var dQ=this.__jp;if(!dQ){return false;}
;var dR;for(var i=0,l=dQ.length;i<l;i++){dR=dQ[i];if(!dR.hasUserBounds()&&!dR.isExcluded()){return true;}
;}
;return false;}
,getChildrenContainer:function(){return this;}
,__jq:[],_getChildren:function(){return this.__jp||this.__jq;}
,_indexOf:function(dS){var dT=this.__jp;if(!dT){return -1;}
;return dT.indexOf(dS);}
,_hasChildren:function(){var dU=this.__jp;return dU!=null&&(!!dU[0]);}
,addChildrenToQueue:function(dV){var dW=this.__jp;if(!dW){return;}
;var dX;for(var i=0,l=dW.length;i<l;i++){dX=dW[i];dV.push(dX);dX.addChildrenToQueue(dV);}
;}
,_add:function(dY,ea){{}
;if(dY.getLayoutParent()==this){qx.lang.Array.remove(this.__jp,dY);}
;if(this.__jp){this.__jp.push(dY);}
else {this.__jp=[dY];}
;this.__jr(dY,ea);}
,_addAt:function(eb,ec,ed){if(!this.__jp){this.__jp=[];}
;if(eb.getLayoutParent()==this){qx.lang.Array.remove(this.__jp,eb);}
;var ee=this.__jp[ec];if(ee===eb){eb.setLayoutProperties(ed);}
;if(ee){qx.lang.Array.insertBefore(this.__jp,eb,ee);}
else {this.__jp.push(eb);}
;this.__jr(eb,ed);}
,_addBefore:function(ef,eg,eh){{}
;if(ef==eg){return;}
;if(!this.__jp){this.__jp=[];}
;if(ef.getLayoutParent()==this){qx.lang.Array.remove(this.__jp,ef);}
;qx.lang.Array.insertBefore(this.__jp,ef,eg);this.__jr(ef,eh);}
,_addAfter:function(ei,ej,ek){{}
;if(ei==ej){return;}
;if(!this.__jp){this.__jp=[];}
;if(ei.getLayoutParent()==this){qx.lang.Array.remove(this.__jp,ei);}
;qx.lang.Array.insertAfter(this.__jp,ei,ej);this.__jr(ei,ek);}
,_remove:function(em){if(!this.__jp){throw new Error("This widget has no children!");}
;qx.lang.Array.remove(this.__jp,em);this.__js(em);}
,_removeAt:function(en){if(!this.__jp){throw new Error("This widget has no children!");}
;var eo=this.__jp[en];qx.lang.Array.removeAt(this.__jp,en);this.__js(eo);return eo;}
,_removeAll:function(){if(!this.__jp){return [];}
;var ep=this.__jp.concat();this.__jp.length=0;for(var i=ep.length-1;i>=0;i--){this.__js(ep[i]);}
;qx.ui.core.queue.Layout.add(this);return ep;}
,_afterAddChild:null,_afterRemoveChild:null,__jr:function(eq,er){{}
;var parent=eq.getLayoutParent();if(parent&&parent!=this){parent._remove(eq);}
;eq.setLayoutParent(this);if(er){eq.setLayoutProperties(er);}
else {this.updateLayoutProperties();}
;if(this._afterAddChild){this._afterAddChild(eq);}
;}
,__js:function(es){{}
;if(es.getLayoutParent()!==this){throw new Error("Remove Error: "+es+" is not a child of this widget!");}
;es.setLayoutParent(null);if(this.__jl){this.__jl.invalidateChildrenCache();}
;qx.ui.core.queue.Layout.add(this);if(this._afterRemoveChild){this._afterRemoveChild(es);}
;}
,capture:function(et){this.getContainerElement().capture(et);}
,releaseCapture:function(){this.getContainerElement().releaseCapture();}
,_applyPadding:function(eu,ev,name){this._updateInsets=true;qx.ui.core.queue.Layout.add(this);}
,_createProtectorElement:function(){if(this.__ji){return;}
;var ew=this.__ji=new qx.html.Element;{}
;ew.setStyles({position:bf,top:0,left:0,zIndex:7});var ex=this.getBounds();if(ex){this.__ji.setStyles({width:ex.width+bI,height:ex.height+bI});}
;if((qx.core.Environment.get(bA)==bj)){ew.setStyles({backgroundImage:f+qx.util.ResourceManager.getInstance().toUri(p)+g,backgroundRepeat:bq});}
;this.getContainerElement().add(ew);}
,_applyDecorator:function(ey,ez){{}
;var eC=qx.ui.core.Widget.__je;var eA=this.getContainerElement();if(!this.__ji&&!qx.core.Environment.get(ca)){this._createProtectorElement();}
;if(ez){eA.remove(this.__jg);eC.poolDecorator(this.__jg);}
;if(ey){var eB=this.__jg=eC.getDecoratorElement(ey);eB.setStyle(F,5);eA.add(eB);}
else {delete this.__jg;}
;this._applyBackgroundColor(this.getBackgroundColor());if(this.__jm(ez,ey)){this._updateInsets=true;qx.ui.core.queue.Layout.add(this);}
else if(ey){var eD=this.getBounds();if(eD){eB.resize(eD.width,eD.height);this.__ji&&this.__ji.setStyles({width:eD.width+bI,height:eD.height+bI});}
;}
;}
,_applyShadow:function(eE,eF){var eM=qx.ui.core.Widget.__jf;var eH=this.getContainerElement();if(eF){eH.remove(this.__jh);eM.poolDecorator(this.__jh);}
;if(eE){var eJ=this.__jh=eM.getDecoratorElement(eE);eH.add(eJ);var eL=eJ.getInsets();var eK=this.getBounds();if(eK){var eI=eK.width+eL.left+eL.right;var eG=eK.height+eL.top+eL.bottom;eJ.resize(eI,eG);eJ.setStyles({left:-eL.left+bI,top:-eL.top+bI},true);}
;eJ.tint(null);}
else {delete this.__jh;}
;}
,_applyToolTipText:function(eN,eO){if(qx.core.Environment.get(V)){if(this.__jk){return;}
;var eP=qx.locale.Manager.getInstance();this.__jk=eP.addListener(u,function(){var eQ=this.getToolTipText();if(eQ&&eQ.translate){this.setToolTipText(eQ.translate());}
;}
,this);}
;}
,_applyTextColor:function(eR,eS){}
,_applyZIndex:function(eT,eU){this.getContainerElement().setStyle(F,eT==null?0:eT);}
,_applyVisibility:function(eV,eW){var eX=this.getContainerElement();if(eV===bD){eX.show();}
else {eX.hide();}
;var parent=this.$$parent;if(parent&&(eW==null||eV==null||eW===bz||eV===bz)){parent.invalidateLayoutChildren();}
;qx.ui.core.queue.Visibility.add(this);}
,_applyOpacity:function(eY,fa){this.getContainerElement().setStyle(E,eY==1?null:eY);if((qx.core.Environment.get(bA)==bj)&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){if(!qx.Class.isSubClassOf(this.getContentElement().constructor,qx.html.Image)){var fb=(eY==1||eY==null)?null:0.99;this.getContentElement().setStyle(E,fb);}
;}
;}
,_applyCursor:function(fc,fd){if(fc==null&&!this.isSelectable()){fc=D;}
;this.getContainerElement().setStyle(k,fc,qx.core.Environment.get(bA)==q);}
,_applyBackgroundColor:function(fe,ff){var fg=this.getBackgroundColor();var fi=this.getContainerElement();if(this.__jg){this.__jg.tint(fg);fi.setStyle(X,null);}
else {var fh=qx.theme.manager.Color.getInstance().resolve(fg);fi.setStyle(X,fh);}
;}
,_applyFont:function(fj,fk){}
,_onChangeTheme:function(){qx.ui.core.LayoutItem.prototype._onChangeTheme.call(this);qx.ui.core.Widget.__je.invalidatePool();qx.ui.core.Widget.__jf.invalidatePool();this.updateAppearance();var fl=qx.util.PropertyUtil.getUserValue(this,cj);if(qx.lang.Type.isString(fl)){this._applyDecorator(null,fl);qx.ui.core.Widget.__je.invalidatePool();this._applyDecorator(fl);}
;fl=qx.util.PropertyUtil.getUserValue(this,N);if(qx.lang.Type.isString(fl)){this._applyShadow(null,fl);qx.ui.core.Widget.__jf.invalidatePool();this._applyShadow(fl);}
;fl=this.getFont();if(qx.lang.Type.isString(fl)){this._applyFont(fl,fl);}
;fl=this.getTextColor();if(qx.lang.Type.isString(fl)){this._applyTextColor(fl,fl);}
;fl=this.getBackgroundColor();if(qx.lang.Type.isString(fl)){this._applyBackgroundColor(fl,fl);}
;}
,__jt:null,$$stateChanges:null,_forwardStates:null,hasState:function(fm){var fn=this.__jt;return !!fn&&!!fn[fm];}
,addState:function(fo){var fp=this.__jt;if(!fp){fp=this.__jt={};}
;if(fp[fo]){return;}
;this.__jt[fo]=true;if(fo===H){this.syncAppearance();}
else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;}
else {qx.ui.core.queue.Appearance.add(this);}
;var forward=this._forwardStates;var fs=this.__jw;if(forward&&forward[fo]&&fs){var fq;for(var fr in fs){fq=fs[fr];if(fq instanceof qx.ui.core.Widget){fs[fr].addState(fo);}
;}
;}
;}
,removeState:function(ft){var fu=this.__jt;if(!fu||!fu[ft]){return;}
;delete this.__jt[ft];if(ft===H){this.syncAppearance();}
else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;}
else {qx.ui.core.queue.Appearance.add(this);}
;var forward=this._forwardStates;var fx=this.__jw;if(forward&&forward[ft]&&fx){for(var fw in fx){var fv=fx[fw];if(fv instanceof qx.ui.core.Widget){fv.removeState(ft);}
;}
;}
;}
,replaceState:function(fy,fz){var fA=this.__jt;if(!fA){fA=this.__jt={};}
;if(!fA[fz]){fA[fz]=true;}
;if(fA[fy]){delete fA[fy];}
;if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;}
else {qx.ui.core.queue.Appearance.add(this);}
;var forward=this._forwardStates;var fD=this.__jw;if(forward&&forward[fz]&&fD){for(var fC in fD){var fB=fD[fC];if(fB instanceof qx.ui.core.Widget){fB.replaceState(fy,fz);}
;}
;}
;}
,__ju:null,__jv:null,syncAppearance:function(){var fI=this.__jt;var fH=this.__ju;var fJ=qx.theme.manager.Appearance.getInstance();var fF=qx.core.Property.$$method.setThemed;var fN=qx.core.Property.$$method.resetThemed;if(this.__jv){delete this.__jv;if(fH){var fE=fJ.styleFrom(fH,fI,null,this.getAppearance());fH=null;}
;}
;if(!fH){var fG=this;var fM=[];do {fM.push(fG.$$subcontrol||fG.getAppearance());}
while(fG=fG.$$subparent);fH=fM.reverse().join(S).replace(/#[0-9]+/g,P);this.__ju=fH;}
;var fK=fJ.styleFrom(fH,fI,null,this.getAppearance());if(fK){var fL;if(fE){for(var fL in fE){if(fK[fL]===undefined){this[fN[fL]]();}
;}
;}
;{}
;for(var fL in fK){fK[fL]===undefined?this[fN[fL]]():this[fF[fL]](fK[fL]);}
;}
else if(fE){for(var fL in fE){this[fN[fL]]();}
;}
;this.fireDataEvent(bo,this.__jt);}
,_applyAppearance:function(fO,fP){this.updateAppearance();}
,checkAppearanceNeeds:function(){if(!this.__jj){qx.ui.core.queue.Appearance.add(this);this.__jj=true;}
else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);delete this.$$stateChanges;}
;}
,updateAppearance:function(){this.__jv=true;qx.ui.core.queue.Appearance.add(this);var fS=this.__jw;if(fS){var fQ;for(var fR in fS){fQ=fS[fR];if(fQ instanceof qx.ui.core.Widget){fQ.updateAppearance();}
;}
;}
;}
,syncWidget:function(fT){}
,getEventTarget:function(){var fU=this;while(fU.getAnonymous()){fU=fU.getLayoutParent();if(!fU){return null;}
;}
;return fU;}
,getFocusTarget:function(){var fV=this;if(!fV.getEnabled()){return null;}
;while(fV.getAnonymous()||!fV.getFocusable()){fV=fV.getLayoutParent();if(!fV||!fV.getEnabled()){return null;}
;}
;return fV;}
,getFocusElement:function(){return this.getContainerElement();}
,isTabable:function(){return (!!this.getContainerElement().getDomElement())&&this.isFocusable();}
,_applyFocusable:function(fW,fX){var fY=this.getFocusElement();if(fW){var ga=this.getTabIndex();if(ga==null){ga=1;}
;fY.setAttribute(bn,ga);if((qx.core.Environment.get(bA)==bj&&parseFloat(qx.core.Environment.get(cc))<8)||(qx.core.Environment.get(bA)==bj&&qx.core.Environment.get(bU)<8)){fY.setAttribute(bP,cs);}
else {fY.setStyle(bR,bS);}
;}
else {if(fY.isNativelyFocusable()){fY.setAttribute(bn,-1);}
else if(fX){fY.setAttribute(bn,null);}
;}
;}
,_applyKeepFocus:function(gb){var gc=this.getFocusElement();gc.setAttribute(t,gb?bi:null);}
,_applyKeepActive:function(gd){var ge=this.getContainerElement();ge.setAttribute(y,gd?bi:null);}
,_applyTabIndex:function(gf){if(gf==null){gf=1;}
else if(gf<1||gf>32000){throw new Error("TabIndex property must be between 1 and 32000");}
;if(this.getFocusable()&&gf!=null){this.getFocusElement().setAttribute(bn,gf);}
;}
,_applySelectable:function(gg,gh){if(gh!==null){this._applyCursor(this.getCursor());}
;this.getContentElement().setSelectable(gg);}
,_applyEnabled:function(gi,gj){if(gi===false){this.addState(bb);this.removeState(H);if(this.isFocusable()){this.removeState(z);this._applyFocusable(false,true);}
;if(this.isDraggable()){this._applyDraggable(false,true);}
;if(this.isDroppable()){this._applyDroppable(false,true);}
;}
else {this.removeState(bb);if(this.isFocusable()){this._applyFocusable(true,false);}
;if(this.isDraggable()){this._applyDraggable(true,false);}
;if(this.isDroppable()){this._applyDroppable(true,false);}
;}
;}
,_applyNativeContextMenu:function(gk,gl,name){}
,_applyContextMenu:function(gm,gn){if(gn){gn.removeState(bl);if(gn.getOpener()==this){gn.resetOpener();}
;if(!gm){this.removeListener(bl,this._onContextMenuOpen);gn.removeListener(I,this._onBeforeContextMenuOpen,this);}
;}
;if(gm){gm.setOpener(this);gm.addState(bl);if(!gn){this.addListener(bl,this._onContextMenuOpen);gm.addListener(I,this._onBeforeContextMenuOpen,this);}
;}
;}
,_onContextMenuOpen:function(e){this.getContextMenu().openAtMouse(e);e.stop();}
,_onBeforeContextMenuOpen:function(e){if(e.getData()==bD&&this.hasListener(A)){this.fireDataEvent(A,e);}
;}
,_onStopEvent:function(e){e.stopPropagation();}
,_getDragDropCursor:function(){return qx.ui.core.DragDropCursor.getInstance();}
,_applyDraggable:function(go,gp){if(!this.isEnabled()&&go===true){go=false;}
;this._getDragDropCursor();if(go){this.addListener(U,this._onDragStart);this.addListener(Y,this._onDrag);this.addListener(bc,this._onDragEnd);this.addListener(W,this._onDragChange);}
else {this.removeListener(U,this._onDragStart);this.removeListener(Y,this._onDrag);this.removeListener(bc,this._onDragEnd);this.removeListener(W,this._onDragChange);}
;this.getContainerElement().setAttribute(bp,go?bi:null);}
,_applyDroppable:function(gq,gr){if(!this.isEnabled()&&gq===true){gq=false;}
;this.getContainerElement().setAttribute(m,gq?bi:null);}
,_onDragStart:function(e){this._getDragDropCursor().placeToMouse(e);this.getApplicationRoot().setGlobalCursor(D);}
,_onDrag:function(e){this._getDragDropCursor().placeToMouse(e);}
,_onDragEnd:function(e){this._getDragDropCursor().moveTo(-1000,-1000);this.getApplicationRoot().resetGlobalCursor();}
,_onDragChange:function(e){var gs=this._getDragDropCursor();var gt=e.getCurrentAction();gt?gs.setAction(gt):gs.resetAction();}
,visualizeFocus:function(){this.addState(z);}
,visualizeBlur:function(){this.removeState(z);}
,scrollChildIntoView:function(gu,gv,gw,gx){gx=typeof gx==w?true:gx;var gy=qx.ui.core.queue.Layout;var parent;if(gx){gx=!gy.isScheduled(gu);parent=gu.getLayoutParent();if(gx&&parent){gx=!gy.isScheduled(parent);if(gx){parent.getChildren().forEach(function(gz){gx=gx&&!gy.isScheduled(gz);}
);}
;}
;}
;this.scrollChildIntoViewX(gu,gv,gx);this.scrollChildIntoViewY(gu,gw,gx);}
,scrollChildIntoViewX:function(gA,gB,gC){this.getContentElement().scrollChildIntoViewX(gA.getContainerElement(),gB,gC);}
,scrollChildIntoViewY:function(gD,gE,gF){this.getContentElement().scrollChildIntoViewY(gD.getContainerElement(),gE,gF);}
,focus:function(){if(this.isFocusable()){this.getFocusElement().focus();}
else {throw new Error("Widget is not focusable!");}
;}
,blur:function(){if(this.isFocusable()){this.getFocusElement().blur();}
else {throw new Error("Widget is not focusable!");}
;}
,activate:function(){this.getContainerElement().activate();}
,deactivate:function(){this.getContainerElement().deactivate();}
,tabFocus:function(){this.getFocusElement().focus();}
,hasChildControl:function(gG){if(!this.__jw){return false;}
;return !!this.__jw[gG];}
,__jw:null,_getCreatedChildControls:function(){return this.__jw;}
,getChildControl:function(gH,gI){if(!this.__jw){if(gI){return null;}
;this.__jw={};}
;var gJ=this.__jw[gH];if(gJ){return gJ;}
;if(gI===true){return null;}
;return this._createChildControl(gH);}
,_showChildControl:function(gK){var gL=this.getChildControl(gK);gL.show();return gL;}
,_excludeChildControl:function(gM){var gN=this.getChildControl(gM,true);if(gN){gN.exclude();}
;}
,_isChildControlVisible:function(gO){var gP=this.getChildControl(gO,true);if(gP){return gP.isVisible();}
;return false;}
,_createChildControl:function(gQ){if(!this.__jw){this.__jw={};}
else if(this.__jw[gQ]){throw new Error("Child control '"+gQ+"' already created!");}
;var gU=gQ.indexOf(cg);if(gU==-1){var gR=this._createChildControlImpl(gQ);}
else {var gR=this._createChildControlImpl(gQ.substring(0,gU),gQ.substring(gU+1,gQ.length));}
;if(!gR){throw new Error("Unsupported control: "+gQ);}
;gR.$$subcontrol=gQ;gR.$$subparent=this;var gS=this.__jt;var forward=this._forwardStates;if(gS&&forward&&gR instanceof qx.ui.core.Widget){for(var gT in gS){if(forward[gT]){gR.addState(gT);}
;}
;}
;this.fireDataEvent(bV,gR);return this.__jw[gQ]=gR;}
,_createChildControlImpl:function(gV,gW){return null;}
,_disposeChildControls:function(){var hb=this.__jw;if(!hb){return;}
;var gY=qx.ui.core.Widget;for(var ha in hb){var gX=hb[ha];if(!gY.contains(this,gX)){gX.destroy();}
else {gX.dispose();}
;}
;delete this.__jw;}
,_findTopControl:function(){var hc=this;while(hc){if(!hc.$$subparent){return hc;}
;hc=hc.$$subparent;}
;return null;}
,getContainerLocation:function(hd){var he=this.getContainerElement().getDomElement();return he?qx.bom.element.Location.get(he,hd):null;}
,getContentLocation:function(hf){var hg=this.getContentElement().getDomElement();return hg?qx.bom.element.Location.get(hg,hf):null;}
,setDomLeft:function(hh){var hi=this.getContainerElement().getDomElement();if(hi){hi.style.left=hh+bI;}
else {throw new Error("DOM element is not yet created!");}
;}
,setDomTop:function(hj){var hk=this.getContainerElement().getDomElement();if(hk){hk.style.top=hj+bI;}
else {throw new Error("DOM element is not yet created!");}
;}
,setDomPosition:function(hl,top){var hm=this.getContainerElement().getDomElement();if(hm){hm.style.left=hl+bI;hm.style.top=top+bI;}
else {throw new Error("DOM element is not yet created!");}
;}
,destroy:function(){if(this.$$disposed){return;}
;var parent=this.$$parent;if(parent){parent._remove(this);}
;qx.ui.core.queue.Dispose.add(this);}
,clone:function(){var hn=qx.ui.core.LayoutItem.prototype.clone.call(this);if(this.getChildren){var ho=this.getChildren();for(var i=0,l=ho.length;i<l;i++){hn.add(ho[i].clone());}
;}
;return hn;}
},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Environment.get(V)){if(this.__jk){qx.locale.Manager.getInstance().removeListenerById(this.__jk);}
;}
;this.getContainerElement().setAttribute(bL,null,true);this._disposeChildControls();qx.ui.core.queue.Appearance.remove(this);qx.ui.core.queue.Layout.remove(this);qx.ui.core.queue.Visibility.remove(this);qx.ui.core.queue.Widget.remove(this);}
;if(this.getContextMenu()){this.setContextMenu(null);}
;if(!qx.core.ObjectRegistry.inShutDown){var hq=qx.ui.core.Widget;var hp=this.getContainerElement();if(this.__jg){hp.remove(this.__jg);hq.__je.poolDecorator(this.__jg);}
;if(this.__jh){hp.remove(this.__jh);hq.__jf.poolDecorator(this.__jh);}
;this.clearSeparators();this.__jg=this.__jh=this.__jn=null;}
else {this._disposeArray(bJ);this._disposeObjects(cu,ce);}
;this._disposeArray(cl);this.__jt=this.__jw=null;this._disposeObjects(d,bu,M,cn);}
});}
)();
(function(){var f="qx.ui.core.EventHandler",e="activate",d="blur",c="focus",b="input",a="load";qx.Class.define(f,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);this.__ga=qx.event.Registration.getManager(window);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1,touchstart:1,touchend:1,touchmove:1,touchcancel:1,tap:1,swipe:1},IGNORE_CAN_HANDLE:false},members:{__ga:null,__jx:{focusin:1,focusout:1,focus:1,blur:1},__jy:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(g,h){return g instanceof qx.ui.core.Widget;}
,_dispatchEvent:function(j){var p=j.getTarget();var o=qx.ui.core.Widget.getWidgetByElement(p);var q=false;while(o&&o.isAnonymous()){var q=true;o=o.getLayoutParent();}
;if(o&&q&&j.getType()==e){o.getContainerElement().activate();}
;if(this.__jx[j.getType()]){o=o&&o.getFocusTarget();if(!o){return;}
;}
;if(j.getRelatedTarget){var x=j.getRelatedTarget();var w=qx.ui.core.Widget.getWidgetByElement(x);while(w&&w.isAnonymous()){w=w.getLayoutParent();}
;if(w){if(this.__jx[j.getType()]){w=w.getFocusTarget();}
;if(w===o){return;}
;}
;}
;var s=j.getCurrentTarget();var u=qx.ui.core.Widget.getWidgetByElement(s);if(!u||u.isAnonymous()){return;}
;if(this.__jx[j.getType()]){u=u.getFocusTarget();}
;var v=j.getType();if(!u||!(u.isEnabled()||this.__jy[v])){return;}
;var k=j.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;var r=this.__ga.getListeners(u,v,k);if(!r||r.length===0){return;}
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
},destruct:function(){this.__ga=null;}
,defer:function(H){qx.event.Registration.addHandler(H);}
});}
)();
(function(){var t='indexOf',s='slice',r='concat',q='toLocaleLowerCase',p="qx.type.BaseString",o='match',n='toLocaleUpperCase',m='search',k='replace',j='toLowerCase',c='charCodeAt',h='split',f='substring',b='lastIndexOf',a='substr',e='toUpperCase',d='charAt',g="";qx.Class.define(p,{extend:Object,construct:function(u){var u=u||g;this.__jA=u;this.length=u.length;}
,members:{$$isString:true,length:0,__jA:null,toString:function(){return this.__jA;}
,charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);}
,toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(v,w){return qx.core.Object.prototype.base.apply(this,arguments);}
},defer:function(x,y){{}
;var z=[d,c,r,t,b,o,k,m,s,h,a,f,j,e,q,n];y.valueOf=y.toString;if(new x(g).valueOf()==null){delete y.valueOf;}
;for(var i=0,l=z.length;i<l;i++){y[z[i]]=String.prototype[z[i]];}
;}
});}
)();
(function(){var a="qx.locale.LocalizedString";qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,c,d){qx.type.BaseString.call(this,b);this.__jB=c;this.__jC=d;}
,members:{__jB:null,__jC:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__jB,this.__jC);}
}});}
)();
(function(){var l="locale",k="_applyLocale",j="changeLocale",h="C",g="locale.variant",f="qx.dynlocale",e="qx.locale.Manager",d="String",c="singleton",b="",a="_";qx.Class.define(e,{type:c,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__jD=qx.$$translations||{};this.__jE=qx.$$locales||{};var m=qx.core.Environment.get(l);var n=qx.core.Environment.get(g);if(n!==b){m+=a+n;}
;this.__jF=m;this.setLocale(m||this.__jG);}
,statics:{tr:function(o,p){var q=qx.lang.Array.fromArguments(arguments);q.splice(0,1);return qx.locale.Manager.getInstance().translate(o,q);}
,trn:function(r,s,t,u){var v=qx.lang.Array.fromArguments(arguments);v.splice(0,3);if(t!=1){return qx.locale.Manager.getInstance().translate(s,v);}
else {return qx.locale.Manager.getInstance().translate(r,v);}
;}
,trc:function(w,x,y){var z=qx.lang.Array.fromArguments(arguments);z.splice(0,2);return qx.locale.Manager.getInstance().translate(x,z);}
,marktr:function(A){return A;}
},properties:{locale:{check:d,nullable:true,apply:k,event:j}},members:{__jG:h,__jH:null,__jI:null,__jD:null,__jE:null,__jF:null,getLanguage:function(){return this.__jI;}
,getTerritory:function(){return this.getLocale().split(a)[1]||b;}
,getAvailableLocales:function(B){var D=[];for(var C in this.__jE){if(C!=this.__jG){if(this.__jE[C]===null&&!B){continue;}
;D.push(C);}
;}
;return D;}
,__jJ:function(E){var G;if(E==null){return null;}
;var F=E.indexOf(a);if(F==-1){G=E;}
else {G=E.substring(0,F);}
;return G;}
,_applyLocale:function(H,I){{}
;this.__jH=H;this.__jI=this.__jJ(H);}
,addTranslation:function(J,K){var L=this.__jD;if(L[J]){for(var M in K){L[J][M]=K[M];}
;}
else {L[J]=K;}
;}
,addLocale:function(N,O){var P=this.__jE;if(P[N]){for(var Q in O){P[N][Q]=O[Q];}
;}
else {P[N]=O;}
;}
,translate:function(R,S,T){var U=this.__jD;return this.__jK(U,R,S,T);}
,localize:function(V,W,X){var Y=this.__jE;return this.__jK(Y,V,W,X);}
,__jK:function(ba,bb,bc,bd){{}
;var be;if(!ba){return bb;}
;if(bd){var bg=this.__jJ(bd);}
else {bd=this.__jH;bg=this.__jI;}
;if(!be&&ba[bd]){be=ba[bd][bb];}
;if(!be&&ba[bg]){be=ba[bg][bb];}
;if(!be&&ba[this.__jG]){be=ba[this.__jG][bb];}
;if(!be){be=bb;}
;if(bc.length>0){var bf=[];for(var i=0;i<bc.length;i++){var bh=bc[i];if(bh&&bh.translate){bf[i]=bh.translate();}
else {bf[i]=bh;}
;}
;be=qx.lang.String.format(be,bf);}
;if(qx.core.Environment.get(f)){be=new qx.locale.LocalizedString(be,bb,bc);}
;return be;}
},destruct:function(){this.__jD=this.__jE=null;}
});}
)();
(function(){var f="qx.bom.client.Locale",e="locale",d="android",c="locale.variant",b="-",a="";qx.Bootstrap.define(f,{statics:{getLocale:function(){var g=qx.bom.client.Locale.__jL();var h=g.indexOf(b);if(h!=-1){g=g.substr(0,h);}
;return g;}
,getVariant:function(){var i=qx.bom.client.Locale.__jL();var k=a;var j=i.indexOf(b);if(j!=-1){k=i.substr(j+1);}
;return k;}
,__jL:function(){var l=(navigator.userLanguage||navigator.language||a);if(qx.bom.client.OperatingSystem.getName()==d){var m=/(\w{2})-(\w{2})/i.exec(navigator.userAgent);if(m){l=m[0];}
;}
;return l.toLowerCase();}
},defer:function(n){qx.core.Environment.add(e,n.getLocale);qx.core.Environment.add(c,n.getVariant);}
});}
)();
(function(){var k="qx/icon",j="repeat",i=".png",h="crop",g="engine.version",f="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",d='<div style="',c="repeat-y",b='<img src="',a="qx.bom.element.Decoration",I="', sizingMethod='",H='"/>',G="png",F="')",E='"></div>',D='" style="',C="none",B="webkit",A=" ",z="repeat-x",r="DXImageTransform.Microsoft.AlphaImageLoader",s="qx/static/blank.gif",p="absolute",q="scale",n="mshtml",o="b64",l="scale-y",m="no-repeat",t="scale-x",u="",w="engine.name",v="div",y="img",x="px";qx.Class.define(a,{statics:{DEBUG:false,__jM:{},__jN:(qx.core.Environment.get(w)==n)&&qx.core.Environment.get(g)<9,__jO:qx.core.Environment.select(w,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__jP:{"scale-x":y,"scale-y":y,"scale":y,"repeat":v,"no-repeat":v,"repeat-x":v,"repeat-y":v},update:function(J,K,L,M){var O=this.getTagName(L,K);if(O!=J.tagName.toLowerCase()){throw new Error("Image modification not possible because elements could not be replaced at runtime anymore!");}
;var P=this.getAttributes(K,L,M);if(O===y){J.src=P.src||qx.util.ResourceManager.getInstance().toUri(s);}
;if(J.style.backgroundPosition!=u&&P.style.backgroundPosition===undefined){P.style.backgroundPosition=null;}
;if(J.style.clip!=u&&P.style.clip===undefined){P.style.clip=null;}
;var N=qx.bom.element.Style;N.setStyles(J,P.style);if(this.__jN){try{J.filters[r].apply();}
catch(e){}
;}
;}
,create:function(Q,R,S){var T=this.getTagName(R,Q);var V=this.getAttributes(Q,R,S);var U=qx.bom.element.Style.compile(V.style);if(T===y){return b+V.src+D+U+H;}
else {return d+U+E;}
;}
,getTagName:function(W,X){if(X&&this.__jN&&this.__jO[W]&&qx.lang.String.endsWith(X,i)){return v;}
;return this.__jP[W];}
,getAttributes:function(Y,ba,bb){if(!bb){bb={};}
;if(!bb.position){bb.position=p;}
;if((qx.core.Environment.get(w)==n)){bb.fontSize=0;bb.lineHeight=0;}
else if((qx.core.Environment.get(w)==B)){bb.WebkitUserDrag=C;}
;var bd=qx.util.ResourceManager.getInstance().getImageFormat(Y)||qx.io.ImageLoader.getFormat(Y);{}
;var bc;if(this.__jN&&this.__jO[ba]&&bd===G){bc=this.__jS(bb,ba,Y);}
else {if(ba===q){bc=this.__jT(bb,ba,Y);}
else if(ba===t||ba===l){bc=this.__jU(bb,ba,Y);}
else {bc=this.__jX(bb,ba,Y);}
;}
;return bc;}
,__jQ:function(be,bf,bh){if(be.width==null&&bf!=null){be.width=bf+x;}
;if(be.height==null&&bh!=null){be.height=bh+x;}
;}
,__jR:function(bi){var bj=qx.util.ResourceManager.getInstance().getImageWidth(bi)||qx.io.ImageLoader.getWidth(bi);var bk=qx.util.ResourceManager.getInstance().getImageHeight(bi)||qx.io.ImageLoader.getHeight(bi);return {width:bj,height:bk};}
,__jS:function(bl,bm,bn){var bq=this.__jR(bn);this.__jQ(bl,bq.width,bq.height);var bp=bm==m?h:q;var bo=f+qx.util.ResourceManager.getInstance().toUri(bn)+I+bp+F;bl.filter=bo;bl.backgroundImage=bl.backgroundRepeat=u;return {style:bl};}
,__jT:function(br,bs,bt){var bu=qx.util.ResourceManager.getInstance().toUri(bt);var bv=this.__jR(bt);this.__jQ(br,bv.width,bv.height);return {src:bu,style:br};}
,__jU:function(bw,bx,by){var bz=qx.util.ResourceManager.getInstance();var bC=bz.getCombinedFormat(by);var bE=this.__jR(by);var bA;if(bC){var bD=bz.getData(by);var bB=bD[4];if(bC==o){bA=bz.toDataUri(by);}
else {bA=bz.toUri(bB);}
;if(bx===t){bw=this.__jV(bw,bD,bE.height);}
else {bw=this.__jW(bw,bD,bE.width);}
;return {src:bA,style:bw};}
else {{}
;if(bx==t){bw.height=bE.height==null?null:bE.height+x;}
else if(bx==l){bw.width=bE.width==null?null:bE.width+x;}
;bA=bz.toUri(by);return {src:bA,style:bw};}
;}
,__jV:function(bF,bG,bH){var bI=qx.util.ResourceManager.getInstance().getImageHeight(bG[4]);bF.clip={top:-bG[6],height:bH};bF.height=bI+x;if(bF.top!=null){bF.top=(parseInt(bF.top,10)+bG[6])+x;}
else if(bF.bottom!=null){bF.bottom=(parseInt(bF.bottom,10)+bH-bI-bG[6])+x;}
;return bF;}
,__jW:function(bJ,bK,bL){var bM=qx.util.ResourceManager.getInstance().getImageWidth(bK[4]);bJ.clip={left:-bK[5],width:bL};bJ.width=bM+x;if(bJ.left!=null){bJ.left=(parseInt(bJ.left,10)+bK[5])+x;}
else if(bJ.right!=null){bJ.right=(parseInt(bJ.right,10)+bL-bM-bK[5])+x;}
;return bJ;}
,__jX:function(bN,bO,bP){var bS=qx.util.ResourceManager.getInstance();var bX=bS.getCombinedFormat(bP);var ca=this.__jR(bP);if(bX&&bO!==j){var bY=bS.getData(bP);var bW=bY[4];if(bX==o){var bV=bS.toDataUri(bP);var bU=0;var bT=0;}
else {var bV=bS.toUri(bW);var bU=bY[5];var bT=bY[6];}
;var bQ=qx.bom.element.Background.getStyles(bV,bO,bU,bT);for(var bR in bQ){bN[bR]=bQ[bR];}
;if(ca.width!=null&&bN.width==null&&(bO==c||bO===m)){bN.width=ca.width+x;}
;if(ca.height!=null&&bN.height==null&&(bO==z||bO===m)){bN.height=ca.height+x;}
;return {style:bN};}
else {{}
;this.__jQ(bN,ca.width,ca.height);this.__jY(bN,bP,bO);return {style:bN};}
;}
,__jY:function(cb,cc,cd){var top=null;var ch=null;if(cb.backgroundPosition){var ce=cb.backgroundPosition.split(A);ch=parseInt(ce[0],10);if(isNaN(ch)){ch=ce[0];}
;top=parseInt(ce[1],10);if(isNaN(top)){top=ce[1];}
;}
;var cg=qx.bom.element.Background.getStyles(cc,cd,ch,top);for(var cf in cg){cb[cf]=cg[cf];}
;if(cb.filter){cb.filter=u;}
;}
,__ka:function(ci){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(ci)&&ci.indexOf(k)==-1){if(!this.__jM[ci]){qx.log.Logger.debug("Potential clipped image candidate: "+ci);this.__jM[ci]=true;}
;}
;}
,isAlphaImageLoaderEnabled:function(){return qx.bom.element.Decoration.__jN;}
}});}
)();
(function(){var c="load",b="qx.io.ImageLoader",a="html.image.naturaldimensions";qx.Bootstrap.define(b,{statics:{__cR:{},__kb:{width:null,height:null},__kc:/\.(png|gif|jpg|jpeg|bmp)\b/i,__kd:/^data:image\/(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(d){var e=this.__cR[d];return !!(e&&e.loaded);}
,isFailed:function(f){var g=this.__cR[f];return !!(g&&g.failed);}
,isLoading:function(h){var j=this.__cR[h];return !!(j&&j.loading);}
,getFormat:function(k){var m=this.__cR[k];if(!m||!m.format){var o=this.__kd.exec(k);if(o!=null){var p=(m&&qx.lang.Type.isNumber(m.width)?m.width:this.__kb.width);var n=(m&&qx.lang.Type.isNumber(m.height)?m.height:this.__kb.height);m={loaded:true,format:o[1],width:p,height:n};}
;}
;return m?m.format:null;}
,getSize:function(q){var r=this.__cR[q];return r?{width:r.width,height:r.height}:this.__kb;}
,getWidth:function(s){var t=this.__cR[s];return t?t.width:null;}
,getHeight:function(u){var v=this.__cR[u];return v?v.height:null;}
,load:function(w,x,y){var z=this.__cR[w];if(!z){z=this.__cR[w]={};}
;if(x&&!y){y=window;}
;if(z.loaded||z.loading||z.failed){if(x){if(z.loading){z.callbacks.push(x,y);}
else {x.call(y,w,z);}
;}
;}
else {z.loading=true;z.callbacks=[];if(x){z.callbacks.push(x,y);}
;var B=new Image();var A=qx.lang.Function.listener(this.__ke,this,B,w);B.onload=A;B.onerror=A;B.src=w;z.element=B;}
;}
,abort:function(C){var D=this.__cR[C];if(D&&!D.loaded){D.aborted=true;var F=D.callbacks;var E=D.element;E.onload=E.onerror=null;delete D.callbacks;delete D.element;delete D.loading;for(var i=0,l=F.length;i<l;i+=2){F[i].call(F[i+1],C,D);}
;}
;this.__cR[C]=null;}
,__ke:qx.event.GlobalError.observeMethod(function(event,G,H){var I=this.__cR[H];if(event.type===c){I.loaded=true;I.width=this.__kf(G);I.height=this.__kg(G);var J=this.__kc.exec(H);if(J!=null){I.format=J[1];}
;}
else {I.failed=true;}
;G.onload=G.onerror=null;var K=I.callbacks;delete I.loading;delete I.callbacks;delete I.element;for(var i=0,l=K.length;i<l;i+=2){K[i].call(K[i+1],H,I);}
;}
),__kf:function(L){return qx.core.Environment.get(a)?L.naturalWidth:L.width;}
,__kg:function(M){return qx.core.Environment.get(a)?M.naturalHeight:M.height;}
}});}
)();
(function(){var u="')",t="gecko",s="background-image:url(",r=");",q="",p=")",o="background-repeat:",n="engine.version",m="data:",l=" ",e="qx.bom.element.Background",k="url(",h="background-position:",c="base64",b="url('",g="engine.name",f="0",i="px",a=";",j="'",d="number";qx.Class.define(e,{statics:{__kh:[s,null,r,h,null,a,o,null,a],__ki:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__kj:function(v,top){var w=qx.core.Environment.get(g);var x=qx.core.Environment.get(n);if(w==t&&x<1.9&&v==top&&typeof v==d){top+=0.01;}
;if(v){var z=(typeof v==d)?v+i:v;}
else {z=f;}
;if(top){var y=(typeof top==d)?top+i:top;}
else {y=f;}
;return z+l+y;}
,__kk:function(A){var String=qx.lang.String;var B=A.substr(0,50);return String.startsWith(B,m)&&String.contains(B,c);}
,compile:function(C,D,E,top){var F=this.__kj(E,top);var G=qx.util.ResourceManager.getInstance().toUri(C);if(this.__kk(G)){G=j+G+j;}
;var H=this.__kh;H[1]=G;H[4]=F;H[7]=D;return H.join(q);}
,getStyles:function(I,J,K,top){if(!I){return this.__ki;}
;var L=this.__kj(K,top);var N=qx.util.ResourceManager.getInstance().toUri(I);var O;if(this.__kk(N)){O=b+N+u;}
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
(function(){var j="Boolean",i="bottom-right",h="widget",g="qx.ui.core.MPlacement",f="left-top",e="left-middle",d="right-middle",c="top-center",b="offsetRight",a="shorthand",F="offsetLeft",E="top-left",D="appear",C="offsetBottom",B="top",A="top-right",z="offsetTop",y="right-bottom",x="right-top",w="bottom-center",q="left-bottom",r="best-fit",o="placementRight",p="placementLeft",m="mouse",n="bottom-left",k="direct",l="disappear",s="left",t="Integer",v="interval",u="keep-align";qx.Mixin.define(g,{statics:{__gm:null,__kl:s,setVisibleElement:function(G){this.__gm=G;}
,getVisibleElement:function(){return this.__gm;}
,setMoveDirection:function(H){if(H===B||H===s){this.__kl=H;}
else {throw new Error("Invalid value for the parameter 'direction' "+"[qx.ui.core.MPlacement.setMoveDirection()], the value was '"+H+"' "+"but 'top' or 'left' are allowed.");}
;}
,getMoveDirection:function(){return this.__kl;}
},properties:{position:{check:[E,c,A,n,w,i,f,e,q,x,d,y],init:n,themeable:true},placeMethod:{check:[h,m],init:m,themeable:true},domMove:{check:j,init:false},placementModeX:{check:[k,u,r],init:u,themeable:true},placementModeY:{check:[k,u,r],init:u,themeable:true},offsetLeft:{check:t,init:0,themeable:true},offsetTop:{check:t,init:0,themeable:true},offsetRight:{check:t,init:0,themeable:true},offsetBottom:{check:t,init:0,themeable:true},offset:{group:[z,b,C,F],mode:a,themeable:true}},members:{__km:null,__kn:null,__ko:null,getLayoutLocation:function(I){var L,K,M,top;K=I.getBounds();if(!K){return null;}
;M=K.left;top=K.top;var N=K;I=I.getLayoutParent();while(I&&!I.isRootWidget()){K=I.getBounds();M+=K.left;top+=K.top;L=I.getInsets();M+=L.left;top+=L.top;I=I.getLayoutParent();}
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
,placeToWidget:function(V,W){if(W){this.__kp();this.__km=qx.lang.Function.bind(this.placeToWidget,this,V,false);qx.event.Idle.getInstance().addListener(v,this.__km);this.__ko=function(){this.__kp();}
;this.addListener(l,this.__ko,this);}
;var X=V.getContainerLocation()||this.getLayoutLocation(V);if(X!=null){this.__kr(X);return true;}
else {return false;}
;}
,__kp:function(){if(this.__km){qx.event.Idle.getInstance().removeListener(v,this.__km);this.__km=null;}
;if(this.__ko){this.removeListener(l,this.__ko,this);this.__ko=null;}
;}
,placeToMouse:function(event){var ba=event.getDocumentLeft();var top=event.getDocumentTop();var Y={left:ba,top:top,right:ba,bottom:top};this.__kr(Y);}
,placeToElement:function(bb,bc){var location=qx.bom.element.Location.get(bb);var bd={left:location.left,top:location.top,right:location.left+bb.offsetWidth,bottom:location.top+bb.offsetHeight};if(bc){this.__km=qx.lang.Function.bind(this.placeToElement,this,bb,false);qx.event.Idle.getInstance().addListener(v,this.__km);this.addListener(l,function(){if(this.__km){qx.event.Idle.getInstance().removeListener(v,this.__km);this.__km=null;}
;}
,this);}
;this.__kr(bd);}
,placeToPoint:function(be){var bf={left:be.left,top:be.top,right:be.left,bottom:be.top};this.__kr(bf);}
,_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};}
,__kq:function(bg){var bh=null;if(this._computePlacementSize){var bh=this._computePlacementSize();}
else if(this.isVisible()){var bh=this.getBounds();}
;if(bh==null){this.addListenerOnce(D,function(){this.__kq(bg);}
,this);}
else {bg.call(this,bh);}
;}
,__kr:function(bi){this.__kq(function(bj){var bk=qx.util.placement.Placement.compute(bj,this.getLayoutParent().getBounds(),bi,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());this.removeState(p);this.removeState(o);this.addState(bi.left<bk.left?o:p);this.moveTo(bk.left,bk.top);}
);}
},destruct:function(){this.__kp();}
});}
)();
(function(){var f="Number",e="_applyTimeoutInterval",d="qx.event.type.Event",c="qx.event.Idle",b="singleton",a="interval";qx.Class.define(c,{extend:qx.core.Object,type:b,construct:function(){qx.core.Object.call(this);var g=new qx.event.Timer(this.getTimeoutInterval());g.addListener(a,this._onInterval,this);g.start();this.__ks=g;}
,events:{"interval":d},properties:{timeoutInterval:{check:f,init:100,apply:e}},members:{__ks:null,_applyTimeoutInterval:function(h){this.__ks.setInterval(h);}
,_onInterval:function(){this.fireEvent(a);}
},destruct:function(){if(this.__ks){this.__ks.stop();}
;this.__ks=null;}
});}
)();
(function(){var r="-",q="best-fit",p="qx.util.placement.Placement",o='__kt',n="keep-align",m="direct",l="align-start",k="middle",j="align-end",i="align-center",c="center",h="edge-start",f="Class",b="edge-end",a="bottom",e="left",d="top",g="right";qx.Class.define(p,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__kt=qx.util.placement.DirectAxis;}
,properties:{axisX:{check:f},axisY:{check:f},edge:{check:[d,g,a,e],init:d},align:{check:[d,g,a,e,c,k],init:g}},statics:{__ku:null,compute:function(s,t,u,v,w,x,y){var z;this.__ku=this.__ku||new qx.util.placement.Placement();var C=w.split(r);var B=C[0];var A=C[1];{}
;this.__ku.set({axisX:this.__ky(x),axisY:this.__ky(y),edge:B,align:A});return this.__ku.compute(s,t,u,v);}
,__kv:null,__kw:null,__kx:null,__ky:function(D){switch(D){case m:this.__kv=this.__kv||qx.util.placement.DirectAxis;return this.__kv;case n:this.__kw=this.__kw||qx.util.placement.KeepAlignAxis;return this.__kw;case q:this.__kx=this.__kx||qx.util.placement.BestFitAxis;return this.__kx;default:throw new Error("Invalid 'mode' argument!'");};}
},members:{__kt:null,compute:function(E,F,G,H){{}
;var I=this.getAxisX()||this.__kt;var K=I.computeStart(E.width,{start:G.left,end:G.right},{start:H.left,end:H.right},F.width,this.__kz());var J=this.getAxisY()||this.__kt;var top=J.computeStart(E.height,{start:G.top,end:G.bottom},{start:H.top,end:H.bottom},F.height,this.__kA());return {left:K,top:top};}
,__kz:function(){var M=this.getEdge();var L=this.getAlign();if(M==e){return h;}
else if(M==g){return b;}
else if(L==e){return l;}
else if(L==c){return i;}
else if(L==g){return j;}
;}
,__kA:function(){var O=this.getEdge();var N=this.getAlign();if(O==d){return h;}
else if(O==a){return b;}
else if(N==d){return l;}
else if(N==k){return i;}
else if(N==a){return j;}
;}
},destruct:function(){this._disposeObjects(o);}
});}
)();
(function(){var f="align-start",e="align-end",d="qx.util.placement.AbstractAxis",c="edge-start",b="align-center",a="edge-end";qx.Bootstrap.define(d,{extend:Object,statics:{computeStart:function(g,h,i,j,k){throw new Error("abstract method call!");}
,_moveToEdgeAndAlign:function(l,m,n,o){switch(o){case c:return m.start-n.end-l;case a:return m.end+n.start;case f:return m.start+n.start;case b:return m.start+parseInt((m.end-m.start-l)/2,10)+n.start;case e:return m.end-n.end-l;};}
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
(function(){var j="Boolean",i="px",h="engine.version",g="scale",f="changeSource",e="qx.ui.basic.Image",d="loaded",c="-disabled.$1",b="loadingFailed",a="String",z="_applySource",y="__kB",x="img",w="image",v="mshtml",u="_applyScale",t="no-repeat",s=".png",r="div",q="replacement",o="qx.event.type.Event",p="engine.name",m="hidden",n="alphaScaled",k="scaled",l="nonScaled";qx.Class.define(e,{extend:qx.ui.core.Widget,construct:function(A){this.__kB={};qx.ui.core.Widget.call(this);if(A){this.setSource(A);}
;}
,properties:{source:{check:a,init:null,nullable:true,event:f,apply:z,themeable:true},scale:{check:j,init:false,themeable:true,apply:u},appearance:{refine:true,init:w},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},events:{loadingFailed:o,loaded:o},members:{__kC:null,__kD:null,__hQ:null,__kB:null,_onChangeTheme:function(){qx.ui.core.Widget.prototype._onChangeTheme.call(this);this._styleSource();}
,getContentElement:function(){return this.__kH();}
,_createContentElement:function(){return this.__kH();}
,_getContentHint:function(){return {width:this.__kC||0,height:this.__kD||0};}
,_applyEnabled:function(B,C){qx.ui.core.Widget.prototype._applyEnabled.call(this,B,C);if(this.getSource()){this._styleSource();}
;}
,_applySource:function(D){this._styleSource();}
,_applyScale:function(E){this._styleSource();}
,__kE:function(F){this.__hQ=F;}
,__kF:function(){if(this.__hQ==null){var H=this.getSource();var G=false;if(H!=null){G=qx.lang.String.endsWith(H,s);}
;if(this.getScale()&&G&&qx.bom.element.Decoration.isAlphaImageLoaderEnabled()){this.__hQ=n;}
else if(this.getScale()){this.__hQ=k;}
else {this.__hQ=l;}
;}
;return this.__hQ;}
,__kG:function(I){var J;var K;if(I==n){J=true;K=r;}
else if(I==l){J=false;K=r;}
else {J=true;K=x;}
;var L=new qx.html.Image(K);L.setScale(J);L.setStyles({"overflowX":m,"overflowY":m});return L;}
,__kH:function(){var M=this.__kF();if(this.__kB[M]==null){this.__kB[M]=this.__kG(M);}
;return this.__kB[M];}
,_styleSource:function(){var N=qx.util.AliasManager.getInstance().resolve(this.getSource());if(!N){this.getContentElement().resetSource();return;}
;this.__kI(N);if((qx.core.Environment.get(p)==v)&&parseInt(qx.core.Environment.get(h),10)<9){var O=this.getScale()?g:t;this.getContentElement().tagNameHint=qx.bom.element.Decoration.getTagName(O,N);}
;if(qx.util.ResourceManager.getInstance().has(N)){this.__kK(this.getContentElement(),N);}
else if(qx.io.ImageLoader.isLoaded(N)){this.__kL(this.getContentElement(),N);}
else {this.__kM(this.getContentElement(),N);}
;}
,__kI:qx.core.Environment.select(p,{"mshtml":function(P){var R=qx.bom.element.Decoration.isAlphaImageLoaderEnabled();var Q=qx.lang.String.endsWith(P,s);if(R&&Q){if(this.getScale()&&this.__kF()!=n){this.__kE(n);}
else if(!this.getScale()&&this.__kF()!=l){this.__kE(l);}
;}
else {if(this.getScale()&&this.__kF()!=k){this.__kE(k);}
else if(!this.getScale()&&this.__kF()!=l){this.__kE(l);}
;}
;this.__kJ(this.__kH());}
,"default":function(S){if(this.getScale()&&this.__kF()!=k){this.__kE(k);}
else if(!this.getScale()&&this.__kF(l)){this.__kE(l);}
;this.__kJ(this.__kH());}
}),__kJ:function(T){var W=this.getContainerElement();var X=W.getChild(0);if(X!=T){if(X!=null){var ba=i;var U={};var V=this.getInnerSize();if(V!=null){U.width=V.width+ba;U.height=V.height+ba;}
;var Y=this.getInsets();U.left=Y.left+ba;U.top=Y.top+ba;U.zIndex=10;T.setStyles(U,true);T.setSelectable(this.getSelectable());W.removeAt(0);W.addAt(T,0);}
;}
;}
,__kK:function(bb,bc){var be=qx.util.ResourceManager.getInstance();if(!this.getEnabled()){var bd=bc.replace(/\.([a-z]+)$/,c);if(be.has(bd)){bc=bd;this.addState(q);}
else {this.removeState(q);}
;}
;if(bb.getSource()===bc){return;}
;bb.setSource(bc);this.__kP(be.getImageWidth(bc),be.getImageHeight(bc));}
,__kL:function(bf,bg){var bi=qx.io.ImageLoader;bf.setSource(bg);var bh=bi.getWidth(bg);var bj=bi.getHeight(bg);this.__kP(bh,bj);}
,__kM:function(bk,bl){var bm,bn,self;var bo=qx.io.ImageLoader;{}
;if(!bo.isFailed(bl)){bo.load(bl,this.__kO,this);}
else {if(bk!=null){bk.resetSource();}
;}
;}
,__kO:function(bp,bq){if(this.$$disposed===true){return;}
;if(bp!==qx.util.AliasManager.getInstance().resolve(this.getSource())){return;}
;if(bq.failed){this.warn("Image could not be loaded: "+bp);this.fireEvent(b);}
else if(bq.aborted){return;}
else {this.fireEvent(d);}
;this._styleSource();}
,__kP:function(br,bs){if(br!==this.__kC||bs!==this.__kD){this.__kC=br;this.__kD=bs;qx.ui.core.queue.Layout.add(this);}
;}
},destruct:function(){this._disposeMap(y);}
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
(function(){var f="__kQ",d="blur",c="singleton",b="qx.ui.popup.Manager",a="mousedown";qx.Class.define(b,{type:c,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__kQ=[];qx.event.Registration.addListener(document.documentElement,a,this.__kS,this,true);qx.bom.Element.addListener(window,d,this.hideAll,this);}
,members:{__kQ:null,add:function(g){{}
;this.__kQ.push(g);this.__kR();}
,remove:function(h){{}
;if(this.__kQ){qx.lang.Array.remove(this.__kQ,h);this.__kR();}
;}
,hideAll:function(){var j;var k=this.__kQ;if(k){for(var i=0,l=k.length;i<l;i++){var j=k[i];j.getAutoHide()&&j.exclude();}
;}
;}
,__kR:function(){var m=1e7;for(var i=0;i<this.__kQ.length;i++){this.__kQ[i].setZIndex(m++);}
;}
,__kS:function(e){var o=qx.ui.core.Widget.getWidgetByElement(e.getTarget());var p=this.__kQ;for(var i=0;i<p.length;i++){var n=p[i];if(!n.getAutoHide()||o==n||qx.ui.core.Widget.contains(n,o)){continue;}
;n.exclude();}
;}
},destruct:function(){qx.event.Registration.removeListener(document.documentElement,a,this.__kS,this,true);this._disposeArray(f);}
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
(function(){var b="abstract",a="qx.ui.layout.Abstract";qx.Class.define(a,{type:b,extend:qx.core.Object,members:{__eP:null,_invalidChildrenCache:null,__jz:null,invalidateLayoutCache:function(){this.__eP=null;}
,renderLayout:function(c,d){this.warn("Missing renderLayout() implementation!");}
,getSizeHint:function(){if(this.__eP){return this.__eP;}
;return this.__eP=this._computeSizeHint();}
,hasHeightForWidth:function(){return false;}
,getHeightForWidth:function(e){this.warn("Missing getHeightForWidth() implementation!");return null;}
,_computeSizeHint:function(){return null;}
,invalidateChildrenCache:function(){this._invalidChildrenCache=true;}
,verifyLayoutProperty:null,_clearSeparators:function(){var f=this.__jz;if(f instanceof qx.ui.core.LayoutItem){f.clearSeparators();}
;}
,_renderSeparator:function(g,h){this.__jz.renderSeparator(g,h);}
,connectToWidget:function(i){if(i&&this.__jz){throw new Error("It is not possible to manually set the connected widget.");}
;this.__jz=i;this.invalidateChildrenCache();}
,_getWidget:function(){return this.__jz;}
,_applyLayoutChange:function(){if(this.__jz){this.__jz.scheduleLayoutUpdate();}
;}
,_getLayoutChildren:function(){return this.__jz.getLayoutChildren();}
},destruct:function(){this.__jz=this.__eP=null;}
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
;}
;if(bl>bm||bo>bp){if(bl>bm&&bo>bp){bl=bm;bo=bp;}
else if(bl>bm){bo+=(bl-bm);bl=bm;if(bo>bp){bo=bp;}
;}
else if(bo>bp){bl+=(bo-bp);bo=bp;if(bl>bm){bl=bm;}
;}
;}
;return {begin:bl,end:bo};}
}});}
)();
(function(){var b="qx.event.type.Data",a="qx.ui.form.IStringForm";qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;}
,resetValue:function(){}
,getValue:function(){}
}});}
)();
(function(){var k="os.name",j="_applyTextAlign",i="qx.ui.core.Widget",h="nowrap",g="changeStatus",f="changeTextAlign",d="_applyWrap",c="changeValue",b="qx.ui.basic.Label",a="osx",J="css.textoverflow",I="html.xul",H="_applyValue",G="center",F="_applyBuddy",E="String",D="whiteSpace",C="textAlign",B="right",A="gecko",r="justify",s="changeRich",p="normal",q="_applyRich",n="engine.name",o="click",l="label",m="left",t="A",u="Boolean",w="enabled",v="engine.version",y="changeLocale",x="color",z="qx.dynlocale";qx.Class.define(b,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(K){qx.ui.core.Widget.call(this);if(K!=null){this.setValue(K);}
;if(qx.core.Environment.get(z)){qx.locale.Manager.getInstance().addListener(y,this._onChangeLocale,this);}
;}
,properties:{rich:{check:u,init:false,event:s,apply:q},wrap:{check:u,init:true,apply:d},value:{check:E,apply:H,event:c,nullable:true},buddy:{check:i,apply:F,nullable:true,init:null,dereference:true},textAlign:{check:[m,G,B,r],nullable:true,themeable:true,apply:j,event:f},appearance:{refine:true,init:l},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__kT:null,__kU:null,__kV:null,__kW:null,__kX:null,_getContentHint:function(){if(this.__kU){this.__kY=this.__la();delete this.__kU;}
;return {width:this.__kY.width,height:this.__kY.height};}
,_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();}
,_applySelectable:function(L){if(!qx.core.Environment.get(J)&&qx.core.Environment.get(I)){if(L&&!this.isRich()){{}
;return;}
;}
;qx.ui.core.Widget.prototype._applySelectable.call(this,L);}
,_getContentHeightForWidth:function(M){if(!this.getRich()&&!this.getWrap()){return null;}
;return this.__la(M).height;}
,_createContentElement:function(){return new qx.html.Label;}
,_applyTextAlign:function(N,O){this.getContentElement().setStyle(C,N);}
,_applyTextColor:function(P,Q){if(P){this.getContentElement().setStyle(x,qx.theme.manager.Color.getInstance().resolve(P));}
else {this.getContentElement().removeStyle(x);}
;}
,__kY:{width:0,height:0},_applyFont:function(R,S){if(S&&this.__kT&&this.__kX){this.__kT.removeListenerById(this.__kX);this.__kX=null;}
;var T;if(R){this.__kT=qx.theme.manager.Font.getInstance().resolve(R);if(this.__kT instanceof qx.bom.webfonts.WebFont){this.__kX=this.__kT.addListener(g,this._onWebFontStatusChange,this);}
;T=this.__kT.getStyles();}
else {this.__kT=null;T=qx.bom.Font.getDefaultStyles();}
;if(this.getTextColor()!=null){delete T[x];}
;this.getContentElement().setStyles(T);this.__kU=true;qx.ui.core.queue.Layout.add(this);}
,__la:function(U){var Y=qx.bom.Label;var W=this.getFont();var V=W?this.__kT.getStyles():qx.bom.Font.getDefaultStyles();var content=this.getValue()||t;var X=this.getRich();if(this.__kX){this.__lb();}
;return X?Y.getHtmlSize(content,V,U):Y.getTextSize(content,V);}
,__lb:function(){if(!this.getContentElement()){return;}
;if(qx.core.Environment.get(k)==a&&qx.core.Environment.get(n)==A&&parseInt(qx.core.Environment.get(v),10)<16&&parseInt(qx.core.Environment.get(v),10)>9){var ba=this.getContentElement().getDomElement();if(ba){ba.innerHTML=ba.innerHTML;}
;}
;}
,_applyBuddy:function(bb,bc){if(bc!=null){bc.removeBinding(this.__kV);this.__kV=null;this.removeListenerById(this.__kW);this.__kW=null;}
;if(bb!=null){this.__kV=bb.bind(w,this,w);this.__kW=this.addListener(o,function(){if(bb.isFocusable()){bb.focus.apply(bb);}
;}
,this);}
;}
,_applyRich:function(bd){this.getContentElement().setRich(bd);this.__kU=true;qx.ui.core.queue.Layout.add(this);}
,_applyWrap:function(be,bf){if(be&&!this.isRich()){{}
;}
;if(this.isRich()){var bg=be?p:h;this.getContentElement().setStyle(D,bg);}
;}
,_onChangeLocale:qx.core.Environment.select(z,{"true":function(e){var content=this.getValue();if(content&&content.translate){this.setValue(content.translate());}
;}
,"false":null}),_onWebFontStatusChange:function(bh){if(bh.getData().valid===true){this.__kU=true;qx.ui.core.queue.Layout.add(this);}
;}
,_applyValue:function(bi,bj){this.getContentElement().setValue(bi);this.__kU=true;qx.ui.core.queue.Layout.add(this);}
},destruct:function(){if(qx.core.Environment.get(z)){qx.locale.Manager.getInstance().removeListener(y,this._onChangeLocale,this);}
;if(this.__kV!=null){var bk=this.getBuddy();if(bk!=null&&!bk.isDisposed()){bk.removeBinding(this.__kV);}
;}
;if(this.__kT&&this.__kX){this.__kT.removeListenerById(this.__kX);}
;this.__kT=this.__kV=null;}
});}
)();
(function(){var b="qx.html.Label",a="value";qx.Class.define(b,{extend:qx.html.Element,members:{__lc:null,_applyProperty:function(name,c){qx.html.Element.prototype._applyProperty.call(this,name,c);if(name==a){var d=this.getDomElement();qx.bom.Label.setValue(d,c);}
;}
,_createDomElement:function(){var f=this.__lc;var e=qx.bom.Label.create(this._content,f);return e;}
,_copyData:function(g){return qx.html.Element.prototype._copyData.call(this,true);}
,setRich:function(h){var i=this.getDomElement();if(i){throw new Error("The label mode cannot be modified after initial creation");}
;h=!!h;if(this.__lc==h){return this;}
;this.__lc=h;return this;}
,setValue:function(j){this._setProperty(a,j);return this;}
,getValue:function(){return this._getProperty(a);}
}});}
)();
(function(){var j="px",i="crop",h="gecko",g="end",f="100%",e="chrome",d="visible",c="qx.bom.Label",b="safari",a="ellipsis",F="engine.version",E="mshtml",D="-1000px",C="absolute",B="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",A="nowrap",z="div",y="browser.name",x="browser.version",w="normal",q="engine.name",r="block",o="label",p="text",m="value",n="",k="hidden",l="auto",s="0",t="inherit",v="html.xul",u="css.textoverflow";qx.Bootstrap.define(c,{statics:{__ld:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__le:function(){var G=this.__lg(false);document.body.insertBefore(G,document.body.firstChild);return this._textElement=G;}
,__lf:function(){var H=this.__lg(true);document.body.insertBefore(H,document.body.firstChild);return this._htmlElement=H;}
,__lg:function(I){var J=qx.dom.Element.create(z);var K=J.style;K.width=K.height=l;K.left=K.top=D;K.visibility=k;K.position=C;K.overflow=d;K.display=r;if(I){K.whiteSpace=w;}
else {K.whiteSpace=A;if(!qx.core.Environment.get(u)&&qx.core.Environment.get(v)){var L=document.createElementNS(B,o);var K=L.style;K.padding=s;K.margin=s;K.width=l;for(var M in this.__ld){K[M]=t;}
;J.appendChild(L);}
;}
;return J;}
,__lh:function(N){var O={};if(N){O.whiteSpace=w;}
else if(!qx.core.Environment.get(u)&&qx.core.Environment.get(v)){O.display=r;}
else {O.overflow=k;O.whiteSpace=A;O[qx.core.Environment.get(u)]=a;}
;return O;}
,create:function(content,P,Q){if(!Q){Q=window;}
;var R=Q.document.createElement(z);if(P){R.useHtml=true;}
else if(!qx.core.Environment.get(u)&&qx.core.Environment.get(v)){var T=Q.document.createElementNS(B,o);var S=T.style;S.cursor=t;S.color=t;S.overflow=k;S.maxWidth=f;S.padding=s;S.margin=s;S.width=l;for(var U in this.__ld){T.style[U]=t;}
;T.setAttribute(i,g);R.appendChild(T);}
else {qx.bom.element.Style.setStyles(R,this.__lh(P));}
;if(content){this.setValue(R,content);}
;return R;}
,setValue:function(V,W){W=W||n;if(V.useHtml){V.innerHTML=W;}
else if(!qx.core.Environment.get(u)&&qx.core.Environment.get(v)){V.firstChild.setAttribute(m,W);}
else {qx.bom.element.Attribute.set(V,p,W);}
;}
,getValue:function(X){if(X.useHtml){return X.innerHTML;}
else if(!qx.core.Environment.get(u)&&qx.core.Environment.get(v)){return X.firstChild.getAttribute(m)||n;}
else {return qx.bom.element.Attribute.get(X,p);}
;}
,getHtmlSize:function(content,Y,ba){var bb=this._htmlElement||this.__lf();bb.style.width=ba!=undefined?ba+j:l;bb.innerHTML=content;return this.__li(bb,Y);}
,getTextSize:function(bc,bd){var be=this._textElement||this.__le();if(!qx.core.Environment.get(u)&&qx.core.Environment.get(v)){be.firstChild.setAttribute(m,bc);}
else {qx.bom.element.Attribute.set(be,p,bc);}
;return this.__li(be,bd);}
,__li:function(bf,bg){var bh=this.__ld;if(!bg){bg={};}
;for(var bi in bh){bf.style[bi]=bg[bi]||n;}
;var bj=qx.bom.element.Dimension.getSize(bf);if((qx.core.Environment.get(q)==h)){bj.width++;}
;if((qx.core.Environment.get(q)==E)&&parseFloat(qx.core.Environment.get(F))>=9){bj.width++;}
;if(qx.core.Environment.get(y)==e&&parseFloat(qx.core.Environment.get(x))>=22){bj.width++;}
;if(qx.core.Environment.get(y)==b&&parseFloat(qx.core.Environment.get(x))>=6){bj.width++;}
;return bj;}
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
(function(){var i="_applyActiveWindow",h="__ga",g="qx.ui.window.MDesktop",f="__lj",d="changeModal",c="changeVisibility",b="changeActive",a="qx.ui.window.Window";qx.Mixin.define(g,{properties:{activeWindow:{check:a,apply:i,init:null,nullable:true}},members:{__lj:null,__ga:null,getWindowManager:function(){if(!this.__ga){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());}
;return this.__ga;}
,supportsMaximize:function(){return true;}
,setWindowManager:function(j){if(this.__ga){this.__ga.setDesktop(null);}
;j.setDesktop(this);this.__ga=j;}
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
,getWindows:function(){if(!this.__lj){this.__lj=[];}
;return this.__lj;}
},destruct:function(){this._disposeArray(f);this._disposeObjects(h);}
});}
)();
(function(){var f="_applyBlockerColor",e="Number",d="__lk",c="qx.ui.core.MBlocker",b="_applyBlockerOpacity",a="Color";qx.Mixin.define(c,{construct:function(){this.__lk=this._createBlocker();}
,properties:{blockerColor:{check:a,init:null,nullable:true,apply:f,themeable:true},blockerOpacity:{check:e,init:1,apply:b,themeable:true}},members:{__lk:null,_createBlocker:function(){return new qx.ui.core.Blocker(this);}
,_applyBlockerColor:function(g,h){this.__lk.setColor(g);}
,_applyBlockerOpacity:function(i,j){this.__lk.setOpacity(i);}
,block:function(){this.__lk.block();}
,isBlocked:function(){return this.__lk.isBlocked();}
,unblock:function(){this.__lk.unblock();}
,forceUnblock:function(){this.__lk.forceUnblock();}
,blockContent:function(k){this.__lk.blockContent(k);}
,isContentBlocked:function(){return this.__lk.isContentBlocked();}
,unblockContent:function(){this.__lk.unblockContent();}
,forceUnblockContent:function(){this.__lk.forceUnblockContent();}
,getBlocker:function(){return this.__lk;}
},destruct:function(){this._disposeObjects(d);}
});}
)();
(function(){var l="backgroundColor",k="_applyOpacity",j="Boolean",h="opacity",g="__ks",f="interval",d="Tab",c="Color",b="qx.ui.root.Page",a="__lp",B="__lk",A="qx.ui.core.Blocker",z="qx.ui.root.Application",y="Number",x="_applyColor",w="px",v="keydown",u="deactivate",t="changeTheme",s="qx.event.type.Event",q="resize",r="keyup",o="keypress",p="blocked",m="unblocked",n="zIndex";qx.Class.define(A,{extend:qx.core.Object,events:{blocked:s,unblocked:s},construct:function(C){qx.core.Object.call(this);this._widget=C;this._isPageRoot=(qx.Class.isDefined(b)&&C instanceof qx.ui.root.Page);if(this._isPageRoot){C.addListener(q,this.__lr,this);}
;if(qx.Class.isDefined(z)&&C instanceof qx.ui.root.Application){this.setKeepBlockerActive(true);}
;qx.theme.manager.Appearance.getInstance().addListener(t,this._onChangeTheme,this);this.__ll=[];this.__lm=[];this.__ln=[];}
,properties:{color:{check:c,init:null,nullable:true,apply:x,themeable:true},opacity:{check:y,init:1,apply:k,themeable:true},keepBlockerActive:{check:j,init:false}},members:{__lk:null,__lo:0,__lp:null,__ln:null,__ll:null,__lm:null,__lq:null,__ks:null,_isPageRoot:false,_widget:null,__lr:function(e){var D=e.getData();if(this.isContentBlocked()){this.getContentBlockerElement().setStyles({width:D.width,height:D.height});}
;if(this.isBlocked()){this.getBlockerElement().setStyles({width:D.width,height:D.height});}
;}
,_applyColor:function(E,F){var G=qx.theme.manager.Color.getInstance().resolve(E);this.__ls(l,G);}
,_applyOpacity:function(H,I){this.__ls(h,H);}
,_onChangeTheme:function(){this._applyColor(this.getColor());}
,__ls:function(J,K){var L=[];this.__lk&&L.push(this.__lk);this.__lp&&L.push(this.__lp);for(var i=0;i<L.length;i++){L[i].setStyle(J,K);}
;}
,_backupActiveWidget:function(){var M=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);this.__ll.push(M.getActive());this.__lm.push(M.getFocus());if(this._widget.isFocusable()){this._widget.focus();}
;}
,_restoreActiveWidget:function(){var P=this.__ll.length;if(P>0){var O=this.__ll[P-1];if(O){qx.bom.Element.activate(O);}
;this.__ll.pop();}
;var N=this.__lm.length;if(N>0){var O=this.__lm[N-1];if(O){qx.bom.Element.focus(this.__lm[N-1]);}
;this.__lm.pop();}
;}
,__lt:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());}
,getBlockerElement:function(){if(!this.__lk){this.__lk=this.__lt();this.__lk.setStyle(n,15);this._widget.getContainerElement().add(this.__lk);this.__lk.exclude();}
;return this.__lk;}
,block:function(){this.__lo++;if(this.__lo<2){this._backupActiveWidget();var Q=this.getBlockerElement();Q.include();Q.activate();Q.addListener(u,this.__ly,this);Q.addListener(o,this.__lx,this);Q.addListener(v,this.__lx,this);Q.addListener(r,this.__lx,this);this.fireEvent(p,qx.event.type.Event);}
;}
,isBlocked:function(){return this.__lo>0;}
,unblock:function(){if(!this.isBlocked()){return;}
;this.__lo--;if(this.__lo<1){this.__lu();this.__lo=0;}
;}
,forceUnblock:function(){if(!this.isBlocked()){return;}
;this.__lo=0;this.__lu();}
,__lu:function(){this._restoreActiveWidget();var R=this.getBlockerElement();R.removeListener(u,this.__ly,this);R.removeListener(o,this.__lx,this);R.removeListener(v,this.__lx,this);R.removeListener(r,this.__lx,this);R.exclude();this.fireEvent(m,qx.event.type.Event);}
,getContentBlockerElement:function(){if(!this.__lp){this.__lp=this.__lt();this._widget.getContentElement().add(this.__lp);this.__lp.exclude();}
;return this.__lp;}
,blockContent:function(S){var T=this.getContentBlockerElement();T.setStyle(n,S);this.__ln.push(S);if(this.__ln.length<2){T.include();if(this._isPageRoot){if(!this.__ks){this.__ks=new qx.event.Timer(300);this.__ks.addListener(f,this.__lw,this);}
;this.__ks.start();this.__lw();}
;this.fireEvent(p,qx.event.type.Event);}
;}
,isContentBlocked:function(){return this.__ln.length>0;}
,unblockContent:function(){if(!this.isContentBlocked()){return;}
;this.__ln.pop();var U=this.__ln[this.__ln.length-1];var V=this.getContentBlockerElement();V.setStyle(n,U);if(this.__ln.length<1){this.__lv();this.__ln=[];}
;}
,forceUnblockContent:function(){if(!this.isContentBlocked()){return;}
;this.__ln=[];var W=this.getContentBlockerElement();W.setStyle(n,null);this.__lv();}
,__lv:function(){this.getContentBlockerElement().exclude();if(this._isPageRoot){this.__ks.stop();}
;this.fireEvent(m,qx.event.type.Event);}
,__lw:function(){var X=this._widget.getContainerElement().getDomElement();var Y=qx.dom.Node.getDocument(X);this.getContentBlockerElement().setStyles({height:Y.documentElement.scrollHeight+w,width:Y.documentElement.scrollWidth+w});}
,__lx:function(e){if(e.getKeyIdentifier()==d){e.stop();}
;}
,__ly:function(){if(this.getKeepBlockerActive()){this.getBlockerElement().activate();}
;}
},destruct:function(){qx.theme.manager.Appearance.getInstance().removeListener(t,this._onChangeTheme,this);if(this._isPageRoot){this._widget.removeListener(q,this.__lr,this);}
;this._disposeObjects(a,B,g);this.__lq=this.__ll=this.__lm=this._widget=this.__ln=null;}
});}
)();
(function(){var u="changeGlobalCursor",t="engine.name",s="keypress",r="Boolean",q="root",p="",o=" !important",n="input",m="_applyGlobalCursor",l="Space",d="_applyNativeHelp",k=";",h="event.help",c="qx.ui.root.Abstract",b="abstract",g="textarea",f="String",i="*",a="help",j="contextmenu";qx.Class.define(c,{type:b,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){qx.ui.core.Widget.call(this);qx.ui.core.FocusHandler.getInstance().addRoot(this);qx.ui.core.queue.Visibility.add(this);this.initNativeHelp();this.addListener(s,this.__lA,this);}
,properties:{appearance:{refine:true,init:q},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:f,nullable:true,themeable:true,apply:m,event:u},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:r,init:false,apply:d}},members:{__lz:null,isRootWidget:function(){return true;}
,getLayout:function(){return this._getLayout();}
,_applyGlobalCursor:qx.core.Environment.select(t,{"mshtml":function(v,w){}
,"default":function(x,y){var z=qx.bom.Stylesheet;var A=this.__lz;if(!A){this.__lz=A=z.createElement();}
;z.removeAllRules(A);if(x){z.addRule(A,i,qx.bom.element.Cursor.compile(x).replace(k,p)+o);}
;}
}),_applyNativeContextMenu:function(B,C){if(B){this.removeListener(j,this._onNativeContextMenu,this,true);}
else {this.addListener(j,this._onNativeContextMenu,this,true);}
;}
,_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;}
;e.preventDefault();}
,__lA:function(e){if(e.getKeyIdentifier()!==l){return;}
;var E=e.getTarget();var D=qx.ui.core.FocusHandler.getInstance();if(!D.isFocused(E)){return;}
;var F=E.getContentElement().getNodeName();if(F===n||F===g){return;}
;e.preventDefault();}
,_applyNativeHelp:function(G,H){if(qx.core.Environment.get(h)){if(H===false){qx.bom.Event.removeNativeListener(document,a,(function(){return false;}
));}
;if(G===false){qx.bom.Event.addNativeListener(document,a,(function(){return false;}
));}
;}
;}
},destruct:function(){this.__lz=null;}
,defer:function(I,J){qx.ui.core.MChildrenHandling.remap(J);}
});}
)();
(function(){var k="keypress",j="focusout",h="__lB",g="activate",f="Tab",d="singleton",c="deactivate",b="focusin",a="qx.ui.core.FocusHandler";qx.Class.define(a,{extend:qx.core.Object,type:d,construct:function(){qx.core.Object.call(this);this.__lB={};}
,members:{__lB:null,__lC:null,__lD:null,__lE:null,connectTo:function(m){m.addListener(k,this.__hj,this);m.addListener(b,this._onFocusIn,this,true);m.addListener(j,this._onFocusOut,this,true);m.addListener(g,this._onActivate,this,true);m.addListener(c,this._onDeactivate,this,true);}
,addRoot:function(n){this.__lB[n.$$hash]=n;}
,removeRoot:function(o){delete this.__lB[o.$$hash];}
,getActiveWidget:function(){return this.__lC;}
,isActive:function(p){return this.__lC==p;}
,getFocusedWidget:function(){return this.__lD;}
,isFocused:function(q){return this.__lD==q;}
,isFocusRoot:function(r){return !!this.__lB[r.$$hash];}
,_onActivate:function(e){var t=e.getTarget();this.__lC=t;var s=this.__lF(t);if(s!=this.__lE){this.__lE=s;}
;}
,_onDeactivate:function(e){var u=e.getTarget();if(this.__lC==u){this.__lC=null;}
;}
,_onFocusIn:function(e){var v=e.getTarget();if(v!=this.__lD){this.__lD=v;v.visualizeFocus();}
;}
,_onFocusOut:function(e){var w=e.getTarget();if(w==this.__lD){this.__lD=null;w.visualizeBlur();}
;}
,__hj:function(e){if(e.getKeyIdentifier()!=f){return;}
;if(!this.__lE){return;}
;e.stopPropagation();e.preventDefault();var x=this.__lD;if(!e.isShiftPressed()){var y=x?this.__lJ(x):this.__lH();}
else {var y=x?this.__lK(x):this.__lI();}
;if(y){y.tabFocus();}
;}
,__lF:function(z){var A=this.__lB;while(z){if(A[z.$$hash]){return z;}
;z=z.getLayoutParent();}
;return null;}
,__lG:function(B,C){if(B===C){return 0;}
;var E=B.getTabIndex()||0;var D=C.getTabIndex()||0;if(E!=D){return E-D;}
;var J=B.getContainerElement().getDomElement();var I=C.getContainerElement().getDomElement();var H=qx.bom.element.Location;var G=H.get(J);var F=H.get(I);if(G.top!=F.top){return G.top-F.top;}
;if(G.left!=F.left){return G.left-F.left;}
;var K=B.getZIndex();var L=C.getZIndex();if(K!=L){return K-L;}
;return 0;}
,__lH:function(){return this.__lN(this.__lE,null);}
,__lI:function(){return this.__lO(this.__lE,null);}
,__lJ:function(M){var N=this.__lE;if(N==M){return this.__lH();}
;while(M&&M.getAnonymous()){M=M.getLayoutParent();}
;if(M==null){return [];}
;var O=[];this.__lL(N,M,O);O.sort(this.__lG);var P=O.length;return P>0?O[0]:this.__lH();}
,__lK:function(Q){var R=this.__lE;if(R==Q){return this.__lI();}
;while(Q&&Q.getAnonymous()){Q=Q.getLayoutParent();}
;if(Q==null){return [];}
;var S=[];this.__lM(R,Q,S);S.sort(this.__lG);var T=S.length;return T>0?S[T-1]:this.__lI();}
,__lL:function(parent,U,V){var W=parent.getLayoutChildren();var X;for(var i=0,l=W.length;i<l;i++){X=W[i];if(!(X instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(X)&&X.isEnabled()&&X.isVisible()){if(X.isTabable()&&this.__lG(U,X)<0){V.push(X);}
;this.__lL(X,U,V);}
;}
;}
,__lM:function(parent,Y,ba){var bb=parent.getLayoutChildren();var bc;for(var i=0,l=bb.length;i<l;i++){bc=bb[i];if(!(bc instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(bc)&&bc.isEnabled()&&bc.isVisible()){if(bc.isTabable()&&this.__lG(Y,bc)>0){ba.push(bc);}
;this.__lM(bc,Y,ba);}
;}
;}
,__lN:function(parent,bd){var be=parent.getLayoutChildren();var bf;for(var i=0,l=be.length;i<l;i++){bf=be[i];if(!(bf instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(bf)&&bf.isEnabled()&&bf.isVisible()){if(bf.isTabable()){if(bd==null||this.__lG(bf,bd)<0){bd=bf;}
;}
;bd=this.__lN(bf,bd);}
;}
;return bd;}
,__lO:function(parent,bg){var bh=parent.getLayoutChildren();var bi;for(var i=0,l=bh.length;i<l;i++){bi=bh[i];if(!(bi instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(bi)&&bi.isEnabled()&&bi.isVisible()){if(bi.isTabable()){if(bg==null||this.__lG(bi,bg)>0){bg=bi;}
;}
;bg=this.__lO(bi,bg);}
;}
;return bg;}
},destruct:function(){this._disposeMap(h);this.__lD=this.__lC=this.__lE=null;}
});}
)();
(function(){var n="resize",m="engine.name",l="position",k="0px",j="webkit",i="paddingLeft",h="$$widget",g="qx.ui.root.Application",f="hidden",d="div",a="paddingTop",c="100%",b="absolute";qx.Class.define(g,{extend:qx.ui.root.Abstract,construct:function(o){this.__cp=qx.dom.Node.getWindow(o);this.__lP=o;qx.ui.root.Abstract.call(this);qx.event.Registration.addListener(this.__cp,n,this._onResize,this);this._setLayout(new qx.ui.layout.Canvas());qx.ui.core.queue.Layout.add(this);qx.ui.core.FocusHandler.getInstance().connectTo(this);this.getContentElement().disableScrolling();}
,members:{__cp:null,__lP:null,_createContainerElement:function(){var p=this.__lP;if((qx.core.Environment.get(m)==j)){if(!p.body){alert("The application could not be started due to a missing body tag in the HTML file!");}
;}
;var t=p.documentElement.style;var q=p.body.style;t.overflow=q.overflow=f;t.padding=t.margin=q.padding=q.margin=k;t.width=t.height=q.width=q.height=c;var s=p.createElement(d);p.body.appendChild(s);var r=new qx.html.Root(s);r.setStyle(l,b);r.setAttribute(h,this.toHashCode());return r;}
,_onResize:function(e){qx.ui.core.queue.Layout.add(this);if(qx.ui.popup&&qx.ui.popup.Manager){qx.ui.popup.Manager.getInstance().hideAll();}
;if(qx.ui.menu&&qx.ui.menu.Manager){qx.ui.menu.Manager.getInstance().hideAll();}
;}
,_computeSizeHint:function(){var u=qx.bom.Viewport.getWidth(this.__cp);var v=qx.bom.Viewport.getHeight(this.__cp);return {minWidth:u,width:u,maxWidth:u,minHeight:v,height:v,maxHeight:v};}
,_applyPadding:function(w,x,name){if(w&&(name==a||name==i)){throw new Error("The root widget does not support 'left', or 'top' paddings!");}
;qx.ui.root.Abstract.prototype._applyPadding.call(this,w,x,name);}
,_applyDecorator:function(y,z){qx.ui.root.Abstract.prototype._applyDecorator.call(this,y,z);if(!y){return;}
;var A=this.getDecoratorElement().getInsets();if(A.left||A.top){throw new Error("The root widget does not support decorators with 'left', or 'top' insets!");}
;}
},destruct:function(){this.__cp=this.__lP=null;}
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
;qx.html.Element.call(this,f,z);this.addListener(j,this._stopPropagation,this);this.addListener(r,this._stopPropagation,this);this.addListener(u,this._stopPropagation,this);this.addListener(d,this._stopPropagation,this);this.addListener(a,this._stopPropagation,this);this.addListener(w,this._stopPropagation,this);this.addListener(g,this._stopPropagation,this);this.addListener(c,this._stopPropagation,this);this.addListener(q,this._stopPropagation,this);this.addListener(v,this.__lQ,this);this.addListener(p,this.__lQ,this);}
,members:{_stopPropagation:function(e){e.stopPropagation();}
,__lQ:function(){var A=this.getStyle(m);this.setStyle(m,null,true);this.setStyle(m,A,true);}
}});}
)();
(function(){var b="qx.dev.unit.TestLoader",a="__unknown_class__";qx.Class.define(b,{extend:qx.application.Standalone,include:[qx.dev.unit.MTestLoader],members:{main:function(){qx.application.Standalone.prototype.main.call(this);qx.log.appender.Console;var c=this._getClassNameFromUrl();if(c!==a){this.setTestNamespace(this._getClassNameFromUrl());}
;if(window.top.jsUnitTestSuite){this.runJsUnit();return;}
;if(window==window.top){this.runStandAlone();return;}
;}
}});}
)();
(function(){var k='.qxconsole .messages{background:white;height:100%;width:100%;overflow:auto;}',j="Enter",i="px",h='.qxconsole .messages .user-result{background:white}',g='.qxconsole .messages .level-error{background:#FFE2D5}',f="div",d="user-command",c='<div class="command">',b='.qxconsole .command input:focus{outline:none;}',a='.qxconsole .messages .type-key{color:#565656;font-style:italic}',V='.qxconsole .messages .type-instance{color:#565656;font-weight:bold}',U='.qxconsole .messages div{padding:0px 4px;}',T='.qxconsole .messages .level-debug{background:white}',S='.qxconsole .messages .type-class{color:#5F3E8A;font-weight:bold}',R="DIV",Q='.qxconsole .messages .level-user{background:#E3EFE9}',P='<div class="qxconsole">',O="D",N='.qxconsole .messages .type-map{color:#CC3E8A;font-weight:bold;}',M='.qxconsole .messages .type-string{color:black;font-weight:normal;}',r='.qxconsole .control a{text-decoration:none;color:black;}',s='<div class="messages">',p='.qxconsole .messages .type-boolean{color:#15BC91;font-weight:normal;}',q='<input type="text"/>',n="clear",o='.qxconsole .command input{width:100%;border:0 none;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',l='.qxconsole .messages .type-array{color:#CC3E8A;font-weight:bold;}',m='.qxconsole{z-index:10000;width:600px;height:300px;top:0px;right:0px;position:absolute;border-left:1px solid black;color:black;border-bottom:1px solid black;color:black;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',t='.qxconsole .command{background:white;padding:2px 4px;border-top:1px solid black;}',u='.qxconsole .messages .user-command{color:blue}',B="F7",z="qx.log.appender.Console",F='.qxconsole .messages .level-info{background:#DEEDFA}',D="block",I='.qxconsole .messages .level-warn{background:#FFF7D5}',H='.qxconsole .messages .type-stringify{color:#565656;font-weight:bold}',w='.qxconsole .messages .user-error{background:#FFE2D5}',L='.qxconsole .control{background:#cdcdcd;border-bottom:1px solid black;padding:4px 8px;}',K='<div class="control"><a href="javascript:qx.log.appender.Console.clear()">Clear</a> | <a href="javascript:qx.log.appender.Console.toggle()">Hide</a></div>',J=">>> ",v="Down",x='.qxconsole .messages .type-number{color:#155791;font-weight:normal;}',y="Up",A="none",C="keypress",E='</div>',G="";qx.Class.define(z,{statics:{__lS:null,__ck:null,__lT:null,__lU:null,init:function(){var W=[m,L,r,k,U,u,h,w,T,F,I,g,Q,M,x,p,l,N,a,S,V,H,t,o,b];qx.bom.Stylesheet.createElement(W.join(G));var Y=[P,K,s,E,c,q,E,E];var ba=document.createElement(R);ba.innerHTML=Y.join(G);var X=ba.firstChild;document.body.appendChild(ba.firstChild);this.__lS=X;this.__ck=X.childNodes[1];this.__lT=X.childNodes[2].firstChild;this.__lr();qx.log.Logger.register(this);qx.core.ObjectRegistry.register(this);}
,dispose:function(){qx.event.Registration.removeListener(document.documentElement,C,this.__hj,this);qx.log.Logger.unregister(this);}
,clear:function(){this.__ck.innerHTML=G;}
,process:function(bb){this.__ck.appendChild(qx.log.appender.Util.toHtml(bb));this.__lV();}
,__lV:function(){this.__ck.scrollTop=this.__ck.scrollHeight;}
,__gm:true,toggle:function(){if(!this.__lS){this.init();}
else if(this.__lS.style.display==A){this.show();}
else {this.__lS.style.display=A;}
;}
,show:function(){if(!this.__lS){this.init();}
else {this.__lS.style.display=D;this.__ck.scrollTop=this.__ck.scrollHeight;}
;}
,__lW:[],execute:function(){var be=this.__lT.value;if(be==G){return;}
;if(be==n){this.clear();return;}
;var bc=document.createElement(f);bc.innerHTML=qx.log.appender.Util.escapeHTML(J+be);bc.className=d;this.__lW.push(be);this.__lU=this.__lW.length;this.__ck.appendChild(bc);this.__lV();try{var bd=window.eval(be);}
catch(bf){qx.log.Logger.error(bf);}
;if(bd!==undefined){qx.log.Logger.debug(bd);}
;}
,__lr:function(e){this.__ck.style.height=(this.__lS.clientHeight-this.__lS.firstChild.offsetHeight-this.__lS.lastChild.offsetHeight)+i;}
,__hj:function(e){var bh=e.getKeyIdentifier();if((bh==B)||(bh==O&&e.isCtrlPressed())){this.toggle();e.preventDefault();}
;if(!this.__lS){return;}
;if(!qx.dom.Hierarchy.contains(this.__lS,e.getTarget())){return;}
;if(bh==j&&this.__lT.value!=G){this.execute();this.__lT.value=G;}
;if(bh==y||bh==v){this.__lU+=bh==y?-1:1;this.__lU=Math.min(Math.max(0,this.__lU),this.__lW.length);var bg=this.__lW[this.__lU];this.__lT.value=bg||G;this.__lT.select();}
;}
},defer:function(bi){qx.event.Registration.addListener(document.documentElement,C,bi.__hj,bi);}
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
,escapeHTML:function(bd){return String(bd).replace(/[<>&"']/g,this.__lR);}
,__lR:function(be){var bf={"<":M,">":f,"&":I,"'":H,'"':E};return bf[be]||o;}
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
(function(){var g="ca.inocybe.services.test.DemoTest",f="A rose by any other name is still a rose",e="Can false be true?!",d="You must be kidding, 3 can never be outside [1,10]!",c="This should never fail!";qx.Class.define(g,{extend:qx.dev.unit.TestCase,members:{testSimple:function(){this.assertEquals(4,3+1,c);this.assertFalse(false,e);}
,testAdvanced:function(){var a=3;var b=a;this.assertIdentical(a,b,f);this.assertInRange(3,1,10,d);}
}});}
)();
(function(){var j="qx.debug.dispose",i="insetTop",h="insetBottom",g="sliceBottom",f="_applyFill",e="The value of the property 'rightSlice' is null! ",d="sliceLeft",c="_applyBaseImage",b="sliceRight",a="The value of the property 'bottomSlice' is null! ",B="String",A="The value of the property 'leftSlice' is null! ",z="insetRight",y="sliceTop",x="The value of the property 'topSlice' is null! ",w="insetLeft",v="qx.ui.decoration.Grid",u="-l",t="set",s="-t",q="-r",r="-b",o="shorthand",p="_applySlices",m="Please verify the image '",n="_applyInsets",k="' is present.",l="Number";qx.Class.define(v,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],construct:function(C,D){qx.core.Object.call(this);if(qx.ui.decoration.css3.BorderImage.IS_SUPPORTED){this.__sn=new qx.ui.decoration.css3.BorderImage();if(C){this.__so(C);}
;}
else {this.__sn=new qx.ui.decoration.GridDiv(C);}
;if(D!=null){this.__sn.setInsets(D);}
;if(qx.core.Environment.get(j)){this.__sn.$$ignoreDisposeWarning=true;}
;}
,properties:{baseImage:{check:B,nullable:true,apply:c},insetLeft:{check:l,nullable:true,apply:n},insetRight:{check:l,nullable:true,apply:n},insetBottom:{check:l,nullable:true,apply:n},insetTop:{check:l,nullable:true,apply:n},insets:{group:[i,z,h,w],mode:o},sliceLeft:{check:l,nullable:true,apply:p},sliceRight:{check:l,nullable:true,apply:p},sliceBottom:{check:l,nullable:true,apply:p},sliceTop:{check:l,nullable:true,apply:p},slices:{group:[y,b,g,d],mode:o},fill:{apply:f}},members:{__sn:null,getMarkup:function(){return this.__sn.getMarkup();}
,resize:function(E,F,G){this.__sn.resize(E,F,G);}
,tint:function(H,I){}
,getInsets:function(){return this.__sn.getInsets();}
,_applyInsets:function(J,K,name){var L=t+qx.lang.String.firstUp(name);this.__sn[L](J);}
,_applySlices:function(M,N,name){var O=t+qx.lang.String.firstUp(name);if(this.__sn[O]){this.__sn[O](M);}
;}
,_applyFill:function(P,Q,name){if(this.__sn.setFill){this.__sn.setFill(P);}
;}
,_applyBaseImage:function(R,S){if(this.__sn instanceof qx.ui.decoration.GridDiv){this.__sn.setBaseImage(R);}
else {this.__so(R);}
;}
,__so:function(T){this.__sn.setBorderImage(T);var be=qx.util.AliasManager.getInstance().resolve(T);var bf=/(.*)(\.[a-z]+)$/.exec(be);var ba=bf[1];var bd=bf[2];var W=qx.util.ResourceManager.getInstance();var bg=W.getImageHeight(ba+s+bd);var U=W.getImageWidth(ba+q+bd);var V=W.getImageHeight(ba+r+bd);var bh=W.getImageWidth(ba+u+bd);if(false&&!this.__sn instanceof qx.ui.decoration.css3.BorderImage){var X=x+m+ba+s+bd+k;var Y=e+m+ba+q+bd+k;var bc=a+m+ba+r+bd+k;var bb=A+m+ba+u+bd+k;qx.core.Assert.assertNotNull(bg,X);qx.core.Assert.assertNotNull(U,Y);qx.core.Assert.assertNotNull(V,bc);qx.core.Assert.assertNotNull(bh,bb);}
;if(bg&&U&&V&&bh){this.__sn.setSlice([bg,U,V,bh]);}
;}
},destruct:function(){this.__sn.dispose();this.__sn=null;}
});}
)();
(function(){var j="css.borderimage.standardsyntax",i="Boolean",h="px ",g="sliceBottom",f="solid",e=";'></div>",d="<div style='",c="sliceLeft",b="sliceRight",a="repeatX",D=" fill",C="String",B="qx.ui.decoration.css3.BorderImage",A="border-box",z="transparent",y='") ',x="sliceTop",w='url("',v="hidden",u="repeatY",q="absolute",r="repeat",o="",p="round",m="shorthand",n="px",k=" ",l="stretch",s="Integer",t="_applyStyle";qx.Class.define(B,{extend:qx.ui.decoration.Abstract,construct:function(E,F){qx.ui.decoration.Abstract.call(this);if(E!=null){this.setBorderImage(E);}
;if(F!=null){this.setSlice(F);}
;}
,statics:{IS_SUPPORTED:qx.bom.element.Style.isPropertySupported("borderImage")},properties:{borderImage:{check:C,nullable:true,apply:t},sliceTop:{check:s,init:0,apply:t},sliceRight:{check:s,init:0,apply:t},sliceBottom:{check:s,init:0,apply:t},sliceLeft:{check:s,init:0,apply:t},slice:{group:[x,b,g,c],mode:m},repeatX:{check:[l,r,p],init:l,apply:t},repeatY:{check:[l,r,p],init:l,apply:t},repeat:{group:[a,u],mode:m},fill:{check:i,init:true}},members:{__ow:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};}
,_isInitialized:function(){return !!this.__ow;}
,getMarkup:function(){if(this.__ow){return this.__ow;}
;var G=this._resolveImageUrl(this.getBorderImage());var H=[this.getSliceTop(),this.getSliceRight(),this.getSliceBottom(),this.getSliceLeft()];var I=[this.getRepeatX(),this.getRepeatY()].join(k);var J=this.getFill()&&qx.core.Environment.get(j)?D:o;this.__ow=[d,qx.bom.element.Style.compile({"borderImage":w+G+y+H.join(k)+J+k+I,"borderStyle":f,"borderColor":z,position:q,lineHeight:0,fontSize:0,overflow:v,boxSizing:A,borderWidth:H.join(h)+n}),e].join(o);return this.__ow;}
,resize:function(K,L,M){K.style.width=L+n;K.style.height=M+n;}
,tint:function(N,O){}
,_applyStyle:function(P,Q,name){{}
;}
,_resolveImageUrl:function(R){return qx.util.ResourceManager.getInstance().toUri(qx.util.AliasManager.getInstance().resolve(R));}
},destruct:function(){this.__ow=null;}
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
;{f=qx.theme.manager.Color.getInstance().resolve(f);}
;g.backgroundColor=f||a;}
,_resizeBackgroundColor:function(h,i,j){var k=this.getInsets();i-=k.left+k.right;j-=k.top+k.bottom;return {left:k.left,top:k.top,width:i,height:j};}
,_applyBackgroundColor:function(){{}
;}
}});}
)();
(function(){var u="mshtml",t="engine.name",s="backgroundPositionX",r='<div style="',q="backgroundPositionY",p='</div>',o='">',n="no-repeat",m="engine.version",l="scale",e=" ",k="repeat-x",h="repeat-y",c="hidden",b="qx.ui.decoration.MBackgroundImage",g="String",f="browser.quirksmode",i="repeat",a="",j="_applyBackgroundPosition",d="_applyBackgroundImage";qx.Mixin.define(b,{properties:{backgroundImage:{check:g,nullable:true,apply:d},backgroundRepeat:{check:[i,k,h,n,l],init:i,apply:d},backgroundPositionX:{nullable:true,apply:j},backgroundPositionY:{nullable:true,apply:j},backgroundPosition:{group:[q,s]}},members:{__ov:false,_generateMarkup:function(v,content){return this._generateBackgroundMarkup(v,content);}
,_generateBackgroundMarkup:function(w,content){var A=a;var z=this.getBackgroundImage();var y=this.getBackgroundRepeat();var top=this.getBackgroundPositionY();if(top==null){top=0;}
;var B=this.getBackgroundPositionX();if(B==null){B=0;}
;w.backgroundPosition=B+e+top;if(z){var x=qx.util.AliasManager.getInstance().resolve(z);A=qx.bom.element.Decoration.create(x,y,w);}
else {if((qx.core.Environment.get(t)==u)){if(parseFloat(qx.core.Environment.get(m))<7||qx.core.Environment.get(f)){w.overflow=c;}
;}
;if(!content){content=a;}
;A=r+qx.bom.element.Style.compile(w)+o+content+p;}
;return A;}
,_applyBackgroundImage:function(){{}
;}
,_applyBackgroundPosition:function(){{}
;}
}});}
)();
(function(){var j="border-top",i="border-left",h="border-right",g="qx.ui.decoration.MSingleBorder",f="border-bottom",e="absolute",d="widthTop",c="styleRight",b="styleBottom",a="widthBottom",D="widthLeft",C="styleTop",B="colorBottom",A="styleLeft",z="widthRight",y="colorLeft",x="colorRight",w="colorTop",v="shorthand",u="double",q="px ",r="dotted",o="_applyWidth",p="Color",m="",n="dashed",k="Number",l=" ",s="solid",t="_applyStyle";qx.Mixin.define(g,{properties:{widthTop:{check:k,init:0,apply:o},widthRight:{check:k,init:0,apply:o},widthBottom:{check:k,init:0,apply:o},widthLeft:{check:k,init:0,apply:o},styleTop:{nullable:true,check:[s,r,n,u],init:s,apply:t},styleRight:{nullable:true,check:[s,r,n,u],init:s,apply:t},styleBottom:{nullable:true,check:[s,r,n,u],init:s,apply:t},styleLeft:{nullable:true,check:[s,r,n,u],init:s,apply:t},colorTop:{nullable:true,check:p,apply:t},colorRight:{nullable:true,check:p,apply:t},colorBottom:{nullable:true,check:p,apply:t},colorLeft:{nullable:true,check:p,apply:t},left:{group:[D,A,y]},right:{group:[z,c,x]},top:{group:[d,C,w]},bottom:{group:[a,b,B]},width:{group:[d,z,a,D],mode:v},style:{group:[C,c,b,A],mode:v},color:{group:[w,x,B,y],mode:v}},members:{_styleBorder:function(E){{var G=qx.theme.manager.Color.getInstance();var K=G.resolve(this.getColorTop());var H=G.resolve(this.getColorRight());var F=G.resolve(this.getColorBottom());var J=G.resolve(this.getColorLeft());}
;var I=this.getWidthTop();if(I>0){E[j]=I+q+this.getStyleTop()+l+(K||m);}
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
,members:{__ow:null,_getDefaultInsets:function(){return {top:0,right:0,bottom:0,left:0};}
,_isInitialized:function(){return !!this.__ow;}
,getMarkup:function(){if(this.__ow){return this.__ow;}
;var e={position:b,top:0,left:0};var f=this._generateBackgroundMarkup(e);return this.__ow=f;}
,resize:function(g,h,i){var j=this.getInsets();g.style.width=(h-j.left-j.right)+a;g.style.height=(i-j.top-j.bottom)+a;g.style.left=-j.left+a;g.style.top=-j.top+a;}
,tint:function(k,l){this._tintBackgroundColor(k,l,k.style);}
},destruct:function(){this.__ow=null;}
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
,properties:{innerColor:{check:m,nullable:true,apply:k},innerOpacity:{check:w,init:1,apply:k},outerColor:{check:m,nullable:true,apply:k}},members:{__ow:null,_getDefaultInsets:function(){return {top:2,right:2,bottom:2,left:2};}
,_isInitialized:function(){return !!this.__ow;}
,_applyStyle:function(){{}
;}
,getMarkup:function(){if(this.__ow){return this.__ow;}
;var B=qx.theme.manager.Color.getInstance();var C=[];var F=o+B.resolve(this.getOuterColor())+n;var E=o+B.resolve(this.getInnerColor())+n;C.push(t);C.push(q);C.push(p,F);C.push(qx.bom.element.Opacity.compile(0.35));C.push(l);C.push(v);C.push(a,F);C.push(d,F);C.push(qx.bom.element.Opacity.compile(1));C.push(l);C.push(q);C.push(u);C.push(x,F);C.push(e,F);C.push(qx.bom.element.Opacity.compile(1));C.push(l);var D={position:s,top:r,left:r,opacity:1};C.push(this._generateBackgroundMarkup(D));C.push(f);C.push(p,E);C.push(qx.bom.element.Opacity.compile(this.getInnerOpacity()));C.push(l);C.push(i);return this.__ow=C.join(c);}
,resize:function(G,H,I){if(H<4){H=4;}
;if(I<4){I=4;}
;if(qx.core.Environment.get(g)==b){var outerWidth=H-2;var outerHeight=I-2;var O=outerWidth;var N=outerHeight;var innerWidth=H-4;var innerHeight=I-4;}
else {var outerWidth=H;var outerHeight=I;var O=H-2;var N=I-2;var innerWidth=O;var innerHeight=N;}
;var Q=j;var M=G.childNodes[0].style;M.width=outerWidth+Q;M.height=outerHeight+Q;var L=G.childNodes[1].style;L.width=outerWidth+Q;L.height=N+Q;var K=G.childNodes[2].style;K.width=O+Q;K.height=outerHeight+Q;var J=G.childNodes[3].style;J.width=O+Q;J.height=N+Q;var P=G.childNodes[4].style;P.width=innerWidth+Q;P.height=innerHeight+Q;}
,tint:function(R,S){this._tintBackgroundColor(R,S,R.childNodes[3].style);}
},destruct:function(){this.__ow=null;}
});}
)();
(function(){var j="</div>",i="),to(",h="from(",g="background-image",f="background",e="<div style='width: 100%; height: 100%; position: absolute;",d="StartColorStr='#FF",c="', ",b="'></div>",a="-webkit-gradient(linear,",R="startColorPosition",Q="deg, ",P="css.gradient.legacywebkit",O="EndColorStr='#FF",N="startColor",M="MBoxShadow",L="<div style=\"position: absolute; width: 100%; height: 100%; ",K="(GradientType=",J="qx.ui.decoration.MLinearBackgroundGradient",I="(",q="endColorPosition",r="';)\">",o="endColor",p=", ",m="overflow",n="hidden",k="linear-gradient",l="filter:progid:DXImageTransform.Microsoft.Gradient",s=" 0",t="px",A="0",y="shorthand",C="Color",B="vertical",E="css.gradient.filter",D="Number",v="%",H=")",G="",F="css.gradient.linear",u=",",w=" ",x="horizontal",z="_applyLinearBackgroundGradient";qx.Mixin.define(J,{properties:{startColor:{check:C,nullable:true,apply:z},endColor:{check:C,nullable:true,apply:z},orientation:{check:[x,B],init:B,apply:z},startColorPosition:{check:D,init:0,apply:z},endColorPosition:{check:D,init:100,apply:z},colorPositionUnit:{check:[t,v],init:v,apply:z},gradientStart:{group:[N,R],mode:y},gradientEnd:{group:[o,q],mode:y}},members:{_styleLinearBackgroundGradient:function(S){var Y=this.__sh();var bd=Y.start;var W=Y.end;var be=this.getColorPositionUnit();if(qx.core.Environment.get(P)){be=be===t?G:be;if(this.getOrientation()==x){var bc=this.getStartColorPosition()+be+s+be;var ba=this.getEndColorPosition()+be+s+be;}
else {var bc=A+be+w+this.getStartColorPosition()+be;var ba=A+be+w+this.getEndColorPosition()+be;}
;var U=h+bd+i+W+H;var V=a+bc+u+ba+u+U+H;S[f]=V;}
else if(qx.core.Environment.get(E)&&!qx.core.Environment.get(F)){S[m]=n;}
else {var bf=this.getOrientation()==x?0:270;var X=bd+w+this.getStartColorPosition()+be;var T=W+w+this.getEndColorPosition()+be;var bb=qx.core.Environment.get(F);if(bb===k){bf=this.getOrientation()==x?bf+90:bf-90;}
;S[g]=bb+I+bf+Q+X+u+T+H;}
;}
,__sh:function(){{var bg=qx.theme.manager.Color.getInstance();var bi=bg.resolve(this.getStartColor());var bh=bg.resolve(this.getEndColor());}
;return {start:bi,end:bh};}
,_getContent:function(){if(qx.core.Environment.get(E)&&!qx.core.Environment.get(F)){var bl=this.__sh();var bo=this.getOrientation()==x?1:0;var bn=qx.util.ColorUtil.hex3StringToHex6String(bl.start);var bk=qx.util.ColorUtil.hex3StringToHex6String(bl.end);bn=bn.substring(1,bn.length);bk=bk.substring(1,bk.length);var bm=G;if(this.classname.indexOf(M)!=-1){var bj={};this._styleBoxShadow(bj);bm=e+qx.bom.element.Style.compile(bj)+b;}
;return L+l+K+bo+p+d+bn+c+O+bk+r+bm+j;}
;return G;}
,_resizeLinearBackgroundGradient:function(bp,bq,br){var bs=this.getInsets();bq-=bs.left+bs.right;br-=bs.top+bs.bottom;return {left:bs.left,top:bs.top,width:bq,height:br};}
,_applyLinearBackgroundGradient:function(){{}
;}
}});}
)();
(function(){var j="innerWidthRight",i="top",h="innerColorBottom",g="innerWidthTop",f="innerColorRight",e="innerColorTop",d="relative",c="browser.documentmode",b="innerColorLeft",a="",D="qx.ui.decoration.MDoubleBorder",C="left",B="engine.version",A="innerWidthBottom",z="innerWidthLeft",y="position",x="absolute",w="shorthand",v="line-height",u="engine.name",q="mshtml",r="border-top",o="border-left",p="border-bottom",m="border-right",n="Color",k="Number",l='',s="px ",t=" ";qx.Mixin.define(D,{include:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundImage],construct:function(){this._getDefaultInsetsForBorder=this.__sm;this._resizeBorder=this.__sl;this._styleBorder=this.__sj;this._generateMarkup=this.__sk;}
,properties:{innerWidthTop:{check:k,init:0},innerWidthRight:{check:k,init:0},innerWidthBottom:{check:k,init:0},innerWidthLeft:{check:k,init:0},innerWidth:{group:[g,j,A,z],mode:w},innerColorTop:{nullable:true,check:n},innerColorRight:{nullable:true,check:n},innerColorBottom:{nullable:true,check:n},innerColorLeft:{nullable:true,check:n},innerColor:{group:[e,f,h,b],mode:w}},members:{__si:null,__sj:function(E){{var G=qx.theme.manager.Color.getInstance();var H=G.resolve(this.getInnerColorTop());var K=G.resolve(this.getInnerColorRight());var I=G.resolve(this.getInnerColorBottom());var J=G.resolve(this.getInnerColorLeft());}
;E.position=d;var F=this.getInnerWidthTop();if(F>0){E[r]=F+s+this.getStyleTop()+t+H;}
;var F=this.getInnerWidthRight();if(F>0){E[m]=F+s+this.getStyleRight()+t+K;}
;var F=this.getInnerWidthBottom();if(F>0){E[p]=F+s+this.getStyleBottom()+t+I;}
;var F=this.getInnerWidthLeft();if(F>0){E[o]=F+s+this.getStyleLeft()+t+J;}
;{}
;}
,__sk:function(L){var P=this._generateBackgroundMarkup(L,this._getContent?this._getContent():a);{var N=qx.theme.manager.Color.getInstance();var S=N.resolve(this.getColorTop());var O=N.resolve(this.getColorRight());var M=N.resolve(this.getColorBottom());var R=N.resolve(this.getColorLeft());}
;L[r]=l;L[m]=l;L[p]=l;L[o]=l;L[v]=0;if((qx.core.Environment.get(u)==q&&parseFloat(qx.core.Environment.get(B))<8)||(qx.core.Environment.get(u)==q&&qx.core.Environment.get(c)<8)){L[v]=l;}
;var Q=this.getWidthTop();if(Q>0){L[r]=Q+s+this.getStyleTop()+t+S;}
;var Q=this.getWidthRight();if(Q>0){L[m]=Q+s+this.getStyleRight()+t+O;}
;var Q=this.getWidthBottom();if(Q>0){L[p]=Q+s+this.getStyleBottom()+t+M;}
;var Q=this.getWidthLeft();if(Q>0){L[o]=Q+s+this.getStyleLeft()+t+R;}
;{}
;L[y]=x;L[i]=0;L[C]=0;return this.__si=this._generateBackgroundMarkup(L,P);}
,__sl:function(T,U,V){var W=this.getInsets();U-=W.left+W.right;V-=W.top+W.bottom;var X=W.left-this.getWidthLeft()-this.getInnerWidthLeft();var top=W.top-this.getWidthTop()-this.getInnerWidthTop();return {left:X,top:top,width:U,height:V,elementToApplyDimensions:T.firstChild};}
,__sm:function(){return {top:this.getWidthTop()+this.getInnerWidthTop(),right:this.getWidthRight()+this.getInnerWidthRight(),bottom:this.getWidthBottom()+this.getInnerWidthBottom(),left:this.getWidthLeft()+this.getInnerWidthLeft()};}
}});}
)();
(function(){var n="shadowHorizontalLength",m="Boolean",l="",k="box-shadow",j="-moz-box-shadow",i="-webkit-box-shadow",h="shadowVerticalLength",g="inset ",f="shorthand",e="qx.ui.decoration.MBoxShadow",b="Color",d="px ",c="Integer",a="_applyBoxShadow";qx.Mixin.define(e,{properties:{shadowHorizontalLength:{nullable:true,check:c,apply:a},shadowVerticalLength:{nullable:true,check:c,apply:a},shadowBlurRadius:{nullable:true,check:c,apply:a},shadowSpreadRadius:{nullable:true,check:c,apply:a},shadowColor:{nullable:true,check:b,apply:a},inset:{init:false,check:m,apply:a},shadowLength:{group:[n,h],mode:f}},members:{_styleBoxShadow:function(o){{var p=qx.theme.manager.Color.getInstance();var s=p.resolve(this.getShadowColor());}
;if(s!=null){var v=this.getShadowVerticalLength()||0;var q=this.getShadowHorizontalLength()||0;var blur=this.getShadowBlurRadius()||0;var u=this.getShadowSpreadRadius()||0;var t=this.getInset()?g:l;var r=t+q+d+v+d+blur+d+u+d+s;o[j]=r;o[i]=r;o[k]=r;}
;}
,_applyBoxShadow:function(){{}
;}
}});}
)();
(function(){var cM="checkbox-start",cL="decoration/tabview/tab-button-top-active.png",cK="group-background",cJ="decoration/form/button-c.png",cI="keyboard-focus",cH="button-disabled-start",cG="selected-end",cF="table-header-hovered",cE="decoration/groupbox/groupbox.png",cD="decoration/pane/pane.png",bM="decoration/menu/background.png",bL="decoration/tabview/tabview-pane.png",bK="decoration/toolbar/toolbar-part.gif",bJ="input-focused-css",bI="decoration/menu/bar-background.png",bH="window-border-caption",bG="radiobutton-hovered",bF="tooltip-error-css",bE="radiobutton-checked-focused",bD="groupitem-end",cT="button-disabled-css",cU="group-border",cR="scrollbar-slider-vertical-css",cS="window-css",cP="selected-start",cQ="window-resize-frame-css",cN="tabview-end",cO="window-statusbar-background",cV="decoration/scrollbar/scrollbar-bg-vertical.png",cW="button-pressed-css",cm="toolbar-button-hovered-css",cl="window-caption-active-end",co="dotted",cn="checkbox-disabled-end",cq="window-caption-active-start",cp="button-focused",cs="menu-start",cr="decoration/form/tooltip-error.png",ck="window-captionbar-active-css",cj="qx/decoration/Modern",k="decoration/tabview/tab-button-right-inactive.png",l="border-toolbar-separator-left",m="decoration/form/button-checked.png",n="decoration/scrollbar/scrollbar-bg-horizontal.png",o="decoration/tabview/tab-button-left-active.png",p="decoration/tabview/tab-button-bottom-active.png",q="decoration/tabview/tab-button-bottom-inactive.png",r="decoration/form/button-disabled.png",s="decoration/form/button-pressed.png",t="background-splitpane",dl="decoration/form/button-checked-focused.png",dk="px",dj="decoration/window/statusbar.png",di="input-border-disabled",dq="checkbox-inner",dp="scrollbar-horizontal-css",dn="button-disabled-end",dm="toolbar-end",ds="groupitem-start",dr="decoration/form/button-hovered.png",bd="checkbox-hovered-inner",be="input-focused-start",bb="scrollbar-start",bc="scrollbar-slider-start",bh="radiobutton-checked-disabled",bi="checkbox-focused",bf="qx.theme.modern.Decoration",bg="decoration/form/button.png",Y="decoration/app-header.png",ba="decoration/form/button-focused.png",L="radiobutton-checked-hovered",K="button-hovered-css",N="checkbox-disabled-inner",M="border-toolbar-separator-right",H="border-focused",G="decoration/shadow/shadow.png",J="scrollbar-end",I="decoration/group-item.png",F="window-caption-inactive-end",E="checkbox-end",bn="tabview-inactive-end",bo="input-end",bp="button-checked-focused-css",bq="decoration/tabview/tab-button-left-inactive.png",bj="input-focused-inner-invalid",bk="menu-separator-top",bl="window-caption-inactive-start",bm="scrollbar-slider-end",br="decoration/window/captionbar-inactive.png",bs="decoration/tabview/tab-button-top-inactive.png",V="pane-end",U="input-focused-end",T="decoration/form/tooltip-error-arrow.png",S="menubar-start",R="toolbar-start",Q="checkbox-disabled-start",P="radiobutton-focused",O="pane-start",X="table-focus-indicator",W="button-checked-css",bt="decoration/form/button-checked-c.png",bu="menu-separator-bottom",bv="decoration/shadow/shadow-small.png",bw="input-start",bx="decoration/window/captionbar-active.png",by="decoration/tabview/tab-button-right-active.png",bz="decoration/toolbar/toolbar-gradient.png",bA="checkbox-hovered-inner-invalid",bB="checkbox-disabled-border",bC="button-hovered-end",bQ="repeat-y",bP="border-dragover",bO="button-hovered-start",bN="tooltip-error",bU="progressive-table-header-border-right",bT="decoration/scrollbar/scrollbar-button-bg-vertical.png",bS="radiobutton-background",bR="decoration/form/tooltip-error-arrow-right.png",bW="checkbox-focus",bV="scrollbar-slider-horizontal-css",cf="menu-end",cg="decoration/selection.png",cd="horizontal",ce="table-header-start",cb="decoration/scrollbar/scrollbar-button-bg-horizontal.png",cc="decoration/form/input-focused.png",bY="right",ca="checkbox-hovered-invalid",ch="decoration/table/header-cell.png",ci="tabview-inactive-start",cw="table-header-end",cv="border-button",cy="border-focused-invalid",cx="button-focused-css",cA="checkbox-border",cz="tabview-start",cC="radiobutton-disabled",cB="radiobutton-hovered-invalid",cu="tabview-page-button-top-active-css",ct="button-border-disabled",de="tabview-page-button-top-inactive-css",df="decoration/form/input.png",dg="border-toolbar-border-inner",dh="input-css",da="border-toolbar-button-outer",db="top",dc="border-disabled",dd="background-pane",cX="no-repeat",cY="border-input",j="border-inner-input",i="border-inner-scrollbar",h="radiobutton-checked",g="window-border",f="tabview-inactive",e="checkbox",d="radiobutton",c="button-css",b="border-separator",a="checkbox-hovered",w="button-start",x="button-end",u="background-light",v="tabview-background",A="repeat-x",B="shadow",y="border-invalid",z="border-main",C="scale",D="solid",bX="invalid";qx.Theme.define(bf,{aliases:{decoration:cj},decorations:{"main":{decorator:qx.ui.decoration.Uniform,style:{width:1,color:z}},"selected":{decorator:qx.ui.decoration.Background,style:{backgroundImage:cg,backgroundRepeat:C}},"selected-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient],style:{startColorPosition:0,endColorPosition:100,startColor:cP,endColor:cG}},"selected-dragover":{decorator:qx.ui.decoration.Single,style:{backgroundImage:cg,backgroundRepeat:C,bottom:[2,D,bP]}},"dragover":{decorator:qx.ui.decoration.Single,style:{bottom:[2,D,bP]}},"pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:cD,insets:[0,2,3,0]}},"pane-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MLinearBackgroundGradient],style:{width:1,color:v,radius:3,shadowColor:B,shadowBlurRadius:2,shadowLength:0,gradientStart:[O,0],gradientEnd:[V,100]}},"group":{decorator:qx.ui.decoration.Grid,style:{baseImage:cE}},"group-css":{decorator:[qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder],style:{backgroundColor:cK,radius:4,color:cU,width:1}},"border-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bX,innerColor:j,innerOpacity:0.5,backgroundImage:df,backgroundRepeat:A,backgroundColor:u}},"keyboard-focus":{decorator:qx.ui.decoration.Single,style:{width:1,color:cI,style:co}},"radiobutton":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow],style:{backgroundColor:bS,radius:5,width:1,innerWidth:2,color:cA,innerColor:bS,shadowLength:0,shadowBlurRadius:0,shadowColor:bW,insetLeft:5}},"radiobutton-checked":{include:d,style:{backgroundColor:h}},"radiobutton-checked-focused":{include:h,style:{shadowBlurRadius:4}},"radiobutton-checked-hovered":{include:h,style:{innerColor:a}},"radiobutton-focused":{include:d,style:{shadowBlurRadius:4}},"radiobutton-hovered":{include:d,style:{backgroundColor:a,innerColor:a}},"radiobutton-disabled":{include:d,style:{innerColor:cC,backgroundColor:cC,color:bB}},"radiobutton-checked-disabled":{include:cC,style:{backgroundColor:bh}},"radiobutton-invalid":{include:d,style:{color:bX}},"radiobutton-checked-invalid":{include:h,style:{color:bX}},"radiobutton-checked-focused-invalid":{include:bE,style:{color:bX,shadowColor:bX}},"radiobutton-checked-hovered-invalid":{include:L,style:{color:bX,innerColor:cB}},"radiobutton-focused-invalid":{include:P,style:{color:bX,shadowColor:bX}},"radiobutton-hovered-invalid":{include:bG,style:{color:bX,innerColor:cB,backgroundColor:cB}},"separator-horizontal":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,colorLeft:b}},"separator-vertical":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:b}},"tooltip-error":{decorator:qx.ui.decoration.Grid,style:{baseImage:cr,insets:[2,0,2,2]}},"tooltip-error-css":{decorator:[qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow],style:{backgroundColor:bN,radius:4,shadowColor:B,shadowBlurRadius:2,shadowLength:1,insets:[2,0,0,2]}},"tooltip-error-left":{include:bN,style:{insets:[2,5,5,2]}},"tooltip-error-css-left":{include:bF,style:{insets:[-1,0,0,-2]}},"tooltip-error-arrow":{decorator:qx.ui.decoration.Background,style:{backgroundImage:T,backgroundPositionY:db,backgroundRepeat:cX,insets:[-4,0,0,13]}},"tooltip-error-arrow-left":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bR,backgroundPositionY:db,backgroundPositionX:bY,backgroundRepeat:cX,insets:[-4,-13,0,0]}},"tooltip-error-arrow-left-css":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bR,backgroundPositionY:db,backgroundPositionX:bY,backgroundRepeat:cX,insets:[-6,-13,0,0]}},"shadow-window":{decorator:qx.ui.decoration.Grid,style:{baseImage:G,insets:[0,8,8,0]}},"shadow-window-css":{decorator:[qx.ui.decoration.MBoxShadow,qx.ui.decoration.MBackgroundColor],style:{shadowColor:B,shadowBlurRadius:2,shadowLength:1}},"shadow-popup":{decorator:qx.ui.decoration.Grid,style:{baseImage:bv,insets:[0,3,3,0]}},"popup-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MBackgroundColor],style:{width:1,color:z,shadowColor:B,shadowBlurRadius:3,shadowLength:1}},"scrollbar-horizontal":{decorator:qx.ui.decoration.Background,style:{backgroundImage:n,backgroundRepeat:A}},"scrollbar-vertical":{decorator:qx.ui.decoration.Background,style:{backgroundImage:cV,backgroundRepeat:bQ}},"scrollbar-slider-horizontal":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:cb,backgroundRepeat:C,outerColor:z,innerColor:i,innerOpacity:0.5}},"scrollbar-slider-horizontal-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:cb,backgroundRepeat:C,outerColor:dc,innerColor:i,innerOpacity:0.3}},"scrollbar-slider-vertical":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bT,backgroundRepeat:C,outerColor:z,innerColor:i,innerOpacity:0.5}},"scrollbar-slider-vertical-disabled":{decorator:qx.ui.decoration.Beveled,style:{backgroundImage:bT,backgroundRepeat:C,outerColor:dc,innerColor:i,innerOpacity:0.3}},"scrollbar-horizontal-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[bb,0],gradientEnd:[J,100]}},"scrollbar-vertical-css":{include:dp,style:{orientation:cd}},"scrollbar-slider-horizontal-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[bc,0],gradientEnd:[bm,100],color:z,width:1}},"scrollbar-slider-vertical-css":{include:bV,style:{orientation:cd}},"scrollbar-slider-horizontal-disabled-css":{include:bV,style:{color:ct}},"scrollbar-slider-vertical-disabled-css":{include:cR,style:{color:ct}},"button-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBorderRadius],style:{radius:3,color:cv,width:1,startColor:w,endColor:x,startColorPosition:35,endColorPosition:100}},"button-disabled-css":{include:c,style:{color:ct,startColor:cH,endColor:dn}},"button-hovered-css":{include:c,style:{startColor:bO,endColor:bC}},"button-checked-css":{include:c,style:{endColor:w,startColor:x}},"button-pressed-css":{include:c,style:{endColor:bO,startColor:bC}},"button-focused-css":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBorderRadius],style:{radius:3,color:cv,width:1,innerColor:cp,innerWidth:2,startColor:w,endColor:x,startColorPosition:30,endColorPosition:100}},"button-checked-focused-css":{include:cx,style:{endColor:w,startColor:x}},"button-invalid-css":{include:c,style:{color:y}},"button-disabled-invalid-css":{include:cT,style:{color:y}},"button-hovered-invalid-css":{include:K,style:{color:y}},"button-checked-invalid-css":{include:W,style:{color:y}},"button-pressed-invalid-css":{include:cW,style:{color:y}},"button-focused-invalid-css":{include:cx,style:{color:y}},"button-checked-focused-invalid-css":{include:bp,style:{color:y}},"button":{decorator:qx.ui.decoration.Grid,style:{baseImage:bg,insets:2}},"button-disabled":{decorator:qx.ui.decoration.Grid,style:{baseImage:r,insets:2}},"button-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:ba,insets:2}},"button-hovered":{decorator:qx.ui.decoration.Grid,style:{baseImage:dr,insets:2}},"button-pressed":{decorator:qx.ui.decoration.Grid,style:{baseImage:s,insets:2}},"button-checked":{decorator:qx.ui.decoration.Grid,style:{baseImage:m,insets:2}},"button-checked-focused":{decorator:qx.ui.decoration.Grid,style:{baseImage:dl,insets:2}},"button-invalid-shadow":{decorator:qx.ui.decoration.Single,style:{color:bX,width:1,insets:0}},"checkbox-invalid-shadow":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bX,innerColor:cy,insets:[0]}},"checkbox":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBoxShadow],style:{width:1,color:cA,innerWidth:1,innerColor:dq,gradientStart:[cM,0],gradientEnd:[E,100],shadowLength:0,shadowBlurRadius:0,shadowColor:bW,insetLeft:4}},"checkbox-hovered":{include:e,style:{innerColor:bd,gradientStart:[a,0],gradientEnd:[a,100]}},"checkbox-focused":{include:e,style:{shadowBlurRadius:4}},"checkbox-disabled":{include:e,style:{color:bB,innerColor:N,gradientStart:[Q,0],gradientEnd:[cn,100]}},"checkbox-invalid":{include:e,style:{color:bX}},"checkbox-hovered-invalid":{include:a,style:{color:bX,innerColor:bA,gradientStart:[ca,0],gradientEnd:[ca,100]}},"checkbox-focused-invalid":{include:bi,style:{color:bX,shadowColor:bX}},"input-css":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBackgroundColor],style:{color:cY,innerColor:j,innerWidth:1,width:1,backgroundColor:u,startColor:bw,endColor:bo,startColorPosition:0,endColorPosition:12,colorPositionUnit:dk}},"border-invalid-css":{include:dh,style:{color:y}},"input-focused-css":{include:dh,style:{startColor:be,innerColor:U,endColorPosition:4}},"input-focused-invalid-css":{include:bJ,style:{innerColor:bj,color:y}},"input-disabled-css":{include:dh,style:{color:di}},"input":{decorator:qx.ui.decoration.Beveled,style:{outerColor:cY,innerColor:j,innerOpacity:0.5,backgroundImage:df,backgroundRepeat:A,backgroundColor:u}},"input-focused":{decorator:qx.ui.decoration.Beveled,style:{outerColor:cY,innerColor:H,backgroundImage:cc,backgroundRepeat:A,backgroundColor:u}},"input-focused-invalid":{decorator:qx.ui.decoration.Beveled,style:{outerColor:bX,innerColor:cy,backgroundImage:cc,backgroundRepeat:A,backgroundColor:u,insets:[2]}},"input-disabled":{decorator:qx.ui.decoration.Beveled,style:{outerColor:dc,innerColor:j,innerOpacity:0.5,backgroundImage:df,backgroundRepeat:A,backgroundColor:u}},"toolbar":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bz,backgroundRepeat:C}},"toolbar-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient],style:{startColorPosition:40,endColorPosition:60,startColor:R,endColor:dm}},"toolbar-button-hovered":{decorator:qx.ui.decoration.Beveled,style:{outerColor:da,innerColor:dg,backgroundImage:cJ,backgroundRepeat:C}},"toolbar-button-checked":{decorator:qx.ui.decoration.Beveled,style:{outerColor:da,innerColor:dg,backgroundImage:bt,backgroundRepeat:C}},"toolbar-button-hovered-css":{decorator:[qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBorderRadius],style:{color:da,width:1,innerWidth:1,innerColor:dg,radius:2,gradientStart:[w,30],gradientEnd:[x,100]}},"toolbar-button-checked-css":{include:cm,style:{gradientStart:[x,30],gradientEnd:[w,100]}},"toolbar-separator":{decorator:qx.ui.decoration.Single,style:{widthLeft:1,widthRight:1,colorLeft:l,colorRight:M,styleLeft:D,styleRight:D}},"toolbar-part":{decorator:qx.ui.decoration.Background,style:{backgroundImage:bK,backgroundRepeat:bQ}},"tabview-pane":{decorator:qx.ui.decoration.Grid,style:{baseImage:bL,insets:[4,6,7,4]}},"tabview-pane-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MSingleBorder],style:{width:1,color:g,radius:3,gradientStart:[cz,90],gradientEnd:[cN,100]}},"tabview-page-button-top-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:cL}},"tabview-page-button-top-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bs}},"tabview-page-button-bottom-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:p}},"tabview-page-button-bottom-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:q}},"tabview-page-button-left-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:o}},"tabview-page-button-left-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:bq}},"tabview-page-button-right-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:by}},"tabview-page-button-right-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:k}},"tabview-page-button-top-active-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBoxShadow],style:{radius:[3,3,0,0],width:[1,1,0,1],color:v,backgroundColor:cz,shadowLength:1,shadowColor:B,shadowBlurRadius:2}},"tabview-page-button-top-inactive-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{radius:[3,3,0,0],color:f,colorBottom:v,width:1,gradientStart:[ci,0],gradientEnd:[bn,100]}},"tabview-page-button-bottom-active-css":{include:cu,style:{radius:[0,0,3,3],width:[0,1,1,1],backgroundColor:ci,shadowLength:0,shadowBlurRadius:0}},"tabview-page-button-bottom-inactive-css":{include:de,style:{radius:[0,0,3,3],width:[0,1,1,1],colorBottom:f,colorTop:v}},"tabview-page-button-left-active-css":{include:cu,style:{radius:[3,0,0,3],width:[1,0,1,1],shadowLength:0,shadowBlurRadius:0}},"tabview-page-button-left-inactive-css":{include:de,style:{radius:[3,0,0,3],width:[1,0,1,1],colorBottom:f,colorRight:v}},"tabview-page-button-right-active-css":{include:cu,style:{radius:[0,3,3,0],width:[1,1,1,0],shadowLength:0,shadowBlurRadius:0}},"tabview-page-button-right-inactive-css":{include:de,style:{radius:[0,3,3,0],width:[1,1,1,0],colorBottom:f,colorLeft:v}},"splitpane":{decorator:qx.ui.decoration.Uniform,style:{backgroundColor:dd,width:3,color:t,style:D}},"window":{decorator:qx.ui.decoration.Single,style:{backgroundColor:dd,width:1,color:z,widthTop:0}},"window-captionbar-active":{decorator:qx.ui.decoration.Grid,style:{baseImage:bx}},"window-captionbar-inactive":{decorator:qx.ui.decoration.Grid,style:{baseImage:br}},"window-statusbar":{decorator:qx.ui.decoration.Grid,style:{baseImage:dj}},"window-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MSingleBorder],style:{radius:[5,5,0,0],shadowBlurRadius:4,shadowLength:2,shadowColor:B}},"window-incl-statusbar-css":{include:cS,style:{radius:[5,5,5,5]}},"window-resize-frame-css":{decorator:[qx.ui.decoration.MBorderRadius,qx.ui.decoration.MSingleBorder],style:{radius:[5,5,0,0],width:1,color:z}},"window-resize-frame-incl-statusbar-css":{include:cQ,style:{radius:[5,5,5,5]}},"window-captionbar-active-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MLinearBackgroundGradient],style:{width:1,color:g,colorBottom:bH,radius:[5,5,0,0],gradientStart:[cq,30],gradientEnd:[cl,70]}},"window-captionbar-inactive-css":{include:ck,style:{gradientStart:[bl,30],gradientEnd:[F,70]}},"window-statusbar-css":{decorator:[qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBorderRadius],style:{backgroundColor:cO,width:[0,1,1,1],color:g,radius:[0,0,5,5]}},"window-pane-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundColor],style:{backgroundColor:dd,width:1,color:g,widthTop:0}},"table":{decorator:qx.ui.decoration.Single,style:{width:1,color:z,style:D}},"table-statusbar":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:z,style:D}},"table-scroller-header":{decorator:qx.ui.decoration.Single,style:{backgroundImage:ch,backgroundRepeat:C,widthBottom:1,colorBottom:z,style:D}},"table-scroller-header-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[ce,10],gradientEnd:[cw,90],widthBottom:1,colorBottom:z}},"table-header-cell":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:b,styleRight:D}},"table-header-cell-hovered":{decorator:qx.ui.decoration.Single,style:{widthRight:1,colorRight:b,styleRight:D,widthBottom:1,colorBottom:cF,styleBottom:D}},"table-scroller-focus-indicator":{decorator:qx.ui.decoration.Single,style:{width:2,color:X,style:D}},"progressive-table-header":{decorator:qx.ui.decoration.Single,style:{width:1,color:z,style:D}},"progressive-table-header-cell":{decorator:qx.ui.decoration.Single,style:{backgroundImage:ch,backgroundRepeat:C,widthRight:1,colorRight:bU,style:D}},"progressive-table-header-cell-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[ce,10],gradientEnd:[cw,90],widthRight:1,colorRight:bU}},"menu":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bM,backgroundRepeat:C,width:1,color:z,style:D}},"menu-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MSingleBorder],style:{gradientStart:[cs,0],gradientEnd:[cf,100],shadowColor:B,shadowBlurRadius:2,shadowLength:1,width:1,color:z}},"menu-separator":{decorator:qx.ui.decoration.Single,style:{widthTop:1,colorTop:bk,widthBottom:1,colorBottom:bu}},"menubar":{decorator:qx.ui.decoration.Single,style:{backgroundImage:bI,backgroundRepeat:C,width:1,color:b,style:D}},"menubar-css":{decorator:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MLinearBackgroundGradient],style:{gradientStart:[S,0],gradientEnd:[cf,100],width:1,color:b}},"app-header":{decorator:qx.ui.decoration.Background,style:{backgroundImage:Y,backgroundRepeat:C}},"progressbar":{decorator:qx.ui.decoration.Single,style:{width:1,color:cY}},"group-item":{decorator:qx.ui.decoration.Background,style:{backgroundImage:I,backgroundRepeat:C}},"group-item-css":{decorator:[qx.ui.decoration.MLinearBackgroundGradient],style:{startColorPosition:0,endColorPosition:100,startColor:ds,endColor:bD}}}});}
)();
(function(){var bB="black",bA="#ffffdd",bz="#b6b6b6",by="#004DAD",bx="#BABABA",bw="#005BC3",bv="#334866",bu="#CECECE",bt="#D9D9D9",bs="#D8D8D8",bh="#99C3FE",bg="#001533",bf="#B3B3B3",be="#D5D5D5",bd="#C3C3C3",bc="#DDDDDD",bb="#FF9999",ba="css.rgba",Y="#E8E8E9",X="#084FAA",bI="#C5C5C5",bJ="rgba(0, 0, 0, 0.4)",bG="#DBDBDB",bH="#4a4a4a",bE="#83BAEA",bF="#D7E7F4",bC="#07125A",bD="#FAF2F2",bK="#87AFE7",bL="#F7EAEA",bl="#777D8D",bk="#FBFBFB",bn="#CACACA",bm="#909090",bp="#9B9B9B",bo="#F0F9FE",br="#314a6e",bq="#B4B4B4",bj="#787878",bi="qx.theme.modern.Color",a="#000000",b="#26364D",c="#A7A7A7",d="#D1E4FF",e="#5CB0FD",f="#EAEAEA",g="#003B91",h="#80B4EF",i="#FF6B78",j="#949494",bP="#808080",bO="#930000",bN="#7B7B7B",bM="#C82C2C",bT="#DFDFDF",bS="#B6B6B6",bR="#0880EF",bQ="#4d4d4d",bV="#f4f4f4",bU="#7B7A7E",H="#D0D0D0",I="#f8f8f8",F="#404955",G="#959595",L="#AAAAAA",M="#F7E9E9",J="#314A6E",K="#C72B2B",D="#FAFAFA",E="#FBFCFB",r="#B2D2FF",q="#666666",t="#CBC8CD",s="#999999",n="#8EB8D6",m="#b8b8b8",p="#727272",o="#33508D",l="#F1F1F1",k="#990000",R="#00368A",S="#1a1a1a",T="#00204D",U="gray",N="#F4F4F4",O="#fffefe",P="#AFAFAF",Q="#084FAB",V="#FCFCFC",W="#CCC",B="#F2F2F2",A="#F0F0F0",z="#E8E8E8",y="#CCCCCC",x="#EFEFEF",w="#EEEEEE",v="#E4E4E4",u="#F3F3F3",C="white";qx.Theme.define(bi,{colors:{"background-application":bT,"background-pane":u,"background-light":V,"background-medium":w,"background-splitpane":P,"background-tip":bA,"background-tip-error":K,"background-odd":v,"htmlarea-background":C,"progressbar-background":C,"text-light":bm,"text-gray":bH,"text-label":S,"text-title":br,"text-input":a,"text-hovered":bg,"text-disabled":bU,"text-selected":O,"text-active":b,"text-inactive":F,"text-placeholder":t,"border-inner-scrollbar":C,"border-main":bQ,"menu-separator-top":bI,"menu-separator-bottom":D,"border-separator":bP,"border-toolbar-button-outer":bz,"border-toolbar-border-inner":I,"border-toolbar-separator-right":bV,"border-toolbar-separator-left":m,"border-input":bv,"border-inner-input":C,"border-disabled":bS,"border-pane":T,"border-button":q,"border-column":y,"border-focused":bh,"invalid":k,"border-focused-invalid":bb,"border-dragover":o,"keyboard-focus":bB,"table-pane":u,"table-focus-indicator":bR,"table-row-background-focused-selected":Q,"table-row-background-focused":h,"table-row-background-selected":Q,"table-row-background-even":u,"table-row-background-odd":v,"table-row-selected":O,"table-row":S,"table-row-line":W,"table-column-line":W,"table-header-hovered":C,"progressive-table-header":L,"progressive-table-header-border-right":B,"progressive-table-row-background-even":N,"progressive-table-row-background-odd":v,"progressive-progressbar-background":U,"progressive-progressbar-indicator-done":y,"progressive-progressbar-indicator-undone":C,"progressive-progressbar-percent-background":U,"progressive-progressbar-percent-text":C,"selected-start":by,"selected-end":R,"tabview-background":bC,"shadow":qx.core.Environment.get(ba)?bJ:s,"pane-start":bk,"pane-end":A,"group-background":z,"group-border":bq,"radiobutton-background":x,"checkbox-border":J,"checkbox-focus":bK,"checkbox-hovered":r,"checkbox-hovered-inner":d,"checkbox-inner":w,"checkbox-start":v,"checkbox-end":u,"checkbox-disabled-border":bj,"checkbox-disabled-inner":bn,"checkbox-disabled-start":H,"checkbox-disabled-end":bs,"checkbox-hovered-inner-invalid":bD,"checkbox-hovered-invalid":M,"radiobutton-checked":bw,"radiobutton-disabled":be,"radiobutton-checked-disabled":bN,"radiobutton-hovered-invalid":bL,"tooltip-error":bM,"scrollbar-start":y,"scrollbar-end":l,"scrollbar-slider-start":w,"scrollbar-slider-end":bd,"button-border-disabled":G,"button-start":A,"button-end":P,"button-disabled-start":N,"button-disabled-end":bx,"button-hovered-start":bo,"button-hovered-end":n,"button-focused":bE,"border-invalid":bO,"input-start":A,"input-end":E,"input-focused-start":bF,"input-focused-end":e,"input-focused-inner-invalid":i,"input-border-disabled":bp,"input-border-inner":C,"toolbar-start":x,"toolbar-end":bc,"window-border":T,"window-border-caption":p,"window-caption-active-text":C,"window-caption-active-start":X,"window-caption-active-end":g,"window-caption-inactive-start":B,"window-caption-inactive-end":bG,"window-statusbar-background":x,"tabview-start":V,"tabview-end":w,"tabview-inactive":bl,"tabview-inactive-start":f,"tabview-inactive-end":bu,"table-header-start":z,"table-header-end":bf,"menu-start":Y,"menu-end":bt,"menubar-start":z,"groupitem-start":c,"groupitem-end":j,"groupitem-text":C,"virtual-row-layer-background-even":C,"virtual-row-layer-background-odd":C}});}
)();
(function(){var eq="button-checked",ep="decoration/window/maximize-active-hovered.png",eo="keyboard-focus",en="menu-css",em="decoration/cursors/",el="icon/16/apps/office-calendar.png",ek="slidebar",ej="tooltip-error-arrow",ei="table-scroller-focus-indicator",eh="popup-css",cC="move-frame",cB="nodrop",cA="decoration/table/boolean-true.png",cz="-invalid-css",cy="menu",cx="app-header",cw="row-layer",cv="text-inactive",cu="move",ct="decoration/window/restore-active-hovered.png",ex="shadow-window",ey="tree-folder",ev="window-pane-css",ew="right.png",et="checkbox-undetermined-hovered",eu="window-incl-statusbar-css",er="tabview-page-button-bottom-inactive",es="tooltip-error",ez="window-css",eA="window-statusbar",dI="button-hovered",dH="decoration/scrollbar/scrollbar-",dK="background-tip",dJ="menubar-css",dM="scrollbar-slider-horizontal-disabled",dL="radiobutton-disabled",dO="window-resize-frame-css",dN="button-pressed",dF="table-pane",dE="decoration/window/close-active.png",v="native",w="button-invalid-shadow",x="decoration/window/minimize-active-hovered.png",y="menubar",z="icon/16/actions/dialog-cancel.png",A="tabview-page-button-top-inactive",B="tabview-page-button-left-inactive",C="menu-slidebar",D="toolbar-button-checked",E="-left",eS="decoration/tree/open-selected.png",eR="decoration/window/minimize-inactive.png",eQ="group-item-css",eP="group",eW="tabview-page-button-right-inactive",eV="decoration/window/minimize-active.png",eU="decoration/window/restore-inactive.png",eT="checkbox-checked-focused",eY="combobox/textfield",eX="decoration/window/close-active-hovered.png",bz="qx/icon/Tango/16/actions/window-close.png",bA="checkbox-pressed",bx="button-disabled",by="selected-dragover",bD="border-separator",bE="decoration/window/maximize-inactive.png",bB="dragover",bC="scrollarea",bv="scrollbar-vertical",bw="decoration/menu/checkbox-invert.gif",bb="decoration/toolbar/toolbar-handle-knob.gif",ba="icon/22/mimetypes/office-document.png",bd="table-header-cell",bc="button-checked-focused",W="up.png",V="best-fit",Y="pane-css",X="decoration/tree/closed-selected.png",U="tooltip-error-arrow-left",T="qx.theme.modern.Appearance",bK="text-active",bL="checkbox-disabled",bM="toolbar-button-hovered",bN="window-resize-frame-incl-statusbar-css",bG="decoration/form/checked.png",bH="progressive-table-header",bI="decoration/table/select-column-order.png",bJ="decoration/menu/radiobutton.gif",bO="decoration/arrows/forward.png",bP="decoration/table/descending.png",bo="decoration/form/undetermined.png",bn="tree-file",bm="window-captionbar-active",bl="checkbox-checked-hovered",bk="scrollbar-slider-vertical",bj="toolbar",bi="alias",bh="decoration/window/restore-active.png",bs="decoration/table/boolean-false.png",br="icon/32/mimetypes/office-document.png",bQ="text-gray",bR="mshtml",bS="tabview-pane",bT="decoration/arrows/rewind.png",bU="top",bV="icon/16/actions/dialog-ok.png",bW="progressbar-background",bX="engine.name",bY="table-header-cell-hovered",ca="window-statusbar-css",cK="window",cJ="browser.documentmode",cI="decoration/menu/radiobutton-invert.gif",cH="text-placeholder",cO="slider",cN="toolbar-css",cM="keep-align",cL="down.png",cS="groupitem-text",cR="tabview-page-button-top-active",ds="icon/22/places/folder.png",dt="decoration/window/maximize-active.png",dq="checkbox-checked-pressed",dr="decoration/window/close-inactive.png",dn="tabview-page-button-left-active",dp="toolbar-part",dl="decoration/splitpane/knob-vertical.png",dm=".gif",dA="table-statusbar",dB="progressive-table-header-cell-css",dT="window-captionbar-inactive",dS="copy",dV="decoration/arrows/down-invert.png",dU="decoration/menu/checkbox.gif",dX="window-caption-active-text",dW="decoration/splitpane/knob-horizontal.png",ea="group-css",dY="icon/32/places/folder.png",dQ="toolbar-separator",dP="tabview-page-button-bottom-active",eH="decoration/arrows/up-small.png",eI="decoration/table/ascending.png",eJ="decoration/arrows/up-invert.png",eK="small",eD="tabview-page-button-right-active",eE="-disabled",eF="scrollbar-horizontal",eG="progressbar",eB="checkbox-undetermined-focused",eC="progressive-table-header-cell",k="menu-separator",j="tabview-pane-css",i="pane",h="htmlarea-background",g="decoration/arrows/right-invert.png",f="left.png",e="icon/16/actions/view-refresh.png",d="radiobutton-hovered",c="group-item",b="scrollbar/button",J="right",K="combobox/button",H="virtual-list",I="icon/16/places/folder.png",N="radiobutton-checked-focused",O="text-label",L="decoration/tree/closed.png",M="table-scroller-header",Q="scrollbar-slider-horizontal",R="checkbox-hovered",cW="checkbox-checked",cQ="decoration/arrows/left.png",de="radiobutton-checked",da="button-focused",cF="text-light",cD="menu-slidebar-button",bf="tree",cG="checkbox-undetermined",bq="table-scroller-header-css",bp="splitpane",ck="text-input",cl="slidebar/button-forward",cm="background-splitpane",cn="text-hovered",co=".png",cp="decoration/tree/open.png",cq="default",cr="decoration/arrows/down-small.png",ch="datechooser",ci="slidebar/button-backward",cE="radiobutton-checked-disabled",dd="checkbox-focused",dc="radiobutton-checked-hovered",db="treevirtual-folder",di="shadow-popup",dh="icon/16/mimetypes/office-document.png",dg="background-medium",df="icon/32/places/folder-open.png",cY="icon/22/places/folder-open.png",cX="table",P="decoration/arrows/up.png",bu="decoration/form/",bt="radiobutton-focused",cP="decoration/arrows/right.png",bF="background-application",cV="invalid",cU="right-top",cT="selectbox",be="text-title",dk="icon/16/places/folder-open.png",S="radiobutton",bg="list",cb="tree-item",cc="combobox",cd="treevirtual-contract",ce="scrollbar",cf="datechooser/nav-button",cg="center",dD="checkbox",cj="treevirtual-expand",ec="",eb="textfield",ee="-invalid",ed="tooltip",eg="qx/static/blank.gif",ef="border-invalid",cs="input-disabled",dR="menu-button",dj="input",dG="input-focused-invalid",F="toolbar-button",G="spinner",dy="input-focused",dz="decoration/arrows/down.png",dw="popup",dx="cell",du="image",dv="middle",a="selected",dC="background-light",s="bold",r="text-disabled",q="groupbox",p="text-selected",o="label",n="button",m="main",l="css.boxshadow",u="css.borderradius",t="button-frame",eL="atom",eM="-css",eN="widget",eO="css.gradient.linear";qx.Theme.define(T,{appearances:{"widget":{},"root":{style:function(fa){return {backgroundColor:bF,textColor:O,font:cq};}
},"label":{style:function(fb){return {textColor:fb.disabled?r:undefined};}
},"move-frame":{style:function(fc){return {decorator:m};}
},"resize-frame":cC,"dragdrop-cursor":{style:function(fd){var fe=cB;if(fd.copy){fe=dS;}
else if(fd.move){fe=cu;}
else if(fd.alias){fe=bi;}
;return {source:em+fe+dm,position:cU,offset:[2,16,2,6]};}
},"image":{style:function(ff){return {opacity:!ff.replacement&&ff.disabled?0.3:1};}
},"atom":{},"atom/label":o,"atom/icon":du,"popup":{style:function(fg){var fh=qx.core.Environment.get(l);return {decorator:fh?eh:m,backgroundColor:dC,shadow:fh?undefined:di};}
},"button-frame":{alias:eL,style:function(fi){var fm,fl;var fj=[3,9];if(fi.checked&&fi.focused&&!fi.inner){fm=bc;fl=undefined;fj=[1,7];}
else if(fi.disabled){fm=bx;fl=undefined;}
else if(fi.pressed){fm=dN;fl=cn;}
else if(fi.checked){fm=eq;fl=undefined;}
else if(fi.hovered){fm=dI;fl=cn;}
else if(fi.focused&&!fi.inner){fm=da;fl=undefined;fj=[1,7];}
else {fm=n;fl=undefined;}
;var fk;if(qx.core.Environment.get(u)&&qx.core.Environment.get(eO)){if(fi.invalid&&!fi.disabled){fm+=cz;}
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
},"checkbox":{alias:eL,style:function(ft){var fu=qx.core.Environment.get(eO)&&qx.core.Environment.get(l);var fw;if(fu){if(ft.checked){fw=bG;}
else if(ft.undetermined){fw=bo;}
else {fw=eg;}
;}
else {if(ft.checked){if(ft.disabled){fw=cW;}
else if(ft.focused){fw=eT;}
else if(ft.pressed){fw=dq;}
else if(ft.hovered){fw=bl;}
else {fw=cW;}
;}
else if(ft.undetermined){if(ft.disabled){fw=cG;}
else if(ft.focused){fw=eB;}
else if(ft.hovered){fw=et;}
else {fw=cG;}
;}
else if(!ft.disabled){if(ft.focused){fw=dd;}
else if(ft.pressed){fw=bA;}
else if(ft.hovered){fw=R;}
;}
;fw=fw||dD;var fv=ft.invalid&&!ft.disabled?ee:ec;fw=bu+fw+fv+co;}
;return {icon:fw,minWidth:fu?14:undefined,gap:fu?8:6};}
},"checkbox/icon":{style:function(fx){var fz=qx.core.Environment.get(eO)&&qx.core.Environment.get(l);if(!fz){return {opacity:!fx.replacement&&fx.disabled?0.3:1};}
;var fA;if(fx.disabled){fA=bL;}
else if(fx.focused){fA=dd;}
else if(fx.hovered){fA=R;}
else {fA=dD;}
;fA+=fx.invalid&&!fx.disabled?ee:ec;var fy;if(fx.undetermined){fy=[2,0];}
;return {decorator:fA,padding:fy,width:12,height:10};}
},"radiobutton":{alias:eL,style:function(fB){var fC=qx.core.Environment.get(u)&&qx.core.Environment.get(l);var fE;if(fC){fE=eg;}
else {if(fB.checked&&fB.focused){fE=N;}
else if(fB.checked&&fB.disabled){fE=cE;}
else if(fB.checked&&fB.hovered){fE=dc;}
else if(fB.checked){fE=de;}
else if(fB.focused){fE=bt;}
else if(fB.hovered){fE=d;}
else {fE=S;}
;var fD=fB.invalid&&!fB.disabled?ee:ec;fE=bu+fE+fD+co;}
;return {icon:fE,gap:fC?8:6};}
},"radiobutton/icon":{style:function(fF){var fG=qx.core.Environment.get(u)&&qx.core.Environment.get(l);if(!fG){return {opacity:!fF.replacement&&fF.disabled?0.3:1};}
;var fH;if(fF.disabled&&!fF.checked){fH=dL;}
else if(fF.checked&&fF.focused){fH=N;}
else if(fF.checked&&fF.disabled){fH=cE;}
else if(fF.checked&&fF.hovered){fH=dc;}
else if(fF.checked){fH=de;}
else if(fF.focused){fH=bt;}
else if(fF.hovered){fH=d;}
else {fH=S;}
;fH+=fF.invalid&&!fF.disabled?ee:ec;return {decorator:fH,width:12,height:10};}
},"textfield":{style:function(fI){var fN;var fL=!!fI.focused;var fM=!!fI.invalid;var fJ=!!fI.disabled;if(fL&&fM&&!fJ){fN=dG;}
else if(fL&&!fM&&!fJ){fN=dy;}
else if(fJ){fN=cs;}
else if(!fL&&fM&&!fJ){fN=ef;}
else {fN=dj;}
;if(qx.core.Environment.get(eO)){fN+=eM;}
;var fK;if(fI.disabled){fK=r;}
else if(fI.showingPlaceholder){fK=cH;}
else {fK=ck;}
;return {decorator:fN,padding:[2,4,1],textColor:fK};}
},"textarea":{include:eb,style:function(fO){return {padding:4};}
},"spinner":{style:function(fP){var fT;var fR=!!fP.focused;var fS=!!fP.invalid;var fQ=!!fP.disabled;if(fR&&fS&&!fQ){fT=dG;}
else if(fR&&!fS&&!fQ){fT=dy;}
else if(fQ){fT=cs;}
else if(!fR&&fS&&!fQ){fT=ef;}
else {fT=dj;}
;if(qx.core.Environment.get(eO)){fT+=eM;}
;return {decorator:fT};}
},"spinner/textfield":{style:function(fU){return {marginRight:2,padding:[2,4,1],textColor:fU.disabled?r:ck};}
},"spinner/upbutton":{alias:t,include:t,style:function(fV,fW){return {icon:eH,padding:[fW.padding[0]-1,fW.padding[1]-5],shadow:undefined,margin:0};}
},"spinner/downbutton":{alias:t,include:t,style:function(fX,fY){return {icon:cr,padding:[fY.padding[0]-1,fY.padding[1]-5],shadow:undefined,margin:0};}
},"datefield":cc,"datefield/button":{alias:K,include:K,style:function(ga){return {icon:el,padding:[0,3],decorator:undefined};}
},"datefield/textfield":eY,"datefield/list":{alias:ch,include:ch,style:function(gb){return {decorator:undefined};}
},"groupbox":{style:function(gc){return {legendPosition:bU};}
},"groupbox/legend":{alias:eL,style:function(gd){return {padding:[1,0,1,4],textColor:gd.invalid?cV:be,font:s};}
},"groupbox/frame":{style:function(ge){var gf=qx.core.Environment.get(u);return {padding:gf?10:12,margin:gf?1:undefined,decorator:gf?ea:eP};}
},"check-groupbox":q,"check-groupbox/legend":{alias:dD,include:dD,style:function(gg){return {padding:[1,0,1,4],textColor:gg.invalid?cV:be,font:s};}
},"radio-groupbox":q,"radio-groupbox/legend":{alias:S,include:S,style:function(gh){return {padding:[1,0,1,4],textColor:gh.invalid?cV:be,font:s};}
},"scrollarea":{style:function(gi){return {minWidth:50,minHeight:50};}
},"scrollarea/corner":{style:function(gj){return {backgroundColor:bF};}
},"scrollarea/pane":eN,"scrollarea/scrollbar-x":ce,"scrollarea/scrollbar-y":ce,"scrollbar":{style:function(gk){if(gk[v]){return {};}
;var gl=qx.core.Environment.get(eO);var gm=gk.horizontal?eF:bv;if(gl){gm+=eM;}
;return {width:gk.horizontal?undefined:16,height:gk.horizontal?16:undefined,decorator:gm,padding:1};}
},"scrollbar/slider":{alias:cO,style:function(gn){return {padding:gn.horizontal?[0,1,0,1]:[1,0,1,0]};}
},"scrollbar/slider/knob":{include:t,style:function(go){var gp=qx.core.Environment.get(eO);var gq=go.horizontal?Q:bk;if(go.disabled){gq+=eE;}
;if(gp){gq+=eM;}
;return {decorator:gq,minHeight:go.horizontal?undefined:9,minWidth:go.horizontal?9:undefined,padding:undefined,margin:0};}
},"scrollbar/button":{alias:t,include:t,style:function(gr){var gu=dH;if(gr.left){gu+=f;}
else if(gr.right){gu+=ew;}
else if(gr.up){gu+=W;}
else {gu+=cL;}
;var gt=qx.core.Environment.get(eO);if(gr.left||gr.right){var gs=gr.left?3:4;return {padding:gt?[3,0,3,gs]:[2,0,2,gs],icon:gu,width:15,height:14,margin:0};}
else {return {padding:gt?3:[3,2],icon:gu,width:14,height:15,margin:0};}
;}
},"scrollbar/button-begin":b,"scrollbar/button-end":b,"slider":{style:function(gv){var gz;var gx=!!gv.focused;var gy=!!gv.invalid;var gw=!!gv.disabled;if(gx&&gy&&!gw){gz=dG;}
else if(gx&&!gy&&!gw){gz=dy;}
else if(gw){gz=cs;}
else if(!gx&&gy&&!gw){gz=ef;}
else {gz=dj;}
;if(qx.core.Environment.get(eO)){gz+=eM;}
;return {decorator:gz};}
},"slider/knob":{include:t,style:function(gA){return {decorator:gA.disabled?dM:Q,shadow:undefined,height:14,width:14,padding:0};}
},"list":{alias:bC,style:function(gB){var gF;var gD=!!gB.focused;var gE=!!gB.invalid;var gC=!!gB.disabled;if(gD&&gE&&!gC){gF=dG;}
else if(gD&&!gE&&!gC){gF=dy;}
else if(gC){gF=cs;}
else if(!gD&&gE&&!gC){gF=ef;}
else {gF=dj;}
;if(qx.core.Environment.get(eO)){gF+=eM;}
;return {backgroundColor:dC,decorator:gF};}
},"list/pane":eN,"listitem":{alias:eL,style:function(gG){var gH;if(gG.dragover){gH=gG.selected?by:bB;}
else {gH=gG.selected?a:undefined;if(gH&&qx.core.Environment.get(eO)){gH+=eM;}
;}
;return {padding:gG.dragover?[4,4,2,4]:4,textColor:gG.selected?p:undefined,decorator:gH};}
},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:t,include:t,style:function(gI){return {padding:5,center:true,icon:gI.vertical?dz:cP};}
},"slidebar/button-backward":{alias:t,include:t,style:function(gJ){return {padding:5,center:true,icon:gJ.vertical?P:cQ};}
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
},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(gQ){var gR=qx.core.Environment.get(eO)&&qx.core.Environment.get(u);return {decorator:gR?j:bS,minHeight:100,marginBottom:gQ.barBottom?-1:0,marginTop:gQ.barTop?-1:0,marginLeft:gQ.barLeft?-1:0,marginRight:gQ.barRight?-1:0};}
},"tabview-page":{alias:eN,include:eN,style:function(gS){var gT=qx.core.Environment.get(eO)&&qx.core.Environment.get(u);return {padding:gT?[4,3]:undefined};}
},"tabview-page/button":{alias:eL,style:function(gU){var hc,gX=0;var hb=0,gV=0,gY=0,ha=0;var gW=qx.core.Environment.get(u)&&qx.core.Environment.get(l)&&qx.core.Environment.get(eO);if(gU.checked){if(gU.barTop){hc=cR;gX=gW?[5,11]:[6,14];gY=gU.firstTab?0:-5;ha=gU.lastTab?0:-5;}
else if(gU.barBottom){hc=dP;gX=gW?[5,11]:[6,14];gY=gU.firstTab?0:-5;ha=gU.lastTab?0:-5;hb=3;}
else if(gU.barRight){hc=eD;gX=gW?[5,10]:[6,13];hb=gU.firstTab?0:-5;gV=gU.lastTab?0:-5;gY=2;}
else {hc=dn;gX=gW?[5,10]:[6,13];hb=gU.firstTab?0:-5;gV=gU.lastTab?0:-5;}
;}
else {if(gU.barTop){hc=A;gX=gW?[3,9]:[4,10];hb=4;gY=gU.firstTab?5:1;ha=1;}
else if(gU.barBottom){hc=er;gX=gW?[3,9]:[4,10];gV=4;gY=gU.firstTab?5:1;ha=1;hb=3;}
else if(gU.barRight){hc=eW;gX=gW?[3,9]:[4,10];ha=5;hb=gU.firstTab?5:1;gV=1;gY=3;}
else {hc=B;gX=gW?[3,9]:[4,10];gY=5;hb=gU.firstTab?5:1;gV=1;ha=1;}
;}
;if(hc&&gW){hc+=eM;}
;return {zIndex:gU.checked?10:5,decorator:hc,padding:gX,marginTop:hb,marginBottom:gV,marginLeft:gY,marginRight:ha,textColor:gU.disabled?r:gU.checked?bK:cv};}
},"tabview-page/button/label":{alias:o,style:function(hd){return {padding:[0,1,0,1],margin:hd.focused?0:1,decorator:hd.focused?eo:undefined};}
},"tabview-page/button/close-button":{alias:eL,style:function(he){return {icon:bz};}
},"toolbar":{style:function(hf){var hg=qx.core.Environment.get(eO);return {decorator:hg?cN:bj,spacing:2};}
},"toolbar/part":{style:function(hh){return {decorator:dp,spacing:2};}
},"toolbar/part/container":{style:function(hi){return {paddingLeft:2,paddingRight:2};}
},"toolbar/part/handle":{style:function(hj){return {source:bb,marginLeft:3,marginRight:3};}
},"toolbar-button":{alias:eL,style:function(hk){var hm;if(hk.pressed||(hk.checked&&!hk.hovered)||(hk.checked&&hk.disabled)){hm=D;}
else if(hk.hovered&&!hk.disabled){hm=bM;}
;var hl=qx.core.Environment.get(eO)&&qx.core.Environment.get(u);if(hl&&hm){hm+=eM;}
;return {marginTop:2,marginBottom:2,padding:(hk.pressed||hk.checked||hk.hovered)&&!hk.disabled||(hk.disabled&&hk.checked)?3:5,decorator:hm};}
},"toolbar-menubutton":{alias:F,include:F,style:function(hn){return {showArrow:true};}
},"toolbar-menubutton/arrow":{alias:du,include:du,style:function(ho){return {source:cr};}
},"toolbar-splitbutton":{style:function(hp){return {marginTop:2,marginBottom:2};}
},"toolbar-splitbutton/button":{alias:F,include:F,style:function(hq){return {icon:dz,marginTop:undefined,marginBottom:undefined};}
},"toolbar-splitbutton/arrow":{alias:F,include:F,style:function(hr){if(hr.pressed||hr.checked||(hr.hovered&&!hr.disabled)){var hs=1;}
else {var hs=3;}
;return {padding:hs,icon:dz,marginTop:undefined,marginBottom:undefined};}
},"toolbar-separator":{style:function(ht){return {decorator:dQ,margin:7};}
},"tree":bg,"tree-item":{style:function(hu){var hv=hu.selected?a:undefined;if(hv&&qx.core.Environment.get(eO)){hv+=eM;}
;return {padding:[2,6],textColor:hu.selected?p:undefined,decorator:hv};}
},"tree-item/icon":{include:du,style:function(hw){return {paddingRight:5};}
},"tree-item/label":o,"tree-item/open":{include:du,style:function(hx){var hy;if(hx.selected&&hx.opened){hy=eS;}
else if(hx.selected&&!hx.opened){hy=X;}
else if(hx.opened){hy=cp;}
else {hy=L;}
;return {padding:[0,5,0,2],source:hy};}
},"tree-folder":{include:cb,alias:cb,style:function(hz){var hB,hA;if(hz.small){hB=hz.opened?dk:I;hA=dk;}
else if(hz.large){hB=hz.opened?df:dY;hA=df;}
else {hB=hz.opened?cY:ds;hA=cY;}
;return {icon:hB,iconOpened:hA};}
},"tree-file":{include:cb,alias:cb,style:function(hC){return {icon:hC.small?dh:hC.large?br:ba};}
},"treevirtual":cX,"treevirtual-folder":{style:function(hD){return {icon:hD.opened?dk:I};}
},"treevirtual-file":{include:db,alias:db,style:function(hE){return {icon:dh};}
},"treevirtual-line":{style:function(hF){return {icon:eg};}
},"treevirtual-contract":{style:function(hG){return {icon:cp,paddingLeft:5,paddingTop:2};}
},"treevirtual-expand":{style:function(hH){return {icon:L,paddingLeft:5,paddingTop:2};}
},"treevirtual-only-contract":cd,"treevirtual-only-expand":cj,"treevirtual-start-contract":cd,"treevirtual-start-expand":cj,"treevirtual-end-contract":cd,"treevirtual-end-expand":cj,"treevirtual-cross-contract":cd,"treevirtual-cross-expand":cj,"treevirtual-end":{style:function(hI){return {icon:eg};}
},"treevirtual-cross":{style:function(hJ){return {icon:eg};}
},"tooltip":{include:dw,style:function(hK){return {backgroundColor:dK,padding:[1,3,2,3],offset:[15,5,5,5]};}
},"tooltip/atom":eL,"tooltip-error":{include:ed,style:function(hL){var hO=qx.core.Environment.get(u)&&qx.core.Environment.get(l);var hN=es;if(hO){hN+=eM;}
;if(hL.placementLeft){hN+=E;}
;var hP=ej;if(hL.placementLeft){hP=U;if(hO){hP+=eM;}
;}
;if(hO){if(hL.placementLeft){var hM=[9,20,3,6];}
else {var hM=[6,6,7,-8];}
;}
else {if(hL.placementLeft){var hM=[6,20,3,4];}
else {var hM=[6,10,6,-10];}
;}
;if(!hO&&hL.placementLeft&&qx.core.Environment.get(bX)==bR&&qx.core.Environment.get(cJ)<9){hP=undefined;hM=[5,10];}
;return {textColor:p,backgroundColor:undefined,placeMethod:eN,offset:[0,14,0,14],marginTop:-2,position:cU,showTimeout:100,hideTimeout:10000,shadow:hN,decorator:hP,font:s,padding:hM,maxWidth:333};}
},"tooltip-error/atom":eL,"window":{style:function(hQ){var hS=qx.core.Environment.get(u)&&qx.core.Environment.get(eO)&&qx.core.Environment.get(l);var hT;var hR;if(hS){if(hQ.showStatusbar){hT=eu;}
else {hT=ez;}
;}
else {hR=ex;}
;return {decorator:hT,shadow:hR,contentPadding:[10,10,10,10],margin:hQ.maximized?0:[0,5,5,0]};}
},"window-resize-frame":{style:function(hU){var hV=qx.core.Environment.get(u);var hW;if(hV){if(hU.showStatusbar){hW=bN;}
else {hW=dO;}
;}
else {hW=m;}
;return {decorator:hW};}
},"window/pane":{style:function(hX){var hY=qx.core.Environment.get(u)&&qx.core.Environment.get(eO)&&qx.core.Environment.get(l);return {decorator:hY?ev:cK};}
},"window/captionbar":{style:function(ia){var ib=qx.core.Environment.get(u)&&qx.core.Environment.get(eO)&&qx.core.Environment.get(l);var ic=ia.active?bm:dT;if(ib){ic+=eM;}
;return {decorator:ic,textColor:ia.active?dX:bQ,minHeight:26,paddingRight:2};}
},"window/icon":{style:function(id){return {margin:[5,0,3,6]};}
},"window/title":{style:function(ie){return {alignY:dv,font:s,marginLeft:6,marginRight:12};}
},"window/minimize-button":{alias:eL,style:function(ig){return {icon:ig.active?ig.hovered?x:eV:eR,margin:[4,8,2,0]};}
},"window/restore-button":{alias:eL,style:function(ih){return {icon:ih.active?ih.hovered?ct:bh:eU,margin:[5,8,2,0]};}
},"window/maximize-button":{alias:eL,style:function(ii){return {icon:ii.active?ii.hovered?ep:dt:bE,margin:[4,8,2,0]};}
},"window/close-button":{alias:eL,style:function(ij){return {icon:ij.active?ij.hovered?eX:dE:dr,margin:[4,8,2,0]};}
},"window/statusbar":{style:function(ik){var il=qx.core.Environment.get(u)&&qx.core.Environment.get(eO)&&qx.core.Environment.get(l);return {padding:[2,6],decorator:il?ca:eA,minHeight:18};}
},"window/statusbar-text":{style:function(im){return {font:eK};}
},"iframe":{style:function(io){return {decorator:m};}
},"resizer":{style:function(ip){var iq=qx.core.Environment.get(l)&&qx.core.Environment.get(u)&&qx.core.Environment.get(eO);return {decorator:iq?Y:i};}
},"splitpane":{style:function(ir){return {decorator:bp};}
},"splitpane/splitter":{style:function(is){return {width:is.horizontal?3:undefined,height:is.vertical?3:undefined,backgroundColor:cm};}
},"splitpane/splitter/knob":{style:function(it){return {source:it.horizontal?dW:dl};}
},"splitpane/slider":{style:function(iu){return {width:iu.horizontal?3:undefined,height:iu.vertical?3:undefined,backgroundColor:cm};}
},"selectbox":t,"selectbox/atom":eL,"selectbox/popup":dw,"selectbox/list":{alias:bg},"selectbox/arrow":{include:du,style:function(iv){return {source:dz,paddingLeft:5};}
},"datechooser":{style:function(iw){var iA;var iy=!!iw.focused;var iz=!!iw.invalid;var ix=!!iw.disabled;if(iy&&iz&&!ix){iA=dG;}
else if(iy&&!iz&&!ix){iA=dy;}
else if(ix){iA=cs;}
else if(!iy&&iz&&!ix){iA=ef;}
else {iA=dj;}
;if(qx.core.Environment.get(eO)){iA+=eM;}
;return {padding:2,decorator:iA,backgroundColor:dC};}
},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:t,alias:t,style:function(iB){var iC={padding:[2,4],shadow:undefined};if(iB.lastYear){iC.icon=bT;iC.marginRight=1;}
else if(iB.lastMonth){iC.icon=cQ;}
else if(iB.nextYear){iC.icon=bO;iC.marginLeft=1;}
else if(iB.nextMonth){iC.icon=cP;}
;return iC;}
},"datechooser/last-year-button-tooltip":ed,"datechooser/last-month-button-tooltip":ed,"datechooser/next-year-button-tooltip":ed,"datechooser/next-month-button-tooltip":ed,"datechooser/last-year-button":cf,"datechooser/last-month-button":cf,"datechooser/next-month-button":cf,"datechooser/next-year-button":cf,"datechooser/month-year-label":{style:function(iD){return {font:s,textAlign:cg,textColor:iD.disabled?r:undefined};}
},"datechooser/date-pane":{style:function(iE){return {textColor:iE.disabled?r:undefined,marginTop:2};}
},"datechooser/weekday":{style:function(iF){return {textColor:iF.disabled?r:iF.weekend?cF:undefined,textAlign:cg,paddingTop:2,backgroundColor:dg};}
},"datechooser/week":{style:function(iG){return {textAlign:cg,padding:[2,4],backgroundColor:dg};}
},"datechooser/day":{style:function(iH){var iI=iH.disabled?undefined:iH.selected?a:undefined;if(iI&&qx.core.Environment.get(eO)){iI+=eM;}
;return {textAlign:cg,decorator:iI,textColor:iH.disabled?r:iH.selected?p:iH.otherMonth?cF:undefined,font:iH.today?s:undefined,padding:[2,4]};}
},"combobox":{style:function(iJ){var iN;var iL=!!iJ.focused;var iM=!!iJ.invalid;var iK=!!iJ.disabled;if(iL&&iM&&!iK){iN=dG;}
else if(iL&&!iM&&!iK){iN=dy;}
else if(iK){iN=cs;}
else if(!iL&&iM&&!iK){iN=ef;}
else {iN=dj;}
;if(qx.core.Environment.get(eO)){iN+=eM;}
;return {decorator:iN};}
},"combobox/popup":dw,"combobox/list":{alias:bg},"combobox/button":{include:t,alias:t,style:function(iO,iP){var iQ={icon:dz,padding:[iP.padding[0],iP.padding[1]-6],shadow:undefined,margin:undefined};if(iO.selected){iQ.decorator=da;}
;return iQ;}
},"combobox/textfield":{include:eb,style:function(iR){return {decorator:undefined};}
},"menu":{style:function(iS){var iT=qx.core.Environment.get(eO)&&qx.core.Environment.get(l);var iU={decorator:iT?en:cy,shadow:iT?undefined:di,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:iS.submenu||iS.contextmenu?V:cM};if(iS.submenu){iU.position=cU;iU.offset=[-2,-3];}
;return iU;}
},"menu/slidebar":C,"menu-slidebar":eN,"menu-slidebar-button":{style:function(iV){var iW=iV.hovered?a:undefined;if(iW&&qx.core.Environment.get(eO)){iW+=eM;}
;return {decorator:iW,padding:7,center:true};}
},"menu-slidebar/button-backward":{include:cD,style:function(iX){return {icon:iX.hovered?eJ:P};}
},"menu-slidebar/button-forward":{include:cD,style:function(iY){return {icon:iY.hovered?dV:dz};}
},"menu-separator":{style:function(ja){return {height:0,decorator:k,margin:[4,2]};}
},"menu-button":{alias:eL,style:function(jb){var jc=jb.selected?a:undefined;if(jc&&qx.core.Environment.get(eO)){jc+=eM;}
;return {decorator:jc,textColor:jb.selected?p:undefined,padding:[4,6]};}
},"menu-button/icon":{include:du,style:function(jd){return {alignY:dv};}
},"menu-button/label":{include:o,style:function(je){return {alignY:dv,padding:1};}
},"menu-button/shortcut":{include:o,style:function(jf){return {alignY:dv,marginLeft:14,padding:1};}
},"menu-button/arrow":{include:du,style:function(jg){return {source:jg.selected?g:cP,alignY:dv};}
},"menu-checkbox":{alias:dR,include:dR,style:function(jh){return {icon:!jh.checked?undefined:jh.selected?bw:dU};}
},"menu-radiobutton":{alias:dR,include:dR,style:function(ji){return {icon:!ji.checked?undefined:ji.selected?cI:bJ};}
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
},"colorpopup/colorselector-okbutton":{alias:n,include:n,style:function(jw){return {icon:bV};}
},"colorpopup/colorselector-cancelbutton":{alias:n,include:n,style:function(jx){return {icon:z};}
},"table":{alias:eN,style:function(jy){return {decorator:cX};}
},"table/statusbar":{style:function(jz){return {decorator:dA,padding:[0,2]};}
},"table/column-button":{alias:t,style:function(jA){var jB=qx.core.Environment.get(eO);return {decorator:jB?bq:M,padding:3,icon:bI};}
},"table-column-reset-button":{include:dR,alias:dR,style:function(){return {icon:e};}
},"table-scroller":eN,"table-scroller/scrollbar-x":ce,"table-scroller/scrollbar-y":ce,"table-scroller/header":{style:function(jC){var jD=qx.core.Environment.get(eO);return {decorator:jD?bq:M,textColor:jC.disabled?r:undefined};}
},"table-scroller/pane":{style:function(jE){return {backgroundColor:dF};}
},"table-scroller/focus-indicator":{style:function(jF){return {decorator:ei};}
},"table-scroller/resize-line":{style:function(jG){return {backgroundColor:bD,width:2};}
},"table-header-cell":{alias:eL,style:function(jH){return {minWidth:13,minHeight:20,padding:jH.hovered?[3,4,2,4]:[3,4],decorator:jH.hovered?bY:bd,sortIcon:jH.sorted?(jH.sortedAscending?eI:bP):undefined};}
},"table-header-cell/label":{style:function(jI){return {minWidth:0,alignY:dv,paddingRight:5};}
},"table-header-cell/sort-icon":{style:function(jJ){return {alignY:dv,alignX:J,opacity:jJ.disabled?0.3:1};}
},"table-header-cell/icon":{style:function(jK){return {minWidth:0,alignY:dv,paddingRight:5,opacity:jK.disabled?0.3:1};}
},"table-editor-textfield":{include:eb,style:function(jL){return {decorator:undefined,padding:[2,2],backgroundColor:dC};}
},"table-editor-selectbox":{include:cT,alias:cT,style:function(jM){return {padding:[0,2],backgroundColor:dC};}
},"table-editor-combobox":{include:cc,alias:cc,style:function(jN){return {decorator:undefined,backgroundColor:dC};}
},"progressive-table-header":{alias:eN,style:function(jO){return {decorator:bH};}
},"progressive-table-header-cell":{alias:eL,style:function(jP){var jQ=qx.core.Environment.get(eO);return {minWidth:40,minHeight:25,paddingLeft:6,decorator:jQ?dB:eC};}
},"app-header":{style:function(jR){return {font:s,textColor:p,padding:[8,12],decorator:cx};}
},"app-header-label":o,"app-splitpane":{alias:bp,style:function(jS){return {padding:0};}
},"virtual-list":bg,"virtual-list/row-layer":cw,"row-layer":eN,"group-item":{include:o,alias:o,style:function(jT){return {padding:4,decorator:qx.core.Environment.get(eO)?eQ:c,textColor:cS,font:s};}
},"virtual-selectbox":cT,"virtual-selectbox/dropdown":dw,"virtual-selectbox/dropdown/list":{alias:H},"virtual-combobox":cc,"virtual-combobox/dropdown":dw,"virtual-combobox/dropdown/list":{alias:H},"virtual-tree":{include:bf,alias:bf,style:function(jU){return {itemHeight:26};}
},"virtual-tree-folder":ey,"virtual-tree-file":bn,"column-layer":eN,"cell":{style:function(jV){return {textColor:jV.selected?p:O,padding:[3,6],font:cq};}
},"cell-string":dx,"cell-number":{include:dx,style:function(jW){return {textAlign:J};}
},"cell-image":dx,"cell-boolean":{include:dx,style:function(jX){return {iconTrue:cA,iconFalse:bs};}
},"cell-atom":dx,"cell-date":dx,"cell-html":dx,"htmlarea":{"include":eN,style:function(jY){return {backgroundColor:h};}
},"progressbar":{style:function(ka){return {decorator:eG,padding:[1],backgroundColor:bW,width:200,height:20};}
},"progressbar/progress":{style:function(kb){var kc=kb.disabled?c:a;if(qx.core.Environment.get(eO)){kc+=eM;}
;return {decorator:kc};}
}}});}
)();
(function(){var c="Tango",b="qx/icon/Tango",a="qx.theme.icon.Tango";qx.Theme.define(a,{title:c,aliases:{"icon":b}});}
)();
(function(){var t="monospace",s="Courier New",r="Lucida Console",q="Monaco",p="qx.theme.modern.Font",o="DejaVu Sans Mono",n="Consolas",m="Liberation Sans",l="Tahoma",k="sans-serif",d="Arial",j="Lucida Grande",g="Candara",c="Segoe UI",b="osx",f="win",e="7",h="vista",a="os.name",i="os.version";qx.Theme.define(p,{fonts:{"default":{size:(qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h))?12:11,lineHeight:1.4,family:qx.core.Environment.get(a)==b?[j]:((qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h)))?[c,g]:[l,m,d,k]},"bold":{size:(qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h))?12:11,lineHeight:1.4,family:qx.core.Environment.get(a)==b?[j]:((qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h)))?[c,g]:[l,m,d,k],bold:true},"small":{size:(qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h))?11:10,lineHeight:1.4,family:qx.core.Environment.get(a)==b?[j]:((qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h)))?[c,g]:[l,m,d,k]},"monospace":{size:11,lineHeight:1.4,family:qx.core.Environment.get(a)==b?[r,q]:((qx.core.Environment.get(a)==f&&(qx.core.Environment.get(i)==e||qx.core.Environment.get(i)==h)))?[n]:[n,o,s,t]}}});}
)();
(function(){var b="qx.theme.Modern",a="Modern";qx.Theme.define(b,{title:a,meta:{color:qx.theme.modern.Color,decoration:qx.theme.modern.Decoration,font:qx.theme.modern.Font,appearance:qx.theme.modern.Appearance,icon:qx.theme.icon.Tango}});}
)();


qx.$$loader.init();

