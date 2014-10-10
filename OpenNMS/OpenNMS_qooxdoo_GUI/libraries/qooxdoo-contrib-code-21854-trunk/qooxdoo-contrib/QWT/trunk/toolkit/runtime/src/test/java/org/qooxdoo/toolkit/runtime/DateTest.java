/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2008 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.toolkit.runtime;

import org.junit.Test;

public class DateTest extends Base2 {
    @Test
    public void date() throws Exception {
        // don't know why, but i've seen ">= 0" fail occasioanlly 
        expr("new java.util.Date().getTime() - System.currentTimeMillis() >= -1000", ANY, true);
    }
}
