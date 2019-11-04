namespace AZVAdmin.Migrations
{
    using AZVAdmin.DAL;
    using AZVAdmin.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<AZVAdmin.DAL.AZVContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(AZVContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
            //Role
            //// ############################### A PARTIR DE AQUI ###################################
            //// #################################################################################### 
            var RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new AZVContext()));
            string[] RolesNames = { "Admin", "Manager", "User" };

            foreach (var role in RolesNames)
            {
                if (!RoleManager.RoleExists(role))
                {
                    context.Roles.AddOrUpdate(r => r.Name, new IdentityRole { Name = role });
                }
            }

            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new AZVContext()));

            var user = new ApplicationUser
            {
                EmailConfirmed = true,
                UserName = "admin@azv.com",
                Email = "admin@azv.com",
                FirstName = "Admin",
                LastName = "Admin",
                IsLoged = false
            };
            var _users = manager.Create(user, "Micr0s0ft1.");
            context.SaveChanges();
            //Assign Role to User

            manager.AddToRole(user.Id.ToString(), "Admin");
            context.SaveChanges();
        }
    }
}
