using System.Collections.Generic;

namespace ContactApp.Backend.Hangfire
{
    public interface IJobsHandler
    {
        IEnumerable<IRecurringJob> GetRecurringJobs();

        IEnumerable<IBackgroundJob> GetBackgroundJobs();

        IEnumerable<IScheduleJob> GetScheduledJobs();
    }
}
