package com.hnv.api.service.priv.job;


import java.util.Date;

import java.util.HashSet;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import com.hnv.api.def.DefAPI;
import com.hnv.api.def.DefDB;
import com.hnv.api.def.DefJS;
import com.hnv.api.def.DefTime;
import com.hnv.api.interf.IService;
import com.hnv.api.main.API;
import com.hnv.api.service.common.APIAuth;
import com.hnv.api.service.common.ResultPagination;
import com.hnv.api.service.main.ServiceAPILoginCheck;
import com.hnv.common.tool.ToolDBLock;
import com.hnv.common.tool.ToolData;
import com.hnv.common.tool.ToolDatatable;
import com.hnv.common.tool.ToolJSON;
import com.hnv.common.tool.ToolLogServer;
import com.hnv.common.util.CacheData;
import com.hnv.data.json.JSONArray;
import com.hnv.data.json.JSONObject;
import com.hnv.db.aut.TaAutAuthUser;
import com.hnv.db.aut.TaAutHistory;
import com.hnv.db.aut.TaAutUser;
import com.hnv.db.job.TaJobReport;
import com.hnv.db.job.vi.ViJobReportDyn;
//import com.hnv.db.mat.vi.TaJobReport;
import com.hnv.db.per.TaPerPerson;
import com.hnv.db.sys.TaSysLock;
import com.hnv.db.tpy.TaTpyDocument;
import com.hnv.def.DefDBExt;

/**
 * ----- ServiceNsoPost by H&V
 * ----- Copyright 2017------------
 */
public class ServiceJobReport implements IService {
	//--------------------------------Service Definition----------------------------------
	public static final String SV_MODULE 					= "EC_V3".toLowerCase();

	public static final String SV_CLASS 					= "ServiceJobReport".toLowerCase();	

	public static final String SV_GET 						= "SVGet".toLowerCase();	
	public static final String SV_LST_IN_IDS				= "SVLstInIds".toLowerCase();
	public static final String SV_LST 						= "SVLst".toLowerCase();
	public static final String SV_LST_DYN					= "SVLstDyn".toLowerCase(); 
	public static final String SV_LST_SEARCH				= "SVLstSearch".toLowerCase(); 

	public static final String SV_NEW 						= "SVNew".toLowerCase();	
	public static final String SV_MOD 						= "SVMod".toLowerCase();	
	public static final String SV_DEL 						= "SVDel".toLowerCase();
	
	public static final String SV_LCK_REQ 					= "SVLckReq".toLowerCase(); //req or refresh	
	public static final String SV_LCK_SAV 					= "SVLckSav".toLowerCase(); //save and continue
	public static final String SV_LCK_END 					= "SVLckEnd".toLowerCase();
	public static final String SV_LCK_DEL 					= "SVLckDel".toLowerCase();

	public static final String SV_LST_HISTORY_CONNECTION	= "SVLstHistoryConnection".toLowerCase(); 
	public static final String SV_UPDATE_STATUS 			= "SVUpdateStat".toLowerCase();
	public static final String SV_GET_FILE 					= "SVGetFile".toLowerCase();	
	public static final String SV_MOD_TRANSL				= "SVModTransl".toLowerCase();	

	public static final Integer	ENT_TYP						= DefDBExt.ID_TA_JOB_REPORT;
	//-----------------------------------------------------------------------------------------------
	//-------------------------Default Constructor - Required -------------------------------------
	public ServiceJobReport(){
		ToolLogServer.doLogInf("----" + SV_CLASS + " is loaded -----");
	}

	//-----------------------------------------------------------------------------------------------

	
	
