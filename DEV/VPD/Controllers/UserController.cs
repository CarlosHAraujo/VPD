using FinanceiroVPD.Models;
using FinanceiroVPD.Repository;
using FinanceiroVPD.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinanceiroVPD.Controllers
{
    public class UserController : ApiController
    {
        private UserRepository _repository;

        public UserController()
        {
            var context = new Context();
            _repository = new UserRepository(context);
        }

        public IHttpActionResult Get()
        {
            return Ok(_repository.List());
        }

        [HttpPost]
        public IHttpActionResult Post(UserPost user)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repository.Create(user.UserName, user.Email, user.Password);
            return Ok();
        }
    }
}