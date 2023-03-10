using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Utility;
using MediatR;

namespace ContactApp.Backend.Commands
{
    public class ReactivateContactCommand : IRequest<ContactResponse>, IIdentifiable
    {
        public Guid Id { get; set; }
    }
}