	//-----------------------------------------------------------------------------------------------
	@Override
	public void doService(JSONObject json, HttpServletResponse response) throws Exception {
		String 		sv 		= API.reqSVFunctName(json);
		TaAutUser 	user	= (TaAutUser) json.get("userInfo");
		
		try {
			//---------------------------------------------------------------------------------

			if(sv.equals(SV_GET) 					&&  (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_GET, APIAuth.R_AUT_USER_GET)
													||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doGet(user,  json, response);
			} else if(sv.equals(SV_LST_IN_IDS)		&&  (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_GET, APIAuth.R_AUT_USER_GET)
													||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doLstInIds(user, json, response);
			} else if(sv.equals(SV_LST)				&&  (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_GET, APIAuth.R_AUT_USER_GET)
													||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doLst(user,  json, response);
			} else if(sv.equals(SV_LST_DYN)			&&  (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_GET, APIAuth.R_AUT_USER_GET)
													||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doLstDyn(user,  json, response);
			
			} else if(sv.equals(SV_LST_SEARCH)		&&  (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_GET, APIAuth.R_AUT_USER_GET)
													||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doLstSearch(user,  json, response);
				
			}else  if(sv.equals(SV_LST_HISTORY_CONNECTION)	&& (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_GET, APIAuth.R_AUT_USER_GET) 
															||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doLstHistoryConnection(user,  json, response);

			} else if(sv.equals(SV_UPDATE_STATUS)	&& (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_MOD, APIAuth.R_AUT_USER_MOD) 
													||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doUpdateStatus(user,  json, response);
			
			}  else if(sv.equals(SV_NEW)			&&  (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_NEW, APIAuth.R_AUT_USER_NEW) 
													|| 	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
	//			doNew(user, json, response);

			} else if(sv.equals(SV_MOD)				&&  (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_MOD, APIAuth.R_AUT_USER_MOD) 
													||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doMod(user, json, response);
			}else if(sv.equals(SV_LCK_REQ)			&&  (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_MOD, APIAuth.R_AUT_USER_MOD) 
													||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doLckReq(user, json, response);
			} else if(sv.equals(SV_LCK_SAV)			&&  (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_MOD, APIAuth.R_AUT_USER_MOD) 
													||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doLckSav(user, json, response);
			} else if(sv.equals(SV_LCK_END)			&&  (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_MOD, APIAuth.R_AUT_USER_MOD) 
													||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doLckEnd(user, json, response);
			} else if(sv.equals(SV_LCK_DEL)			&&  (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_MOD, APIAuth.R_AUT_USER_MOD) 
													||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doLckDel(user, json, response);

			} else  if(sv.equals(SV_DEL)			&&  (APIAuth.canAuthorizeWithOneRight(user, APIAuth.R_ADMIN, APIAuth.R_AUT_ALL_DEL, APIAuth.R_AUT_USER_DEL)
													||	APIAuth.canAuthorize(user, SV_CLASS, sv))) {
				doDel(user, json, response);		

			
			} else {
				API.doResponse(response, DefAPI.API_MSG_ERR_RIGHT);
			}
		} catch (Exception e) {
			API.doResponse(response, DefAPI.API_MSG_ERR_API);
			e.printStackTrace();
		}
	}
	//---------------------------------------------------------------------------------------------------------

	private static final int WORK_GET 	= 1;
	private static final int WORK_LST 	= 2;
	private static final int WORK_NEW 	= 3;
	private static final int WORK_MOD 	= 4;
	private static final int WORK_DEL 	= 5;
	private static final int WORK_UPL 	= 10; //upload

