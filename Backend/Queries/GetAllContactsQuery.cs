using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Queries.Utility;
using MediatR;

namespace ContactApp.Backend.Queries
{
    public class GetAllContactsQuery : BasePaginationQuery<ContactResponse>
    {
        public GetAllContactsQuery(PaginatedRequest paginatedRequest)
        {
            PaginatedRequest = paginatedRequest;
        }

        public string SearchText { get; set; }
    }
}
