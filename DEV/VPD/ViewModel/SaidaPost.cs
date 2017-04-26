using System;
using System.ComponentModel.DataAnnotations;

namespace FinanceiroVPD.ViewModel
{
    public class SaidaPost
    {
        [Required(ErrorMessage = "Data obrigatória.")]
        public Nullable<DateTime> Data { get; set; }
        [Required(ErrorMessage = "Valor obrigatório.")]
        public Nullable<decimal> Valor { get; set; }
        [Required(ErrorMessage = "Histórico obrigatório.")]
        public string Historico { get; set; }
    }
}