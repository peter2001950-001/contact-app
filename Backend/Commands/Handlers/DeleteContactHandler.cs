using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ContactApp.Backend.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ContactApp.Backend.Commands.Handlers
{
    public class DeleteContactsHandler : IRequestHandler<DeleteContactsCommand>
    {
        private ApplicationDbContext dbContext;

        public DeleteContactsHandler(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task Handle(DeleteContactsCommand request, CancellationToken cancellationToken)
        {
            var dateTime = DateTime.Now.AddDays(request.LookBackDays * -1);
            var items =  await dbContext.Contacts.Where(x =>
                x.IsRetired && x.RetiredOn.HasValue && x.RetiredOn.Value < dateTime).ToListAsync(cancellationToken);

            foreach (var item in items)
            {
                dbContext.Remove(item);
            }

            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
