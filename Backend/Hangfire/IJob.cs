using System.Threading.Tasks;

namespace ContactApp.Backend.Hangfire
{
    public interface IJob
    {
        string GetJobName();

        Task DoWorkAsync();
    }
}
