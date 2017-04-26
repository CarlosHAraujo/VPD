using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace FinanceiroVPD.Models
{
    public class Debito
    {
        private Debito()
        {
        }
        public Debito(Projeto projeto, DateTime data, decimal valor, string historico)
            : this()
        {
            this.Projeto = projeto;
            this.Data = data;
            this.Valor = valor;
            this.Historico = historico;
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
        [JsonIgnore]
        public Projeto Projeto { get; set; }
    }
}