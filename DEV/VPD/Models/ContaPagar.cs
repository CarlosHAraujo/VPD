using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace FinanceiroVPD.Models
{
    public class ContaPagar
    {
        private ContaPagar()
        { }
        public ContaPagar(Projeto projeto, string historico, DateTime data, decimal valor)
            : this()
        {
            this.Projeto = projeto;
            this.Historico = historico;
            this.Data = data;
            this.Valor = valor;
        }

        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Histórico obrigatório.")]
        public string Historico { get; set; }
        [Required(ErrorMessage = "Valor obrigatório.")]
        [DataType(DataType.Currency)]
        public decimal Valor { get; set; }
        [Required(ErrorMessage = "Data obrigatório.")]
        public Nullable<DateTime> Data { get; set; }
        [JsonIgnore]
        public Projeto Projeto { get; set; }
    }
}