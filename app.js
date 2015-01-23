
Ext.define('Wizard', {
	
	alias: 'widget.wizard',
	extend: 'Ext.tab.Panel',
	requires:['Ext.util.*'],
	tbar: [
		{
			xtype: 'button',
			text: 'Save',
			handler: function(){
				var me = this.up('wizard');
				personnel = me.getFormData();
				Ext.Msg.alert('Data Captured: ', personnel);
				//me.getChildren();
			}
		},
		{
			xtype: 'button',
			text: 'Load',
			handler: function(){
				var me = this.up('wizard');
				me.loadFormData(personnelData);
			}
		}
		
	],
	
	initComponent: function(){	
			//model for training management
		Ext.define('gridTrainingmanagement', {
			extend: 'Ext.data.Model',
			fields: [
				'tmInvitecode', 'tmTraininginstitution', 'tmTrainingcourse', 'tmStartdate', 'tmEnddate','tmVenue','tmLocal'
			]
		}); 		
			//model for training institution
			Ext.define('gridlibTraininginstitution', {
			extend: 'Ext.data.Model',
			fields: [
				'tiInstitutioncode', 'tiTraininginstitution','tiAddress','tiContactperson', 'tiTelno', 'tiFaxno','tiEmailadd'
			]
		}); 
			//model for training course
			Ext.define('gridlibTrainingcourse', {
			extend: 'Ext.data.Model',
			fields: [
				'tcCoursecode', 'tcCousename', 'tcDescription', 'tcPrerequisite'
			]
		}); 
			
		this.callParent(arguments);	
	},
	autoScroll: true,
	tabPosition: 'left',
	tabRotation: 0,

	tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

	defaults: {
		tabConfig: {
			width: 200,
			height: 60
		},
		padding: '20 0 20 20',
		overflowY: 'scroll'
	},
	rowEditing: function(){
		return Ext.create('Ext.grid.plugin.RowEditing', {
			pluginId: 'rowEditingPlugin',
			clicksToMoveEditor: 1,
			autoCancel: false
		});
	},
	items: [				
		{
			title: 'Maintenance',
			items: [
				{
					autoScroll:true,
					xtype: 'grid',
					itemId: 'gridTrainingmanagement',
					collapsible: true,
					//collapsed: true,
					margin: '20 40 20 20',
				    title: 'Training Management',
					 store: {
						xtype: 'store',
					    fields:['tmInvitecode', 'tmTraininginstitution', 'tmTrainingcourse', 'tmStartdate', 'tmEnddate','tmVenue','tmLocal'],
					   data: { 
							items: [
								{tmInvitecode: '', tmTraininginstitution: '',tmTrainingcourse: '',tmStartdate: '',tmEnddate: '',tmVenue: '',tmLocal: ''},
							]     
					    }, 
					    proxy: {
					        type: 'memory',
					        reader: {
					            type: 'json',
					            rootProperty: 'items'
					        }
					    }
					}, 
								
					columns: [
				        { 
							header: '<center>Invite Code<\center>', 
								autoScroll:true,
								dataIndex: 'tmInvitecode', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5
								//emptyText: "No Record to Display"
							
						},
						{ 
							header: '<center>Training Institution</center>',
								dataIndex: 'tmTraininginstitution',
								flex:1,
								fixed:true, 
								menuDisabled:true, 
								sortable:false, 
								editor  : {						
									xtype:'combo', 
									store: new Ext.data.ArrayStore({
									fields: ['Training Institution'],
									data : 
										[                                         
										['Training1'],['Training2'], ['Training3']								   
									]
									}),
										displayField:'level',
										valueField: 'level',
										mode: 'local',
										typeAhead: false,
										triggerAction: 'all',
										lazyRender: true,
										emptyText: 'Training'
								}
						},
				        {
							header: '<center>Training Coure<\center>',
								dataIndex: 'ogtVenue', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,	
								flex: 1
						},
						{
							header: '<center>Start Date<\center>', 
							dataIndex: 'tmStartdate', 
							xtype: 'datecolumn', 
								editor: {
									xtype: 'datefield',
									allowBlank: false,
									format: 'm/d/Y',
									maxValue: Ext.Date.format(new Date(), 'm/d/Y')
								},
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
							
						},	
					 							{
							header: '<center>End Date<\center>', 
								dataIndex: 'tmSEnddate', 
								xtype: 'datecolumn', 
								editor: {
									xtype: 'datefield',
									allowBlank: false,
									format: 'm/d/Y',
									maxValue: Ext.Date.format(new Date(), 'm/d/Y')
								},
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
						},						 	
						{ 
								header: '<center>Venue</center>', 
								dataIndex: 'tmVenue', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: 1
						},
						{ 
								header: '<center>Local</center>', 
								dataIndex: 'tmLocal', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5
						}
							
						
				    ],	
						buttons: [
						{
							text: 'add',
								handler: function() 
							{	
								var grid = this.up('grid');
								var store = grid.getStore();
								var rowEdit = grid.getPlugin('rowEditingPlugin');
								console.log(rowEdit);
								// Create a model instance
								var r = Ext.create('gridTrainingmanagement', {
								
								}); 
								
								store.add(r);
								rowEdit.startEdit(grid.getStore().getData().getCount()-1, 0);
							}
						},										
						{
							text: 'Delete',
							handler: function() 
							{
								var grid = this.up('grid');
								var store = grid.getStore();
								var rowEdit = grid.getPlugin('rowEditingPlugin');
								var sm = grid.getSelectionModel();
								rowEdit.cancelEdit();
								store.remove(sm.getSelection());
								if (store.getCount() > 0) {
									sm.select(0);
								}
							},
							disabled: false
						}										
					], 
					plugins: [
						Ext.create('Ext.grid.plugin.RowEditing', {
							pluginId: 'rowEditingPlugin',
							clicksToMoveEditor: 1,
							autoCancel: false
						})
					]
				},					
				{
					xtype: 'panel',
					title: 'Requirements',
					//layout: 'anchor',
					//collapsible: true,
					//collapsed: true,
					bodyPadding: '20 20 20 20',
					margin: '20 40 20 20',
					defaults: {
						width: '100%'
					},
					items: [
						
						{
							xtype: 'textfield',
							itemId:'txtage',
							fieldLabel: 'Age:',
							width: 200,
							labelWidth: 120,	
						},
						{
							xtype      : 'fieldcontainer',
							fieldLabel : 'Sex',
							defaultType: 'radiofield',
							defaults: {
								flex: 1
							},
							layout: 'hbox',
							items: [
								{
									boxLabel  : 'Male',
									name      : 'Sex',
									inputValue: 'Male',
									id        : 'radio1'
								}, {
									boxLabel  : 'Female',
									name      : 'Sex',
									inputValue: 'Female',
									id        : 'radio2'
								}, {
									boxLabel  : 'Both',
									name      : 'Sex',
									inputValue: 'Both',
									id        : 'radio3'
								}
							]
						},
						{
							xtype      : 'fieldcontainer',
							fieldLabel : 'Civil Status',
							defaultType: 'radiofield',
							defaults: {
								flex: 1
							},
							layout: 'hbox',
							items: [
								{
									boxLabel  : 'Single',
									name      : 'Civil Status',
									inputValue: 'Single',
									id        : 'cs1'
								}, {
									boxLabel  : 'Married',
									name      : 'Civil Status',
									inputValue: 'Married',
									id        : 'cs2'
								}, {
									boxLabel  : 'Both',
									name      : 'Civil Status',
									inputValue: 'Both',
									id        : 'cs3'
								}
							]
						},
						{
							xtype: 'textfield',
							itemId:'txtyis',
							fieldLabel: 'Years In Service (At Least):',
							width: 200,
							labelWidth: 120		
						},
						{
							xtype: 'fieldcontainer',
							fieldLabel: 'Permanent',
							defaultType: 'checkboxfield',
							items: [
								{
									name      : 'Permanent',
									inputValue: '1',
									id        : 'checkbox1'
								}
							]
						},
						{
							xtype: 'combo',
							itemId:'cbocourseprerequisite',
							fieldLabel:'Course Pre-requisite (if any):',
							width: 600,
							labelWidth: 120,								
						},
						{
							xtype: 'fieldcontainer',
							layout: 'hbox',
							items: [
										{						
											xtype: 'combo',
											itemId:'cboeducdegree',
											fieldLabel:'Education:',
											emptyText: 'Degree',
											width: 400,
											labelWidth: 120,
											flex:1					
										},
										{
											xtype: 'combo',
											itemId:'cboeduccourse',	
											emptyText: 'Course',
											width: 400,
											labelWidth: 120,
											flex:1
										}
							]
						},
						
					]
					
				}
			]
		},
		{
			title: 'Report',
				items: [
		
				{
					autoScroll:true,
					xtype: 'grid',
					itemId: 'gridogt',
					collapsible: true,
					//collapsed: true,
					margin: '20 40 20 20',
				    title: 'On-going Training',
					 store: {
						xtype: 'store',
					    fields:['ogtCourse', 'ogtInstitution', 'ogtVenue', 'ogtDate', 'ogtAttendees'],
					   data: { 
							items: [
								{ogtCourse: '', ogtInstitution: '',ogtVenue: '',ogtDate: '',ogtAttendees: ''},
							]     
					    }, 
					    proxy: {
					        type: 'memory',
					        reader: {
					            type: 'json',
					            rootProperty: 'items'
					        }
					    }
					}, 
								
					columns: [
				        { 
							header: '<center>Course<\center>', 
								autoScroll:true,
								dataIndex: 'ogtCourse', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5,
								//emptyText: "No Record to Display"
							
						},
				        { 
							header: '<center>Training <br> Institution<\center>', 
								dataIndex: 'ogtInstitution', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: 1.5 
						},
				        {
							header: '<center>Venue<\center>',
								dataIndex: 'ogtVenue', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,	
								flex: 1.5
						},
						{
							header: '<center>Date<\center>', 
								dataIndex: 'ogtDate', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5
						},						 	
						{ 
								header: '<center>No. of Attendees</center>', 
								dataIndex: 'ogtAttendees', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5
						}
							
						
				    ],				
				},
				{
					autoScroll:true,
					xtype: 'grid',
					itemId: 'gridti',
					collapsible: true,
					//collapsed: true,
					margin: '20 40 20 20',
				    title: 'Training Institution',
					 store: {
						xtype: 'store',
					    fields:['tiCourse', 'tiVenue', 'tiDate', 'tiAttendees'],
					   data: { 
							items: [
								{tiCourse: '',tiVenue: '',tiDate: '',tiAttendees: ''},
							]     
					    }, 
					    proxy: {
					        type: 'memory',
					        reader: {
					            type: 'json',
					            rootProperty: 'items'
					        }
					    }
					}, 
								
					columns: [
				        { 
							header: '<center>Course<\center>', 
								autoScroll:true,
								dataIndex: 'ogtCourse', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5,
								//emptyText: "No Record to Display"
							
						},
				        {
							header: '<center>Venue<\center>',
								dataIndex: 'ogtVenue', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,	
								flex: 1
						},
						{
							header: '<center>Date<\center>', 
								dataIndex: 'ogtDate', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5
						},						 	
						{ 
								header: '<center>No. of Attendees</center>', 
								dataIndex: 'ogtAttendees', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5
						}													
				    ],								 				
				}
			]
			
		},	
		{
			title: 'Query',
			items: [
				{
					xtype: 'panel',
					layout: 'hbox',
					bodyPadding: '20 20 20 20',
					margin: '20 40 20 20',
					defaults: {
						width: '100%'
					},
					items:[	
							{
								xtype: 'textfield',
								//fieldLabel: 'Search',
								width: 400,
								labelWidth:50,								
								itemId:'txtSearch',
							
							}, 					
							{
								xtype:'button',
								text: 'Search',
								width:150,
								handler: function(){
								
								}
							},																																				
					]						
				},
				{
					autoScroll:true,
					xtype: 'grid',
					itemId: 'gridProgress',
					collapsible: true,
					//collapsed: true,
					margin: '20 40 20 20',
				    title: 'Result',
					 store: {
						xtype: 'store',
					    fields:['ProgressCourse', 'ProgressInstitution', 'ProgressVenue', 'ProgressDate', 'ProgressAttendees'],
					   data: { 
							items: [
								{ProgressCourse: '', ProgressInstitution: '',ProgressVenue: '',ProgressDate: '',ProgressAttendees: ''},
							]     
					    }, 
					    proxy: {
					        type: 'memory',
					        reader: {
					            type: 'json',
					            rootProperty: 'items'
					        }
					    }
					}, 
								
					columns: [
				        { 
							header: '<center>Course<\center>', 
								autoScroll:true,
								dataIndex: 'ProgressCourse', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5,
								//emptyText: "No Record to Display"
							
						},
				        { 
							header: '<center>Training <br> Institution<\center>', 
								dataIndex: 'ProgressInstitution', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: 1.5 
						},
				        {
							header: '<center>Venue<\center>',
								dataIndex: 'ProgressVenue', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,	
								flex: 1.5
						},
						{
							header: '<center>Date<\center>', 
								dataIndex: 'ProgressDate', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5
						},						 	
						{ 
								header: '<center>No. of Attendees</center>', 
								dataIndex: 'ProgressAttendees', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5
						}													
				    ],									
				},
			]
		},
		{
				title: 'Library',
			items: [
				{
					autoScroll:true,
					xtype: 'grid',
					itemId: 'gridlibTraininginstitution',
					collapsible: true,
					//collapsed: true,
					margin: '20 40 20 20',
				    title: 'Training Institution',
					 store: {
						xtype: 'store',
					    fields:['tiInstitutioncode', 'tiTraininginstitution','tiAddress','tiContactperson', 'tiTelno', 'tiFaxno','tiEmailadd'],
					   data: { 
							items: [
								{tiInstitutioncode: '', tiTraininginstitution: '',tiAddress: '',tiContactperson: '',tiTelno: '',tiFaxno: '',tiEmailadd: ''},
							]     
					    }, 
					    proxy: {
					        type: 'memory',
					        reader: {
					            type: 'json',
					            rootProperty: 'items'
					        }
					    }
					}, 
								
					columns: [
				        { 
							header: '<center>Institution<br>Code<\center>', 
								autoScroll:true,
								dataIndex: 'tiInstitutioncode', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5
								//emptyText: "No Record to Display"
							
						},
						{ 
							header: '<center>Training Institution</center>',
								dataIndex: 'tiTraininginstitution',
								flex:1,
								fixed:true, 
								menuDisabled:true, 
								sortable:false, 
								editor  : {						
									xtype:'combo', 
									store: new Ext.data.ArrayStore({
									fields: ['Training Institution'],
									data : 
										[                                         
										['Training1'],['Training2'], ['Training3']								   
									]
									}),
										displayField:'level',
										valueField: 'level',
										mode: 'local',
										typeAhead: false,
										triggerAction: 'all',
										lazyRender: true,
										emptyText: 'Training'
								}
						},
				        {
							header: '<center>Address<\center>',
								dataIndex: 'tiAddress', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,	
								flex: 1
						},
						{
							header: '<center>Contact Person<\center>',
								dataIndex: 'tiContactperson', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,	
								flex: 1
						},						
						{ 
								header: '<center>Telephone No</center>', 
								dataIndex: 'tiTelno', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .9
						},
						{ 
								header: '<center>Fax No</center>', 
								dataIndex: 'tiFaxno', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5
						},
						{ 
								header: '<center>Email Address</center>', 
								dataIndex: 'tiEmailadd', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: 1
						}
							
						
				    ],	
						buttons: [
						{
							text: 'add',
								handler: function() 
							{	
								var grid = this.up('grid');
								var store = grid.getStore();
								var rowEdit = grid.getPlugin('rowEditingPlugin');
								console.log(rowEdit);
								// Create a model instance
								var r = Ext.create('gridlibTraininginstitution', {
								
								}); 
								
								store.add(r);
								rowEdit.startEdit(grid.getStore().getData().getCount()-1, 0);
							}
						},									
						{
							text: 'Delete',
							handler: function() 
							{
								var grid = this.up('grid');
								var store = grid.getStore();
								var rowEdit = grid.getPlugin('rowEditingPlugin');
								var sm = grid.getSelectionModel();
								rowEdit.cancelEdit();
								store.remove(sm.getSelection());
								if (store.getCount() > 0) {
									sm.select(0);
								}
							},
							disabled: false
						}									
					], 
					plugins: [
						Ext.create('Ext.grid.plugin.RowEditing', {
							pluginId: 'rowEditingPlugin',
							clicksToMoveEditor: 1,
							autoCancel: false
						})
					]
				},	
					
						{
					autoScroll:true,
					xtype: 'grid',
					itemId: 'gridlibTrainingcourse',
					//xxx
					collapsible: true,
					//collapsed: true,
					margin: '20 40 20 20',
				    title: 'Training Course',
					 store: {
						xtype: 'store',
					    fields:['tcCoursecode', 'tcCousename', 'tcDescription', 'tcPrerequisite'],
					   data: { 
							items: [
								{tcCoursecode: '', tcCousename: '',tcDescription: '',tcPrerequisite: ''},
							]     
					    }, 
					    proxy: {
					        type: 'memory',
					        reader: {
					            type: 'json',
					            rootProperty: 'items'
					        }
					    }
					}, 
								
					columns: [
				        { 
							header: '<center>Course Code<\center>', 
								autoScroll:true,
								dataIndex: 'tcCoursecode', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,
								flex: .5
								//emptyText: "No Record to Display"
							
						},				
				        {
							header: '<center>Course Name<\center>',
								dataIndex: 'tcCousename', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,	
								flex: 1
						},
						{
							header: '<center>Description<\center>',
								dataIndex: 'tcDescription', 
								editor: 'textfield', 
								fixed:true, 
								menuDisabled:true, 
								sortable:false,	
								flex: 1.5
						},						
						{ 
							header: '<center>Pre-requisite</center>',
								dataIndex: 'tcPrerequisite',
								flex:1,
								fixed:true, 
								menuDisabled:true, 
								sortable:false, 
								editor  : {						
									xtype:'combo', 
									store: new Ext.data.ArrayStore({
									fields: ['Pre-requisite'],
									data : 
										[                                         
										['Training1'],['Training2'], ['Training3']								   
									]
									}),
										displayField:'level',
										valueField: 'level',
										mode: 'local',
										typeAhead: false,
										triggerAction: 'all',
										lazyRender: true,
										//emptyText: 'Training'
								}
						},
											
				    ],	
						buttons: [
						{
							text: 'add',
								handler: function() 
							{	
								var grid = this.up('grid');
								var store = grid.getStore();
								var rowEdit = grid.getPlugin('rowEditingPlugin');
								console.log(rowEdit);
								// Create a model instance
								var r = Ext.create('gridlibTrainingcourse', {
								
								}); 
								
								store.add(r);
								rowEdit.startEdit(grid.getStore().getData().getCount()-1, 0);
							}
						},										
						{
							text: 'Delete',
							handler: function() 
							{
								var grid = this.up('grid');
								var store = grid.getStore();
								var rowEdit = grid.getPlugin('rowEditingPlugin');
								var sm = grid.getSelectionModel();
								rowEdit.cancelEdit();
								store.remove(sm.getSelection());
								if (store.getCount() > 0) {
									sm.select(0);
								}
							},
							disabled: false
						}																	
					], 
					plugins: [
						Ext.create('Ext.grid.plugin.RowEditing', {
							pluginId: 'rowEditingPlugin',
							clicksToMoveEditor: 1,
							autoCancel: false
						})
					]
				},
				
			]
		},						
	],				
});

Ext.onReady(function () {	
	Ext.create('Ext.container.Viewport', {
		id: 'viewport',
	    layout: 'fit',
		items: {
			xtype: 'wizard',
			title: 'Training Data Sheet'
		}		
	});	
});
