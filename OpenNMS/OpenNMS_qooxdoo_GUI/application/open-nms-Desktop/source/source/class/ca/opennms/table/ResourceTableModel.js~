qx.Class.define("ca.inocybe.table.ResourceTableModel",
{
  extend : qx.ui.table.model.Remote,

  members :
  {
     // overloaded - called whenever the table requests the row count
    _loadRowCount : function()
    {
      // Call the backend service (example) - using XmlHttp
      var url  = "/db/domain_ihaveanetwork_com/_design/resource_instances/_view/all";
      var req = new qx.io.remote.Request(url, "GET", "application/json");

      // Add listener
      req.addListener("completed", this._onRowCountCompleted, this);

      // send request
      req.send();
    },

    // Listener for request of "_loadRowCount" method
    _onRowCountCompleted : function(response)
    {
       var result = response.getContent();
       if (result != null)
       {
          // Apply it to the model - the method "_onRowCountLoaded" has to be called
          this._onRowCountLoaded(result);
       }
    },

    // overloaded - called whenever the table requests new data
    _loadRowData : function(firstRow, lastRow)
    {
       // Call the backend service (example) - using XmlHttp
       var baseUrl  = "http://localhost/services/getTableRowData.php";
       var parameters = "?from=" + firstRow + "&to=" + lastRow;
       var url = baseUrl + parameters;
       var req = new qx.io.remote.Request(url, "GET", "application/json");

       // Add listener
       req.addListener("completed", this._onLoadRowDataCompleted, this);

       // send request
       req.send();
    },

     // Listener for request of "_loadRowData" method
    _onLoadRowDataCompleted : function(response)
    {
        var result = response.getContent();
       if (result != null)
       {
          // Apply it to the model - the method "_onRowDataLoaded" has to be called
          this._onRowDataLoaded(result);
       }
    }
  }
});