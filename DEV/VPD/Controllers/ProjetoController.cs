using FinanceiroVPD.Repository;
using FinanceiroVPD.ViewModel;
using System;
using System.Web.Http;

namespace VPD.Controllers
{
    public class ProjetoController : ApiController
    {
        private ProjetoRepository _repository;

        public ProjetoController()
        {
            _repository = new ProjetoRepository(new Context());
        }

        public IHttpActionResult Get()
        {
            return Ok(_repository.List());
        }

        public IHttpActionResult Get(int id)
        {
            return Ok(_repository.Get(id));
        }

        public IHttpActionResult Post(ProjetoPost projeto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var saved = _repository.Create(projeto.Nome);
                    return CreatedAtRoute("DefaultApi", new { id = saved.Id }, saved);
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex);
                }
            }

            return BadRequest(ModelState);
        }
        
        [HttpPut]
        public IHttpActionResult Put([FromUri]int id, [FromBody]ProjetoPost projeto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var saved = _repository.Editar(id, projeto.Nome);
                    return Ok(saved);
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex);
                }
            }

            return BadRequest(ModelState);
        }

        [Route("projeto/{id}/encerrar")]
        [HttpPut]
        public IHttpActionResult Encerrar([FromUri]int id)
        {
            try
            {
                var saved = _repository.Encerrar(id);
                return Ok(saved);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex);
            }

            return BadRequest(ModelState);
        }
    }
}