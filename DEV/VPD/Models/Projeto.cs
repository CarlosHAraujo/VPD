using System;
using System.ComponentModel.DataAnnotations;

namespace FinanceiroVPD.Models
{
    public class Projeto
    {
        private Projeto()
        {
            this.DataCriacao = DateTime.Now;
            this.Status = StatusProjeto.Aberto;
        }
        public Projeto(string nome)
            : this()
        {
            this.Nome = nome;
        }

        [Key]
        public int Id { get; private set; }
        [Required(ErrorMessage = "Nome obrigatório.")]
        public string Nome { get; set; }
        public DateTime DataCriacao { get; private set; }
        public StatusProjeto Status { get; set; }       
    }

    public enum StatusProjeto
    {
        Aberto = 0,
        Encerrado = 1
    }
}