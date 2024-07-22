define([
	'jquery',
	'text!group/aut/std/tmpl/Ent.html',

	'group/aut/std/ctrl/EntHeader',
	'group/aut/std/ctrl/EntBtn',
	'group/aut/std/ctrl/EntTabs'

],
	function ($,
		Tmpl_Ent,

		CtrlEntHeader,
		CtrlEntBtn,
		CtrlEntTabs
	) {


		var CtrlEnt = function (header, content, footer, grpName) {
			var pr_divHeader = header;
			var pr_divContent = content;
			var pr_divFooter = footer;

			//------------------------------------------------------------------------------------
			var pr_lock_type = -1; //--const based on BO
			var pr_grpName = grpName;
			//------------------------------------------------------------------------------------
			var tmplName = App.template.names[pr_grpName];
			var tmplCtrl = App.template.controller;

			var svClass = App['const'].SV_CLASS;
			var svName = App['const'].SV_NAME;
			var sessId = App['const'].SESS_ID;
			var userId = App['const'].USER_ID;

			var fVar = App['const'].FUNCT_SCOPE;
			var fName = App['const'].FUNCT_NAME;
			var fParam = App['const'].FUNCT_PARAM;

			var self = this;
			//------------------------------------------------------------------------------------
			var pr_SERVICE_CLASS = "ServiceAutUser"; //to change by your need

			var pr_SV_GET = "SVGet";
			var pr_SV_NEW = "SVNew";
			var pr_SV_DEL = "SVDel";

			//			var pr_SV_MOD				= "SVMod"; 	//if not use lock

			var pr_SV_LCK_REQ = "SVLckReq";
			var pr_SV_LCK_SAV = "SVLckSav";
			var pr_SV_LCK_END = "SVLckEnd";
			var pr_SV_LCK_DEL = "SVLckDel";
			//------------------controllers------------------------------------------------------
			var pr_ctr_Main = null;
			var pr_ctr_List = null;
			var pr_ctr_Ent = null;
			var pr_ctr_EntBtn = null;
			var pr_ctr_EntHeader = null;
			var pr_ctr_EntTabs = null;

			//-----------------------------------------------------------------------------------
			var pr_obj = null;
			var pr_mode = null;
			var pr_lock = null;

			//--------------------APIs--------------------------------------//
			this.do_lc_init = function () {
				tmplName.ENT = "Ent";
				tmplCtrl.do_lc_put_tmpl(tmplName.ENT, Tmpl_Ent);


				//--------------------------------------------------------------------
				if (!App.controller[pr_grpName].EntBtn)
					App.controller[pr_grpName].EntBtn = new CtrlEntBtn(null, "#div_Ent_Btn", null, pr_grpName);
				if (!App.controller[pr_grpName].EntHeader)
					App.controller[pr_grpName].EntHeader = new CtrlEntHeader(null, "#div_Ent_Header", null, pr_grpName);
				if (!App.controller[pr_grpName].EntTabs)
					App.controller[pr_grpName].EntTabs = new CtrlEntTabs(null, "#div_Ent_Tabs", null, pr_grpName);

				App.controller[pr_grpName].EntBtn.do_lc_init();
				App.controller[pr_grpName].EntHeader.do_lc_init();
				App.controller[pr_grpName].EntTabs.do_lc_init();

				//--------------------------------------------------------------------
				pr_ctr_Main = App.controller[pr_grpName].Main;
				pr_ctr_List = App.controller[pr_grpName].List;

				pr_ctr_Ent = App.controller[pr_grpName].Ent;
				pr_ctr_EntHeader = App.controller[pr_grpName].EntHeader;
				pr_ctr_EntBtn = App.controller[pr_grpName].EntBtn;
				pr_ctr_EntTabs = App.controller[pr_grpName].EntTabs;

			}

			//---------show-----------------------------------------------------------------------------
			this.do_lc_show = function (obj, mode) {
				try {
					pr_obj = obj ? obj : {};
					pr_mode = (!obj || !mode) ? App['const'].MODE_INIT : mode;

					if (pr_mode == App['const'].MODE_INIT) {
						$(pr_divContent).html(tmplCtrl.req_lc_compile_tmpl(tmplName.ENT, { mode: App['const'].MODE_INIT }));
						pr_ctr_EntBtn.do_lc_show(pr_obj, App['const'].MODE_INIT);
						return;
					}

					$(pr_divContent).html(tmplCtrl.req_lc_compile_tmpl(tmplName.ENT, pr_obj));

					pr_ctr_EntHeader.do_lc_show(pr_obj, mode);
					pr_ctr_EntBtn.do_lc_show(pr_obj, mode);
					pr_ctr_EntTabs.do_lc_show(pr_obj, mode);

					//---------------------------------------------------------------------------------------
					do_gl_enhance_within($(pr_divContent), {
						obj: pr_obj
					});

					if (mode == App['const'].MODE_NEW) {

					} else if (mode == App['const'].MODE_MOD) {
						do_gl_enable_edit($(pr_divContent));
					} else {
						do_gl_disable_edit($(pr_divContent));
					}

					//-------------------------------------------------------------
					App.controller.DBoard.DBoardMain.do_lc_bind_event_div_Minimize();
					App.controller.DBoard.DBoardMain.do_lc_prevent_winClosing(pr_mode);
					//-------------------------------------------------------------
					do_gl_apply_right($(pr_divContent));
				} catch (e) {
					console.log(e);
//					do_gl_exception_send(App.path.BASE_URL_API_PRIV, "aut.user", "Ent", "do_lc_show", e.toString());
				}
			}

			//---show after ajax request---------------------------
			var do_show_Obj = function (sharedJson, mode, oldObj, langOpt) {
				if (sharedJson[App['const'].SV_CODE] == App['const'].SV_CODE_API_YES) {
					pr_mode = mode;
					var object = sharedJson[App['const'].RES_DATA];
					if(object.cast) object.cast = JSON.parse(object.cast)
					console.log(object)
					if (!object) object = oldObj; //--use in case of  canceling the MOD
					self.do_lc_show(object, pr_mode);

				} else if (sharedJson[App['const'].SV_CODE] == App['const'].SV_CODE_API_ERROR) {
					do_gl_show_Notify_Msg_Error($.i18n('common_err_msg_save'));
					return;
				}
			}

			this.do_lc_show_ById = function (obj, mode, langOpt) {
				var ref = req_gl_Request_Content_Send(pr_SERVICE_CLASS, pr_SV_GET);
				ref.id = obj.id;
				ref["forced"] = true;

				var fSucces = [];
				fSucces.push(req_gl_funct(null, do_show_Obj, [mode, langOpt]));

				var fError = req_gl_funct(App, do_gl_show_Notify_Msg, [$.i18n("common_err_ajax"), 0]);

				App.network.do_lc_ajax(App.path.BASE_URL_API_PRIV, App.data["HttpSecuHeader"], ref, 100000, fSucces, fError);
			}

			//---------------------------------------------new object-------------------------------------------
			this.do_lc_new = function () {
				self.do_lc_show({}, App['const'].MODE_NEW);
			}

			//---------------------------------------------clone object-------------------------------------------
			this.do_lc_duplicate = function (obj) {
				var newObj = $.extend(true, {}, obj);
				newObj.id = null;

				self.do_lc_show(newObj, App['const'].MODE_NEW);
			}

			//---------del obj-----------------------------------------------------------------------------
			this.do_lc_delete = function (obj) {
				var ref = req_gl_Request_Content_Send(pr_SERVICE_CLASS, pr_SV_DEL);

				var lock = {};
				lock.objectType = pr_lock_type;  //integer
				lock.objectKey = obj.id; 		 //integer
				ref['lock'] = JSON.stringify(lock);
				ref["id"] = obj.id;

				var fSucces = [];
				fSucces.push(req_gl_funct(App, do_gl_show_Notify_Msg, [null, null, App['const'].MODE_DEL]));
				fSucces.push(req_gl_funct(null, do_show_Obj, [App['const'].MODE_INIT]));
				fSucces.push(req_gl_funct(null, do_refresh_list, [obj])); //refresh menu

				var fError = req_gl_funct(App, do_gl_show_Notify_Msg, [$.i18n("common_err_ajax"), 0]);

				App.network.do_lc_ajax(App.path.BASE_URL_API_PRIV, App.data["HttpSecuHeader"], ref, 100000, fSucces, fError);
			}


			//---------Lock-----------------------------------------------------------------------------
			this.do_lc_save = function (obj, mode) {	//save new object or save with lock		
				//to comeback on tab curent active
				//				do_gl_req_tab_active($(pr_divContent));
				if (!obj.files) obj.files = [];
				var data = req_gl_data({
					dataZoneDom: $(pr_divContent),
					//					dataZoneDom		: $( "#div_Ent_Tab_Roles_Main"),
					oldObject: { "files": obj.files },
					removeDeleted: true
				});

				data.data = req_reformat_data_send(data.data);


				//check data error
				if (data.hasError == true) {
					do_gl_show_Notify_Msg_Error($.i18n('common_err_data'));
					return false;
				}

				App.MsgboxController.do_lc_show({
					title: $.i18n("msgbox_save_title"),
					content: $.i18n("msgbox_save_cont"),
					width: window.innerWidth < 1024 ? "95%" : "40%",
					buttons: {
						SAVE_EXIT: {
							lab: $.i18n("common_btn_save_exit"),
							funct: function () {
								if (mode == App['const'].MODE_MOD) {
									do_send_mod_exit(data)
								} else if (mode == App['const'].MODE_NEW) {
									do_send_new_exit(data);
								}
							}
						},
						SAVE_CONTINUE: {
							lab: $.i18n("common_btn_save_continue"),
							funct: function () {
								if (mode == App['const'].MODE_MOD) {
									do_send_mod_continue(data)
								} else if (mode == App['const'].MODE_NEW) {
									do_send_new_continue(data);
								}
							}
						}
					}
				});
			}
			var do_remove_role_unchecked = function (data) {
				var auths = [];

				for (var e in data.auths) {
					var a = data.auths[e];
					if (a.chk == 1) auths.push(a);
				}

				data.auths = auths;
			}

			//-------------------------------------------New-------------------------------------------------------------
			var do_send_new_exit = function (data) {
				var ref = {};
				ref = req_gl_Request_Content_Send(pr_SERVICE_CLASS, pr_SV_NEW);
				ref["lock"] = 0;

				var fSucces = [];
				fSucces.push(req_gl_funct(App, do_gl_show_Notify_Msg, [null, null, App['const'].MODE_NEW]));
				fSucces.push(req_gl_funct(null, do_show_Obj, [App['const'].MODE_SEL]));
				fSucces.push(req_gl_funct(null, do_refresh_list, [data.data]));

				var fError = req_gl_funct(App, do_gl_show_Notify_Msg, [$.i18n("common_err_ajax"), 0]);

				data.do_lc_send_data(App.path.BASE_URL_API_PRIV, App.data["HttpSecuHeader"], ref, fSucces, fError, "obj");

			}

			var do_send_new_continue = function (data) {
				var ref = {};
				ref = req_gl_Request_Content_Send(pr_SERVICE_CLASS, pr_SV_NEW);
				ref["lock"] = 1;

				var fSucces = [];
				fSucces.push(req_gl_funct(App, do_gl_show_Notify_Msg, [null, null, App['const'].MODE_NEW]));
				fSucces.push(req_gl_funct(null, do_show_Obj, [App['const'].MODE_MOD]));
				fSucces.push(req_gl_funct(null, do_refresh_list, [data.data]));
				fSucces.push(req_gl_funct(null, do_lock_begin, []));

				var fError = req_gl_funct(App, do_gl_show_Notify_Msg, [$.i18n("common_err_ajax"), 0]);

				data.do_lc_send_data(App.path.BASE_URL_API_PRIV, App.data["HttpSecuHeader"], ref, fSucces, fError, "obj");
			}


			var do_send_mod_continue = function (data) {
				var ref = {};
				ref = req_gl_Request_Content_Send(pr_SERVICE_CLASS, pr_SV_LCK_SAV);
				ref['lock_id'] = pr_lock.id;

				var fSucces = [];
				fSucces.push(req_gl_funct(App, do_gl_show_Notify_Msg, [null, null, App['const'].MODE_MOD]));
				fSucces.push(req_gl_funct(null, do_show_Obj, [App['const'].MODE_MOD]));
				//				fSucces.push(req_gl_funct(null	, do_refresh_list				, []));

				var fError = req_gl_funct(App, do_gl_show_Notify_Msg, [$.i18n("common_err_ajax"), 0]);

				data.do_lc_send_data(App.path.BASE_URL_API_PRIV, App.data["HttpSecuHeader"], ref, fSucces, fError, "obj");
			}

			var do_send_mod_exit = function (data) {
				var ref = {};
				ref = req_gl_Request_Content_Send(pr_SERVICE_CLASS, pr_SV_LCK_END);
				ref['lock_id'] = pr_lock.id;

				var fSucces = [];
				fSucces.push(req_gl_funct(App, do_gl_show_Notify_Msg, [null, null, App['const'].MODE_MOD]));
				fSucces.push(req_gl_funct(null, do_show_Obj, [App['const'].MODE_SEL]));
				fSucces.push(req_gl_funct(null, do_refresh_list, [data.data]));

				var fError = req_gl_funct(App, do_gl_show_Notify_Msg, [$.i18n("common_err_ajax"), 0]);

				data.do_lc_send_data(App.path.BASE_URL_API_PRIV, App.data["HttpSecuHeader"], ref, fSucces, fError, "obj");
			}

			//-------------------------------------------------------------------------------------------------------------	
			var do_lock_begin = function (sharedJson, obj) {
				pr_lock = null;

				if (sharedJson[App['const'].SV_CODE] == App['const'].SV_CODE_API_YES) {
					pr_lock = sharedJson[App['const'].RES_DATA];
					pr_mode = App['const'].MODE_MOD;
					do_gl_req_tab_active($(pr_divContent));

					if (obj) {
						self.do_lc_show(obj, pr_mode);
					}

				} else if (sharedJson[App['const'].SV_CODE] == App['const'].SV_CODE_API_NO) {
					var uName = sharedJson[App['const'].RES_DATA].inf01;
					do_gl_show_Notify_Msg_Error($.i18n('lock_err_begin') + uName);
					//notify something if the lock is taken by other person
				} else {
					do_gl_show_Notify_Msg_Error($.i18n('lock_err_inconnu'));
				}
			}

			var do_lock_del = function (sharedJson, obj) {
				if (sharedJson[App['const'].SV_CODE] != App['const'].SV_CODE_API_YES) {
					//notify something
					do_gl_show_Notify_Msg_Error($.i18n('lock_err_inconnu'));
				}

				pr_lock = null;
				if (obj) {
					self.do_lc_show(obj, App['const'].MODE_SEL);
				}
			}

			//-------------------------------------------------------------------------------------------------------------		
			this.can_lc_have_lock = function () {
				if (this.pr_lock != null)
					App.MsgboxController.do_lc_show({
						title: $.i18n('lock_err_title'),
						content: $.i18n('lock_err_msg'),
						width: window.innerWidth < 1024 ? "95%" : "40%",
					});
				return this.pr_lock != null;
			}

			this.do_lc_Lock_Begin = function (obj) {
				var ref = req_gl_Request_Content_Send(pr_SERVICE_CLASS, pr_SV_LCK_REQ);

				ref.id = obj.id;

				var fSucces = [];
				fSucces.push(req_gl_funct(null, do_lock_begin, [obj]));

				var fError = req_gl_funct(App, do_gl_show_Notify_Msg, [$.i18n("common_err_ajax"), 0]);

				App.network.do_lc_ajax(App.path.BASE_URL_API_PRIV, App.data["HttpSecuHeader"], ref, 100000, fSucces, fError);
			}


			this.do_lc_Lock_Cancel = function (obj) {
				if (!pr_lock) {
					pr_mode = App['const'].MODE_INIT;
					do_lc_show({}, pr_mode);
					return;
				}

				var ref = req_gl_Request_Content_Send(pr_SERVICE_CLASS, pr_SV_LCK_DEL);

				ref['lock_id'] = pr_lock.id;
				var fSucces = [];
				fSucces.push(req_gl_funct(null, do_lock_del, []));
				fSucces.push(req_gl_funct(null, do_show_Obj, [App['const'].MODE_SEL, obj]));

				var fError = req_gl_funct(App, do_gl_show_Notify_Msg, [$.i18n("common_err_ajax"), 0]);

				App.network.do_lc_ajax(App.path.BASE_URL_API_PRIV, App.data["HttpSecuHeader"], ref, 100000, fSucces, fError);
			}


			//---------------------------------------------------------------------------------------------------
			var do_refresh_list = function (sharedJSon, obj) {
				if (sharedJSon[App['const'].SV_CODE] == App['const'].SV_CODE_API_YES) {
					//					pr_ctr_List.do_lc_show_byType(obj.typ00);
				}
			}

			const req_reformat_data_send = (obj)=>{
				let times = $.extend(true, [], App.data.TimeList);

				// haspass
				if (obj.pass01) {
					obj.pass01 = rq_gl_Crypto(obj.pass01);
				}
				
				if (obj.typs) {
					obj.typ01  = obj.typs.toString().substring(0,1);
					obj.typ02  = obj.typs.toString().substring(1,4);
				}

				if(times && times.length > 0)
					obj.times = JSON.stringify(times);

				if (obj.cats)
					obj.cats = obj.cats.filter(c=> c !== null).toString();

				//---remove all role not checked------------
				do_remove_role_unchecked(obj);

				obj.files = obj.files;
				if (!obj.files && obj.logo) obj.files = [];
				if (obj.files && obj.logo) obj.files.push(obj.logo);

				return obj;
			}




			//			var do_Enabled_Edit = function(){
			//				$(pr_divContent).find("input, select, textarea").removeAttr("disabled");
			//			}
		}
		return CtrlEnt;
	});