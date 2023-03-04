using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Data;
using ContactApp.Backend.Data.Entities;
using ContactApp.Backend.Queries.Utility;
using ContactApp.Backend.Utility;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ContactApp.Backend.Queries.Handlers
{
    public class GetAllContactsHandler : BaseFetchPaginationHandler<Contact, GetAllContactsQuery, ContactResponse>
    {
        public GetAllContactsHandler(ApplicationDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
        protected override IQueryable<Contact> Query => dbContext.Contacts.AsQueryable();
        protected override IQueryable<Contact> ExtractSearchQuery(GetAllContactsQuery request)
        {
            var query = Query;
            if (!string.IsNullOrWhiteSpace(request.SearchText))
            {
                query = query.Where(x =>
                    x.FirstName.ToLower().Contains(request.SearchText.ToLower()) ||
                    x.Surname.ToLower().Contains(request.SearchText.ToLower()));
            }

            return query;
        }
    }
}
