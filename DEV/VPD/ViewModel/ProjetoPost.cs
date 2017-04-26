using System;
using System.ComponentModel.DataAnnotations;

namespace FinanceiroVPD.ViewModel
{
    public class ProjetoPost
    {
        [Required(ErrorMessage = "Nome obrigatório.")]
        public string Nome { get; set; }
    }
}