using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactApp.Backend.Commands;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace ContactApp.Backend.Hangfire
{
    public class DeleteRetiredContactsJob : IRecurringJob
    {
        private readonly IMediator mediator;
        public DeleteRetiredContactsJob(IServiceProvider serviceProvider)
        {
            var scope = serviceProvider.CreateScope();
            mediator = scope.ServiceProvider.GetService<IMediator>();
        }
        public string GetJobName()
        {
            return "DeleteRetiredContactsJob";
        }

        public async Task DoWorkAsync()
        {
            var lookbackDays = Application.Switches.DeleteRetiredLookbackDays;
            var entities = mediator.Send(new DeleteContactsCommand(lookbackDays));
        }

        public string GetRecurringCronExpression()
        {
            return "0 0 0 ? * *";
        }
    }
}
