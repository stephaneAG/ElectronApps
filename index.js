// http://electron.atom.io/docs/v0.35.0/
// http://electron.atom.io/docs/v0.35.0/api/synopsis/


// instance of our app
var app = require('app')
// browser window API
var BrowserWindow = require('browser-window')
// IPC for messages
var ipc = require('ipc') // to interact with our app using messages ( ex: to show prefs window )
// for notifications
//var Notification = require('notification')
// for clipboard
const clipboard = require('electron').clipboard


// global ref of the window obj, else it'd be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;


// Report crashes to our server --> ? not used/digged yet
//require('crash-reporter').start();


// test quitting totally app when all windows are closed
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});


// app has loaded
app.on('ready', function() {
  // http://electron.atom.io/docs/v0.35.0/api/tray/

  // open a window when we run the app
  // http://electron.atom.io/docs/v0.35.0/api/browser-window/
  // http://electron.atom.io/docs/v0.35.0/api/frameless-window/
  // http://electron.atom.io/docs/v0.35.0/api/native-image/
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //x:
    //y:
    center: true,
    //minWidth:
    //minHeight:
    //maxWidth:
    //maxHeight:
    resizable: false,
    //alwaysOnTop: true,
    //fullscreen: false,
    //skipTaskBar: false,
    //kiosk: false,
    title: 'My App',
    icon: './electron-icon.png', // displayed in toolbar in Ubuntu
    //backgroundColor: '#BADA55',
    //show: true,
    //frame: false, // frameless window
    //transparent: true, // makes the window transparent ( requires frameless )
    //acceptFirstMouse: false, // webview accept single mouse-down evt to activate the window
    //disableAutoHideCursor: false, // hide the cursor when typing
    //autoHideMenuBar: false, // auto hide menu bar until Alt is pressed
    //enableLargerThanScreen: false, // enables the window to be resized larger than the screen
    //darkTheme: false, // force using the dark theme
    //type: 'theType', // type of the window: desktop/dock/toolbar/splash/notification - Linux only
    //standardWindow: true, // use standard window instead of textured one - OSX only
    //titleBarStyle: 'theStyle', // style of window bar: default/hidden/hidden-inset - OSX only
    //webPreferences: object // settings of webpage's features & props
  })
  // display something in the main window
  //mainWindow.loadUrl('file://' + __dirname + '/index.html')
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  // popup the browser dev tools when we npm start ( to see console messages, inspect the page ..)
  //mainWindow.openDevTools() // -old, deprecated
  mainWindow.webContents.openDevTools(); // - new
  // fake something happening
  mainWindow.setProgressBar(0.5); // no effect ? :/

  // register closed evt for mainWindow
  mainWindow.on('closed', function() {
    // Dereference the window object ( or delete it if held within an array of windowd, for ex )
    mainWindow = null;
  })

  // 2nd window for prefs
  var prefsWindow = new BrowserWindow({
    width: 400,
    height: 400,
    show: false // don't show when created / app's ready
  })
  //prefsWindow.loadUrl('file://' + __dirname + '/prefs.html')
  prefsWindow.loadURL('file://' + __dirname + '/prefs.html')


  // register ipc events
  ipc.on('show-prefs', function(){
    prefsWindow.show()
  })
  ipc.on('hide-prefs', function(){
    prefsWindow.hide()
  })
  ipc.on('toggle-prefs', function(){
    if( prefsWindow.isVisible() ) prefsWindow.hide()
    else prefsWindow.show()
  })


  // know if we're runnig from a terminal
  if (require('tty').isatty(1)) {
    // terminal
    process.stdout.write("Hello Tef in the terminal !" + '\n');
  } else {
    console.log("Hello Tef in the devTools console !")
  }


  // test notifications
  // http://electron.atom.io/docs/v0.35.0/tutorial/desktop-environment-integration/
  /*
  var myNotification = new Notification('Title', {
    body: 'Lorem Ipsum Dolor Sit Amet'
  });

  myNotification.onclick = function () {
    console.log('Notification clicked')
  }
  */
  /* until I have the above working, little test using Ubuntu's libnotify ( notify-send ? ) */
  // now, the question is "ho to get a click callback" out of it ..
  // .. which may not be easy using libnotify .. 
  // .. but quite easy creating a fixed-position-not-resizable-frameless-custom-window that'd look like a notification
  
  // interaction with whatever app/program
  /*
  var exec = require('child-process').exec;
  var notifySend = function(message, appName, urgency, expireTime, icon, category, hint){
    // build the command
    var cmdStr = 'notify-send';
    // urgency ( low, normal, critical )
    cmdStr+= ( typeof urgency !== 'undefined') ? ' -u ' + urgency : '';
    // expireTime ( timeout in milliseconds at which to expire the notification )
    cmdStr+= ( typeof expireTime !== 'undefined') ? ' -t ' + expireTime : '';      
    // icon path or stock icon
    cmdStr+= ( typeof icon !== 'undefined') ? ' -i ' + icon : ' -i ' + mainWindow.icon; // default to main window icon
    // category ( the notification category )
    cmdStr+= ( typeof category !== 'undefined') ? ' -t ' + expireTime : '';
    // appName / notification title
    cmdStr+= ( typeof appName !== 'undefined') ? ' "' + appName + '" ' : ' "' + mainWindow.title + '" '; // default to main window title
    // message
    cmdStr+= ( typeof category !== 'undefined') ? ' "' + message + '" ': '';

    // invoke it
    exec(cmdStr , function(error, stdout){  
      console.log('Native notification using notify-send triggered !');
    });
  }
  */


  // test clipboard
  // http://electron.atom.io/docs/v0.35.0/api/clipboard/
  console.log( 'Clipboard of client: ' + clipboard.readText() )
  clipboard.writeText('Example string from Electron !')


  // could be useful
  // http://electron.atom.io/docs/v0.35.0/api/chrome-command-line-switches/


  // also pretty interesting
  // http://electron.atom.io/docs/v0.35.0/api/screen/


  // as well ..
  // http://electron.atom.io/docs/v0.35.0/api/shell/


  // have fun with serial devices ?
  //var SerialPort = require("serialport-electron").SerialPort;
  //var SerialPort = require("serialport").SerialPort; // sudo npm i serialport --save-dev
  /*
  var serialPort = new SerialPort("/dev/TTYACM0", {
    baudrate: 57600
  });
  */


  // at least, have fun with espruino ! ^^
  // added as "dependencies" & NOT "devDependencies" in the package.json
  /*
  var esp = require("espruino");
  esp.init(function(){ 
    console.log('Espruino booted')
    debugEspruino()
  });

  var debugEspruino = function(){
    esp.expr('/dev/ttyACM0', 'digitalWrite(LED1, 1)', function(){
      console.log('LED ON ..')
      setTimeout(esp.expr('/dev/ttyACM0', 'digitalWrite(LED1, 0)', function(){
        console.log('LED ON ..')
      }), 3000)
    });
  }
  */

})
