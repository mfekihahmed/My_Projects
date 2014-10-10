var baseConf = {
  'autName' : 'Skeleton',
  'globalTimeout' : 300000,
  'stepSpeed' : '250',
  'selServer' : 'localhost',
  'selPort' : 4444,
  'testBrowser' : '*custom /usr/lib/firefox-3.0.11/firefox -no-remote -P selenium-3',
  'browserId' : 'Firefox 3.0.11',
  'autHost' : 'http://localhost',
  'autPath' : '/~dwagner/workspace/qooxdoo.trunk/framework/api/index.html',
  'simulatorSvn' : '/home/dwagner/workspace/qooxdoo.contrib/Simulator',
  'debug' : true
};

var args = arguments ? arguments : "";
var simSvn = baseConf.simulatorSvn;
for (var i=0; i<args.length; i++) {
  if (args[i].indexOf('simulatorSvn') >= 0) {
    simSvn = args[i].substr(args[i].indexOf('simulatorSvn=') + 13);
  }
}

load([simSvn + "/trunk/tool/selenium/simulation/Simulation.js"]);

var mySim = new simulation.Simulation(baseConf,args);

var selWin = 'selenium.qxStoredVars["autWindow"]';
var qxAppInst = simulation.Simulation.QXAPPINSTANCE;

simulation.Simulation.prototype.bomTest = function(nativeApp)
{
  var eventDivLocator = '//html/body/div[@id="logger"]';
  var eventDivElem = '.document.getElementById("logger")';
  if (nativeApp) {
    eventDivLocator = '//html/body/div';
    eventDivElem = '.document.getElementsByTagName("div")[0]';
  }
  
  this.__sel.focus(eventDivLocator);
  this.__sel.typeKeys(eventDivLocator, 'A');
  var divContent = this.getEval(selWin + eventDivElem + '.innerHTML', "Getting logger div content.");
  if (divContent.indexOf("A") === 0) {
    this.log("qooxdoo event system seems to work.", "info");
  }
  else {
    this.log("Unexpected logger div content. Possible problem with the qooxdoo event system.", "error");
  }
};

simulation.Simulation.prototype.inlineTest = function()
{
  this.log("Clicking qooxdoo button - should open an alert box", "info");
  this.qxClick("qxh=qx.ui.form.Button");
  this.killBoxes();  
};

simulation.Simulation.prototype.runTest = function()
{ 
  if (this.getConfigSetting("autPath").indexOf("/bomapplication") >= 0) {
    this.bomTest();
  }
  else if (this.getConfigSetting("autPath").indexOf("/nativeapplication") >= 0) {
    this.bomTest("native");
  }
  else if (this.getConfigSetting("autPath").indexOf("/inlineapplication") >= 0) {
    this.inlineTest();
  }
  else if (this.getConfigSetting("autPath").indexOf("/guiapplication") >= 0) {
    //this.guiTest();
    this.inlineTest();
  }
};

// - Main --------------------------------------------------------------------
(function() { 
  mySim.testFailed = false;

  var sessionStarted = mySim.startSession();
  
  if (!sessionStarted) {
    return;
  }

  if (mySim.getConfigSetting("autPath").indexOf("/bomapplication") < 0
      && mySim.getConfigSetting("autPath").indexOf("/nativeapplication") < 0) {
    var isAppReady = mySim.waitForCondition(simulation.Simulation.ISQXAPPREADY, 60000, "Waiting for qooxdoo application");
    
    if (!isAppReady) {
      mySim.testFailed = true;
      mySim.stop();
      return;
    }
  }
 
  //Packages.java.lang.Thread.sleep(4000);

  try {
    mySim.setupApplicationLogging();
    mySim.runTest();
  }
  catch(ex) {
    mySim.testFailed = true;
    var msg = "Unexpected error while running test!";
    if (mySim.getConfigSetting("debug")) {
      print(msg + "\n" + ex);
    }
    mySim.log(msg + "<br/>" + ex, "error");
  }

  mySim.logResults();

  mySim.stop();

})();