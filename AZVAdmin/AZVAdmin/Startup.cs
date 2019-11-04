using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AZVAdmin.Startup))]
namespace AZVAdmin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
