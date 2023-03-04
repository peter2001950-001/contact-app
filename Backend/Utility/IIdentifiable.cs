using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactApp.Backend.Utility
{
    public interface IIdentifiable
    {
        public Guid Id { get; set; }
    }
}
