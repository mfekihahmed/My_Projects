 progressive.addListener(
        "renderStart",
        function(e)
        {
          // Our event data is an object containing the 'state' object and
          // the number of elements to be rendered.
          var state = e.getData().state;
          var initialNum = e.getData().initial;

          // Center ourself
          var rootBounds = this.getRoot().getBounds();
          var progressive = e.getData().state.getProgressive();
          var progressiveBounds = progressive.getBounds();

          var left =
            Math.floor((rootBounds.width - progressiveBounds.width) / 2);
          var top =
            Math.floor((rootBounds.height - progressiveBounds.height) / 2);

          progressive.setLayoutProperties(
            {
              left : left < 0 ? 0 : left,
              top  : top < 0 ? 0 : top
            });

          // Save our context in the userData field of the state object.
          state.getUserData().context = this.context;

          // Also save the number of elements for our progress bar usage.
          state.getUserData().initialNum = initialNum;
        },
        this);

      progressive.addListener(
        "renderEnd",
        function(e)
        {
          // We don't need the Progressive any longer.  Arrange for it to be
          // destroyed.
          qx.event.Timer.once(
            function()
            {
              this.getLayoutParent().remove(this);
              this.dispose();
            },
            this, 0);
        });

