/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Til Schneider (til132)
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/* ************************************************************************

#module(apiviewer)

************************************************************************ */


qx.Class.define("apiviewer.ui.panels.PackagePanel",
{
  extend: apiviewer.ui.panels.InfoPanel,

  members :
  {
    getItemTypeHtml : function(node)
    {
      return apiviewer.ui.panels.InfoPanel.createItemLinkHtml(node.getName(), node, false, true);
    },

    getItemTitleHtml : function(node)
    {
      return node.getFullName();
    },


    getItemTextHtml : function(node, getDocNode, showDetails)
    {
      if (showDetails)
      {
        return (
          '<div class="class-description">' +
          apiviewer.ui.panels.InfoPanel.resolveLinkAttributes(node.getDescription(), node) +
          '</div>'
        );
      } else {
        return apiviewer.ui.panels.InfoPanel.createDescriptionHtml(node, node.getPackage(), showDetails);
      }
    },


    itemHasDetails : function(node, currentClassDocNode)
    {
      return apiviewer.ui.panels.InfoPanel.descriptionHasDetails(node);
    },


    /**
     * Updates an info panel.
     *
     * @param classViewer {apiviewer.ui.ClassViewer} parent class viewer widget.
     * @param currentClassDocNode {apiviewer.dao.Class} the currently displayed class
     */
    update : function(classViewer, currentClassDocNode)
    {
      this.setDocNode(currentClassDocNode);

      var nodeArr = currentClassDocNode.getPackages();

      if (nodeArr && nodeArr.length > 0) {
        this._sortItems(nodeArr);
      }

      this._displayNodes(nodeArr, currentClassDocNode);
    }

  }

});