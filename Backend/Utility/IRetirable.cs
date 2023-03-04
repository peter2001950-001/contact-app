using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactApp.Backend.Data.Entities
{
    public interface IRetirable
    {
        public bool IsRetired { get; }
        public DateTime? RetiredOn { get;  }

        public void Retire();
        public void Reactivate();
    }
}
