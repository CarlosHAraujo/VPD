using FinanceiroVPD.Models;
using System.Threading.Tasks;

namespace FinanceiroVPD.Repository
{
    public class RefreshTokenRepository
    {
        private readonly Context _context;

        public RefreshTokenRepository(Context context)
        {
            _context = context;
        }

        public void Create(RefreshToken refreshToken)
        {
            _context.RefreshTokens.Add(refreshToken);
            _context.SaveChanges();
        }

        public RefreshToken GetById(string id)
        {
            return _context.RefreshTokens.Find(id);
        }

        public void Remove(string id)
        {
            _context.RefreshTokens.Remove(GetById(id));
        }
    }
}