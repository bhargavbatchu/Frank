using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.IO;

using Angular.Models;

namespace Angular.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Angular";
            if (Convert.ToString(Session["UserId"]) != "" && Convert.ToString(Session["UserId"]) != null)
            {
                return RedirectToAction("About", "Home", new { Name = Convert.ToString(Session["UserName"]) });
            }
            return View();
        }

        public ActionResult About(string Name, string ip)
        {
            ResourceAccess RA = new ResourceAccess();
            var login = new LoginModel();
            //if (Convert.ToString(Session["UserId"]) != "" && Convert.ToString(Session["UserId"]) != null)
            //{
            //    login.Id = Convert.ToInt32(Session["UserId"]);
            //}
            //else {
                var response = RA.AddUser(Name,ip);
               
                Session["UserName"] = Name;
                Session["UserId"] = response.Id;
                login = response;
            //}
            
            return View(login);
        }

        public ActionResult Contact(string UserId, string Message)
        {
            var Model = new List<LoginModel>();

            ResourceAccess RA = new ResourceAccess();
            var response = RA.InsertMessage(UserId, Message);
            
            return Json(response, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetMessages()
        
        {
            var model = new List<LoginModel>();

            ResourceAccess RA = new ResourceAccess();
            var response = RA.GetMessage();

            model = response;

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Video()
        {
            return View();
        }

        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.Files.Count > 0)
            {
                HttpFileCollection files = context.Request.Files;
                var userName = context.Request.Form["name"];
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFile file = files[i];

                    string fname = context.Server.MapPath("Uploads\\" + userName.ToUpper() + "\\" + file.FileName);
                    file.SaveAs(fname);
                }
            }
            context.Response.ContentType = "text/plain";
            context.Response.Write("File/s uploaded successfully!");
        }

        public void imageUpload(FormCollection formData)
        {
            var files = Request.Files;
          
            if (files != null && files.Count > 0)
            {
              var  newImageName = "LG_" + Convert.ToString(DateTime.Now.Ticks);
               var response = FileUpload(files[0], "sa", newImageName);
                var UserId = Convert.ToString(Session["UserId"]);
                var Message = "<img src='http://localhost:50111/Images/" + newImageName + ".png'   />";
                var r = Contact(UserId, Message);
            }

        }

        public ActionResult PopUp()
        {
          
            return View();
        }

        public Response FileUpload(HttpPostedFileBase file, string oldImageName, string newImageName)
        {
            var response = new Response();
            if (ModelState.IsValid)
            {
                if (file != null)
                {
                    if (file.ContentLength > 0)
                    {
                        int maxContentLength = 1024 * 1024 * 3; //Size = 3 MB

                        string[] allowedFileExtensions = new string[] { ".jpg", ".gif", ".png", ".bmp" };

                        if (
                            allowedFileExtensions.Contains(
                                file.FileName.Substring(file.FileName.LastIndexOf('.')).ToLower()))
                        {
                            if (file.ContentLength < maxContentLength)
                            {
                                string pathForSaving = Server.MapPath("~/Images");
                                string fileName = newImageName + ".png";
                                if (file != null && file.ContentLength != 0)
                                {
                                    string filePath = Path.Combine(pathForSaving, fileName);
                                    if (System.IO.File.Exists(filePath))
                                    {
                                        try
                                        {
                                            System.IO.File.Delete(filePath);
                                            file.SaveAs(Path.Combine(pathForSaving, fileName));
                                            response.IsSuccess = true;
                                            response.ResponseMessage = "File uploaded successfully.";
                                        }
                                        catch (Exception ex)
                                        {
                                            response.IsSuccess = false;
                                            response.ResponseMessage = string.Format("File upload failed: {0}",
                                                ex.Message);
                                        }
                                    }
                                    else
                                    {
                                        try
                                        {
                                            file.SaveAs(Path.Combine(pathForSaving, fileName));
                                            response.IsSuccess = true;
                                            response.ResponseMessage = "File uploaded successfully.";
                                        }
                                        catch (Exception ex)
                                        {
                                            response.IsSuccess = false;
                                            response.ResponseMessage = string.Format("File upload failed: {0}",
                                                ex.Message);
                                        }
                                    }
                                }
                            }
                            else
                            {
                                response.IsSuccess = false;
                                response.ResponseMessage = "Your file is too large, maximum allowed size is: " +
                                                           maxContentLength + " MB";
                            }
                        }
                        else
                        {
                            response.IsSuccess = false;
                            response.ResponseMessage = "Please file of type: " +
                                                       string.Join(", ", allowedFileExtensions);
                        }
                    }
                }
            }
            return response;
        }

        public ActionResult SampleForm()
        {
          
            return View();
        }
    }
}
