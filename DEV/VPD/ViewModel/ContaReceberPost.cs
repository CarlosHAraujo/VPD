using System;
using System.ComponentModel.DataAnnotations;
namespace FinanceiroVPD.ViewModel
{
    public class ContaReceberPost
    {
        [Required(ErrorMessage = "Histórico obrigatório.")]
        public string Historico { get; set; }
        [Required(ErrorMessage = "Data obrigatória.")]
        public Nullable<DateTime> Data { get; set; }
        [Required(ErrorMessage = "Valor obrigatório.")]
        public Nullable<decimal> Valor { get; set; }
    }
}