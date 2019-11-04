using System.Web;
using System.Web.Optimization;

namespace AZVAdmin
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //Template files
            bundles.Add(new StyleBundle("~/TemplateAssets/css").Include(
                "~/TemplateAssets/assets/plugins/bootstrap/css/bootstrap.min.css",
                "~/TemplateAssets/material/css/style.css",
                "~/TemplateAssets/material/css/colors/default.css",
                "~/TemplateAssets/assets/plugins/toast-master/css/jquery.toast.css",
                "~/TemplateAssets/assets/plugins/datatables/media/css/dataTables.bootstrap4.min.css",
                "~/TemplateAssets/AzvAdmin/css/AZVAdmin.css"

                ));

            bundles.Add(new ScriptBundle("~/TemplateAssets/scripts").Include(

                "~/TemplateAssets/assets/plugins/jquery/jquery.min.js",
                "~/TemplateAssets/assets/plugins/popper/popper.min.js",
                "~/TemplateAssets/assets/plugins/bootstrap/js/bootstrap.min.js",
                "~/TemplateAssets/material/js/jquery.slimscroll.js",
                "~/TemplateAssets/material/js/waves.js",
                "~/TemplateAssets/material/js/sidebarmenu.js",
                "~/TemplateAssets/assets/plugins/sticky-kit-master/dist/sticky-kit.min.js",
                "~/TemplateAssets/assets/plugins/sparkline/jquery.sparkline.min.js",
                 "~/TemplateAssets/material/js/validation.js",
                "~/TemplateAssets/material/js/custom.min.js",
                "~/TemplateAssets/assets/plugins/styleswitcher/jQuery.style.switcher.js",
                "~/TemplateAssets/assets/plugins/toast-master/js/jquery.toast.js",
                "~/TemplateAssets/assets/plugins/datatables/datatables.min.js"
                ));

        }
    }
}

