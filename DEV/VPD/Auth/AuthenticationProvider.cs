using FinanceiroVPD.Models;
using FinanceiroVPD.Repository;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace FinanceiroVPD.Auth
{
    public class AuthenticationProvider
    {
        private UserRepository _userRepository;
        private Helper _helper;
        private RefreshTokenRepository _refreshTokenRepository;

        public AuthenticationProvider(UserRepository userRepository, Helper helper, RefreshTokenRepository refreshTokenRepository)
        {
            _userRepository = userRepository;
            _helper = helper;
            _refreshTokenRepository = refreshTokenRepository;
        }
        
        public ClaimsIdentity SignIn(string email, string password, string authenticationType, Dictionary<string, string> properties)
        {
            var user = _userRepository.FindByEmail(email);

            if (user == null)
            {
                throw new UnauthorizedAccessException("Usuário não encontrado.");
            }

            if (_helper.ValidatePassword(password, user.PasswordHash))
            {
                var claims = GetUserClaims(user);

                ClaimsIdentity identity = new ClaimsIdentity(claims, authenticationType);
                return identity;
            }
            else
            {
                throw new UnauthorizedAccessException("Login ou senha incorretos. Tente novamente.");
            }
        }

        public ClaimsIdentity RefreshClaims(ClaimsIdentity identity)
        {
            var userId = int.Parse(identity.Claims.FirstOrDefault(x => x.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value);
            var user = _userRepository.FindById(userId);
            if (user == null)
            {
                throw new UnauthorizedAccessException("Usuário não encontrado.");
            }

            var claims = GetUserClaims(user);

            return new ClaimsIdentity(identity, claims);
        }

        public void AddRefreshToken(int userId, string token, string protectedTicket)
        {
            var user = _userRepository.FindById(userId);

            _refreshTokenRepository.Create(new RefreshToken(user, token, protectedTicket));
        }

        public RefreshToken FindByRefreshToken(string id)
        {
            return _refreshTokenRepository.GetById(id);
        }

        private List<Claim> GetUserClaims(User user)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            claims.Add(new Claim(ClaimTypes.Email, user.Email));
            claims.Add(new Claim("CreateDate", user.CreateDate.ToLongDateString()));

            foreach (var role in user.Roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Name));
            }

            return claims;
        }

        internal void RemoveRefreshToken(string id)
        {
            _refreshTokenRepository.Remove(id);
        }
    }
}