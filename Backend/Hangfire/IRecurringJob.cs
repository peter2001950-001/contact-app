namespace ContactApp.Backend.Hangfire
{
    public interface IRecurringJob : IJob
    {
        string GetRecurringCronExpression();
    }
}
