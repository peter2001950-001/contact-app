using System;
using Hangfire;
using Hangfire.Redis;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace ContactApp.Backend.Hangfire
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddHangfireImplementation(this IServiceCollection services, IConfiguration configuration)
        {
            
            services.Configure<HangfireConfiguration>(options => configuration.GetSection("Hangfire").Bind(options));
            services.AddTransient<IJobsHandler, JobsHandler>();
            services.AddTransient<IRecurringJob, DeleteRetiredContactsJob>();
            services.AddHangfire((s, opts) => opts
                .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                .UseSimpleAssemblyNameTypeSerializer()
                .UseRecommendedSerializerSettings(x => x.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .UseRedisStorage(configuration.GetConnectionString("RedisConnection"),
                    new RedisStorageOptions
                    {
                        Db = s.GetService<IOptions<HangfireConfiguration>>().Value.RedisDatabase
                    })
                .WithJobExpirationTimeout(TimeSpan.FromHours(1)));

            services.AddHangfireServer();
            services.AddHostedService<AddJobsBackgroundService>();

            return services;
        }
    }
}
