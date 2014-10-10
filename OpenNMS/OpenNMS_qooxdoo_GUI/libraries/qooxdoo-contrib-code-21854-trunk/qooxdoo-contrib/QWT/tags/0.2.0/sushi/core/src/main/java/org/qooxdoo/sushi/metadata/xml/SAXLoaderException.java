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

package org.qooxdoo.sushi.metadata.xml;

import org.xml.sax.Locator;
import org.xml.sax.SAXParseException;

public class SAXLoaderException extends SAXParseException {
    public SAXLoaderException(String message, Locator locator) {
        super(message, locator);
    }
    public SAXLoaderException(String message, Locator locator, Throwable cause) {
        this(message, locator);
        initCause(cause);
    }
}
