using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Commands;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Queries;
using FluentValidation;
using MediatR;
using Swashbuckle.Swagger.Annotations;

namespace ContactApp.Backend.Controllers
{
    [Route("api/contacts")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IMediator mediator;

        public ContactController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        [SwaggerResponse(200, "Success", typeof(PaginatedResponse<ContactResponse>))]
        [SwaggerResponse(400, "Bad request", typeof(ValidationFailedResponse))]
        [SwaggerResponse(404, "Not found")]
        public async Task<IActionResult> GetAllContactsAsync([FromQuery] PaginatedRequest paginatedRequest, bool showRetired, string searchText)
        {
            var response = await mediator.Send(new GetAllContactsQuery(paginatedRequest, showRetired, searchText));
            return Ok(response);
        }

        [HttpPost]
        [SwaggerResponse(200, "Success", typeof(ContactResponse))]
        [SwaggerResponse(400, "Bad request", typeof(ValidationFailedResponse))]
        [SwaggerResponse(404, "Not found")]
        public async Task<IActionResult> InsertContactAsync([FromBody] InsertContactCommand request)
        {
            var response = await mediator.Send(request);
            return Ok(response);
        }

        [HttpPut]
        [SwaggerResponse(200, "Success", typeof(ContactResponse))]
        [SwaggerResponse(400, "Bad request", typeof(ValidationFailedResponse))]
        [SwaggerResponse(404, "Not found")]
        public async Task<IActionResult> UpdateContactAsync([FromBody] UpdateContactCommand request)
        {
            var response = await mediator.Send(request);
            return Ok(response);
        }

        [HttpDelete]
        [SwaggerResponse(200, "Success", typeof(ContactResponse))]
        [SwaggerResponse(400, "Bad request", typeof(ValidationFailedResponse))]
        [SwaggerResponse(404, "Not found")]
        public async Task<IActionResult> RetireContactAsync([FromBody] RetireContactCommand request)
        {
            var response = await mediator.Send(request);
            return Ok(response);
        }

        [HttpPost("reactivate")]
        [SwaggerResponse(200, "Success", typeof(ContactResponse))]
        [SwaggerResponse(400, "Bad request", typeof(ValidationFailedResponse))]
        [SwaggerResponse(404, "Not found")]
        public async Task<IActionResult> ReactivateContactAsync([FromBody] ReactivateContactCommand request)
        {
            var response = await mediator.Send(request);
            return Ok(response);
        }
    }
}
