/* ************************************************************************

   Copyright:
     2010  Marc Puts

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Marc Puts (marcputs)

************************************************************************ */

/**
 * Validation functions to check values for special SVG data types.
 * 
	   * More info:
	   * <ul>
	   *   <li>http://www.w3.org/TR/SVG/types.html</li>
	   *   <li>http://www.w3.org/TR/SVG/types.html#BasicDataTypes</li>
	   * </ul>
 */
qx.Class.define("svg.core.Types", {
	
	type: "static",
	
	statics :
	{
  
    /**
     * Checks if value is a valid coordinate.
     * 
     * Follows the same restrictions as {@link #isLength}
	   * 
	   * More info:
	   * <ul>
	   *   <li>http://www.w3.org/TR/SVG/types.html#DataTypeCoordinate</li>
	   * </ul>
	   * 
	   * @param value {var}
	   *   value to check
	   *   
	   * @param allowNegative {Boolean ? true}
	   *   whether or not negative values are allowed
	   *   
	   * @return {Boolean}
	   *   true if value is a valid coordinate
     */
    isCoordinate : function(value, allowNegative) {
    	return svg.core.Types.isLength(value, allowNegative);
    },
	  
	  /**
	   * Checks if value is a valid length.
	   * 
	   * A valid length is a positive number, optionally followed by one of
	   * the following unit identifiers: _%, em, ex, px, in, cm, mm, pt, pc_.
	   * 
	   * More info:
	   * <ul>
	   *   <li>http://www.w3.org/TR/SVG/types.html#DataTypeLength</li>
	   * </ul>
	   * 
	   * @param value {var}
	   *   value to check
	   *   
	   * @param allowNegative {Boolean ? true}
	   *   whether or not negative values are allowed
	   *   
	   * @return {Boolean}
	   *   true if value is a valid length
	   */
	  isLength : function(value, allowNegative) {
	
	    //if allowNegative is undefined, use default value
	    allowNegative = allowNegative || true;
	
	    //if value is a number, just check for sign (if needed)  
	    if (!isNaN(value)) {
	    	return allowNegative || value >= 0;
	    }
	    
	    //exclude types other than strings
	    if (typeof(value) != "string") {
	    	return false;
	    }
	    
	    //is it a percentage?
	    if (value.slice(-1) == "%") {
	    	value = value.slice(0, -1);
	    	return !isNaN(value) && (allowNegative || value >= 0);
	    }
	    
	    //is it one of the others?
	    var exp = /^\d+(em|ex|px|in|cm|mm|pt|pc)?$/;
	    
	    if (exp.test(value)) {
	    	value = value.slice(0, -2);
	    	return !isNaN(value) && (allowNegative || value >= 0);
	    }
	    
	    //all checks failed.
	    return false;
    },
    
    /**
     * Checks if value is valid paint. Paint is used for fill and stroke properties.
     * 
	   * More info:
	   * <ul>
	   *   <li>http://www.w3.org/TR/SVG/painting.html#SpecifyingPaint</li>
	   * </ul>
	   * 
	   * @see svg.paint.MFillProperties#fill
	   * @see svg.paint.MStrokeProperties#stroke
	   * 
	   * @param value {var}
	   *   value to check
	   *   
	   * @return {Boolean}
	   *   true if value is valid paint
     */
    isPaint : function(value) {
    	//todo: implement check
    	return true;
    },
    
	  /**
	   * Checks if value is a valid percentage.
	   * 
	   * More info:
	   * <ul>
	   *   <li>http://www.w3.org/TR/SVG/types.html#DataTypePercentage</li>
	   * </ul>
	   * 
	   * @param value {var}
	   *   value to check
	   *   
	   * @return {Boolean}
	   *   true if value is a valid percentage
	   */
    isPercentage : function(value) {
	    if (value.slice(-1) == "%") {
	    	return !isNaN(value.slice(0,-1));
	    }
    }
  }
	
});