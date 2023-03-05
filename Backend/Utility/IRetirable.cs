using System;

namespace ContactApp.Backend.Utility
{
    public interface IRetirable
    {
        public bool IsRetired { get; }
        public DateTime? RetiredOn { get;  }

        public void Retire();
        public void Reactivate();
    }
}
