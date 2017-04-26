using FinanceiroVPD.Repository;
using FinanceiroVPD.ViewModel;
using System;
using System.Web.Http;
using VPD.Repository;

namespace VPD.Controllers
{
    [RoutePrefix("projeto/{projetoId}")]
    public class FinanceiroController : ApiController
    {
        private FinanceiroRepository _repository;

        public FinanceiroController()
        {
            _repository = new FinanceiroRepository(new Context());
        }

        [Route("contapagar")]
        [HttpGet]
        public IHttpActionResult ContaPagar(int projetoId)
        {
            return Ok(_repository.ContasPagar(projetoId));
        }

        [Route("contapagar/{id}", Name = "GetContaPagarById")]
        [HttpGet]
        public IHttpActionResult ContaPagar(int projetoId, int id)
        {
            return Ok(_repository.GetContaPagar(id));
        }

        [Route("contapagar")]
        [HttpPost]
        public IHttpActionResult ContaPagar(int projetoId, ContaPagarPost conta)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var saved = _repository.CreateContaPagar(projetoId, conta.Historico, conta.Data.Value, conta.Valor.Value);
                    return CreatedAtRoute("GetContaPagarById", new { projetoId = projetoId, id = saved.Id }, saved);
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex);
                }
            }

            return BadRequest(ModelState);
        }

        [Route("contapagar/{id}")]
        [HttpDelete]
        public IHttpActionResult DeleteContaPagar(int projetoId, int id)
        {
            try
            {
                _repository.DeleteContaPagar(id);
                return Ok();
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex);
            }

            return BadRequest(ModelState);
        }

        [Route("contareceber")]
        [HttpGet]
        public IHttpActionResult ContaReceber(int projetoId)
        {
            return Ok(_repository.ContasReceber(projetoId));
        }

        [Route("contareceber/{id}", Name = "GetContaReceberById")]
        [HttpGet]
        public IHttpActionResult ContaReceber(int projetoId, int id)
        {
            return Ok(_repository.GetContaReceber(id));
        }

        [Route("contareceber")]
        [HttpPost]
        public IHttpActionResult ContaReceber(int projetoId, ContaReceberPost contaReceber)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var saved = _repository.CreateContaReceber(projetoId, contaReceber.Historico, contaReceber.Data.Value, contaReceber.Valor.Value);
                    return CreatedAtRoute("GetContaReceberById", new { projetoId = projetoId, id = saved.Id }, saved);
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex);
                }
            }

            return BadRequest(ModelState);
        }

        [Route("contareceber/{id}")]
        [HttpDelete]
        public IHttpActionResult DeleteContaReceber(int projetoId, int id)
        {
            try
            {
                _repository.DeleteContaReceber(id);
                return Ok();
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex);
            }

            return BadRequest(ModelState);
        }

        [Route("entrada")]
        [HttpGet]
        public IHttpActionResult Entrada(int projetoId)
        {
            return Ok(_repository.Entradas(projetoId));
        }

        [Route("entrada/{id}", Name = "GetEntradaById")]
        [HttpGet]
        public IHttpActionResult Entrada(int projetoId, int id)
        {
            return Ok(_repository.GetEntrada(id));
        }

        [Route("entrada")]
        [HttpPost]
        public IHttpActionResult Entrada(int projetoId, EntradaPost entrada)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var saved = _repository.CreateEntrada(projetoId, entrada.Data.Value, entrada.Valor.Value, entrada.Historico, entrada.Pagamento.Value);
                    return CreatedAtRoute("GetEntradaById", new { projetoId = projetoId, id = saved.Id }, saved);
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex);
                }
            }

            return BadRequest(ModelState);
        }

        [Route("saida")]
        [HttpGet]
        public IHttpActionResult Saida(int projetoId)
        {
            return Ok(_repository.Saidas(projetoId));
        }

        [Route("saida/{id}", Name = "GetSaidaById")]
        [HttpGet]
        public IHttpActionResult Saida(int projetoId, int id)
        {
            return Ok(_repository.GetSaida(id));
        }

        [Route("saida")]
        [HttpPost]
        public IHttpActionResult Saida(int projetoId, SaidaPost saida)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var saved = _repository.CreateSaida(projetoId, saida.Data.Value, saida.Valor.Value, saida.Historico);
                    return CreatedAtRoute("GetSaidaById", new { projetoId = projetoId, id = saved.Id }, saved);
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex);
                }
            }

            return BadRequest(ModelState);
        }

        [Route("saldo")]
        [HttpGet]
        public IHttpActionResult Saldo(int projetoId)
        {
            return Ok(_repository.Saldo(projetoId));
        }

        [Route("previsaocaixa")]
        [HttpGet]
        public IHttpActionResult PrevisaoCaixa(int projetoId)
        {
            return Ok(_repository.PrevisaoCaixa(projetoId));
        }

        [Route("saldopagar")]
        [HttpGet]
        public IHttpActionResult SaldoPagar(int projetoId)
        {
            return Ok(_repository.SaldoPagar(projetoId));
        }

        [Route("saldoreceber")]
        [HttpGet]
        public IHttpActionResult SaldoReceber(int projetoId)
        {            
            return Ok(_repository.SaldoReceber(projetoId));
        }

        [Route("totalpago")]
        [HttpGet]
        public IHttpActionResult TotalPago(int projetoId)
        {
            return Ok(_repository.TotalPago(projetoId));
        }

        [Route("totalrecebido")]
        [HttpGet]
        public IHttpActionResult TotalRecebido(int projetoId)
        {
            return Ok(_repository.TotalRecebido(projetoId));
        }
    }
}
