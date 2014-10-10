qx.Class.define("ca.opennms.ui.navigation.SectionPanel", {
   extend : collapsablepanel.Panel,
   construct : function(title, iconSrc) {
      this._icon = iconSrc;
      this.base(arguments, title);
   },
   // overridden
   members : {
      _icon : "images/icons/16/cube.png",
      _createChildControlImpl : function(id) {
         var control;

         switch(id) {
            case "bar":
               control = new qx.ui.basic.Atom(this.getCaption(), this._icon);
               control.addListener("click", this.toggleValue, this);
               this._add(control, {
                  flex : 1
               });
               break;

            case "container":
               control = new qx.ui.container.Composite();
               this._add(control, {
                  flex : 1
               });
               break;
         }
         return control || this.base(arguments, id);
      }
   }
});
