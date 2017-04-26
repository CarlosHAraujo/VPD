using FinanceiroVPD.Auth;
using FinanceiroVPD.Models;
using System.Collections.Generic;
using System.Linq;

namespace FinanceiroVPD.Repository
{
    public class UserRepository
    {
        private Context _context { get; set; }

        public UserRepository(Context context)
        {
            _context = context;
        }

        public User FindByUserName(string userName)
        {
            return _context.Users.SingleOrDefault(u => u.UserName == userName);
        }

        public User FindByEmail(string email)
        {
            return _context.Users.SingleOrDefault(u => u.Email == email);
        }

        public User FindById(int userId)
        {
            return _context.Users.Find(userId);
        }

        public List<User> List()
        {
            return _context.Users.ToList();
        }

        public void Create(string userName, string email, string password)
        {
            var passwordHash = new Helper().HashPassword(password);
            var user = new User(userName, email, passwordHash);
            _context.Users.Add(user);
            _context.SaveChanges();
        }
    }
}