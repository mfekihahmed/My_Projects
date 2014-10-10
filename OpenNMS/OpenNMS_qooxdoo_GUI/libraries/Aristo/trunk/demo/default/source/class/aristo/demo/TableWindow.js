qx.Class.define("aristo.demo.TableWindow",
{
  extend: qx.ui.window.Window,

  construct: function()
  {
    this.base(arguments);

  this.setCaption("Table");
    this._createControls();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    table: null,
    nextId: 0,

    _createControls: function()
    {
      var layout = new qx.ui.layout.VBox(0);
      this.setLayout(layout);

    this.add(this.createTable(), {flex: 1});

    this.addListenerOnce("appear", function(e)
      {
        this.center();
    }, this);
    },

    createTable : function()
    {
      // Create the initial data
      var rowData = this.createRandomRows(50);

      // table model
      var tableModel = this._tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "ID", "A number", "A date", "Boolean" ]);
      tableModel.setData(rowData);
      tableModel.setColumnEditable(1, true);
      tableModel.setColumnEditable(2, true);
      tableModel.setColumnSortable(3, false);

      // table
      var table = this.table = new qx.ui.table.Table(tableModel);

      table.set({
        width: 600,
        height: 400,
        showCellFocusIndicator: true
      });

      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);

      var tcm = table.getTableColumnModel();

      // Display a checkbox in column 3
      tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());

      // use a different header renderer
      tcm.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Icon("icon/16/apps/office-calendar.png", "A date"));

      return table;
    },

    createRandomRows : function(rowCount)
    {
      var rowData = [];
      var now = new Date().getTime();
      var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
      for (var row = 0; row < rowCount; row++) {
        var date = new Date(now + Math.random() * dateRange - dateRange / 2);
        rowData.push([ this.nextId++, Math.random() * 10000, date, (Math.random() > 0.5) ]);
      }
      return rowData;
    },

    createToolbar : function()
    {
      var bar = new qx.ui.toolbar.ToolBar();
      var button, part, checkBox;

      part = new qx.ui.toolbar.Part();
      bar.add(part);

      button = new qx.ui.toolbar.Button("Change row with ID 10", "icon/22/actions/edit-undo.png");
      button.addListener("execute", function(evt) {
        var rowData = this.createRandomRows(1);
        for (var i = 1; i < this._tableModel.getColumnCount(); i++) {
          this._tableModel.setValue(i, 10, rowData[0][i]);
        }
        this.info("Row 10 changed");
      }, this);
      part.add(button);

      button = new qx.ui.toolbar.Button("Add 10 rows", "icon/22/actions/list-add.png");
      button.addListener("execute", function(evt) {
        var rowData = this.createRandomRows(10);
        this._tableModel.addRows(rowData);
        this.info("10 rows added");
      }, this);
      part.add(button);

      button = new qx.ui.toolbar.Button("Remove 5 rows", "icon/22/actions/list-remove.png");
      button.addListener("execute", function(evt) {
        var rowCount = this._tableModel.getRowCount();
        this._tableModel.removeRows(rowCount-5, 5);
        this.info("5 rows removed");
      }, this);
      part.add(button);

      button = new qx.ui.toolbar.Button("Show selection", "icon/22/status/dialog-information.png");
      button.addListener("execute", function(evt)
      {
        var selection = [];
        table.getSelectionModel().iterateSelection(function(ind) {
          selection.push(ind + "");
        });
        this.showDialog("Selected rows:<br>" + selection.join(", "));
      }, this);
      part.add(button);


      part = new qx.ui.toolbar.Part();
      bar.add(part);

      var table = this._table;

      checkBox = new qx.ui.toolbar.CheckBox("Keep first row");
      checkBox.set({
        value: this.table.getKeepFirstVisibleRowComplete(),
        toolTip: new qx.ui.tooltip.ToolTip(
          "Whether the the first visible row should " +
          "be rendered completely when scrolling."
        )
      });
      checkBox.addListener("changeValue", function(evt) {
        this.table.setKeepFirstVisibleRowComplete(this.getValue());
      },
      checkBox);
      part.add(checkBox);

      checkBox = new qx.ui.toolbar.CheckBox("Change ID sort method");
      checkBox.set({
        value: this.table.getKeepFirstVisibleRowComplete(),
        toolTip: new qx.ui.tooltip.ToolTip("Demonstrate use of alternate sorting algorithm.")
      });
      checkBox.addListener("changeValue", function(evt)
      {
        if (evt.getData())
        {
          var ascending = function(row1, row2)
          {
            var obj1 = row1[arguments.callee.columnIndex];
            var obj2 = row2[arguments.callee.columnIndex];
            if (obj1 % 2 == 1 && obj2 % 2 == 0)
            {
              return 1;
            }
            if (obj2 % 2 == 1 && obj1 % 2 == 0)
            {
              return -1;
            }
            return (obj1 > obj2) ? 1 : ((obj1 == obj2) ? 0 : -1);
          };

          var descending = function(row1, row2)
          {
            var obj1 = row1[arguments.callee.columnIndex];
            var obj2 = row2[arguments.callee.columnIndex];
            if (obj1 % 2 == 1 && obj2 % 2 == 0)
            {
              return -1;
            }
            if (obj2 % 2 == 1 && obj1 % 2 == 0)
            {
              return 1;
            }
            return (obj1 < obj2) ? 1 : ((obj1 == obj2) ? 0 : -1);
          }

          table.getTableModel().setSortMethods(0, {
            ascending  : ascending,
            descending : descending
          });
        }
        else
        {
          table.getTableModel().setSortMethods(0, null);
        }
      }, checkBox);
      part.add(checkBox);

      return bar;
    }

  }
});