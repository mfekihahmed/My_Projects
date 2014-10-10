/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("ca.inocybe.theme.Decoration",
{
  extend : aristo.theme.Decoration,

  decorations :
  {
  	 "separator-vertical" :
    {
      decorator: qx.ui.decoration.Single,

      style :
      {
        widthTop : 1,
        colorTop : "border-separator"
      }
    }
  }
});