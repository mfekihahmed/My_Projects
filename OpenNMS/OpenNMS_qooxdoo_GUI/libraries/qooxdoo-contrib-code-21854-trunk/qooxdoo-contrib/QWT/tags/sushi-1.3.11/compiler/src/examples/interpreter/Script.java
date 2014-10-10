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

package interpreter;

public class Script {
    private Declarations decls;
    private Statement stmt;

    public Script(Declarations declsInit, Statement stmtInit) {
        decls = declsInit;
        stmt = stmtInit;
    }

    public void run() {
        System.out.println("running script");
        stmt.execute();
    }
}
