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

package org.qooxdoo.toolkit.plugin.binding.java;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.toolkit.plugin.binding.java.Modifier;
import org.qooxdoo.toolkit.plugin.binding.java.Clazz;
import org.qooxdoo.toolkit.plugin.binding.java.ClazzType;
import org.qooxdoo.toolkit.plugin.binding.java.Method;
import org.qooxdoo.toolkit.plugin.binding.java.Field;
import org.qooxdoo.toolkit.plugin.binding.java.SimpleType;

public class ClazzTest {
    private static final IO io = new IO();

    @Test
    public void clazz() {
        Clazz clazz;
        
        clazz = new Clazz(ClazzType.CLASS, "foo.bar.Baz", "Base", "desc");
        clazz.addWithMethods(new Field("p", SimpleType.NUMBER, null, null));
        clazz.methods.add(new Method(Modifier.PUBLIC, false, false, false, false, SimpleType.BOOLEAN, "ok", null, null, null, ""));
        assertEquals("foo.bar.Baz", clazz.getFullName());
        assertEquals("foo.bar", clazz.getPackage());
        assertEquals("Baz", clazz.getName());
        assertTrue(clazz.getJavaFile(io.getWorking()).getAbsolute().endsWith(io.getWorking().fs.join("foo", "bar", "Baz.java")));
        assertEquals(
                "/* Copyright (c) 1&1. All Rights Reserved. */\n" +
                "\n" +
                "// DO NOT EDIT - this file was generated by QWT. \n" + 
                "\n" +
                "package foo.bar;\n" +
                "\n" +
                "/**\n" +
                " * desc\n" +
                " * @augment foo.bar.Baz\n" +
                " */\n" +
                "public class Baz {\n" +
                "    /**\n" +
                "     * @alias\n" +
                "     */\n" + 
                "    private int p;\n" +
                "\n" + 
                "    /**\n" +
                "     * @alias\n" +
                "     */\n" +
                "    public native int getP();\n" +
                "\n" +
                "    /**\n" +
                "     * @alias\n" +
                "     */\n" +
                "    public native void setP(int p);\n" +
                "\n" +
                "    public boolean ok() {\n" +
                "    }\n" +
                "}\n",
                clazz.toJava());
    }

    @Test
    public void interfaze() {
        Clazz clazz;
        
        clazz = new Clazz(ClazzType.INTERFACE, "foo.bar.Baz", "Base", "desc");
        clazz.addWithMethods(new Field("p", SimpleType.NUMBER, null, null));
        assertEquals(
                "/* Copyright (c) 1&1. All Rights Reserved. */\n" +
                "\n" +
                "// DO NOT EDIT - this file was generated by QWT. \n" + 
                "\n" +
                "package foo.bar;\n" +
                "\n" +
                "/**\n" +
                " * desc\n" +
                " * @augment foo.bar.Baz\n" +
                " */\n" +
                "public interface Baz {\n" +
                "    int getP();\n" +
                "\n" +
                "    void setP(int p);\n" +
                "}\n",
                clazz.toJava());
    }
}
