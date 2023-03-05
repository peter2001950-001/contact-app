using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ContactApp.Backend.Queries.Handlers
{
    public class GetAllRetiredContactsHandler : IRequestHandler<GetAllRetiredContactsQuery, List<ContactResponse>>
    {
        private ApplicationDbContext dbContext;
        private IMapper mapper;

        public GetAllRetiredContactsHandler(ApplicationDbContext dbContext, IMapper mapper)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }
        public async Task<List<ContactResponse>> Handle(GetAllRetiredContactsQuery request, CancellationToken cancellationToken)
        {
            var query = dbContext.Contacts.AsQueryable().Where(x=>x.IsRetired);
            if (request.FromRetiredDateTime.HasValue)
            {
                query = query.Where(x => x.RetiredOn.HasValue && x.RetiredOn.Value < request.FromRetiredDateTime.Value);
            }

            var entities =  await query.ToListAsync(cancellationToken);
            var response = entities.Select(x => mapper.Map<ContactResponse>(x)).ToList();
            return response;
        }
    }
}
