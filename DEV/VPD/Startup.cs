using FinanceiroVPD.Auth;
using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.StaticFiles;
using Owin;
using System;
using System.Web.Http;

[assembly: OwinStartup(typeof(VPD.Startup))]
namespace VPD
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            OAuthAuthorizationServerOptions options = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30),
                Provider = new SimpleAuthorizationServerProvider(),
                RefreshTokenProvider = new SimpleRefreshTokenProvider()
            };

            app.UseOAuthAuthorizationServer(options);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            app.Map("/api", map =>
            {
                HttpConfiguration config = new HttpConfiguration();
                WebApiConfig.Register(config);
                map.UseWebApi(config);
            });

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseFileServer(new FileServerOptions { EnableDefaultFiles = true, FileSystem = new PhysicalFileSystem(".") }); 
        }
    }
}