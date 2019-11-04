using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using AZVAdmin.App_Start;
using AZVAdmin.DAL;
using AZVAdmin.Models;

namespace AZVAdmin.Controllers
{
    public class PushMessagesController : Controller
    {
        private AZVContext db = new AZVContext();

        // GET: PushMessages
        [Authorize(Roles = "Admin,Manager,User")]
        [SessionAuthorize]
        public ActionResult Index()
        {
            return View(db.PushMessages.ToList());
        }



        // GET: PushMessages/Create
        [Authorize(Roles = "Admin,Manager,User")]
        [SessionAuthorize]
        public ActionResult Create()
        {
            return View();
        }

        // POST: PushMessages/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize(Roles = "Admin,Manager,User")]
        [SessionAuthorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Message,Url,Segment")] PushMessage pushMessage)
        {
            if (ModelState.IsValid)
            {
                var request = WebRequest.Create("https://onesignal.com/api/v1/notifications") as HttpWebRequest;

                request.KeepAlive = true;
                request.Method = "POST";
                request.ContentType = "application/json; charset=utf-8";
                request.Headers.Add("authorization", "Basic MGU3ZDdkNjUtYzg4Ny00Y2U0LWI1NDctN2NkZmNjYjMxOTVj");

                byte[] byteArray = Encoding.UTF8.GetBytes("{"
                                + "\"app_id\": \"35c0d2a7-142d-456b-af65-2475553c74c3\","
                                + "\"contents\": {\"en\": \"" + pushMessage.Message + "" + "\"},"
                                //+ "\"ios_attachments\": {\"id1\": \"http://www.24ora.com\"},"
                                + "\"url\": \"" + pushMessage.Url + "" + "\","
                                 + "\"included_segments\": [\"" + pushMessage.Segment + "" + "\"]}");


                string test = "{"
                                +"\"app_id\": \"04bb19f7-c274-48bb-855c-cec231f16c85\","
                                + "\"contents\": {\"en\": \"" + pushMessage.Message + ""+"\"},"
                                //+ "\"ios_attachments\": {\"id1\": \"http://www.24ora.com\"},"
                                + "\"url\": \"" + pushMessage.Url + ""+ "\","
                                 + "\"included_segments\": [\"" + pushMessage.Segment + ""+"\"]}";

                string responseContent = null;

                try
                {
                    using (var writer = request.GetRequestStream())
                    {
                        writer.Write(byteArray, 0, byteArray.Length);
                    }

                    using (var response = request.GetResponse() as HttpWebResponse)
                    {
                        using (var reader = new StreamReader(response.GetResponseStream()))
                        {
                            responseContent = reader.ReadToEnd();
                        }
                    }
                }
                catch (WebException ex)
                {
                    System.Diagnostics.Debug.WriteLine(ex.Message);
                    System.Diagnostics.Debug.WriteLine(new StreamReader(ex.Response.GetResponseStream()).ReadToEnd());
                }

                System.Diagnostics.Debug.WriteLine(responseContent);


                db.PushMessages.Add(pushMessage);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(pushMessage);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
