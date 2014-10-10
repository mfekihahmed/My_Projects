/**
 * 
 */
qx.Class.define("ca.inocybe.ui.perspectives.DomainPerspective",
		{
			extend : qx.ui.container.Composite,
			construct : function() {

				this.base(arguments, new qx.ui.layout.Dock());
				var centerPane = new qx.ui.container.Composite(
						new qx.ui.layout.Dock());
				
				this.add(this.getCPanel(), {
					edge : "west"
				});
				this.add(centerPane, {
					edge : "center"
				});
			},

			members : {
		      _getSections: function() {
		         return [ 
		                  new ca.inocybe.ui.sections.OrgSection(),
		                  new ca.inocybe.ui.sections.EnginesSection(),
		                  new ca.inocybe.ui.sections.AdminSection()
                      ]
		      },
		      
				getCPanel: function() {
					var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(0));
					var group = new qx.ui.form.RadioGroup();
		         this._getSections().forEach(function(x) {
                  group.add(x);
                  container.add(x);
               });
		        	return container;
				}			
			}

		});