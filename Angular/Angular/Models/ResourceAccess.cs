using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Data.Sql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Web.Mvc;


namespace Angular.Models
{
    public class ResourceAccess
    {
       
            //
            // GET: /Data/
            private static SqlDatabase _mDb = null;
            private string sTemp = ConfigurationManager.ConnectionStrings["Angular"].ConnectionString;
            string DataBaseName = "Angular";

            private void GetDbInstance()
            {
                if (null == _mDb)
                {
                    _mDb = (SqlDatabase)DatabaseFactory.CreateDatabase(DataBaseName);
                }
            }
            public ResourceAccess()
            {
                GetDbInstance();

            }
            public LoginModel AddUser(string Name,string ip)
            {
                var dataResponse = new LoginModel();
                DbCommand dbCommand = null;
           
                try
                {

                    dbCommand = _mDb.GetStoredProcCommand("[dbo].[AddUser]");
                    _mDb.AddInParameter(dbCommand, "@Name", DbType.String, Name);
                    _mDb.AddInParameter(dbCommand, "@Ip", DbType.String, ip);
                    _mDb.AddOutParameter(dbCommand, "@Id", DbType.Int32, 300);
                    if (_mDb.ExecuteNonQuery(dbCommand) > 0)
                    {
                        dataResponse.IsSuccess = true;
                        dataResponse.Id =
                            Convert.ToInt32(dbCommand.Parameters["@Id"].Value);
                    }
                    else
                    {
                        dataResponse.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {

                    throw new Exception(ex.Message);
                }
                return dataResponse;
            }


            public LoginModel InsertMessage(string UserId, string Message)
            {
                var dataResponse = new LoginModel();
                DbCommand dbCommand = null;

                try
                {

                    dbCommand = _mDb.GetStoredProcCommand("[dbo].[InsertMessage]");
                    _mDb.AddInParameter(dbCommand, "@Message", DbType.String, Message);
                    _mDb.AddInParameter(dbCommand, "@UserId", DbType.Int32, Convert.ToInt32(UserId));
                    if (_mDb.ExecuteNonQuery(dbCommand) > 0)
                    {
                        dataResponse.IsSuccess = true;
                    }
                    else
                    {
                        dataResponse.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {

                    throw new Exception(ex.Message);
                }
                return dataResponse;
            }

            public List<LoginModel> GetMessage()
            {
                var dataResponse = new List<LoginModel>();
                DbCommand dbCommand = null;
                DataSet ds = null;
                try
                {

                    dbCommand = _mDb.GetStoredProcCommand("[dbo].[GetMessage]");

                    ds = _mDb.ExecuteDataSet(dbCommand);
                    if (ds.Tables.Count > 0)
                    {
                        if (ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                        {
                            foreach (DataRow dr in ds.Tables[0].Rows)
                            {
                                dataResponse.Add(new LoginModel()
                                {
                                    ResponseMessage = Convert.ToString(Convert.ToString(dr["Message"])),
                                    UserName = Convert.ToString(Convert.ToString(dr["Name"]))
                                });
                            }

                        }
                    }
                }
                catch (Exception ex)
                {

                    throw new Exception(ex.Message);
                }
                return dataResponse;
            }
        }
}