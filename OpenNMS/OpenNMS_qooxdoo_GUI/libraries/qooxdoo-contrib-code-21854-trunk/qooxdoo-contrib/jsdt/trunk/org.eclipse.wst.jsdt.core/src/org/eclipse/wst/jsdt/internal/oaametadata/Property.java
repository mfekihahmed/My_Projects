/*******************************************************************************
 * Copyright (c) 2005, 2008 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.wst.jsdt.internal.oaametadata;

public class Property extends DocumentedElement{

	public String name;
	public String type;
	public String usage;
	public boolean isField; 
	
	public boolean isStatic()
	{
		return IOAAMetaDataConstants.USAGE_STATIC.equals(usage);
	}

}
