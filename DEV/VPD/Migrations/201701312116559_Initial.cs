namespace VPD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ContaPagar",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Historico = c.String(nullable: false, unicode: false),
                        Valor = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Data = c.DateTime(nullable: false, precision: 0),
                        Projeto_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Projeto", t => t.Projeto_Id, cascadeDelete: true)
                .Index(t => t.Projeto_Id);
            
            CreateTable(
                "dbo.Projeto",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nome = c.String(nullable: false, unicode: false),
                        DataCriacao = c.DateTime(nullable: false, precision: 0),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ContaReceber",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Historico = c.String(nullable: false, unicode: false),
                        Valor = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Data = c.DateTime(nullable: false, precision: 0),
                        Projeto_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Projeto", t => t.Projeto_Id, cascadeDelete: true)
                .Index(t => t.Projeto_Id);
            
            CreateTable(
                "dbo.Credito",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Data = c.DateTime(nullable: false, precision: 0),
                        Valor = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Historico = c.String(nullable: false, unicode: false),
                        Pagamento = c.Int(nullable: false),
                        Projeto_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Projeto", t => t.Projeto_Id, cascadeDelete: true)
                .Index(t => t.Projeto_Id);
            
            CreateTable(
                "dbo.Debito",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Data = c.DateTime(nullable: false, precision: 0),
                        Valor = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Historico = c.String(nullable: false, unicode: false),
                        Projeto_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Projeto", t => t.Projeto_Id, cascadeDelete: true)
                .Index(t => t.Projeto_Id);
            
            CreateTable(
                "dbo.RefreshToken",
                c => new
                    {
                        Token = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                        ProtectedTicket = c.String(unicode: false),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Token)
                .ForeignKey("dbo.User", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.User",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PasswordHash = c.String(unicode: false),
                        UserName = c.String(unicode: false),
                        Email = c.String(maxLength: 255, storeType: "nvarchar"),
                        CreateDate = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Email, unique: true);
            
            CreateTable(
                "dbo.Role",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(unicode: false),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.User_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RefreshToken", "User_Id", "dbo.User");
            DropForeignKey("dbo.Role", "User_Id", "dbo.User");
            DropForeignKey("dbo.Debito", "Projeto_Id", "dbo.Projeto");
            DropForeignKey("dbo.Credito", "Projeto_Id", "dbo.Projeto");
            DropForeignKey("dbo.ContaReceber", "Projeto_Id", "dbo.Projeto");
            DropForeignKey("dbo.ContaPagar", "Projeto_Id", "dbo.Projeto");
            DropIndex("dbo.Role", new[] { "User_Id" });
            DropIndex("dbo.User", new[] { "Email" });
            DropIndex("dbo.RefreshToken", new[] { "User_Id" });
            DropIndex("dbo.Debito", new[] { "Projeto_Id" });
            DropIndex("dbo.Credito", new[] { "Projeto_Id" });
            DropIndex("dbo.ContaReceber", new[] { "Projeto_Id" });
            DropIndex("dbo.ContaPagar", new[] { "Projeto_Id" });
            DropTable("dbo.Role");
            DropTable("dbo.User");
            DropTable("dbo.RefreshToken");
            DropTable("dbo.Debito");
            DropTable("dbo.Credito");
            DropTable("dbo.ContaReceber");
            DropTable("dbo.Projeto");
            DropTable("dbo.ContaPagar");
        }
    }
}
