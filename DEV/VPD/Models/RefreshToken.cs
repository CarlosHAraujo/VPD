using System.ComponentModel.DataAnnotations;
namespace FinanceiroVPD.Models
{
    public class RefreshToken
    {
        private RefreshToken()
        {
        }
        public RefreshToken(User user, string token, string protectedTicket)
        {
            this.User = user;
            this.Token = token;
            this.ProtectedTicket = protectedTicket;
        }

        public User User { get; set; }
        [Key]
        public string Token { get; set; }
        public string ProtectedTicket { get; set; }
    }
}