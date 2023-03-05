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
    public abstract class BaseReactivateHandler<TType, TRequest, TOut> : IRequestHandler<TRequest, TOut> where TType : Entity, IRetirable where TRequest : IRequest<TOut>, IIdentifiable where TOut : class
    {
        protected readonly IMapper mapper;
        protected readonly ApplicationDbContext dbContext;

        protected BaseReactivateHandler(ApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }
        protected abstract IQueryable<TType> Query { get; }

        public async Task<TOut> Handle(TRequest request, CancellationToken cancellationToken)
        {
            var dbEntity = await Query.Where(x => x.Id == request.Id).FirstOrDefaultAsync(cancellationToken);

            if (dbEntity == null)
                throw new ValidationException(new ValidationError("id", "Item not found"));

            dbEntity.Reactivate();
            await dbContext.SaveChangesAsync(cancellationToken);
            var response = mapper.Map<TOut>(dbEntity);
            return response;
        }
    }
}
