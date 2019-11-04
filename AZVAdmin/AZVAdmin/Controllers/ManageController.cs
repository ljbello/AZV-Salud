using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using AZVAdmin.App_Start;
using AZVAdmin.DAL;
using AZVAdmin.Models;
using AZVAdmin.ViewModels;

namespace AZVAdmin.Controllers
{
    [Authorize]
    public class ManageController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private AZVContext db = new AZVContext();

        public ManageController()
        {
        }

        public ManageController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        //

        // GET: /Manage/UserList
        [Authorize(Roles = "Admin,Manager")]
        [SessionAuthorize]
        public ActionResult UserList()
        {
            var lUsers = db.Users.Include(u => u.Roles).ToList();
            List<UserListViewModel> lUsersVM = new List<UserListViewModel>();
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new AZVContext()));


            if (lUsers.Count() > 0)
            {
                foreach (var item in lUsers)
                {

                    var role = manager.GetRoles(item.Id);
                    var UsersVM = new UserListViewModel(item, role[0]);
                    lUsersVM.Add(UsersVM);
                }

            }
            return View(lUsersVM);
        }

        // GET: /Manage/EditUer/xxxx-xxx-xxxx-xxx-xxxx
        [HttpGet]
        [Authorize(Roles = "Admin,Manager")]
        [SessionAuthorize]
        public ActionResult EditUser(string id)
        {
            var user = db.Users.Find(id);
            List<SelectListItem> RoleID = new List<SelectListItem>();
            var RolesNames = db.Roles.OrderBy(c => c.Name).ToList();
            foreach (var r in RolesNames)
            {
                RoleID.Add(new SelectListItem() { Text = r.Name, Value = r.Id });
            }
            RegisterViewModel UserVm = new RegisterViewModel();
            UserVm.UserId = user.Id;
            UserVm.FirstName = user.FirstName;
            UserVm.LastName = user.LastName;
            UserVm.Email = user.Email;
            UserVm.IsLoged = user.IsLoged;
            UserVm.RoleID = user.Roles.FirstOrDefault().RoleId;


            this.ViewBag.RoleID = new SelectList(RoleID, "Value", "Text", UserVm.RoleID);
            return View(UserVm);


        }
        [HttpPost]
        [Authorize(Roles = "Admin,Manager")]
        [SessionAuthorize]
        public async Task<ActionResult> EditUser(RegisterViewModel user)
        {

            var oUser = db.Users.Find(user.UserId);
            oUser.FirstName = user.FirstName;
            oUser.LastName = user.LastName;
            oUser.IsLoged = user.IsLoged;
            oUser.Email = user.Email;
            oUser.UserName = user.Email;
            db.Entry(oUser).State = EntityState.Modified;
            await db.SaveChangesAsync();

            var RoleToAdd = db.Roles.Where(c => c.Id == user.RoleID).SingleOrDefault();
            var x = oUser.Roles.FirstOrDefault().RoleId.ToString();
            var RoleToRemove = db.Roles.Where(c => c.Id == x).SingleOrDefault();


            await UserManager.RemoveFromRoleAsync(oUser.Id, RoleToRemove.Name);
            await UserManager.AddToRoleAsync(oUser.Id, RoleToAdd.Name);

            string code = await UserManager.GeneratePasswordResetTokenAsync(oUser.Id);

            IdentityResult result = await UserManager.ResetPasswordAsync(oUser.Id, code, user.Password);


            return RedirectToAction("UserList");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && _userManager != null)
            {
                _userManager.Dispose();
                _userManager = null;
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private bool HasPassword()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            if (user != null)
            {
                return user.PasswordHash != null;
            }
            return false;
        }

        private bool HasPhoneNumber()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            if (user != null)
            {
                return user.PhoneNumber != null;
            }
            return false;
        }

        public enum ManageMessageId
        {
            AddPhoneSuccess,
            ChangePasswordSuccess,
            SetTwoFactorSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
            RemovePhoneSuccess,
            Error
        }

        #endregion
    }
}