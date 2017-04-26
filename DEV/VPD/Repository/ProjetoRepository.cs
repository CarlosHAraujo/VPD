using FinanceiroVPD.Models;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System;
using FinanceiroVPD.ViewModel;

namespace FinanceiroVPD.Repository
{
    public class ProjetoRepository
    {
        private Context _context;

        public ProjetoRepository(Context context)
        {
            _context = context;
        }

        public List<Projeto> List()
        {
            return _context.Projetos.ToList();
        }

        public Projeto Get(int id)
        {
            return _context.Projetos.Find(id);
        }

        public Projeto Create(string nome)
        {
            var projeto = new Projeto(nome);
            _context.Projetos.Add(projeto);
            _context.SaveChanges();
            return projeto;
        }

        public Projeto Encerrar(int id)
        {
            var projeto = _context.Projetos.Find(id);
            if(projeto == null)
            {
                throw new InvalidOperationException("Projeto não encontrado.");
            }

            projeto.Status = StatusProjeto.Encerrado;
            _context.SaveChanges();
            return projeto;
        }

        public Projeto Editar(int id, string nome)
        {
            var projeto = _context.Projetos.Find(id);
            if (projeto == null)
            {
                throw new InvalidOperationException("Projeto não encontrado.");
            }

            projeto.Nome = nome;
            _context.SaveChanges();
            return projeto;
        }
    }
}