using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ContactApp.Backend.Controllers.Models;
using ContactApp.Backend.Data;
using ContactApp.Backend.Utility;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ContactApp.Backend.Queries.Utility
{
    public abstract class BaseFetchPaginationHandler<TEntity, TRequest, TOut> : IRequestHandler<TRequest, PaginatedResponse<TOut>> where TOut: class where TRequest : BasePaginationQuery<TOut> where TEntity : Data.Entities.Entity
    {
        protected readonly ApplicationDbContext dbContext;
        protected readonly IMapper mapper;
        protected BaseFetchPaginationHandler(ApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        protected abstract IQueryable<TEntity> Query { get; }

        public virtual async Task<PaginatedResponse<TOut>> Handle(TRequest request, CancellationToken cancellationToken)
        {
            var query = ExtractSearchQuery(request);
            var results = await query.Paged(request.PaginatedRequest).Sorted(request.PaginatedRequest)
                .ToListAsync(cancellationToken);
            var count = await query.CountAsync(cancellationToken);

            var response = new PaginatedResponse<TOut>(results.Select(x => mapper.Map<TOut>(x)), request.PaginatedRequest.StartAt, count,
                request.PaginatedRequest.SortFields);

            return response;
        }

        protected virtual IQueryable<TEntity> ExtractSearchQuery(TRequest request)
        {
            return Query;
        }
    }
}
