using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Commands;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Queries;
using MediatR;
using Swashbuckle.Swagger.Annotations;

namespace ContactApp.Backend.Controllers
{
    [Route("api/contact")]
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
        public async Task<IActionResult> GetAllContactsAsync([FromQuery] PaginatedRequest paginatedRequest)
        {
            var response = await mediator.Send(new GetAllContactsQuery(paginatedRequest));
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
        public async Task<IActionResult> InsertContactAsync([FromBody] UpdateContactCommand request)
        {
            var response = await mediator.Send(request);
            return Ok(response);
        }
    }
}
