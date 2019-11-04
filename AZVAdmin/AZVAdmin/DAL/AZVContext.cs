using AZVAdmin.Models;
using AZVAdmin.Views;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;


namespace AZVAdmin.DAL
{
    public class AZVContext : IdentityDbContext<ApplicationUser>
    {
        // Your context has been configured to use a 'iqueue_shared' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'iqueue_shared.Classes.iqueue_shared' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'iqueue_shared' 
        // connection string in the application configuration file.

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            // modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();

        }


        public AZVContext() : base("name=AZVContext")
        {
        }


        public static AZVContext Create()
        {
            return new AZVContext();
        }

        //public DbSet<Service> Services { get; set; }
        //public DbSet<Ticket> Tickets { get; set; }
        //public DbSet<Language> Languagues { get; set; }
        //public DbSet<Desktop> Desktops { get; set; }

        public DbSet<RoleViewModel> RoleViewModels { get; set; }

        public System.Data.Entity.DbSet<AZVAdmin.Models.PushMessage> PushMessages { get; set; }
        //public DbSet<Employee> Employees { get; set; }
        //public DbSet<TicketOnViewer> TicketOnViewer { get; set; }

    }
}