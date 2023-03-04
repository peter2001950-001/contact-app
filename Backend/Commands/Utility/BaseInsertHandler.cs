using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ContactApp.Backend.Data;
using ContactApp.Backend.Data.Entities;
using MediatR;

namespace ContactApp.Backend.Commands.Utility
{
    public abstract class BaseInsertHandler<TType, TRequest, TOut> : IRequestHandler<TRequest, TOut> where TType: Entity where TRequest : IRequest<TOut> where TOut: class
    {
        protected readonly ApplicationDbContext dbContext;
        protected readonly IMapper mapper;

        protected BaseInsertHandler(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.dbContext = applicationDbContext;
            this.mapper = mapper;
        }
        public async Task<TOut> Handle(TRequest request, CancellationToken cancellationToken)
        {
            var entity = mapper.Map<TType>(request);
            entity.CreatedOn = DateTime.Now;
            if (await CanAddAsync(entity))
            {
                entity = await BeforeAddAsync(entity);

                await dbContext.AddAsync(entity, cancellationToken);
                await dbContext.SaveChangesAsync(cancellationToken);
            }

            var response = mapper.Map<TOut>(entity);
            return response;
        }

        public virtual Task<TType> BeforeAddAsync(TType entity)
        {
            return Task.FromResult(entity);
        }

        public virtual Task<bool> CanAddAsync(TType entity)
        {
            return Task.FromResult(true);
        }
    }
}
