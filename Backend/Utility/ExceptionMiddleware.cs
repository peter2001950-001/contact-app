using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Validations;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ContactApp.Backend.Utility
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JsonSerializerSettings serializerSettings;
        public ExceptionMiddleware(RequestDelegate next)
        {
            serializerSettings = new JsonSerializerSettings()
                {ContractResolver = new CamelCasePropertyNamesContractResolver()};
            _next = next;
        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (ValidationException ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
            catch (Exception)
            {
                var response = new ValidationFailedResponse(new ValidationError("", "Internal error"));
                httpContext.Response.Headers.Add("Content-Type", "application/json");
                var json = JsonConvert.SerializeObject(response, serializerSettings);
                await httpContext.Response.WriteAsync(json);
            }
        }
        private async Task HandleExceptionAsync(HttpContext context, ValidationException exception)
        {
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            var response = new ValidationFailedResponse(exception.ValidationErrors);
            context.Response.Headers.Add("Content-Type", "application/json");
            var json = JsonConvert.SerializeObject(response, serializerSettings);
            await context.Response.WriteAsync(json);
        }
    }
}