	private static boolean canWorkWithObj ( TaAutUser user, int typWork, Object...params){
		if (user.canBeSuperAdmin()) return true;
		
		switch(typWork){
		case WORK_GET : 
			//check something with params
			return true;
		case WORK_LST : 
			//check something with params
			return true;
		case WORK_NEW : 
			//check something with params
			return true;
		case WORK_MOD : 
			//check something with params
			return true;	
		case WORK_DEL : 
			if (params==null || params.length<=0) return false; 
//			TaAutUser post 	= (TaAutUser) params[0];
//			Integer   uId 	= post.reqInt(post, TaAutUser.ATT_I_AUT_USER_NEW);
//			if (uId!=null && uId.equals(user.reqUserId())) return true;
//			return false;
			
			return true;
		case WORK_UPL : 
			//check something with params
			return true;
		}
		return false;
	}
	//---------------------------------------------------------------------------------------------------------
	private static Set<String> filter = new HashSet<String>();
	static {
		filter.add(TaAutUser.class.getSimpleName()+"."+TaAutUser.ATT_T_PASS_01);
		filter.add(TaAutUser.class.getSimpleName()+"."+TaAutUser.ATT_T_PASS_02);
		filter.add(TaAutUser.class.getSimpleName()+"."+TaAutUser.ATT_T_PASS_03);
		
		filter.add(TaJobReport.class.getSimpleName()+"."+TaAutUser.ATT_T_PASS_01);
		filter.add(TaJobReport.class.getSimpleName()+"."+TaAutUser.ATT_T_PASS_02);
		filter.add(TaJobReport.class.getSimpleName()+"."+TaAutUser.ATT_T_PASS_03);
	}
	//---------------------------------------------------------------------------------------------------------
	private static void doGet(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception  {	
		//ToolLogServer.doLogDebug("--------- "+ SV_CLASS+ ".doGet --------------");

		Integer 			entId		= ToolData.reqInt	(json, "id"			, -1	);				
		Boolean				forced		= ToolData.reqBool	(json, "forced"		, true	);
//		Boolean				forManager	= ToolData.reqBool	(json, "forManager"	, false	);

		TaJobReport 			ent 		= reqGet(entId, forced);

		if (ent==null){
			API.doResponse(response, DefAPI.API_MSG_KO);
			return;
		}

		if (!canWorkWithObj(user, WORK_GET, ent)){
			API.doResponse(response, DefAPI.API_MSG_ERR_RIGHT);
			return;
		}

		API.doResponse(response, ToolJSON.reqJSonString(
				filter,
				DefJS.SESS_STAT		, 1, 
				DefJS.SV_CODE		, DefAPI.SV_CODE_API_YES,
				DefJS.RES_DATA		, ent 
				));
	}
	
	private static CacheData<TaJobReport> 		cache_entity= new CacheData<TaJobReport>		(500, DefTime.TIME_24_00_00_000 );
	public static TaJobReport reqGet(Integer entId, Boolean forced) throws Exception{
		String 			key		= entId+"";
		// attempts to retrieve the entity from the cache
		TaJobReport 		ent 	= cache_entity.reqData(key);	
		
		if (forced || ent == null) {
			ent 	= TaJobReport.DAO.reqEntityByRef(entId);
			if (ent!=null) {
				//---do something and put to cache
				cache_entity.reqPut(key, ent);
			}
		}else {				
			ToolLogServer.doLogInf("---reqNsoAreaGet use cache-----");
			cache_entity.reqCheckIfOld(key); //cache in 20 hour
		}

		//---do build something other of ent like details....
		if (ent!=null){		
			ent.doBuildDocuments(forced);
//			ent.doBuildAvatar	(forced);
//			ent.doBuildPerson	(forced);
			
//			ent.doBuilAuth		(forced, null);
//			ent.doBuilAuths		(forced);			
//			ent.doBuildManager	(forced);	
//			ent.doBuildSuperior	(forced);
//			ent.doBuildHistoryConnection(forced);
//			
//			ent.doHidePwd();
		}

		return ent;
	}
	//---------------------------------------------------------------------------------------------------------
	private static void doLstInIds(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception  {
		Set<Integer> 	ids     	= ToolData.reqSetInt 	(json, "ids" 		, null);
		Boolean			buildAvatar	= ToolData.reqBool		(json, "buildAvatar", null);
		
		if(ids == null || ids.size() <= 0) {
			API.doResponse(response,DefAPI.API_MSG_KO);
			return;
		}

		Criterion 			cri 	= Restrictions.in(TaJobReport.ATT_I_ID, ids);
		
		List<TaJobReport> 	list 	= TaJobReport.DAO.reqList(cri); //and other params if necessary
		
		if (list==null ){
			API.doResponse(response,DefAPI.API_MSG_KO);
			return;
		}
		
//		if(Boolean.TRUE.equals(buildAvatar)) {
//			TaJobReport.doBuildAvatar(list);
//		}

		API.doResponse(response, ToolJSON.reqJSonString(
				filter,
				DefJS.SESS_STAT		, 1, 
				DefJS.SV_CODE		, DefAPI.SV_CODE_API_YES,
				DefJS.RES_DATA		, list 
				));				
	}
	
	//---------------------------------------------------------------------------------------------------------
	private static void doLst(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception  {
		//ToolLogServer.doLogDebug("--------- "+ SV_CLASS+ ".doLst --------------");

		List<TaJobReport> 	list = reqLst(user, json); //and other params if necessary
		if (list==null ){
			API.doResponse(response,DefAPI.API_MSG_KO);
			return;
		}

		API.doResponse(response, ToolJSON.reqJSonString(		
				filter,
				DefJS.SESS_STAT		, 1, 
				DefJS.SV_CODE		, DefAPI.SV_CODE_API_YES,
				DefJS.RES_DATA		, list 
				));				
	}

	
	private static List<TaJobReport> reqLst(TaAutUser user, JSONObject json) throws Exception  {
		Integer 			nbLine      = ToolData.reqInt		(json, "nbLine" 	, 10);
		String 				searchkey	= ToolData.reqStr		(json, "searchkey"	, null);
		Set<Integer>		stat01		= ToolData.reqSetInt	(json, "stat01"		, null);
		Set<Integer>		typ01s		= ToolData.reqSetInt	(json, "typ01s"		, null);
		Integer				typ02		= ToolData.reqInt		(json, "typ02"		, null);
		Boolean				wAvatar		= ToolData.reqBool		(json, "wAvatar"	, false);
		
		Criterion 			cri			= reqRestrictionSearch(user, searchkey);
		List<TaJobReport>	list		= TaJobReport.DAO.reqList(0, nbLine, cri);

//		if (wAvatar) 		TaTpyDocument	.reqBuildAvatar(list, DefDBExt.ID_TA_AUT_USER, TaJobReport.ATT_O_AVATAR);
		return list;
	}

	//---------------------------------------------------------------------------------------------------------		
	private static Hashtable<String,Integer> mapCol = new Hashtable<String, Integer>(){
		{
			put("action"	, -1);
			put("id"		, 0 );
			put("login01"	, 1 );
			put("inf01"		, 2 );
			put("cost"		, 3 );	
			put("name01"	, 4 );
		}
	};
	private static void doLstDyn(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception {	
	    // Retrieves options for a data table request, including search keys.
		Object[]  			dataTableOption = ToolDatatable.reqDataTableOption (json, null);
		Set<String>			searchKey		= (Set<String>)dataTableOption[0];
		Set<Integer>		stat01			= ToolData.reqSetInt	(json, "stat01"	, null);
		Boolean				forced		= ToolData.reqBool	(json, "forced"		, true	);
		
//		if(typ01 == null && typ02== null && stats ==null) {
//			API.doResponse(response,DefAPI.API_MSG_KO);
//			return;
//		}
//		
//		if (!canWorkWithObj(user, WORK_LST, null, stats)){ //other param after objTyp...
//			API.doResponse(response,DefAPI.API_MSG_KO);
//			return;
//		}
		//-------------------------------------------------------------------
		Criterion 	cri 				= reqRestriction(user, searchKey, null, stat01);				

		List<TaJobReport> list 		= reqListDyn(dataTableOption, cri, forced);
		if (list==null ){
			API.doResponse(response,DefAPI.API_MSG_KO);
			return;
		} else {
//			for(TaAutUser u : list) {
//				p.doBuildUserLogin(true);
//			}
		}

//		Integer iTotalRecords 			= reqNbNsoPostListDyn().intValue();				
//		Integer iTotalDisplayRecords 	= reqNbNsoPostListDyn(cri).intValue();


		API.doResponse(response, ToolJSON.reqJSonString(		
				filter,
				DefJS.SESS_STAT				, 1, 
				DefJS.SV_CODE				, DefAPI.SV_CODE_API_YES,					
//				"iTotalRecords"				, iTotalRecords,
//				"iTotalDisplayRecords"		, iTotalDisplayRecords,
				"aaData"					, list
				));

	}
	
	private static void doLstSearch(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception {
		ResultPagination  	res = reqListSearch(user, json); //and other params if necessary
		
		if (res.reqList()==null ){
			API.doResponse(response,DefAPI.API_MSG_KO);
			return;
		}

		API.doResponse(response, ToolJSON.reqJSonString(
				DefJS.SESS_STAT				, 1, 
				DefJS.SV_CODE				, DefAPI.SV_CODE_API_YES, 
				DefJS.RES_DATA				, res));
	}
	
	public static ResultPagination reqListSearch(TaAutUser user, JSONObject json) throws Exception {
		String				searchKey		= ToolData.reqStr		(json, "searchKey"	, null);
		Integer 			begin			= ToolData.reqInt		(json, "begin"		, 0	);
		Integer 			number			= ToolData.reqInt		(json, "number"		, 10); 
		Integer 			total			= ToolData.reqInt		(json, "total"		, 0	);
		
		Set<Integer>		sta01			= ToolData.reqSetInt	(json, "sta01"		, null);
		Set<Integer>		typs			= ToolData.reqSetInt	(json, "typs"		, null);
		Boolean				buildInfo		= ToolData.reqBool		(json, "buildInfo"	, false);
		Boolean				hardLoad		= ToolData.reqBool		(json, "hardLoad"	, false);
		
		String 				keyWord 		= sta01.toString();
		ResultPagination 	rs 				= null;
		boolean				addCache		= true;
		
		if (!canWorkWithObj(user, WORK_LST, null, sta01)){ //other param after objTyp...
			return null;
		}
		
		if(sta01 == null || sta01.size() <= 0) {
			rs			= cacheEnt_rs.reqData(keyWord);
		} else {
			addCache = false;
		}
		
		//-------------------------------------------------------------------
		if(rs == null || hardLoad) {
			Criterion 	cri 				= reqRestrictionSearch(user, searchKey);				

			List<TaJobReport> list 		= TaJobReport.DAO.reqList(begin, number);
			
//			TaJobReport.doBuildAvatar(list);
//			if(buildInfo) {
//				TaJobReport.doBuildPer(list);
//			}
			
			if (total == 0 ) {
				total						= TaJobReport.DAO.reqCount().intValue();
			}
			rs								= new ResultPagination(list, total, begin, number);
			
			if (addCache) cacheEnt_rs.reqPut(keyWord, rs);
		} else {
			ToolLogServer.doLogInf("---reqListSearch use cache-----");
			cacheEnt_rs.reqCheckIfOld(keyWord); //cache in 2 hour
		}

		return rs;
	}
	
	private static Criterion reqRestrictionSearch(TaAutUser user,  String searchKey) {
		if (user.canBeSuperAdmin()) {
			return Restrictions.gt(TaJobReport.ATT_I_ID, 0);
		}
		
		Criterion cri = Restrictions.eq(TaJobReport.ATT_I_PER_MANAGER, user.reqPerManagerId());
		
		if (searchKey != null) {
			searchKey = '%' + searchKey + '%';
				cri = Restrictions.and(	cri, Restrictions.or(
						Restrictions.ilike(TaJobReport.ATT_T_NAME_01, searchKey))
				);
		}
		
		return cri;
	}

	private static Criterion reqRestriction(TaAutUser user,  Set<String> searchKey, Integer manId, Set<Integer> stat01 ) throws Exception {	
		//--Pre-Check condition---------------------------------------------------
		if (stat01 == null){
			stat01 = new HashSet<>() ; 
			stat01.add(1);
		}
				
		Criterion cri = Restrictions.in(TaJobReport.COL_I_STATUS, stat01);
		
//		if(typ01 != null) {
//			cri = Restrictions.and(	cri, Restrictions.eq(ViMatMaterial.ATT_I_TYPE_01 , typ01));
//			
////			if(typ01 == TaJobReport.TYPE_01_AGENT) {
////				cri = Restrictions.and(	cri, Restrictions.eq(TaJobReport.ATT_I_TYPE_02 , typ02));
////			}
//		}

		if (searchKey != null) {
			for (String s : searchKey) {
			    cri = Restrictions.and(cri, Restrictions.or(
			  //  	Restrictions.ilike(TaJobReport.ATT_I_ID, '%' + s + '%'),
			        Restrictions.ilike(TaJobReport.ATT_T_INFO_01, '%' + s + '%'),
			        Restrictions.ilike(TaJobReport.ATT_T_INFO_02, '%' + s + '%')
			    ));
			}

		}
		
//		if (manId==null && !user.canBeSuperAdmin()) manId = user.reqPerManagerId();
//		if (manId!=null) cri = Restrictions.and(cri, Restrictions.eq(ViMatMaterial.ATT_I_PER_MANAGER, manId));
		return cri;
	}

	private static List<TaJobReport> reqListDyn(Object[] dataTableOption,	Criterion 	cri,Boolean forced) throws Exception {		
		int begin 		= (int)	dataTableOption[1];
		int number 		= (int)	dataTableOption[2]; 
		int sortCol 	= (int)	dataTableOption[3]; 
		int sortTyp 	= (int)	dataTableOption[4];	

		List<TaJobReport> list 	= null;		

		Order 	order 	= null;			
		String 	colName = null;

		switch(sortCol){
		case 0: colName = TaJobReport.ATT_I_ID; break;		
		case 1: colName = TaJobReport.ATT_T_INFO_01; break;	
		case 2: colName = TaJobReport.ATT_T_INFO_02; break;		
		}

		if (colName!=null){
			switch(sortTyp){
			case 0: order = Order.asc (colName); break;
			case 1: order = Order.desc(colName); break;								
			}
		}

		if (order==null)
			list	= TaJobReport.DAO.reqList(begin, number,cri);
		else
			list	= TaJobReport.DAO.reqList(begin, number, order,cri);
		
		if (list!=null){		
			for(TaJobReport item : list) {
				item.doBuildDocuments(forced);
			}
		}
		return list;
	}
	
	private static Number reqNbNsoPostListDyn() throws Exception {						
		return TaJobReport.DAO.reqCount();		
	}
	
	private static Number reqNbNsoPostListDyn(Criterion cri) throws Exception {			
		return TaJobReport.DAO.reqCount(cri);
	}

	//---------------------------------------------------------------------------------------------------------
	private static void doNew (TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception  {
		TaJobReport 			ent		= reqNew		(user, json);
		if (ent==null){
			API.doResponse(response, ToolJSON.reqJSonString(
					DefJS.SESS_STAT		, 1, 
					DefJS.SV_CODE		, DefAPI.SV_CODE_API_NO					
					));
			return;
		}

		TaSysLock 	lock 	= ToolDBLock.reqLock (json, "lock", DefDB.DB_LOCK_NEW, ENT_TYP, (Integer)ent.req(TaAutUser.ATT_I_ID), user.reqId(), user.reqStr(TaAutUser.ATT_T_LOGIN_01), null);
		API.doResponse(response, ToolJSON.reqJSonString(		//filter,
				DefJS.SESS_STAT		, 1, 
				DefJS.SV_CODE		, DefAPI.SV_CODE_API_YES,
				DefJS.RES_DATA		, ent,
				"lock"				, lock
				));
	}

	private static TaJobReport reqNew(TaAutUser user,  JSONObject json) throws Exception {
		Integer			userId		= user.reqId();
		Integer			manId		= user.reqPerManagerId();
		JSONObject		obj			= ToolData.reqJson(json, "obj", null);

		//--------------------------------------------------------------------------------------------
		Map<String, Object> attrUsr = API.reqMapParamsByClass(obj	, TaJobReport.class);
		
		//----Test------------------------------------------------------------------------------------
		
		
		//----set value------------------------------------------------------------------------------------
		attrUsr.put(TaJobReport.ATT_I_STATUS		, 1);
//		attrUsr.put(TaJobReport.ATT_D_DATE_01		, new Date());
//		attrUsr.put(TaJobReport.ATT_D_DATE_02		, null);
//		attrUsr.put(TaJobReport.ATT_I_AUT_USER_01	, userId);
		
		TaJobReport ent = new TaJobReport(attrUsr);	
		
		TaJobReport.DAO.doPersist(ent);
		int 		entId		= ent.reqId();
		
		JSONArray	docs 		= (JSONArray) obj.get("files");
		ent.reqSet(TaJobReport.ATT_O_DOCUMENTS, TaTpyDocument.reqListCheckJob(DefAPI.SV_MODE_NEW, ent, ENT_TYP, entId, docs));
		return ent;
	}
	
	//---------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------
	private static void doMod(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception  {
		//ToolLogServer.doLogDebug("--------- "+ SV_CLASS+ ".doMod --------------");

		TaJobReport  		ent	 	=  reqMod(user, json, false); 								
		if (ent==null){
			API.doResponse(response,DefAPI.API_MSG_KO);
		} else {
			API.doResponse(response, ToolJSON.reqJSonString(
					DefJS.SESS_STAT		, 1, 
					DefJS.SV_CODE		, DefAPI.SV_CODE_API_YES,
					DefJS.RES_DATA		, ent
					));	
		}		
	}

	private static TaJobReport reqMod(TaAutUser user,  JSONObject json, boolean wAuths) throws Exception {
		// Extract a nested JSONObject from the input json object using the key "obj".
	    // If "obj" is not found, return null.
		JSONObject			obj		= ToolData.reqJson 	(json	, "obj"	, null);
		int 				entId 	= ToolData.reqInt	(obj	, "id"	, -1);
		TaJobReport 			ent 	= TaJobReport.DAO.reqEntityByRef(entId);
		if (ent==null){
			return null;
		}
	    // Check if the user has the right permissions to work with the object (ent).
		if (!canWorkWithObj(user, WORK_MOD, ent)){ //other param after obj...
			return null;
		}
		Map<String, Object> attr 	= API.reqMapParamsByClass(obj, TaJobReport.class);
		
		// Remove specific attributes from the map to prevent modification of these fields.
		attr.remove(TaJobReport.ATT_I_ID);
		attr.remove(TaJobReport.ATT_D_DATE_01);
		attr.remove(TaJobReport.ATT_I_AUT_USER_01);

		if (!user.canBeSuperAdmin()) {
			attr.remove(TaJobReport.ATT_I_PER_MANAGER);
		}
		attr.put(TaJobReport.ATT_D_DATE_02		, new Date());
		attr.put(TaJobReport.ATT_I_AUT_USER_02	, user.reqId());
		String pass = (String) attr.get(TaAutUser.ATT_T_PASS_01);
		
		if (pass==null|| pass.length()==0) attr.remove(TaAutUser.ATT_T_PASS_01);
	    // Merge the updated attributes into the existing entity in the database.
		TaJobReport.DAO.doMerge(ent, attr);	
		 // Update the cache with the modified entity.
		cache_entity.reqPut(entId+"", ent);
		
		JSONArray	docs		= (JSONArray) obj.get("files");	
		ent.reqSet(TaJobReport.ATT_O_DOCUMENTS, TaTpyDocument.reqListCheckJob(DefAPI.SV_MODE_MOD, ent, ENT_TYP, entId, docs));
		return ent;
	}


	//---------------------------------------------------------------------------------------------------------
	private static void doDel(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception  {
		//ToolLogServer.doLogDebug("--------- "+ SV_CLASS+ ".doDel --------------");
		
		int				entId 	= ToolData.reqInt(json, "id", null);
		TaSysLock 		lock 	= ToolDBLock.reqLock(ENT_TYP, entId, user.reqId(), user.reqStr(TaAutUser.ATT_T_LOGIN_01), null);
		if (lock==null || lock.reqStatus() == 0){
			API.doResponse(response, ToolJSON.reqJSonString(						
					DefJS.SESS_STAT		, 1, 
					DefJS.SV_CODE		, DefAPI.SV_CODE_API_NO,
					DefJS.RES_DATA		, lock
					));	
			return;
		}

		if (!canDel(user, json)){
			API.doResponse(response,DefAPI.API_MSG_KO);
		} else {
			API.doResponse(response, ToolJSON.reqJSonString(DefJS.SESS_STAT, 1, DefJS.SV_CODE, DefAPI.SV_CODE_API_YES));
		}
		ToolDBLock.canDeleteLock(lock);
	}

	private static boolean canDel(TaAutUser user,  JSONObject json) throws Exception {
		Integer 	entId	= ToolData.reqInt	(json, "id", null	);
		  // Retrieve a TaMatMaterial entity from the database using the entId.
		TaJobReport  	ent	 	= TaJobReport.DAO.reqEntityByRef(entId);
		if (ent==null){
			return false;
		}
		Integer stat = ent.reqInt(TaJobReport.ATT_I_STATUS);
		// STAT_DELETED =10
		if (stat.equals(TaAutUser.STAT_DELETED)) {
			// Check if the user has the right permissions to work with the object (ent) for deletion.
	        // If not, return false.
			if (!canWorkWithObj(user, WORK_DEL, ent)){ //other param after ent...
				return false;
			}	
//			Session sessSub 	= TaTpyDocument	.DAO.reqSessionCurrent();
			Session sessMain 	= TaAutUser		.DAO.reqSessionCurrent();
			try {
	            // Delete the list of documents associated with the entity type and ID in the main session.
				TaTpyDocument		.doListDel	(sessMain, ENT_TYP, entId);
//				TaTpyDocument		.doListDel(sessSub, entTyp, entId);
//				TaAutAuthUser	.doListDel	(sessMain, entId);
				TaJobReport.DAO		.doRemove 	(sessMain, ent);
				cache_entity.reqDel(entId+"");
				  // Commit the session changes.
				TaJobReport			.DAO.doSessionCommit(sessMain);
//				TaTpyDocument		.DAO.doSessionCommit(sessSub);
			}catch(Exception e){
				e.printStackTrace();
				  // Rollback the session changes if an exception occurs and print the stack trace.
				TaJobReport			.DAO.doSessionRollback(sessMain);
//				TaTpyDocument		.DAO.doSessionRollback(sessSub);
			}		
		} else {
			//Set status = -1
			ent.reqSet(TaJobReport.ATT_I_STATUS, TaJobReport.STAT_DELETED);
			TaJobReport.DAO.doMerge(ent);	
			cache_entity.reqPut(entId+"", ent);
		}
		return true;
	}

	//---------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------
	private void doLckReq(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception  {
		//ToolLogServer.doLogDebug("--------- "+ SV_CLASS+ ".doLckReq --------------");		

		Integer 		entId	= ToolData.reqInt	(json, "id", null);	
		TaSysLock 		lock 	= ToolDBLock.reqLock(ENT_TYP, entId, user.reqId(), user.reqStr(TaAutUser.ATT_T_LOGIN_01), null);
		if (lock==null || lock.reqStatus() == 0){
			API.doResponse(response, ToolJSON.reqJSonString(						
					DefJS.SESS_STAT		, 1, 
					DefJS.SV_CODE		, DefAPI.SV_CODE_API_NO,
					DefJS.RES_DATA		, lock
					));	
		}else{
			API.doResponse(response, ToolJSON.reqJSonString(						
					DefJS.SESS_STAT		, 1, 
					DefJS.SV_CODE		, DefAPI.SV_CODE_API_YES,
					DefJS.RES_DATA		, lock
					));	
		}			
	}
	private void doLckDel(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception  {
		//ToolLogServer.doLogDebug("--------- "+ SV_CLASS+ ".doLckDel --------------");

		boolean isDeleted = ToolDBLock.canDeleteLock(json);		
		if (isDeleted)
			API.doResponse(response, ToolJSON.reqJSonString(		
				DefJS.SESS_STAT		, 1, 
				DefJS.SV_CODE		, DefAPI.SV_CODE_API_YES
				));		
		else 
			API.doResponse(response, ToolJSON.reqJSonString(		
					DefJS.SESS_STAT		, 1, 
					DefJS.SV_CODE		, DefAPI.SV_CODE_API_NO
					));		

	}
	private void doLckSav(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception  {
		//ToolLogServer.doLogDebug("--------- "+ SV_CLASS+ ".doLckSav --------------");	
		boolean isLocked 	= ToolDBLock.canExistLock(json);
		if(!isLocked){
			API.doResponse(response, DefAPI.API_MSG_ERR_LOCK);
			return;
		}
		
		TaJobReport  		ent	 	=  reqMod(user, json, true); 								
		if (ent==null){
			API.doResponse(response,DefAPI.API_MSG_KO);
		} else {				
			API.doResponse(response, ToolJSON.reqJSonString(
					DefJS.SESS_STAT		, 1, 
					DefJS.SV_CODE		, DefAPI.SV_CODE_API_YES,
					DefJS.RES_DATA		, ent
					));	
		}
	}


	//user when modify object with lock
	private void doLckEnd(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception  {
		//ToolLogServer.doLogDebug("--------- "+ SV_CLASS+ ".doLckEnd --------------");	
		boolean isLocked 	= ToolDBLock.canExistLock(json);
		if(!isLocked){
			API.doResponse(response, DefAPI.API_MSG_ERR_LOCK);
			return;
		}
		
		
		TaJobReport ent = reqMod(user, json, true);						
		if (ent==null){
			API.doResponse(response,DefAPI.API_MSG_KO);
		} else {
			ToolDBLock.canDeleteLock(json);
			API.doResponse(response, ToolJSON.reqJSonString(
					DefJS.SESS_STAT		, 1, 
					DefJS.SV_CODE		, DefAPI.SV_CODE_API_YES,
					DefJS.RES_DATA		, ent
					));	
		}	
	}
	
	//---------------------------------------------------------------------------------------------
	private static void doLstHistoryConnection(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception {
		Criterion 			cri			= Restrictions.and(Restrictions.eq(TaAutHistory.ATT_I_AUT_USER, user.reqId()),
				Restrictions.eq(TaAutHistory.ATT_I_TYPE, TaAutHistory.TYPE_CONN));
		List<TaAutHistory>	list		= TaAutHistory.DAO.reqList(cri);
		
		if (list==null || list.size() <= 0){
			API.doResponse(response,DefAPI.API_MSG_KO);
			return;
		}

		API.doResponse(response, ToolJSON.reqJSonString(		
				filter,
				DefJS.SESS_STAT		, 1, 
				DefJS.SV_CODE		, DefAPI.SV_CODE_API_YES,
				DefJS.RES_DATA		, list 
				));	
	}
	
	//---------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------

	private static void doUpdateStatus(TaAutUser user,  JSONObject json, HttpServletResponse response) throws Exception {
		int 			stat	= ToolData.reqInt	(json, "stat", -1);
		int				postId	= ToolData.reqInt	(json, "postId", -1);

		if(stat == -1 || postId == -1) {
			API.doResponse(response, ToolJSON.reqJSonString(
					DefJS.SESS_STAT		, 1, 
					DefJS.SV_CODE		, DefAPI.SV_CODE_API_NO					
					));
			return;
		}

		TaAutUser p = TaAutUser.DAO.reqEntityByRef(postId);
		p.reqSet(TaAutUser.ATT_I_STATUS, stat);
		p.reqSet(TaAutUser.ATT_D_DATE_02, new Date());
		TaAutUser.DAO.doMerge(p);
		//		p.doBuildAll(true);
		p.doBuildDocuments(true);

		API.doResponse(response, ToolJSON.reqJSonString(
				DefJS.SESS_STAT		, 1, 
				DefJS.SV_CODE		, DefAPI.SV_CODE_API_YES,
				DefJS.RES_DATA		, p
				));
	}

	

	//--cache for UI public
	private static CacheData<ResultPagination> cacheEnt_rs = new CacheData<ResultPagination>(100, DefTime.TIME_02_00_00_000);
	//------------function get list post by entType and entId-----------------------------------------------
	//---------------------------------------------------------------------------------------------------------


}