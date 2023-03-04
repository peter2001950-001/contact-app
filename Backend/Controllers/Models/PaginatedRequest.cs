using System.Collections.Generic;

namespace ContactApp.Backend.Controllers.Models
{
    public class PaginatedRequest
    {
        public int StartAt { get; set; } = 0;
        public int Count { get; set; } = 100;
        public IEnumerable<string> SortFields { get; set; } = null;
    }
}
