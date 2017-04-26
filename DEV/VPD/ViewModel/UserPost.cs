using System.ComponentModel.DataAnnotations;

namespace FinanceiroVPD.ViewModel
{
    public class UserPost
    {
        [Required(ErrorMessage = "UserName obrigatório.")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Email obrigatório.")]
        [EmailAddress]
        public string Email { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "As senhas não são idênticas.")]
        public string ConfirmPassword { get; set; }
    }
}