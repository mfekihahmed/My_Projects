<?xml version='1.0'?>
<!-- 

	QxTransformer
	Converts QXML to Javascript
	
	License: LGPL
	Autors: Siarhei Barysiuk <s.barysiuk@gmail.com>	
			Christian Boulanger <info@bibliograph.org>

	template for "qcl:configChangeListener" tag
	
 -->
<!-- xml entities -->
<!DOCTYPE stylesheet [
	<!ENTITY UPPERCASE 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'>
	<!ENTITY NUMBER "1234567890">
	<!ENTITY LOWERCASE 'abcdefghijklmnopqrstuvwxyz'>
	<!ENTITY UPPER_TO_LOWER " '&UPPERCASE;' , '&LOWERCASE;' ">
	<!ENTITY LOWER_TO_UPPER " '&LOWERCASE;' , '&UPPERCASE;' ">
	<!ENTITY CR '&#13;&#10;'>
	<!ENTITY CLASS_PREFIX 'Qx'>
	<!ENTITY PREFIX 'qx_'>
	<!ENTITY DEBUG 'yes'>

	<!ENTITY DEFAULT_ADD_TEMPLATE 'defaultAddWidgetHandler'>
	<!ENTITY EMPTY_WIDGET_HANDLER 'emptyWidgetHandler'>
	
	<!ENTITY MACRO_SRC_ATTRIBUTE 'src'>
	<!ENTITY MACRO_NAME_ATTRIBUTE 'name'>
	<!ENTITY MACRO_DEFINITION_TAG 'qxt:define-macro'>
	<!ENTITY MACRO_USAGE_TAG 'qxt:use-macro'>

	<!ENTITY INCLUDE_SRC_ATTRIBUTE 'src'>
]>

<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:qx="http://www.qxtransformer.org/qooxdoo"
	xmlns:qxti="http://www.qxtransformer.org/internal"
	xmlns:qxt="http://www.qxtransformer.org/extension"
	xmlns:exsl="http://exslt.org/common">

	<xsl:template match="qxti:configChangeListenerContentWidgetHandler">
	
		<xsl:param name="widget"/>
		<xsl:param name="expandedDocument" />
		
		<xsl:text>&CR;</xsl:text>
		<xsl:text>qcl.config.Manager.getInstance().addConfigChangeEventListener("</xsl:text>
		
		<!-- keyname, replace namespace if given -->
		<xsl:variable name="keyName">
			<xsl:choose>
				<xsl:when test="exsl:object-type($expandedDocument)='node-set' and starts-with($widget/@key,'$namespace')">
					<xsl:value-of select="concat($expandedDocument//qx:application[1]/@namespace,substring($widget/@key,11))"/>
				</xsl:when>
				<xsl:otherwise>
						<xsl:value-of select="$widget/@key"/>
				</xsl:otherwise>		
		</xsl:choose>
		</xsl:variable>
		<xsl:value-of select="$keyName"/>
		
		<xsl:choose>
			<!-- event delegation -->
			<xsl:when test="$widget/@delegate">
				<xsl:text>",this.</xsl:text>
				<xsl:value-of select="$widget/@delegate"/>
				<xsl:text>,</xsl:text>
				<xsl:call-template name="parentName">
					<xsl:with-param name="widget" select="$widget"/>
				</xsl:call-template>
				<xsl:text>);&CR;</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<!-- message handler code -->
				<xsl:text>",function(</xsl:text>
				<xsl:choose>
					<xsl:when test="$widget/@args">
						<xsl:value-of select="$widget/@args"/>
					</xsl:when>
					<xsl:otherwise>event</xsl:otherwise>
				</xsl:choose>
				<xsl:text>){&CR;</xsl:text>
				<xsl:choose>
					<xsl:when test="'&DEBUG;'='yes'">
						<xsl:value-of select="$widget" disable-output-escaping="yes"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="normalize-space($widget)" disable-output-escaping="yes"/>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:text>&CR;},</xsl:text>
				<xsl:call-template name="parentName">
					<xsl:with-param name="widget" select="$widget"/>
				</xsl:call-template>
				<xsl:text>);&CR;</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

</xsl:stylesheet>