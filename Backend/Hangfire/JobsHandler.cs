using System.Collections.Generic;

namespace ContactApp.Backend.Hangfire
{
    public class JobsHandler : IJobsHandler
    {
        private readonly IEnumerable<IRecurringJob> recurringJobs;
        private readonly IEnumerable<IBackgroundJob> backgroundJobs;
        private readonly IEnumerable<IScheduleJob> scheduledJobs;

        public JobsHandler(
            IEnumerable<IRecurringJob> recurringJobs,
            IEnumerable<IBackgroundJob> backgroundJobs,
            IEnumerable<IScheduleJob> scheduledJobs)
        {
            this.recurringJobs = recurringJobs;
            this.backgroundJobs = backgroundJobs;
            this.scheduledJobs = scheduledJobs;
        }

        public IEnumerable<IBackgroundJob> GetBackgroundJobs()
        {
            return backgroundJobs;
        }

        public IEnumerable<IRecurringJob> GetRecurringJobs()
        {
            return recurringJobs;
        }

        public IEnumerable<IScheduleJob> GetScheduledJobs()
        {
            return scheduledJobs;
        }
    }
}
