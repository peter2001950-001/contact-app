using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Commands.Utility;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Data.Entities;
using ContactApp.Backend.Utility;
using MediatR;

namespace ContactApp.Backend.Commands
{
    public class RetireContactCommand: IRequest<ContactResponse>, IIdentifiable
    {
        public Guid Id { get; set; }
    }
}
