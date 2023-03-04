using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ContactApp.Backend.Commands.Utility;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Data;
using ContactApp.Backend.Data.Entities;

namespace ContactApp.Backend.Commands.Handlers
{
    public class UpdateCommandHandler : BaseUpdateHandler<Contact, UpdateContactCommand, ContactResponse>
    {
        public UpdateCommandHandler(ApplicationDbContext applicationDbContext, IMapper mapper) : base(applicationDbContext, mapper)
        {
        }

        protected override IQueryable<Contact> Query => dbContext.Contacts.AsQueryable();

    }
}
