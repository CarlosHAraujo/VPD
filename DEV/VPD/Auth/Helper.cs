using DevOne.Security.Cryptography.BCrypt;
using System;
using System.Security.Cryptography;

namespace FinanceiroVPD.Auth
{
    public class Helper
    {
        public bool ValidatePassword(string password, string hash)
        {
            return BCryptHelper.CheckPassword(password, hash);
        }

        public string HashPassword(string password)
        {
            return BCryptHelper.HashPassword(password, BCryptHelper.GenerateSalt());
        }

        public string Tokenize(string word)
        {
            HashAlgorithm hashAlgorithm = new SHA256CryptoServiceProvider();

            byte[] byteValue = System.Text.Encoding.UTF8.GetBytes(word);

            byte[] byteHash = hashAlgorithm.ComputeHash(byteValue);

            return Convert.ToBase64String(byteHash);
        }
    }
}