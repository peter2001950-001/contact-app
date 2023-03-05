using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Controllers.Models;
using MediatR;

namespace ContactApp.Backend.Queries
{
    public class GetAllRetiredContactsQuery: IRequest<List<ContactResponse>>
    {
        public GetAllRetiredContactsQuery()
        {
            
        }

        public GetAllRetiredContactsQuery(DateTime fromRetiredDateTime)
        {
            FromRetiredDateTime = fromRetiredDateTime;
        }
        public DateTime? FromRetiredDateTime { get; set; }
    }
}
