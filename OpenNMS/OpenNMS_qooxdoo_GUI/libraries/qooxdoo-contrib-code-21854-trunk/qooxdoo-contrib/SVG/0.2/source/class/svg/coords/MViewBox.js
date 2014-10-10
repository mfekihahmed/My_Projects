/* ************************************************************************

   Copyright:
     2010-2011  Marc Puts

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Marc Puts (marcputs)

************************************************************************ */

/**
 * It is often desirable to specify that a given set of graphics stretch to fit a
 * particular container element. The _viewBox_ attribute provides this capability.
 *
 * The value of the viewBox attribute specifies a rectangle in user space which
 * should be mapped to the bounds of the viewport established by the given element,
 * taking into account attribute {@link MPreserveAspectRatio}. If specified, an
 * additional transformation is applied to all descendants of the given element to
 * achieve the specified effect.
 *
 * More info:
 * <ul>
 *   <li>http://www.w3.org/TR/SVG/coords.html#ViewBoxAttribute</li>
 * </ul>
 */
qx.Mixin.define("svg.coords.MViewBox",
{
  members :
  {
    __viewBox : null,
    
    /**
     * Specify the rectangle in user space which should be mapped to the bounds of the
     * viewport established by this element, taking into account attribute {@link MPreserveAspectRatio}.
     * 
     * To remove the viewbox attribute, set it to null:
     * <pre class="javascript">
     * element.setViewBox(null);
     * </pre>
     *
     * @param minX {Integer}
     *   min-x of the viewbox rectangle
     *   
     * @param minY {Integer}
     *   min-y of the viewbox rectangle
     * 
     * @param width {Integer}
     *   Width of the viewbox rectangle. A negative value is an error. A value of zero
     *   disables rendering of the element.
     *   
     * @param height {Integer}
     *   Height of the viewbox rectangle. A negative value is an error. A value of zero
     *   disables rendering of the element.
     *   
     * @return {void}
     */
    setViewBox : function(minX, minY, width, height) {
      if (null == minX) {
        this.removeAttribute("viewBox");
        this.__viewBox = null;
      } else {
        this.setAttribute("viewBox", "" + minX + " " + minY + " " + width + " " + height);
        this.__viewBox = {minX:minX, minY:minY, width:width, height:height};
      }
    },

    /**
     * Gets the viewbox rectangle.
     *
     * @return {Map | null} A map describing the viewbox rectangle, which contains the keys <code>minX</code>,
     * <code>minY</code>, <code>width</code> and <code>height</code>. Returns <code>null</code> if the viewbox
     * is not set.  
     * 
     * @see #setViewBox
     */
    getViewBox : function() {
      return this.__viewBox;
    }
  },
  
  destruct: function() {
    this.__viewBox = null;
  }
  
});