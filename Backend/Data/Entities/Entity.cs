using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactApp.Backend.Data.Entities
{
    public class Entity
    {
        public Guid Id { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
