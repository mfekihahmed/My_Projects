/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package java.lang;

public class Long extends Number {
    /** @native return Number(str) */
    public static native long parseLong(String str);
    
    private long value;
    
    public Long(long value) {
        this.value = value;
    }
    
    public long longValue() {
        return value;
    }
    
    @Override
    public String toString() {
        return toString(value);
    }

    /** @native return String(n); */
    public static native String toString(long n);
}
