using ContactApp.Backend.Controllers.Models;
using MediatR;

namespace ContactApp.Backend.Queries.Utility
{
    public class BasePaginationQuery<T> : IRequest<PaginatedResponse<T>> where T: class
    {
        public PaginatedRequest PaginatedRequest { get; set; }
    }
}
