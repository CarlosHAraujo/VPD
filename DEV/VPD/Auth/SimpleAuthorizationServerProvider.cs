using Microsoft.Owin.Security.OAuth;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using System;
using Microsoft.Owin.Security;
using System.Security.Claims;
using FinanceiroVPD.Repository;

namespace FinanceiroVPD.Auth
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        private string[] _allowedClients = new string[] { "VPD" };
        private string _allowedOrigin = "*";
        private string _refreshTokenLifeTime = "525600"; //1 ano
        private AuthenticationProvider _authProvider;

        public SimpleAuthorizationServerProvider()
        {
            var context = new Context();
            _authProvider = new AuthenticationProvider(new UserRepository(context), new Helper(), new RefreshTokenRepository(context));
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            string clientId = string.Empty;
            string clientSecret = string.Empty;

            if (!context.TryGetBasicCredentials(out clientId, out clientSecret))
            {
                context.TryGetFormCredentials(out clientId, out clientSecret);
            }

            if (context.ClientId == null)
            {
                context.SetError("invalid_clientId", "ClientId should be sent.");
                return Task.FromResult<object>(null);
            }

            if (!_allowedClients.Contains(clientId))
            {
                context.SetError("invalid_clientId", string.Format("Client '{0}' is not registered in the system.", context.ClientId));
                return Task.FromResult<object>(null);
            }

            context.OwinContext.Set<string>("as:clientAllowedOrigin", _allowedOrigin);
            context.OwinContext.Set<string>("as:clientRefreshTokenLifeTime", _refreshTokenLifeTime);

            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");

            if (allowedOrigin == null) allowedOrigin = "*";
            context.OwinContext.Response.Headers.AppendValues("Access-Control-Allow-Origin", new[] { allowedOrigin });

            try
            {
                var authenticationProperties = new Dictionary<string, string> 
                {
                    {
                        "as:client_id", context.ClientId ?? String.Empty
                    },
                    {
                        "userName", context.UserName
                    }
                };

                var identity = _authProvider.SignIn(context.UserName, context.Password, context.Options.AuthenticationType, authenticationProperties);
                var ticket = new AuthenticationTicket(identity, new AuthenticationProperties(authenticationProperties));
                context.Validated(ticket);
            }
            catch (Exception ex)
            {
                context.SetError("invalid_grant", ex.Message);
                return;
            }
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (var property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override async Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            var originalClient = context.Ticket.Properties.Dictionary["as:client_id"];
            var currentClient = context.ClientId;

            if (originalClient != currentClient)
            {
                context.SetError("invalid_clientId", "Refresh token is issued to a different clientId.");
            }

            //refresh claims
            if (!context.Ticket.Identity.HasClaim(x => x.Type == System.Security.Claims.ClaimTypes.NameIdentifier))
            {
                return;
            }
            var userId = context.Ticket.Identity.Claims.FirstOrDefault(x => x.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value;

            if (String.IsNullOrWhiteSpace(userId))
            {
                return;
            }

            try
            {
                ClaimsIdentity newIdentity = _authProvider.RefreshClaims(context.Ticket.Identity);
                var newTicket = new AuthenticationTicket(newIdentity, context.Ticket.Properties);
                context.Validated(newTicket);
            }
            catch (Exception ex)
            {
                context.SetError("invalid_grant", ex.Message);
                return;
            }

            return;
        }
    }
}