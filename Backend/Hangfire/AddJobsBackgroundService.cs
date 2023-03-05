using System.Threading;
using System.Threading.Tasks;
using Hangfire;
using Hangfire.Storage;
using Microsoft.Extensions.Hosting;

namespace ContactApp.Backend.Hangfire
{
    public class AddJobsBackgroundService : BackgroundService
    {
        private readonly IJobsHandler jobsHandler;

        public AddJobsBackgroundService(IJobsHandler jobsHandler)
        {
            this.jobsHandler = jobsHandler;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var recurringJobs = jobsHandler.GetRecurringJobs();
            var backgroundJobs = jobsHandler.GetBackgroundJobs();
            var scheduledJobs = jobsHandler.GetScheduledJobs();

            if (recurringJobs != null)
            {
                using (var connection = JobStorage.Current.GetConnection())
                {
                    foreach (var recurringJob in connection.GetRecurringJobs())
                    {
                        RecurringJob.RemoveIfExists(recurringJob.Id);
                    }
                }

                foreach (var recurringJob in recurringJobs)
                {
                    RecurringJob.AddOrUpdate(recurringJobId: recurringJob.GetJobName(), methodCall: () => recurringJob.DoWorkAsync(), cronExpression: recurringJob.GetRecurringCronExpression());
                }
            }

            if (backgroundJobs != null)
            {
                foreach (var backgroundJob in backgroundJobs)
                {
                    BackgroundJob.Enqueue(() => backgroundJob.DoWorkAsync());
                }
            }

            if (scheduledJobs != null)
            {
                foreach (var scheduleJob in scheduledJobs)
                {
                    BackgroundJob.Schedule(() => scheduleJob.DoWorkAsync(), scheduleJob.GetDelay());
                }
            }

            return Task.CompletedTask;
        }
    }
}
