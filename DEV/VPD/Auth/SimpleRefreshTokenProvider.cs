using FinanceiroVPD.Repository;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace FinanceiroVPD.Auth
{
    public class SimpleRefreshTokenProvider : IAuthenticationTokenProvider
    {
        private AuthenticationProvider _authProvider;
        private Helper _helper;

        public SimpleRefreshTokenProvider()
        {
            var context = new Context();
            _helper = new Helper();
            _authProvider = new AuthenticationProvider(new UserRepository(context), _helper, new RefreshTokenRepository(context));
        }

        public void Create(AuthenticationTokenCreateContext context)
        {
            if (!context.Ticket.Identity.HasClaim(x => x.Type == System.Security.Claims.ClaimTypes.NameIdentifier))
            {
                return;
            }
            var userId = context.Ticket.Identity.Claims.FirstOrDefault(x => x.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value;

            if (String.IsNullOrWhiteSpace(userId))
            {
                return;
            }

            var refreshTokenId = Guid.NewGuid().ToString("n");

            var refreshTokenLifeTime = context.OwinContext.Get<string>("as:clientRefreshTokenLifeTime");

            context.Ticket.Properties.IssuedUtc = DateTime.UtcNow;
            context.Ticket.Properties.ExpiresUtc = DateTime.UtcNow.AddMinutes(Convert.ToDouble(refreshTokenLifeTime));

            _authProvider.AddRefreshToken(int.Parse(userId), _helper.Tokenize(refreshTokenId), context.SerializeTicket());
            context.SetToken(refreshTokenId);
        }

        public async Task CreateAsync(AuthenticationTokenCreateContext context)
        {
            Create(context);
        }

        public void Receive(AuthenticationTokenReceiveContext context)
        {
            var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");
            context.OwinContext.Response.Headers.AppendValues("Access-Control-Allow-Origin", new[] { allowedOrigin });

            var token = _authProvider.FindByRefreshToken(_helper.Tokenize(context.Token));

            if (token != null)
            {
                context.DeserializeTicket(token.ProtectedTicket);
                _authProvider.RemoveRefreshToken(token.Token);
            }
        }

        public async Task ReceiveAsync(AuthenticationTokenReceiveContext context)
        {
            Receive(context);
        }
    }
}