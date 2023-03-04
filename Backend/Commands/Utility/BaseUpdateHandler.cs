using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ContactApp.Backend.Data;
using ContactApp.Backend.Data.Entities;
using ContactApp.Backend.Utility;
using ContactApp.Backend.Validations;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ContactApp.Backend.Commands.Utility
{
    public abstract class BaseUpdateHandler<TType, TRequest, TOut> : IRequestHandler<TRequest, TOut> where TType : Entity where TRequest : IRequest<TOut>, IIdentifiable where TOut : class
    {
        protected readonly ApplicationDbContext dbContext;
        protected readonly IMapper mapper;

        protected BaseUpdateHandler(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            this.dbContext = applicationDbContext;
            this.mapper = mapper;
        }

        protected abstract IQueryable<TType> Query { get; }
        public async Task<TOut> Handle(TRequest request, CancellationToken cancellationToken)
        {
            var dbEntity = await Query.Where(x => x.Id == request.Id).FirstOrDefaultAsync(cancellationToken);

            if (dbEntity == null)
                throw new ValidationException(new ValidationError("id", "Item not found"));
            
            var entity = mapper.Map(request,dbEntity);
            if (await CanUpdateAsync(entity))
            {
                entity = await BeforeUpdateAsync(entity);

                dbContext.Update(entity);
                await dbContext.SaveChangesAsync(cancellationToken);
            }

            var response = mapper.Map<TOut>(entity);
            return response;
        }

        public virtual Task<TType> BeforeUpdateAsync(TType entity)
        {
            return Task.FromResult(entity);
        }

        public virtual Task<bool> CanUpdateAsync(TType entity)
        {
            return Task.FromResult(true);
        }
    }
}
