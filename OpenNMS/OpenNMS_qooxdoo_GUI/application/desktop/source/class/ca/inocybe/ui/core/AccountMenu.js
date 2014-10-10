/**
 * @author Mathieu Lemay(IT)
 */
qx.Class.define("ca.inocybe.ui.core.AccountMenu",{
	extend: qx.ui.form.MenuButton,
	
	construct: function(x,y,menu){
	  // create main menu and buttons
	  this.base(arguments, x, y, menu);	  

      var menu = new qx.ui.menu.Menu();

      var inboxButton = new qx.ui.menu.Button("Inbox", "icon/16/actions/edit-undo.png", new qx.ui.core.Command("Ctrl+I"));
      var settingsButton = new qx.ui.menu.Button("Settings", "icon/16/actions/edit-undo.png", new qx.ui.core.Command("Ctrl+T"));
      var logoutButton = new qx.ui.menu.Button("Logout", "icon/16/actions/edit-undo.png", new qx.ui.core.Command("Ctrl+X"));

      // add buttons to menu
      menu.add(inboxButton);
      menu.add(settingsButton);
      menu.addSeparator();
      menu.add(logoutButton);

      // Create opener button
      this.setMenu(menu);
    
	}
});
