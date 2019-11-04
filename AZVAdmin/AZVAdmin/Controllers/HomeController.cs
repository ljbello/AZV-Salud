using AZVAdmin.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AZVAdmin.Controllers
{
    public class HomeController : Controller
    {
        [Authorize(Roles = "Admin,Manager,User")]
        [SessionAuthorize]
        public ActionResult Index()
        {
            return View();
        }

        [Authorize(Roles = "Admin,Manager,User")]
        [SessionAuthorize]
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        [Authorize(Roles = "Admin,Manager,User")]
        [SessionAuthorize]
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}