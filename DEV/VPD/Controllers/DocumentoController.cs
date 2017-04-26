using System.Web.Http;
using VPD.Repository;

namespace VPD.Controllers
{
    public class DocumentoController : ApiController
    {
        private DocumentoRepository _repository;

        public DocumentoController()
        {
            _repository = new DocumentoRepository();
        }

        public IHttpActionResult Get(string pageToken = "", int itensPerPage = 0)
        {
            return Ok(_repository.List(pageToken, itensPerPage));
        }
    }
}
