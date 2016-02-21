// R: we can use both browser window API & node/iojs APIs at the same time to build our app ;p

// to add a menu to our app ' & overwrite the default one )
var remote = require('remote') // necessary when not in 'index.js' for the Menu
var ipc = require('ipc') // to interact with our app using messages ( ex: to show prefs window )

var Menu = remote.require('menu')

var menu = Menu.buildFromTemplate([
  {
    label: 'Settings',
    submenu: [
      // preferences
      {
        label: 'Prefs',
        click: function(){
          //ipc.send('show-prefs')
          ipc.send('toggle-prefs')
        }
      },
      // about
      {
        label: 'About',
        click: function(){
          //ipc.send('show-prefs')
          ipc.send('toggle-about')
        }
      }     
    ]
  }
])
Menu.setApplicationMenu(menu)

// to add stuff to the page / interact using 'alert()'
document.write('The current version of io.js ' + process.version)

var fs = require('fs')

var contents = fs.readFileSync('./package.json', 'utf8') // /!\ path won't work when launched from a "packaged" app
alert(contents)
console.log(contents)
