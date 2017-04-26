using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace FinanceiroVPD.Models
{
    public class Credito
    {
        private Credito()
        { }
        public Credito(Projeto projeto, DateTime data, decimal valor, string historico, TipoPagamento pagamento)
            : this()
        {
            this.Projeto = projeto;
            this.Data = data;
            this.Valor = valor;
            this.Historico = historico;
            this.Pagamento = pagamento;
        }
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Data obrigatória.")]
        public Nullable<DateTime> Data { get; set; }
        [Required(ErrorMessage = "Valor obrigatório.")]
        [DataType(DataType.Currency)]
        public decimal Valor { get; set; }
        [Required(ErrorMessage = "Histórico obrigatório.")]
        public string Historico { get; set; }
        [Required(ErrorMessage = "Tipo de pagamento obrigatório.")]
        public Nullable<TipoPagamento> Pagamento { get; set; }
        [JsonIgnore]
        public Projeto Projeto { get; set; }
    }

    public enum TipoPagamento
    {
        Dinheiro = 0,
        Doacao = 1
    }
}