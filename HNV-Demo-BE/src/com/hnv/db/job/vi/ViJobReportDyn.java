package com.hnv.db.job.vi;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.criterion.Restrictions;

import com.hnv.api.main.Hnv_CfgHibernate;
import com.hnv.common.tool.ToolSet;
import com.hnv.db.EntityAbstract;
import com.hnv.db.EntityDAO;
import com.hnv.db.mat.TaMatMaterial;
import com.hnv.db.mat.TaMatMaterialDetail;
import com.hnv.db.mat.TaMatPrice;
import com.hnv.db.mat.TaMatUnit;
import com.hnv.db.per.TaPerPerson;
import com.hnv.db.tpy.TaTpyCategoryEntity;
import com.hnv.db.tpy.TaTpyDocument;
import com.hnv.def.DefDBExt;

/**
 * TaMatMaterial by H&V SAS
 */
@Entity
@Table(name = DefDBExt.TA_JOB_REPORT )
public class ViJobReportDyn extends EntityAbstract<ViJobReportDyn> {
	public static int	TYPE_02_SINGLE 		= 1;
	public static int	TYPE_02_BOM 		= 2; //bill of material 
	public static int	TYPE_02_WHOLESALE 	= 3;

	private static final long serialVersionUID = 1L;
	private static final int  ENT_TYP			= DefDBExt.ID_TA_JOB_REPORT;
	//---------------------------List of Column from DB-----------------------------
public static final String	COL_I_ID                              =	"I_ID";
	
	public static final String	COL_T_CODE_01                       =	"T_Code_01";
	public static final String	COL_T_CODE_02                       =	"T_Code_02";
	
	public static final String	COL_D_DATE_01                       =	"D_Date_01";
	public static final String	COL_D_DATE_02                       =	"D_Date_02";
	
	public static final String	COL_T_INFO_01                       =	"T_Info_01";
	public static final String	COL_T_INFO_02                         =	"T_Info_02";
	
	public static final String	COL_I_STATUS                         =	"I_Status";
	
	public static final String	COL_I_AUT_USER_01                         =	"I_Aut_User_01";
	public static final String	COL_I_AUT_USER_02                        =	"I_Aut_User_02";
	public static final String	COL_I_AUT_USER_03                         =	"I_Aut_User_03";
	
	public static final String	COL_I_PER_MANAGER                         =	"I_Per_Manager";
	public static final String	COL_F_VAL_01                         =	"F_Val_01";
	public static final String	COL_F_VAL_02                         =	"F_Val_02";
	
	public static final String	COL_F_VAL_03                         =	"F_Val_03";
	public static final String	COL_F_VAL_04                         =	"F_Val_04";
	



	//---------------------------List of ATTR of class-----------------------------
	public static final String	ATT_I_ID                              =	"I_ID";
	
	public static final String	ATT_T_CODE_01                       =	"T_Code_01";
	public static final String	ATT_T_CODE_02                       =	"T_Code_02";
	
	public static final String	ATT_D_DATE_01                       =	"D_Date_01";
	public static final String	ATT_D_DATE_02                       =	"D_Date_02";
	
	public static final String	ATT_I_INFO_01                       =	"I_Info_01";
	public static final String	ATT_I_INFO_02                         =	"I_Info_02";
	
	public static final String	ATT_I_STATUS                         =	"I_Status";
	
	public static final String	ATT_I_AUT_USER_01                        =	"I_Aut_User_01";
	public static final String	ATT_I_AUT_USER_02                        =	"I_Aut_User_02";
	public static final String	ATT_I_AUT_USER_03                         =	"I_Aut_User_03";
	
	public static final String	I_PER_MANAGER                         =	"I_Per_Manager";
	public static final String	ATT_F_VAL_01                         =	"F_Val_01";
	public static final String	ATT_F_VAL_02                         =	"F_Val_02";
	
	public static final String	ATT_F_VAL_03                         =	"F_Val_03";
	public static final String	ATT_F_VAL_04                         =	"F_Val_04";

	//----------------------------------------------------------------------------------------------
//	public static final String	ATT_O_PRODUCER                   	  =	"O_Producer";
//	public static final String	ATT_O_MANAGER                   	  =	"O_Manager";
	
	public static final String	ATT_O_DOCUMENTS                       =	"O_Documents";
//	public static final String	ATT_O_DETAILS                      	  =	"O_Details";
//	
//	public static final String	ATT_O_CATS                      	  =	"O_Cats";
//	
//	public static final String	ATT_O_PRICES_OUT                      =	"O_Prices_Out";
//	public static final String	ATT_O_PRICES_INP                      =	"O_Prices_Inp";
	public static final String	ATT_O_Files                   =	"O_Files";

	//-------every entity class must initialize its DAO from here -----------------------------
	private 	static 	final boolean[] 			RIGHTS		= {true, false, false, false, false}; //canRead, canAdd, canUpd, canDel, del physique or flag only 
	
	private 	static 	final boolean[]				HISTORY		= {false, false, false}; //add, mod, del

	public		static 	final EntityDAO<ViJobReportDyn> 	DAO;
	static{
		DAO = new EntityDAO<ViJobReportDyn>(Hnv_CfgHibernate.reqFactoryEMSession(Hnv_CfgHibernate.ID_FACT_MAIN) , ViJobReportDyn.class, RIGHTS,  HISTORY, DefDBExt.TA_JOB_REPORT, DefDBExt.ID_TA_JOB_REPORT);
	}

	//-----------------------Class Attributs-------------------------
	@Id
	@Column(name=COL_I_ID, nullable = false)
	private	Integer         I_ID;

	@Column(name=COL_T_CODE_01, nullable = true)
	private	String          T_Code_01;

	@Column(name=COL_T_CODE_02, nullable = true)
	private	String          T_Code_02;
	
	@Column(name=COL_T_INFO_01, nullable = true)
	private	String          T_Info_01;

	@Column(name=COL_T_INFO_02, nullable = true)
	private	String          T_Info_02;

	@Column(name=COL_I_STATUS, nullable = true)
	private	Integer          I_Status;

//	@Column(name=COL_T_CODE_05, nullable = true)
//	private	String          T_Code_05;
//
//	@Column(name=COL_T_NAME_01, nullable = true)
//	private	String          T_Name_01;
//
//	@Column(name=COL_T_NAME_02, nullable = true)
//	private	String          T_Name_02;
//
//	@Column(name=COL_I_TYPE_01, nullable = true)
//	private	Integer         I_Type_01;
//
//	@Column(name=COL_I_TYPE_02, nullable = true)
//	private	Integer         I_Type_02;
//
//	@Column(name=COL_I_STATUS_01, nullable = true)
//	private	Integer         I_Status_01;

	@Column(name=COL_I_PER_MANAGER, nullable = true)
	private	Integer         I_Per_Manager;
	@Transient
	private	List<TaTpyDocument> 		O_Documents;
	
	//---------------------Constructeurs-----------------------
	private ViJobReportDyn(){}
 
	//---------------------EntityInterface-----------------------
	@Override
	public Serializable reqRef() {
		return this.I_ID;

	}

	@Override
	public void doMergeWith(ViJobReportDyn ent) {
	}

	@Override
	public int hashCode() {
		return this.I_ID;
	}

	public void doBuildDocuments(boolean forced) throws Exception {
		if (this.O_Documents != null && !forced) return;
		this.O_Documents = TaTpyDocument.reqTpyDocuments(ENT_TYP, I_ID, null, null);
	}
	
}


