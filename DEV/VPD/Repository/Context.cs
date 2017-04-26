using FinanceiroVPD.Models;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity.Validation;

namespace FinanceiroVPD.Repository
{
    public class Context : DbContext
    {
        public Context()
            : base("conn")
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Projeto> Projetos { get; set; }
        public DbSet<ContaPagar> ContasPagar { get; set; }
        public DbSet<ContaReceber> ContasReceber { get; set; }
        public DbSet<Credito> Creditos { get; set; }
        public DbSet<Debito> Debitos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder
                .Entity<User>()
                .Property(u => u.Email)
                .HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute() { IsUnique = true }));

            modelBuilder
                .Entity<ContaPagar>()
                .HasRequired(c => c.Projeto);

            modelBuilder
                .Entity<ContaReceber>()
                .HasRequired(c => c.Projeto);

            modelBuilder
                .Entity<Credito>()
                .HasRequired(c => c.Projeto);

            modelBuilder
                .Entity<Debito>()
                .HasRequired(c => c.Projeto);

            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            try
            {
                return base.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                throw;
            }
            catch(DbUpdateException e)
            {
                throw;
            }
        }
    }
}