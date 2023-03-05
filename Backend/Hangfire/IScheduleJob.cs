using System;

namespace ContactApp.Backend.Hangfire
{
    public interface IScheduleJob : IJob
    {
        public TimeSpan GetDelay();
    }
}
