using FinanceiroVPD.Models;
using FinanceiroVPD.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace VPD.Repository
{
    public class FinanceiroRepository
    {
        private Context _context;

        public FinanceiroRepository(Context context)
        {
            _context = context;
        }

        public List<Credito> Entradas(int projetoId)
        {
            return _context.Creditos.Where(c => c.Projeto.Id == projetoId).ToList();
        }

        public Credito GetEntrada(int id)
        {
            return _context.Creditos.Find(id);
        }

        public Credito CreateEntrada(int projetoId, DateTime data, decimal valor, string historico, TipoPagamento pagamento)
        {
            var projeto = _context.Projetos.Find(projetoId);
            if (projeto == null)
            {
                throw new InvalidOperationException("Projeto não encontrado.");
            }
            if (projeto.Status == StatusProjeto.Encerrado)
            {
                throw new InvalidOperationException("Projeto já encerrado. Não é possível adicionar uma entrada.");
            }

            var credito = new Credito(projeto, data, valor, historico, pagamento);
            _context.Creditos.Add(credito);
            _context.SaveChanges();
            return credito;
        }

        public decimal TotalRecebido(int projetoId)
        {
            return (from entrada in _context.Creditos
                    where entrada.Projeto.Id == projetoId
                    select (int?)entrada.Valor).Sum() ?? 0;
        }

        public List<Debito> Saidas(int projetoId)
        {
            return _context.Debitos.Where(d => d.Projeto.Id == projetoId).ToList();
        }

        public Debito GetSaida(int id)
        {
            return _context.Debitos.Find(id);
        }

        public Debito CreateSaida(int projetoId, DateTime data, decimal valor, string historico)
        {
            var projeto = _context.Projetos.Find(projetoId);
            if (projeto == null)
            {
                throw new InvalidOperationException("Projeto não encontrado.");
            }
            if (projeto.Status == StatusProjeto.Encerrado)
            {
                throw new InvalidOperationException("Projeto já encerrado. Não é possível adicionar uma entrada.");
            }

            var debito = new Debito(projeto, data, valor, historico);
            _context.Debitos.Add(debito);
            _context.SaveChanges();
            return debito;
        }

        public decimal TotalPago(int projetoId)
        {
            return (from saida in _context.Debitos
                    where saida.Projeto.Id == projetoId
                    select (int?)saida.Valor).Sum() ?? 0;
        }

        public decimal Saldo(int projetoId)
        {
            return (TotalRecebido(projetoId) - TotalPago(projetoId));
        }

        public List<ContaPagar> ContasPagar(int projetoId)
        {
            return _context.ContasPagar.Where(c => c.Projeto.Id == projetoId).ToList();
        }

        public ContaPagar GetContaPagar(int id)
        {
            return _context.ContasPagar.Find(id);
        }

        public ContaPagar CreateContaPagar(int projetoId, string historico, DateTime data, decimal valor)
        {
            var projeto = _context.Projetos.Find(projetoId);
            if (projeto == null)
            {
                throw new InvalidOperationException("Projeto não encontrado.");
            }
            if (projeto.Status == StatusProjeto.Encerrado)
            {
                throw new InvalidOperationException("Projeto já encerrado. Não é possível adicionar uma conta a pagar.");
            }

            var contaPagar = new ContaPagar(projeto, historico, data, valor);
            _context.ContasPagar.Add(contaPagar);
            _context.SaveChanges();
            return contaPagar;
        }

        public void DeleteContaPagar(int id)
        {
            _context.ContasPagar.Remove(_context.ContasPagar.Find(id));
            _context.SaveChanges();
        }

        public decimal SaldoPagar(int projetoId)
        {
            return (from conta in _context.ContasPagar
                    where conta.Projeto.Id == projetoId
                    select (int?)conta.Valor).Sum() ?? 0;
        }
        public List<ContaReceber> ContasReceber(int projetoId)
        {
            return _context.ContasReceber.Where(c => c.Projeto.Id == projetoId).ToList();
        }

        public ContaReceber GetContaReceber(int id)
        {
            return _context.ContasReceber.Find(id);
        }

        public ContaReceber CreateContaReceber(int projetoId, string historico, DateTime data, decimal valor)
        {
            var projeto = _context.Projetos.Find(projetoId);
            if (projeto == null)
            {
                throw new InvalidOperationException("Projeto não encontrado.");
            }
            if (projeto.Status == StatusProjeto.Encerrado)
            {
                throw new InvalidOperationException("Projeto já encerrado. Não é possível adicionar uma conta a pagar.");
            }

            var contaReceber = new ContaReceber(projeto, historico, data, valor);
            _context.ContasReceber.Add(contaReceber);
            _context.SaveChanges();
            return contaReceber;
        }

        public void DeleteContaReceber(int id)
        {
            _context.ContasReceber.Remove(_context.ContasReceber.Find(id));
            _context.SaveChanges();
        }

        public decimal SaldoReceber(int projetoId)
        {
            return (from conta in _context.ContasReceber
                    where conta.Projeto.Id == projetoId
                    select (int?)conta.Valor).Sum() ?? 0;
        }

        public decimal PrevisaoCaixa(int projetoId)
        {
            return (this.Saldo(projetoId) + (this.SaldoReceber(projetoId) - this.SaldoPagar(projetoId)));
        }
    }
}