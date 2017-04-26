using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FinanceiroVPD.Models
{
    public class User
    {
        private User()
        {
            this.Roles = new List<Role>();
        }
        public User(string userName, string email, string passwordHash)
            : this()
        {
            this.UserName = userName;
            this.Email = email;
            this.PasswordHash = passwordHash;
            this.CreateDate = DateTime.Now;
        }

        public int Id { get; set; }
        public string PasswordHash { get; set; }
        public string UserName { get; set; }
        [MaxLength(255)]
        public string Email { get; set; }
        public DateTime CreateDate { get; set; }
        public List<Role> Roles { get; set; }
    }
}