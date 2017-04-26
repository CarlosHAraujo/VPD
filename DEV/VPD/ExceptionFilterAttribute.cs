using Newtonsoft.Json;
using System;
using System.Text;

namespace VPD
{
    public class ExceptionFilterAttribute : System.Web.Http.Filters.ExceptionFilterAttribute
    {
        public override void OnException(System.Web.Http.Filters.HttpActionExecutedContext actionExecutedContext)
        {
            var response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.InternalServerError);
            response.Content = new System.Net.Http.StringContent(GetExceptionMessage(actionExecutedContext.Exception));
            actionExecutedContext.Response = response;
        }

        private string GetExceptionMessage(Exception ex)
        {
            var message = new StringBuilder();

            while(ex != null)
            {
                message.AppendLine(ex.Message);
                ex = ex.InnerException;
            }

            return message.ToString();
        }
    }
}