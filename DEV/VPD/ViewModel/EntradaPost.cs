using FinanceiroVPD.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace FinanceiroVPD.ViewModel
{
    public class EntradaPost
    {
        [Required(ErrorMessage = "Data obrigatória.")]
        public Nullable<DateTime> Data { get; set; }
        [Required(ErrorMessage = "Valor obrigatório.")]
        [DataType(DataType.Currency)]
        public Nullable<decimal> Valor { get; set; }
        [Required(ErrorMessage = "Histórico obrigatório.")]
        public string Historico { get; set; }
        [Required(ErrorMessage = "Tipo de pagamento obrigatório.")]
        public Nullable<TipoPagamento> Pagamento { get; set; }
    }
}